import * as THREE from 'three';
import { scene, sun, SKY } from './scene';

/* =========================== water ===========================
   Two interchangeable surfaces (Q toggles). Purely cosmetic — hull
   physics never reads the water. Both follow the boat (snapped to a
   grid so the surface pattern stays world-anchored). */
export let fancyWater = localStorage.getItem('sail.water') !== 'flat';
const WATER_SIZE = 1400;

/* --- flat water: solid lambert plane with a gentle CPU sine swell --- */
const flatGeo = new THREE.PlaneGeometry(WATER_SIZE, WATER_SIZE, 36, 36);
flatGeo.rotateX(-Math.PI / 2);
export const flatWater = new THREE.Mesh(flatGeo, new THREE.MeshLambertMaterial({ color: 0x1f6fb5 }));
scene.add(flatWater);
const flatBase = (flatGeo.attributes.position.array as Float32Array).slice();
function updateFlatWater(t: number, cx: number, cz: number) {
  flatWater.position.set(Math.round(cx / 40) * 40, 0, Math.round(cz / 40) * 40);
  const p = flatGeo.attributes.position.array as Float32Array;
  for (let i = 0; i < p.length; i += 3) {
    const wx = flatBase[i] + flatWater.position.x, wz = flatBase[i + 2] + flatWater.position.z;
    p[i + 1] = Math.sin(wx * 0.045 + t * 0.9) * 0.22 + Math.cos(wz * 0.05 + t * 0.7) * 0.18;
  }
  flatGeo.attributes.position.needsUpdate = true;
  flatGeo.computeVertexNormals();
}

/* --- fancy water: Gerstner-wave shader with ripples, SSS, glitter, foam --- */
export const fancyUniforms = {
  uTime: { value: 0 },
  uOffset: { value: new THREE.Vector2(0, 0) },
  uSunDir: { value: sun.position.clone().normalize() },
  uCamPos: { value: new THREE.Vector3() },
  uDeep: { value: new THREE.Color(0x0e4e8e) },
  uShallow: { value: new THREE.Color(0x2f9ad0) },
  uSky: { value: new THREE.Color(SKY) },
  uFogNear: { value: 260 }, uFogFar: { value: 850 },
};
const fancyMat = new THREE.ShaderMaterial({
  uniforms: fancyUniforms,
  vertexShader: `
    uniform float uTime; uniform vec2 uOffset;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    vec3 gerstner(vec2 d, float steep, float len, vec3 p, inout vec3 tang, inout vec3 binc) {
      float k = 6.28318 / len;
      float c = sqrt(9.8 / k);
      vec2 dir = normalize(d);
      float f = k * (dot(dir, p.xz) - c * uTime);
      float a = steep / k;
      tang += vec3(-dir.x*dir.x*steep*sin(f), dir.x*steep*cos(f), -dir.x*dir.y*steep*sin(f));
      binc += vec3(-dir.x*dir.y*steep*sin(f), dir.y*steep*cos(f), -dir.y*dir.y*steep*sin(f));
      return vec3(dir.x*a*cos(f), a*sin(f), dir.y*a*cos(f));
    }
    void main() {
      vec3 p = position;
      p.xz += uOffset;
      vec3 tang = vec3(1.0,0.0,0.0), binc = vec3(0.0,0.0,1.0);
      vec3 base = p;
      vec3 off = vec3(0.0);
      off += gerstner(vec2( 1.0, 0.3), 0.16, 26.0, base, tang, binc);
      off += gerstner(vec2(-0.6, 1.0), 0.14, 15.0, base, tang, binc);
      off += gerstner(vec2( 0.9,-0.8), 0.10,  8.0, base, tang, binc);
      off += gerstner(vec2( 0.2, 1.0), 0.08,  4.5, base, tang, binc);
      p += off;
      p.xz -= uOffset;
      vCrest = off.y;
      vNrm = normalize(cross(binc, tang));
      vec4 wp = modelMatrix * vec4(p, 1.0);
      vPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: `
    uniform vec3 uSunDir, uCamPos, uDeep, uShallow, uSky;
    uniform float uFogNear, uFogFar, uTime;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    void main() {
      vec3 n = normalize(vNrm);
      float r1 = sin(vPos.x * 1.45 + uTime * 1.2) * sin(vPos.z * 1.15 - uTime * 0.9);
      float r2 = sin(vPos.x * 3.60 - uTime * 1.8) * sin(vPos.z * 3.20 + uTime * 1.4);
      n = normalize(n + vec3(r1 * 0.07 + r2 * 0.05, 0.0, r1 * 0.05 - r2 * 0.06));
      vec3 viewDir = normalize(uCamPos - vPos);
      float fres = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);
      float heightMix = clamp(vCrest * 1.3 + 0.5, 0.0, 1.0);
      vec3 col = mix(uDeep, uShallow, heightMix);
      float sss = smoothstep(0.15, 0.85, vCrest) * max(dot(n, uSunDir), 0.0);
      col += vec3(0.05, 0.38, 0.42) * sss * 0.55;
      col = mix(col, uSky, fres * 0.6);
      vec3 h = normalize(uSunDir + viewDir);
      float ndh = max(dot(n, h), 0.0);
      col += vec3(1.0, 0.95, 0.8) * (pow(ndh, 260.0) * 1.4 + pow(ndh, 24.0) * 0.10);
      float foamN = sin(vPos.x * 2.2 + uTime * 1.8) * sin(vPos.z * 2.4 - uTime * 1.4);
      float foam = smoothstep(0.40, 0.72, vCrest + foamN * 0.14);
      col = mix(col, vec3(0.93, 0.98, 1.0), foam * 0.8);
      float d = distance(uCamPos, vPos);
      col = mix(col, uSky, smoothstep(uFogNear, uFogFar, d));
      gl_FragColor = vec4(col, 1.0);
    }`,
});
const fancyGeo = new THREE.PlaneGeometry(WATER_SIZE, WATER_SIZE, 180, 180);
fancyGeo.rotateX(-Math.PI / 2);
export const fancyWaterMesh = new THREE.Mesh(fancyGeo, fancyMat);
fancyWaterMesh.frustumCulled = false;
scene.add(fancyWaterMesh);

export function updateWater(t: number, cx: number, cz: number) {
  if (fancyWater) {
    fancyWaterMesh.position.set(Math.round(cx / 40) * 40, 0, Math.round(cz / 40) * 40);
    fancyUniforms.uTime.value = t;
    fancyUniforms.uOffset.value.set(fancyWaterMesh.position.x, fancyWaterMesh.position.z);
    // uCamPos is set per-view at render time
  } else {
    updateFlatWater(t, cx, cz);
  }
}

export function setWaterQuality(fancy: boolean) {
  fancyWater = fancy;
  fancyWaterMesh.visible = fancy;
  flatWater.visible = !fancy;
  localStorage.setItem('sail.water', fancy ? 'fancy' : 'flat');
}
setWaterQuality(fancyWater);
