import { CONFIG } from './config';
import { TAU } from './mathUtil';
import { boat, chars, charActive, env, wind } from './state';
import { DELIVERY, EXTRA_ISLES, PIERS, ROUTES, islandPos, pierA, pierB, routeIdx } from './world';
import { WEATHERS } from './weather';

/* =========================== big map (M) =========================== */
const wrap = document.getElementById('mapWrap')!;
const canvas = document.getElementById('bigmap') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
export let mapOpen = false;

export function toggleMap() {
  mapOpen = !mapOpen;
  wrap.style.display = mapOpen ? 'flex' : 'none';
}

// world window: x in [-230, 230], z in [-350, 100]  (island at the top, spawn below)
const X0 = -230, X1 = 230, Z0 = -350, Z1 = 100;
const W = 560, H = 560;
const mx = (x: number) => ((x - X0) / (X1 - X0)) * W;
const my = (z: number) => ((z - Z0) / (Z1 - Z0)) * H;

export function drawMap() {
  if (!mapOpen) return;
  ctx.clearRect(0, 0, W, H);
  // sea
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#15527f');
  grad.addColorStop(1, '#1d6aa3');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  // grid every 50 m
  ctx.strokeStyle = 'rgba(255,255,255,.07)';
  ctx.lineWidth = 1;
  for (let gx = X0; gx <= X1; gx += 50) { ctx.beginPath(); ctx.moveTo(mx(gx), 0); ctx.lineTo(mx(gx), H); ctx.stroke(); }
  for (let gz = Z1; gz <= Z0; gz += 50) { ctx.beginPath(); ctx.moveTo(0, my(gz)); ctx.lineTo(W, my(gz)); ctx.stroke(); }
  // island
  const ir = (CONFIG.islandRadius / (X1 - X0)) * W;
  ctx.fillStyle = '#e7d08a';
  ctx.beginPath(); ctx.arc(mx(islandPos.x), my(islandPos.z), ir + 7, 0, TAU); ctx.fill();
  ctx.fillStyle = '#57a05a';
  ctx.beginPath(); ctx.arc(mx(islandPos.x) - 6, my(islandPos.z) - 5, ir * 0.55, 0, TAU); ctx.fill();
  // the smaller isles
  for (const isle of EXTRA_ISLES) {
    const rr = (isle.r / (X1 - X0)) * W;
    ctx.fillStyle = '#e7d08a';
    ctx.beginPath(); ctx.arc(mx(isle.x), my(isle.z), rr + 3, 0, TAU); ctx.fill();
    if (isle.palms > 0) {
      ctx.fillStyle = '#57a05a';
      ctx.beginPath(); ctx.arc(mx(isle.x), my(isle.z), rr * 0.5, 0, TAU); ctx.fill();
    }
  }
  // every pier (home + all routes)
  ctx.fillStyle = '#8a5a33';
  for (const p of PIERS) {
    const x0 = Math.min(mx(p.a.x), mx(p.b.x)), x1 = Math.max(mx(p.a.x), mx(p.b.x));
    const y0 = Math.min(my(p.a.z), my(p.b.z)), y1 = Math.max(my(p.a.z), my(p.b.z));
    ctx.fillRect(x0 - 3, y0 - 3, Math.max(6, x1 - x0 + 6), Math.max(6, y1 - y0 + 6));
  }
  ctx.fillStyle = '#cfeefc';
  ctx.font = 'bold 12px Consolas';
  ctx.textAlign = 'center';
  ctx.fillText('HOME', mx(pierA.x), my(pierB.z) - 8);
  // the active delivery flag
  ctx.fillStyle = '#69db7c';
  ctx.beginPath();
  ctx.arc(mx(DELIVERY.x), my(DELIVERY.z), 7, 0, TAU);
  ctx.fill();
  ctx.fillStyle = '#aef7a2';
  ctx.fillText('DELIVER · ' + ROUTES[routeIdx].name, mx(DELIVERY.x), my(DELIVERY.z) - 12);
  // rocks
  ctx.fillStyle = '#9aa3ab';
  for (const r of [{ x: -19, z: -62, r: 4 }, { x: 23, z: -118, r: 5 }, { x: -10, z: -168, r: 3.5 }, { x: 26, z: -205, r: 4.5 }]) {
    ctx.beginPath(); ctx.arc(mx(r.x), my(r.z), Math.max(4, r.r * 1.2), 0, TAU); ctx.fill();
  }
  // swimmers + leash ring
  for (const c of chars) {
    if (!charActive(c) || c.mode !== 'water') continue;
    ctx.strokeStyle = 'rgba(116,192,252,.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(mx(boat.pos.x), my(boat.pos.z), (CONFIG.swimLeash / (X1 - X0)) * W, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = c.name === 'P1' ? '#ff8a7a' : '#ffd95e';
    ctx.beginPath(); ctx.arc(mx(c.pos.x), my(c.pos.z), 4, 0, TAU); ctx.fill();
  }
  // the boat: triangle pointing along its heading
  // screen delta for heading (sin yaw, cos yaw): +x -> right, +z -> down, so rotate by atan2(dx, -dz)
  ctx.save();
  ctx.translate(mx(boat.pos.x), my(boat.pos.z));
  ctx.rotate(Math.atan2(Math.sin(boat.yaw), -Math.cos(boat.yaw)));
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(0, -9); ctx.lineTo(6, 7); ctx.lineTo(-6, 7); ctx.closePath();
  ctx.fill();
  ctx.restore();
  // wind arrow (top-left): world direction the wind blows toward
  ctx.save();
  ctx.translate(46, 46);
  ctx.rotate(Math.atan2(Math.sin(wind.angle), -Math.cos(wind.angle)));
  ctx.strokeStyle = '#74c0fc'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(0, -10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(6, -7); ctx.lineTo(-6, -7); ctx.closePath();
  ctx.fillStyle = '#74c0fc'; ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#cfeefc';
  ctx.font = '12px Consolas';
  ctx.textAlign = 'left';
  ctx.fillText('wind ' + wind.strength.toFixed(0) + ' kn', 24, 84);
  ctx.fillText(WEATHERS[env.weatherId].name, 24, 100);
  ctx.textAlign = 'right';
  ctx.fillText('grid 50 m · M closes', W - 14, H - 12);
}
