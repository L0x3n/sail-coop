import * as THREE from 'three';
import { TAU } from './mathUtil';
import { scene } from './scene';
import { makeFoamSprite } from './textures';
import * as audio from './audio';

/* ================= wake + splash + wind streak pools ================= */
const wakeTex = makeFoamSprite();
const wakePool: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
const wakeGeo = new THREE.PlaneGeometry(1, 1);
wakeGeo.rotateX(-Math.PI / 2);
for (let i = 0; i < 70; i++) {
  const m = new THREE.Mesh(wakeGeo,
    new THREE.MeshBasicMaterial({ map: wakeTex, color: 0xeaf6ff, transparent: true, opacity: 0.55, depthWrite: false }));
  m.visible = false;
  scene.add(m);
  wakePool.push(m);
}
let wakeIdx = 0;
export function spawnWake(x: number, z: number, yaw: number, w: number) {
  const m = wakePool[wakeIdx++ % wakePool.length];
  m.visible = true;
  m.position.set(x, 0.18, z);
  m.rotation.y = yaw;
  m.scale.set(w, 1, 1.4);
  m.userData.life = 0;
  m.material.opacity = 0.55;
}
export function updateWake(dt: number) {
  for (const m of wakePool) {
    if (!m.visible) continue;
    m.userData.life += dt;
    const t = m.userData.life / 2.2;
    if (t >= 1) { m.visible = false; continue; }
    m.scale.x += dt * 2.2;
    m.scale.z += dt * 0.8;
    m.material.opacity = 0.55 * (1 - t);
  }
}

const splashPool: THREE.Mesh[] = [];
const splashGeo = new THREE.SphereGeometry(0.16, 6, 5);
const splashMat = new THREE.MeshBasicMaterial({ color: 0xf1faff });
for (let i = 0; i < 36; i++) {
  const m = new THREE.Mesh(splashGeo, splashMat);
  m.visible = false;
  m.userData.noShadow = true;
  scene.add(m);
  splashPool.push(m);
}
export function spawnDroplets(x: number, z: number, n: number, spread: number, up: number) {
  for (const m of splashPool) {
    if (m.visible || n-- <= 0) continue;
    m.visible = true;
    m.position.set(x, 0.3, z);
    m.userData.vx = (Math.random() - 0.5) * spread;
    m.userData.vy = up * (0.7 + Math.random() * 0.9);
    m.userData.vz = (Math.random() - 0.5) * spread;
  }
}
export function spawnSplash(x: number, z: number, big: boolean) {
  audio.splash(big);
  spawnDroplets(x, z, big ? 14 : 9, 5, 3.2);
  spawnWake(x, z, Math.random() * TAU, big ? 1.6 : 1.0);   // foam patch on the surface
}
export function updateSplash(dt: number) {
  for (const m of splashPool) {
    if (!m.visible) continue;
    m.userData.vy -= 12 * dt;
    m.position.x += m.userData.vx * dt;
    m.position.y += m.userData.vy * dt;
    m.position.z += m.userData.vz * dt;
    if (m.position.y < 0) m.visible = false;
  }
}

/* wind streaks: read the wind on the water */
const STREAKS = 42;
const streakGeo = new THREE.PlaneGeometry(4.2, 0.14);
streakGeo.rotateX(-Math.PI / 2);
const streakMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false });
const streaks: THREE.Mesh[] = [];
for (let i = 0; i < STREAKS; i++) {
  const m = new THREE.Mesh(streakGeo, streakMat);
  m.position.set((Math.random() - 0.5) * 240, 0.3, (Math.random() - 0.5) * 240);
  m.userData.life = Math.random() * 4;
  scene.add(m);
  streaks.push(m);
}
export function updateStreaks(dt: number, t: number, cx: number, cz: number, windAngle: number, windStr: number) {
  for (const s of streaks) {
    s.userData.life += dt;
    if (s.userData.life > 4 || Math.hypot(s.position.x - cx, s.position.z - cz) > 170) {
      s.userData.life = 0;
      s.position.set(cx + (Math.random() - 0.5) * 280, 0.3, cz + (Math.random() - 0.5) * 280);
    }
    s.position.x += Math.sin(windAngle) * windStr * 0.55 * dt;
    s.position.z += Math.cos(windAngle) * windStr * 0.55 * dt;
    s.rotation.y = windAngle;
    const ph = s.userData.life / 4;
    s.scale.x = 0.5 + Math.sin(ph * Math.PI) * 0.9;
  }
  streakMat.opacity = 0.22 + 0.1 * Math.sin(t * 2);
}
