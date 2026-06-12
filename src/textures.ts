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

/* tiling lacy sea-foam: bright cellular streaks on black, sampled by the water shader */
export function makeSeaFoamTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const g = cv.getContext('2d')!;
  g.fillStyle = '#000';
  g.fillRect(0, 0, 256, 256);
  // overlapping stroked cells make the lace; drawing 3x3 wrapped keeps it tileable
  const cells: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 46; i++) cells.push({ x: Math.random() * 256, y: Math.random() * 256, r: 9 + Math.random() * 26 });
  for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
    for (const cl of cells) {
      const x = cl.x + ox * 256, y = cl.y + oy * 256;
      if (x < -40 || x > 296 || y < -40 || y > 296) continue;
      g.strokeStyle = 'rgba(255,255,255,' + (0.35 + Math.random() * 0.45).toFixed(2) + ')';
      g.lineWidth = 1.5 + Math.random() * 2.5;
      g.beginPath();
      g.ellipse(x, y, cl.r, cl.r * (0.55 + Math.random() * 0.4), Math.random() * Math.PI, 0, Math.PI * 2);
      g.stroke();
    }
  }
  // soft bright patches so the lace has body
  for (let i = 0; i < 60; i++) {
    g.fillStyle = 'rgba(255,255,255,' + (0.12 + Math.random() * 0.25).toFixed(2) + ')';
    g.beginPath();
    g.arc(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 5, 0, Math.PI * 2);
    g.fill();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* tiling caustic web: thin bright light-lines on black, additive on the seabed */
export function makeCausticTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const g = cv.getContext('2d')!;
  g.fillStyle = '#000';
  g.fillRect(0, 0, 256, 256);
  g.lineCap = 'round';
  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < 24; i++) nodes.push({ x: Math.random() * 256, y: Math.random() * 256 });
  // wrap 3x3 so the web tiles seamlessly
  for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
    for (const nd of nodes) {
      const x = nd.x + ox * 256, y = nd.y + oy * 256;
      if (x < -50 || x > 306 || y < -50 || y > 306) continue;
      const arms = 3 + ((Math.random() * 3) | 0);
      for (let k = 0; k < arms; k++) {
        const a = Math.random() * Math.PI * 2, len = 14 + Math.random() * 30;
        g.strokeStyle = 'rgba(255,255,255,' + (0.14 + Math.random() * 0.2).toFixed(2) + ')';
        g.lineWidth = 1 + Math.random() * 1.6;
        g.beginPath();
        g.moveTo(x, y);
        g.quadraticCurveTo(
          x + Math.cos(a) * len * 0.5 + (Math.random() - 0.5) * 10,
          y + Math.sin(a) * len * 0.5 + (Math.random() - 0.5) * 10,
          x + Math.cos(a) * len, y + Math.sin(a) * len);
        g.stroke();
      }
      g.fillStyle = 'rgba(255,255,255,0.5)';
      g.beginPath();
      g.arc(x, y, 1.3 + Math.random() * 1.4, 0, Math.PI * 2);
      g.fill();
    }
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
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
