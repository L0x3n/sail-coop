import { HOME_DOCK, ROUTES, routeIdx, setRoute } from './world';
import { batchSize, cratesLeft, spawnBatch } from './cargo';
import { toast } from './hud';
import * as audio from './audio';

/* ===================================================================
   The job board. A friendly pull-up panel (like the chandler's shop):
   every run is a card that says where to go, what to do, and the pay.
   Pick one to take the job. Host-authoritative — the matey's click
   arrives as a net message.
   =================================================================== */
export let questOpen = false;
let pickHandler: (i: number) => void = pickRoute;
export function setQuestHandlers(pick: (i: number) => void) { pickHandler = pick; }

const wrap = document.getElementById('questWrap')!;
const list = document.getElementById('questList')!;
export function toggleQuest() {
  questOpen = !questOpen;
  wrap.style.display = questOpen ? 'flex' : 'none';
  if (questOpen) { document.exitPointerLock?.(); refreshQuest(); }
}
document.getElementById('questClose')!.addEventListener('click', () => { if (questOpen) toggleQuest(); });

/* host applies the choice (validates locks); guests relay here via net */
export function pickRoute(i: number) {
  const r = ROUTES[i];
  if (!r) return;
  if (r.locked?.()) { toast('🔒 ' + (r.lockHint ?? 'this route is locked'), '#ff8787'); return; }
  setRoute(i);
  audio.dockedChime();
  if (cratesLeft() === 0) {
    spawnBatch();   // fresh crates appear on the home pier (spawnBatch shows its own toast)
  } else {
    toast('Re-routed to ' + r.name + ' — carry your cargo to the new flag', '#ffd95e');
  }
  refreshQuest();
}

const CARD = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
function cardinal(dx: number, dz: number) {        // -z is "north" (toward the home island)
  const a = (Math.atan2(dx, -dz) * 180 / Math.PI + 360) % 360;
  return CARD[Math.round(a / 45) % 8];
}
function tier(pay: number) {
  if (pay <= 10) return { label: 'EASY', col: '#51cf66' };
  if (pay <= 16) return { label: 'FAIR', col: '#ffd43b' };
  if (pay <= 24) return { label: 'HARD', col: '#ff922b' };
  return { label: 'EPIC', col: '#ff6b6b' };
}

export function refreshQuest() {
  if (!questOpen) return;
  list.innerHTML = '';
  const shipment = cratesLeft() > 0;          // a run is in progress (crates out there)
  ROUTES.forEach((r, i) => {
    const dx = r.del.x - HOME_DOCK.x, dz = r.del.z - HOME_DOCK.z;
    const dist = Math.hypot(dx, dz) | 0;
    const t = tier(r.pay);
    const locked = !!r.locked?.();
    const active = shipment && i === routeIdx;   // only "active" while a shipment exists
    const row = document.createElement('div');
    row.className = 'questrow' + (active ? ' active' : '') + (locked ? ' locked' : '');
    row.innerHTML =
      '<div class="qdir" style="transform:rotate(' + Math.atan2(dx, -dz).toFixed(3) + 'rad)">➤</div>' +
      '<div class="qinfo">' +
        '<div class="qname">' + r.name + ' <span class="qdiff" style="background:' + t.col + '">' + t.label + '</span></div>' +
        '<div class="qdesc">Carry crates <b>' + dist + 'm ' + cardinal(dx, dz) + '</b> to the green flag · ' + r.desc +
        (locked && r.lockHint ? ' · <span class="qlock">🔒 ' + r.lockHint + '</span>' : '') + '</div>' +
      '</div>' +
      '<div class="qpay"><b>' + r.pay + 'g</b><small> /crate</small><div class="qload">≈ ' + (r.pay * batchSize()) + 'g a load</div></div>';
    const btn = document.createElement('button');
    btn.textContent = locked ? '🔒 locked' : active ? 'ACTIVE' : shipment ? 'Switch' : 'Take job';
    btn.disabled = locked || active;
    if (!btn.disabled) btn.addEventListener('click', () => pickHandler(i));
    row.append(btn);
    list.append(row);
  });
}
