import { v2 } from './mathUtil';
import { CONFIG } from './config';
import type { Char } from './types';

/* =========================== game state =========================== */
export const boat = {
  pos: v2(0, 0),
  yaw: Math.PI / 2,          // spawn on a beam reach (wind blows +z, island at -z)
  vel: v2(),
  angVel: 0,
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
