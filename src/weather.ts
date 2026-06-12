import * as THREE from 'three';
import { lerp, smoothstep } from './mathUtil';
import { boat, env, netRole } from './state';
import { SKY, cam1, hemi, renderer, scene, skyDome, sun } from './scene';
import { fancyUniforms, setSwell, waterMode } from './water';
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
const RAIN_N = 140;
{
  const geo = new THREE.BoxGeometry(0.015, 0.7, 0.015);
  const mat = new THREE.MeshBasicMaterial({ color: 0xbfd6e4, transparent: true, opacity: 0.45, depthWrite: false });
  for (let i = 0; i < RAIN_N; i++) {
    const d = new THREE.Mesh(geo, mat);
    d.position.set((Math.random() - 0.5) * 44, Math.random() * 26, (Math.random() - 0.5) * 44);
    d.userData.noShadow = true;
    rainGroup.add(d);
  }
}

/* ---- lightning ---- */
let flash = 0, boltTimer = 8;

/* ---- color targets (fair = the PEAK/SoT palette, foul = the gloom) ---- */
const skyZenithFair = new THREE.Color(0x2f86d6), skyZenithFoul = new THREE.Color(0x33414f);
const skyMidFair = new THREE.Color(0x8ecaee), skyMidFoul = new THREE.Color(0x5d6e7a);
const skyHorizonFair = new THREE.Color(SKY), skyHorizonFoul = new THREE.Color(0x84939e);
const deepFair = new THREE.Color(0x0a3f5c), deepFoul = new THREE.Color(0x0e2b38);
const shallowFair = new THREE.Color(0x1d8f8a), shallowFoul = new THREE.Color(0x3a6878);
const sssFair = new THREE.Color(0x46e3b5), sssFoul = new THREE.Color(0x4e7d74);
const _c = new THREE.Color();
const skyU = (skyDome.material as THREE.ShaderMaterial).uniforms;

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

  // light + colors slide toward the gloom
  const d = smDark;
  sun.intensity = lerp(1.5, 0.55, d) + flash * 2.2;
  hemi.intensity = lerp(1.0, 0.5, d);
  (skyU.uZenith.value as THREE.Color).lerpColors(skyZenithFair, skyZenithFoul, d);
  (skyU.uMid.value as THREE.Color).lerpColors(skyMidFair, skyMidFoul, d);
  (skyU.uHorizon.value as THREE.Color).lerpColors(skyHorizonFair, skyHorizonFoul, d);
  _c.lerpColors(skyHorizonFair, skyHorizonFoul, d);
  (scene.fog as THREE.Fog).color.copy(_c);
  (scene.background as THREE.Color).copy(_c);
  (fancyUniforms.uSky.value as THREE.Color).copy(_c);
  (fancyUniforms.uDeep.value as THREE.Color).lerpColors(deepFair, deepFoul, d);
  (fancyUniforms.uShallow.value as THREE.Color).lerpColors(shallowFair, shallowFoul, d);
  (fancyUniforms.uSss.value as THREE.Color).lerpColors(sssFair, sssFoul, d);

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
      setTimeout(() => thunder(), 350 + Math.random() * 1400);
    }
  }
  flash *= Math.exp(-7 * dt);
  renderer.toneMappingExposure = 1.18 + flash * 1.4;
}
