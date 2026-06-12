import * as THREE from 'three';
import { CONFIG, DECK_Y, MAST_POS } from './config';
import { clamp, dot2, headVec, lerp, wrapPi } from './mathUtil';
import { scene } from './scene';
import { applyLayoutScale, applyTuning, boat, env, layout, owned, shipInfo, tuning, wind } from './state';
import { makePlankTexture, makeSailTexture } from './textures';
import { dockArrow } from './world';
import * as audio from './audio';
import type { BoatPreset } from './types';

/* ===================================================================
   The ship. boatGroup carries position+yaw (the physics body);
   heelGroup carries cosmetic roll/pitch/heave. Pirates live directly
   in heelGroup; every ship mesh lives in shipRig so the whole vessel
   can be rebuilt at a different scale when a boat preset is chosen.
   =================================================================== */
export const boatGroup = new THREE.Group();
export const heelGroup = new THREE.Group();
boatGroup.add(heelGroup);
scene.add(boatGroup);

const woodMat = new THREE.MeshLambertMaterial({ color: 0x8a5a33 });
const woodDark = new THREE.MeshLambertMaterial({ color: 0x5d3a20 });
const woodPale = new THREE.MeshLambertMaterial({ color: 0xa9764a });
const ropeMat = new THREE.MeshLambertMaterial({ color: 0x4a3826 });
const hullMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const deckTex = makePlankTexture('#a9764a', '#7a5232');
const deckMat = new THREE.MeshLambertMaterial({ map: deckTex });
const sailMat = new THREE.MeshLambertMaterial({ map: makeSailTexture(), side: THREE.DoubleSide });
const jibMat = new THREE.MeshLambertMaterial({ color: 0xf3eddc, side: THREE.DoubleSide });
const bandMat = new THREE.MeshLambertMaterial({ color: 0x3a3a3a });
const lampMat = new THREE.MeshLambertMaterial({ color: 0xffd27a, emissive: 0xff9a2a, emissiveIntensity: 1.4 });
const padHelmMat = new THREE.MeshLambertMaterial({ color: 0x4dabf7 });
const padSailMat = new THREE.MeshLambertMaterial({ color: 0x69db7c });
const flagMat = new THREE.MeshBasicMaterial({ color: 0xe8443a, side: THREE.DoubleSide });

/* ---- rebuildable parts (assigned in buildShip) ---- */
let shipRig: THREE.Group | null = null;
let anchorRig: THREE.Group;          // rope + anchor, visible while anchored
export let boomGroup: THREE.Group;
export let wheelGroup: THREE.Group;
export let cannonGroup: THREE.Group; // swivels with the aim (cannon.ts drives it)
export let cannonPivot: THREE.Group; // barrel elevation
let rudderGroup: THREE.Group;
let sailGeo: THREE.PlaneGeometry;
let sailBase: Float32Array;
let jibGeo: THREE.BufferGeometry;
let flagGroup: THREE.Group;
let flag: THREE.Mesh;
let flagBase: Float32Array;
let JIB_TACK = new THREE.Vector3();
let JIB_HEAD = new THREE.Vector3();
const SAIL_W = 8, SAIL_H = 8;
const JIB_U = 7, JIB_V = 5;

// hull cross sections at scale 1: z, half beam, keel depth, deck-edge height
const SECS = [
  { z: -4.0, b: 1.30, k: 0.50, s: 1.06 },
  { z: -3.0, b: 1.55, k: 0.68, s: 1.00 },
  { z: -1.0, b: 1.65, k: 0.75, s: 0.96 },
  { z: 1.0, b: 1.60, k: 0.74, s: 0.96 },
  { z: 2.6, b: 1.30, k: 0.62, s: 1.02 },
  { z: 3.8, b: 0.55, k: 0.42, s: 1.16 },
  { z: 4.5, b: 0.06, k: 0.22, s: 1.34 },
];

export function buildShip(S: number) {
  // tear the old vessel down (shared materials/textures stay)
  if (shipRig) {
    shipRig.traverse(o => { if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).geometry.dispose(); });
    heelGroup.remove(shipRig);
  }
  shipRig = new THREE.Group();
  heelGroup.add(shipRig);
  const R = shipRig;
  // x/z scale by S; hull y scales around the (fixed) deck line, topside heights stay human-sized
  const yHull = (y: number) => DECK_Y + (y - DECK_Y) * S;
  const ySheer = (y: number) => DECK_Y + (y - DECK_Y) * (0.55 + 0.45 * S);

  /* ---------------- lofted hull with painted waterline ---------------- */
  {
    const PROF = 7;
    const ringN = PROF * 2 - 1;
    const pos: number[] = [], col: number[] = [], idx: number[] = [];
    const cBottom = new THREE.Color(0x3c2a18);
    const cStripe = new THREE.Color(0xe8dcc0);
    const cWood = new THREE.Color(0x8a5a33);
    const paint = (y: number, sec: number) => {
      if (y < -0.12 * S) return cBottom;
      if (y < 0.18) return cStripe;
      const c = cWood.clone();
      c.offsetHSL(0, 0, (sec % 2) * 0.022 - 0.011);
      return c;
    };
    SECS.forEach((sec, si) => {
      const pts: [number, number][] = [];
      const top = ySheer(sec.s), keelY = yHull(-sec.k + DECK_Y) - DECK_Y; // keel depth scaled
      for (let p = PROF - 1; p >= 0; p--) {
        const t = p / (PROF - 1);
        pts.push([-sec.b * S * Math.pow(Math.sin(t * Math.PI / 2), 0.85), keelY + (top - keelY) * Math.pow(t, 1.25)]);
      }
      for (let p = 1; p < PROF; p++) {
        const t = p / (PROF - 1);
        pts.push([sec.b * S * Math.pow(Math.sin(t * Math.PI / 2), 0.85), keelY + (top - keelY) * Math.pow(t, 1.25)]);
      }
      for (const [x, y] of pts) {
        pos.push(x, y, sec.z * S);
        const c = paint(y, si);
        col.push(c.r, c.g, c.b);
      }
    });
    for (let r = 0; r < SECS.length - 1; r++) {
      for (let i = 0; i < ringN - 1; i++) {
        const a = r * ringN + i, b = a + 1, c = a + ringN, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
    const sternCenter = pos.length / 3;
    pos.push(0, 0.35, -4.02 * S);
    col.push(0.54, 0.35, 0.2);
    for (let i = 0; i < ringN - 1; i++) idx.push(i + 1, i, sternCenter);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    R.add(new THREE.Mesh(geo, hullMat));
  }

  const beamAt = (z: number): number => {
    const zu = z / S;
    for (let i = 0; i < SECS.length - 1; i++) {
      const a = SECS[i], b = SECS[i + 1];
      if (zu >= a.z && zu <= b.z) return lerp(a.b, b.b, (zu - a.z) / (b.z - a.z)) * S;
    }
    return (zu < SECS[0].z ? SECS[0].b : SECS[SECS.length - 1].b) * S;
  };

  /* ---------------- plank deck ---------------- */
  {
    const tex = deckTex.clone();
    tex.needsUpdate = true;
    tex.repeat.set(2 * S, 7 * S);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(3.0 * S, 0.12, 7.9 * S),
      new THREE.MeshLambertMaterial({ map: tex }));
    deck.position.y = DECK_Y - 0.05;
    R.add(deck);
  }

  /* ---------------- bulwarks with gangway gaps ---------------- */
  {
    const inGapEdge = (z: number) => layout.gaps.some(g => z > g.z0 - 0.05 && z < g.z1 + 0.05);
    for (const side of [-1, 1]) {
      for (let zc = -3.78 * S; zc <= 3.85 * S; zc += 0.62) {
        if (inGapEdge(zc)) continue;
        const slope = (beamAt(zc + 0.3) - beamAt(zc - 0.3)) / 0.6;
        const x = side * (beamAt(zc) - 0.06);
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.64), woodMat);
        panel.position.set(x, DECK_Y + 0.25, zc);
        panel.rotation.y = side * Math.atan(slope);
        R.add(panel);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.7), woodPale);
        cap.position.set(x, DECK_Y + 0.52, zc);
        cap.rotation.y = panel.rotation.y;
        R.add(cap);
      }
    }
    const stern = new THREE.Mesh(new THREE.BoxGeometry(2.7 * S, 0.55, 0.1), woodMat);
    stern.position.set(0, DECK_Y + 0.27, -3.92 * S);
    R.add(stern);
    const sternCap = new THREE.Mesh(new THREE.BoxGeometry(2.8 * S, 0.06, 0.18), woodPale);
    sternCap.position.set(0, DECK_Y + 0.56, -3.92 * S);
    R.add(sternCap);
  }

  /* ---------------- boarding ladder (starboard quarter, down to the water) ---------------- */
  {
    const lz = -1.6 * S;
    const yBot = -0.4, yTop = DECK_Y + 0.52;
    const H = yTop - yBot;
    const ladder = new THREE.Group();
    for (const dz of [-0.24, 0.24]) {
      const stile = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, H, 6), woodDark);
      stile.position.set(0, yBot + H / 2, dz);
      ladder.add(stile);
    }
    const rungN = 2 + Math.round(2.5 * S);
    for (let i = 0; i < rungN; i++) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.56), woodPale);
      rung.position.set(0.03, yBot + 0.16 + (H - 0.42) * (i / (rungN - 1)), 0);
      ladder.add(rung);
    }
    // hangs just off the planking, bottom tucked in with the hull's curve
    ladder.position.set(beamAt(lz) + 0.1, 0, lz);
    ladder.rotation.z = -0.12;
    R.add(ladder);
  }

  /* ---------------- rudder blade ---------------- */
  rudderGroup = new THREE.Group();
  rudderGroup.position.set(0, 0.2, -4.05 * S);
  R.add(rudderGroup);
  {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.0 * S, 0.6 * S), woodDark);
    blade.position.set(0, -0.4 * S, -0.28 * S);
    rudderGroup.add(blade);
  }

  /* ---------------- bowsprit, lantern, props ---------------- */
  const sprTip = new THREE.Vector3(0, DECK_Y + (0.86 + 0.55 * S), (4.1 + 2.25) * S);
  {
    const sprLen = 2.4 * S;
    const spr = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, sprLen, 7), woodDark);
    spr.position.set(0, DECK_Y + 0.45 + 0.28 * S, 5.25 * S);
    spr.rotation.x = Math.PI / 2 - 0.215;
    R.add(spr);
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.5, 0.07), woodDark);
    post.position.set(0, DECK_Y + 0.78, -3.95 * S);
    R.add(post);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), lampMat);
    lamp.position.set(0, DECK_Y + 1.05, -3.95 * S);
    lamp.userData.noShadow = true;
    R.add(lamp);
    for (const [bx, bz] of [[-1.02, -3.25], [-0.72, -3.5]] as const) {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.68, 10), woodMat);
      barrel.position.set(bx * S, DECK_Y + 0.34, bz * S);
      R.add(barrel);
      for (const by of [-0.18, 0.18]) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.295, 0.022, 6, 14), bandMat);
        band.position.set(bx * S, DECK_Y + 0.34 + by, bz * S);
        band.rotation.x = Math.PI / 2;
        R.add(band);
      }
    }
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.62), woodPale);
    crate.position.set(1.0 * S, DECK_Y + 0.25, 2.95 * S);
    R.add(crate);
    const crateLid = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.07, 0.68), woodDark);
    crateLid.position.set(1.0 * S, DECK_Y + 0.53, 2.95 * S);
    R.add(crateLid);
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 7, 16), ropeMat);
    coil.position.set(-0.7 * S, DECK_Y + 0.07, 3.1 * S);
    coil.rotation.x = Math.PI / 2;
    R.add(coil);
  }

  /* ---------------- the anchor (windlass at the bow) ---------------- */
  {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.5, 8), woodDark);
    drum.rotation.z = Math.PI / 2;
    drum.position.set(0, DECK_Y + 0.22, 3.1 * S);
    R.add(drum);
    anchorRig = new THREE.Group();
    anchorRig.position.set(0.45 * S, DECK_Y + 0.1, 3.35 * S);
    R.add(anchorRig);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.2, 5), ropeMat);
    rope.position.y = -1.6;
    rope.userData.noShadow = true;
    anchorRig.add(rope);
    const metal = new THREE.MeshLambertMaterial({ color: 0x6f777e });
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6), metal);
    shank.position.y = -3.2;
    anchorRig.add(shank);
    const arms = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 6, 10, Math.PI), metal);
    arms.position.y = -3.55;
    arms.rotation.z = Math.PI;
    anchorRig.add(arms);
    anchorRig.visible = false;
  }

  /* ---------------- wheel at the helm ---------------- */
  wheelGroup = new THREE.Group();
  wheelGroup.position.set(layout.helm.x, DECK_Y + 0.75, layout.helm.z + 0.55 * S);
  R.add(wheelGroup);
  {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.05, 8, 20), woodDark);
    wheelGroup.add(rim);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), woodPale);
    wheelGroup.add(hub);
    for (let i = 0; i < 4; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.18, 0.05), woodDark);
      spoke.rotation.z = i * Math.PI / 4;
      wheelGroup.add(spoke);
    }
    for (let i = 0; i < 8; i++) {
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.16, 6), woodPale);
      const a = i * Math.PI / 4;
      handle.position.set(Math.cos(a) * 0.53, Math.sin(a) * 0.53, 0);
      handle.rotation.z = a;
      wheelGroup.add(handle);
    }
    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.75, 0.16), woodDark);
    pedestal.position.set(0, -0.55, 0);
    wheelGroup.add(pedestal);
  }

  /* ---------------- the cannon (port side; bought in the shop) ---------------- */
  cannonGroup = new THREE.Group();
  cannonGroup.position.set(-layout.deckX + 0.55, DECK_Y, -1.3 * S);
  R.add(cannonGroup);
  {
    const iron = new THREE.MeshLambertMaterial({ color: 0x2f3338 });
    // carriage: two cheeks + axles + little wheels
    for (const cx of [-0.18, 0.18]) {
      const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.62), woodDark);
      cheek.position.set(cx, 0.21, -0.02);
      cannonGroup.add(cheek);
    }
    for (const wz of [-0.22, 0.2]) {
      for (const wx of [-0.24, 0.24]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 10), woodPale);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.11, wz);
        cannonGroup.add(wheel);
      }
    }
    // barrel on its elevation pivot
    cannonPivot = new THREE.Group();
    cannonPivot.position.set(0, 0.42, 0);
    cannonGroup.add(cannonPivot);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.125, 1.05, 10), iron);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = 0.32;
    cannonPivot.add(barrel);
    const muzzle = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.022, 6, 12), iron);
    muzzle.position.z = 0.84;
    cannonPivot.add(muzzle);
    const breech = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), iron);
    breech.position.z = -0.24;
    cannonPivot.add(breech);
    cannonGroup.visible = owned.cannon;
  }

  /* ---------------- mast, boom, sails, rigging, flag ---------------- */
  const mastH = clamp(7.5 * S, 5.4, 23);
  const mastX = MAST_POS.x, mastZ = MAST_POS.z * S;
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, mastH, 8), woodDark);
  mast.position.set(mastX, DECK_Y + mastH / 2, mastZ);
  R.add(mast);
  const mastBall = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), woodPale);
  mastBall.position.set(mastX, DECK_Y + mastH + 0.05, mastZ);
  R.add(mastBall);

  const boomY = Math.max(2.05, 2.05 * S * 0.92);    // always clears first-person eye height
  boomGroup = new THREE.Group();
  boomGroup.position.set(mastX, DECK_Y + boomY, mastZ);
  R.add(boomGroup);
  const boomLen = 4.6 * S;
  const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, boomLen, 8), woodDark);
  boom.rotation.x = Math.PI / 2;
  boom.position.z = -boomLen / 2;
  boomGroup.add(boom);

  const sailH = DECK_Y + mastH - 0.6 - (DECK_Y + boomY);
  sailGeo = new THREE.PlaneGeometry(boomLen * 0.92, sailH, SAIL_W, SAIL_H);
  const sail = new THREE.Mesh(sailGeo, sailMat);
  sail.rotation.y = Math.PI / 2;
  sail.position.set(0, sailH / 2 + 0.1, -boomLen * 0.47);
  boomGroup.add(sail);
  sailBase = (sailGeo.attributes.position.array as Float32Array).slice();
  {
    const p = sailGeo.attributes.position.array as Float32Array;
    for (let iy = 0; iy <= SAIL_H; iy++) for (let ix = 0; ix <= SAIL_W; ix++) {
      const i = (iy * (SAIL_W + 1) + ix) * 3;
      const yNorm = (p[i + 1] + sailH / 2) / sailH;
      p[i] = p[i] * (1 - yNorm * 0.78) - yNorm * 0.38 * boomLen;
      sailBase[i] = p[i]; sailBase[i + 1] = p[i + 1]; sailBase[i + 2] = p[i + 2];
    }
    sailGeo.attributes.position.needsUpdate = true;
  }

  // jib between bowsprit tip, the masthead and a swinging clew
  jibGeo = new THREE.BufferGeometry();
  {
    const verts = new Float32Array((JIB_U + 1) * (JIB_V + 1) * 3);
    jibGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    const idx: number[] = [];
    for (let u = 0; u < JIB_U; u++) for (let v = 0; v < JIB_V; v++) {
      const a = u * (JIB_V + 1) + v, b = a + 1, c = a + JIB_V + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    jibGeo.setIndex(idx);
  }
  R.add(new THREE.Mesh(jibGeo, jibMat));
  JIB_TACK = new THREE.Vector3(0, sprTip.y + 0.1, sprTip.z - 0.4);
  JIB_HEAD = new THREE.Vector3(0, DECK_Y + mastH - 0.7, mastZ + 0.2);

  // standing rigging
  const rigLine = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => {
    const a = new THREE.Vector3(ax, ay, az), b = new THREE.Vector3(bx, by, bz);
    const d = b.clone().sub(a);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, d.length(), 5), ropeMat);
    m.position.copy(a).addScaledVector(d, 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    m.userData.noShadow = true;
    R.add(m);
  };
  const mTop = DECK_Y + mastH - 0.1;
  rigLine(mastX, mTop, mastZ, sprTip.x, sprTip.y, sprTip.z);
  rigLine(mastX, mTop - 0.1, mastZ, 0, DECK_Y + 0.2, -3.85 * S);
  for (const sd of [-1, 1]) {
    rigLine(mastX, mTop - 0.2, mastZ, sd * 1.5 * S, DECK_Y + 0.15, 0.25 * S);
    rigLine(mastX, mTop - 0.2, mastZ, sd * 1.42 * S, DECK_Y + 0.18, -0.95 * S);
  }

  // masthead pennant
  flagGroup = new THREE.Group();
  flagGroup.position.set(mastX, DECK_Y + mastH + 0.25, mastZ);
  R.add(flagGroup);
  flag = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.4, 6, 1), flagMat);
  flag.position.x = 0.65;
  flagGroup.add(flag);
  flagBase = (flag.geometry.attributes.position.array as Float32Array).slice();

  // station pads
  for (const [pos, mat] of [[layout.helm, padHelmMat], [layout.sailSta, padSailMat]] as const) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.06, 16), mat);
    pad.position.set(pos.x, DECK_Y + 0.02, pos.z);
    R.add(pad);
  }

  // shadows for the freshly built vessel
  R.traverse(o => {
    if (!(o as THREE.Mesh).isMesh || o.userData.noShadow) return;
    const m = (o as THREE.Mesh).material as THREE.Material;
    if (m && m.transparent) return;
    o.castShadow = true;
    o.receiveShadow = true;
  });
}

export function setBoatPreset(p: BoatPreset) {
  applyLayoutScale(p.scale);
  applyTuning(p.tune);
  shipInfo.crates = p.crates;
  buildShip(p.scale);
}

/* =========================== per-frame ship visuals =========================== */
let lastHeel = 0;
export function updateBoatVisuals(dt: number, t: number) {
  if (!shipRig) return;
  boatGroup.position.set(boat.pos.x, 0, boat.pos.z);
  boatGroup.rotation.y = boat.yaw;
  // cosmetic heel + wave bob — scaled by the sea state (weather / open sea / AAA water)
  const swell = env.swell;
  const fwd = headVec(boat.yaw);
  const af = dot2(boat.lastAccel, fwd);
  heelGroup.rotation.z = -boat.heel + Math.sin(t * 0.8) * CONFIG.bobPitch * swell - env.bigWave * 0.2;
  heelGroup.rotation.x = Math.sin(t * 0.62 + 1) * CONFIG.bobPitch * swell - af * 0.012;
  heelGroup.position.y = (Math.sin(t * 0.9) * CONFIG.bobAmp + Math.sin(t * 1.7 + 2) * CONFIG.bobAmp * 0.4) * swell
    + Math.abs(env.bigWave) * 0.4;

  const heelRate = Math.abs(boat.heel - lastHeel) / Math.max(dt, 1e-4);
  lastHeel = boat.heel;
  if (heelRate > 0.10) audio.creak(heelRate * 4);

  boomGroup.rotation.y = -boat.boomAngle;
  wheelGroup.rotation.z = -boat.rudder * 3;
  rudderGroup.rotation.y = -boat.rudder;
  anchorRig.visible = boat.anchored;

  // main sail cloth
  const d = wrapPi(wind.angle - boat.yaw);
  const maxF = tuning.sailPower * wind.strength;
  const power = clamp(boat.sailForce / Math.max(0.01, maxF), 0, 1);
  const luff = 1 - clamp(power * 2.2, 0, 1);
  const side = Math.sign(Math.sin(d)) || 1;
  const p = sailGeo.attributes.position.array as Float32Array;
  for (let iy = 0; iy <= SAIL_H; iy++) for (let ix = 0; ix <= SAIL_W; ix++) {
    const i = (iy * (SAIL_W + 1) + ix) * 3;
    const u = ix / SAIL_W, vN = iy / SAIL_H;
    const shape = Math.sin(u * Math.PI) * Math.sin(vN * Math.PI);
    let off = side * power * 0.6 * layout.scale * shape;
    off += Math.sin(t * 26 + u * 7 + vN * 5) * 0.16 * luff * shape;
    p[i] = sailBase[i]; p[i + 1] = sailBase[i + 1];
    p[i + 2] = sailBase[i + 2] + off;
  }
  sailGeo.attributes.position.needsUpdate = true;
  sailGeo.computeVertexNormals();

  // jib
  const S = layout.scale;
  const clew = new THREE.Vector3(Math.sin(boat.boomAngle) * 2.0 * S, DECK_Y + 1.55, 3.3 * S);
  const jp = jibGeo.attributes.position.array as Float32Array;
  const L = new THREE.Vector3(), E = new THREE.Vector3(), P = new THREE.Vector3();
  for (let u = 0; u <= JIB_U; u++) {
    const fu = u / JIB_U;
    L.lerpVectors(JIB_TACK, JIB_HEAD, fu);
    E.lerpVectors(clew, JIB_HEAD, fu);
    for (let v = 0; v <= JIB_V; v++) {
      const fv = v / JIB_V;
      P.lerpVectors(L, E, fv);
      const shape = Math.sin(fu * Math.PI) * Math.sin(fv * Math.PI);
      P.x += side * (0.3 * power + 0.04) * S * shape + Math.sin(t * 24 + fu * 6 + fv * 4) * 0.12 * luff * shape;
      const i = (u * (JIB_V + 1) + v) * 3;
      jp[i] = P.x; jp[i + 1] = P.y; jp[i + 2] = P.z;
    }
  }
  jibGeo.attributes.position.needsUpdate = true;
  jibGeo.computeVertexNormals();

  // pennant
  flagGroup.rotation.y = wrapPi(wind.angle - boat.yaw - Math.PI / 2);
  const fp = flag.geometry.attributes.position.array as Float32Array;
  for (let i = 0; i < fp.length; i += 3) {
    const u = (flagBase[i] + 0.65) / 1.3;
    fp[i + 2] = Math.sin(t * 10 + u * 6) * 0.12 * u;
  }
  flag.geometry.attributes.position.needsUpdate = true;

  if (dockArrow) {
    dockArrow.position.y = dockArrow.userData.baseY + Math.sin(t * 2.2) * 0.6;
    dockArrow.rotation.y = t * 1.5;
  }
}

buildShip(1);   // default sloop as the menu backdrop
