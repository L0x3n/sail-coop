import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { boat, charActive, chars, layout, netRole, splats } from './state';
import { gulls, scene } from './scene';
import { heelGroup } from './shipMesh';
import { spawnDroplets } from './effects';
import { toast } from './hud';
import * as audio from './audio';

/* =========================== jumping fish =========================== */
interface Fish { mesh: THREE.Group; t: number; active: boolean; from: THREE.Vector3; dir: THREE.Vector3; }
const fishes: Fish[] = [];
{
  const bodyMat = new THREE.MeshLambertMaterial({ color: 0x7fa8b8 });
  const finMat = new THREE.MeshLambertMaterial({ color: 0x5d8896 });
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), bodyMat);
    body.scale.set(0.8, 0.7, 1.9);
    g.add(body);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 4), finMat);
    tail.position.z = -0.46;
    tail.rotation.x = -Math.PI / 2;
    g.add(tail);
    g.visible = false;
    g.traverse(o => { o.userData.noShadow = true; });
    scene.add(g);
    fishes.push({ mesh: g, t: 0, active: false, from: new THREE.Vector3(), dir: new THREE.Vector3() });
  }
}
let fishTimer = 3;

function spawnFish() {
  const f = fishes.find(x => !x.active);
  if (!f) return;
  const a = Math.random() * Math.PI * 2;
  const r = 10 + Math.random() * 22;
  f.from.set(boat.pos.x + Math.cos(a) * r, 0, boat.pos.z + Math.sin(a) * r);
  const dirA = Math.random() * Math.PI * 2;
  f.dir.set(Math.sin(dirA), 0, Math.cos(dirA));
  f.t = 0;
  f.active = true;
  f.mesh.visible = true;
  spawnDroplets(f.from.x, f.from.z, 3, 1.4, 1.8);
  audio.fishPlop();
}

function updateFish(dt: number) {
  fishTimer -= dt;
  if (fishTimer <= 0) {
    fishTimer = 2.5 + Math.random() * 6;
    spawnFish();
  }
  for (const f of fishes) {
    if (!f.active) continue;
    f.t += dt / 0.95;
    if (f.t >= 1) {
      f.active = false;
      f.mesh.visible = false;
      const ex = f.from.x + f.dir.x * 4.2, ez = f.from.z + f.dir.z * 4.2;
      spawnDroplets(ex, ez, 4, 1.6, 2.0);
      audio.fishPlop();
      continue;
    }
    const x = f.from.x + f.dir.x * 4.2 * f.t;
    const z = f.from.z + f.dir.z * 4.2 * f.t;
    const y = Math.sin(f.t * Math.PI) * 1.7 - 0.15;
    f.mesh.position.set(x, y, z);
    f.mesh.rotation.y = Math.atan2(f.dir.x, f.dir.z);
    f.mesh.rotation.x = -Math.cos(f.t * Math.PI) * 0.9;
  }
}

/* =========================== the bomber gull ===========================
   Periodic flyover on a straight path across the boat; each pass drops
   1..splatsPerPassMax poops that land on random deck spots. Splats are
   SLIPPERY (state.slipAt) and persist until somebody mops them. */
const bomber = new THREE.Group();
let bomberWingL: THREE.Mesh, bomberWingR: THREE.Mesh;
{
  const mat = new THREE.MeshLambertMaterial({ color: 0xf5f8fa });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), mat);
  body.scale.set(1, 0.7, 1.8);
  bomber.add(body);
  const mkWing = (s: number) => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.05, 0.4), mat);
    w.geometry.translate(s * 0.65, 0, 0);
    bomber.add(w);
    return w;
  };
  bomberWingL = mkWing(-1);
  bomberWingR = mkWing(1);
  bomber.traverse(o => { o.userData.noShadow = true; });
  bomber.visible = false;
  scene.add(bomber);
}
const run = {
  active: false, t: 0,
  from: new THREE.Vector3(), dir: new THREE.Vector3(),
  drops: [] as { at: number; tx: number; tz: number }[],
};
let passTimer = 9;       // first pass comes fairly quickly

/* falling blobs live in BOAT-LOCAL space so they land exactly on deck */
interface Blob { mesh: THREE.Mesh; vy: number; active: boolean; }
const blobs: Blob[] = [];
{
  const mat = new THREE.MeshBasicMaterial({ color: 0xf5f6f0 });
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 5), mat);
    m.visible = false;
    m.userData.noShadow = true;
    heelGroup.add(m);
    blobs.push({ mesh: m, vy: 0, active: false });
  }
}

/* --- splat decals: id-keyed, persistent until mopped --- */
const SPLAT_POOL = 10;
const splatMeshes = new Map<number, THREE.Mesh>();
const freeSplatMeshes: THREE.Mesh[] = [];
{
  const geo = new THREE.CircleGeometry(0.26, 10);
  geo.rotateX(-Math.PI / 2);
  for (let i = 0; i < SPLAT_POOL; i++) {
    const m = new THREE.Mesh(geo,
      new THREE.MeshBasicMaterial({ color: 0xf2f3ea, transparent: true, opacity: 0.95, depthWrite: false }));
    m.visible = false;
    m.userData.noShadow = true;
    heelGroup.add(m);
    freeSplatMeshes.push(m);
  }
}
let nextSplatId = 1;
let fxRelay: ((id: number, x: number, z: number) => void) | null = null;
let unsplatRelay: ((id: number) => void) | null = null;
export function setFxRelay(add: (id: number, x: number, z: number) => void, remove: (id: number) => void) {
  fxRelay = add;
  unsplatRelay = remove;
}

export function placeSplat(id: number, lx: number, lz: number) {
  if (splatMeshes.has(id)) return;
  if (!freeSplatMeshes.length) {
    const oldest = splats[0];
    if (oldest) removeSplat(oldest.id);   // deck is saturated — the oldest "dries up"
  }
  const m = freeSplatMeshes.pop();
  if (!m) return;
  m.visible = true;
  m.position.set(lx, DECK_Y + 0.012, lz);
  m.rotation.y = Math.random() * Math.PI;
  m.scale.setScalar(0.85 + Math.random() * 0.5);
  splatMeshes.set(id, m);
  splats.push({ id, x: lx, z: lz });
  audio.splat();
}
export function removeSplat(id: number) {
  const m = splatMeshes.get(id);
  if (m) { m.visible = false; splatMeshes.delete(id); freeSplatMeshes.push(m); }
  const i = splats.findIndex(s => s.id === id);
  if (i >= 0) splats.splice(i, 1);
}
/* host-side helpers for the mop */
export function nearestSplat(x: number, z: number, r: number): { id: number; d: number } | null {
  let best: { id: number; d: number } | null = null;
  for (const s of splats) {
    const d = Math.hypot(s.x - x, s.z - z);
    if (d < r && (!best || d < best.d)) best = { id: s.id, d };
  }
  return best;
}
export function mopSplat(id: number) {
  removeSplat(id);
  if (unsplatRelay) unsplatRelay(id);
}
export function clearSplats() {
  for (const s of [...splats]) removeSplat(s.id);
}

function hostDropSplat(tx: number, tz: number) {
  const id = nextSplatId++;
  placeSplat(id, tx, tz);
  if (fxRelay) fxRelay(id, tx, tz);
  const victim = chars.find(c => charActive(c) && c.mode === 'deck' &&
    Math.hypot(c.pos.x - tx, c.pos.z - tz) < 0.85);
  if (victim) toast(victim.name + ' got decorated by the gull!', '#f8f9fa');
}

function updateBomber(dt: number, t: number) {
  // schedule passes (host only — guests get the splats over the wire)
  if (netRole !== 'guest') {
    passTimer -= dt;
    if (passTimer <= 0 && !run.active) {
      passTimer = CONFIG.poopInterval + (Math.random() * 2 - 1) * CONFIG.poopIntervalVar;
      run.active = true;
      run.t = 0;
      const a = Math.random() * Math.PI * 2;
      run.dir.set(Math.sin(a), 0, Math.cos(a));
      const flyH = 13 + 8 * Math.max(0, layout.scale - 1);   // clear even the galleon's rig
      run.from.set(boat.pos.x - run.dir.x * 45, flyH, boat.pos.z - run.dir.z * 45);
      const n = 1 + Math.floor(Math.random() * CONFIG.splatsPerPassMax);
      run.drops = [];
      for (let i = 0; i < n; i++) {
        run.drops.push({
          at: 2.4 + Math.random() * 1.6,          // mid-crossing
          tx: (Math.random() * 2 - 1) * layout.deckX * 0.85,
          tz: (Math.random() * 2 - 1) * layout.deckZ * 0.85,
        });
      }
      bomber.visible = true;
    }
  }
  if (run.active) {
    run.t += dt;
    const sp = 15;
    bomber.position.set(
      run.from.x + run.dir.x * sp * run.t,
      run.from.y,
      run.from.z + run.dir.z * sp * run.t);
    bomber.rotation.y = Math.atan2(run.dir.x, run.dir.z);
    const flap = Math.sin(t * 9) * 0.6;
    bomberWingL.rotation.z = flap;
    bomberWingR.rotation.z = -flap;
    for (const d of run.drops) {
      if (d.at >= 0 && run.t >= d.at) {
        d.at = -1;
        const b = blobs.find(x => !x.active);
        if (b) {
          b.active = true;
          b.mesh.visible = true;
          b.mesh.position.set(d.tx, 11 + 8 * Math.max(0, layout.scale - 1), d.tz);
          b.mesh.userData.tx = d.tx;
          b.mesh.userData.tz = d.tz;
          b.vy = -1.0;
        }
      }
    }
    if (run.t > 6.5) { run.active = false; bomber.visible = false; }
  }
  // falling blobs (boat-local, so they hit the deck spot they aimed for)
  for (const b of blobs) {
    if (!b.active) continue;
    b.vy -= 9 * dt;
    b.mesh.position.y += b.vy * dt;
    if (b.mesh.position.y <= DECK_Y + 0.1) {
      b.active = false;
      b.mesh.visible = false;
      if (netRole !== 'guest') hostDropSplat(b.mesh.userData.tx, b.mesh.userData.tz);
    }
  }
}

/* ambient gull cries from the circling birds */
let cryTimer = 5;
function updateCries(dt: number) {
  cryTimer -= dt;
  const gull = gulls[4];
  if (!gull) return;
  const distToBoat = Math.hypot(gull.g.position.x - boat.pos.x, gull.g.position.z - boat.pos.z);
  if (cryTimer <= 0 && (distToBoat < 40 || run.active)) {
    cryTimer = 6 + Math.random() * 9;
    audio.gullCry();
  }
}

export function updateCritters(dt: number, t: number) {
  updateFish(dt);
  updateBomber(dt, t);
  updateCries(dt);
}
