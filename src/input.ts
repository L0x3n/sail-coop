import { CONFIG } from './config';
import { clamp, wrapPi } from './mathUtil';
import { gameStarted, myChar, session } from './state';
import { ensureAudio, toggleMute } from './audio';
import { renderer } from './scene';
import type { Axes } from './types';

export const keys: Record<string, boolean> = Object.create(null);
export const pressedQueue: string[] = [];

window.addEventListener('keydown', e => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'ShiftRight'].includes(e.code)) e.preventDefault();
  if (!keys[e.code]) pressedQueue.push(e.code);
  keys[e.code] = true;
  ensureAudio();
  if (e.code === 'KeyN') toggleMute();   // M is the map now
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

/* --- mouse look: pointer lock when the browser allows it, drag-to-look fallback
       otherwise (embedded panels/iframes often deny pointer lock silently) --- */
export let dragLook = false;
document.addEventListener('mousedown', e => {
  if (!gameStarted()) return;
  dragLook = true;
  if (e.button === 0) {                     // LMB doubles as the "use" button (scrub/whack)
    if (!keys['Mouse0']) pressedQueue.push('Mouse0');
    keys['Mouse0'] = true;
  }
  if (!document.pointerLockElement) {
    try {
      const p = renderer.domElement.requestPointerLock() as unknown as Promise<void> | undefined;
      if (p && typeof p.catch === 'function') p.catch(() => {});   // denied -> drag fallback covers it
    } catch { /* ignored */ }
  }
});
document.addEventListener('mouseup', e => {
  dragLook = false;
  if (e.button === 0) keys['Mouse0'] = false;
});
/* while you hold someone, the mouse DRAGS them instead of looking around */
export const localDrag = { x: 0, y: 0 };
document.addEventListener('mousemove', e => {
  if (session.inMenu) return;
  if (!document.pointerLockElement && !dragLook) return;
  const c = myChar();
  if (c.holding) {
    localDrag.x += e.movementX;
    localDrag.y += e.movementY;
    return;
  }
  // yaw increases counter-clockwise in this convention -> mouse right = decrease
  c.facing = wrapPi(c.facing - e.movementX * CONFIG.mouseSens);
  c.pitch = clamp(c.pitch - e.movementY * CONFIG.mouseSens, -1.15, 1.15);
});

/* FPS movement: WASD strafe/walk relative to the mouse-look direction, Space jumps */
export function inputAxes(): Axes {
  return {
    fwd: (keys['KeyW'] ? 1 : 0) - (keys['KeyS'] ? 1 : 0),
    strafe: (keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0),
    j: keys['Space'] ? 1 : 0,
    h: keys['KeyF'] ? 1 : 0,
    u: keys['Mouse0'] ? 1 : 0,
  };
}
export const ZERO_AXES: Axes = { fwd: 0, strafe: 0, j: 0, h: 0, u: 0 };
