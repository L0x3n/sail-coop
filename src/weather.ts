import * as THREE from 'three';
import { lerp, smoothstep } from './mathUtil';
import { boat, env, netRole } from './state';
import { cam1, renderer, scene, sun } from './scene';
import { setSwell, waterMode } from './water';
import { islandPos } from './world';
import { thunder } from './audio';
import { toast } from './hud';

/* =========================== weather =========================== */
export const WEATHERS = [
  { name: 'Sunny skies', windMul: 1.0, swell: 1.0, dark: 0 },
  { name: 'Overcast', windMul: 1.22, swell: 1.32, dark: 0.45 },
  { name: 'SQUALL!', windMul: 1.6, swell: 1.75, dark: 0.85 },
];
let weatherTimer = 40 + Math.random() * 50;
// smoothed environment values (everyone runs these; host decides the target id)
let smWind = 1, smSwell = 1, smDark = 0;

export function updateWeatherHost(dt: number) {
  if (netRole === 'guest') return;
  weatherTimer -= dt;
  if (weatherTimer <= 0) {
    weatherTimer = 45 + Math.random() * 60;
    const roll = Math.random();
    let next: 0 | 1 | 2 = roll < 0.45 ? 0 : roll < 0.78 ? 1 : 2;
    if (next === env.weatherId) next = ((next + 1) % 3) as 0 | 1 | 2;
    env.weatherId = next;
    env.weatherLerp = 0;
    toast('Weather: ' + WEATHERS[next].name, next === 2 ? '#ff8787' : '#a5d8ff');
  }
}

/* ---- rain ---- */
const rainGroup = new THREE.Group();
scene.add(rainGroup);
const RAIN_N = 180;
{
  const geo = new THREE.BoxGeometry(0.02, 1.7, 0.02);     // long thin streaks
  const mat = new THREE.MeshBasicMaterial({ color: 0xcfe2ee, transparent: true, opacity: 0.5, depthWrite: false });
  for (let i = 0; i < RAIN_N; i++) {
    const d = new THREE.Mesh(geo, mat);
    d.position.set((Math.random() - 0.5) * 44, Math.random() * 26, (Math.random() - 0.5) * 44);
    d.rotation.z = 0.28;                                   // slanted by the wind
    d.userData.noShadow = true;
    rainGroup.add(d);
  }
}

/* ---- lightning: an exposure flash + a jagged bolt over the horizon ---- */
let flash = 0, boltTimer = 8;
const boltMat = new THREE.LineBasicMaterial({ color: 0xdceaff, transparent: true, opacity: 0, fog: false });
const BOLT_SEG = 12;
const boltGeo = new THREE.BufferGeometry();
boltGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BOLT_SEG * 3), 3));
const bolt = new THREE.Line(boltGeo, boltMat);
bolt.userData.noShadow = true;
bolt.frustumCulled = false;
bolt.visible = false;
scene.add(bolt);
function strikeBolt() {
  const a = Math.random() * Math.PI * 2;
  const dist = 360 + Math.random() * 180;
  const bx = cam1.position.x + Math.sin(a) * dist;
  const bz = cam1.position.z + Math.cos(a) * dist;
  const top = 210 + Math.random() * 70;
  const p = boltGeo.attributes.position.array as Float32Array;
  for (let i = 0; i < BOLT_SEG; i++) {
    const f = i / (BOLT_SEG - 1);                          // 0 high in the sky -> 1 at the sea
    p[i * 3] = bx + (Math.random() - 0.5) * 26 * (1 - f);
    p[i * 3 + 1] = top * (1 - f);
    p[i * 3 + 2] = bz + (Math.random() - 0.5) * 26 * (1 - f);
  }
  boltGeo.attributes.position.needsUpdate = true;
  boltGeo.computeBoundingSphere();
  bolt.visible = true;
}

/* the whole palette (sky/water/sun/fog) now lives in daynight.ts, which lerps
   the time-of-day keyframes and then darkens them by env.darkness. weather just
   sets that darkness + the wind/swell, and lays rain + lightning on top. */
export function getFlash() { return flash; }

export function updateWeatherVisuals(dt: number) {
  const W = WEATHERS[env.weatherId];
  env.weatherLerp = Math.min(1, env.weatherLerp + dt / 6);
  const k = 1 - Math.exp(-0.6 * dt);
  smWind = lerp(smWind, W.windMul, k);
  smSwell = lerp(smSwell, W.swell, k);
  smDark = lerp(smDark, W.dark, k);
  env.windMul = smWind;
  env.darkness = smDark;

  // open ocean rolls bigger; AAA water mode exaggerates everything
  const distIsland = Math.hypot(boat.pos.x - islandPos.x, boat.pos.z - islandPos.z);
  const openSea = 1 + 0.45 * smoothstep(95, 180, distIsland);
  env.swell = smSwell * openSea * (waterMode === 2 ? 1.5 : 1);
  setSwell(env.swell);

  // rain follows the camera, drifts with the wind
  const raining = smDark > 0.62;
  rainGroup.visible = raining;
  if (raining) {
    rainGroup.position.set(cam1.position.x, 0, cam1.position.z);
    for (const drop of rainGroup.children) {
      drop.position.y -= 28 * dt;
      drop.position.x += 6 * dt;
      if (drop.position.y < 0) {
        drop.position.y = 22 + Math.random() * 6;
        drop.position.x = (Math.random() - 0.5) * 44;
        drop.position.z = (Math.random() - 0.5) * 44;
      }
    }
  }

  // lightning + delayed thunder during a squall
  if (env.weatherId === 2 && smDark > 0.6) {
    boltTimer -= dt;
    if (boltTimer <= 0) {
      boltTimer = 4 + Math.random() * 9;
      flash = 1;
      strikeBolt();
      setTimeout(() => thunder(), 350 + Math.random() * 1400);
    }
  }
  flash *= Math.exp(-7 * dt);
  // ride the lightning ON TOP of the day-night base (daynight set these this frame)
  sun.intensity += flash * 2.2;
  renderer.toneMappingExposure += flash * 1.4;
  // the bolt blazes with the flash, then vanishes
  boltMat.opacity = Math.min(1, flash * 1.6);
  if (bolt.visible && flash < 0.04) bolt.visible = false;
}
