import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, v2 } from './mathUtil';
import { scene } from './scene';
import { makePlankTexture } from './textures';

/* =========================== world: island, pier, rocks =========================== */
export const islandPos = v2(0, -CONFIG.islandDist);   // upwind of spawn (wind blows +z at start)

// the HOME pier sticks out from the big island toward open water (+z)
export const pierA = v2(islandPos.x, islandPos.z + CONFIG.islandRadius - 2);   // island end
export const pierB = v2(islandPos.x, islandPos.z + CONFIG.islandRadius + 26);  // water end
// the DELIVERY pier sticks out west from the palm isle at (150,-70)
export const destA = v2(137, -70);   // isle end
export const destB = v2(111, -70);   // water end
/* pier segments (boat collision) + walkable surfaces (shore mode) */
export const PIERS = [
  { a: pierA, b: pierB },
  { a: destA, b: destB },
];
export const WALKWAYS = [
  { x0: pierA.x - 2, x1: pierA.x + 2, z0: pierA.z - 1, z1: pierB.z + 0.3 },
  { x0: destB.x - 0.3, x1: destA.x + 1, z0: destA.z - 2, z1: destA.z + 2 },
];
export const SHORE_Y = 1.15;         // pier deck height (characters walk here)
export const DELIVERY = { x: 117, z: -70, r: 3.4 };
export const HOME_LOAD = { x: 0, z: -207 };    // where fresh shipments appear

export interface Obstacle { x: number; z: number; r: number; }
export const obstacles: Obstacle[] = [];
export let dockArrow: THREE.Mesh;

/* smaller islands scattered off the main corridor — scenery to explore */
export const EXTRA_ISLES = [
  { x: 150, z: -70, r: 13, palms: 2, hill: true },
  { x: -160, z: -150, r: 10, palms: 0, hill: false },   // bare skerry
  { x: 95, z: -268, r: 15, palms: 3, hill: true },
  { x: -120, z: 40, r: 8, palms: 1, hill: false },      // tiny one behind spawn
];

export function buildWorld() {
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

  // the delivery spot: painted circle + flag, with the bobbing arrow above it
  const mat = new THREE.Mesh(new THREE.CircleGeometry(DELIVERY.r - 0.6, 20),
    new THREE.MeshLambertMaterial({ color: 0x69db7c }));
  mat.rotation.x = -Math.PI / 2;
  mat.position.set(DELIVERY.x, 1.17, DELIVERY.z);
  scene.add(mat);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3.6, 6), woodDark);
  pole.position.set(DELIVERY.x, 2.9, DELIVERY.z - 1.8);
  scene.add(pole);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7),
    new THREE.MeshBasicMaterial({ color: 0x40c057, side: THREE.DoubleSide }));
  flag.position.set(DELIVERY.x + 0.6, 4.3, DELIVERY.z - 1.8);
  scene.add(flag);
  dockArrow = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.4, 10),
    new THREE.MeshLambertMaterial({ color: 0x40c057 }));
  dockArrow.rotation.x = Math.PI;
  dockArrow.position.set(DELIVERY.x, 8, DELIVERY.z);
  dockArrow.userData.baseY = 8;
  scene.add(dockArrow);

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
