import * as THREE from 'three';
import { CONFIG } from './config';
import { clamp, headVec, lerp, rightVec, v2, wrapPi } from './mathUtil';
import { boat, layout, owned, prefs } from './state';
import { scene } from './scene';
import { makePlankTexture } from './textures';
import { crates } from './cargo';
import { localToWorld2 } from './simChars';
import { spawnSplash, spawnWake } from './effects';
import { obstacles } from './world';
import { toast } from './hud';
import * as audio from './audio';
import type { Char } from './types';

/* ===================================================================
   The barge: +6 crates on a greedy trailer. It steers ITSELF (pendulum
   fishtail on the tow rope), tugs the stern around, and capsizes if you
   swing it too hard — dumping everything. Law 2, cubed.
   =================================================================== */
export const barge = {
  pos: v2(0, 0),
  vel: v2(0, 0),
  yaw: 0,
  roll: 0,          // lateral swing roll; past bargeCapsizeRoll = over she goes
  capsized: 0,      // seconds left floating keel-up
};
export const bargeActive = () => owned.barge && prefs.barge;

/* 6 stow slots on the barge deck (barge-local x/z) */
const SLOTS: { x: number; z: number }[] = [];
for (let i = 0; i < 6; i++) SLOTS.push({ x: (i % 2 ? 0.5 : -0.5), z: (Math.floor(i / 2) - 1) * 1.0 });
export const slotLocal = (i: number) => SLOTS[i];
export function slotWorld(i: number) {
  const f = headVec(barge.yaw), r = rightVec(barge.yaw);
  const s = SLOTS[i];
  return v2(barge.pos.x + r.x * s.x + f.x * s.z, barge.pos.z + r.z * s.x + f.z * s.z);
}
export const bargeCrates = () => crates.filter(cr => cr.s === 5);
export function freeSlot(): number {
  for (let i = 0; i < 6; i++) if (!crates.some(cr => cr.s === 5 && cr.x === i)) return i;
  return -1;
}
/* can this character reach the barge from where they stand? */
export function nearBarge(c: Char): boolean {
  const w = c.mode === 'deck' ? localToWorld2(c.pos) : c.pos;
  return Math.hypot(w.x - barge.pos.x, w.z - barge.pos.z) < 3.2;
}
export function stowCrate(c: Char) {
  if (c.carry < 0) return;
  const slot = freeSlot();
  if (slot < 0 || barge.capsized > 0 || !nearBarge(c)) return;
  const cr = crates[c.carry];
  c.carry = -1;
  cr.carrier = -1;
  cr.s = 5;
  cr.x = slot;     // state 5: x carries the slot index
  cr.z = 0;
  cr.vx = 0; cr.vz = 0;
  cr.lashed = false;
  audio.creak(0.6);
}

/* --- meshes --- */
export const bargeGroup = new THREE.Group();   // cargo meshes parent here (cargo.ts)
let ropeMesh: THREE.Mesh;
{
  const tex = makePlankTexture('#8a5a33', '#5d3a20');
  tex.repeat.set(1, 2);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, 3.4),
    new THREE.MeshLambertMaterial({ map: tex }));
  deck.position.y = 0.12;
  deck.castShadow = true;
  bargeGroup.add(deck);
  const trim = new THREE.MeshLambertMaterial({ color: 0x5d3a20 });
  for (const sx of [-0.95, 0.95]) {
    const skid = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.34, 3.5), trim);
    skid.position.set(sx, 0.0, 0);
    bargeGroup.add(skid);
  }
  for (const sz of [-1.7, 1.7]) {
    const end = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.22, 0.16), trim);
    end.position.set(0, 0.3, sz);
    bargeGroup.add(end);
  }
  const cleat = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 6), trim);
  cleat.position.set(0, 0.36, 1.62);
  bargeGroup.add(cleat);
  bargeGroup.visible = false;
  scene.add(bargeGroup);
  ropeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1, 5),
    new THREE.MeshLambertMaterial({ color: 0x4a3826 }));
  ropeMesh.userData.noShadow = true;
  ropeMesh.visible = false;
  scene.add(ropeMesh);
}

const sternWorld = () => localToWorld2(v2(0, -layout.hullL / 2 - 0.15));

export function resetBarge() {
  const stern = sternWorld();
  const f = headVec(boat.yaw);
  barge.pos.x = stern.x - f.x * CONFIG.bargeRope * 0.85;
  barge.pos.z = stern.z - f.z * CONFIG.bargeRope * 0.85;
  barge.vel.x = 0; barge.vel.z = 0;
  barge.yaw = boat.yaw;
  barge.roll = 0;
  barge.capsized = 0;
}

function capsize() {
  barge.capsized = CONFIG.bargeRightT;
  const dumped = bargeCrates();
  for (const cr of dumped) {
    const w = slotWorld(cr.x);
    cr.s = 3;
    cr.x = w.x; cr.z = w.z;
    cr.floatT = 15;
    spawnSplash(w.x, w.z, false);
  }
  spawnSplash(barge.pos.x, barge.pos.z, true);
  audio.splash(true);
  toast('THE BARGE CAPSIZED!' + (dumped.length ? ' ' + dumped.length + ' crates overboard!' : ''), '#ff8787');
}

/* --- host-side simulation --- */
export function updateBarge(dt: number) {
  if (!bargeActive()) return;
  const stern = sternWorld();
  let dx = barge.pos.x - stern.x, dz = barge.pos.z - stern.z;
  const dist = Math.hypot(dx, dz) || 1;
  dx /= dist; dz /= dist;
  // the tow rope only PULLS (slack rope does nothing)
  if (dist > CONFIG.bargeRope) {
    const pull = (dist - CONFIG.bargeRope) * CONFIG.bargePull;
    barge.vel.x -= dx * pull * dt;
    barge.vel.z -= dz * pull * dt;
    // ...and the stern feels it: dead weight + a yaw tug when the barge swings wide
    boat.vel.x += dx * pull * CONFIG.bargeDragBack * dt;
    boat.vel.z += dz * pull * CONFIG.bargeDragBack * dt;
    const r = rightVec(boat.yaw);
    const lat = dx * r.x + dz * r.z;            // sideways component at the stern
    boat.angVel += lat * pull * CONFIG.bargeYawTug * dt;
  }
  // water drag split along the barge's own heading — LOW lateral damping = fishtail
  const f = headVec(barge.yaw), r = rightVec(barge.yaw);
  let vF = barge.vel.x * f.x + barge.vel.z * f.z;
  let vL = barge.vel.x * r.x + barge.vel.z * r.z;
  vF -= vF * Math.min(1, 0.55 * dt);
  vL -= vL * Math.min(1, CONFIG.bargeLatDamp * dt);
  barge.vel.x = f.x * vF + r.x * vL;
  barge.vel.z = f.z * vF + r.z * vL;
  barge.pos.x += barge.vel.x * dt;
  barge.pos.z += barge.vel.z * dt;
  // bow chases the rope
  const tgt = Math.atan2(stern.x - barge.pos.x, stern.z - barge.pos.z);
  barge.yaw = wrapPi(barge.yaw + clamp(wrapPi(tgt - barge.yaw), -1, 1) * 1.7 * dt);
  // can't drift through rocks or islands
  for (const o of obstacles) {
    const ox = barge.pos.x - o.x, oz = barge.pos.z - o.z, od = Math.hypot(ox, oz);
    const rr = o.r - 0.4;
    if (od < rr && od > 0) { barge.pos.x = o.x + ox / od * rr; barge.pos.z = o.z + oz / od * rr; }
  }
  // swing roll from lateral speed; too much and she goes over
  const tgtRoll = clamp(-vL * 0.16, -1.1, 1.1);
  barge.roll = lerp(barge.roll, tgtRoll, Math.min(1, 4 * dt));
  if (barge.capsized > 0) {
    barge.capsized -= dt;
    if (barge.capsized <= 0) {
      barge.capsized = 0;
      barge.roll = 0;
      toast('The barge rolled upright again.', '#aef7a2');
    }
  } else if (Math.abs(barge.roll) > CONFIG.bargeCapsizeRoll && len(barge.vel) > 2.0) {
    capsize();
  }
  // wake while being dragged along
  if (len(barge.vel) > 1.5 && Math.random() < dt * 6) {
    spawnWake(barge.pos.x, barge.pos.z, barge.yaw, 0.9);
  }
}
const len = (v: { x: number; z: number }) => Math.hypot(v.x, v.z);

/* --- visuals (both sides) --- */
export function updateBargeVisual(t: number) {
  const on = bargeActive();
  bargeGroup.visible = on;
  ropeMesh.visible = on;
  if (!on) return;
  const bobY = 0.06 + Math.sin(t * 1.7 + barge.pos.x * 0.3) * 0.05;
  bargeGroup.position.set(barge.pos.x, bobY, barge.pos.z);
  bargeGroup.rotation.set(
    Math.sin(t * 1.3) * 0.02,
    barge.yaw,
    barge.capsized > 0 ? Math.PI : barge.roll);
  // stretch the tow rope from the stern cleat to the barge bow
  const stern = sternWorld();
  const f = headVec(barge.yaw);
  const bowX = barge.pos.x + f.x * 1.6, bowZ = barge.pos.z + f.z * 1.6;
  const mx = (stern.x + bowX) / 2, mz = (stern.z + bowZ) / 2;
  const ddx = bowX - stern.x, ddz = bowZ - stern.z;
  const d = Math.hypot(ddx, ddz) || 1;
  ropeMesh.position.set(mx, 0.45, mz);
  ropeMesh.scale.y = d;
  ropeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(ddx / d, 0, ddz / d));
}
