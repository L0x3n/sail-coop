export const TAU = Math.PI * 2;
export const D2R = Math.PI / 180;
export const R2D = 180 / Math.PI;

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function wrapPi(a: number): number {
  a = (a + Math.PI) % TAU;
  if (a < 0) a += TAU;
  return a - Math.PI;
}

export function smoothstep(a: number, b: number, x: number): number {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export function fmtTime(s: number): string {
  s = Math.max(0, s | 0);
  return ((s / 60) | 0) + ':' + String(s % 60).padStart(2, '0');
}

export interface V2 { x: number; z: number; }
export const v2 = (x = 0, z = 0): V2 => ({ x, z });
export const dot2 = (a: V2, b: V2) => a.x * b.x + a.z * b.z;
export const len2 = (a: V2) => Math.hypot(a.x, a.z);

// heading angle -> unit vector (yaw 0 = +z; yaw increases counter-clockwise!)
export const headVec = (a: number): V2 => v2(Math.sin(a), Math.cos(a));
export const rightVec = (a: number): V2 => v2(Math.cos(a), -Math.sin(a));
// NOTE: screen-right of heading f is (-cos f, sin f) — the OPPOSITE of rightVec.
// Internal physics uses rightVec consistently; flip signs only at input boundaries.
