import type * as THREE from 'three';
import type { V2 } from './mathUtil';

export interface Axes { fwd: number; strafe: number; j: number; h: number; u: number; }

export interface PirateParts {
  eyes: THREE.Mesh[];
  pupils: THREE.Mesh[];
  brows: THREE.Mesh[];
  arms: THREE.Mesh[];
  mouth: THREE.Mesh;
}

export interface EyeState {
  px: number; py: number; vx: number; vy: number;
  pvx: number; pvz: number;
  blink: number; blinkT: number;
}

export type CharMode = 'deck' | 'water';
export type Station = 'helm' | 'sail' | null;

export interface Char {
  name: string;
  mesh: THREE.Group;
  mode: CharMode;
  station: Station;
  pos: V2;            // boat-local on deck, world in water
  vel: V2;
  knock: number;      // >0 while knocked down (no control, low friction)
  walkPhase: number;
  facing: number;     // boat-local yaw on deck, world yaw in water
  pitch: number;
  jumpY: number;      // height above deck
  vy: number;
  netAxes: Axes;      // remote matey's input (host applies it)
  overboardCount: number;
  animMoving: boolean;
  eye?: EyeState;
  rippleT: number;
  /* hands: mop + grab/throw */
  hasMop: boolean;
  grabbedBy: number;  // index of the grabber, -1 = free
  holding: boolean;   // currently carrying the other pirate
  mash: number;       // escape presses accumulated while grabbed
  scrubT: number;     // current scrub progress in seconds
}

/* --- net protocol --- */
export interface CharSnap {
  x: number; z: number; y: number; f: number; m: CharMode; kn: number; st: Station;
  gb: number; hm: boolean; sc: number;
}
export interface MopSnap { x: number; z: number; h: number; held: number; thrown: boolean; on: boolean; }
export interface Snapshot {
  k: 's';
  b: { x: number; z: number; yaw: number; vx: number; vz: number; av: number;
       rud: number; boom: number; heel: number; sf: number; luff: boolean };
  w: { a: number; s: number; wid: number; wl: number };
  t: number; d: boolean;
  c: CharSnap[];
  m: MopSnap[];   // the mops (boat-local)
}
export type NetMsg =
  | Snapshot
  | { k: 'start'; boat: string }
  | { k: 'i'; a: Axes; f: number }
  | { k: 'g' }
  | { k: 'toast'; x: string; col?: string }
  | { k: 'fx'; fx: 'poop'; id: number; x: number; z: number }
  | { k: 'fx'; fx: 'unsplat'; id: number }
  | { k: 'f' }                                  // matey pressed the hands key (edge)
  | { k: 'm0' }                                 // matey tapped LMB (whack attempt)
  | { k: 'reset' }
  | { k: 'restart?' };

export interface BoatPreset {
  id: string;
  name: string;
  desc: string;
  scale: number;
  tune: Partial<{
    sailPower: number; rudderAuthority: number; turnDrag: number;
    maxHeel: number; heelSlide: number; fwdDragQuad: number; yawDamp: number;
  }>;
}
