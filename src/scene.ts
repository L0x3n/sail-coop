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
renderer.toneMappingExposure = 1.12;
renderer.domElement.className = 'webgl';
document.body.appendChild(renderer.domElement);

export const scene = new THREE.Scene();
export const SKY = 0xcfeaf8;          // horizon tint: fog + water blend into this
scene.background = new THREE.Color(SKY);
scene.fog = new THREE.Fog(SKY, 260, 850);

export const hemi = new THREE.HemisphereLight(0xcfeaff, 0x2a5a7a, 0.95);
scene.add(hemi);
export const sun = new THREE.DirectionalLight(0xfff2d8, 1.45);
sun.position.set(80, 120, 40);
scene.add(sun);
// real-time shadows: the shadow box follows the boat (set each frame)
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 40; sun.shadow.camera.far = 320;
sun.shadow.camera.left = -50; sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50; sun.shadow.camera.bottom = -50;
sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.03;
scene.add(sun.target);

/* --- sky dome: soft gradient + sun glow, follows the camera --- */
export const skyDome = new THREE.Mesh(
  new THREE.SphereGeometry(900, 24, 16),
  new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uZenith: { value: new THREE.Color(0x4d9ed8) },
      uHorizon: { value: new THREE.Color(SKY) },
      uSun: { value: sun.position.clone().normalize() },
    },
    vertexShader: `varying vec3 vDir;
      void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uZenith,uHorizon,uSun; varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.5));
        float s = max(dot(d, normalize(uSun)), 0.0);
        col += vec3(1.0, 0.92, 0.72) * (pow(s, 900.0) * 1.2 + pow(s, 16.0) * 0.10);
        gl_FragColor = vec4(col, 1.0);
      }`,
  }));
skyDome.userData.noShadow = true;
skyDome.frustumCulled = false;
scene.add(skyDome);

/* --- a few lazy clouds drifting with the wind --- */
export const clouds: THREE.Group[] = [];
{
  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x8fa9bb, emissiveIntensity: 0.45 });
  for (let i = 0; i < 9; i++) {
    const cl = new THREE.Group();
    const n = 3 + (i % 3);
    for (let k = 0; k <= n; k++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(6 + Math.random() * 8, 10, 8), cloudMat);
      puff.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 14);
      puff.scale.y = 0.45;
      puff.userData.noShadow = true;
      cl.add(puff);
    }
    cl.position.set((Math.random() - 0.5) * 1100, 70 + Math.random() * 55, (Math.random() - 0.5) * 1100);
    scene.add(cl);
    clouds.push(cl);
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
