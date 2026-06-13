import { boat, game, myChar, session } from './state';
import { DELIVERY } from './world';
import { toast } from './hud';

/* ===================================================================
   Lightweight, diegetic onboarding: a chain of one-line hints that
   fire JUST-IN-TIME off real game state, only on a player's very first
   voyage. Each line appears the moment its situation arises (boarding,
   the anchor blocking you, the rudder needing speed, getting stuck head
   to wind, arriving with cargo). Gated by localStorage so a veteran
   never sees them again. No modals, no forced tutorial — it teaches the
   sailing MODEL the action-prompts can't.
   =================================================================== */
const KEY = 'sail.taught';
let done = (() => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } })();
const shown = new Set<string>();
let playT = 0, tackT = 0;

function say(id: string, text: string, color = '#ffe066') {
  if (shown.has(id)) return;
  shown.add(id);
  toast(text, color);
}

export function updateOnboarding(dt: number) {
  if (done) { playT = 0; return; }
  if (session.inMenu) { playT = 0; tackT = 0; return; }
  playT += dt;
  const c = myChar();
  const speed = Math.hypot(boat.vel.x, boat.vel.z);

  // 1. boarding — let the "shipment ready" toast land first, then nudge
  if (playT > 3 && c.mode === 'shore' && c.carry < 0)
    say('board', 'Step off the pier onto the deck to climb aboard.');

  // 2. the anchor is why she won't move
  if (c.mode === 'deck' && boat.anchored)
    say('anchor', "Anchor's down — head to the bow and press E to weigh it.");

  // 3. the rudder is dead until you have way on
  if (c.station === 'helm' && !boat.anchored && speed < 0.6)
    say('rudder', 'The rudder only bites once you are moving — trim the sail (E at the mast) to get going.');

  // 4. THE one that matters: you cannot sail straight into the wind
  if (boat.noGo && !boat.anchored) {
    tackT += dt;
    if (tackT > 1.3)
      say('tack', 'You cannot sail straight into the wind! Steer ~45° off it and zig-zag — that is tacking.', '#ffd43b');
  } else tackT = 0;

  // 5. arriving with cargo: park and carry it ashore
  if (c.carry >= 0 && c.mode === 'deck' &&
      Math.hypot(DELIVERY.x - boat.pos.x, DELIVERY.z - boat.pos.z) < 45)
    say('deliver', 'Nearly there — stop the boat, drop anchor, then carry crates onto the green flag.', '#aef7a2');

  // graduate for good once the first crate is delivered
  if (game.delivered > 0) {
    done = true;
    try { localStorage.setItem(KEY, '1'); } catch { /* private mode */ }
  }
}
