import * as THREE from 'three';
import { TAU, clamp, lerp } from './mathUtil';
import { env, session } from './state';
import { cam1, hemi, renderer, scene, skyDome, sun } from './scene';
import { fancyUniforms } from './water';
import { getFlash } from './weather';
import { shipLights } from './shipMesh';
import { makeFoamSprite } from './textures';

/* ===================================================================
   Day/night: one slow cycle drives the whole palette. Keyframes for
   night -> dawn -> day -> golden hour -> sunset are lerped by the time
   of day, then darkened by env.darkness (weather rides on top). The
   directional light arcs across the sky; a moon + stars take over at
   night, and the lanterns light the dark.
   =================================================================== */
const DAY_LEN = 480;                 // seconds for a full day (8 minutes)
export const daynight = { t: 0.30, dir: new THREE.Vector3(0.4, 0.8, 0.2).normalize() };

const C = (h: number) => new THREE.Color(h);
interface KFrame {
  t: number; sunC: THREE.Color; sunI: number;
  zen: THREE.Color; mid: THREE.Color; hor: THREE.Color;
  hemiS: THREE.Color; hemiG: THREE.Color; hemiI: number;
  deep: THREE.Color; shal: THREE.Color; sss: THREE.Color;
  expo: number; stars: number;
}
const KF: KFrame[] = [
  { t: 0.00, sunC: C(0x2a3550), sunI: 0.00, zen: C(0x0a1430), mid: C(0x162542), hor: C(0x27364d),
    hemiS: C(0x2e3a55), hemiG: C(0x1c2433), hemiI: 0.32, deep: C(0x05182a), shal: C(0x123040), sss: C(0x1d4a55), expo: 0.98, stars: 1.0 },
  { t: 0.22, sunC: C(0x3a4a68), sunI: 0.05, zen: C(0x16294f), mid: C(0x47618c), hor: C(0x9a86a0),
    hemiS: C(0x6a7ba0), hemiG: C(0x6a5a70), hemiI: 0.45, deep: C(0x0a2c44), shal: C(0x1c5866), sss: C(0x2f8a80), expo: 1.00, stars: 0.8 },
  { t: 0.27, sunC: C(0xff9e6a), sunI: 0.55, zen: C(0x355f96), mid: C(0x8fa6c8), hor: C(0xf0a878),
    hemiS: C(0x9fb6d6), hemiG: C(0xd6a87e), hemiI: 0.72, deep: C(0x0e3a52), shal: C(0x2a7a86), sss: C(0x46c0a0), expo: 1.06, stars: 0.22 },
  { t: 0.36, sunC: C(0xffe7b0), sunI: 1.50, zen: C(0x2f86d6), mid: C(0x8ecaee), hor: C(0xf2e3c2),
    hemiS: C(0xbfe0ff), hemiG: C(0xe0b888), hemiI: 1.00, deep: C(0x0a3f5c), shal: C(0x1d8f8a), sss: C(0x46e3b5), expo: 1.18, stars: 0.0 },
  { t: 0.64, sunC: C(0xffe7b0), sunI: 1.50, zen: C(0x2f86d6), mid: C(0x8ecaee), hor: C(0xf2e3c2),
    hemiS: C(0xbfe0ff), hemiG: C(0xe0b888), hemiI: 1.00, deep: C(0x0a3f5c), shal: C(0x1d8f8a), sss: C(0x46e3b5), expo: 1.18, stars: 0.0 },
  { t: 0.73, sunC: C(0xffb060), sunI: 1.20, zen: C(0x5a78bb), mid: C(0xe6b58a), hor: C(0xffd49a),
    hemiS: C(0xcdb8d0), hemiG: C(0xffc89e), hemiI: 0.85, deep: C(0x123a55), shal: C(0x3a9a8a), sss: C(0x86e8b0), expo: 1.16, stars: 0.0 },
  { t: 0.80, sunC: C(0xff6a3a), sunI: 0.55, zen: C(0x3a4a78), mid: C(0xc56a86), hor: C(0xff7a5a),
    hemiS: C(0x8a7a9a), hemiG: C(0xd08a6a), hemiI: 0.60, deep: C(0x0e2c44), shal: C(0x2a6a72), sss: C(0x5ab494), expo: 1.10, stars: 0.18 },
  { t: 0.88, sunC: C(0x46506e), sunI: 0.08, zen: C(0x182748), mid: C(0x2e3f63), hor: C(0x5a4f66),
    hemiS: C(0x44506e), hemiG: C(0x33384a), hemiI: 0.36, deep: C(0x081f30), shal: C(0x163a46), sss: C(0x255a52), expo: 1.02, stars: 0.7 },
  { t: 1.00, sunC: C(0x2a3550), sunI: 0.00, zen: C(0x0a1430), mid: C(0x162542), hor: C(0x27364d),
    hemiS: C(0x2e3a55), hemiG: C(0x1c2433), hemiI: 0.32, deep: C(0x05182a), shal: C(0x123040), sss: C(0x1d4a55), expo: 0.98, stars: 1.0 },
];

/* reusable interpolation target */
const base = {
  sunC: new THREE.Color(), sunI: 1, zen: new THREE.Color(), mid: new THREE.Color(), hor: new THREE.Color(),
  hemiS: new THREE.Color(), hemiG: new THREE.Color(), hemiI: 1,
  deep: new THREE.Color(), shal: new THREE.Color(), sss: new THREE.Color(), expo: 1.18, stars: 0,
};
function sampleKF(t: number) {
  let i = 0;
  while (i < KF.length - 2 && t >= KF[i + 1].t) i++;
  const a = KF[i], b = KF[i + 1];
  const f = clamp((t - a.t) / ((b.t - a.t) || 1), 0, 1);
  base.sunC.lerpColors(a.sunC, b.sunC, f); base.sunI = lerp(a.sunI, b.sunI, f);
  base.zen.lerpColors(a.zen, b.zen, f); base.mid.lerpColors(a.mid, b.mid, f); base.hor.lerpColors(a.hor, b.hor, f);
  base.hemiS.lerpColors(a.hemiS, b.hemiS, f); base.hemiG.lerpColors(a.hemiG, b.hemiG, f); base.hemiI = lerp(a.hemiI, b.hemiI, f);
  base.deep.lerpColors(a.deep, b.deep, f); base.shal.lerpColors(a.shal, b.shal, f); base.sss.lerpColors(a.sss, b.sss, f);
  base.expo = lerp(a.expo, b.expo, f); base.stars = lerp(a.stars, b.stars, f);
}

/* foul-weather endpoints (the gloom we darken toward) */
const FOUL_SKY = C(0x55606e), FOUL_HOR = C(0x84939e), FOUL_DEEP = C(0x0e2b38), FOUL_SHAL = C(0x3a6878), FOUL_SSS = C(0x4e7d74), GREY = C(0x8892a0);
const skyU = (skyDome.material as THREE.ShaderMaterial).uniforms;

/* ---- stars (fade in at night), a moon, and its halo ---- */
const stars = (() => {
  const N = 600;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    let x = Math.random() * 2 - 1, y = Math.random(), z = Math.random() * 2 - 1;
    const l = Math.hypot(x, y, z) || 1; x /= l; y /= l; z /= l;
    pos[i * 3] = x * 850; pos[i * 3 + 1] = Math.abs(y) * 820 + 30; pos[i * 3 + 2] = z * 850;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.4, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
  const pts = new THREE.Points(geo, mat);
  pts.userData.noShadow = true; pts.frustumCulled = false; pts.renderOrder = -5;
  scene.add(pts);
  return pts;
})();
const moon = (() => {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.SphereGeometry(8, 18, 14),
    new THREE.MeshBasicMaterial({ color: 0xeef2ff, transparent: true, opacity: 1, depthWrite: false, fog: false }));
  g.add(disc);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeFoamSprite(), color: 0xbcd0ff, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  halo.scale.setScalar(46);
  g.add(halo);
  g.traverse(o => { o.userData.noShadow = true; });
  g.renderOrder = -4;
  g.visible = false;
  scene.add(g);
  return g;
})();

export function updateDayNight(dt: number) {
  if (!session.inMenu) daynight.t = (daynight.t + dt / DAY_LEN) % 1;
  sampleKF(daynight.t);

  // the light's arc: rises in the east, peaks at noon, sets in the west
  const az = daynight.t * TAU;
  const el = Math.sin((daynight.t - 0.25) * TAU);
  const y = Math.max(0.12, 0.18 + el * 0.95);
  daynight.dir.set(Math.cos(az) * 0.85, y, Math.sin(az) * 0.85).normalize();

  const d = env.darkness;
  // sun / moonlight directional
  sun.color.copy(base.sunC).lerp(GREY, d * 0.5);
  sun.intensity = base.sunI * (1 - 0.72 * d);
  hemi.color.copy(base.hemiS);
  hemi.groundColor.copy(base.hemiG);
  hemi.intensity = base.hemiI * (1 - 0.4 * d);
  // sky gradient + sun glow (glow fades to nothing at night so the moon reads)
  (skyU.uZenith.value as THREE.Color).copy(base.zen).lerp(FOUL_SKY, d);
  (skyU.uMid.value as THREE.Color).copy(base.mid).lerp(FOUL_SKY, d * 0.8);
  (skyU.uHorizon.value as THREE.Color).copy(base.hor).lerp(FOUL_HOR, d);
  skyU.uGlow.value = clamp(base.sunI * 0.7, 0, 1);
  (skyU.uSun.value as THREE.Vector3).copy(daynight.dir);
  // fog + background follow the horizon band
  (scene.fog as THREE.Fog).color.copy(skyU.uHorizon.value as THREE.Color);
  (scene.background as THREE.Color).copy(skyU.uHorizon.value as THREE.Color);
  // water palette + glitter direction (the moon path comes free from uSunDir)
  (fancyUniforms.uSky.value as THREE.Color).copy(skyU.uHorizon.value as THREE.Color);
  (fancyUniforms.uDeep.value as THREE.Color).copy(base.deep).lerp(FOUL_DEEP, d);
  (fancyUniforms.uShallow.value as THREE.Color).copy(base.shal).lerp(FOUL_SHAL, d);
  (fancyUniforms.uSss.value as THREE.Color).copy(base.sss).lerp(FOUL_SSS, d);
  (fancyUniforms.uSunDir.value as THREE.Vector3).copy(daynight.dir);
  // base exposure (weather lightning adds its flash on top, later this frame)
  renderer.toneMappingExposure = base.expo * (1 - 0.18 * d);

  // stars + moon ride the night
  const night = base.stars;
  (stars.material as THREE.PointsMaterial).opacity = night * 0.9;
  stars.visible = night > 0.02;
  stars.position.copy(cam1.position);
  moon.visible = night > 0.12;
  if (moon.visible) {
    moon.position.set(cam1.position.x + daynight.dir.x * 640, 60 + daynight.dir.y * 360, cam1.position.z + daynight.dir.z * 640);
    const disc = moon.children[0] as THREE.Mesh;
    (disc.material as THREE.MeshBasicMaterial).opacity = clamp(night * 1.2, 0, 1);
    (moon.children[1] as THREE.Sprite).material.opacity = night * 0.5;
  }

  // the lanterns light up as the day fades (also during a dark squall)
  const lit = Math.max(clamp(1 - base.sunI * 1.2, 0, 1), d * 0.6);
  if (shipLights.stern) {
    shipLights.stern.visible = lit > 0.05;
    shipLights.stern.intensity = lit * 1.4;
  }
}
