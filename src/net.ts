import Peer, { DataConnection } from 'peerjs';
import { BOATS, CONFIG, DECK_Y } from './config';
import { SHORE_Y, routeIdx, setRoute } from './world';
import { clamp, fmtTime, lerp, wrapPi } from './mathUtil';
import { accepted, boat, chars, env, game, layout, myChar, netDrag, owned, p1, p2, prefs, session, setGuestHere, setNetRole, netRole, guestHere, wind } from './state';
import { applyCargoSnap, cargoSnap, resetCargo } from './cargo';
import { equipHat, setShipRelay, tryBuy } from './shop';
import { acceptQuest, abandonQuest } from './quest';
import { setHat } from './pirates';
import { buildShip, setBoatPreset } from './shipMesh';
import { applyBoom, cannon, fireCannon, resetCannon, setBoomRelay } from './cannon';
import { barge, resetBarge } from './barge';
import { clearSplats, placeSplat, removeSplat, setFxRelay } from './critters';
import { clearHolds, gildMops, handsEdge, mopTap, mops, pressE, resetHands } from './hands';
import type { BoatPreset } from './types';
import { inputAxes, localDrag } from './input';
import { applyAspect, scene } from './scene';
import { heelGroup } from './shipMesh';
import { animateChar } from './pirates';
import { spawnSplash, spawnWake } from './effects';
import { WATER_EYE, groundAt, releaseStation, resetState, localToWorld2 } from './simChars';
import { v2 } from './mathUtil';
import { modeSelEl, netChipEl, netStatusEl, setToastRelay, showDocked, toast } from './hud';
import type { CharSnap, NetMsg, Snapshot } from './types';

/* ===========================================================================
   Sea-of-Thieves-style drop-in co-op over WebRTC (PeerJS public broker):
   the HOST runs the simulation and starts sailing immediately; the matey
   types the 4-letter code and spawns aboard as the gold pirate.
   Host -> guest: 20 Hz state snapshots.  Guest -> host: 15 Hz input.
   =========================================================================== */
let peer: Peer | null = null;
let conn: DataConnection | null = null;
export let netCode = '';

const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const peerId = (code: string) => 'sailcoop-v1-' + code;
function netSend(m: NetMsg) { if (conn && conn.open) { try { conn.send(m); } catch { /* gone */ } } }

// host toasts + splat add/remove get relayed to the matey
setToastRelay((text, col) => { if (netRole === 'host') netSend({ k: 'toast', x: text, col }); });
setFxRelay(
  (id, x, z) => { if (netRole === 'host') netSend({ k: 'fx', fx: 'poop', id, x, z }); },
  id => { if (netRole === 'host') netSend({ k: 'fx', fx: 'unsplat', id }); },
);
setShipRelay(id => { if (netRole === 'host') netSend({ k: 'boat', id }); });
setBoomRelay((x, y, z, vx, vy, vz) => { if (netRole === 'host') netSend({ k: 'boom', x, y, z, vx, vy, vz }); });

let chosenBoat: BoatPreset = BOATS[1];

export function beginPlay() {
  session.inMenu = false;
  modeSelEl.style.display = 'none';
  session.runTime = 0;
  session.started = false;
  resetState();
  resetHands(netRole === 'guest' || guestHere);
  clearSplats();
  accepted.length = 0;       // a fresh game starts with an empty job log
  resetCargo();
  resetCannon();
  resetBarge();
  applyAspect();
}
export function startSolo(p?: BoatPreset) {
  if (p) chosenBoat = p;
  setBoatPreset(chosenBoat);
  setNetRole(null); setGuestHere(false);
  p2.mesh.visible = false;
  resetHands(false);                 // one pirate, one mop
  beginPlay();
}

export function startHost(p?: BoatPreset) {
  if (p) chosenBoat = p;
  let code = '';
  for (let i = 0; i < 6; i++) code += CODE_CHARS[(Math.random() * CODE_CHARS.length) | 0];  // 31^6 ≈ 887M — not scannable
  netStatusEl.textContent = 'Raising the flag…';
  peer = new Peer(peerId(code));
  peer.on('open', () => {
    netCode = code;
    setBoatPreset(chosenBoat);
    setNetRole('host'); setGuestHere(false);
    p2.mesh.visible = false;
    resetHands(false);
    beginPlay();
    netChipEl.style.display = 'block';
    netChipEl.textContent = 'Code: ' + code + ' — waiting for your matey…';
  });
  peer.on('connection', c => {
    if (conn && conn.open) { c.close(); return; }       // one matey only
    conn = c;
    conn.on('open', () => {
      setGuestHere(true);
      releaseStation(p2);
      if (p2.mesh.parent !== heelGroup) { scene.remove(p2.mesh); heelGroup.add(p2.mesh); }
      p2.mode = 'deck'; p2.pos.x = 0.9; p2.pos.z = -1.0;
      p2.vel.x = 0; p2.vel.z = 0; p2.knock = 0; p2.facing = 0;
      p2.mesh.visible = true;
      mops[1].on = true;                       // second pirate, second mop
      mops[1].held = -1;
      mops[1].x = mops[1].bucket.position.x;
      mops[1].z = mops[1].bucket.position.z;
      netChipEl.textContent = 'Code: ' + code + ' — matey aboard!';
      toast('A matey climbed aboard!', '#aef7a2');
      netSend({ k: 'start', boat: chosenBoat.id });
    });
    conn.on('data', d => hostOnData(d as NetMsg));
    conn.on('close', () => {
      conn = null;
      setGuestHere(false);
      releaseStation(p2);
      p2.mesh.visible = false;
      // drop any grab in BOTH directions (esp. guest-grabbing-host, which would
      // otherwise leave p1.grabbedBy set forever → host frozen) + clear hold state
      p1.grabbedBy = -1; p2.grabbedBy = -1; p1.holding = false; p2.holding = false;
      clearHolds();
      if (mops[1].held >= 0) chars[mops[1].held].hasMop = false;
      mops[1].on = false;                      // their mop leaves with them
      netChipEl.textContent = 'Code: ' + code + ' — matey left, waiting…';
      toast('Matey disconnected', '#ff8787');
    });
  });
  peer.on('error', e => {
    netStatusEl.textContent = 'Network trouble (' + e.type + ') — try Host again.';
    netChipEl.textContent = 'Net error: ' + e.type;
  });
}
/* a malicious guest can flood any action; cap each kind so it can't DoS/grief
   the host (force-reset spam, grab-lock, buy-spam saveProgress, panel thrash) */
const MSG_MIN_MS: Record<string, number> = { i: 18, g: 80, f: 80, m0: 80, buy: 250, route: 250, hat: 250, 'restart?': 3000 };
const lastMsgT: Record<string, number> = Object.create(null);
export function hostOnData(m: NetMsg) {
  if (!m || typeof m !== 'object') return;
  const minMs = MSG_MIN_MS[m.k];
  if (minMs !== undefined) {
    const now = performance.now();
    if (now - (lastMsgT[m.k] ?? -1e9) < minMs) return;   // too soon — drop
    lastMsgT[m.k] = now;
  }
  if (m.k === 'i') {
    p2.netAxes.fwd = clamp(+m.a.fwd || 0, -1, 1);
    p2.netAxes.strafe = clamp(+m.a.strafe || 0, -1, 1);
    p2.netAxes.j = m.a.j ? 1 : 0;
    p2.netAxes.h = m.a.h ? 1 : 0;
    p2.netAxes.u = m.a.u ? 1 : 0;
    // sanitize: a guest can send NaN/Infinity (BinaryPack preserves them) which
    // would poison facing -> sin/cos -> NaN position across the shared sim
    if (m.d) { netDrag.x += clamp(Number.isFinite(m.d.x) ? m.d.x : 0, -4000, 4000); netDrag.y += clamp(Number.isFinite(m.d.y) ? m.d.y : 0, -4000, 4000); }
    if (Number.isFinite(m.f) && !p2.holding) p2.facing = wrapPi(m.f as number);
    session.started = true;
  } else if (m.k === 'g') {
    if (!session.docked) pressE(p2);        // works ashore too (deliver, board, shop)
  } else if (m.k === 'f') {
    handsEdge(p2);
  } else if (m.k === 'm0') {
    if (p2.station === 'cannon') fireCannon(p2);
    else mopTap(p2);
  } else if (m.k === 'buy') {
    tryBuy(m.id);
  } else if (m.k === 'hat') {
    if (['captain', 'bandana', 'straw', 'fancy'].includes(m.id)) equipHat(1, m.id);
  } else if (m.k === 'route') {
    if (m.a === 'abandon') abandonQuest(m.i); else acceptQuest(m.i);
  } else if (m.k === 'restart?') {
    resetState();
    resetHands(guestHere);
    clearSplats();
    resetCargo();
    resetCannon();
    resetBarge();
    netSend({ k: 'reset' });
  }
}

export function startJoin(codeRaw: string) {
  const code = (codeRaw || '').trim().toUpperCase();
  if (code.length !== 4) { netStatusEl.textContent = 'Type the 4-letter code first.'; return; }
  netStatusEl.textContent = 'Rowing over to ' + code + '…';
  peer = new Peer();
  peer.on('open', () => {
    conn = peer!.connect(peerId(code));
    conn.on('open', () => { netStatusEl.textContent = 'Connected — climbing aboard…'; });
    conn.on('data', d => guestOnData(d as NetMsg));
    conn.on('close', () => { netChipEl.textContent = 'Host left.'; toast('Lost the host…', '#ff8787'); });
  });
  peer.on('error', e => { netStatusEl.textContent = 'Could not reach ' + code + ' (' + e.type + ').'; });
}

const netT: { boat: Snapshot['b'] | null; c: (CharSnap | null)[]; barge: Snapshot['br'] | null } =
  { boat: null, c: [null, null], barge: null };
export function guestOnData(m: NetMsg) {
  if (!m || typeof m !== 'object') return;
  if (m.k === 'start') {
    setBoatPreset(BOATS.find(b => b.id === m.boat) ?? BOATS[1]);
    setNetRole('guest');
    p1.mesh.visible = true; p2.mesh.visible = true;
    p2.pos.x = 0.9; p2.pos.z = -1.0;
    beginPlay();
    netChipEl.style.display = 'block';
    netChipEl.textContent = 'Aboard as the GOLD pirate';
    return;
  }
  if (m.k === 'toast') { toast(m.x, m.col); return; }
  if (m.k === 'boat') {
    setBoatPreset(BOATS.find(b => b.id === m.id) ?? BOATS[1]);
    return;
  }
  if (m.k === 'fx') {
    if (m.fx === 'poop') placeSplat(m.id, m.x, m.z);
    else removeSplat(m.id);
    return;
  }
  if (m.k === 'boom') { applyBoom(m.x, m.y, m.z, m.vx, m.vy, m.vz); return; }
  if (m.k === 'reset') { resetState(); resetHands(true); clearSplats(); resetCargo(); resetCannon(); resetBarge(); netT.boat = null; netT.c = [null, null]; netT.barge = null; return; }
  if (m.k === 's') applySnapshot(m);
}
export function applySnapshot(m: Snapshot) {
  netT.boat = m.b;
  boat.vel.x = m.b.vx; boat.vel.z = m.b.vz; boat.angVel = m.b.av;
  boat.rudder = m.b.rud; boat.boomAngle = m.b.boom; boat.heel = m.b.heel;
  boat.sailForce = m.b.sf; boat.luffing = m.b.luff;
  boat.anchored = m.b.anc;
  applyCargoSnap(m.cg);
  game.gold = m.g.gold; game.delivered = m.g.del; game.lost = m.g.lost;
  wind.angle = m.w.a; wind.strength = m.w.s;
  if (m.w.wid !== env.weatherId) { env.weatherId = (m.w.wid as 0 | 1 | 2) ?? 0; env.weatherLerp = 0; }
  env.bigWave = m.w.bw ?? 0;
  if (m.aq) accepted.splice(0, accepted.length, ...m.aq);   // mirror the host's job log
  if (m.rt !== routeIdx) setRoute(m.rt);
  if (m.up) {
    owned.bigDeck = m.up.bd;
    owned.chartNorth = m.up.ch;
    owned.skiff = m.up.sk;
    owned.galleon = m.up.gl;
    owned.hatStraw = m.up.hs;
    owned.hatFancy = m.up.hf;
    owned.barge = m.up.bg ?? false;
    owned.mopQuick = m.up.mq ?? false;
    owned.mopLong = m.up.ml ?? false;
    const hadGold = owned.mopGold;
    owned.mopGold = m.up.mg ?? false;
    if (owned.mopGold && !hadGold) gildMops();                 // the matey's mop gilds too
    const hadCannon = owned.cannon;
    owned.cannon = m.up.ca ?? false;
    if (owned.cannon && !hadCannon) buildShip(layout.scale);   // the gun appears for the matey too
  }
  if (m.cn) { cannon.yaw = m.cn.y; cannon.pitch = m.cn.p; cannon.reload = m.cn.r; }
  if (m.br) {
    prefs.barge = m.br.a;
    netT.barge = m.br;
    barge.roll = m.br.rl;
    barge.capsized = m.br.cap;
  }
  session.runTime = m.t;
  if (m.d && !session.docked) showDocked(fmtTime(m.t));
  session.docked = m.d;
  m.m.forEach((ms, i) => {
    const mp = mops[i];
    if (!mp) return;
    mp.on = ms.on; mp.held = ms.held; mp.thrown = ms.thrown;
    mp.x = ms.x; mp.z = ms.z; mp.h = ms.h;
  });
  m.c.forEach((cm, i) => {
    const c = chars[i];
    if (!c) return;                                      // hostile/desynced peer sending > 2 chars
    netT.c[i] = cm;
    c.grabbedBy = cm.gb;
    c.hasMop = cm.hm;
    c.scrubT = cm.sc;
    c.holding = m.c.some((o, oi) => oi !== i && o.gb === i);
    if (cm.m !== c.mode) {                              // deck <-> water <-> shore transitions
      const wasWater = c.mode === 'water';
      c.mode = cm.m;
      if (cm.m === 'deck') {
        if (c.mesh.parent !== heelGroup) { scene.remove(c.mesh); heelGroup.add(c.mesh); }
        if (wasWater) {
          const w = localToWorld2(v2(cm.x, cm.z));
          spawnSplash(w.x, w.z, false);
        }
      } else {
        if (c.mesh.parent !== scene) { heelGroup.remove(c.mesh); scene.add(c.mesh); }
        if (cm.m === 'water') {
          spawnSplash(cm.x, cm.z, true);     // straight in, no announcement
        } else if (wasWater) {
          spawnSplash(cm.x, cm.z, false);
        }
      }
      c.pos.x = cm.x; c.pos.z = cm.z;                   // snap: coordinate space changed
    }
    c.knock = cm.kn; c.station = cm.st;
    if (cm.ht && cm.ht !== c.hat) setHat(c, cm.ht);
    if (c !== myChar() && typeof cm.f === 'number') c.facing = cm.f;
  });
}

/* guest frame: smooth toward snapshots, mirror char visuals, send input */
let inputTimer = 0;
export function guestStep(dt: number) {
  session.simT += dt;
  const k = 1 - Math.exp(-12 * dt);
  if (netT.boat) {
    boat.pos.x = lerp(boat.pos.x, netT.boat.x, k);
    boat.pos.z = lerp(boat.pos.z, netT.boat.z, k);
    boat.yaw = wrapPi(boat.yaw + wrapPi(netT.boat.yaw - boat.yaw) * k);
  }
  if (netT.barge && netT.barge.a) {
    barge.pos.x = lerp(barge.pos.x, netT.barge.x, k);
    barge.pos.z = lerp(barge.pos.z, netT.barge.z, k);
    barge.yaw = wrapPi(barge.yaw + wrapPi(netT.barge.yw - barge.yaw) * k);
  }
  chars.forEach((c, i) => {
    const tg = netT.c[i];
    if (!tg) return;
    const wasX = c.pos.x, wasZ = c.pos.z;
    c.pos.x = lerp(c.pos.x, tg.x, k);
    c.pos.z = lerp(c.pos.z, tg.z, k);
    c.jumpY = lerp(c.jumpY, tg.y || 0, k);
    const mv = Math.hypot(c.pos.x - wasX, c.pos.z - wasZ) > 0.012;
    c.animMoving = mv && c.knock <= 0;
    // estimate velocity for the googly-eye spring
    c.vel.x = (c.pos.x - wasX) / Math.max(dt, 1e-4);
    c.vel.z = (c.pos.z - wasZ) / Math.max(dt, 1e-4);
    if (mv) c.walkPhase += dt * (c.mode === 'water' ? 7 : 11);
    if (c.mode === 'deck') {
      let y = DECK_Y + c.jumpY;
      if (mv && c.jumpY < 0.01 && c.knock <= 0) y += Math.abs(Math.sin(c.walkPhase)) * 0.09;
      c.mesh.position.set(c.pos.x, y, c.pos.z);
      c.mesh.rotation.set(0, c.facing, 0);   // posture comes from the ragdoll rig
    } else if (c.mode === 'shore') {
      let y = (groundAt(c.pos.x, c.pos.z) ?? SHORE_Y) + c.jumpY;
      if (mv && c.jumpY < 0.01 && c.knock <= 0) y += Math.abs(Math.sin(c.walkPhase)) * 0.09;
      c.mesh.position.set(c.pos.x, y, c.pos.z);
      c.mesh.rotation.set(0, c.facing, 0);
    } else {
      // still dropping in? the body falls with the synced jumpY, else it bobs
      const my = c.jumpY > 0.05
        ? Math.max(0.18, WATER_EYE + c.jumpY - CONFIG.eyeHeight)
        : 0.18 + Math.sin(session.simT * 3 + i) * 0.08;
      c.mesh.position.set(c.pos.x, my, c.pos.z);
      c.mesh.rotation.set(0, c.facing, 0);
      c.rippleT -= dt;
      if (mv && c.rippleT <= 0) { c.rippleT = 0.22; spawnWake(c.pos.x, c.pos.z, c.facing, 0.5); }
    }
    animateChar(c, dt, session.simT);
  });
  inputTimer -= dt;
  if (inputTimer <= 0) {
    inputTimer = 1 / 15;
    const d = { x: localDrag.x, y: localDrag.y };
    localDrag.x = 0; localDrag.y = 0;
    netSend({ k: 'i', a: inputAxes(), f: myChar().facing, d });
  }
}

/* host frame extra: broadcast snapshots */
let snapTimer = 0;
export function hostNetStep(dt: number) {
  if (netRole !== 'host' || !guestHere) return;
  snapTimer -= dt;
  if (snapTimer > 0) return;
  snapTimer = 1 / 20;
  netSend({
    k: 's',
    b: { x: boat.pos.x, z: boat.pos.z, yaw: boat.yaw, vx: boat.vel.x, vz: boat.vel.z, av: boat.angVel,
         rud: boat.rudder, boom: boat.boomAngle, heel: boat.heel, sf: boat.sailForce, luff: boat.luffing,
         anc: boat.anchored },
    w: { a: wind.angle, s: wind.strength, wid: env.weatherId, wl: env.weatherLerp, bw: env.bigWave },
    t: session.runTime, d: session.docked,
    cg: cargoSnap(),
    g: { gold: game.gold, del: game.delivered, lost: game.lost },
    rt: routeIdx,
    aq: accepted.slice(),
    up: { bd: owned.bigDeck, ch: owned.chartNorth, sk: owned.skiff, gl: owned.galleon, hs: owned.hatStraw, hf: owned.hatFancy,
          ca: owned.cannon, bg: owned.barge, mq: owned.mopQuick, ml: owned.mopLong, mg: owned.mopGold },
    cn: { y: cannon.yaw, p: cannon.pitch, r: cannon.reload },
    br: { a: owned.barge && prefs.barge, x: barge.pos.x, z: barge.pos.z, yw: barge.yaw, rl: barge.roll, cap: barge.capsized },
    c: chars.map(c => ({
      x: c.pos.x, z: c.pos.z, y: c.jumpY, f: c.facing, m: c.mode, kn: c.knock, st: c.station,
      gb: c.grabbedBy, hm: c.hasMop, sc: c.scrubT, ht: c.hat,
    })),
    m: mops.map(mp => ({ x: mp.x, z: mp.z, h: mp.h, held: mp.held, thrown: mp.thrown, on: mp.on })),
  });
}

export function sendGrab() { netSend({ k: 'g' }); }
export function sendHandsEdge() { netSend({ k: 'f' }); }
export function sendMopTap() { netSend({ k: 'm0' }); }
export function sendBuy(id: string) { netSend({ k: 'buy', id }); }
export function sendRoute(i: number, abandon = false) { netSend(abandon ? { k: 'route', i, a: 'abandon' } : { k: 'route', i }); }
export function sendHat(id: string) { netSend({ k: 'hat', id }); }

export function requestRestart() {
  if (netRole === 'guest') { netSend({ k: 'restart?' }); return; }   // ask the host
  resetState();
  resetHands(guestHere);
  clearSplats();
  netT.boat = null; netT.c = [null, null];
  if (netRole === 'host') netSend({ k: 'reset' });
}
export const PeerCtor = Peer;   // exposed for in-page loopback testing
