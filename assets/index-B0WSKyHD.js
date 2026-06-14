function u_(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const s in i)if(s!=="default"&&!(s in n)){const r=Object.getOwnPropertyDescriptor(i,s);r&&Object.defineProperty(n,s,r.get?r:{enumerable:!0,get:()=>i[s]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const zt=Math.PI*2,ns=Math.PI/180,f_=180/Math.PI,je=(n,e,t)=>n<e?e:n>t?t:n,Ut=(n,e,t)=>n+(e-n)*t;function bt(n){return n=(n+Math.PI)%zt,n<0&&(n+=zt),n-Math.PI}function Fp(n,e,t){const i=je((t-n)/(e-n),0,1);return i*i*(3-2*i)}function Bp(n){return n=Math.max(0,n|0),(n/60|0)+":"+String(n%60).padStart(2,"0")}const nt=(n=0,e=0)=>({x:n,z:e}),ac=(n,e)=>n.x*e.x+n.z*e.z,Dh=n=>Math.hypot(n.x,n.z),Xt=n=>nt(Math.sin(n),Math.cos(n)),On=n=>nt(Math.cos(n),-Math.sin(n)),F={windStrength:14,windWander:3,windStrengthWobble:.18,sailPower:.23,noGoHalfAngle:40,boomMax:80,boomRate:55,windageDrift:.01,fwdDragQuad:.04,fwdDragLin:.06,latResist:2.6,leeway:.05,rudderMax:40,rudderRate:80,rudderAuthority:.15,yawDamp:1.25,turnDrag:.45,maxHeel:.24,heelLerp:1.6,turnHeel:.55,bobAmp:.14,bobPitch:.022,walkAccel:30,walkDamp:8.5,slideDampDown:1.6,inertiaScale:1.5,heelSlide:26,stumbleThresh:7,knockTime:1.2,swimSpeed:2,wobbleSlide:.28,jumpVel:4.8,gravity:15,airControl:.34,jumpBoost:.85,swimLeash:50,poopInterval:21,poopIntervalVar:8,splatsPerPassMax:3,poopSlip:3,poopTraction:.35,poopDampLoss:.3,splatRadius:.5,scrubTime:1.5,scrubRange:.95,mopCarrySlow:.82,mopPickupR:1.25,mopThrowForce:8.5,mopThrowArc:3.2,whackRange:1.7,whackKnock:1.2,whackKick:4.2,whackCooldown:.6,grabRange:1.6,grabCarrySlow:.5,victimInput:.5,escapeMash:4,dragSens:.0045,dragPull:11,stationGripPull:3.5,stationDragOff:.9,throwForce:3.5,throwArc:2,bounceRestitution:.55,bounceKick:5.5,hardHitSpeed:2.2,dockSpeed:1.2,dockHold:1,fov:75,eyeHeight:1.32,mouseSens:.0024,headBob:.06,cannonReload:3,cannonSpeed:30,cannonTraverse:1.1,cannonRecoil:.6,cannonBreech:1,bargeRope:7,bargePull:3.2,bargeDragBack:.22,bargeYawTug:.05,bargeLatDamp:.5,bargeCapsizeRoll:.5,bargeRightT:10,islandDist:260,islandRadius:38},Gp=8.6,Hp=3.2,Xe=1,yc=1.3,Vp=3.35,d_=.62,Wp=[{z0:-.6,z1:1.4}],Af=nt(0,.6),p_=1.15,ki=[{id:"skiff",name:"Skiff",scale:1.44,crates:4,desc:"Small & nimble — turns on a coin, tips like one too",tune:{sailPower:.215,rudderAuthority:.24,turnDrag:.34,maxHeel:.31,heelSlide:30,fwdDragQuad:.036,yawDamp:1.1}},{id:"sloop",name:"Sloop",scale:2,crates:6,desc:"The trusty all-rounder",tune:{}},{id:"galleon",name:"Galleon",scale:2.84,crates:14,desc:"Huge & stately — plan your turns a week ahead",tune:{sailPower:.27,rudderAuthority:.085,turnDrag:.52,maxHeel:.17,heelSlide:20,fwdDragQuad:.047,yawDamp:1.45}}],ue={scale:1,deckX:yc,deckZ:Vp,hullW:Hp,hullL:Gp,helm:nt(0,-2.65),sailSta:nt(0,1.45),cannonSta:nt(-yc+1.35,-1.3),gaps:Wp.map(n=>({...n}))};function m_(n){ue.scale=n,ue.deckX=yc*n,ue.deckZ=Vp*n,ue.hullW=Hp*n,ue.hullL=Gp*n,ue.helm=nt(0,-2.65*n),ue.sailSta=nt(0,1.45*n),ue.cannonSta=nt(-yc*n+1.35,-1.3*n),ue.gaps=Wp.map(e=>({z0:e.z0*n,z1:e.z1*n}))}const Mc={crates:6},hn={sailPower:F.sailPower,rudderAuthority:F.rudderAuthority,turnDrag:F.turnDrag,maxHeel:F.maxHeel,heelSlide:F.heelSlide,fwdDragQuad:F.fwdDragQuad,yawDamp:F.yawDamp};function g_(n){hn.sailPower=F.sailPower,hn.rudderAuthority=F.rudderAuthority,hn.turnDrag=F.turnDrag,hn.maxHeel=F.maxHeel,hn.heelSlide=F.heelSlide,hn.fwdDragQuad=F.fwdDragQuad,hn.yawDamp=F.yawDamp,Object.assign(hn,n)}const Ih={x:0,y:0},_s=[];function zh(n,e){for(const t of _s)if(Math.hypot(t.x-n,t.z-e)<F.splatRadius)return!0;return!1}const lt={weatherId:0,weatherLerp:0,windMul:1,swell:1,darkness:0,gustMul:1,bigWave:0},P={pos:nt(4.8,-206),yaw:0,vel:nt(),angVel:0,anchored:!0,rudder:0,boomAngle:20*Math.PI/180,heel:0,lastAccel:nt(),lastAngAccel:0,sailForce:0,luffing:!0,noGo:!1},dt={angle:0,strength:F.windStrength};function Xp(){const n=bt(dt.angle-P.yaw),e=180-Math.abs(n)*180/Math.PI;return{d:n,offWind:e,noGo:e<F.noGoHalfAngle,idealBoom:Math.sign(n||1)*(Math.PI-Math.abs(n))/2}}const Oe={runTime:0,docked:!1,dockTimer:0,shake:0,started:!1,inMenu:!0,simT:0},xt={gold:0,delivered:0,lost:0,batch:0,batchT:0},Ht=[],qp=3,Ke={skiff:!1,galleon:!1,bigDeck:!1,chartNorth:!1,hatStraw:!1,hatFancy:!1,cannon:!1,barge:!1,mopQuick:!1,mopLong:!1,mopGold:!1},Jt={ship:"sloop",hats:["captain","bandana"],barge:!1};function tr(){try{localStorage.setItem("sail.save",JSON.stringify({gold:xt.gold,owned:Ke,prefs:Jt}))}catch{}}function __(){const n=localStorage.getItem("sail.save");if(!n)return"none";try{const e=JSON.parse(n);if(Number.isFinite(e.gold)&&(xt.gold=Math.max(0,Math.floor(e.gold))),e.owned)for(const t of Object.keys(Ke))Ke[t]=!!e.owned[t];return e.prefs?.ship&&(Jt.ship=e.prefs.ship),Array.isArray(e.prefs?.hats)&&(Jt.hats=e.prefs.hats.filter(t=>typeof t=="string")),typeof e.prefs?.barge=="boolean"&&(Jt.barge=e.prefs.barge),"ok"}catch{try{localStorage.setItem("sail.save.bak",n)}catch{}return"corrupt"}}const v_=__();try{v_==="none"&&localStorage.getItem("sail.grant1k")!=="1"&&(xt.gold+=1e3,localStorage.setItem("sail.grant1k","1"),tr())}catch{}let At=null;function Wc(n){At=n}const nr=4,qe=[];let zs;function x_(...n){qe.push(...n),zs=n[0],n[1]}const Fn=Array.from({length:nr},(n,e)=>e===0);function ha(n,e){n>=0&&n<Fn.length&&(Fn[n]=e)}function y_(n){for(let e=0;e<Fn.length;e++)Fn[e]=e===0?!0:!!n[e]}const Xc=()=>{for(let n=1;n<Fn.length;n++)if(Fn[n])return!0;return!1};let xu=!1;function yu(n){xu=n}let Yp=0;function qc(n){Yp=n}const Yn=()=>qe[Yp]??qe[0],zn=n=>{const e=qe.indexOf(n);return e===0||e>0&&Fn[e]},M_=()=>!Oe.inMenu;function Mu(n){let e,t=1/0;for(const i of qe){if(i===n)continue;const s=(i.pos.x-n.pos.x)**2+(i.pos.z-n.pos.z)**2;s<t&&(t=s,e=i)}return e}let Te=null,gt=null,Go=null,Br=null,Nr=localStorage.getItem("sail.muted")==="1",Uh=0;function vs(n,e){const t=n.createBuffer(1,n.sampleRate*e,n.sampleRate),i=t.getChannelData(0);let s=0;for(let r=0;r<i.length;r++){const o=Math.random()*2-1;s=(s+.02*o)/1.02,i[r]=s*3.5}return t}function Yc(){if(Te)return;try{Te=new AudioContext}catch{return}gt=Te.createGain(),gt.gain.value=Nr?0:1,gt.connect(Te.destination);const n=vs(Te,2.5),e=Te.createBufferSource();e.buffer=n,e.loop=!0;const t=Te.createBiquadFilter();t.type="bandpass",t.frequency.value=480,t.Q.value=.55,Go=Te.createGain(),Go.gain.value=0,e.connect(t).connect(Go).connect(gt),e.start();const i=Te.createBufferSource();i.buffer=n,i.loop=!0,i.playbackRate.value=.55;const s=Te.createBiquadFilter();s.type="lowpass",s.frequency.value=220,Br=Te.createGain(),Br.gain.value=.03;const r=Te.createOscillator();r.frequency.value=.16;const o=Te.createGain();o.gain.value=.015,r.connect(o).connect(Br.gain),i.connect(s).connect(Br).connect(gt),i.start(),r.start()}let yl=0;function S_(n,e,t,i=0){Uh-=n,yl-=n,!(!Te||!Go||!Br)&&(Go.gain.value=Math.min(.13,e*.0042+t*.004),Br.gain.value=Math.min(.08,.028+t*.0045),i>.5&&yl<=0&&(yl=.35+Math.random()*.35,b_()))}function b_(){if(!Te||!gt)return;const n=Te.currentTime,e=Te.createBufferSource();e.buffer=vs(Te,.12);const t=Te.createBiquadFilter();t.type="bandpass",t.frequency.value=900,t.Q.value=.8;const i=Te.createGain();i.gain.setValueAtTime(.06,n),i.gain.exponentialRampToValueAtTime(.001,n+.12),e.connect(t).connect(i).connect(gt),e.start(n),e.stop(n+.13)}function Ho(){if(!Te||!gt)return;const n=Te.currentTime;for(let e=0;e<2;e++){const t=Te.createOscillator(),i=Te.createGain();t.type="sawtooth";const s=n+e*.22;t.frequency.setValueAtTime(1150-e*120,s),t.frequency.exponentialRampToValueAtTime(640-e*60,s+.18),i.gain.setValueAtTime(1e-4,s),i.gain.exponentialRampToValueAtTime(.035,s+.03),i.gain.exponentialRampToValueAtTime(.001,s+.2),t.connect(i).connect(gt),t.start(s),t.stop(s+.22)}}function w_(){if(!Te||!gt)return;const n=Te.currentTime,e=Te.createBufferSource();e.buffer=vs(Te,.2);const t=Te.createBiquadFilter();t.type="lowpass",t.frequency.setValueAtTime(1400,n),t.frequency.exponentialRampToValueAtTime(180,n+.12);const i=Te.createGain();i.gain.setValueAtTime(.16,n),i.gain.exponentialRampToValueAtTime(.001,n+.16),e.connect(t).connect(i).connect(gt),e.start(n),e.stop(n+.18);const s=Te.createOscillator(),r=Te.createGain();s.type="sine",s.frequency.setValueAtTime(300,n),s.frequency.exponentialRampToValueAtTime(70,n+.1),r.gain.setValueAtTime(.08,n),r.gain.exponentialRampToValueAtTime(.001,n+.12),s.connect(r).connect(gt),s.start(n),s.stop(n+.13)}function T_(){if(!Te||!gt)return;const n=Te.currentTime,e=Te.createBufferSource();e.buffer=vs(Te,.3);const t=Te.createBiquadFilter();t.type="highpass",t.frequency.value=900;const i=Te.createGain();i.gain.setValueAtTime(.16,n),i.gain.exponentialRampToValueAtTime(.001,n+.25),e.connect(t).connect(i).connect(gt),e.start(n),e.stop(n+.3);const s=Te.createBufferSource();s.buffer=vs(Te,2.4),s.playbackRate.value=.4;const r=Te.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(300,n),r.frequency.exponentialRampToValueAtTime(70,n+2);const o=Te.createGain();o.gain.setValueAtTime(1e-4,n),o.gain.exponentialRampToValueAtTime(.2,n+.12),o.gain.exponentialRampToValueAtTime(.001,n+2.2),s.connect(r).connect(o).connect(gt),s.start(n),s.stop(n+2.4)}function jp(){if(!Te||!gt)return;const n=Te.currentTime,e=Te.createBufferSource();e.buffer=vs(Te,.25);const t=Te.createBiquadFilter();t.type="lowpass",t.frequency.value=1400;const i=Te.createGain();i.gain.setValueAtTime(.3,n),i.gain.exponentialRampToValueAtTime(.001,n+.22),e.connect(t).connect(i).connect(gt),e.start(n),e.stop(n+.25);const s=Te.createOscillator(),r=Te.createGain();s.type="sine",s.frequency.setValueAtTime(110,n),s.frequency.exponentialRampToValueAtTime(38,n+.35),r.gain.setValueAtTime(.32,n),r.gain.exponentialRampToValueAtTime(.001,n+.4),s.connect(r).connect(gt),s.start(n),s.stop(n+.42)}function Su(){if(!Te||!gt)return;const n=Te.currentTime,e=Te.createOscillator(),t=Te.createGain(),i=Te.createBiquadFilter();e.type="square",e.frequency.setValueAtTime(180,n),e.frequency.exponentialRampToValueAtTime(55,n+.09),i.type="lowpass",i.frequency.value=800,t.gain.setValueAtTime(.18,n),t.gain.exponentialRampToValueAtTime(.001,n+.12),e.connect(i).connect(t).connect(gt),e.start(n),e.stop(n+.13);const s=Te.createBufferSource();s.buffer=vs(Te,.08);const r=Te.createGain();r.gain.setValueAtTime(.1,n),r.gain.exponentialRampToValueAtTime(.001,n+.07),s.connect(r).connect(gt),s.start(n),s.stop(n+.08)}function $p(){if(!Te||!gt)return;const n=Te.currentTime,e=Te.createOscillator(),t=Te.createGain();e.type="sine",e.frequency.setValueAtTime(640,n),e.frequency.exponentialRampToValueAtTime(160,n+.12),t.gain.setValueAtTime(.06,n),t.gain.exponentialRampToValueAtTime(.001,n+.14),e.connect(t).connect(gt),e.start(n),e.stop(n+.15)}function jc(n){if(!Te||!gt||Uh>0)return;Uh=.7+Math.random()*.6;const e=Te.currentTime,t=Te.createOscillator(),i=Te.createGain(),s=Te.createBiquadFilter();t.type="sawtooth",t.frequency.setValueAtTime(95,e),t.frequency.exponentialRampToValueAtTime(55,e+.35),s.type="lowpass",s.frequency.value=420,i.gain.setValueAtTime(.05*Math.min(1,n),e),i.gain.exponentialRampToValueAtTime(.001,e+.4),t.connect(s).connect(i).connect(gt),t.start(e),t.stop(e+.42)}function $c(n){if(!Te||!gt)return;const e=Te.currentTime,t=Te.createBufferSource();t.buffer=vs(Te,.5);const i=Te.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(n?2600:1800,e),i.frequency.exponentialRampToValueAtTime(280,e+.45);const s=Te.createGain();s.gain.setValueAtTime(n?.22:.13,e),s.gain.exponentialRampToValueAtTime(.001,e+.5),t.connect(i).connect(s).connect(gt),t.start(e),t.stop(e+.52);const r=Te.createOscillator(),o=Te.createGain();r.type="sine",r.frequency.setValueAtTime(n?420:520,e),r.frequency.exponentialRampToValueAtTime(110,e+.22),o.gain.setValueAtTime(.1,e),o.gain.exponentialRampToValueAtTime(.001,e+.25),r.connect(o).connect(gt),r.start(e),r.stop(e+.26)}function Kc(){if(!Te||!gt)return;[523.25,659.25,783.99].forEach((e,t)=>{const i=Te.currentTime+t*.14,s=Te.createOscillator(),r=Te.createGain();s.type="triangle",s.frequency.value=e,r.gain.setValueAtTime(.08,i),r.gain.exponentialRampToValueAtTime(.001,i+.5),s.connect(r).connect(gt),s.start(i),s.stop(i+.52)})}function E_(){return Nr=!Nr,localStorage.setItem("sail.muted",Nr?"1":"0"),gt&&(gt.gain.value=Nr?0:1),Nr}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bu="160",A_=0,Cf=1,C_=2,Kp=1,Jp=2,Di=3,xs=0,wn=1,gn=2,hs=0,$r=1,ta=2,Rf=3,Pf=4,R_=5,Us=100,P_=101,L_=102,Lf=103,Df=104,D_=200,I_=201,z_=202,U_=203,kh=204,Nh=205,k_=206,N_=207,O_=208,F_=209,B_=210,G_=211,H_=212,V_=213,W_=214,X_=0,q_=1,Y_=2,Sc=3,j_=4,$_=5,K_=6,J_=7,wu=0,Z_=1,Q_=2,us=0,ev=1,tv=2,nv=3,Zp=4,iv=5,sv=6,Qp=300,io=301,so=302,Oh=303,Fh=304,Jc=306,Ks=1e3,ei=1001,Bh=1002,tn=1003,If=1004,Ml=1005,Wn=1006,rv=1007,na=1008,fs=1009,ov=1010,av=1011,Tu=1012,em=1013,os=1014,Ni=1015,ia=1016,tm=1017,nm=1018,Vs=1020,cv=1021,ti=1023,lv=1024,hv=1025,Ws=1026,ro=1027,im=1028,sm=1029,uv=1030,rm=1031,om=1033,Sl=33776,bl=33777,wl=33778,Tl=33779,zf=35840,Uf=35841,kf=35842,Nf=35843,am=36196,Of=37492,Ff=37496,Bf=37808,Gf=37809,Hf=37810,Vf=37811,Wf=37812,Xf=37813,qf=37814,Yf=37815,jf=37816,$f=37817,Kf=37818,Jf=37819,Zf=37820,Qf=37821,El=36492,ed=36494,td=36495,fv=36283,nd=36284,id=36285,sd=36286,cm=3e3,Xs=3001,dv=3200,pv=3201,Eu=0,mv=1,ni="",pn="srgb",Hi="srgb-linear",Au="display-p3",Zc="display-p3-linear",bc="linear",Nt="srgb",wc="rec709",Tc="p3",lr=7680,rd=519,gv=512,_v=513,vv=514,lm=515,xv=516,yv=517,Mv=518,Sv=519,Gh=35044,od="300 es",Hh=1035,Oi=2e3,Ec=2001;class po{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Al=Math.PI/180,Vh=180/Math.PI;function ds(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]).toLowerCase()}function mn(n,e,t){return Math.max(e,Math.min(t,n))}function bv(n,e){return(n%e+e)%e}function Cl(n,e,t){return(1-t)*n+t*e}function ad(n){return(n&n-1)===0&&n!==0}function Wh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ui(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ct(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(mn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ft{constructor(e,t,i,s,r,o,a,c,l){ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=s[0],m=s[3],p=s[6],v=s[1],x=s[4],S=s[7],C=s[2],w=s[5],A=s[8];return r[0]=o*_+a*v+c*C,r[3]=o*m+a*x+c*w,r[6]=o*p+a*S+c*A,r[1]=l*_+h*v+u*C,r[4]=l*m+h*x+u*w,r[7]=l*p+h*S+u*A,r[2]=f*_+d*v+g*C,r[5]=f*m+d*x+g*w,r[8]=f*p+d*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=t*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*i)*_,e[2]=(a*i-s*o)*_,e[3]=f*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=d*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Rl.makeScale(e,t)),this}rotate(e){return this.premultiply(Rl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rl=new ft;function hm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ac(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function wv(){const n=Ac("canvas");return n.style.display="block",n}const cd={};function Vo(n){n in cd||(cd[n]=!0,console.warn(n))}const ld=new ft().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),hd=new ft().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Sa={[Hi]:{transfer:bc,primaries:wc,toReference:n=>n,fromReference:n=>n},[pn]:{transfer:Nt,primaries:wc,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Zc]:{transfer:bc,primaries:Tc,toReference:n=>n.applyMatrix3(hd),fromReference:n=>n.applyMatrix3(ld)},[Au]:{transfer:Nt,primaries:Tc,toReference:n=>n.convertSRGBToLinear().applyMatrix3(hd),fromReference:n=>n.applyMatrix3(ld).convertLinearToSRGB()}},Tv=new Set([Hi,Zc]),Tt={enabled:!0,_workingColorSpace:Hi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Tv.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Sa[e].toReference,s=Sa[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Sa[n].primaries},getTransfer:function(n){return n===ni?bc:Sa[n].transfer}};function Kr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Pl(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let hr;class um{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hr===void 0&&(hr=Ac("canvas")),hr.width=e.width,hr.height=e.height;const i=hr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=hr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ac("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Kr(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Kr(t[i]/255)*255):t[i]=Kr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ev=0;class fm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ev++}),this.uuid=ds(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ll(s[o].image)):r.push(Ll(s[o]))}else r=Ll(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ll(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?um.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Av=0;class Dn extends po{constructor(e=Dn.DEFAULT_IMAGE,t=Dn.DEFAULT_MAPPING,i=ei,s=ei,r=Wn,o=na,a=ti,c=fs,l=Dn.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Av++}),this.uuid=ds(),this.name="",this.source=new fm(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Xs?pn:ni),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ks:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Bh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ks:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Bh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===pn?Xs:cm}set encoding(e){Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Xs?pn:ni}}Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=Qp;Dn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,i=0,s=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,S=(d+1)/2,C=(p+1)/2,w=(h+f)/4,A=(u+_)/4,L=(g+m)/4;return x>S&&x>C?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=w/i,r=A/i):S>C?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=w/s,r=L/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=A/r,s=L/r),this.set(i,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cv extends po{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Vo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Xs?pn:ni),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Dn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new fm(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Js extends Cv{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class dm extends Dn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rv extends Dn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a;const p=c*f+l*d+h*g+u*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),w=Math.atan2(C,p*v);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const S=a*v;if(c=c*m+f*S,l=l*m+d*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*d-l*f,e[t+1]=c*g+h*f+l*u-a*d,e[t+2]=l*g+h*d+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,i=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ud.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dl.copy(this).projectOnVector(e),this.sub(Dl)}reflect(e){return this.sub(Dl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(mn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dl=new R,ud=new Xi;class ir{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,si):si.fromBufferAttribute(r,o),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ba.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ba.copy(i.boundingBox)),ba.applyMatrix4(e.matrixWorld),this.union(ba)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mo),wa.subVectors(this.max,Mo),ur.subVectors(e.a,Mo),fr.subVectors(e.b,Mo),dr.subVectors(e.c,Mo),ji.subVectors(fr,ur),$i.subVectors(dr,fr),Es.subVectors(ur,dr);let t=[0,-ji.z,ji.y,0,-$i.z,$i.y,0,-Es.z,Es.y,ji.z,0,-ji.x,$i.z,0,-$i.x,Es.z,0,-Es.x,-ji.y,ji.x,0,-$i.y,$i.x,0,-Es.y,Es.x,0];return!Il(t,ur,fr,dr,wa)||(t=[1,0,0,0,1,0,0,0,1],!Il(t,ur,fr,dr,wa))?!1:(Ta.crossVectors(ji,$i),t=[Ta.x,Ta.y,Ta.z],Il(t,ur,fr,dr,wa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ei=[new R,new R,new R,new R,new R,new R,new R,new R],si=new R,ba=new ir,ur=new R,fr=new R,dr=new R,ji=new R,$i=new R,Es=new R,Mo=new R,wa=new R,Ta=new R,As=new R;function Il(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){As.fromArray(n,r);const a=s.x*Math.abs(As.x)+s.y*Math.abs(As.y)+s.z*Math.abs(As.z),c=e.dot(As),l=t.dot(As),h=i.dot(As);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Pv=new ir,So=new R,zl=new R;class sr{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Pv.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;So.subVectors(e,this.center);const t=So.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(So,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(So.copy(e.center).add(zl)),this.expandByPoint(So.copy(e.center).sub(zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ai=new R,Ul=new R,Ea=new R,Ki=new R,kl=new R,Aa=new R,Nl=new R;class Cu{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ul.copy(e).add(t).multiplyScalar(.5),Ea.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(Ul);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ea),a=Ki.dot(this.direction),c=-Ki.dot(Ea),l=Ki.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ul).addScaledVector(Ea,f),d}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);const i=Ai.dot(this.direction),s=Ai.dot(Ai)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,i,s,r){kl.subVectors(t,e),Aa.subVectors(i,e),Nl.crossVectors(kl,Aa);let o=this.direction.dot(Nl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ki.subVectors(this.origin,e);const c=a*this.direction.dot(Aa.crossVectors(Ki,Aa));if(c<0)return null;const l=a*this.direction.dot(kl.cross(Ki));if(l<0||c+l>o)return null;const h=-a*Ki.dot(Nl);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rt{constructor(e,t,i,s,r,o,a,c,l,h,u,f,d,g,_,m){Rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(e,t,i,s,r,o,a,c,l,h,u,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/pr.setFromMatrixColumn(e,0).length(),r=1/pr.setFromMatrixColumn(e,1).length(),o=1/pr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;t[0]=f-_*a,t[4]=-o*u,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-f*u,t[8]=g*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=d*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=o*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lv,e,Dv)}lookAt(e,t,i){const s=this.elements;return Gn.subVectors(e,t),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),Ji.crossVectors(i,Gn),Ji.lengthSq()===0&&(Math.abs(i.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),Ji.crossVectors(i,Gn)),Ji.normalize(),Ca.crossVectors(Gn,Ji),s[0]=Ji.x,s[4]=Ca.x,s[8]=Gn.x,s[1]=Ji.y,s[5]=Ca.y,s[9]=Gn.y,s[2]=Ji.z,s[6]=Ca.z,s[10]=Gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],v=i[3],x=i[7],S=i[11],C=i[15],w=s[0],A=s[4],L=s[8],M=s[12],T=s[1],B=s[5],G=s[9],K=s[13],D=s[2],k=s[6],W=s[10],Q=s[14],J=s[3],ee=s[7],ne=s[11],xe=s[15];return r[0]=o*w+a*T+c*D+l*J,r[4]=o*A+a*B+c*k+l*ee,r[8]=o*L+a*G+c*W+l*ne,r[12]=o*M+a*K+c*Q+l*xe,r[1]=h*w+u*T+f*D+d*J,r[5]=h*A+u*B+f*k+d*ee,r[9]=h*L+u*G+f*W+d*ne,r[13]=h*M+u*K+f*Q+d*xe,r[2]=g*w+_*T+m*D+p*J,r[6]=g*A+_*B+m*k+p*ee,r[10]=g*L+_*G+m*W+p*ne,r[14]=g*M+_*K+m*Q+p*xe,r[3]=v*w+x*T+S*D+C*J,r[7]=v*A+x*B+S*k+C*ee,r[11]=v*L+x*G+S*W+C*ne,r[15]=v*M+x*K+S*Q+C*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*d-i*c*d)+_*(+t*c*d-t*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+t*l*u-t*a*d-r*o*u+i*o*d+r*a*h-i*l*h)+p*(-s*a*h-t*c*u+t*a*f+s*o*u-i*o*f+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,x=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,S=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,C=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,w=t*v+i*x+s*S+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=v*A,e[1]=(_*f*r-u*m*r-_*s*d+i*m*d+u*s*p-i*f*p)*A,e[2]=(a*m*r-_*c*r+_*s*l-i*m*l-a*s*p+i*c*p)*A,e[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*d-i*c*d)*A,e[4]=x*A,e[5]=(h*m*r-g*f*r+g*s*d-t*m*d-h*s*p+t*f*p)*A,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*A,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*d+t*c*d)*A,e[8]=S*A,e[9]=(g*u*r-h*_*r-g*i*d+t*_*d+h*i*p-t*u*p)*A,e[10]=(o*_*r-g*a*r+g*i*l-t*_*l-o*i*p+t*a*p)*A,e[11]=(h*a*r-o*u*r-h*i*l+t*u*l+o*i*d-t*a*d)*A,e[12]=C*A,e[13]=(h*_*s-g*u*s+g*i*f-t*_*f-h*i*m+t*u*m)*A,e[14]=(g*a*s-o*_*s-g*i*c+t*_*c+o*i*m-t*a*m)*A,e[15]=(o*u*s-h*a*s+h*i*c-t*u*c-o*i*f+t*a*f)*A,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,v=c*l,x=c*h,S=c*u,C=i.x,w=i.y,A=i.z;return s[0]=(1-(_+p))*C,s[1]=(d+S)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(d-S)*w,s[5]=(1-(f+p))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(g+x)*A,s[9]=(m-v)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=pr.set(s[0],s[1],s[2]).length();const o=pr.set(s[4],s[5],s[6]).length(),a=pr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ri.copy(this);const l=1/r,h=1/o,u=1/a;return ri.elements[0]*=l,ri.elements[1]*=l,ri.elements[2]*=l,ri.elements[4]*=h,ri.elements[5]*=h,ri.elements[6]*=h,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,t.setFromRotationMatrix(ri),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Oi){const c=this.elements,l=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s);let d,g;if(a===Oi)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ec)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Oi){const c=this.elements,l=1/(t-e),h=1/(i-s),u=1/(o-r),f=(t+e)*l,d=(i+s)*h;let g,_;if(a===Oi)g=(o+r)*u,_=-2*u;else if(a===Ec)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const pr=new R,ri=new Rt,Lv=new R(0,0,0),Dv=new R(1,1,1),Ji=new R,Ca=new R,Gn=new R,fd=new Rt,dd=new Xi;class Qc{constructor(e=0,t=0,i=0,s=Qc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(mn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-mn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(mn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-mn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(mn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-mn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dd.setFromEuler(this),this.setFromQuaternion(dd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qc.DEFAULT_ORDER="XYZ";class pm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Iv=0;const pd=new R,mr=new Xi,Ci=new Rt,Ra=new R,bo=new R,zv=new R,Uv=new Xi,md=new R(1,0,0),gd=new R(0,1,0),_d=new R(0,0,1),kv={type:"added"},Nv={type:"removed"};class Yt extends po{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Iv++}),this.uuid=ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new R,t=new Qc,i=new Xi,s=new R(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new ft}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mr.setFromAxisAngle(e,t),this.quaternion.multiply(mr),this}rotateOnWorldAxis(e,t){return mr.setFromAxisAngle(e,t),this.quaternion.premultiply(mr),this}rotateX(e){return this.rotateOnAxis(md,e)}rotateY(e){return this.rotateOnAxis(gd,e)}rotateZ(e){return this.rotateOnAxis(_d,e)}translateOnAxis(e,t){return pd.copy(e).applyQuaternion(this.quaternion),this.position.add(pd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(md,e)}translateY(e){return this.translateOnAxis(gd,e)}translateZ(e){return this.translateOnAxis(_d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ra.copy(e):Ra.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(bo,Ra,this.up):Ci.lookAt(Ra,bo,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),mr.setFromRotationMatrix(Ci),this.quaternion.premultiply(mr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(kv)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nv)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bo,e,zv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bo,Uv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Yt.DEFAULT_UP=new R(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const oi=new R,Ri=new R,Ol=new R,Pi=new R,gr=new R,_r=new R,vd=new R,Fl=new R,Bl=new R,Gl=new R;let Pa=!1;class Qn{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),oi.subVectors(e,t),s.cross(oi);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){oi.subVectors(s,t),Ri.subVectors(i,t),Ol.subVectors(e,t);const o=oi.dot(oi),a=oi.dot(Ri),c=oi.dot(Ol),l=Ri.dot(Ri),h=Ri.dot(Ol),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getUV(e,t,i,s,r,o,a,c){return Pa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Pa=!0),this.getInterpolation(e,t,i,s,r,o,a,c)}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,Pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pi.x),c.addScaledVector(o,Pi.y),c.addScaledVector(a,Pi.z),c)}static isFrontFacing(e,t,i,s){return oi.subVectors(i,t),Ri.subVectors(e,t),oi.cross(Ri).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return oi.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),oi.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return Pa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Pa=!0),Qn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return Qn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;gr.subVectors(s,i),_r.subVectors(r,i),Fl.subVectors(e,i);const c=gr.dot(Fl),l=_r.dot(Fl);if(c<=0&&l<=0)return t.copy(i);Bl.subVectors(e,s);const h=gr.dot(Bl),u=_r.dot(Bl);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(gr,o);Gl.subVectors(e,r);const d=gr.dot(Gl),g=_r.dot(Gl);if(g>=0&&d<=g)return t.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(_r,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return vd.subVectors(r,s),a=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(vd,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(i).addScaledVector(gr,o).addScaledVector(_r,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},La={h:0,s:0,l:0};function Hl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class De{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Tt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=Tt.workingColorSpace){if(e=bv(e,1),t=mn(t,0,1),i=mn(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Hl(o,r,e+1/3),this.g=Hl(o,r,e),this.b=Hl(o,r,e-1/3)}return Tt.toWorkingColorSpace(this,s),this}setStyle(e,t=pn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const i=mm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Kr(e.r),this.g=Kr(e.g),this.b=Kr(e.b),this}copyLinearToSRGB(e){return this.r=Pl(e.r),this.g=Pl(e.g),this.b=Pl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return Tt.fromWorkingColorSpace(Mn.copy(this),e),Math.round(mn(Mn.r*255,0,255))*65536+Math.round(mn(Mn.g*255,0,255))*256+Math.round(mn(Mn.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(Mn.copy(this),t);const i=Mn.r,s=Mn.g,r=Mn.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=pn){Tt.fromWorkingColorSpace(Mn.copy(this),e);const t=Mn.r,i=Mn.g,s=Mn.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(La);const i=Cl(Zi.h,La.h,t),s=Cl(Zi.s,La.s,t),r=Cl(Zi.l,La.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mn=new De;De.NAMES=mm;let Ov=0;class qi extends po{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ov++}),this.uuid=ds(),this.name="",this.type="Material",this.blending=$r,this.side=xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kh,this.blendDst=Nh,this.blendEquation=Us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Sc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lr,this.stencilZFail=lr,this.stencilZPass=lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==$r&&(i.blending=this.blending),this.side!==xs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==kh&&(i.blendSrc=this.blendSrc),this.blendDst!==Nh&&(i.blendDst=this.blendDst),this.blendEquation!==Us&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Sc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==lr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==lr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==lr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class _n extends qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new R,Da=new Ee;class un{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ui(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ct(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gh&&(e.usage=this.usage),e}}class gm extends un{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class _m extends un{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class yt extends un{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Fv=0;const Jn=new Rt,Vl=new Yt,vr=new R,Hn=new ir,wo=new ir,cn=new R;class jt extends po{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fv++}),this.uuid=ds(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hm(e)?_m:gm)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ft().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jn.makeRotationFromQuaternion(e),this.applyMatrix4(Jn),this}rotateX(e){return Jn.makeRotationX(e),this.applyMatrix4(Jn),this}rotateY(e){return Jn.makeRotationY(e),this.applyMatrix4(Jn),this}rotateZ(e){return Jn.makeRotationZ(e),this.applyMatrix4(Jn),this}translate(e,t,i){return Jn.makeTranslation(e,t,i),this.applyMatrix4(Jn),this}scale(e,t,i){return Jn.makeScale(e,t,i),this.applyMatrix4(Jn),this}lookAt(e){return Vl.lookAt(e),Vl.updateMatrix(),this.applyMatrix4(Vl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new yt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ir);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Hn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];wo.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Hn.min,wo.min),Hn.expandByPoint(cn),cn.addVectors(Hn.max,wo.max),Hn.expandByPoint(cn)):(Hn.expandByPoint(wo.min),Hn.expandByPoint(wo.max))}Hn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(cn));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)cn.fromBufferAttribute(a,l),c&&(vr.fromBufferAttribute(e,l),cn.add(vr)),s=Math.max(s,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let T=0;T<a;T++)l[T]=new R,h[T]=new R;const u=new R,f=new R,d=new R,g=new Ee,_=new Ee,m=new Ee,p=new R,v=new R;function x(T,B,G){u.fromArray(s,T*3),f.fromArray(s,B*3),d.fromArray(s,G*3),g.fromArray(o,T*2),_.fromArray(o,B*2),m.fromArray(o,G*2),f.sub(u),d.sub(u),_.sub(g),m.sub(g);const K=1/(_.x*m.y-m.x*_.y);isFinite(K)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar(K),v.copy(d).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(K),l[T].add(p),l[B].add(p),l[G].add(p),h[T].add(v),h[B].add(v),h[G].add(v))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let T=0,B=S.length;T<B;++T){const G=S[T],K=G.start,D=G.count;for(let k=K,W=K+D;k<W;k+=3)x(i[k+0],i[k+1],i[k+2])}const C=new R,w=new R,A=new R,L=new R;function M(T){A.fromArray(r,T*3),L.copy(A);const B=l[T];C.copy(B),C.sub(A.multiplyScalar(A.dot(B))).normalize(),w.crossVectors(L,B);const K=w.dot(h[T])<0?-1:1;c[T*4]=C.x,c[T*4+1]=C.y,c[T*4+2]=C.z,c[T*4+3]=K}for(let T=0,B=S.length;T<B;++T){const G=S[T],K=G.start,D=G.count;for(let k=K,W=K+D;k<W;k+=3)M(i[k+0]),M(i[k+1]),M(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new un(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new R,r=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new un(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=e(f,i);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xd=new Rt,Cs=new Cu,Ia=new sr,yd=new R,xr=new R,yr=new R,Mr=new R,Wl=new R,za=new R,Ua=new Ee,ka=new Ee,Na=new Ee,Md=new R,Sd=new R,bd=new R,Oa=new R,Fa=new R;class I extends Yt{constructor(e=new jt,t=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){za.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Wl.fromBufferAttribute(u,e),o?za.addScaledVector(Wl,h):za.addScaledVector(Wl.sub(t),h))}t.add(za)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ia.copy(i.boundingSphere),Ia.applyMatrix4(r),Cs.copy(e.ray).recast(e.near),!(Ia.containsPoint(Cs.origin)===!1&&(Cs.intersectSphere(Ia,yd)===null||Cs.origin.distanceToSquared(yd)>(e.far-e.near)**2))&&(xd.copy(r).invert(),Cs.copy(e.ray).applyMatrix4(xd),!(i.boundingBox!==null&&Cs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Cs)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),x=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=v,C=x;S<C;S+=3){const w=a.getX(S),A=a.getX(S+1),L=a.getX(S+2);s=Ba(this,p,e,i,l,h,u,w,A,L),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),x=a.getX(m+1),S=a.getX(m+2);s=Ba(this,o,e,i,l,h,u,v,x,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),x=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let S=v,C=x;S<C;S+=3){const w=S,A=S+1,L=S+2;s=Ba(this,p,e,i,l,h,u,w,A,L),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=m,x=m+1,S=m+2;s=Ba(this,o,e,i,l,h,u,v,x,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Bv(n,e,t,i,s,r,o,a){let c;if(e.side===wn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===xs,a),c===null)return null;Fa.copy(a),Fa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Fa);return l<t.near||l>t.far?null:{distance:l,point:Fa.clone(),object:n}}function Ba(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,xr),n.getVertexPosition(c,yr),n.getVertexPosition(l,Mr);const h=Bv(n,e,t,i,xr,yr,Mr,Oa);if(h){s&&(Ua.fromBufferAttribute(s,a),ka.fromBufferAttribute(s,c),Na.fromBufferAttribute(s,l),h.uv=Qn.getInterpolation(Oa,xr,yr,Mr,Ua,ka,Na,new Ee)),r&&(Ua.fromBufferAttribute(r,a),ka.fromBufferAttribute(r,c),Na.fromBufferAttribute(r,l),h.uv1=Qn.getInterpolation(Oa,xr,yr,Mr,Ua,ka,Na,new Ee),h.uv2=h.uv1),o&&(Md.fromBufferAttribute(o,a),Sd.fromBufferAttribute(o,c),bd.fromBufferAttribute(o,l),h.normal=Qn.getInterpolation(Oa,xr,yr,Mr,Md,Sd,bd,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new R,materialIndex:0};Qn.getNormal(xr,yr,Mr,u.normal),h.face=u}return h}class He extends jt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(u,2));function g(_,m,p,v,x,S,C,w,A,L,M){const T=S/A,B=C/L,G=S/2,K=C/2,D=w/2,k=A+1,W=L+1;let Q=0,J=0;const ee=new R;for(let ne=0;ne<W;ne++){const xe=ne*B-K;for(let de=0;de<k;de++){const j=de*T-G;ee[_]=j*v,ee[m]=xe*x,ee[p]=D,l.push(ee.x,ee.y,ee.z),ee[_]=0,ee[m]=0,ee[p]=w>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(de/A),u.push(1-ne/L),Q+=1}}for(let ne=0;ne<L;ne++)for(let xe=0;xe<A;xe++){const de=f+xe+k*ne,j=f+xe+k*(ne+1),ae=f+(xe+1)+k*(ne+1),Ae=f+(xe+1)+k*ne;c.push(de,j,Ae),c.push(j,ae,Ae),J+=6}a.addGroup(d,J,M),d+=J,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new He(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function oo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Pn(n){const e={};for(let t=0;t<n.length;t++){const i=oo(n[t]);for(const s in i)e[s]=i[s]}return e}function Gv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function vm(n){return n.getRenderTarget()===null?n.outputColorSpace:Tt.workingColorSpace}const Hv={clone:oo,merge:Pn};var Vv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vv,this.fragmentShader=Wv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oo(e.uniforms),this.uniformsGroups=Gv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class xm extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=Oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Xn extends xm{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Vh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Al*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vh*2*Math.atan(Math.tan(Al*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Al*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Sr=-90,br=1;class Xv extends Yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xn(Sr,br,e,t);s.layers=this.layers,this.add(s);const r=new Xn(Sr,br,e,t);r.layers=this.layers,this.add(r);const o=new Xn(Sr,br,e,t);o.layers=this.layers,this.add(o);const a=new Xn(Sr,br,e,t);a.layers=this.layers,this.add(a);const c=new Xn(Sr,br,e,t);c.layers=this.layers,this.add(c);const l=new Xn(Sr,br,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Oi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ec)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ym extends Dn{constructor(e,t,i,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:io,super(e,t,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qv extends Js{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Vo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Xs?pn:ni),this.texture=new ym(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new He(5,5,5),r=new fi({name:"CubemapFromEquirect",uniforms:oo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wn,blending:hs});r.uniforms.tEquirect.value=t;const o=new I(s,r),a=t.minFilter;return t.minFilter===na&&(t.minFilter=Wn),new Xv(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const Xl=new R,Yv=new R,jv=new ft;class Ls{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Xl.subVectors(i,t).cross(Yv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Xl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||jv.getNormalMatrix(e),s=this.coplanarPoint(Xl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rs=new sr,Ga=new R;class Ru{constructor(e=new Ls,t=new Ls,i=new Ls,s=new Ls,r=new Ls,o=new Ls){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Oi){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],v=s[13],x=s[14],S=s[15];if(i[0].setComponents(c-r,f-l,m-d,S-p).normalize(),i[1].setComponents(c+r,f+l,m+d,S+p).normalize(),i[2].setComponents(c+o,f+h,m+g,S+v).normalize(),i[3].setComponents(c-o,f-h,m-g,S-v).normalize(),i[4].setComponents(c-a,f-u,m-_,S-x).normalize(),t===Oi)i[5].setComponents(c+a,f+u,m+_,S+x).normalize();else if(t===Ec)i[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){return Rs.center.set(0,0,0),Rs.radius=.7071067811865476,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ga.x=s.normal.x>0?e.max.x:e.min.x,Ga.y=s.normal.y>0?e.max.y:e.min.y,Ga.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ga)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Mm(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function $v(n,e){const t=e.isWebGL2,i=new WeakMap;function s(l,h){const u=l.array,f=l.usage,d=u.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,u,f),l.onUploadCallback();let _;if(u instanceof Float32Array)_=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=n.SHORT;else if(u instanceof Uint32Array)_=n.UNSIGNED_INT;else if(u instanceof Int32Array)_=n.INT;else if(u instanceof Int8Array)_=n.BYTE;else if(u instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,h,u){const f=h.array,d=h._updateRange,g=h.updateRanges;if(n.bindBuffer(u,l),d.count===-1&&g.length===0&&n.bufferSubData(u,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?n.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):n.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}d.count!==-1&&(t?n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h&&(n.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const f=i.get(l);(!f||f.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);if(u===void 0)i.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class $n extends jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const v=p*f-o;for(let x=0;x<l;x++){const S=x*u-r;g.push(S,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const x=v+l*p,S=v+l*(p+1),C=v+1+l*(p+1),w=v+1+l*p;d.push(x,S,w),d.push(S,C,w)}this.setIndex(d),this.setAttribute("position",new yt(g,3)),this.setAttribute("normal",new yt(_,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $n(e.width,e.height,e.widthSegments,e.heightSegments)}}var Kv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ex=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,tx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ix=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sx=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ox=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ax=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,fx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,px=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_x=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,vx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,xx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,yx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ex="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ax=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Cx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Px=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ix=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ux=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ox=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Wx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$x=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Jx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qx=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ey=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ty=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ny=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,iy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ry=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,oy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ay=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ly=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,uy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,fy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,dy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,py=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,my=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_y=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,My=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,by=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ty=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ey=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ay=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ry=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Py=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ly=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Dy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Iy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Uy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ky=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ny=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Oy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,By=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $y=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ky=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,nM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,iM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,oM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_M=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,TM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,AM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:Kv,alphahash_pars_fragment:Jv,alphamap_fragment:Zv,alphamap_pars_fragment:Qv,alphatest_fragment:ex,alphatest_pars_fragment:tx,aomap_fragment:nx,aomap_pars_fragment:ix,batching_pars_vertex:sx,batching_vertex:rx,begin_vertex:ox,beginnormal_vertex:ax,bsdfs:cx,iridescence_fragment:lx,bumpmap_pars_fragment:hx,clipping_planes_fragment:ux,clipping_planes_pars_fragment:fx,clipping_planes_pars_vertex:dx,clipping_planes_vertex:px,color_fragment:mx,color_pars_fragment:gx,color_pars_vertex:_x,color_vertex:vx,common:xx,cube_uv_reflection_fragment:yx,defaultnormal_vertex:Mx,displacementmap_pars_vertex:Sx,displacementmap_vertex:bx,emissivemap_fragment:wx,emissivemap_pars_fragment:Tx,colorspace_fragment:Ex,colorspace_pars_fragment:Ax,envmap_fragment:Cx,envmap_common_pars_fragment:Rx,envmap_pars_fragment:Px,envmap_pars_vertex:Lx,envmap_physical_pars_fragment:Vx,envmap_vertex:Dx,fog_vertex:Ix,fog_pars_vertex:zx,fog_fragment:Ux,fog_pars_fragment:kx,gradientmap_pars_fragment:Nx,lightmap_fragment:Ox,lightmap_pars_fragment:Fx,lights_lambert_fragment:Bx,lights_lambert_pars_fragment:Gx,lights_pars_begin:Hx,lights_toon_fragment:Wx,lights_toon_pars_fragment:Xx,lights_phong_fragment:qx,lights_phong_pars_fragment:Yx,lights_physical_fragment:jx,lights_physical_pars_fragment:$x,lights_fragment_begin:Kx,lights_fragment_maps:Jx,lights_fragment_end:Zx,logdepthbuf_fragment:Qx,logdepthbuf_pars_fragment:ey,logdepthbuf_pars_vertex:ty,logdepthbuf_vertex:ny,map_fragment:iy,map_pars_fragment:sy,map_particle_fragment:ry,map_particle_pars_fragment:oy,metalnessmap_fragment:ay,metalnessmap_pars_fragment:cy,morphcolor_vertex:ly,morphnormal_vertex:hy,morphtarget_pars_vertex:uy,morphtarget_vertex:fy,normal_fragment_begin:dy,normal_fragment_maps:py,normal_pars_fragment:my,normal_pars_vertex:gy,normal_vertex:_y,normalmap_pars_fragment:vy,clearcoat_normal_fragment_begin:xy,clearcoat_normal_fragment_maps:yy,clearcoat_pars_fragment:My,iridescence_pars_fragment:Sy,opaque_fragment:by,packing:wy,premultiplied_alpha_fragment:Ty,project_vertex:Ey,dithering_fragment:Ay,dithering_pars_fragment:Cy,roughnessmap_fragment:Ry,roughnessmap_pars_fragment:Py,shadowmap_pars_fragment:Ly,shadowmap_pars_vertex:Dy,shadowmap_vertex:Iy,shadowmask_pars_fragment:zy,skinbase_vertex:Uy,skinning_pars_vertex:ky,skinning_vertex:Ny,skinnormal_vertex:Oy,specularmap_fragment:Fy,specularmap_pars_fragment:By,tonemapping_fragment:Gy,tonemapping_pars_fragment:Hy,transmission_fragment:Vy,transmission_pars_fragment:Wy,uv_pars_fragment:Xy,uv_pars_vertex:qy,uv_vertex:Yy,worldpos_vertex:jy,background_vert:$y,background_frag:Ky,backgroundCube_vert:Jy,backgroundCube_frag:Zy,cube_vert:Qy,cube_frag:eM,depth_vert:tM,depth_frag:nM,distanceRGBA_vert:iM,distanceRGBA_frag:sM,equirect_vert:rM,equirect_frag:oM,linedashed_vert:aM,linedashed_frag:cM,meshbasic_vert:lM,meshbasic_frag:hM,meshlambert_vert:uM,meshlambert_frag:fM,meshmatcap_vert:dM,meshmatcap_frag:pM,meshnormal_vert:mM,meshnormal_frag:gM,meshphong_vert:_M,meshphong_frag:vM,meshphysical_vert:xM,meshphysical_frag:yM,meshtoon_vert:MM,meshtoon_frag:SM,points_vert:bM,points_frag:wM,shadow_vert:TM,shadow_frag:EM,sprite_vert:AM,sprite_frag:CM},we={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},_i={basic:{uniforms:Pn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:Pn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new De(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:Pn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:Pn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:Pn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new De(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:Pn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:Pn([we.points,we.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:Pn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:Pn([we.common,we.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:Pn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:Pn([we.sprite,we.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:Pn([we.common,we.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:Pn([we.lights,we.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};_i.physical={uniforms:Pn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const Ha={r:0,b:0,g:0};function RM(n,e,t,i,s,r,o){const a=new De(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(m,p){let v=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,c):x&&x.isColor&&(_(x,1),v=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Jc)?(h===void 0&&(h=new I(new He(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:oo(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Tt.getTransfer(x.colorSpace)!==Nt,(u!==x||f!==x.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new I(new $n(2,2),new fi({name:"BackgroundMaterial",uniforms:oo(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:xs,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Tt.getTransfer(x.colorSpace)!==Nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,d=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Ha,vm(n)),i.buffers.color.setClear(Ha.r,Ha.g,Ha.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function PM(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},c=m(null);let l=c,h=!1;function u(D,k,W,Q,J){let ee=!1;if(o){const ne=_(Q,W,k);l!==ne&&(l=ne,d(l.object)),ee=p(D,Q,W,J),ee&&v(D,Q,W,J)}else{const ne=k.wireframe===!0;(l.geometry!==Q.id||l.program!==W.id||l.wireframe!==ne)&&(l.geometry=Q.id,l.program=W.id,l.wireframe=ne,ee=!0)}J!==null&&t.update(J,n.ELEMENT_ARRAY_BUFFER),(ee||h)&&(h=!1,L(D,k,W,Q),J!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function d(D){return i.isWebGL2?n.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?n.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,k,W){const Q=W.wireframe===!0;let J=a[D.id];J===void 0&&(J={},a[D.id]=J);let ee=J[k.id];ee===void 0&&(ee={},J[k.id]=ee);let ne=ee[Q];return ne===void 0&&(ne=m(f()),ee[Q]=ne),ne}function m(D){const k=[],W=[],Q=[];for(let J=0;J<s;J++)k[J]=0,W[J]=0,Q[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:W,attributeDivisors:Q,object:D,attributes:{},index:null}}function p(D,k,W,Q){const J=l.attributes,ee=k.attributes;let ne=0;const xe=W.getAttributes();for(const de in xe)if(xe[de].location>=0){const ae=J[de];let Ae=ee[de];if(Ae===void 0&&(de==="instanceMatrix"&&D.instanceMatrix&&(Ae=D.instanceMatrix),de==="instanceColor"&&D.instanceColor&&(Ae=D.instanceColor)),ae===void 0||ae.attribute!==Ae||Ae&&ae.data!==Ae.data)return!0;ne++}return l.attributesNum!==ne||l.index!==Q}function v(D,k,W,Q){const J={},ee=k.attributes;let ne=0;const xe=W.getAttributes();for(const de in xe)if(xe[de].location>=0){let ae=ee[de];ae===void 0&&(de==="instanceMatrix"&&D.instanceMatrix&&(ae=D.instanceMatrix),de==="instanceColor"&&D.instanceColor&&(ae=D.instanceColor));const Ae={};Ae.attribute=ae,ae&&ae.data&&(Ae.data=ae.data),J[de]=Ae,ne++}l.attributes=J,l.attributesNum=ne,l.index=Q}function x(){const D=l.newAttributes;for(let k=0,W=D.length;k<W;k++)D[k]=0}function S(D){C(D,0)}function C(D,k){const W=l.newAttributes,Q=l.enabledAttributes,J=l.attributeDivisors;W[D]=1,Q[D]===0&&(n.enableVertexAttribArray(D),Q[D]=1),J[D]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,k),J[D]=k)}function w(){const D=l.newAttributes,k=l.enabledAttributes;for(let W=0,Q=k.length;W<Q;W++)k[W]!==D[W]&&(n.disableVertexAttribArray(W),k[W]=0)}function A(D,k,W,Q,J,ee,ne){ne===!0?n.vertexAttribIPointer(D,k,W,J,ee):n.vertexAttribPointer(D,k,W,Q,J,ee)}function L(D,k,W,Q){if(i.isWebGL2===!1&&(D.isInstancedMesh||Q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const J=Q.attributes,ee=W.getAttributes(),ne=k.defaultAttributeValues;for(const xe in ee){const de=ee[xe];if(de.location>=0){let j=J[xe];if(j===void 0&&(xe==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),xe==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){const ae=j.normalized,Ae=j.itemSize,Ge=t.get(j);if(Ge===void 0)continue;const H=Ge.buffer,re=Ge.type,fe=Ge.bytesPerElement,me=i.isWebGL2===!0&&(re===n.INT||re===n.UNSIGNED_INT||j.gpuType===em);if(j.isInterleavedBufferAttribute){const Ce=j.data,U=Ce.stride,he=j.offset;if(Ce.isInstancedInterleavedBuffer){for(let ie=0;ie<de.locationSize;ie++)C(de.location+ie,Ce.meshPerAttribute);D.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=Ce.meshPerAttribute*Ce.count)}else for(let ie=0;ie<de.locationSize;ie++)S(de.location+ie);n.bindBuffer(n.ARRAY_BUFFER,H);for(let ie=0;ie<de.locationSize;ie++)A(de.location+ie,Ae/de.locationSize,re,ae,U*fe,(he+Ae/de.locationSize*ie)*fe,me)}else{if(j.isInstancedBufferAttribute){for(let Ce=0;Ce<de.locationSize;Ce++)C(de.location+Ce,j.meshPerAttribute);D.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Ce=0;Ce<de.locationSize;Ce++)S(de.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,H);for(let Ce=0;Ce<de.locationSize;Ce++)A(de.location+Ce,Ae/de.locationSize,re,ae,Ae*fe,Ae/de.locationSize*Ce*fe,me)}}else if(ne!==void 0){const ae=ne[xe];if(ae!==void 0)switch(ae.length){case 2:n.vertexAttrib2fv(de.location,ae);break;case 3:n.vertexAttrib3fv(de.location,ae);break;case 4:n.vertexAttrib4fv(de.location,ae);break;default:n.vertexAttrib1fv(de.location,ae)}}}}w()}function M(){G();for(const D in a){const k=a[D];for(const W in k){const Q=k[W];for(const J in Q)g(Q[J].object),delete Q[J];delete k[W]}delete a[D]}}function T(D){if(a[D.id]===void 0)return;const k=a[D.id];for(const W in k){const Q=k[W];for(const J in Q)g(Q[J].object),delete Q[J];delete k[W]}delete a[D.id]}function B(D){for(const k in a){const W=a[k];if(W[D.id]===void 0)continue;const Q=W[D.id];for(const J in Q)g(Q[J].object),delete Q[J];delete W[D.id]}}function G(){K(),h=!0,l!==c&&(l=c,d(l.object))}function K(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:G,resetDefaultState:K,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:S,disableUnusedAttributes:w}}function LM(n,e,t,i){const s=i.isWebGL2;let r;function o(h){r=h}function a(h,u){n.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let d,g;if(s)d=n,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function DM(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,S=o||e.has("OES_texture_float"),C=x&&S,w=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:w}}function IM(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Ls,a=new ft,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const v=r?0:i,x=v*4;let S=p.clippingState||null;c.value=S,S=h(g,f,x,d);for(let C=0;C!==x;++C)S[C]=t[C];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,S=d;x!==_;++x,S+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function zM(n){let e=new WeakMap;function t(o,a){return a===Oh?o.mapping=io:a===Fh&&(o.mapping=so),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oh||a===Fh)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new qv(c.height/2);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Sm extends xm{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Gr=4,wd=[.125,.215,.35,.446,.526,.582],ks=20,ql=new Sm,Td=new De;let Yl=null,jl=0,$l=0;const Ds=(1+Math.sqrt(5))/2,wr=1/Ds,Ed=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Ds,wr),new R(0,Ds,-wr),new R(wr,0,Ds),new R(-wr,0,Ds),new R(Ds,wr,0),new R(-Ds,wr,0)];class Ad{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Yl=this._renderer.getRenderTarget(),jl=this._renderer.getActiveCubeFace(),$l=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yl,jl,$l),e.scissorTest=!1,Va(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===io||e.mapping===so?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yl=this._renderer.getRenderTarget(),jl=this._renderer.getActiveCubeFace(),$l=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:ia,format:ti,colorSpace:Hi,depthBuffer:!1},s=Cd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cd(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=UM(r)),this._blurMaterial=kM(r,e,t)}return s}_compileMaterial(e){const t=new I(this._lodPlanes[0],e);this._renderer.compile(t,ql)}_sceneToCubeUV(e,t,i,s){const a=new Xn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Td),h.toneMapping=us,h.autoClear=!1;const d=new _n({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1}),g=new I(new He,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(Td),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const x=this._cubeSize;Va(s,v*x,p>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===io||e.mapping===so;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new I(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Va(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,ql)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ed[(s-1)%Ed.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new I(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ks-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ks;m>ks&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ks}`);const p=[];let v=0;for(let A=0;A<ks;++A){const L=A/_,M=Math.exp(-L*L/2);p.push(M),A===0?v+=M:A<m&&(v+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;const S=this._sizeLods[s],C=3*S*(s>x-Gr?s-x+Gr:0),w=4*(this._cubeSize-S);Va(t,C,w,3*S,2*S),c.setRenderTarget(t),c.render(u,ql)}}function UM(n){const e=[],t=[],i=[];let s=n;const r=n-Gr+1+wd.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Gr?c=wd[o-n+Gr-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),x=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,L=w>2?0:-1,M=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];v.set(M,_*g*w),x.set(f,m*g*w);const T=[w,w,w,w,w,w];S.set(T,p*g*w)}const C=new jt;C.setAttribute("position",new un(v,_)),C.setAttribute("uv",new un(x,m)),C.setAttribute("faceIndex",new un(S,p)),e.push(C),s>Gr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Cd(n,e,t){const i=new Js(n,e,t);return i.texture.mapping=Jc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Va(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function kM(n,e,t){const i=new Float32Array(ks),s=new R(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:ks,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Rd(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Pd(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Pu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function NM(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Oh||c===Fh,h=c===io||c===so;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Ad(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new Ad(n));const f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function OM(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function FM(n,e,t,i){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],n.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let x=0,S=v.length;x<S;x+=3){const C=v[x+0],w=v[x+1],A=v[x+2];f.push(C,w,w,A,A,C)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,S=v.length/3-1;x<S;x+=3){const C=x+0,w=x+1,A=x+2;f.push(C,w,w,A,A,C)}}else return;const m=new(hm(f)?_m:gm)(f,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function BM(n,e,t,i){const s=i.isWebGL2;let r;function o(d){r=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function h(d,g){n.drawElements(r,g,a,d*c),t.update(g,r,1)}function u(d,g,_){if(_===0)return;let m,p;if(s)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,d*c,_),t.update(g,r,_)}function f(d,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,d,0,_);let p=0;for(let v=0;v<_;v++)p+=g[v];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function GM(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function HM(n,e){return n[0]-e[0]}function VM(n,e){return Math.abs(e[1])-Math.abs(n[1])}function WM(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,o=new Ft,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const f=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==_){let k=function(){K.dispose(),r.delete(h),h.removeEventListener("dispose",k)};var d=k;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let M=0;x===!0&&(M=1),S===!0&&(M=2),C===!0&&(M=3);let T=h.attributes.position.count*M,B=1;T>e.maxTextureSize&&(B=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const G=new Float32Array(T*B*4*_),K=new dm(G,T,B,_);K.type=Ni,K.needsUpdate=!0;const D=M*4;for(let W=0;W<_;W++){const Q=w[W],J=A[W],ee=L[W],ne=T*B*4*W;for(let xe=0;xe<Q.count;xe++){const de=xe*D;x===!0&&(o.fromBufferAttribute(Q,xe),G[ne+de+0]=o.x,G[ne+de+1]=o.y,G[ne+de+2]=o.z,G[ne+de+3]=0),S===!0&&(o.fromBufferAttribute(J,xe),G[ne+de+4]=o.x,G[ne+de+5]=o.y,G[ne+de+6]=o.z,G[ne+de+7]=0),C===!0&&(o.fromBufferAttribute(ee,xe),G[ne+de+8]=o.x,G[ne+de+9]=o.y,G[ne+de+10]=o.z,G[ne+de+11]=ee.itemSize===4?o.w:1)}}m={count:_,texture:K,size:new Ee(T,B)},r.set(h,m),h.addEventListener("dispose",k)}let p=0;for(let x=0;x<f.length;x++)p+=f[x];const v=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",v),u.getUniforms().setValue(n,"morphTargetInfluences",f),u.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=i[h.id];if(_===void 0||_.length!==g){_=[];for(let S=0;S<g;S++)_[S]=[S,0];i[h.id]=_}for(let S=0;S<g;S++){const C=_[S];C[0]=S,C[1]=f[S]}_.sort(VM);for(let S=0;S<8;S++)S<g&&_[S][1]?(a[S][0]=_[S][0],a[S][1]=_[S][1]):(a[S][0]=Number.MAX_SAFE_INTEGER,a[S][1]=0);a.sort(HM);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let v=0;for(let S=0;S<8;S++){const C=a[S],w=C[0],A=C[1];w!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+S)!==m[w]&&h.setAttribute("morphTarget"+S,m[w]),p&&h.getAttribute("morphNormal"+S)!==p[w]&&h.setAttribute("morphNormal"+S,p[w]),s[S]=A,v+=A):(m&&h.hasAttribute("morphTarget"+S)===!0&&h.deleteAttribute("morphTarget"+S),p&&h.hasAttribute("morphNormal"+S)===!0&&h.deleteAttribute("morphNormal"+S),s[S]=0)}const x=h.morphTargetsRelative?1:1-v;u.getUniforms().setValue(n,"morphTargetBaseInfluence",x),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function XM(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class bm extends Dn{constructor(e,t,i,s,r,o,a,c,l,h){if(h=h!==void 0?h:Ws,h!==Ws&&h!==ro)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ws&&(i=os),i===void 0&&h===ro&&(i=Vs),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:tn,this.minFilter=c!==void 0?c:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const wm=new Dn,Tm=new bm(1,1);Tm.compareFunction=lm;const Em=new dm,Am=new Rv,Cm=new ym,Ld=[],Dd=[],Id=new Float32Array(16),zd=new Float32Array(9),Ud=new Float32Array(4);function mo(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ld[s];if(r===void 0&&(r=new Float32Array(s),Ld[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function sn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function rn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function el(n,e){let t=Dd[e];t===void 0&&(t=new Int32Array(e),Dd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function qM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function YM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2fv(this.addr,e),rn(t,e)}}function jM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;n.uniform3fv(this.addr,e),rn(t,e)}}function $M(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4fv(this.addr,e),rn(t,e)}}function KM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,i))return;Ud.set(i),n.uniformMatrix2fv(this.addr,!1,Ud),rn(t,i)}}function JM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,i))return;zd.set(i),n.uniformMatrix3fv(this.addr,!1,zd),rn(t,i)}}function ZM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,i))return;Id.set(i),n.uniformMatrix4fv(this.addr,!1,Id),rn(t,i)}}function QM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function e1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2iv(this.addr,e),rn(t,e)}}function t1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3iv(this.addr,e),rn(t,e)}}function n1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4iv(this.addr,e),rn(t,e)}}function i1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function s1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2uiv(this.addr,e),rn(t,e)}}function r1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3uiv(this.addr,e),rn(t,e)}}function o1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4uiv(this.addr,e),rn(t,e)}}function a1(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Tm:wm;t.setTexture2D(e||r,s)}function c1(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Am,s)}function l1(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Cm,s)}function h1(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Em,s)}function u1(n){switch(n){case 5126:return qM;case 35664:return YM;case 35665:return jM;case 35666:return $M;case 35674:return KM;case 35675:return JM;case 35676:return ZM;case 5124:case 35670:return QM;case 35667:case 35671:return e1;case 35668:case 35672:return t1;case 35669:case 35673:return n1;case 5125:return i1;case 36294:return s1;case 36295:return r1;case 36296:return o1;case 35678:case 36198:case 36298:case 36306:case 35682:return a1;case 35679:case 36299:case 36307:return c1;case 35680:case 36300:case 36308:case 36293:return l1;case 36289:case 36303:case 36311:case 36292:return h1}}function f1(n,e){n.uniform1fv(this.addr,e)}function d1(n,e){const t=mo(e,this.size,2);n.uniform2fv(this.addr,t)}function p1(n,e){const t=mo(e,this.size,3);n.uniform3fv(this.addr,t)}function m1(n,e){const t=mo(e,this.size,4);n.uniform4fv(this.addr,t)}function g1(n,e){const t=mo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function _1(n,e){const t=mo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function v1(n,e){const t=mo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function x1(n,e){n.uniform1iv(this.addr,e)}function y1(n,e){n.uniform2iv(this.addr,e)}function M1(n,e){n.uniform3iv(this.addr,e)}function S1(n,e){n.uniform4iv(this.addr,e)}function b1(n,e){n.uniform1uiv(this.addr,e)}function w1(n,e){n.uniform2uiv(this.addr,e)}function T1(n,e){n.uniform3uiv(this.addr,e)}function E1(n,e){n.uniform4uiv(this.addr,e)}function A1(n,e,t){const i=this.cache,s=e.length,r=el(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||wm,r[o])}function C1(n,e,t){const i=this.cache,s=e.length,r=el(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Am,r[o])}function R1(n,e,t){const i=this.cache,s=e.length,r=el(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Cm,r[o])}function P1(n,e,t){const i=this.cache,s=e.length,r=el(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Em,r[o])}function L1(n){switch(n){case 5126:return f1;case 35664:return d1;case 35665:return p1;case 35666:return m1;case 35674:return g1;case 35675:return _1;case 35676:return v1;case 5124:case 35670:return x1;case 35667:case 35671:return y1;case 35668:case 35672:return M1;case 35669:case 35673:return S1;case 5125:return b1;case 36294:return w1;case 36295:return T1;case 36296:return E1;case 35678:case 36198:case 36298:case 36306:case 35682:return A1;case 35679:case 36299:case 36307:return C1;case 35680:case 36300:case 36308:case 36293:return R1;case 36289:case 36303:case 36311:case 36292:return P1}}class D1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=u1(t.type)}}class I1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=L1(t.type)}}class z1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Kl=/(\w+)(\])?(\[|\.)?/g;function kd(n,e){n.seq.push(e),n.map[e.id]=e}function U1(n,e,t){const i=n.name,s=i.length;for(Kl.lastIndex=0;;){const r=Kl.exec(i),o=Kl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){kd(t,l===void 0?new D1(a,n,e):new I1(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new z1(a),kd(t,u)),t=u}}}class cc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);U1(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Nd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const k1=37297;let N1=0;function O1(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function F1(n){const e=Tt.getPrimaries(Tt.workingColorSpace),t=Tt.getPrimaries(n);let i;switch(e===t?i="":e===Tc&&t===wc?i="LinearDisplayP3ToLinearSRGB":e===wc&&t===Tc&&(i="LinearSRGBToLinearDisplayP3"),n){case Hi:case Zc:return[i,"LinearTransferOETF"];case pn:case Au:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Od(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+O1(n.getShaderSource(e),o)}else return s}function B1(n,e){const t=F1(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function G1(n,e){let t;switch(e){case ev:t="Linear";break;case tv:t="Reinhard";break;case nv:t="OptimizedCineon";break;case Zp:t="ACESFilmic";break;case sv:t="AgX";break;case iv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function H1(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Hr).join(`
`)}function V1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Hr).join(`
`)}function W1(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function X1(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Hr(n){return n!==""}function Fd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xh(n){return n.replace(q1,j1)}const Y1=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function j1(n,e){let t=at[e];if(t===void 0){const i=Y1.get(e);if(i!==void 0)t=at[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Xh(t)}const $1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gd(n){return n.replace($1,K1)}function K1(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hd(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function J1(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Kp?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Jp?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Di&&(e="SHADOWMAP_TYPE_VSM"),e}function Z1(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case io:case so:e="ENVMAP_TYPE_CUBE";break;case Jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Q1(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case so:e="ENVMAP_MODE_REFRACTION";break}return e}function eS(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case wu:e="ENVMAP_BLENDING_MULTIPLY";break;case Z_:e="ENVMAP_BLENDING_MIX";break;case Q_:e="ENVMAP_BLENDING_ADD";break}return e}function tS(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function nS(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=J1(t),l=Z1(t),h=Q1(t),u=eS(t),f=tS(t),d=t.isWebGL2?"":H1(t),g=V1(t),_=W1(r),m=s.createProgram();let p,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Hr).join(`
`),p.length>0&&(p+=`
`),v=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Hr).join(`
`),v.length>0&&(v+=`
`)):(p=[Hd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),v=[d,Hd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==us?"#define TONE_MAPPING":"",t.toneMapping!==us?at.tonemapping_pars_fragment:"",t.toneMapping!==us?G1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,B1("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hr).join(`
`)),o=Xh(o),o=Fd(o,t),o=Bd(o,t),a=Xh(a),a=Fd(a,t),a=Bd(a,t),o=Gd(o),a=Gd(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===od?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===od?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const S=x+p+o,C=x+v+a,w=Nd(s,s.VERTEX_SHADER,S),A=Nd(s,s.FRAGMENT_SHADER,C);s.attachShader(m,w),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function L(G){if(n.debug.checkShaderErrors){const K=s.getProgramInfoLog(m).trim(),D=s.getShaderInfoLog(w).trim(),k=s.getShaderInfoLog(A).trim();let W=!0,Q=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,w,A);else{const J=Od(s,w,"vertex"),ee=Od(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+K+`
`+J+`
`+ee)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(D===""||k==="")&&(Q=!1);Q&&(G.diagnostics={runnable:W,programLog:K,vertexShader:{log:D,prefix:p},fragmentShader:{log:k,prefix:v}})}s.deleteShader(w),s.deleteShader(A),M=new cc(s,m),T=X1(s,m)}let M;this.getUniforms=function(){return M===void 0&&L(this),M};let T;this.getAttributes=function(){return T===void 0&&L(this),T};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(m,k1)),B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=N1++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let iS=0;class sS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new rS(e),t.set(e,i)),i}}class rS{constructor(e){this.id=iS++,this.code=e,this.usedTimes=0}}function oS(n,e,t,i,s,r,o){const a=new pm,c=new sS,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,T,B,G,K){const D=G.fog,k=K.geometry,W=M.isMeshStandardMaterial?G.environment:null,Q=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),J=Q&&Q.mapping===Jc?Q.image.height:null,ee=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const ne=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,xe=ne!==void 0?ne.length:0;let de=0;k.morphAttributes.position!==void 0&&(de=1),k.morphAttributes.normal!==void 0&&(de=2),k.morphAttributes.color!==void 0&&(de=3);let j,ae,Ae,Ge;if(ee){const An=_i[ee];j=An.vertexShader,ae=An.fragmentShader}else j=M.vertexShader,ae=M.fragmentShader,c.update(M),Ae=c.getVertexShaderID(M),Ge=c.getFragmentShaderID(M);const H=n.getRenderTarget(),re=K.isInstancedMesh===!0,fe=K.isBatchedMesh===!0,me=!!M.map,Ce=!!M.matcap,U=!!Q,he=!!M.aoMap,ie=!!M.lightMap,Me=!!M.bumpMap,ce=!!M.normalMap,Be=!!M.displacementMap,te=!!M.emissiveMap,b=!!M.metalnessMap,y=!!M.roughnessMap,N=M.anisotropy>0,q=M.clearcoat>0,Z=M.iridescence>0,$=M.sheen>0,Re=M.transmission>0,ge=N&&!!M.anisotropyMap,ye=q&&!!M.clearcoatMap,We=q&&!!M.clearcoatNormalMap,et=q&&!!M.clearcoatRoughnessMap,oe=Z&&!!M.iridescenceMap,mt=Z&&!!M.iridescenceThicknessMap,Fe=$&&!!M.sheenColorMap,Ne=$&&!!M.sheenRoughnessMap,Ue=!!M.specularMap,Ie=!!M.specularColorMap,ot=!!M.specularIntensityMap,St=Re&&!!M.transmissionMap,Vt=Re&&!!M.thicknessMap,ht=!!M.gradientMap,be=!!M.alphaMap,z=M.alphaTest>0,Pe=!!M.alphaHash,Le=!!M.extensions,Qe=!!k.attributes.uv1,Je=!!k.attributes.uv2,Pt=!!k.attributes.uv3;let Lt=us;return M.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Lt=n.toneMapping),{isWebGL2:h,shaderID:ee,shaderType:M.type,shaderName:M.name,vertexShader:j,fragmentShader:ae,defines:M.defines,customVertexShaderID:Ae,customFragmentShaderID:Ge,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:fe,instancing:re,instancingColor:re&&K.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:H===null?n.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Hi,map:me,matcap:Ce,envMap:U,envMapMode:U&&Q.mapping,envMapCubeUVHeight:J,aoMap:he,lightMap:ie,bumpMap:Me,normalMap:ce,displacementMap:f&&Be,emissiveMap:te,normalMapObjectSpace:ce&&M.normalMapType===mv,normalMapTangentSpace:ce&&M.normalMapType===Eu,metalnessMap:b,roughnessMap:y,anisotropy:N,anisotropyMap:ge,clearcoat:q,clearcoatMap:ye,clearcoatNormalMap:We,clearcoatRoughnessMap:et,iridescence:Z,iridescenceMap:oe,iridescenceThicknessMap:mt,sheen:$,sheenColorMap:Fe,sheenRoughnessMap:Ne,specularMap:Ue,specularColorMap:Ie,specularIntensityMap:ot,transmission:Re,transmissionMap:St,thicknessMap:Vt,gradientMap:ht,opaque:M.transparent===!1&&M.blending===$r,alphaMap:be,alphaTest:z,alphaHash:Pe,combine:M.combine,mapUv:me&&_(M.map.channel),aoMapUv:he&&_(M.aoMap.channel),lightMapUv:ie&&_(M.lightMap.channel),bumpMapUv:Me&&_(M.bumpMap.channel),normalMapUv:ce&&_(M.normalMap.channel),displacementMapUv:Be&&_(M.displacementMap.channel),emissiveMapUv:te&&_(M.emissiveMap.channel),metalnessMapUv:b&&_(M.metalnessMap.channel),roughnessMapUv:y&&_(M.roughnessMap.channel),anisotropyMapUv:ge&&_(M.anisotropyMap.channel),clearcoatMapUv:ye&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:We&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(M.sheenRoughnessMap.channel),specularMapUv:Ue&&_(M.specularMap.channel),specularColorMapUv:Ie&&_(M.specularColorMap.channel),specularIntensityMapUv:ot&&_(M.specularIntensityMap.channel),transmissionMapUv:St&&_(M.transmissionMap.channel),thicknessMapUv:Vt&&_(M.thicknessMap.channel),alphaMapUv:be&&_(M.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ce||N),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Qe,vertexUv2s:Je,vertexUv3s:Pt,pointsUvs:K.isPoints===!0&&!!k.attributes.uv&&(me||be),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:K.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:de,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Lt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:me&&M.map.isVideoTexture===!0&&Tt.getTransfer(M.map.colorSpace)===Nt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===gn,flipSided:M.side===wn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:Le&&M.extensions.derivatives===!0,extensionFragDepth:Le&&M.extensions.fragDepth===!0,extensionDrawBuffers:Le&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:Le&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Le&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const B in M.defines)T.push(B),T.push(M.defines[B]);return M.isRawShaderMaterial===!1&&(v(T,M),x(T,M),T.push(n.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function v(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function S(M){const T=g[M.type];let B;if(T){const G=_i[T];B=Hv.clone(G.uniforms)}else B=M.uniforms;return B}function C(M,T){let B;for(let G=0,K=l.length;G<K;G++){const D=l[G];if(D.cacheKey===T){B=D,++B.usedTimes;break}}return B===void 0&&(B=new nS(n,T,M,r),l.push(B)),B}function w(M){if(--M.usedTimes===0){const T=l.indexOf(M);l[T]=l[l.length-1],l.pop(),M.destroy()}}function A(M){c.remove(M)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:L}}function aS(){let n=new WeakMap;function e(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function t(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function cS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Vd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Wd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u,f,d,g,_,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,f){t.length>1&&t.sort(u||cS),i.length>1&&i.sort(f||Vd),s.length>1&&s.sort(f||Vd)}function h(){for(let u=e,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function lS(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Wd,n.set(i,[o])):s>=r.length?(o=new Wd,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function hS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new De};break;case"SpotLight":t={position:new R,direction:new R,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function uS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let fS=0;function dS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function pS(n,e){const t=new hS,i=uS(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new R);const r=new R,o=new Rt,a=new Rt;function c(h,u){let f=0,d=0,g=0;for(let G=0;G<9;G++)s.probe[G].set(0,0,0);let _=0,m=0,p=0,v=0,x=0,S=0,C=0,w=0,A=0,L=0,M=0;h.sort(dS);const T=u===!0?Math.PI:1;for(let G=0,K=h.length;G<K;G++){const D=h[G],k=D.color,W=D.intensity,Q=D.distance,J=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=k.r*W*T,d+=k.g*W*T,g+=k.b*W*T;else if(D.isLightProbe){for(let ee=0;ee<9;ee++)s.probe[ee].addScaledVector(D.sh.coefficients[ee],W);M++}else if(D.isDirectionalLight){const ee=t.get(D);if(ee.color.copy(D.color).multiplyScalar(D.intensity*T),D.castShadow){const ne=D.shadow,xe=i.get(D);xe.shadowBias=ne.bias,xe.shadowNormalBias=ne.normalBias,xe.shadowRadius=ne.radius,xe.shadowMapSize=ne.mapSize,s.directionalShadow[_]=xe,s.directionalShadowMap[_]=J,s.directionalShadowMatrix[_]=D.shadow.matrix,S++}s.directional[_]=ee,_++}else if(D.isSpotLight){const ee=t.get(D);ee.position.setFromMatrixPosition(D.matrixWorld),ee.color.copy(k).multiplyScalar(W*T),ee.distance=Q,ee.coneCos=Math.cos(D.angle),ee.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),ee.decay=D.decay,s.spot[p]=ee;const ne=D.shadow;if(D.map&&(s.spotLightMap[A]=D.map,A++,ne.updateMatrices(D),D.castShadow&&L++),s.spotLightMatrix[p]=ne.matrix,D.castShadow){const xe=i.get(D);xe.shadowBias=ne.bias,xe.shadowNormalBias=ne.normalBias,xe.shadowRadius=ne.radius,xe.shadowMapSize=ne.mapSize,s.spotShadow[p]=xe,s.spotShadowMap[p]=J,w++}p++}else if(D.isRectAreaLight){const ee=t.get(D);ee.color.copy(k).multiplyScalar(W),ee.halfWidth.set(D.width*.5,0,0),ee.halfHeight.set(0,D.height*.5,0),s.rectArea[v]=ee,v++}else if(D.isPointLight){const ee=t.get(D);if(ee.color.copy(D.color).multiplyScalar(D.intensity*T),ee.distance=D.distance,ee.decay=D.decay,D.castShadow){const ne=D.shadow,xe=i.get(D);xe.shadowBias=ne.bias,xe.shadowNormalBias=ne.normalBias,xe.shadowRadius=ne.radius,xe.shadowMapSize=ne.mapSize,xe.shadowCameraNear=ne.camera.near,xe.shadowCameraFar=ne.camera.far,s.pointShadow[m]=xe,s.pointShadowMap[m]=J,s.pointShadowMatrix[m]=D.shadow.matrix,C++}s.point[m]=ee,m++}else if(D.isHemisphereLight){const ee=t.get(D);ee.skyColor.copy(D.color).multiplyScalar(W*T),ee.groundColor.copy(D.groundColor).multiplyScalar(W*T),s.hemi[x]=ee,x++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=we.LTC_FLOAT_1,s.rectAreaLTC2=we.LTC_FLOAT_2):(s.rectAreaLTC1=we.LTC_HALF_1,s.rectAreaLTC2=we.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=we.LTC_FLOAT_1,s.rectAreaLTC2=we.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=we.LTC_HALF_1,s.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=d,s.ambient[2]=g;const B=s.hash;(B.directionalLength!==_||B.pointLength!==m||B.spotLength!==p||B.rectAreaLength!==v||B.hemiLength!==x||B.numDirectionalShadows!==S||B.numPointShadows!==C||B.numSpotShadows!==w||B.numSpotMaps!==A||B.numLightProbes!==M)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=v,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=w+A-L,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=M,B.directionalLength=_,B.pointLength=m,B.spotLength=p,B.rectAreaLength=v,B.hemiLength=x,B.numDirectionalShadows=S,B.numPointShadows=C,B.numSpotShadows=w,B.numSpotMaps=A,B.numLightProbes=M,s.version=fS++)}function l(h,u){let f=0,d=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){const S=h[v];if(S.isDirectionalLight){const C=s.directional[f];C.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),f++}else if(S.isSpotLight){const C=s.spot[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const C=s.rectArea[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const C=s.point[d];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const C=s.hemi[m];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function Xd(n,e){const t=new pS(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function o(u){i.push(u)}function a(u){s.push(u)}function c(u){t.setup(i,u)}function l(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function mS(n,e){let t=new WeakMap;function i(r,o=0){const a=t.get(r);let c;return a===void 0?(c=new Xd(n,e),t.set(r,[c])):o>=a.length?(c=new Xd(n,e),a.push(c)):c=a[o],c}function s(){t=new WeakMap}return{get:i,dispose:s}}class gS extends qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _S extends qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function yS(n,e,t){let i=new Ru;const s=new Ee,r=new Ee,o=new Ft,a=new gS({depthPacking:pv}),c=new _S,l={},h=t.maxTextureSize,u={[xs]:wn,[wn]:xs,[gn]:gn},f=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:vS,fragmentShader:xS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new jt;g.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new I(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kp;let p=this.type;this.render=function(w,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=n.getRenderTarget(),T=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),G=n.state;G.setBlending(hs),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const K=p!==Di&&this.type===Di,D=p===Di&&this.type!==Di;for(let k=0,W=w.length;k<W;k++){const Q=w[k],J=Q.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);const ee=J.getFrameExtents();if(s.multiply(ee),r.copy(J.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ee.x),s.x=r.x*ee.x,J.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ee.y),s.y=r.y*ee.y,J.mapSize.y=r.y)),J.map===null||K===!0||D===!0){const xe=this.type!==Di?{minFilter:tn,magFilter:tn}:{};J.map!==null&&J.map.dispose(),J.map=new Js(s.x,s.y,xe),J.map.texture.name=Q.name+".shadowMap",J.camera.updateProjectionMatrix()}n.setRenderTarget(J.map),n.clear();const ne=J.getViewportCount();for(let xe=0;xe<ne;xe++){const de=J.getViewport(xe);o.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),G.viewport(o),J.updateMatrices(Q,xe),i=J.getFrustum(),S(A,L,J.camera,Q,this.type)}J.isPointLightShadow!==!0&&this.type===Di&&v(J,L),J.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,T,B)};function v(w,A){const L=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Js(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,L,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,L,d,_,null)}function x(w,A,L,M){let T=null;const B=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)T=B;else if(T=L.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const G=T.uuid,K=A.uuid;let D=l[G];D===void 0&&(D={},l[G]=D);let k=D[K];k===void 0&&(k=T.clone(),D[K]=k,A.addEventListener("dispose",C)),T=k}if(T.visible=A.visible,T.wireframe=A.wireframe,M===Di?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:u[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const G=n.properties.get(T);G.light=L}return T}function S(w,A,L,M,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===Di)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const K=e.update(w),D=w.material;if(Array.isArray(D)){const k=K.groups;for(let W=0,Q=k.length;W<Q;W++){const J=k[W],ee=D[J.materialIndex];if(ee&&ee.visible){const ne=x(w,ee,M,T);w.onBeforeShadow(n,w,A,L,K,ne,J),n.renderBufferDirect(L,null,K,ne,w,J),w.onAfterShadow(n,w,A,L,K,ne,J)}}}else if(D.visible){const k=x(w,D,M,T);w.onBeforeShadow(n,w,A,L,K,k,null),n.renderBufferDirect(L,null,K,k,w,null),w.onAfterShadow(n,w,A,L,K,k,null)}}const G=w.children;for(let K=0,D=G.length;K<D;K++)S(G[K],A,L,M,T)}function C(w){w.target.removeEventListener("dispose",C);for(const L in l){const M=l[L],T=w.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function MS(n,e,t){const i=t.isWebGL2;function s(){let z=!1;const Pe=new Ft;let Le=null;const Qe=new Ft(0,0,0,0);return{setMask:function(Je){Le!==Je&&!z&&(n.colorMask(Je,Je,Je,Je),Le=Je)},setLocked:function(Je){z=Je},setClear:function(Je,Pt,Lt,on,An){An===!0&&(Je*=on,Pt*=on,Lt*=on),Pe.set(Je,Pt,Lt,on),Qe.equals(Pe)===!1&&(n.clearColor(Je,Pt,Lt,on),Qe.copy(Pe))},reset:function(){z=!1,Le=null,Qe.set(-1,0,0,0)}}}function r(){let z=!1,Pe=null,Le=null,Qe=null;return{setTest:function(Je){Je?fe(n.DEPTH_TEST):me(n.DEPTH_TEST)},setMask:function(Je){Pe!==Je&&!z&&(n.depthMask(Je),Pe=Je)},setFunc:function(Je){if(Le!==Je){switch(Je){case X_:n.depthFunc(n.NEVER);break;case q_:n.depthFunc(n.ALWAYS);break;case Y_:n.depthFunc(n.LESS);break;case Sc:n.depthFunc(n.LEQUAL);break;case j_:n.depthFunc(n.EQUAL);break;case $_:n.depthFunc(n.GEQUAL);break;case K_:n.depthFunc(n.GREATER);break;case J_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Le=Je}},setLocked:function(Je){z=Je},setClear:function(Je){Qe!==Je&&(n.clearDepth(Je),Qe=Je)},reset:function(){z=!1,Pe=null,Le=null,Qe=null}}}function o(){let z=!1,Pe=null,Le=null,Qe=null,Je=null,Pt=null,Lt=null,on=null,An=null;return{setTest:function(Dt){z||(Dt?fe(n.STENCIL_TEST):me(n.STENCIL_TEST))},setMask:function(Dt){Pe!==Dt&&!z&&(n.stencilMask(Dt),Pe=Dt)},setFunc:function(Dt,Cn,pi){(Le!==Dt||Qe!==Cn||Je!==pi)&&(n.stencilFunc(Dt,Cn,pi),Le=Dt,Qe=Cn,Je=pi)},setOp:function(Dt,Cn,pi){(Pt!==Dt||Lt!==Cn||on!==pi)&&(n.stencilOp(Dt,Cn,pi),Pt=Dt,Lt=Cn,on=pi)},setLocked:function(Dt){z=Dt},setClear:function(Dt){An!==Dt&&(n.clearStencil(Dt),An=Dt)},reset:function(){z=!1,Pe=null,Le=null,Qe=null,Je=null,Pt=null,Lt=null,on=null,An=null}}}const a=new s,c=new r,l=new o,h=new WeakMap,u=new WeakMap;let f={},d={},g=new WeakMap,_=[],m=null,p=!1,v=null,x=null,S=null,C=null,w=null,A=null,L=null,M=new De(0,0,0),T=0,B=!1,G=null,K=null,D=null,k=null,W=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,ee=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ne)[1]),J=ee>=1):ne.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),J=ee>=2);let xe=null,de={};const j=n.getParameter(n.SCISSOR_BOX),ae=n.getParameter(n.VIEWPORT),Ae=new Ft().fromArray(j),Ge=new Ft().fromArray(ae);function H(z,Pe,Le,Qe){const Je=new Uint8Array(4),Pt=n.createTexture();n.bindTexture(z,Pt),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<Le;Lt++)i&&(z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY)?n.texImage3D(Pe,0,n.RGBA,1,1,Qe,0,n.RGBA,n.UNSIGNED_BYTE,Je):n.texImage2D(Pe+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Je);return Pt}const re={};re[n.TEXTURE_2D]=H(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=H(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(re[n.TEXTURE_2D_ARRAY]=H(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=H(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),fe(n.DEPTH_TEST),c.setFunc(Sc),te(!1),b(Cf),fe(n.CULL_FACE),ce(hs);function fe(z){f[z]!==!0&&(n.enable(z),f[z]=!0)}function me(z){f[z]!==!1&&(n.disable(z),f[z]=!1)}function Ce(z,Pe){return d[z]!==Pe?(n.bindFramebuffer(z,Pe),d[z]=Pe,i&&(z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Pe),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function U(z,Pe){let Le=_,Qe=!1;if(z)if(Le=g.get(Pe),Le===void 0&&(Le=[],g.set(Pe,Le)),z.isWebGLMultipleRenderTargets){const Je=z.texture;if(Le.length!==Je.length||Le[0]!==n.COLOR_ATTACHMENT0){for(let Pt=0,Lt=Je.length;Pt<Lt;Pt++)Le[Pt]=n.COLOR_ATTACHMENT0+Pt;Le.length=Je.length,Qe=!0}}else Le[0]!==n.COLOR_ATTACHMENT0&&(Le[0]=n.COLOR_ATTACHMENT0,Qe=!0);else Le[0]!==n.BACK&&(Le[0]=n.BACK,Qe=!0);Qe&&(t.isWebGL2?n.drawBuffers(Le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Le))}function he(z){return m!==z?(n.useProgram(z),m=z,!0):!1}const ie={[Us]:n.FUNC_ADD,[P_]:n.FUNC_SUBTRACT,[L_]:n.FUNC_REVERSE_SUBTRACT};if(i)ie[Lf]=n.MIN,ie[Df]=n.MAX;else{const z=e.get("EXT_blend_minmax");z!==null&&(ie[Lf]=z.MIN_EXT,ie[Df]=z.MAX_EXT)}const Me={[D_]:n.ZERO,[I_]:n.ONE,[z_]:n.SRC_COLOR,[kh]:n.SRC_ALPHA,[B_]:n.SRC_ALPHA_SATURATE,[O_]:n.DST_COLOR,[k_]:n.DST_ALPHA,[U_]:n.ONE_MINUS_SRC_COLOR,[Nh]:n.ONE_MINUS_SRC_ALPHA,[F_]:n.ONE_MINUS_DST_COLOR,[N_]:n.ONE_MINUS_DST_ALPHA,[G_]:n.CONSTANT_COLOR,[H_]:n.ONE_MINUS_CONSTANT_COLOR,[V_]:n.CONSTANT_ALPHA,[W_]:n.ONE_MINUS_CONSTANT_ALPHA};function ce(z,Pe,Le,Qe,Je,Pt,Lt,on,An,Dt){if(z===hs){p===!0&&(me(n.BLEND),p=!1);return}if(p===!1&&(fe(n.BLEND),p=!0),z!==R_){if(z!==v||Dt!==B){if((x!==Us||w!==Us)&&(n.blendEquation(n.FUNC_ADD),x=Us,w=Us),Dt)switch(z){case $r:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ta:n.blendFunc(n.ONE,n.ONE);break;case Rf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case $r:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ta:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Rf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}S=null,C=null,A=null,L=null,M.set(0,0,0),T=0,v=z,B=Dt}return}Je=Je||Pe,Pt=Pt||Le,Lt=Lt||Qe,(Pe!==x||Je!==w)&&(n.blendEquationSeparate(ie[Pe],ie[Je]),x=Pe,w=Je),(Le!==S||Qe!==C||Pt!==A||Lt!==L)&&(n.blendFuncSeparate(Me[Le],Me[Qe],Me[Pt],Me[Lt]),S=Le,C=Qe,A=Pt,L=Lt),(on.equals(M)===!1||An!==T)&&(n.blendColor(on.r,on.g,on.b,An),M.copy(on),T=An),v=z,B=!1}function Be(z,Pe){z.side===gn?me(n.CULL_FACE):fe(n.CULL_FACE);let Le=z.side===wn;Pe&&(Le=!Le),te(Le),z.blending===$r&&z.transparent===!1?ce(hs):ce(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),c.setFunc(z.depthFunc),c.setTest(z.depthTest),c.setMask(z.depthWrite),a.setMask(z.colorWrite);const Qe=z.stencilWrite;l.setTest(Qe),Qe&&(l.setMask(z.stencilWriteMask),l.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),l.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),N(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?fe(n.SAMPLE_ALPHA_TO_COVERAGE):me(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(z){G!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),G=z)}function b(z){z!==A_?(fe(n.CULL_FACE),z!==K&&(z===Cf?n.cullFace(n.BACK):z===C_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):me(n.CULL_FACE),K=z}function y(z){z!==D&&(J&&n.lineWidth(z),D=z)}function N(z,Pe,Le){z?(fe(n.POLYGON_OFFSET_FILL),(k!==Pe||W!==Le)&&(n.polygonOffset(Pe,Le),k=Pe,W=Le)):me(n.POLYGON_OFFSET_FILL)}function q(z){z?fe(n.SCISSOR_TEST):me(n.SCISSOR_TEST)}function Z(z){z===void 0&&(z=n.TEXTURE0+Q-1),xe!==z&&(n.activeTexture(z),xe=z)}function $(z,Pe,Le){Le===void 0&&(xe===null?Le=n.TEXTURE0+Q-1:Le=xe);let Qe=de[Le];Qe===void 0&&(Qe={type:void 0,texture:void 0},de[Le]=Qe),(Qe.type!==z||Qe.texture!==Pe)&&(xe!==Le&&(n.activeTexture(Le),xe=Le),n.bindTexture(z,Pe||re[z]),Qe.type=z,Qe.texture=Pe)}function Re(){const z=de[xe];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function ge(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ye(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function We(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function et(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function mt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Fe(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ne(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ue(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ie(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ot(z){Ae.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Ae.copy(z))}function St(z){Ge.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Ge.copy(z))}function Vt(z,Pe){let Le=u.get(Pe);Le===void 0&&(Le=new WeakMap,u.set(Pe,Le));let Qe=Le.get(z);Qe===void 0&&(Qe=n.getUniformBlockIndex(Pe,z.name),Le.set(z,Qe))}function ht(z,Pe){const Qe=u.get(Pe).get(z);h.get(Pe)!==Qe&&(n.uniformBlockBinding(Pe,Qe,z.__bindingPointIndex),h.set(Pe,Qe))}function be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},xe=null,de={},d={},g=new WeakMap,_=[],m=null,p=!1,v=null,x=null,S=null,C=null,w=null,A=null,L=null,M=new De(0,0,0),T=0,B=!1,G=null,K=null,D=null,k=null,W=null,Ae.set(0,0,n.canvas.width,n.canvas.height),Ge.set(0,0,n.canvas.width,n.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:fe,disable:me,bindFramebuffer:Ce,drawBuffers:U,useProgram:he,setBlending:ce,setMaterial:Be,setFlipSided:te,setCullFace:b,setLineWidth:y,setPolygonOffset:N,setScissorTest:q,activeTexture:Z,bindTexture:$,unbindTexture:Re,compressedTexImage2D:ge,compressedTexImage3D:ye,texImage2D:Ue,texImage3D:Ie,updateUBOMapping:Vt,uniformBlockBinding:ht,texStorage2D:Fe,texStorage3D:Ne,texSubImage2D:We,texSubImage3D:et,compressedTexSubImage2D:oe,compressedTexSubImage3D:mt,scissor:ot,viewport:St,reset:be}}function SS(n,e,t,i,s,r,o){const a=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,y){return d?new OffscreenCanvas(b,y):Ac("canvas")}function _(b,y,N,q){let Z=1;if((b.width>q||b.height>q)&&(Z=q/Math.max(b.width,b.height)),Z<1||y===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const $=y?Wh:Math.floor,Re=$(Z*b.width),ge=$(Z*b.height);u===void 0&&(u=g(Re,ge));const ye=N?g(Re,ge):u;return ye.width=Re,ye.height=ge,ye.getContext("2d").drawImage(b,0,0,Re,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Re+"x"+ge+")."),ye}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return ad(b.width)&&ad(b.height)}function p(b){return a?!1:b.wrapS!==ei||b.wrapT!==ei||b.minFilter!==tn&&b.minFilter!==Wn}function v(b,y){return b.generateMipmaps&&y&&b.minFilter!==tn&&b.minFilter!==Wn}function x(b){n.generateMipmap(b)}function S(b,y,N,q,Z=!1){if(a===!1)return y;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let $=y;if(y===n.RED&&(N===n.FLOAT&&($=n.R32F),N===n.HALF_FLOAT&&($=n.R16F),N===n.UNSIGNED_BYTE&&($=n.R8)),y===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&($=n.R8UI),N===n.UNSIGNED_SHORT&&($=n.R16UI),N===n.UNSIGNED_INT&&($=n.R32UI),N===n.BYTE&&($=n.R8I),N===n.SHORT&&($=n.R16I),N===n.INT&&($=n.R32I)),y===n.RG&&(N===n.FLOAT&&($=n.RG32F),N===n.HALF_FLOAT&&($=n.RG16F),N===n.UNSIGNED_BYTE&&($=n.RG8)),y===n.RGBA){const Re=Z?bc:Tt.getTransfer(q);N===n.FLOAT&&($=n.RGBA32F),N===n.HALF_FLOAT&&($=n.RGBA16F),N===n.UNSIGNED_BYTE&&($=Re===Nt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function C(b,y,N){return v(b,N)===!0||b.isFramebufferTexture&&b.minFilter!==tn&&b.minFilter!==Wn?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function w(b){return b===tn||b===If||b===Ml?n.NEAREST:n.LINEAR}function A(b){const y=b.target;y.removeEventListener("dispose",A),M(y),y.isVideoTexture&&h.delete(y)}function L(b){const y=b.target;y.removeEventListener("dispose",L),B(y)}function M(b){const y=i.get(b);if(y.__webglInit===void 0)return;const N=b.source,q=f.get(N);if(q){const Z=q[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(b),Object.keys(q).length===0&&f.delete(N)}i.remove(b)}function T(b){const y=i.get(b);n.deleteTexture(y.__webglTexture);const N=b.source,q=f.get(N);delete q[y.__cacheKey],o.memory.textures--}function B(b){const y=b.texture,N=i.get(b),q=i.get(y);if(q.__webglTexture!==void 0&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(N.__webglFramebuffer[Z]))for(let $=0;$<N.__webglFramebuffer[Z].length;$++)n.deleteFramebuffer(N.__webglFramebuffer[Z][$]);else n.deleteFramebuffer(N.__webglFramebuffer[Z]);N.__webglDepthbuffer&&n.deleteRenderbuffer(N.__webglDepthbuffer[Z])}else{if(Array.isArray(N.__webglFramebuffer))for(let Z=0;Z<N.__webglFramebuffer.length;Z++)n.deleteFramebuffer(N.__webglFramebuffer[Z]);else n.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&n.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&n.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let Z=0;Z<N.__webglColorRenderbuffer.length;Z++)N.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(N.__webglColorRenderbuffer[Z]);N.__webglDepthRenderbuffer&&n.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let Z=0,$=y.length;Z<$;Z++){const Re=i.get(y[Z]);Re.__webglTexture&&(n.deleteTexture(Re.__webglTexture),o.memory.textures--),i.remove(y[Z])}i.remove(y),i.remove(b)}let G=0;function K(){G=0}function D(){const b=G;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),G+=1,b}function k(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function W(b,y){const N=i.get(b);if(b.isVideoTexture&&Be(b),b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){const q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(N,b,y);return}}t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+y)}function Q(b,y){const N=i.get(b);if(b.version>0&&N.__version!==b.version){Ae(N,b,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+y)}function J(b,y){const N=i.get(b);if(b.version>0&&N.__version!==b.version){Ae(N,b,y);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+y)}function ee(b,y){const N=i.get(b);if(b.version>0&&N.__version!==b.version){Ge(N,b,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+y)}const ne={[Ks]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[Bh]:n.MIRRORED_REPEAT},xe={[tn]:n.NEAREST,[If]:n.NEAREST_MIPMAP_NEAREST,[Ml]:n.NEAREST_MIPMAP_LINEAR,[Wn]:n.LINEAR,[rv]:n.LINEAR_MIPMAP_NEAREST,[na]:n.LINEAR_MIPMAP_LINEAR},de={[gv]:n.NEVER,[Sv]:n.ALWAYS,[_v]:n.LESS,[lm]:n.LEQUAL,[vv]:n.EQUAL,[Mv]:n.GEQUAL,[xv]:n.GREATER,[yv]:n.NOTEQUAL};function j(b,y,N){if(N?(n.texParameteri(b,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ne[y.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,xe[y.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,xe[y.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(y.wrapS!==ei||y.wrapT!==ei)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,w(y.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,w(y.minFilter)),y.minFilter!==tn&&y.minFilter!==Wn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,de[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const q=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===tn||y.minFilter!==Ml&&y.minFilter!==na||y.type===Ni&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===ia&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(n.texParameterf(b,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function ae(b,y){let N=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",A));const q=y.source;let Z=f.get(q);Z===void 0&&(Z={},f.set(q,Z));const $=k(y);if($!==b.__cacheKey){Z[$]===void 0&&(Z[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Z[$].usedTimes++;const Re=Z[b.__cacheKey];Re!==void 0&&(Z[b.__cacheKey].usedTimes--,Re.usedTimes===0&&T(y)),b.__cacheKey=$,b.__webglTexture=Z[$].texture}return N}function Ae(b,y,N){let q=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=n.TEXTURE_3D);const Z=ae(b,y),$=y.source;t.bindTexture(q,b.__webglTexture,n.TEXTURE0+N);const Re=i.get($);if($.version!==Re.__version||Z===!0){t.activeTexture(n.TEXTURE0+N);const ge=Tt.getPrimaries(Tt.workingColorSpace),ye=y.colorSpace===ni?null:Tt.getPrimaries(y.colorSpace),We=y.colorSpace===ni||ge===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);const et=p(y)&&m(y.image)===!1;let oe=_(y.image,et,!1,s.maxTextureSize);oe=te(y,oe);const mt=m(oe)||a,Fe=r.convert(y.format,y.colorSpace);let Ne=r.convert(y.type),Ue=S(y.internalFormat,Fe,Ne,y.colorSpace,y.isVideoTexture);j(q,y,mt);let Ie;const ot=y.mipmaps,St=a&&y.isVideoTexture!==!0&&Ue!==am,Vt=Re.__version===void 0||Z===!0,ht=C(y,oe,mt);if(y.isDepthTexture)Ue=n.DEPTH_COMPONENT,a?y.type===Ni?Ue=n.DEPTH_COMPONENT32F:y.type===os?Ue=n.DEPTH_COMPONENT24:y.type===Vs?Ue=n.DEPTH24_STENCIL8:Ue=n.DEPTH_COMPONENT16:y.type===Ni&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Ws&&Ue===n.DEPTH_COMPONENT&&y.type!==Tu&&y.type!==os&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=os,Ne=r.convert(y.type)),y.format===ro&&Ue===n.DEPTH_COMPONENT&&(Ue=n.DEPTH_STENCIL,y.type!==Vs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Vs,Ne=r.convert(y.type))),Vt&&(St?t.texStorage2D(n.TEXTURE_2D,1,Ue,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,Fe,Ne,null));else if(y.isDataTexture)if(ot.length>0&&mt){St&&Vt&&t.texStorage2D(n.TEXTURE_2D,ht,Ue,ot[0].width,ot[0].height);for(let be=0,z=ot.length;be<z;be++)Ie=ot[be],St?t.texSubImage2D(n.TEXTURE_2D,be,0,0,Ie.width,Ie.height,Fe,Ne,Ie.data):t.texImage2D(n.TEXTURE_2D,be,Ue,Ie.width,Ie.height,0,Fe,Ne,Ie.data);y.generateMipmaps=!1}else St?(Vt&&t.texStorage2D(n.TEXTURE_2D,ht,Ue,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe.width,oe.height,Fe,Ne,oe.data)):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,Fe,Ne,oe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){St&&Vt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ht,Ue,ot[0].width,ot[0].height,oe.depth);for(let be=0,z=ot.length;be<z;be++)Ie=ot[be],y.format!==ti?Fe!==null?St?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,Ie.width,Ie.height,oe.depth,Fe,Ie.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,be,Ue,Ie.width,Ie.height,oe.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):St?t.texSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,Ie.width,Ie.height,oe.depth,Fe,Ne,Ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,be,Ue,Ie.width,Ie.height,oe.depth,0,Fe,Ne,Ie.data)}else{St&&Vt&&t.texStorage2D(n.TEXTURE_2D,ht,Ue,ot[0].width,ot[0].height);for(let be=0,z=ot.length;be<z;be++)Ie=ot[be],y.format!==ti?Fe!==null?St?t.compressedTexSubImage2D(n.TEXTURE_2D,be,0,0,Ie.width,Ie.height,Fe,Ie.data):t.compressedTexImage2D(n.TEXTURE_2D,be,Ue,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):St?t.texSubImage2D(n.TEXTURE_2D,be,0,0,Ie.width,Ie.height,Fe,Ne,Ie.data):t.texImage2D(n.TEXTURE_2D,be,Ue,Ie.width,Ie.height,0,Fe,Ne,Ie.data)}else if(y.isDataArrayTexture)St?(Vt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ht,Ue,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,Fe,Ne,oe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,oe.width,oe.height,oe.depth,0,Fe,Ne,oe.data);else if(y.isData3DTexture)St?(Vt&&t.texStorage3D(n.TEXTURE_3D,ht,Ue,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,Fe,Ne,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,oe.width,oe.height,oe.depth,0,Fe,Ne,oe.data);else if(y.isFramebufferTexture){if(Vt)if(St)t.texStorage2D(n.TEXTURE_2D,ht,Ue,oe.width,oe.height);else{let be=oe.width,z=oe.height;for(let Pe=0;Pe<ht;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Ue,be,z,0,Fe,Ne,null),be>>=1,z>>=1}}else if(ot.length>0&&mt){St&&Vt&&t.texStorage2D(n.TEXTURE_2D,ht,Ue,ot[0].width,ot[0].height);for(let be=0,z=ot.length;be<z;be++)Ie=ot[be],St?t.texSubImage2D(n.TEXTURE_2D,be,0,0,Fe,Ne,Ie):t.texImage2D(n.TEXTURE_2D,be,Ue,Fe,Ne,Ie);y.generateMipmaps=!1}else St?(Vt&&t.texStorage2D(n.TEXTURE_2D,ht,Ue,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Fe,Ne,oe)):t.texImage2D(n.TEXTURE_2D,0,Ue,Fe,Ne,oe);v(y,mt)&&x(q),Re.__version=$.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function Ge(b,y,N){if(y.image.length!==6)return;const q=ae(b,y),Z=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+N);const $=i.get(Z);if(Z.version!==$.__version||q===!0){t.activeTexture(n.TEXTURE0+N);const Re=Tt.getPrimaries(Tt.workingColorSpace),ge=y.colorSpace===ni?null:Tt.getPrimaries(y.colorSpace),ye=y.colorSpace===ni||Re===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const We=y.isCompressedTexture||y.image[0].isCompressedTexture,et=y.image[0]&&y.image[0].isDataTexture,oe=[];for(let be=0;be<6;be++)!We&&!et?oe[be]=_(y.image[be],!1,!0,s.maxCubemapSize):oe[be]=et?y.image[be].image:y.image[be],oe[be]=te(y,oe[be]);const mt=oe[0],Fe=m(mt)||a,Ne=r.convert(y.format,y.colorSpace),Ue=r.convert(y.type),Ie=S(y.internalFormat,Ne,Ue,y.colorSpace),ot=a&&y.isVideoTexture!==!0,St=$.__version===void 0||q===!0;let Vt=C(y,mt,Fe);j(n.TEXTURE_CUBE_MAP,y,Fe);let ht;if(We){ot&&St&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Vt,Ie,mt.width,mt.height);for(let be=0;be<6;be++){ht=oe[be].mipmaps;for(let z=0;z<ht.length;z++){const Pe=ht[z];y.format!==ti?Ne!==null?ot?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z,0,0,Pe.width,Pe.height,Ne,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z,Ie,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ot?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z,0,0,Pe.width,Pe.height,Ne,Ue,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z,Ie,Pe.width,Pe.height,0,Ne,Ue,Pe.data)}}}else{ht=y.mipmaps,ot&&St&&(ht.length>0&&Vt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Vt,Ie,oe[0].width,oe[0].height));for(let be=0;be<6;be++)if(et){ot?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,oe[be].width,oe[be].height,Ne,Ue,oe[be].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ie,oe[be].width,oe[be].height,0,Ne,Ue,oe[be].data);for(let z=0;z<ht.length;z++){const Le=ht[z].image[be].image;ot?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z+1,0,0,Le.width,Le.height,Ne,Ue,Le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z+1,Ie,Le.width,Le.height,0,Ne,Ue,Le.data)}}else{ot?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Ne,Ue,oe[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ie,Ne,Ue,oe[be]);for(let z=0;z<ht.length;z++){const Pe=ht[z];ot?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z+1,0,0,Ne,Ue,Pe.image[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,z+1,Ie,Ne,Ue,Pe.image[be])}}}v(y,Fe)&&x(n.TEXTURE_CUBE_MAP),$.__version=Z.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function H(b,y,N,q,Z,$){const Re=r.convert(N.format,N.colorSpace),ge=r.convert(N.type),ye=S(N.internalFormat,Re,ge,N.colorSpace);if(!i.get(y).__hasExternalTextures){const et=Math.max(1,y.width>>$),oe=Math.max(1,y.height>>$);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,$,ye,et,oe,y.depth,0,Re,ge,null):t.texImage2D(Z,$,ye,et,oe,0,Re,ge,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ce(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Z,i.get(N).__webglTexture,0,Me(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Z,i.get(N).__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(b,y,N){if(n.bindRenderbuffer(n.RENDERBUFFER,b),y.depthBuffer&&!y.stencilBuffer){let q=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(N||ce(y)){const Z=y.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Ni?q=n.DEPTH_COMPONENT32F:Z.type===os&&(q=n.DEPTH_COMPONENT24));const $=Me(y);ce(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$,q,y.width,y.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,$,q,y.width,y.height)}else n.renderbufferStorage(n.RENDERBUFFER,q,y.width,y.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(y.depthBuffer&&y.stencilBuffer){const q=Me(y);N&&ce(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,q,n.DEPTH24_STENCIL8,y.width,y.height):ce(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,q,n.DEPTH24_STENCIL8,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const q=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let Z=0;Z<q.length;Z++){const $=q[Z],Re=r.convert($.format,$.colorSpace),ge=r.convert($.type),ye=S($.internalFormat,Re,ge,$.colorSpace),We=Me(y);N&&ce(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,We,ye,y.width,y.height):ce(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,We,ye,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ye,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),W(y.depthTexture,0);const q=i.get(y.depthTexture).__webglTexture,Z=Me(y);if(y.depthTexture.format===Ws)ce(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0);else if(y.depthTexture.format===ro)ce(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function me(b){const y=i.get(b),N=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");fe(y.__webglFramebuffer,b)}else if(N){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]=n.createRenderbuffer(),re(y.__webglDepthbuffer[q],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=n.createRenderbuffer(),re(y.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ce(b,y,N){const q=i.get(b);y!==void 0&&H(q.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&me(b)}function U(b){const y=b.texture,N=i.get(b),q=i.get(y);b.addEventListener("dispose",L),b.isWebGLMultipleRenderTargets!==!0&&(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=y.version,o.memory.textures++);const Z=b.isWebGLCubeRenderTarget===!0,$=b.isWebGLMultipleRenderTargets===!0,Re=m(b)||a;if(Z){N.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[ge]=[];for(let ye=0;ye<y.mipmaps.length;ye++)N.__webglFramebuffer[ge][ye]=n.createFramebuffer()}else N.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let ge=0;ge<y.mipmaps.length;ge++)N.__webglFramebuffer[ge]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if($)if(s.drawBuffers){const ge=b.texture;for(let ye=0,We=ge.length;ye<We;ye++){const et=i.get(ge[ye]);et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&ce(b)===!1){const ge=$?y:[y];N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ye=0;ye<ge.length;ye++){const We=ge[ye];N.__webglColorRenderbuffer[ye]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[ye]);const et=r.convert(We.format,We.colorSpace),oe=r.convert(We.type),mt=S(We.internalFormat,et,oe,We.colorSpace,b.isXRRenderTarget===!0),Fe=Me(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,mt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,N.__webglColorRenderbuffer[ye])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),re(N.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),j(n.TEXTURE_CUBE_MAP,y,Re);for(let ge=0;ge<6;ge++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ye=0;ye<y.mipmaps.length;ye++)H(N.__webglFramebuffer[ge][ye],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,ye);else H(N.__webglFramebuffer[ge],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);v(y,Re)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($){const ge=b.texture;for(let ye=0,We=ge.length;ye<We;ye++){const et=ge[ye],oe=i.get(et);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture),j(n.TEXTURE_2D,et,Re),H(N.__webglFramebuffer,b,et,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,0),v(et,Re)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?ge=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,q.__webglTexture),j(ge,y,Re),a&&y.mipmaps&&y.mipmaps.length>0)for(let ye=0;ye<y.mipmaps.length;ye++)H(N.__webglFramebuffer[ye],b,y,n.COLOR_ATTACHMENT0,ge,ye);else H(N.__webglFramebuffer,b,y,n.COLOR_ATTACHMENT0,ge,0);v(y,Re)&&x(ge),t.unbindTexture()}b.depthBuffer&&me(b)}function he(b){const y=m(b)||a,N=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let q=0,Z=N.length;q<Z;q++){const $=N[q];if(v($,y)){const Re=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ge=i.get($).__webglTexture;t.bindTexture(Re,ge),x(Re),t.unbindTexture()}}}function ie(b){if(a&&b.samples>0&&ce(b)===!1){const y=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],N=b.width,q=b.height;let Z=n.COLOR_BUFFER_BIT;const $=[],Re=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(b),ye=b.isWebGLMultipleRenderTargets===!0;if(ye)for(let We=0;We<y.length;We++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+We,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+We,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let We=0;We<y.length;We++){$.push(n.COLOR_ATTACHMENT0+We),b.depthBuffer&&$.push(Re);const et=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(et===!1&&(b.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ye&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[We]),et===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Re]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Re])),ye){const oe=i.get(y[We]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,N,q,0,0,N,q,Z,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,$)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ye)for(let We=0;We<y.length;We++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+We,n.RENDERBUFFER,ge.__webglColorRenderbuffer[We]);const et=i.get(y[We]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+We,n.TEXTURE_2D,et,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function Me(b){return Math.min(s.maxSamples,b.samples)}function ce(b){const y=i.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Be(b){const y=o.render.frame;h.get(b)!==y&&(h.set(b,y),b.update())}function te(b,y){const N=b.colorSpace,q=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Hh||N!==Hi&&N!==ni&&(Tt.getTransfer(N)===Nt?a===!1?e.has("EXT_sRGB")===!0&&q===ti?(b.format=Hh,b.minFilter=Wn,b.generateMipmaps=!1):y=um.sRGBToLinear(y):(q!==ti||Z!==fs)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}this.allocateTextureUnit=D,this.resetTextureUnits=K,this.setTexture2D=W,this.setTexture2DArray=Q,this.setTexture3D=J,this.setTextureCube=ee,this.rebindTextures=Ce,this.setupRenderTarget=U,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=H,this.useMultisampledRTT=ce}function bS(n,e,t){const i=t.isWebGL2;function s(r,o=ni){let a;const c=Tt.getTransfer(o);if(r===fs)return n.UNSIGNED_BYTE;if(r===tm)return n.UNSIGNED_SHORT_4_4_4_4;if(r===nm)return n.UNSIGNED_SHORT_5_5_5_1;if(r===ov)return n.BYTE;if(r===av)return n.SHORT;if(r===Tu)return n.UNSIGNED_SHORT;if(r===em)return n.INT;if(r===os)return n.UNSIGNED_INT;if(r===Ni)return n.FLOAT;if(r===ia)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===cv)return n.ALPHA;if(r===ti)return n.RGBA;if(r===lv)return n.LUMINANCE;if(r===hv)return n.LUMINANCE_ALPHA;if(r===Ws)return n.DEPTH_COMPONENT;if(r===ro)return n.DEPTH_STENCIL;if(r===Hh)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===im)return n.RED;if(r===sm)return n.RED_INTEGER;if(r===uv)return n.RG;if(r===rm)return n.RG_INTEGER;if(r===om)return n.RGBA_INTEGER;if(r===Sl||r===bl||r===wl||r===Tl)if(c===Nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Sl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===bl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===wl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Tl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Sl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===bl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===wl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Tl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===zf||r===Uf||r===kf||r===Nf)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===zf)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Uf)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===kf)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Nf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===am)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Of||r===Ff)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Of)return c===Nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Ff)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Bf||r===Gf||r===Hf||r===Vf||r===Wf||r===Xf||r===qf||r===Yf||r===jf||r===$f||r===Kf||r===Jf||r===Zf||r===Qf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Bf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Gf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Hf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Vf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Wf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Xf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===qf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Yf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===jf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===$f)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Kf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Jf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Zf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Qf)return c===Nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===El||r===ed||r===td)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===El)return c===Nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ed)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===td)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===fv||r===nd||r===id||r===sd)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===El)return a.COMPRESSED_RED_RGTC1_EXT;if(r===nd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===id)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===sd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Vs?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class wS extends Xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class it extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TS={type:"move"};class Jl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new it,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new it,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new it,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(TS)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new it;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class ES extends po{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const v=[],x=[],S=new Ee;let C=null;const w=new Xn;w.layers.enable(1),w.viewport=new Ft;const A=new Xn;A.layers.enable(2),A.viewport=new Ft;const L=[w,A],M=new wS;M.layers.enable(1),M.layers.enable(2);let T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ae=v[j];return ae===void 0&&(ae=new Jl,v[j]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(j){let ae=v[j];return ae===void 0&&(ae=new Jl,v[j]=ae),ae.getGripSpace()},this.getHand=function(j){let ae=v[j];return ae===void 0&&(ae=new Jl,v[j]=ae),ae.getHandSpace()};function G(j){const ae=x.indexOf(j.inputSource);if(ae===-1)return;const Ae=v[ae];Ae!==void 0&&(Ae.update(j.inputSource,j.frame,l||o),Ae.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",D);for(let j=0;j<v.length;j++){const ae=x[j];ae!==null&&(x[j]=null,v[j].disconnect(ae))}T=null,B=null,e.setRenderTarget(m),d=null,f=null,u=null,s=null,p=null,de.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",K),s.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ae={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new Js(d.framebufferWidth,d.framebufferHeight,{format:ti,type:fs,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ae=null,Ae=null,Ge=null;_.depth&&(Ge=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=_.stencil?ro:Ws,Ae=_.stencil?Vs:os);const H={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(H),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new Js(f.textureWidth,f.textureHeight,{format:ti,type:fs,depthTexture:new bm(f.textureWidth,f.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const re=e.properties.get(p);re.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),de.setContext(s),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(j){for(let ae=0;ae<j.removed.length;ae++){const Ae=j.removed[ae],Ge=x.indexOf(Ae);Ge>=0&&(x[Ge]=null,v[Ge].disconnect(Ae))}for(let ae=0;ae<j.added.length;ae++){const Ae=j.added[ae];let Ge=x.indexOf(Ae);if(Ge===-1){for(let re=0;re<v.length;re++)if(re>=x.length){x.push(Ae),Ge=re;break}else if(x[re]===null){x[re]=Ae,Ge=re;break}if(Ge===-1)break}const H=v[Ge];H&&H.connect(Ae)}}const k=new R,W=new R;function Q(j,ae,Ae){k.setFromMatrixPosition(ae.matrixWorld),W.setFromMatrixPosition(Ae.matrixWorld);const Ge=k.distanceTo(W),H=ae.projectionMatrix.elements,re=Ae.projectionMatrix.elements,fe=H[14]/(H[10]-1),me=H[14]/(H[10]+1),Ce=(H[9]+1)/H[5],U=(H[9]-1)/H[5],he=(H[8]-1)/H[0],ie=(re[8]+1)/re[0],Me=fe*he,ce=fe*ie,Be=Ge/(-he+ie),te=Be*-he;ae.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(te),j.translateZ(Be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const b=fe+Be,y=me+Be,N=Me-te,q=ce+(Ge-te),Z=Ce*me/y*b,$=U*me/y*b;j.projectionMatrix.makePerspective(N,q,Z,$,b,y),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function J(j,ae){ae===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ae.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;M.near=A.near=w.near=j.near,M.far=A.far=w.far=j.far,(T!==M.near||B!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,B=M.far);const ae=j.parent,Ae=M.cameras;J(M,ae);for(let Ge=0;Ge<Ae.length;Ge++)J(Ae[Ge],ae);Ae.length===2?Q(M,w,A):M.projectionMatrix.copy(w.projectionMatrix),ee(j,M,ae)};function ee(j,ae,Ae){Ae===null?j.matrix.copy(ae.matrixWorld):(j.matrix.copy(Ae.matrixWorld),j.matrix.invert(),j.matrix.multiply(ae.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ae.projectionMatrix),j.projectionMatrixInverse.copy(ae.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Vh*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)};let ne=null;function xe(j,ae){if(h=ae.getViewerPose(l||o),g=ae,h!==null){const Ae=h.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let Ge=!1;Ae.length!==M.cameras.length&&(M.cameras.length=0,Ge=!0);for(let H=0;H<Ae.length;H++){const re=Ae[H];let fe=null;if(d!==null)fe=d.getViewport(re);else{const Ce=u.getViewSubImage(f,re);fe=Ce.viewport,H===0&&(e.setRenderTargetTextures(p,Ce.colorTexture,f.ignoreDepthValues?void 0:Ce.depthStencilTexture),e.setRenderTarget(p))}let me=L[H];me===void 0&&(me=new Xn,me.layers.enable(H),me.viewport=new Ft,L[H]=me),me.matrix.fromArray(re.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(re.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(fe.x,fe.y,fe.width,fe.height),H===0&&(M.matrix.copy(me.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Ge===!0&&M.cameras.push(me)}}for(let Ae=0;Ae<v.length;Ae++){const Ge=x[Ae],H=v[Ae];Ge!==null&&H!==void 0&&H.update(Ge,ae,l||o)}ne&&ne(j,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),g=null}const de=new Mm;de.setAnimationLoop(xe),this.setAnimationLoop=function(j){ne=j},this.dispose=function(){}}}function AS(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,vm(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===wn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===wn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===wn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function CS(n,e,t,i){let s={},r={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,x){const S=x.program;i.uniformBlockBinding(v,S)}function l(v,x){let S=s[v.id];S===void 0&&(g(v),S=h(v),s[v.id]=S,v.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(v,C);const w=e.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function h(v){const x=u();v.__bindingPointIndex=x;const S=n.createBuffer(),C=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,S),S}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const x=s[v.id],S=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let w=0,A=S.length;w<A;w++){const L=Array.isArray(S[w])?S[w]:[S[w]];for(let M=0,T=L.length;M<T;M++){const B=L[M];if(d(B,w,M,C)===!0){const G=B.__offset,K=Array.isArray(B.value)?B.value:[B.value];let D=0;for(let k=0;k<K.length;k++){const W=K[k],Q=_(W);typeof W=="number"||typeof W=="boolean"?(B.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,G+D,B.__data)):W.isMatrix3?(B.__data[0]=W.elements[0],B.__data[1]=W.elements[1],B.__data[2]=W.elements[2],B.__data[3]=0,B.__data[4]=W.elements[3],B.__data[5]=W.elements[4],B.__data[6]=W.elements[5],B.__data[7]=0,B.__data[8]=W.elements[6],B.__data[9]=W.elements[7],B.__data[10]=W.elements[8],B.__data[11]=0):(W.toArray(B.__data,D),D+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,B.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,x,S,C){const w=v.value,A=x+"_"+S;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const L=C[A];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return C[A]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function g(v){const x=v.uniforms;let S=0;const C=16;for(let A=0,L=x.length;A<L;A++){const M=Array.isArray(x[A])?x[A]:[x[A]];for(let T=0,B=M.length;T<B;T++){const G=M[T],K=Array.isArray(G.value)?G.value:[G.value];for(let D=0,k=K.length;D<k;D++){const W=K[D],Q=_(W),J=S%C;J!==0&&C-J<Q.boundary&&(S+=C-J),G.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=Q.storage}}}const w=S%C;return w>0&&(S+=C-w),v.__size=S,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Rm{constructor(e={}){const{canvas:t=wv(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this._useLegacyLights=!1,this.toneMapping=us,this.toneMappingExposure=1;const x=this;let S=!1,C=0,w=0,A=null,L=-1,M=null;const T=new Ft,B=new Ft;let G=null;const K=new De(0);let D=0,k=t.width,W=t.height,Q=1,J=null,ee=null;const ne=new Ft(0,0,k,W),xe=new Ft(0,0,k,W);let de=!1;const j=new Ru;let ae=!1,Ae=!1,Ge=null;const H=new Rt,re=new Ee,fe=new R,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ce(){return A===null?Q:1}let U=i;function he(E,O){for(let X=0;X<E.length;X++){const Y=E[X],V=t.getContext(Y,O);if(V!==null)return V}return null}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bu}`),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),U===null){const O=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&O.shift(),U=he(O,E),U===null)throw he(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ie,Me,ce,Be,te,b,y,N,q,Z,$,Re,ge,ye,We,et,oe,mt,Fe,Ne,Ue,Ie,ot,St;function Vt(){ie=new OM(U),Me=new DM(U,ie,e),ie.init(Me),Ie=new bS(U,ie,Me),ce=new MS(U,ie,Me),Be=new GM(U),te=new aS,b=new SS(U,ie,ce,te,Me,Ie,Be),y=new zM(x),N=new NM(x),q=new $v(U,Me),ot=new PM(U,ie,q,Me),Z=new FM(U,q,Be,ot),$=new XM(U,Z,q,Be),Fe=new WM(U,Me,b),et=new IM(te),Re=new oS(x,y,N,ie,Me,ot,et),ge=new AS(x,te),ye=new lS,We=new mS(ie,Me),mt=new RM(x,y,N,ce,$,f,c),oe=new yS(x,$,Me),St=new CS(U,Be,Me,ce),Ne=new LM(U,ie,Be,Me),Ue=new BM(U,ie,Be,Me),Be.programs=Re.programs,x.capabilities=Me,x.extensions=ie,x.properties=te,x.renderLists=ye,x.shadowMap=oe,x.state=ce,x.info=Be}Vt();const ht=new ES(x,U);this.xr=ht,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const E=ie.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ie.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(E){E!==void 0&&(Q=E,this.setSize(k,W,!1))},this.getSize=function(E){return E.set(k,W)},this.setSize=function(E,O,X=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=E,W=O,t.width=Math.floor(E*Q),t.height=Math.floor(O*Q),X===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(k*Q,W*Q).floor()},this.setDrawingBufferSize=function(E,O,X){k=E,W=O,Q=X,t.width=Math.floor(E*X),t.height=Math.floor(O*X),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(T)},this.getViewport=function(E){return E.copy(ne)},this.setViewport=function(E,O,X,Y){E.isVector4?ne.set(E.x,E.y,E.z,E.w):ne.set(E,O,X,Y),ce.viewport(T.copy(ne).multiplyScalar(Q).floor())},this.getScissor=function(E){return E.copy(xe)},this.setScissor=function(E,O,X,Y){E.isVector4?xe.set(E.x,E.y,E.z,E.w):xe.set(E,O,X,Y),ce.scissor(B.copy(xe).multiplyScalar(Q).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(E){ce.setScissorTest(de=E)},this.setOpaqueSort=function(E){J=E},this.setTransparentSort=function(E){ee=E},this.getClearColor=function(E){return E.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor.apply(mt,arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha.apply(mt,arguments)},this.clear=function(E=!0,O=!0,X=!0){let Y=0;if(E){let V=!1;if(A!==null){const ze=A.texture.format;V=ze===om||ze===rm||ze===sm}if(V){const ze=A.texture.type,Ve=ze===fs||ze===os||ze===Tu||ze===Vs||ze===tm||ze===nm,Ze=mt.getClearColor(),tt=mt.getClearAlpha(),ct=Ze.r,st=Ze.g,rt=Ze.b;Ve?(d[0]=ct,d[1]=st,d[2]=rt,d[3]=tt,U.clearBufferuiv(U.COLOR,0,d)):(g[0]=ct,g[1]=st,g[2]=rt,g[3]=tt,U.clearBufferiv(U.COLOR,0,g))}else Y|=U.COLOR_BUFFER_BIT}O&&(Y|=U.DEPTH_BUFFER_BIT),X&&(Y|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),ye.dispose(),We.dispose(),te.dispose(),y.dispose(),N.dispose(),$.dispose(),ot.dispose(),St.dispose(),Re.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",An),ht.removeEventListener("sessionend",Dt),Ge&&(Ge.dispose(),Ge=null),Cn.stop()};function be(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=Be.autoReset,O=oe.enabled,X=oe.autoUpdate,Y=oe.needsUpdate,V=oe.type;Vt(),Be.autoReset=E,oe.enabled=O,oe.autoUpdate=X,oe.needsUpdate=Y,oe.type=V}function Pe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Le(E){const O=E.target;O.removeEventListener("dispose",Le),Qe(O)}function Qe(E){Je(E),te.remove(E)}function Je(E){const O=te.get(E).programs;O!==void 0&&(O.forEach(function(X){Re.releaseProgram(X)}),E.isShaderMaterial&&Re.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,X,Y,V,ze){O===null&&(O=me);const Ve=V.isMesh&&V.matrixWorld.determinant()<0,Ze=a_(E,O,X,Y,V);ce.setMaterial(Y,Ve);let tt=X.index,ct=1;if(Y.wireframe===!0){if(tt=Z.getWireframeAttribute(X),tt===void 0)return;ct=2}const st=X.drawRange,rt=X.attributes.position;let qt=st.start*ct,Bn=(st.start+st.count)*ct;ze!==null&&(qt=Math.max(qt,ze.start*ct),Bn=Math.min(Bn,(ze.start+ze.count)*ct)),tt!==null?(qt=Math.max(qt,0),Bn=Math.min(Bn,tt.count)):rt!=null&&(qt=Math.max(qt,0),Bn=Math.min(Bn,rt.count));const an=Bn-qt;if(an<0||an===1/0)return;ot.setup(V,Y,Ze,X,tt);let Ti,Gt=Ne;if(tt!==null&&(Ti=q.get(tt),Gt=Ue,Gt.setIndex(Ti)),V.isMesh)Y.wireframe===!0?(ce.setLineWidth(Y.wireframeLinewidth*Ce()),Gt.setMode(U.LINES)):Gt.setMode(U.TRIANGLES);else if(V.isLine){let ut=Y.linewidth;ut===void 0&&(ut=1),ce.setLineWidth(ut*Ce()),V.isLineSegments?Gt.setMode(U.LINES):V.isLineLoop?Gt.setMode(U.LINE_LOOP):Gt.setMode(U.LINE_STRIP)}else V.isPoints?Gt.setMode(U.POINTS):V.isSprite&&Gt.setMode(U.TRIANGLES);if(V.isBatchedMesh)Gt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)Gt.renderInstances(qt,an,V.count);else if(X.isInstancedBufferGeometry){const ut=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,gl=Math.min(X.instanceCount,ut);Gt.renderInstances(qt,an,gl)}else Gt.render(qt,an)};function Pt(E,O,X){E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=wn,E.needsUpdate=!0,Ma(E,O,X),E.side=xs,E.needsUpdate=!0,Ma(E,O,X),E.side=gn):Ma(E,O,X)}this.compile=function(E,O,X=null){X===null&&(X=E),m=We.get(X),m.init(),v.push(m),X.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),E!==X&&E.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights(x._useLegacyLights);const Y=new Set;return E.traverse(function(V){const ze=V.material;if(ze)if(Array.isArray(ze))for(let Ve=0;Ve<ze.length;Ve++){const Ze=ze[Ve];Pt(Ze,X,V),Y.add(Ze)}else Pt(ze,X,V),Y.add(ze)}),v.pop(),m=null,Y},this.compileAsync=function(E,O,X=null){const Y=this.compile(E,O,X);return new Promise(V=>{function ze(){if(Y.forEach(function(Ve){te.get(Ve).currentProgram.isReady()&&Y.delete(Ve)}),Y.size===0){V(E);return}setTimeout(ze,10)}ie.get("KHR_parallel_shader_compile")!==null?ze():setTimeout(ze,10)})};let Lt=null;function on(E){Lt&&Lt(E)}function An(){Cn.stop()}function Dt(){Cn.start()}const Cn=new Mm;Cn.setAnimationLoop(on),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(E){Lt=E,ht.setAnimationLoop(E),E===null?Cn.stop():Cn.start()},ht.addEventListener("sessionstart",An),ht.addEventListener("sessionend",Dt),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(O),O=ht.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,O,A),m=We.get(E,v.length),m.init(),v.push(m),H.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(H),Ae=this.localClippingEnabled,ae=et.init(this.clippingPlanes,Ae),_=ye.get(E,p.length),_.init(),p.push(_),pi(E,O,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(J,ee),this.info.render.frame++,ae===!0&&et.beginShadows();const X=m.state.shadowsArray;if(oe.render(X,E,O),ae===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset(),mt.render(_,E),m.setupLights(x._useLegacyLights),O.isArrayCamera){const Y=O.cameras;for(let V=0,ze=Y.length;V<ze;V++){const Ve=Y[V];Mf(_,E,Ve,Ve.viewport)}}else Mf(_,E,O);A!==null&&(b.updateMultisampleRenderTarget(A),b.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(x,E,O),ot.resetDefaultState(),L=-1,M=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function pi(E,O,X,Y){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){Y&&fe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(H);const Ve=$.update(E),Ze=E.material;Ze.visible&&_.push(E,Ve,Ze,X,fe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const Ve=$.update(E),Ze=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),fe.copy(E.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),fe.copy(Ve.boundingSphere.center)),fe.applyMatrix4(E.matrixWorld).applyMatrix4(H)),Array.isArray(Ze)){const tt=Ve.groups;for(let ct=0,st=tt.length;ct<st;ct++){const rt=tt[ct],qt=Ze[rt.materialIndex];qt&&qt.visible&&_.push(E,Ve,qt,X,fe.z,rt)}}else Ze.visible&&_.push(E,Ve,Ze,X,fe.z,null)}}const ze=E.children;for(let Ve=0,Ze=ze.length;Ve<Ze;Ve++)pi(ze[Ve],O,X,Y)}function Mf(E,O,X,Y){const V=E.opaque,ze=E.transmissive,Ve=E.transparent;m.setupLightsView(X),ae===!0&&et.setGlobalState(x.clippingPlanes,X),ze.length>0&&o_(V,ze,O,X),Y&&ce.viewport(T.copy(Y)),V.length>0&&ya(V,O,X),ze.length>0&&ya(ze,O,X),Ve.length>0&&ya(Ve,O,X),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function o_(E,O,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const ze=Me.isWebGL2;Ge===null&&(Ge=new Js(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")?ia:fs,minFilter:na,samples:ze?4:0})),x.getDrawingBufferSize(re),ze?Ge.setSize(re.x,re.y):Ge.setSize(Wh(re.x),Wh(re.y));const Ve=x.getRenderTarget();x.setRenderTarget(Ge),x.getClearColor(K),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();const Ze=x.toneMapping;x.toneMapping=us,ya(E,X,Y),b.updateMultisampleRenderTarget(Ge),b.updateRenderTargetMipmap(Ge);let tt=!1;for(let ct=0,st=O.length;ct<st;ct++){const rt=O[ct],qt=rt.object,Bn=rt.geometry,an=rt.material,Ti=rt.group;if(an.side===gn&&qt.layers.test(Y.layers)){const Gt=an.side;an.side=wn,an.needsUpdate=!0,Sf(qt,X,Y,Bn,an,Ti),an.side=Gt,an.needsUpdate=!0,tt=!0}}tt===!0&&(b.updateMultisampleRenderTarget(Ge),b.updateRenderTargetMipmap(Ge)),x.setRenderTarget(Ve),x.setClearColor(K,D),x.toneMapping=Ze}function ya(E,O,X){const Y=O.isScene===!0?O.overrideMaterial:null;for(let V=0,ze=E.length;V<ze;V++){const Ve=E[V],Ze=Ve.object,tt=Ve.geometry,ct=Y===null?Ve.material:Y,st=Ve.group;Ze.layers.test(X.layers)&&Sf(Ze,O,X,tt,ct,st)}}function Sf(E,O,X,Y,V,ze){E.onBeforeRender(x,O,X,Y,V,ze),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(x,O,X,Y,E,ze),V.transparent===!0&&V.side===gn&&V.forceSinglePass===!1?(V.side=wn,V.needsUpdate=!0,x.renderBufferDirect(X,O,Y,V,E,ze),V.side=xs,V.needsUpdate=!0,x.renderBufferDirect(X,O,Y,V,E,ze),V.side=gn):x.renderBufferDirect(X,O,Y,V,E,ze),E.onAfterRender(x,O,X,Y,V,ze)}function Ma(E,O,X){O.isScene!==!0&&(O=me);const Y=te.get(E),V=m.state.lights,ze=m.state.shadowsArray,Ve=V.state.version,Ze=Re.getParameters(E,V.state,ze,O,X),tt=Re.getProgramCacheKey(Ze);let ct=Y.programs;Y.environment=E.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(E.isMeshStandardMaterial?N:y).get(E.envMap||Y.environment),ct===void 0&&(E.addEventListener("dispose",Le),ct=new Map,Y.programs=ct);let st=ct.get(tt);if(st!==void 0){if(Y.currentProgram===st&&Y.lightsStateVersion===Ve)return wf(E,Ze),st}else Ze.uniforms=Re.getUniforms(E),E.onBuild(X,Ze,x),E.onBeforeCompile(Ze,x),st=Re.acquireProgram(Ze,tt),ct.set(tt,st),Y.uniforms=Ze.uniforms;const rt=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(rt.clippingPlanes=et.uniform),wf(E,Ze),Y.needsLights=l_(E),Y.lightsStateVersion=Ve,Y.needsLights&&(rt.ambientLightColor.value=V.state.ambient,rt.lightProbe.value=V.state.probe,rt.directionalLights.value=V.state.directional,rt.directionalLightShadows.value=V.state.directionalShadow,rt.spotLights.value=V.state.spot,rt.spotLightShadows.value=V.state.spotShadow,rt.rectAreaLights.value=V.state.rectArea,rt.ltc_1.value=V.state.rectAreaLTC1,rt.ltc_2.value=V.state.rectAreaLTC2,rt.pointLights.value=V.state.point,rt.pointLightShadows.value=V.state.pointShadow,rt.hemisphereLights.value=V.state.hemi,rt.directionalShadowMap.value=V.state.directionalShadowMap,rt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,rt.spotShadowMap.value=V.state.spotShadowMap,rt.spotLightMatrix.value=V.state.spotLightMatrix,rt.spotLightMap.value=V.state.spotLightMap,rt.pointShadowMap.value=V.state.pointShadowMap,rt.pointShadowMatrix.value=V.state.pointShadowMatrix),Y.currentProgram=st,Y.uniformsList=null,st}function bf(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=cc.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function wf(E,O){const X=te.get(E);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function a_(E,O,X,Y,V){O.isScene!==!0&&(O=me),b.resetTextureUnits();const ze=O.fog,Ve=Y.isMeshStandardMaterial?O.environment:null,Ze=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Hi,tt=(Y.isMeshStandardMaterial?N:y).get(Y.envMap||Ve),ct=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,st=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),rt=!!X.morphAttributes.position,qt=!!X.morphAttributes.normal,Bn=!!X.morphAttributes.color;let an=us;Y.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(an=x.toneMapping);const Ti=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Gt=Ti!==void 0?Ti.length:0,ut=te.get(Y),gl=m.state.lights;if(ae===!0&&(Ae===!0||E!==M)){const Kn=E===M&&Y.id===L;et.setState(Y,E,Kn)}let Wt=!1;Y.version===ut.__version?(ut.needsLights&&ut.lightsStateVersion!==gl.state.version||ut.outputColorSpace!==Ze||V.isBatchedMesh&&ut.batching===!1||!V.isBatchedMesh&&ut.batching===!0||V.isInstancedMesh&&ut.instancing===!1||!V.isInstancedMesh&&ut.instancing===!0||V.isSkinnedMesh&&ut.skinning===!1||!V.isSkinnedMesh&&ut.skinning===!0||V.isInstancedMesh&&ut.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ut.instancingColor===!1&&V.instanceColor!==null||ut.envMap!==tt||Y.fog===!0&&ut.fog!==ze||ut.numClippingPlanes!==void 0&&(ut.numClippingPlanes!==et.numPlanes||ut.numIntersection!==et.numIntersection)||ut.vertexAlphas!==ct||ut.vertexTangents!==st||ut.morphTargets!==rt||ut.morphNormals!==qt||ut.morphColors!==Bn||ut.toneMapping!==an||Me.isWebGL2===!0&&ut.morphTargetsCount!==Gt)&&(Wt=!0):(Wt=!0,ut.__version=Y.version);let ws=ut.currentProgram;Wt===!0&&(ws=Ma(Y,O,V));let Tf=!1,yo=!1,_l=!1;const xn=ws.getUniforms(),Ts=ut.uniforms;if(ce.useProgram(ws.program)&&(Tf=!0,yo=!0,_l=!0),Y.id!==L&&(L=Y.id,yo=!0),Tf||M!==E){xn.setValue(U,"projectionMatrix",E.projectionMatrix),xn.setValue(U,"viewMatrix",E.matrixWorldInverse);const Kn=xn.map.cameraPosition;Kn!==void 0&&Kn.setValue(U,fe.setFromMatrixPosition(E.matrixWorld)),Me.logarithmicDepthBuffer&&xn.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&xn.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,yo=!0,_l=!0)}if(V.isSkinnedMesh){xn.setOptional(U,V,"bindMatrix"),xn.setOptional(U,V,"bindMatrixInverse");const Kn=V.skeleton;Kn&&(Me.floatVertexTextures?(Kn.boneTexture===null&&Kn.computeBoneTexture(),xn.setValue(U,"boneTexture",Kn.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(xn.setOptional(U,V,"batchingTexture"),xn.setValue(U,"batchingTexture",V._matricesTexture,b));const vl=X.morphAttributes;if((vl.position!==void 0||vl.normal!==void 0||vl.color!==void 0&&Me.isWebGL2===!0)&&Fe.update(V,X,ws),(yo||ut.receiveShadow!==V.receiveShadow)&&(ut.receiveShadow=V.receiveShadow,xn.setValue(U,"receiveShadow",V.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Ts.envMap.value=tt,Ts.flipEnvMap.value=tt.isCubeTexture&&tt.isRenderTargetTexture===!1?-1:1),yo&&(xn.setValue(U,"toneMappingExposure",x.toneMappingExposure),ut.needsLights&&c_(Ts,_l),ze&&Y.fog===!0&&ge.refreshFogUniforms(Ts,ze),ge.refreshMaterialUniforms(Ts,Y,Q,W,Ge),cc.upload(U,bf(ut),Ts,b)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(cc.upload(U,bf(ut),Ts,b),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&xn.setValue(U,"center",V.center),xn.setValue(U,"modelViewMatrix",V.modelViewMatrix),xn.setValue(U,"normalMatrix",V.normalMatrix),xn.setValue(U,"modelMatrix",V.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Kn=Y.uniformsGroups;for(let xl=0,h_=Kn.length;xl<h_;xl++)if(Me.isWebGL2){const Ef=Kn[xl];St.update(Ef,ws),St.bind(Ef,ws)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ws}function c_(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function l_(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,O,X){te.get(E.texture).__webglTexture=O,te.get(E.depthTexture).__webglTexture=X;const Y=te.get(E);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,O){const X=te.get(E);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,X=0){A=E,C=O,w=X;let Y=!0,V=null,ze=!1,Ve=!1;if(E){const tt=te.get(E);tt.__useDefaultFramebuffer!==void 0?(ce.bindFramebuffer(U.FRAMEBUFFER,null),Y=!1):tt.__webglFramebuffer===void 0?b.setupRenderTarget(E):tt.__hasExternalTextures&&b.rebindTextures(E,te.get(E.texture).__webglTexture,te.get(E.depthTexture).__webglTexture);const ct=E.texture;(ct.isData3DTexture||ct.isDataArrayTexture||ct.isCompressedArrayTexture)&&(Ve=!0);const st=te.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(st[O])?V=st[O][X]:V=st[O],ze=!0):Me.isWebGL2&&E.samples>0&&b.useMultisampledRTT(E)===!1?V=te.get(E).__webglMultisampledFramebuffer:Array.isArray(st)?V=st[X]:V=st,T.copy(E.viewport),B.copy(E.scissor),G=E.scissorTest}else T.copy(ne).multiplyScalar(Q).floor(),B.copy(xe).multiplyScalar(Q).floor(),G=de;if(ce.bindFramebuffer(U.FRAMEBUFFER,V)&&Me.drawBuffers&&Y&&ce.drawBuffers(E,V),ce.viewport(T),ce.scissor(B),ce.setScissorTest(G),ze){const tt=te.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,tt.__webglTexture,X)}else if(Ve){const tt=te.get(E.texture),ct=O||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,tt.__webglTexture,X||0,ct)}L=-1},this.readRenderTargetPixels=function(E,O,X,Y,V,ze,Ve){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ze=te.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ve!==void 0&&(Ze=Ze[Ve]),Ze){ce.bindFramebuffer(U.FRAMEBUFFER,Ze);try{const tt=E.texture,ct=tt.format,st=tt.type;if(ct!==ti&&Ie.convert(ct)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const rt=st===ia&&(ie.has("EXT_color_buffer_half_float")||Me.isWebGL2&&ie.has("EXT_color_buffer_float"));if(st!==fs&&Ie.convert(st)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(st===Ni&&(Me.isWebGL2||ie.has("OES_texture_float")||ie.has("WEBGL_color_buffer_float")))&&!rt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-Y&&X>=0&&X<=E.height-V&&U.readPixels(O,X,Y,V,Ie.convert(ct),Ie.convert(st),ze)}finally{const tt=A!==null?te.get(A).__webglFramebuffer:null;ce.bindFramebuffer(U.FRAMEBUFFER,tt)}}},this.copyFramebufferToTexture=function(E,O,X=0){const Y=Math.pow(2,-X),V=Math.floor(O.image.width*Y),ze=Math.floor(O.image.height*Y);b.setTexture2D(O,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,E.x,E.y,V,ze),ce.unbindTexture()},this.copyTextureToTexture=function(E,O,X,Y=0){const V=O.image.width,ze=O.image.height,Ve=Ie.convert(X.format),Ze=Ie.convert(X.type);b.setTexture2D(X,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,X.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,X.unpackAlignment),O.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Y,E.x,E.y,V,ze,Ve,Ze,O.image.data):O.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Y,E.x,E.y,O.mipmaps[0].width,O.mipmaps[0].height,Ve,O.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,Y,E.x,E.y,Ve,Ze,O.image),Y===0&&X.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),ce.unbindTexture()},this.copyTextureToTexture3D=function(E,O,X,Y,V=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ze=E.max.x-E.min.x+1,Ve=E.max.y-E.min.y+1,Ze=E.max.z-E.min.z+1,tt=Ie.convert(Y.format),ct=Ie.convert(Y.type);let st;if(Y.isData3DTexture)b.setTexture3D(Y,0),st=U.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)b.setTexture2DArray(Y,0),st=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,Y.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,Y.unpackAlignment);const rt=U.getParameter(U.UNPACK_ROW_LENGTH),qt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Bn=U.getParameter(U.UNPACK_SKIP_PIXELS),an=U.getParameter(U.UNPACK_SKIP_ROWS),Ti=U.getParameter(U.UNPACK_SKIP_IMAGES),Gt=X.isCompressedTexture?X.mipmaps[V]:X.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Gt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Gt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,E.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,E.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,E.min.z),X.isDataTexture||X.isData3DTexture?U.texSubImage3D(st,V,O.x,O.y,O.z,ze,Ve,Ze,tt,ct,Gt.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(st,V,O.x,O.y,O.z,ze,Ve,Ze,tt,Gt.data)):U.texSubImage3D(st,V,O.x,O.y,O.z,ze,Ve,Ze,tt,ct,Gt),U.pixelStorei(U.UNPACK_ROW_LENGTH,rt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,qt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Bn),U.pixelStorei(U.UNPACK_SKIP_ROWS,an),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ti),V===0&&Y.generateMipmaps&&U.generateMipmap(st),ce.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?b.setTextureCube(E,0):E.isData3DTexture?b.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?b.setTexture2DArray(E,0):b.setTexture2D(E,0),ce.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,ce.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Au?"display-p3":"srgb",t.unpackColorSpace=Tt.workingColorSpace===Zc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===pn?Xs:cm}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Xs?pn:Hi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class RS extends Rm{}RS.prototype.isWebGL1Renderer=!0;class Lu{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new De(e),this.near=t,this.far=i}clone(){return new Lu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class PS extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class LS{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ds()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ds()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ds()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Rn=new R;class Cc{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Rn.fromBufferAttribute(this,t),Rn.applyMatrix4(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rn.fromBufferAttribute(this,t),Rn.applyNormalMatrix(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rn.fromBufferAttribute(this,t),Rn.transformDirection(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ui(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ui(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ui(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ui(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array),s=Ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),i=Ct(i,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new un(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Cc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Pm extends qi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Tr;const To=new R,Er=new R,Ar=new R,Cr=new Ee,Eo=new Ee,Lm=new Rt,Wa=new R,Ao=new R,Xa=new R,qd=new Ee,Zl=new Ee,Yd=new Ee;class DS extends Yt{constructor(e=new Pm){if(super(),this.isSprite=!0,this.type="Sprite",Tr===void 0){Tr=new jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new LS(t,5);Tr.setIndex([0,1,2,0,2,3]),Tr.setAttribute("position",new Cc(i,3,0,!1)),Tr.setAttribute("uv",new Cc(i,2,3,!1))}this.geometry=Tr,this.material=e,this.center=new Ee(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Er.setFromMatrixScale(this.matrixWorld),Lm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ar.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Er.multiplyScalar(-Ar.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;qa(Wa.set(-.5,-.5,0),Ar,o,Er,s,r),qa(Ao.set(.5,-.5,0),Ar,o,Er,s,r),qa(Xa.set(.5,.5,0),Ar,o,Er,s,r),qd.set(0,0),Zl.set(1,0),Yd.set(1,1);let a=e.ray.intersectTriangle(Wa,Ao,Xa,!1,To);if(a===null&&(qa(Ao.set(-.5,.5,0),Ar,o,Er,s,r),Zl.set(0,1),a=e.ray.intersectTriangle(Wa,Xa,Ao,!1,To),a===null))return;const c=e.ray.origin.distanceTo(To);c<e.near||c>e.far||t.push({distance:c,point:To.clone(),uv:Qn.getInterpolation(To,Wa,Ao,Xa,qd,Zl,Yd,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function qa(n,e,t,i,s,r){Cr.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Eo.x=r*Cr.x-s*Cr.y,Eo.y=s*Cr.x+r*Cr.y):Eo.copy(Cr),n.copy(e),n.x+=Eo.x,n.y+=Eo.y,n.applyMatrix4(Lm)}class Dm extends Dn{constructor(e=null,t=1,i=1,s,r,o,a,c,l=tn,h=tn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jd extends un{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Rr=new Rt,$d=new Rt,Ya=[],Kd=new ir,IS=new Rt,Co=new I,Ro=new sr;class zS extends I{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new jd(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,IS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ir),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Rr),Kd.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(Kd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new sr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Rr),Ro.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(Ro)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Co.geometry=this.geometry,Co.material=this.material,Co.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ro.copy(this.boundingSphere),Ro.applyMatrix4(i),e.ray.intersectsSphere(Ro)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Rr),$d.multiplyMatrices(i,Rr),Co.matrixWorld=$d,Co.raycast(e,Ya);for(let o=0,a=Ya.length;o<a;o++){const c=Ya[o];c.instanceId=r,c.object=this,t.push(c)}Ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new jd(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Im extends qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Jd=new R,Zd=new R,Qd=new Rt,Ql=new Cu,ja=new sr;class US extends Yt{constructor(e=new jt,t=new Im){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Jd.fromBufferAttribute(t,s-1),Zd.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Jd.distanceTo(Zd);e.setAttribute("lineDistance",new yt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(s),ja.radius+=r,e.ray.intersectsSphere(ja)===!1)return;Qd.copy(s).invert(),Ql.copy(e.ray).applyMatrix4(Qd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new R,h=new R,u=new R,f=new R,d=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=p,S=v-1;x<S;x+=d){const C=g.getX(x),w=g.getX(x+1);if(l.fromBufferAttribute(m,C),h.fromBufferAttribute(m,w),Ql.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(f);L<e.near||L>e.far||t.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=p,S=v-1;x<S;x+=d){if(l.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),Ql.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class zm extends qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ep=new Rt,qh=new Cu,$a=new sr,Ka=new R;class kS extends Yt{constructor(e=new jt,t=new zm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$a.copy(i.boundingSphere),$a.applyMatrix4(s),$a.radius+=r,e.ray.intersectsSphere($a)===!1)return;ep.copy(s).invert(),qh.copy(e.ray).applyMatrix4(ep);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=l.getX(g);Ka.fromBufferAttribute(u,m),tp(Ka,m,c,s,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Ka.fromBufferAttribute(u,g),tp(Ka,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function tp(n,e,t,i,s,r,o){const a=qh.distanceSqToPoint(n);if(a<t){const c=new R;qh.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class ua extends Dn{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const h=i[s],f=i[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new Ee:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new R,s=[],r=[],o=[],a=new R,c=new Rt;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new R)}r[0]=new R,o[0]=new R;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(mn(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(mn(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Du extends wi{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){const i=t||new Ee,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class NS extends Du{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Iu(){let n=0,e=0,t=0,i=0;function s(r,o,a,c){n=r,e=a,t=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const Ja=new R,eh=new Iu,th=new Iu,nh=new Iu;class OS extends wi{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new R){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Ja.subVectors(s[0],s[1]).add(s[0]),l=Ja);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ja.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ja),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),eh.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),th.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),nh.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(eh.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),th.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),nh.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(eh.calc(c),th.calc(c),nh.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function np(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,c=n*a;return(2*t-2*i+r+o)*c+(-3*t+3*i-2*r-o)*a+r*n+t}function FS(n,e){const t=1-n;return t*t*e}function BS(n,e){return 2*(1-n)*n*e}function GS(n,e){return n*n*e}function Wo(n,e,t,i){return FS(n,e)+BS(n,t)+GS(n,i)}function HS(n,e){const t=1-n;return t*t*t*e}function VS(n,e){const t=1-n;return 3*t*t*n*e}function WS(n,e){return 3*(1-n)*n*n*e}function XS(n,e){return n*n*n*e}function Xo(n,e,t,i,s){return HS(n,e)+VS(n,t)+WS(n,i)+XS(n,s)}class Um extends wi{constructor(e=new Ee,t=new Ee,i=new Ee,s=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Ee){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Xo(e,s.x,r.x,o.x,a.x),Xo(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class qS extends wi{constructor(e=new R,t=new R,i=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new R){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Xo(e,s.x,r.x,o.x,a.x),Xo(e,s.y,r.y,o.y,a.y),Xo(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class km extends wi{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class YS extends wi{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nm extends wi{constructor(e=new Ee,t=new Ee,i=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ee){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Wo(e,s.x,r.x,o.x),Wo(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jS extends wi{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Wo(e,s.x,r.x,o.x),Wo(e,s.y,r.y,o.y),Wo(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Om extends wi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(np(a,c.x,l.x,h.x,u.x),np(a,c.y,l.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Ee().fromArray(s))}return this}}var ip=Object.freeze({__proto__:null,ArcCurve:NS,CatmullRomCurve3:OS,CubicBezierCurve:Um,CubicBezierCurve3:qS,EllipseCurve:Du,LineCurve:km,LineCurve3:YS,QuadraticBezierCurve:Nm,QuadraticBezierCurve3:jS,SplineCurve:Om});class $S extends wi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ip[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new ip[s.type]().fromJSON(s))}return this}}class KS extends $S{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new km(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new Nm(this.currentPoint.clone(),new Ee(e,t),new Ee(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){const a=new Um(this.currentPoint.clone(),new Ee(e,t),new Ee(i,s),new Ee(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Om(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,s,r,o,a,c),this}absellipse(e,t,i,s,r,o,a,c){const l=new Du(e,t,i,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zu extends jt{constructor(e=[new Ee(0,-.5),new Ee(.5,0),new Ee(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=mn(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/t,u=new R,f=new Ee,d=new R,g=new R,_=new R;let m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let v=0;v<=t;v++){const x=i+v*h*s,S=Math.sin(x),C=Math.cos(x);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*S,u.y=e[w].y,u.z=e[w].x*C,o.push(u.x,u.y,u.z),f.x=v/t,f.y=w/(e.length-1),a.push(f.x,f.y);const A=c[3*w+0]*S,L=c[3*w+1],M=c[3*w+0]*C;l.push(A,L,M)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const S=x+v*e.length,C=S,w=S+e.length,A=S+e.length+1,L=S+1;r.push(C,w,L),r.push(A,L,w)}this.setIndex(r),this.setAttribute("position",new yt(o,3)),this.setAttribute("uv",new yt(a,2)),this.setAttribute("normal",new yt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zu(e.points,e.segments,e.phiStart,e.phiLength)}}class qs extends zu{constructor(e=1,t=1,i=4,s=8){const r=new KS;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new qs(e.radius,e.length,e.capSegments,e.radialSegments)}}class Mi extends jt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new R,h=new Ee;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=i+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new yt(o,3)),this.setAttribute("normal",new yt(a,3)),this.setAttribute("uv",new yt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ye extends jt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=i/2;let p=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new yt(u,3)),this.setAttribute("normal",new yt(f,3)),this.setAttribute("uv",new yt(d,2));function v(){const S=new R,C=new R;let w=0;const A=(t-e)/i;for(let L=0;L<=r;L++){const M=[],T=L/r,B=T*(t-e)+e;for(let G=0;G<=s;G++){const K=G/s,D=K*c+a,k=Math.sin(D),W=Math.cos(D);C.x=B*k,C.y=-T*i+m,C.z=B*W,u.push(C.x,C.y,C.z),S.set(k,A,W).normalize(),f.push(S.x,S.y,S.z),d.push(K,1-T),M.push(g++)}_.push(M)}for(let L=0;L<s;L++)for(let M=0;M<r;M++){const T=_[M][L],B=_[M+1][L],G=_[M+1][L+1],K=_[M][L+1];h.push(T,B,K),h.push(B,G,K),w+=6}l.addGroup(p,w,0),p+=w}function x(S){const C=g,w=new Ee,A=new R;let L=0;const M=S===!0?e:t,T=S===!0?1:-1;for(let G=1;G<=s;G++)u.push(0,m*T,0),f.push(0,T,0),d.push(.5,.5),g++;const B=g;for(let G=0;G<=s;G++){const D=G/s*c+a,k=Math.cos(D),W=Math.sin(D);A.x=M*W,A.y=m*T,A.z=M*k,u.push(A.x,A.y,A.z),f.push(0,T,0),w.x=k*.5+.5,w.y=W*.5*T+.5,d.push(w.x,w.y),g++}for(let G=0;G<s;G++){const K=C+G,D=B+G;S===!0?h.push(D,D+1,K):h.push(D+1,D,K),L+=3}l.addGroup(p,L,S===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ye(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class en extends Ye{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new en(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Uu extends jt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new yt(r,3)),this.setAttribute("normal",new yt(r.slice(),3)),this.setAttribute("uv",new yt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const x=new R,S=new R,C=new R;for(let w=0;w<t.length;w+=3)d(t[w+0],x),d(t[w+1],S),d(t[w+2],C),c(x,S,C,v)}function c(v,x,S,C){const w=C+1,A=[];for(let L=0;L<=w;L++){A[L]=[];const M=v.clone().lerp(S,L/w),T=x.clone().lerp(S,L/w),B=w-L;for(let G=0;G<=B;G++)G===0&&L===w?A[L][G]=M:A[L][G]=M.clone().lerp(T,G/B)}for(let L=0;L<w;L++)for(let M=0;M<2*(w-L)-1;M++){const T=Math.floor(M/2);M%2===0?(f(A[L][T+1]),f(A[L+1][T]),f(A[L][T])):(f(A[L][T+1]),f(A[L+1][T+1]),f(A[L+1][T]))}}function l(v){const x=new R;for(let S=0;S<r.length;S+=3)x.x=r[S+0],x.y=r[S+1],x.z=r[S+2],x.normalize().multiplyScalar(v),r[S+0]=x.x,r[S+1]=x.y,r[S+2]=x.z}function h(){const v=new R;for(let x=0;x<r.length;x+=3){v.x=r[x+0],v.y=r[x+1],v.z=r[x+2];const S=m(v)/2/Math.PI+.5,C=p(v)/Math.PI+.5;o.push(S,1-C)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){const x=o[v+0],S=o[v+2],C=o[v+4],w=Math.max(x,S,C),A=Math.min(x,S,C);w>.9&&A<.1&&(x<.2&&(o[v+0]+=1),S<.2&&(o[v+2]+=1),C<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,x){const S=v*3;x.x=e[S+0],x.y=e[S+1],x.z=e[S+2]}function g(){const v=new R,x=new R,S=new R,C=new R,w=new Ee,A=new Ee,L=new Ee;for(let M=0,T=0;M<r.length;M+=9,T+=6){v.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),S.set(r[M+6],r[M+7],r[M+8]),w.set(o[T+0],o[T+1]),A.set(o[T+2],o[T+3]),L.set(o[T+4],o[T+5]),C.copy(v).add(x).add(S).divideScalar(3);const B=m(C);_(w,T+0,v,B),_(A,T+2,x,B),_(L,T+4,S,B)}}function _(v,x,S,C){C<0&&v.x===1&&(o[x]=v.x-1),S.x===0&&S.z===0&&(o[x]=C/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uu(e.vertices,e.indices,e.radius,e.details)}}class Ys extends Uu{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ys(e.radius,e.detail)}}class tl extends jt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const f=(t-e)/s,d=new R,g=new Ee;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=r+m/i*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const v=p+m,x=v,S=v+i+1,C=v+i+2,w=v+1;a.push(x,S,w),a.push(S,C,w)}}this.setIndex(a),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(l,3)),this.setAttribute("uv",new yt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pt extends jt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new R,f=new R,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const v=[],x=p/i;let S=0;p===0&&o===0?S=.5/t:p===i&&c===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const w=C/t;u.x=-e*Math.cos(s+w*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(s+w*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(w+S,1-x),v.push(l++)}h.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){const x=h[p][v+1],S=h[p][v],C=h[p+1][v],w=h[p+1][v+1];(p!==0||o>0)&&d.push(x,S,w),(p!==i-1||c<Math.PI)&&d.push(S,C,w)}this.setIndex(d),this.setAttribute("position",new yt(g,3)),this.setAttribute("normal",new yt(_,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qn extends jt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new R,u=new R,f=new R;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){const _=g/s*r,m=d/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,v=(s+1)*d+g;o.push(_,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new yt(a,3)),this.setAttribute("normal",new yt(c,3)),this.setAttribute("uv",new yt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class JS extends qi{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new De(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eu,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class le extends qi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eu,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ku extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class ZS extends ku{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ih=new Rt,sp=new R,rp=new R;class Fm{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ru,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;sp.setFromMatrixPosition(e.matrixWorld),t.position.copy(sp),rp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rp),t.updateMatrixWorld(),ih.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ih),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ih)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const op=new Rt,Po=new R,sh=new R;class QS extends Fm{constructor(){super(new Xn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Ft(2,1,1,1),new Ft(0,1,1,1),new Ft(3,1,1,1),new Ft(1,1,1,1),new Ft(3,0,1,1),new Ft(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Po.setFromMatrixPosition(e.matrixWorld),i.position.copy(Po),sh.copy(i.position),sh.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(sh),i.updateMatrixWorld(),s.makeTranslation(-Po.x,-Po.y,-Po.z),op.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(op)}}class Bm extends ku{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new QS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class eb extends Fm{constructor(){super(new Sm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tb extends ku{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new eb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bu);const nn=new Rm({antialias:!0}),ao=()=>({w:Math.max(320,innerWidth),h:Math.max(240,innerHeight)});nn.setSize(ao().w,ao().h);nn.setPixelRatio(Math.min(devicePixelRatio,1.5));nn.shadowMap.enabled=!0;nn.shadowMap.type=Jp;nn.toneMapping=Zp;nn.toneMappingExposure=1.18;nn.domElement.className="webgl";document.body.appendChild(nn.domElement);const se=new PS,nl=15918018;se.background=new De(nl);se.fog=new Lu(nl,260,850);const lc=new ZS(12574975,14727304,1);se.add(lc);const Zt=new tb(16770992,1.5);Zt.position.set(80,120,40);se.add(Zt);Zt.castShadow=!0;Zt.shadow.mapSize.set(2048,2048);Zt.shadow.camera.near=40;Zt.shadow.camera.far=320;Zt.shadow.camera.left=-46;Zt.shadow.camera.right=46;Zt.shadow.camera.top=46;Zt.shadow.camera.bottom=-46;Zt.shadow.bias=-3e-4;Zt.shadow.normalBias=.035;se.add(Zt.target);const go=new I(new pt(900,24,16),new fi({side:wn,depthWrite:!1,fog:!1,uniforms:{uZenith:{value:new De(3114710)},uMid:{value:new De(9358062)},uHorizon:{value:new De(nl)},uSun:{value:Zt.position.clone().normalize()},uGlow:{value:1}},vertexShader:`varying vec3 vDir;
      void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uZenith,uMid,uHorizon,uSun; uniform float uGlow; varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.16, h));
        col = mix(col, uZenith, smoothstep(0.16, 0.62, h));
        float s = max(dot(d, normalize(uSun)), 0.0);
        col += vec3(1.0, 0.9, 0.66) * (pow(s, 900.0) * 1.2 + pow(s, 14.0) * 0.16) * uGlow;
        gl_FragColor = vec4(col, 1.0);
      }`}));go.userData.noShadow=!0;go.frustumCulled=!1;se.add(go);const Gm=[];{const n=new le({color:16777215,emissive:10138828,emissiveIntensity:.28,flatShading:!0}),e=new le({color:12043990,emissive:7308695,emissiveIntensity:.22,flatShading:!0}),t=i=>{const s=new it,r=3+(Math.random()*2|0);for(let a=0;a<=r;a++){const c=new I(new Ys((7+Math.random()*6)*i,1),e);c.position.set((Math.random()-.5)*30*i,-1.4-Math.random()*1.6,(Math.random()-.5)*14*i),c.scale.set(1,.32,.82),c.rotation.y=Math.random()*Math.PI,c.userData.noShadow=!0,s.add(c)}const o=3+(Math.random()*3|0);for(let a=0;a<=o;a++){const c=new I(new Ys((5+Math.random()*7)*i,1),n);c.position.set((Math.random()-.5)*22*i,(1+Math.random()*3.5)*i,(Math.random()-.5)*10*i),c.scale.set(1,.6+Math.random()*.22,.86),c.rotation.y=Math.random()*Math.PI,c.userData.noShadow=!0,s.add(c)}return s};for(let i=0;i<9;i++){const s=t(1);s.position.set((Math.random()-.5)*1100,70+Math.random()*55,(Math.random()-.5)*1100),se.add(s),Gm.push(s)}for(let i=0;i<5;i++){const s=i/5*Math.PI*2+Math.random()*.5,r=820+Math.random()*360,o=t(2.4+Math.random()*1.1);o.position.set(Math.cos(s)*r,42+Math.random()*26,-130+Math.sin(s)*r),o.userData.horizon=!0,se.add(o)}}const fa=[];{const n=new le({color:16120058});for(let e=0;e<5;e++){const t=new it,i=new I(new pt(.22,8,6),n);i.scale.set(1,.7,1.8),t.add(i);const s=a=>{const c=new I(new He(1.1,.04,.34),n);return c.geometry.translate(a*.55,0,0),t.add(c),c},r=s(-1),o=s(1);t.traverse(a=>{a.userData.noShadow=!0}),se.add(t),fa.push({g:t,wingL:r,wingR:o,r:14+e*9,h:14+e%3*6,sp:.25+e%3*.08,ph:e*1.4})}}function Hm(){const n=new Xn(F.fov,ao().w/ao().h,.15,2e3);return n.position.set(0,20,-35),n}const Et=Hm(),Vm=Hm();function Nu(){const n=ao();for(const e of[Et,Vm])e.aspect=n.w/n.h,e.updateProjectionMatrix();nn.setSize(n.w,n.h)}window.addEventListener("resize",Nu);function nb(n){se.traverse(e=>{if(!e.isMesh||e.userData.noShadow||n.includes(e))return;const t=e.material;t&&t.transparent||(e.castShadow=!0,e.receiveShadow=!0)})}const Sn=Object.create(null),sa=[];window.addEventListener("keydown",n=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter","Space","ShiftRight"].includes(n.code)&&n.preventDefault(),Sn[n.code]||sa.push(n.code),Sn[n.code]=!0,Yc(),n.code==="KeyN"&&E_()});window.addEventListener("keyup",n=>{Sn[n.code]=!1});let Ou=!1,Wm=()=>!1;function ib(n){Wm=n}document.addEventListener("mousedown",n=>{if(!(!M_()||Wm())&&(Ou=!0,n.button===0&&(Sn.Mouse0||sa.push("Mouse0"),Sn.Mouse0=!0),!document.pointerLockElement))try{const e=nn.domElement.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}catch{}});document.addEventListener("mouseup",n=>{Ou=!1,n.button===0&&(Sn.Mouse0=!1)});const Ns={x:0,y:0};document.addEventListener("mousemove",n=>{if(Oe.inMenu||!document.pointerLockElement&&!Ou)return;const e=Yn();if(e.holding){Ns.x+=n.movementX,Ns.y+=n.movementY;return}e.facing=bt(e.facing-n.movementX*F.mouseSens),e.pitch=je(e.pitch-n.movementY*F.mouseSens,-1.15,1.15)});function Xm(){return{fwd:(Sn.KeyW?1:0)-(Sn.KeyS?1:0),strafe:(Sn.KeyD?1:0)-(Sn.KeyA?1:0),j:Sn.Space?1:0,h:Sn.KeyF?1:0,u:Sn.Mouse0?1:0}}const sb={fwd:0,strafe:0,j:0,h:0,u:0};function il(n="#9a6b42",e="#6b4226",t=256,i=256,s=8){const r=document.createElement("canvas");r.width=t,r.height=i;const o=r.getContext("2d");o.fillStyle=n,o.fillRect(0,0,t,i);const a=i/s;for(let l=0;l<s;l++){const h=l*a,u=Math.sin(l*12.9898)*43758.5453%1;o.fillStyle=`rgba(0,0,0,${.05+Math.abs(u)*.08})`,o.fillRect(0,h,t,a),o.strokeStyle="rgba(60,35,15,0.25)",o.lineWidth=1;for(let f=0;f<5;f++){const d=h+(f+.5)*a/5+Math.sin(l*3+f)*1.5;o.beginPath(),o.moveTo(0,d);for(let g=0;g<=t;g+=16)o.lineTo(g,d+Math.sin((g+l*40)*.05)*1.2);o.stroke()}o.fillStyle=e,o.fillRect(0,h,t,2),o.fillRect(l*97%t,h,2,a)}const c=new ua(r);return c.wrapS=c.wrapT=Ks,c}function rb(){const n=document.createElement("canvas");n.width=128,n.height=256;const e=n.getContext("2d");e.fillStyle="#f3eddc",e.fillRect(0,0,128,256),e.strokeStyle="rgba(150,130,95,0.35)",e.lineWidth=2;for(let i=32;i<256;i+=36)e.beginPath(),e.moveTo(0,i),e.lineTo(128,i),e.stroke();e.fillStyle="rgba(196,148,90,0.30)",e.fillRect(0,84,128,22),e.fillRect(0,176,128,22);const t=new ua(n);return t.wrapS=t.wrapT=ei,t}function qm(){const n=document.createElement("canvas");n.width=n.height=256;const e=n.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,256,256);const t=[];for(let s=0;s<46;s++)t.push({x:Math.random()*256,y:Math.random()*256,r:9+Math.random()*26});for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++)for(const o of t){const a=o.x+s*256,c=o.y+r*256;a<-40||a>296||c<-40||c>296||(e.strokeStyle="rgba(255,255,255,"+(.35+Math.random()*.45).toFixed(2)+")",e.lineWidth=1.5+Math.random()*2.5,e.beginPath(),e.ellipse(a,c,o.r,o.r*(.55+Math.random()*.4),Math.random()*Math.PI,0,Math.PI*2),e.stroke())}for(let s=0;s<60;s++)e.fillStyle="rgba(255,255,255,"+(.12+Math.random()*.25).toFixed(2)+")",e.beginPath(),e.arc(Math.random()*256,Math.random()*256,2+Math.random()*5,0,Math.PI*2),e.fill();const i=new ua(n);return i.wrapS=i.wrapT=Ks,i}function ob(){const n=document.createElement("canvas");n.width=n.height=256;const e=n.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,256,256),e.lineCap="round";const t=[];for(let s=0;s<24;s++)t.push({x:Math.random()*256,y:Math.random()*256});for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++)for(const o of t){const a=o.x+s*256,c=o.y+r*256;if(a<-50||a>306||c<-50||c>306)continue;const l=3+(Math.random()*3|0);for(let h=0;h<l;h++){const u=Math.random()*Math.PI*2,f=14+Math.random()*30;e.strokeStyle="rgba(255,255,255,"+(.14+Math.random()*.2).toFixed(2)+")",e.lineWidth=1+Math.random()*1.6,e.beginPath(),e.moveTo(a,c),e.quadraticCurveTo(a+Math.cos(u)*f*.5+(Math.random()-.5)*10,c+Math.sin(u)*f*.5+(Math.random()-.5)*10,a+Math.cos(u)*f,c+Math.sin(u)*f),e.stroke()}e.fillStyle="rgba(255,255,255,0.5)",e.beginPath(),e.arc(a,c,1.3+Math.random()*1.4,0,Math.PI*2),e.fill()}const i=new ua(n);return i.wrapS=i.wrapT=Ks,i}function Ym(){const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d"),t=e.createRadialGradient(32,32,2,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.55,"rgba(255,255,255,0.55)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new ua(n)}const Se=64,co=200,jm=9.81,ab=.95,cb=new Float32Array(Se*Se),lb=new Float32Array(Se*Se),$m=new Float32Array(Se*Se),Rc=new Float32Array(Se*Se),Pc=new Float32Array(Se*Se),Yh=new Float32Array(Se*Se),jh=new Float32Array(Se*Se),Za=new Float32Array(Se*Se),ap=new Float32Array(Se*Se),Fi=new Float32Array(Se*Se);let Km=1e9,Jm=0,cp=1;const Zs=new Dm(Fi,Se,Se,im,Ni);Zs.wrapS=Zs.wrapT=Ks;Zs.minFilter=Zs.magFilter=Wn;Zs.needsUpdate=!0;function lp(){let n=0,e=0;for(;n===0;)n=Math.random();for(;e===0;)e=Math.random();return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*e)}function hb(n,e,t,i,s,r){if(t<1e-12)return 0;const o=r*r/jm,a=n*i+e*s;let c=a*a/t;a<0&&(c*=.18);const l=o*.0015;return ab*Math.exp(-1/(t*o*o))/(t*t)*c*Math.exp(-t*l*l)}function ub(n,e){const t=Math.cos(n),i=Math.sin(n);for(let s=0;s<Se;s++)for(let r=0;r<Se;r++){const o=s*Se+r,a=2*Math.PI*(r-Se/2)/co,c=2*Math.PI*(s-Se/2)/co;cb[o]=a,lb[o]=c;const l=a*a+c*c;$m[o]=Math.sqrt(jm*Math.sqrt(l));const h=Math.sqrt(hb(a,c,l,t,i,e)*.5);Rc[o]=lp()*h,Pc[o]=lp()*h}for(let s=0;s<Se;s++)for(let r=0;r<Se;r++){const o=s*Se+r,a=(Se-r)%Se,l=(Se-s)%Se*Se+a;Yh[o]=Rc[l],jh[o]=-Pc[l]}Km=n,Jm=e}function Lc(n,e,t,i,s){for(let r=1,o=0;r<Se;r++){let a=Se>>1;for(;o&a;a>>=1)o^=a;if(o^=a,r<o){const c=t+r*i,l=t+o*i;let h=n[c];n[c]=n[l],n[l]=h,h=e[c],e[c]=e[l],e[l]=h}}for(let r=2;r<=Se;r<<=1){const o=(s?2:-2)*Math.PI/r,a=Math.cos(o),c=Math.sin(o),l=r>>1;for(let h=0;h<Se;h+=r){let u=1,f=0;for(let d=0;d<l;d++){const g=t+(h+d)*i,_=t+(h+d+l)*i,m=n[_]*u-e[_]*f,p=n[_]*f+e[_]*u;n[_]=n[g]-m,e[_]=e[g]-p,n[g]+=m,e[g]+=p;const v=u*a-f*c;f=u*c+f*a,u=v}}}if(s)for(let r=0;r<Se;r++){const o=t+r*i;n[o]/=Se,e[o]/=Se}}function Zm(n,e){for(let t=0;t<Se;t++)Lc(n,e,t*Se,1,!0);for(let t=0;t<Se;t++)Lc(n,e,t,Se,!0)}function Qm(n,e,t,i){const s=7+t*.5;cp=i,(Math.abs(e-Km)>.05||Math.abs(s-Jm)>.6)&&ub(e,s);for(let r=0;r<Se*Se;r++){const o=$m[r]*n,a=Math.cos(o),c=Math.sin(o);Za[r]=Rc[r]*a-Pc[r]*c+(Yh[r]*a+jh[r]*c),ap[r]=Rc[r]*c+Pc[r]*a+(jh[r]*a-Yh[r]*c)}Zm(Za,ap);for(let r=0;r<Se;r++)for(let o=0;o<Se;o++){const a=r*Se+o;Fi[a]=(o+r&1?-Za[a]:Za[a])*cp}Zs.needsUpdate=!0}function Vr(n,e){let t=n/co%1;t<0&&(t+=1);let i=e/co%1;i<0&&(i+=1);const s=t*Se,r=i*Se,o=Math.floor(s)%Se,a=Math.floor(r)%Se,c=(o+1)%Se,l=(a+1)%Se,h=s-Math.floor(s),u=r-Math.floor(r),f=Fi[a*Se+o],d=Fi[a*Se+c],g=Fi[l*Se+o],_=Fi[l*Se+c];return(f*(1-h)+d*h)*(1-u)+(g*(1-h)+_*h)*u}function fb(){const n=new Float32Array(Se*Se),e=new Float32Array(Se*Se),t=new Float32Array(Se*Se),i=new Float32Array(Se*Se);for(let a=0;a<Se*Se;a++)n[a]=t[a]=Math.random()*2-1,e[a]=i[a]=Math.random()*2-1;for(let a=0;a<Se;a++)Lc(n,e,a*Se,1,!1);for(let a=0;a<Se;a++)Lc(n,e,a,Se,!1);Zm(n,e);let s=0;for(let a=0;a<Se*Se;a++)s=Math.max(s,Math.abs(n[a]-t[a]),Math.abs(e[a]-i[a]));let r=1e9,o=-1e9;for(let a=0;a<Se*Se;a++)r=Math.min(r,Fi[a]),o=Math.max(o,Fi[a]);return{maxErr:s,range:[r,o]}}const Mt=nt(0,-F.islandDist),ps=nt(Mt.x,Mt.z+F.islandRadius-2),Jr=nt(Mt.x,Mt.z+F.islandRadius+26),qo=nt(137,-70),Fu=nt(111,-70),Yo=nt(95,-254),Bu=nt(95,-230),jo=nt(-150,-150),Gu=nt(-126,-150),$o=nt(-112,40),Hu=nt(-90,40),e0=[{a:ps,b:Jr},{a:qo,b:Fu},{a:Yo,b:Bu},{a:jo,b:Gu},{a:$o,b:Hu}],db=[{x0:ps.x-2,x1:ps.x+2,z0:ps.z-1,z1:Jr.z+.3},{x0:Fu.x-.3,x1:qo.x+1,z0:qo.z-2,z1:qo.z+2},{x0:Yo.x-2,x1:Yo.x+2,z0:Bu.z-.3,z1:Yo.z+1},{x0:jo.x-1,x1:Gu.x+.3,z0:jo.z-2,z1:jo.z+2},{x0:$o.x-1,x1:Hu.x+.3,z0:$o.z-2,z1:$o.z+2}],Vi=1.15,vt={x:117,z:-70,r:3.4},hp={x:0,z:-207},ys={x:4.8,z:-206},Dc={x:-1.5,z:-204},jn=[{name:"Palm Run",pay:10,desc:"a gentle reach — easy money for a first run",del:{x:117,z:-70}},{name:"Sandbar Hop",pay:16,desc:"short, but dead upwind — you will have to tack",del:{x:95,z:-236}},{name:"Skerry Slog",pay:24,desc:"a long beat out past the rocks",del:{x:-132,z:-150}},{name:"North Light",pay:32,desc:"the long northern haul — best pay on the board",del:{x:-96,z:40},locked:()=>!Ke.chartNorth,lockHint:"buy the Northern chart at the chandler"}];let Ms=0;function da(n){Ms=(n%jn.length+jn.length)%jn.length;const e=jn[Ms];vt.x=e.del.x,vt.z=e.del.z,t0()}const pb=[{x:-13,z:-239,cat:"boat",label:"the Shipwright — boats & deck gear"},{x:0,z:-236,cat:"hats",label:"the Outfitter — hats & finery"},{x:13,z:-239,cat:"mop",label:"the Deckhand — mop upgrades"}],js=[];let Bi,Ko,$h,Kh;function t0(){Ko&&(Ko.position.set(vt.x,1.17,vt.z),$h.position.set(vt.x,2.9,vt.z-1.8),Kh.position.set(vt.x+.6,4.3,vt.z-1.8),Bi.position.set(vt.x,8,vt.z))}const sl=[{x:150,z:-70,r:13,palms:2,hill:!0},{x:-160,z:-150,r:10,palms:0,hill:!1},{x:95,z:-268,r:15,palms:3,hill:!0},{x:-120,z:40,r:8,palms:1,hill:!1}],rl=[{x:Mt.x,z:Mt.z,r:F.islandRadius},...sl.map(n=>({x:n.x,z:n.z,r:n.r}))],mb=[{x:Mt.x,z:Mt.z,r:F.islandRadius-.5,y:.6},...sl.map(n=>({x:n.x,z:n.z,r:n.r-.5,y:.6}))],hc=[],n0=[];function gb(n){for(const e of n0)e.g.position.y=Math.sin(n*1.6+e.ph)*.045,e.headG.rotation.y=Math.sin(n*.55+e.ph)*.34,e.headG.rotation.z=Math.sin(n*1.3+e.ph*1.7)*.05}const i0=new fi({uniforms:{uTime:{value:0},uFoam:{value:qm()}},transparent:!0,depthWrite:!1,side:gn,vertexShader:`
    attribute float aShore; varying float vShore; varying vec2 vWorld;
    void main() {
      vShore = aShore;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,fragmentShader:`
    uniform float uTime; uniform sampler2D uFoam;
    varying float vShore; varying vec2 vWorld;
    void main() {
      float l1 = texture2D(uFoam, vWorld * 0.05  + vec2(uTime * 0.013, -uTime * 0.009)).r;
      float l2 = texture2D(uFoam, vWorld * 0.026 - vec2(uTime * 0.007,  uTime * 0.011)).r;
      float lace = l1 * 0.6 + l2 * 0.55;
      float breath = sin(uTime * 0.5 + vShore * 0.2) * 1.3;   // the waterline laps in and out
      float d = vShore - breath;                              // signed dist from the breaking line
      // foam peaks at the line, washes up the beach (d<0), thins out into the water (d>0)
      float band = smoothstep(3.0, 0.0, d) * smoothstep(-1.8, 0.2, d);
      float a = clamp(band * (0.30 + 0.8 * lace), 0.0, 1.0);
      if (a < 0.03) discard;
      gl_FragColor = vec4(vec3(0.95, 0.99, 1.0), a);
    }`}),_b=ob(),s0=[];function vb(n){i0.uniforms.uTime.value=n;for(const e of s0)e.mat.map&&e.mat.map.offset.set(n*e.sx%1,n*e.sz%1),e.mat.opacity=.24+.14*Math.sin(n*.7+e.ph)}function xb(n,e,t){const i=new tl(t-4,t+6,56,2);i.rotateX(-Math.PI/2);const s=i.attributes.position,r=new Float32Array(s.count);for(let a=0;a<s.count;a++)r[a]=Math.hypot(s.getX(a),s.getZ(a))-t;i.setAttribute("aShore",new un(r,1));const o=new I(i,i0);o.position.set(n,.08,e),o.userData.noShadow=!0,o.renderOrder=2,se.add(o)}function yb(n,e,t){for(let i=0;i<2;i++){const s=_b.clone();s.needsUpdate=!0;const r=2*(t+11)/13;s.repeat.set(r,r);const o=new _n({map:s,transparent:!0,opacity:.28,blending:ta,depthWrite:!1}),a=new I(new Mi(t+11,40),o);a.rotation.x=-Math.PI/2,a.position.set(n,-1.08+i*.04,e),a.userData.noShadow=!0,a.renderOrder=-1,se.add(a),s0.push({mat:o,sx:i?.01:-.013,sz:i?-.008:.011,ph:i*2.1+n*.05})}}function Mb(){{const H=new I(new $n(3600,3600),new le({color:666684}));H.rotation.x=-Math.PI/2,H.position.y=-9,H.userData.noShadow=!0,se.add(H);const re=new le({color:12888946}),fe=new le({color:14995604}),me=[16739179,16749099,15754645,16565273].map(he=>new le({color:he})),Ce=new le({color:10134945}),U=new le({color:3120744});for(const he of rl){const ie=new I(new Mi(he.r+22,28),re);ie.rotation.x=-Math.PI/2,ie.position.set(he.x,-2.9,he.z),ie.userData.noShadow=!0,se.add(ie);const Me=new I(new Mi(he.r+10,24),fe);Me.rotation.x=-Math.PI/2,Me.position.set(he.x,-1.25,he.z),Me.userData.noShadow=!0,se.add(Me);for(let ce=0;ce<7;ce++){const Be=new it,te=me[Math.floor(Math.random()*me.length)];for(let q=0;q<5;q++){const Z=new I(new He(.46,.07,.14),te),$=q*zt/5;Z.rotation.y=$,Z.position.set(Math.cos($)*.16,0,-Math.sin($)*.16),Be.add(Z)}const b=new I(new Ye(.1,.12,.1,6),te);Be.add(b);const y=Math.random()*zt,N=he.r+2+Math.random()*7;Be.position.set(he.x+Math.cos(y)*N,-1.18,he.z+Math.sin(y)*N),Be.rotation.y=Math.random()*zt,Be.traverse(q=>{q.userData.noShadow=!0}),se.add(Be)}for(let ce=0;ce<8;ce++){const Be=Math.random()*zt,te=he.r+1.5+Math.random()*8.5;if(ce%3===2){const b=new I(new en(.12,.9+Math.random()*.7,5),U);b.position.set(he.x+Math.cos(Be)*te,-.85,he.z+Math.sin(Be)*te),b.rotation.z=(Math.random()-.5)*.4,b.userData.noShadow=!0,se.add(b)}else{const b=new I(new pt(.14+Math.random()*.16,6,5),Ce);b.scale.y=.45,b.position.set(he.x+Math.cos(Be)*te,-1.2,he.z+Math.sin(Be)*te),b.userData.noShadow=!0,se.add(b)}}xb(he.x,he.z,he.r+.8),yb(he.x,he.z,he.r)}}const n=new le({vertexColors:!0,flatShading:!0}),e=new De(5221983),t=new De(7127663),i=new De(9278102),s=new De(11049080),r=new De(15653282),o=(H,re,fe,me,Ce)=>{const U=new en(fe,me,12,5).toNonIndexed(),he=U.attributes.position.array;for(let te=0;te<he.length;te+=3){const b=Math.atan2(he[te],he[te+2]),y=(he[te+1]+me/2)/me,q=1+(Math.sin(b*3+Ce)*.5+Math.sin(b*7+y*4+Ce*2)*.3+Math.sin(b*13-y*2)*.2)*.2;he[te]*=q,he[te+2]*=q,he[te+1]+=Math.sin(b*5+Ce)*me*.03}U.computeVertexNormals();const ie=U.attributes.normal.array,Me=new Float32Array(he.length),ce=new De;for(let te=0;te<he.length;te+=9){const b=((he[te+1]+he[te+4]+he[te+7])/3+me/2)/me,y=(ie[te+1]+ie[te+4]+ie[te+7])/3,N=Math.abs(Math.sin(te*.73+Ce));b<.1?ce.copy(r):y>.6&&b>.2?ce.lerpColors(e,t,N):y<.42?ce.copy(i).offsetHSL(0,0,N*.05-.025):ce.lerpColors(s,e,N*.4);for(let q=0;q<9;q+=3)Me[te+q]=ce.r,Me[te+q+1]=ce.g,Me[te+q+2]=ce.b}U.setAttribute("color",new un(Me,3));const Be=new I(U,n);Be.position.set(H,me/2+.6,re),se.add(Be),hc.push({x:H,z:re,r:fe*.7})},a=new le({vertexColors:!0}),c=new De(15785124),l=new De(13281647),h=new De(11637341),u=(H,re,fe,me)=>{const he=new Ye(fe,fe+3,2.6,44,1,!1).toNonIndexed(),ie=he.attributes.position.array;for(let te=0;te<ie.length;te+=3)if(Math.hypot(ie[te],ie[te+2])>.5){const y=Math.atan2(ie[te],ie[te+2]),q=1+(Math.sin(y*3+me)*.5+Math.sin(y*6+me*2)*.3+Math.sin(y*11+me)*.2)*.1;ie[te]*=q,ie[te+2]*=q}he.computeVertexNormals();const Me=new Float32Array(ie.length),ce=new De;for(let te=0;te<ie.length;te+=3){const b=ie[te+1]+-.7;b>.35?ce.copy(c):b>-.4?ce.copy(c).lerp(l,(.35-b)/.75):ce.copy(l).lerp(h,Math.min(1,(-.4-b)/1.2)),Me[te]=ce.r,Me[te+1]=ce.g,Me[te+2]=ce.b}he.setAttribute("color",new un(Me,3));const Be=new I(he,a);Be.position.set(H,-.7,re),Be.receiveShadow=!0,se.add(Be)},f=new le({color:5941322,flatShading:!0}),d=new le({color:4691791,flatShading:!0}),g=new le({color:4165446}),_=new le({color:13287331,flatShading:!0}),m=new le({color:16777215,emissive:2236440,emissiveIntensity:.25}),p=new le({color:16777215}),v=[16739179,16766011,16221100,16777215,14317554,16749099].map(H=>new De(H)),x=[16769986,16765142,15787775,16773299].map(H=>new De(H)),S=new en(.05,.5,4),C=new Ys(.6,0),w=new Ye(.02,.025,.46,4),A=new pt(.11,6,5),L=new en(.13,.1,7),M=[],T=[],B=[],G=[],K=(H,re,fe)=>{const me=Math.max(3,Math.round(fe*.5));for(let U=0;U<me;U++){const he=Math.random()*zt,ie=(.32+Math.random()*.52)*fe,Me=H+Math.cos(he)*ie,ce=re+Math.sin(he)*ie;for(let te=0;te<4;te++)M.push({x:Me+(Math.random()-.5)*.8,y:.85,z:ce+(Math.random()-.5)*.8,rx:(Math.random()-.5)*.3,ry:Math.random()*zt,rz:(Math.random()-.5)*.3,s:.7+Math.random()*.7});if(Math.random()<.6){const te=new I(C,d);te.position.set(Me+(Math.random()-.5)*1.2,.95,ce+(Math.random()-.5)*1.2),te.scale.set(.7+Math.random()*.6,.5+Math.random()*.3,.7+Math.random()*.6),te.castShadow=!0,se.add(te)}const Be=2+(Math.random()*3|0);for(let te=0;te<Be;te++){const b=Me+(Math.random()-.5)*1.5,y=ce+(Math.random()-.5)*1.5;T.push({x:b,y:.83,z:y,rx:0,ry:0,rz:(Math.random()-.5)*.2,s:1}),B.push({x:b,y:1.08,z:y,rx:0,ry:Math.random()*zt,rz:0,s:.7+Math.random()*.7,c:Math.random()*v.length|0})}}const Ce=Math.max(3,Math.round(fe*.4));for(let U=0;U<Ce;U++){const he=Math.random()*zt,ie=(.85+Math.random()*.13)*fe,Me=H+Math.cos(he)*ie,ce=re+Math.sin(he)*ie;if(Math.random()<.22){const Be=new I(new Ye(.15,.18,1.4+Math.random(),7),_);Be.position.set(Me,.5,ce),Be.rotation.set(Math.PI/2,Math.random()*zt,0),Be.castShadow=!0,se.add(Be)}else G.push({x:Me,y:.5,z:ce,rx:Math.random()*.5,ry:Math.random()*zt,rz:Math.random()*.6,s:.7+Math.random()*.6,c:Math.random()*x.length|0})}},D=new Yt,k=(H,re,fe,me)=>{if(!fe.length)return;const Ce=new zS(H,re,fe.length);Ce.castShadow=!1,Ce.userData.noShadow=!0,fe.forEach((U,he)=>{D.position.set(U.x,U.y,U.z),D.rotation.set(U.rx,U.ry,U.rz),D.scale.setScalar(U.s),D.updateMatrix(),Ce.setMatrixAt(he,D.matrix),me&&U.c!==void 0&&Ce.setColorAt(he,me[U.c])}),Ce.instanceMatrix.needsUpdate=!0,Ce.instanceColor&&(Ce.instanceColor.needsUpdate=!0),se.add(Ce)};u(Mt.x,Mt.z,F.islandRadius,1.7),o(Mt.x-6,Mt.z-8,24,14,1.7),o(Mt.x+14,Mt.z+2,14,8.5,4.2),K(Mt.x,Mt.z,F.islandRadius);const W=new le({color:11039807}),Q=new le({color:4169548,flatShading:!0}),J=new le({color:6077282,flatShading:!0}),ee=new le({color:7031334}),ne=(H,re,fe)=>{const me=new it;let Ce=1.5;for(let he=0;he<5;he++){const ie=new I(new Ye(.22-he*.02,.28-he*.02,1.3,6),W);ie.position.set(Math.sin(fe)*he*.55,Ce,0),ie.rotation.z=fe*(he/4),me.add(ie),Ce+=1.2}const U=Math.sin(fe)*2.2;for(let he=0;he<7;he++){const ie=new I(new en(.55,3.6,4),he%2?Q:J);ie.scale.z=.3,ie.position.set(U,Ce-.35,0),ie.rotation.z=Math.PI/2.12+he%3*.09,ie.rotation.y=he*zt/7+.2,me.add(ie)}for(let he=0;he<3;he++){const ie=new I(new pt(.16,7,6),ee),Me=he*zt/3;ie.position.set(U+Math.cos(Me)*.28,Ce-.55,Math.sin(Me)*.28),me.add(ie)}me.position.set(H,0,re),se.add(me)};for(const[H,re,fe]of[[-14,16,.3],[10,20,-.25],[20,-12,.2],[-22,-4,-.35]])ne(Mt.x+H,Mt.z+re,fe);const xe=new le({color:8818326,flatShading:!0});for(const H of sl){if(u(H.x,H.z,H.r,H.x*.1+2),H.palms>0&&K(H.x,H.z,H.r),H.hill&&o(H.x-2,H.z-2,H.r*.6,H.r*.45,H.x*.1),H.palms===0)for(let re=0;re<3;re++){const fe=new I(new Ys(1.6+re*.6,0),xe);fe.position.set(H.x+(re-1)*3,1.6,H.z+re%2*2.5-1),fe.rotation.set(re,re*2,0),se.add(fe)}else for(let re=0;re<H.palms;re++)ne(H.x+(re-H.palms/2)*4+1,H.z+re%2*4-2,re%2?-.25:.3);js.push({x:H.x,z:H.z,r:H.r+2.5})}k(S,f,M),k(w,g,T),k(A,m,B,v),k(L,p,G,x);{const H=new it,re=new le({color:15987695}),fe=new le({color:13712187}),me=12,Ce=new I(new Ye(1.05,1.7,me,16),re);Ce.position.y=me/2,Ce.castShadow=!0,Ce.receiveShadow=!0,H.add(Ce);for(const ce of[.18,.5,.82]){const Be=1.7+-.6499999999999999*ce,te=new I(new qn(Be,.12,8,18),fe);te.position.y=me*ce,te.rotation.x=Math.PI/2,H.add(te)}const U=new I(new Ye(1.35,1.35,.3,16),fe);U.position.y=me+.15,H.add(U);const he=new I(new Ye(1,1,1.5,12),new le({color:16771496,emissive:16764778,emissiveIntensity:1.3}));he.position.y=me+1.05,he.userData.noShadow=!0,H.add(he);const ie=new I(new en(1.25,1.2,12),fe);ie.position.y=me+2.4,H.add(ie);const Me=new Bm(16765562,1.4,60,1.6);Me.position.y=me+1.05,Me.userData.noShadow=!0,H.add(Me),H.position.set(Mt.x-1,.7,Mt.z+13),se.add(H)}const de=new le({color:7029286}),j=new le({color:15856629}),ae=new le({color:16771496,emissive:16758861,emissiveIntensity:1.2}),Ae=(H,re,fe=!1)=>{const me=il("#8a5a33","#5d3a20"),Ce=re.x-H.x,U=re.z-H.z,he=Math.hypot(Ce,U);me.repeat.set(1,Math.round(he/4));const ie=new I(new He(4,.3,he),new le({map:me}));ie.position.set((H.x+re.x)/2,1,(H.z+re.z)/2),ie.rotation.y=Math.atan2(Ce,U),se.add(ie);const Me=Math.floor(he/4.5);for(let b=1;b<=Me;b++){const y=b/(Me+1),N=H.x+Ce*y,q=H.z+U*y,Z=Math.cos(ie.rotation.y)*1.7,$=-Math.sin(ie.rotation.y)*1.7;for(const Re of[-1,1]){const ge=new I(new Ye(.22,.22,2.4,7),de);ge.position.set(N+Re*Z,.1,q+Re*$),se.add(ge);const ye=new I(new He(.32,.25,.32),j);ye.position.set(N+Re*Z,1.3,q+Re*$),se.add(ye)}}const ce=new I(new Ye(.06,.075,1.5,6),de);ce.position.set(re.x,1.75,re.z),se.add(ce);const Be=new I(new He(.5,.06,.06),de);Be.position.set(re.x,2.45,re.z),se.add(Be);const te=new I(new He(.3,.4,.3),ae);te.position.set(re.x,2.2,re.z),te.userData.noShadow=!0,se.add(te)};Ae(ps,Jr),Ae(qo,Fu),Ae(Yo,Bu),Ae(jo,Gu),Ae($o,Hu);for(const[H,re]of[[ps.x-1.3,Jr.z-3],[ps.x+1.3,Jr.z-6.5]]){const fe=new I(new qn(.3,.09,6,14),de);fe.position.set(H,1.16,re),fe.rotation.x=Math.PI/2,se.add(fe)}Ko=new I(new Mi(vt.r-.6,20),new le({color:6937468})),Ko.rotation.x=-Math.PI/2,se.add(Ko),$h=new I(new Ye(.06,.08,3.6,6),de),se.add($h),Kh=new I(new $n(1.2,.7),new _n({color:4243543,side:gn})),se.add(Kh),Bi=new I(new en(1.1,2.4,10),new le({color:4243543})),Bi.rotation.x=Math.PI,Bi.userData.baseY=8,se.add(Bi),t0();{const H=Dc.x,re=Dc.z,fe=Vi,me=new le({color:13280366});for(const b of[-.6,.6]){const y=new I(new Ye(.06,.07,1.5,6),de);y.position.set(H,fe+.75,re+b),se.add(y)}const Ce=new I(new He(.1,1,1.6),de);Ce.position.set(H,fe+1.62,re),se.add(Ce);const U=new I(new He(.13,.84,1.42),me);U.position.set(H+.02,fe+1.62,re),se.add(U);const he=new I(new He(.15,.22,1.6),new le({color:4243543}));he.position.set(H+.01,fe+2.18,re),se.add(he);const ie=new I(new He(.34,.08,1.78),de);ie.position.set(H,fe+2.31,re),se.add(ie);const Me=[.2,.2,-.18,-.18],ce=[-.34,.34,-.34,.34],Be=[16052194,16774095,15398655,16770019],te=[16739179,5090295,16766011,6937468];for(let b=0;b<4;b++){const y=new I(new He(.04,.28,.3),new le({color:Be[b]}));y.position.set(H+.1,fe+1.62+Me[b],re+ce[b]),y.rotation.x=(b-1.5)*.05,se.add(y);const N=new I(new pt(.03,6,5),new le({color:te[b]}));N.position.set(H+.13,fe+1.62+Me[b]+.1,re+ce[b]),se.add(N)}}{const re=new le({color:11105866}),fe=(b,y,N,q,Z)=>{const $=new it,Re=4.4,ge=3.8,ye=2.7,We=new I(new He(Re,ye,ge),new le({color:q}));We.position.y=.6+ye/2,$.add(We);const et=new le({color:6109728});for(const Ne of[-Re/2+.1,Re/2-.1]){const Ue=new I(new He(.2,ye,.2),et);Ue.position.set(Ne,.6+ye/2,ge/2-.1),$.add(Ue);const Ie=Ue.clone();Ie.position.z=-ge/2+.1,$.add(Ie)}const oe=new I(new en(Re*.62,1.8,4),new le({color:Z,flatShading:!0}));oe.position.y=.6+ye+.9,oe.rotation.y=Math.PI/4,$.add(oe);const mt=new I(new He(1,1.6,.12),et);mt.position.set(0,.6+.8,ge/2+.02),$.add(mt);const Fe=new le({color:16771496,emissive:16757325,emissiveIntensity:.7});for(const Ne of[-Re*.28,Re*.28]){const Ue=new I(new He(.75,.75,.1),Fe);Ue.position.set(Ne,.6+1.55,ge/2+.02),Ue.userData.noShadow=!0,$.add(Ue)}$.position.set(b,0,y),$.rotation.y=N,se.add($),hc.push({x:b,z:y,r:Math.max(Re,ge)*.5+.2})},me=(b,y,N)=>{const q=new it,Z=new I(new He(2,.9,.9),new le({color:9067059}));Z.position.y=.6+.45,q.add(Z);for(const Re of[-.95,.95]){const ge=new I(new Ye(.06,.07,2.4,6),de);ge.position.set(Re,.6+1.2,-.4),q.add(ge)}const $=new I(new He(2.3,.08,1.3),new le({color:N}));$.position.set(0,.6+2.35,-.1),$.rotation.x=.16,q.add($),q.position.set(b,0,y),se.add(q)},Ce=new le({color:15382160}),U=new _n({color:2236446}),he=new _n({color:16777215}),ie=(b,y,N,q,Z)=>{const $=new it,Re=new le({color:N});for(const Fe of[-.15,.15]){const Ne=new I(new Ye(.11,.1,.6,6),new le({color:3750218}));Ne.position.set(Fe,.6+.3,0),$.add(Ne)}const ge=new I(new pt(.44,12,9),Re);ge.scale.set(1,1.05,.92),ge.position.y=.6+1,$.add(ge);for(const Fe of[-1,1]){const Ne=new I(new qs(.09,.5,3,6),Re);Ne.position.set(Fe*.44,.6+1.04,0),Ne.rotation.z=Fe*.32,$.add(Ne);const Ue=new I(new pt(.1,7,6),Ce);Ue.position.set(Fe*.6,.6+.7,.04),$.add(Ue)}const ye=new it;ye.position.y=.6+1.66,$.add(ye),ye.add(new I(new pt(.35,12,10),Ce));for(const Fe of[-.14,.14]){const Ne=new I(new pt(.13,10,8),he);Ne.position.set(Fe,.07,.27),Ne.userData.noShadow=!0,ye.add(Ne);const Ue=new I(new pt(.06,8,6),U);Ue.position.set(Fe,.05,.38),Ue.userData.noShadow=!0,ye.add(Ue);const Ie=new I(new He(.17,.045,.05),U);Ie.position.set(Fe,.23,.31),Ie.rotation.z=Fe<0?.2:-.2,ye.add(Ie)}const We=new I(new qn(.13,.028,6,12,Math.PI),U);We.position.set(0,-.11,.31),We.rotation.x=Math.PI,ye.add(We);const et=new I(new pt(.055,6,5),Ce);et.position.set(0,-.01,.35),ye.add(et);const oe=new I(new Ye(.22,.3,.24,12),new le({color:q}));oe.position.set(0,.34,0),ye.add(oe);const mt=new I(new Ye(.48,.48,.04,14),new le({color:q}));if(mt.position.set(0,.24,0),ye.add(mt),Z==="mop"){const Fe=new I(new Ye(.03,.03,1.4,6),new le({color:11105866}));Fe.position.set(.62,.6+1,.1),$.add(Fe);const Ne=new I(new en(.14,.22,8),new le({color:15262416}));Ne.position.set(.62,.6+.34,.1),Ne.rotation.x=Math.PI,$.add(Ne)}else if(Z==="ship"){const Fe=new I(new He(.55,.1,.18),new le({color:9067059}));Fe.position.set(.62,.6+.72,.16),Fe.rotation.z=.35,$.add(Fe)}else{const Fe=new I(new Ye(.16,.23,.18,10),new le({color:16739179}));Fe.position.set(.64,.6+.78,.2),$.add(Fe)}$.position.set(b,0,y),se.add($),n0.push({g:$,headG:ye,ph:b*.7+y})};ie(-13,-239,3829413,6109728,"ship"),me(-13,-240.6,3108454),ie(0,-236,11552619,16766011,"hat"),me(0,-237.6,12597547),ie(13,-239,4890196,15262416,"mop"),me(13,-240.6,5090295);const Me=new I(new Ye(.09,.1,3.2,7),de);Me.position.set(0,.6+1.6,-231),se.add(Me);const ce=new I(new He(2.6,.8,.1),new le({color:9067059}));ce.position.set(0,.6+2.9,-231),se.add(ce),fe(-24,-246,.5,15127464,11552314),fe(24,-246,-.5,14206876,10119999),fe(3,-250,.1,15326390,12604986);const Be=new le({color:3815994});for(const[b,y]of[[-8,-234],[9,-234],[-18,-242],[19,-243],[6,-245]]){const N=new I(new Ye(.34,.3,.78,10),re);N.position.set(b,.6+.39,y),se.add(N);for(const q of[-.2,.2]){const Z=new I(new qn(.33,.025,6,14),Be);Z.position.set(b,.6+.39+q,y),Z.rotation.x=Math.PI/2,se.add(Z)}hc.push({x:b,z:y,r:.5})}for(const[b,y,N]of[[-20,-238,2],[20,-238,2]])for(let q=0;q<N;q++){const Z=new I(new He(.7,.7,.7),re);Z.position.set(b+q%2*.2,.6+.35+q*.72,y),Z.rotation.y=q*.3,se.add(Z)}for(const[b,y]of[[-7,-230],[7,-230]]){const N=new I(new Ye(.08,.1,3,7),de);N.position.set(b,.6+1.5,y),se.add(N);const q=new I(new pt(.18,8,6),new le({color:16765562,emissive:16751146,emissiveIntensity:1.3}));q.position.set(b,.6+3.05,y),q.userData.noShadow=!0,se.add(q)}const te=new le({color:14204292});for(let b=0;b<6;b++){const y=new I(new Mi(1.6,14),te);y.rotation.x=-Math.PI/2,y.position.set((Math.random()-.5)*1.2,.6+.02,-226-b*1.8),y.userData.noShadow=!0,se.add(y)}}const Ge=[{x:-19,z:-62,r:4},{x:23,z:-118,r:5},{x:-10,z:-168,r:3.5},{x:26,z:-205,r:4.5}];for(const H of Ge){const re=new I(new Ys(H.r,0),new le({color:8818326,flatShading:!0}));re.position.set(H.x,H.r*.25,H.z),re.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2),se.add(re);const fe=new I(new tl(H.r*.95,H.r*1.25,20),new _n({color:15332863,transparent:!0,opacity:.5,depthWrite:!1}));fe.rotation.x=-Math.PI/2,fe.position.set(H.x,.22,H.z),se.add(fe)}js.push(...Ge.map(H=>({x:H.x,z:H.z,r:H.r+1.8}))),js.push({x:Mt.x,z:Mt.z,r:F.islandRadius+2.5})}const r0=6,o0=[];for(let n=0;n<r0;n++){const e=rl[n];o0.push(new R(e?e.x:0,e?e.z:0,e?e.r:-1))}let Wi=(()=>{const n=parseInt(localStorage.getItem("sail.waterMode")??"1",10);return n>=0&&n<=2?n:1})();const Sb=["FLAT","FANCY","FFT"],lo=1400,Zr=new $n(lo,lo,36,36);Zr.rotateX(-Math.PI/2);const Qr=new I(Zr,new le({color:2060213,transparent:!0,opacity:.86,side:gn}));se.add(Qr);const up=Zr.attributes.position.array.slice();function bb(n,e,t){Qr.position.set(Math.round(e/40)*40,0,Math.round(t/40)*40);const i=Zr.attributes.position.array;for(let s=0;s<i.length;s+=3){const r=up[s]+Qr.position.x,o=up[s+2]+Qr.position.z;i[s+1]=Math.sin(r*.045+n*.9)*.22+Math.cos(o*.05+n*.7)*.18}Zr.attributes.position.needsUpdate=!0,Zr.computeVertexNormals()}const Ln={uTime:{value:0},uSwell:{value:1},uOffset:{value:new Ee(0,0)},uSunDir:{value:Zt.position.clone().normalize()},uCamPos:{value:new R},uDeep:{value:new De(671580)},uShallow:{value:new De(1937290)},uSss:{value:new De(4645813)},uSky:{value:new De(nl)},uFoam:{value:qm()},uFogNear:{value:260},uFogFar:{value:850},uBoat:{value:new Ee(0,0)},uBoatY:{value:0},uBoatR:{value:12},uShore:{value:o0},uShoreN:{value:Math.min(rl.length,r0)}},a0=`
    uniform vec3 uSunDir, uCamPos, uDeep, uShallow, uSss, uSky;
    uniform float uFogNear, uFogFar, uTime;
    uniform sampler2D uFoam;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    void main() {
      vec3 n = normalize(vNrm);
      // three scrolling ripple octaves keep the surface alive between swells
      float r1 = sin(vPos.x * 1.45 + uTime * 1.2) * sin(vPos.z * 1.15 - uTime * 0.9);
      float r2 = sin(vPos.x * 3.60 - uTime * 1.8) * sin(vPos.z * 3.20 + uTime * 1.4);
      float r3 = sin(vPos.x * 7.10 + uTime * 2.6) * sin(vPos.z * 6.40 - uTime * 2.2);
      n = normalize(n + vec3(r1 * 0.06 + r2 * 0.045 + r3 * 0.02, 0.0, r1 * 0.045 - r2 * 0.05 + r3 * 0.02));
      vec3 viewDir = normalize(uCamPos - vPos);
      float fres = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);

      // body color: trough navy -> teal, pushed greener as waves stand up
      float heightMix = clamp(vCrest * 1.05 + 0.45, 0.0, 1.0);
      vec3 col = mix(uDeep, uShallow, heightMix);

      // the Sea-of-Thieves signature: light pours THROUGH a backlit crest
      vec3 sunH = normalize(vec3(uSunDir.x, 0.0, uSunDir.z));
      float towardSun = max(dot(viewDir, -sunH), 0.0);
      float crestUp = smoothstep(0.12, 0.9, vCrest);
      float sss = crestUp * (0.35 + 0.65 * pow(towardSun, 2.0)) * max(dot(n, uSunDir), 0.0);
      col = mix(col, uSss, clamp(sss * 0.85, 0.0, 0.8));

      // sky mirror at a glance
      col = mix(col, uSky, fres * 0.55);

      // sun glitter: tight sparkle + soft sheen
      vec3 h = normalize(uSunDir + viewDir);
      float ndh = max(dot(n, h), 0.0);
      col += vec3(1.0, 0.96, 0.82) * (pow(ndh, 420.0) * 2.2 + pow(ndh, 36.0) * 0.12);

      // lacy foam: two scrolling samples of the cell texture, gated by crest height
      float lace1 = texture2D(uFoam, vPos.xz * 0.055 + vec2(uTime * 0.014, -uTime * 0.011)).r;
      float lace2 = texture2D(uFoam, vPos.xz * 0.023 - vec2(uTime * 0.009, uTime * 0.013)).r;
      float lace = lace1 * 0.65 + lace2 * 0.55;
      float crestF = smoothstep(0.30, 0.85, vCrest + r2 * 0.06);
      float foam = smoothstep(0.50, 0.78, crestF * (0.45 + lace));        // full white caps
      float streaks = smoothstep(0.32, 0.5, crestF * (0.45 + lace)) * 0.4; // thin lace below them
      float foamAll = clamp(foam + streaks, 0.0, 1.0);
      col = mix(col, vec3(0.94, 0.99, 1.0), foamAll * 0.85);

      float d = distance(uCamPos, vPos);
      float fogF = smoothstep(uFogNear, uFogFar, d);
      col = mix(col, uSky, fogF);
      // see-through straight down (shallows show the seabed), mirror-opaque at a glance
      float alpha = mix(0.72, 0.97, fres);
      alpha = mix(alpha, 1.0, foamAll * 0.8);
      alpha = mix(alpha, 1.0, fogF);
      gl_FragColor = vec4(col, alpha);
    }`,wb=new fi({uniforms:Ln,vertexShader:`
    uniform float uTime; uniform float uSwell; uniform vec2 uOffset;
    uniform vec2 uBoat; uniform float uBoatY; uniform float uBoatR;
    uniform vec3 uShore[6]; uniform int uShoreN;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    vec3 gerstner(vec2 d, float steep, float len, vec3 p, inout vec3 tang, inout vec3 binc) {
      float k = 6.28318 / len;
      float c = sqrt(9.8 / k);
      vec2 dir = normalize(d);
      float f = k * (dot(dir, p.xz) - c * uTime);
      float a = steep / k;
      tang += vec3(-dir.x*dir.x*steep*sin(f), dir.x*steep*cos(f), -dir.x*dir.y*steep*sin(f));
      binc += vec3(-dir.x*dir.y*steep*sin(f), dir.y*steep*cos(f), -dir.y*dir.y*steep*sin(f));
      return vec3(dir.x*a*cos(f), a*sin(f), dir.y*a*cos(f));
    }
    void main() {
      vec3 p = position;
      p.xz += uOffset;
      vec3 tang = vec3(1.0,0.0,0.0), binc = vec3(0.0,0.0,1.0);
      vec3 base = p;
      vec3 off = vec3(0.0);
      // two long rollers carry the sea, the rest is texture on top of them
      off += gerstner(vec2( 1.0, 0.35), 0.095 * uSwell, 52.0 + 22.0 * (uSwell - 1.0), base, tang, binc);
      off += gerstner(vec2(-0.45, 1.0), 0.100 * uSwell, 31.0 + 12.0 * (uSwell - 1.0), base, tang, binc);
      off += gerstner(vec2( 0.85,-0.55), 0.095 * uSwell, 17.0, base, tang, binc);
      off += gerstner(vec2( 0.15, 1.0),  0.080 * uSwell,  9.5, base, tang, binc);
      off += gerstner(vec2(-0.9, -0.2),  0.055 * uSwell,  5.2, base, tang, binc);
      off += gerstner(vec2( 0.55, 0.8),  0.040 * uSwell,  3.1, base, tang, binc);
      // calm pocket: the boat flattens the water it sits in (no waves over the deck)
      float bf = smoothstep(uBoatR * 0.55, uBoatR * 1.3, length(base.xz - uBoat));
      // shoreline: waves fade to sea level as they reach each island
      float sf = 1.0;
      for (int i = 0; i < 6; i++) {
        if (i >= uShoreN) break;
        if (uShore[i].z < 0.0) continue;
        sf = min(sf, smoothstep(uShore[i].z - 2.0, uShore[i].z + 9.0, length(base.xz - uShore[i].xy)));
      }
      off.y = mix(uBoatY, off.y, bf) * sf;
      off.x *= bf * sf; off.z *= bf * sf;
      p += off;
      p.xz -= uOffset;
      vCrest = off.y;
      vNrm = normalize(mix(vec3(0.0, 1.0, 0.0), normalize(cross(binc, tang)), min(bf, sf)));
      vec4 wp = modelMatrix * vec4(p, 1.0);
      vPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,fragmentShader:a0,transparent:!0,side:gn}),c0=new $n(lo,lo,224,224);c0.rotateX(-Math.PI/2);const $s=new I(c0,wb);$s.frustumCulled=!1;se.add($s);const Tb=Object.assign({},Ln,{uHeight:{value:Zs},uPatch:{value:co}}),Eb=new fi({uniforms:Tb,vertexShader:`
    uniform sampler2D uHeight; uniform float uPatch;
    uniform vec2 uBoat; uniform float uBoatY; uniform float uBoatR;
    uniform vec3 uShore[6]; uniform int uShoreN;
    varying vec3 vPos; varying vec3 vNrm; varying float vCrest;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);   // world XZ before displacing
      vec2 uv = wp.xz / uPatch;
      float e = 1.0 / 64.0;                            // one texel (N = 64)
      float h  = texture2D(uHeight, uv).r;
      float hL = texture2D(uHeight, uv - vec2(e, 0.0)).r;
      float hR = texture2D(uHeight, uv + vec2(e, 0.0)).r;
      float hD = texture2D(uHeight, uv - vec2(0.0, e)).r;
      float hU = texture2D(uHeight, uv + vec2(0.0, e)).r;
      float dhx = (hR - hL) / (2.0 * e * uPatch);      // slope in world space
      float dhz = (hU - hD) / (2.0 * e * uPatch);
      vec3 nrm = normalize(vec3(-dhx, 1.0, -dhz));
      // calm pocket: flatten the water the boat displaces toward its own level
      float bf = smoothstep(uBoatR * 0.55, uBoatR * 1.3, length(wp.xz - uBoat));
      // shoreline: waves fade to sea level as they reach each island
      float sf = 1.0;
      for (int i = 0; i < 6; i++) {
        if (i >= uShoreN) break;
        if (uShore[i].z < 0.0) continue;
        sf = min(sf, smoothstep(uShore[i].z - 2.0, uShore[i].z + 9.0, length(wp.xz - uShore[i].xy)));
      }
      h = mix(uBoatY, h, bf) * sf;
      vNrm = normalize(mix(vec3(0.0, 1.0, 0.0), nrm, min(bf, sf)));
      vCrest = h;
      wp.y += h;
      vPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,fragmentShader:a0,transparent:!0,side:gn}),l0=new $n(lo,lo,224,224);l0.rotateX(-Math.PI/2);const _o=new I(l0,Eb);_o.frustumCulled=!1;_o.visible=!1;se.add(_o);function Ab(n,e,t){Ln.uTime.value=n,Ln.uBoat.value.set(P.pos.x,P.pos.z),Ln.uBoatR.value=ue.hullL*.8,Wi===1?($s.position.set(Math.round(e/40)*40,0,Math.round(t/40)*40),Ln.uOffset.value.set($s.position.x,$s.position.z),Ln.uBoatY.value=0):Wi===2?(_o.position.set(Math.round(e/40)*40,0,Math.round(t/40)*40),Qm(n,dt.angle,dt.strength,Math.min(1.8,Math.max(.6,lt.swell))),Ln.uBoatY.value=Vr(P.pos.x,P.pos.z)):bb(n,e,t)}function h0(n){Wi=n,Qr.visible=n===0,$s.visible=n===1,_o.visible=n===2,localStorage.setItem("sail.waterMode",String(n))}function Cb(){return h0((Wi+1)%3),Sb[Wi]}function Rb(n){Ln.uSwell.value=Math.min(1.9,Math.max(.55,n))}const Pb=()=>Wi===2;h0(Wi);const ra=new it,_t=new it;ra.add(_t);se.add(ra);const rh=new le({color:8212266}),Zn=new le({color:4795414}),Pr=new le({color:11895372}),fp=new le({color:3108454}),oh=new le({color:4864038}),Lb=new le({vertexColors:!0}),u0=il("#b07d42","#6a4326");new le({map:u0});const Db=new le({map:rb(),side:gn}),Ib=new le({color:15986140,side:gn}),zb=new le({color:3815994}),Ub=new le({color:16765562,emissive:16751146,emissiveIntensity:1.4}),kb=new le({color:5090295}),Nb=new le({color:6937468}),Ob=new _n({color:15221818,side:gn});let Is=null,es,Or,Ii,gi,vi;const uc={stern:null};let ko,ss,Os,Fs,No,Wr,f0,d0=new R,Jh=new R;const eo=8,Ic=8,zc=7,Bs=5,Fb=new R,Bb=new R,Gb=new R,Hb=new R,Li=[{z:-4,b:1.3,k:.5,s:1.06},{z:-3,b:1.55,k:.68,s:1},{z:-1,b:1.65,k:.75,s:.96},{z:1,b:1.6,k:.74,s:.96},{z:2.6,b:1.3,k:.62,s:1.02},{z:3.8,b:.55,k:.42,s:1.16},{z:4.5,b:.06,k:.22,s:1.34}];function ol(n){Is&&(Is.traverse(v=>{v.isMesh&&v.geometry.dispose()}),_t.remove(Is)),Is=new it,_t.add(Is);const e=Is,t=v=>Xe+(v-Xe)*n,i=v=>Xe+(v-Xe)*(.55+.45*n);{const S=[],C=[],w=[],A=new De(3942936),L=new De(15260864),M=new De(9067059),T=(K,D)=>{if(K<-.12*n)return A;if(K<.18)return L;const k=M.clone();return k.offsetHSL(0,0,D%2*.022-.011),k};Li.forEach((K,D)=>{const k=[],W=i(K.s),Q=t(-K.k+Xe)-Xe;for(let J=6;J>=0;J--){const ee=J/6;k.push([-K.b*n*Math.pow(Math.sin(ee*Math.PI/2),.85),Q+(W-Q)*Math.pow(ee,1.25)])}for(let J=1;J<7;J++){const ee=J/6;k.push([K.b*n*Math.pow(Math.sin(ee*Math.PI/2),.85),Q+(W-Q)*Math.pow(ee,1.25)])}for(const[J,ee]of k){S.push(J,ee,K.z*n);const ne=T(ee,D);C.push(ne.r,ne.g,ne.b)}});for(let K=0;K<Li.length-1;K++)for(let D=0;D<12;D++){const k=K*13+D,W=k+1,Q=k+13,J=Q+1;w.push(k,Q,W,W,Q,J)}const B=S.length/3;S.push(0,.35,-4.02*n),C.push(.54,.35,.2);for(let K=0;K<12;K++)w.push(K+1,K,B);const G=new jt;G.setAttribute("position",new yt(S,3)),G.setAttribute("color",new yt(C,3)),G.setIndex(w),G.computeVertexNormals(),e.add(new I(G,Lb))}const s=v=>{const x=v/n;for(let S=0;S<Li.length-1;S++){const C=Li[S],w=Li[S+1];if(x>=C.z&&x<=w.z)return Ut(C.b,w.b,(x-C.z)/(w.z-C.z))*n}return(x<Li[0].z?Li[0].b:Li[Li.length-1].b)*n};{const v=u0.clone();v.needsUpdate=!0,v.repeat.set(2*n,7*n);const x=new I(new He(3*n,.12,7.9*n),new le({map:v}));x.position.y=Xe-.05,e.add(x)}{const v=C=>ue.gaps.some(w=>C>w.z0-.05&&C<w.z1+.05);for(const C of[-1,1])for(let w=-3.78*n;w<=3.85*n;w+=.62){if(v(w))continue;const A=(s(w+.3)-s(w-.3))/.6,L=C*(s(w)-.06),M=new I(new He(.08,.5,.64),rh);M.position.set(L,Xe+.25,w),M.rotation.y=C*Math.atan(A),e.add(M);const T=new I(new He(.17,.06,.7),fp);T.position.set(L,Xe+.52,w),T.rotation.y=M.rotation.y,e.add(T)}const x=new I(new He(2.7*n,.55,.1),rh);x.position.set(0,Xe+.27,-3.92*n),e.add(x);const S=new I(new He(2.8*n,.07,.2),fp);S.position.set(0,Xe+.56,-3.92*n),e.add(S)}{const v=-1.6*n,x=-.4,C=Xe+.52-x,w=new it;for(const L of[-.24,.24]){const M=new I(new Ye(.045,.045,C,6),Zn);M.position.set(0,x+C/2,L),w.add(M)}const A=2+Math.round(2.5*n);for(let L=0;L<A;L++){const M=new I(new He(.075,.055,.56),Pr);M.position.set(.03,x+.16+(C-.42)*(L/(A-1)),0),w.add(M)}w.position.set(s(v)+.1,0,v),w.rotation.z=-.12,e.add(w)}ko=new it,ko.position.set(0,.2,-4.05*n),e.add(ko);{const v=new I(new He(.09,1*n,.6*n),Zn);v.position.set(0,-.4*n,-.28*n),ko.add(v)}const r=new R(0,Xe+(.86+.55*n),(4.1+2.25)*n);{const v=2.4*n,x=new I(new Ye(.05,.08,v,7),Zn);x.position.set(0,Xe+.45+.28*n,5.25*n),x.rotation.x=Math.PI/2-.215,e.add(x);const S=new I(new He(.07,.5,.07),Zn);S.position.set(0,Xe+.78,-3.95*n),e.add(S);const C=new I(new pt(.12,8,6),Ub);C.position.set(0,Xe+1.05,-3.95*n),C.userData.noShadow=!0,e.add(C);const w=new Bm(16757325,0,18,2);w.position.set(0,Xe+1.2,-3.7*n),w.userData.noShadow=!0,w.visible=!1,e.add(w),uc.stern=w;for(const[T,B]of[[-1.02,-3.25],[-.72,-3.5]]){const G=new I(new Ye(.3,.26,.68,10),rh);G.position.set(T*n,Xe+.34,B*n),e.add(G);for(const K of[-.18,.18]){const D=new I(new qn(.295,.022,6,14),zb);D.position.set(T*n,Xe+.34+K,B*n),D.rotation.x=Math.PI/2,e.add(D)}}const A=new I(new He(.62,.5,.62),Pr);A.position.set(1*n,Xe+.25,2.95*n),e.add(A);const L=new I(new He(.68,.07,.68),Zn);L.position.set(1*n,Xe+.53,2.95*n),e.add(L);const M=new I(new qn(.3,.1,7,16),oh);M.position.set(-.7*n,Xe+.07,3.1*n),M.rotation.x=Math.PI/2,e.add(M)}{const v=new I(new Ye(.16,.16,.5,8),Zn);v.rotation.z=Math.PI/2,v.position.set(0,Xe+.22,3.1*n),e.add(v),es=new it,es.position.set(.45*n,Xe+.1,3.35*n),e.add(es);const x=new I(new Ye(.035,.035,3.2,5),oh);x.position.y=-1.6,x.userData.noShadow=!0,es.add(x);const S=new le({color:7305086}),C=new I(new Ye(.05,.05,.7,6),S);C.position.y=-3.2,es.add(C);const w=new I(new qn(.28,.05,6,10,Math.PI),S);w.position.y=-3.55,w.rotation.z=Math.PI,es.add(w),es.visible=!1}Ii=new it,Ii.position.set(ue.helm.x,Xe+.75,ue.helm.z+.55*n),e.add(Ii);{const v=new I(new qn(.45,.05,8,20),Zn);Ii.add(v);const x=new I(new pt(.09,8,6),Pr);Ii.add(x);for(let C=0;C<4;C++){const w=new I(new He(.05,1.18,.05),Zn);w.rotation.z=C*Math.PI/4,Ii.add(w)}for(let C=0;C<8;C++){const w=new I(new Ye(.024,.024,.16,6),Pr),A=C*Math.PI/4;w.position.set(Math.cos(A)*.53,Math.sin(A)*.53,0),w.rotation.z=A,Ii.add(w)}const S=new I(new He(.16,.75,.16),Zn);S.position.set(0,-.55,0),Ii.add(S)}gi=new it,gi.position.set(-ue.deckX+.55,Xe,-1.3*n),e.add(gi);{const v=new le({color:3093304});for(const w of[-.18,.18]){const A=new I(new He(.08,.34,.62),Zn);A.position.set(w,.21,-.02),gi.add(A)}for(const w of[-.22,.2])for(const A of[-.24,.24]){const L=new I(new Ye(.11,.11,.06,10),Pr);L.rotation.z=Math.PI/2,L.position.set(A,.11,w),gi.add(L)}vi=new it,vi.position.set(0,.42,0),gi.add(vi);const x=new I(new Ye(.085,.125,1.05,10),v);x.rotation.x=Math.PI/2,x.position.z=.32,vi.add(x);const S=new I(new qn(.095,.022,6,12),v);S.position.z=.84,vi.add(S);const C=new I(new pt(.12,8,6),v);C.position.z=-.24,vi.add(C),gi.visible=Ke.cannon}const o=je(7.5*n,5.4,23),a=Af.x,c=Af.z*n,l=new I(new Ye(.1,.14,o,8),Zn);l.position.set(a,Xe+o/2,c),e.add(l);const h=new I(new pt(.13,8,6),Pr);h.position.set(a,Xe+o+.05,c),e.add(h);const u=Math.max(2.05,2.05*n*.92);Or=new it,Or.position.set(a,Xe+u,c),e.add(Or);const f=4.6*n,d=new I(new Ye(.06,.08,f,8),Zn);d.rotation.x=Math.PI/2,d.position.z=-f/2,Or.add(d);const g=Xe+o-.6-(Xe+u);ss=new $n(f*.92,g,eo,Ic);const _=new I(ss,Db);_.rotation.y=Math.PI/2,_.position.set(0,g/2+.1,-f*.47),Or.add(_),Os=ss.attributes.position.array.slice();{const v=ss.attributes.position.array;for(let x=0;x<=Ic;x++)for(let S=0;S<=eo;S++){const C=(x*(eo+1)+S)*3,w=(v[C+1]+g/2)/g;v[C]=v[C]*(1-w*.78)-w*.38*f,Os[C]=v[C],Os[C+1]=v[C+1],Os[C+2]=v[C+2]}ss.attributes.position.needsUpdate=!0}Fs=new jt;{const v=new Float32Array((zc+1)*(Bs+1)*3);Fs.setAttribute("position",new un(v,3));const x=[];for(let S=0;S<zc;S++)for(let C=0;C<Bs;C++){const w=S*(Bs+1)+C,A=w+1,L=w+Bs+1,M=L+1;x.push(w,A,L,A,M,L)}Fs.setIndex(x)}e.add(new I(Fs,Ib)),d0=new R(0,r.y+.1,r.z-.4),Jh=new R(0,Xe+o-.7,c+.2);const m=(v,x,S,C,w,A)=>{const L=new R(v,x,S),T=new R(C,w,A).clone().sub(L),B=new I(new Ye(.022,.022,T.length(),5),oh);B.position.copy(L).addScaledVector(T,.5),B.quaternion.setFromUnitVectors(new R(0,1,0),T.clone().normalize()),B.userData.noShadow=!0,e.add(B)},p=Xe+o-.1;m(a,p,c,r.x,r.y,r.z),m(a,p-.1,c,0,Xe+.2,-3.85*n);for(const v of[-1,1])m(a,p-.2,c,v*1.5*n,Xe+.15,.25*n),m(a,p-.2,c,v*1.42*n,Xe+.18,-.95*n);No=new it,No.position.set(a,Xe+o+.25,c),e.add(No),Wr=new I(new $n(1.3,.4,6,1),Ob),Wr.position.x=.65,No.add(Wr),f0=Wr.geometry.attributes.position.array.slice();for(const[v,x]of[[ue.helm,kb],[ue.sailSta,Nb]]){const S=new I(new Ye(.55,.55,.06,16),x);S.position.set(v.x,Xe+.02,v.z),e.add(S)}e.traverse(v=>{if(!v.isMesh||v.userData.noShadow)return;const x=v.material;x&&x.transparent||(v.castShadow=!0,v.receiveShadow=!0)})}function oa(n){m_(n.scale),g_(n.tune),Mc.crates=n.crates,ol(n.scale)}let dp=0;function Vb(n,e){if(!Is)return;ra.position.set(P.pos.x,0,P.pos.z),ra.rotation.y=P.yaw;const t=lt.swell,i=Xt(P.yaw),s=ac(P.lastAccel,i);let r=0,o=0,a=0,c=1;if(Pb()){const A=On(P.yaw),L=ue.hullL*.42,M=ue.hullW*.5,T=Vr(P.pos.x+i.x*L,P.pos.z+i.z*L),B=Vr(P.pos.x-i.x*L,P.pos.z-i.z*L),G=Vr(P.pos.x-A.x*M,P.pos.z-A.z*M),K=Vr(P.pos.x+A.x*M,P.pos.z+A.z*M);r=(T+B+G+K)*.25,o=Math.atan2(T-B,2*L),a=Math.atan2(G-K,2*M),c=.3}_t.rotation.z=-P.heel+a+Math.sin(e*.8)*F.bobPitch*t*c-lt.bigWave*.2,_t.rotation.x=o+Math.sin(e*.62+1)*F.bobPitch*t*c-s*.012,_t.position.y=r+(Math.sin(e*.9)*F.bobAmp+Math.sin(e*1.7+2)*F.bobAmp*.4)*t*c+Math.abs(lt.bigWave)*.4;const l=Math.abs(P.heel-dp)/Math.max(n,1e-4);dp=P.heel,l>.1&&jc(l*4),Or.rotation.y=-P.boomAngle,Ii.rotation.z=-P.rudder*3,ko.rotation.y=-P.rudder,es.visible=P.anchored;const h=bt(dt.angle-P.yaw),u=hn.sailPower*dt.strength,f=je(P.sailForce/Math.max(.01,u),0,1),d=1-je(f*2.2,0,1),g=Math.sign(Math.sin(h))||1,_=ss.attributes.position.array;for(let A=0;A<=Ic;A++)for(let L=0;L<=eo;L++){const M=(A*(eo+1)+L)*3,T=L/eo,B=A/Ic,G=Math.sin(T*Math.PI)*Math.sin(B*Math.PI);let K=g*f*.6*ue.scale*G;K+=Math.sin(e*26+T*7+B*5)*.16*d*G,_[M]=Os[M],_[M+1]=Os[M+1],_[M+2]=Os[M+2]+K}ss.attributes.position.needsUpdate=!0,ss.computeVertexNormals();const m=ue.scale,p=Fb.set(Math.sin(P.boomAngle)*2*m,Xe+1.55,3.3*m),v=Fs.attributes.position.array,x=Bb,S=Gb,C=Hb;for(let A=0;A<=zc;A++){const L=A/zc;x.lerpVectors(d0,Jh,L),S.lerpVectors(p,Jh,L);for(let M=0;M<=Bs;M++){const T=M/Bs;C.lerpVectors(x,S,T);const B=Math.sin(L*Math.PI)*Math.sin(T*Math.PI);C.x+=g*(.3*f+.04)*m*B+Math.sin(e*24+L*6+T*4)*.12*d*B;const G=(A*(Bs+1)+M)*3;v[G]=C.x,v[G+1]=C.y,v[G+2]=C.z}}Fs.attributes.position.needsUpdate=!0,Fs.computeVertexNormals(),No.rotation.y=bt(dt.angle-P.yaw-Math.PI/2);const w=Wr.geometry.attributes.position.array;for(let A=0;A<w.length;A+=3){const L=(f0[A]+.65)/1.3;w[A+2]=Math.sin(e*10+L*6)*.12*L}Wr.geometry.attributes.position.needsUpdate=!0,Bi&&(Bi.position.y=Bi.userData.baseY+Math.sin(e*2.2)*.6,Bi.rotation.y=e*1.5)}ol(1);const p0=Ym(),Uc=[],m0=new $n(1,1);m0.rotateX(-Math.PI/2);for(let n=0;n<150;n++){const e=new I(m0,new _n({map:p0,color:15398655,transparent:!0,opacity:.55,depthWrite:!1}));e.visible=!1,e.userData.noShadow=!0,se.add(e),Uc.push(e)}let Wb=0;function ui(n,e,t,i,s=2.2,r=0,o=0,a=.55,c=1.4){const l=Uc[Wb++%Uc.length];l.visible=!0,l.position.set(n,.18,e),l.rotation.y=t,l.scale.set(i,1,c),l.userData.life=0,l.userData.lifeMax=s,l.userData.vx=r,l.userData.vz=o,l.userData.op0=a,l.material.opacity=a}function Xb(n){for(const e of Uc){if(!e.visible)continue;e.userData.life+=n;const t=e.userData.life/(e.userData.lifeMax||2.2);if(t>=1){e.visible=!1;continue}e.position.x+=(e.userData.vx||0)*n,e.position.z+=(e.userData.vz||0)*n,e.scale.x+=n*1.5,e.scale.z+=n*.7,e.material.opacity=(e.userData.op0||.55)*(1-t*t)}}const rs=new it;{const n=e=>{const t=new I(new $n(2.6,1.3),new _n({map:p0,color:16777215,transparent:!0,opacity:0,depthWrite:!1}));t.geometry.rotateX(-Math.PI/2),t.position.set(e*.7,.22,-.5),t.rotation.y=-e*.55,t.userData.side=e,rs.add(t)};n(-1),n(1),rs.visible=!1,se.add(rs)}function qb(n,e,t,i,s){if(i<1.2){rs.visible=!1;return}rs.visible=!0,rs.position.set(n,.2,e),rs.rotation.y=t;const r=Math.min(1,(i-1.2)/6);for(const o of rs.children){o.material.opacity=.55*r+.1;const a=1+Math.sin(s*13+o.userData.side)*.1;o.scale.set(.8+r*1,1,(.7+r*1.1)*a)}}const Vu=[],Yb=new pt(.16,6,5),jb=new _n({color:15858431});for(let n=0;n<36;n++){const e=new I(Yb,jb);e.visible=!1,e.userData.noShadow=!0,se.add(e),Vu.push(e)}function Yi(n,e,t,i,s){for(const r of Vu)r.visible||t--<=0||(r.visible=!0,r.position.set(n,.3,e),r.userData.vx=(Math.random()-.5)*i,r.userData.vy=s*(.7+Math.random()*.9),r.userData.vz=(Math.random()-.5)*i)}function In(n,e,t){$c(t),Yi(n,e,t?14:9,5,3.2),ui(n,e,Math.random()*zt,t?1.6:1)}function $b(n){for(const e of Vu)e.visible&&(e.userData.vy-=12*n,e.position.x+=e.userData.vx*n,e.position.y+=e.userData.vy*n,e.position.z+=e.userData.vz*n,e.position.y<0&&(e.visible=!1))}const Kb=42,g0=new $n(4.2,.14);g0.rotateX(-Math.PI/2);const _0=new _n({color:16777215,transparent:!0,opacity:.35,depthWrite:!1}),v0=[];for(let n=0;n<Kb;n++){const e=new I(g0,_0);e.position.set((Math.random()-.5)*240,.3,(Math.random()-.5)*240),e.userData.life=Math.random()*4,se.add(e),v0.push(e)}function Jb(n,e,t,i,s,r){for(const a of v0){a.userData.life+=n,(a.userData.life>4||Math.hypot(a.position.x-t,a.position.z-i)>170)&&(a.userData.life=0,a.position.set(t+(Math.random()-.5)*280,.3,i+(Math.random()-.5)*280)),a.position.x+=Math.sin(s)*r*.55*n,a.position.z+=Math.cos(s)*r*.55*n,a.rotation.y=s;const c=a.userData.life/4;a.scale.x=.5+Math.sin(c*Math.PI)*.9}const o=Math.min(1,Math.max(0,(r-11)/26));_0.opacity=(.1+.34*o)*(.82+.18*Math.sin(e*2))}const Zb=new R(0,1,0),Qb=new R,ve={pos:nt(0,0),vel:nt(0,0),yaw:0,roll:0,capsized:0},al=()=>Ke.barge&&Jt.barge,Wu=[];for(let n=0;n<6;n++)Wu.push({x:n%2?.5:-.5,z:(Math.floor(n/2)-1)*1});const ew=n=>Wu[n];function x0(n){const e=Xt(ve.yaw),t=On(ve.yaw),i=Wu[n];return nt(ve.pos.x+t.x*i.x+e.x*i.z,ve.pos.z+t.z*i.x+e.z*i.z)}const tw=()=>Bt.filter(n=>n.s===5);function y0(){for(let n=0;n<6;n++)if(!Bt.some(e=>e.s===5&&e.x===n))return n;return-1}function M0(n){const e=n.mode==="deck"?vn(n.pos):n.pos;return Math.hypot(e.x-ve.pos.x,e.z-ve.pos.z)<3.2}function nw(n){if(n.carry<0)return;const e=y0();if(e<0||ve.capsized>0||!M0(n))return;const t=Bt[n.carry];n.carry=-1,t.carrier=-1,t.s=5,t.x=e,t.z=0,t.vx=0,t.vz=0,t.lashed=!1,jc(.6)}const hi=new it;let as;{const n=il("#8a5a33","#5d3a20");n.repeat.set(1,2);const e=new I(new He(1.9,.3,3.4),new le({map:n}));e.position.y=.12,e.castShadow=!0,hi.add(e);const t=new le({color:6109728});for(const s of[-.95,.95]){const r=new I(new He(.18,.34,3.5),t);r.position.set(s,0,0),hi.add(r)}for(const s of[-1.7,1.7]){const r=new I(new He(1.9,.22,.16),t);r.position.set(0,.3,s),hi.add(r)}const i=new I(new Ye(.05,.05,.22,6),t);i.position.set(0,.36,1.62),hi.add(i),hi.visible=!1,se.add(hi),as=new I(new Ye(.035,.035,1,5),new le({color:4864038})),as.userData.noShadow=!0,as.visible=!1,se.add(as)}const Xu=()=>vn(nt(0,-ue.hullL/2-.15));function cl(){const n=Xu(),e=Xt(P.yaw);ve.pos.x=n.x-e.x*F.bargeRope*.85,ve.pos.z=n.z-e.z*F.bargeRope*.85,ve.vel.x=0,ve.vel.z=0,ve.yaw=P.yaw,ve.roll=0,ve.capsized=0}function iw(){ve.capsized=F.bargeRightT;const n=tw();for(const e of n){const t=x0(e.x);e.s=3,e.x=t.x,e.z=t.z,e.floatT=15,In(t.x,t.z,!1)}In(ve.pos.x,ve.pos.z,!0),$c(!0),$e("THE BARGE CAPSIZED!"+(n.length?" "+n.length+" crates overboard!":""),"#ff8787")}function sw(n){if(!al())return;const e=Xu();let t=ve.pos.x-e.x,i=ve.pos.z-e.z;const s=Math.hypot(t,i)||1;if(t/=s,i/=s,s>F.bargeRope){const u=(s-F.bargeRope)*F.bargePull;ve.vel.x-=t*u*n,ve.vel.z-=i*u*n,P.vel.x+=t*u*F.bargeDragBack*n,P.vel.z+=i*u*F.bargeDragBack*n;const f=On(P.yaw),d=t*f.x+i*f.z;P.angVel+=d*u*F.bargeYawTug*n}const r=Xt(ve.yaw),o=On(ve.yaw);let a=ve.vel.x*r.x+ve.vel.z*r.z,c=ve.vel.x*o.x+ve.vel.z*o.z;a-=a*Math.min(1,.55*n),c-=c*Math.min(1,F.bargeLatDamp*n),ve.vel.x=r.x*a+o.x*c,ve.vel.z=r.z*a+o.z*c,ve.pos.x+=ve.vel.x*n,ve.pos.z+=ve.vel.z*n;const l=Math.atan2(e.x-ve.pos.x,e.z-ve.pos.z);ve.yaw=bt(ve.yaw+je(bt(l-ve.yaw),-1,1)*1.7*n);for(const u of js){const f=ve.pos.x-u.x,d=ve.pos.z-u.z,g=Math.hypot(f,d),_=u.r-.4;g<_&&g>0&&(ve.pos.x=u.x+f/g*_,ve.pos.z=u.z+d/g*_)}const h=je(-c*.16,-1.1,1.1);ve.roll=Ut(ve.roll,h,Math.min(1,4*n)),ve.capsized>0?(ve.capsized-=n,ve.capsized<=0&&(ve.capsized=0,ve.roll=0,$e("The barge rolled upright again.","#aef7a2"))):Math.abs(ve.roll)>F.bargeCapsizeRoll&&pp(ve.vel)>2&&iw(),pp(ve.vel)>1.5&&Math.random()<n*6&&ui(ve.pos.x,ve.pos.z,ve.yaw,.9)}const pp=n=>Math.hypot(n.x,n.z);function rw(n){const e=al();if(hi.visible=e,as.visible=e,!e)return;const t=.06+Math.sin(n*1.7+ve.pos.x*.3)*.05;hi.position.set(ve.pos.x,t,ve.pos.z),hi.rotation.set(Math.sin(n*1.3)*.02,ve.yaw,ve.capsized>0?Math.PI:ve.roll);const i=Xu(),s=Xt(ve.yaw),r=ve.pos.x+s.x*1.6,o=ve.pos.z+s.z*1.6,a=(i.x+r)/2,c=(i.z+o)/2,l=r-i.x,h=o-i.z,u=Math.hypot(l,h)||1;as.position.set(a,.45,c),as.scale.y=u,as.quaternion.setFromUnitVectors(Zb,Qb.set(l/u,0,h/u))}const ow=24,S0=()=>Mc.crates+(Ke.bigDeck?4:0)+(Ke.barge&&Jt.barge?6:0),b0=()=>jn[Ms].pay,aw=()=>Mc.crates<=4?1.25:Mc.crates>=14?.85:1,Bt=[];{const n=il("#b08753","#7a5232",128,128,4),e=new le({map:n}),t=new le({color:6109728}),i=new le({color:4864038});for(let s=0;s<ow;s++){const r=new it,o=new I(new He(.55,.55,.55),e);o.castShadow=!0,r.add(o);for(const c of[-.24,.24]){const l=new I(new He(.59,.07,.59),t);l.position.y=c,r.add(l)}const a=new it;for(const c of[0,Math.PI/2]){const l=new I(new He(.62,.05,.07),i);l.rotation.y=c,a.add(l)}a.position.y=.28,a.visible=!1,r.add(a),r.visible=!1,se.add(r),Bt.push({s:4,x:0,z:0,vx:0,vz:0,carrier:-1,floatT:0,lashed:!1,mesh:r,lashMesh:a})}}const ll=()=>Bt.some(n=>n.s===1&&n.lashed),cw=()=>Bt.some(n=>n.s===1);function lw(n){for(const e of Bt)e.s===1&&(e.lashed=n);$e(n?"Cargo lashed down — 20% off the pay, but it will not slide.":"Cargo untied — full pay, hold on to your crates!","#ffd95e")}function w0(){if(ll()){for(const n of Bt)n.s===1&&n.lashed&&(n.lashed=!1,n.vx+=(Math.random()-.5)*4,n.vz+=(Math.random()-.5)*4);$e("The lashings SNAPPED!","#ff8787")}}let Gs=-1;function bs(){xt.batch++,xt.batchT=0;const n=S0();Bt.forEach((e,t)=>{e.s=t<n?0:4,e.x=hp.x-1.2+t%3*1.2,e.z=hp.z-1+Math.floor(t/3)*1,e.vx=0,e.vz=0,e.carrier=-1,e.floatT=0,e.lashed=!1}),$e("Shipment ready on the home pier — "+n+" crates to the green flag!","#ffd95e")}function rr(){Gs=-1;for(const n of Bt)n.s=4,n.carrier=-1,n.lashed=!1,n.vx=0,n.vz=0;for(const n of qe)n.carry=-1}function T0(n){if(n.carry>=0||n.hasMop||n.holding||n.grabbedBy>=0||n.knock>0)return null;let e=-1,t=!1,i=1e9;return Bt.forEach((s,r)=>{if(s.s===1&&n.mode==="deck"){const o=Math.hypot(s.x-n.pos.x,s.z-n.pos.z);o<1.35&&o<i&&(e=r,t=!1,i=o)}else if(s.s===0&&n.mode==="shore"){const o=Math.hypot(s.x-n.pos.x,s.z-n.pos.z);o<1.35&&o<i&&(e=r,t=!1,i=o)}else if(s.s===3&&n.mode==="deck"){const o=vn(n.pos),a=Math.hypot(s.x-o.x,s.z-o.z);a<3&&a<i&&(e=r,t=!0,i=a)}else if(s.s===5&&(n.mode==="deck"||n.mode==="shore")){const o=n.mode==="deck"?vn(n.pos):n.pos,a=x0(s.x),c=Math.hypot(a.x-o.x,a.z-o.z);c<2.4&&c<i&&(e=r,t=!1,i=c)}}),e>=0?{i:e,fish:t}:null}function hw(n,e){const t=Bt[e];t.s=2,t.carrier=qe.indexOf(n),n.carry=e}function E0(n,e=!1){if(n.carry<0)return;const t=Bt[n.carry];n.carry,n.carry=-1,t.carrier=-1;const i=Xt(n.facing),s=e?1:.65;if(n.mode==="deck")t.s=1,t.x=je(n.pos.x+i.x*s,-ue.deckX+.2,ue.deckX-.2),t.z=je(n.pos.z+i.z*s,-ue.deckZ+.2,ue.deckZ-.2),t.vx=n.vel.x+(e?i.x*2.5:0),t.vz=n.vel.z+(e?i.z*2.5:0);else if(n.mode==="shore"){const r=n.pos.x+i.x*s,o=n.pos.z+i.z*s;if(Math.hypot(r-vt.x,o-vt.z)<vt.r){const a=Math.round(b0()*(t.lashed?.8:1)*aw());t.s=4,xt.gold+=a,xt.delivered++,tr(),Kc(),Yi(r,o,6,1.2,2.6),$e("Crate delivered! +"+a+"g"+(t.lashed?" (lashed -20%)":""),"#aef7a2"),C0();return}t.s=0,t.x=aa(r,o)?r:n.pos.x,t.z=aa(r,o)?o:n.pos.z,t.vx=0,t.vz=0}else{t.s=3;const r=n.mode==="water"?n.pos:vn(n.pos);t.x=r.x,t.z=r.z,t.floatT=15,In(t.x,t.z,!1)}}let Lr=0;function uw(n){Bt.some(s=>s.s!==4)&&(xt.batchT+=n),ll()&&(lt.weatherId===2||Math.abs(lt.bigWave)>.45)?(Lr+=n,Lr>=7&&(Lr=0,Math.random()<.6&&w0())):Lr>0&&(Lr=Math.max(0,Lr-n*.5));const t=Xt(P.yaw),i=On(P.yaw);for(const s of Bt)if(s.s===1){if(s.lashed){s.vx=0,s.vz=0;continue}let r=0,o=0;r+=-(P.lastAccel.x*i.x+P.lastAccel.z*i.z)*F.inertiaScale*.85,o+=-(P.lastAccel.x*t.x+P.lastAccel.z*t.z)*F.inertiaScale*.85;const a=P.angVel,c=P.lastAngAccel;r+=(a*a*s.x-c*s.z)*F.inertiaScale*.85,o+=(a*a*s.z+c*s.x)*F.inertiaScale*.85,r+=Math.sin(P.heel)*hn.heelSlide*.8,r+=lt.bigWave*5,zh(s.x,s.z)&&(r*=F.poopSlip,o*=F.poopSlip),s.vx+=r*n,s.vz+=o*n;const l=zh(s.x,s.z)?1.6:5;s.vx-=s.vx*Math.min(1,l*n),s.vz-=s.vz*Math.min(1,l*n),s.x+=s.vx*n,s.z+=s.vz*n;const h=ue.gaps.some(u=>s.z>u.z0&&s.z<u.z1);if(Math.abs(s.x)>ue.deckX-.1)if(h){if(Math.abs(s.x)>ue.deckX+.3){const u=vn(s);s.s=3,s.x=u.x,s.z=u.z,s.floatT=15,In(u.x,u.z,!1),$e("A crate went overboard!","#ff8787");continue}}else s.x=Math.sign(s.x)*(ue.deckX-.1),s.vx*=-.25;Math.abs(s.z)>ue.deckZ-.1&&(s.z=Math.sign(s.z)*(ue.deckZ-.1),s.vz*=-.25)}else if(s.s===3){if(s.floatT-=n,s.x+=Math.sin(dt.angle)*.25*n,s.z+=Math.cos(dt.angle)*.25*n,s.floatT<=0){s.s=4,xt.lost++;const r=Math.min(xt.gold,Math.round(b0()*.5));xt.gold-=r,tr(),Yi(s.x,s.z,5,1,1.5),ui(s.x,s.z,0,1),$e("A crate sank…"+(r>0?" −"+r+"g harbour fine":""),"#ff8787"),C0()}}else if(s.s===2){const r=qe[s.carrier];!r||!zn(r)||r.carry!==Bt.indexOf(s)?(s.s=1,s.carrier=-1,r&&(r.carry=-1)):(r.mode==="water"||r.knock>0||r.grabbedBy>=0)&&(r.carry=-1,s.carrier=-1,r.mode==="water"?(s.s=3,s.x=r.pos.x,s.z=r.pos.z,s.floatT=15,In(s.x,s.z,!1)):r.mode==="shore"?(s.s=0,s.x=r.pos.x,s.z=r.pos.z):(s.s=1,s.x=je(r.pos.x,-ue.deckX+.2,ue.deckX-.2),s.z=je(r.pos.z,-ue.deckZ+.2,ue.deckZ-.2),s.vx=r.vel.x,s.vz=r.vel.z))}Gs>0&&(Gs-=n,Gs<=0&&(Gs=-1,bs()))}let A0=()=>{};function fw(n){A0=n}function C0(){if(Bt.some(t=>t.s!==4)||Gs>0)return;const n=xt.batchT/60|0,e=xt.batchT%60|0;$e("Job complete: "+xt.delivered+" delivered · "+xt.lost+" lost · "+n+":"+String(e).padStart(2,"0"),"#aef7a2"),A0()}function dw(n){for(const e of Bt){const t=e.mesh;if(e.s===4){t.visible=!1;continue}if(t.visible=!0,e.s===2){const s=qe[e.carrier]?.mesh.userData.parts?.torso;if(s){t.parent!==s&&(s.add(t),t.position.set(0,.34,.5),t.rotation.set(0,0,0));continue}}if(e.lashMesh.visible=e.s===1&&e.lashed,e.s===5){const i=ew(e.x);t.parent!==hi&&hi.add(t),t.position.set(i.x,.55,i.z),t.rotation.set(0,0,0),t.visible=al()}else e.s===1?(t.parent!==_t&&_t.add(t),t.position.set(e.x,Xe+.28,e.z),t.rotation.set(0,0,0)):(t.parent!==se&&se.add(t),e.s===0?(t.position.set(e.x,Vi+.28,e.z),t.rotation.set(0,0,0)):(t.position.set(e.x,.12+Math.sin(n*1.6+e.x)*.06,e.z),t.rotation.set(Math.sin(n*.9+e.z)*.15,0,Math.cos(n*1.2+e.x)*.15)))}}function pw(n){n.forEach((e,t)=>{const i=Bt[t];i&&(i.s=e.s,i.x=e.x,i.z=e.z,i.carrier=e.cr,i.lashed=e.l)}),qe.forEach((e,t)=>{e.carry=Bt.findIndex(i=>i.s===2&&i.carrier===t)})}function mw(){return Bt.map(n=>({s:n.s,x:n.x,z:n.z,h:0,cr:n.carrier,l:n.lashed}))}const gw=()=>Gs>0,R0=()=>Bt.filter(n=>n.s===1||n.s===5||n.s===2&&qe[n.carrier]?.mode==="deck").length,ho=()=>Bt.filter(n=>n.s!==4).length,P0=new le({color:11105866}),_w=new le({color:7029286}),fc=new le({color:9278876}),L0=new le({color:15262416});function qu(){P0.color.set(13938487),fc.color.set(16769357),fc.emissive.set(6967808),fc.emissiveIntensity=.4,L0.color.set(16773280)}const Yu=()=>Ke.mopLong?F.scrubRange*1.5:F.scrubRange,vw=()=>Ke.mopQuick?F.scrubTime*.55:F.scrubTime,xw=()=>Ke.mopLong?F.whackRange*1.4:F.whackRange;function yw(){const n=new it,e=P0,t=_w,i=fc,s=L0,r=new I(new Ye(.028,.028,1.25,7),e);r.position.y=.72,n.add(r);const o=new I(new Ye(.036,.036,.18,7),t);o.position.y=1.22,n.add(o);const a=new I(new Ye(.055,.07,.08,8),i);a.position.y=.13,n.add(a);const c=new I(new en(.15,.16,9),s);c.position.y=.04,n.add(c);for(let l=0;l<7;l++){const h=l/7*Math.PI*2,u=new I(new qs(.022,.16,3,5),s);u.position.set(Math.cos(h)*.09,-.07,Math.sin(h)*.09),u.rotation.z=Math.cos(h)*.35,u.rotation.x=-Math.sin(h)*.35,n.add(u)}return n.traverse(l=>{l.isMesh&&(l.castShadow=!0)}),_t.add(n),n}function Mw(){const n=new it,e=new I(new Ye(.24,.19,.32,12),new le({color:5073530}));e.position.y=.16,e.castShadow=!0,n.add(e);const t=new I(new qn(.24,.022,6,14),new le({color:9278876}));t.position.y=.32,t.rotation.x=Math.PI/2,n.add(t);const i=new I(new Mi(.2,12),new le({color:4030118}));return i.rotation.x=-Math.PI/2,i.position.y=.27,n.add(i),_t.add(n),n}const ii=[0,1,2,3].map(()=>({held:-1,x:0,z:0,h:0,vx:0,vz:0,vy:0,thrown:!1,thrower:-1,on:!0,mesh:yw(),bucket:Mw()}));Ke.mopGold&&qu();const mp=[{sx:-.72,sz:-.35},{sx:.72,sz:-.35},{sx:-.72,sz:.6},{sx:.72,sz:.6}];function Sw(n){ii.forEach((e,t)=>{e.on=t===0||!!Fn[t];const i=mp[t]??mp[0];e.bucket.position.set(i.sx*ue.deckX,Xe,i.sz*ue.scale),e.bucket.visible=e.on,e.held=-1,e.thrown=!1,e.h=0,e.vx=0,e.vz=0,e.vy=0,e.x=e.bucket.position.x,e.z=e.bucket.position.z,e.mesh.visible=e.on});for(const e of qe)e.hasMop=!1}const Qs=n=>ii.find(e=>e.on&&e.held===qe.indexOf(n));function D0(n,e){let t,i=e;for(const s of ii){if(!s.on||s.held>=0||s.thrown)continue;const r=Math.hypot(s.x-n.pos.x,s.z-n.pos.z);r<i&&(i=r,t=s)}return t}function ah(n,e){if(e){const t=vn({x:je(n.x,-ue.deckX-2,ue.deckX+2),z:je(n.z,-ue.deckZ-2,ue.deckZ+2)});In(t.x,t.z,!1),$e("The mop went swimming — a spare appeared in the bucket","#74c0fc")}n.held=-1,n.thrown=!1,n.h=0,n.vx=0,n.vz=0,n.vy=0,n.x=n.bucket.position.x,n.z=n.bucket.position.z}const gp=n=>n==="helm"?"HELM":n==="sail"?"SAIL":"CANNON",I0=()=>({x:0,z:ue.deckZ*.88});function hl(n){if(n.grabbedBy>=0||n.mode==="water"||n.knock>0)return null;if(n.carry>=0){if(n.mode==="shore"){const t=Xt(n.facing);if(Math.hypot(n.pos.x+t.x*.65-vt.x,n.pos.z+t.z*.65-vt.z)<vt.r)return{kind:"crate-deliver",label:"E — DELIVER the crate!"}}return al()&&ve.capsized<=0&&y0()>=0&&M0(n)?{kind:"crate-barge",label:"E — stow the crate on the BARGE"}:{kind:"crate-put",label:"E — put the crate down (F: toss)"}}if(n.station==="cannon")return{kind:"station-leave",label:kt.reload>0?"E — leave the CANNON · reloading… · A/D + W/S aim":"E — leave the CANNON · LMB = FIRE! · A/D + W/S aim"};if(n.station)return{kind:"station-leave",label:"E — let go of the "+gp(n.station)};if(Qs(n))return n.mode==="deck"&&ul(n.pos.x,n.pos.z,Yu())?{kind:"mop-scrub",label:"Hold LMB — scrub the poop!"}:{kind:"mop-put",label:"E — put the mop down"};if(n.mode==="shore"){for(const t of pb)if(Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<2.6)return{kind:"shop",label:"E — talk to "+t.label,shopCat:t.cat}}if(n.mode==="shore"&&Math.hypot(n.pos.x-Dc.x,n.pos.z-Dc.z)<1.8)return{kind:"route",label:"E — read the job board (now: "+jn[Ms].name+" · "+jn[Ms].pay+"g/crate)"};const e=T0(n);if(e)return e.fish?{kind:"crate-fish",label:"E — fish the crate out!"}:{kind:"crate-take",label:"E — pick up the crate"};if(n.mode==="deck"&&cw()&&Math.hypot(n.pos.x- -.7*ue.scale,n.pos.z-3.1*ue.scale)<1.4)return ll()?{kind:"lash",label:"E — untie the cargo (full pay, slides again)"}:{kind:"lash",label:"E — lash the cargo (-20% pay, no sliding)"};if(n.mode==="deck"&&!n.holding&&D0(n,F.mopPickupR))return{kind:"mop-take",label:"E — pick up the mop"};if(n.mode==="deck"){const t=I0();if(Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<1.7)return{kind:"anchor",label:P.anchored?"E — raise the anchor":"E — drop the anchor"}}if(n.mode==="deck"){const t=W0(n);if(t)return{kind:"station",label:"E — man the "+gp(t)};const i=Mu(n);if(i&&zn(i)&&i.mode==="deck"&&i.grabbedBy<0&&Math.hypot(i.pos.x-n.pos.x,i.pos.z-n.pos.z)<F.grabRange)return{kind:"grab-hint",label:"F (hold) — grab your matey"}}return null}function ju(n){const e=hl(n);if(e)switch(e.kind){case"crate-put":case"crate-deliver":E0(n);break;case"crate-barge":nw(n);break;case"crate-take":case"crate-fish":{const t=T0(n);t&&hw(n,t.i);break}case"mop-put":{const t=Qs(n);n.hasMop=!1,t.held=-1,t.x=je(n.pos.x,-ue.deckX,ue.deckX),t.z=je(n.pos.z,-ue.deckZ,ue.deckZ);break}case"mop-take":{const t=D0(n,F.mopPickupR);t.held=qe.indexOf(n),n.hasMop=!0,n.scrubT=0;break}case"anchor":{P.anchored=!P.anchored;const t=vn(I0());P.anchored?(In(t.x,t.z,!1),$e("Anchor down!","#74c0fc")):$e("Anchor aweigh!","#aef7a2"),jc(1);break}case"route":case"shop":break;case"lash":lw(!ll());break;case"station":mT(n);break;case"station-leave":di(n);break}}function $u(n){const e=qe.indexOf(n);if(n.grabbedBy>=0){n.mash++,n.mash>=F.escapeMash&&Tw(n,qe[n.grabbedBy]);return}if(n.carry>=0){E0(n,!0);return}if(n.mode!=="deck")return;const t=Qs(n);if(t){const c=Xt(n.facing);t.held=-1,n.hasMop=!1,n.scrubT=0,t.thrown=!0,t.thrower=e,t.x=n.pos.x+c.x*.5,t.z=n.pos.z+c.z*.5,t.h=1.2,t.vx=c.x*F.mopThrowForce+n.vel.x*.5,t.vz=c.z*F.mopThrowForce+n.vel.z*.5,t.vy=F.mopThrowArc;return}const i=Mu(n);if(!i||!zn(i)||i.mode!=="deck"||i.grabbedBy>=0||n.grabbedBy>=0)return;const s=i.pos.x-n.pos.x,r=i.pos.z-n.pos.z,o=Math.hypot(s,r);if(o>F.grabRange)return;const a=Qs(i);a&&(a.held=-1,a.x=i.pos.x,a.z=i.pos.z,i.hasMop=!1),i.grabbedBy=e,i.mash=0,n.holding=!0,n.scrubT=0,Gi.set(n,{ang:bt(Math.atan2(s,r)-n.facing),dist:je(o,.55,1.55),strain:0}),i.station&&$e(i.name+" is clinging to the "+i.station+" — DRAG them off!","#ffd95e")}const Gi=new Map,uo=new Map;function bw(){Gi.clear(),uo.clear()}function ww(n){const e=qe[n];if(e){e.holding&&(Gi.delete(e),e.holding=!1);for(const t of qe)t.grabbedBy===n&&(t.grabbedBy=-1,t.mash=0);if(e.grabbedBy>=0){const t=qe[e.grabbedBy];t&&(t.holding=!1,Gi.delete(t)),e.grabbedBy=-1}e.mash=0,uo.delete(e);for(const t of ii)t.held===n&&(t.held=-1,t.x=e.pos.x,t.z=e.pos.z);e.hasMop=!1}}function Ku(n){if(n.mode!=="deck"||!Qs(n)||ul(n.pos.x,n.pos.z,Yu())||(uo.get(n)??0)>0)return;const e=Mu(n);if(!e||!zn(e)||e.mode!=="deck"||e.grabbedBy>=0)return;const t=e.pos.x-n.pos.x,i=e.pos.z-n.pos.z,s=Math.hypot(t,i);s>xw()||(uo.set(n,F.whackCooldown),di(e),e.knock=Math.max(e.knock,F.whackKnock),e.vel.x+=t/(s||1)*F.whackKick,e.vel.z+=i/(s||1)*F.whackKick,Su(),$e(n.name+" bonked "+e.name+" with the mop!","#ffd95e"))}function Tw(n,e){n.grabbedBy=-1,n.mash=0,e.holding=!1,Gi.delete(e),n.knock=.3,e.knock=.4;const t=Xt(e.facing);n.vel.x=t.x*2.2,n.vel.z=t.z*2.2,$e(n.name+" wriggled free!","#aef7a2")}function Ew(n,e){e.grabbedBy=-1,e.mash=0,n.holding=!1;const t=e.pos.x-n.pos.x,i=e.pos.z-n.pos.z,s=Math.hypot(t,i)||1;e.vel.x=t/s*F.throwForce+n.vel.x*.5,e.vel.z=i/s*F.throwForce+n.vel.z*.5,e.vy=F.throwArc,e.jumpY=Math.max(e.jumpY,.3),e.knock=.85,$e(n.name+" shoves "+e.name+"!","#ff8a7a")}function z0(n){for(const[e,t]of uo)uo.set(e,t-n);for(const e of ii)if(!(!e.on||!e.thrown)){if(e.vy-=12*n,e.x+=e.vx*n,e.z+=e.vz*n,e.h=Math.max(0,e.h+e.vy*n),e.h>.1&&e.h<1.9)for(const t of qe)qe.indexOf(t)!==e.thrower&&(!zn(t)||t.mode!=="deck"||t.grabbedBy>=0||Math.hypot(t.pos.x-e.x,t.pos.z-e.z)<.7&&Math.hypot(e.vx,e.vz)>2&&(di(t),t.knock=Math.max(t.knock,1.3),t.vel.x+=e.vx*.45,t.vel.z+=e.vz*.45,Su(),$e(t.name+" got beaned by a flying mop!","#ff8a7a"),e.vx*=.2,e.vz*=.2,e.vy=Math.min(e.vy,0)));e.h<=0?(e.thrown=!1,e.vx=0,e.vz=0,e.vy=0,(Math.abs(e.x)>ue.deckX+.4||Math.abs(e.z)>ue.deckZ+.4)&&ah(e,!0)):(Math.abs(e.x)>ue.deckX+3||Math.abs(e.z)>ue.deckZ+3)&&ah(e,!0)}for(let e=0;e<qe.length;e++){const t=qe[e];if(!zn(t))continue;const i=zi(t),s=Qs(t);if(s&&t.mode!=="deck"&&(t.hasMop=!1,ah(s,!1)),t.hasMop=!!Qs(t),t.hasMop&&t.mode==="deck"&&i.u){const r=ul(t.pos.x,t.pos.z,Yu());r?(t.scrubT+=n,t.scrubT>=vw()&&(Zw(r.id),t.scrubT=0)):t.scrubT=Math.max(0,t.scrubT-n*3)}else t.scrubT>0&&(t.scrubT=Math.max(0,t.scrubT-n*3));if(t.holding){const r=qe.find(o=>o.grabbedBy===e);if(!r||r.grabbedBy!==e||r.mode!=="deck"||t.mode!=="deck")t.holding=!1,Gi.delete(t),r&&r.grabbedBy===e&&(r.grabbedBy=-1);else if(!i.h)Ew(t,r),Gi.delete(t);else{const o=Gi.get(t)??{ang:0,dist:.95,strain:0};Gi.set(t,o);const a=t===zs?Ns:Ih;o.ang=je(o.ang-a.x*F.dragSens,-1.35,1.35),o.dist=je(o.dist-a.y*F.dragSens*.8,.55,1.55),a.x=0,a.y=0;const c=bt(t.facing+o.ang),l=t.pos.x+Math.sin(c)*o.dist,h=t.pos.z+Math.cos(c)*o.dist,u=r.station?F.stationGripPull:F.dragPull,f=Math.min(1,u*n),d=r.pos.x,g=r.pos.z;if(r.pos.x+=(l-r.pos.x)*f,r.pos.z+=(h-r.pos.z)*f,r.vel.x=(r.pos.x-d)/Math.max(n,1e-4)*.5,r.vel.z=(r.pos.z-g)/Math.max(n,1e-4)*.5,r.jumpY=Ut(r.jumpY,.12,Math.min(1,8*n)),r.vy=0,r.facing=bt(Math.atan2(t.pos.x-r.pos.x,t.pos.z-r.pos.z)),r.station){const m=r.station==="helm"?ue.helm:r.station==="cannon"?ue.cannonSta:ue.sailSta,p=Math.hypot(l-r.pos.x,h-r.pos.z);o.strain+=p*n*1.7;const v=Math.hypot(r.pos.x-m.x,r.pos.z-m.z)>F.stationDragOff;(o.strain>1||v)&&($e(r.name+" got dragged off the "+r.station+"!","#ffd95e"),di(r),r.knock=Math.max(r.knock,.4))}const _=zi(r);if(_.fwd||_.strafe){const m=Math.hypot(_.fwd,_.strafe),p=Xt(r.facing);t.vel.x+=(p.x*_.fwd-Math.cos(r.facing)*_.strafe)/m*F.walkAccel*F.victimInput*.5*n,t.vel.z+=(p.z*_.fwd+Math.sin(r.facing)*_.strafe)/m*F.walkAccel*F.victimInput*.5*n}}}}}function Aw(n){for(const e of ii){if(e.mesh.visible=e.on,e.bucket.visible=e.on,!e.on)continue;const t=e.held>=0?qe[e.held]:null,i=t?.mesh.userData.parts?.arms?.[1];if(t&&i){e.mesh.parent!==i&&(i.add(e.mesh),e.mesh.position.set(.07,-.5,.13));const s=t.scrubT>0;e.mesh.rotation.set(s?.95:.5,.12,-.3+(s?Math.sin(n*16)*.22:0))}else if(e.mesh.parent!==_t&&_t.add(e.mesh),e.thrown)e.mesh.position.set(e.x,Xe+e.h,e.z),e.mesh.rotation.set(n*14%(Math.PI*2),Math.atan2(e.vx,e.vz),0);else{const s=Math.hypot(e.x-e.bucket.position.x,e.z-e.bucket.position.z)<.2;e.mesh.position.set(e.x,Xe+(s?.26:.05),e.z),e.mesh.rotation.set(s?.12:Math.PI/2-.08,.6+(s?0:.8),0)}}}function pa(n){for(const e of qe)e.hasMop=!1,e.grabbedBy=-1,e.holding=!1,e.mash=0,e.scrubT=0;bw(),Sw()}const Ot=n=>document.getElementById(n),Cw=Ot("modeSelect"),Xr=Ot("netStatus"),ms=Ot("netchip"),Rw=Ot("btnSolo"),Pw=Ot("btnHost"),Lw=Ot("btnJoin"),Dw=Ot("joinCode"),Iw=Ot("restartBtn"),zw=Ot("compass").getContext("2d"),Uw=Ot("speed"),kw=Ot("timer"),Nw=Ot("windtxt"),Ow=Ot("gold"),Qa=Ot("toast"),_p=Ot("promptP1"),Fw=Ot("msg"),Bw=Ot("msgText"),Dr=Ot("struggle"),ch=Ot("scrubRing"),lh=Ot("mopHint"),Ps=Ot("objective"),Ir=Ot("waypoint"),hh=Ot("trimCoach"),kc=Ot("help"),ai=new R;let ec="",vp="",xp="";function tc(n,e,t){return e!==t&&(n.innerHTML=e),e}function Gw(){kc.style.display=kc.style.display==="flex"?"none":"flex"}function Hw(){return kc.style.display==="flex"}Ot("helpClose").addEventListener("click",()=>{kc.style.display="none"});let uh=null,Zh=null;function Vw(n){Zh=n}function $e(n,e){Qa.textContent=n,Qa.style.color=e||"#ffe066",Qa.style.opacity="1",uh&&clearTimeout(uh),uh=setTimeout(()=>{Qa.style.opacity="0"},1700),Zh&&Zh(n,e)}function Ww(n){Bw.textContent="Time: "+n,Fw.style.display="block",Kc()}function Xw(){const n=zw,e=90,t=e/2;n.clearRect(0,0,e,e),n.strokeStyle="rgba(255,255,255,.8)",n.lineWidth=2,n.beginPath(),n.arc(t,t,38,0,zt),n.stroke();const i=Xp(),s=i.d,r=bt(s+Math.PI),o=F.noGoHalfAngle*Math.PI/180;n.save(),n.translate(t,t),n.rotate(-r+Math.PI),n.beginPath(),n.moveTo(0,0),n.arc(0,0,38,-Math.PI/2-o,-Math.PI/2+o),n.closePath(),n.fillStyle=i.noGo?"rgba(255,70,70,.6)":"rgba(255,110,110,.2)",n.fill(),n.restore(),n.save(),n.translate(t,t),n.rotate(-s+Math.PI),n.fillStyle="#74c0fc",n.beginPath(),n.moveTo(0,-30),n.lineTo(10,6),n.lineTo(0,-2),n.lineTo(-10,6),n.closePath(),n.fill(),n.restore();const a=bt(Math.atan2(vt.x-P.pos.x,vt.z-P.pos.z)-P.yaw);n.save(),n.translate(t,t),n.rotate(-a+Math.PI),n.fillStyle="#69db7c",n.beginPath(),n.moveTo(0,-40),n.lineTo(6,-30),n.lineTo(-6,-30),n.closePath(),n.fill(),n.restore(),n.fillStyle=i.noGo?"#ff6b6b":"#fff",n.beginPath(),n.moveTo(t,t-41),n.lineTo(t-4,t-33),n.lineTo(t+4,t-33),n.closePath(),n.fill(),n.fillStyle="#fff",n.font="bold 11px Consolas",n.textAlign="center",n.fillText("WIND",t,t+30)}function qw(n){if(n.mode==="water"){const e=Math.hypot(P.pos.x-n.pos.x,P.pos.z-n.pos.z),t=bt(Math.atan2(P.pos.x-n.pos.x,P.pos.z-n.pos.z)-n.facing),i=Math.abs(t)<.35?"ahead":t>0?"to the left":"to the right";return"Boat "+(e|0)+"m "+i+" — swim into the ladder to climb up"}return hl(n)?.label??""}function U0(n){Uw.textContent=Dh(P.vel).toFixed(1),kw.textContent=Bp(Oe.runTime),Nw.textContent=dt.strength.toFixed(0)+" kn";const e=Math.hypot(vt.x-P.pos.x,vt.z-P.pos.z);Ow.textContent=xt.gold+"g",Xw();const t=Oe.inMenu?"":qw(Yn());_p.style.display=t?"block":"none",t&&(_p.textContent=t);const i=qe.find(o=>o.grabbedBy>=0);i&&!Oe.inMenu?(ai.set(i.pos.x,2.4,i.pos.z),_t.localToWorld(ai),ai.project(Et),ai.z<1?(Dr.style.display="block",Dr.style.left=(ai.x*.5+.5)*innerWidth+"px",Dr.style.top=(-ai.y*.5+.5)*innerHeight+"px",Dr.textContent=(i===Yn()?"MASH F! ":"✊ ")+i.mash+"/"+F.escapeMash):Dr.style.display="none"):Dr.style.display="none";const s=Yn();!Oe.inMenu&&s.hasMop&&s.mode==="deck"?(lh.style.display="block",xp=tc(lh,"🧹 <b>hold LMB</b> scrub · <b>tap LMB</b> bonk matey · <b>F</b> throw · <b>E</b> put down",xp)):lh.style.display="none";const r=Yn();if(r.scrubT>0){ch.style.display="block";const o=Math.min(360,r.scrubT/F.scrubTime*360);ch.style.background=`conic-gradient(#69db7c ${o}deg, rgba(255,255,255,.15) ${o}deg)`}else ch.style.display="none";if(Oe.inMenu)Ps.style.display="none";else if(Ht.length===0)Ps.style.display="block",Ps.classList.remove("near"),ec=tc(Ps,'<div class="qcard empty"><div class="route">📋 No job yet</div>read the job board on the home pier (E) — take up to 3</div>',ec);else{Ps.style.display="block";const o=e<40;Ps.classList.toggle("near",o);let a="";Ht.forEach((c,l)=>{const h=jn[c];if(l===0)if(o)a+='<div class="qcard live"><div class="route">⚑ '+h.name+" — ARRIVING</div>stop, drop anchor, carry crates onto the green flag</div>";else{const u=Dh(P.vel),f=u>.5?" · ~"+Math.round(e/u)+"s":"",d=e>950?(e/1e3).toFixed(1)+"km":(e|0)+"m";a+='<div class="qcard live"><div class="route">⚑ '+h.name+"</div>"+d+f+" · "+h.pay+"g/crate<br>"+R0()+" aboard · "+ho()+" left</div>"}else a+='<div class="qcard"><div class="route">'+(l+1)+". "+h.name+"</div>"+h.pay+"g/crate · queued (switch at the board)</div>"}),ec=tc(Ps,a,ec)}if(Oe.inMenu||ho()===0)Ir.style.display="none";else{ai.set(vt.x,2,vt.z),ai.project(Et);let o=ai.x,a=ai.y;const c=ai.z>=1;if(c&&(o=-o,a=-a),!c&&Math.abs(o)<.9&&Math.abs(a)<.9)Ir.style.display="none";else{const l=innerWidth/2,h=innerHeight/2,u=Math.hypot(o,-a)||1,f=o/u,d=-a/u,g=Math.min((l-64)/Math.max(.001,Math.abs(f)),(h-64)/Math.max(.001,Math.abs(d)));Ir.style.display="block",Ir.style.left=l+f*g+"px",Ir.style.top=h+d*g+"px",Ir.innerHTML='<div class="wparrow" style="transform:rotate('+Math.atan2(f,-d)+'rad)">▲</div>'+(e|0)+"m"}}if(!Oe.inMenu&&r.station==="sail"){const o=Xp(),a=je(P.sailForce/Math.max(.01,hn.sailPower*dt.strength),0,1),c=bt(o.idealBoom-P.boomAngle);let l,h,u;o.noGo?(l="IN IRONS",h="steer away from the wind",u="#ff6b6b"):a<.85?(l=P.luffing?"LUFFING":"ADJUST",h=c>.03?"hold D ▶":c<-.03?"◀ hold A":"",u=a>.4?"#ffd43b":"#ff8787"):(l="TRIMMED ✓",h="",u="#51cf66"),hh.style.display="block",vp=tc(hh,'<span style="color:'+u+'">SAIL '+l+'</span><span class="bar"><i style="width:'+(a*100).toFixed(0)+"%;background:"+u+'"></i></span><span style="color:'+u+'">'+h+"</span>",vp)}else hh.style.display="none"}const Ju=[];{const n=new le({color:8366264}),e=new le({color:6129814});for(let t=0;t<5;t++){const i=new it,s=new I(new pt(.22,8,6),n);s.scale.set(.8,.7,1.9),i.add(s);const r=new I(new en(.16,.3,4),e);r.position.z=-.46,r.rotation.x=-Math.PI/2,i.add(r),i.visible=!1,i.traverse(o=>{o.userData.noShadow=!0}),se.add(i),Ju.push({mesh:i,t:0,active:!1,from:new R,dir:new R})}}let fh=3;function Yw(){const n=Ju.find(s=>!s.active);if(!n)return;const e=Math.random()*Math.PI*2,t=10+Math.random()*22;n.from.set(P.pos.x+Math.cos(e)*t,0,P.pos.z+Math.sin(e)*t);const i=Math.random()*Math.PI*2;n.dir.set(Math.sin(i),0,Math.cos(i)),n.t=0,n.active=!0,n.mesh.visible=!0,Yi(n.from.x,n.from.z,3,1.4,1.8),$p()}function jw(n){fh-=n,fh<=0&&(fh=2.5+Math.random()*6,Yw());for(const e of Ju){if(!e.active)continue;if(e.t+=n/.95,e.t>=1){e.active=!1,e.mesh.visible=!1;const r=e.from.x+e.dir.x*4.2,o=e.from.z+e.dir.z*4.2;Yi(r,o,4,1.6,2),$p();continue}const t=e.from.x+e.dir.x*4.2*e.t,i=e.from.z+e.dir.z*4.2*e.t,s=Math.sin(e.t*Math.PI)*1.7-.15;e.mesh.position.set(t,s,i),e.mesh.rotation.y=Math.atan2(e.dir.x,e.dir.z),e.mesh.rotation.x=-Math.cos(e.t*Math.PI)*.9}}const yi=new it;let k0,N0;{const n=new le({color:16120058}),e=new I(new pt(.26,8,6),n);e.scale.set(1,.7,1.8),yi.add(e);const t=i=>{const s=new I(new He(1.3,.05,.4),n);return s.geometry.translate(i*.65,0,0),yi.add(s),s};k0=t(-1),N0=t(1),yi.traverse(i=>{i.userData.noShadow=!0}),yi.visible=!1,se.add(yi)}const It={active:!1,t:0,from:new R,dir:new R,drops:[]};let qr=9,Qh=0;function O0(n){Qh=n,qr=Math.min(qr,.5)}const F0=()=>It.active?yi.position:null,eu=[];{const n=new _n({color:16119536});for(let e=0;e<4;e++){const t=new I(new pt(.08,6,5),n);t.visible=!1,t.userData.noShadow=!0,_t.add(t),eu.push({mesh:t,vy:0,active:!1})}}const $w=10,Nc=new Map,Oc=[];{const n=new Mi(.26,10);n.rotateX(-Math.PI/2);for(let e=0;e<$w;e++){const t=new I(n,new _n({color:15922154,transparent:!0,opacity:.95,depthWrite:!1}));t.visible=!1,t.userData.noShadow=!0,_t.add(t),Oc.push(t)}}let Kw=1,tu=null,nu=null;function Jw(n,e){tu=n,nu=e}function Zu(n,e,t){if(Nc.has(n))return;if(!Oc.length){const s=_s[0];s&&ma(s.id)}const i=Oc.pop();i&&(i.visible=!0,i.position.set(e,Xe+.012,t),i.rotation.y=Math.random()*Math.PI,i.scale.setScalar(.85+Math.random()*.5),Nc.set(n,i),_s.push({id:n,x:e,z:t}),w_())}function ma(n){const e=Nc.get(n);e&&(e.visible=!1,Nc.delete(n),Oc.push(e));const t=_s.findIndex(i=>i.id===n);t>=0&&_s.splice(t,1)}function ul(n,e,t){let i=null;for(const s of _s){const r=Math.hypot(s.x-n,s.z-e);r<t&&(!i||r<i.d)&&(i={id:s.id,d:r})}return i}function Zw(n){ma(n),nu&&nu(n)}function ga(){for(const n of[..._s])ma(n.id)}function Qw(n,e){const t=Kw++;Zu(t,n,e),tu&&tu(t,n,e);const i=qe.find(s=>zn(s)&&s.mode==="deck"&&Math.hypot(s.pos.x-n,s.pos.z-e)<.85);i&&$e(i.name+" got decorated by the gull!","#f8f9fa")}function eT(n,e){if(At!=="guest"&&(qr-=n,qr<=0&&!It.active)){Qh>0?(Qh--,qr=.9):qr=F.poopInterval+(Math.random()*2-1)*F.poopIntervalVar,It.active=!0,It.t=0;const t=Math.random()*Math.PI*2;It.dir.set(Math.sin(t),0,Math.cos(t));const i=13+8*Math.max(0,ue.scale-1);It.from.set(P.pos.x-It.dir.x*45,i,P.pos.z-It.dir.z*45);const s=1+Math.floor(Math.random()*F.splatsPerPassMax);It.drops=[];for(let r=0;r<s;r++)It.drops.push({at:2.4+Math.random()*1.6,tx:(Math.random()*2-1)*ue.deckX*.85,tz:(Math.random()*2-1)*ue.deckZ*.85});yi.visible=!0}if(It.active){It.t+=n;const t=15;yi.position.set(It.from.x+It.dir.x*t*It.t,It.from.y,It.from.z+It.dir.z*t*It.t),yi.rotation.y=Math.atan2(It.dir.x,It.dir.z);const i=Math.sin(e*9)*.6;k0.rotation.z=i,N0.rotation.z=-i;for(const s of It.drops)if(s.at>=0&&It.t>=s.at){s.at=-1;const r=eu.find(o=>!o.active);r&&(r.active=!0,r.mesh.visible=!0,r.mesh.position.set(s.tx,11+8*Math.max(0,ue.scale-1),s.tz),r.mesh.userData.tx=s.tx,r.mesh.userData.tz=s.tz,r.vy=-1)}It.t>6.5&&(It.active=!1,yi.visible=!1)}for(const t of eu)t.active&&(t.vy-=9*n,t.mesh.position.y+=t.vy*n,t.mesh.position.y<=Xe+.1&&(t.active=!1,t.mesh.visible=!1,At!=="guest"&&Qw(t.mesh.userData.tx,t.mesh.userData.tz)))}const ln=new it;{const n=new le({color:4019298}),e=new le({color:10466493}),t=new I(new pt(1.6,12,10),n);t.scale.set(1.15,.95,2.6),ln.add(t);const i=new I(new pt(1.25,10,8),e);i.position.set(0,-.55,1.1),i.scale.set(.95,.6,1.6),ln.add(i);const s=new I(new en(1.5,1.6,4),n);s.position.set(0,.3,-4.4),s.rotation.x=-Math.PI/2.3,s.scale.set(1.6,1,.25),ln.add(s);const r=new I(new en(.5,1,4),n);r.position.set(0,1.3,-1.2),r.scale.z=.35,ln.add(r),ln.traverse(o=>{o.userData.noShadow=!0}),ln.visible=!1,ln.name="whale",se.add(ln)}const tT={active:!1,t:0,cd:25+Math.random()*30,from:new R,dir:new R,sprayed:!1};function nT(n){const e=tT;if(!e.active){if(e.cd-=n,e.cd<=0){e.active=!0,e.t=0,e.sprayed=!1;const i=Math.random()*Math.PI*2,s=35+Math.random()*40;e.from.set(P.pos.x+Math.cos(i)*s,0,P.pos.z+Math.sin(i)*s);const r=Math.random()*Math.PI*2;e.dir.set(Math.sin(r),0,Math.cos(r)),ln.visible=!0}return}if(e.t+=n/11,e.t>=1){e.active=!1,ln.visible=!1,e.cd=35+Math.random()*55;return}const t=-3.4+Math.sin(e.t*Math.PI)*3.8;ln.position.set(e.from.x+e.dir.x*e.t*26,t,e.from.z+e.dir.z*e.t*26),ln.rotation.y=Math.atan2(e.dir.x,e.dir.z),ln.rotation.x=-Math.cos(e.t*Math.PI)*.3,!e.sprayed&&e.t>.42&&(e.sprayed=!0,Yi(ln.position.x+e.dir.x*2,ln.position.z+e.dir.z*2,8,1.2,5.5),$c(!1)),e.t>.2&&e.t<.85&&Math.random()<n*4&&ui(ln.position.x,ln.position.z,ln.rotation.y,2.2)}const Vn=new it;{const n=new le({color:5069411}),e=new I(new en(.42,.8,4),n);e.scale.z=.3,e.position.y=.32,Vn.add(e);const t=new I(new pt(.5,8,6),n);t.scale.set(.5,.22,1.6),t.position.y=-.02,Vn.add(t),Vn.traverse(i=>{i.userData.noShadow=!0}),Vn.visible=!1,Vn.name="shark",se.add(Vn)}const iT={active:!1,t:0,cd:18+Math.random()*20,from:new R,dir:new R,rip:0};function sT(n){const e=iT;if(!e.active){if(e.cd-=n,e.cd<=0){e.active=!0,e.t=0;const t=Math.random()*Math.PI*2,i=14+Math.random()*16;e.from.set(P.pos.x+Math.cos(t)*i,0,P.pos.z+Math.sin(t)*i);const s=t+Math.PI/2+(Math.random()-.5)*.8;e.dir.set(Math.sin(s),0,Math.cos(s)),Vn.visible=!0}return}if(e.t+=n/14,e.t>=1){e.active=!1,Vn.visible=!1,e.cd=25+Math.random()*35;return}Vn.position.set(e.from.x+e.dir.x*e.t*60,.02+Math.sin(e.t*28)*.05,e.from.z+e.dir.z*e.t*60),Vn.rotation.y=Math.atan2(e.dir.x,e.dir.z)+Math.sin(e.t*20)*.1,e.rip-=n,e.rip<=0&&(e.rip=.5,ui(Vn.position.x,Vn.position.z,Vn.rotation.y,.4))}const B0=[];{const n=new le({color:8016434});[[28,-42],[-38,-88],[52,-140],[-18,-228],[70,-25],[-65,-190]].forEach(([t,i],s)=>{const r=s%2?new I(new Ye(.32,.28,.75,9),n):new I(new He(.9,.16,.5),n);r.position.set(t,.1,i),r.rotation.set(s%2?Math.PI/2.2:0,s*1.3,0),r.userData.noShadow=!0,se.add(r),B0.push({mesh:r,ph:s*1.7})})}function rT(n,e){for(const t of B0)t.mesh.position.y=.08+Math.sin(e*1.1+t.ph)*.07,t.mesh.rotation.y+=n*.06}const G0=[];{const n=[16755021,5090295,16766011,6547134];rl.forEach((e,t)=>{for(let i=0;i<4;i++){const s=new it,r=new le({color:n[(t+i)%n.length]}),o=new I(new pt(.09,6,5),r);o.scale.set(.7,.8,1.8),s.add(o);const a=new I(new en(.06,.12,4),r);a.position.z=-.2,a.rotation.x=-Math.PI/2,s.add(a),s.traverse(c=>{c.userData.noShadow=!0}),se.add(s),G0.push({mesh:s,cx:e.x,cz:e.z,r:e.r+3+i%3*2.4,sp:(.28+i%2*.14)*((t+i)%2?1:-1),ph:i*1.7+t*.9,y:-.7-i%2*.4})}})}function oT(n){for(const e of G0){const t=n*e.sp+e.ph;e.mesh.position.set(e.cx+Math.cos(t)*e.r,e.y+Math.sin(n*1.3+e.ph)*.12,e.cz+Math.sin(t)*e.r),e.mesh.rotation.y=-t+(e.sp>0?0:Math.PI)+Math.sin(n*5+e.ph)*.25}}let dh=5;function aT(n){dh-=n;const e=fa[4];if(!e)return;const t=Math.hypot(e.g.position.x-P.pos.x,e.g.position.z-P.pos.z);dh<=0&&(t<40||It.active)&&(dh=6+Math.random()*9,Ho())}function cT(n,e){jw(n),eT(n,e),aT(n),nT(n),sT(n),rT(n,e),oT(e)}const Fc=-Math.PI/2,kt={yaw:Fc,pitch:.22,reload:0},_a=[];{const n=new le({color:2303787});for(let e=0;e<4;e++){const t=new I(new pt(.12,8,6),n);t.visible=!1,t.userData.noShadow=!0,se.add(t),_a.push({active:!1,p:new R,v:new R,mesh:t})}}const fl=[];for(let n=0;n<6;n++){const e=new I(new pt(.3,8,6),new le({color:14672870,transparent:!0,opacity:.65,depthWrite:!1}));e.visible=!1,e.userData.noShadow=!0,se.add(e),fl.push({t:-1,mesh:e})}function Bc(n,e=!1){const t=fl.find(i=>i.t<0);t&&(t.t=0,t.mesh.visible=!0,t.mesh.position.copy(n),t.mesh.scale.setScalar(e?1.4:.8))}let iu=null;function lT(n){iu=n}const su=new R,yp=new R;function hT(){return vi.updateWorldMatrix(!0,!1),su.set(0,0,.9).applyMatrix4(vi.matrixWorld),yp.set(0,0,1).transformDirection(vi.matrixWorld),{p:su,d:yp}}function H0(n,e,t,i,s,r){const o=_a.find(a=>!a.active);o&&(o.active=!0,o.p.set(n,e,t),o.v.set(i,s,r),o.mesh.visible=!0,o.mesh.position.copy(o.p))}function Qu(n){if(!Ke.cannon||kt.reload>0||n.station!=="cannon")return;kt.reload=F.cannonReload;const{p:e,d:t}=hT(),i=t.x*F.cannonSpeed+P.vel.x,s=t.y*F.cannonSpeed,r=t.z*F.cannonSpeed+P.vel.z;H0(e.x,e.y,e.z,i,s,r),Bc(e,!0),jp(),Oe.shake=Math.max(Oe.shake,.4);const o=1/Math.max(1,ue.scale);P.vel.x-=t.x*F.cannonRecoil*o,P.vel.z-=t.z*F.cannonRecoil*o,P.angVel+=(Math.random()-.5)*.06*o;for(const a of qe){if(a===n||!zn(a)||a.mode!=="deck")continue;const c=ue.cannonSta.x-Math.sin(kt.yaw)*.6,l=ue.cannonSta.z-Math.cos(kt.yaw)*.6;Math.hypot(a.pos.x-c,a.pos.z-l)<F.cannonBreech&&(a.knock=Math.max(a.knock,1),a.vel.x-=Math.sin(kt.yaw)*3,a.vel.z-=Math.cos(kt.yaw)*3,$e(a.name+" stood behind the cannon!","#ff8a7a"))}iu&&iu(e.x,e.y,e.z,i,s,r)}function uT(n,e,t,i,s,r){H0(n,e,t,i,s,r),Bc(su.set(n,e,t),!0),jp(),Oe.shake=Math.max(Oe.shake,.3)}let Yr=-1;function fT(n){kt.reload>0&&(kt.reload=Math.max(0,kt.reload-n)),V0(n,!0),Yr>0&&(Yr-=n,Yr<=0&&(Yr=-1,O0(5+(Math.random()*3|0)),$e("The flock REMEMBERS.","#ff8787")))}function V0(n,e){for(const t of _a){if(!t.active)continue;if(t.v.y-=9.8*n,t.p.addScaledVector(t.v,n),t.mesh.position.copy(t.p),t.p.y<=0){t.active=!1,t.mesh.visible=!1,In(t.p.x,t.p.z,!0),ui(t.p.x,t.p.z,0,1.2),$c(!0);continue}if(!e)continue;let i=!1;const s=F0();if(s&&t.p.distanceTo(s)<2.6&&(i=!0),!i){for(const r of fa)if(t.p.distanceTo(r.g.position)<2.2){i=!0;break}}if(i){t.active=!1,t.mesh.visible=!1,Bc(t.p),Ho(),$e("DIRECT HIT on a seagull!","#ffd95e"),Yr=3.5;continue}for(const r of js)if(t.p.y<7&&Math.hypot(t.p.x-r.x,t.p.z-r.z)<r.r){t.active=!1,t.mesh.visible=!1,Bc(t.p),Su();break}t.active&&Math.hypot(t.p.x-P.pos.x,t.p.z-P.pos.z)>170&&(t.active=!1,t.mesh.visible=!1)}}function dT(n){gi&&(gi.visible=Ke.cannon,gi.rotation.y=kt.yaw,vi.rotation.x=-kt.pitch),At==="guest"&&V0(n,!1);for(const e of fl){if(e.t<0)continue;if(e.t+=n,e.t>.8){e.t=-1,e.mesh.visible=!1;continue}const t=e.t/.8;e.mesh.scale.setScalar(e.mesh.scale.x+n*3.2),e.mesh.material.opacity=.65*(1-t),e.mesh.position.y+=n*.8}}function ef(){kt.yaw=Fc,kt.pitch=.22,kt.reload=0,Yr=-1;for(const n of _a)n.active=!1,n.mesh.visible=!1;for(const n of fl)n.t=-1,n.mesh.visible=!1}const aa=(n,e,t=.15)=>db.some(i=>n>i.x0-t&&n<i.x1+t&&e>i.z0-t&&e<i.z1+t);function Jo(n,e){if(aa(n,e))return Vi;for(const t of mb)if(Math.hypot(n-t.x,e-t.z)<t.r)return t.y;return null}const va=.5;function vn(n){const e=Xt(P.yaw),t=On(P.yaw);return nt(P.pos.x+t.x*n.x+e.x*n.z,P.pos.z+t.z*n.x+e.z*n.z)}function tf(n){const e=Xt(P.yaw),t=On(P.yaw),i=n.x-P.pos.x,s=n.z-P.pos.z;return nt(i*t.x+s*t.z,i*e.x+s*e.z)}function zi(n){return n===Yn()?Xm():At==="host"&&n!==qe[0]?n.netAxes:sb}const nf=n=>n==="helm"?ue.helm:n==="sail"?ue.sailSta:ue.cannonSta;function W0(n){if(n.mode!=="deck")return null;const e=Ke.cannon?["helm","sail","cannon"]:["helm","sail"];let t=null,i=p_;for(const s of e){const r=nf(s),o=Math.hypot(n.pos.x-r.x,n.pos.z-r.z);o<i&&(i=o,t=s)}return t}function pT(n){return qe.find(e=>e.station===n)||null}function di(n){n.station=null}function mT(n){if(n.station){di(n);return}const e=W0(n);if(e&&!pT(e)){n.station=e;const t=nf(e);n.pos.x=t.x,n.pos.z=t.z,n.vel.x=0,n.vel.z=0}}function gT(n){const e=vn(n.pos);di(n),n.mode="water",_t.remove(n.mesh),se.add(n.mesh);const t=Xt(P.yaw),i=On(P.yaw),s=n.jumpY<=1e-4;n.vel=nt(P.vel.x*.3+i.x*n.vel.x+t.x*n.vel.z,P.vel.z*.3+i.z*n.vel.x+t.z*n.vel.z),n.pos=nt(e.x,e.z),n.facing=bt(P.yaw+n.facing),n.jumpY=Math.max(0,Xe+n.jumpY+F.eyeHeight-va),s&&(n.vy=Math.min(n.vy,-2.5)),n.overboardCount++}function _T(n){const e=tf(n.pos);n.mode="deck",se.remove(n.mesh),_t.add(n.mesh),n.pos=nt(je(e.x,-ue.deckX+.2,ue.deckX-.2),je(e.z,-ue.deckZ+.2,ue.deckZ-.2)),n.facing=bt(n.facing-P.yaw),n.vel=nt(),n.jumpY=0,n.vy=0;const t=vn(n.pos);In(t.x,t.z,!1)}function Mp(n){const e=vn(n.pos);if(aa(e.x,e.z,.7)||n.jumpY>1e-4){di(n),_t.remove(n.mesh),se.add(n.mesh),n.mode="shore";const t=Xt(P.yaw),i=On(P.yaw);n.vel=nt(i.x*n.vel.x+t.x*n.vel.z,i.z*n.vel.x+t.z*n.vel.z),n.pos=nt(e.x,e.z),n.facing=bt(n.facing+P.yaw);return}gT(n)}function vT(n,e,t){const i=tf(n.pos);if(Math.abs(i.x)<ue.deckX+.2&&Math.abs(i.z)<ue.deckZ+.2){se.remove(n.mesh),_t.add(n.mesh),n.mode="deck";const s=Xt(P.yaw),r=On(P.yaw);return n.vel=nt(n.vel.x*r.x+n.vel.z*r.z,n.vel.x*s.x+n.vel.z*s.z),n.pos=nt(je(i.x,-ue.deckX+.1,ue.deckX-.1),je(i.z,-ue.deckZ+.1,ue.deckZ-.1)),n.facing=bt(n.facing-P.yaw),n.jumpY+=.15,!0}return e?(n.mode="water",n.jumpY=Math.max(0,t+F.eyeHeight-va),n.vy=Math.min(n.vy,-2.5),!0):!1}const xT=n=>ue.gaps.some(e=>n>e.z0&&n<e.z1);function yT(n){n.mode="deck",se.remove(n.mesh),_t.add(n.mesh),n.pos=nt(n.name==="P1"?-.5:.5,-1),n.facing=0,n.vel=nt(),n.knock=.8,n.jumpY=0,n.vy=0;const e=vn(n.pos);In(e.x,e.z,!0),$e(n.name+" washed back aboard!","#74c0fc")}function MT(n,e,t,i){if(n.knock>0&&(n.knock-=t),n.grabbedBy>=0){const s=qe[n.grabbedBy];if(!s||!zn(s)||!s.holding)n.grabbedBy=-1;else{n.animMoving=!1,n.mesh.position.set(n.pos.x,Xe+n.jumpY,n.pos.z),n.mesh.rotation.set(0,n.facing,0);return}}if(n.mode==="deck"){if(n.station){const v=zi(n),x=v.strafe;n.station==="helm"?P.rudder=je(P.rudder-x*F.rudderRate*ns*t,-F.rudderMax*ns,F.rudderMax*ns):n.station==="sail"?P.boomAngle=je(P.boomAngle+x*F.boomRate*ns*t,-F.boomMax*ns,F.boomMax*ns):(kt.yaw=je(kt.yaw-x*1.1*t,Fc-F.cannonTraverse,Fc+F.cannonTraverse),kt.pitch=je(kt.pitch+v.fwd*.9*t,.03,1.25));const S=nf(n.station);n.pos.x=S.x,n.pos.z=S.z,n.vel.x=0,n.vel.z=0,n.animMoving=!1,n.mesh.position.set(n.pos.x,Xe,n.pos.z),n.mesh.rotation.set(0,n.facing,0);return}const s=n.jumpY<=1e-4;if(zi(n).j&&s&&n.knock<=0){n.vy=F.jumpVel;const v=zi(n);if(v.fwd||v.strafe){const x=Math.hypot(v.fwd,v.strafe);n.vel.x+=(Math.sin(n.facing)*v.fwd-Math.cos(n.facing)*v.strafe)/x*F.jumpBoost,n.vel.z+=(Math.cos(n.facing)*v.fwd+Math.sin(n.facing)*v.strafe)/x*F.jumpBoost}}(!s||n.vy>0)&&(n.vy-=F.gravity*t,n.jumpY=Math.max(0,n.jumpY+n.vy*t),n.jumpY===0&&n.vy<0&&(n.vy=0));const r=s&&zh(n.pos.x,n.pos.z);if(n.knock<=0){const v=zi(n);if(v.fwd||v.strafe){const x=Math.hypot(v.fwd,v.strafe);let S=F.walkAccel*(s?1:F.airControl);r&&(S*=F.poopTraction),n.hasMop&&(S*=F.mopCarrySlow),n.holding&&(S*=F.grabCarrySlow),n.carry>=0&&(S*=.8),n.vel.x+=(Math.sin(n.facing)*v.fwd-Math.cos(n.facing)*v.strafe)/x*S*t,n.vel.z+=(Math.cos(n.facing)*v.fwd+Math.sin(n.facing)*v.strafe)/x*S*t,s&&(n.walkPhase+=t*11)}}let o=s?n.knock>0?F.slideDampDown:F.walkDamp:.25;r&&(o*=F.poopDampLoss),n.vel.x-=n.vel.x*Math.min(1,o*t),n.vel.z-=n.vel.z*Math.min(1,o*t);const a=Xt(P.yaw),c=On(P.yaw);let l=0,h=0;l+=-(P.lastAccel.x*c.x+P.lastAccel.z*c.z)*F.inertiaScale,h+=-(P.lastAccel.x*a.x+P.lastAccel.z*a.z)*F.inertiaScale;const u=P.angVel,f=P.lastAngAccel;l+=(u*u*n.pos.x-f*n.pos.z)*F.inertiaScale,h+=(u*u*n.pos.z+f*n.pos.x)*F.inertiaScale,l+=Math.sin(P.heel)*hn.heelSlide,l+=lt.bigWave*6;const d=F.wobbleSlide*lt.swell;l+=Math.sin(i*.9+e*2.1)*d,h+=Math.sin(i*.73+1.7+e)*d,r&&(l*=F.poopSlip,h*=F.poopSlip),Math.hypot(l,h)>F.stumbleThresh&&n.knock<=0&&s&&(n.knock=F.knockTime),n.vel.x+=l*t,n.vel.z+=h*t,n.pos.x+=n.vel.x*t,n.pos.z+=n.vel.z*t;const _=n.jumpY>d_;if(Math.abs(n.pos.x)>ue.deckX)if(xT(n.pos.z)||_){if(Math.abs(n.pos.x)>ue.deckX+.55){Mp(n);return}}else n.pos.x=Math.sign(n.pos.x)*ue.deckX,n.vel.x*=-.2;if(Math.abs(n.pos.z)>ue.deckZ)if(_){if(Math.abs(n.pos.z)>ue.deckZ+.55){Mp(n);return}}else n.pos.z=Math.sign(n.pos.z)*ue.deckZ,n.vel.z*=-.2;const m=Math.hypot(n.vel.x,n.vel.z)>.4;n.animMoving=m&&n.knock<=0;let p=Xe+n.jumpY;m&&s&&n.knock<=0&&(p+=Math.abs(Math.sin(n.walkPhase))*.09),n.mesh.position.set(n.pos.x,p,n.pos.z),n.mesh.rotation.set(0,n.facing,0)}else if(n.mode==="shore"){const s=Jo(n.pos.x,n.pos.z)??Vi,r=n.jumpY<=1e-4;if(zi(n).j&&r&&n.knock<=0&&(n.vy=F.jumpVel),(!r||n.vy>0)&&(n.vy-=F.gravity*t,n.jumpY=Math.max(0,n.jumpY+n.vy*t),n.jumpY===0&&n.vy<0&&(n.vy=0)),n.knock<=0){const h=zi(n);if(h.fwd||h.strafe){const u=Math.hypot(h.fwd,h.strafe);let f=F.walkAccel*(r?.95:F.airControl);n.hasMop&&(f*=F.mopCarrySlow),n.carry>=0&&(f*=.8),n.vel.x+=(Math.sin(n.facing)*h.fwd-Math.cos(n.facing)*h.strafe)/u*f*t,n.vel.z+=(Math.cos(n.facing)*h.fwd+Math.sin(n.facing)*h.strafe)/u*f*t,r&&(n.walkPhase+=t*11)}}const o=r?n.knock>0?F.slideDampDown:F.walkDamp:.25;n.vel.x-=n.vel.x*Math.min(1,o*t),n.vel.z-=n.vel.z*Math.min(1,o*t),n.pos.x+=n.vel.x*t,n.pos.z+=n.vel.z*t;for(const h of hc){const u=n.pos.x-h.x,f=n.pos.z-h.z,d=Math.hypot(u,f);d<h.r&&d>0&&(n.pos.x=h.x+u/d*h.r,n.pos.z=h.z+f/d*h.r,n.vel.x*=.4,n.vel.z*=.4)}const a=Jo(n.pos.x,n.pos.z);if(a===null&&vT(n,r,s+n.jumpY))return;const c=Math.hypot(n.vel.x,n.vel.z)>.4;n.animMoving=c&&n.knock<=0;let l=(a??Vi)+n.jumpY;c&&r&&n.knock<=0&&(l+=Math.abs(Math.sin(n.walkPhase))*.09),n.mesh.position.set(n.pos.x,l,n.pos.z),n.mesh.rotation.set(0,n.facing,0)}else{(n.jumpY>1e-4||n.vy>0)&&(n.vy-=F.gravity*t,n.jumpY=Math.max(0,n.jumpY+n.vy*t),n.jumpY<=1e-4&&n.vy<0&&(n.vy=0,In(n.pos.x,n.pos.z,!0)));const s=n.jumpY>.05;let r=!1,o=0,a=0;if(n.knock<=0&&!s){const u=zi(n);if(u.fwd||u.strafe){const f=Math.hypot(u.fwd,u.strafe);o=(Math.sin(n.facing)*u.fwd-Math.cos(n.facing)*u.strafe)/f,a=(Math.cos(n.facing)*u.fwd+Math.sin(n.facing)*u.strafe)/f;const d=.75+.45*Math.max(0,Math.sin(n.walkPhase*1.7));n.vel.x+=o*F.swimSpeed*4*d*t,n.vel.z+=a*F.swimSpeed*4*d*t,n.walkPhase+=t*7,r=!0}}n.animMoving=r;const c=s?.4:3;if(n.vel.x-=n.vel.x*Math.min(1,c*t),n.vel.z-=n.vel.z*Math.min(1,c*t),n.pos.x+=n.vel.x*t,n.pos.z+=n.vel.z*t,n.knock<=0&&r){const u=n.pos.x+o*2.8,f=n.pos.z+a*2.8;if(Jo(u,f)!==null){n.mode="shore",n.pos.x=u,n.pos.z=f,n.jumpY=0,n.vy=0,n.vel.x=0,n.vel.z=0,In(n.pos.x,n.pos.z,!1);return}}for(const u of js){const f=n.pos.x-u.x,d=n.pos.z-u.z,g=Math.hypot(f,d),_=u.r-1.2;g<_&&g>0&&(n.pos.x=u.x+f/g*_,n.pos.z=u.z+d/g*_)}if(Math.hypot(n.pos.x-P.pos.x,n.pos.z-P.pos.z)>F.swimLeash){yT(n);return}n.rippleT-=t,Math.hypot(n.vel.x,n.vel.z)>.6&&n.rippleT<=0&&(n.rippleT=.22,ui(n.pos.x,n.pos.z,n.facing,.5),Math.random()<.5&&Yi(n.pos.x,n.pos.z,1,1.3,1.5));const l=s?Math.max(.18,va+n.jumpY-F.eyeHeight):.18+Math.sin(i*3+e)*.08;n.mesh.position.set(n.pos.x,l,n.pos.z),n.mesh.rotation.set(0,n.facing,0);const h=tf(n.pos);if(n.knock<=0&&r&&Math.abs(h.x)<ue.hullW/2+.8&&Math.abs(h.z)<ue.hullL/2+.8){const u=P.pos.x-n.pos.x,f=P.pos.z-n.pos.z,d=Math.hypot(u,f)||1;(o*u+a*f)/d>.25&&_T(n)}}}function xa(){P.pos.x=4.8,P.pos.z=-206,P.yaw=0,P.vel.x=0,P.vel.z=0,P.angVel=0,P.rudder=0,P.boomAngle=20*ns,P.heel=0,P.anchored=!0,Oe.runTime=0,Oe.started=!1,Oe.docked=!1,Oe.dockTimer=0,Oe.shake=0,xt.delivered=0,xt.lost=0,xt.batchT=0,document.getElementById("msg").style.display="none",qe.forEach((n,e)=>{di(n),n.mesh.parent!==se&&(_t.remove(n.mesh),se.add(n.mesh)),n.mode="shore",n.knock=0,n.vel.x=0,n.vel.z=0,n.pos.x=e===0?-.8:.8,n.pos.z=-202,n.facing=Math.PI/2,n.pitch=0,n.jumpY=0,n.vy=0,n.carry=-1})}const ST=(()=>{const n=[70,140,200,255],e=new Uint8Array(n.length*4);n.forEach((i,s)=>{e[s*4]=i,e[s*4+1]=i,e[s*4+2]=i,e[s*4+3]=255});const t=new Dm(e,n.length,1,ti);return t.minFilter=tn,t.magFilter=tn,t.needsUpdate=!0,t})(),X0=n=>new JS({color:n,gradientMap:ST}),bT=new _n({color:1314572,side:wn});function xi(n,e=1.07){const t=new I(n.geometry,bT);t.scale.setScalar(e),t.castShadow=!1,t.userData.noShadow=!0,n.add(t)}function wT(n,e,t){const i=new it,s=X0,r={eyes:[],pupils:[],brows:[],arms:[],legs:[],mouth:null,rig:null,torso:null,headBone:null,hatSlot:null},o=new it;i.add(o),r.rig=o;for(const m of[-1,1]){const p=new I(new qs(.105,.26,3,6),s(3811866));p.geometry.translate(0,-.17,0),p.position.set(m*.15,.34,0),o.add(p),r.legs.push(p)}const a=new it;a.position.y=.42,o.add(a),r.torso=a;const c=new I(new qs(.34,.5,4,12),s(n));c.position.y=.18,a.add(c);const l=new I(new Ye(.355,.355,.11,12),s(3811866));l.position.y=.03,a.add(l);for(const m of[-1,1]){const p=new I(new qs(.09,.42,3,8),s(n));p.geometry.translate(0,-.26,0),p.position.set(m*.4,.58,0),p.rotation.z=m*-.18,a.add(p),r.arms.push(p)}const h=new it;h.position.y=.66,a.add(h),r.headBone=h;const u=new I(new pt(.3,14,12),s(15909531));u.position.y=.14,h.add(u);for(const m of[-1,1]){const p=new I(new pt(.128,12,10),s(16777215));p.position.set(m*.13,.22,.245),h.add(p);const v=new I(new pt(.058,10,8),s(1314828));v.position.set(0,0,.075),p.add(v),r.eyes.push(p),r.pupils.push(v);const x=new I(new He(.17,.038,.04),s(4860952));x.position.set(m*.13,.36,.27),x.rotation.z=m*-.28,h.add(x),r.brows.push(x)}const f=new I(new pt(.075,8,6),s(15247483));f.position.set(0,.12,.3),f.scale.z=1.3,h.add(f);const d=new I(new He(.14,.045,.03),s(5909536));d.position.set(0,-.01,.275),h.add(d),r.mouth=d;const g=new it;h.add(g),r.hatSlot=g,g.add(q0(t,e));const _=new I(new He(.15,.1,.05),s(16765514));if(_.position.set(0,.03,.345),a.add(_),t==="bandana"){for(const v of[.05,.2,.35]){const x=new I(new Ye(.348,.348,.075,16,1,!0),s(15921382));x.position.y=v,a.add(x)}const m=new I(new Mi(.115,16),s(1182986));m.position.set(-.13,.22,.305),h.add(m);const p=new I(new He(.045,.52,.04),s(1182986));p.position.set(-.04,.31,.28),p.rotation.z=.62,h.add(p)}else{for(const p of[-1,1]){const v=new I(new He(.15,.52,.06),s(5909532));v.position.set(p*.17,.2,.3),v.rotation.z=p*.1,a.add(v)}const m=new I(new He(.12,.82,.05),s(12728874));m.position.set(0,.2,.31),m.rotation.z=.55,a.add(m)}xi(c,1.07),xi(u,1.07);for(const m of r.arms)xi(m,1.13);for(const m of r.legs)xi(m,1.13);return i.userData.parts=r,i}function q0(n,e=8007728){const t=new it,i=X0;if(n==="bandana"){const s=new I(new pt(.31,12,8),i(e));s.position.y=.24,s.scale.y=.62,xi(s,1.08),t.add(s);const r=new I(new He(.12,.1,.1),i(e));r.position.set(0,.26,-.28),t.add(r);const o=new I(new He(.09,.3,.05),i(e));o.position.set(.06,.1,-.34),o.rotation.z=.4,t.add(o)}else if(n==="straw"){const s=new I(new Ye(.62,.66,.05,12),i(14268522));s.position.y=.3,xi(s,1.05),t.add(s);const r=new I(new pt(.3,12,8),i(14861438));r.position.y=.32,r.scale.y=.55,t.add(r);const o=new I(new Ye(.305,.305,.09,12),i(12597547));o.position.y=.36,t.add(o)}else if(n==="fancy"){const s=new I(new Ye(.32,.46,.26,10),i(2829117));s.position.y=.42,xi(s,1.06),t.add(s);const r=new I(new Ye(.58,.58,.05,10),i(2829117));r.position.y=.31,xi(r,1.05),t.add(r);const o=new I(new qn(.57,.025,6,14),i(16766011));o.position.y=.33,o.rotation.x=Math.PI/2,t.add(o);const a=new I(new en(.06,.42,6),i(15221818));a.position.set(.24,.6,0),a.rotation.z=-.55,t.add(a)}else{const s=new I(new Ye(.3,.42,.22,10),i(e));s.position.y=.4,xi(s,1.06),t.add(s);const r=new I(new Ye(.52,.52,.05,10),i(e));r.position.y=.31,xi(r,1.05),t.add(r);const o=new I(new en(.05,.34,6),i(15786048));o.position.set(.2,.54,0),o.rotation.z=-.5,t.add(o)}return t.traverse(s=>{s.isMesh&&(s.castShadow=!0)}),t}const fo=new Map;function Y0(n,e){n.hat=e;const t=n.mesh.userData.parts;if(!t)return;const s=fo.get(n)?.mesh??t.hatSlot.children[0];s&&(s.parent?.remove(s),s.traverse(r=>{r.isMesh&&r.geometry.dispose()})),fo.delete(n),t.hatSlot.add(q0(e,n.name==="P1"?8007728:4478242))}function TT(n){const e=n.mesh.userData.parts;if(!e||fo.has(n))return;const t=e.hatSlot.children[0];if(!t)return;e.hatSlot.remove(t),(n.mode==="deck"?_t:se).add(t),fo.set(n,{state:1,x:n.pos.x+(Math.random()-.5)*.3,z:n.pos.z+(Math.random()-.5)*.3,h:1.6,vx:n.vel.x*.4+(Math.random()-.5)*2.5,vz:n.vel.z*.4+(Math.random()-.5)*2.5,vy:2.2+Math.random()*1.5,mesh:t})}function ET(n,e){for(const[t,i]of fo){const s=i.mesh.parent===_t;if(i.state===1){if(i.vy-=9*n,i.x+=i.vx*n,i.z+=i.vz*n,i.h=Math.max(0,i.h+i.vy*n),i.h<=0)if(s&&(Math.abs(i.x)>ue.deckX+.3||Math.abs(i.z)>ue.deckZ+.3)){const o=vn(i);_t.remove(i.mesh),se.add(i.mesh),i.x=o.x,i.z=o.z,i.state=3}else!s&&!aa(i.x,i.z)?i.state=3:i.state=2;i.mesh.position.set(i.x,(s?Xe:Vi)+i.h+.05,i.z),i.mesh.rotation.x+=n*6}else i.state===2?(i.mesh.position.set(i.x,(s?Xe:Vi)+.04,i.z),i.mesh.rotation.set(.4,i.mesh.rotation.y,.15)):(i.mesh.position.set(i.x,.1+Math.sin(e*1.5+i.x)*.06,i.z),i.mesh.rotation.set(.1,i.mesh.rotation.y+n*.3,0));let r=1e9;if(s&&t.mode==="deck")r=Math.hypot(t.pos.x-i.x,t.pos.z-i.z);else if(!s&&t.mode!=="deck")r=Math.hypot(t.pos.x-i.x,t.pos.z-i.z);else if(!s&&t.mode==="deck"){const o=vn(t.pos);r=Math.hypot(o.x-i.x,o.z-i.z)}if(i.state!==1&&r<.95){i.mesh.parent?.remove(i.mesh);const o=t.mesh.userData.parts;i.mesh.position.set(0,0,0),i.mesh.rotation.set(0,0,0),o.hatSlot.add(i.mesh),fo.delete(t)}}}const ci=()=>({a:0,v:0});function AT(){return{torsoX:ci(),torsoZ:ci(),headX:ci(),headZ:ci(),armLX:ci(),armLZ:ci(),armRX:ci(),armRZ:ci(),legL:ci(),legR:ci(),rigY:ci(),spin:0,spinV:0,wasKnocked:!1,flopDir:1,flopRoll:0}}function li(n,e,t,i,s){return n.v+=(t*(e-n.a)-i*n.v)*s,n.a+=n.v*s,n.a}const ph=new R,Lo=new R;function j0(n,e,t){const i=n.mesh.userData.parts;if(!i||!i.rig)return;const s=n.rag??=AT(),r=Math.min(1,12*e),o=n.animMoving,a=n.knock>0,c=n.grabbedBy>=0,l=n.mode==="deck"&&n.jumpY>.04,h=a&&l;if(a&&!s.wasKnocked){const k=Xt(n.facing),W=n.vel.x*k.x+n.vel.z*k.z,Q=n.vel.x*k.z-n.vel.z*k.x;s.flopDir=Math.abs(W)>.6?W>0?1:-1:Math.random()<.5?1:-1,s.flopRoll=(Math.random()-.5)*1.1,s.torsoX.v+=s.flopDir*(2.5+Math.abs(W)*.5)+(Math.random()-.5)*2,s.torsoZ.v+=je(-Q*.5,-3,3)+(Math.random()-.5)*3,s.headX.v+=(Math.random()-.5)*8,s.headZ.v+=(Math.random()-.5)*8,s.armLX.v+=(Math.random()-.5)*14,s.armRX.v+=(Math.random()-.5)*14,s.armLZ.v+=(Math.random()-.5)*10,s.armRZ.v+=(Math.random()-.5)*10,s.legL.v+=(Math.random()-.5)*12,s.legR.v+=(Math.random()-.5)*12,n.mode!=="water"&&TT(n)}s.wasKnocked=a;let u=90,f=13,d=0,g=0,_=0,m=0,p=0,v=0,x=.18,S=0,C=-.18,w=0,A=0;if(n.mode==="water")u=a?18:40,f=a?3.5:7,d=1.18,_=-.55,p=-.25,v=-2.5+Math.sin(n.walkPhase*1.7)*.95,S=-2.5+Math.sin(n.walkPhase*1.7+Math.PI)*.95,x=.35,C=-.35,w=Math.sin(t*9)*.5,A=Math.sin(t*9+Math.PI)*.5;else if(c)u=13,f=3,d=.55,_=.35,m=Math.sin(t*1.6)*.45,v=-.5+Math.sin(t*2.1)*.25,S=-.5+Math.sin(t*2.1+1.3)*.25,x=.55,C=-.55,w=.45+Math.sin(t*2.4)*.3,A=.45+Math.sin(t*2.4+Math.PI)*.3;else if(a)u=h?16:26,f=h?2.6:4,d=s.flopDir*1.45,g=s.flopRoll,_=-s.flopDir*.5,m=Math.sin(t*3.1)*.2,p=h?0:-.3,v=-2.2+Math.sin(t*7)*.3,S=-2.4+Math.sin(t*7+2)*.3,x=1,C=-1,w=.85+Math.sin(t*5)*.15,A=-.7+Math.sin(t*5+1)*.15;else if(n.station)d=.06,v=-1.15,S=-1.15,x=.08,C=-.08,w=.12,A=-.12;else if(n.scrubT>0)u=60,f=10,d=.38,_=.25,v=-.7+Math.sin(t*16)*.5,S=-.7+Math.sin(t*16+Math.PI)*.5,w=-.15,A=.15;else{const k=Xt(n.facing),W=n.vel.x*k.x+n.vel.z*k.z,Q=n.vel.x*k.z-n.vel.z*k.x;d=je(W*.055,-.3,.3)+Math.sin(t*1.8)*.02,g=je(Q*.05,-.25,.25),_=-d*.45,m=-g*.45,o&&(v=Math.sin(n.walkPhase)*.85,S=Math.sin(n.walkPhase+Math.PI)*.85,w=Math.sin(n.walkPhase+Math.PI)*.6,A=Math.sin(n.walkPhase)*.6),n.hasMop&&(S=-.55,C=-.32),n.carry>=0&&(v=-1.25,S=-1.25,x=.4,C=-.4,d-=.1)}i.torso.rotation.x=je(li(s.torsoX,d,u,f,e),-1.8,1.8),i.torso.rotation.z=je(li(s.torsoZ,g,u,f,e),-1.6,1.6),i.headBone.rotation.x=je(li(s.headX,_,u*.8,f*.8,e),-1.1,1.1),i.headBone.rotation.z=je(li(s.headZ,m,u*.8,f*.8,e),-1.1,1.1),i.arms[0].rotation.x=li(s.armLX,v,u,f,e),i.arms[0].rotation.z=li(s.armLZ,x,u,f,e),i.arms[1].rotation.x=li(s.armRX,S,u,f,e),i.arms[1].rotation.z=li(s.armRZ,C,u,f,e),i.legs[0].rotation.x=li(s.legL,w,u,f,e),i.legs[1].rotation.x=li(s.legR,A,u,f,e),i.rig.position.y=li(s.rigY,p,55,9,e),h?(s.spin+=s.spinV*e,s.spinV*=Math.exp(-.4*e)):(s.spin=bt(s.spin),s.spinV+=(-30*s.spin-7*s.spinV)*e,s.spin+=s.spinV*e),i.rig.rotation.x=s.spin;const L=n.eye??={px:0,py:0,vx:0,vy:0,pvx:0,pvz:0,blink:2+Math.random()*3,blinkT:0};let M=Math.sin(t*.7+n.pos.x)*.012,T=Math.cos(t*.5+n.pos.z)*.008;const B=qe.find(k=>k!==n&&zn(k)&&k.mesh.visible);if(B){ph.set(0,1.3,0),B.mesh.localToWorld(ph),Lo.copy(ph),n.mesh.worldToLocal(Lo);const k=Math.atan2(Lo.x,Lo.z);M=je(Math.sin(k)*.07,-.042,.042),T=je((Lo.y-1.35)*.012,-.03,.03)}const G=je((n.vel.x-L.pvx)/Math.max(e,1e-4),-25,25),K=je((n.vel.z-L.pvz)/Math.max(e,1e-4),-25,25);L.pvx=n.vel.x,L.pvz=n.vel.z,L.vx+=(-G*.004+(M-L.px)*90-L.vx*8)*e,L.vy+=(-K*.002+(T-L.py)*90-L.vy*8)*e,L.px=je(L.px+L.vx*e,-.042,.042),L.py=je(L.py+L.vy*e,-.035,.035),L.blink-=e,L.blink<=0&&(L.blink=2.2+Math.random()*3.5,L.blinkT=.13),L.blinkT>0&&(L.blinkT-=e);const D=a||c||n.mode==="water";for(let k=0;k<2;k++){i.pupils[k].position.set(L.px,L.py,.075);const W=D?1.35:1;i.eyes[k].scale.x=Ut(i.eyes[k].scale.x,W,r),i.eyes[k].scale.z=Ut(i.eyes[k].scale.z,W,r),i.eyes[k].scale.y=L.blinkT>0?.12:Ut(i.eyes[k].scale.y,W,r),i.brows[k].position.y=Ut(i.brows[k].position.y,D?.39:.35,r)}i.mouth.scale.x=Ut(i.mouth.scale.x,D?.55:1,r),i.mouth.scale.y=Ut(i.mouth.scale.y,D?3.2:1,r)}const CT=n=>n.kind==="hat"?"hats":n.kind==="mop"?"mop":"boat",RT={boat:"⚓ THE SHIPWRIGHT",hats:"🎩 THE OUTFITTER",mop:"🧹 THE DECKHAND"},sf=[{id:"skiff",name:"The Skiff",desc:"small, twitchy, tips like a coin — 4 crates, quick runs",price:60,kind:"ship",key:"skiff"},{id:"galleon",name:"The Galleon",desc:"huge, stately, turns next week — 14 crates of walking liability",price:450,kind:"ship",key:"galleon"},{id:"bigDeck",name:"Bigger cargo deck",desc:"+4 crates per shipment. More money, more deck to lose it on.",price:200,kind:"upgrade",key:"bigDeck"},{id:"chartNorth",name:"Northern chart",desc:"unlocks the North Light route — 32g a crate, long haul",price:120,kind:"upgrade",key:"chartNorth"},{id:"cannon",name:"The cannon",desc:"aim, FIRE, regret. Good for salutes and seagulls. Seagulls remember.",price:160,kind:"upgrade",key:"cannon"},{id:"barge",name:"Cargo barge",desc:"+6 crates on a trailer that steers itself and CAN capsize",price:320,kind:"upgrade",key:"barge"},{id:"hatStraw",name:"Straw hat",desc:"beach mode. Flies off when you get bonked.",price:30,kind:"hat",key:"hatStraw",style:"straw"},{id:"hatFancy",name:"Admiral tricorn",desc:"gold trim. The gulls aim for it.",price:45,kind:"hat",key:"hatFancy",style:"fancy"},{id:"mopQuick",name:"Quick mop",desc:"scrubs the gull-mess off the deck noticeably faster",price:40,kind:"mop",key:"mopQuick"},{id:"mopLong",name:"Long mop",desc:"longer handle — scrub and bonk your matey from farther off",price:40,kind:"mop",key:"mopLong"},{id:"mopGold",name:"Gilded mop",desc:"a solid-gold mop. Cleans no better. Looks magnificent.",price:50,kind:"mop",key:"mopGold"}];function dl(n){const e=sf.find(t=>t.id===n);if(!(!e||!e.key)){if(Ke[e.key]){$e("Already owned.","#dee2e6");return}if(xt.gold<e.price){$e("Not enough gold ("+xt.gold+"/"+e.price+"g)","#ff8787");return}xt.gold-=e.price,Ke[e.key]=!0,tr(),Kc(),$e("Bought: "+e.name+"!","#aef7a2"),n==="cannon"&&ol(ue.scale),n==="barge"&&$e("Hitch the barge at the home mooring (the shipwright).","#ffd95e"),n==="mopGold"&&qu(),vo()}}let ru=null;function PT(n){ru=n}function Sp(n){if(At==="guest"){$e("Only the host can swap the hull.","#dee2e6");return}if(n!=="sloop"&&!Ke[n])return;if(Math.hypot(P.pos.x-ys.x,P.pos.z-ys.z)>26||!P.anchored){$e("Hull swaps happen at the home mooring, anchor down.","#ff8787");return}const e=ki.find(t=>t.id===n);e&&(Jt.ship=n,tr(),oa(e),ru&&ru(n),ho()>0&&(rr(),bs()),$e("Hull swapped: "+e.name+"!","#aef7a2"),vo())}function $0(){if(At==="guest"){$e("Only the host hitches the barge.","#dee2e6");return}if(Ke.barge){if(Math.hypot(P.pos.x-ys.x,P.pos.z-ys.z)>26||!P.anchored){$e("Hitch the barge at the home mooring, anchor down.","#ff8787");return}Jt.barge=!Jt.barge,tr(),Jt.barge?(cl(),$e("Barge hitched! +6 crates, double the steering problems.","#aef7a2")):$e("Barge unhitched.","#dee2e6"),ho()>0&&(rr(),bs()),vo()}}function rf(n,e){const t=sf.find(i=>i.style===e);t&&t.key&&!Ke[t.key]&&e!=="captain"&&e!=="bandana"||(Y0(qe[n],e),Jt.hats[n]=e,tr(),vo())}let Si=!1,Oo=dl,K0=n=>rf(0,n);function LT(n,e){Oo=n,K0=e}const J0=document.getElementById("shopWrap"),bp=document.getElementById("shopList"),wp=J0.querySelector("#shopHead b");let Zo="boat";function ou(n=Zo){Si=!Si,J0.style.display=Si?"flex":"none",Si&&(Zo=n,document.exitPointerLock?.(),vo())}document.getElementById("shopClose").addEventListener("click",()=>{Si&&ou()});function vo(){if(!Si)return;wp&&(wp.textContent=RT[Zo]),document.getElementById("shopGold").textContent=xt.gold+"g",bp.innerHTML="";const n=At==="guest"?1:0,e=[];for(const t of sf){if(CT(t)!==Zo)continue;const i=t.key?Ke[t.key]:!1;t.kind==="hat"?e.push({name:t.name,desc:t.desc,right:i?Jt.hats[n]===t.style?"WORN":"Wear":t.price+"g",cb:i?()=>K0(t.style):()=>Oo(t.id)}):t.kind==="ship"?e.push({name:t.name,desc:t.desc,right:i?Jt.ship===t.id?"IN USE":"Use":t.price+"g",cb:i?()=>Sp(t.id):()=>Oo(t.id)}):t.id==="barge"?e.push({name:t.name,desc:t.desc,right:i?Jt.barge?"Unhitch":"Hitch":t.price+"g",cb:i?()=>$0():()=>Oo(t.id)}):e.push({name:t.name,desc:t.desc,right:i?"OWNED":t.price+"g",cb:i?void 0:()=>Oo(t.id)})}Zo==="boat"&&e.push({name:"Back to the sloop",desc:"the trusty default",right:Jt.ship==="sloop"?"IN USE":"Use",cb:()=>Sp("sloop")});for(const t of e){const i=document.createElement("div");i.className="shoprow";const s=document.createElement("div");s.innerHTML="<b>"+t.name+"</b><br><span>"+t.desc+"</span>";const r=document.createElement("button");r.textContent=t.right,r.disabled=!t.cb||t.right==="WORN"||t.right==="IN USE"||t.right==="OWNED",t.cb&&r.addEventListener("click",t.cb),i.append(s,r),bp.append(i)}}let bi=!1,au=(n,e)=>e==="abandon"?af(n):of(n);function DT(n){au=n}function of(n){const e=jn[n];if(!e)return;if(e.locked?.()){$e("🔒 "+(e.lockHint??"this job is locked"),"#ff8787");return}if(Ht.includes(n)){IT(n);return}if(Ht.length>=qp){$e("Your hands are full — 3 jobs is the limit.","#ff8787");return}const t=Ht.length===0;Ht.push(n),Kc(),t?(da(n),bs()):$e("Job accepted: "+e.name+" — switch to it whenever you like.","#ffd95e"),xo()}function IT(n){const e=Ht.indexOf(n);if(!(e<0)){if(e===0){$e(jn[n].name+" is already your active run.","#dee2e6");return}Ht.splice(e,1),Ht.unshift(n),da(n),rr(),bs(),$e("Now running "+jn[n].name+" — its crates are on the home pier.","#ffd95e"),xo()}}function af(n){const e=Ht.indexOf(n);if(e<0)return;const t=e===0;Ht.splice(e,1),t&&(rr(),Ht.length&&(da(Ht[0]),bs())),$e("Job abandoned.","#dee2e6"),xo()}function zT(){Ht.length&&(Ht.shift(),Ht.length&&(da(Ht[0]),bs()),xo())}const UT=document.getElementById("questWrap"),Tp=document.getElementById("questList");function cu(){bi=!bi,UT.style.display=bi?"flex":"none",bi&&(document.exitPointerLock?.(),xo())}document.getElementById("questClose").addEventListener("click",()=>{bi&&cu()});const kT=["N","NE","E","SE","S","SW","W","NW"];function NT(n,e){const t=(Math.atan2(n,-e)*180/Math.PI+360)%360;return kT[Math.round(t/45)%8]}function OT(n){return n<=10?{label:"EASY",col:"#51cf66"}:n<=16?{label:"FAIR",col:"#ffd43b"}:n<=24?{label:"HARD",col:"#ff922b"}:{label:"EPIC",col:"#ff6b6b"}}function xo(){if(!bi)return;Tp.innerHTML="";const n=Ht.length>=qp;jn.forEach((e,t)=>{const i=e.del.x-ys.x,s=e.del.z-ys.z,r=Math.hypot(i,s)|0,o=OT(e.pay),a=!!e.locked?.(),c=Ht.indexOf(t),l=c===0,h=c>0,u=document.createElement("div");u.className="questrow"+(l?" active":"")+(h?" queued":"")+(a?" locked":"");const f=l?'<span class="qslot">● RUNNING</span>':h?'<span class="qslot q">#'+(c+1)+" in your log</span>":"";u.innerHTML='<div class="qdir" style="transform:rotate('+Math.atan2(i,-s).toFixed(3)+'rad)">➤</div><div class="qinfo"><div class="qname">'+e.name+' <span class="qdiff" style="background:'+o.col+'">'+o.label+"</span>"+f+'</div><div class="qdesc">Carry crates <b>'+r+"m "+NT(i,s)+"</b> to the green flag · "+e.desc+(a&&e.lockHint?' · <span class="qlock">🔒 '+e.lockHint+"</span>":"")+'</div></div><div class="qpay"><b>'+e.pay+'g</b><small> /crate</small><div class="qload">≈ '+e.pay*S0()+"g a load</div></div>";const d=document.createElement("div");d.className="qbtns";const g=document.createElement("button");if(g.textContent=a?"🔒 locked":l?"RUNNING":h?"Run now":n?"Log full":"Accept",g.disabled=a||l||n&&c<0,g.disabled||g.addEventListener("click",()=>au(t,"take")),d.append(g),c>=0){const _=document.createElement("button");_.className="qdrop",_.textContent="Abandon",_.addEventListener("click",()=>au(t,"abandon")),d.append(_)}u.append(d),Tp.append(u)})}function FT(n,e){const t=Math.sin(e*.1)*.6+Math.sin(e*.037+2.1)*.4,i=lt.weatherId===2?2.2:1;dt.angle=bt(dt.angle+t*F.windWander*i*ns*n),dt.strength=F.windStrength*lt.windMul*lt.gustMul*(1+F.windStrengthWobble*Math.sin(e*.13+1))}function BT(n){const e=Xt(P.yaw),t=On(P.yaw),i=Xt(dt.angle),s=bt(dt.angle-P.yaw),r=180-Math.abs(s)*f_;P.noGo=r<F.noGoHalfAngle;const o=Fp(F.noGoHalfAngle-6,F.noGoHalfAngle+9,r),a=Math.sign(s||1)*(Math.PI-Math.abs(s))/2,c=Math.abs(bt(P.boomAngle-a)),l=Math.max(0,Math.cos(c*1.5));P.sailForce=hn.sailPower*dt.strength*l*o,qe.some(C=>zn(C)&&C.mode==="deck")||(P.sailForce=0),P.anchored&&(P.sailForce=0),P.luffing=P.sailForce<.35;const u=ac(P.vel,e),f=ac(P.vel,t),d=P.sailForce-hn.fwdDragQuad*u*Math.abs(u)-F.fwdDragLin*u-hn.turnDrag*Math.abs(P.angVel)*u,g=ac(i,t),_=-F.latResist*f+F.leeway*dt.strength*g*.1,m=F.windageDrift*dt.strength,p=e.x*d+t.x*_+i.x*m,v=e.z*d+t.z*_+i.z*m;P.lastAccel.x=p,P.lastAccel.z=v,P.vel.x+=p*n,P.vel.z+=v*n;const x=P.rudder*hn.rudderAuthority*u-hn.yawDamp*P.angVel;if(P.lastAngAccel=x,P.angVel+=x*n,P.yaw=bt(P.yaw+P.angVel*n),P.anchored){const C=Math.exp(-2.8*n);P.vel.x*=C,P.vel.z*=C,P.angVel*=Math.exp(-2.2*n)}P.pos.x+=P.vel.x*n,P.pos.z+=P.vel.z*n;const S=je(Math.sign(s||1)*hn.maxHeel*(dt.strength/F.windStrength)*l*o*Math.abs(Math.sin(s))+P.angVel*u*F.turnHeel*.1,-.4,.4);P.heel=Ut(P.heel,S,je(F.heelLerp*n,0,1)),GT()}function GT(){const n=js.slice();for(const t of e0){const i=t.b.x-t.a.x,s=t.b.z-t.a.z,r=Math.hypot(i,s),o=Math.ceil(r/3);for(let a=0;a<=o;a++)n.push({x:t.a.x+i*(a/o),z:t.a.z+s*(a/o),r:4})}const e=(ue.scale-1)*1.6;for(const t of n){const i=P.pos.x-t.x,s=P.pos.z-t.z,r=Math.hypot(i,s),o=t.r+e;if(r>=o||r===0)continue;const a=i/r,c=s/r,l=P.vel.x*a+P.vel.z*c;if(P.pos.x=t.x+a*o,P.pos.z=t.z+c*o,l<0){const h=-l;if(P.vel.x-=(1+F.bounceRestitution)*l*a,P.vel.z-=(1+F.bounceRestitution)*l*c,P.angVel+=(Math.random()-.5)*h*.3,h>F.hardHitSpeed){Oe.shake=Math.min(1.2,h*.16),$e("CRASH!","#ff8787"),w0();const u=On(P.yaw),f=Xt(P.yaw),d=a*u.x+c*u.z,g=a*f.x+c*f.z;for(const _ of qe)_.mode!=="deck"||!zn(_)||(di(_),_.knock=Math.max(_.knock,1.5),_.vel.x+=d*F.bounceKick*(.7+Math.random()*.6),_.vel.z+=g*F.bounceKick*(.7+Math.random()*.6))}}}}const mh=new R,Do=new Xi,mi=new Xi,is=new Xi,zr=new Xi,gh=new R(0,1,0),dc=new R(0,0,1),_h=new R(1,0,0);function HT(n,e,t){if(n.mode==="deck"){let i=Xe+F.eyeHeight+n.jumpY;n.knock>0?i=Xe+.5:n.jumpY<=1e-4&&Math.hypot(n.vel.x,n.vel.z)>.4&&(i+=Math.abs(Math.sin(n.walkPhase))*F.headBob),mh.set(n.pos.x,i,n.pos.z),ra.updateMatrixWorld(),_t.localToWorld(mh),e.position.copy(mh),_t.getWorldQuaternion(Do),mi.setFromAxisAngle(gh,n.facing+Math.PI),Do.multiply(mi),zr.setFromAxisAngle(_h,n.pitch),Do.multiply(zr),n.knock>0&&(is.setFromAxisAngle(dc,.55),Do.multiply(is)),e.quaternion.copy(Do)}else if(n.mode==="shore"){const i=Jo(n.pos.x,n.pos.z)??Vi;let s=i+F.eyeHeight+n.jumpY;n.knock>0?s=i+.5:n.jumpY<=1e-4&&Math.hypot(n.vel.x,n.vel.z)>.4&&(s+=Math.abs(Math.sin(n.walkPhase))*F.headBob),e.position.set(n.pos.x,s,n.pos.z),mi.setFromAxisAngle(gh,n.facing+Math.PI),zr.setFromAxisAngle(_h,n.pitch),mi.multiply(zr),n.knock>0&&(is.setFromAxisAngle(dc,.55),mi.multiply(is)),e.quaternion.copy(mi)}else{const s=n.jumpY>.05?0:Math.sin(t*2.6+n.pos.x)*.12;e.position.set(n.pos.x,va+n.jumpY+s,n.pos.z),mi.setFromAxisAngle(gh,n.facing+Math.PI),zr.setFromAxisAngle(_h,n.pitch),mi.multiply(zr),n.knock>0&&(is.setFromAxisAngle(dc,.5),mi.multiply(is)),e.quaternion.copy(mi)}}const nc=new R,vh=new R;let xh=0;function VT(n,e,t){nc.set(0,5,-236);const i=Math.sin(e*.045)*.6,s=42+Math.sin(e*.03)*5;if(n.position.set(Math.sin(i)*s,4.4+Math.sin(e*.45)*.25,-236+Math.cos(i)*s),n.lookAt(nc),xh-=t,xh<=0){xh=.28,vh.set(nc.x-n.position.x,0,nc.z-n.position.z).normalize();const r=n.position.x+vh.x*8+(Math.random()-.5)*9,o=n.position.z+vh.z*8+(Math.random()-.5)*9;Yi(r,o,5,3,4.4)}}function WT(n,e){if(Oe.inMenu){VT(Et,e,n);return}HT(Yn(),Et,e),Oe.shake>.001&&(Et.position.x+=(Math.random()-.5)*Oe.shake*.7,Et.position.y+=(Math.random()-.5)*Oe.shake*.5,Et.position.z+=(Math.random()-.5)*Oe.shake*.7,is.setFromAxisAngle(dc,(Math.random()-.5)*Oe.shake*.22),Et.quaternion.multiply(is),Oe.shake*=Math.exp(-2.6*n))}const cf=[{name:"Sunny skies",windMul:1,swell:1,dark:0},{name:"Overcast",windMul:1.22,swell:1.32,dark:.45},{name:"SQUALL!",windMul:1.6,swell:1.75,dark:.85}];let yh=40+Math.random()*50,Mh=1,Sh=1,Io=0;function XT(n){if(At!=="guest"&&(yh-=n,yh<=0)){yh=45+Math.random()*60;const e=Math.random();let t=e<.45?0:e<.78?1:2;t===lt.weatherId&&(t=(t+1)%3),lt.weatherId=t,lt.weatherLerp=0,$e("Weather: "+cf[t].name,t===2?"#ff8787":"#a5d8ff")}}const Qo=new it;se.add(Qo);const qT=180;{const n=new He(.02,1.7,.02),e=new _n({color:13624046,transparent:!0,opacity:.5,depthWrite:!1});for(let t=0;t<qT;t++){const i=new I(n,e);i.position.set((Math.random()-.5)*44,Math.random()*26,(Math.random()-.5)*44),i.rotation.z=.28,i.userData.noShadow=!0,Qo.add(i)}}let Ur=0,bh=8;const Z0=new Im({color:14478079,transparent:!0,opacity:0,fog:!1}),lu=12,ea=new jt;ea.setAttribute("position",new un(new Float32Array(lu*3),3));const er=new US(ea,Z0);er.userData.noShadow=!0;er.frustumCulled=!1;er.visible=!1;se.add(er);function YT(){const n=Math.random()*Math.PI*2,e=360+Math.random()*180,t=Et.position.x+Math.sin(n)*e,i=Et.position.z+Math.cos(n)*e,s=210+Math.random()*70,r=ea.attributes.position.array;for(let o=0;o<lu;o++){const a=o/(lu-1);r[o*3]=t+(Math.random()-.5)*26*(1-a),r[o*3+1]=s*(1-a),r[o*3+2]=i+(Math.random()-.5)*26*(1-a)}ea.attributes.position.needsUpdate=!0,ea.computeBoundingSphere(),er.visible=!0}function jT(n){const e=cf[lt.weatherId];lt.weatherLerp=Math.min(1,lt.weatherLerp+n/6);const t=1-Math.exp(-.6*n);Mh=Ut(Mh,e.windMul,t),Sh=Ut(Sh,e.swell,t),Io=Ut(Io,e.dark,t),lt.windMul=Mh,lt.darkness=Io;const i=Math.hypot(P.pos.x-Mt.x,P.pos.z-Mt.z),s=1+.45*Fp(95,180,i);lt.swell=Sh*s*(Wi===2?1.5:1),Rb(lt.swell);const r=Io>.62;if(Qo.visible=r,r){Qo.position.set(Et.position.x,0,Et.position.z);for(const o of Qo.children)o.position.y-=28*n,o.position.x+=6*n,o.position.y<0&&(o.position.y=22+Math.random()*6,o.position.x=(Math.random()-.5)*44,o.position.z=(Math.random()-.5)*44)}lt.weatherId===2&&Io>.6&&(bh-=n,bh<=0&&(bh=4+Math.random()*9,Ur=1,YT(),setTimeout(()=>T_(),350+Math.random()*1400))),Ur*=Math.exp(-7*n),Zt.intensity+=Ur*2.2,nn.toneMappingExposure+=Ur*1.4,Z0.opacity=Math.min(1,Ur*1.6),er.visible&&Ur<.04&&(er.visible=!1)}const $T=480,kn={t:.3,dir:new R(.4,.8,.2).normalize()},_e=n=>new De(n),ic=[{t:0,sunC:_e(2766160),sunI:0,zen:_e(660528),mid:_e(1451330),hor:_e(2569805),hemiS:_e(3029589),hemiG:_e(1844275),hemiI:.32,deep:_e(333866),shal:_e(1192e3),sss:_e(1919573),expo:.98,stars:1},{t:.22,sunC:_e(3820136),sunI:.05,zen:_e(1452367),mid:_e(4678028),hor:_e(10127008),hemiS:_e(6978464),hemiG:_e(6969968),hemiI:.45,deep:_e(666692),shal:_e(1857638),sss:_e(3115648),expo:1,stars:.8},{t:.27,sunC:_e(16752234),sunI:.55,zen:_e(3497878),mid:_e(9414344),hor:_e(15771768),hemiS:_e(10467030),hemiG:_e(14067838),hemiI:.72,deep:_e(932434),shal:_e(2783878),sss:_e(4636832),expo:1.06,stars:.22},{t:.36,sunC:_e(16770992),sunI:1.5,zen:_e(3114710),mid:_e(9358062),hor:_e(15918018),hemiS:_e(12574975),hemiG:_e(14727304),hemiI:1,deep:_e(671580),shal:_e(1937290),sss:_e(4645813),expo:1.18,stars:0},{t:.64,sunC:_e(16770992),sunI:1.5,zen:_e(3114710),mid:_e(9358062),hor:_e(15918018),hemiS:_e(12574975),hemiG:_e(14727304),hemiI:1,deep:_e(671580),shal:_e(1937290),sss:_e(4645813),expo:1.18,stars:0},{t:.73,sunC:_e(16756832),sunI:1.2,zen:_e(5929147),mid:_e(15119754),hor:_e(16766106),hemiS:_e(13482192),hemiG:_e(16763038),hemiI:.85,deep:_e(1194581),shal:_e(3840650),sss:_e(8841392),expo:1.16,stars:0},{t:.8,sunC:_e(16738874),sunI:.55,zen:_e(3820152),mid:_e(12937862),hor:_e(16743002),hemiS:_e(9075354),hemiG:_e(13666922),hemiI:.6,deep:_e(928836),shal:_e(2779762),sss:_e(5944468),expo:1.1,stars:.18},{t:.88,sunC:_e(4608110),sunI:.08,zen:_e(1582920),mid:_e(3030883),hor:_e(5918566),hemiS:_e(4477038),hemiG:_e(3356746),hemiI:.36,deep:_e(532272),shal:_e(1456710),sss:_e(2447954),expo:1.02,stars:.7},{t:1,sunC:_e(2766160),sunI:0,zen:_e(660528),mid:_e(1451330),hor:_e(2569805),hemiS:_e(3029589),hemiG:_e(1844275),hemiI:.32,deep:_e(333866),shal:_e(1192e3),sss:_e(1919573),expo:.98,stars:1}],wt={sunC:new De,sunI:1,zen:new De,mid:new De,hor:new De,hemiS:new De,hemiG:new De,hemiI:1,deep:new De,shal:new De,sss:new De,expo:1.18,stars:0};function KT(n){let e=0;for(;e<ic.length-2&&n>=ic[e+1].t;)e++;const t=ic[e],i=ic[e+1],s=je((n-t.t)/(i.t-t.t||1),0,1);wt.sunC.lerpColors(t.sunC,i.sunC,s),wt.sunI=Ut(t.sunI,i.sunI,s),wt.zen.lerpColors(t.zen,i.zen,s),wt.mid.lerpColors(t.mid,i.mid,s),wt.hor.lerpColors(t.hor,i.hor,s),wt.hemiS.lerpColors(t.hemiS,i.hemiS,s),wt.hemiG.lerpColors(t.hemiG,i.hemiG,s),wt.hemiI=Ut(t.hemiI,i.hemiI,s),wt.deep.lerpColors(t.deep,i.deep,s),wt.shal.lerpColors(t.shal,i.shal,s),wt.sss.lerpColors(t.sss,i.sss,s),wt.expo=Ut(t.expo,i.expo,s),wt.stars=Ut(t.stars,i.stars,s)}const Ep=_e(5595246),JT=_e(8688542),ZT=_e(928568),QT=_e(3827832),eE=_e(5143924),tE=_e(8950432),Qi=go.material.uniforms,wh=(()=>{const e=new Float32Array(1800);for(let r=0;r<600;r++){let o=Math.random()*2-1,a=Math.random(),c=Math.random()*2-1;const l=Math.hypot(o,a,c)||1;o/=l,a/=l,c/=l,e[r*3]=o*850,e[r*3+1]=Math.abs(a)*820+30,e[r*3+2]=c*850}const t=new jt;t.setAttribute("position",new un(e,3));const i=new zm({color:16777215,size:2.4,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,blending:ta,fog:!1}),s=new kS(t,i);return s.userData.noShadow=!0,s.frustumCulled=!1,s.renderOrder=-5,se.add(s),s})(),zo=(()=>{const n=new it,e=new I(new pt(8,18,14),new _n({color:15659775,transparent:!0,opacity:1,depthWrite:!1,fog:!1}));n.add(e);const t=new DS(new Pm({map:Ym(),color:12374271,transparent:!0,opacity:.5,depthWrite:!1,blending:ta,fog:!1}));return t.scale.setScalar(46),n.add(t),n.traverse(i=>{i.userData.noShadow=!0}),n.renderOrder=-4,n.visible=!1,se.add(n),n})();function nE(n){Oe.inMenu||(kn.t=(kn.t+n/$T)%1),KT(kn.t);const e=kn.t*zt,t=Math.sin((kn.t-.25)*zt),i=Math.max(.12,.18+t*.95);kn.dir.set(Math.cos(e)*.85,i,Math.sin(e)*.85).normalize();const s=lt.darkness;Zt.color.copy(wt.sunC).lerp(tE,s*.5),Zt.intensity=wt.sunI*(1-.72*s),lc.color.copy(wt.hemiS),lc.groundColor.copy(wt.hemiG),lc.intensity=wt.hemiI*(1-.4*s),Qi.uZenith.value.copy(wt.zen).lerp(Ep,s),Qi.uMid.value.copy(wt.mid).lerp(Ep,s*.8),Qi.uHorizon.value.copy(wt.hor).lerp(JT,s),Qi.uGlow.value=je(wt.sunI*.7,0,1),Qi.uSun.value.copy(kn.dir),se.fog.color.copy(Qi.uHorizon.value),se.background.copy(Qi.uHorizon.value),Ln.uSky.value.copy(Qi.uHorizon.value),Ln.uDeep.value.copy(wt.deep).lerp(ZT,s),Ln.uShallow.value.copy(wt.shal).lerp(QT,s),Ln.uSss.value.copy(wt.sss).lerp(eE,s),Ln.uSunDir.value.copy(kn.dir),nn.toneMappingExposure=wt.expo*(1-.18*s);const r=wt.stars;if(wh.material.opacity=r*.9,wh.visible=r>.02,wh.position.copy(Et.position),zo.visible=r>.12,zo.visible){zo.position.set(Et.position.x+kn.dir.x*640,60+kn.dir.y*360,Et.position.z+kn.dir.z*640);const a=zo.children[0];a.material.opacity=je(r*1.2,0,1),zo.children[1].material.opacity=r*.5}const o=Math.max(je(1-wt.sunI*1.2,0,1),s*.6);uc.stern&&(uc.stern.visible=o>.05,uc.stern.intensity=o*1.4)}const Q0="sail.taught";let Ap=(()=>{try{return localStorage.getItem(Q0)==="1"}catch{return!1}})();const Cp=new Set;let sc=0,rc=0;function kr(n,e,t="#ffe066"){Cp.has(n)||(Cp.add(n),$e(e,t))}function iE(n){if(Ap){sc=0;return}if(Oe.inMenu){sc=0,rc=0;return}sc+=n;const e=Yn(),t=Math.hypot(P.vel.x,P.vel.z);if(sc>3&&ho()===0&&e.mode==="shore"&&kr("job","Head to the job board on the pier (the green sign) and press E to take a job."),ho()>0&&R0()===0&&e.mode==="shore"&&e.carry<0&&kr("load","Crates are on the pier — press E to lift one, then step aboard to load it."),e.mode==="deck"&&P.anchored&&kr("anchor","Anchor's down — head to the bow and press E to weigh it."),e.station==="helm"&&!P.anchored&&t<.6&&kr("rudder","The rudder only bites once you are moving — trim the sail (E at the mast) to get going."),P.noGo&&!P.anchored?(rc+=n,rc>1.3&&kr("tack","You cannot sail straight into the wind! Steer ~45° off it and zig-zag — that is tacking.","#ffd43b")):rc=0,e.carry>=0&&e.mode==="deck"&&Math.hypot(vt.x-P.pos.x,vt.z-P.pos.z)<45&&kr("deliver","Nearly there — stop the boat, drop anchor, then carry crates onto the green flag.","#aef7a2"),xt.delivered>0){Ap=!0;try{localStorage.setItem(Q0,"1")}catch{}}}const lf={phase:"calm",timer:18+Math.random()*12,current:"gust",gustTarget:1,gustVeer:0,waveDir:1,waveDur:5.5,activeDur:1,log:[]},sE=()=>Math.hypot(P.pos.x-ys.x,P.pos.z-ys.z)<26||Math.hypot(P.pos.x-vt.x,P.pos.z-vt.z)<26;function rE(){const n=Math.random();return n<.4?"gust":n<.7?"swarm":"wave"}function oE(n){if(At==="guest")return;const e=lf;if(lt.gustMul=Ut(lt.gustMul,e.phase==="active"&&e.current==="gust"?e.gustTarget:1,Math.min(1,.9*n)),e.phase==="active"&&e.current==="wave"||(lt.bigWave=Ut(lt.bigWave,0,Math.min(1,3*n))),!(e.phase==="calm"&&(Oe.inMenu||sE()||gw()||lt.weatherId===2))){if(e.timer-=n,e.timer>0){e.phase==="active"&&aE(n);return}switch(e.phase){case"calm":{e.current=rE(),e.phase="warn",e.timer=3.5,e.current==="gust"?($e("Dark water to windward — GUST incoming!","#74c0fc"),jc(1.2)):e.current==="swarm"?($e("A gull swarm darkens the sky…","#dee2e6"),Ho(),setTimeout(()=>Ho(),350),setTimeout(()=>Ho(),800)):$e("A LONG SWELL rolls in — hold on to something!","#74c0fc");break}case"warn":{e.phase="active",e.log.push({ev:e.current,at:Oe.simT}),e.current==="gust"?(e.activeDur=11,e.gustTarget=1.9+Math.random()*.4,e.gustVeer=(Math.random()<.5?-1:1)*(.3+Math.random()*.35)):e.current==="swarm"?(e.activeDur=3,O0(5+Math.floor(Math.random()*4))):(e.activeDur=e.waveDur=5.5,e.waveDir=Math.random()<.5?-1:1),e.timer=e.activeDur;break}case"active":{e.phase="cool",e.timer=8+Math.random()*8;break}case"cool":{e.phase="calm",e.timer=24+Math.random()*18;break}}}}function aE(n){const e=lf;if(e.current==="gust")dt.angle=bt(dt.angle+e.gustVeer/11*n);else if(e.current==="wave"){const t=1-e.timer/e.waveDur;lt.bigWave=Math.sin(t*Math.PI)*e.waveDir}}const cE=document.getElementById("mapWrap"),lE=document.getElementById("bigmap"),pe=lE.getContext("2d");let to=!1;function hE(){to=!to,cE.style.display=to?"flex":"none"}const jr=-230,Fo=230,hu=-350,eg=100,ts=560,Fr=560,fn=n=>(n-jr)/(Fo-jr)*ts,dn=n=>(n-hu)/(eg-hu)*Fr;function tg(){if(!to)return;pe.clearRect(0,0,ts,Fr);const n=pe.createLinearGradient(0,0,0,Fr);n.addColorStop(0,"#15527f"),n.addColorStop(1,"#1d6aa3"),pe.fillStyle=n,pe.fillRect(0,0,ts,Fr),pe.strokeStyle="rgba(255,255,255,.07)",pe.lineWidth=1;for(let t=jr;t<=Fo;t+=50)pe.beginPath(),pe.moveTo(fn(t),0),pe.lineTo(fn(t),Fr),pe.stroke();for(let t=eg;t<=hu;t+=50)pe.beginPath(),pe.moveTo(0,dn(t)),pe.lineTo(ts,dn(t)),pe.stroke();const e=F.islandRadius/(Fo-jr)*ts;pe.fillStyle="#e7d08a",pe.beginPath(),pe.arc(fn(Mt.x),dn(Mt.z),e+7,0,zt),pe.fill(),pe.fillStyle="#57a05a",pe.beginPath(),pe.arc(fn(Mt.x)-6,dn(Mt.z)-5,e*.55,0,zt),pe.fill();for(const t of sl){const i=t.r/(Fo-jr)*ts;pe.fillStyle="#e7d08a",pe.beginPath(),pe.arc(fn(t.x),dn(t.z),i+3,0,zt),pe.fill(),t.palms>0&&(pe.fillStyle="#57a05a",pe.beginPath(),pe.arc(fn(t.x),dn(t.z),i*.5,0,zt),pe.fill())}pe.fillStyle="#8a5a33";for(const t of e0){const i=Math.min(fn(t.a.x),fn(t.b.x)),s=Math.max(fn(t.a.x),fn(t.b.x)),r=Math.min(dn(t.a.z),dn(t.b.z)),o=Math.max(dn(t.a.z),dn(t.b.z));pe.fillRect(i-3,r-3,Math.max(6,s-i+6),Math.max(6,o-r+6))}pe.fillStyle="#cfeefc",pe.font="bold 12px Consolas",pe.textAlign="center",pe.fillText("HOME",fn(ps.x),dn(Jr.z)-8),pe.fillStyle="#69db7c",pe.beginPath(),pe.arc(fn(vt.x),dn(vt.z),7,0,zt),pe.fill(),pe.fillStyle="#aef7a2",pe.fillText("DELIVER · "+jn[Ms].name,fn(vt.x),dn(vt.z)-12),pe.fillStyle="#9aa3ab";for(const t of[{x:-19,z:-62,r:4},{x:23,z:-118,r:5},{x:-10,z:-168,r:3.5},{x:26,z:-205,r:4.5}])pe.beginPath(),pe.arc(fn(t.x),dn(t.z),Math.max(4,t.r*1.2),0,zt),pe.fill();for(const t of qe)!zn(t)||t.mode!=="water"||(pe.strokeStyle="rgba(116,192,252,.4)",pe.setLineDash([4,4]),pe.beginPath(),pe.arc(fn(P.pos.x),dn(P.pos.z),F.swimLeash/(Fo-jr)*ts,0,zt),pe.stroke(),pe.setLineDash([]),pe.fillStyle=t.name==="P1"?"#ff8a7a":"#ffd95e",pe.beginPath(),pe.arc(fn(t.pos.x),dn(t.pos.z),4,0,zt),pe.fill());pe.save(),pe.translate(fn(P.pos.x),dn(P.pos.z)),pe.rotate(Math.atan2(Math.sin(P.yaw),-Math.cos(P.yaw))),pe.fillStyle="#fff",pe.beginPath(),pe.moveTo(0,-9),pe.lineTo(6,7),pe.lineTo(-6,7),pe.closePath(),pe.fill(),pe.restore(),pe.save(),pe.translate(46,46),pe.rotate(Math.atan2(Math.sin(dt.angle),-Math.cos(dt.angle))),pe.strokeStyle="#74c0fc",pe.lineWidth=3,pe.beginPath(),pe.moveTo(0,16),pe.lineTo(0,-10),pe.stroke(),pe.beginPath(),pe.moveTo(0,-16),pe.lineTo(6,-7),pe.lineTo(-6,-7),pe.closePath(),pe.fillStyle="#74c0fc",pe.fill(),pe.restore(),pe.fillStyle="#cfeefc",pe.font="12px Consolas",pe.textAlign="left",pe.fillText("wind "+dt.strength.toFixed(0)+" kn",24,84),pe.fillText(cf[lt.weatherId].name,24,100),pe.textAlign="right",pe.fillText("grid 50 m · M closes",ts-14,Fr-12)}class uE{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return fE(e).buffer}}function fE(n){let e=0;for(const s of n)e+=s.byteLength;const t=new Uint8Array(e);let i=0;for(const s of n){const r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,i),i+=s.byteLength}return t}function ng(n){return new dE(n).unpack()}function ig(n){const e=new pE,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class dE{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,s="",r,o;for(;i<e;)r=t[i],r<160?(o=r,i++):(r^192)<32?(o=(r&31)<<6|t[i+1]&63,i+=2):(r^224)<16?(o=(r&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(r&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(i===0?1:-1)*o}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class pE{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=s=>{if(s<t){const r=this.pack(e[s]);return r instanceof Promise?r.then(()=>i(s+1)):i(s+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),s=e/2**i-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|i+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const s=r=>{if(r<t.length){const o=t[r];if(e.hasOwnProperty(o)){this.pack(o);const a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new uE,this._textEncoder=new TextEncoder}}let sg=!0,rg=!0;function Bo(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function or(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){hf("Unable to polyfill events");return}const s=n.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==e)return r.apply(this,arguments);const l=h=>{const u=t(h);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),r.apply(this,[a,l])};const o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);const l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function mE(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(sg=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function gE(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(rg=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function hf(){if(typeof window=="object"){if(sg)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function uf(n,e){rg&&console.warn(n+" is deprecated, please use "+e+" instead.")}function _E(n){const e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(i)return{browser:"chrome",version:parseInt(i.version,10)}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Bo(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Bo(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Bo(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=Bo(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function Rp(n){return Object.prototype.toString.call(n)==="[object Object]"}function og(n){return Rp(n)?Object.keys(n).reduce(function(e,t){const i=Rp(n[t]),s=i?og(n[t]):n[t],r=i&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):n}function uu(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?uu(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(s=>{uu(n,n.get(s),t)})}))}function Pp(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;const r=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&uu(n,a,s)})}),s}const Lp=hf;function ag(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const h=typeof a[l]=="object"?a[l]:{ideal:a[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);const u=function(f,d){return f?f+d.charAt(0).toUpperCase()+d.slice(1):d==="deviceId"?"sourceId":d};if(h.ideal!==void 0){c.optional=c.optional||[];let f={};typeof h.ideal=="number"?(f[u("min",l)]=h.ideal,c.optional.push(f),f={},f[u("max",l)]=h.ideal,c.optional.push(f)):(f[u("",l)]=h.ideal,c.optional.push(f))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",l)]=h.exact):["min","max"].forEach(f=>{h[f]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(f,l)]=h[f])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const l=function(h,u,f){u in h&&!(f in h)&&(h[f]=h[u],delete h[u])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const h=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete a.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(f=>{f=f.filter(g=>g.kind==="videoinput");let d=f.find(g=>u.some(_=>g.label.toLowerCase().includes(_)));return!d&&f.length&&u.includes("back")&&(d=f[f.length-1]),d&&(a.video.deviceId=l.exact?{exact:d.deviceId}:{ideal:d.deviceId}),a.video=i(a.video),Lp("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return Lp("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){s(a,h=>{t.webkitGetUserMedia(h,c,u=>{l&&l(r(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){const a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,l=>a(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function cg(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function lg(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};const a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};const a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else or(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function hg(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const s=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=s.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],i.apply(this,[r]),r.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function ug(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});const s=n.RTCPeerConnection.prototype.addTrack;s&&(n.RTCPeerConnection.prototype.addTrack=function(){const o=s.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>Pp(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const r=i.apply(this,[]);return r.forEach(o=>o._pc=this),r}),or(n,"track",s=>(s.receiver._pc=s.srcElement,s)),n.RTCRtpReceiver.prototype.getStats=function(){const r=this;return this._pc.getStats().then(o=>Pp(o,r.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const s=arguments[0];let r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function fg(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function dg(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return fg(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const h=t.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(u=>this._reverseStreams[u.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(u=>{if(this.getSenders().find(d=>d.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){const u=new n.MediaStream(h.getTracks());this._streams[h.id]=u,this._reverseStreams[u.id]=h,h=u}i.apply(this,[h])};const s=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},n.RTCPeerConnection.prototype.addTrack=function(h,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(_=>_===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[u.id];if(g)g.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new n.MediaStream([h]);this._streams[u.id]=_,this._reverseStreams[_.id]=u,this.addStream(_)}return this.getSenders().find(_=>_.track===h)};function r(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{const d=l._reverseStreams[f],g=l._streams[d.id];u=u.replace(new RegExp(g.id,"g"),d.id)}),new RTCSessionDescription({type:h.type,sdp:u})}function o(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{const d=l._reverseStreams[f],g=l._streams[d.id];u=u.replace(new RegExp(d.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){const h=n.RTCPeerConnection.prototype[l],u={[l](){const f=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[g=>{const _=r(this,g);f[0].apply(null,[_])},g=>{f[1]&&f[1].apply(null,g)},arguments[2]]):h.apply(this,arguments).then(g=>r(this,g))}};n.RTCPeerConnection.prototype[l]=u[l]});const a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:r(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(d=>{this._streams[d].getTracks().find(_=>h.track===_)&&(f=this._streams[d])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function fu(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]})}function pg(n,e){e.version>102||or(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const Dp=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:pg,shimAddTrackRemoveTrack:dg,shimAddTrackRemoveTrackWithNative:fg,shimGetSendersWithDtmf:hg,shimGetUserMedia:ag,shimMediaStream:cg,shimOnTrack:lg,shimPeerConnection:fu,shimSenderReceiverGetStats:ug},Symbol.toStringTag,{value:"Module"}));function mg(n,e){const t=n&&n.navigator,i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){uf("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},i&&i.prototype.getSettings){const o=i.prototype.getSettings;i.prototype.getSettings=function(){const a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){const o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function vE(n,e){n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||n.navigator.mediaDevices&&(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)})}function gg(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function du(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]}))}function _g(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[r||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,u)=>{c.set(u,Object.assign({},h,{type:t[h.type]||h.type}))})}return c}).then(o,a)}}function vg(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const s=t.apply(this,arguments);return s._pc=this,s}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function xg(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i}),or(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function yg(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){uf("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Mg(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Sg(n){if(!(typeof n=="object"&&n.RTCPeerConnection))return;const e=n.RTCPeerConnection.prototype.addTransceiver;e&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let i=arguments[1]&&arguments[1].sendEncodings;i===void 0&&(i=[]),i=[...i];const s=i.length>0;s&&i.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const r=e.apply(this,arguments);if(s){const{sender:o}=r,a=o.getParameters();(!("encodings"in a)||a.encodings.length===1&&Object.keys(a.encodings[0]).length===0)&&(a.encodings=i,o.sendEncodings=i,this.setParametersPromises.push(o.setParameters(a).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return r})}function bg(n){if(!(typeof n=="object"&&n.RTCRtpSender))return;const e=n.RTCRtpSender.prototype.getParameters;e&&(n.RTCRtpSender.prototype.getParameters=function(){const i=e.apply(this,arguments);return"encodings"in i||(i.encodings=[].concat(this.sendEncodings||[{}])),i})}function wg(n){if(!(typeof n=="object"&&n.RTCPeerConnection))return;const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}function Tg(n){if(!(typeof n=="object"&&n.RTCPeerConnection))return;const e=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}const Ip=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:Sg,shimCreateAnswer:Tg,shimCreateOffer:wg,shimGetDisplayMedia:vE,shimGetParameters:bg,shimGetStats:_g,shimGetUserMedia:mg,shimOnTrack:gg,shimPeerConnection:du,shimRTCDataChannel:Mg,shimReceiverGetStats:xg,shimRemoveStream:yg,shimSenderGetStats:vg},Symbol.toStringTag,{value:"Module"}));function Eg(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(s=>e.call(this,s,i)),i.getVideoTracks().forEach(s=>e.call(this,s,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function Ag(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);const r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(r)>=0)return;i._remoteStreams.push(r);const o=new Event("addstream");o.stream=r,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function Cg(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,h){const u=arguments.length>=2?arguments[2]:arguments[0],f=t.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f},e.createAnswer=function(l,h){const u=arguments.length>=2?arguments[2]:arguments[0],f=i.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f};let a=function(c,l,h){const u=s.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u};e.setLocalDescription=a,a=function(c,l,h){const u=r.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},e.setRemoteDescription=a,a=function(c,l,h){const u=o.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},e.addIceCandidate=a}function Rg(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>i(Pg(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,s,r){e.mediaDevices.getUserMedia(i).then(s,r)}.bind(e))}function Pg(n){return n&&n.video!==void 0?Object.assign({},n,{video:og(n.video)}):n}function Lg(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,s){if(i&&i.iceServers){const r=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(uf("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(i.iceServers[o])}i.iceServers=r}return new e(i,s)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function Dg(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Ig(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function zg(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const zp=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:zg,shimCallbacksAPI:Cg,shimConstraints:Pg,shimCreateOfferLegacy:Ig,shimGetUserMedia:Rg,shimLocalStreamsAPI:Eg,shimRTCIceServerUrls:Lg,shimRemoteStreamsAPI:Ag,shimTrackEventTransceiver:Dg},Symbol.toStringTag,{value:"Module"}));function xE(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ug={exports:{}};(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
`).map(i=>i.trim())},e.splitSections=function(t){return t.split(`
m=`).map((s,r)=>(r>0?"m="+s:s).trim()+`\r
`)},e.getDescription=function(t){const i=e.splitSections(t);return i&&i[0]},e.getMediaSections=function(t){const i=e.splitSections(t);return i.shift(),i},e.matchPrefix=function(t,i){return e.splitLines(t).filter(s=>s.indexOf(i)===0)},e.parseCandidate=function(t){let i;t.indexOf("a=candidate:")===0?i=t.substring(12).split(" "):i=t.substring(10).split(" ");const s={foundation:i[0],component:{1:"rtp",2:"rtcp"}[i[1]]||i[1],protocol:i[2].toLowerCase(),priority:parseInt(i[3],10),ip:i[4],address:i[4],port:parseInt(i[5],10),type:i[7]};for(let r=8;r<i.length;r+=2)switch(i[r]){case"raddr":s.relatedAddress=i[r+1];break;case"rport":s.relatedPort=parseInt(i[r+1],10);break;case"tcptype":s.tcpType=i[r+1];break;case"ufrag":s.ufrag=i[r+1],s.usernameFragment=i[r+1];break;default:s[i[r]]===void 0&&(s[i[r]]=i[r+1]);break}return s},e.writeCandidate=function(t){const i=[];i.push(t.foundation);const s=t.component;s==="rtp"?i.push(1):s==="rtcp"?i.push(2):i.push(s),i.push(t.protocol.toUpperCase()),i.push(t.priority),i.push(t.address||t.ip),i.push(t.port);const r=t.type;return i.push("typ"),i.push(r),r!=="host"&&t.relatedAddress&&t.relatedPort!==void 0&&(i.push("raddr"),i.push(t.relatedAddress),i.push("rport"),i.push(t.relatedPort)),t.tcpType&&t.protocol.toLowerCase()==="tcp"&&(i.push("tcptype"),i.push(t.tcpType)),(t.usernameFragment||t.ufrag)&&(i.push("ufrag"),i.push(t.usernameFragment||t.ufrag)),"candidate:"+i.join(" ")},e.parseIceOptions=function(t){return t.substring(14).split(" ")},e.parseRtpMap=function(t){let i=t.substring(9).split(" ");const s={payloadType:parseInt(i.shift(),10)};return i=i[0].split("/"),s.name=i[0],s.clockRate=parseInt(i[1],10),s.channels=i.length===3?parseInt(i[2],10):1,s.numChannels=s.channels,s},e.writeRtpMap=function(t){let i=t.payloadType;t.preferredPayloadType!==void 0&&(i=t.preferredPayloadType);const s=t.channels||t.numChannels||1;return"a=rtpmap:"+i+" "+t.name+"/"+t.clockRate+(s!==1?"/"+s:"")+`\r
`},e.parseExtmap=function(t){const i=t.substring(9).split(" ");return{id:parseInt(i[0],10),direction:i[0].indexOf("/")>0?i[0].split("/")[1]:"sendrecv",uri:i[1],attributes:i.slice(2).join(" ")}},e.writeExtmap=function(t){return"a=extmap:"+(t.id||t.preferredId)+(t.direction&&t.direction!=="sendrecv"?"/"+t.direction:"")+" "+t.uri+(t.attributes?" "+t.attributes:"")+`\r
`},e.parseFmtp=function(t){const i={};let s;const r=t.substring(t.indexOf(" ")+1).split(";");for(let o=0;o<r.length;o++)s=r[o].trim().split("="),i[s[0].trim()]=s[1];return i},e.writeFmtp=function(t){let i="",s=t.payloadType;if(t.preferredPayloadType!==void 0&&(s=t.preferredPayloadType),t.parameters&&Object.keys(t.parameters).length){const r=[];Object.keys(t.parameters).forEach(o=>{t.parameters[o]!==void 0?r.push(o+"="+t.parameters[o]):r.push(o)}),i+="a=fmtp:"+s+" "+r.join(";")+`\r
`}return i},e.parseRtcpFb=function(t){const i=t.substring(t.indexOf(" ")+1).split(" ");return{type:i.shift(),parameter:i.join(" ")}},e.writeRtcpFb=function(t){let i="",s=t.payloadType;return t.preferredPayloadType!==void 0&&(s=t.preferredPayloadType),t.rtcpFeedback&&t.rtcpFeedback.length&&t.rtcpFeedback.forEach(r=>{i+="a=rtcp-fb:"+s+" "+r.type+(r.parameter&&r.parameter.length?" "+r.parameter:"")+`\r
`}),i},e.parseSsrcMedia=function(t){const i=t.indexOf(" "),s={ssrc:parseInt(t.substring(7,i),10)},r=t.indexOf(":",i);return r>-1?(s.attribute=t.substring(i+1,r),s.value=t.substring(r+1)):s.attribute=t.substring(i+1),s},e.parseSsrcGroup=function(t){const i=t.substring(13).split(" ");return{semantics:i.shift(),ssrcs:i.map(s=>parseInt(s,10))}},e.getMid=function(t){const i=e.matchPrefix(t,"a=mid:")[0];if(i)return i.substring(6)},e.parseFingerprint=function(t){const i=t.substring(14).split(" ");return{algorithm:i[0].toLowerCase(),value:i[1].toUpperCase()}},e.getDtlsParameters=function(t,i){return{role:"auto",fingerprints:e.matchPrefix(t+i,"a=fingerprint:").map(e.parseFingerprint)}},e.writeDtlsParameters=function(t,i){let s="a=setup:"+i+`\r
`;return t.fingerprints.forEach(r=>{s+="a=fingerprint:"+r.algorithm+" "+r.value+`\r
`}),s},e.parseCryptoLine=function(t){const i=t.substring(9).split(" ");return{tag:parseInt(i[0],10),cryptoSuite:i[1],keyParams:i[2],sessionParams:i.slice(3)}},e.writeCryptoLine=function(t){return"a=crypto:"+t.tag+" "+t.cryptoSuite+" "+(typeof t.keyParams=="object"?e.writeCryptoKeyParams(t.keyParams):t.keyParams)+(t.sessionParams?" "+t.sessionParams.join(" "):"")+`\r
`},e.parseCryptoKeyParams=function(t){if(t.indexOf("inline:")!==0)return null;const i=t.substring(7).split("|");return{keyMethod:"inline",keySalt:i[0],lifeTime:i[1],mkiValue:i[2]?i[2].split(":")[0]:void 0,mkiLength:i[2]?i[2].split(":")[1]:void 0}},e.writeCryptoKeyParams=function(t){return t.keyMethod+":"+t.keySalt+(t.lifeTime?"|"+t.lifeTime:"")+(t.mkiValue&&t.mkiLength?"|"+t.mkiValue+":"+t.mkiLength:"")},e.getCryptoParameters=function(t,i){return e.matchPrefix(t+i,"a=crypto:").map(e.parseCryptoLine)},e.getIceParameters=function(t,i){const s=e.matchPrefix(t+i,"a=ice-ufrag:")[0],r=e.matchPrefix(t+i,"a=ice-pwd:")[0];return s&&r?{usernameFragment:s.substring(12),password:r.substring(10)}:null},e.writeIceParameters=function(t){let i="a=ice-ufrag:"+t.usernameFragment+`\r
a=ice-pwd:`+t.password+`\r
`;return t.iceLite&&(i+=`a=ice-lite\r
`),i},e.parseRtpParameters=function(t){const i={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},r=e.splitLines(t)[0].split(" ");i.profile=r[2];for(let a=3;a<r.length;a++){const c=r[a],l=e.matchPrefix(t,"a=rtpmap:"+c+" ")[0];if(l){const h=e.parseRtpMap(l),u=e.matchPrefix(t,"a=fmtp:"+c+" ");switch(h.parameters=u.length?e.parseFmtp(u[0]):{},h.rtcpFeedback=e.matchPrefix(t,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),i.codecs.push(h),h.name.toUpperCase()){case"RED":case"ULPFEC":i.fecMechanisms.push(h.name.toUpperCase());break}}}e.matchPrefix(t,"a=extmap:").forEach(a=>{i.headerExtensions.push(e.parseExtmap(a))});const o=e.matchPrefix(t,"a=rtcp-fb:* ").map(e.parseRtcpFb);return i.codecs.forEach(a=>{o.forEach(c=>{a.rtcpFeedback.find(h=>h.type===c.type&&h.parameter===c.parameter)||a.rtcpFeedback.push(c)})}),i},e.writeRtpDescription=function(t,i){let s="";s+="m="+t+" ",s+=i.codecs.length>0?"9":"0",s+=" "+(i.profile||"UDP/TLS/RTP/SAVPF")+" ",s+=i.codecs.map(o=>o.preferredPayloadType!==void 0?o.preferredPayloadType:o.payloadType).join(" ")+`\r
`,s+=`c=IN IP4 0.0.0.0\r
`,s+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,i.codecs.forEach(o=>{s+=e.writeRtpMap(o),s+=e.writeFmtp(o),s+=e.writeRtcpFb(o)});let r=0;return i.codecs.forEach(o=>{o.maxptime>r&&(r=o.maxptime)}),r>0&&(s+="a=maxptime:"+r+`\r
`),i.headerExtensions&&i.headerExtensions.forEach(o=>{s+=e.writeExtmap(o)}),s},e.parseRtpEncodingParameters=function(t){const i=[],s=e.parseRtpParameters(t),r=s.fecMechanisms.indexOf("RED")!==-1,o=s.fecMechanisms.indexOf("ULPFEC")!==-1,a=e.matchPrefix(t,"a=ssrc:").map(f=>e.parseSsrcMedia(f)).filter(f=>f.attribute==="cname"),c=a.length>0&&a[0].ssrc;let l;const h=e.matchPrefix(t,"a=ssrc-group:FID").map(f=>f.substring(17).split(" ").map(g=>parseInt(g,10)));h.length>0&&h[0].length>1&&h[0][0]===c&&(l=h[0][1]),s.codecs.forEach(f=>{if(f.name.toUpperCase()==="RTX"&&f.parameters.apt){let d={ssrc:c,codecPayloadType:parseInt(f.parameters.apt,10)};c&&l&&(d.rtx={ssrc:l}),i.push(d),r&&(d=JSON.parse(JSON.stringify(d)),d.fec={ssrc:c,mechanism:o?"red+ulpfec":"red"},i.push(d))}}),i.length===0&&c&&i.push({ssrc:c});let u=e.matchPrefix(t,"b=");return u.length&&(u[0].indexOf("b=TIAS:")===0?u=parseInt(u[0].substring(7),10):u[0].indexOf("b=AS:")===0?u=parseInt(u[0].substring(5),10)*1e3*.95-50*40*8:u=void 0,i.forEach(f=>{f.maxBitrate=u})),i},e.parseRtcpParameters=function(t){const i={},s=e.matchPrefix(t,"a=ssrc:").map(a=>e.parseSsrcMedia(a)).filter(a=>a.attribute==="cname")[0];s&&(i.cname=s.value,i.ssrc=s.ssrc);const r=e.matchPrefix(t,"a=rtcp-rsize");i.reducedSize=r.length>0,i.compound=r.length===0;const o=e.matchPrefix(t,"a=rtcp-mux");return i.mux=o.length>0,i},e.writeRtcpParameters=function(t){let i="";return t.reducedSize&&(i+=`a=rtcp-rsize\r
`),t.mux&&(i+=`a=rtcp-mux\r
`),t.ssrc!==void 0&&t.cname&&(i+="a=ssrc:"+t.ssrc+" cname:"+t.cname+`\r
`),i},e.parseMsid=function(t){let i;const s=e.matchPrefix(t,"a=msid:");if(s.length===1)return i=s[0].substring(7).split(" "),{stream:i[0],track:i[1]};const r=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="msid");if(r.length>0)return i=r[0].value.split(" "),{stream:i[0],track:i[1]}},e.parseSctpDescription=function(t){const i=e.parseMLine(t),s=e.matchPrefix(t,"a=max-message-size:");let r;s.length>0&&(r=parseInt(s[0].substring(19),10)),isNaN(r)&&(r=65536);const o=e.matchPrefix(t,"a=sctp-port:");if(o.length>0)return{port:parseInt(o[0].substring(12),10),protocol:i.fmt,maxMessageSize:r};const a=e.matchPrefix(t,"a=sctpmap:");if(a.length>0){const c=a[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:r}}},e.writeSctpDescription=function(t,i){let s=[];return t.protocol!=="DTLS/SCTP"?s=["m="+t.kind+" 9 "+t.protocol+" "+i.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+i.port+`\r
`]:s=["m="+t.kind+" 9 "+t.protocol+" "+i.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+i.port+" "+i.protocol+` 65535\r
`],i.maxMessageSize!==void 0&&s.push("a=max-message-size:"+i.maxMessageSize+`\r
`),s.join("")},e.generateSessionId=function(){return Math.random().toString().substr(2,22)},e.writeSessionBoilerplate=function(t,i,s){let r;const o=i!==void 0?i:2;return t?r=t:r=e.generateSessionId(),`v=0\r
o=`+(s||"thisisadapterortc")+" "+r+" "+o+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},e.getDirection=function(t,i){const s=e.splitLines(t);for(let r=0;r<s.length;r++)switch(s[r]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return s[r].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const s=e.splitLines(t)[0].substring(2).split(" ");return{kind:s[0],port:parseInt(s[1],10),protocol:s[2],fmt:s.slice(3).join(" ")}},e.parseOLine=function(t){const s=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:s[0],sessionId:s[1],sessionVersion:parseInt(s[2],10),netType:s[3],addressType:s[4],address:s[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let s=0;s<i.length;s++)if(i[s].length<2||i[s].charAt(1)!=="=")return!1;return!0},n.exports=e})(Ug);var kg=Ug.exports;const no=xE(kg),yE=u_({__proto__:null,default:no},[kg]);function pc(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const s=new e(i),r=no.parseCandidate(i.candidate);for(const o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,or(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function pu(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||or(n,"icecandidate",e=>{if(e.candidate){const t=no.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function mc(n,e){if(!n.RTCPeerConnection)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const t=function(a){if(!a||!a.sdp)return!1;const c=no.splitSections(a.sdp);return c.shift(),c.some(l=>{const h=no.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},i=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},s=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);const h=no.matchPrefix(a.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),l=s(c),h=r(arguments[0],c);let u;l===0&&h===0?u=Number.POSITIVE_INFINITY:l===0||h===0?u=Math.max(l,h):u=Math.min(l,h);const f={};Object.defineProperty(f,"maxMessageSize",{get(){return u}}),this._sctp=f}return o.apply(this,arguments)}}function gc(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>149||e.browser==="firefox"&&e.version>60)return;function t(s,r){const o=s.send;s.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const r=i.apply(this,arguments);return t(r,this),r},or(n,"datachannel",s=>(t(s.channel,s.target),s))}function mu(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{const r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;const o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function gu(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&s instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function _c(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function vc(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}const ME=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:gu,shimAddIceCandidateNullOrEmpty:_c,shimConnectionState:mu,shimMaxMessageSize:mc,shimParameterlessSetLocalDescription:vc,shimRTCIceCandidate:pc,shimRTCIceCandidateRelayProtocol:pu,shimSendThrowTypeError:gc},Symbol.toStringTag,{value:"Module"}));function SE({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=hf,i=_E(n),s={browserDetails:i,commonShim:ME,extractVersion:Bo,disableLog:mE,disableWarnings:gE,sdp:yE};switch(i.browser){case"chrome":if(!Dp||!fu||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=Dp,_c(n,i),vc(n),ag(n,i),cg(n),fu(n,i),lg(n,i),dg(n,i),hg(n),ug(n,i),pg(n,i),pc(n),pu(n),mu(n),mc(n,i),gc(n,i),gu(n,i);break;case"firefox":if(!Ip||!du||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=Ip,_c(n,i),vc(n),mg(n,i),du(n,i),_g(n,i),gg(n),yg(n),vg(n),xg(n),Mg(n),Sg(n),bg(n),wg(n),Tg(n),pc(n),mu(n),mc(n,i),gc(n,i);break;case"safari":if(!zp||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=zp,_c(n,i),vc(n),Lg(n),Ig(n),Cg(n),Eg(n),Ag(n),Dg(n),Rg(n),zg(n),pc(n),pu(n),mc(n,i),gc(n,i),gu(n,i);break;default:t("Unsupported browser!");break}return s}const Up=SE({window:typeof window>"u"?void 0:window});function ar(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class Ng{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,s=Math.ceil(i/this.chunkedMTU);let r=0,o=0;for(;o<i;){const a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:s};t.push(l),o=a,r++}return this._dataCount++,t}}}function bE(n){let e=0;for(const s of n)e+=s.byteLength;const t=new Uint8Array(e);let i=0;for(const s of n)t.set(s,i),i+=s.byteLength;return t}const Th=Up.default||Up,Uo=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return Th.browserDetails.browser}getVersion(){return Th.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=Th.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},wE=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),Og=()=>Math.random().toString(36).slice(2),kp={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class TE extends Ng{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(s){s.target&&t(s.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=kp,this.browser=Uo.getBrowser(),this.browserVersion=Uo.getVersion(),this.pack=ig,this.unpack=ng,this.supports=function(){const t={browser:Uo.isBrowserSupported(),webRTC:Uo.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(kp),t.audioVideo=!0;let s;try{s=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!Uo.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{i&&i.close()}return t}(),this.validateId=wE,this.randomToken=Og}}const Nn=new TE,EE="PeerJS: ";class AE{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[EE,...t];for(const s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var ke=new AE,ff={},CE=Object.prototype.hasOwnProperty,Un="~";function ca(){}Object.create&&(ca.prototype=Object.create(null),new ca().__proto__||(Un=!1));function RE(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function Fg(n,e,t,i,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new RE(t,i||n,s),o=Un?Un+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],r]:n._events[o].push(r):(n._events[o]=r,n._eventsCount++),n}function xc(n,e){--n._eventsCount===0?n._events=new ca:delete n._events[e]}function Tn(){this._events=new ca,this._eventsCount=0}Tn.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)CE.call(t,i)&&e.push(Un?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Tn.prototype.listeners=function(e){var t=Un?Un+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,r=i.length,o=new Array(r);s<r;s++)o[s]=i[s].fn;return o};Tn.prototype.listenerCount=function(e){var t=Un?Un+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Tn.prototype.emit=function(e,t,i,s,r,o){var a=Un?Un+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,h,u;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,s),!0;case 5:return c.fn.call(c.context,t,i,s,r),!0;case 6:return c.fn.call(c.context,t,i,s,r,o),!0}for(u=1,h=new Array(l-1);u<l;u++)h[u-1]=arguments[u];c.fn.apply(c.context,h)}else{var f=c.length,d;for(u=0;u<f;u++)switch(c[u].once&&this.removeListener(e,c[u].fn,void 0,!0),l){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,t);break;case 3:c[u].fn.call(c[u].context,t,i);break;case 4:c[u].fn.call(c[u].context,t,i,s);break;default:if(!h)for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c[u].fn.apply(c[u].context,h)}}return!0};Tn.prototype.on=function(e,t,i){return Fg(this,e,t,i,!1)};Tn.prototype.once=function(e,t,i){return Fg(this,e,t,i,!0)};Tn.prototype.removeListener=function(e,t,i,s){var r=Un?Un+e:e;if(!this._events[r])return this;if(!t)return xc(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!i||o.context===i)&&xc(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||s&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:xc(this,r)}return this};Tn.prototype.removeAllListeners=function(e){var t;return e?(t=Un?Un+e:e,this._events[t]&&xc(this,t)):(this._events=new ca,this._eventsCount=0),this};Tn.prototype.off=Tn.prototype.removeListener;Tn.prototype.addListener=Tn.prototype.on;Tn.prefixed=Un;Tn.EventEmitter=Tn;ff=Tn;var cr={};ar(cr,"ConnectionType",()=>gs);ar(cr,"PeerErrorType",()=>Kt);ar(cr,"BaseConnectionErrorType",()=>_u);ar(cr,"DataConnectionErrorType",()=>df);ar(cr,"SerializationType",()=>pl);ar(cr,"SocketEventType",()=>cs);ar(cr,"ServerMessageType",()=>bn);var gs=function(n){return n.Data="data",n.Media="media",n}({}),Kt=function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n}({}),_u=function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n}({}),df=function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n}({}),pl=function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n}({}),cs=function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n}({}),bn=function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n}({});const Bg="1.5.5";class PE extends ff.EventEmitter{constructor(e,t,i,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+s+"peerjs?key="+r}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+Bg),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),ke.log("Server message received:",r)}catch{ke.log("Invalid server message",s.data);return}this.emit(cs.Message,r)},this._socket.onclose=s=>{this._disconnected||(ke.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(cs.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),ke.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){ke.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:bn.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(cs.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class Gg{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===gs.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(i.label,s);i._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){ke.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;ke.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(ke.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:bn.Candidate,payload:{candidate:o.candidate,type:s,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":ke.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(_u.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":ke.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(_u.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":ke.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},ke.log("Listening for data channel"),e.ondatachannel=o=>{ke.log("Received data channel");const a=o.channel;r.getConnection(t,i)._initializeDataChannel(a)},ke.log("Listening for remote stream"),e.ontrack=o=>{ke.log("Received remote stream");const a=o.streams[0],c=r.getConnection(t,i);if(c.type===gs.Media){const l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){ke.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const s=this.connection.dataChannel;s&&(i=!!s.readyState&&s.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);ke.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),ke.log("Set localDescription:",i,`for:${this.connection.peer}`);let s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===gs.Data){const r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:bn.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Kt.WebRTC,s),ke.log("Failed to setLocalDescription, ",s))}}catch(i){t.emitError(Kt.WebRTC,i),ke.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();ke.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),ke.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:bn.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Kt.WebRTC,s),ke.log("Failed to setLocalDescription, ",s)}}catch(i){t.emitError(Kt.WebRTC,i),ke.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,s=this.connection.provider;ke.log("Setting remote description",t);const r=this;try{await i.setRemoteDescription(t),ke.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(Kt.WebRTC,o),ke.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){ke.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),ke.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Kt.WebRTC,t),ke.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(ke.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return ke.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){ke.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class Hg extends ff.EventEmitter{emitError(e,t){ke.error("Error:",t),this.emit("error",new LE(`${e}`,t))}}class LE extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class Vg extends Hg{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}class Gc extends Vg{static#e=this.ID_PREFIX="mc_";get type(){return gs.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||Gc.ID_PREFIX+Nn.randomToken(),this._negotiator=new Gg(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{ke.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{ke.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){ke.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case bn.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case bn.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:ke.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){ke.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const s of i)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}}class DE{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${i}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Bg),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){ke.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==Nn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===Nn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw ke.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}class Hc extends Vg{static#e=this.ID_PREFIX="dc_";static#t=this.MAX_BUFFERED_AMOUNT=8388608;get type(){return gs.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||Hc.ID_PREFIX+Og(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Gg(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{ke.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{ke.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{ke.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(df.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case bn.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case bn.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:ke.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}}class pf extends Hc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Hc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return ke.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Eh extends pf{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Ng,this.serialization=pl.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=ng(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const s=bE(i.data);this._handleDataMessage({data:s})}}_send(e,t){const i=ig(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);ke.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class IE extends pf{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=pl.None}}class zE extends pf{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=Nn.chunkedMTU){this.emitError(df.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=pl.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}class mf extends Hg{static#e=this.DEFAULT_KEY="peerjs";get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:IE,json:zE,binary:Eh,"binary-utf8":Eh,default:Eh},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:Nn.CLOUD_HOST,port:Nn.CLOUD_PORT,path:"/",key:mf.DEFAULT_KEY,token:Nn.randomToken(),config:Nn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Nn.CLOUD_HOST?this._options.secure=Nn.isSecure():this._options.host==Nn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&ke.setLogFunction(this._options.logFunction),ke.logLevel=this._options.debug||0,this._api=new DE(t),this._socket=this._createServerConnection(),!Nn.supports.audioVideo&&!Nn.supports.data){this._delayedAbort(Kt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!Nn.validateId(i)){this._delayedAbort(Kt.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Kt.ServerError,s))}_createServerConnection(){const e=new PE(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(cs.Message,t=>{this._handleMessage(t)}),e.on(cs.Error,t=>{this._abort(Kt.SocketError,t)}),e.on(cs.Disconnected,()=>{this.disconnected||(this.emitError(Kt.Network,"Lost connection to server."),this.disconnect())}),e.on(cs.Close,()=>{this.disconnected||this._abort(Kt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,s=e.src;switch(t){case bn.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case bn.Error:this._abort(Kt.ServerError,i.msg);break;case bn.IdTaken:this._abort(Kt.UnavailableID,`ID "${this.id}" is taken`);break;case bn.InvalidKey:this._abort(Kt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case bn.Leave:ke.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case bn.Expire:this.emitError(Kt.PeerUnavailable,`Could not connect to peer ${s}`);break;case bn.Offer:{const r=i.connectionId;let o=this.getConnection(s,r);if(o&&(o.close(),ke.warn(`Offer received for existing Connection ID:${r}`)),i.type===gs.Media){const c=new Gc(s,this,{connectionId:r,_payload:i,metadata:i.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(i.type===gs.Data){const c=new this._serializers[i.serialization](s,this,{connectionId:r,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{ke.warn(`Received malformed connection type:${i.type}`);return}const a=this._getMessages(r);for(const c of a)o.handleMessage(c);break}default:{if(!i){ke.warn(`You received a malformed message from ${s} of type ${t}`);return}const r=i.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):ke.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){ke.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Kt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){ke.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Kt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){ke.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const s=new Gc(e,this,{...i,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){ke.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const s of i)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){ke.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(ke.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;ke.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)ke.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)ke.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Kt.ServerError,t))}}var gf=mf;let ls=null,Hs=null;const Ss=Array.from({length:nr},()=>null);let ml="";const Np="ABCDEFGHJKMNPQRSTUVWXYZ23456789",Wg=n=>"sailcoop-v1-"+n,Vc=[{x:-.7,z:-1.5},{x:.9,z:-1},{x:-.9,z:.5},{x:.9,z:.7}];function En(n,e=-1){if(At==="host")for(let t=1;t<Ss.length;t++){const i=Ss[t];if(i&&i.open&&t!==e)try{i.send(n)}catch{}}else if(Hs&&Hs.open)try{Hs.send(n)}catch{}}function UE(n,e){const t=Ss[n];if(t&&t.open)try{t.send(e)}catch{}}function kE(){for(let n=1;n<nr;n++)if(!Ss[n])return n;return-1}function NE(){let n=0;for(let e=1;e<nr;e++)Fn[e]&&n++;return n}const _f=()=>{const n=NE();return n===0?"waiting for your mateys…":n===1?"1 matey aboard!":n+" mateys aboard!"};function Xg(){for(let n=1;n<nr;n++){Ss[n]=null,ha(n,!1);const e=qe[n];e&&(e.mesh.visible=!1)}yu(!1)}function qg(n){const e=qe[n];if(!e)return;ha(n,!0),yu(!0),di(e),e.mesh.parent!==_t&&(se.remove(e.mesh),_t.add(e.mesh)),e.mode="deck",e.pos.x=Vc[n].x,e.pos.z=Vc[n].z,e.vel.x=0,e.vel.z=0,e.knock=0,e.facing=0,e.jumpY=0,e.vy=0,e.grabbedBy=-1,e.holding=!1,e.station=null,e.carry=-1,e.mesh.visible=!0;const t=ii[n];t&&(t.on=!0,t.held=-1,t.x=t.bucket.position.x,t.z=t.bucket.position.z),ms.textContent="Code: "+ml+" — "+_f(),$e("A matey climbed aboard!","#aef7a2"),UE(n,{k:"start",boat:la.id,index:n})}function vu(n){if(!Ss[n]&&!Fn[n])return;Ss[n]=null,ha(n,!1),yu(Xc());const e=qe[n];e&&(di(e),e.mesh.visible=!1),ww(n);const t=ii[n];t&&(t.on=!1),ms.textContent="Code: "+ml+" — "+_f(),$e("Matey disconnected","#ff8787")}Vw((n,e)=>{At==="host"&&En({k:"toast",x:n,col:e})});Jw((n,e,t)=>{At==="host"&&En({k:"fx",fx:"poop",id:n,x:e,z:t})},n=>{At==="host"&&En({k:"fx",fx:"unsplat",id:n})});PT(n=>{At==="host"&&En({k:"boat",id:n})});lT((n,e,t,i,s,r)=>{At==="host"&&En({k:"boom",x:n,y:e,z:t,vx:i,vy:s,vz:r})});let la=ki[1];function vf(){Oe.inMenu=!1,Cw.style.display="none",Oe.runTime=0,Oe.started=!1,xa(),pa(),ga(),Ht.length=0,rr(),ef(),cl(),Nu()}function Yg(n){n&&(la=n),oa(la),Wc(null),qc(0),Xg(),vf()}function jg(n){n&&(la=n);let e="";for(let t=0;t<6;t++)e+=Np[Math.random()*Np.length|0];Xr.textContent="Raising the flag…",ls=new gf(Wg(e)),ls.on("open",()=>{ml=e,oa(la),Wc("host"),qc(0),Xg(),vf(),ms.style.display="block",ms.textContent="Code: "+e+" — "+_f()}),ls.on("connection",t=>{const i=kE();if(i<0){try{t.close()}catch{}return}Ss[i]=t,t.on("open",()=>qg(i)),t.on("data",s=>$g(s,i)),t.on("close",()=>vu(i)),t.on("error",()=>vu(i))}),ls.on("error",t=>{Xr.textContent="Network trouble ("+t.type+") — try Host again.",ms.textContent="Net error: "+t.type})}const OE={i:18,g:80,f:80,m0:80,buy:250,route:250,hat:250,"restart?":3e3},FE=[];function $g(n,e){if(!n||typeof n!="object")return;const t=qe[e];if(!t)return;const i=OE[n.k];if(i!==void 0){const s=performance.now(),r=FE[e]??=Object.create(null);if(s-(r[n.k]??-1e9)<i)return;r[n.k]=s}n.k==="i"?(t.netAxes.fwd=je(+n.a.fwd||0,-1,1),t.netAxes.strafe=je(+n.a.strafe||0,-1,1),t.netAxes.j=n.a.j?1:0,t.netAxes.h=n.a.h?1:0,t.netAxes.u=n.a.u?1:0,n.d&&(Ih.x+=je(Number.isFinite(n.d.x)?n.d.x:0,-4e3,4e3),Ih.y+=je(Number.isFinite(n.d.y)?n.d.y:0,-4e3,4e3)),Number.isFinite(n.f)&&!t.holding&&(t.facing=bt(n.f)),Oe.started=!0):n.k==="g"?Oe.docked||ju(t):n.k==="f"?$u(t):n.k==="m0"?t.station==="cannon"?Qu(t):Ku(t):n.k==="buy"?dl(n.id):n.k==="hat"?["captain","bandana","straw","fancy"].includes(n.id)&&rf(e,n.id):n.k==="route"?n.a==="abandon"?af(n.i):of(n.i):n.k==="restart?"&&(xa(),pa(Xc()),ga(),rr(),ef(),cl(),En({k:"reset"}))}function Kg(n){const e=(n||"").trim().toUpperCase();if(e.length!==6){Xr.textContent="Type the 6-letter code first.";return}Xr.textContent="Rowing over to "+e+"…",ls=new gf,ls.on("open",()=>{Hs=ls.connect(Wg(e)),Hs.on("open",()=>{Xr.textContent="Connected — climbing aboard…"}),Hs.on("data",t=>Jg(t)),Hs.on("close",()=>{ms.textContent="Host left.",$e("Lost the host…","#ff8787")})}),ls.on("error",t=>{Xr.textContent="Could not reach "+e+" ("+t.type+")."})}const xf=()=>Array.from({length:nr},()=>null),Qt={boat:null,c:xf(),barge:null};function Jg(n){if(!(!n||typeof n!="object")){if(n.k==="start"){const e=n.index??1;oa(ki.find(i=>i.id===n.boat)??ki[1]),Wc("guest"),qc(e),ha(e,!0),qe.forEach((i,s)=>{i&&(i.mesh.visible=s===0||s===e)});const t=Vc[e]??Vc[1];qe[e].pos.x=t.x,qe[e].pos.z=t.z,vf(),ms.style.display="block",ms.textContent="Aboard! — you are pirate "+(e+1);return}if(n.k==="toast"){$e(n.x,n.col);return}if(n.k==="boat"){oa(ki.find(e=>e.id===n.id)??ki[1]);return}if(n.k==="fx"){n.fx==="poop"?Zu(n.id,n.x,n.z):ma(n.id);return}if(n.k==="boom"){uT(n.x,n.y,n.z,n.vx,n.vy,n.vz);return}if(n.k==="reset"){xa(),pa(),ga(),rr(),ef(),cl(),Qt.boat=null,Qt.c=xf(),Qt.barge=null;return}n.k==="s"&&Zg(n)}}function Zg(n){if(n.pr&&y_(n.pr),Qt.boat=n.b,P.vel.x=n.b.vx,P.vel.z=n.b.vz,P.angVel=n.b.av,P.rudder=n.b.rud,P.boomAngle=n.b.boom,P.heel=n.b.heel,P.sailForce=n.b.sf,P.luffing=n.b.luff,P.anchored=n.b.anc,pw(n.cg),xt.gold=n.g.gold,xt.delivered=n.g.del,xt.lost=n.g.lost,dt.angle=n.w.a,dt.strength=n.w.s,n.w.wid!==lt.weatherId&&(lt.weatherId=n.w.wid??0,lt.weatherLerp=0),lt.bigWave=n.w.bw??0,n.aq&&Ht.splice(0,Ht.length,...n.aq),n.rt!==Ms&&da(n.rt),n.up){Ke.bigDeck=n.up.bd,Ke.chartNorth=n.up.ch,Ke.skiff=n.up.sk,Ke.galleon=n.up.gl,Ke.hatStraw=n.up.hs,Ke.hatFancy=n.up.hf,Ke.barge=n.up.bg??!1,Ke.mopQuick=n.up.mq??!1,Ke.mopLong=n.up.ml??!1;const e=Ke.mopGold;Ke.mopGold=n.up.mg??!1,Ke.mopGold&&!e&&qu();const t=Ke.cannon;Ke.cannon=n.up.ca??!1,Ke.cannon&&!t&&ol(ue.scale)}n.cn&&(kt.yaw=n.cn.y,kt.pitch=n.cn.p,kt.reload=n.cn.r),n.br&&(Jt.barge=n.br.a,Qt.barge=n.br,ve.roll=n.br.rl,ve.capsized=n.br.cap),Oe.runTime=n.t,n.d&&!Oe.docked&&Ww(Bp(n.t)),Oe.docked=n.d,n.m.forEach((e,t)=>{const i=ii[t];i&&(i.on=e.on,i.held=e.held,i.thrown=e.thrown,i.x=e.x,i.z=e.z,i.h=e.h)}),n.c.forEach((e,t)=>{const i=qe[t];if(i){if(!Fn[t]){i.mesh.visible=!1,Qt.c[t]=null;return}if(i.mesh.visible=!0,Qt.c[t]=e,i.grabbedBy=e.gb,i.hasMop=e.hm,i.scrubT=e.sc,i.holding=n.c.some((s,r)=>r!==t&&s.gb===t),e.m!==i.mode){const s=i.mode==="water";if(i.mode=e.m,e.m==="deck"){if(i.mesh.parent!==_t&&(se.remove(i.mesh),_t.add(i.mesh)),s){const r=vn(nt(e.x,e.z));In(r.x,r.z,!1)}}else i.mesh.parent!==se&&(_t.remove(i.mesh),se.add(i.mesh)),e.m==="water"?In(e.x,e.z,!0):s&&In(e.x,e.z,!1);i.pos.x=e.x,i.pos.z=e.z}i.knock=e.kn,i.station=e.st,e.ht&&e.ht!==i.hat&&Y0(i,e.ht),i!==Yn()&&typeof e.f=="number"&&(i.facing=e.f)}})}let Ah=0;function Qg(n){Oe.simT+=n;const e=1-Math.exp(-12*n);if(Qt.boat&&(P.pos.x=Ut(P.pos.x,Qt.boat.x,e),P.pos.z=Ut(P.pos.z,Qt.boat.z,e),P.yaw=bt(P.yaw+bt(Qt.boat.yaw-P.yaw)*e)),Qt.barge&&Qt.barge.a&&(ve.pos.x=Ut(ve.pos.x,Qt.barge.x,e),ve.pos.z=Ut(ve.pos.z,Qt.barge.z,e),ve.yaw=bt(ve.yaw+bt(Qt.barge.yw-ve.yaw)*e)),qe.forEach((t,i)=>{const s=Qt.c[i];if(!s||!Fn[i])return;const r=t.pos.x,o=t.pos.z;t.pos.x=Ut(t.pos.x,s.x,e),t.pos.z=Ut(t.pos.z,s.z,e),t.jumpY=Ut(t.jumpY,s.y||0,e);const a=Math.hypot(t.pos.x-r,t.pos.z-o)>.012;if(t.animMoving=a&&t.knock<=0,t.vel.x=(t.pos.x-r)/Math.max(n,1e-4),t.vel.z=(t.pos.z-o)/Math.max(n,1e-4),a&&(t.walkPhase+=n*(t.mode==="water"?7:11)),t.mode==="deck"){let c=Xe+t.jumpY;a&&t.jumpY<.01&&t.knock<=0&&(c+=Math.abs(Math.sin(t.walkPhase))*.09),t.mesh.position.set(t.pos.x,c,t.pos.z),t.mesh.rotation.set(0,t.facing,0)}else if(t.mode==="shore"){let c=(Jo(t.pos.x,t.pos.z)??Vi)+t.jumpY;a&&t.jumpY<.01&&t.knock<=0&&(c+=Math.abs(Math.sin(t.walkPhase))*.09),t.mesh.position.set(t.pos.x,c,t.pos.z),t.mesh.rotation.set(0,t.facing,0)}else{const c=t.jumpY>.05?Math.max(.18,va+t.jumpY-F.eyeHeight):.18+Math.sin(Oe.simT*3+i)*.08;t.mesh.position.set(t.pos.x,c,t.pos.z),t.mesh.rotation.set(0,t.facing,0),t.rippleT-=n,a&&t.rippleT<=0&&(t.rippleT=.22,ui(t.pos.x,t.pos.z,t.facing,.5))}j0(t,n,Oe.simT)}),Ah-=n,Ah<=0){Ah=1/15;const t={x:Ns.x,y:Ns.y};Ns.x=0,Ns.y=0,En({k:"i",a:Xm(),f:Yn().facing,d:t})}}let Ch=0;function e_(n){At!=="host"||!xu||(Ch-=n,!(Ch>0)&&(Ch=1/20,En({k:"s",b:{x:P.pos.x,z:P.pos.z,yaw:P.yaw,vx:P.vel.x,vz:P.vel.z,av:P.angVel,rud:P.rudder,boom:P.boomAngle,heel:P.heel,sf:P.sailForce,luff:P.luffing,anc:P.anchored},w:{a:dt.angle,s:dt.strength,wid:lt.weatherId,wl:lt.weatherLerp,bw:lt.bigWave},t:Oe.runTime,d:Oe.docked,pr:Fn.slice(),cg:mw(),g:{gold:xt.gold,del:xt.delivered,lost:xt.lost},rt:Ms,aq:Ht.slice(),up:{bd:Ke.bigDeck,ch:Ke.chartNorth,sk:Ke.skiff,gl:Ke.galleon,hs:Ke.hatStraw,hf:Ke.hatFancy,ca:Ke.cannon,bg:Ke.barge,mq:Ke.mopQuick,ml:Ke.mopLong,mg:Ke.mopGold},cn:{y:kt.yaw,p:kt.pitch,r:kt.reload},br:{a:Ke.barge&&Jt.barge,x:ve.pos.x,z:ve.pos.z,yw:ve.yaw,rl:ve.roll,cap:ve.capsized},c:qe.map(e=>({x:e.pos.x,z:e.pos.z,y:e.jumpY,f:e.facing,m:e.mode,kn:e.knock,st:e.station,gb:e.grabbedBy,hm:e.hasMop,sc:e.scrubT,ht:e.hat})),m:ii.map(e=>({x:e.x,z:e.z,h:e.h,held:e.held,thrown:e.thrown,on:e.on}))})))}function BE(){En({k:"g"})}function GE(){En({k:"f"})}function HE(){En({k:"m0"})}function VE(n){En({k:"buy",id:n})}function WE(n,e=!1){En(e?{k:"route",i:n,a:"abandon"}:{k:"route",i:n})}function XE(n){En({k:"hat",id:n})}function qE(){if(At==="guest"){En({k:"restart?"});return}xa(),pa(Xc()),ga(),Qt.boat=null,Qt.c=xf(),At==="host"&&En({k:"reset"})}const YE=gf,jE=[{shirt:15221818,trim:8007728,hat:"captain"},{shirt:16766011,trim:4478242,hat:"bandana"},{shirt:5090295,trim:1850714,hat:"straw"},{shirt:11638780,trim:3878238,hat:"fancy"}];function oc(n,e,t){const i=jE[n],s=Jt.hats[n]??i.hat,r=wT(i.shirt,i.trim,s);return _t.add(r),{name:"P"+(n+1),mesh:r,mode:"deck",station:null,pos:nt(e,t),vel:nt(),knock:0,walkPhase:0,facing:0,pitch:0,jumpY:0,vy:0,hat:s,netAxes:{fwd:0,strafe:0,j:0,h:0,u:0},overboardCount:0,animMoving:!1,rippleT:0,hasMop:!1,grabbedBy:-1,holding:!1,mash:0,scrubT:0,carry:-1}}x_(oc(0,-.7,-1.5),oc(1,.9,-1.5),oc(2,-.9,.4),oc(3,.9,.4));for(let n=1;n<qe.length;n++)qe[n].mesh.visible=!1;Mb();nb([Qr,$s,_o,go]);function $E(){const n=[];se.traverse(e=>{e.visible===!1&&(e.visible=!0,n.push(e))});try{nn.compile(se,Et),nn.render(se,Et)}catch{}for(const e of n)e.visible=!1}$E();function yf(){for(;sa.length;){const n=sa.shift();if(!Oe.inMenu){if(Oe.started=!0,n==="KeyQ"&&$e("Water: "+Cb(),"#74c0fc"),n==="KeyM"&&hE(),(n==="KeyH"||n==="Slash")&&Gw(),n==="KeyE"&&!Oe.docked)if(Si)ou();else if(bi)cu();else{const e=hl(Yn());e?.kind==="shop"?ou(e.shopCat):e?.kind==="route"?cu():At==="guest"?BE():ju(zs)}n==="KeyF"&&!Oe.docked&&(At==="guest"?GE():$u(zs)),n==="Mouse0"&&!Oe.docked&&(At==="guest"?HE():zs.station==="cannon"?Qu(zs):Ku(zs))}}}function t_(n){Oe.simT+=n,yf(),XT(n),oE(n),FT(n,Oe.simT),Oe.docked||(BT(n),sw(n),z0(n),fT(n),uw(n),qe.forEach((e,t)=>{zn(e)&&MT(e,t,n,Oe.simT)}),Oe.started&&(Oe.runTime+=n)),qe.forEach(e=>j0(e,n,Oe.simT))}let Rh=0,Ph=0,Lh=0,KE=0;function n_(n){const e=Oe.simT,t=Dh(P.vel);if(nE(n),Oe.inMenu||iE(n),Rh-=n,t>1.2&&Rh<=0){Rh=.07;const r=vn(nt(0,-ue.hullL/2)),o=On(P.yaw),a=ue.hullW*.5;ui(r.x,r.z,P.yaw,(1+t*.1)*ue.scale,3.2,0,0,.5,1.9);for(const c of[-1,1])ui(r.x+o.x*c*a*.7,r.z+o.z*c*a*.7,P.yaw,.8*ue.scale,2.6,o.x*c*1.2,o.z*c*1.2,.42,1.2)}const i=vn(nt(0,ue.hullL/2-.3));if(qb(i.x,i.z,P.yaw,t,e),Ph-=n,t>5.5&&Ph<=0&&(Ph=.13,Yi(i.x,i.z,3,2.4,2.6)),Ke.barge&&Jt.barge&&(Lh-=n,Math.hypot(ve.vel.x,ve.vel.z)>1&&Lh<=0)){Lh=.1;const o=ve.pos.x-Math.sin(ve.yaw)*1.8,a=ve.pos.z-Math.cos(ve.yaw)*1.8;ui(o,a,ve.yaw,1.3,2.4,0,0,.4,1.3)}const s=kn.dir;Zt.position.set(Et.position.x+s.x*140,20+s.y*150,Et.position.z+s.z*140),Zt.target.position.set(Et.position.x,0,Et.position.z),go.position.copy(Et.position);for(const r of Gm)r.position.x+=Math.sin(dt.angle)*dt.strength*.18*n,r.position.z+=Math.cos(dt.angle)*dt.strength*.18*n,Math.hypot(r.position.x-P.pos.x,r.position.z-P.pos.z)>750&&(r.position.x=P.pos.x-Math.sin(dt.angle)*680+(Math.random()-.5)*320,r.position.z=P.pos.z-Math.cos(dt.angle)*680+(Math.random()-.5)*320);fa.forEach((r,o)=>{const a=o===4?P.pos.x:o%2?Mt.x:0,c=o===4?P.pos.z:o%2?Mt.z:-60,l=e*r.sp+r.ph;r.g.position.set(a+Math.cos(l)*r.r,r.h+Math.sin(e*.9+r.ph)*1.4,c+Math.sin(l)*r.r),r.g.rotation.y=-l;const h=Math.sin(e*7+r.ph)*.55;r.wingL.rotation.z=h,r.wingR.rotation.z=-h}),Xb(n),$b(n),Jb(n,e,P.pos.x,P.pos.z,dt.angle,dt.strength),Ab(e,P.pos.x,P.pos.z),vb(e),jT(n),cT(n,e),gb(e),Aw(e),dw(e),dT(n),rw(e),ET(n,e),(Si||bi)&&!(++KE&7)&&(Si&&vo(),bi&&xo()),Vb(n,e),WT(n,e),S_(n,dt.strength,t,Oe.inMenu?0:P.luffing?1:0)}function i_(){const n=ao();if(nn.setViewport(0,0,n.w,n.h),Ln.uCamPos.value.copy(Et.position),Oe.inMenu){nn.render(se,Et);return}const e=Yn(),t=qe.indexOf(e),s=ii.some(r=>r.on&&r.held===t)?e.mesh.userData.parts:void 0;if(s?.arms){const r=new Set;s.arms.forEach(a=>a.traverse(c=>r.add(c)));const o=[];e.mesh.traverse(a=>{a.isMesh&&!r.has(a)&&a.visible&&(a.visible=!1,o.push(a))}),nn.render(se,Et);for(const a of o)a.visible=!0}else e.mesh.visible=!1,nn.render(se,Et),e.mesh.visible=zn(e)}let Op=performance.now();function s_(n){requestAnimationFrame(s_);const e=Math.min((n-Op)/1e3,.1);if(Op=n,!window.__sailPaused)if(At==="guest")yf(),Qg(e);else{let t=e;for(;t>1e-4;){const i=Math.min(t,.016666666666666666);t_(i),t-=i}e_(e)}n_(e),U0(),tg(),i_()}requestAnimationFrame(s_);const r_=()=>ki.find(n=>n.id===Jt.ship&&(n.id==="sloop"||Ke[n.id]))??ki[1];LT(n=>{At==="guest"?VE(n):dl(n)},n=>{At==="guest"?XE(n):rf(0,n)});DT((n,e)=>{At==="guest"?WE(n,e==="abandon"):e==="abandon"?af(n):of(n)});fw(zT);ib(()=>Si||bi||Hw()||to);Rw.addEventListener("click",()=>{Yc(),Yg(r_())});Pw.addEventListener("click",()=>{Yc(),jg(r_())});Lw.addEventListener("click",()=>{Yc(),Kg(Dw.value)});Iw.addEventListener("click",()=>qE());Nu();window.__sail={CONFIG:F,boat:P,wind:dt,chars:qe,keys:Sn,_three:{renderer:nn,scene:se,cam1:Et,cam2:Vm},_net:{startSolo:Yg,startHost:jg,startJoin:Kg,resetState:xa,hostOnData:$g,guestOnData:Jg,applySnapshot:Zg},Peer:YE,env:lt,layout:ue,BOATS:ki,mops:ii,crates:Bt,splats:_s,game:xt,cannon:kt,barge:ve,gulls:fa,daynight:kn,_hands:{handsEdge:$u,mopTap:Ku,pressE:ju,updateHands:z0,resetHands:pa,getInteract:hl},_cannon:{fireCannon:Qu,balls:_a,bomberPos:F0},_shop:{tryBuy:dl,equipBarge:$0},_splats:{placeSplat:Zu,removeSplat:ma,nearestSplat:ul,clearSplats:ga},_cargo:{spawnBatch:bs},_director:lf,get netCode(){return ml},get waterMode(){return Wi},get mapOpen(){return to},get netRole(){return At},get guestHere(){return xu},_mp:{setNetRole:Wc,setConnected:ha,setMyIndex:qc,anyGuest:Xc,MAX_PLAYERS:nr,onGuestJoin:qg,onGuestLeave:vu,get connected(){return Fn.slice()}},get inMenu(){return Oe.inMenu},get docked(){return Oe.docked},get time(){return Oe.runTime},press(n){Sn[n]=!0,sa.push(n)},release(n){Sn[n]=!1},look(n,e=0){const t=Yn();t.facing=bt(t.facing+n),t.pitch=je(t.pitch+e,-1.15,1.15)},step(n){const e=Math.round(n*60);for(let t=0;t<e;t++)At==="guest"?(yf(),Qg(1/60)):(t_(1/60),e_(1/60)),n_(1/60)},render(){U0(),tg(),i_()},setPaused(n){window.__sailPaused=n},setTime(n){kn.t=(n%1+1)%1},_fft:{N:Se,PATCH:co,heightField:Fi,oceanHeight:Vr,selfTest:fb,updateOcean:Qm}};
