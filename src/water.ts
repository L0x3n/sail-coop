import * as THREE from 'three';
import { scene, sun, SKY } from './scene';
import { wind, env } from './state';
import { makeSeaFoamTexture } from './textures';
import { PATCH, heightTexture, updateOcean } from './fftOcean';

/* =========================== water ===========================
   Three interchangeable surfaces (Q toggles). FLAT and FANCY are
   cosmetic-only (physics ignores them). The FFT ocean is the real
   thing: a spectrum-based wave field computed on the CPU, uploaded to
   the GPU here AND sampled by the boat (simBoat) so the hull rides the
   exact surface you see. All follow the boat, snapped to a grid so the
   pattern stays world-anchored. */
/* water modes: 0 = flat, 1 = fancy (Gerstner), 2 = FFT ocean (CPU/GPU synced) */
export let waterMode = (() => {
  const m = parseInt(localStorage.getItem('sail.waterMode') ?? '1', 10);
  return (m >= 0 && m <= 2 ? m : 1) as 0 | 1 | 2;
})();
export const WATER_MODE_NAMES = ['FLAT', 'FANCY', 'FFT'];
export let fancyWater = waterMode > 0;
const WATER_SIZE = 1400;

/* --- flat water: solid lambert plane with a gentle CPU sine swell --- */
const flatGeo = new THREE.PlaneGeometry(WATER_SIZE, WATER_SIZE, 36, 36);
flatGeo.rotateX(-Math.PI / 2);
export const flatWater = new THREE.Mesh(flatGeo,
  new THREE.MeshLambertMaterial({ color: 0x1f6fb5, transparent: true, opacity: 0.86, side: THREE.DoubleSide }));
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

/* --- fancy water: Sea-of-Thieves-style Gerstner stack ---
   Long smooth rollers + chop, jade subsurface glow through backlit
   crests, lacy texture-driven foam, sun glitter, fresnel sky mirror. */
export const fancyUniforms = {
  uTime: { value: 0 },
  uSwell: { value: 1.0 },
  uOffset: { value: new THREE.Vector2(0, 0) },
  uSunDir: { value: sun.position.clone().normalize() },
  uCamPos: { value: new THREE.Vector3() },
  uDeep: { value: new THREE.Color(0x0a3f5c) },     // navy-teal troughs
  uShallow: { value: new THREE.Color(0x1d8f8a) },  // vivid teal bodies
  uSss: { value: new THREE.Color(0x46e3b5) },      // jade glow through crests
  uSky: { value: new THREE.Color(SKY) },
  uFoam: { value: makeSeaFoamTexture() },
  uFogNear: { value: 260 }, uFogFar: { value: 850 },
};
/* the lit surface — shared by the Gerstner (fancy) and FFT meshes. It reads
   vNrm + vCrest + vPos from whichever vertex shader produced the surface. */
const FRAG = `
    uniform vec3 uSunDir, uCamPos, uDeep, uShallow, uSss, uSky;
    uniform float uFogNear, uFogFar, uTime;
    uniform sampler2D uFoam;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    void main() {
      vec3 n = normalize(vNrm);
      // three scrolling ripple octaves keep the surface alive between swells
      float r1 = sin(vPos.x * 1.45 + uTime * 1.2) * sin(vPos.z * 1.15 - uTime * 0.9);
      float r2 = sin(vPos.x * 3.60 - uTime * 1.8) * sin(vPos.z * 3.20 + uTime * 1.4);
      float r3 = sin(vPos.x * 7.10 + uTime * 2.6) * sin(vPos.z * 6.40 - uTime * 2.2);
      n = normalize(n + vec3(r1 * 0.06 + r2 * 0.045 + r3 * 0.02, 0.0, r1 * 0.045 - r2 * 0.05 + r3 * 0.02));
      vec3 viewDir = normalize(uCamPos - vPos);
      float fres = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);

      // body color: trough navy -> teal, pushed greener as waves stand up
      float heightMix = clamp(vCrest * 1.05 + 0.45, 0.0, 1.0);
      vec3 col = mix(uDeep, uShallow, heightMix);

      // the Sea-of-Thieves signature: light pours THROUGH a backlit crest
      vec3 sunH = normalize(vec3(uSunDir.x, 0.0, uSunDir.z));
      float towardSun = max(dot(viewDir, -sunH), 0.0);
      float crestUp = smoothstep(0.12, 0.9, vCrest);
      float sss = crestUp * (0.35 + 0.65 * pow(towardSun, 2.0)) * max(dot(n, uSunDir), 0.0);
      col = mix(col, uSss, clamp(sss * 0.85, 0.0, 0.8));

      // sky mirror at a glance
      col = mix(col, uSky, fres * 0.55);

      // sun glitter: tight sparkle + soft sheen
      vec3 h = normalize(uSunDir + viewDir);
      float ndh = max(dot(n, h), 0.0);
      col += vec3(1.0, 0.96, 0.82) * (pow(ndh, 420.0) * 2.2 + pow(ndh, 36.0) * 0.12);

      // lacy foam: two scrolling samples of the cell texture, gated by crest height
      float lace1 = texture2D(uFoam, vPos.xz * 0.055 + vec2(uTime * 0.014, -uTime * 0.011)).r;
      float lace2 = texture2D(uFoam, vPos.xz * 0.023 - vec2(uTime * 0.009, uTime * 0.013)).r;
      float lace = lace1 * 0.65 + lace2 * 0.55;
      float crestF = smoothstep(0.30, 0.85, vCrest + r2 * 0.06);
      float foam = smoothstep(0.50, 0.78, crestF * (0.45 + lace));        // full white caps
      float streaks = smoothstep(0.32, 0.5, crestF * (0.45 + lace)) * 0.4; // thin lace below them
      float foamAll = clamp(foam + streaks, 0.0, 1.0);
      col = mix(col, vec3(0.94, 0.99, 1.0), foamAll * 0.85);

      float d = distance(uCamPos, vPos);
      float fogF = smoothstep(uFogNear, uFogFar, d);
      col = mix(col, uSky, fogF);
      // see-through straight down (shallows show the seabed), mirror-opaque at a glance
      float alpha = mix(0.72, 0.97, fres);
      alpha = mix(alpha, 1.0, foamAll * 0.8);
      alpha = mix(alpha, 1.0, fogF);
      gl_FragColor = vec4(col, alpha);
    }`;
const fancyMat = new THREE.ShaderMaterial({
  uniforms: fancyUniforms,
  vertexShader: `
    uniform float uTime; uniform float uSwell; uniform vec2 uOffset;
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
      // two long rollers carry the sea, the rest is texture on top of them
      off += gerstner(vec2( 1.0, 0.35), 0.115 * uSwell, 52.0 + 22.0 * (uSwell - 1.0), base, tang, binc);
      off += gerstner(vec2(-0.45, 1.0), 0.125 * uSwell, 31.0 + 12.0 * (uSwell - 1.0), base, tang, binc);
      off += gerstner(vec2( 0.85,-0.55), 0.115 * uSwell, 17.0, base, tang, binc);
      off += gerstner(vec2( 0.15, 1.0),  0.095 * uSwell,  9.5, base, tang, binc);
      off += gerstner(vec2(-0.9, -0.2),  0.065 * uSwell,  5.2, base, tang, binc);
      off += gerstner(vec2( 0.55, 0.8),  0.045 * uSwell,  3.1, base, tang, binc);
      p += off;
      p.xz -= uOffset;
      vCrest = off.y;
      vNrm = normalize(cross(binc, tang));
      vec4 wp = modelMatrix * vec4(p, 1.0);
      vPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: FRAG,
  transparent: true,
  side: THREE.DoubleSide,
});
const fancyGeo = new THREE.PlaneGeometry(WATER_SIZE, WATER_SIZE, 224, 224);
fancyGeo.rotateX(-Math.PI / 2);
export const fancyWaterMesh = new THREE.Mesh(fancyGeo, fancyMat);
fancyWaterMesh.frustumCulled = false;
scene.add(fancyWaterMesh);

/* --- FFT ocean: the vertex shader displaces by the shared height field
   (world-anchored, tiled by PATCH) and derives the normal from it. The
   CPU samples the SAME field for the boat, so they cannot disagree. --- */
const fftUniforms = Object.assign({}, fancyUniforms, {
  uHeight: { value: heightTexture },
  uPatch: { value: PATCH },
});
const fftMat = new THREE.ShaderMaterial({
  uniforms: fftUniforms,
  vertexShader: `
    uniform sampler2D uHeight; uniform float uPatch;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);   // world XZ before displacing
      vec2 uv = wp.xz / uPatch;
      float e = 1.0 / 64.0;                            // one texel (N = 64)
      float h  = texture2D(uHeight, uv).r;
      float hL = texture2D(uHeight, uv - vec2(e, 0.0)).r;
      float hR = texture2D(uHeight, uv + vec2(e, 0.0)).r;
      float hD = texture2D(uHeight, uv - vec2(0.0, e)).r;
      float hU = texture2D(uHeight, uv + vec2(0.0, e)).r;
      float dhx = (hR - hL) / (2.0 * e * uPatch);      // slope in world space
      float dhz = (hU - hD) / (2.0 * e * uPatch);
      vNrm = normalize(vec3(-dhx, 1.0, -dhz));
      vCrest = h;
      wp.y += h;
      vPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: FRAG,
  transparent: true,
  side: THREE.DoubleSide,
});
const fftGeo = new THREE.PlaneGeometry(WATER_SIZE, WATER_SIZE, 224, 224);
fftGeo.rotateX(-Math.PI / 2);
export const fftWaterMesh = new THREE.Mesh(fftGeo, fftMat);
fftWaterMesh.frustumCulled = false;
fftWaterMesh.visible = false;
scene.add(fftWaterMesh);

export function updateWater(t: number, cx: number, cz: number) {
  fancyUniforms.uTime.value = t;                          // shared by fancy + fft (ripples/foam)
  if (waterMode === 1) {
    fancyWaterMesh.position.set(Math.round(cx / 40) * 40, 0, Math.round(cz / 40) * 40);
    fancyUniforms.uOffset.value.set(fancyWaterMesh.position.x, fancyWaterMesh.position.z);
  } else if (waterMode === 2) {
    fftWaterMesh.position.set(Math.round(cx / 40) * 40, 0, Math.round(cz / 40) * 40);
    // evolve the spectrum: amplitude rides the sea state; the boat reads the same field
    updateOcean(t, wind.angle, wind.strength, Math.min(1.8, Math.max(0.6, env.swell)));
  } else {
    updateFlatWater(t, cx, cz);
  }
  // uCamPos is set per-view at render time
}

export function setWaterMode(m: 0 | 1 | 2) {
  waterMode = m;
  fancyWater = m > 0;
  flatWater.visible = m === 0;
  fancyWaterMesh.visible = m === 1;
  fftWaterMesh.visible = m === 2;
  localStorage.setItem('sail.waterMode', String(m));
}
export function cycleWater(): string {
  setWaterMode(((waterMode + 1) % 3) as 0 | 1 | 2);
  return WATER_MODE_NAMES[waterMode];
}
/* sea state for the Gerstner swell, clamped before the wave self-intersects */
export function setSwell(v: number) {
  fancyUniforms.uSwell.value = Math.min(1.9, Math.max(0.55, v));
}
/* is the FFT ocean live? (simBoat reads the wave field only then) */
export const fftActive = () => waterMode === 2;
setWaterMode(waterMode);
