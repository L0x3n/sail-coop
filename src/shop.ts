import { BOATS } from './config';
import { boat, chars, game, netRole, owned, prefs, saveProgress } from './state';
import { HOME_DOCK } from './world';
import { setBoatPreset } from './shipMesh';
import { setHat } from './pirates';
import { toast } from './hud';
import * as audio from './audio';

/* ===================================================================
   The chaos shop. Hard rule: nothing in here makes sailing EASIER —
   purchases buy more chaos (more cargo, bigger hulls, sillier hats).
   Gold + ownership persist in the host's browser.
   =================================================================== */
export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  kind: 'ship' | 'upgrade' | 'hat';
  key?: keyof typeof owned;
  style?: string;        // hat style id
}
export const CATALOG: ShopItem[] = [
  { id: 'skiff', name: 'The Skiff', desc: 'small, twitchy, tips like a coin — 6 crates', price: 80, kind: 'ship', key: 'skiff' },
  { id: 'galleon', name: 'The Galleon', desc: 'huge, stately, turns next week — same crates, longer falls', price: 160, kind: 'ship', key: 'galleon' },
  { id: 'bigDeck', name: 'Bigger cargo deck', desc: '+4 crates per shipment. More money, more deck to lose it on.', price: 120, kind: 'upgrade', key: 'bigDeck' },
  { id: 'chartNorth', name: 'Northern chart', desc: 'unlocks the North Light route — 32g a crate, long haul', price: 60, kind: 'upgrade', key: 'chartNorth' },
  { id: 'hatStraw', name: 'Straw hat', desc: 'beach mode. Flies off when you get bonked.', price: 30, kind: 'hat', key: 'hatStraw', style: 'straw' },
  { id: 'hatFancy', name: 'Admiral tricorn', desc: 'gold trim. The gulls aim for it.', price: 45, kind: 'hat', key: 'hatFancy', style: 'fancy' },
];

/* host applies purchases; the matey's clicks arrive as net messages */
export function tryBuy(id: string) {
  const item = CATALOG.find(i => i.id === id);
  if (!item || !item.key) return;
  if (owned[item.key]) { toast('Already owned.', '#dee2e6'); return; }
  if (game.gold < item.price) { toast('Not enough gold (' + game.gold + '/' + item.price + 'g)', '#ff8787'); return; }
  game.gold -= item.price;
  owned[item.key] = true;
  saveProgress();
  audio.dockedChime();
  toast('Bought: ' + item.name + '!', '#aef7a2');
  refreshShop();
}

/* equipping — ships are host-only and only at the home mooring */
let shipRelay: ((id: string) => void) | null = null;
export function setShipRelay(fn: (id: string) => void) { shipRelay = fn; }
export function equipShip(id: string) {
  if (netRole === 'guest') { toast('Only the host can swap the hull.', '#dee2e6'); return; }
  if (id !== 'sloop' && !owned[id as keyof typeof owned]) return;
  if (Math.hypot(boat.pos.x - HOME_DOCK.x, boat.pos.z - HOME_DOCK.z) > 26 || !boat.anchored) {
    toast('Hull swaps happen at the home mooring, anchor down.', '#ff8787');
    return;
  }
  const preset = BOATS.find(b => b.id === id);
  if (!preset) return;
  prefs.ship = id;
  saveProgress();
  setBoatPreset(preset);
  if (shipRelay) shipRelay(id);
  toast('Hull swapped: ' + preset.name + '!', '#aef7a2');
  refreshShop();
}
export function equipHat(charIdx: number, style: string) {
  const item = CATALOG.find(i => i.style === style);
  if (item && item.key && !owned[item.key] && style !== 'captain' && style !== 'bandana') return;
  setHat(chars[charIdx], style);
  prefs.hats[charIdx] = style;
  saveProgress();
  refreshShop();
}

/* --- the DOM panel --- */
export let shopOpen = false;
let buyHandler: (id: string) => void = tryBuy;
let hatHandler: (style: string) => void = s => equipHat(0, s);
export function setShopHandlers(buy: (id: string) => void, hat: (style: string) => void) {
  buyHandler = buy;
  hatHandler = hat;
}
const wrap = document.getElementById('shopWrap')!;
const list = document.getElementById('shopList')!;
export function toggleShop() {
  shopOpen = !shopOpen;
  wrap.style.display = shopOpen ? 'flex' : 'none';
  if (shopOpen) {
    document.exitPointerLock?.();
    refreshShop();
  }
}
document.getElementById('shopClose')!.addEventListener('click', () => { if (shopOpen) toggleShop(); });

export function refreshShop() {
  if (!shopOpen) return;
  document.getElementById('shopGold')!.textContent = game.gold + 'g';
  list.innerHTML = '';
  const myIdx = netRole === 'guest' ? 1 : 0;
  // base hats are always wearable
  const rows: { name: string; desc: string; right: string; cb?: () => void }[] = [];
  for (const item of CATALOG) {
    const has = item.key ? owned[item.key] : false;
    if (item.kind === 'hat') {
      rows.push({
        name: item.name, desc: item.desc,
        right: has ? (prefs.hats[myIdx] === item.style ? 'WORN' : 'Wear') : item.price + 'g',
        cb: has ? () => hatHandler(item.style!) : () => buyHandler(item.id),
      });
    } else if (item.kind === 'ship') {
      rows.push({
        name: item.name, desc: item.desc,
        right: has ? (prefs.ship === item.id ? 'IN USE' : 'Use') : item.price + 'g',
        cb: has ? () => equipShip(item.id) : () => buyHandler(item.id),
      });
    } else {
      rows.push({
        name: item.name, desc: item.desc,
        right: has ? 'OWNED' : item.price + 'g',
        cb: has ? undefined : () => buyHandler(item.id),
      });
    }
  }
  rows.push({ name: 'Back to the sloop', desc: 'the trusty default', right: prefs.ship === 'sloop' ? 'IN USE' : 'Use', cb: () => equipShip('sloop') });
  for (const r of rows) {
    const row = document.createElement('div');
    row.className = 'shoprow';
    const left = document.createElement('div');
    left.innerHTML = '<b>' + r.name + '</b><br><span>' + r.desc + '</span>';
    const btn = document.createElement('button');
    btn.textContent = r.right;
    btn.disabled = !r.cb || r.right === 'WORN' || r.right === 'IN USE' || r.right === 'OWNED';
    if (r.cb) btn.addEventListener('click', r.cb);
    row.append(left, btn);
    list.append(row);
  }
}
