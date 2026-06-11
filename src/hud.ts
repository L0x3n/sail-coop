import { CONFIG, HELM_POS, SAIL_STA, STATION_R } from './config';
import { TAU, clamp, fmtTime, len2, wrapPi } from './mathUtil';
import { boat, myChar, session, wind } from './state';
import { stationTakenBy } from './simChars';
import { dragLook } from './input';
import { pierA, dockMidZ } from './world';
import { dockedChime } from './audio';
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
const toastEl = el('toast');
const prompt1 = el('promptP1');
const lookHintEl = el('lookHint');
const msgEl = el('msg'), msgTextEl = el('msgText');

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
  // green chevron: bearing to the pier (your destination)
  const relDock = wrapPi(Math.atan2(pierA.x - boat.pos.x, dockMidZ - boat.pos.z) - boat.yaw);
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
  const power = clamp(boat.sailForce / Math.max(0.01, CONFIG.sailPower * wind.strength), 0, 1);
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
function stationPromptText(c: Char, keyName: string): string {
  if (c.mode !== 'deck') {
    // overboard: point the swimmer back at the boat
    const ang = wrapPi(Math.atan2(boat.pos.x - c.pos.x, boat.pos.z - c.pos.z) - c.facing);
    const dir = Math.abs(ang) < 0.35 ? 'AHEAD — swim into the hull!' : (ang > 0 ? 'to the LEFT' : 'to the RIGHT');
    return 'OVERBOARD! Boat is ' + dir;
  }
  if (c.station) return keyName + ' — let go of the ' + (c.station === 'helm' ? 'HELM' : 'SAIL');
  if (!stationTakenBy('helm') &&
      Math.hypot(c.pos.x - HELM_POS.x, c.pos.z - HELM_POS.z) < STATION_R) return keyName + ' — man the HELM';
  if (!stationTakenBy('sail') &&
      Math.hypot(c.pos.x - SAIL_STA.x, c.pos.z - SAIL_STA.z) < STATION_R) return keyName + ' — man the SAIL';
  return '';
}

/* =========================== per-frame HUD =========================== */
export function drawHud(t: number) {
  speedEl.textContent = len2(boat.vel).toFixed(1);
  timerEl.textContent = fmtTime(session.runTime);
  windTxtEl.textContent = 'Wind ' + wind.strength.toFixed(0) + ' kn';
  const distPier = Math.hypot(pierA.x - boat.pos.x, dockMidZ - boat.pos.z);
  pierTxtEl.textContent = 'pier ' + (distPier | 0) + 'm';
  drawCompass();
  drawMiniBoat(t);
  const txt = session.inMenu ? '' : stationPromptText(myChar(), 'E');
  prompt1.style.display = txt ? 'block' : 'none';
  if (txt) prompt1.textContent = txt;
  lookHintEl.style.display = (!session.inMenu && !document.pointerLockElement && !dragLook) ? 'block' : 'none';
}
