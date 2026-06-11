import { CONFIG, DECK_Y, RAIL_H, STATION_R } from './config';
import { D2R, clamp, headVec, lerp, rightVec, v2, wrapPi } from './mathUtil';
import { boat, chars, env, layout, myChar, netRole, p2, session, tuning } from './state';
import { inputAxes, ZERO_AXES } from './input';
import { spawnDroplets, spawnSplash, spawnWake } from './effects';
import { heelGroup } from './shipMesh';
import { scene } from './scene';
import { obstacles } from './world';
import { toast } from './hud';
import type { Axes, Char } from './types';

/* ============ boat-local <-> world transforms ============ */
export function localToWorld2(p: { x: number; z: number }) {
  const f = headVec(boat.yaw), r = rightVec(boat.yaw);
  return v2(boat.pos.x + r.x * p.x + f.x * p.z, boat.pos.z + r.z * p.x + f.z * p.z);
}
export function worldToLocal2(w: { x: number; z: number }) {
  const f = headVec(boat.yaw), r = rightVec(boat.yaw);
  const dx = w.x - boat.pos.x, dz = w.z - boat.pos.z;
  return v2(dx * r.x + dz * r.z, dx * f.x + dz * f.z);
}

export function charAxes(c: Char): Axes {
  if (c === myChar()) return inputAxes();
  if (netRole === 'host' && c === p2) return c.netAxes;
  return ZERO_AXES;
}

/* =========================== stations =========================== */
export function nearestStation(c: Char): 'helm' | 'sail' | null {
  if (c.mode !== 'deck') return null;
  const dh = Math.hypot(c.pos.x - layout.helm.x, c.pos.z - layout.helm.z);
  const dm = Math.hypot(c.pos.x - layout.sailSta.x, c.pos.z - layout.sailSta.z);
  if (dh < STATION_R && dh <= dm) return 'helm';
  if (dm < STATION_R) return 'sail';
  return null;
}
export function stationTakenBy(st: 'helm' | 'sail'): Char | null {
  return chars.find(c => c.station === st) || null;
}
export function releaseStation(c: Char) { c.station = null; }
export function tryToggleStation(c: Char) {
  if (c.station) { releaseStation(c); return; }
  const st = nearestStation(c);
  if (st && !stationTakenBy(st)) {
    c.station = st;
    const sp = st === 'helm' ? layout.helm : layout.sailSta;
    c.pos.x = sp.x; c.pos.z = sp.z; c.vel.x = 0; c.vel.z = 0;
  }
}

/* =========================== overboard / climb =========================== */
export function goOverboard(c: Char) {
  const w = localToWorld2(c.pos);
  releaseStation(c);
  c.mode = 'water';
  heelGroup.remove(c.mesh);
  scene.add(c.mesh);
  // carry some of the boat's momentum into the drink
  c.vel = v2(boat.vel.x * 0.4, boat.vel.z * 0.4);
  c.pos = v2(w.x, w.z);
  c.facing = wrapPi(boat.yaw + c.facing);   // boat-local facing -> world facing
  c.jumpY = 0; c.vy = 0;
  c.knock = 1.0; c.overboardCount++;        // dazed long enough that a fast hull slips away
  spawnSplash(w.x, w.z, true);
  toast(c.name + ' OVERBOARD!', c.name === 'P1' ? '#ff8a7a' : '#ffd95e');
}
export function climbAboard(c: Char) {
  const lp = worldToLocal2(c.pos);
  c.mode = 'deck';
  scene.remove(c.mesh);
  heelGroup.add(c.mesh);
  c.pos = v2(clamp(lp.x, -layout.deckX + 0.2, layout.deckX - 0.2), clamp(lp.z, -layout.deckZ + 0.2, layout.deckZ - 0.2));
  c.facing = wrapPi(c.facing - boat.yaw);   // world facing -> boat-local facing
  c.vel = v2(); c.knock = 0.5; c.jumpY = 0; c.vy = 0;
  const w = localToWorld2(c.pos);
  spawnSplash(w.x, w.z, false);
  toast(c.name + ' back aboard!', '#aef7a2');
}
const inGap = (z: number) => layout.gaps.some(g => z > g.z0 && z < g.z1);

/* drifted past the leash: the sea spits you back on deck */
export function washAboard(c: Char) {
  c.mode = 'deck';
  scene.remove(c.mesh);
  heelGroup.add(c.mesh);
  c.pos = v2(c.name === 'P1' ? -0.5 : 0.5, -1.0);
  c.facing = 0; c.vel = v2();
  c.knock = 0.8; c.jumpY = 0; c.vy = 0;
  const w = localToWorld2(c.pos);
  spawnSplash(w.x, w.z, true);
  toast(c.name + ' washed back aboard!', '#74c0fc');
}

/* =========================== character update =========================== */
export function updateChar(c: Char, ci: number, dt: number, t: number) {
  if (c.knock > 0) c.knock -= dt;

  if (c.mode === 'deck') {
    // ---- station control: A/D work the station; the mouse looks freely ----
    if (c.station) {
      const strafe = charAxes(c).strafe;
      if (c.station === 'helm') {
        // helmsman faces the bow: D = steer right (rudder is sign-flipped internally)
        boat.rudder = clamp(boat.rudder - strafe * CONFIG.rudderRate * D2R * dt,
          -CONFIG.rudderMax * D2R, CONFIG.rudderMax * D2R);
      } else {
        // trimmer faces aft at the sail: D = boom swings to THEIR right
        boat.boomAngle = clamp(boat.boomAngle + strafe * CONFIG.boomRate * D2R * dt,
          -CONFIG.boomMax * D2R, CONFIG.boomMax * D2R);
      }
      const sp = c.station === 'helm' ? layout.helm : layout.sailSta;
      c.pos.x = sp.x; c.pos.z = sp.z; c.vel.x = 0; c.vel.z = 0;
      c.animMoving = false;
      c.mesh.position.set(c.pos.x, DECK_Y, c.pos.z);
      c.mesh.rotation.set(0, c.facing, 0);
      return;
    }

    // ---- vertical: Space jumps (hold to bunny-hop) ----
    const grounded = c.jumpY <= 0.0001;
    if (charAxes(c).j && grounded && c.knock <= 0) {
      c.vy = CONFIG.jumpVel;
      // hop toward where you're steering — lets you vault the rail from a standstill
      const jx = charAxes(c);
      if (jx.fwd || jx.strafe) {
        const n = Math.hypot(jx.fwd, jx.strafe);
        c.vel.x += (Math.sin(c.facing) * jx.fwd - Math.cos(c.facing) * jx.strafe) / n * CONFIG.jumpBoost;
        c.vel.z += (Math.cos(c.facing) * jx.fwd + Math.sin(c.facing) * jx.strafe) / n * CONFIG.jumpBoost;
      }
    }
    if (!grounded || c.vy > 0) {
      c.vy -= CONFIG.gravity * dt;
      c.jumpY = Math.max(0, c.jumpY + c.vy * dt);
      if (c.jumpY === 0 && c.vy < 0) c.vy = 0;
    }

    // ---- walking: WASD relative to look direction (boat-local) ----
    if (c.knock <= 0) {
      const ax = charAxes(c);
      if (ax.fwd || ax.strafe) {
        const n = Math.hypot(ax.fwd, ax.strafe);
        const acc = CONFIG.walkAccel * (grounded ? 1 : CONFIG.airControl);
        // screen-right of heading f is (-cos f, sin f)
        c.vel.x += (Math.sin(c.facing) * ax.fwd - Math.cos(c.facing) * ax.strafe) / n * acc * dt;
        c.vel.z += (Math.cos(c.facing) * ax.fwd + Math.sin(c.facing) * ax.strafe) / n * acc * dt;
        if (grounded) c.walkPhase += dt * 11;
      }
    }
    const damp = !grounded ? 0.25 : (c.knock > 0 ? CONFIG.slideDampDown : CONFIG.walkDamp);
    c.vel.x -= c.vel.x * Math.min(1, damp * dt);
    c.vel.z -= c.vel.z * Math.min(1, damp * dt);

    // ---- pseudo-inertia: the boat moves under your feet ----
    const f = headVec(boat.yaw), r = rightVec(boat.yaw);
    let sx = 0, sz = 0;
    // linear boat accel (includes centripetal while turning) thrown back at the char
    sx += -(boat.lastAccel.x * r.x + boat.lastAccel.z * r.z) * CONFIG.inertiaScale;
    sz += -(boat.lastAccel.x * f.x + boat.lastAccel.z * f.z) * CONFIG.inertiaScale;
    // centrifugal + Euler from spin
    const w = boat.angVel, wd = boat.lastAngAccel;
    sx += (w * w * c.pos.x - wd * c.pos.z) * CONFIG.inertiaScale;
    sz += (w * w * c.pos.z + wd * c.pos.x) * CONFIG.inertiaScale;
    // heel: downhill is +x when (internal) starboard dips
    sx += Math.sin(boat.heel) * tuning.heelSlide;
    // wave wobble scales with the sea state — a heavy swell makes footing genuinely bad
    const wob = CONFIG.wobbleSlide * env.swell;
    sx += Math.sin(t * 0.9 + ci * 2.1) * wob;
    sz += Math.sin(t * 0.73 + 1.7 + ci) * wob;

    const slideMag = Math.hypot(sx, sz);
    if (slideMag > CONFIG.stumbleThresh && c.knock <= 0 && grounded) c.knock = CONFIG.knockTime;
    c.vel.x += sx * dt; c.vel.z += sz * dt;

    c.pos.x += c.vel.x * dt;
    c.pos.z += c.vel.z * dt;

    // ---- rails & gangway gaps (a good jump clears the rail anywhere) ----
    const overRail = c.jumpY > RAIL_H;
    if (Math.abs(c.pos.x) > layout.deckX) {
      if (inGap(c.pos.z) || overRail) {
        if (Math.abs(c.pos.x) > layout.deckX + 0.55) { goOverboard(c); return; }
      } else {
        c.pos.x = Math.sign(c.pos.x) * layout.deckX;
        c.vel.x *= -0.2;
      }
    }
    if (Math.abs(c.pos.z) > layout.deckZ) {
      if (overRail) {
        if (Math.abs(c.pos.z) > layout.deckZ + 0.55) { goOverboard(c); return; }
      } else {
        c.pos.z = Math.sign(c.pos.z) * layout.deckZ;
        c.vel.z *= -0.2;
      }
    }

    // ---- visuals ----
    const moving = Math.hypot(c.vel.x, c.vel.z) > 0.4;
    c.animMoving = moving && c.knock <= 0;
    let y = DECK_Y + c.jumpY;
    if (moving && grounded && c.knock <= 0) y += Math.abs(Math.sin(c.walkPhase)) * 0.09;
    c.mesh.position.set(c.pos.x, y, c.pos.z);
    if (c.knock > 0) {
      c.mesh.rotation.x = lerp(c.mesh.rotation.x, 1.35, Math.min(1, 10 * dt));
      c.mesh.position.y = DECK_Y - 0.25;
    } else {
      c.mesh.rotation.x = lerp(c.mesh.rotation.x, 0, Math.min(1, 10 * dt));
      c.mesh.rotation.y = c.facing;
    }

  } else {
    // ---- in the water: free swimming (world space) ----
    let swimming = false, mx = 0, mz = 0;
    if (c.knock <= 0) {
      const ax = charAxes(c);
      if (ax.fwd || ax.strafe) {
        const n = Math.hypot(ax.fwd, ax.strafe);
        mx = (Math.sin(c.facing) * ax.fwd - Math.cos(c.facing) * ax.strafe) / n;
        mz = (Math.cos(c.facing) * ax.fwd + Math.sin(c.facing) * ax.strafe) / n;
        // stroke rhythm: power pulses with the arm strokes
        const stroke = 0.75 + 0.45 * Math.max(0, Math.sin(c.walkPhase * 1.7));
        c.vel.x += mx * CONFIG.swimSpeed * 4 * stroke * dt;
        c.vel.z += mz * CONFIG.swimSpeed * 4 * stroke * dt;
        c.walkPhase += dt * 7;
        swimming = true;
      }
    }
    c.animMoving = swimming;
    c.vel.x -= c.vel.x * Math.min(1, 3.0 * dt);
    c.vel.z -= c.vel.z * Math.min(1, 3.0 * dt);
    c.pos.x += c.vel.x * dt;
    c.pos.z += c.vel.z * dt;
    // can't swim through rocks or the island
    for (const o of obstacles) {
      const dx = c.pos.x - o.x, dz = c.pos.z - o.z, dd = Math.hypot(dx, dz);
      const rr = o.r - 1.2;
      if (dd < rr && dd > 0) { c.pos.x = o.x + dx / dd * rr; c.pos.z = o.z + dz / dd * rr; }
    }
    // swim leash: too far from the boat and the sea washes you back aboard
    if (Math.hypot(c.pos.x - boat.pos.x, c.pos.z - boat.pos.z) > CONFIG.swimLeash) {
      washAboard(c);
      return;
    }
    // ripple + kick splash trail while swimming
    c.rippleT -= dt;
    if (Math.hypot(c.vel.x, c.vel.z) > 0.6 && c.rippleT <= 0) {
      c.rippleT = 0.22;
      spawnWake(c.pos.x, c.pos.z, c.facing, 0.5);
      if (Math.random() < 0.5) spawnDroplets(c.pos.x, c.pos.z, 1, 1.3, 1.5);
    }
    // paddling pose
    c.mesh.position.set(c.pos.x, 0.05 + Math.sin(t * 3 + ci) * 0.08, c.pos.z);
    c.mesh.rotation.x = 1.25;
    c.mesh.rotation.y = c.facing;
    c.mesh.rotation.z = Math.sin(t * 9 + ci * 3) * (swimming ? 0.25 : 0.45);
    // climb back up ONLY when deliberately swimming INTO the hull
    const lp = worldToLocal2(c.pos);
    if (c.knock <= 0 && swimming &&
        Math.abs(lp.x) < layout.hullW / 2 + 0.8 && Math.abs(lp.z) < layout.hullL / 2 + 0.8) {
      const tbx = boat.pos.x - c.pos.x, tbz = boat.pos.z - c.pos.z;
      const tbl = Math.hypot(tbx, tbz) || 1;
      if ((mx * tbx + mz * tbz) / tbl > 0.25) climbAboard(c);
    }
  }
}

/* =========================== full state reset =========================== */
export function resetState() {
  boat.pos.x = 0; boat.pos.z = 0; boat.yaw = Math.PI / 2;
  boat.vel.x = 0; boat.vel.z = 0; boat.angVel = 0;
  boat.rudder = 0; boat.boomAngle = 20 * D2R; boat.heel = 0;
  session.runTime = 0; session.started = false; session.docked = false;
  session.dockTimer = 0; session.shake = 0;
  document.getElementById('msg')!.style.display = 'none';
  chars.forEach((c, i) => {
    releaseStation(c);
    if (c.mesh.parent !== heelGroup) { scene.remove(c.mesh); heelGroup.add(c.mesh); }
    c.mode = 'deck'; c.knock = 0; c.vel.x = 0; c.vel.z = 0;
    c.pos.x = i === 0 ? -0.7 : 0.9; c.pos.z = -1.5;
    c.facing = 0; c.pitch = 0; c.jumpY = 0; c.vy = 0;
  });
}
