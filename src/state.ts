import { v2 } from './mathUtil';
import { CONFIG, DECK_X, DECK_Z, GAPS, HULL_L, HULL_W } from './config';
import type { Char } from './types';

/* --- boat layout (scaled by the chosen boat preset) --- */
export const layout = {
  scale: 1,
  deckX: DECK_X, deckZ: DECK_Z,
  hullW: HULL_W, hullL: HULL_L,
  helm: v2(0, -2.65),
  sailSta: v2(0, 1.45),
  gaps: GAPS.map(g => ({ ...g })),
};
export function applyLayoutScale(S: number) {
  layout.scale = S;
  layout.deckX = DECK_X * S;
  layout.deckZ = DECK_Z * S;
  layout.hullW = HULL_W * S;
  layout.hullL = HULL_L * S;
  layout.helm = v2(0, -2.65 * S);
  layout.sailSta = v2(0, 1.45 * S);
  layout.gaps = GAPS.map(g => ({ z0: g.z0 * S, z1: g.z1 * S }));
}

/* --- per-boat handling numbers (preset overrides on top of CONFIG) --- */
export const tuning = {
  sailPower: CONFIG.sailPower,
  rudderAuthority: CONFIG.rudderAuthority,
  turnDrag: CONFIG.turnDrag,
  maxHeel: CONFIG.maxHeel,
  heelSlide: CONFIG.heelSlide,
  fwdDragQuad: CONFIG.fwdDragQuad,
  yawDamp: CONFIG.yawDamp,
};
export function applyTuning(t: Partial<typeof tuning>) {
  tuning.sailPower = CONFIG.sailPower;
  tuning.rudderAuthority = CONFIG.rudderAuthority;
  tuning.turnDrag = CONFIG.turnDrag;
  tuning.maxHeel = CONFIG.maxHeel;
  tuning.heelSlide = CONFIG.heelSlide;
  tuning.fwdDragQuad = CONFIG.fwdDragQuad;
  tuning.yawDamp = CONFIG.yawDamp;
  Object.assign(tuning, t);
}

/* --- accumulated mouse-drag from the matey while they hold someone (net) --- */
export const netDrag = { x: 0, y: 0 };

/* --- seagull splats on the deck (boat-local; meshes live in critters) --- */
export interface SplatEntry { id: number; x: number; z: number; }
export const splats: SplatEntry[] = [];
export function slipAt(x: number, z: number): boolean {
  for (const s of splats) {
    if (Math.hypot(s.x - x, s.z - z) < CONFIG.splatRadius) return true;
  }
  return false;
}

/* --- environment: weather + sea state (host-authoritative, synced) --- */
export const env = {
  weatherId: 0 as 0 | 1 | 2,   // 0 sunny, 1 overcast, 2 squall
  weatherLerp: 0,              // 0..1 ease into the current weather
  windMul: 1,
  swell: 1,                    // wave/bob multiplier (weather x open-sea x AAA water)
  darkness: 0,
  gustMul: 1,                  // event director: wind gust multiplier
  bigWave: 0,                  // event director: signed long-swell tilt (-1..1)
};

/* =========================== game state =========================== */
export const boat = {
  pos: v2(4.8, -206),        // moored alongside the home pier
  yaw: 0,                    // bow toward open water
  vel: v2(),
  angVel: 0,
  anchored: true,            // starts at anchor — raise it to set off
  rudder: 0,                 // radians; positive = counter-clockwise (player D = negative)
  boomAngle: 20 * Math.PI / 180,
  heel: 0,                   // + = (internal) starboard dips
  lastAccel: v2(),
  lastAngAccel: 0,
  sailForce: 0,
  luffing: true,
  noGo: false,
};

export const wind = { angle: 0, strength: CONFIG.windStrength }; // angle = direction wind blows TOWARD

export const session = {
  runTime: 0,
  docked: false,
  dockTimer: 0,
  shake: 0,
  started: false,
  inMenu: true,
  simT: 0,
};

/* --- the delivery economy (host-authoritative, synced) --- */
export const game = {
  gold: 0,
  delivered: 0,
  lost: 0,
  batch: 0,
  batchT: 0,        // seconds spent on the current shipment
};

/* --- the chaos shop: purchases persist (host's browser owns the save) --- */
export const owned = {
  skiff: false,
  galleon: false,
  bigDeck: false,
  chartNorth: false,
  hatStraw: false,
  hatFancy: false,
};
export const prefs = {
  ship: 'sloop',
  hats: ['captain', 'bandana'] as string[],   // per char index
};
export function saveProgress() {
  try {
    localStorage.setItem('sail.save', JSON.stringify({ gold: game.gold, owned, prefs }));
  } catch { /* private mode etc */ }
}
export function loadProgress() {
  try {
    const raw = localStorage.getItem('sail.save');
    if (!raw) return;
    const s = JSON.parse(raw);
    if (typeof s.gold === 'number') game.gold = s.gold;
    Object.assign(owned, s.owned ?? {});
    if (s.prefs?.ship) prefs.ship = s.prefs.ship;
    if (Array.isArray(s.prefs?.hats)) prefs.hats = s.prefs.hats;
  } catch { /* corrupt save -> fresh start */ }
}
loadProgress();

/* --- net role --- */
export type NetRole = null | 'host' | 'guest';
export let netRole: NetRole = null;
export let guestHere = false;
export function setNetRole(r: NetRole) { netRole = r; }
export function setGuestHere(v: boolean) { guestHere = v; }

/* --- characters (registered from main once meshes exist) --- */
export const chars: Char[] = [];
export let p1: Char;
export let p2: Char;
export function registerChars(a: Char, b: Char) { p1 = a; p2 = b; chars.push(a, b); }

export const myChar = (): Char => (netRole === 'guest' ? p2 : p1);
export const charActive = (c: Char): boolean =>
  c === p1 || netRole === 'guest' || (netRole === 'host' && guestHere);
export const gameStarted = () => !session.inMenu;
