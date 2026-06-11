import * as THREE from 'three';

/* Procedural canvas textures — no external assets. */

export function makePlankTexture(base = '#9a6b42', gap = '#6b4226', w = 256, h = 256, planks = 8): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const ph = h / planks;
  for (let i = 0; i < planks; i++) {
    const y = i * ph;
    // per-plank tint
    const tint = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    ctx.fillStyle = `rgba(0,0,0,${0.05 + Math.abs(tint) * 0.08})`;
    ctx.fillRect(0, y, w, ph);
    // grain
    ctx.strokeStyle = 'rgba(60,35,15,0.25)';
    ctx.lineWidth = 1;
    for (let g = 0; g < 5; g++) {
      const gy = y + (g + 0.5) * ph / 5 + Math.sin(i * 3 + g) * 1.5;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      for (let x = 0; x <= w; x += 16) ctx.lineTo(x, gy + Math.sin((x + i * 40) * 0.05) * 1.2);
      ctx.stroke();
    }
    // seam
    ctx.fillStyle = gap;
    ctx.fillRect(0, y, w, 2);
    // butt joints
    ctx.fillRect(((i * 97) % w), y, 2, ph);
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function makeSailTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = 128; cv.height = 256;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = '#f3eddc';
  ctx.fillRect(0, 0, 128, 256);
  // cloth panels
  ctx.strokeStyle = 'rgba(150,130,95,0.35)';
  ctx.lineWidth = 2;
  for (let y = 32; y < 256; y += 36) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke();
  }
  // two tan bands for character
  ctx.fillStyle = 'rgba(196,148,90,0.30)';
  ctx.fillRect(0, 84, 128, 22);
  ctx.fillRect(0, 176, 128, 22);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function makeFoamSprite(): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 64;
  const ctx = cv.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}
