import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { boat, charActive, chars, layout, netRole, splats } from './state';
import { gulls, scene } from './scene';
import { heelGroup } from './shipMesh';
import { spawnDroplets, spawnWake } from './effects';
import { SHALLOWS } from './world';
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
let swarmQueue = 0;      // the event director can send a SWARM
export function gullSwarm(n: number) {
  swarmQueue = n;
  passTimer = Math.min(passTimer, 0.5);
}
/* the cannon wants to know where the bomber is (it is a legitimate target) */
export const bomberPos = (): THREE.Vector3 | null => (run.active ? bomber.position : null);

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
      if (swarmQueue > 0) {
        swarmQueue--;
        passTimer = 0.9;                     // the next bomber is right behind
      } else {
        passTimer = CONFIG.poopInterval + (Math.random() * 2 - 1) * CONFIG.poopIntervalVar;
      }
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

/* =========================== ocean life ===========================
   A whale that surfaces for a breath, a shark fin cruising past, floating
   debris, and bottles with messages. All cosmetic, all sporadic. */

/* --- the whale --- */
const whale = new THREE.Group();
{
  const mat = new THREE.MeshLambertMaterial({ color: 0x3d5462 });
  const belly = new THREE.MeshLambertMaterial({ color: 0x9fb4bd });
  const body = new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 10), mat);
  body.scale.set(1.15, 0.95, 2.6);
  whale.add(body);
  const chin = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 8), belly);
  chin.position.set(0, -0.55, 1.1);
  chin.scale.set(0.95, 0.6, 1.6);
  whale.add(chin);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(1.5, 1.6, 4), mat);
  tail.position.set(0, 0.3, -4.4);
  tail.rotation.x = -Math.PI / 2.3;
  tail.scale.set(1.6, 1, 0.25);
  whale.add(tail);
  const fin = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.0, 4), mat);
  fin.position.set(0, 1.3, -1.2);
  fin.scale.z = 0.35;
  whale.add(fin);
  whale.traverse(o => { o.userData.noShadow = true; });
  whale.visible = false;
  whale.name = 'whale';
  scene.add(whale);
}
const whaleState = { active: false, t: 0, cd: 25 + Math.random() * 30, from: new THREE.Vector3(), dir: new THREE.Vector3(), sprayed: false };

function updateWhale(dt: number) {
  const W = whaleState;
  if (!W.active) {
    W.cd -= dt;
    if (W.cd <= 0) {
      W.active = true; W.t = 0; W.sprayed = false;
      const a = Math.random() * Math.PI * 2;
      const r = 35 + Math.random() * 40;
      W.from.set(boat.pos.x + Math.cos(a) * r, 0, boat.pos.z + Math.sin(a) * r);
      const da = Math.random() * Math.PI * 2;
      W.dir.set(Math.sin(da), 0, Math.cos(da));
      whale.visible = true;
    }
    return;
  }
  W.t += dt / 11;                      // an 11-second breach
  if (W.t >= 1) {
    W.active = false;
    whale.visible = false;
    W.cd = 35 + Math.random() * 55;
    return;
  }
  const y = -3.4 + Math.sin(W.t * Math.PI) * 3.8;
  whale.position.set(W.from.x + W.dir.x * W.t * 26, y, W.from.z + W.dir.z * W.t * 26);
  whale.rotation.y = Math.atan2(W.dir.x, W.dir.z);
  whale.rotation.x = -Math.cos(W.t * Math.PI) * 0.3;
  if (!W.sprayed && W.t > 0.42) {     // blowhole at the top of the arc
    W.sprayed = true;
    spawnDroplets(whale.position.x + W.dir.x * 2, whale.position.z + W.dir.z * 2, 8, 1.2, 5.5);
    audio.splash(false);
  }
  if (W.t > 0.2 && W.t < 0.85 && Math.random() < dt * 4) {
    spawnWake(whale.position.x, whale.position.z, whale.rotation.y, 2.2);
  }
}

/* --- the shark --- */
const shark = new THREE.Group();
{
  const mat = new THREE.MeshLambertMaterial({ color: 0x4d5a63 });
  const fin = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.8, 4), mat);
  fin.scale.z = 0.3;
  fin.position.y = 0.32;
  shark.add(fin);
  const back = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), mat);
  back.scale.set(0.5, 0.22, 1.6);
  back.position.y = -0.02;
  shark.add(back);
  shark.traverse(o => { o.userData.noShadow = true; });
  shark.visible = false;
  shark.name = 'shark';
  scene.add(shark);
}
const sharkState = { active: false, t: 0, cd: 18 + Math.random() * 20, from: new THREE.Vector3(), dir: new THREE.Vector3(), rip: 0 };

function updateShark(dt: number) {
  const S = sharkState;
  if (!S.active) {
    S.cd -= dt;
    if (S.cd <= 0) {
      S.active = true; S.t = 0;
      const a = Math.random() * Math.PI * 2;
      const r = 14 + Math.random() * 16;
      S.from.set(boat.pos.x + Math.cos(a) * r, 0, boat.pos.z + Math.sin(a) * r);
      const da = a + Math.PI / 2 + (Math.random() - 0.5) * 0.8;   // roughly circling past
      S.dir.set(Math.sin(da), 0, Math.cos(da));
      shark.visible = true;
    }
    return;
  }
  S.t += dt / 14;
  if (S.t >= 1) {
    S.active = false;
    shark.visible = false;
    S.cd = 25 + Math.random() * 35;
    return;
  }
  shark.position.set(
    S.from.x + S.dir.x * S.t * 60,
    0.02 + Math.sin(S.t * 28) * 0.05,
    S.from.z + S.dir.z * S.t * 60);
  shark.rotation.y = Math.atan2(S.dir.x, S.dir.z) + Math.sin(S.t * 20) * 0.1;
  S.rip -= dt;
  if (S.rip <= 0) {
    S.rip = 0.5;
    spawnWake(shark.position.x, shark.position.z, shark.rotation.y, 0.4);
  }
}

/* --- floating debris + message bottles --- */
const flotsam: { mesh: THREE.Mesh; ph: number }[] = [];
{
  const wood = new THREE.MeshLambertMaterial({ color: 0x7a5232 });
  const spots = [[28, -42], [-38, -88], [52, -140], [-18, -228], [70, -25], [-65, -190]] as const;
  spots.forEach(([x, z], i) => {
    const mesh = i % 2
      ? new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.75, 9), wood)     // barrel
      : new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.5), wood);              // plank
    mesh.position.set(x, 0.1, z);
    mesh.rotation.set(i % 2 ? Math.PI / 2.2 : 0, i * 1.3, 0);
    mesh.userData.noShadow = true;
    scene.add(mesh);
    flotsam.push({ mesh, ph: i * 1.7 });
  });
}
function updateFlotsam(dt: number, t: number) {
  for (const f of flotsam) {
    f.mesh.position.y = 0.08 + Math.sin(t * 1.1 + f.ph) * 0.07;
    f.mesh.rotation.y += dt * 0.06;
  }
}

/* --- shallow-water shoals: little tropical fish circling the sand shelves --- */
const shoalFish: { mesh: THREE.Group; cx: number; cz: number; r: number; sp: number; ph: number; y: number }[] = [];
{
  const cols = [0xffa94d, 0x4dabf7, 0xffd43b, 0x63e6be];
  SHALLOWS.forEach((sh, si) => {
    for (let i = 0; i < 4; i++) {
      const g = new THREE.Group();
      const mat = new THREE.MeshLambertMaterial({ color: cols[(si + i) % cols.length] });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), mat);
      body.scale.set(0.7, 0.8, 1.8);
      g.add(body);
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 4), mat);
      tail.position.z = -0.2;
      tail.rotation.x = -Math.PI / 2;
      g.add(tail);
      g.traverse(o => { o.userData.noShadow = true; });
      scene.add(g);
      shoalFish.push({
        mesh: g, cx: sh.x, cz: sh.z,
        r: sh.r + 3 + (i % 3) * 2.4,
        sp: (0.28 + (i % 2) * 0.14) * ((si + i) % 2 ? 1 : -1),
        ph: i * 1.7 + si * 0.9,
        y: -0.7 - (i % 2) * 0.4,
      });
    }
  });
}
function updateShoals(t: number) {
  for (const f of shoalFish) {
    const a = t * f.sp + f.ph;
    f.mesh.position.set(
      f.cx + Math.cos(a) * f.r,
      f.y + Math.sin(t * 1.3 + f.ph) * 0.12,
      f.cz + Math.sin(a) * f.r);
    // nose along the orbit tangent, with a swimmy wiggle
    f.mesh.rotation.y = -a + (f.sp > 0 ? 0 : Math.PI) + Math.sin(t * 5 + f.ph) * 0.25;
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
  updateWhale(dt);
  updateShark(dt);
  updateFlotsam(dt, t);
  updateShoals(t);
}
