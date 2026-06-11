import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { clamp, headVec, wrapPi } from './mathUtil';
import { charActive, chars, layout } from './state';
import { heelGroup } from './shipMesh';
import { charAxes, releaseStation } from './simChars';
import { mopSplat, nearestSplat } from './critters';
import { toast } from './hud';
import type { Char } from './types';

/* ===================================================================
   Hands (F): mop pickup/scrub/drop + grabbing and throwing the other
   pirate. All simulated host-side; the matey's F arrives as net events.
   =================================================================== */

/* --- the mop + its bucket --- */
export const mop = { held: -1, x: -1.05, z: -0.35 };   // boat-local; held = char index or -1
const mopGroup = new THREE.Group();
{
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.15, 6),
    new THREE.MeshLambertMaterial({ color: 0x9a6b3f }));
  handle.position.y = 0.55;
  mopGroup.add(handle);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6),
    new THREE.MeshLambertMaterial({ color: 0xd8d4c4 }));
  head.scale.set(1.2, 0.55, 1.2);
  head.position.y = 0.02;
  mopGroup.add(head);
  heelGroup.add(mopGroup);
}
const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.32, 10),
  new THREE.MeshLambertMaterial({ color: 0x4d6a7a }));
bucket.position.set(-1.05, DECK_Y + 0.16, -0.35);
heelGroup.add(bucket);
export function placeMopHome() {
  mop.held = -1;
  mop.x = bucket.position.x;
  mop.z = bucket.position.z;
}
placeMopHome();

/* visual update runs on host AND guest (guest gets mop.held/x/z from snapshots) */
export function updateMopVisual(t: number) {
  if (mop.held >= 0) {
    const c = chars[mop.held];
    const f = headVec(c.facing);
    const scrub = c.scrubT > 0 ? Math.sin(t * 16) * 0.25 : 0;
    mopGroup.position.set(
      c.pos.x + f.x * 0.42 + scrub * Math.cos(c.facing) * 0.4,
      DECK_Y + (c.scrubT > 0 ? 0.02 : 0.18),
      c.pos.z + f.z * 0.42 - scrub * Math.sin(c.facing) * 0.4);
    mopGroup.rotation.set(c.scrubT > 0 ? 0.9 : 0.35, c.facing, 0);
  } else {
    mopGroup.position.set(mop.x, DECK_Y + (isAtBucket() ? 0.3 : 0.04), mop.z);
    mopGroup.rotation.set(isAtBucket() ? 0 : Math.PI / 2 - 0.08, 0.6, 0);
  }
}
const isAtBucket = () =>
  Math.hypot(mop.x - bucket.position.x, mop.z - bucket.position.z) < 0.2;

/* after dropping the mop you must step away before it sticks again */
const dropCd = new Map<Char, number>();

/* --- F edge: drop mop / start grab / escape mash --- */
export function handsEdge(c: Char) {
  const idx = chars.indexOf(c);
  // grabbed? every press is a struggle
  if (c.grabbedBy >= 0) {
    c.mash++;
    if (c.mash >= CONFIG.escapeMash) breakFree(c, chars[c.grabbedBy]);
    return;
  }
  if (c.mode !== 'deck') return;
  if (c.hasMop) {
    // press near a splat starts scrubbing (handled by hold); away from any splat = drop
    if (!nearestSplat(c.pos.x, c.pos.z, CONFIG.scrubRange)) {
      c.hasMop = false;
      mop.held = -1;
      mop.x = clamp(c.pos.x, -layout.deckX, layout.deckX);
      mop.z = clamp(c.pos.z, -layout.deckZ, layout.deckZ);
      dropCd.set(c, 1.0);
    }
    return;
  }
  // try to grab the other pirate
  const other = chars[1 - idx];
  if (!other || !charActive(other) || other.mode !== 'deck') return;
  if (other.grabbedBy >= 0 || c.grabbedBy >= 0) return;
  if (Math.hypot(other.pos.x - c.pos.x, other.pos.z - c.pos.z) > CONFIG.grabRange) return;
  // GRAB — works on stationed players too: yanks them right off the wheel
  if (other.station) toast(other.name + ' got yanked off the ' + other.station + '!', '#ffd95e');
  releaseStation(other);
  if (other.hasMop) { other.hasMop = false; mop.held = -1; mop.x = other.pos.x; mop.z = other.pos.z; }
  other.grabbedBy = idx;
  other.mash = 0;
  c.holding = true;
  c.scrubT = 0;
}

function breakFree(victim: Char, grabber: Char) {
  victim.grabbedBy = -1;
  victim.mash = 0;
  grabber.holding = false;
  victim.knock = 0.3;
  grabber.knock = 0.4;                                   // stagger — the wriggle worked
  const f = headVec(grabber.facing);
  victim.vel.x = f.x * 2.2; victim.vel.z = f.z * 2.2;    // small pop away
  toast(victim.name + ' wriggled free!', '#aef7a2');
}

function throwVictim(grabber: Char, victim: Char) {
  victim.grabbedBy = -1;
  victim.mash = 0;
  grabber.holding = false;
  const f = headVec(grabber.facing);
  victim.vel.x = f.x * CONFIG.throwForce + grabber.vel.x * 0.5;
  victim.vel.z = f.z * CONFIG.throwForce + grabber.vel.z * 0.5;
  victim.vy = CONFIG.throwArc;
  victim.jumpY = Math.max(victim.jumpY, 0.45);           // launched: clears the rail even point-blank
  victim.knock = 0.55;                                   // flailing, no air control
  toast(grabber.name + ' YEETS ' + victim.name + '!', '#ff8a7a');
}

/* --- per-frame hands logic (host + solo) --- */
export function updateHands(dt: number) {
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (!charActive(c)) continue;
    const ax = charAxes(c);

    // carried the mop into the sea? it stays aboard where you left the deck
    if (c.hasMop && c.mode !== 'deck') {
      c.hasMop = false;
      mop.held = -1;
      mop.x = clamp(mop.x, -layout.deckX, layout.deckX);
      mop.z = clamp(mop.z, -layout.deckZ, layout.deckZ);
    }

    // mop auto-pickup by walking over it (not right after dropping it)
    const cd = (dropCd.get(c) ?? 0) - dt;
    dropCd.set(c, cd);
    if (c.mode === 'deck' && !c.hasMop && mop.held < 0 && c.grabbedBy < 0 && !c.holding && cd <= 0 &&
        Math.hypot(c.pos.x - mop.x, c.pos.z - mop.z) < CONFIG.mopPickupR) {
      c.hasMop = true;
      mop.held = i;
    }

    // scrubbing: hold F with the mop near a splat
    if (c.hasMop && c.mode === 'deck' && ax.h) {
      const s = nearestSplat(c.pos.x, c.pos.z, CONFIG.scrubRange);
      if (s) {
        c.scrubT += dt;
        if (c.scrubT >= CONFIG.scrubTime) {
          mopSplat(s.id);
          c.scrubT = 0;
        }
      } else c.scrubT = Math.max(0, c.scrubT - dt * 3);
    } else if (c.scrubT > 0) c.scrubT = Math.max(0, c.scrubT - dt * 3);

    // holding the other pirate
    if (c.holding) {
      const victim = chars[1 - i];
      if (!victim || victim.grabbedBy !== i || victim.mode !== 'deck' || c.mode !== 'deck') {
        c.holding = false;                                  // grab dissolved (overboard etc.)
        if (victim && victim.grabbedBy === i) victim.grabbedBy = -1;
      } else if (!ax.h) {
        throwVictim(c, victim);                             // released the key: YEET
      } else {
        // pin the victim in front of the grabber, slightly lifted
        const f = headVec(c.facing);
        victim.pos.x = c.pos.x + f.x * 0.9;
        victim.pos.z = c.pos.z + f.z * 0.9;
        victim.vel.x = 0; victim.vel.z = 0;
        victim.jumpY = 0.22; victim.vy = 0;
        victim.facing = wrapPi(c.facing + Math.PI);         // face your captor — it's personal
        // victim struggle drags the pair around at half effect
        const va = charAxes(victim);
        if (va.fwd || va.strafe) {
          const n = Math.hypot(va.fwd, va.strafe);
          const vf = headVec(victim.facing);
          c.vel.x += ((vf.x * va.fwd - Math.cos(victim.facing) * va.strafe) / n) * CONFIG.walkAccel * CONFIG.victimInput * 0.5 * dt;
          c.vel.z += ((vf.z * va.fwd + Math.sin(victim.facing) * va.strafe) / n) * CONFIG.walkAccel * CONFIG.victimInput * 0.5 * dt;
        }
      }
    }
  }
}

/* full reset support */
export function resetHands() {
  for (const c of chars) {
    c.hasMop = false; c.grabbedBy = -1; c.holding = false; c.mash = 0; c.scrubT = 0;
  }
  placeMopHome();
}
