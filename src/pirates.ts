import * as THREE from 'three';
import { clamp, lerp } from './mathUtil';
import type { Char, PirateParts } from './types';

/* ===================================================================
   Goofy pirates: chunky body, huge googly eyes whose pupils lag behind
   every lurch of the boat, brows, potato nose, flailing noodle arms.
   =================================================================== */
export function makePirate(shirtCol: number, hatCol: number, hatStyle: 'captain' | 'bandana'): THREE.Group {
  const g = new THREE.Group();
  const M = (c: number) => new THREE.MeshLambertMaterial({ color: c });
  const parts: PirateParts = { eyes: [], pupils: [], brows: [], arms: [], mouth: null! };
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.5, 4, 12), M(shirtCol));
  body.position.y = 0.6; g.add(body);
  const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.355, 0.355, 0.11, 12), M(0x3a2a1a));
  belt.position.y = 0.45; g.add(belt);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 12), M(0xf2c29b));
  head.position.y = 1.22; g.add(head);
  // googly eyes (model faces +z)
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 8), M(0xffffff));
    eye.position.set(sx * 0.115, 1.3, 0.235); g.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), M(0x14100c));
    pupil.position.set(0, 0, 0.075); eye.add(pupil);
    parts.eyes.push(eye); parts.pupils.push(pupil);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, 0.04), M(0x4a2c18));
    brow.position.set(sx * 0.115, 1.43, 0.26); brow.rotation.z = sx * -0.28;
    g.add(brow); parts.brows.push(brow);
  }
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), M(0xe8a87b));
  nose.position.set(0, 1.2, 0.3); nose.scale.z = 1.3; g.add(nose);
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.03), M(0x5a2c20));
  mouth.position.set(0, 1.07, 0.275); g.add(mouth); parts.mouth = mouth;
  // hats: captain tricorn w/ feather vs bandana w/ tail
  if (hatStyle === 'captain') {
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.22, 10), M(hatCol));
    hat.position.y = 1.48; g.add(hat);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.05, 10), M(hatCol));
    brim.position.y = 1.39; g.add(brim);
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.34, 6), M(0xf0e040));
    feather.position.set(0.2, 1.62, 0); feather.rotation.z = -0.5; g.add(feather);
  } else {
    const wrap = new THREE.Mesh(new THREE.SphereGeometry(0.31, 12, 8), M(hatCol));
    wrap.position.y = 1.32; wrap.scale.y = 0.62; g.add(wrap);
    const knot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.1), M(hatCol));
    knot.position.set(0, 1.34, -0.28); g.add(knot);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.3, 0.05), M(hatCol));
    tail.position.set(0.06, 1.18, -0.34); tail.rotation.z = 0.4; g.add(tail);
  }
  // noodle arms pivoting at the shoulder
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.42, 3, 8), M(shirtCol));
    arm.geometry.translate(0, -0.26, 0);
    arm.position.set(sx * 0.4, 1.0, 0);
    arm.rotation.z = sx * -0.18;
    g.add(arm); parts.arms.push(arm);
  }
  g.userData.parts = parts;
  return g;
}

/* per-frame goofy life: arm poses, lagging googly pupils, blinks, O-mouth */
export function animateChar(c: Char, dt: number, t: number) {
  const P = c.mesh.userData.parts as PirateParts | undefined;
  if (!P) return;
  const k = Math.min(1, 12 * dt);
  const moving = c.animMoving;
  for (let i = 0; i < 2; i++) {
    const arm = P.arms[i], s = i ? 1 : -1;
    let rx = 0, rz = s * -0.18;
    if (c.mode === 'water') { rx = -2.5 + Math.sin(c.walkPhase * 1.7 + i * Math.PI) * 0.95; rz = s * -0.35; }
    else if (c.knock > 0) { rx = -2.7 + Math.sin(t * 11 + i * 2) * 0.45; rz = s * -0.95; }
    else if (c.station) { rx = -1.15; rz = s * -0.05; }
    else if (moving) { rx = Math.sin(c.walkPhase + i * Math.PI) * 0.85; }
    arm.rotation.x = lerp(arm.rotation.x, rx, k);
    arm.rotation.z = lerp(arm.rotation.z, rz, k);
  }
  // pupils on a loose spring: thrown around by acceleration, wander a bit
  const e = (c.eye ??= { px: 0, py: 0, vx: 0, vy: 0, pvx: 0, pvz: 0, blink: 2 + Math.random() * 3, blinkT: 0 });
  const axw = clamp((c.vel.x - e.pvx) / Math.max(dt, 1e-4), -25, 25);
  const azw = clamp((c.vel.z - e.pvz) / Math.max(dt, 1e-4), -25, 25);
  e.pvx = c.vel.x; e.pvz = c.vel.z;
  e.vx += (-axw * 0.004 + Math.sin(t * 1.3 + c.pos.z) * 0.0015 - e.px * 90 - e.vx * 8) * dt;
  e.vy += (-azw * 0.002 + Math.cos(t * 0.9 + c.pos.x) * 0.0015 - e.py * 90 - e.vy * 8) * dt;
  e.px = clamp(e.px + e.vx * dt, -0.042, 0.042);
  e.py = clamp(e.py + e.vy * dt, -0.035, 0.035);
  e.blink -= dt;
  if (e.blink <= 0) { e.blink = 2.2 + Math.random() * 3.5; e.blinkT = 0.13; }
  if (e.blinkT > 0) e.blinkT -= dt;
  const surprised = c.knock > 0 || c.mode === 'water';
  for (let i = 0; i < 2; i++) {
    P.pupils[i].position.set(e.px, e.py, 0.075);
    const sc = surprised ? 1.35 : 1;
    P.eyes[i].scale.x = lerp(P.eyes[i].scale.x, sc, k);
    P.eyes[i].scale.z = lerp(P.eyes[i].scale.z, sc, k);
    P.eyes[i].scale.y = e.blinkT > 0 ? 0.12 : lerp(P.eyes[i].scale.y, sc, k);
    P.brows[i].position.y = lerp(P.brows[i].position.y, surprised ? 1.47 : 1.43, k);
  }
  P.mouth.scale.x = lerp(P.mouth.scale.x, surprised ? 0.55 : 1, k);
  P.mouth.scale.y = lerp(P.mouth.scale.y, surprised ? 3.2 : 1, k);
}
