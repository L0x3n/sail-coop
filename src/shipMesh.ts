import * as THREE from 'three';
import { CONFIG, DECK_Y, GAPS, HELM_POS, MAST_POS, SAIL_STA } from './config';
import { clamp, dot2, headVec, lerp, wrapPi } from './mathUtil';
import { scene } from './scene';
import { boat, wind } from './state';
import { makePlankTexture, makeSailTexture } from './textures';
import { dockArrow } from './world';
import * as audio from './audio';

/* ===================================================================
   The ship. boatGroup carries position+yaw (the physics body);
   heelGroup carries cosmetic roll/pitch/heave. Everything on deck —
   including the pirates — lives in heelGroup so it inherits the heel.
   =================================================================== */
export const boatGroup = new THREE.Group();
export const heelGroup = new THREE.Group();
boatGroup.add(heelGroup);
scene.add(boatGroup);

const woodMat = new THREE.MeshLambertMaterial({ color: 0x8a5a33 });
const woodDark = new THREE.MeshLambertMaterial({ color: 0x5d3a20 });
const woodPale = new THREE.MeshLambertMaterial({ color: 0xa9764a });
const ropeMat = new THREE.MeshLambertMaterial({ color: 0x4a3826 });

/* ---------------- lofted hull with painted waterline ---------------- */
// cross sections: z, half beam at deck, keel depth, deck-edge height (sheer)
const SECS = [
  { z: -4.0, b: 1.30, k: 0.50, s: 1.06 },
  { z: -3.0, b: 1.55, k: 0.68, s: 1.00 },
  { z: -1.0, b: 1.65, k: 0.75, s: 0.96 },
  { z: 1.0, b: 1.60, k: 0.74, s: 0.96 },
  { z: 2.6, b: 1.30, k: 0.62, s: 1.02 },
  { z: 3.8, b: 0.55, k: 0.42, s: 1.16 },
  { z: 4.5, b: 0.06, k: 0.22, s: 1.34 },
];
function beamAt(z: number): number {
  for (let i = 0; i < SECS.length - 1; i++) {
    const a = SECS[i], b = SECS[i + 1];
    if (z >= a.z && z <= b.z) return lerp(a.b, b.b, (z - a.z) / (b.z - a.z));
  }
  return z < SECS[0].z ? SECS[0].b : SECS[SECS.length - 1].b;
}
{
  const PROF = 7;                       // points per side, keel -> deck edge
  const ringN = PROF * 2 - 1;
  const pos: number[] = [], col: number[] = [], idx: number[] = [];
  const cBottom = new THREE.Color(0x3c2a18);
  const cStripe = new THREE.Color(0xe8dcc0);
  const cWood = new THREE.Color(0x8a5a33);
  const paint = (y: number, sec: number) => {
    if (y < -0.12) return cBottom;
    if (y < 0.18) return cStripe;
    const c = cWood.clone();
    c.offsetHSL(0, 0, (sec % 2) * 0.022 - 0.011);
    return c;
  };
  SECS.forEach((sec, si) => {
    const pts: [number, number][] = [];
    for (let p = PROF - 1; p >= 0; p--) {           // left: deck edge down to keel
      const t = p / (PROF - 1);
      pts.push([-sec.b * Math.pow(Math.sin(t * Math.PI / 2), 0.85), -sec.k + (sec.s + sec.k) * Math.pow(t, 1.25)]);
    }
    for (let p = 1; p < PROF; p++) {                // right: keel up to deck edge
      const t = p / (PROF - 1);
      pts.push([sec.b * Math.pow(Math.sin(t * Math.PI / 2), 0.85), -sec.k + (sec.s + sec.k) * Math.pow(t, 1.25)]);
    }
    for (const [x, y] of pts) {
      pos.push(x, y, sec.z);
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
  // transom: fan over the stern ring
  const sternCenter = pos.length / 3;
  pos.push(0, 0.35, -4.02);
  col.push(cWood.r, cWood.g, cWood.b);
  for (let i = 0; i < ringN - 1; i++) idx.push(i + 1, i, sternCenter);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const hull = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
  heelGroup.add(hull);
}

/* ---------------- plank deck ---------------- */
{
  const deckTex = makePlankTexture('#a9764a', '#7a5232');
  deckTex.repeat.set(2, 7);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 7.9),
    new THREE.MeshLambertMaterial({ map: deckTex }));
  deck.position.y = DECK_Y - 0.05;
  heelGroup.add(deck);
}

/* ---------------- bulwarks (solid rail panels) with gangway gaps ---------------- */
{
  const inGapEdge = (z: number) => GAPS.some(g => z > g.z0 - 0.05 && z < g.z1 + 0.05);
  for (const side of [-1, 1]) {
    for (let zc = -3.78; zc <= 3.85; zc += 0.62) {
      if (inGapEdge(zc)) continue;
      const slope = (beamAt(zc + 0.3) - beamAt(zc - 0.3)) / 0.6;
      const x = side * (beamAt(zc) - 0.06);
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.64), woodMat);
      panel.position.set(x, DECK_Y + 0.25, zc);
      panel.rotation.y = side * Math.atan(slope);   // hull taper angles panels inward
      heelGroup.add(panel);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.7), woodPale);
      cap.position.set(x, DECK_Y + 0.52, zc);
      cap.rotation.y = panel.rotation.y;
      heelGroup.add(cap);
    }
  }
  // stern board across the transom top
  const stern = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 0.1), woodMat);
  stern.position.set(0, DECK_Y + 0.27, -3.92);
  heelGroup.add(stern);
  const sternCap = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.06, 0.18), woodPale);
  sternCap.position.set(0, DECK_Y + 0.56, -3.92);
  heelGroup.add(sternCap);
}

/* ---------------- rudder blade (visibly steers) ---------------- */
const rudderGroup = new THREE.Group();
rudderGroup.position.set(0, 0.2, -4.05);
heelGroup.add(rudderGroup);
{
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.0, 0.6), woodDark);
  blade.position.set(0, -0.4, -0.28);
  rudderGroup.add(blade);
}

/* ---------------- bowsprit + lantern + deck props ---------------- */
const BOWSPRIT_TIP = new THREE.Vector3(0, 1.86, 6.35);
{
  const spr = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 2.4, 7), woodDark);
  spr.position.set(0, 1.6, 5.25);
  spr.rotation.x = Math.PI / 2 - 0.215;
  heelGroup.add(spr);
  // warm stern lantern
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.5, 0.07), woodDark);
  post.position.set(0, DECK_Y + 0.78, -3.95);
  heelGroup.add(post);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6),
    new THREE.MeshLambertMaterial({ color: 0xffd27a, emissive: 0xff9a2a, emissiveIntensity: 1.4 }));
  lamp.position.set(0, DECK_Y + 1.05, -3.95);
  lamp.userData.noShadow = true;
  heelGroup.add(lamp);
  // barrels (port aft corner)
  for (const [bx, bz] of [[-1.02, -3.25], [-0.72, -3.5]] as const) {
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.68, 10), woodMat);
    barrel.position.set(bx, DECK_Y + 0.34, bz);
    heelGroup.add(barrel);
    for (const by of [-0.18, 0.18]) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.295, 0.022, 6, 14),
        new THREE.MeshLambertMaterial({ color: 0x3a3a3a }));
      band.position.set(bx, DECK_Y + 0.34 + by, bz);
      band.rotation.x = Math.PI / 2;
      heelGroup.add(band);
    }
  }
  // crate (starboard bow)
  const crate = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.62), woodPale);
  crate.position.set(1.0, DECK_Y + 0.25, 2.95);
  heelGroup.add(crate);
  const crateLid = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.07, 0.68), woodDark);
  crateLid.position.set(1.0, DECK_Y + 0.53, 2.95);
  heelGroup.add(crateLid);
  // rope coil on the foredeck
  const coil = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 7, 16), ropeMat);
  coil.position.set(-0.7, DECK_Y + 0.07, 3.1);
  coil.rotation.x = Math.PI / 2;
  heelGroup.add(coil);
}

/* ---------------- helm: a proper wheel ---------------- */
export const wheelGroup = new THREE.Group();
wheelGroup.position.set(HELM_POS.x, DECK_Y + 0.75, HELM_POS.z + 0.55);
heelGroup.add(wheelGroup);
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

/* ---------------- mast, boom, sails, rigging, flag ---------------- */
const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 7.5, 8), woodDark);
mast.position.set(MAST_POS.x, DECK_Y + 3.75, MAST_POS.z);
heelGroup.add(mast);
const mastBall = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), woodPale);
mastBall.position.set(MAST_POS.x, DECK_Y + 7.55, MAST_POS.z);
heelGroup.add(mastBall);

export const boomGroup = new THREE.Group();
boomGroup.position.set(MAST_POS.x, DECK_Y + 2.05, MAST_POS.z);  // boom clears first-person eye height
heelGroup.add(boomGroup);
const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.6, 8), woodDark);
boom.rotation.x = Math.PI / 2;
boom.position.z = -2.3;
boomGroup.add(boom);

// main sail: vertical cloth, verts animated each frame
const SAIL_W = 8, SAIL_H = 8;
const sailGeo = new THREE.PlaneGeometry(4.2, 4.6, SAIL_W, SAIL_H);
const sailMat = new THREE.MeshLambertMaterial({ map: makeSailTexture(), side: THREE.DoubleSide });
const sail = new THREE.Mesh(sailGeo, sailMat);
sail.rotation.y = Math.PI / 2;
sail.position.set(0, 2.6, -2.15);
boomGroup.add(sail);
const sailBase = (sailGeo.attributes.position.array as Float32Array).slice();
{
  // taper to a triangle-ish gaff shape: pull upper rows toward the mast
  const p = sailGeo.attributes.position.array as Float32Array;
  for (let iy = 0; iy <= SAIL_H; iy++) for (let ix = 0; ix <= SAIL_W; ix++) {
    const i = (iy * (SAIL_W + 1) + ix) * 3;
    const yNorm = (p[i + 1] + 2.3) / 4.6;
    p[i] = p[i] * (1 - yNorm * 0.78) - yNorm * 1.6;
    sailBase[i] = p[i]; sailBase[i + 1] = p[i + 1]; sailBase[i + 2] = p[i + 2];
  }
  sailGeo.attributes.position.needsUpdate = true;
}

// jib: ruled triangle between bowsprit tip, masthead and a swinging clew
const JIB_U = 7, JIB_V = 5;
const jibGeo = new THREE.BufferGeometry();
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
const jib = new THREE.Mesh(jibGeo, new THREE.MeshLambertMaterial({ color: 0xf3eddc, side: THREE.DoubleSide }));
heelGroup.add(jib);
const JIB_TACK = new THREE.Vector3(0, 2.0, 5.9);
const JIB_HEAD = new THREE.Vector3(0, 7.3, 0.8);

// standing rigging
function rigLine(ax: number, ay: number, az: number, bx: number, by: number, bz: number, r = 0.022) {
  const a = new THREE.Vector3(ax, ay, az), b = new THREE.Vector3(bx, by, bz);
  const d = b.clone().sub(a);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 5), ropeMat);
  m.position.copy(a).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
  m.userData.noShadow = true;
  heelGroup.add(m);
}
rigLine(0, 8.4, 0.6, BOWSPRIT_TIP.x, BOWSPRIT_TIP.y, BOWSPRIT_TIP.z);   // forestay
rigLine(0, 8.3, 0.6, 0, 1.2, -3.85);                                     // backstay
for (const s of [-1, 1]) {
  rigLine(0, 8.2, 0.6, s * 1.5, 1.15, 0.25);                             // shrouds
  rigLine(0, 8.2, 0.6, s * 1.42, 1.18, -0.95);
}

// masthead pennant points downwind — the in-world wind cue
const flagGroup = new THREE.Group();
flagGroup.position.set(0, 7.75, 0);
mast.add(flagGroup);
const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.4, 6, 1),
  new THREE.MeshBasicMaterial({ color: 0xe8443a, side: THREE.DoubleSide }));
flag.position.x = 0.65;
flagGroup.add(flag);
const flagBase = (flag.geometry.attributes.position.array as Float32Array).slice();

// station pads so players can find them
for (const [pos, c] of [[HELM_POS, 0x4dabf7], [SAIL_STA, 0x69db7c]] as const) {
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.06, 16),
    new THREE.MeshLambertMaterial({ color: c }));
  pad.position.set(pos.x, DECK_Y + 0.02, pos.z);
  heelGroup.add(pad);
}

/* =========================== per-frame ship visuals =========================== */
let lastHeel = 0;
export function updateBoatVisuals(dt: number, t: number) {
  boatGroup.position.set(boat.pos.x, 0, boat.pos.z);
  boatGroup.rotation.y = boat.yaw;
  // cosmetic heel + wave bob (never feeds hull physics)
  const fwd = headVec(boat.yaw);
  const af = dot2(boat.lastAccel, fwd);
  heelGroup.rotation.z = -boat.heel + Math.sin(t * 0.8) * CONFIG.bobPitch;
  heelGroup.rotation.x = Math.sin(t * 0.62 + 1) * CONFIG.bobPitch - af * 0.012;
  heelGroup.position.y = Math.sin(t * 0.9) * CONFIG.bobAmp + Math.sin(t * 1.7 + 2) * CONFIG.bobAmp * 0.4;

  // hull groans when the heel changes fast
  const heelRate = Math.abs(boat.heel - lastHeel) / Math.max(dt, 1e-4);
  lastHeel = boat.heel;
  if (heelRate > 0.10) audio.creak(heelRate * 4);

  boomGroup.rotation.y = -boat.boomAngle;
  wheelGroup.rotation.z = -boat.rudder * 3;
  rudderGroup.rotation.y = -boat.rudder;

  // main sail cloth: belly out when powered, flutter when luffing
  const d = wrapPi(wind.angle - boat.yaw);
  const maxF = CONFIG.sailPower * wind.strength;
  const power = clamp(boat.sailForce / Math.max(0.01, maxF), 0, 1);
  const luff = 1 - clamp(power * 2.2, 0, 1);
  const side = Math.sign(Math.sin(d)) || 1;
  const p = sailGeo.attributes.position.array as Float32Array;
  for (let iy = 0; iy <= SAIL_H; iy++) for (let ix = 0; ix <= SAIL_W; ix++) {
    const i = (iy * (SAIL_W + 1) + ix) * 3;
    const u = ix / SAIL_W, vN = iy / SAIL_H;
    const shape = Math.sin(u * Math.PI) * Math.sin(vN * Math.PI);
    let off = side * power * 0.6 * shape;
    off += Math.sin(t * 26 + u * 7 + vN * 5) * 0.16 * luff * shape;
    p[i] = sailBase[i]; p[i + 1] = sailBase[i + 1];
    p[i + 2] = sailBase[i + 2] + off;
  }
  sailGeo.attributes.position.needsUpdate = true;
  sailGeo.computeVertexNormals();

  // jib: ruled surface tack->head with a clew that follows the main's side
  const clew = new THREE.Vector3(Math.sin(boat.boomAngle) * 2.0, 2.55, 3.3);
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
      P.x += side * (0.3 * power + 0.04) * shape + Math.sin(t * 24 + fu * 6 + fv * 4) * 0.12 * luff * shape;
      const i = (u * (JIB_V + 1) + v) * 3;
      jp[i] = P.x; jp[i + 1] = P.y; jp[i + 2] = P.z;
    }
  }
  jibGeo.attributes.position.needsUpdate = true;
  jibGeo.computeVertexNormals();

  // pennant points downwind (world-aligned), flutters
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
