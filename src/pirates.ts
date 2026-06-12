import * as THREE from 'three';
import { clamp, headVec, lerp, wrapPi } from './mathUtil';
import type { Char, PirateParts, RagChannel, RagState } from './types';

/* ===================================================================
   Goofy pirates with a fake ragdoll.
   Rig:  mesh ─ rig ─ torso (hip pivot) ─ headBone (neck pivot)
                 │        ├ arms (shoulder pivots)
                 ├ legs   └ face + hat ride on the headBone
   Every pose channel runs through a damped spring, so knockdowns,
   mop-bonks, throws and carries all FLOP. Gang Beasts rules.
   =================================================================== */
export function makePirate(shirtCol: number, hatCol: number, hatStyle: 'captain' | 'bandana'): THREE.Group {
  const g = new THREE.Group();
  const M = (c: number) => new THREE.MeshLambertMaterial({ color: c });
  const parts: PirateParts = {
    eyes: [], pupils: [], brows: [], arms: [], legs: [],
    mouth: null!, rig: null!, torso: null!, headBone: null!,
  };

  const rig = new THREE.Group();
  g.add(rig);
  parts.rig = rig;

  // stubby legs (hip-pivoted) — mostly for kicking around while ragdolled
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.105, 0.26, 3, 6), M(0x3a2a1a));
    leg.geometry.translate(0, -0.17, 0);
    leg.position.set(sx * 0.15, 0.34, 0);
    rig.add(leg);
    parts.legs.push(leg);
  }

  // torso pivots at the hips
  const torso = new THREE.Group();
  torso.position.y = 0.42;
  rig.add(torso);
  parts.torso = torso;
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.5, 4, 12), M(shirtCol));
  body.position.y = 0.18;
  torso.add(body);
  const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.355, 0.355, 0.11, 12), M(0x3a2a1a));
  belt.position.y = 0.03;
  torso.add(belt);

  // noodle arms on shoulder pivots
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.42, 3, 8), M(shirtCol));
    arm.geometry.translate(0, -0.26, 0);
    arm.position.set(sx * 0.4, 0.58, 0);
    arm.rotation.z = sx * -0.18;
    torso.add(arm);
    parts.arms.push(arm);
  }

  // head + face + hat all swing from the neck
  const headBone = new THREE.Group();
  headBone.position.y = 0.66;
  torso.add(headBone);
  parts.headBone = headBone;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 12), M(0xf2c29b));
  head.position.y = 0.14;
  headBone.add(head);
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 8), M(0xffffff));
    eye.position.set(sx * 0.115, 0.22, 0.235);
    headBone.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), M(0x14100c));
    pupil.position.set(0, 0, 0.075);
    eye.add(pupil);
    parts.eyes.push(eye); parts.pupils.push(pupil);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, 0.04), M(0x4a2c18));
    brow.position.set(sx * 0.115, 0.35, 0.26);
    brow.rotation.z = sx * -0.28;
    headBone.add(brow);
    parts.brows.push(brow);
  }
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), M(0xe8a87b));
  nose.position.set(0, 0.12, 0.3);
  nose.scale.z = 1.3;
  headBone.add(nose);
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.03), M(0x5a2c20));
  mouth.position.set(0, -0.01, 0.275);
  headBone.add(mouth);
  parts.mouth = mouth;
  if (hatStyle === 'captain') {
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.22, 10), M(hatCol));
    hat.position.y = 0.40;
    headBone.add(hat);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.05, 10), M(hatCol));
    brim.position.y = 0.31;
    headBone.add(brim);
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.34, 6), M(0xf0e040));
    feather.position.set(0.2, 0.54, 0);
    feather.rotation.z = -0.5;
    headBone.add(feather);
  } else {
    const wrap = new THREE.Mesh(new THREE.SphereGeometry(0.31, 12, 8), M(hatCol));
    wrap.position.y = 0.24;
    wrap.scale.y = 0.62;
    headBone.add(wrap);
    const knot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.1), M(hatCol));
    knot.position.set(0, 0.26, -0.28);
    headBone.add(knot);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.3, 0.05), M(hatCol));
    tail.position.set(0.06, 0.10, -0.34);
    tail.rotation.z = 0.4;
    headBone.add(tail);
  }
  g.userData.parts = parts;
  return g;
}

/* ---------------- spring machinery ---------------- */
const ch = (): RagChannel => ({ a: 0, v: 0 });
function initRag(): RagState {
  return {
    torsoX: ch(), torsoZ: ch(), headX: ch(), headZ: ch(),
    armLX: ch(), armLZ: ch(), armRX: ch(), armRZ: ch(),
    legL: ch(), legR: ch(), rigY: ch(),
    spin: 0, spinV: 0,
    wasKnocked: false, flopDir: 1, flopRoll: 0,
  };
}
function spr(c: RagChannel, target: number, k: number, d: number, dt: number): number {
  c.v += (k * (target - c.a) - d * c.v) * dt;
  c.a += c.v * dt;
  return c.a;
}

/* per-frame goofy life: spring-driven poses, lagging googly pupils, blinks */
export function animateChar(c: Char, dt: number, t: number) {
  const P = c.mesh.userData.parts as PirateParts | undefined;
  if (!P || !P.rig) return;
  const rag = (c.rag ??= initRag());
  const lk = Math.min(1, 12 * dt);
  const moving = c.animMoving;
  const knocked = c.knock > 0;
  const carried = c.grabbedBy >= 0;
  const airborne = c.mode === 'deck' && c.jumpY > 0.04;
  const flying = knocked && airborne;            // mid-throw cartwheel

  /* knockdown impulse: throw the springs around once, on entry */
  if (knocked && !rag.wasKnocked) {
    const f = headVec(c.facing);
    const fwdV = c.vel.x * f.x + c.vel.z * f.z;
    const latV = c.vel.x * f.z - c.vel.z * f.x;
    rag.flopDir = Math.abs(fwdV) > 0.6 ? (fwdV > 0 ? 1 : -1) : (Math.random() < 0.5 ? 1 : -1);
    rag.flopRoll = (Math.random() - 0.5) * 1.1;
    rag.torsoX.v += rag.flopDir * (2.5 + Math.abs(fwdV) * 0.5) + (Math.random() - 0.5) * 2;
    rag.torsoZ.v += clamp(-latV * 0.5, -3, 3) + (Math.random() - 0.5) * 3;
    rag.headX.v += (Math.random() - 0.5) * 8;
    rag.headZ.v += (Math.random() - 0.5) * 8;
    rag.armLX.v += (Math.random() - 0.5) * 14;
    rag.armRX.v += (Math.random() - 0.5) * 14;
    rag.armLZ.v += (Math.random() - 0.5) * 10;
    rag.armRZ.v += (Math.random() - 0.5) * 10;
    rag.legL.v += (Math.random() - 0.5) * 12;
    rag.legR.v += (Math.random() - 0.5) * 12;
    // (no cartwheels — flops only)
  }
  rag.wasKnocked = knocked;

  /* pose targets + spring stiffness per state */
  let K = 90, D = 13;                            // snappy daily life
  let tTorsoX = 0, tTorsoZ = 0, tHeadX = 0, tHeadZ = 0, tRigY = 0;
  let tArmLX = 0, tArmLZ = 0.18, tArmRX = 0, tArmRZ = -0.18;
  let tLegL = 0, tLegR = 0;

  if (c.mode === 'water') {
    K = knocked ? 18 : 40; D = knocked ? 3.5 : 7;
    tTorsoX = 1.18;                              // prone paddling
    tHeadX = -0.55;                              // chin up out of the water
    tRigY = -0.25;
    tArmLX = -2.5 + Math.sin(c.walkPhase * 1.7) * 0.95;
    tArmRX = -2.5 + Math.sin(c.walkPhase * 1.7 + Math.PI) * 0.95;
    tArmLZ = 0.35; tArmRZ = -0.35;
    tLegL = Math.sin(t * 9) * 0.5;               // flutter kick
    tLegR = Math.sin(t * 9 + Math.PI) * 0.5;
  } else if (carried) {
    K = 13; D = 3.0;                             // fully limp
    tTorsoX = 0.55;
    tHeadX = 0.35;
    tHeadZ = Math.sin(t * 1.6) * 0.45;           // head lolls side to side
    tArmLX = -0.5 + Math.sin(t * 2.1) * 0.25;
    tArmRX = -0.5 + Math.sin(t * 2.1 + 1.3) * 0.25;
    tArmLZ = 0.55; tArmRZ = -0.55;
    tLegL = 0.45 + Math.sin(t * 2.4) * 0.3;      // dangling
    tLegR = 0.45 + Math.sin(t * 2.4 + Math.PI) * 0.3;
  } else if (knocked) {
    K = flying ? 16 : 26; D = flying ? 2.6 : 4.0; // floppy
    tTorsoX = rag.flopDir * 1.45;
    tTorsoZ = rag.flopRoll;
    tHeadX = -rag.flopDir * 0.5;                 // head lifts off the deck, groaning
    tHeadZ = Math.sin(t * 3.1) * 0.2;
    tRigY = flying ? 0 : -0.30;
    tArmLX = -2.2 + Math.sin(t * 7) * 0.3;
    tArmRX = -2.4 + Math.sin(t * 7 + 2) * 0.3;
    tArmLZ = 1.0; tArmRZ = -1.0;                 // splayed
    tLegL = 0.85 + Math.sin(t * 5) * 0.15;
    tLegR = -0.7 + Math.sin(t * 5 + 1) * 0.15;
  } else if (c.station) {
    tTorsoX = 0.06;
    tArmLX = -1.15; tArmRX = -1.15;
    tArmLZ = 0.08; tArmRZ = -0.08;
    tLegL = 0.12; tLegR = -0.12;                 // braced stance
  } else if (c.scrubT > 0) {
    K = 60; D = 10;
    tTorsoX = 0.38;                              // bent over the deck
    tHeadX = 0.25;
    tArmLX = -0.7 + Math.sin(t * 16) * 0.5;
    tArmRX = -0.7 + Math.sin(t * 16 + Math.PI) * 0.5;
    tLegL = -0.15; tLegR = 0.15;
  } else {
    // idle / walking: lean into your motion, swing limbs, breathe
    const f = headVec(c.facing);
    const fwdV = c.vel.x * f.x + c.vel.z * f.z;
    const latV = c.vel.x * f.z - c.vel.z * f.x;
    tTorsoX = clamp(fwdV * 0.055, -0.3, 0.3) + Math.sin(t * 1.8) * 0.02;
    tTorsoZ = clamp(latV * 0.05, -0.25, 0.25);
    tHeadX = -tTorsoX * 0.45;                    // head stays levelish
    tHeadZ = -tTorsoZ * 0.45;
    if (moving) {
      tArmLX = Math.sin(c.walkPhase) * 0.85;
      tArmRX = Math.sin(c.walkPhase + Math.PI) * 0.85;
      tLegL = Math.sin(c.walkPhase + Math.PI) * 0.6;
      tLegR = Math.sin(c.walkPhase) * 0.6;
    }
  }

  /* run the springs */
  P.torso.rotation.x = clamp(spr(rag.torsoX, tTorsoX, K, D, dt), -1.8, 1.8);
  P.torso.rotation.z = clamp(spr(rag.torsoZ, tTorsoZ, K, D, dt), -1.6, 1.6);
  P.headBone.rotation.x = clamp(spr(rag.headX, tHeadX, K * 0.8, D * 0.8, dt), -1.1, 1.1);
  P.headBone.rotation.z = clamp(spr(rag.headZ, tHeadZ, K * 0.8, D * 0.8, dt), -1.1, 1.1);
  P.arms[0].rotation.x = spr(rag.armLX, tArmLX, K, D, dt);
  P.arms[0].rotation.z = spr(rag.armLZ, tArmLZ, K, D, dt);
  P.arms[1].rotation.x = spr(rag.armRX, tArmRX, K, D, dt);
  P.arms[1].rotation.z = spr(rag.armRZ, tArmRZ, K, D, dt);
  P.legs[0].rotation.x = spr(rag.legL, tLegL, K, D, dt);
  P.legs[1].rotation.x = spr(rag.legR, tLegR, K, D, dt);
  P.rig.position.y = spr(rag.rigY, tRigY, 55, 9, dt);

  /* airborne cartwheels; unwind softly on landing */
  if (flying) {
    rag.spin += rag.spinV * dt;
    rag.spinV *= Math.exp(-0.4 * dt);
  } else {
    rag.spin = wrapPi(rag.spin);
    rag.spinV += (-30 * rag.spin - 7 * rag.spinV) * dt;
    rag.spin += rag.spinV * dt;
  }
  P.rig.rotation.x = rag.spin;

  /* googly pupils on a loose spring (unchanged charm) */
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
  const surprised = knocked || carried || c.mode === 'water';
  for (let i = 0; i < 2; i++) {
    P.pupils[i].position.set(e.px, e.py, 0.075);
    const sc = surprised ? 1.35 : 1;
    P.eyes[i].scale.x = lerp(P.eyes[i].scale.x, sc, lk);
    P.eyes[i].scale.z = lerp(P.eyes[i].scale.z, sc, lk);
    P.eyes[i].scale.y = e.blinkT > 0 ? 0.12 : lerp(P.eyes[i].scale.y, sc, lk);
    P.brows[i].position.y = lerp(P.brows[i].position.y, surprised ? 0.39 : 0.35, lk);
  }
  P.mouth.scale.x = lerp(P.mouth.scale.x, surprised ? 0.55 : 1, lk);
  P.mouth.scale.y = lerp(P.mouth.scale.y, surprised ? 3.2 : 1, lk);
}
