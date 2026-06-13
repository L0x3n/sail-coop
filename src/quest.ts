import { HOME_DOCK, ROUTES, setRoute } from './world';
import { batchSize, cratesLeft, resetCargo, spawnBatch } from './cargo';
import { accepted, MAX_JOBS } from './state';
import { toast } from './hud';
import * as audio from './audio';

/* ===================================================================
   The job board. Take on up to 3 jobs at once — accepted[0] is the LIVE
   run (its green flag + crates are out); the others wait in your log
   (shown top-left). Finish the live one and the next goes live
   automatically, or switch to any queued job here. Host-authoritative —
   the matey's clicks arrive as net messages.
   =================================================================== */
export let questOpen = false;

/* host applies a job action; guests relay here. action: take/switch, or abandon */
type QuestAct = (route: number, action: 'take' | 'abandon') => void;
let actHandler: QuestAct = (route, action) => (action === 'abandon' ? abandonQuest(route) : acceptQuest(route));
export function setQuestHandlers(fn: QuestAct) { actHandler = fn; }

/* take a new job (or, if you already hold it, switch to running it) */
export function acceptQuest(route: number) {
  const r = ROUTES[route];
  if (!r) return;
  if (r.locked?.()) { toast('🔒 ' + (r.lockHint ?? 'this job is locked'), '#ff8787'); return; }
  if (accepted.includes(route)) { runNow(route); return; }
  if (accepted.length >= MAX_JOBS) { toast('Your hands are full — 3 jobs is the limit.', '#ff8787'); return; }
  const wasEmpty = accepted.length === 0;
  accepted.push(route);
  audio.dockedChime();
  if (wasEmpty) { setRoute(route); spawnBatch(); }                 // first job goes live (crates appear)
  else toast('Job accepted: ' + r.name + ' — switch to it whenever you like.', '#ffd95e');
  refreshQuest();
}

/* make an already-accepted job the live run */
export function runNow(route: number) {
  const at = accepted.indexOf(route);
  if (at < 0) return;
  if (at === 0) { toast(ROUTES[route].name + ' is already your active run.', '#dee2e6'); return; }
  accepted.splice(at, 1);
  accepted.unshift(route);                                         // move to the front = live
  setRoute(route);
  if (cratesLeft() === 0) spawnBatch();
  else toast('Now running ' + ROUTES[route].name + ' — carry your cargo to the new flag.', '#ffd95e');
  refreshQuest();
}

/* drop a job from the log */
export function abandonQuest(route: number) {
  const at = accepted.indexOf(route);
  if (at < 0) return;
  const wasLive = at === 0;
  accepted.splice(at, 1);
  if (wasLive) {
    resetCargo();                                                  // clear the dropped shipment
    if (accepted.length) { setRoute(accepted[0]); spawnBatch(); }
  }
  toast('Job abandoned.', '#dee2e6');
  refreshQuest();
}

/* cargo calls this once the live shipment is fully cleared */
export function questShipmentDone() {
  if (!accepted.length) return;
  accepted.shift();                                                // completed — off the list
  if (accepted.length) { setRoute(accepted[0]); spawnBatch(); }    // next job goes live
  refreshQuest();
}

const wrap = document.getElementById('questWrap')!;
const list = document.getElementById('questList')!;
export function toggleQuest() {
  questOpen = !questOpen;
  wrap.style.display = questOpen ? 'flex' : 'none';
  if (questOpen) { document.exitPointerLock?.(); refreshQuest(); }
}
document.getElementById('questClose')!.addEventListener('click', () => { if (questOpen) toggleQuest(); });

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
  const full = accepted.length >= MAX_JOBS;
  ROUTES.forEach((r, i) => {
    const dx = r.del.x - HOME_DOCK.x, dz = r.del.z - HOME_DOCK.z;
    const dist = Math.hypot(dx, dz) | 0;
    const t = tier(r.pay);
    const locked = !!r.locked?.();
    const at = accepted.indexOf(i);
    const live = at === 0;
    const queued = at > 0;
    const row = document.createElement('div');
    row.className = 'questrow' + (live ? ' active' : '') + (queued ? ' queued' : '') + (locked ? ' locked' : '');
    const tag = live ? '<span class="qslot">● RUNNING</span>'
      : queued ? '<span class="qslot q">#' + (at + 1) + ' in your log</span>' : '';
    row.innerHTML =
      '<div class="qdir" style="transform:rotate(' + Math.atan2(dx, -dz).toFixed(3) + 'rad)">➤</div>' +
      '<div class="qinfo">' +
        '<div class="qname">' + r.name + ' <span class="qdiff" style="background:' + t.col + '">' + t.label + '</span>' + tag + '</div>' +
        '<div class="qdesc">Carry crates <b>' + dist + 'm ' + cardinal(dx, dz) + '</b> to the green flag · ' + r.desc +
        (locked && r.lockHint ? ' · <span class="qlock">🔒 ' + r.lockHint + '</span>' : '') + '</div>' +
      '</div>' +
      '<div class="qpay"><b>' + r.pay + 'g</b><small> /crate</small><div class="qload">≈ ' + (r.pay * batchSize()) + 'g a load</div></div>';
    const btns = document.createElement('div');
    btns.className = 'qbtns';
    const main = document.createElement('button');
    main.textContent = locked ? '🔒 locked' : live ? 'RUNNING' : queued ? 'Run now' : full ? 'Log full' : 'Accept';
    main.disabled = locked || live || (full && at < 0);
    if (!main.disabled) main.addEventListener('click', () => actHandler(i, 'take'));
    btns.append(main);
    if (at >= 0) {                                   // a job you hold can be dropped
      const drop = document.createElement('button');
      drop.className = 'qdrop';
      drop.textContent = 'Abandon';
      drop.addEventListener('click', () => actHandler(i, 'abandon'));
      btns.append(drop);
    }
    row.append(btns);
    list.append(row);
  });
}
