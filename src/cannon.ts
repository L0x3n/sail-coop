import * as THREE from 'three';
import { CONFIG } from './config';
import { clamp } from './mathUtil';
import { boat, chars, charActive, layout, netRole, owned, session } from './state';
import { scene, gulls } from './scene';
import { cannonGroup, cannonPivot } from './shipMesh';
import { bomberPos, gullSwarm } from './critters';
import { obstacles } from './world';
import { spawnSplash, spawnWake } from './effects';
import { toast } from './hud';
import * as audio from './audio';
import type { Char } from './types';

/* ===================================================================
   The cannon. Bought as pure mischief (law 2: it must never be USEFUL).
   A/D traverses, W/S elevates, LMB fires. Hitting a seagull is the one
   thing it is good at — and the flock remembers.
   =================================================================== */
export const CANNON_BASE = -Math.PI / 2;          // straight out over the port rail
export const cannon = {
  yaw: CANNON_BASE,      // boat-local muzzle heading
  pitch: 0.22,
  reload: 0,
};

/* --- cannonballs (host-simulated; guests fly cosmetic copies) --- */
interface Ball { active: boolean; p: THREE.Vector3; v: THREE.Vector3; mesh: THREE.Mesh; }
export const balls: Ball[] = [];
{
  const mat = new THREE.MeshLambertMaterial({ color: 0x23272b });
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), mat);
    m.visible = false;
    m.userData.noShadow = true;
    scene.add(m);
    balls.push({ active: false, p: new THREE.Vector3(), v: new THREE.Vector3(), mesh: m });
  }
}

/* --- powder smoke puffs (cosmetic, both sides) --- */
interface Puff { t: number; mesh: THREE.Mesh; }
const puffs: Puff[] = [];
{
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6),
      new THREE.MeshLambertMaterial({ color: 0xdfe3e6, transparent: true, opacity: 0.65, depthWrite: false }));
    m.visible = false;
    m.userData.noShadow = true;
    scene.add(m);
    puffs.push({ t: -1, mesh: m });
  }
}
function puffAt(p: THREE.Vector3, big = false) {
  const f = puffs.find(x => x.t < 0);
  if (!f) return;
  f.t = 0;
  f.mesh.visible = true;
  f.mesh.position.copy(p);
  f.mesh.scale.setScalar(big ? 1.4 : 0.8);
}

let boomRelay: ((x: number, y: number, z: number, vx: number, vy: number, vz: number) => void) | null = null;
export function setBoomRelay(fn: typeof boomRelay) { boomRelay = fn; }

const _muzzle = new THREE.Vector3(), _dir = new THREE.Vector3();
function muzzleWorld(): { p: THREE.Vector3; d: THREE.Vector3 } {
  cannonPivot.updateWorldMatrix(true, false);
  _muzzle.set(0, 0, 0.9).applyMatrix4(cannonPivot.matrixWorld);
  _dir.set(0, 0, 1).transformDirection(cannonPivot.matrixWorld);
  return { p: _muzzle, d: _dir };
}

function launch(px: number, py: number, pz: number, vx: number, vy: number, vz: number) {
  const b = balls.find(x => !x.active);
  if (!b) return;
  b.active = true;
  b.p.set(px, py, pz);
  b.v.set(vx, vy, vz);
  b.mesh.visible = true;
  b.mesh.position.copy(b.p);
}

export function fireCannon(c: Char) {
  if (!owned.cannon || cannon.reload > 0 || c.station !== 'cannon') return;
  cannon.reload = CONFIG.cannonReload;
  const { p, d } = muzzleWorld();
  const vx = d.x * CONFIG.cannonSpeed + boat.vel.x;
  const vy = d.y * CONFIG.cannonSpeed;
  const vz = d.z * CONFIG.cannonSpeed + boat.vel.z;
  launch(p.x, p.y, p.z, vx, vy, vz);
  puffAt(p, true);
  audio.boom();
  session.shake = Math.max(session.shake, 0.4);
  // recoil: the hull lurches away and yaws a touch (small boat, big bang)
  const m = 1 / Math.max(1, layout.scale);
  boat.vel.x -= d.x * CONFIG.cannonRecoil * m;
  boat.vel.z -= d.z * CONFIG.cannonRecoil * m;
  boat.angVel += (Math.random() - 0.5) * 0.06 * m;
  // anyone loitering behind the breech eats the carriage
  for (const o of chars) {
    if (o === c || !charActive(o) || o.mode !== 'deck') continue;
    const bx = layout.cannonSta.x - Math.sin(cannon.yaw) * 0.6;
    const bz = layout.cannonSta.z - Math.cos(cannon.yaw) * 0.6;
    if (Math.hypot(o.pos.x - bx, o.pos.z - bz) < CONFIG.cannonBreech) {
      o.knock = Math.max(o.knock, 1.0);
      o.vel.x -= Math.sin(cannon.yaw) * 3.0;
      o.vel.z -= Math.cos(cannon.yaw) * 3.0;
      toast(o.name + ' stood behind the cannon!', '#ff8a7a');
    }
  }
  if (boomRelay) boomRelay(p.x, p.y, p.z, vx, vy, vz);
}

/* guest: a fired shot arrives over the wire — fly the cosmetic copy */
export function applyBoom(x: number, y: number, z: number, vx: number, vy: number, vz: number) {
  launch(x, y, z, vx, vy, vz);
  puffAt(_muzzle.set(x, y, z), true);
  audio.boom();
  session.shake = Math.max(session.shake, 0.3);
}

let revengeT = -1;

/* host-side simulation (solo + host) */
export function updateCannon(dt: number) {
  if (cannon.reload > 0) cannon.reload = Math.max(0, cannon.reload - dt);
  stepBalls(dt, true);
  if (revengeT > 0) {
    revengeT -= dt;
    if (revengeT <= 0) {
      revengeT = -1;
      gullSwarm(5 + ((Math.random() * 3) | 0));
      toast('The flock REMEMBERS.', '#ff8787');
    }
  }
}

function stepBalls(dt: number, withOutcomes: boolean) {
  for (const b of balls) {
    if (!b.active) continue;
    b.v.y -= 9.8 * dt;
    b.p.addScaledVector(b.v, dt);
    b.mesh.position.copy(b.p);
    // the sea catches everything eventually
    if (b.p.y <= 0) {
      b.active = false;
      b.mesh.visible = false;
      spawnSplash(b.p.x, b.p.z, true);
      spawnWake(b.p.x, b.p.z, 0, 1.2);
      audio.splash(true);
      continue;
    }
    if (!withOutcomes) continue;
    // seagulls: the one thing this gun is good at (generous — it is a comedy gun)
    let hitGull = false;
    const bp = bomberPos();
    if (bp && b.p.distanceTo(bp) < 2.6) hitGull = true;
    if (!hitGull) {
      for (const gl of gulls) {
        if (b.p.distanceTo(gl.g.position) < 2.2) { hitGull = true; break; }
      }
    }
    if (hitGull) {
      b.active = false;
      b.mesh.visible = false;
      puffAt(b.p);
      audio.gullCry();
      toast('DIRECT HIT on a seagull!', '#ffd95e');
      revengeT = 3.5;
      continue;
    }
    // islands & rocks go "whud"
    for (const o of obstacles) {
      if (b.p.y < 7 && Math.hypot(b.p.x - o.x, b.p.z - o.z) < o.r) {
        b.active = false;
        b.mesh.visible = false;
        puffAt(b.p);
        audio.thwack();
        break;
      }
    }
    if (b.active && Math.hypot(b.p.x - boat.pos.x, b.p.z - boat.pos.z) > 170) {
      b.active = false;
      b.mesh.visible = false;
    }
  }
}

/* visuals + cosmetic flight (both sides, every frame) */
export function updateCannonVisuals(dt: number) {
  if (cannonGroup) {
    cannonGroup.visible = owned.cannon;
    cannonGroup.rotation.y = cannon.yaw;
    cannonPivot.rotation.x = -cannon.pitch;
  }
  if (netRole === 'guest') stepBalls(dt, false);
  for (const f of puffs) {
    if (f.t < 0) continue;
    f.t += dt;
    if (f.t > 0.8) { f.t = -1; f.mesh.visible = false; continue; }
    const k = f.t / 0.8;
    f.mesh.scale.setScalar(f.mesh.scale.x + dt * 3.2);
    (f.mesh.material as THREE.MeshLambertMaterial).opacity = 0.65 * (1 - k);
    f.mesh.position.y += dt * 0.8;
  }
}

export function resetCannon() {
  cannon.yaw = CANNON_BASE;
  cannon.pitch = 0.22;
  cannon.reload = 0;
  revengeT = -1;
  for (const b of balls) { b.active = false; b.mesh.visible = false; }
  for (const f of puffs) { f.t = -1; f.mesh.visible = false; }
}
