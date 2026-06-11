import { CONFIG } from './config';
import { D2R, R2D, clamp, dot2, headVec, lerp, len2, rightVec, smoothstep, wrapPi, fmtTime } from './mathUtil';
import { boat, charActive, chars, env, layout, session, tuning, wind } from './state';
import { obstacles, pierA, pierB, dockMidZ, dockHalfLen } from './world';
import { releaseStation } from './simChars';
import { showDocked, toast } from './hud';

/* =========================== wind =========================== */
export function updateWind(dt: number, t: number) {
  // smooth deterministic wander, a few degrees per second
  const drift = Math.sin(t * 0.10) * 0.6 + Math.sin(t * 0.037 + 2.1) * 0.4;
  const wanderMul = env.weatherId === 2 ? 2.2 : 1;     // squalls swing the wind around
  wind.angle = wrapPi(wind.angle + drift * CONFIG.windWander * wanderMul * D2R * dt);
  wind.strength = CONFIG.windStrength * env.windMul * (1 + CONFIG.windStrengthWobble * Math.sin(t * 0.13 + 1));
}

/* =========================== sailing physics (2D horizontal plane) =========================== */
export function updateBoat(dt: number) {
  const fwd = headVec(boat.yaw), rgt = rightVec(boat.yaw);
  const windV = headVec(wind.angle);

  // angle from boat heading to wind-travel direction: |d|=180 -> head to wind
  const d = wrapPi(wind.angle - boat.yaw);
  const offWind = 180 - Math.abs(d) * R2D;            // degrees off dead-upwind
  boat.noGo = offWind < CONFIG.noGoHalfAngle;
  const noGoF = smoothstep(CONFIG.noGoHalfAngle - 6, CONFIG.noGoHalfAngle + 9, offWind);

  // ideal boom bisects wind/heading; sail falls to leeward = sign(d)
  const idealBoom = Math.sign(d || 1) * (Math.PI - Math.abs(d)) / 2;
  const boomErr = Math.abs(wrapPi(boat.boomAngle - idealBoom));
  // cos falloff hitting zero at 60 degrees of trim error
  const trim = Math.max(0, Math.cos(boomErr * 1.5));
  boat.sailForce = tuning.sailPower * wind.strength * trim * noGoF;
  // nobody aboard? the sheet slips loose and the sail luffs — the boat
  // coasts to a stop instead of sailing away from swimming players forever
  const crewAboard = chars.some(c => charActive(c) && c.mode === 'deck');
  if (!crewAboard) boat.sailForce = 0;
  boat.luffing = boat.sailForce < 0.35;

  // decompose velocity
  const vf = dot2(boat.vel, fwd), vl = dot2(boat.vel, rgt);

  // forward: sail thrust vs quadratic+linear drag + turning scrub
  const af = boat.sailForce
    - tuning.fwdDragQuad * vf * Math.abs(vf)
    - CONFIG.fwdDragLin * vf
    - tuning.turnDrag * Math.abs(boat.angVel) * vf;
  // lateral: strong keel damping + slight leeway from crosswind
  const windLat = dot2(windV, rgt);
  const al = -CONFIG.latResist * vl + CONFIG.leeway * wind.strength * windLat * 0.1;

  // passive windage: hull always drifts a little downwind (even sail-less)
  const windageA = CONFIG.windageDrift * wind.strength;

  const ax = fwd.x * af + rgt.x * al + windV.x * windageA;
  const az = fwd.z * af + rgt.z * al + windV.z * windageA;
  boat.lastAccel.x = ax; boat.lastAccel.z = az;
  boat.vel.x += ax * dt; boat.vel.z += az * dt;

  // yaw: rudder authority scales with speed through water (useless at rest)
  const angAcc = boat.rudder * tuning.rudderAuthority * vf
    - tuning.yawDamp * boat.angVel;
  boat.lastAngAccel = angAcc;
  boat.angVel += angAcc * dt;
  boat.yaw = wrapPi(boat.yaw + boat.angVel * dt);

  boat.pos.x += boat.vel.x * dt;
  boat.pos.z += boat.vel.z * dt;

  // heel: crosswind power + turning lean, eased toward target
  const speed = len2(boat.vel);
  const heelTarget = clamp(
    Math.sign(d || 1) * tuning.maxHeel * (wind.strength / CONFIG.windStrength) * trim * noGoF * Math.abs(Math.sin(d))
    + boat.angVel * vf * CONFIG.turnHeel * 0.1, -0.4, 0.4);
  boat.heel = lerp(boat.heel, heelTarget, clamp(CONFIG.heelLerp * dt, 0, 1));

  collideBoat();
  updateDocking(dt, speed);
}

/* ============== obstacle collisions: bounce, shake, knockdown ============== */
function collideBoat() {
  const all = obstacles.slice();
  // pier as a line of circles
  for (let z = pierA.z; z <= pierB.z; z += 3) all.push({ x: pierA.x, z, r: 4.0 });
  const hullPad = (layout.scale - 1) * 1.6;            // bigger boats touch sooner
  for (const o of all) {
    const dx = boat.pos.x - o.x, dz = boat.pos.z - o.z;
    const dist = Math.hypot(dx, dz), minD = o.r + hullPad;
    if (dist >= minD || dist === 0) continue;
    const nx = dx / dist, nz = dz / dist;
    const vn = boat.vel.x * nx + boat.vel.z * nz;     // closing if negative
    // push out
    boat.pos.x = o.x + nx * minD; boat.pos.z = o.z + nz * minD;
    if (vn < 0) {
      const impact = -vn;
      boat.vel.x -= (1 + CONFIG.bounceRestitution) * vn * nx;
      boat.vel.z -= (1 + CONFIG.bounceRestitution) * vn * nz;
      boat.angVel += (Math.random() - 0.5) * impact * 0.3;
      if (impact > CONFIG.hardHitSpeed) {
        session.shake = Math.min(1.2, impact * 0.16);
        toast('CRASH!', '#ff8787');
        // knock everyone down + hurl them (in boat-local space, away from impact)
        const rgt = rightVec(boat.yaw), fwdv = headVec(boat.yaw);
        const lx = nx * rgt.x + nz * rgt.z, lz = nx * fwdv.x + nz * fwdv.z;
        for (const c of chars) {
          if (c.mode !== 'deck' || !charActive(c)) continue;
          releaseStation(c);
          c.knock = Math.max(c.knock, 1.2);
          c.vel.x += lx * CONFIG.bounceKick * (0.7 + Math.random() * 0.6);
          c.vel.z += lz * CONFIG.bounceKick * (0.7 + Math.random() * 0.6);
        }
      }
    }
  }
}

/* =========================== docking =========================== */
function updateDocking(dt: number, speed: number) {
  if (session.docked) return;
  const inZone = Math.abs(boat.pos.z - dockMidZ) < dockHalfLen
    && Math.abs(boat.pos.x - pierA.x) > 3.4 && Math.abs(boat.pos.x - pierA.x) < 9.5;
  if (inZone && speed < CONFIG.dockSpeed) {
    session.dockTimer += dt;
    if (session.dockTimer >= CONFIG.dockHold) {
      session.docked = true;
      showDocked(fmtTime(session.runTime));
    }
  } else session.dockTimer = 0;
}
