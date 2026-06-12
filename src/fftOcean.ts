import * as THREE from 'three';

/* ===================================================================
   FFT ocean (Tessendorf). A wave spectrum is evolved in frequency
   space and an inverse FFT brings it to a tiling height field. The
   SAME field is uploaded to the GPU (a DataTexture the water shader
   displaces by) and sampled on the CPU (oceanHeight) so the boat rides
   exactly the surface you see — the CPU/GPU sync the masterplan wanted.

   WebGL2 has no compute shaders, so the IFFT runs in JS (radix-2) on a
   modest 64x64 grid at 30 Hz; that is plenty for the long swell, and
   the shader adds fine ripples + foam on top.
   =================================================================== */
export const N = 64;                 // grid resolution (power of two)
export const PATCH = 200;            // metres per tile (holds the long swell)
const G = 9.81;
const A_PHILLIPS = 0.95;             // spectrum amplitude (tuned for a gentle ~1 m sea)

const kx = new Float32Array(N * N), kz = new Float32Array(N * N);
const omega = new Float32Array(N * N);
const h0re = new Float32Array(N * N), h0im = new Float32Array(N * N);       // h0(k)
const h0cre = new Float32Array(N * N), h0cim = new Float32Array(N * N);     // conj(h0(-k))
const Hre = new Float32Array(N * N), Him = new Float32Array(N * N);         // spectrum at t
export const heightField = new Float32Array(N * N);                         // spatial height (metres)

let builtAng = 1e9, builtV = 0, amp = 1;

/* the height map the GPU samples (R = metres) */
export const heightTexture = new THREE.DataTexture(heightField, N, N, THREE.RedFormat, THREE.FloatType);
heightTexture.wrapS = heightTexture.wrapT = THREE.RepeatWrapping;
heightTexture.minFilter = heightTexture.magFilter = THREE.LinearFilter;
heightTexture.needsUpdate = true;

function gauss(): number {            // box-muller standard normal
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function phillips(KX: number, KZ: number, k2: number, ca: number, sa: number, V: number): number {
  if (k2 < 1e-12) return 0;
  const L = V * V / G;
  const kdotw = (KX * ca + KZ * sa);
  let dir = kdotw * kdotw / k2;                 // |k̂·ŵ|²
  if (kdotw < 0) dir *= 0.18;                   // damp waves moving against the wind
  const small = L * 0.0015;
  return A_PHILLIPS * Math.exp(-1 / (k2 * L * L)) / (k2 * k2) * dir * Math.exp(-k2 * small * small);
}

/* (re)build the base spectrum h0 for the current wind */
function buildSpectrum(windAngle: number, V: number) {
  const ca = Math.cos(windAngle), sa = Math.sin(windAngle);
  for (let m = 0; m < N; m++) for (let n = 0; n < N; n++) {
    const i = m * N + n;
    const KX = 2 * Math.PI * (n - N / 2) / PATCH;
    const KZ = 2 * Math.PI * (m - N / 2) / PATCH;
    kx[i] = KX; kz[i] = KZ;
    const k2 = KX * KX + KZ * KZ;
    omega[i] = Math.sqrt(G * Math.sqrt(k2));
    const p = Math.sqrt(phillips(KX, KZ, k2, ca, sa, V) * 0.5);
    h0re[i] = gauss() * p; h0im[i] = gauss() * p;
  }
  // conj(h0(-k)); -k is the mirrored index
  for (let m = 0; m < N; m++) for (let n = 0; n < N; n++) {
    const i = m * N + n;
    const mn = ((N - n) % N), mm = ((N - m) % N);
    const j = mm * N + mn;
    h0cre[i] = h0re[j]; h0cim[i] = -h0im[j];
  }
  builtAng = windAngle; builtV = V;
}

/* in-place iterative radix-2 FFT over a length-N row (re/im are length N) */
function fft1d(re: Float32Array, im: Float32Array, off: number, stride: number, inverse: boolean) {
  // bit-reversal permutation
  for (let i = 1, j = 0; i < N; i++) {
    let bit = N >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      const ai = off + i * stride, aj = off + j * stride;
      let t = re[ai]; re[ai] = re[aj]; re[aj] = t;
      t = im[ai]; im[ai] = im[aj]; im[aj] = t;
    }
  }
  for (let len = 2; len <= N; len <<= 1) {
    const ang = (inverse ? 2 : -2) * Math.PI / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    const half = len >> 1;
    for (let i = 0; i < N; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < half; k++) {
        const a = off + (i + k) * stride, b = off + (i + k + half) * stride;
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr; im[b] = im[a] - ti;
        re[a] += tr; im[a] += ti;
        const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr;
      }
    }
  }
  if (inverse) for (let i = 0; i < N; i++) { const a = off + i * stride; re[a] /= N; im[a] /= N; }
}
function ifft2d(re: Float32Array, im: Float32Array) {
  for (let m = 0; m < N; m++) fft1d(re, im, m * N, 1, true);     // rows
  for (let n = 0; n < N; n++) fft1d(re, im, n, N, true);          // columns
}

/* evolve to time t and bring the surface to the spatial grid */
export function updateOcean(t: number, windAngle: number, windStrength: number, amplitude: number) {
  const V = 7 + windStrength * 0.5;                              // map game wind -> spectrum wind
  amp = amplitude;
  if (Math.abs(windAngle - builtAng) > 0.05 || Math.abs(V - builtV) > 0.6) buildSpectrum(windAngle, V);
  for (let i = 0; i < N * N; i++) {
    const wt = omega[i] * t;
    const cs = Math.cos(wt), sn = Math.sin(wt);
    // h(k,t) = h0 e^{iωt} + conj(h0(-k)) e^{-iωt}
    Hre[i] = (h0re[i] * cs - h0im[i] * sn) + (h0cre[i] * cs + h0cim[i] * sn);
    Him[i] = (h0re[i] * sn + h0im[i] * cs) + (h0cim[i] * cs - h0cre[i] * sn);
  }
  ifft2d(Hre, Him);
  // (-1)^(n+m) corrects the centred-frequency layout; take the real part
  for (let m = 0; m < N; m++) for (let n = 0; n < N; n++) {
    const i = m * N + n;
    heightField[i] = ((n + m) & 1 ? -Hre[i] : Hre[i]) * amp;
  }
  heightTexture.needsUpdate = true;
}

/* CPU height sample (bilinear, tiling) — the boat reads this */
export function oceanHeight(x: number, z: number): number {
  let u = (x / PATCH) % 1; if (u < 0) u += 1;
  let v = (z / PATCH) % 1; if (v < 0) v += 1;
  const fx = u * N, fz = v * N;
  const n0 = Math.floor(fx) % N, m0 = Math.floor(fz) % N;
  const n1 = (n0 + 1) % N, m1 = (m0 + 1) % N;
  const tx = fx - Math.floor(fx), tz = fz - Math.floor(fz);
  const h00 = heightField[m0 * N + n0], h10 = heightField[m0 * N + n1];
  const h01 = heightField[m1 * N + n0], h11 = heightField[m1 * N + n1];
  return (h00 * (1 - tx) + h10 * tx) * (1 - tz) + (h01 * (1 - tx) + h11 * tx) * tz;
}

/* --- self-test: FFT round-trip identity (forward then inverse == original) --- */
export function selfTest(): { maxErr: number; range: [number, number] } {
  const re = new Float32Array(N * N), im = new Float32Array(N * N);
  const re0 = new Float32Array(N * N), im0 = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) { re[i] = re0[i] = Math.random() * 2 - 1; im[i] = im0[i] = Math.random() * 2 - 1; }
  for (let m = 0; m < N; m++) fft1d(re, im, m * N, 1, false);
  for (let n = 0; n < N; n++) fft1d(re, im, n, N, false);
  ifft2d(re, im);
  let maxErr = 0;
  for (let i = 0; i < N * N; i++) maxErr = Math.max(maxErr, Math.abs(re[i] - re0[i]), Math.abs(im[i] - im0[i]));
  let lo = 1e9, hi = -1e9;
  for (let i = 0; i < N * N; i++) { lo = Math.min(lo, heightField[i]); hi = Math.max(hi, heightField[i]); }
  return { maxErr, range: [lo, hi] };
}
