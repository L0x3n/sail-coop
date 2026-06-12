import { lerp, wrapPi } from './mathUtil';
import { boat, env, netRole, session, wind } from './state';
import { DELIVERY, HOME_DOCK } from './world';
import { gullSwarm } from './critters';
import { respawnPending } from './cargo';
import { toast } from './hud';
import * as audio from './audio';

/* ===================================================================
   The event director. Wave-shaped rhythm: calm → forewarning → spike →
   recovery. Never fires near the piers (loading/unloading is sacred calm)
   and never during a batch summary. Host-side; effects ride existing sync
   (wind strength, toasts, splat fx) plus env.bigWave in snapshots.
   =================================================================== */
type Ev = 'gust' | 'swarm' | 'wave';
export const director = {
  phase: 'calm' as 'calm' | 'warn' | 'active' | 'cool',
  timer: 18 + Math.random() * 12,        // first spike comes reasonably soon
  current: 'gust' as Ev,
  gustTarget: 1,
  gustVeer: 0,
  waveDir: 1,
  waveDur: 5.5,
  activeDur: 1,
  log: [] as { ev: Ev; at: number }[],
};

const nearPiers = () =>
  Math.hypot(boat.pos.x - HOME_DOCK.x, boat.pos.z - HOME_DOCK.z) < 26 ||
  Math.hypot(boat.pos.x - DELIVERY.x, boat.pos.z - DELIVERY.z) < 26;

function pickEvent(): Ev {
  const r = Math.random();
  return r < 0.4 ? 'gust' : r < 0.7 ? 'swarm' : 'wave';
}

export function updateDirector(dt: number) {
  if (netRole === 'guest') return;
  const D = director;

  // smooth the gust multiplier toward its target at all times
  env.gustMul = lerp(env.gustMul, D.phase === 'active' && D.current === 'gust' ? D.gustTarget : 1,
    Math.min(1, 0.9 * dt));
  if (!(D.phase === 'active' && D.current === 'wave')) {
    env.bigWave = lerp(env.bigWave, 0, Math.min(1, 3 * dt));
  }

  // the calm is sacred near the piers and during summaries
  if (D.phase === 'calm' && (session.inMenu || nearPiers() || respawnPending())) return;

  D.timer -= dt;
  if (D.timer > 0) {
    if (D.phase === 'active') applyActive(dt);
    return;
  }

  switch (D.phase) {
    case 'calm': {
      D.current = pickEvent();
      D.phase = 'warn';
      D.timer = 3.5;
      if (D.current === 'gust') {
        toast('Dark water to windward — GUST incoming!', '#74c0fc');
        audio.creak(1.2);
      } else if (D.current === 'swarm') {
        toast('A gull swarm darkens the sky…', '#dee2e6');
        audio.gullCry();
        setTimeout(() => audio.gullCry(), 350);
        setTimeout(() => audio.gullCry(), 800);
      } else {
        toast('A LONG SWELL rolls in — hold on to something!', '#74c0fc');
      }
      break;
    }
    case 'warn': {
      D.phase = 'active';
      D.log.push({ ev: D.current, at: session.simT });
      if (D.current === 'gust') {
        D.activeDur = 11;
        D.gustTarget = 1.9 + Math.random() * 0.4;
        D.gustVeer = (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 0.35);
      } else if (D.current === 'swarm') {
        D.activeDur = 3;
        gullSwarm(5 + Math.floor(Math.random() * 4));
      } else {
        D.activeDur = D.waveDur = 5.5;
        D.waveDir = Math.random() < 0.5 ? -1 : 1;
      }
      D.timer = D.activeDur;
      break;
    }
    case 'active': {
      D.phase = 'cool';
      D.timer = 8 + Math.random() * 8;
      break;
    }
    case 'cool': {
      D.phase = 'calm';
      D.timer = 24 + Math.random() * 18;
      break;
    }
  }
}

function applyActive(dt: number) {
  const D = director;
  if (D.current === 'gust') {
    wind.angle = wrapPi(wind.angle + (D.gustVeer / 11) * dt);
  } else if (D.current === 'wave') {
    const progress = 1 - D.timer / D.waveDur;
    env.bigWave = Math.sin(progress * Math.PI) * D.waveDir;
  }
}
