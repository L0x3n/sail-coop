import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, v2 } from './mathUtil';
import { scene } from './scene';
import { owned } from './state';
import { makeCausticTexture, makePlankTexture, makeSeaFoamTexture } from './textures';

/* =========================== world: island, pier, rocks =========================== */
export const islandPos = v2(0, -CONFIG.islandDist);   // upwind of spawn (wind blows +z at start)

// the HOME pier sticks out from the big island toward open water (+z)
export const pierA = v2(islandPos.x, islandPos.z + CONFIG.islandRadius - 2);   // island end
export const pierB = v2(islandPos.x, islandPos.z + CONFIG.islandRadius + 26);  // water end
// route piers: palm isle (west-facing), sandbar (north-facing), skerry (east-facing)
export const destA = v2(137, -70);   // palm isle end
export const destB = v2(111, -70);   // water end
const sandA = v2(95, -254), sandB = v2(95, -230);
const skerA = v2(-150, -150), skerB = v2(-126, -150);
const tinyA = v2(-112, 40), tinyB = v2(-90, 40);
/* pier segments (boat collision) + walkable surfaces (shore mode) */
export const PIERS = [
  { a: pierA, b: pierB },
  { a: destA, b: destB },
  { a: sandA, b: sandB },
  { a: skerA, b: skerB },
  { a: tinyA, b: tinyB },
];
export const WALKWAYS = [
  { x0: pierA.x - 2, x1: pierA.x + 2, z0: pierA.z - 1, z1: pierB.z + 0.3 },
  { x0: destB.x - 0.3, x1: destA.x + 1, z0: destA.z - 2, z1: destA.z + 2 },
  { x0: sandA.x - 2, x1: sandA.x + 2, z0: sandB.z - 0.3, z1: sandA.z + 1 },
  { x0: skerA.x - 1, x1: skerB.x + 0.3, z0: skerA.z - 2, z1: skerA.z + 2 },
  { x0: tinyA.x - 1, x1: tinyB.x + 0.3, z0: tinyA.z - 2, z1: tinyA.z + 2 },
];
export const SHORE_Y = 1.15;         // pier deck height (characters walk here)
/* DELIVERY is MUTATED by setRoute — every consumer reads live values */
export const DELIVERY = { x: 117, z: -70, r: 3.4 };
export const HOME_LOAD = { x: 0, z: -207 };    // where fresh shipments appear
export const HOME_DOCK = { x: 4.8, z: -206 };  // mooring (event-director safe zone)
export const BOARD_SPOT = { x: -1.5, z: -204 };// the route board on the home pier

/* --- the route network: pick your poison at the board --- */
export interface RouteDef {
  name: string; pay: number; desc: string;
  del: { x: number; z: number };
  locked?: () => boolean;
  lockHint?: string;
}
export const ROUTES: RouteDef[] = [
  { name: 'Palm Run', pay: 10, desc: 'a gentle reach — easy money for a first run', del: { x: 117, z: -70 } },
  { name: 'Sandbar Hop', pay: 16, desc: 'short, but dead upwind — you will have to tack', del: { x: 95, z: -236 } },
  { name: 'Skerry Slog', pay: 24, desc: 'a long beat out past the rocks', del: { x: -132, z: -150 } },
  { name: 'North Light', pay: 32, desc: 'the long northern haul — best pay on the board', del: { x: -96, z: 40 },
    locked: () => !owned.chartNorth, lockHint: 'buy the Northern chart at the chandler' },
];
export let routeIdx = 0;
export function setRoute(i: number) {
  routeIdx = ((i % ROUTES.length) + ROUTES.length) % ROUTES.length;
  const r = ROUTES[routeIdx];
  DELIVERY.x = r.del.x;
  DELIVERY.z = r.del.z;
  repositionDeliveryMarkers();
}
export function nextUnlockedRoute(from: number): number {
  for (let k = 1; k <= ROUTES.length; k++) {
    const i = (from + k) % ROUTES.length;
    if (!ROUTES[i].locked?.()) return i;
  }
  return from;
}
export const SHOP_SPOT = { x: 1.5, z: -200 };  // the chandler's stall on the home pier

export interface Obstacle { x: number; z: number; r: number; }
export const obstacles: Obstacle[] = [];
export let dockArrow: THREE.Mesh;
let delMat: THREE.Mesh, delPole: THREE.Mesh, delFlag: THREE.Mesh;
function repositionDeliveryMarkers() {
  if (!delMat) return;
  delMat.position.set(DELIVERY.x, 1.17, DELIVERY.z);
  delPole.position.set(DELIVERY.x, 2.9, DELIVERY.z - 1.8);
  delFlag.position.set(DELIVERY.x + 0.6, 4.3, DELIVERY.z - 1.8);
  dockArrow.position.set(DELIVERY.x, 8, DELIVERY.z);
}

/* smaller islands scattered off the main corridor — scenery to explore */
export const EXTRA_ISLES = [
  { x: 150, z: -70, r: 13, palms: 2, hill: true },
  { x: -160, z: -150, r: 10, palms: 0, hill: false },   // bare skerry
  { x: 95, z: -268, r: 15, palms: 3, hill: true },
  { x: -120, z: 40, r: 8, palms: 1, hill: false },      // tiny one behind spawn
];
/* sunlit shallows ring every island — snorkel scenery lives here */
export const SHALLOWS = [
  { x: islandPos.x, z: islandPos.z, r: CONFIG.islandRadius },
  ...EXTRA_ISLES.map(i => ({ x: i.x, z: i.z, r: i.r })),
];

/* ---- animated shore: breaking foam at the waterline + caustics on the shelf ---- */
const shoreFoamMat = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uFoam: { value: makeSeaFoamTexture() } },
  transparent: true, depthWrite: false, side: THREE.DoubleSide,
  vertexShader: `
    attribute float aShore; varying float vShore; varying vec2 vWorld;
    void main() {
      vShore = aShore;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: `
    uniform float uTime; uniform sampler2D uFoam;
    varying float vShore; varying vec2 vWorld;
    void main() {
      float l1 = texture2D(uFoam, vWorld * 0.05  + vec2(uTime * 0.013, -uTime * 0.009)).r;
      float l2 = texture2D(uFoam, vWorld * 0.026 - vec2(uTime * 0.007,  uTime * 0.011)).r;
      float lace = l1 * 0.6 + l2 * 0.55;
      float breath = sin(uTime * 0.5 + vShore * 0.2) * 1.3;   // the waterline laps in and out
      float d = vShore - breath;                              // signed dist from the breaking line
      // foam peaks at the line, washes up the beach (d<0), thins out into the water (d>0)
      float band = smoothstep(3.0, 0.0, d) * smoothstep(-1.8, 0.2, d);
      float a = clamp(band * (0.30 + 0.8 * lace), 0.0, 1.0);
      if (a < 0.03) discard;
      gl_FragColor = vec4(vec3(0.95, 0.99, 1.0), a);
    }`,
});
const causticTex = makeCausticTexture();
const causticLayers: { mat: THREE.MeshBasicMaterial; sx: number; sz: number; ph: number }[] = [];
/* drive the foam shader clock + scroll/shimmer the caustics (called each frame) */
export function updateShores(t: number) {
  shoreFoamMat.uniforms.uTime.value = t;
  for (const c of causticLayers) {
    if (c.mat.map) c.mat.map.offset.set((t * c.sx) % 1, (t * c.sz) % 1);
    c.mat.opacity = 0.24 + 0.14 * Math.sin(t * 0.7 + c.ph);
  }
}
function buildShoreFoam(cx: number, cz: number, shoreR: number) {
  const geo = new THREE.RingGeometry(shoreR - 4, shoreR + 6, 56, 2);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const aShore = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) aShore[i] = Math.hypot(pos.getX(i), pos.getZ(i)) - shoreR;
  geo.setAttribute('aShore', new THREE.BufferAttribute(aShore, 1));
  const foam = new THREE.Mesh(geo, shoreFoamMat);
  foam.position.set(cx, 0.08, cz);
  foam.userData.noShadow = true;
  foam.renderOrder = 2;
  scene.add(foam);
}
function buildCaustics(cx: number, cz: number, r: number) {
  for (let L = 0; L < 2; L++) {
    const map = causticTex.clone();
    map.needsUpdate = true;
    const rep = (2 * (r + 11)) / 13;
    map.repeat.set(rep, rep);
    const mat = new THREE.MeshBasicMaterial({
      map, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const disc = new THREE.Mesh(new THREE.CircleGeometry(r + 11, 40), mat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.set(cx, -1.08 + L * 0.04, cz);
    disc.userData.noShadow = true;
    disc.renderOrder = -1;                  // under the transparent water, over the shelf
    scene.add(disc);
    causticLayers.push({ mat, sx: L ? 0.010 : -0.013, sz: L ? -0.008 : 0.011, ph: L * 2.1 + cx * 0.05 });
  }
}

export function buildWorld() {
  /* ---- the sea floor: pitch-dark deeps, bright sandy shallows near shore ---- */
  {
    const deep = new THREE.Mesh(new THREE.PlaneGeometry(3600, 3600),
      new THREE.MeshLambertMaterial({ color: 0x0a2c3c }));
    deep.rotation.x = -Math.PI / 2;
    deep.position.y = -9;
    deep.userData.noShadow = true;
    scene.add(deep);
    const shelfMat = new THREE.MeshLambertMaterial({ color: 0xc4ab72 });
    const shelfBrightMat = new THREE.MeshLambertMaterial({ color: 0xe4d094 });
    const starMats = [0xff6b6b, 0xff922b, 0xf06595, 0xfcc419]
      .map(c => new THREE.MeshLambertMaterial({ color: c }));
    const pebbleMat = new THREE.MeshLambertMaterial({ color: 0x9aa5a1 });
    const weedMat = new THREE.MeshLambertMaterial({ color: 0x2f9e68 });
    for (const sh of SHALLOWS) {
      const outer = new THREE.Mesh(new THREE.CircleGeometry(sh.r + 22, 28), shelfMat);
      outer.rotation.x = -Math.PI / 2;
      outer.position.set(sh.x, -2.9, sh.z);
      outer.userData.noShadow = true;
      scene.add(outer);
      const inner = new THREE.Mesh(new THREE.CircleGeometry(sh.r + 10, 24), shelfBrightMat);
      inner.rotation.x = -Math.PI / 2;
      inner.position.set(sh.x, -1.25, sh.z);
      inner.userData.noShadow = true;
      scene.add(inner);
      // seastars sunbathing on the bright shelf
      for (let i = 0; i < 7; i++) {
        const star = new THREE.Group();
        const mat = starMats[Math.floor(Math.random() * starMats.length)];
        for (let k = 0; k < 5; k++) {
          const arm = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.14), mat);
          const a = k * TAU / 5;
          arm.rotation.y = a;
          arm.position.set(Math.cos(a) * 0.16, 0, -Math.sin(a) * 0.16);
          star.add(arm);
        }
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.1, 6), mat);
        star.add(hub);
        const sa = Math.random() * TAU, sr = sh.r + 2 + Math.random() * 7;
        star.position.set(sh.x + Math.cos(sa) * sr, -1.18, sh.z + Math.sin(sa) * sr);
        star.rotation.y = Math.random() * TAU;
        star.traverse(o => { o.userData.noShadow = true; });
        scene.add(star);
      }
      // pebbles + a few seaweed tufts
      for (let i = 0; i < 8; i++) {
        const pa = Math.random() * TAU, pr = sh.r + 1.5 + Math.random() * 8.5;
        if (i % 3 === 2) {
          const weed = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.9 + Math.random() * 0.7, 5), weedMat);
          weed.position.set(sh.x + Math.cos(pa) * pr, -0.85, sh.z + Math.sin(pa) * pr);
          weed.rotation.z = (Math.random() - 0.5) * 0.4;
          weed.userData.noShadow = true;
          scene.add(weed);
        } else {
          const peb = new THREE.Mesh(new THREE.SphereGeometry(0.14 + Math.random() * 0.16, 6, 5), pebbleMat);
          peb.scale.y = 0.45;
          peb.position.set(sh.x + Math.cos(pa) * pr, -1.2, sh.z + Math.sin(pa) * pr);
          peb.userData.noShadow = true;
          scene.add(peb);
        }
      }
      // breaking foam at the waterline + caustics dancing on the bright shelf
      buildShoreFoam(sh.x, sh.z, sh.r + 0.8);
      buildCaustics(sh.x, sh.z, sh.r);
    }
  }

  /* faceted, vertex-colored mounds — chunky stylized rock with grass tops */
  const moundMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
  const cGrassA = new THREE.Color(0x4fae5f), cGrassB = new THREE.Color(0x6cc26f);
  const cRock = new THREE.Color(0x8d9296), cRockWarm = new THREE.Color(0xa89878);
  const cSandFoot = new THREE.Color(0xeed9a2);
  const buildMound = (wx: number, wz: number, r: number, h: number, seed: number) => {
    const geo = new THREE.ConeGeometry(r, h, 12, 5).toNonIndexed();
    const p = geo.attributes.position.array as Float32Array;
    // radial displacement hashed from the ORIGINAL position so shared edges stay sealed
    for (let i = 0; i < p.length; i += 3) {
      const a = Math.atan2(p[i], p[i + 2]);
      const yn = (p[i + 1] + h / 2) / h;
      const n = Math.sin(a * 3 + seed) * 0.5 + Math.sin(a * 7 + yn * 4 + seed * 2) * 0.3 + Math.sin(a * 13 - yn * 2) * 0.2;
      const f = 1 + n * 0.2;
      p[i] *= f; p[i + 2] *= f;
      p[i + 1] += Math.sin(a * 5 + seed) * h * 0.03;
    }
    geo.computeVertexNormals();
    const nrm = geo.attributes.normal.array as Float32Array;
    const col = new Float32Array(p.length);
    const c = new THREE.Color();
    for (let f3 = 0; f3 < p.length; f3 += 9) {        // one flat color per triangle
      const yn = ((p[f3 + 1] + p[f3 + 4] + p[f3 + 7]) / 3 + h / 2) / h;
      const upness = (nrm[f3 + 1] + nrm[f3 + 4] + nrm[f3 + 7]) / 3;
      const hash = Math.abs(Math.sin(f3 * 0.73 + seed));
      if (yn < 0.1) c.copy(cSandFoot);
      else if (upness > 0.6 && yn > 0.2) c.lerpColors(cGrassA, cGrassB, hash);
      else if (upness < 0.42) c.copy(cRock).offsetHSL(0, 0, hash * 0.05 - 0.025);
      else c.lerpColors(cRockWarm, cGrassA, hash * 0.4);
      for (let k = 0; k < 9; k += 3) { col[f3 + k] = c.r; col[f3 + k + 1] = c.g; col[f3 + k + 2] = c.b; }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.Mesh(geo, moundMat);
    m.position.set(wx, h / 2 + 0.6, wz);
    scene.add(m);
  };

  /* beaches: irregular displaced sand discs, dry on top, damp-darkening to the waterline */
  const beachMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const cBeachDry = new THREE.Color(0xf0dca4), cBeachWet = new THREE.Color(0xcaa96f), cBeachDeep = new THREE.Color(0xb1925d);
  const buildBeach = (cx: number, cz: number, r: number, seed: number) => {
    const H = 2.6, beachY = -0.7;
    const geo = new THREE.CylinderGeometry(r, r + 3, H, 44, 1, false).toNonIndexed();
    const p = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < p.length; i += 3) {
      const rad = Math.hypot(p[i], p[i + 2]);
      if (rad > 0.5) {                                       // leave the cap centres put
        const a = Math.atan2(p[i], p[i + 2]);
        const n = Math.sin(a * 3 + seed) * 0.5 + Math.sin(a * 6 + seed * 2) * 0.3 + Math.sin(a * 11 + seed) * 0.2;
        const f = 1 + n * 0.1;
        p[i] *= f; p[i + 2] *= f;
      }
    }
    geo.computeVertexNormals();
    const col = new Float32Array(p.length);
    const c = new THREE.Color();
    for (let i = 0; i < p.length; i += 3) {
      const wy = p[i + 1] + beachY;                          // world height of this vertex
      if (wy > 0.35) c.copy(cBeachDry);
      else if (wy > -0.4) c.copy(cBeachDry).lerp(cBeachWet, (0.35 - wy) / 0.75);
      else c.copy(cBeachWet).lerp(cBeachDeep, Math.min(1, (-0.4 - wy) / 1.2));
      col[i] = c.r; col[i + 1] = c.g; col[i + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.Mesh(geo, beachMat);
    m.position.set(cx, beachY, cz);
    m.receiveShadow = true;
    scene.add(m);
  };

  /* ---- island life: grassy clumps, flowers, shells, driftwood ----
     the dense bits (grass/stems/flowers/shells) are instanced for cheap draws */
  const grassMat = new THREE.MeshLambertMaterial({ color: 0x5aa84a, flatShading: true });
  const bushMat = new THREE.MeshLambertMaterial({ color: 0x47974f, flatShading: true });
  const stemMat = new THREE.MeshLambertMaterial({ color: 0x3f8f46 });
  const driftMat = new THREE.MeshLambertMaterial({ color: 0xcabfa3, flatShading: true });
  const flowerMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x222018, emissiveIntensity: 0.25 });
  const shellMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const FLOWER_COLS = [0xff6b6b, 0xffd43b, 0xf783ac, 0xffffff, 0xda77f2, 0xff922b].map(c => new THREE.Color(c));
  const SHELL_COLS = [0xffe3c2, 0xffd0d6, 0xf0e6ff, 0xfff0b3].map(c => new THREE.Color(c));
  const bladeGeo = new THREE.ConeGeometry(0.05, 0.5, 4);
  const bushGeo = new THREE.IcosahedronGeometry(0.6, 0);
  const stemGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.46, 4);
  const headGeo = new THREE.SphereGeometry(0.11, 6, 5);
  const shellGeo = new THREE.ConeGeometry(0.13, 0.1, 7);
  interface Xf { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number; c?: number; }
  const grassXf: Xf[] = [], stemXf: Xf[] = [], flowerXf: Xf[] = [], shellXf: Xf[] = [];
  const scatterIsland = (cx: number, cz: number, r: number) => {
    const clumps = Math.max(3, Math.round(r * 0.5));
    for (let k = 0; k < clumps; k++) {
      const a = Math.random() * TAU, rad = (0.32 + Math.random() * 0.52) * r;
      const gx = cx + Math.cos(a) * rad, gz = cz + Math.sin(a) * rad;
      for (let b = 0; b < 4; b++)
        grassXf.push({ x: gx + (Math.random() - 0.5) * 0.8, y: 0.85, z: gz + (Math.random() - 0.5) * 0.8,
          rx: (Math.random() - 0.5) * 0.3, ry: Math.random() * TAU, rz: (Math.random() - 0.5) * 0.3, s: 0.7 + Math.random() * 0.7 });
      if (Math.random() < 0.6) {
        const bush = new THREE.Mesh(bushGeo, bushMat);
        bush.position.set(gx + (Math.random() - 0.5) * 1.2, 0.95, gz + (Math.random() - 0.5) * 1.2);
        bush.scale.set(0.7 + Math.random() * 0.6, 0.5 + Math.random() * 0.3, 0.7 + Math.random() * 0.6);
        bush.castShadow = true;
        scene.add(bush);
      }
      const fn = 2 + ((Math.random() * 3) | 0);
      for (let f = 0; f < fn; f++) {
        const fx = gx + (Math.random() - 0.5) * 1.5, fz = gz + (Math.random() - 0.5) * 1.5;
        stemXf.push({ x: fx, y: 0.83, z: fz, rx: 0, ry: 0, rz: (Math.random() - 0.5) * 0.2, s: 1 });
        flowerXf.push({ x: fx, y: 1.08, z: fz, rx: 0, ry: Math.random() * TAU, rz: 0, s: 0.7 + Math.random() * 0.7, c: (Math.random() * FLOWER_COLS.length) | 0 });
      }
    }
    const shoreN = Math.max(3, Math.round(r * 0.4));
    for (let s = 0; s < shoreN; s++) {
      const a = Math.random() * TAU, rad = (0.85 + Math.random() * 0.13) * r;
      const sx = cx + Math.cos(a) * rad, sz = cz + Math.sin(a) * rad;
      if (Math.random() < 0.22) {
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 1.4 + Math.random(), 7), driftMat);
        log.position.set(sx, 0.5, sz);
        log.rotation.set(Math.PI / 2, Math.random() * TAU, 0);
        log.castShadow = true;
        scene.add(log);
      } else {
        shellXf.push({ x: sx, y: 0.5, z: sz, rx: Math.random() * 0.5, ry: Math.random() * TAU, rz: Math.random() * 0.6, s: 0.7 + Math.random() * 0.6, c: (Math.random() * SHELL_COLS.length) | 0 });
      }
    }
  };
  const _dummy = new THREE.Object3D();
  const buildInstanced = (geo: THREE.BufferGeometry, mat: THREE.Material, xf: Xf[], cols?: THREE.Color[]) => {
    if (!xf.length) return;
    const im = new THREE.InstancedMesh(geo, mat, xf.length);
    im.castShadow = false; im.userData.noShadow = true;     // tiny things skip the shadow pass
    xf.forEach((t, i) => {
      _dummy.position.set(t.x, t.y, t.z);
      _dummy.rotation.set(t.rx, t.ry, t.rz);
      _dummy.scale.setScalar(t.s);
      _dummy.updateMatrix();
      im.setMatrixAt(i, _dummy.matrix);
      if (cols && t.c !== undefined) im.setColorAt(i, cols[t.c]);
    });
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
    scene.add(im);
  };

  buildBeach(islandPos.x, islandPos.z, CONFIG.islandRadius, 1.7);
  buildMound(islandPos.x - 6, islandPos.z - 8, 24, 14, 1.7);
  buildMound(islandPos.x + 14, islandPos.z + 2, 14, 8.5, 4.2);
  scatterIsland(islandPos.x, islandPos.z, CONFIG.islandRadius);

  // curvy palms with droopy two-tone fronds and coconuts
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0xa8743f });
  const leafMatA = new THREE.MeshLambertMaterial({ color: 0x3f9f4c, flatShading: true });
  const leafMatB = new THREE.MeshLambertMaterial({ color: 0x5cbb62, flatShading: true });
  const cocoMat = new THREE.MeshLambertMaterial({ color: 0x6b4a26 });
  const buildPalm = (wx: number, wz: number, lean: number) => {
    const palm = new THREE.Group();
    let y = 1.5;
    for (let s = 0; s < 5; s++) {
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.22 - s * 0.02, 0.28 - s * 0.02, 1.3, 6), trunkMat);
      seg.position.set(Math.sin(lean) * s * 0.55, y, 0);
      seg.rotation.z = lean * (s / 4);
      palm.add(seg);
      y += 1.2;
    }
    const topX = Math.sin(lean) * 2.2;
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.55, 3.6, 4), i % 2 ? leafMatA : leafMatB);
      leaf.scale.z = 0.3;                                  // flat blades
      leaf.position.set(topX, y - 0.35, 0);
      leaf.rotation.z = Math.PI / 2.12 + (i % 3) * 0.09;   // proper tropical droop
      leaf.rotation.y = i * TAU / 7 + 0.2;
      palm.add(leaf);
    }
    for (let i = 0; i < 3; i++) {
      const coco = new THREE.Mesh(new THREE.SphereGeometry(0.16, 7, 6), cocoMat);
      const a = i * TAU / 3;
      coco.position.set(topX + Math.cos(a) * 0.28, y - 0.55, Math.sin(a) * 0.28);
      palm.add(coco);
    }
    palm.position.set(wx, 0, wz);
    scene.add(palm);
  };
  for (const [px, pz, lean] of [[-14, 16, 0.3], [10, 20, -0.25], [20, -12, 0.2], [-22, -4, -0.35]] as const) {
    buildPalm(islandPos.x + px, islandPos.z + pz, lean);
  }

  // the smaller isles
  const rockMat = new THREE.MeshLambertMaterial({ color: 0x868e96, flatShading: true });
  for (const isle of EXTRA_ISLES) {
    buildBeach(isle.x, isle.z, isle.r, isle.x * 0.1 + 2);
    if (isle.palms > 0) scatterIsland(isle.x, isle.z, isle.r);
    if (isle.hill) {
      buildMound(isle.x - 2, isle.z - 2, isle.r * 0.6, isle.r * 0.45, isle.x * 0.1);
    }
    if (isle.palms === 0) {
      // bare skerry: a couple of boulders
      for (let i = 0; i < 3; i++) {
        const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6 + i * 0.6, 0), rockMat);
        rock.position.set(isle.x + (i - 1) * 3, 1.6, isle.z + (i % 2) * 2.5 - 1);
        rock.rotation.set(i, i * 2, 0);
        scene.add(rock);
      }
    } else {
      for (let p = 0; p < isle.palms; p++) {
        buildPalm(isle.x + (p - isle.palms / 2) * 4 + 1, isle.z + (p % 2) * 4 - 2, (p % 2 ? -0.25 : 0.3));
      }
    }
    obstacles.push({ x: isle.x, z: isle.z, r: isle.r + 2.5 });
  }

  // bake the scattered island life into instanced meshes (4 draw calls for all of it)
  buildInstanced(bladeGeo, grassMat, grassXf);
  buildInstanced(stemGeo, stemMat, stemXf);
  buildInstanced(headGeo, flowerMat, flowerXf, FLOWER_COLS);
  buildInstanced(shellGeo, shellMat, shellXf, SHELL_COLS);

  // ---- the home lighthouse: a landmark on the approach ----
  {
    const lh = new THREE.Group();
    const white = new THREE.MeshLambertMaterial({ color: 0xf3f3ef });
    const red = new THREE.MeshLambertMaterial({ color: 0xd13b3b });
    const H = 12;
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.7, H, 16), white);
    tower.position.y = H / 2; tower.castShadow = true; tower.receiveShadow = true;
    lh.add(tower);
    for (const hf of [0.18, 0.5, 0.82]) {                  // red barber-pole bands hug the taper
      const rr = 1.7 + (1.05 - 1.7) * hf;
      const band = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.12, 8, 18), red);
      band.position.y = H * hf; band.rotation.x = Math.PI / 2;
      lh.add(band);
    }
    const gallery = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.3, 16), red);
    gallery.position.y = H + 0.15; lh.add(gallery);
    const lampRoom = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 12),
      new THREE.MeshLambertMaterial({ color: 0xffe9a8, emissive: 0xffcf6a, emissiveIntensity: 1.3 }));
    lampRoom.position.y = H + 1.05; lampRoom.userData.noShadow = true; lh.add(lampRoom);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.25, 1.2, 12), red);
    roof.position.y = H + 2.4; lh.add(roof);
    const beacon = new THREE.PointLight(0xffd27a, 1.4, 60, 1.6);
    beacon.position.y = H + 1.05; beacon.userData.noShadow = true; lh.add(beacon);
    lh.position.set(islandPos.x - 1, 0.7, islandPos.z + 13);
    scene.add(lh);
  }

  // piers with plank decks (home + delivery)
  const woodDark = new THREE.MeshLambertMaterial({ color: 0x6b4226 });
  const capMat = new THREE.MeshLambertMaterial({ color: 0xf1f3f5 });
  const lanternMat = new THREE.MeshLambertMaterial({ color: 0xffe9a8, emissive: 0xffb84d, emissiveIntensity: 1.2 });
  const buildPier = (a: { x: number; z: number }, b: { x: number; z: number }, withLight = false) => {
    const tex = makePlankTexture('#8a5a33', '#5d3a20');
    const dx = b.x - a.x, dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    tex.repeat.set(1, Math.round(len / 4));
    const deckP = new THREE.Mesh(new THREE.BoxGeometry(4, 0.3, len),
      new THREE.MeshLambertMaterial({ map: tex }));
    deckP.position.set((a.x + b.x) / 2, 1.0, (a.z + b.z) / 2);
    deckP.rotation.y = Math.atan2(dx, dz);
    scene.add(deckP);
    const n = Math.floor(len / 4.5);
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1);
      const px = a.x + dx * t, pz = a.z + dz * t;
      const ox = Math.cos(deckP.rotation.y) * 1.7, oz = -Math.sin(deckP.rotation.y) * 1.7;
      for (const s of [-1, 1]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.4, 7), woodDark);
        post.position.set(px + s * ox, 0.1, pz + s * oz);
        scene.add(post);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.25, 0.32), capMat);
        cap.position.set(px + s * ox, 1.3, pz + s * oz);
        scene.add(cap);
      }
    }
    // a hanging lantern at the seaward end (a warm glow over the mooring)
    const lpost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, 1.5, 6), woodDark);
    lpost.position.set(b.x, 1.75, b.z);
    scene.add(lpost);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.06), woodDark);
    arm.position.set(b.x, 2.45, b.z);
    scene.add(arm);
    const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), lanternMat);
    lantern.position.set(b.x, 2.2, b.z);
    lantern.userData.noShadow = true;
    scene.add(lantern);
    void withLight;   // lanterns glow via emissive; the only cast light is the lighthouse beacon
  };
  buildPier(pierA, pierB);
  buildPier(destA, destB);
  buildPier(sandA, sandB);
  buildPier(skerA, skerB);
  buildPier(tinyA, tinyB);
  // dock dressing: a couple of coiled mooring ropes on the home pier
  for (const [rx, rz] of [[pierA.x - 1.3, pierB.z - 3], [pierA.x + 1.3, pierB.z - 6.5]] as const) {
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.09, 6, 14), woodDark);
    coil.position.set(rx, 1.16, rz);
    coil.rotation.x = Math.PI / 2;
    scene.add(coil);
  }

  // the delivery spot: painted circle + flag + bobbing arrow (moves with the route)
  delMat = new THREE.Mesh(new THREE.CircleGeometry(DELIVERY.r - 0.6, 20),
    new THREE.MeshLambertMaterial({ color: 0x69db7c }));
  delMat.rotation.x = -Math.PI / 2;
  scene.add(delMat);
  delPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3.6, 6), woodDark);
  scene.add(delPole);
  delFlag = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7),
    new THREE.MeshBasicMaterial({ color: 0x40c057, side: THREE.DoubleSide }));
  scene.add(delFlag);
  dockArrow = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.4, 10),
    new THREE.MeshLambertMaterial({ color: 0x40c057 }));
  dockArrow.rotation.x = Math.PI;
  dockArrow.userData.baseY = 8;
  scene.add(dockArrow);
  repositionDeliveryMarkers();

  // the job board on the home pier — a friendly notice board with pinned jobs
  {
    const bx = BOARD_SPOT.x, bz = BOARD_SPOT.z, by = SHORE_Y;
    const faceMat = new THREE.MeshLambertMaterial({ color: 0xcaa46e });
    for (const s of [-0.6, 0.6]) {                       // two legs
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.5, 6), woodDark);
      leg.position.set(bx, by + 0.75, bz + s);
      scene.add(leg);
    }
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 1.6), woodDark);
    frame.position.set(bx, by + 1.62, bz);
    scene.add(frame);
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.84, 1.42), faceMat);
    face.position.set(bx + 0.02, by + 1.62, bz);
    scene.add(face);
    const header = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.22, 1.6), new THREE.MeshLambertMaterial({ color: 0x40c057 }));
    header.position.set(bx + 0.01, by + 2.18, bz);
    scene.add(header);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 1.78), woodDark);
    roof.position.set(bx, by + 2.31, bz);
    scene.add(roof);
    // pinned job notes (2x2), with coloured pins
    const ny = [0.2, 0.2, -0.18, -0.18], nz = [-0.34, 0.34, -0.34, 0.34];
    const paper = [0xf4efe2, 0xfff3cf, 0xeaf6ff, 0xffe3e3], pins = [0xff6b6b, 0x4dabf7, 0xffd43b, 0x69db7c];
    for (let i = 0; i < 4; i++) {
      const note = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.3), new THREE.MeshLambertMaterial({ color: paper[i] }));
      note.position.set(bx + 0.1, by + 1.62 + ny[i], bz + nz[i]);
      note.rotation.x = (i - 1.5) * 0.05;
      scene.add(note);
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 5), new THREE.MeshLambertMaterial({ color: pins[i] }));
      pin.position.set(bx + 0.13, by + 1.62 + ny[i] + 0.1, bz + nz[i]);
      scene.add(pin);
    }
  }

  // the chandler's stall (the chaos shop)
  const stall = new THREE.Group();
  const counter = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.7),
    new THREE.MeshLambertMaterial({ color: 0x8a5a33 }));
  counter.position.y = SHORE_Y + 0.45;
  stall.add(counter);
  for (const sx of [-0.7, 0.7]) {
    const sPost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.2, 6), woodDark);
    sPost.position.set(sx, SHORE_Y + 1.1, 0);
    stall.add(sPost);
  }
  const awning = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.07, 1.1),
    new THREE.MeshLambertMaterial({ color: 0xc0392b }));
  awning.position.y = SHORE_Y + 2.2;
  awning.rotation.x = 0.12;
  stall.add(awning);
  const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 12),
    new THREE.MeshLambertMaterial({ color: 0xffd43b, emissive: 0x7a5c00, emissiveIntensity: 0.5 }));
  coin.position.set(0, SHORE_Y + 1.65, 0);
  coin.rotation.x = Math.PI / 2;
  stall.add(coin);
  stall.position.set(SHOP_SPOT.x, 0, SHOP_SPOT.z);
  stall.rotation.y = -Math.PI / 2;
  scene.add(stall);

  // rocks: weave between spawn and the island, never blocking the pier line
  const rockDefs = [{ x: -19, z: -62, r: 4 }, { x: 23, z: -118, r: 5 }, { x: -10, z: -168, r: 3.5 }, { x: 26, z: -205, r: 4.5 }];
  for (const rd of rockDefs) {
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(rd.r, 0),
      new THREE.MeshLambertMaterial({ color: 0x868e96, flatShading: true }));
    rock.position.set(rd.x, rd.r * 0.25, rd.z);
    rock.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    scene.add(rock);
    const foam = new THREE.Mesh(new THREE.RingGeometry(rd.r * 0.95, rd.r * 1.25, 20),
      new THREE.MeshBasicMaterial({ color: 0xe9f5ff, transparent: true, opacity: 0.5, depthWrite: false }));
    foam.rotation.x = -Math.PI / 2;
    foam.position.set(rd.x, 0.22, rd.z);
    scene.add(foam);
  }
  // hull collision circles (island as one big circle)
  obstacles.push(...rockDefs.map(r => ({ x: r.x, z: r.z, r: r.r + 1.8 })));
  obstacles.push({ x: islandPos.x, z: islandPos.z, r: CONFIG.islandRadius + 2.5 });
}
