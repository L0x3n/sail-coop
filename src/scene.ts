import * as THREE from 'three';
import { CONFIG } from './config';

/* =========================== renderer + scene =========================== */
export const renderer = new THREE.WebGLRenderer({ antialias: true });
// never 0x0 (hidden/headless windows report zero size before first layout)
export const viewSize = () => ({ w: Math.max(320, innerWidth), h: Math.max(240, innerHeight) });
renderer.setSize(viewSize().w, viewSize().h);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;
renderer.domElement.className = 'webgl';
document.body.appendChild(renderer.domElement);

export const scene = new THREE.Scene();
export const SKY = 0xf2e3c2;          // warm cream horizon: fog + water haze blend into this
scene.background = new THREE.Color(SKY);
scene.fog = new THREE.Fog(SKY, 260, 850);

// stylized bounce: cool sky from above, warm sand glow from below
export const hemi = new THREE.HemisphereLight(0xbfe0ff, 0xe0b888, 1.0);
scene.add(hemi);
export const sun = new THREE.DirectionalLight(0xffe7b0, 1.5);
sun.position.set(80, 120, 40);
scene.add(sun);
// real-time shadows: the shadow box follows the CAMERA (set each frame), so
// land — islands, palms, piers — casts shadows whether you're aboard or ashore
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.camera.near = 40; sun.shadow.camera.far = 320;
sun.shadow.camera.left = -46; sun.shadow.camera.right = 46;
sun.shadow.camera.top = 46; sun.shadow.camera.bottom = -46;
sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.035;
scene.add(sun.target);

/* --- sky dome: warm horizon -> azure -> deep blue zenith, sun glow, follows the camera --- */
export const skyDome = new THREE.Mesh(
  new THREE.SphereGeometry(900, 24, 16),
  new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uZenith: { value: new THREE.Color(0x2f86d6) },
      uMid: { value: new THREE.Color(0x8ecaee) },
      uHorizon: { value: new THREE.Color(SKY) },
      uSun: { value: sun.position.clone().normalize() },
      uGlow: { value: 1 },          // sun-disc glow strength (faded out at night)
    },
    vertexShader: `varying vec3 vDir;
      void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uZenith,uMid,uHorizon,uSun; uniform float uGlow; varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.16, h));
        col = mix(col, uZenith, smoothstep(0.16, 0.62, h));
        float s = max(dot(d, normalize(uSun)), 0.0);
        col += vec3(1.0, 0.9, 0.66) * (pow(s, 900.0) * 1.2 + pow(s, 14.0) * 0.16) * uGlow;
        gl_FragColor = vec4(col, 1.0);
      }`,
  }));
skyDome.userData.noShadow = true;
skyDome.frustumCulled = false;
scene.add(skyDome);

/* --- puffy faceted clouds: bright sunlit tops, cool shaded bellies --- */
export const clouds: THREE.Group[] = [];
{
  // sun catches the rounded tops; undersides fall into a cooler grey shadow
  const topMat = new THREE.MeshLambertMaterial({
    color: 0xffffff, emissive: 0x9ab4cc, emissiveIntensity: 0.28, flatShading: true,
  });
  const bellyMat = new THREE.MeshLambertMaterial({
    color: 0xb7c6d6, emissive: 0x6f8597, emissiveIntensity: 0.22, flatShading: true,
  });
  const makeCloud = (sf: number): THREE.Group => {
    const cl = new THREE.Group();
    // wide cool base layer
    const baseN = 3 + ((Math.random() * 2) | 0);
    for (let k = 0; k <= baseN; k++) {
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry((7 + Math.random() * 6) * sf, 1), bellyMat);
      puff.position.set((Math.random() - 0.5) * 30 * sf, -1.4 - Math.random() * 1.6, (Math.random() - 0.5) * 14 * sf);
      puff.scale.set(1, 0.32, 0.82);
      puff.rotation.y = Math.random() * Math.PI;
      puff.userData.noShadow = true;
      cl.add(puff);
    }
    // bright rounded tops sitting above the base
    const topN = 3 + ((Math.random() * 3) | 0);
    for (let k = 0; k <= topN; k++) {
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry((5 + Math.random() * 7) * sf, 1), topMat);
      puff.position.set((Math.random() - 0.5) * 22 * sf, (1 + Math.random() * 3.5) * sf, (Math.random() - 0.5) * 10 * sf);
      puff.scale.set(1, 0.6 + Math.random() * 0.22, 0.86);
      puff.rotation.y = Math.random() * Math.PI;
      puff.userData.noShadow = true;
      cl.add(puff);
    }
    return cl;
  };
  // the drifting cloudscape (moved + recycled around the boat in main)
  for (let i = 0; i < 9; i++) {
    const cl = makeCloud(1);
    cl.position.set((Math.random() - 0.5) * 1100, 70 + Math.random() * 55, (Math.random() - 0.5) * 1100);
    scene.add(cl);
    clouds.push(cl);
  }
  // a few towering cumulus parked low on the horizon, ringing the play area
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
    const r = 820 + Math.random() * 360;
    const cl = makeCloud(2.4 + Math.random() * 1.1);
    cl.position.set(Math.cos(a) * r, 42 + Math.random() * 26, -130 + Math.sin(a) * r);
    cl.userData.horizon = true;            // static: excluded from the drift loop
    scene.add(cl);
  }
}

/* --- seagulls: little white chevrons circling the area --- */
export const gulls: { g: THREE.Group; wingL: THREE.Mesh; wingR: THREE.Mesh; r: number; h: number; sp: number; ph: number }[] = [];
{
  const gullMat = new THREE.MeshLambertMaterial({ color: 0xf5f8fa });
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), gullMat);
    body.scale.set(1, 0.7, 1.8); g.add(body);
    const mkWing = (s: number) => {
      const w = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 0.34), gullMat);
      w.geometry.translate(s * 0.55, 0, 0);
      g.add(w);
      return w;
    };
    const wingL = mkWing(-1), wingR = mkWing(1);
    g.traverse(o => { o.userData.noShadow = true; });
    scene.add(g);
    gulls.push({ g, wingL, wingR, r: 14 + i * 9, h: 14 + (i % 3) * 6, sp: 0.25 + (i % 3) * 0.08, ph: i * 1.4 });
  }
}

/* --- first-person cameras --- */
function makeCam() {
  const c = new THREE.PerspectiveCamera(CONFIG.fov, viewSize().w / viewSize().h, 0.15, 2000);
  c.position.set(0, 20, -35);
  return c;
}
export const cam1 = makeCam();
export const cam2 = makeCam();
export function applyAspect() {
  const v = viewSize();
  for (const c of [cam1, cam2]) { c.aspect = v.w / v.h; c.updateProjectionMatrix(); }
  renderer.setSize(v.w, v.h);
}
window.addEventListener('resize', applyAspect);

/* everything solid casts + receives shadows (skip water, sky, particles) */
export function enableShadows(skip: THREE.Object3D[]) {
  scene.traverse(o => {
    if (!(o as THREE.Mesh).isMesh || o.userData.noShadow) return;
    if (skip.includes(o)) return;
    const m = (o as THREE.Mesh).material as THREE.Material | undefined;
    if (m && m.transparent) return;
    o.castShadow = true;
    o.receiveShadow = true;
  });
}
