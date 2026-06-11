import * as THREE from 'three';
import { CONFIG, DECK_Y } from './config';
import { cam1 } from './scene';
import { boatGroup, heelGroup } from './shipMesh';
import { myChar, session } from './state';
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
  } else {
    // bobbing at the waterline
    cam.position.set(c.pos.x, 0.5 + Math.sin(t * 2.6 + c.pos.x) * 0.12, c.pos.z);
    _qy.setFromAxisAngle(Y_UP, c.facing + Math.PI);
    _qp.setFromAxisAngle(X_AX, c.pitch); _qy.multiply(_qp);
    if (c.knock > 0) { _qr.setFromAxisAngle(Z_AX, 0.5); _qy.multiply(_qr); }
    cam.quaternion.copy(_qy);
  }
}

export function updateCameras(dt: number, t: number) {
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
