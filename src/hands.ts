import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { clamp, headVec, lerp, wrapPi } from './mathUtil';
import { boat, charActive, chars, layout, netDrag, p1 } from './state';
import { heelGroup } from './shipMesh';
import { scene } from './scene';
import { charAxes, localToWorld2, nearestStation, onWalkway, releaseStation, tryToggleStation, worldToLocal2 } from './simChars';
import { mopSplat, nearestSplat } from './critters';
import { nearestCrateFor, pickUp, putDown } from './cargo';
import { DELIVERY, WALKWAYS } from './world';
import { spawnSplash } from './effects';
import { localDrag } from './input';
import { toast } from './hud';
import * as audio from './audio';
import type { Char } from './types';

/* ===================================================================
   Hands: mops (E pick up / put down, LMB scrub or WHACK, F throw)
   and grabbing/throwing the other pirate (F, when empty-handed).
   All simulated host-side; the matey's clicks arrive as net events.
   =================================================================== */

export interface Mop {
  held: number;          // char index or -1
  x: number; z: number;  // boat-local
  h: number;             // height above deck (thrown arc)
  vx: number; vz: number; vy: number;
  thrown: boolean;
  thrower: number;       // who launched it (immune to their own throw)
  on: boolean;           // exists this session (mop #2 only in co-op)
  mesh: THREE.Group;
  bucket: THREE.Group;
}

function buildMopMesh(): THREE.Group {
  const g = new THREE.Group();
  const wood = new THREE.MeshLambertMaterial({ color: 0xa9764a });
  const grip = new THREE.MeshLambertMaterial({ color: 0x6b4226 });
  const metal = new THREE.MeshLambertMaterial({ color: 0x8d959c });
  const strands = new THREE.MeshLambertMaterial({ color: 0xe8e2d0 });
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.25, 7), wood);
  handle.position.y = 0.72;
  g.add(handle);
  const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.18, 7), grip);
  wrap.position.y = 1.22;
  g.add(wrap);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.08, 8), metal);
  collar.position.y = 0.13;
  g.add(collar);
  const headCone = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.16, 9), strands);
  headCone.position.y = 0.04;
  g.add(headCone);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const strand = new THREE.Mesh(new THREE.CapsuleGeometry(0.022, 0.16, 3, 5), strands);
    strand.position.set(Math.cos(a) * 0.09, -0.07, Math.sin(a) * 0.09);
    strand.rotation.z = Math.cos(a) * 0.35;
    strand.rotation.x = -Math.sin(a) * 0.35;
    g.add(strand);
  }
  g.traverse(o => {
    if ((o as THREE.Mesh).isMesh) { o.castShadow = true; }
  });
  heelGroup.add(g);
  return g;
}
function buildBucket(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.19, 0.32, 12),
    new THREE.MeshLambertMaterial({ color: 0x4d6a7a }));
  body.position.y = 0.16;
  body.castShadow = true;
  g.add(body);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.022, 6, 14),
    new THREE.MeshLambertMaterial({ color: 0x8d959c }));
  rim.position.y = 0.32;
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.2, 12),
    new THREE.MeshLambertMaterial({ color: 0x3d7ea6 }));
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.27;
  g.add(water);
  heelGroup.add(g);
  return g;
}

export const mops: Mop[] = [0, 1].map(() => ({
  held: -1, x: 0, z: 0, h: 0, vx: 0, vz: 0, vy: 0,
  thrown: false, thrower: -1, on: true,
  mesh: buildMopMesh(), bucket: buildBucket(),
}));

/* lay the buckets out for the current boat; co-op gets the second mop */
export function resetMops(coop: boolean) {
  mops[1].on = coop;
  mops.forEach((m, i) => {
    const side = i === 0 ? -1 : 1;
    m.bucket.position.set(side * layout.deckX * 0.72, DECK_Y, -0.35 * layout.scale);
    m.bucket.visible = m.on;
    m.held = -1;
    m.thrown = false;
    m.h = 0; m.vx = 0; m.vz = 0; m.vy = 0;
    m.x = m.bucket.position.x;
    m.z = m.bucket.position.z;
    m.mesh.visible = m.on;
  });
  for (const c of chars) c.hasMop = false;
}

const mopOf = (c: Char): Mop | undefined => mops.find(m => m.on && m.held === chars.indexOf(c));
export function nearestFreeMop(c: Char, r: number): Mop | undefined {
  let best: Mop | undefined, bd = r;
  for (const m of mops) {
    if (!m.on || m.held >= 0 || m.thrown) continue;
    const d = Math.hypot(m.x - c.pos.x, m.z - c.pos.z);
    if (d < bd) { bd = d; best = m; }
  }
  return best;
}
function respawnMop(m: Mop, splashWorld: boolean) {
  if (splashWorld) {
    const w = localToWorld2({ x: clamp(m.x, -layout.deckX - 2, layout.deckX + 2), z: clamp(m.z, -layout.deckZ - 2, layout.deckZ + 2) });
    spawnSplash(w.x, w.z, false);
    toast('The mop went swimming — a spare appeared in the bucket', '#74c0fc');
  }
  m.held = -1;
  m.thrown = false;
  m.h = 0; m.vx = 0; m.vz = 0; m.vy = 0;
  m.x = m.bucket.position.x;
  m.z = m.bucket.position.z;
}

/* ===================================================================
   E = universal interact. getInteract is the SINGLE source of truth:
   the HUD prompts from it, pressE executes it (host-side).
   =================================================================== */
export type InteractKind =
  | 'crate-put' | 'crate-deliver' | 'crate-take' | 'crate-fish'
  | 'mop-put' | 'mop-scrub' | 'mop-take'
  | 'anchor' | 'ashore' | 'aboard'
  | 'station' | 'station-leave' | 'grab-hint';

function nearestWalkwayPoint(wx: number, wz: number): { x: number; z: number; d: number } {
  let best = { x: 0, z: 0, d: 1e9 };
  for (const w of WALKWAYS) {
    const x = clamp(wx, w.x0 + 0.25, w.x1 - 0.25);
    const z = clamp(wz, w.z0 + 0.25, w.z1 - 0.25);
    const d = Math.hypot(x - wx, z - wz);
    if (d < best.d) best = { x, z, d };
  }
  return best;
}
const anchorSpot = () => ({ x: 0, z: layout.deckZ * 0.88 });

export function getInteract(c: Char): { kind: InteractKind; label: string } | null {
  if (c.grabbedBy >= 0 || c.mode === 'water' || c.knock > 0) return null;
  // carrying a crate: deliver > board/disembark WITH it > put down
  if (c.carry >= 0) {
    if (c.mode === 'shore') {
      const f = headVec(c.facing);
      if (Math.hypot(c.pos.x + f.x * 0.65 - DELIVERY.x, c.pos.z + f.z * 0.65 - DELIVERY.z) < DELIVERY.r) {
        return { kind: 'crate-deliver', label: 'E — DELIVER the crate!' };
      }
      if (Math.hypot(c.pos.x - boat.pos.x, c.pos.z - boat.pos.z) < layout.hullL / 2 + 2.6) {
        return { kind: 'aboard', label: 'E — climb aboard with the crate' };
      }
    }
    if (c.mode === 'deck') {
      const w = localToWorld2(c.pos);
      if (nearestWalkwayPoint(w.x, w.z).d < 3.2) {
        return { kind: 'ashore', label: 'E — step ashore with the crate' };
      }
    }
    return { kind: 'crate-put', label: 'E — put the crate down (F: toss)' };
  }
  if (c.station) return { kind: 'station-leave', label: 'E — let go of the ' + (c.station === 'helm' ? 'HELM' : 'SAIL') };
  // holding the mop
  if (mopOf(c)) {
    if (c.mode === 'deck' && nearestSplat(c.pos.x, c.pos.z, CONFIG.scrubRange)) {
      return { kind: 'mop-scrub', label: 'Hold LMB — scrub the poop!' };
    }
    return { kind: 'mop-put', label: 'E — put the mop down' };
  }
  // pick something up: crates first, then the mop
  const nc = nearestCrateFor(c);
  if (nc) return nc.fish
    ? { kind: 'crate-fish', label: 'E — fish the crate out!' }
    : { kind: 'crate-take', label: 'E — pick up the crate' };
  if (c.mode === 'deck' && !c.holding && nearestFreeMop(c, CONFIG.mopPickupR)) {
    return { kind: 'mop-take', label: 'E — pick up the mop' };
  }
  // the anchor windlass at the bow
  if (c.mode === 'deck') {
    const a = anchorSpot();
    if (Math.hypot(c.pos.x - a.x, c.pos.z - a.z) < 1.7) {
      return { kind: 'anchor', label: boat.anchored ? 'E — raise the anchor' : 'E — drop the anchor' };
    }
  }
  // step ashore / climb aboard
  if (c.mode === 'deck') {
    const w = localToWorld2(c.pos);
    if (nearestWalkwayPoint(w.x, w.z).d < 3.2) return { kind: 'ashore', label: 'E — step ashore' };
  } else if (c.mode === 'shore') {
    if (Math.hypot(c.pos.x - boat.pos.x, c.pos.z - boat.pos.z) < layout.hullL / 2 + 2.6) {
      return { kind: 'aboard', label: 'E — climb aboard' };
    }
  }
  // stations
  if (c.mode === 'deck') {
    const st = nearestStation(c);
    if (st) return { kind: 'station', label: 'E — man the ' + (st === 'helm' ? 'HELM' : 'SAIL') };
    const other = chars[1 - chars.indexOf(c)];
    if (other && charActive(other) && other.mode === 'deck' && other.grabbedBy < 0 &&
        Math.hypot(other.pos.x - c.pos.x, other.pos.z - c.pos.z) < CONFIG.grabRange) {
      return { kind: 'grab-hint', label: 'F (hold) — grab your matey' };
    }
  }
  return null;
}

export function pressE(c: Char) {
  const it = getInteract(c);
  if (!it) return;
  switch (it.kind) {
    case 'crate-put':
    case 'crate-deliver':
      putDown(c);
      break;
    case 'crate-take':
    case 'crate-fish': {
      const n = nearestCrateFor(c);
      if (n) pickUp(c, n.i);
      break;
    }
    case 'mop-put': {
      const mine = mopOf(c)!;
      c.hasMop = false;
      mine.held = -1;
      mine.x = clamp(c.pos.x, -layout.deckX, layout.deckX);
      mine.z = clamp(c.pos.z, -layout.deckZ, layout.deckZ);
      break;
    }
    case 'mop-take': {
      const free = nearestFreeMop(c, CONFIG.mopPickupR)!;
      free.held = chars.indexOf(c);
      c.hasMop = true;
      c.scrubT = 0;
      break;
    }
    case 'anchor': {
      boat.anchored = !boat.anchored;
      const bow = localToWorld2(anchorSpot());
      if (boat.anchored) {
        spawnSplash(bow.x, bow.z, false);
        toast('Anchor down!', '#74c0fc');
      } else {
        toast('Anchor aweigh!', '#aef7a2');
      }
      audio.creak(1);
      break;
    }
    case 'ashore': {
      const w = localToWorld2(c.pos);
      const p = nearestWalkwayPoint(w.x, w.z);
      heelGroup.remove(c.mesh);
      scene.add(c.mesh);
      c.mode = 'shore';
      c.pos.x = p.x; c.pos.z = p.z;
      c.facing = wrapPi(c.facing + boat.yaw);
      c.vel.x = 0; c.vel.z = 0;
      c.jumpY = 0.25; c.vy = 1.2;
      break;
    }
    case 'aboard': {
      scene.remove(c.mesh);
      heelGroup.add(c.mesh);
      c.mode = 'deck';
      const lp = worldToLocal2(c.pos);
      c.pos.x = clamp(lp.x, -layout.deckX + 0.3, layout.deckX - 0.3);
      c.pos.z = clamp(lp.z, -layout.deckZ + 0.3, layout.deckZ - 0.3);
      c.facing = wrapPi(c.facing - boat.yaw);
      c.vel.x = 0; c.vel.z = 0;
      c.jumpY = 0.25; c.vy = 1.2;
      break;
    }
    case 'station':
      tryToggleStation(c);
      break;
    case 'station-leave':
      releaseStation(c);
      break;
    default:
      break;
  }
}

/* --- F: throw the mop if you hold one, else grab the matey; mash to escape --- */
export function handsEdge(c: Char) {
  const idx = chars.indexOf(c);
  if (c.grabbedBy >= 0) {
    c.mash++;
    if (c.mash >= CONFIG.escapeMash) breakFree(c, chars[c.grabbedBy]);
    return;
  }
  if (c.carry >= 0) { putDown(c, true); return; }   // F = toss the crate
  if (c.mode !== 'deck') return;
  const mine = mopOf(c);
  if (mine) {                               // YEET the mop
    const f = headVec(c.facing);
    mine.held = -1;
    c.hasMop = false;
    c.scrubT = 0;
    mine.thrown = true;
    mine.thrower = idx;
    mine.x = c.pos.x + f.x * 0.5;
    mine.z = c.pos.z + f.z * 0.5;
    mine.h = 1.2;
    mine.vx = f.x * CONFIG.mopThrowForce + c.vel.x * 0.5;
    mine.vz = f.z * CONFIG.mopThrowForce + c.vel.z * 0.5;
    mine.vy = CONFIG.mopThrowArc;
    return;
  }
  // grab the other pirate — they STAY where they are; you have to DRAG them
  const other = chars[1 - idx];
  if (!other || !charActive(other) || other.mode !== 'deck') return;
  if (other.grabbedBy >= 0 || c.grabbedBy >= 0) return;
  const dx = other.pos.x - c.pos.x, dz = other.pos.z - c.pos.z;
  const d = Math.hypot(dx, dz);
  if (d > CONFIG.grabRange) return;
  const theirs = mopOf(other);
  if (theirs) { theirs.held = -1; theirs.x = other.pos.x; theirs.z = other.pos.z; other.hasMop = false; }
  other.grabbedBy = idx;
  other.mash = 0;
  c.holding = true;
  c.scrubT = 0;
  // hold point starts exactly at the victim: no teleport, no instant yank
  holds.set(c, {
    ang: wrapPi(Math.atan2(dx, dz) - c.facing),
    dist: clamp(d, 0.55, 1.55),
    strain: 0,
  });
  if (other.station) toast(other.name + ' is clinging to the ' + other.station + ' — DRAG them off!', '#ffd95e');
}

/* the grabber's mouse swings the hold point around them */
interface Hold { ang: number; dist: number; strain: number; }
const holds = new Map<Char, Hold>();

/* --- LMB tap: WHACK the matey with the mop (if not scrubbing) --- */
const whackCd = new Map<Char, number>();
export function mopTap(c: Char) {
  if (c.mode !== 'deck' || !mopOf(c)) return;
  if (nearestSplat(c.pos.x, c.pos.z, CONFIG.scrubRange)) return;   // that press means "scrub"
  if ((whackCd.get(c) ?? 0) > 0) return;
  const other = chars[1 - chars.indexOf(c)];
  if (!other || !charActive(other) || other.mode !== 'deck' || other.grabbedBy >= 0) return;
  const dx = other.pos.x - c.pos.x, dz = other.pos.z - c.pos.z;
  const d = Math.hypot(dx, dz);
  if (d > CONFIG.whackRange) return;
  whackCd.set(c, CONFIG.whackCooldown);
  releaseStation(other);
  other.knock = Math.max(other.knock, CONFIG.whackKnock);
  other.vel.x += (dx / (d || 1)) * CONFIG.whackKick;
  other.vel.z += (dz / (d || 1)) * CONFIG.whackKick;
  audio.thwack();
  toast(c.name + ' bonked ' + other.name + ' with the mop!', '#ffd95e');
}

function breakFree(victim: Char, grabber: Char) {
  victim.grabbedBy = -1;
  victim.mash = 0;
  grabber.holding = false;
  holds.delete(grabber);
  victim.knock = 0.3;
  grabber.knock = 0.4;
  const f = headVec(grabber.facing);
  victim.vel.x = f.x * 2.2; victim.vel.z = f.z * 2.2;
  toast(victim.name + ' wriggled free!', '#aef7a2');
}

function shoveVictim(grabber: Char, victim: Char) {
  victim.grabbedBy = -1;
  victim.mash = 0;
  grabber.holding = false;
  // a small push outward along the hold, not a cannon launch
  const dx = victim.pos.x - grabber.pos.x, dz = victim.pos.z - grabber.pos.z;
  const d = Math.hypot(dx, dz) || 1;
  victim.vel.x = (dx / d) * CONFIG.throwForce + grabber.vel.x * 0.5;
  victim.vel.z = (dz / d) * CONFIG.throwForce + grabber.vel.z * 0.5;
  victim.vy = CONFIG.throwArc;
  victim.jumpY = Math.max(victim.jumpY, 0.3);
  victim.knock = 0.85;
  toast(grabber.name + ' shoves ' + victim.name + '!', '#ff8a7a');
}

/* --- per-frame hands logic (host + solo) --- */
export function updateHands(dt: number) {
  for (const [c, cd] of whackCd) whackCd.set(c, cd - dt);

  // thrown mops: arc, bonk, land or go swimming
  for (const m of mops) {
    if (!m.on || !m.thrown) continue;
    m.vy -= 12 * dt;
    m.x += m.vx * dt;
    m.z += m.vz * dt;
    m.h = Math.max(0, m.h + m.vy * dt);
    // mid-air bonk
    if (m.h > 0.1 && m.h < 1.9) {
      for (const c of chars) {
        if (chars.indexOf(c) === m.thrower) continue;        // your own throw can't bean you
        if (!charActive(c) || c.mode !== 'deck' || c.grabbedBy >= 0) continue;
        if (Math.hypot(c.pos.x - m.x, c.pos.z - m.z) < 0.7 && Math.hypot(m.vx, m.vz) > 2) {
          releaseStation(c);
          c.knock = Math.max(c.knock, 1.3);
          c.vel.x += m.vx * 0.45;
          c.vel.z += m.vz * 0.45;
          audio.thwack();
          toast(c.name + ' got beaned by a flying mop!', '#ff8a7a');
          m.vx *= 0.2; m.vz *= 0.2; m.vy = Math.min(m.vy, 0);
        }
      }
    }
    if (m.h <= 0) {
      m.thrown = false;
      m.vx = 0; m.vz = 0; m.vy = 0;
      if (Math.abs(m.x) > layout.deckX + 0.4 || Math.abs(m.z) > layout.deckZ + 0.4) respawnMop(m, true);
    } else if (Math.abs(m.x) > layout.deckX + 3 || Math.abs(m.z) > layout.deckZ + 3) {
      respawnMop(m, true);
    }
  }

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (!charActive(c)) continue;
    const ax = charAxes(c);
    const mine = mopOf(c);

    // carried the mop into the sea? it respawns in its bucket
    if (mine && c.mode !== 'deck') {
      c.hasMop = false;
      respawnMop(mine, false);
    }
    c.hasMop = !!mopOf(c);

    // scrubbing: hold LMB with the mop near a splat
    if (c.hasMop && c.mode === 'deck' && ax.u) {
      const s = nearestSplat(c.pos.x, c.pos.z, CONFIG.scrubRange);
      if (s) {
        c.scrubT += dt;
        if (c.scrubT >= CONFIG.scrubTime) {
          mopSplat(s.id);
          c.scrubT = 0;
        }
      } else c.scrubT = Math.max(0, c.scrubT - dt * 3);
    } else if (c.scrubT > 0) c.scrubT = Math.max(0, c.scrubT - dt * 3);

    // holding the other pirate: reel them toward the mouse-dragged hold point
    if (c.holding) {
      const victim = chars[1 - i];
      if (!victim || victim.grabbedBy !== i || victim.mode !== 'deck' || c.mode !== 'deck') {
        c.holding = false;
        holds.delete(c);
        if (victim && victim.grabbedBy === i) victim.grabbedBy = -1;
      } else if (!ax.h) {
        shoveVictim(c, victim);                       // released the key: a little push
        holds.delete(c);
      } else {
        const hp = holds.get(c) ?? { ang: 0, dist: 0.95, strain: 0 };
        holds.set(c, hp);
        // consume this player's accumulated mouse drag
        const src = c === p1 ? localDrag : netDrag;
        hp.ang = clamp(hp.ang - src.x * CONFIG.dragSens, -1.35, 1.35);
        hp.dist = clamp(hp.dist - src.y * CONFIG.dragSens * 0.8, 0.55, 1.55);
        src.x = 0; src.y = 0;
        const ha = wrapPi(c.facing + hp.ang);
        const tx = c.pos.x + Math.sin(ha) * hp.dist;
        const tz = c.pos.z + Math.cos(ha) * hp.dist;
        // someone clinging to a station resists until you haul them off it
        const pull = victim.station ? CONFIG.stationGripPull : CONFIG.dragPull;
        const k = Math.min(1, pull * dt);
        const wasX = victim.pos.x, wasZ = victim.pos.z;
        victim.pos.x += (tx - victim.pos.x) * k;
        victim.pos.z += (tz - victim.pos.z) * k;
        victim.vel.x = (victim.pos.x - wasX) / Math.max(dt, 1e-4) * 0.5;   // feeds the ragdoll
        victim.vel.z = (victim.pos.z - wasZ) / Math.max(dt, 1e-4) * 0.5;
        victim.jumpY = lerp(victim.jumpY, 0.12, Math.min(1, 8 * dt));
        victim.vy = 0;
        victim.facing = wrapPi(Math.atan2(c.pos.x - victim.pos.x, c.pos.z - victim.pos.z));
        if (victim.station) {
          const sp = victim.station === 'helm' ? layout.helm : layout.sailSta;
          // tug-of-war: pulling the hold point away from their grip builds strain
          const gap = Math.hypot(tx - victim.pos.x, tz - victim.pos.z);
          hp.strain += gap * dt * 1.7;
          const hauledOut = Math.hypot(victim.pos.x - sp.x, victim.pos.z - sp.z) > CONFIG.stationDragOff;
          if (hp.strain > 1.0 || hauledOut) {
            toast(victim.name + ' got dragged off the ' + victim.station + '!', '#ffd95e');
            releaseStation(victim);
            victim.knock = Math.max(victim.knock, 0.4);   // loses footing as the grip breaks
          }
        }
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

/* visuals for both mops, host AND guest (guest gets mop state from snapshots).
   A held mop is PARENTED to the carrier's right arm, so it rides every arm
   swing, scrub stroke and ragdoll flail for free. */
export function updateMopVisual(t: number) {
  for (const m of mops) {
    m.mesh.visible = m.on;
    m.bucket.visible = m.on;
    if (!m.on) continue;
    const holder = m.held >= 0 ? chars[m.held] : null;
    const hand = holder?.mesh.userData.parts?.arms?.[1] as THREE.Mesh | undefined;
    if (holder && hand) {
      if (m.mesh.parent !== hand) {
        hand.add(m.mesh);
        m.mesh.position.set(0.07, -0.5, 0.13);     // in the fist, head down by the deck
      }
      const scrub = holder.scrubT > 0;
      m.mesh.rotation.set(
        scrub ? 0.95 : 0.5,
        0.12,
        -0.3 + (scrub ? Math.sin(t * 16) * 0.22 : 0));
    } else {
      if (m.mesh.parent !== heelGroup) heelGroup.add(m.mesh);
      if (m.thrown) {
        m.mesh.position.set(m.x, DECK_Y + m.h, m.z);
        m.mesh.rotation.set(t * 14 % (Math.PI * 2), Math.atan2(m.vx, m.vz), 0);
      } else {
        const atBucket = Math.hypot(m.x - m.bucket.position.x, m.z - m.bucket.position.z) < 0.2;
        m.mesh.position.set(m.x, DECK_Y + (atBucket ? 0.26 : 0.05), m.z);
        m.mesh.rotation.set(atBucket ? 0.12 : Math.PI / 2 - 0.08, 0.6 + (atBucket ? 0 : 0.8), 0);
      }
    }
  }
}

/* full reset support */
export function resetHands(coop: boolean) {
  for (const c of chars) {
    c.hasMop = false; c.grabbedBy = -1; c.holding = false; c.mash = 0; c.scrubT = 0;
  }
  resetMops(coop);
}
