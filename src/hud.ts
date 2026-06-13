import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, clamp, fmtTime, len2, wrapPi } from './mathUtil';
import { boat, chars, game, myChar, pointOfSail, session, tuning, wind } from './state';
import { getInteract } from './hands';
import { cratesAboard, cratesLeft } from './cargo';
import { DELIVERY, ROUTES, routeIdx } from './world';
import { dockedChime } from './audio';
import { cam1 } from './scene';
import { heelGroup } from './shipMesh';
import type { Char } from './types';

/* =========================== DOM =========================== */
const el = (id: string) => document.getElementById(id)!;
export const modeSelEl = el('modeSelect');
export const netStatusEl = el('netStatus');
export const netChipEl = el('netchip');
export const btnSolo = el('btnSolo') as HTMLButtonElement;
export const btnHost = el('btnHost') as HTMLButtonElement;
export const btnJoin = el('btnJoin') as HTMLButtonElement;
export const joinCodeEl = el('joinCode') as HTMLInputElement;
export const restartBtn = el('restartBtn') as HTMLButtonElement;
const compassCtx = (el('compass') as HTMLCanvasElement).getContext('2d')!;
const miniCtx = (el('miniboat') as HTMLCanvasElement).getContext('2d')!;
const speedEl = el('speed'), timerEl = el('timer'), windTxtEl = el('windtxt'), pierTxtEl = el('piertxt');
const goldEl = el('gold'), cargoTxtEl = el('cargoTxt');
const toastEl = el('toast');
const prompt1 = el('promptP1');
const msgEl = el('msg'), msgTextEl = el('msgText');
const struggleEl = el('struggle');
const scrubRingEl = el('scrubRing');
const mopHintEl = el('mopHint');
const objectiveEl = el('objective'), waypointEl = el('waypoint'), trimCoachEl = el('trimCoach');
const helpEl = el('help');
const _projV = new THREE.Vector3();

/* the Help (?) overlay */
export function toggleHelp() { helpEl.style.display = helpEl.style.display === 'flex' ? 'none' : 'flex'; }
export function helpOpen() { return helpEl.style.display === 'flex'; }
el('helpClose').addEventListener('click', () => { helpEl.style.display = 'none'; });

/* =========================== toast (+ relay hook for the host) =========================== */
let toastTimer: ReturnType<typeof setTimeout> | null = null;
let toastRelay: ((text: string, color?: string) => void) | null = null;
export function setToastRelay(fn: (text: string, color?: string) => void) { toastRelay = fn; }
export function toast(text: string, color?: string) {
  toastEl.textContent = text;
  toastEl.style.color = color || '#ffe066';
  toastEl.style.opacity = '1';
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.style.opacity = '0'; }, 1700);
  if (toastRelay) toastRelay(text, color);
}

export function showDocked(timeText: string) {
  msgTextEl.textContent = 'Time: ' + timeText;
  msgEl.style.display = 'block';
  dockedChime();
}
export function hideDocked() { msgEl.style.display = 'none'; }

/* =========================== canvas widgets =========================== */
function drawCompass() {
  const ctx = compassCtx, S = 90, c = S / 2;
  ctx.clearRect(0, 0, S, S);
  ctx.strokeStyle = 'rgba(255,255,255,.8)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(c, c, 38, 0, TAU); ctx.stroke();
  const ps = pointOfSail();
  const a = ps.d;                                     // wind direction, relative to the bow
  // the NO-GO cone: point the bow into this red wedge and the sail won't drive (in irons).
  // it sits around where the wind comes FROM (opposite the blows-toward arrow).
  const wf = wrapPi(a + Math.PI);
  const ng = CONFIG.noGoHalfAngle * Math.PI / 180;
  ctx.save(); ctx.translate(c, c); ctx.rotate(-wf + Math.PI);
  ctx.beginPath(); ctx.moveTo(0, 0);
  ctx.arc(0, 0, 38, -Math.PI / 2 - ng, -Math.PI / 2 + ng);
  ctx.closePath();
  ctx.fillStyle = ps.noGo ? 'rgba(255,70,70,.6)' : 'rgba(255,110,110,.2)';
  ctx.fill(); ctx.restore();
  // wind arrow: where the wind BLOWS TOWARD, relative to the bow
  ctx.save(); ctx.translate(c, c); ctx.rotate(-a + Math.PI);
  ctx.fillStyle = '#74c0fc';
  ctx.beginPath();
  ctx.moveTo(0, -30); ctx.lineTo(10, 6); ctx.lineTo(0, -2); ctx.lineTo(-10, 6); ctx.closePath();
  ctx.fill();
  ctx.restore();
  // green chevron: bearing to the delivery flag
  const relDock = wrapPi(Math.atan2(DELIVERY.x - boat.pos.x, DELIVERY.z - boat.pos.z) - boat.yaw);
  ctx.save(); ctx.translate(c, c); ctx.rotate(-relDock + Math.PI);
  ctx.fillStyle = '#69db7c';
  ctx.beginPath();
  ctx.moveTo(0, -40); ctx.lineTo(6, -30); ctx.lineTo(-6, -30); ctx.closePath();
  ctx.fill();
  ctx.restore();
  // your bow is always 'up' — turns red when you're in irons
  ctx.fillStyle = ps.noGo ? '#ff6b6b' : '#fff';
  ctx.beginPath(); ctx.moveTo(c, c - 41); ctx.lineTo(c - 4, c - 33); ctx.lineTo(c + 4, c - 33); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 11px Consolas';
  ctx.textAlign = 'center';
  ctx.fillText('WIND', c, c + 30);
}

function drawMiniBoat(t: number) {
  const ctx = miniCtx, S = 110, c = S / 2;
  ctx.clearRect(0, 0, S, S);
  ctx.save(); ctx.translate(c, c);
  // hull outline, bow up
  ctx.strokeStyle = '#e9c9a8'; ctx.lineWidth = 2; ctx.fillStyle = 'rgba(170,120,70,.55)';
  ctx.beginPath();
  ctx.moveTo(0, -34); ctx.quadraticCurveTo(15, -16, 13, 22); ctx.lineTo(-13, 22);
  ctx.quadraticCurveTo(-15, -16, 0, -34); ctx.closePath(); ctx.fill(); ctx.stroke();
  // boom, colored by trim quality (green = drawing well, red/flash = luffing)
  const power = clamp(boat.sailForce / Math.max(0.01, tuning.sailPower * wind.strength), 0, 1);
  let boomCol = power > 0.7 ? '#51cf66' : power > 0.35 ? '#ffd43b' : '#ff6b6b';
  if (boat.luffing && Math.sin(t * 10) > 0) boomCol = '#ff8787';
  ctx.strokeStyle = boomCol; ctx.lineWidth = 3;
  ctx.save(); ctx.translate(0, -6); ctx.rotate(-boat.boomAngle);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -6, 3, 0, TAU); ctx.fill();
  // rudder at stern
  ctx.strokeStyle = '#74c0fc';
  ctx.save(); ctx.translate(0, 22); ctx.rotate(-boat.rudder * 1.5);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 12); ctx.stroke(); ctx.restore();
  // wind arrow relative to boat heading
  const rel = wrapPi(wind.angle - boat.yaw);
  ctx.save(); ctx.rotate(-rel + Math.PI); ctx.strokeStyle = '#74c0fc'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, -40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(4, -44); ctx.lineTo(-4, -44); ctx.closePath();
  ctx.fillStyle = '#74c0fc'; ctx.fill(); ctx.restore();
  ctx.restore();
}

/* =========================== prompts =========================== */
function stationPromptText(c: Char): string {
  if (c.mode === 'water') {
    // a quiet swim hint: where the boat is, and that the ladder gets you up
    const dist = Math.hypot(boat.pos.x - c.pos.x, boat.pos.z - c.pos.z);
    const ang = wrapPi(Math.atan2(boat.pos.x - c.pos.x, boat.pos.z - c.pos.z) - c.facing);
    const dir = Math.abs(ang) < 0.35 ? 'ahead' : (ang > 0 ? 'to the left' : 'to the right');
    return 'Boat ' + (dist | 0) + 'm ' + dir + ' — swim into the ladder to climb up';
  }
  // everything else comes from the single interact source
  return getInteract(c)?.label ?? '';
}

/* =========================== per-frame HUD =========================== */
export function drawHud(t: number) {
  speedEl.textContent = len2(boat.vel).toFixed(1);
  timerEl.textContent = fmtTime(session.runTime);
  windTxtEl.textContent = 'Wind ' + wind.strength.toFixed(0) + ' kn';
  const distDel = Math.hypot(DELIVERY.x - boat.pos.x, DELIVERY.z - boat.pos.z);
  pierTxtEl.textContent = 'deliver ' + (distDel | 0) + 'm';
  goldEl.textContent = game.gold + 'g';
  cargoTxtEl.textContent = 'aboard ' + cratesAboard() + ' · left ' + cratesLeft();
  drawCompass();
  drawMiniBoat(t);
  const txt = session.inMenu ? '' : stationPromptText(myChar());
  prompt1.style.display = txt ? 'block' : 'none';
  if (txt) prompt1.textContent = txt;

  // struggle indicator above whoever is being carried
  const victim = chars.find(c => c.grabbedBy >= 0);
  if (victim && !session.inMenu) {
    _projV.set(victim.pos.x, 2.4, victim.pos.z);
    heelGroup.localToWorld(_projV);
    _projV.project(cam1);
    if (_projV.z < 1) {
      struggleEl.style.display = 'block';
      struggleEl.style.left = ((_projV.x * 0.5 + 0.5) * innerWidth) + 'px';
      struggleEl.style.top = ((-_projV.y * 0.5 + 0.5) * innerHeight) + 'px';
      struggleEl.textContent = (victim === myChar() ? 'MASH F! ' : '✊ ') + victim.mash + '/' + CONFIG.escapeMash;
    } else struggleEl.style.display = 'none';
  } else struggleEl.style.display = 'none';

  // holding the mop: show what it can do
  const meH = myChar();
  if (!session.inMenu && meH.hasMop && meH.mode === 'deck') {
    mopHintEl.style.display = 'block';
    mopHintEl.innerHTML = '🧹 <b>hold LMB</b> scrub · <b>tap LMB</b> bonk matey · <b>F</b> throw · <b>E</b> put down';
  } else mopHintEl.style.display = 'none';

  // scrub progress ring
  const me = myChar();
  if (me.scrubT > 0) {
    scrubRingEl.style.display = 'block';
    const deg = Math.min(360, (me.scrubT / CONFIG.scrubTime) * 360);
    scrubRingEl.style.background = `conic-gradient(#69db7c ${deg}deg, rgba(255,255,255,.15) ${deg}deg)`;
  } else scrubRingEl.style.display = 'none';

  // ---- objective banner: route · distance · ETA · cargo (distDel computed above) ----
  if (session.inMenu || cratesLeft() === 0) {
    objectiveEl.style.display = 'none';
  } else {
    objectiveEl.style.display = 'block';
    const near = distDel < 40;
    objectiveEl.classList.toggle('near', near);
    if (near) {
      objectiveEl.textContent = '⚑ ARRIVING — stop, drop anchor, carry crates onto the green flag';
    } else {
      const spd = len2(boat.vel);
      const eta = spd > 0.5 ? ' · ~' + Math.round(distDel / spd) + 's' : '';
      const dstr = distDel > 950 ? (distDel / 1000).toFixed(1) + 'km' : (distDel | 0) + 'm';
      objectiveEl.textContent = '⚑ ' + ROUTES[routeIdx].name + ' · ' + dstr + eta
        + ' · ' + cratesAboard() + ' aboard / ' + cratesLeft() + ' left';
    }
  }

  // ---- off-screen waypoint arrow pointing to the delivery flag ----
  if (session.inMenu) { waypointEl.style.display = 'none'; }
  else {
    _projV.set(DELIVERY.x, 2, DELIVERY.z); _projV.project(cam1);
    let nx = _projV.x, ny = _projV.y;
    const behind = _projV.z >= 1;
    if (behind) { nx = -nx; ny = -ny; }
    if (!behind && Math.abs(nx) < 0.9 && Math.abs(ny) < 0.9) {
      waypointEl.style.display = 'none';                 // the in-world flag is on screen
    } else {
      const cx = innerWidth / 2, cy = innerHeight / 2;
      const mlen = Math.hypot(nx, -ny) || 1;
      const ux = nx / mlen, uy = -ny / mlen;             // screen space, y down
      const scale = Math.min((cx - 64) / Math.max(1e-3, Math.abs(ux)), (cy - 64) / Math.max(1e-3, Math.abs(uy)));
      waypointEl.style.display = 'block';
      waypointEl.style.left = (cx + ux * scale) + 'px';
      waypointEl.style.top = (cy + uy * scale) + 'px';
      waypointEl.innerHTML = '<div class="wparrow" style="transform:rotate(' + Math.atan2(ux, -uy) + 'rad)">▲</div>' + (distDel | 0) + 'm';
    }
  }

  // ---- sail trim coach: shown while manning the SAIL ----
  if (!session.inMenu && me.station === 'sail') {
    const ps = pointOfSail();
    const power = clamp(boat.sailForce / Math.max(0.01, tuning.sailPower * wind.strength), 0, 1);
    const delta = wrapPi(ps.idealBoom - boat.boomAngle);
    let word: string, hint: string, col: string;
    if (ps.noGo) { word = 'IN IRONS'; hint = 'steer away from the wind'; col = '#ff6b6b'; }
    else if (power < 0.85) {
      word = boat.luffing ? 'LUFFING' : 'ADJUST';
      hint = delta > 0.03 ? 'hold D ▶' : delta < -0.03 ? '◀ hold A' : '';
      col = power > 0.4 ? '#ffd43b' : '#ff8787';
    } else { word = 'TRIMMED ✓'; hint = ''; col = '#51cf66'; }
    trimCoachEl.style.display = 'block';
    trimCoachEl.innerHTML = '<span style="color:' + col + '">SAIL ' + word + '</span>'
      + '<span class="bar"><i style="width:' + (power * 100).toFixed(0) + '%;background:' + col + '"></i></span>'
      + '<span style="color:' + col + '">' + hint + '</span>';
  } else trimCoachEl.style.display = 'none';
}
