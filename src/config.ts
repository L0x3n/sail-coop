import { v2 } from './mathUtil';

/* ===================================================================
   CONFIG — all key tuning constants. Hot-tweak here.
   Units: world units (boat is ~8.5 long), seconds, radians unless noted.
   =================================================================== */
export const CONFIG = {
  // --- wind ---
  windStrength: 14,        // base wind strength ("knots", arbitrary units)
  windWander: 3.0,         // max wind direction drift, degrees per second
  windStrengthWobble: 0.18,// +- fraction of strength slow oscillation

  // --- sail ---
  sailPower: 0.23,         // forward accel per unit windStrength at perfect trim
  noGoHalfAngle: 40,       // degrees from dead-upwind where sail produces nothing
  boomMax: 80,             // degrees, boom clamp from centerline
  boomRate: 55,            // degrees/sec boom rotation while manned
  windageDrift: 0.010,     // passive downwind push on hull (always on, makes drift)

  // --- hull ---
  fwdDragQuad: 0.040,      // quadratic forward water drag (caps top speed)
  fwdDragLin: 0.06,        // small linear forward drag (so it eventually stops)
  latResist: 2.6,          // strong lateral (keel) damping, /sec
  leeway: 0.05,            // crosswind sideways push factor (slight drift)
  rudderMax: 40,           // degrees rudder deflection
  rudderRate: 80,          // degrees/sec rudder turn while manned
  rudderAuthority: 0.15,   // yaw accel per rad rudder per unit fwd speed
  yawDamp: 1.25,           // angular damping, /sec
  turnDrag: 0.45,          // speed scrub while turning (|w|*|v|*this)

  // --- heel & cosmetic motion ---
  maxHeel: 0.24,           // radians of roll at full crosswind power
  heelLerp: 1.6,           // how fast heel approaches target, /sec
  turnHeel: 0.55,          // extra outward roll from turning (w*v*this)
  bobAmp: 0.14,            // wave heave amplitude (cosmetic)
  bobPitch: 0.022,         // wave pitch/roll amplitude (cosmetic)

  // --- deck characters ---
  walkAccel: 30,           // walking acceleration on deck
  walkDamp: 8.5,           // ground friction /sec (max walk speed ~ accel/damp)
  slideDampDown: 1.6,      // friction while knocked down -> they slide far
  inertiaScale: 1.5,       // how strongly boat accel/turn throws characters
  heelSlide: 26,           // slide accel per sin(heel) — the big "lean" force
  stumbleThresh: 7.0,      // pseudo-force accel that knocks a standing char down
  knockTime: 0.9,          // seconds down after a stumble
  swimSpeed: 2.0,          // swim speed (climb back only when swimming INTO the hull)
  wobbleSlide: 0.28,       // tiny always-on wave wobble force on deck

  // --- jumping ---
  jumpVel: 5.2,            // takeoff speed (clears the 0.62-high rail)
  gravity: 14,             // pulls jumpers back down to the deck
  airControl: 0.45,        // walk authority while airborne
  jumpBoost: 1.5,          // horizontal hop impulse at takeoff (vault the rail from standstill)

  // --- swimming leash ---
  swimLeash: 50,           // meters from the boat before the sea washes you back aboard

  // --- seagull poop & mopping ---
  poopInterval: 21,        // average seconds between bombing runs
  poopIntervalVar: 8,      // +- randomness on that interval
  splatsPerPassMax: 3,     // each pass drops 1..this many splats on the deck
  poopSlip: 3.0,           // deck slide forces are multiplied by this on a splat
  poopTraction: 0.35,      // walking accel multiplier on a splat (mushy input)
  poopDampLoss: 0.3,       // ground friction multiplier on a splat (can't stop)
  splatRadius: 0.5,        // how close counts as "standing on it"
  scrubTime: 1.5,          // seconds of scrubbing to clear one splat
  scrubRange: 0.95,        // the mop reaches splats within this range
  mopCarrySlow: 0.82,      // walk accel multiplier while carrying the mop
  mopPickupR: 1.25,        // press E this close to pick the mop up
  mopThrowForce: 8.5,      // horizontal mop launch speed
  mopThrowArc: 3.2,        // upward mop launch speed
  whackRange: 1.7,         // mop melee reach (LMB tap)
  whackKnock: 0.9,         // seconds floored by a bonk
  whackKick: 4.2,          // shove from a bonk
  whackCooldown: 0.6,      // seconds between swings

  // --- grabbing & throwing (Gang Beasts rule) ---
  grabRange: 1.6,          // how close you must be to grab the other pirate
  grabCarrySlow: 0.55,     // grabber walk accel multiplier while carrying
  victimInput: 0.5,        // grabbed pirate's struggle drags the pair at this fraction
  escapeMash: 4,           // hands-key presses needed to wriggle free
  throwForce: 7.5,         // horizontal launch speed (clears the railing)
  throwArc: 3.6,           // upward launch speed

  // --- collisions ---
  bounceRestitution: 0.55, // velocity reflect on rock/island hit
  bounceKick: 5.5,         // impulse thrown into characters on a hard hit
  hardHitSpeed: 2.2,       // closing speed that counts as a "crash"

  // --- docking ---
  dockSpeed: 1.2,          // must be slower than this...
  dockHold: 1.0,           // ...for this many seconds, alongside the pier

  // --- first-person camera ---
  fov: 75,                 // field of view
  eyeHeight: 1.32,         // eye height above the deck
  mouseSens: 0.0024,       // mouse-look radians per pixel
  headBob: 0.06,           // walking head-bob amplitude

  // --- world ---
  islandDist: 260,         // spawn -> island distance (island is upwind)
  islandRadius: 38,
};

/* --- ship layout (shared by sim + meshes) --- */
export const HULL_L = 8.6, HULL_W = 3.2, DECK_Y = 1.0;
export const DECK_X = 1.3, DECK_Z = 3.35;             // walkable half-extents
export const RAIL_H = 0.62;                            // jump higher than this to clear the rail
export const GAPS = [{ z0: -0.6, z1: 1.4 }];           // gangway gaps (both sides, boat-local z)
export const HELM_POS = v2(0, -2.65);
export const MAST_POS = v2(0, 0.6);
export const SAIL_STA = v2(0, 1.45);                   // sail-trim spot, ahead of the mast
export const STATION_R = 1.15;

/* --- pickable boats: same sim, different size & manners --- */
import type { BoatPreset } from './types';
export const BOATS: BoatPreset[] = [
  {
    id: 'skiff', name: 'Skiff', scale: 1.44,
    desc: 'Small & nimble — turns on a coin, tips like one too',
    tune: { sailPower: 0.215, rudderAuthority: 0.24, turnDrag: 0.34, maxHeel: 0.31, heelSlide: 30, fwdDragQuad: 0.036, yawDamp: 1.1 },
  },
  {
    id: 'sloop', name: 'Sloop', scale: 2.0,
    desc: 'The trusty all-rounder',
    tune: {},
  },
  {
    id: 'galleon', name: 'Galleon', scale: 2.84,
    desc: 'Huge & stately — plan your turns a week ahead',
    tune: { sailPower: 0.27, rudderAuthority: 0.085, turnDrag: 0.52, maxHeel: 0.17, heelSlide: 20, fwdDragQuad: 0.047, yawDamp: 1.45 },
  },
];
