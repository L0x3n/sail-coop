import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, clamp, fmtTime, len2, wrapPi } from './mathUtil';
import { boat, chars, game, myChar, session, tuning, wind } from './state';
import { getInteract } from './hands';
import { cratesAboard, cratesLeft } from './cargo';
import { dragLook } from './input';
import { DELIVERY } from './world';
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
const lookHintEl = el('lookHint');
const msgEl = el('msg'), msgTextEl = el('msgText');
const struggleEl = el('struggle');
const scrubRingEl = el('scrubRing');
const mopHintEl = el('mopHint');
const _projV = new THREE.Vector3();

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
  // wind arrow: where the wind BLOWS TOWARD, relative to the bow
  const a = wrapPi(wind.angle - boat.yaw);
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
    // overboard: point the swimmer back at the boat + leash distance
    const dist = Math.hypot(boat.pos.x - c.pos.x, boat.pos.z - c.pos.z);
    const ang = wrapPi(Math.atan2(boat.pos.x - c.pos.x, boat.pos.z - c.pos.z) - c.facing);
    const dir = Math.abs(ang) < 0.35 ? 'AHEAD — swim into the hull!' : (ang > 0 ? 'to the LEFT' : 'to the RIGHT');
    return 'OVERBOARD ' + (dist | 0) + 'm / ' + CONFIG.swimLeash + 'm — boat is ' + dir;
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
  lookHintEl.style.display = (!session.inMenu && !document.pointerLockElement && !dragLook) ? 'block' : 'none';

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
}
