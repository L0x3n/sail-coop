import * as THREE from 'three';
import { CONFIG } from './config';
import { TAU, clamp, fmtTime, len2, wrapPi } from './mathUtil';
import { accepted, boat, chars, game, myChar, pointOfSail, session, tuning, wind } from './state';
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
const speedEl = el('speed'), timerEl = el('timer'), windTxtEl = el('windtxt');
const goldEl = el('gold');
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
  windTxtEl.textContent = wind.strength.toFixed(0) + ' kn';   // direction is on the dial
  const distDel = Math.hypot(DELIVERY.x - boat.pos.x, DELIVERY.z - boat.pos.z);
  goldEl.textContent = game.gold + 'g';
  drawCompass();
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

  // ---- job tracker: up to 3 accepted jobs, the live one on top ----
  if (session.inMenu) {
    objectiveEl.style.display = 'none';
  } else if (accepted.length === 0) {
    objectiveEl.style.display = 'block';
    objectiveEl.classList.remove('near');
    objectiveEl.innerHTML = '<div class="qcard empty"><div class="route">📋 No job yet</div>read the job board on the home pier (E) — take up to 3</div>';
  } else {
    objectiveEl.style.display = 'block';
    const near = distDel < 40;
    objectiveEl.classList.toggle('near', near);
    let html = '';
    accepted.forEach((route, idx) => {
      const r = ROUTES[route];
      if (idx === 0) {
        // the live run: distance / ETA / cargo to the active flag
        if (near) {
          html += '<div class="qcard live"><div class="route">⚑ ' + r.name + ' — ARRIVING</div>stop, drop anchor, carry crates onto the green flag</div>';
        } else {
          const spd = len2(boat.vel);
          const eta = spd > 0.5 ? ' · ~' + Math.round(distDel / spd) + 's' : '';
          const dstr = distDel > 950 ? (distDel / 1000).toFixed(1) + 'km' : (distDel | 0) + 'm';
          html += '<div class="qcard live"><div class="route">⚑ ' + r.name + '</div>'
            + dstr + eta + ' · ' + r.pay + 'g/crate<br>' + cratesAboard() + ' aboard · ' + cratesLeft() + ' left</div>';
        }
      } else {
        html += '<div class="qcard"><div class="route">' + (idx + 1) + '. ' + r.name + '</div>'
          + r.pay + 'g/crate · queued (switch at the board)</div>';
      }
    });
    objectiveEl.innerHTML = html;
  }

  // ---- off-screen waypoint arrow pointing to the delivery flag ----
  if (session.inMenu || cratesLeft() === 0) { waypointEl.style.display = 'none'; }
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
