import './style.css';
import { BOATS, CONFIG } from './config';
import { clamp, len2, v2, wrapPi } from './mathUtil';
import { boat, charActive, chars, env, game, layout, myChar, netRole, guestHere, owned, p1, p2, prefs, registerChars, session, splats, wind } from './state';
import { keys, pressedQueue } from './input';
import * as audio from './audio';
import { applyAspect, cam1, cam2, clouds, enableShadows, gulls, renderer, scene, skyDome, sun, viewSize } from './scene';
import { fancyUniforms, fancyWaterMesh, flatWater, cycleWater, updateWater, waterMode } from './water';
import { buildWorld, islandPos } from './world';
import { heelGroup, updateBoatVisuals } from './shipMesh';
import { makePirate, animateChar, updateHats } from './pirates';
import { equipBarge, equipHat, refreshShop, setShopHandlers, shopOpen, toggleShop, tryBuy } from './shop';
import { spawnDroplets, spawnWake, updateSplash, updateStreaks, updateWake } from './effects';
import { updateBoat, updateWind } from './simBoat';
import { localToWorld2, resetState, tryToggleStation, updateChar } from './simChars';
import { updateCameras } from './camera';
import { updateWeatherHost, updateWeatherVisuals } from './weather';
import { director, updateDirector } from './director';
import { bomberPos, clearSplats, nearestSplat, placeSplat, removeSplat, updateCritters } from './critters';
import { handsEdge, mopTap, mops, pressE, resetHands, updateHands, updateMopVisual } from './hands';
import { balls, cannon, fireCannon, updateCannon, updateCannonVisuals } from './cannon';
import { barge, updateBarge, updateBargeVisual } from './barge';
import { crates, spawnBatch, updateCargo, updateCargoVisual } from './cargo';
import { drawMap, mapOpen, toggleMap } from './map';
import { drawHud, btnHost, btnJoin, btnSolo, joinCodeEl, restartBtn, toast } from './hud';
import {
  PeerCtor, applySnapshot, guestOnData, guestStep, hostNetStep, hostOnData,
  netCode, requestRestart, sendBuy, sendGrab, sendHandsEdge, sendHat, sendMopTap,
  startHost, startJoin, startSolo,
} from './net';
import { getInteract } from './hands';
import type { BoatPreset, Char } from './types';

/* =========================== characters =========================== */
function makeChar(name: string, shirt: number, hat: number, lx: number, lz: number): Char {
  const hatStyle = prefs.hats[name === 'P1' ? 0 : 1] ?? (name === 'P1' ? 'captain' : 'bandana');
  const mesh = makePirate(shirt, hat, hatStyle as 'captain' | 'bandana');
  heelGroup.add(mesh);
  return {
    name, mesh,
    mode: 'deck', station: null,
    pos: v2(lx, lz), vel: v2(),
    knock: 0, walkPhase: 0, facing: 0, pitch: 0,
    jumpY: 0, vy: 0,
    hat: hatStyle,
    netAxes: { fwd: 0, strafe: 0, j: 0, h: 0, u: 0 },
    overboardCount: 0,
    animMoving: false,
    rippleT: 0,
    hasMop: false, grabbedBy: -1, holding: false, mash: 0, scrubT: 0,
    carry: -1,
  };
}
registerChars(
  makeChar('P1', 0xe8443a, 0x7a3030, -0.7, -1.5),   // red — host / solo
  makeChar('P2', 0xffd43b, 0x445522, 0.9, -1.5),    // gold — the matey
);

buildWorld();
enableShadows([flatWater, fancyWaterMesh, skyDome]);

/* =========================== input edge handling =========================== */
function handleLocalKeys() {
  while (pressedQueue.length) {
    const code = pressedQueue.shift()!;
    if (session.inMenu) continue;
    session.started = true;
    if (code === 'KeyQ') toast('Water: ' + cycleWater(), '#74c0fc');
    if (code === 'KeyM') toggleMap();
    if (code === 'KeyE' && !session.docked) {
      if (shopOpen) { toggleShop(); }
      else if (getInteract(myChar())?.kind === 'shop') { toggleShop(); }   // the panel is local
      else if (netRole === 'guest') sendGrab();   // host runs the E-interaction
      else pressE(p1);
    }
    if (code === 'KeyF' && !session.docked) {
      if (netRole === 'guest') sendHandsEdge();   // host simulates hands too
      else handsEdge(p1);
    }
    if (code === 'Mouse0' && !session.docked) {
      if (netRole === 'guest') sendMopTap();          // host routes it (cannon vs mop)
      else if (p1.station === 'cannon') fireCannon(p1);
      else mopTap(p1);
    }
  }
}

/* =========================== simulation step =========================== */
function physicsStep(dt: number) {
  session.simT += dt;
  handleLocalKeys();
  updateWeatherHost(dt);
  updateDirector(dt);
  updateWind(dt, session.simT);
  if (!session.docked) {
    updateBoat(dt);
    updateBarge(dt);
    updateHands(dt);
    updateCannon(dt);
    updateCargo(dt);
    chars.forEach((c, i) => { if (!charActive(c)) return; updateChar(c, i, dt, session.simT); });
    if (session.started) session.runTime += dt;
  }
  chars.forEach(c => animateChar(c, dt, session.simT));
}

/* =========================== cosmetic step =========================== */
let wakeTimer = 0, sprayTimer = 0;
function visualStep(dt: number) {
  const t = session.simT;
  const speed = len2(boat.vel);
  // wake trail off the stern + bow spray at speed
  wakeTimer -= dt;
  if (speed > 1.2 && wakeTimer <= 0) {
    wakeTimer = 0.09;
    const stern = localToWorld2(v2(0, -layout.hullL / 2));
    spawnWake(stern.x, stern.z, boat.yaw, (1.2 + speed * 0.12) * layout.scale);
  }
  sprayTimer -= dt;
  if (speed > 5.5 && sprayTimer <= 0) {
    sprayTimer = 0.13;
    const bow = localToWorld2(v2(0, layout.hullL / 2 - 0.3));
    spawnDroplets(bow.x, bow.z, 3, 2.4, 2.6);
  }
  // sun (shadow box), sky dome, clouds and gulls follow the action
  sun.position.set(boat.pos.x + 80, 120, boat.pos.z + 40);
  sun.target.position.set(boat.pos.x, 0, boat.pos.z);
  skyDome.position.copy(cam1.position);
  for (const cl of clouds) {
    cl.position.x += Math.sin(wind.angle) * wind.strength * 0.18 * dt;
    cl.position.z += Math.cos(wind.angle) * wind.strength * 0.18 * dt;
    if (Math.hypot(cl.position.x - boat.pos.x, cl.position.z - boat.pos.z) > 750) {
      cl.position.x = boat.pos.x - Math.sin(wind.angle) * 680 + (Math.random() - 0.5) * 320;
      cl.position.z = boat.pos.z - Math.cos(wind.angle) * 680 + (Math.random() - 0.5) * 320;
    }
  }
  gulls.forEach((gl, i) => {
    const cx = i === 4 ? boat.pos.x : (i % 2 ? islandPos.x : 0);
    const cz = i === 4 ? boat.pos.z : (i % 2 ? islandPos.z : -60);
    const a = t * gl.sp + gl.ph;
    gl.g.position.set(cx + Math.cos(a) * gl.r, gl.h + Math.sin(t * 0.9 + gl.ph) * 1.4, cz + Math.sin(a) * gl.r);
    gl.g.rotation.y = -a;                      // face along the orbit tangent
    const flap = Math.sin(t * 7 + gl.ph) * 0.55;
    gl.wingL.rotation.z = flap;
    gl.wingR.rotation.z = -flap;
  });
  updateWake(dt);
  updateSplash(dt);
  updateStreaks(dt, t, boat.pos.x, boat.pos.z, wind.angle, wind.strength);
  updateWater(t, boat.pos.x, boat.pos.z);
  updateWeatherVisuals(dt);
  updateCritters(dt, t);
  updateMopVisual(t);
  updateCargoVisual(t);
  updateCannonVisuals(dt);
  updateBargeVisual(t);
  updateHats(dt, t);
  if (shopOpen) refreshShop();
  updateBoatVisuals(dt, t);
  updateCameras(dt, t);
  audio.updateAudio(dt, wind.strength, speed, session.inMenu ? 0 : (boat.luffing ? 1 : 0));
}

/* =========================== render =========================== */
function renderViews() {
  const v = viewSize();
  renderer.setViewport(0, 0, v.w, v.h);
  fancyUniforms.uCamPos.value.copy(cam1.position);
  const me = myChar();
  me.mesh.visible = false;                 // never render your own body in first person
  renderer.render(scene, cam1);
  me.mesh.visible = charActive(me);
}

/* =========================== main loop =========================== */
let lastNow = performance.now();
function frame(now: number) {
  requestAnimationFrame(frame);
  const dt = clamp((now - lastNow) / 1000, 0, 0.033);
  lastNow = now;
  if (!window.__sailPaused) {
    if (netRole === 'guest') { handleLocalKeys(); guestStep(dt); }
    else { physicsStep(dt); hostNetStep(dt); }
  }
  visualStep(dt);
  drawHud(session.simT);
  drawMap();
  renderViews();
}
requestAnimationFrame(frame);

/* =========================== UI wiring =========================== */
// you set out in the last hull you equipped (sloop until the shop says otherwise)
const startBoat = (): BoatPreset =>
  BOATS.find(b => b.id === prefs.ship && (b.id === 'sloop' || owned[b.id as 'skiff' | 'galleon'])) ?? BOATS[1];
setShopHandlers(
  id => { if (netRole === 'guest') sendBuy(id); else tryBuy(id); },
  style => { if (netRole === 'guest') sendHat(style); else equipHat(0, style); },
);
btnSolo.addEventListener('click', () => { audio.ensureAudio(); startSolo(startBoat()); });
btnHost.addEventListener('click', () => { audio.ensureAudio(); startHost(startBoat()); });
btnJoin.addEventListener('click', () => { audio.ensureAudio(); startJoin(joinCodeEl.value); });
restartBtn.addEventListener('click', () => requestRestart());
applyAspect();

/* ============ dev hook for testing (harmless in play) ============ */
declare global {
  interface Window { __sail: Record<string, unknown>; __sailPaused?: boolean }
}
window.__sail = {
  CONFIG, boat, wind, chars, keys,
  _three: { renderer, scene, cam1, cam2 },
  _net: { startSolo, startHost, startJoin, resetState, hostOnData, guestOnData, applySnapshot },
  Peer: PeerCtor,
  env, layout, BOATS, mops, crates, splats, game, cannon, barge, gulls,
  _hands: { handsEdge, mopTap, pressE, updateHands, resetHands },
  _cannon: { fireCannon, balls, bomberPos },
  _shop: { tryBuy, equipBarge },
  _splats: { placeSplat, removeSplat, nearestSplat, clearSplats },
  _cargo: { spawnBatch },
  _director: director,
  get netCode() { return netCode; },
  get waterMode() { return waterMode; },
  get mapOpen() { return mapOpen; },
  get netRole() { return netRole; },
  get guestHere() { return guestHere; },
  get inMenu() { return session.inMenu; },
  get docked() { return session.docked; },
  get time() { return session.runTime; },
  press(code: string) { keys[code] = true; pressedQueue.push(code); },
  release(code: string) { keys[code] = false; },
  look(dyaw: number, dpitch = 0) {
    const c = myChar();
    c.facing = wrapPi(c.facing + dyaw);
    c.pitch = clamp(c.pitch + dpitch, -1.15, 1.15);
  },
  step(seconds: number) {            // deterministic fast-forward (no render), mirrors frame()
    const n = Math.round(seconds * 60);
    for (let i = 0; i < n; i++) {
      if (netRole === 'guest') { handleLocalKeys(); guestStep(1 / 60); }
      else { physicsStep(1 / 60); hostNetStep(1 / 60); }
      visualStep(1 / 60);
    }
  },
  render() { drawHud(session.simT); drawMap(); renderViews(); },
  setPaused(p: boolean) { window.__sailPaused = p; },
};
