import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, v2 } from './mathUtil';
import { scene } from './scene';
import { owned } from './state';
import { makePlankTexture } from './textures';

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
}
export const ROUTES: RouteDef[] = [
  { name: 'Palm Run', pay: 10, desc: 'short reach, easy money', del: { x: 117, z: -70 } },
  { name: 'Sandbar Hop', pay: 16, desc: 'short but dead upwind', del: { x: 95, z: -236 } },
  { name: 'Skerry Slog', pay: 24, desc: 'long beat past the rocks', del: { x: -132, z: -150 } },
  { name: 'North Light', pay: 32, desc: 'the long northern haul', del: { x: -96, z: 40 }, locked: () => !owned.chartNorth },
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
    }
  }

  const sandMat = new THREE.MeshLambertMaterial({ color: 0xe7d08a });
  const sand = new THREE.Mesh(new THREE.CylinderGeometry(CONFIG.islandRadius, CONFIG.islandRadius + 6, 3, 28), sandMat);
  sand.position.set(islandPos.x, 0.4, islandPos.z); scene.add(sand);
  const hill = new THREE.Mesh(new THREE.ConeGeometry(24, 12, 20),
    new THREE.MeshLambertMaterial({ color: 0x57a05a }));
  hill.position.set(islandPos.x - 6, 6, islandPos.z - 8); scene.add(hill);
  const hill2 = new THREE.Mesh(new THREE.ConeGeometry(14, 8, 16),
    new THREE.MeshLambertMaterial({ color: 0x6cb56f }));
  hill2.position.set(islandPos.x + 14, 4, islandPos.z + 2); scene.add(hill2);

  // curvy palms
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x9a6b3f });
  const leafMat = new THREE.MeshLambertMaterial({ color: 0x3f8f46 });
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
    for (let i = 0; i < 6; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.0, 5), leafMat);
      leaf.position.set(topX, y - 0.4, 0);
      leaf.rotation.z = Math.PI / 2.3;
      leaf.rotation.y = i * TAU / 6;
      palm.add(leaf);
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
    const sandIsle = new THREE.Mesh(new THREE.CylinderGeometry(isle.r, isle.r + 4, 2.4, 20), sandMat);
    sandIsle.position.set(isle.x, 0.3, isle.z);
    scene.add(sandIsle);
    if (isle.hill) {
      const h = new THREE.Mesh(new THREE.ConeGeometry(isle.r * 0.55, isle.r * 0.4, 14),
        new THREE.MeshLambertMaterial({ color: 0x6cb56f }));
      h.position.set(isle.x - 2, isle.r * 0.2 + 1.2, isle.z - 2);
      scene.add(h);
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

  // piers with plank decks (home + delivery)
  const woodDark = new THREE.MeshLambertMaterial({ color: 0x6b4226 });
  const capMat = new THREE.MeshLambertMaterial({ color: 0xf1f3f5 });
  const buildPier = (a: { x: number; z: number }, b: { x: number; z: number }) => {
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
  };
  buildPier(pierA, pierB);
  buildPier(destA, destB);
  buildPier(sandA, sandB);
  buildPier(skerA, skerB);
  buildPier(tinyA, tinyB);

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

  // the route board on the home pier
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.7, 6), woodDark);
  post.position.set(BOARD_SPOT.x, SHORE_Y + 0.85, BOARD_SPOT.z);
  scene.add(post);
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.08),
    new THREE.MeshLambertMaterial({ color: 0xa9764a }));
  board.position.set(BOARD_SPOT.x, SHORE_Y + 1.5, BOARD_SPOT.z);
  board.rotation.y = Math.PI / 2;
  scene.add(board);
  for (let i = 0; i < 3; i++) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.14, 0.03),
      new THREE.MeshLambertMaterial({ color: [0x69db7c, 0xffd43b, 0xff8787][i] }));
    strip.position.set(BOARD_SPOT.x + 0.06, SHORE_Y + 1.72 - i * 0.22, BOARD_SPOT.z);
    strip.rotation.y = Math.PI / 2;
    scene.add(strip);
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
