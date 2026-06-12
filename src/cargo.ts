import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { clamp, headVec, rightVec } from './mathUtil';
import { boat, charActive, chars, game, layout, slipAt, tuning, wind } from './state';
import { scene } from './scene';
import { heelGroup } from './shipMesh';
import { makePlankTexture } from './textures';
import { spawnDroplets, spawnSplash, spawnWake } from './effects';
import { localToWorld2, onWalkway, worldToLocal2 } from './simChars';
import { DELIVERY, HOME_LOAD, SHORE_Y } from './world';
import { toast } from './hud';
import * as audio from './audio';
import type { Char } from './types';

/* ===================================================================
   Cargo: physical crates. They sit on the pier, get carried aboard,
   SLIDE around the deck with every lurch (same pseudo-inertia as the
   pirates), fall out through the gangway gaps, float for a while, and
   pay out when carried into the delivery circle. The round IS these.
   =================================================================== */
export const CRATE_N = 6;
export const PAY_PER_CRATE = 12;

/* states: 0 ground(world) · 1 deck(boat-local) · 2 carried · 3 water · 4 gone */
export interface Crate {
  s: 0 | 1 | 2 | 3 | 4;
  x: number; z: number;
  vx: number; vz: number;
  carrier: number;
  floatT: number;
  mesh: THREE.Group;
}
export const crates: Crate[] = [];
{
  const tex = makePlankTexture('#b08753', '#7a5232', 128, 128, 4);
  const boxMat = new THREE.MeshLambertMaterial({ map: tex });
  const frameMat = new THREE.MeshLambertMaterial({ color: 0x5d3a20 });
  for (let i = 0; i < CRATE_N; i++) {
    const g = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), boxMat);
    box.castShadow = true;
    g.add(box);
    for (const ey of [-0.24, 0.24]) {
      const rim = new THREE.Mesh(new THREE.BoxGeometry(0.59, 0.07, 0.59), frameMat);
      rim.position.y = ey;
      g.add(rim);
    }
    g.visible = false;
    scene.add(g);
    crates.push({ s: 4, x: 0, z: 0, vx: 0, vz: 0, carrier: -1, floatT: 0, mesh: g });
  }
}

let respawnT = -1;

export function spawnBatch() {
  game.batch++;
  game.batchT = 0;
  crates.forEach((c, i) => {
    c.s = 0;
    c.x = HOME_LOAD.x - 0.8 + (i % 2) * 1.6;
    c.z = HOME_LOAD.z - 1.0 + Math.floor(i / 2) * 1.0;
    c.vx = 0; c.vz = 0;
    c.carrier = -1;
    c.floatT = 0;
  });
  toast('Shipment ready on the home pier — ' + CRATE_N + ' crates to the green flag!', '#ffd95e');
}
export function resetCargo() {
  respawnT = -1;
  spawnBatch();
}

/* --- pickup / putdown / toss (called from hands.pressE, host-side) --- */
export function nearestCrateFor(c: Char): { i: number; fish: boolean } | null {
  if (c.carry >= 0 || c.hasMop || c.holding || c.grabbedBy >= 0 || c.knock > 0) return null;
  let bi = -1, bFish = false, bd = 1e9;
  crates.forEach((cr, i) => {
    if (cr.s === 1 && c.mode === 'deck') {
      const d = Math.hypot(cr.x - c.pos.x, cr.z - c.pos.z);
      if (d < 1.35 && d < bd) { bi = i; bFish = false; bd = d; }
    } else if (cr.s === 0 && c.mode === 'shore') {
      const d = Math.hypot(cr.x - c.pos.x, cr.z - c.pos.z);
      if (d < 1.35 && d < bd) { bi = i; bFish = false; bd = d; }
    } else if (cr.s === 3 && c.mode === 'deck') {
      const w = localToWorld2(c.pos);
      const d = Math.hypot(cr.x - w.x, cr.z - w.z);
      if (d < 3.0 && d < bd) { bi = i; bFish = true; bd = d; }
    }
  });
  return bi >= 0 ? { i: bi, fish: bFish } : null;
}
export function pickUp(c: Char, i: number) {
  const cr = crates[i];
  cr.s = 2;
  cr.carrier = chars.indexOf(c);
  c.carry = i;
}
export function putDown(c: Char, toss = false) {
  if (c.carry < 0) return;
  const cr = crates[c.carry];
  const idx = c.carry;
  c.carry = -1;
  cr.carrier = -1;
  const f = headVec(c.facing);
  const ahead = toss ? 1.0 : 0.65;
  if (c.mode === 'deck') {
    cr.s = 1;
    cr.x = clamp(c.pos.x + f.x * ahead, -layout.deckX + 0.2, layout.deckX - 0.2);
    cr.z = clamp(c.pos.z + f.z * ahead, -layout.deckZ + 0.2, layout.deckZ - 0.2);
    cr.vx = c.vel.x + (toss ? f.x * 2.5 : 0);
    cr.vz = c.vel.z + (toss ? f.z * 2.5 : 0);
  } else if (c.mode === 'shore') {
    const tx = c.pos.x + f.x * ahead, tz = c.pos.z + f.z * ahead;
    if (Math.hypot(tx - DELIVERY.x, tz - DELIVERY.z) < DELIVERY.r) {
      // SOLD! that's the whole game
      cr.s = 4;
      game.gold += PAY_PER_CRATE;
      game.delivered++;
      audio.dockedChime();
      spawnDroplets(tx, tz, 6, 1.2, 2.6);
      toast('Crate delivered! +' + PAY_PER_CRATE + 'g', '#aef7a2');
      checkBatchDone();
      return;
    }
    cr.s = 0;
    cr.x = onWalkway(tx, tz) ? tx : c.pos.x;
    cr.z = onWalkway(tx, tz) ? tz : c.pos.z;
    cr.vx = 0; cr.vz = 0;
  } else {
    cr.s = 3;
    const w = c.mode === 'water' ? c.pos : localToWorld2(c.pos);
    cr.x = w.x; cr.z = w.z;
    cr.floatT = 15;
    spawnSplash(cr.x, cr.z, false);
  }
  void idx;
}

/* --- host-side simulation --- */
export function updateCargo(dt: number) {
  const anyActive = crates.some(cr => cr.s !== 4);
  if (anyActive) game.batchT += dt;
  const fwd = headVec(boat.yaw), rgt = rightVec(boat.yaw);
  for (const cr of crates) {
    if (cr.s === 1) {
      // deck crate: same pseudo-inertia as the pirates, a bit heavier
      let sx = 0, sz = 0;
      sx += -(boat.lastAccel.x * rgt.x + boat.lastAccel.z * rgt.z) * CONFIG.inertiaScale * 0.85;
      sz += -(boat.lastAccel.x * fwd.x + boat.lastAccel.z * fwd.z) * CONFIG.inertiaScale * 0.85;
      const w = boat.angVel, wd = boat.lastAngAccel;
      sx += (w * w * cr.x - wd * cr.z) * CONFIG.inertiaScale * 0.85;
      sz += (w * w * cr.z + wd * cr.x) * CONFIG.inertiaScale * 0.85;
      sx += Math.sin(boat.heel) * tuning.heelSlide * 0.8;
      if (slipAt(cr.x, cr.z)) { sx *= CONFIG.poopSlip; sz *= CONFIG.poopSlip; }
      cr.vx += sx * dt;
      cr.vz += sz * dt;
      const damp = slipAt(cr.x, cr.z) ? 1.6 : 5.0;
      cr.vx -= cr.vx * Math.min(1, damp * dt);
      cr.vz -= cr.vz * Math.min(1, damp * dt);
      cr.x += cr.vx * dt;
      cr.z += cr.vz * dt;
      // gangway gaps eat sliding cargo; rails hold (with a thud)
      const inGap = layout.gaps.some(g => cr.z > g.z0 && cr.z < g.z1);
      if (Math.abs(cr.x) > layout.deckX - 0.1) {
        if (inGap) {
          if (Math.abs(cr.x) > layout.deckX + 0.3) {
            const wp = localToWorld2(cr);
            cr.s = 3;
            cr.x = wp.x; cr.z = wp.z;
            cr.floatT = 15;
            spawnSplash(wp.x, wp.z, false);
            toast('A crate went overboard!', '#ff8787');
            continue;
          }
        } else {
          cr.x = Math.sign(cr.x) * (layout.deckX - 0.1);
          cr.vx *= -0.25;
        }
      }
      if (Math.abs(cr.z) > layout.deckZ - 0.1) {
        cr.z = Math.sign(cr.z) * (layout.deckZ - 0.1);
        cr.vz *= -0.25;
      }
    } else if (cr.s === 3) {
      cr.floatT -= dt;
      cr.x += Math.sin(wind.angle) * 0.25 * dt;
      cr.z += Math.cos(wind.angle) * 0.25 * dt;
      if (cr.floatT <= 0) {
        cr.s = 4;
        game.lost++;
        spawnDroplets(cr.x, cr.z, 5, 1.0, 1.5);
        spawnWake(cr.x, cr.z, 0, 1.0);
        toast('A crate sank… (-1)', '#ff8787');
        checkBatchDone();
      }
    } else if (cr.s === 2) {
      const ch = chars[cr.carrier];
      if (!ch || !charActive(ch) || ch.carry !== crates.indexOf(cr)) {
        cr.s = 1; cr.carrier = -1;        // desync safety
      } else if (ch.mode === 'water' || ch.knock > 0 || ch.grabbedBy >= 0) {
        // dropped it — into the sea or onto whatever is underfoot
        ch.carry = -1;
        cr.carrier = -1;
        if (ch.mode === 'water') {
          cr.s = 3;
          cr.x = ch.pos.x; cr.z = ch.pos.z;
          cr.floatT = 15;
          spawnSplash(cr.x, cr.z, false);
        } else if (ch.mode === 'shore') {
          cr.s = 0;
          cr.x = ch.pos.x; cr.z = ch.pos.z;
        } else {
          cr.s = 1;
          cr.x = clamp(ch.pos.x, -layout.deckX + 0.2, layout.deckX - 0.2);
          cr.z = clamp(ch.pos.z, -layout.deckZ + 0.2, layout.deckZ - 0.2);
          cr.vx = ch.vel.x; cr.vz = ch.vel.z;
        }
      }
    }
  }
  if (respawnT > 0) {
    respawnT -= dt;
    if (respawnT <= 0) {
      respawnT = -1;
      spawnBatch();
    }
  }
}
function checkBatchDone() {
  if (crates.some(cr => cr.s !== 4) || respawnT > 0) return;
  const mins = (game.batchT / 60) | 0, secs = (game.batchT % 60) | 0;
  toast('Shipment done: ' + game.delivered + ' delivered · ' + game.lost + ' lost · '
    + mins + ':' + String(secs).padStart(2, '0') + ' — new crates incoming!', '#ffd95e');
  respawnT = 5;
}

/* --- visuals (host + guest; guest state comes from snapshots) --- */
export function updateCargoVisual(t: number) {
  for (const cr of crates) {
    const m = cr.mesh;
    if (cr.s === 4) { m.visible = false; continue; }
    m.visible = true;
    if (cr.s === 2) {
      const ch = chars[cr.carrier];
      const torso = ch?.mesh.userData.parts?.torso as THREE.Group | undefined;
      if (torso) {
        if (m.parent !== torso) { torso.add(m); m.position.set(0, 0.34, 0.5); m.rotation.set(0, 0, 0); }
        continue;
      }
    }
    if (cr.s === 1) {
      if (m.parent !== heelGroup) heelGroup.add(m);
      m.position.set(cr.x, DECK_Y + 0.28, cr.z);
      m.rotation.set(0, 0, 0);
    } else {
      if (m.parent !== scene) scene.add(m);
      if (cr.s === 0) {
        m.position.set(cr.x, SHORE_Y + 0.28, cr.z);
        m.rotation.set(0, 0, 0);
      } else {
        m.position.set(cr.x, 0.12 + Math.sin(t * 1.6 + cr.x) * 0.06, cr.z);
        m.rotation.set(Math.sin(t * 0.9 + cr.z) * 0.15, 0, Math.cos(t * 1.2 + cr.x) * 0.15);
      }
    }
  }
}

/* guest mirror */
export function applyCargoSnap(cg: { s: number; x: number; z: number; h: number; cr: number }[]) {
  cg.forEach((s, i) => {
    const cr = crates[i];
    if (!cr) return;
    cr.s = s.s as Crate['s'];
    cr.x = s.x; cr.z = s.z;
    cr.carrier = s.cr;
  });
  chars.forEach((c, i) => {
    c.carry = crates.findIndex(cr => cr.s === 2 && cr.carrier === i);
  });
}
export function cargoSnap() {
  return crates.map(cr => ({ s: cr.s, x: cr.x, z: cr.z, h: 0, cr: cr.carrier }));
}
export const cratesAboard = () =>
  crates.filter(cr => cr.s === 1 || (cr.s === 2 && chars[cr.carrier]?.mode === 'deck')).length;
export const cratesLeft = () => crates.filter(cr => cr.s !== 4).length;
