import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, v2 } from './mathUtil';
import { scene } from './scene';
import { makePlankTexture } from './textures';

/* =========================== world: island, pier, rocks =========================== */
export const islandPos = v2(0, -CONFIG.islandDist);   // upwind of spawn (wind blows +z at start)

// pier sticks out from the island toward open water (toward spawn, +z)
export const pierA = v2(islandPos.x, islandPos.z + CONFIG.islandRadius - 2);   // island end
export const pierB = v2(islandPos.x, islandPos.z + CONFIG.islandRadius + 26);  // water end
export const dockMidZ = (pierA.z + pierB.z) / 2;
export const dockHalfLen = (pierB.z - pierA.z) / 2 + 2;

export interface Obstacle { x: number; z: number; r: number; }
export const obstacles: Obstacle[] = [];
export let dockArrow: THREE.Mesh;

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
  for (const [px, pz, lean] of [[-14, 16, 0.3], [10, 20, -0.25], [20, -12, 0.2], [-22, -4, -0.35]] as const) {
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
    palm.position.set(islandPos.x + px, 0, islandPos.z + pz);
    scene.add(palm);
  }

  // pier with plank deck
  const plankTex = makePlankTexture('#8a5a33', '#5d3a20');
  plankTex.repeat.set(1, 6);
  const len = pierB.z - pierA.z;
  const woodDark = new THREE.MeshLambertMaterial({ color: 0x6b4226 });
  const deckP = new THREE.Mesh(new THREE.BoxGeometry(4, 0.3, len),
    new THREE.MeshLambertMaterial({ map: plankTex }));
  deckP.position.set(pierA.x, 1.0, (pierA.z + pierB.z) / 2); scene.add(deckP);
  for (let z = pierA.z + 2; z < pierB.z; z += 4.5) for (const sx of [-1.7, 1.7]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.4, 7), woodDark);
    post.position.set(pierA.x + sx, 0.1, z); scene.add(post);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.25, 0.32),
      new THREE.MeshLambertMaterial({ color: 0xf1f3f5 }));
    cap.position.set(pierA.x + sx, 1.3, z); scene.add(cap);
  }
  // bobbing arrow above the pier tip
  dockArrow = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.4, 10),
    new THREE.MeshLambertMaterial({ color: 0x40c057 }));
  dockArrow.rotation.x = Math.PI;
  dockArrow.position.set(pierA.x, 7, pierB.z - 3);
  dockArrow.userData.baseY = 7;
  scene.add(dockArrow);
  // faint green dock zones either side of the pier
  for (const sx of [-1, 1]) {
    const zone = new THREE.Mesh(new THREE.PlaneGeometry(6.2, len + 4),
      new THREE.MeshBasicMaterial({ color: 0x69db7c, transparent: true, opacity: 0.13, depthWrite: false }));
    zone.rotation.x = -Math.PI / 2;
    zone.position.set(pierA.x + sx * 5.4, 0.25, (pierA.z + pierB.z) / 2);
    scene.add(zone);
  }

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
