/* WebAudio synth: wind + lapping water ambience, hull creaks, splashes,
   docking chime. Everything procedural, starts on first user gesture. */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let windGain: GainNode | null = null;
let seaGain: GainNode | null = null;
let muted = localStorage.getItem('sail.muted') === '1';
let creakCooldown = 0;

function noiseBuffer(c: AudioContext, seconds: number): AudioBuffer {
  const buf = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;      // brown-ish
    d[i] = last * 3.5;
  }
  return buf;
}

export function ensureAudio() {
  if (ctx) return;
  try {
    ctx = new AudioContext();
  } catch { return; }
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 1;
  master.connect(ctx.destination);

  const noise = noiseBuffer(ctx, 2.5);
  // wind whoosh
  const windSrc = ctx.createBufferSource();
  windSrc.buffer = noise; windSrc.loop = true;
  const windFilt = ctx.createBiquadFilter();
  windFilt.type = 'bandpass'; windFilt.frequency.value = 480; windFilt.Q.value = 0.55;
  windGain = ctx.createGain(); windGain.gain.value = 0;
  windSrc.connect(windFilt).connect(windGain).connect(master);
  windSrc.start();
  // lapping sea
  const seaSrc = ctx.createBufferSource();
  seaSrc.buffer = noise; seaSrc.loop = true; seaSrc.playbackRate.value = 0.55;
  const seaFilt = ctx.createBiquadFilter();
  seaFilt.type = 'lowpass'; seaFilt.frequency.value = 220;
  seaGain = ctx.createGain(); seaGain.gain.value = 0.03;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.16;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.015;
  lfo.connect(lfoGain).connect(seaGain.gain);
  seaSrc.connect(seaFilt).connect(seaGain).connect(master);
  seaSrc.start(); lfo.start();
}

let flapTimer = 0;
export function updateAudio(dt: number, windStrength: number, boatSpeed: number, luff = 0) {
  creakCooldown -= dt;
  flapTimer -= dt;
  if (!ctx || !windGain || !seaGain) return;
  windGain.gain.value = Math.min(0.13, windStrength * 0.0042 + boatSpeed * 0.004);
  seaGain.gain.value = Math.min(0.08, 0.028 + boatSpeed * 0.0045);
  // canvas slapping about while the sail luffs
  if (luff > 0.5 && flapTimer <= 0) {
    flapTimer = 0.35 + Math.random() * 0.35;
    flap();
  }
}

function flap() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.12);
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.8;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.06, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  src.connect(f).connect(g).connect(master);
  src.start(t); src.stop(t + 0.13);
}

export function gullCry() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  for (let i = 0; i < 2; i++) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sawtooth';
    const t0 = t + i * 0.22;
    o.frequency.setValueAtTime(1150 - i * 120, t0);
    o.frequency.exponentialRampToValueAtTime(640 - i * 60, t0 + 0.18);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.035, t0 + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
    o.connect(g).connect(master);
    o.start(t0); o.stop(t0 + 0.22);
  }
}

export function splat() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.2);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.setValueAtTime(1400, t);
  f.frequency.exponentialRampToValueAtTime(180, t + 0.12);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.16, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
  src.connect(f).connect(g).connect(master);
  src.start(t); src.stop(t + 0.18);
  const o = ctx.createOscillator(), og = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(300, t);
  o.frequency.exponentialRampToValueAtTime(70, t + 0.1);
  og.gain.setValueAtTime(0.08, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  o.connect(og).connect(master);
  o.start(t); o.stop(t + 0.13);
}

export function thunder() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  // crack
  const crack = ctx.createBufferSource();
  crack.buffer = noiseBuffer(ctx, 0.3);
  const cf = ctx.createBiquadFilter();
  cf.type = 'highpass'; cf.frequency.value = 900;
  const cg = ctx.createGain();
  cg.gain.setValueAtTime(0.16, t);
  cg.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  crack.connect(cf).connect(cg).connect(master);
  crack.start(t); crack.stop(t + 0.3);
  // long rumble
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 2.4);
  src.playbackRate.value = 0.4;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.setValueAtTime(300, t);
  f.frequency.exponentialRampToValueAtTime(70, t + 2.0);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.2, t + 0.12);
  g.gain.exponentialRampToValueAtTime(0.001, t + 2.2);
  src.connect(f).connect(g).connect(master);
  src.start(t); src.stop(t + 2.4);
}

export function thwack() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = 'square';
  o.frequency.setValueAtTime(180, t);
  o.frequency.exponentialRampToValueAtTime(55, t + 0.09);
  f.type = 'lowpass'; f.frequency.value = 800;
  g.gain.setValueAtTime(0.18, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  o.connect(f).connect(g).connect(master);
  o.start(t); o.stop(t + 0.13);
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.08);
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.1, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
  src.connect(ng).connect(master);
  src.start(t); src.stop(t + 0.08);
}

export function fishPlop() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(640, t);
  o.frequency.exponentialRampToValueAtTime(160, t + 0.12);
  g.gain.setValueAtTime(0.06, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + 0.15);
}

export function creak(intensity: number) {
  if (!ctx || !master || creakCooldown > 0) return;
  creakCooldown = 0.7 + Math.random() * 0.6;
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(95, t);
  o.frequency.exponentialRampToValueAtTime(55, t + 0.35);
  f.type = 'lowpass'; f.frequency.value = 420;
  g.gain.setValueAtTime(0.05 * Math.min(1, intensity), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  o.connect(f).connect(g).connect(master);
  o.start(t); o.stop(t + 0.42);
}

export function splash(big: boolean) {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  // noise burst
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.5);
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.setValueAtTime(big ? 2600 : 1800, t);
  f.frequency.exponentialRampToValueAtTime(280, t + 0.45);
  const g = ctx.createGain();
  g.gain.setValueAtTime(big ? 0.22 : 0.13, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  src.connect(f).connect(g).connect(master);
  src.start(t); src.stop(t + 0.52);
  // plop
  const o = ctx.createOscillator(), og = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(big ? 420 : 520, t);
  o.frequency.exponentialRampToValueAtTime(110, t + 0.22);
  og.gain.setValueAtTime(0.10, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  o.connect(og).connect(master);
  o.start(t); o.stop(t + 0.26);
}

export function dockedChime() {
  if (!ctx || !master) return;
  const notes = [523.25, 659.25, 783.99];
  notes.forEach((freq, i) => {
    const t = ctx!.currentTime + i * 0.14;
    const o = ctx!.createOscillator(), g = ctx!.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    o.connect(g).connect(master!);
    o.start(t); o.stop(t + 0.52);
  });
}

export function toggleMute(): boolean {
  muted = !muted;
  localStorage.setItem('sail.muted', muted ? '1' : '0');
  if (master) master.gain.value = muted ? 0 : 1;
  return muted;
}
export const isMuted = () => muted;
