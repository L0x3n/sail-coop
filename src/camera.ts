import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { cam1 } from './scene';
import { boatGroup, heelGroup } from './shipMesh';
import { myChar, session } from './state';
import { SHORE_Y } from './world';
import { WATER_EYE, groundAt } from './simChars';
import { spawnDroplets } from './effects';
import type { Char } from './types';

/* =========================== first-person camera =========================== */
const _eyeV = new THREE.Vector3(), _q = new THREE.Quaternion();
const _qy = new THREE.Quaternion(), _qr = new THREE.Quaternion(), _qp = new THREE.Quaternion();
const Y_UP = new THREE.Vector3(0, 1, 0), Z_AX = new THREE.Vector3(0, 0, 1), X_AX = new THREE.Vector3(1, 0, 0);

export function updateFPCamera(c: Char, cam: THREE.PerspectiveCamera, t: number) {
  if (c.mode === 'deck') {
    // eye rides the deck: position + orientation inherit the boat's yaw AND heel
    let ey = DECK_Y + CONFIG.eyeHeight + c.jumpY;
    if (c.knock > 0) ey = DECK_Y + 0.5;
    else if (c.jumpY <= 0.0001 && Math.hypot(c.vel.x, c.vel.z) > 0.4)
      ey += Math.abs(Math.sin(c.walkPhase)) * CONFIG.headBob;
    _eyeV.set(c.pos.x, ey, c.pos.z);
    boatGroup.updateMatrixWorld();
    heelGroup.localToWorld(_eyeV);
    cam.position.copy(_eyeV);
    heelGroup.getWorldQuaternion(_q);
    _qy.setFromAxisAngle(Y_UP, c.facing + Math.PI);   // camera looks -z; +PI flips to facing
    _q.multiply(_qy);
    _qp.setFromAxisAngle(X_AX, c.pitch); _q.multiply(_qp);
    if (c.knock > 0) { _qr.setFromAxisAngle(Z_AX, 0.55); _q.multiply(_qr); }
    cam.quaternion.copy(_q);
  } else if (c.mode === 'shore') {
    // standing on a pier or an island beach: world-space first person
    const g = groundAt(c.pos.x, c.pos.z) ?? SHORE_Y;
    let ey = g + CONFIG.eyeHeight + c.jumpY;
    if (c.knock > 0) ey = g + 0.5;
    else if (c.jumpY <= 0.0001 && Math.hypot(c.vel.x, c.vel.z) > 0.4)
      ey += Math.abs(Math.sin(c.walkPhase)) * CONFIG.headBob;
    cam.position.set(c.pos.x, ey, c.pos.z);
    _qy.setFromAxisAngle(Y_UP, c.facing + Math.PI);
    _qp.setFromAxisAngle(X_AX, c.pitch); _qy.multiply(_qp);
    if (c.knock > 0) { _qr.setFromAxisAngle(Z_AX, 0.55); _qy.multiply(_qr); }
    cam.quaternion.copy(_qy);
  } else {
    // at the waterline — but if you just came off the deck/shore, c.jumpY holds
    // the leftover fall height so the eye DROPS into the water instead of snapping
    const settling = c.jumpY > 0.05;
    const bob = settling ? 0 : Math.sin(t * 2.6 + c.pos.x) * 0.12;
    cam.position.set(c.pos.x, WATER_EYE + c.jumpY + bob, c.pos.z);
    _qy.setFromAxisAngle(Y_UP, c.facing + Math.PI);
    _qp.setFromAxisAngle(X_AX, c.pitch); _qy.multiply(_qp);
    if (c.knock > 0) { _qr.setFromAxisAngle(Z_AX, 0.5); _qy.multiply(_qr); }
    cam.quaternion.copy(_qy);
  }
}

/* =========================== cinematic menu camera =========================== */
const _mTgt = new THREE.Vector3();
const _mFwd = new THREE.Vector3();
let spray = 0;
function updateMenuCamera(cam: THREE.PerspectiveCamera, t: number, dt: number) {
  // slow orbit over the water, always facing the home island + village
  _mTgt.set(0, 5, -236);
  const a = Math.sin(t * 0.045) * 0.6;            // gentle side-to-side sweep
  const R = 42 + Math.sin(t * 0.03) * 5;          // breathing dolly in/out
  cam.position.set(Math.sin(a) * R, 4.4 + Math.sin(t * 0.45) * 0.25, -236 + Math.cos(a) * R);
  cam.lookAt(_mTgt);
  // sea spray drifting up toward the lens for a premium, alive feel
  spray -= dt;
  if (spray <= 0) {
    spray = 0.28;
    _mFwd.set(_mTgt.x - cam.position.x, 0, _mTgt.z - cam.position.z).normalize();
    const px = cam.position.x + _mFwd.x * 8 + (Math.random() - 0.5) * 9;
    const pz = cam.position.z + _mFwd.z * 8 + (Math.random() - 0.5) * 9;
    spawnDroplets(px, pz, 5, 3.0, 4.4);
  }
}

export function updateCameras(dt: number, t: number) {
  if (session.inMenu) { updateMenuCamera(cam1, t, dt); return; }
  updateFPCamera(myChar(), cam1, t);
  if (session.shake > 0.001) {
    cam1.position.x += (Math.random() - 0.5) * session.shake * 0.7;
    cam1.position.y += (Math.random() - 0.5) * session.shake * 0.5;
    cam1.position.z += (Math.random() - 0.5) * session.shake * 0.7;
    _qr.setFromAxisAngle(Z_AX, (Math.random() - 0.5) * session.shake * 0.22);
    cam1.quaternion.multiply(_qr);
    session.shake *= Math.exp(-2.6 * dt);
  }
}
