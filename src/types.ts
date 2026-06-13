import type * as THREE from 'three';
import type { V2 } from './mathUtil';

export interface Axes { fwd: number; strafe: number; j: number; h: number; u: number; }

export interface PirateParts {
  eyes: THREE.Mesh[];
  pupils: THREE.Mesh[];
  brows: THREE.Mesh[];
  arms: THREE.Mesh[];
  legs: THREE.Mesh[];
  mouth: THREE.Mesh;
  rig: THREE.Group;      // everything; flops/spins as one
  torso: THREE.Group;    // pivots at the hips
  headBone: THREE.Group; // pivots at the neck (face + hat ride along)
  hatSlot: THREE.Group;  // the hat attaches here (and pops off it)
}

/* pseudo-ragdoll: every pose channel is a damped spring */
export interface RagChannel { a: number; v: number; }
export interface RagState {
  torsoX: RagChannel; torsoZ: RagChannel;
  headX: RagChannel; headZ: RagChannel;
  armLX: RagChannel; armLZ: RagChannel;
  armRX: RagChannel; armRZ: RagChannel;
  legL: RagChannel; legR: RagChannel;
  rigY: RagChannel;
  spin: number; spinV: number;     // airborne cartwheels
  wasKnocked: boolean;
  flopDir: number;                 // face-plant (+1) or back-flop (-1)
  flopRoll: number;                // fixed sideways sprawl per knockdown
}

export interface EyeState {
  px: number; py: number; vx: number; vy: number;
  pvx: number; pvz: number;
  blink: number; blinkT: number;
}

export type CharMode = 'deck' | 'water' | 'shore';
export type Station = 'helm' | 'sail' | 'cannon' | null;

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
  rag?: RagState;
  rippleT: number;
  hat: string;        // current hat style (cosmetic, pops off on knockdowns)
  /* hands: mop + grab/throw + cargo */
  hasMop: boolean;
  grabbedBy: number;  // index of the grabber, -1 = free
  holding: boolean;   // currently carrying the other pirate
  mash: number;       // escape presses accumulated while grabbed
  scrubT: number;     // current scrub progress in seconds
  carry: number;      // crate index being carried, -1 = none
}

/* --- net protocol --- */
export interface CharSnap {
  x: number; z: number; y: number; f: number; m: CharMode; kn: number; st: Station;
  gb: number; hm: boolean; sc: number; ht: string;
}
export interface MopSnap { x: number; z: number; h: number; held: number; thrown: boolean; on: boolean; }
/* crate states: 0 ground(world) · 1 deck(boat-local) · 2 carried · 3 water · 4 gone · 5 barge slot (x = slot) */
export interface CrateSnap { s: number; x: number; z: number; h: number; cr: number; l: boolean; }
export interface Snapshot {
  k: 's';
  b: { x: number; z: number; yaw: number; vx: number; vz: number; av: number;
       rud: number; boom: number; heel: number; sf: number; luff: boolean; anc: boolean };
  w: { a: number; s: number; wid: number; wl: number; bw: number };
  t: number; d: boolean;
  c: CharSnap[];
  m: MopSnap[];   // the mops (boat-local)
  cg: CrateSnap[];
  g: { gold: number; del: number; lost: number };
  rt: number;     // active route index
  up: { bd: boolean; ch: boolean; sk: boolean; gl: boolean; hs: boolean; hf: boolean; ca: boolean; bg: boolean;
        mq: boolean; ml: boolean; mg: boolean };
  cn: { y: number; p: number; r: number };                                       // cannon aim + reload
  br: { a: boolean; x: number; z: number; yw: number; rl: number; cap: number }; // the barge
}
export type NetMsg =
  | Snapshot
  | { k: 'start'; boat: string }
  | { k: 'i'; a: Axes; f: number; d?: { x: number; y: number } }
  | { k: 'g' }
  | { k: 'toast'; x: string; col?: string }
  | { k: 'fx'; fx: 'poop'; id: number; x: number; z: number }
  | { k: 'fx'; fx: 'unsplat'; id: number }
  | { k: 'f' }                                  // matey pressed the hands key (edge)
  | { k: 'm0' }                                 // matey tapped LMB (whack attempt)
  | { k: 'buy'; id: string }                    // matey asks the host to buy/equip
  | { k: 'hat'; id: string }                    // matey picked a hat for themselves
  | { k: 'boat'; id: string }                   // host switched the hull
  | { k: 'route'; i: number }                   // matey picked a job at the board
  | { k: 'boom'; x: number; y: number; z: number; vx: number; vy: number; vz: number } // cannon fired
  | { k: 'reset' }
  | { k: 'restart?' };

export interface BoatPreset {
  id: string;
  name: string;
  desc: string;
  scale: number;
  crates: number;   // base shipment size — cargo capacity IS the boat's identity
  tune: Partial<{
    sailPower: number; rudderAuthority: number; turnDrag: number;
    maxHeel: number; heelSlide: number; fwdDragQuad: number; yawDamp: number;
  }>;
}
