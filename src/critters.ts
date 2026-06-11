import * as THREE from 'three';
import { DECK_Y } from './config';
import { boat, charActive, chars, layout, netRole } from './state';
import { gulls, scene } from './scene';
import { heelGroup } from './shipMesh';
import { spawnDroplets } from './effects';
import { worldToLocal2 } from './simChars';
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
    f.t += dt / 0.95;                     // ~1 s arc
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
    f.mesh.rotation.x = -Math.cos(f.t * Math.PI) * 0.9;   // nose up then dive
  }
}

/* =========================== seagulls with opinions =========================== */
/* the boat-follower gull swoops low over the deck and occasionally bombs it */
interface Poop { mesh: THREE.Mesh; vy: number; active: boolean; }
const poops: Poop[] = [];
{
  const mat = new THREE.MeshBasicMaterial({ color: 0xf5f6f0 });
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), mat);
    m.visible = false;
    m.userData.noShadow = true;
    scene.add(m);
    poops.push({ mesh: m, vy: 0, active: false });
  }
}
/* splat decals live on the deck (boat-local) and fade out */
interface Splat { mesh: THREE.Mesh; life: number; }
const splats: Splat[] = [];
const splatGeo = new THREE.CircleGeometry(0.22, 10);
splatGeo.rotateX(-Math.PI / 2);
{
  for (let i = 0; i < 8; i++) {
    const m = new THREE.Mesh(splatGeo,
      new THREE.MeshBasicMaterial({ color: 0xf2f3ea, transparent: true, opacity: 0.95, depthWrite: false }));
    m.visible = false;
    m.userData.noShadow = true;
    heelGroup.add(m);
    splats.push({ mesh: m, life: 0 });
  }
}
let splatIdx = 0;
let poopTimer = 9;
let cryTimer = 5;

/* fx relay so the matey sees the same splat (registered by net.ts) */
let fxRelay: ((x: number, z: number) => void) | null = null;
export function setFxRelay(fn: (x: number, z: number) => void) { fxRelay = fn; }

export function placeSplat(lx: number, lz: number) {
  const s = splats[splatIdx++ % splats.length];
  s.mesh.visible = true;
  s.mesh.position.set(lx, DECK_Y + 0.012, lz);
  s.mesh.rotation.y = Math.random() * Math.PI;
  s.mesh.scale.setScalar(0.8 + Math.random() * 0.5);
  (s.mesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
  s.life = 25;
  audio.splat();
}

function dropPoop(from: THREE.Vector3) {
  const p = poops.find(x => !x.active);
  if (!p) return;
  p.active = true;
  p.mesh.visible = true;
  p.mesh.position.copy(from);
  p.vy = -1.5;
}

function updatePoops(dt: number) {
  // gull #4 follows the boat: vary its orbit so it swoops right over the deck
  poopTimer -= dt;
  cryTimer -= dt;
  const gull = gulls[4];
  if (gull) {
    gull.r = 5 + (Math.sin(performance.now() * 0.00013) * 0.5 + 0.5) * 11;
    const distToBoat = Math.hypot(gull.g.position.x - boat.pos.x, gull.g.position.z - boat.pos.z);
    if (cryTimer <= 0 && distToBoat < 40) {
      cryTimer = 6 + Math.random() * 9;
      audio.gullCry();
    }
    if (netRole !== 'guest' && poopTimer <= 0 && distToBoat < 11) {
      poopTimer = 9 + Math.random() * 14;
      dropPoop(gull.g.position);
    }
  }
  for (const p of poops) {
    if (!p.active) continue;
    p.vy -= 9 * dt;
    p.mesh.position.y += p.vy * dt;
    const deckWorldY = DECK_Y + 0.3;     // close enough — comedy physics
    if (p.mesh.position.y <= deckWorldY) {
      p.active = false;
      p.mesh.visible = false;
      const lp = worldToLocal2({ x: p.mesh.position.x, z: p.mesh.position.z });
      if (Math.abs(lp.x) < layout.deckX + 0.2 && Math.abs(lp.z) < layout.deckZ + 0.3) {
        placeSplat(lp.x, lp.z);
        if (fxRelay) fxRelay(lp.x, lp.z);
        // direct hit on a pirate?
        const victim = chars.find(c => charActive(c) && c.mode === 'deck' &&
          Math.hypot(c.pos.x - lp.x, c.pos.z - lp.z) < 0.85);
        if (victim) toast(victim.name + ' got decorated by the gull!', '#f8f9fa');
        else toast('The gull got the deck…', '#dee2e6');
      } else if (p.mesh.position.y < 0.3) {
        spawnDroplets(p.mesh.position.x, p.mesh.position.z, 2, 0.8, 1.2);
      }
    }
  }
  for (const s of splats) {
    if (!s.mesh.visible) continue;
    s.life -= dt;
    if (s.life < 5) (s.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, s.life / 5) * 0.95;
    if (s.life <= 0) s.mesh.visible = false;
  }
}

export function updateCritters(dt: number) {
  updateFish(dt);
  updatePoops(dt);
}
