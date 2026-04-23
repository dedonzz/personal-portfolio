(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Qo(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const nt={},Hi=[],en=()=>{},Pc=()=>!1,Ts=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),bs=n=>n.startsWith("onUpdate:"),mt=Object.assign,ea=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},lf=Object.prototype.hasOwnProperty,$e=(n,e)=>lf.call(n,e),Be=Array.isArray,ur=n=>wr(n)==="[object Map]",cf=n=>wr(n)==="[object Set]",Ia=n=>wr(n)==="[object Date]",Ve=n=>typeof n=="function",ut=n=>typeof n=="string",Yn=n=>typeof n=="symbol",rt=n=>n!==null&&typeof n=="object",Lc=n=>(rt(n)||Ve(n))&&Ve(n.then)&&Ve(n.catch),uf=Object.prototype.toString,wr=n=>uf.call(n),ff=n=>wr(n).slice(8,-1),hf=n=>wr(n)==="[object Object]",ta=n=>ut(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,fr=Qo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),As=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},df=/-\w/g,tn=As(n=>n.replace(df,e=>e.slice(1).toUpperCase())),pf=/\B([A-Z])/g,vi=As(n=>n.replace(pf,"-$1").toLowerCase()),Dc=As(n=>n.charAt(0).toUpperCase()+n.slice(1)),Gs=As(n=>n?`on${Dc(n)}`:""),fn=(n,e)=>!Object.is(n,e),Vs=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Uc=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},mf=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Na;const ws=()=>Na||(Na=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function na(n){if(Be(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=ut(i)?xf(i):na(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(ut(n)||rt(n))return n}const _f=/;(?![^(]*\))/g,gf=/:([^]+)/,vf=/\/\*[^]*?\*\//g;function xf(n){const e={};return n.replace(vf,"").split(_f).forEach(t=>{if(t){const i=t.split(gf);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function ia(n){let e="";if(ut(n))e=n;else if(Be(n))for(let t=0;t<n.length;t++){const i=ia(n[t]);i&&(e+=i+" ")}else if(rt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Mf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Sf=Qo(Mf);function Ic(n){return!!n||n===""}function Ef(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=ra(n[i],e[i]);return t}function ra(n,e){if(n===e)return!0;let t=Ia(n),i=Ia(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=Yn(n),i=Yn(e),t||i)return n===e;if(t=Be(n),i=Be(e),t||i)return t&&i?Ef(n,e):!1;if(t=rt(n),i=rt(e),t||i){if(!t||!i)return!1;const r=Object.keys(n).length,s=Object.keys(e).length;if(r!==s)return!1;for(const a in n){const o=n.hasOwnProperty(a),l=e.hasOwnProperty(a);if(o&&!l||!o&&l||!ra(n[a],e[a]))return!1}}return String(n)===String(e)}/**
* @vue/reactivity v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let St;class yf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=St,!e&&St&&(this.index=(St.scopes||(St.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=St;try{return St=this,e()}finally{St=t}}}on(){++this._on===1&&(this.prevScope=St,St=this)}off(){if(this._on>0&&--this._on===0){if(St===this)St=this.prevScope;else{let e=St;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Tf(){return St}let tt;const Ws=new WeakSet;class Nc{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,St&&St.active&&St.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ws.has(this)&&(Ws.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Oc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fa(this),Bc(this);const e=tt,t=nn;tt=this,nn=!0;try{return this.fn()}finally{Hc(this),tt=e,nn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)aa(e);this.deps=this.depsTail=void 0,Fa(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ws.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Lo(this)&&this.run()}get dirty(){return Lo(this)}}let Fc=0,hr,dr;function Oc(n,e=!1){if(n.flags|=8,e){n.next=dr,dr=n;return}n.next=hr,hr=n}function sa(){Fc++}function oa(){if(--Fc>0)return;if(dr){let e=dr;for(dr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;hr;){let e=hr;for(hr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Bc(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Hc(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),aa(i),bf(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function Lo(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(zc(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function zc(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===xr)||(n.globalVersion=xr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Lo(n))))return;n.flags|=2;const e=n.dep,t=tt,i=nn;tt=n,nn=!0;try{Bc(n);const r=n.fn(n._value);(e.version===0||fn(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{tt=t,nn=i,Hc(n),n.flags&=-3}}function aa(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)aa(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function bf(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let nn=!0;const Gc=[];function Pn(){Gc.push(nn),nn=!1}function Ln(){const n=Gc.pop();nn=n===void 0?!0:n}function Fa(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=tt;tt=void 0;try{e()}finally{tt=t}}}let xr=0;class Af{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class la{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!tt||!nn||tt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==tt)t=this.activeLink=new Af(tt,this),tt.deps?(t.prevDep=tt.depsTail,tt.depsTail.nextDep=t,tt.depsTail=t):tt.deps=tt.depsTail=t,Vc(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=tt.depsTail,t.nextDep=void 0,tt.depsTail.nextDep=t,tt.depsTail=t,tt.deps===t&&(tt.deps=i)}return t}trigger(e){this.version++,xr++,this.notify(e)}notify(e){sa();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{oa()}}}function Vc(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Vc(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Do=new WeakMap,ci=Symbol(""),Uo=Symbol(""),Mr=Symbol("");function Et(n,e,t){if(nn&&tt){let i=Do.get(n);i||Do.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new la),r.map=i,r.key=t),r.track()}}function wn(n,e,t,i,r,s){const a=Do.get(n);if(!a){xr++;return}const o=l=>{l&&l.trigger()};if(sa(),e==="clear")a.forEach(o);else{const l=Be(n),c=l&&ta(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,d)=>{(d==="length"||d===Mr||!Yn(d)&&d>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(Mr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(ci)),ur(n)&&o(a.get(Uo)));break;case"delete":l||(o(a.get(ci)),ur(n)&&o(a.get(Uo)));break;case"set":ur(n)&&o(a.get(ci));break}}oa()}function Mi(n){const e=Ke(n);return e===n?e:(Et(e,"iterate",Mr),rn(n)?e:e.map(Dn))}function ca(n){return Et(n=Ke(n),"iterate",Mr),n}function ln(n,e){return jn(n)?Sr(zi(n)?Dn(e):e):Dn(e)}const wf={__proto__:null,[Symbol.iterator](){return ks(this,Symbol.iterator,n=>ln(this,n))},concat(...n){return Mi(this).concat(...n.map(e=>Be(e)?Mi(e):e))},entries(){return ks(this,"entries",n=>(n[1]=ln(this,n[1]),n))},every(n,e){return _n(this,"every",n,e,void 0,arguments)},filter(n,e){return _n(this,"filter",n,e,t=>t.map(i=>ln(this,i)),arguments)},find(n,e){return _n(this,"find",n,e,t=>ln(this,t),arguments)},findIndex(n,e){return _n(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return _n(this,"findLast",n,e,t=>ln(this,t),arguments)},findLastIndex(n,e){return _n(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return _n(this,"forEach",n,e,void 0,arguments)},includes(...n){return Xs(this,"includes",n)},indexOf(...n){return Xs(this,"indexOf",n)},join(n){return Mi(this).join(n)},lastIndexOf(...n){return Xs(this,"lastIndexOf",n)},map(n,e){return _n(this,"map",n,e,void 0,arguments)},pop(){return er(this,"pop")},push(...n){return er(this,"push",n)},reduce(n,...e){return Oa(this,"reduce",n,e)},reduceRight(n,...e){return Oa(this,"reduceRight",n,e)},shift(){return er(this,"shift")},some(n,e){return _n(this,"some",n,e,void 0,arguments)},splice(...n){return er(this,"splice",n)},toReversed(){return Mi(this).toReversed()},toSorted(n){return Mi(this).toSorted(n)},toSpliced(...n){return Mi(this).toSpliced(...n)},unshift(...n){return er(this,"unshift",n)},values(){return ks(this,"values",n=>ln(this,n))}};function ks(n,e,t){const i=ca(n),r=i[e]();return i!==n&&!rn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const Rf=Array.prototype;function _n(n,e,t,i,r,s){const a=ca(n),o=a!==n&&!rn(n),l=a[e];if(l!==Rf[e]){const f=l.apply(n,s);return o?Dn(f):f}let c=t;a!==n&&(o?c=function(f,d){return t.call(this,ln(n,f),d,n)}:t.length>2&&(c=function(f,d){return t.call(this,f,d,n)}));const u=l.call(a,c,i);return o&&r?r(u):u}function Oa(n,e,t,i){const r=ca(n),s=r!==n&&!rn(n);let a=t,o=!1;r!==n&&(s?(o=i.length===0,a=function(c,u,f){return o&&(o=!1,c=ln(n,c)),t.call(this,c,ln(n,u),f,n)}):t.length>3&&(a=function(c,u,f){return t.call(this,c,u,f,n)}));const l=r[e](a,...i);return o?ln(n,l):l}function Xs(n,e,t){const i=Ke(n);Et(i,"iterate",Mr);const r=i[e](...t);return(r===-1||r===!1)&&da(t[0])?(t[0]=Ke(t[0]),i[e](...t)):r}function er(n,e,t=[]){Pn(),sa();const i=Ke(n)[e].apply(n,t);return oa(),Ln(),i}const Cf=Qo("__proto__,__v_isRef,__isVue"),Wc=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Yn));function Pf(n){Yn(n)||(n=String(n));const e=Ke(this);return Et(e,"has",n),e.hasOwnProperty(n)}class kc{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?zf:jc:s?Yc:qc).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Be(e);if(!r){let l;if(a&&(l=wf[t]))return l;if(t==="hasOwnProperty")return Pf}const o=Reflect.get(e,t,yt(e)?e:i);if((Yn(t)?Wc.has(t):Cf(t))||(r||Et(e,"get",t),s))return o;if(yt(o)){const l=a&&ta(t)?o:o.value;return r&&rt(l)?No(l):l}return rt(o)?r?No(o):fa(o):o}}class Xc extends kc{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];const a=Be(e)&&ta(t);if(!this._isShallow){const c=jn(s);if(!rn(i)&&!jn(i)&&(s=Ke(s),i=Ke(i)),!a&&yt(s)&&!yt(i))return c||(s.value=i),!0}const o=a?Number(t)<e.length:$e(e,t),l=Reflect.set(e,t,i,yt(e)?e:r);return e===Ke(r)&&(o?fn(i,s)&&wn(e,"set",t,i):wn(e,"add",t,i)),l}deleteProperty(e,t){const i=$e(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&wn(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!Yn(t)||!Wc.has(t))&&Et(e,"has",t),i}ownKeys(e){return Et(e,"iterate",Be(e)?"length":ci),Reflect.ownKeys(e)}}class Lf extends kc{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Df=new Xc,Uf=new Lf,If=new Xc(!0);const Io=n=>n,Fr=n=>Reflect.getPrototypeOf(n);function Nf(n,e,t){return function(...i){const r=this.__v_raw,s=Ke(r),a=ur(s),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=r[n](...i),u=t?Io:e?Sr:Dn;return!e&&Et(s,"iterate",l?Uo:ci),mt(Object.create(c),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:o?[u(f[0]),u(f[1])]:u(f),done:d}}})}}function Or(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Ff(n,e){const t={get(r){const s=this.__v_raw,a=Ke(s),o=Ke(r);n||(fn(r,o)&&Et(a,"get",r),Et(a,"get",o));const{has:l}=Fr(a),c=e?Io:n?Sr:Dn;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!n&&Et(Ke(r),"iterate",ci),r.size},has(r){const s=this.__v_raw,a=Ke(s),o=Ke(r);return n||(fn(r,o)&&Et(a,"has",r),Et(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=Ke(o),c=e?Io:n?Sr:Dn;return!n&&Et(l,"iterate",ci),o.forEach((u,f)=>r.call(s,c(u),c(f),a))}};return mt(t,n?{add:Or("add"),set:Or("set"),delete:Or("delete"),clear:Or("clear")}:{add(r){const s=Ke(this),a=Fr(s),o=Ke(r),l=!e&&!rn(r)&&!jn(r)?o:r;return a.has.call(s,l)||fn(r,l)&&a.has.call(s,r)||fn(o,l)&&a.has.call(s,o)||(s.add(l),wn(s,"add",l,l)),this},set(r,s){!e&&!rn(s)&&!jn(s)&&(s=Ke(s));const a=Ke(this),{has:o,get:l}=Fr(a);let c=o.call(a,r);c||(r=Ke(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?fn(s,u)&&wn(a,"set",r,s):wn(a,"add",r,s),this},delete(r){const s=Ke(this),{has:a,get:o}=Fr(s);let l=a.call(s,r);l||(r=Ke(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&wn(s,"delete",r,void 0),c},clear(){const r=Ke(this),s=r.size!==0,a=r.clear();return s&&wn(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Nf(r,n,e)}),t}function ua(n,e){const t=Ff(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get($e(t,r)&&r in i?t:i,r,s)}const Of={get:ua(!1,!1)},Bf={get:ua(!1,!0)},Hf={get:ua(!0,!1)};const qc=new WeakMap,Yc=new WeakMap,jc=new WeakMap,zf=new WeakMap;function Gf(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Vf(n){return n.__v_skip||!Object.isExtensible(n)?0:Gf(ff(n))}function fa(n){return jn(n)?n:ha(n,!1,Df,Of,qc)}function Wf(n){return ha(n,!1,If,Bf,Yc)}function No(n){return ha(n,!0,Uf,Hf,jc)}function ha(n,e,t,i,r){if(!rt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=Vf(n);if(s===0)return n;const a=r.get(n);if(a)return a;const o=new Proxy(n,s===2?i:t);return r.set(n,o),o}function zi(n){return jn(n)?zi(n.__v_raw):!!(n&&n.__v_isReactive)}function jn(n){return!!(n&&n.__v_isReadonly)}function rn(n){return!!(n&&n.__v_isShallow)}function da(n){return n?!!n.__v_raw:!1}function Ke(n){const e=n&&n.__v_raw;return e?Ke(e):n}function kf(n){return!$e(n,"__v_skip")&&Object.isExtensible(n)&&Uc(n,"__v_skip",!0),n}const Dn=n=>rt(n)?fa(n):n,Sr=n=>rt(n)?No(n):n;function yt(n){return n?n.__v_isRef===!0:!1}function Xf(n){return qf(n,!1)}function qf(n,e){return yt(n)?n:new Yf(n,e)}class Yf{constructor(e,t){this.dep=new la,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Ke(e),this._value=t?e:Dn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||rn(e)||jn(e);e=i?e:Ke(e),fn(e,t)&&(this._rawValue=e,this._value=i?e:Dn(e),this.dep.trigger())}}function jf(n){return yt(n)?n.value:n}const Kf={get:(n,e,t)=>e==="__v_raw"?n:jf(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return yt(r)&&!yt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function Kc(n){return zi(n)?n:new Proxy(n,Kf)}class $f{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new la(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=xr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&tt!==this)return Oc(this,!0),!0}get value(){const e=this.dep.track();return zc(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Zf(n,e,t=!1){let i,r;return Ve(n)?i=n:(i=n.get,r=n.set),new $f(i,r,t)}const Br={},fs=new WeakMap;let ri;function Jf(n,e=!1,t=ri){if(t){let i=fs.get(t);i||fs.set(t,i=[]),i.push(n)}}function Qf(n,e,t=nt){const{immediate:i,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=t,c=y=>r?y:rn(y)||r===!1||r===0?Gn(y,1):Gn(y);let u,f,d,m,v=!1,g=!1;if(yt(n)?(f=()=>n.value,v=rn(n)):zi(n)?(f=()=>c(n),v=!0):Be(n)?(g=!0,v=n.some(y=>zi(y)||rn(y)),f=()=>n.map(y=>{if(yt(y))return y.value;if(zi(y))return c(y);if(Ve(y))return l?l(y,2):y()})):Ve(n)?e?f=l?()=>l(n,2):n:f=()=>{if(d){Pn();try{d()}finally{Ln()}}const y=ri;ri=u;try{return l?l(n,3,[m]):n(m)}finally{ri=y}}:f=en,e&&r){const y=f,R=r===!0?1/0:r;f=()=>Gn(y(),R)}const p=Tf(),h=()=>{u.stop(),p&&p.active&&ea(p.effects,u)};if(s&&e){const y=e;e=(...R)=>{y(...R),h()}}let b=g?new Array(n.length).fill(Br):Br;const E=y=>{if(!(!(u.flags&1)||!u.dirty&&!y))if(e){const R=u.run();if(r||v||(g?R.some((D,C)=>fn(D,b[C])):fn(R,b))){d&&d();const D=ri;ri=u;try{const C=[R,b===Br?void 0:g&&b[0]===Br?[]:b,m];b=R,l?l(e,3,C):e(...C)}finally{ri=D}}}else u.run()};return o&&o(E),u=new Nc(f),u.scheduler=a?()=>a(E,!1):E,m=y=>Jf(y,!1,u),d=u.onStop=()=>{const y=fs.get(u);if(y){if(l)l(y,4);else for(const R of y)R();fs.delete(u)}},e?i?E(!0):b=u.run():a?a(E.bind(null,!0),!0):u.run(),h.pause=u.pause.bind(u),h.resume=u.resume.bind(u),h.stop=h,h}function Gn(n,e=1/0,t){if(e<=0||!rt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,yt(n))Gn(n.value,e,t);else if(Be(n))for(let i=0;i<n.length;i++)Gn(n[i],e,t);else if(cf(n)||ur(n))n.forEach(i=>{Gn(i,e,t)});else if(hf(n)){for(const i in n)Gn(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Gn(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Rr(n,e,t,i){try{return i?n(...i):n()}catch(r){Rs(r,e,t)}}function pn(n,e,t,i){if(Ve(n)){const r=Rr(n,e,t,i);return r&&Lc(r)&&r.catch(s=>{Rs(s,e,t)}),r}if(Be(n)){const r=[];for(let s=0;s<n.length;s++)r.push(pn(n[s],e,t,i));return r}}function Rs(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||nt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(s){Pn(),Rr(s,null,10,[n,l,c]),Ln();return}}eh(n,t,r,i,a)}function eh(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const Ct=[];let an=-1;const Gi=[];let zn=null,Oi=0;const $c=Promise.resolve();let hs=null;function th(n){const e=hs||$c;return n?e.then(this?n.bind(this):n):e}function nh(n){let e=an+1,t=Ct.length;for(;e<t;){const i=e+t>>>1,r=Ct[i],s=Er(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function pa(n){if(!(n.flags&1)){const e=Er(n),t=Ct[Ct.length-1];!t||!(n.flags&2)&&e>=Er(t)?Ct.push(n):Ct.splice(nh(e),0,n),n.flags|=1,Zc()}}function Zc(){hs||(hs=$c.then(Qc))}function ih(n){Be(n)?Gi.push(...n):zn&&n.id===-1?zn.splice(Oi+1,0,n):n.flags&1||(Gi.push(n),n.flags|=1),Zc()}function Ba(n,e,t=an+1){for(;t<Ct.length;t++){const i=Ct[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Ct.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Jc(n){if(Gi.length){const e=[...new Set(Gi)].sort((t,i)=>Er(t)-Er(i));if(Gi.length=0,zn){zn.push(...e);return}for(zn=e,Oi=0;Oi<zn.length;Oi++){const t=zn[Oi];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}zn=null,Oi=0}}const Er=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Qc(n){const e=en;try{for(an=0;an<Ct.length;an++){const t=Ct[an];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Rr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;an<Ct.length;an++){const t=Ct[an];t&&(t.flags&=-2)}an=-1,Ct.length=0,Jc(),hs=null,(Ct.length||Gi.length)&&Qc()}}let hn=null,eu=null;function ds(n){const e=hn;return hn=n,eu=n&&n.type.__scopeId||null,e}function rh(n,e=hn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&ja(-1);const s=ds(e);let a;try{a=n(...r)}finally{ds(s),i._d&&ja(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Jn(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(Pn(),pn(l,t,8,[n.el,o,n,e]),Ln())}}function sh(n,e){if(Pt){let t=Pt.provides;const i=Pt.parent&&Pt.parent.provides;i===t&&(t=Pt.provides=Object.create(i)),t[n]=e}}function ls(n,e,t=!1){const i=od();if(i||Vi){let r=Vi?Vi._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Ve(e)?e.call(i&&i.proxy):e}}const oh=Symbol.for("v-scx"),ah=()=>ls(oh);function qs(n,e,t){return tu(n,e,t)}function tu(n,e,t=nt){const{immediate:i,deep:r,flush:s,once:a}=t,o=mt({},t),l=e&&i||!e&&s!=="post";let c;if(Tr){if(s==="sync"){const m=ah();c=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=en,m.resume=en,m.pause=en,m}}const u=Pt;o.call=(m,v,g)=>pn(m,u,v,g);let f=!1;s==="post"?o.scheduler=m=>{Dt(m,u&&u.suspense)}:s!=="sync"&&(f=!0,o.scheduler=(m,v)=>{v?m():pa(m)}),o.augmentJob=m=>{e&&(m.flags|=4),f&&(m.flags|=2,u&&(m.id=u.uid,m.i=u))};const d=Qf(n,e,o);return Tr&&(c?c.push(d):l&&d()),d}function lh(n,e,t){const i=this.proxy,r=ut(n)?n.includes(".")?nu(i,n):()=>i[n]:n.bind(i,i);let s;Ve(e)?s=e:(s=e.handler,t=e);const a=Cr(this),o=tu(r,s.bind(i),t);return a(),o}function nu(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const ch=Symbol("_vte"),uh=n=>n.__isTeleport,fh=Symbol("_leaveCb");function ma(n,e){n.shapeFlag&6&&n.component?(n.transition=e,ma(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function iu(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Ha(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const ps=new WeakMap;function pr(n,e,t,i,r=!1){if(Be(n)){n.forEach((g,p)=>pr(g,e&&(Be(e)?e[p]:e),t,i,r));return}if(mr(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&pr(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?Sa(i.component):i.el,a=r?null:s,{i:o,r:l}=n,c=e&&e.r,u=o.refs===nt?o.refs={}:o.refs,f=o.setupState,d=Ke(f),m=f===nt?Pc:g=>Ha(u,g)?!1:$e(d,g),v=(g,p)=>!(p&&Ha(u,p));if(c!=null&&c!==l){if(za(e),ut(c))u[c]=null,m(c)&&(f[c]=null);else if(yt(c)){const g=e;v(c,g.k)&&(c.value=null),g.k&&(u[g.k]=null)}}if(Ve(l))Rr(l,o,12,[a,u]);else{const g=ut(l),p=yt(l);if(g||p){const h=()=>{if(n.f){const b=g?m(l)?f[l]:u[l]:v()||!n.k?l.value:u[n.k];if(r)Be(b)&&ea(b,s);else if(Be(b))b.includes(s)||b.push(s);else if(g)u[l]=[s],m(l)&&(f[l]=u[l]);else{const E=[s];v(l,n.k)&&(l.value=E),n.k&&(u[n.k]=E)}}else g?(u[l]=a,m(l)&&(f[l]=a)):p&&(v(l,n.k)&&(l.value=a),n.k&&(u[n.k]=a))};if(a){const b=()=>{h(),ps.delete(n)};b.id=-1,ps.set(n,b),Dt(b,t)}else za(n),h()}}}function za(n){const e=ps.get(n);e&&(e.flags|=8,ps.delete(n))}ws().requestIdleCallback;ws().cancelIdleCallback;const mr=n=>!!n.type.__asyncLoader,ru=n=>n.type.__isKeepAlive;function hh(n,e){su(n,"a",e)}function dh(n,e){su(n,"da",e)}function su(n,e,t=Pt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Cs(e,i,t),t){let r=t.parent;for(;r&&r.parent;)ru(r.parent.vnode)&&ph(i,e,t,r),r=r.parent}}function ph(n,e,t,i){const r=Cs(e,n,i,!0);_a(()=>{ea(i[e],r)},t)}function Cs(n,e,t=Pt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...a)=>{Pn();const o=Cr(t),l=pn(e,t,n,a);return o(),Ln(),l});return i?r.unshift(s):r.push(s),s}}const In=n=>(e,t=Pt)=>{(!Tr||n==="sp")&&Cs(n,(...i)=>e(...i),t)},mh=In("bm"),ou=In("m"),_h=In("bu"),gh=In("u"),vh=In("bum"),_a=In("um"),xh=In("sp"),Mh=In("rtg"),Sh=In("rtc");function Eh(n,e=Pt){Cs("ec",n,e)}const yh=Symbol.for("v-ndc"),Fo=n=>n?bu(n)?Sa(n):Fo(n.parent):null,_r=mt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Fo(n.parent),$root:n=>Fo(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>ga(n),$forceUpdate:n=>n.f||(n.f=()=>{pa(n.update)}),$nextTick:n=>n.n||(n.n=th.bind(n.proxy)),$watch:n=>lh.bind(n)}),Ys=(n,e)=>n!==nt&&!n.__isScriptSetup&&$e(n,e),Th={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const d=a[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Ys(i,e))return a[e]=1,i[e];if(r!==nt&&$e(r,e))return a[e]=2,r[e];if($e(s,e))return a[e]=3,s[e];if(t!==nt&&$e(t,e))return a[e]=4,t[e];Oo&&(a[e]=0)}}const c=_r[e];let u,f;if(c)return e==="$attrs"&&Et(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==nt&&$e(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,$e(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return Ys(r,e)?(r[e]=t,!0):i!==nt&&$e(i,e)?(i[e]=t,!0):$e(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,props:s,type:a}},o){let l;return!!(t[o]||n!==nt&&o[0]!=="$"&&$e(n,o)||Ys(e,o)||$e(s,o)||$e(i,o)||$e(_r,o)||$e(r.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:$e(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Ga(n){return Be(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Oo=!0;function bh(n){const e=ga(n),t=n.proxy,i=n.ctx;Oo=!1,e.beforeCreate&&Va(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:m,updated:v,activated:g,deactivated:p,beforeDestroy:h,beforeUnmount:b,destroyed:E,unmounted:y,render:R,renderTracked:D,renderTriggered:C,errorCaptured:V,serverPrefetch:x,expose:A,inheritAttrs:J,components:oe,directives:ue,filters:U}=e;if(c&&Ah(c,i,null),a)for(const z in a){const ie=a[z];Ve(ie)&&(i[z]=ie.bind(t))}if(r){const z=r.call(t,t);rt(z)&&(n.data=fa(z))}if(Oo=!0,s)for(const z in s){const ie=s[z],ae=Ve(ie)?ie.bind(t,t):Ve(ie.get)?ie.get.bind(t,t):en,se=!Ve(ie)&&Ve(ie.set)?ie.set.bind(t):en,I=hd({get:ae,set:se});Object.defineProperty(i,z,{enumerable:!0,configurable:!0,get:()=>I.value,set:W=>I.value=W})}if(o)for(const z in o)au(o[z],i,t,z);if(l){const z=Ve(l)?l.call(t):l;Reflect.ownKeys(z).forEach(ie=>{sh(ie,z[ie])})}u&&Va(u,n,"c");function Z(z,ie){Be(ie)?ie.forEach(ae=>z(ae.bind(t))):ie&&z(ie.bind(t))}if(Z(mh,f),Z(ou,d),Z(_h,m),Z(gh,v),Z(hh,g),Z(dh,p),Z(Eh,V),Z(Sh,D),Z(Mh,C),Z(vh,b),Z(_a,y),Z(xh,x),Be(A))if(A.length){const z=n.exposed||(n.exposed={});A.forEach(ie=>{Object.defineProperty(z,ie,{get:()=>t[ie],set:ae=>t[ie]=ae,enumerable:!0})})}else n.exposed||(n.exposed={});R&&n.render===en&&(n.render=R),J!=null&&(n.inheritAttrs=J),oe&&(n.components=oe),ue&&(n.directives=ue),x&&iu(n)}function Ah(n,e,t=en){Be(n)&&(n=Bo(n));for(const i in n){const r=n[i];let s;rt(r)?"default"in r?s=ls(r.from||i,r.default,!0):s=ls(r.from||i):s=ls(r),yt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[i]=s}}function Va(n,e,t){pn(Be(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function au(n,e,t,i){let r=i.includes(".")?nu(t,i):()=>t[i];if(ut(n)){const s=e[n];Ve(s)&&qs(r,s)}else if(Ve(n))qs(r,n.bind(t));else if(rt(n))if(Be(n))n.forEach(s=>au(s,e,t,i));else{const s=Ve(n.handler)?n.handler.bind(t):e[n.handler];Ve(s)&&qs(r,s,n)}}function ga(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=n.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>ms(l,c,a,!0)),ms(l,e,a)),rt(e)&&s.set(e,l),l}function ms(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&ms(n,s,t,!0),r&&r.forEach(a=>ms(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=wh[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const wh={data:Wa,props:ka,emits:ka,methods:ar,computed:ar,beforeCreate:At,created:At,beforeMount:At,mounted:At,beforeUpdate:At,updated:At,beforeDestroy:At,beforeUnmount:At,destroyed:At,unmounted:At,activated:At,deactivated:At,errorCaptured:At,serverPrefetch:At,components:ar,directives:ar,watch:Ch,provide:Wa,inject:Rh};function Wa(n,e){return e?n?function(){return mt(Ve(n)?n.call(this,this):n,Ve(e)?e.call(this,this):e)}:e:n}function Rh(n,e){return ar(Bo(n),Bo(e))}function Bo(n){if(Be(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function At(n,e){return n?[...new Set([].concat(n,e))]:e}function ar(n,e){return n?mt(Object.create(null),n,e):e}function ka(n,e){return n?Be(n)&&Be(e)?[...new Set([...n,...e])]:mt(Object.create(null),Ga(n),Ga(e??{})):e}function Ch(n,e){if(!n)return e;if(!e)return n;const t=mt(Object.create(null),n);for(const i in e)t[i]=At(n[i],e[i]);return t}function lu(){return{app:null,config:{isNativeTag:Pc,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ph=0;function Lh(n,e){return function(i,r=null){Ve(i)||(i=mt({},i)),r!=null&&!rt(r)&&(r=null);const s=lu(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:Ph++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:dd,get config(){return s.config},set config(u){},use(u,...f){return a.has(u)||(u&&Ve(u.install)?(a.add(u),u.install(c,...f)):Ve(u)&&(a.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const m=c._ceVNode||ui(i,r);return m.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),f&&e?e(m,u):n(m,u,d),l=!0,c._container=u,u.__vue_app__=c,Sa(m.component)}},onUnmount(u){o.push(u)},unmount(){l&&(pn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Vi;Vi=c;try{return u()}finally{Vi=f}}};return c}}let Vi=null;const Dh=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${tn(e)}Modifiers`]||n[`${vi(e)}Modifiers`];function Uh(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||nt;let r=t;const s=e.startsWith("update:"),a=s&&Dh(i,e.slice(7));a&&(a.trim&&(r=t.map(u=>ut(u)?u.trim():u)),a.number&&(r=t.map(mf)));let o,l=i[o=Gs(e)]||i[o=Gs(tn(e))];!l&&s&&(l=i[o=Gs(vi(e))]),l&&pn(l,n,6,r);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,pn(c,n,6,r)}}const Ih=new WeakMap;function cu(n,e,t=!1){const i=t?Ih:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let a={},o=!1;if(!Ve(n)){const l=c=>{const u=cu(c,e,!0);u&&(o=!0,mt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!o?(rt(n)&&i.set(n,null),null):(Be(s)?s.forEach(l=>a[l]=null):mt(a,s),rt(n)&&i.set(n,a),a)}function Ps(n,e){return!n||!Ts(e)?!1:(e=e.slice(2).replace(/Once$/,""),$e(n,e[0].toLowerCase()+e.slice(1))||$e(n,vi(e))||$e(n,e))}function js(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:d,setupState:m,ctx:v,inheritAttrs:g}=n,p=ds(n);let h,b;try{if(t.shapeFlag&4){const y=r||i,R=y;h=cn(c.call(R,y,u,f,m,d,v)),b=o}else{const y=e;h=cn(y.length>1?y(f,{attrs:o,slots:a,emit:l}):y(f,null)),b=e.props?o:Nh(o)}}catch(y){gr.length=0,Rs(y,n,1),h=ui(Xi)}let E=h;if(b&&g!==!1){const y=Object.keys(b),{shapeFlag:R}=E;y.length&&R&7&&(s&&y.some(bs)&&(b=Fh(b,s)),E=qi(E,b,!1,!0))}return t.dirs&&(E=qi(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(t.dirs):t.dirs),t.transition&&ma(E,t.transition),h=E,ds(p),h}const Nh=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ts(t))&&((e||(e={}))[t]=n[t]);return e},Fh=(n,e)=>{const t={};for(const i in n)(!bs(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Oh(n,e,t){const{props:i,children:r,component:s}=n,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Xa(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(uu(a,i,d)&&!Ps(c,d))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Xa(i,a,c):!0:!!a;return!1}function Xa(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(uu(e,n,s)&&!Ps(t,s))return!0}return!1}function uu(n,e,t){const i=n[t],r=e[t];return t==="style"&&rt(i)&&rt(r)?!ra(i,r):i!==r}function Bh({vnode:n,parent:e,suspense:t},i){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.suspense.vnode.el=r.el=i,n=r),r===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const fu={},hu=()=>Object.create(fu),du=n=>Object.getPrototypeOf(n)===fu;function Hh(n,e,t,i=!1){const r={},s=hu();n.propsDefaults=Object.create(null),pu(n,e,r,s);for(const a in n.propsOptions[0])a in r||(r[a]=void 0);t?n.props=i?r:Wf(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function zh(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=n,o=Ke(r),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Ps(n.emitsOptions,d))continue;const m=e[d];if(l)if($e(s,d))m!==s[d]&&(s[d]=m,c=!0);else{const v=tn(d);r[v]=Ho(l,o,v,m,n,!1)}else m!==s[d]&&(s[d]=m,c=!0)}}}else{pu(n,e,r,s)&&(c=!0);let u;for(const f in o)(!e||!$e(e,f)&&((u=vi(f))===f||!$e(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Ho(l,o,f,void 0,n,!0)):delete r[f]);if(s!==o)for(const f in s)(!e||!$e(e,f))&&(delete s[f],c=!0)}c&&wn(n.attrs,"set","")}function pu(n,e,t,i){const[r,s]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(fr(l))continue;const c=e[l];let u;r&&$e(r,u=tn(l))?!s||!s.includes(u)?t[u]=c:(o||(o={}))[u]=c:Ps(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=Ke(t),c=o||nt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Ho(r,l,f,c[f],n,!$e(c,f))}}return a}function Ho(n,e,t,i,r,s){const a=n[t];if(a!=null){const o=$e(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Ve(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=Cr(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===vi(t))&&(i=!0))}return i}const Gh=new WeakMap;function mu(n,e,t=!1){const i=t?Gh:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,a={},o=[];let l=!1;if(!Ve(n)){const u=f=>{l=!0;const[d,m]=mu(f,e,!0);mt(a,d),m&&o.push(...m)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return rt(n)&&i.set(n,Hi),Hi;if(Be(s))for(let u=0;u<s.length;u++){const f=tn(s[u]);qa(f)&&(a[f]=nt)}else if(s)for(const u in s){const f=tn(u);if(qa(f)){const d=s[u],m=a[f]=Be(d)||Ve(d)?{type:d}:mt({},d),v=m.type;let g=!1,p=!0;if(Be(v))for(let h=0;h<v.length;++h){const b=v[h],E=Ve(b)&&b.name;if(E==="Boolean"){g=!0;break}else E==="String"&&(p=!1)}else g=Ve(v)&&v.name==="Boolean";m[0]=g,m[1]=p,(g||$e(m,"default"))&&o.push(f)}}const c=[a,o];return rt(n)&&i.set(n,c),c}function qa(n){return n[0]!=="$"&&!fr(n)}const va=n=>n==="_"||n==="_ctx"||n==="$stable",xa=n=>Be(n)?n.map(cn):[cn(n)],Vh=(n,e,t)=>{if(e._n)return e;const i=rh((...r)=>xa(e(...r)),t);return i._c=!1,i},_u=(n,e,t)=>{const i=n._ctx;for(const r in n){if(va(r))continue;const s=n[r];if(Ve(s))e[r]=Vh(r,s,i);else if(s!=null){const a=xa(s);e[r]=()=>a}}},gu=(n,e)=>{const t=xa(e);n.slots.default=()=>t},vu=(n,e,t)=>{for(const i in e)(t||!va(i))&&(n[i]=e[i])},Wh=(n,e,t)=>{const i=n.slots=hu();if(n.vnode.shapeFlag&32){const r=e._;r?(vu(i,e,t),t&&Uc(i,"_",r,!0)):_u(e,i)}else e&&gu(n,e)},kh=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,a=nt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?s=!1:vu(r,e,t):(s=!e.$stable,_u(e,r)),a=e}else e&&(gu(n,e),a={default:1});if(s)for(const o in r)!va(o)&&a[o]==null&&delete r[o]},Dt=Kh;function Xh(n){return qh(n)}function qh(n,e){const t=ws();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:m=en,insertStaticContent:v}=n,g=(T,w,N,H=null,K=null,k=null,te=void 0,re=null,le=!!w.dynamicChildren)=>{if(T===w)return;T&&!tr(T,w)&&(H=He(T),W(T,K,k,!0),T=null),w.patchFlag===-2&&(le=!1,w.dynamicChildren=null);const{type:ee,ref:M,shapeFlag:_}=w;switch(ee){case Ls:p(T,w,N,H);break;case Xi:h(T,w,N,H);break;case $s:T==null&&b(w,N,H,te);break;case bn:oe(T,w,N,H,K,k,te,re,le);break;default:_&1?R(T,w,N,H,K,k,te,re,le):_&6?ue(T,w,N,H,K,k,te,re,le):(_&64||_&128)&&ee.process(T,w,N,H,K,k,te,re,le,Ze)}M!=null&&K?pr(M,T&&T.ref,k,w||T,!w):M==null&&T&&T.ref!=null&&pr(T.ref,null,k,T,!0)},p=(T,w,N,H)=>{if(T==null)i(w.el=o(w.children),N,H);else{const K=w.el=T.el;w.children!==T.children&&c(K,w.children)}},h=(T,w,N,H)=>{T==null?i(w.el=l(w.children||""),N,H):w.el=T.el},b=(T,w,N,H)=>{[T.el,T.anchor]=v(T.children,w,N,H,T.el,T.anchor)},E=({el:T,anchor:w},N,H)=>{let K;for(;T&&T!==w;)K=d(T),i(T,N,H),T=K;i(w,N,H)},y=({el:T,anchor:w})=>{let N;for(;T&&T!==w;)N=d(T),r(T),T=N;r(w)},R=(T,w,N,H,K,k,te,re,le)=>{if(w.type==="svg"?te="svg":w.type==="math"&&(te="mathml"),T==null)D(w,N,H,K,k,te,re,le);else{const ee=T.el&&T.el._isVueCE?T.el:null;try{ee&&ee._beginPatch(),x(T,w,K,k,te,re,le)}finally{ee&&ee._endPatch()}}},D=(T,w,N,H,K,k,te,re)=>{let le,ee;const{props:M,shapeFlag:_,transition:P,dirs:q}=T;if(le=T.el=a(T.type,k,M&&M.is,M),_&8?u(le,T.children):_&16&&V(T.children,le,null,H,K,Ks(T,k),te,re),q&&Jn(T,null,H,"created"),C(le,T,T.scopeId,te,H),M){for(const ne in M)ne!=="value"&&!fr(ne)&&s(le,ne,null,M[ne],k,H);"value"in M&&s(le,"value",null,M.value,k),(ee=M.onVnodeBeforeMount)&&on(ee,H,T)}q&&Jn(T,null,H,"beforeMount");const $=Yh(K,P);$&&P.beforeEnter(le),i(le,w,N),((ee=M&&M.onVnodeMounted)||$||q)&&Dt(()=>{try{ee&&on(ee,H,T),$&&P.enter(le),q&&Jn(T,null,H,"mounted")}finally{}},K)},C=(T,w,N,H,K)=>{if(N&&m(T,N),H)for(let k=0;k<H.length;k++)m(T,H[k]);if(K){let k=K.subTree;if(w===k||Eu(k.type)&&(k.ssContent===w||k.ssFallback===w)){const te=K.vnode;C(T,te,te.scopeId,te.slotScopeIds,K.parent)}}},V=(T,w,N,H,K,k,te,re,le=0)=>{for(let ee=le;ee<T.length;ee++){const M=T[ee]=re?An(T[ee]):cn(T[ee]);g(null,M,w,N,H,K,k,te,re)}},x=(T,w,N,H,K,k,te)=>{const re=w.el=T.el;let{patchFlag:le,dynamicChildren:ee,dirs:M}=w;le|=T.patchFlag&16;const _=T.props||nt,P=w.props||nt;let q;if(N&&Qn(N,!1),(q=P.onVnodeBeforeUpdate)&&on(q,N,w,T),M&&Jn(w,T,N,"beforeUpdate"),N&&Qn(N,!0),(_.innerHTML&&P.innerHTML==null||_.textContent&&P.textContent==null)&&u(re,""),ee?A(T.dynamicChildren,ee,re,N,H,Ks(w,K),k):te||ie(T,w,re,null,N,H,Ks(w,K),k,!1),le>0){if(le&16)J(re,_,P,N,K);else if(le&2&&_.class!==P.class&&s(re,"class",null,P.class,K),le&4&&s(re,"style",_.style,P.style,K),le&8){const $=w.dynamicProps;for(let ne=0;ne<$.length;ne++){const pe=$[ne],ce=_[pe],he=P[pe];(he!==ce||pe==="value")&&s(re,pe,ce,he,K,N)}}le&1&&T.children!==w.children&&u(re,w.children)}else!te&&ee==null&&J(re,_,P,N,K);((q=P.onVnodeUpdated)||M)&&Dt(()=>{q&&on(q,N,w,T),M&&Jn(w,T,N,"updated")},H)},A=(T,w,N,H,K,k,te)=>{for(let re=0;re<w.length;re++){const le=T[re],ee=w[re],M=le.el&&(le.type===bn||!tr(le,ee)||le.shapeFlag&198)?f(le.el):N;g(le,ee,M,null,H,K,k,te,!0)}},J=(T,w,N,H,K)=>{if(w!==N){if(w!==nt)for(const k in w)!fr(k)&&!(k in N)&&s(T,k,w[k],null,K,H);for(const k in N){if(fr(k))continue;const te=N[k],re=w[k];te!==re&&k!=="value"&&s(T,k,re,te,K,H)}"value"in N&&s(T,"value",w.value,N.value,K)}},oe=(T,w,N,H,K,k,te,re,le)=>{const ee=w.el=T?T.el:o(""),M=w.anchor=T?T.anchor:o("");let{patchFlag:_,dynamicChildren:P,slotScopeIds:q}=w;q&&(re=re?re.concat(q):q),T==null?(i(ee,N,H),i(M,N,H),V(w.children||[],N,M,K,k,te,re,le)):_>0&&_&64&&P&&T.dynamicChildren&&T.dynamicChildren.length===P.length?(A(T.dynamicChildren,P,N,K,k,te,re),(w.key!=null||K&&w===K.subTree)&&xu(T,w,!0)):ie(T,w,N,M,K,k,te,re,le)},ue=(T,w,N,H,K,k,te,re,le)=>{w.slotScopeIds=re,T==null?w.shapeFlag&512?K.ctx.activate(w,N,H,te,le):U(w,N,H,K,k,te,le):j(T,w,le)},U=(T,w,N,H,K,k,te)=>{const re=T.component=sd(T,H,K);if(ru(T)&&(re.ctx.renderer=Ze),ad(re,!1,te),re.asyncDep){if(K&&K.registerDep(re,Z,te),!T.el){const le=re.subTree=ui(Xi);h(null,le,w,N),T.placeholder=le.el}}else Z(re,T,w,N,K,k,te)},j=(T,w,N)=>{const H=w.component=T.component;if(Oh(T,w,N))if(H.asyncDep&&!H.asyncResolved){z(H,w,N);return}else H.next=w,H.update();else w.el=T.el,H.vnode=w},Z=(T,w,N,H,K,k,te)=>{const re=()=>{if(T.isMounted){let{next:_,bu:P,u:q,parent:$,vnode:ne}=T;{const De=Mu(T);if(De){_&&(_.el=ne.el,z(T,_,te)),De.asyncDep.then(()=>{Dt(()=>{T.isUnmounted||ee()},K)});return}}let pe=_,ce;Qn(T,!1),_?(_.el=ne.el,z(T,_,te)):_=ne,P&&Vs(P),(ce=_.props&&_.props.onVnodeBeforeUpdate)&&on(ce,$,_,ne),Qn(T,!0);const he=js(T),ye=T.subTree;T.subTree=he,g(ye,he,f(ye.el),He(ye),T,K,k),_.el=he.el,pe===null&&Bh(T,he.el),q&&Dt(q,K),(ce=_.props&&_.props.onVnodeUpdated)&&Dt(()=>on(ce,$,_,ne),K)}else{let _;const{el:P,props:q}=w,{bm:$,m:ne,parent:pe,root:ce,type:he}=T,ye=mr(w);if(Qn(T,!1),$&&Vs($),!ye&&(_=q&&q.onVnodeBeforeMount)&&on(_,pe,w),Qn(T,!0),P&&O){const De=()=>{T.subTree=js(T),O(P,T.subTree,T,K,null)};ye&&he.__asyncHydrate?he.__asyncHydrate(P,T,De):De()}else{ce.ce&&ce.ce._hasShadowRoot()&&ce.ce._injectChildStyle(he,T.parent?T.parent.type:void 0);const De=T.subTree=js(T);g(null,De,N,H,T,K,k),w.el=De.el}if(ne&&Dt(ne,K),!ye&&(_=q&&q.onVnodeMounted)){const De=w;Dt(()=>on(_,pe,De),K)}(w.shapeFlag&256||pe&&mr(pe.vnode)&&pe.vnode.shapeFlag&256)&&T.a&&Dt(T.a,K),T.isMounted=!0,w=N=H=null}};T.scope.on();const le=T.effect=new Nc(re);T.scope.off();const ee=T.update=le.run.bind(le),M=T.job=le.runIfDirty.bind(le);M.i=T,M.id=T.uid,le.scheduler=()=>pa(M),Qn(T,!0),ee()},z=(T,w,N)=>{w.component=T;const H=T.vnode.props;T.vnode=w,T.next=null,zh(T,w.props,H,N),kh(T,w.children,N),Pn(),Ba(T),Ln()},ie=(T,w,N,H,K,k,te,re,le=!1)=>{const ee=T&&T.children,M=T?T.shapeFlag:0,_=w.children,{patchFlag:P,shapeFlag:q}=w;if(P>0){if(P&128){se(ee,_,N,H,K,k,te,re,le);return}else if(P&256){ae(ee,_,N,H,K,k,te,re,le);return}}q&8?(M&16&&Re(ee,K,k),_!==ee&&u(N,_)):M&16?q&16?se(ee,_,N,H,K,k,te,re,le):Re(ee,K,k,!0):(M&8&&u(N,""),q&16&&V(_,N,H,K,k,te,re,le))},ae=(T,w,N,H,K,k,te,re,le)=>{T=T||Hi,w=w||Hi;const ee=T.length,M=w.length,_=Math.min(ee,M);let P;for(P=0;P<_;P++){const q=w[P]=le?An(w[P]):cn(w[P]);g(T[P],q,N,null,K,k,te,re,le)}ee>M?Re(T,K,k,!0,!1,_):V(w,N,H,K,k,te,re,le,_)},se=(T,w,N,H,K,k,te,re,le)=>{let ee=0;const M=w.length;let _=T.length-1,P=M-1;for(;ee<=_&&ee<=P;){const q=T[ee],$=w[ee]=le?An(w[ee]):cn(w[ee]);if(tr(q,$))g(q,$,N,null,K,k,te,re,le);else break;ee++}for(;ee<=_&&ee<=P;){const q=T[_],$=w[P]=le?An(w[P]):cn(w[P]);if(tr(q,$))g(q,$,N,null,K,k,te,re,le);else break;_--,P--}if(ee>_){if(ee<=P){const q=P+1,$=q<M?w[q].el:H;for(;ee<=P;)g(null,w[ee]=le?An(w[ee]):cn(w[ee]),N,$,K,k,te,re,le),ee++}}else if(ee>P)for(;ee<=_;)W(T[ee],K,k,!0),ee++;else{const q=ee,$=ee,ne=new Map;for(ee=$;ee<=P;ee++){const Te=w[ee]=le?An(w[ee]):cn(w[ee]);Te.key!=null&&ne.set(Te.key,ee)}let pe,ce=0;const he=P-$+1;let ye=!1,De=0;const fe=new Array(he);for(ee=0;ee<he;ee++)fe[ee]=0;for(ee=q;ee<=_;ee++){const Te=T[ee];if(ce>=he){W(Te,K,k,!0);continue}let be;if(Te.key!=null)be=ne.get(Te.key);else for(pe=$;pe<=P;pe++)if(fe[pe-$]===0&&tr(Te,w[pe])){be=pe;break}be===void 0?W(Te,K,k,!0):(fe[be-$]=ee+1,be>=De?De=be:ye=!0,g(Te,w[be],N,null,K,k,te,re,le),ce++)}const Ye=ye?jh(fe):Hi;for(pe=Ye.length-1,ee=he-1;ee>=0;ee--){const Te=$+ee,be=w[Te],we=w[Te+1],xe=Te+1<M?we.el||Su(we):H;fe[ee]===0?g(null,be,N,xe,K,k,te,re,le):ye&&(pe<0||ee!==Ye[pe]?I(be,N,xe,2):pe--)}}},I=(T,w,N,H,K=null)=>{const{el:k,type:te,transition:re,children:le,shapeFlag:ee}=T;if(ee&6){I(T.component.subTree,w,N,H);return}if(ee&128){T.suspense.move(w,N,H);return}if(ee&64){te.move(T,w,N,Ze);return}if(te===bn){i(k,w,N);for(let _=0;_<le.length;_++)I(le[_],w,N,H);i(T.anchor,w,N);return}if(te===$s){E(T,w,N);return}if(H!==2&&ee&1&&re)if(H===0)re.beforeEnter(k),i(k,w,N),Dt(()=>re.enter(k),K);else{const{leave:_,delayLeave:P,afterLeave:q}=re,$=()=>{T.ctx.isUnmounted?r(k):i(k,w,N)},ne=()=>{k._isLeaving&&k[fh](!0),_(k,()=>{$(),q&&q()})};P?P(k,$,ne):ne()}else i(k,w,N)},W=(T,w,N,H=!1,K=!1)=>{const{type:k,props:te,ref:re,children:le,dynamicChildren:ee,shapeFlag:M,patchFlag:_,dirs:P,cacheIndex:q,memo:$}=T;if(_===-2&&(K=!1),re!=null&&(Pn(),pr(re,null,N,T,!0),Ln()),q!=null&&(w.renderCache[q]=void 0),M&256){w.ctx.deactivate(T);return}const ne=M&1&&P,pe=!mr(T);let ce;if(pe&&(ce=te&&te.onVnodeBeforeUnmount)&&on(ce,w,T),M&6)Ee(T.component,N,H);else{if(M&128){T.suspense.unmount(N,H);return}ne&&Jn(T,null,w,"beforeUnmount"),M&64?T.type.remove(T,w,N,Ze,H):ee&&!ee.hasOnce&&(k!==bn||_>0&&_&64)?Re(ee,w,N,!1,!0):(k===bn&&_&384||!K&&M&16)&&Re(le,w,N),H&&ge(T)}const he=$!=null&&q==null;(pe&&(ce=te&&te.onVnodeUnmounted)||ne||he)&&Dt(()=>{ce&&on(ce,w,T),ne&&Jn(T,null,w,"unmounted"),he&&(T.el=null)},N)},ge=T=>{const{type:w,el:N,anchor:H,transition:K}=T;if(w===bn){Me(N,H);return}if(w===$s){y(T);return}const k=()=>{r(N),K&&!K.persisted&&K.afterLeave&&K.afterLeave()};if(T.shapeFlag&1&&K&&!K.persisted){const{leave:te,delayLeave:re}=K,le=()=>te(N,k);re?re(T.el,k,le):le()}else k()},Me=(T,w)=>{let N;for(;T!==w;)N=d(T),r(T),T=N;r(w)},Ee=(T,w,N)=>{const{bum:H,scope:K,job:k,subTree:te,um:re,m:le,a:ee}=T;Ya(le),Ya(ee),H&&Vs(H),K.stop(),k&&(k.flags|=8,W(te,T,w,N)),re&&Dt(re,w),Dt(()=>{T.isUnmounted=!0},w)},Re=(T,w,N,H=!1,K=!1,k=0)=>{for(let te=k;te<T.length;te++)W(T[te],w,N,H,K)},He=T=>{if(T.shapeFlag&6)return He(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const w=d(T.anchor||T.el),N=w&&w[ch];return N?d(N):w};let Le=!1;const Ie=(T,w,N)=>{let H;T==null?w._vnode&&(W(w._vnode,null,null,!0),H=w._vnode.component):g(w._vnode||null,T,w,null,null,null,N),w._vnode=T,Le||(Le=!0,Ba(H),Jc(),Le=!1)},Ze={p:g,um:W,m:I,r:ge,mt:U,mc:V,pc:ie,pbc:A,n:He,o:n};let Ne,O;return e&&([Ne,O]=e(Ze)),{render:Ie,hydrate:Ne,createApp:Lh(Ie,Ne)}}function Ks({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Qn({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Yh(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function xu(n,e,t=!1){const i=n.children,r=e.children;if(Be(i)&&Be(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=An(r[s]),o.el=a.el),!t&&o.patchFlag!==-2&&xu(a,o)),o.type===Ls&&(o.patchFlag===-1&&(o=r[s]=An(o)),o.el=a.el),o.type===Xi&&!o.el&&(o.el=a.el)}}function jh(n){const e=n.slice(),t=[0];let i,r,s,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,a=t.length-1;s<a;)o=s+a>>1,n[t[o]]<c?s=o+1:a=o;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,a=t[s-1];s-- >0;)t[s]=a,a=e[a];return t}function Mu(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Mu(e)}function Ya(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Su(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Su(e.subTree):null}const Eu=n=>n.__isSuspense;function Kh(n,e){e&&e.pendingBranch?Be(n)?e.effects.push(...n):e.effects.push(n):ih(n)}const bn=Symbol.for("v-fgt"),Ls=Symbol.for("v-txt"),Xi=Symbol.for("v-cmt"),$s=Symbol.for("v-stc"),gr=[];let zt=null;function $h(n=!1){gr.push(zt=n?null:[])}function Zh(){gr.pop(),zt=gr[gr.length-1]||null}let yr=1;function ja(n,e=!1){yr+=n,n<0&&zt&&e&&(zt.hasOnce=!0)}function Jh(n){return n.dynamicChildren=yr>0?zt||Hi:null,Zh(),yr>0&&zt&&zt.push(n),n}function Qh(n,e,t,i,r,s){return Jh(yn(n,e,t,i,r,s,!0))}function yu(n){return n?n.__v_isVNode===!0:!1}function tr(n,e){return n.type===e.type&&n.key===e.key}const Tu=({key:n})=>n??null,cs=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?ut(n)||yt(n)||Ve(n)?{i:hn,r:n,k:e,f:!!t}:n:null);function yn(n,e=null,t=null,i=0,r=null,s=n===bn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Tu(e),ref:e&&cs(e),scopeId:eu,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:hn};return o?(Ma(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=ut(t)?8:16),yr>0&&!a&&zt&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&zt.push(l),l}const ui=ed;function ed(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===yh)&&(n=Xi),yu(n)){const o=qi(n,e,!0);return t&&Ma(o,t),yr>0&&!s&&zt&&(o.shapeFlag&6?zt[zt.indexOf(n)]=o:zt.push(o)),o.patchFlag=-2,o}if(fd(n)&&(n=n.__vccOpts),e){e=td(e);let{class:o,style:l}=e;o&&!ut(o)&&(e.class=ia(o)),rt(l)&&(da(l)&&!Be(l)&&(l=mt({},l)),e.style=na(l))}const a=ut(n)?1:Eu(n)?128:uh(n)?64:rt(n)?4:Ve(n)?2:0;return yn(n,e,t,i,r,a,s,!0)}function td(n){return n?da(n)||du(n)?mt({},n):n:null}function qi(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=n,c=e?nd(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Tu(c),ref:e&&e.ref?t&&s?Be(s)?s.concat(cs(e)):[s,cs(e)]:cs(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==bn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&qi(n.ssContent),ssFallback:n.ssFallback&&qi(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&ma(u,l.clone(u)),u}function zo(n=" ",e=0){return ui(Ls,null,n,e)}function cn(n){return n==null||typeof n=="boolean"?ui(Xi):Be(n)?ui(bn,null,n.slice()):yu(n)?An(n):ui(Ls,null,String(n))}function An(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:qi(n)}function Ma(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Be(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Ma(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!du(e)?e._ctx=hn:r===3&&hn&&(hn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ve(e)?(e={default:e,_ctx:hn},t=32):(e=String(e),i&64?(t=16,e=[zo(e)]):t=8);n.children=e,n.shapeFlag|=t}function nd(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=ia([e.class,i.class]));else if(r==="style")e.style=na([e.style,i.style]);else if(Ts(r)){const s=e[r],a=i[r];a&&s!==a&&!(Be(s)&&s.includes(a))?e[r]=s?[].concat(s,a):a:a==null&&s==null&&!bs(r)&&(e[r]=a)}else r!==""&&(e[r]=i[r])}return e}function on(n,e,t,i=null){pn(n,e,7,[t,i])}const id=lu();let rd=0;function sd(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||id,s={uid:rd++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new yf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:mu(i,r),emitsOptions:cu(i,r),emit:null,emitted:null,propsDefaults:nt,inheritAttrs:i.inheritAttrs,ctx:nt,data:nt,props:nt,attrs:nt,slots:nt,refs:nt,setupState:nt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=Uh.bind(null,s),n.ce&&n.ce(s),s}let Pt=null;const od=()=>Pt||hn;let _s,Go;{const n=ws(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};_s=e("__VUE_INSTANCE_SETTERS__",t=>Pt=t),Go=e("__VUE_SSR_SETTERS__",t=>Tr=t)}const Cr=n=>{const e=Pt;return _s(n),n.scope.on(),()=>{n.scope.off(),_s(e)}},Ka=()=>{Pt&&Pt.scope.off(),_s(null)};function bu(n){return n.vnode.shapeFlag&4}let Tr=!1;function ad(n,e=!1,t=!1){e&&Go(e);const{props:i,children:r}=n.vnode,s=bu(n);Hh(n,i,s,e),Wh(n,r,t||e);const a=s?ld(n,e):void 0;return e&&Go(!1),a}function ld(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Th);const{setup:i}=t;if(i){Pn();const r=n.setupContext=i.length>1?ud(n):null,s=Cr(n),a=Rr(i,n,0,[n.props,r]),o=Lc(a);if(Ln(),s(),(o||n.sp)&&!mr(n)&&iu(n),o){if(a.then(Ka,Ka),e)return a.then(l=>{$a(n,l,e)}).catch(l=>{Rs(l,n,0)});n.asyncDep=a}else $a(n,a,e)}else Au(n,e)}function $a(n,e,t){Ve(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:rt(e)&&(n.setupState=Kc(e)),Au(n,t)}let Za;function Au(n,e,t){const i=n.type;if(!n.render){if(!e&&Za&&!i.render){const r=i.template||ga(n).template;if(r){const{isCustomElement:s,compilerOptions:a}=n.appContext.config,{delimiters:o,compilerOptions:l}=i,c=mt(mt({isCustomElement:s,delimiters:o},a),l);i.render=Za(r,c)}}n.render=i.render||en}{const r=Cr(n);Pn();try{bh(n)}finally{Ln(),r()}}}const cd={get(n,e){return Et(n,"get",""),n[e]}};function ud(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,cd),slots:n.slots,emit:n.emit,expose:e}}function Sa(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Kc(kf(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in _r)return _r[t](n)},has(e,t){return t in e||t in _r}})):n.proxy}function fd(n){return Ve(n)&&"__vccOpts"in n}const hd=(n,e)=>Zf(n,e,Tr),dd="3.5.33";/**
* @vue/runtime-dom v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Vo;const Ja=typeof window<"u"&&window.trustedTypes;if(Ja)try{Vo=Ja.createPolicy("vue",{createHTML:n=>n})}catch{}const wu=Vo?n=>Vo.createHTML(n):n=>n,pd="http://www.w3.org/2000/svg",md="http://www.w3.org/1998/Math/MathML",Tn=typeof document<"u"?document:null,Qa=Tn&&Tn.createElement("template"),_d={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?Tn.createElementNS(pd,n):e==="mathml"?Tn.createElementNS(md,n):t?Tn.createElement(n,{is:t}):Tn.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>Tn.createTextNode(n),createComment:n=>Tn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Tn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const a=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Qa.innerHTML=wu(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Qa.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},gd=Symbol("_vtc");function vd(n,e,t){const i=n[gd];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const el=Symbol("_vod"),xd=Symbol("_vsh"),Md=Symbol(""),Sd=/(?:^|;)\s*display\s*:/;function Ed(n,e,t){const i=n.style,r=ut(t);let s=!1;if(t&&!r){if(e)if(ut(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&lr(i,o,"")}else for(const a in e)t[a]==null&&lr(i,a,"");for(const a in t){a==="display"&&(s=!0);const o=t[a];o!=null?Td(n,a,!ut(e)&&e?e[a]:void 0,o)||lr(i,a,o):lr(i,a,"")}}else if(r){if(e!==t){const a=i[Md];a&&(t+=";"+a),i.cssText=t,s=Sd.test(t)}}else e&&n.removeAttribute("style");el in n&&(n[el]=s?i.display:"",n[xd]&&(i.display="none"))}const tl=/\s*!important$/;function lr(n,e,t){if(Be(t))t.forEach(i=>lr(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=yd(n,e);tl.test(t)?n.setProperty(vi(i),t.replace(tl,""),"important"):n[i]=t}}const nl=["Webkit","Moz","ms"],Zs={};function yd(n,e){const t=Zs[e];if(t)return t;let i=tn(e);if(i!=="filter"&&i in n)return Zs[e]=i;i=Dc(i);for(let r=0;r<nl.length;r++){const s=nl[r]+i;if(s in n)return Zs[e]=s}return e}function Td(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&ut(i)&&t===i}const il="http://www.w3.org/1999/xlink";function rl(n,e,t,i,r,s=Sf(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(il,e.slice(6,e.length)):n.setAttributeNS(il,e,t):t==null||s&&!Ic(t)?n.removeAttribute(e):n.setAttribute(e,s?"":Yn(t)?String(t):t)}function sl(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?wu(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=Ic(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(r||e)}function bd(n,e,t,i){n.addEventListener(e,t,i)}function Ad(n,e,t,i){n.removeEventListener(e,t,i)}const ol=Symbol("_vei");function wd(n,e,t,i,r=null){const s=n[ol]||(n[ol]={}),a=s[e];if(i&&a)a.value=i;else{const[o,l]=Rd(e);if(i){const c=s[e]=Ld(i,r);bd(n,o,c,l)}else a&&(Ad(n,o,a,l),s[e]=void 0)}}const al=/(?:Once|Passive|Capture)$/;function Rd(n){let e;if(al.test(n)){e={};let i;for(;i=n.match(al);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):vi(n.slice(2)),e]}let Js=0;const Cd=Promise.resolve(),Pd=()=>Js||(Cd.then(()=>Js=0),Js=Date.now());function Ld(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;pn(Dd(i,t.value),e,5,[i])};return t.value=n,t.attached=Pd(),t}function Dd(n,e){if(Be(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const ll=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Ud=(n,e,t,i,r,s)=>{const a=r==="svg";e==="class"?vd(n,i,a):e==="style"?Ed(n,t,i):Ts(e)?bs(e)||wd(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Id(n,e,i,a))?(sl(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&rl(n,e,i,a,s,e!=="value")):n._isVueCE&&(Nd(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!ut(i)))?sl(n,tn(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),rl(n,e,i,a))};function Id(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&ll(e)&&Ve(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return ll(e)&&ut(t)?!1:e in n}function Nd(n,e){const t=n._def.props;if(!t)return!1;const i=tn(e);return Array.isArray(t)?t.some(r=>tn(r)===i):Object.keys(t).some(r=>tn(r)===i)}const Fd=mt({patchProp:Ud},_d);let cl;function Od(){return cl||(cl=Xh(Fd))}const Bd=(...n)=>{const e=Od().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=zd(i);if(!r)return;const s=e._component;!Ve(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=t(r,!1,Hd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function Hd(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function zd(n){return ut(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ea="158",Gd=0,ul=1,Vd=2,Ru=1,Wd=2,En=3,Kn=0,It=1,Rn=2,kn=0,Wi=1,fl=2,hl=3,dl=4,kd=5,ai=100,Xd=101,qd=102,pl=103,ml=104,Yd=200,jd=201,Kd=202,$d=203,Wo=204,ko=205,Zd=206,Jd=207,Qd=208,ep=209,tp=210,np=211,ip=212,rp=213,sp=214,op=0,ap=1,lp=2,gs=3,cp=4,up=5,fp=6,hp=7,ya=0,dp=1,pp=2,Xn=0,mp=1,_p=2,gp=3,vp=4,xp=5,Cu=300,Yi=301,ji=302,Xo=303,qo=304,Ds=306,Yo=1e3,Zt=1001,jo=1002,Rt=1003,_l=1004,Qs=1005,kt=1006,Mp=1007,br=1008,qn=1009,Sp=1010,Ep=1011,Ta=1012,Pu=1013,Vn=1014,Wn=1015,Ar=1016,Lu=1017,Du=1018,fi=1020,yp=1021,Jt=1023,Tp=1024,bp=1025,hi=1026,Ki=1027,Ap=1028,Uu=1029,wp=1030,Iu=1031,Nu=1033,eo=33776,to=33777,no=33778,io=33779,gl=35840,vl=35841,xl=35842,Ml=35843,Rp=36196,Sl=37492,El=37496,yl=37808,Tl=37809,bl=37810,Al=37811,wl=37812,Rl=37813,Cl=37814,Pl=37815,Ll=37816,Dl=37817,Ul=37818,Il=37819,Nl=37820,Fl=37821,ro=36492,Ol=36494,Bl=36495,Cp=36283,Hl=36284,zl=36285,Gl=36286,Fu=3e3,di=3001,Pp=3200,Lp=3201,Ou=0,Dp=1,qt="",_t="srgb",Un="srgb-linear",ba="display-p3",Us="display-p3-linear",vs="linear",it="srgb",xs="rec709",Ms="p3",Si=7680,Vl=519,Up=512,Ip=513,Np=514,Fp=515,Op=516,Bp=517,Hp=518,zp=519,Wl=35044,kl="300 es",Ko=1035,Cn=2e3,Ss=2001;class Zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],so=Math.PI/180,$o=180/Math.PI;function Pr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Ut(n,e,t){return Math.max(e,Math.min(t,n))}function Gp(n,e){return(n%e+e)%e}function oo(n,e,t){return(1-t)*n+t*e}function Xl(n){return(n&n-1)===0&&n!==0}function Zo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function nr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,i,r,s,a,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],m=i[5],v=i[8],g=r[0],p=r[3],h=r[6],b=r[1],E=r[4],y=r[7],R=r[2],D=r[5],C=r[8];return s[0]=a*g+o*b+l*R,s[3]=a*p+o*E+l*D,s[6]=a*h+o*y+l*C,s[1]=c*g+u*b+f*R,s[4]=c*p+u*E+f*D,s[7]=c*h+u*y+f*C,s[2]=d*g+m*b+v*R,s[5]=d*p+m*E+v*D,s[8]=d*h+m*y+v*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,m=c*s-a*l,v=t*f+i*d+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=f*g,e[1]=(r*c-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=d*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=m*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ao.makeScale(e,t)),this}rotate(e){return this.premultiply(ao.makeRotation(-e)),this}translate(e,t){return this.premultiply(ao.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ao=new We;function Bu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Es(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vp(){const n=Es("canvas");return n.style.display="block",n}const ql={};function vr(n){n in ql||(ql[n]=!0,console.warn(n))}const Yl=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),jl=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Hr={[Un]:{transfer:vs,primaries:xs,toReference:n=>n,fromReference:n=>n},[_t]:{transfer:it,primaries:xs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Us]:{transfer:vs,primaries:Ms,toReference:n=>n.applyMatrix3(jl),fromReference:n=>n.applyMatrix3(Yl)},[ba]:{transfer:it,primaries:Ms,toReference:n=>n.convertSRGBToLinear().applyMatrix3(jl),fromReference:n=>n.applyMatrix3(Yl).convertLinearToSRGB()}},Wp=new Set([Un,Us]),Je={enabled:!0,_workingColorSpace:Un,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Wp.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Hr[e].toReference,r=Hr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Hr[n].primaries},getTransfer:function(n){return n===qt?vs:Hr[n].transfer}};function ki(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function lo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ei;class Hu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ei===void 0&&(Ei=Es("canvas")),Ei.width=e.width,Ei.height=e.height;const i=Ei.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ei}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ki(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ki(t[i]/255)*255):t[i]=ki(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kp=0;class zu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Pr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(co(r[a].image)):s.push(co(r[a]))}else s=co(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function co(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Hu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xp=0;class Gt extends Zi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=Zt,r=Zt,s=kt,a=br,o=Jt,l=qn,c=Gt.DEFAULT_ANISOTROPY,u=qt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Pr(),this.name="",this.source=new zu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===di?_t:qt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yo:e.x=e.x-Math.floor(e.x);break;case Zt:e.x=e.x<0?0:1;break;case jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yo:e.y=e.y-Math.floor(e.y);break;case Zt:e.y=e.y<0?0:1;break;case jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===_t?di:Fu}set encoding(e){vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===di?_t:qt}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Cu;Gt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,i=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],m=l[5],v=l[9],g=l[2],p=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-g)<.01&&Math.abs(v-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+g)<.1&&Math.abs(v+p)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,y=(m+1)/2,R=(h+1)/2,D=(u+d)/4,C=(f+g)/4,V=(v+p)/4;return E>y&&E>R?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=D/i,s=C/i):y>R?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=D/r,s=V/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=C/s,r=V/s),this.set(i,r,s,t),this}let b=Math.sqrt((p-v)*(p-v)+(f-g)*(f-g)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(p-v)/b,this.y=(f-g)/b,this.z=(d-u)/b,this.w=Math.acos((c+m+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qp extends Zi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(vr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===di?_t:qt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Gt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends qp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gu extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yp extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const d=s[a+0],m=s[a+1],v=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=v,e[t+3]=g;return}if(f!==g||l!==d||c!==m||u!==v){let p=1-o;const h=l*d+c*m+u*v+f*g,b=h>=0?1:-1,E=1-h*h;if(E>Number.EPSILON){const R=Math.sqrt(E),D=Math.atan2(R,h*b);p=Math.sin(p*D)/R,o=Math.sin(o*D)/R}const y=o*b;if(l=l*p+d*y,c=c*p+m*y,u=u*p+v*y,f=f*p+g*y,p===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],m=s[a+2],v=s[a+3];return e[t]=o*v+u*f+l*m-c*d,e[t+1]=l*v+u*d+c*f-o*m,e[t+2]=c*v+u*m+o*d-l*f,e[t+3]=u*v-o*f-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),m=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*m*v,this._y=c*m*f-d*u*v,this._z=c*u*v+d*m*f,this._w=c*u*f-d*m*v;break;case"YXZ":this._x=d*u*f+c*m*v,this._y=c*m*f-d*u*v,this._z=c*u*v-d*m*f,this._w=c*u*f+d*m*v;break;case"ZXY":this._x=d*u*f-c*m*v,this._y=c*m*f+d*u*v,this._z=c*u*v+d*m*f,this._w=c*u*f-d*m*v;break;case"ZYX":this._x=d*u*f-c*m*v,this._y=c*m*f+d*u*v,this._z=c*u*v-d*m*f,this._w=c*u*f+d*m*v;break;case"YZX":this._x=d*u*f+c*m*v,this._y=c*m*f+d*u*v,this._z=c*u*v-d*m*f,this._w=c*u*f-d*m*v;break;case"XZY":this._x=d*u*f-c*m*v,this._y=c*m*f-d*u*v,this._z=c*u*v+d*m*f,this._w=c*u*f+d*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return uo.copy(this).projectOnVector(e),this.sub(uo)}reflect(e){return this.sub(uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const uo=new B,Kl=new Lr;class Dr{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(s,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),zr.copy(i.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Gr.subVectors(this.max,ir),yi.subVectors(e.a,ir),Ti.subVectors(e.b,ir),bi.subVectors(e.c,ir),Nn.subVectors(Ti,yi),Fn.subVectors(bi,Ti),ei.subVectors(yi,bi);let t=[0,-Nn.z,Nn.y,0,-Fn.z,Fn.y,0,-ei.z,ei.y,Nn.z,0,-Nn.x,Fn.z,0,-Fn.x,ei.z,0,-ei.x,-Nn.y,Nn.x,0,-Fn.y,Fn.x,0,-ei.y,ei.x,0];return!fo(t,yi,Ti,bi,Gr)||(t=[1,0,0,0,1,0,0,0,1],!fo(t,yi,Ti,bi,Gr))?!1:(Vr.crossVectors(Nn,Fn),t=[Vr.x,Vr.y,Vr.z],fo(t,yi,Ti,bi,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new B,new B,new B,new B,new B,new B,new B,new B],Yt=new B,zr=new Dr,yi=new B,Ti=new B,bi=new B,Nn=new B,Fn=new B,ei=new B,ir=new B,Gr=new B,Vr=new B,ti=new B;function fo(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ti.fromArray(n,s);const o=r.x*Math.abs(ti.x)+r.y*Math.abs(ti.y)+r.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),u=i.dot(ti);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const jp=new Dr,rr=new B,ho=new B;class Aa{constructor(e=new B,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):jp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(rr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ho.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(ho)),this.expandByPoint(rr.copy(e.center).sub(ho))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new B,po=new B,Wr=new B,On=new B,mo=new B,kr=new B,_o=new B;class Kp{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){po.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),On.copy(this.origin).sub(po);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Wr),o=On.dot(this.direction),l=-On.dot(Wr),c=On.lengthSq(),u=Math.abs(1-a*a);let f,d,m,v;if(u>0)if(f=a*l-o,d=a*o-l,v=s*u,f>=0)if(d>=-v)if(d<=v){const g=1/u;f*=g,d*=g,m=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;else d<=-v?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),m=-f*f+d*(d+2*l)+c):d<=v?(f=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),m=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(po).addScaledVector(Wr,d),m}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const i=vn.dot(this.direction),r=vn.dot(vn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,i,r,s){mo.subVectors(t,e),kr.subVectors(i,e),_o.crossVectors(mo,kr);let a=this.direction.dot(_o),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;On.subVectors(this.origin,e);const l=o*this.direction.dot(kr.crossVectors(On,kr));if(l<0)return null;const c=o*this.direction.dot(mo.cross(On));if(c<0||l+c>a)return null;const u=-o*On.dot(_o);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,r,s,a,o,l,c,u,f,d,m,v,g,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,m,v,g,p)}set(e,t,i,r,s,a,o,l,c,u,f,d,m,v,g,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=m,h[7]=v,h[11]=g,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ai.setFromMatrixColumn(e,0).length(),s=1/Ai.setFromMatrixColumn(e,1).length(),a=1/Ai.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,m=a*f,v=o*u,g=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=m+v*c,t[5]=d-g*c,t[9]=-o*l,t[2]=g-d*c,t[6]=v+m*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,m=l*f,v=c*u,g=c*f;t[0]=d+g*o,t[4]=v*o-m,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-v,t[6]=g+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,m=l*f,v=c*u,g=c*f;t[0]=d-g*o,t[4]=-a*f,t[8]=v+m*o,t[1]=m+v*o,t[5]=a*u,t[9]=g-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,m=a*f,v=o*u,g=o*f;t[0]=l*u,t[4]=v*c-m,t[8]=d*c+g,t[1]=l*f,t[5]=g*c+d,t[9]=m*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*c,v=o*l,g=o*c;t[0]=l*u,t[4]=g-d*f,t[8]=v*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*f+v,t[10]=d-g*f}else if(e.order==="XZY"){const d=a*l,m=a*c,v=o*l,g=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+g,t[5]=a*u,t[9]=m*f-v,t[2]=v*f-m,t[6]=o*u,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($p,e,Zp)}lookAt(e,t,i){const r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Bn.crossVectors(i,Bt),Bn.lengthSq()===0&&(Math.abs(i.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Bn.crossVectors(i,Bt)),Bn.normalize(),Xr.crossVectors(Bt,Bn),r[0]=Bn.x,r[4]=Xr.x,r[8]=Bt.x,r[1]=Bn.y,r[5]=Xr.y,r[9]=Bt.y,r[2]=Bn.z,r[6]=Xr.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],m=i[13],v=i[2],g=i[6],p=i[10],h=i[14],b=i[3],E=i[7],y=i[11],R=i[15],D=r[0],C=r[4],V=r[8],x=r[12],A=r[1],J=r[5],oe=r[9],ue=r[13],U=r[2],j=r[6],Z=r[10],z=r[14],ie=r[3],ae=r[7],se=r[11],I=r[15];return s[0]=a*D+o*A+l*U+c*ie,s[4]=a*C+o*J+l*j+c*ae,s[8]=a*V+o*oe+l*Z+c*se,s[12]=a*x+o*ue+l*z+c*I,s[1]=u*D+f*A+d*U+m*ie,s[5]=u*C+f*J+d*j+m*ae,s[9]=u*V+f*oe+d*Z+m*se,s[13]=u*x+f*ue+d*z+m*I,s[2]=v*D+g*A+p*U+h*ie,s[6]=v*C+g*J+p*j+h*ae,s[10]=v*V+g*oe+p*Z+h*se,s[14]=v*x+g*ue+p*z+h*I,s[3]=b*D+E*A+y*U+R*ie,s[7]=b*C+E*J+y*j+R*ae,s[11]=b*V+E*oe+y*Z+R*se,s[15]=b*x+E*ue+y*z+R*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],m=e[14],v=e[3],g=e[7],p=e[11],h=e[15];return v*(+s*l*f-r*c*f-s*o*d+i*c*d+r*o*m-i*l*m)+g*(+t*l*m-t*c*d+s*a*d-r*a*m+r*c*u-s*l*u)+p*(+t*c*f-t*o*m-s*a*f+i*a*m+s*o*u-i*c*u)+h*(-r*o*u-t*l*f+t*o*d+r*a*f-i*a*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],m=e[11],v=e[12],g=e[13],p=e[14],h=e[15],b=f*p*c-g*d*c+g*l*m-o*p*m-f*l*h+o*d*h,E=v*d*c-u*p*c-v*l*m+a*p*m+u*l*h-a*d*h,y=u*g*c-v*f*c+v*o*m-a*g*m-u*o*h+a*f*h,R=v*f*l-u*g*l-v*o*d+a*g*d+u*o*p-a*f*p,D=t*b+i*E+r*y+s*R;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/D;return e[0]=b*C,e[1]=(g*d*s-f*p*s-g*r*m+i*p*m+f*r*h-i*d*h)*C,e[2]=(o*p*s-g*l*s+g*r*c-i*p*c-o*r*h+i*l*h)*C,e[3]=(f*l*s-o*d*s-f*r*c+i*d*c+o*r*m-i*l*m)*C,e[4]=E*C,e[5]=(u*p*s-v*d*s+v*r*m-t*p*m-u*r*h+t*d*h)*C,e[6]=(v*l*s-a*p*s-v*r*c+t*p*c+a*r*h-t*l*h)*C,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*m+t*l*m)*C,e[8]=y*C,e[9]=(v*f*s-u*g*s-v*i*m+t*g*m+u*i*h-t*f*h)*C,e[10]=(a*g*s-v*o*s+v*i*c-t*g*c-a*i*h+t*o*h)*C,e[11]=(u*o*s-a*f*s-u*i*c+t*f*c+a*i*m-t*o*m)*C,e[12]=R*C,e[13]=(u*g*r-v*f*r+v*i*d-t*g*d-u*i*p+t*f*p)*C,e[14]=(v*o*r-a*g*r-v*i*l+t*g*l+a*i*p-t*o*p)*C,e[15]=(a*f*r-u*o*r+u*i*l-t*f*l-a*i*d+t*o*d)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,m=s*u,v=s*f,g=a*u,p=a*f,h=o*f,b=l*c,E=l*u,y=l*f,R=i.x,D=i.y,C=i.z;return r[0]=(1-(g+h))*R,r[1]=(m+y)*R,r[2]=(v-E)*R,r[3]=0,r[4]=(m-y)*D,r[5]=(1-(d+h))*D,r[6]=(p+b)*D,r[7]=0,r[8]=(v+E)*C,r[9]=(p-b)*C,r[10]=(1-(d+g))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ai.set(r[0],r[1],r[2]).length();const a=Ai.set(r[4],r[5],r[6]).length(),o=Ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],jt.copy(this);const c=1/s,u=1/a,f=1/o;return jt.elements[0]*=c,jt.elements[1]*=c,jt.elements[2]*=c,jt.elements[4]*=u,jt.elements[5]*=u,jt.elements[6]*=u,jt.elements[8]*=f,jt.elements[9]*=f,jt.elements[10]*=f,t.setFromRotationMatrix(jt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Cn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let m,v;if(o===Cn)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Ss)m=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Cn){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(a-s),d=(t+e)*c,m=(i+r)*u;let v,g;if(o===Cn)v=(a+s)*f,g=-2*f;else if(o===Ss)v=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ai=new B,jt=new vt,$p=new B(0,0,0),Zp=new B(1,1,1),Bn=new B,Xr=new B,Bt=new B,$l=new vt,Zl=new Lr;class Is{constructor(e=0,t=0,i=0,r=Is.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ut(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return $l.makeRotationFromQuaternion(e),this.setFromRotationMatrix($l,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zl.setFromEuler(this),this.setFromQuaternion(Zl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Is.DEFAULT_ORDER="XYZ";class Vu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jp=0;const Jl=new B,wi=new Lr,xn=new vt,qr=new B,sr=new B,Qp=new B,em=new Lr,Ql=new B(1,0,0),ec=new B(0,1,0),tc=new B(0,0,1),tm={type:"added"},nm={type:"removed"};class Nt extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new B,t=new Is,i=new Lr,r=new B(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new We}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Vu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(Ql,e)}rotateY(e){return this.rotateOnAxis(ec,e)}rotateZ(e){return this.rotateOnAxis(tc,e)}translateOnAxis(e,t){return Jl.copy(e).applyQuaternion(this.quaternion),this.position.add(Jl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ql,e)}translateY(e){return this.translateOnAxis(ec,e)}translateZ(e){return this.translateOnAxis(tc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qr.copy(e):qr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(sr,qr,this.up):xn.lookAt(qr,sr,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),wi.setFromRotationMatrix(xn),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(tm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nm)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let r=0,s=this.children.length;r<s;r++){const a=this.children[r].getObjectsByProperty(e,t);a.length>0&&(i=i.concat(a))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,Qp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,em,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Nt.DEFAULT_UP=new B(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new B,Mn=new B,go=new B,Sn=new B,Ri=new B,Ci=new B,nc=new B,vo=new B,xo=new B,Mo=new B;let Yr=!1;class $t{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Kt.subVectors(e,t),r.cross(Kt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Kt.subVectors(r,t),Mn.subVectors(i,t),go.subVectors(e,t);const a=Kt.dot(Kt),o=Kt.dot(Mn),l=Kt.dot(go),c=Mn.dot(Mn),u=Mn.dot(go),f=a*c-o*o;if(f===0)return s.set(-2,-1,-1);const d=1/f,m=(c*l-o*u)*d,v=(a*u-o*l)*d;return s.set(1-m-v,v,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Sn),Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getUV(e,t,i,r,s,a,o,l){return Yr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Yr=!0),this.getInterpolation(e,t,i,r,s,a,o,l)}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Sn),l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l}static isFrontFacing(e,t,i,r){return Kt.subVectors(i,t),Mn.subVectors(e,t),Kt.cross(Mn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),Kt.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Yr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Yr=!0),$t.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return $t.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Ri.subVectors(r,i),Ci.subVectors(s,i),vo.subVectors(e,i);const l=Ri.dot(vo),c=Ci.dot(vo);if(l<=0&&c<=0)return t.copy(i);xo.subVectors(e,r);const u=Ri.dot(xo),f=Ci.dot(xo);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Ri,a);Mo.subVectors(e,s);const m=Ri.dot(Mo),v=Ci.dot(Mo);if(v>=0&&m<=v)return t.copy(s);const g=m*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Ci,o);const p=u*v-m*f;if(p<=0&&f-u>=0&&m-v>=0)return nc.subVectors(s,r),o=(f-u)/(f-u+(m-v)),t.copy(r).addScaledVector(nc,o);const h=1/(p+g+d);return a=g*h,o=d*h,t.copy(i).addScaledVector(Ri,a).addScaledVector(Ci,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},jr={h:0,s:0,l:0};function So(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=Gp(e,1),t=Ut(t,0,1),i=Ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=So(a,s,e+1/3),this.g=So(a,s,e),this.b=So(a,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=_t){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){const i=Wu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=lo(e.r),this.g=lo(e.g),this.b=lo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return Je.fromWorkingColorSpace(Mt.copy(this),e),Math.round(Ut(Mt.r*255,0,255))*65536+Math.round(Ut(Mt.g*255,0,255))*256+Math.round(Ut(Mt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Mt.copy(this),t);const i=Mt.r,r=Mt.g,s=Mt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=_t){Je.fromWorkingColorSpace(Mt.copy(this),e);const t=Mt.r,i=Mt.g,r=Mt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(jr);const i=oo(Hn.h,jr.h,t),r=oo(Hn.s,jr.s,t),s=oo(Hn.l,jr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new qe;qe.NAMES=Wu;let im=0;class Ur extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Pr(),this.name="",this.type="Material",this.blending=Wi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wo,this.blendDst=ko,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(i.blending=this.blending),this.side!==Kn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wo&&(i.blendSrc=this.blendSrc),this.blendDst!==ko&&(i.blendDst=this.blendDst),this.blendEquation!==ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ys extends Ur{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new B,Kr=new Qe;class dn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Wl,this.updateRange={offset:0,count:-1},this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Kr.fromBufferAttribute(this,t),Kr.applyMatrix3(e),this.setXY(t,Kr.x,Kr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),r=Lt(r,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wl&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class ku extends dn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xu extends dn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class pi extends dn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let rm=0;const Wt=new vt,Eo=new Nt,Pi=new B,Ht=new Dr,or=new Dr,pt=new B;class xi extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Pr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bu(e)?Xu:ku)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,i){return Wt.makeTranslation(e,t,i),this.applyMatrix4(Wt),this}scale(e,t,i){return Wt.makeScale(e,t,i),this.applyMatrix4(Wt),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ht.setFromBufferAttribute(s),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Aa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];or.setFromBufferAttribute(o),this.morphTargetsRelative?(pt.addVectors(Ht.min,or.min),Ht.expandByPoint(pt),pt.addVectors(Ht.max,or.max),Ht.expandByPoint(pt)):(Ht.expandByPoint(or.min),Ht.expandByPoint(or.max))}Ht.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)pt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(pt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)pt.fromBufferAttribute(o,c),l&&(Pi.fromBufferAttribute(e,c),pt.add(Pi)),r=Math.max(r,i.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let A=0;A<o;A++)c[A]=new B,u[A]=new B;const f=new B,d=new B,m=new B,v=new Qe,g=new Qe,p=new Qe,h=new B,b=new B;function E(A,J,oe){f.fromArray(r,A*3),d.fromArray(r,J*3),m.fromArray(r,oe*3),v.fromArray(a,A*2),g.fromArray(a,J*2),p.fromArray(a,oe*2),d.sub(f),m.sub(f),g.sub(v),p.sub(v);const ue=1/(g.x*p.y-p.x*g.y);isFinite(ue)&&(h.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar(ue),b.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar(ue),c[A].add(h),c[J].add(h),c[oe].add(h),u[A].add(b),u[J].add(b),u[oe].add(b))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let A=0,J=y.length;A<J;++A){const oe=y[A],ue=oe.start,U=oe.count;for(let j=ue,Z=ue+U;j<Z;j+=3)E(i[j+0],i[j+1],i[j+2])}const R=new B,D=new B,C=new B,V=new B;function x(A){C.fromArray(s,A*3),V.copy(C);const J=c[A];R.copy(J),R.sub(C.multiplyScalar(C.dot(J))).normalize(),D.crossVectors(V,J);const ue=D.dot(u[A])<0?-1:1;l[A*4]=R.x,l[A*4+1]=R.y,l[A*4+2]=R.z,l[A*4+3]=ue}for(let A=0,J=y.length;A<J;++A){const oe=y[A],ue=oe.start,U=oe.count;for(let j=ue,Z=ue+U;j<Z;j+=3)x(i[j+0]),x(i[j+1]),x(i[j+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,f=new B;if(e)for(let d=0,m=e.count;d<m;d+=3){const v=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let m=0,v=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?m=l[g]*o.data.stride+o.offset:m=l[g]*u;for(let h=0;h<u;h++)d[v++]=c[m++]}return new dn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xi,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],m=e(d,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const m=c[f];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ic=new vt,ni=new Kp,$r=new Aa,rc=new B,Li=new B,Di=new B,Ui=new B,yo=new B,Zr=new B,Jr=new Qe,Qr=new Qe,es=new Qe,sc=new B,oc=new B,ac=new B,ts=new B,ns=new B;class Qt extends Nt{constructor(e=new xi,t=new ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(yo.fromBufferAttribute(f,e),a?Zr.addScaledVector(yo,u):Zr.addScaledVector(yo.sub(t),u))}t.add(Zr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$r.copy(i.boundingSphere),$r.applyMatrix4(s),ni.copy(e.ray).recast(e.near),!($r.containsPoint(ni.origin)===!1&&(ni.intersectSphere($r,rc)===null||ni.origin.distanceToSquared(rc)>(e.far-e.near)**2))&&(ic.copy(s).invert(),ni.copy(e.ray).applyMatrix4(ic),!(i.boundingBox!==null&&ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=d.length;v<g;v++){const p=d[v],h=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,R=E;y<R;y+=3){const D=o.getX(y),C=o.getX(y+1),V=o.getX(y+2);r=is(this,h,e,i,c,u,f,D,C,V),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const v=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=v,h=g;p<h;p+=3){const b=o.getX(p),E=o.getX(p+1),y=o.getX(p+2);r=is(this,a,e,i,c,u,f,b,E,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=d.length;v<g;v++){const p=d[v],h=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,R=E;y<R;y+=3){const D=y,C=y+1,V=y+2;r=is(this,h,e,i,c,u,f,D,C,V),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const v=Math.max(0,m.start),g=Math.min(l.count,m.start+m.count);for(let p=v,h=g;p<h;p+=3){const b=p,E=p+1,y=p+2;r=is(this,a,e,i,c,u,f,b,E,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function sm(n,e,t,i,r,s,a,o){let l;if(e.side===It?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Kn,o),l===null)return null;ns.copy(o),ns.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ns);return c<t.near||c>t.far?null:{distance:c,point:ns.clone(),object:n}}function is(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Li),n.getVertexPosition(l,Di),n.getVertexPosition(c,Ui);const u=sm(n,e,t,i,Li,Di,Ui,ts);if(u){r&&(Jr.fromBufferAttribute(r,o),Qr.fromBufferAttribute(r,l),es.fromBufferAttribute(r,c),u.uv=$t.getInterpolation(ts,Li,Di,Ui,Jr,Qr,es,new Qe)),s&&(Jr.fromBufferAttribute(s,o),Qr.fromBufferAttribute(s,l),es.fromBufferAttribute(s,c),u.uv1=$t.getInterpolation(ts,Li,Di,Ui,Jr,Qr,es,new Qe),u.uv2=u.uv1),a&&(sc.fromBufferAttribute(a,o),oc.fromBufferAttribute(a,l),ac.fromBufferAttribute(a,c),u.normal=$t.getInterpolation(ts,Li,Di,Ui,sc,oc,ac,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new B,materialIndex:0};$t.getNormal(Li,Di,Ui,f.normal),u.face=f}return u}class _i extends xi{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,m=0;v("z","y","x",-1,-1,i,t,e,a,s,0),v("z","y","x",1,-1,i,t,-e,a,s,1),v("x","z","y",1,1,e,i,t,r,a,2),v("x","z","y",1,-1,e,i,-t,r,a,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new pi(c,3)),this.setAttribute("normal",new pi(u,3)),this.setAttribute("uv",new pi(f,2));function v(g,p,h,b,E,y,R,D,C,V,x){const A=y/C,J=R/V,oe=y/2,ue=R/2,U=D/2,j=C+1,Z=V+1;let z=0,ie=0;const ae=new B;for(let se=0;se<Z;se++){const I=se*J-ue;for(let W=0;W<j;W++){const ge=W*A-oe;ae[g]=ge*b,ae[p]=I*E,ae[h]=U,c.push(ae.x,ae.y,ae.z),ae[g]=0,ae[p]=0,ae[h]=D>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(W/C),f.push(1-se/V),z+=1}}for(let se=0;se<V;se++)for(let I=0;I<C;I++){const W=d+I+j*se,ge=d+I+j*(se+1),Me=d+(I+1)+j*(se+1),Ee=d+(I+1)+j*se;l.push(W,ge,Ee),l.push(ge,Me,Ee),ie+=6}o.addGroup(m,ie,x),m+=ie,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function wt(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const r in i)e[r]=i[r]}return e}function om(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function qu(n){return n.getRenderTarget()===null?n.outputColorSpace:Je.workingColorSpace}const am={clone:$i,merge:wt};var lm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gi extends Ur{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lm,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=om(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Yu extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Cn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Xt extends Yu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(so*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ii=-90,Ni=1;class um extends Nt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Xt(Ii,Ni,e,t);r.layers=this.layers,this.add(r);const s=new Xt(Ii,Ni,e,t);s.layers=this.layers,this.add(s);const a=new Xt(Ii,Ni,e,t);a.layers=this.layers,this.add(a);const o=new Xt(Ii,Ni,e,t);o.layers=this.layers,this.add(o);const l=new Xt(Ii,Ni,e,t);l.layers=this.layers,this.add(l);const c=new Xt(Ii,Ni,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Cn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ss)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class ju extends Gt{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Yi,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fm extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(vr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===di?_t:qt),this.texture=new ju(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new _i(5,5,5),s=new gi({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:It,blending:kn});s.uniforms.tEquirect.value=t;const a=new Qt(r,s),o=t.minFilter;return t.minFilter===br&&(t.minFilter=kt),new um(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const To=new B,hm=new B,dm=new We;class si{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=To.subVectors(i,t).cross(hm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(To),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||dm.getNormalMatrix(e),r=this.coplanarPoint(To).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new Aa,rs=new B;class Ku{constructor(e=new si,t=new si,i=new si,r=new si,s=new si,a=new si){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Cn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],d=r[7],m=r[8],v=r[9],g=r[10],p=r[11],h=r[12],b=r[13],E=r[14],y=r[15];if(i[0].setComponents(l-s,d-c,p-m,y-h).normalize(),i[1].setComponents(l+s,d+c,p+m,y+h).normalize(),i[2].setComponents(l+a,d+u,p+v,y+b).normalize(),i[3].setComponents(l-a,d-u,p-v,y-b).normalize(),i[4].setComponents(l-o,d-f,p-g,y-E).normalize(),t===Cn)i[5].setComponents(l+o,d+f,p+g,y+E).normalize();else if(t===Ss)i[5].setComponents(o,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(rs.x=r.normal.x>0?e.max.x:e.min.x,rs.y=r.normal.y>0?e.max.y:e.min.y,rs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $u(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function pm(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,d=c.usage,m=n.createBuffer();n.bindBuffer(u,m),n.bufferData(u,f,d),c.onUploadCallback();let v;if(f instanceof Float32Array)v=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=n.SHORT;else if(f instanceof Uint32Array)v=n.UNSIGNED_INT;else if(f instanceof Int32Array)v=n.INT;else if(f instanceof Int8Array)v=n.BYTE;else if(f instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,f){const d=u.array,m=u.updateRange;n.bindBuffer(f,c),m.count===-1?n.bufferSubData(f,0,d):(t?n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(f,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);f===void 0?i.set(c,r(c,u)):f.version<c.version&&(s(f.buffer,c,u),f.version=c.version)}return{get:a,remove:o,update:l}}class Ns extends xi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,m=[],v=[],g=[],p=[];for(let h=0;h<u;h++){const b=h*d-a;for(let E=0;E<c;E++){const y=E*f-s;v.push(y,-b,0),g.push(0,0,1),p.push(E/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let b=0;b<o;b++){const E=b+c*h,y=b+c*(h+1),R=b+1+c*(h+1),D=b+1+c*h;m.push(E,y,D),m.push(y,R,D)}this.setIndex(m),this.setAttribute("position",new pi(v,3)),this.setAttribute("normal",new pi(g,3)),this.setAttribute("uv",new pi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ns(e.width,e.height,e.widthSegments,e.heightSegments)}}var mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_m=`#ifdef USE_ALPHAHASH
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
#endif`,gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Mm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sm=`#ifdef USE_AOMAP
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
#endif`,Em=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Am=`#ifdef USE_IRIDESCENCE
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
#endif`,wm=`#ifdef USE_BUMPMAP
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
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Fm=`#define PI 3.141592653589793
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
} // validated`,Om=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
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
#endif`,Bm=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wm="gl_FragColor = linearToOutputTexel( gl_FragColor );",km=`
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
}`,Xm=`#ifdef USE_ENVMAP
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
#endif`,qm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ym=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,$m=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,e_=`#ifdef USE_GRADIENTMAP
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
}`,t_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,n_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,i_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,s_=`uniform bool receiveShadow;
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
#endif`,o_=`#ifdef USE_ENVMAP
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
#endif`,a_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,l_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,c_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,f_=`PhysicalMaterial material;
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
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,h_=`struct PhysicalMaterial {
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
}`,d_=`
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
#endif`,p_=`#if defined( RE_IndirectDiffuse )
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
#endif`,m_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,__=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,g_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,x_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,M_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,y_=`#if defined( USE_POINTS_UV )
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
#endif`,T_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,b_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,w_=`#ifdef USE_MORPHNORMALS
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
#endif`,R_=`#ifdef USE_MORPHTARGETS
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
#endif`,C_=`#ifdef USE_MORPHTARGETS
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
#endif`,P_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,L_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,D_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,N_=`#ifdef USE_NORMALMAP
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
#endif`,F_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,O_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,B_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,z_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,V_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,W_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,X_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,j_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Z_=`float getShadowMask() {
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
}`,J_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Q_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,eg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tg=`#ifdef USE_SKINNING
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
#endif`,ng=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ig=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,og=`#ifdef USE_TRANSMISSION
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
#endif`,ag=`#ifdef USE_TRANSMISSION
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
#endif`,lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dg=`uniform sampler2D t2D;
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
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
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
}`,xg=`#if DEPTH_PACKING == 3200
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
}`,Mg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
}`,Sg=`#define DISTANCE
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
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tg=`uniform float scale;
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
}`,bg=`uniform vec3 diffuse;
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
}`,Ag=`#include <common>
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
}`,wg=`uniform vec3 diffuse;
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
}`,Rg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
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
}`,Cg=`#define LAMBERT
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
}`,Pg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
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
}`,Lg=`#define MATCAP
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
}`,Dg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
}`,Ug=`#define NORMAL
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
}`,Ig=`#define PHONG
varying vec3 vViewPosition;
#include <common>
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
}`,Ng=`#define PHONG
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
}`,Fg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
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
}`,Og=`#define STANDARD
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
}`,Bg=`#define TOON
varying vec3 vViewPosition;
#include <common>
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
}`,Hg=`#define TOON
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
}`,zg=`uniform float size;
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
}`,Gg=`uniform vec3 diffuse;
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
}`,Vg=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
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
}`,Wg=`uniform vec3 color;
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
}`,kg=`uniform float rotation;
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
}`,Xg=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:mm,alphahash_pars_fragment:_m,alphamap_fragment:gm,alphamap_pars_fragment:vm,alphatest_fragment:xm,alphatest_pars_fragment:Mm,aomap_fragment:Sm,aomap_pars_fragment:Em,begin_vertex:ym,beginnormal_vertex:Tm,bsdfs:bm,iridescence_fragment:Am,bumpmap_pars_fragment:wm,clipping_planes_fragment:Rm,clipping_planes_pars_fragment:Cm,clipping_planes_pars_vertex:Pm,clipping_planes_vertex:Lm,color_fragment:Dm,color_pars_fragment:Um,color_pars_vertex:Im,color_vertex:Nm,common:Fm,cube_uv_reflection_fragment:Om,defaultnormal_vertex:Bm,displacementmap_pars_vertex:Hm,displacementmap_vertex:zm,emissivemap_fragment:Gm,emissivemap_pars_fragment:Vm,colorspace_fragment:Wm,colorspace_pars_fragment:km,envmap_fragment:Xm,envmap_common_pars_fragment:qm,envmap_pars_fragment:Ym,envmap_pars_vertex:jm,envmap_physical_pars_fragment:o_,envmap_vertex:Km,fog_vertex:$m,fog_pars_vertex:Zm,fog_fragment:Jm,fog_pars_fragment:Qm,gradientmap_pars_fragment:e_,lightmap_fragment:t_,lightmap_pars_fragment:n_,lights_lambert_fragment:i_,lights_lambert_pars_fragment:r_,lights_pars_begin:s_,lights_toon_fragment:a_,lights_toon_pars_fragment:l_,lights_phong_fragment:c_,lights_phong_pars_fragment:u_,lights_physical_fragment:f_,lights_physical_pars_fragment:h_,lights_fragment_begin:d_,lights_fragment_maps:p_,lights_fragment_end:m_,logdepthbuf_fragment:__,logdepthbuf_pars_fragment:g_,logdepthbuf_pars_vertex:v_,logdepthbuf_vertex:x_,map_fragment:M_,map_pars_fragment:S_,map_particle_fragment:E_,map_particle_pars_fragment:y_,metalnessmap_fragment:T_,metalnessmap_pars_fragment:b_,morphcolor_vertex:A_,morphnormal_vertex:w_,morphtarget_pars_vertex:R_,morphtarget_vertex:C_,normal_fragment_begin:P_,normal_fragment_maps:L_,normal_pars_fragment:D_,normal_pars_vertex:U_,normal_vertex:I_,normalmap_pars_fragment:N_,clearcoat_normal_fragment_begin:F_,clearcoat_normal_fragment_maps:O_,clearcoat_pars_fragment:B_,iridescence_pars_fragment:H_,opaque_fragment:z_,packing:G_,premultiplied_alpha_fragment:V_,project_vertex:W_,dithering_fragment:k_,dithering_pars_fragment:X_,roughnessmap_fragment:q_,roughnessmap_pars_fragment:Y_,shadowmap_pars_fragment:j_,shadowmap_pars_vertex:K_,shadowmap_vertex:$_,shadowmask_pars_fragment:Z_,skinbase_vertex:J_,skinning_pars_vertex:Q_,skinning_vertex:eg,skinnormal_vertex:tg,specularmap_fragment:ng,specularmap_pars_fragment:ig,tonemapping_fragment:rg,tonemapping_pars_fragment:sg,transmission_fragment:og,transmission_pars_fragment:ag,uv_pars_fragment:lg,uv_pars_vertex:cg,uv_vertex:ug,worldpos_vertex:fg,background_vert:hg,background_frag:dg,backgroundCube_vert:pg,backgroundCube_frag:mg,cube_vert:_g,cube_frag:gg,depth_vert:vg,depth_frag:xg,distanceRGBA_vert:Mg,distanceRGBA_frag:Sg,equirect_vert:Eg,equirect_frag:yg,linedashed_vert:Tg,linedashed_frag:bg,meshbasic_vert:Ag,meshbasic_frag:wg,meshlambert_vert:Rg,meshlambert_frag:Cg,meshmatcap_vert:Pg,meshmatcap_frag:Lg,meshnormal_vert:Dg,meshnormal_frag:Ug,meshphong_vert:Ig,meshphong_frag:Ng,meshphysical_vert:Fg,meshphysical_frag:Og,meshtoon_vert:Bg,meshtoon_frag:Hg,points_vert:zg,points_frag:Gg,shadow_vert:Vg,shadow_frag:Wg,sprite_vert:kg,sprite_frag:Xg},_e={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},un={basic:{uniforms:wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:wt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:wt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new qe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:wt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:wt([_e.points,_e.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:wt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:wt([_e.common,_e.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:wt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:wt([_e.sprite,_e.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:wt([_e.common,_e.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:wt([_e.lights,_e.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};un.physical={uniforms:wt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ss={r:0,b:0,g:0};function qg(n,e,t,i,r,s,a){const o=new qe(0);let l=s===!0?0:1,c,u,f=null,d=0,m=null;function v(p,h){let b=!1,E=h.isScene===!0?h.background:null;E&&E.isTexture&&(E=(h.backgroundBlurriness>0?t:e).get(E)),E===null?g(o,l):E&&E.isColor&&(g(E,1),b=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),E&&(E.isCubeTexture||E.mapping===Ds)?(u===void 0&&(u=new Qt(new _i(1,1,1),new gi({name:"BackgroundCubeMaterial",uniforms:$i(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,D,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=Je.getTransfer(E.colorSpace)!==it,(f!==E||d!==E.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,f=E,d=E.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Qt(new Ns(2,2),new gi({name:"BackgroundMaterial",uniforms:$i(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,c.material.toneMapped=Je.getTransfer(E.colorSpace)!==it,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||d!==E.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,f=E,d=E.version,m=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function g(p,h){p.getRGB(ss,qu(n)),i.buffers.color.setClear(ss.r,ss.g,ss.b,h,a)}return{getClearColor:function(){return o},setClearColor:function(p,h=1){o.set(p),l=h,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,g(o,l)},render:v}}function Yg(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=p(null);let c=l,u=!1;function f(U,j,Z,z,ie){let ae=!1;if(a){const se=g(z,Z,j);c!==se&&(c=se,m(c.object)),ae=h(U,z,Z,ie),ae&&b(U,z,Z,ie)}else{const se=j.wireframe===!0;(c.geometry!==z.id||c.program!==Z.id||c.wireframe!==se)&&(c.geometry=z.id,c.program=Z.id,c.wireframe=se,ae=!0)}ie!==null&&t.update(ie,n.ELEMENT_ARRAY_BUFFER),(ae||u)&&(u=!1,V(U,j,Z,z),ie!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ie).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(U){return i.isWebGL2?n.bindVertexArray(U):s.bindVertexArrayOES(U)}function v(U){return i.isWebGL2?n.deleteVertexArray(U):s.deleteVertexArrayOES(U)}function g(U,j,Z){const z=Z.wireframe===!0;let ie=o[U.id];ie===void 0&&(ie={},o[U.id]=ie);let ae=ie[j.id];ae===void 0&&(ae={},ie[j.id]=ae);let se=ae[z];return se===void 0&&(se=p(d()),ae[z]=se),se}function p(U){const j=[],Z=[],z=[];for(let ie=0;ie<r;ie++)j[ie]=0,Z[ie]=0,z[ie]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:Z,attributeDivisors:z,object:U,attributes:{},index:null}}function h(U,j,Z,z){const ie=c.attributes,ae=j.attributes;let se=0;const I=Z.getAttributes();for(const W in I)if(I[W].location>=0){const Me=ie[W];let Ee=ae[W];if(Ee===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(Ee=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(Ee=U.instanceColor)),Me===void 0||Me.attribute!==Ee||Ee&&Me.data!==Ee.data)return!0;se++}return c.attributesNum!==se||c.index!==z}function b(U,j,Z,z){const ie={},ae=j.attributes;let se=0;const I=Z.getAttributes();for(const W in I)if(I[W].location>=0){let Me=ae[W];Me===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(Me=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(Me=U.instanceColor));const Ee={};Ee.attribute=Me,Me&&Me.data&&(Ee.data=Me.data),ie[W]=Ee,se++}c.attributes=ie,c.attributesNum=se,c.index=z}function E(){const U=c.newAttributes;for(let j=0,Z=U.length;j<Z;j++)U[j]=0}function y(U){R(U,0)}function R(U,j){const Z=c.newAttributes,z=c.enabledAttributes,ie=c.attributeDivisors;Z[U]=1,z[U]===0&&(n.enableVertexAttribArray(U),z[U]=1),ie[U]!==j&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](U,j),ie[U]=j)}function D(){const U=c.newAttributes,j=c.enabledAttributes;for(let Z=0,z=j.length;Z<z;Z++)j[Z]!==U[Z]&&(n.disableVertexAttribArray(Z),j[Z]=0)}function C(U,j,Z,z,ie,ae,se){se===!0?n.vertexAttribIPointer(U,j,Z,ie,ae):n.vertexAttribPointer(U,j,Z,z,ie,ae)}function V(U,j,Z,z){if(i.isWebGL2===!1&&(U.isInstancedMesh||z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();const ie=z.attributes,ae=Z.getAttributes(),se=j.defaultAttributeValues;for(const I in ae){const W=ae[I];if(W.location>=0){let ge=ie[I];if(ge===void 0&&(I==="instanceMatrix"&&U.instanceMatrix&&(ge=U.instanceMatrix),I==="instanceColor"&&U.instanceColor&&(ge=U.instanceColor)),ge!==void 0){const Me=ge.normalized,Ee=ge.itemSize,Re=t.get(ge);if(Re===void 0)continue;const He=Re.buffer,Le=Re.type,Ie=Re.bytesPerElement,Ze=i.isWebGL2===!0&&(Le===n.INT||Le===n.UNSIGNED_INT||ge.gpuType===Pu);if(ge.isInterleavedBufferAttribute){const Ne=ge.data,O=Ne.stride,T=ge.offset;if(Ne.isInstancedInterleavedBuffer){for(let w=0;w<W.locationSize;w++)R(W.location+w,Ne.meshPerAttribute);U.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Ne.meshPerAttribute*Ne.count)}else for(let w=0;w<W.locationSize;w++)y(W.location+w);n.bindBuffer(n.ARRAY_BUFFER,He);for(let w=0;w<W.locationSize;w++)C(W.location+w,Ee/W.locationSize,Le,Me,O*Ie,(T+Ee/W.locationSize*w)*Ie,Ze)}else{if(ge.isInstancedBufferAttribute){for(let Ne=0;Ne<W.locationSize;Ne++)R(W.location+Ne,ge.meshPerAttribute);U.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Ne=0;Ne<W.locationSize;Ne++)y(W.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,He);for(let Ne=0;Ne<W.locationSize;Ne++)C(W.location+Ne,Ee/W.locationSize,Le,Me,Ee*Ie,Ee/W.locationSize*Ne*Ie,Ze)}}else if(se!==void 0){const Me=se[I];if(Me!==void 0)switch(Me.length){case 2:n.vertexAttrib2fv(W.location,Me);break;case 3:n.vertexAttrib3fv(W.location,Me);break;case 4:n.vertexAttrib4fv(W.location,Me);break;default:n.vertexAttrib1fv(W.location,Me)}}}}D()}function x(){oe();for(const U in o){const j=o[U];for(const Z in j){const z=j[Z];for(const ie in z)v(z[ie].object),delete z[ie];delete j[Z]}delete o[U]}}function A(U){if(o[U.id]===void 0)return;const j=o[U.id];for(const Z in j){const z=j[Z];for(const ie in z)v(z[ie].object),delete z[ie];delete j[Z]}delete o[U.id]}function J(U){for(const j in o){const Z=o[j];if(Z[U.id]===void 0)continue;const z=Z[U.id];for(const ie in z)v(z[ie].object),delete z[ie];delete Z[U.id]}}function oe(){ue(),u=!0,c!==l&&(c=l,m(c.object))}function ue(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:oe,resetDefaultState:ue,dispose:x,releaseStatesOfGeometry:A,releaseStatesOfProgram:J,initAttributes:E,enableAttribute:y,disableUnusedAttributes:D}}function jg(n,e,t,i){const r=i.isWebGL2;let s;function a(c){s=c}function o(c,u){n.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,f){if(f===0)return;let d,m;if(r)d=n,m="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,c,u,f),t.update(u,s,f)}this.setMode=a,this.render=o,this.renderInstances=l}function Kg(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=d>0,y=a||e.has("OES_texture_float"),R=E&&y,D=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:p,maxVaryings:h,maxFragmentUniforms:b,vertexTextures:E,floatFragmentTextures:y,floatVertexTextures:R,maxSamples:D}}function $g(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new si,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||i!==0||r;return r=d,i=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){const v=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,h=n.get(f);if(!r||v===null||v.length===0||s&&!p)s?u(null):c();else{const b=s?0:i,E=b*4;let y=h.clippingState||null;l.value=y,y=u(v,d,E,m);for(let R=0;R!==E;++R)y[R]=t[R];h.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,m,v){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=l.value,v!==!0||p===null){const h=m+g*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<h)&&(p=new Float32Array(h));for(let E=0,y=m;E!==g;++E,y+=4)a.copy(f[E]).applyMatrix4(b,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function Zg(n){let e=new WeakMap;function t(a,o){return o===Xo?a.mapping=Yi:o===qo&&(a.mapping=ji),a}function i(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Xo||o===qo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new fm(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Jg extends Yu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Bi=4,lc=[.125,.215,.35,.446,.526,.582],li=20,bo=new Jg,cc=new qe;let Ao=null,wo=0,Ro=0;const oi=(1+Math.sqrt(5))/2,Fi=1/oi,uc=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,oi,Fi),new B(0,oi,-Fi),new B(Fi,0,oi),new B(-Fi,0,oi),new B(oi,Fi,0),new B(-oi,Fi,0)];class fc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ao=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ao,wo,Ro),e.scissorTest=!1,os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ao=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Ar,format:Jt,colorSpace:Un,depthBuffer:!1},r=hc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qg(s)),this._blurMaterial=ev(s,e,t)}return r}_compileMaterial(e){const t=new Qt(this._lodPlanes[0],e);this._renderer.compile(t,bo)}_sceneToCubeUV(e,t,i,r){const o=new Xt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(cc),u.toneMapping=Xn,u.autoClear=!1;const m=new ys({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),v=new Qt(new _i,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(cc),g=!0);for(let h=0;h<6;h++){const b=h%3;b===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):b===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const E=this._cubeSize;os(r,b*E,h>2?E:0,E,E),u.setRenderTarget(r),g&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Yi||e.mapping===ji;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Qt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;os(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,bo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=uc[(r-1)%uc.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Qt(this._lodPlanes[r],c),d=c.uniforms,m=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*li-1),g=s/v,p=isFinite(s)?1+Math.floor(u*g):li;p>li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${li}`);const h=[];let b=0;for(let C=0;C<li;++C){const V=C/g,x=Math.exp(-V*V/2);h.push(x),C===0?b+=x:C<p&&(b+=2*x)}for(let C=0;C<h.length;C++)h[C]=h[C]/b;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=v,d.mipInt.value=E-i;const y=this._sizeLods[r],R=3*y*(r>E-Bi?r-E+Bi:0),D=4*(this._cubeSize-y);os(t,R,D,3*y,2*y),l.setRenderTarget(t),l.render(f,bo)}}function Qg(n){const e=[],t=[],i=[];let r=n;const s=n-Bi+1+lc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Bi?l=lc[a-n+Bi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,v=6,g=3,p=2,h=1,b=new Float32Array(g*v*m),E=new Float32Array(p*v*m),y=new Float32Array(h*v*m);for(let D=0;D<m;D++){const C=D%3*2/3-1,V=D>2?0:-1,x=[C,V,0,C+2/3,V,0,C+2/3,V+1,0,C,V,0,C+2/3,V+1,0,C,V+1,0];b.set(x,g*v*D),E.set(d,p*v*D);const A=[D,D,D,D,D,D];y.set(A,h*v*D)}const R=new xi;R.setAttribute("position",new dn(b,g)),R.setAttribute("uv",new dn(E,p)),R.setAttribute("faceIndex",new dn(y,h)),e.push(R),r>Bi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function hc(n,e,t){const i=new mi(n,e,t);return i.texture.mapping=Ds,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function os(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function ev(n,e,t){const i=new Float32Array(li),r=new B(0,1,0);return new gi({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:wa(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function dc(){return new gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function pc(){return new gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function wa(){return`

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
	`}function tv(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xo||l===qo,u=l===Yi||l===ji;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new fc(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new fc(n));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function nv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function iv(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);for(const v in d.morphAttributes){const g=d.morphAttributes[v];for(let p=0,h=g.length;p<h;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const v in d)e.update(d[v],n.ARRAY_BUFFER);const m=f.morphAttributes;for(const v in m){const g=m[v];for(let p=0,h=g.length;p<h;p++)e.update(g[p],n.ARRAY_BUFFER)}}function c(f){const d=[],m=f.index,v=f.attributes.position;let g=0;if(m!==null){const b=m.array;g=m.version;for(let E=0,y=b.length;E<y;E+=3){const R=b[E+0],D=b[E+1],C=b[E+2];d.push(R,D,D,C,C,R)}}else if(v!==void 0){const b=v.array;g=v.version;for(let E=0,y=b.length/3-1;E<y;E+=3){const R=E+0,D=E+1,C=E+2;d.push(R,D,D,C,C,R)}}else return;const p=new(Bu(d)?Xu:ku)(d,1);p.version=g;const h=s.get(f);h&&e.remove(h),s.set(f,p)}function u(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function rv(n,e,t,i){const r=i.isWebGL2;let s;function a(d){s=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function u(d,m){n.drawElements(s,m,o,d*l),t.update(m,s,1)}function f(d,m,v){if(v===0)return;let g,p;if(r)g=n,p="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[p](s,m,o,d*l,v),t.update(m,s,v)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=f}function sv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function ov(n,e){return n[0]-e[0]}function av(n,e){return Math.abs(e[1])-Math.abs(n[1])}function lv(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new gt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,f){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=v!==void 0?v.length:0;let p=s.get(u);if(p===void 0||p.count!==g){let j=function(){ue.dispose(),s.delete(u),u.removeEventListener("dispose",j)};var m=j;p!==void 0&&p.texture.dispose();const E=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,D=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],V=u.morphAttributes.color||[];let x=0;E===!0&&(x=1),y===!0&&(x=2),R===!0&&(x=3);let A=u.attributes.position.count*x,J=1;A>e.maxTextureSize&&(J=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const oe=new Float32Array(A*J*4*g),ue=new Gu(oe,A,J,g);ue.type=Wn,ue.needsUpdate=!0;const U=x*4;for(let Z=0;Z<g;Z++){const z=D[Z],ie=C[Z],ae=V[Z],se=A*J*4*Z;for(let I=0;I<z.count;I++){const W=I*U;E===!0&&(a.fromBufferAttribute(z,I),oe[se+W+0]=a.x,oe[se+W+1]=a.y,oe[se+W+2]=a.z,oe[se+W+3]=0),y===!0&&(a.fromBufferAttribute(ie,I),oe[se+W+4]=a.x,oe[se+W+5]=a.y,oe[se+W+6]=a.z,oe[se+W+7]=0),R===!0&&(a.fromBufferAttribute(ae,I),oe[se+W+8]=a.x,oe[se+W+9]=a.y,oe[se+W+10]=a.z,oe[se+W+11]=ae.itemSize===4?a.w:1)}}p={count:g,texture:ue,size:new Qe(A,J)},s.set(u,p),u.addEventListener("dispose",j)}let h=0;for(let E=0;E<d.length;E++)h+=d[E];const b=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",b),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const v=d===void 0?0:d.length;let g=i[u.id];if(g===void 0||g.length!==v){g=[];for(let y=0;y<v;y++)g[y]=[y,0];i[u.id]=g}for(let y=0;y<v;y++){const R=g[y];R[0]=y,R[1]=d[y]}g.sort(av);for(let y=0;y<8;y++)y<v&&g[y][1]?(o[y][0]=g[y][0],o[y][1]=g[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(ov);const p=u.morphAttributes.position,h=u.morphAttributes.normal;let b=0;for(let y=0;y<8;y++){const R=o[y],D=R[0],C=R[1];D!==Number.MAX_SAFE_INTEGER&&C?(p&&u.getAttribute("morphTarget"+y)!==p[D]&&u.setAttribute("morphTarget"+y,p[D]),h&&u.getAttribute("morphNormal"+y)!==h[D]&&u.setAttribute("morphNormal"+y,h[D]),r[y]=C,b+=C):(p&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),h&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),r[y]=0)}const E=u.morphTargetsRelative?1:1-b;f.getUniforms().setValue(n,"morphTargetBaseInfluence",E),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function cv(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const Zu=new Gt,Ju=new Gu,Qu=new Yp,ef=new ju,mc=[],_c=[],gc=new Float32Array(16),vc=new Float32Array(9),xc=new Float32Array(4);function Ji(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=mc[r];if(s===void 0&&(s=new Float32Array(r),mc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ht(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Fs(n,e){let t=_c[e];t===void 0&&(t=new Int32Array(e),_c[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function uv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function fv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2fv(this.addr,e),ht(t,e)}}function hv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;n.uniform3fv(this.addr,e),ht(t,e)}}function dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4fv(this.addr,e),ht(t,e)}}function pv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ht(t,e)}else{if(ft(t,i))return;xc.set(i),n.uniformMatrix2fv(this.addr,!1,xc),ht(t,i)}}function mv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ht(t,e)}else{if(ft(t,i))return;vc.set(i),n.uniformMatrix3fv(this.addr,!1,vc),ht(t,i)}}function _v(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ht(t,e)}else{if(ft(t,i))return;gc.set(i),n.uniformMatrix4fv(this.addr,!1,gc),ht(t,i)}}function gv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function vv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2iv(this.addr,e),ht(t,e)}}function xv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3iv(this.addr,e),ht(t,e)}}function Mv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4iv(this.addr,e),ht(t,e)}}function Sv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ev(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2uiv(this.addr,e),ht(t,e)}}function yv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3uiv(this.addr,e),ht(t,e)}}function Tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4uiv(this.addr,e),ht(t,e)}}function bv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2D(e||Zu,r)}function Av(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Qu,r)}function wv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ef,r)}function Rv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ju,r)}function Cv(n){switch(n){case 5126:return uv;case 35664:return fv;case 35665:return hv;case 35666:return dv;case 35674:return pv;case 35675:return mv;case 35676:return _v;case 5124:case 35670:return gv;case 35667:case 35671:return vv;case 35668:case 35672:return xv;case 35669:case 35673:return Mv;case 5125:return Sv;case 36294:return Ev;case 36295:return yv;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return bv;case 35679:case 36299:case 36307:return Av;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return Rv}}function Pv(n,e){n.uniform1fv(this.addr,e)}function Lv(n,e){const t=Ji(e,this.size,2);n.uniform2fv(this.addr,t)}function Dv(n,e){const t=Ji(e,this.size,3);n.uniform3fv(this.addr,t)}function Uv(n,e){const t=Ji(e,this.size,4);n.uniform4fv(this.addr,t)}function Iv(n,e){const t=Ji(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Nv(n,e){const t=Ji(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Fv(n,e){const t=Ji(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Ov(n,e){n.uniform1iv(this.addr,e)}function Bv(n,e){n.uniform2iv(this.addr,e)}function Hv(n,e){n.uniform3iv(this.addr,e)}function zv(n,e){n.uniform4iv(this.addr,e)}function Gv(n,e){n.uniform1uiv(this.addr,e)}function Vv(n,e){n.uniform2uiv(this.addr,e)}function Wv(n,e){n.uniform3uiv(this.addr,e)}function kv(n,e){n.uniform4uiv(this.addr,e)}function Xv(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Zu,s[a])}function qv(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Qu,s[a])}function Yv(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ef,s[a])}function jv(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ju,s[a])}function Kv(n){switch(n){case 5126:return Pv;case 35664:return Lv;case 35665:return Dv;case 35666:return Uv;case 35674:return Iv;case 35675:return Nv;case 35676:return Fv;case 5124:case 35670:return Ov;case 35667:case 35671:return Bv;case 35668:case 35672:return Hv;case 35669:case 35673:return zv;case 5125:return Gv;case 36294:return Vv;case 36295:return Wv;case 36296:return kv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return jv}}class $v{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=Cv(t.type)}}class Zv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=Kv(t.type)}}class Jv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Co=/(\w+)(\])?(\[|\.)?/g;function Mc(n,e){n.seq.push(e),n.map[e.id]=e}function Qv(n,e,t){const i=n.name,r=i.length;for(Co.lastIndex=0;;){const s=Co.exec(i),a=Co.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Mc(t,c===void 0?new $v(o,n,e):new Zv(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Jv(o),Mc(t,f)),t=f}}}class us{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Qv(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Sc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ex=37297;let tx=0;function nx(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function ix(n){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(n);let i;switch(e===t?i="":e===Ms&&t===xs?i="LinearDisplayP3ToLinearSRGB":e===xs&&t===Ms&&(i="LinearSRGBToLinearDisplayP3"),n){case Un:case Us:return[i,"LinearTransferOETF"];case _t:case ba:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ec(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+nx(n.getShaderSource(e),a)}else return r}function rx(n,e){const t=ix(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function sx(n,e){let t;switch(e){case mp:t="Linear";break;case _p:t="Reinhard";break;case gp:t="OptimizedCineon";break;case vp:t="ACESFilmic";break;case xp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ox(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(cr).join(`
`)}function ax(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function lx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function cr(n){return n!==""}function yc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Tc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(n){return n.replace(cx,fx)}const ux=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function fx(n,e){let t=ze[e];if(t===void 0){const i=ux.get(e);if(i!==void 0)t=ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Jo(t)}const hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bc(n){return n.replace(hx,dx)}function dx(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ac(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function px(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ru?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Wd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function mx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Yi:case ji:e="ENVMAP_TYPE_CUBE";break;case Ds:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _x(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ji:e="ENVMAP_MODE_REFRACTION";break}return e}function gx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ya:e="ENVMAP_BLENDING_MULTIPLY";break;case dp:e="ENVMAP_BLENDING_MIX";break;case pp:e="ENVMAP_BLENDING_ADD";break}return e}function vx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function xx(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=px(t),c=mx(t),u=_x(t),f=gx(t),d=vx(t),m=t.isWebGL2?"":ox(t),v=ax(s),g=r.createProgram();let p,h,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(cr).join(`
`),p.length>0&&(p+=`
`),h=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(cr).join(`
`),h.length>0&&(h+=`
`)):(p=[Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cr).join(`
`),h=[m,Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Xn?sx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,rx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cr).join(`
`)),a=Jo(a),a=yc(a,t),a=Tc(a,t),o=Jo(o),o=yc(o,t),o=Tc(o,t),a=bc(a),o=bc(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const E=b+p+a,y=b+h+o,R=Sc(r,r.VERTEX_SHADER,E),D=Sc(r,r.FRAGMENT_SHADER,y);r.attachShader(g,R),r.attachShader(g,D),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function C(J){if(n.debug.checkShaderErrors){const oe=r.getProgramInfoLog(g).trim(),ue=r.getShaderInfoLog(R).trim(),U=r.getShaderInfoLog(D).trim();let j=!0,Z=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,R,D);else{const z=Ec(r,R,"vertex"),ie=Ec(r,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Program Info Log: `+oe+`
`+z+`
`+ie)}else oe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",oe):(ue===""||U==="")&&(Z=!1);Z&&(J.diagnostics={runnable:j,programLog:oe,vertexShader:{log:ue,prefix:p},fragmentShader:{log:U,prefix:h}})}r.deleteShader(R),r.deleteShader(D),V=new us(r,g),x=lx(r,g)}let V;this.getUniforms=function(){return V===void 0&&C(this),V};let x;this.getAttributes=function(){return x===void 0&&C(this),x};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=r.getProgramParameter(g,ex)),A},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=D,this}let Mx=0;class Sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ex(e),t.set(e,i)),i}}class Ex{constructor(e){this.id=Mx++,this.code=e,this.usedTimes=0}}function yx(n,e,t,i,r,s,a){const o=new Vu,l=new Sx,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return x===0?"uv":`uv${x}`}function p(x,A,J,oe,ue){const U=oe.fog,j=ue.geometry,Z=x.isMeshStandardMaterial?oe.environment:null,z=(x.isMeshStandardMaterial?t:e).get(x.envMap||Z),ie=z&&z.mapping===Ds?z.image.height:null,ae=v[x.type];x.precision!==null&&(m=r.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const se=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,I=se!==void 0?se.length:0;let W=0;j.morphAttributes.position!==void 0&&(W=1),j.morphAttributes.normal!==void 0&&(W=2),j.morphAttributes.color!==void 0&&(W=3);let ge,Me,Ee,Re;if(ae){const at=un[ae];ge=at.vertexShader,Me=at.fragmentShader}else ge=x.vertexShader,Me=x.fragmentShader,l.update(x),Ee=l.getVertexShaderID(x),Re=l.getFragmentShaderID(x);const He=n.getRenderTarget(),Le=ue.isInstancedMesh===!0,Ie=!!x.map,Ze=!!x.matcap,Ne=!!z,O=!!x.aoMap,T=!!x.lightMap,w=!!x.bumpMap,N=!!x.normalMap,H=!!x.displacementMap,K=!!x.emissiveMap,k=!!x.metalnessMap,te=!!x.roughnessMap,re=x.anisotropy>0,le=x.clearcoat>0,ee=x.iridescence>0,M=x.sheen>0,_=x.transmission>0,P=re&&!!x.anisotropyMap,q=le&&!!x.clearcoatMap,$=le&&!!x.clearcoatNormalMap,ne=le&&!!x.clearcoatRoughnessMap,pe=ee&&!!x.iridescenceMap,ce=ee&&!!x.iridescenceThicknessMap,he=M&&!!x.sheenColorMap,ye=M&&!!x.sheenRoughnessMap,De=!!x.specularMap,fe=!!x.specularColorMap,Ye=!!x.specularIntensityMap,Te=_&&!!x.transmissionMap,be=_&&!!x.thicknessMap,we=!!x.gradientMap,xe=!!x.alphaMap,Xe=x.alphaTest>0,L=!!x.alphaHash,ve=!!x.extensions,de=!!j.attributes.uv1,Q=!!j.attributes.uv2,me=!!j.attributes.uv3;let Ce=Xn;return x.toneMapped&&(He===null||He.isXRRenderTarget===!0)&&(Ce=n.toneMapping),{isWebGL2:u,shaderID:ae,shaderType:x.type,shaderName:x.name,vertexShader:ge,fragmentShader:Me,defines:x.defines,customVertexShaderID:Ee,customFragmentShaderID:Re,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,instancing:Le,instancingColor:Le&&ue.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:He===null?n.outputColorSpace:He.isXRRenderTarget===!0?He.texture.colorSpace:Un,map:Ie,matcap:Ze,envMap:Ne,envMapMode:Ne&&z.mapping,envMapCubeUVHeight:ie,aoMap:O,lightMap:T,bumpMap:w,normalMap:N,displacementMap:d&&H,emissiveMap:K,normalMapObjectSpace:N&&x.normalMapType===Dp,normalMapTangentSpace:N&&x.normalMapType===Ou,metalnessMap:k,roughnessMap:te,anisotropy:re,anisotropyMap:P,clearcoat:le,clearcoatMap:q,clearcoatNormalMap:$,clearcoatRoughnessMap:ne,iridescence:ee,iridescenceMap:pe,iridescenceThicknessMap:ce,sheen:M,sheenColorMap:he,sheenRoughnessMap:ye,specularMap:De,specularColorMap:fe,specularIntensityMap:Ye,transmission:_,transmissionMap:Te,thicknessMap:be,gradientMap:we,opaque:x.transparent===!1&&x.blending===Wi,alphaMap:xe,alphaTest:Xe,alphaHash:L,combine:x.combine,mapUv:Ie&&g(x.map.channel),aoMapUv:O&&g(x.aoMap.channel),lightMapUv:T&&g(x.lightMap.channel),bumpMapUv:w&&g(x.bumpMap.channel),normalMapUv:N&&g(x.normalMap.channel),displacementMapUv:H&&g(x.displacementMap.channel),emissiveMapUv:K&&g(x.emissiveMap.channel),metalnessMapUv:k&&g(x.metalnessMap.channel),roughnessMapUv:te&&g(x.roughnessMap.channel),anisotropyMapUv:P&&g(x.anisotropyMap.channel),clearcoatMapUv:q&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:$&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:he&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(x.sheenRoughnessMap.channel),specularMapUv:De&&g(x.specularMap.channel),specularColorMapUv:fe&&g(x.specularColorMap.channel),specularIntensityMapUv:Ye&&g(x.specularIntensityMap.channel),transmissionMapUv:Te&&g(x.transmissionMap.channel),thicknessMapUv:be&&g(x.thicknessMap.channel),alphaMapUv:xe&&g(x.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(N||re),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,vertexUv1s:de,vertexUv2s:Q,vertexUv3s:me,pointsUvs:ue.isPoints===!0&&!!j.attributes.uv&&(Ie||xe),fog:!!U,useFog:x.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ue.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:W,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&J.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ie&&x.map.isVideoTexture===!0&&Je.getTransfer(x.map.colorSpace)===it,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Rn,flipSided:x.side===It,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:ve&&x.extensions.derivatives===!0,extensionFragDepth:ve&&x.extensions.fragDepth===!0,extensionDrawBuffers:ve&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function h(x){const A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(const J in x.defines)A.push(J),A.push(x.defines[J]);return x.isRawShaderMaterial===!1&&(b(A,x),E(A,x),A.push(n.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function b(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function E(x,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),x.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),x.push(o.mask)}function y(x){const A=v[x.type];let J;if(A){const oe=un[A];J=am.clone(oe.uniforms)}else J=x.uniforms;return J}function R(x,A){let J;for(let oe=0,ue=c.length;oe<ue;oe++){const U=c[oe];if(U.cacheKey===A){J=U,++J.usedTimes;break}}return J===void 0&&(J=new xx(n,A,x,s),c.push(J)),J}function D(x){if(--x.usedTimes===0){const A=c.indexOf(x);c[A]=c[c.length-1],c.pop(),x.destroy()}}function C(x){l.remove(x)}function V(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:y,acquireProgram:R,releaseProgram:D,releaseShaderCache:C,programs:c,dispose:V}}function Tx(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function bx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function wc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Rc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,m,v,g,p){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:m,groupOrder:v,renderOrder:f.renderOrder,z:g,group:p},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=m,h.groupOrder=v,h.renderOrder=f.renderOrder,h.z=g,h.group=p),e++,h}function o(f,d,m,v,g,p){const h=a(f,d,m,v,g,p);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):t.push(h)}function l(f,d,m,v,g,p){const h=a(f,d,m,v,g,p);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function c(f,d){t.length>1&&t.sort(f||bx),i.length>1&&i.sort(d||wc),r.length>1&&r.sort(d||wc)}function u(){for(let f=e,d=n.length;f<d;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function Ax(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Rc,n.set(i,[a])):r>=s.length?(a=new Rc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function wx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new qe};break;case"SpotLight":t={position:new B,direction:new B,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function Rx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Cx=0;function Px(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Lx(n,e){const t=new wx,i=Rx(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new B);const s=new B,a=new vt,o=new vt;function l(u,f){let d=0,m=0,v=0;for(let oe=0;oe<9;oe++)r.probe[oe].set(0,0,0);let g=0,p=0,h=0,b=0,E=0,y=0,R=0,D=0,C=0,V=0,x=0;u.sort(Px);const A=f===!0?Math.PI:1;for(let oe=0,ue=u.length;oe<ue;oe++){const U=u[oe],j=U.color,Z=U.intensity,z=U.distance,ie=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)d+=j.r*Z*A,m+=j.g*Z*A,v+=j.b*Z*A;else if(U.isLightProbe){for(let ae=0;ae<9;ae++)r.probe[ae].addScaledVector(U.sh.coefficients[ae],Z);x++}else if(U.isDirectionalLight){const ae=t.get(U);if(ae.color.copy(U.color).multiplyScalar(U.intensity*A),U.castShadow){const se=U.shadow,I=i.get(U);I.shadowBias=se.bias,I.shadowNormalBias=se.normalBias,I.shadowRadius=se.radius,I.shadowMapSize=se.mapSize,r.directionalShadow[g]=I,r.directionalShadowMap[g]=ie,r.directionalShadowMatrix[g]=U.shadow.matrix,y++}r.directional[g]=ae,g++}else if(U.isSpotLight){const ae=t.get(U);ae.position.setFromMatrixPosition(U.matrixWorld),ae.color.copy(j).multiplyScalar(Z*A),ae.distance=z,ae.coneCos=Math.cos(U.angle),ae.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),ae.decay=U.decay,r.spot[h]=ae;const se=U.shadow;if(U.map&&(r.spotLightMap[C]=U.map,C++,se.updateMatrices(U),U.castShadow&&V++),r.spotLightMatrix[h]=se.matrix,U.castShadow){const I=i.get(U);I.shadowBias=se.bias,I.shadowNormalBias=se.normalBias,I.shadowRadius=se.radius,I.shadowMapSize=se.mapSize,r.spotShadow[h]=I,r.spotShadowMap[h]=ie,D++}h++}else if(U.isRectAreaLight){const ae=t.get(U);ae.color.copy(j).multiplyScalar(Z),ae.halfWidth.set(U.width*.5,0,0),ae.halfHeight.set(0,U.height*.5,0),r.rectArea[b]=ae,b++}else if(U.isPointLight){const ae=t.get(U);if(ae.color.copy(U.color).multiplyScalar(U.intensity*A),ae.distance=U.distance,ae.decay=U.decay,U.castShadow){const se=U.shadow,I=i.get(U);I.shadowBias=se.bias,I.shadowNormalBias=se.normalBias,I.shadowRadius=se.radius,I.shadowMapSize=se.mapSize,I.shadowCameraNear=se.camera.near,I.shadowCameraFar=se.camera.far,r.pointShadow[p]=I,r.pointShadowMap[p]=ie,r.pointShadowMatrix[p]=U.shadow.matrix,R++}r.point[p]=ae,p++}else if(U.isHemisphereLight){const ae=t.get(U);ae.skyColor.copy(U.color).multiplyScalar(Z*A),ae.groundColor.copy(U.groundColor).multiplyScalar(Z*A),r.hemi[E]=ae,E++}}b>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=v;const J=r.hash;(J.directionalLength!==g||J.pointLength!==p||J.spotLength!==h||J.rectAreaLength!==b||J.hemiLength!==E||J.numDirectionalShadows!==y||J.numPointShadows!==R||J.numSpotShadows!==D||J.numSpotMaps!==C||J.numLightProbes!==x)&&(r.directional.length=g,r.spot.length=h,r.rectArea.length=b,r.point.length=p,r.hemi.length=E,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=D,r.spotShadowMap.length=D,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=D+C-V,r.spotLightMap.length=C,r.numSpotLightShadowsWithMaps=V,r.numLightProbes=x,J.directionalLength=g,J.pointLength=p,J.spotLength=h,J.rectAreaLength=b,J.hemiLength=E,J.numDirectionalShadows=y,J.numPointShadows=R,J.numSpotShadows=D,J.numSpotMaps=C,J.numLightProbes=x,r.version=Cx++)}function c(u,f){let d=0,m=0,v=0,g=0,p=0;const h=f.matrixWorldInverse;for(let b=0,E=u.length;b<E;b++){const y=u[b];if(y.isDirectionalLight){const R=r.directional[d];R.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(h),d++}else if(y.isSpotLight){const R=r.spot[v];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(h),R.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(h),v++}else if(y.isRectAreaLight){const R=r.rectArea[g];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(h),o.identity(),a.copy(y.matrixWorld),a.premultiply(h),o.extractRotation(a),R.halfWidth.set(y.width*.5,0,0),R.halfHeight.set(0,y.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const R=r.point[m];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(h),m++}else if(y.isHemisphereLight){const R=r.hemi[p];R.direction.setFromMatrixPosition(y.matrixWorld),R.direction.transformDirection(h),p++}}}return{setup:l,setupView:c,state:r}}function Cc(n,e){const t=new Lx(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Dx(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Cc(n,e),t.set(s,[l])):a>=o.length?(l=new Cc(n,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class Ux extends Ur{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ix extends Ur{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fx=`uniform sampler2D shadow_pass;
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
}`;function Ox(n,e,t){let i=new Ku;const r=new Qe,s=new Qe,a=new gt,o=new Ux({depthPacking:Lp}),l=new Ix,c={},u=t.maxTextureSize,f={[Kn]:It,[It]:Kn,[Rn]:Rn},d=new gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:Nx,fragmentShader:Fx}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const v=new xi;v.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Qt(v,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ru;let h=this.type;this.render=function(R,D,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const V=n.getRenderTarget(),x=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),J=n.state;J.setBlending(kn),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const oe=h!==En&&this.type===En,ue=h===En&&this.type!==En;for(let U=0,j=R.length;U<j;U++){const Z=R[U],z=Z.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const ie=z.getFrameExtents();if(r.multiply(ie),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,z.mapSize.y=s.y)),z.map===null||oe===!0||ue===!0){const se=this.type!==En?{minFilter:Rt,magFilter:Rt}:{};z.map!==null&&z.map.dispose(),z.map=new mi(r.x,r.y,se),z.map.texture.name=Z.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const ae=z.getViewportCount();for(let se=0;se<ae;se++){const I=z.getViewport(se);a.set(s.x*I.x,s.y*I.y,s.x*I.z,s.y*I.w),J.viewport(a),z.updateMatrices(Z,se),i=z.getFrustum(),y(D,C,z.camera,Z,this.type)}z.isPointLightShadow!==!0&&this.type===En&&b(z,C),z.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(V,x,A)};function b(R,D){const C=e.update(g);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new mi(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(D,null,C,d,g,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(D,null,C,m,g,null)}function E(R,D,C,V){let x=null;const A=C.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(A!==void 0)x=A;else if(x=C.isPointLight===!0?l:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const J=x.uuid,oe=D.uuid;let ue=c[J];ue===void 0&&(ue={},c[J]=ue);let U=ue[oe];U===void 0&&(U=x.clone(),ue[oe]=U),x=U}if(x.visible=D.visible,x.wireframe=D.wireframe,V===En?x.side=D.shadowSide!==null?D.shadowSide:D.side:x.side=D.shadowSide!==null?D.shadowSide:f[D.side],x.alphaMap=D.alphaMap,x.alphaTest=D.alphaTest,x.map=D.map,x.clipShadows=D.clipShadows,x.clippingPlanes=D.clippingPlanes,x.clipIntersection=D.clipIntersection,x.displacementMap=D.displacementMap,x.displacementScale=D.displacementScale,x.displacementBias=D.displacementBias,x.wireframeLinewidth=D.wireframeLinewidth,x.linewidth=D.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const J=n.properties.get(x);J.light=C}return x}function y(R,D,C,V,x){if(R.visible===!1)return;if(R.layers.test(D.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===En)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,R.matrixWorld);const oe=e.update(R),ue=R.material;if(Array.isArray(ue)){const U=oe.groups;for(let j=0,Z=U.length;j<Z;j++){const z=U[j],ie=ue[z.materialIndex];if(ie&&ie.visible){const ae=E(R,ie,V,x);n.renderBufferDirect(C,null,oe,ae,R,z)}}}else if(ue.visible){const U=E(R,ue,V,x);n.renderBufferDirect(C,null,oe,U,R,null)}}const J=R.children;for(let oe=0,ue=J.length;oe<ue;oe++)y(J[oe],D,C,V,x)}}function Bx(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const ve=new gt;let de=null;const Q=new gt(0,0,0,0);return{setMask:function(me){de!==me&&!L&&(n.colorMask(me,me,me,me),de=me)},setLocked:function(me){L=me},setClear:function(me,Ce,je,at,Vt){Vt===!0&&(me*=at,Ce*=at,je*=at),ve.set(me,Ce,je,at),Q.equals(ve)===!1&&(n.clearColor(me,Ce,je,at),Q.copy(ve))},reset:function(){L=!1,de=null,Q.set(-1,0,0,0)}}}function s(){let L=!1,ve=null,de=null,Q=null;return{setTest:function(me){me?Ie(n.DEPTH_TEST):Ze(n.DEPTH_TEST)},setMask:function(me){ve!==me&&!L&&(n.depthMask(me),ve=me)},setFunc:function(me){if(de!==me){switch(me){case op:n.depthFunc(n.NEVER);break;case ap:n.depthFunc(n.ALWAYS);break;case lp:n.depthFunc(n.LESS);break;case gs:n.depthFunc(n.LEQUAL);break;case cp:n.depthFunc(n.EQUAL);break;case up:n.depthFunc(n.GEQUAL);break;case fp:n.depthFunc(n.GREATER);break;case hp:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}de=me}},setLocked:function(me){L=me},setClear:function(me){Q!==me&&(n.clearDepth(me),Q=me)},reset:function(){L=!1,ve=null,de=null,Q=null}}}function a(){let L=!1,ve=null,de=null,Q=null,me=null,Ce=null,je=null,at=null,Vt=null;return{setTest:function(et){L||(et?Ie(n.STENCIL_TEST):Ze(n.STENCIL_TEST))},setMask:function(et){ve!==et&&!L&&(n.stencilMask(et),ve=et)},setFunc:function(et,Tt,sn){(de!==et||Q!==Tt||me!==sn)&&(n.stencilFunc(et,Tt,sn),de=et,Q=Tt,me=sn)},setOp:function(et,Tt,sn){(Ce!==et||je!==Tt||at!==sn)&&(n.stencilOp(et,Tt,sn),Ce=et,je=Tt,at=sn)},setLocked:function(et){L=et},setClear:function(et){Vt!==et&&(n.clearStencil(et),Vt=et)},reset:function(){L=!1,ve=null,de=null,Q=null,me=null,Ce=null,je=null,at=null,Vt=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,f=new WeakMap;let d={},m={},v=new WeakMap,g=[],p=null,h=!1,b=null,E=null,y=null,R=null,D=null,C=null,V=null,x=new qe(0,0,0),A=0,J=!1,oe=null,ue=null,U=null,j=null,Z=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ie=!1,ae=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(se)[1]),ie=ae>=1):se.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),ie=ae>=2);let I=null,W={};const ge=n.getParameter(n.SCISSOR_BOX),Me=n.getParameter(n.VIEWPORT),Ee=new gt().fromArray(ge),Re=new gt().fromArray(Me);function He(L,ve,de,Q){const me=new Uint8Array(4),Ce=n.createTexture();n.bindTexture(L,Ce),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let je=0;je<de;je++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(ve,0,n.RGBA,1,1,Q,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(ve+je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return Ce}const Le={};Le[n.TEXTURE_2D]=He(n.TEXTURE_2D,n.TEXTURE_2D,1),Le[n.TEXTURE_CUBE_MAP]=He(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Le[n.TEXTURE_2D_ARRAY]=He(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Le[n.TEXTURE_3D]=He(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ie(n.DEPTH_TEST),l.setFunc(gs),k(!1),te(ul),Ie(n.CULL_FACE),H(kn);function Ie(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Ze(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Ne(L,ve){return m[L]!==ve?(n.bindFramebuffer(L,ve),m[L]=ve,i&&(L===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=ve),L===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=ve)),!0):!1}function O(L,ve){let de=g,Q=!1;if(L)if(de=v.get(ve),de===void 0&&(de=[],v.set(ve,de)),L.isWebGLMultipleRenderTargets){const me=L.texture;if(de.length!==me.length||de[0]!==n.COLOR_ATTACHMENT0){for(let Ce=0,je=me.length;Ce<je;Ce++)de[Ce]=n.COLOR_ATTACHMENT0+Ce;de.length=me.length,Q=!0}}else de[0]!==n.COLOR_ATTACHMENT0&&(de[0]=n.COLOR_ATTACHMENT0,Q=!0);else de[0]!==n.BACK&&(de[0]=n.BACK,Q=!0);Q&&(t.isWebGL2?n.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function T(L){return p!==L?(n.useProgram(L),p=L,!0):!1}const w={[ai]:n.FUNC_ADD,[Xd]:n.FUNC_SUBTRACT,[qd]:n.FUNC_REVERSE_SUBTRACT};if(i)w[pl]=n.MIN,w[ml]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(w[pl]=L.MIN_EXT,w[ml]=L.MAX_EXT)}const N={[Yd]:n.ZERO,[jd]:n.ONE,[Kd]:n.SRC_COLOR,[Wo]:n.SRC_ALPHA,[tp]:n.SRC_ALPHA_SATURATE,[Qd]:n.DST_COLOR,[Zd]:n.DST_ALPHA,[$d]:n.ONE_MINUS_SRC_COLOR,[ko]:n.ONE_MINUS_SRC_ALPHA,[ep]:n.ONE_MINUS_DST_COLOR,[Jd]:n.ONE_MINUS_DST_ALPHA,[np]:n.CONSTANT_COLOR,[ip]:n.ONE_MINUS_CONSTANT_COLOR,[rp]:n.CONSTANT_ALPHA,[sp]:n.ONE_MINUS_CONSTANT_ALPHA};function H(L,ve,de,Q,me,Ce,je,at,Vt,et){if(L===kn){h===!0&&(Ze(n.BLEND),h=!1);return}if(h===!1&&(Ie(n.BLEND),h=!0),L!==kd){if(L!==b||et!==J){if((E!==ai||D!==ai)&&(n.blendEquation(n.FUNC_ADD),E=ai,D=ai),et)switch(L){case Wi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fl:n.blendFunc(n.ONE,n.ONE);break;case hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case dl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Wi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case dl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}y=null,R=null,C=null,V=null,x.set(0,0,0),A=0,b=L,J=et}return}me=me||ve,Ce=Ce||de,je=je||Q,(ve!==E||me!==D)&&(n.blendEquationSeparate(w[ve],w[me]),E=ve,D=me),(de!==y||Q!==R||Ce!==C||je!==V)&&(n.blendFuncSeparate(N[de],N[Q],N[Ce],N[je]),y=de,R=Q,C=Ce,V=je),(at.equals(x)===!1||Vt!==A)&&(n.blendColor(at.r,at.g,at.b,Vt),x.copy(at),A=Vt),b=L,J=!1}function K(L,ve){L.side===Rn?Ze(n.CULL_FACE):Ie(n.CULL_FACE);let de=L.side===It;ve&&(de=!de),k(de),L.blending===Wi&&L.transparent===!1?H(kn):H(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Q=L.stencilWrite;c.setTest(Q),Q&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),le(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ie(n.SAMPLE_ALPHA_TO_COVERAGE):Ze(n.SAMPLE_ALPHA_TO_COVERAGE)}function k(L){oe!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),oe=L)}function te(L){L!==Gd?(Ie(n.CULL_FACE),L!==ue&&(L===ul?n.cullFace(n.BACK):L===Vd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ze(n.CULL_FACE),ue=L}function re(L){L!==U&&(ie&&n.lineWidth(L),U=L)}function le(L,ve,de){L?(Ie(n.POLYGON_OFFSET_FILL),(j!==ve||Z!==de)&&(n.polygonOffset(ve,de),j=ve,Z=de)):Ze(n.POLYGON_OFFSET_FILL)}function ee(L){L?Ie(n.SCISSOR_TEST):Ze(n.SCISSOR_TEST)}function M(L){L===void 0&&(L=n.TEXTURE0+z-1),I!==L&&(n.activeTexture(L),I=L)}function _(L,ve,de){de===void 0&&(I===null?de=n.TEXTURE0+z-1:de=I);let Q=W[de];Q===void 0&&(Q={type:void 0,texture:void 0},W[de]=Q),(Q.type!==L||Q.texture!==ve)&&(I!==de&&(n.activeTexture(de),I=de),n.bindTexture(L,ve||Le[L]),Q.type=L,Q.texture=ve)}function P(){const L=W[I];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ne(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ce(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(L){Ee.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Ee.copy(L))}function be(L){Re.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Re.copy(L))}function we(L,ve){let de=f.get(ve);de===void 0&&(de=new WeakMap,f.set(ve,de));let Q=de.get(L);Q===void 0&&(Q=n.getUniformBlockIndex(ve,L.name),de.set(L,Q))}function xe(L,ve){const Q=f.get(ve).get(L);u.get(ve)!==Q&&(n.uniformBlockBinding(ve,Q,L.__bindingPointIndex),u.set(ve,Q))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},I=null,W={},m={},v=new WeakMap,g=[],p=null,h=!1,b=null,E=null,y=null,R=null,D=null,C=null,V=null,x=new qe(0,0,0),A=0,J=!1,oe=null,ue=null,U=null,j=null,Z=null,Ee.set(0,0,n.canvas.width,n.canvas.height),Re.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ie,disable:Ze,bindFramebuffer:Ne,drawBuffers:O,useProgram:T,setBlending:H,setMaterial:K,setFlipSided:k,setCullFace:te,setLineWidth:re,setPolygonOffset:le,setScissorTest:ee,activeTexture:M,bindTexture:_,unbindTexture:P,compressedTexImage2D:q,compressedTexImage3D:$,texImage2D:fe,texImage3D:Ye,updateUBOMapping:we,uniformBlockBinding:xe,texStorage2D:ye,texStorage3D:De,texSubImage2D:ne,texSubImage3D:pe,compressedTexSubImage2D:ce,compressedTexSubImage3D:he,scissor:Te,viewport:be,reset:Xe}}function Hx(n,e,t,i,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,f=r.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let g;const p=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(M,_){return h?new OffscreenCanvas(M,_):Es("canvas")}function E(M,_,P,q){let $=1;if((M.width>q||M.height>q)&&($=q/Math.max(M.width,M.height)),$<1||_===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const ne=_?Zo:Math.floor,pe=ne($*M.width),ce=ne($*M.height);g===void 0&&(g=b(pe,ce));const he=P?b(pe,ce):g;return he.width=pe,he.height=ce,he.getContext("2d").drawImage(M,0,0,pe,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+pe+"x"+ce+")."),he}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function y(M){return Xl(M.width)&&Xl(M.height)}function R(M){return o?!1:M.wrapS!==Zt||M.wrapT!==Zt||M.minFilter!==Rt&&M.minFilter!==kt}function D(M,_){return M.generateMipmaps&&_&&M.minFilter!==Rt&&M.minFilter!==kt}function C(M){n.generateMipmap(M)}function V(M,_,P,q,$=!1){if(o===!1)return _;if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let ne=_;if(_===n.RED&&(P===n.FLOAT&&(ne=n.R32F),P===n.HALF_FLOAT&&(ne=n.R16F),P===n.UNSIGNED_BYTE&&(ne=n.R8)),_===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(ne=n.R8UI),P===n.UNSIGNED_SHORT&&(ne=n.R16UI),P===n.UNSIGNED_INT&&(ne=n.R32UI),P===n.BYTE&&(ne=n.R8I),P===n.SHORT&&(ne=n.R16I),P===n.INT&&(ne=n.R32I)),_===n.RG&&(P===n.FLOAT&&(ne=n.RG32F),P===n.HALF_FLOAT&&(ne=n.RG16F),P===n.UNSIGNED_BYTE&&(ne=n.RG8)),_===n.RGBA){const pe=$?vs:Je.getTransfer(q);P===n.FLOAT&&(ne=n.RGBA32F),P===n.HALF_FLOAT&&(ne=n.RGBA16F),P===n.UNSIGNED_BYTE&&(ne=pe===it?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function x(M,_,P){return D(M,P)===!0||M.isFramebufferTexture&&M.minFilter!==Rt&&M.minFilter!==kt?Math.log2(Math.max(_.width,_.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?_.mipmaps.length:1}function A(M){return M===Rt||M===_l||M===Qs?n.NEAREST:n.LINEAR}function J(M){const _=M.target;_.removeEventListener("dispose",J),ue(_),_.isVideoTexture&&v.delete(_)}function oe(M){const _=M.target;_.removeEventListener("dispose",oe),j(_)}function ue(M){const _=i.get(M);if(_.__webglInit===void 0)return;const P=M.source,q=p.get(P);if(q){const $=q[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&U(M),Object.keys(q).length===0&&p.delete(P)}i.remove(M)}function U(M){const _=i.get(M);n.deleteTexture(_.__webglTexture);const P=M.source,q=p.get(P);delete q[_.__cacheKey],a.memory.textures--}function j(M){const _=M.texture,P=i.get(M),q=i.get(_);if(q.__webglTexture!==void 0&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(P.__webglFramebuffer[$]))for(let ne=0;ne<P.__webglFramebuffer[$].length;ne++)n.deleteFramebuffer(P.__webglFramebuffer[$][ne]);else n.deleteFramebuffer(P.__webglFramebuffer[$]);P.__webglDepthbuffer&&n.deleteRenderbuffer(P.__webglDepthbuffer[$])}else{if(Array.isArray(P.__webglFramebuffer))for(let $=0;$<P.__webglFramebuffer.length;$++)n.deleteFramebuffer(P.__webglFramebuffer[$]);else n.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&n.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&n.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let $=0;$<P.__webglColorRenderbuffer.length;$++)P.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(P.__webglColorRenderbuffer[$]);P.__webglDepthRenderbuffer&&n.deleteRenderbuffer(P.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let $=0,ne=_.length;$<ne;$++){const pe=i.get(_[$]);pe.__webglTexture&&(n.deleteTexture(pe.__webglTexture),a.memory.textures--),i.remove(_[$])}i.remove(_),i.remove(M)}let Z=0;function z(){Z=0}function ie(){const M=Z;return M>=l&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+l),Z+=1,M}function ae(M){const _=[];return _.push(M.wrapS),_.push(M.wrapT),_.push(M.wrapR||0),_.push(M.magFilter),_.push(M.minFilter),_.push(M.anisotropy),_.push(M.internalFormat),_.push(M.format),_.push(M.type),_.push(M.generateMipmaps),_.push(M.premultiplyAlpha),_.push(M.flipY),_.push(M.unpackAlignment),_.push(M.colorSpace),_.join()}function se(M,_){const P=i.get(M);if(M.isVideoTexture&&le(M),M.isRenderTargetTexture===!1&&M.version>0&&P.__version!==M.version){const q=M.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(P,M,_);return}}t.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+_)}function I(M,_){const P=i.get(M);if(M.version>0&&P.__version!==M.version){Ie(P,M,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+_)}function W(M,_){const P=i.get(M);if(M.version>0&&P.__version!==M.version){Ie(P,M,_);return}t.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+_)}function ge(M,_){const P=i.get(M);if(M.version>0&&P.__version!==M.version){Ze(P,M,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+_)}const Me={[Yo]:n.REPEAT,[Zt]:n.CLAMP_TO_EDGE,[jo]:n.MIRRORED_REPEAT},Ee={[Rt]:n.NEAREST,[_l]:n.NEAREST_MIPMAP_NEAREST,[Qs]:n.NEAREST_MIPMAP_LINEAR,[kt]:n.LINEAR,[Mp]:n.LINEAR_MIPMAP_NEAREST,[br]:n.LINEAR_MIPMAP_LINEAR},Re={[Up]:n.NEVER,[zp]:n.ALWAYS,[Ip]:n.LESS,[Fp]:n.LEQUAL,[Np]:n.EQUAL,[Hp]:n.GEQUAL,[Op]:n.GREATER,[Bp]:n.NOTEQUAL};function He(M,_,P){if(P?(n.texParameteri(M,n.TEXTURE_WRAP_S,Me[_.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,Me[_.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,Me[_.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,Ee[_.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,Ee[_.minFilter])):(n.texParameteri(M,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(M,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==Zt||_.wrapT!==Zt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(M,n.TEXTURE_MAG_FILTER,A(_.magFilter)),n.texParameteri(M,n.TEXTURE_MIN_FILTER,A(_.minFilter)),_.minFilter!==Rt&&_.minFilter!==kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,Re[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const q=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===Rt||_.minFilter!==Qs&&_.minFilter!==br||_.type===Wn&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===Ar&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||i.get(_).__currentAnisotropy)&&(n.texParameterf(M,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy)}}function Le(M,_){let P=!1;M.__webglInit===void 0&&(M.__webglInit=!0,_.addEventListener("dispose",J));const q=_.source;let $=p.get(q);$===void 0&&($={},p.set(q,$));const ne=ae(_);if(ne!==M.__cacheKey){$[ne]===void 0&&($[ne]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,P=!0),$[ne].usedTimes++;const pe=$[M.__cacheKey];pe!==void 0&&($[M.__cacheKey].usedTimes--,pe.usedTimes===0&&U(_)),M.__cacheKey=ne,M.__webglTexture=$[ne].texture}return P}function Ie(M,_,P){let q=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=n.TEXTURE_3D);const $=Le(M,_),ne=_.source;t.bindTexture(q,M.__webglTexture,n.TEXTURE0+P);const pe=i.get(ne);if(ne.version!==pe.__version||$===!0){t.activeTexture(n.TEXTURE0+P);const ce=Je.getPrimaries(Je.workingColorSpace),he=_.colorSpace===qt?null:Je.getPrimaries(_.colorSpace),ye=_.colorSpace===qt||ce===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const De=R(_)&&y(_.image)===!1;let fe=E(_.image,De,!1,u);fe=ee(_,fe);const Ye=y(fe)||o,Te=s.convert(_.format,_.colorSpace);let be=s.convert(_.type),we=V(_.internalFormat,Te,be,_.colorSpace,_.isVideoTexture);He(q,_,Ye);let xe;const Xe=_.mipmaps,L=o&&_.isVideoTexture!==!0,ve=pe.__version===void 0||$===!0,de=x(_,fe,Ye);if(_.isDepthTexture)we=n.DEPTH_COMPONENT,o?_.type===Wn?we=n.DEPTH_COMPONENT32F:_.type===Vn?we=n.DEPTH_COMPONENT24:_.type===fi?we=n.DEPTH24_STENCIL8:we=n.DEPTH_COMPONENT16:_.type===Wn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===hi&&we===n.DEPTH_COMPONENT&&_.type!==Ta&&_.type!==Vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=Vn,be=s.convert(_.type)),_.format===Ki&&we===n.DEPTH_COMPONENT&&(we=n.DEPTH_STENCIL,_.type!==fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=fi,be=s.convert(_.type))),ve&&(L?t.texStorage2D(n.TEXTURE_2D,1,we,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,we,fe.width,fe.height,0,Te,be,null));else if(_.isDataTexture)if(Xe.length>0&&Ye){L&&ve&&t.texStorage2D(n.TEXTURE_2D,de,we,Xe[0].width,Xe[0].height);for(let Q=0,me=Xe.length;Q<me;Q++)xe=Xe[Q],L?t.texSubImage2D(n.TEXTURE_2D,Q,0,0,xe.width,xe.height,Te,be,xe.data):t.texImage2D(n.TEXTURE_2D,Q,we,xe.width,xe.height,0,Te,be,xe.data);_.generateMipmaps=!1}else L?(ve&&t.texStorage2D(n.TEXTURE_2D,de,we,fe.width,fe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe.width,fe.height,Te,be,fe.data)):t.texImage2D(n.TEXTURE_2D,0,we,fe.width,fe.height,0,Te,be,fe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,we,Xe[0].width,Xe[0].height,fe.depth);for(let Q=0,me=Xe.length;Q<me;Q++)xe=Xe[Q],_.format!==Jt?Te!==null?L?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,xe.width,xe.height,fe.depth,Te,xe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,we,xe.width,xe.height,fe.depth,0,xe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?t.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,xe.width,xe.height,fe.depth,Te,be,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Q,we,xe.width,xe.height,fe.depth,0,Te,be,xe.data)}else{L&&ve&&t.texStorage2D(n.TEXTURE_2D,de,we,Xe[0].width,Xe[0].height);for(let Q=0,me=Xe.length;Q<me;Q++)xe=Xe[Q],_.format!==Jt?Te!==null?L?t.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,xe.width,xe.height,Te,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,Q,we,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?t.texSubImage2D(n.TEXTURE_2D,Q,0,0,xe.width,xe.height,Te,be,xe.data):t.texImage2D(n.TEXTURE_2D,Q,we,xe.width,xe.height,0,Te,be,xe.data)}else if(_.isDataArrayTexture)L?(ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,we,fe.width,fe.height,fe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Te,be,fe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,fe.width,fe.height,fe.depth,0,Te,be,fe.data);else if(_.isData3DTexture)L?(ve&&t.texStorage3D(n.TEXTURE_3D,de,we,fe.width,fe.height,fe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Te,be,fe.data)):t.texImage3D(n.TEXTURE_3D,0,we,fe.width,fe.height,fe.depth,0,Te,be,fe.data);else if(_.isFramebufferTexture){if(ve)if(L)t.texStorage2D(n.TEXTURE_2D,de,we,fe.width,fe.height);else{let Q=fe.width,me=fe.height;for(let Ce=0;Ce<de;Ce++)t.texImage2D(n.TEXTURE_2D,Ce,we,Q,me,0,Te,be,null),Q>>=1,me>>=1}}else if(Xe.length>0&&Ye){L&&ve&&t.texStorage2D(n.TEXTURE_2D,de,we,Xe[0].width,Xe[0].height);for(let Q=0,me=Xe.length;Q<me;Q++)xe=Xe[Q],L?t.texSubImage2D(n.TEXTURE_2D,Q,0,0,Te,be,xe):t.texImage2D(n.TEXTURE_2D,Q,we,Te,be,xe);_.generateMipmaps=!1}else L?(ve&&t.texStorage2D(n.TEXTURE_2D,de,we,fe.width,fe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Te,be,fe)):t.texImage2D(n.TEXTURE_2D,0,we,Te,be,fe);D(_,Ye)&&C(q),pe.__version=ne.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function Ze(M,_,P){if(_.image.length!==6)return;const q=Le(M,_),$=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+P);const ne=i.get($);if($.version!==ne.__version||q===!0){t.activeTexture(n.TEXTURE0+P);const pe=Je.getPrimaries(Je.workingColorSpace),ce=_.colorSpace===qt?null:Je.getPrimaries(_.colorSpace),he=_.colorSpace===qt||pe===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const ye=_.isCompressedTexture||_.image[0].isCompressedTexture,De=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let Q=0;Q<6;Q++)!ye&&!De?fe[Q]=E(_.image[Q],!1,!0,c):fe[Q]=De?_.image[Q].image:_.image[Q],fe[Q]=ee(_,fe[Q]);const Ye=fe[0],Te=y(Ye)||o,be=s.convert(_.format,_.colorSpace),we=s.convert(_.type),xe=V(_.internalFormat,be,we,_.colorSpace),Xe=o&&_.isVideoTexture!==!0,L=ne.__version===void 0||q===!0;let ve=x(_,Ye,Te);He(n.TEXTURE_CUBE_MAP,_,Te);let de;if(ye){Xe&&L&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,xe,Ye.width,Ye.height);for(let Q=0;Q<6;Q++){de=fe[Q].mipmaps;for(let me=0;me<de.length;me++){const Ce=de[me];_.format!==Jt?be!==null?Xe?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,0,0,Ce.width,Ce.height,be,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,xe,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,0,0,Ce.width,Ce.height,be,we,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,xe,Ce.width,Ce.height,0,be,we,Ce.data)}}}else{de=_.mipmaps,Xe&&L&&(de.length>0&&ve++,t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,xe,fe[0].width,fe[0].height));for(let Q=0;Q<6;Q++)if(De){Xe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,fe[Q].width,fe[Q].height,be,we,fe[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,xe,fe[Q].width,fe[Q].height,0,be,we,fe[Q].data);for(let me=0;me<de.length;me++){const je=de[me].image[Q].image;Xe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,0,0,je.width,je.height,be,we,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,xe,je.width,je.height,0,be,we,je.data)}}else{Xe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,be,we,fe[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,xe,be,we,fe[Q]);for(let me=0;me<de.length;me++){const Ce=de[me];Xe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,0,0,be,we,Ce.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,xe,be,we,Ce.image[Q])}}}D(_,Te)&&C(n.TEXTURE_CUBE_MAP),ne.__version=$.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function Ne(M,_,P,q,$,ne){const pe=s.convert(P.format,P.colorSpace),ce=s.convert(P.type),he=V(P.internalFormat,pe,ce,P.colorSpace);if(!i.get(_).__hasExternalTextures){const De=Math.max(1,_.width>>ne),fe=Math.max(1,_.height>>ne);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,ne,he,De,fe,_.depth,0,pe,ce,null):t.texImage2D($,ne,he,De,fe,0,pe,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),re(_)?d.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,$,i.get(P).__webglTexture,0,te(_)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,$,i.get(P).__webglTexture,ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function O(M,_,P){if(n.bindRenderbuffer(n.RENDERBUFFER,M),_.depthBuffer&&!_.stencilBuffer){let q=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(P||re(_)){const $=_.depthTexture;$&&$.isDepthTexture&&($.type===Wn?q=n.DEPTH_COMPONENT32F:$.type===Vn&&(q=n.DEPTH_COMPONENT24));const ne=te(_);re(_)?d.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,q,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,q,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,q,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,M)}else if(_.depthBuffer&&_.stencilBuffer){const q=te(_);P&&re(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,q,n.DEPTH24_STENCIL8,_.width,_.height):re(_)?d.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,q,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,M)}else{const q=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let $=0;$<q.length;$++){const ne=q[$],pe=s.convert(ne.format,ne.colorSpace),ce=s.convert(ne.type),he=V(ne.internalFormat,pe,ce,ne.colorSpace),ye=te(_);P&&re(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,he,_.width,_.height):re(_)?d.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,he,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,he,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function T(M,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),se(_.depthTexture,0);const q=i.get(_.depthTexture).__webglTexture,$=te(_);if(_.depthTexture.format===hi)re(_)?d.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0);else if(_.depthTexture.format===Ki)re(_)?d.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function w(M){const _=i.get(M),P=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!_.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");T(_.__webglFramebuffer,M)}else if(P){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]=n.createRenderbuffer(),O(_.__webglDepthbuffer[q],M,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),O(_.__webglDepthbuffer,M,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function N(M,_,P){const q=i.get(M);_!==void 0&&Ne(q.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&w(M)}function H(M){const _=M.texture,P=i.get(M),q=i.get(_);M.addEventListener("dispose",oe),M.isWebGLMultipleRenderTargets!==!0&&(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=_.version,a.memory.textures++);const $=M.isWebGLCubeRenderTarget===!0,ne=M.isWebGLMultipleRenderTargets===!0,pe=y(M)||o;if($){P.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer[ce]=[];for(let he=0;he<_.mipmaps.length;he++)P.__webglFramebuffer[ce][he]=n.createFramebuffer()}else P.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)P.__webglFramebuffer[ce]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(ne)if(r.drawBuffers){const ce=M.texture;for(let he=0,ye=ce.length;he<ye;he++){const De=i.get(ce[he]);De.__webglTexture===void 0&&(De.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&M.samples>0&&re(M)===!1){const ce=ne?_:[_];P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let he=0;he<ce.length;he++){const ye=ce[he];P.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[he]);const De=s.convert(ye.format,ye.colorSpace),fe=s.convert(ye.type),Ye=V(ye.internalFormat,De,fe,ye.colorSpace,M.isXRRenderTarget===!0),Te=te(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,Ye,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,P.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),O(P.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),He(n.TEXTURE_CUBE_MAP,_,pe);for(let ce=0;ce<6;ce++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)Ne(P.__webglFramebuffer[ce][he],M,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,he);else Ne(P.__webglFramebuffer[ce],M,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);D(_,pe)&&C(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const ce=M.texture;for(let he=0,ye=ce.length;he<ye;he++){const De=ce[he],fe=i.get(De);t.bindTexture(n.TEXTURE_2D,fe.__webglTexture),He(n.TEXTURE_2D,De,pe),Ne(P.__webglFramebuffer,M,De,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),D(De,pe)&&C(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(o?ce=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,q.__webglTexture),He(ce,_,pe),o&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)Ne(P.__webglFramebuffer[he],M,_,n.COLOR_ATTACHMENT0,ce,he);else Ne(P.__webglFramebuffer,M,_,n.COLOR_ATTACHMENT0,ce,0);D(_,pe)&&C(ce),t.unbindTexture()}M.depthBuffer&&w(M)}function K(M){const _=y(M)||o,P=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let q=0,$=P.length;q<$;q++){const ne=P[q];if(D(ne,_)){const pe=M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ce=i.get(ne).__webglTexture;t.bindTexture(pe,ce),C(pe),t.unbindTexture()}}}function k(M){if(o&&M.samples>0&&re(M)===!1){const _=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],P=M.width,q=M.height;let $=n.COLOR_BUFFER_BIT;const ne=[],pe=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(M),he=M.isWebGLMultipleRenderTargets===!0;if(he)for(let ye=0;ye<_.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ye=0;ye<_.length;ye++){ne.push(n.COLOR_ATTACHMENT0+ye),M.depthBuffer&&ne.push(pe);const De=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(De===!1&&(M.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),he&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ye]),De===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[pe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[pe])),he){const fe=i.get(_[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,fe,0)}n.blitFramebuffer(0,0,P,q,0,0,P,q,$,n.NEAREST),m&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let ye=0;ye<_.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,ce.__webglColorRenderbuffer[ye]);const De=i.get(_[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,De,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function te(M){return Math.min(f,M.samples)}function re(M){const _=i.get(M);return o&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function le(M){const _=a.render.frame;v.get(M)!==_&&(v.set(M,_),M.update())}function ee(M,_){const P=M.colorSpace,q=M.format,$=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Ko||P!==Un&&P!==qt&&(Je.getTransfer(P)===it?o===!1?e.has("EXT_sRGB")===!0&&q===Jt?(M.format=Ko,M.minFilter=kt,M.generateMipmaps=!1):_=Hu.sRGBToLinear(_):(q!==Jt||$!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),_}this.allocateTextureUnit=ie,this.resetTextureUnits=z,this.setTexture2D=se,this.setTexture2DArray=I,this.setTexture3D=W,this.setTextureCube=ge,this.rebindTextures=N,this.setupRenderTarget=H,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=w,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=re}function zx(n,e,t){const i=t.isWebGL2;function r(s,a=qt){let o;const l=Je.getTransfer(a);if(s===qn)return n.UNSIGNED_BYTE;if(s===Lu)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Du)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Sp)return n.BYTE;if(s===Ep)return n.SHORT;if(s===Ta)return n.UNSIGNED_SHORT;if(s===Pu)return n.INT;if(s===Vn)return n.UNSIGNED_INT;if(s===Wn)return n.FLOAT;if(s===Ar)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===yp)return n.ALPHA;if(s===Jt)return n.RGBA;if(s===Tp)return n.LUMINANCE;if(s===bp)return n.LUMINANCE_ALPHA;if(s===hi)return n.DEPTH_COMPONENT;if(s===Ki)return n.DEPTH_STENCIL;if(s===Ko)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Ap)return n.RED;if(s===Uu)return n.RED_INTEGER;if(s===wp)return n.RG;if(s===Iu)return n.RG_INTEGER;if(s===Nu)return n.RGBA_INTEGER;if(s===eo||s===to||s===no||s===io)if(l===it)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===eo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===to)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===no)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===io)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===eo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===to)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===no)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===io)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===gl||s===vl||s===xl||s===Ml)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===gl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===vl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===xl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ml)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Rp)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Sl||s===El)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Sl)return l===it?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===El)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===yl||s===Tl||s===bl||s===Al||s===wl||s===Rl||s===Cl||s===Pl||s===Ll||s===Dl||s===Ul||s===Il||s===Nl||s===Fl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===yl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Tl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===bl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Al)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===wl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Rl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Cl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Pl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ll)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Dl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ul)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Il)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Nl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Fl)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ro||s===Ol||s===Bl)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ro)return l===it?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ol)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Bl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Cp||s===Hl||s===zl||s===Gl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ro)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Hl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===zl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Gl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===fi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Gx extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class as extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vx={type:"move"};class Po{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new as,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new as,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new as,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),h=this._getHandJoint(c,g);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,v=.005;c.inputState.pinching&&d>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vx)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new as;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Wx extends Gt{constructor(e,t,i,r,s,a,o,l,c,u){if(u=u!==void 0?u:hi,u!==hi&&u!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===hi&&(i=Vn),i===void 0&&u===Ki&&(i=fi),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Rt,this.minFilter=l!==void 0?l:Rt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kx extends Zi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,m=null,v=null;const g=t.getContextAttributes();let p=null,h=null;const b=[],E=[],y=new Xt;y.layers.enable(1),y.viewport=new gt;const R=new Xt;R.layers.enable(2),R.viewport=new gt;const D=[y,R],C=new Gx;C.layers.enable(1),C.layers.enable(2);let V=null,x=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let W=b[I];return W===void 0&&(W=new Po,b[I]=W),W.getTargetRaySpace()},this.getControllerGrip=function(I){let W=b[I];return W===void 0&&(W=new Po,b[I]=W),W.getGripSpace()},this.getHand=function(I){let W=b[I];return W===void 0&&(W=new Po,b[I]=W),W.getHandSpace()};function A(I){const W=E.indexOf(I.inputSource);if(W===-1)return;const ge=b[W];ge!==void 0&&(ge.update(I.inputSource,I.frame,c||a),ge.dispatchEvent({type:I.type,data:I.inputSource}))}function J(){r.removeEventListener("select",A),r.removeEventListener("selectstart",A),r.removeEventListener("selectend",A),r.removeEventListener("squeeze",A),r.removeEventListener("squeezestart",A),r.removeEventListener("squeezeend",A),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",oe);for(let I=0;I<b.length;I++){const W=E[I];W!==null&&(E[I]=null,b[I].disconnect(W))}V=null,x=null,e.setRenderTarget(p),m=null,d=null,f=null,r=null,h=null,se.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){s=I,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(I){if(r=I,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",A),r.addEventListener("selectstart",A),r.addEventListener("selectend",A),r.addEventListener("squeeze",A),r.addEventListener("squeezestart",A),r.addEventListener("squeezeend",A),r.addEventListener("end",J),r.addEventListener("inputsourceschange",oe),g.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const W={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,W),r.updateRenderState({baseLayer:m}),h=new mi(m.framebufferWidth,m.framebufferHeight,{format:Jt,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let W=null,ge=null,Me=null;g.depth&&(Me=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=g.stencil?Ki:hi,ge=g.stencil?fi:Vn);const Ee={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Ee),r.updateRenderState({layers:[d]}),h=new mi(d.textureWidth,d.textureHeight,{format:Jt,type:qn,depthTexture:new Wx(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Re=e.properties.get(h);Re.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),se.setContext(r),se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function oe(I){for(let W=0;W<I.removed.length;W++){const ge=I.removed[W],Me=E.indexOf(ge);Me>=0&&(E[Me]=null,b[Me].disconnect(ge))}for(let W=0;W<I.added.length;W++){const ge=I.added[W];let Me=E.indexOf(ge);if(Me===-1){for(let Re=0;Re<b.length;Re++)if(Re>=E.length){E.push(ge),Me=Re;break}else if(E[Re]===null){E[Re]=ge,Me=Re;break}if(Me===-1)break}const Ee=b[Me];Ee&&Ee.connect(ge)}}const ue=new B,U=new B;function j(I,W,ge){ue.setFromMatrixPosition(W.matrixWorld),U.setFromMatrixPosition(ge.matrixWorld);const Me=ue.distanceTo(U),Ee=W.projectionMatrix.elements,Re=ge.projectionMatrix.elements,He=Ee[14]/(Ee[10]-1),Le=Ee[14]/(Ee[10]+1),Ie=(Ee[9]+1)/Ee[5],Ze=(Ee[9]-1)/Ee[5],Ne=(Ee[8]-1)/Ee[0],O=(Re[8]+1)/Re[0],T=He*Ne,w=He*O,N=Me/(-Ne+O),H=N*-Ne;W.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(H),I.translateZ(N),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert();const K=He+N,k=Le+N,te=T-H,re=w+(Me-H),le=Ie*Le/k*K,ee=Ze*Le/k*K;I.projectionMatrix.makePerspective(te,re,le,ee,K,k),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}function Z(I,W){W===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(W.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(r===null)return;C.near=R.near=y.near=I.near,C.far=R.far=y.far=I.far,(V!==C.near||x!==C.far)&&(r.updateRenderState({depthNear:C.near,depthFar:C.far}),V=C.near,x=C.far);const W=I.parent,ge=C.cameras;Z(C,W);for(let Me=0;Me<ge.length;Me++)Z(ge[Me],W);ge.length===2?j(C,y,R):C.projectionMatrix.copy(y.projectionMatrix),z(I,C,W)};function z(I,W,ge){ge===null?I.matrix.copy(W.matrixWorld):(I.matrix.copy(ge.matrixWorld),I.matrix.invert(),I.matrix.multiply(W.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(W.projectionMatrix),I.projectionMatrixInverse.copy(W.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=$o*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(I){l=I,d!==null&&(d.fixedFoveation=I),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=I)};let ie=null;function ae(I,W){if(u=W.getViewerPose(c||a),v=W,u!==null){const ge=u.views;m!==null&&(e.setRenderTargetFramebuffer(h,m.framebuffer),e.setRenderTarget(h));let Me=!1;ge.length!==C.cameras.length&&(C.cameras.length=0,Me=!0);for(let Ee=0;Ee<ge.length;Ee++){const Re=ge[Ee];let He=null;if(m!==null)He=m.getViewport(Re);else{const Ie=f.getViewSubImage(d,Re);He=Ie.viewport,Ee===0&&(e.setRenderTargetTextures(h,Ie.colorTexture,d.ignoreDepthValues?void 0:Ie.depthStencilTexture),e.setRenderTarget(h))}let Le=D[Ee];Le===void 0&&(Le=new Xt,Le.layers.enable(Ee),Le.viewport=new gt,D[Ee]=Le),Le.matrix.fromArray(Re.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(Re.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(He.x,He.y,He.width,He.height),Ee===0&&(C.matrix.copy(Le.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Me===!0&&C.cameras.push(Le)}}for(let ge=0;ge<b.length;ge++){const Me=E[ge],Ee=b[ge];Me!==null&&Ee!==void 0&&Ee.update(Me,W,c||a)}ie&&ie(I,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),v=null}const se=new $u;se.setAnimationLoop(ae),this.setAnimationLoop=function(I){ie=I},this.dispose=function(){}}}function Xx(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,qu(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,b,E,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),f(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,y)):h.isMeshMatcapMaterial?(s(p,h),v(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),g(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,b,E):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===It&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===It&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const b=e.get(h).envMap;if(b&&(p.envMap.value=b,p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap){p.lightMap.value=h.lightMap;const E=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=h.lightMapIntensity*E,t(h.lightMap,p.lightMapTransform)}h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,b,E){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*b,p.scale.value=E*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),e.get(h).envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,b){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===It&&p.clearcoatNormalScale.value.negate())),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,h){h.matcap&&(p.matcap.value=h.matcap)}function g(p,h){const b=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function qx(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,E){const y=E.program;i.uniformBlockBinding(b,y)}function c(b,E){let y=r[b.id];y===void 0&&(v(b),y=u(b),r[b.id]=y,b.addEventListener("dispose",p));const R=E.program;i.updateUBOMapping(b,R);const D=e.render.frame;s[b.id]!==D&&(d(b),s[b.id]=D)}function u(b){const E=f();b.__bindingPointIndex=E;const y=n.createBuffer(),R=b.__size,D=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,y),y}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const E=r[b.id],y=b.uniforms,R=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let D=0,C=y.length;D<C;D++){const V=y[D];if(m(V,D,R)===!0){const x=V.__offset,A=Array.isArray(V.value)?V.value:[V.value];let J=0;for(let oe=0;oe<A.length;oe++){const ue=A[oe],U=g(ue);typeof ue=="number"?(V.__data[0]=ue,n.bufferSubData(n.UNIFORM_BUFFER,x+J,V.__data)):ue.isMatrix3?(V.__data[0]=ue.elements[0],V.__data[1]=ue.elements[1],V.__data[2]=ue.elements[2],V.__data[3]=ue.elements[0],V.__data[4]=ue.elements[3],V.__data[5]=ue.elements[4],V.__data[6]=ue.elements[5],V.__data[7]=ue.elements[0],V.__data[8]=ue.elements[6],V.__data[9]=ue.elements[7],V.__data[10]=ue.elements[8],V.__data[11]=ue.elements[0]):(ue.toArray(V.__data,J),J+=U.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,x,V.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,E,y){const R=b.value;if(y[E]===void 0){if(typeof R=="number")y[E]=R;else{const D=Array.isArray(R)?R:[R],C=[];for(let V=0;V<D.length;V++)C.push(D[V].clone());y[E]=C}return!0}else if(typeof R=="number"){if(y[E]!==R)return y[E]=R,!0}else{const D=Array.isArray(y[E])?y[E]:[y[E]],C=Array.isArray(R)?R:[R];for(let V=0;V<D.length;V++){const x=D[V];if(x.equals(C[V])===!1)return x.copy(C[V]),!0}}return!1}function v(b){const E=b.uniforms;let y=0;const R=16;let D=0;for(let C=0,V=E.length;C<V;C++){const x=E[C],A={boundary:0,storage:0},J=Array.isArray(x.value)?x.value:[x.value];for(let oe=0,ue=J.length;oe<ue;oe++){const U=J[oe],j=g(U);A.boundary+=j.boundary,A.storage+=j.storage}if(x.__data=new Float32Array(A.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=y,C>0){D=y%R;const oe=R-D;D!==0&&oe-A.boundary<0&&(y+=R-D,x.__offset=y)}y+=A.storage}return D=y%R,D>0&&(y+=R-D),b.__size=y,b.__cache={},this}function g(b){const E={boundary:0,storage:0};return typeof b=="number"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function p(b){const E=b.target;E.removeEventListener("dispose",p);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function h(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class tf{constructor(e={}){const{canvas:t=Vp(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const h=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_t,this._useLegacyLights=!1,this.toneMapping=Xn,this.toneMappingExposure=1;const E=this;let y=!1,R=0,D=0,C=null,V=-1,x=null;const A=new gt,J=new gt;let oe=null;const ue=new qe(0);let U=0,j=t.width,Z=t.height,z=1,ie=null,ae=null;const se=new gt(0,0,j,Z),I=new gt(0,0,j,Z);let W=!1;const ge=new Ku;let Me=!1,Ee=!1,Re=null;const He=new vt,Le=new Qe,Ie=new B,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ne(){return C===null?z:1}let O=i;function T(S,F){for(let G=0;G<S.length;G++){const X=S[G],Y=t.getContext(X,F);if(Y!==null)return Y}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ea}`),t.addEventListener("webglcontextlost",Xe,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ve,!1),O===null){const F=["webgl2","webgl","experimental-webgl"];if(E.isWebGL1Renderer===!0&&F.shift(),O=T(F,S),O===null)throw T(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let w,N,H,K,k,te,re,le,ee,M,_,P,q,$,ne,pe,ce,he,ye,De,fe,Ye,Te,be;function we(){w=new nv(O),N=new Kg(O,w,e),w.init(N),Ye=new zx(O,w,N),H=new Bx(O,w,N),K=new sv(O),k=new Tx,te=new Hx(O,w,H,k,N,Ye,K),re=new Zg(E),le=new tv(E),ee=new pm(O,N),Te=new Yg(O,w,ee,N),M=new iv(O,ee,K,Te),_=new cv(O,M,ee,K),ye=new lv(O,N,te),pe=new $g(k),P=new yx(E,re,le,w,N,Te,pe),q=new Xx(E,k),$=new Ax,ne=new Dx(w,N),he=new qg(E,re,le,H,_,d,l),ce=new Ox(E,_,N),be=new qx(O,K,N,H),De=new jg(O,w,K,N),fe=new rv(O,w,K,N),K.programs=P.programs,E.capabilities=N,E.extensions=w,E.properties=k,E.renderLists=$,E.shadowMap=ce,E.state=H,E.info=K}we();const xe=new kx(E,O);this.xr=xe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=w.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=w.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(j,Z,!1))},this.getSize=function(S){return S.set(j,Z)},this.setSize=function(S,F,G=!0){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=S,Z=F,t.width=Math.floor(S*z),t.height=Math.floor(F*z),G===!0&&(t.style.width=S+"px",t.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(j*z,Z*z).floor()},this.setDrawingBufferSize=function(S,F,G){j=S,Z=F,z=G,t.width=Math.floor(S*G),t.height=Math.floor(F*G),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(A)},this.getViewport=function(S){return S.copy(se)},this.setViewport=function(S,F,G,X){S.isVector4?se.set(S.x,S.y,S.z,S.w):se.set(S,F,G,X),H.viewport(A.copy(se).multiplyScalar(z).floor())},this.getScissor=function(S){return S.copy(I)},this.setScissor=function(S,F,G,X){S.isVector4?I.set(S.x,S.y,S.z,S.w):I.set(S,F,G,X),H.scissor(J.copy(I).multiplyScalar(z).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(S){H.setScissorTest(W=S)},this.setOpaqueSort=function(S){ie=S},this.setTransparentSort=function(S){ae=S},this.getClearColor=function(S){return S.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor.apply(he,arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha.apply(he,arguments)},this.clear=function(S=!0,F=!0,G=!0){let X=0;if(S){let Y=!1;if(C!==null){const Se=C.texture.format;Y=Se===Nu||Se===Iu||Se===Uu}if(Y){const Se=C.texture.type,Ae=Se===qn||Se===Vn||Se===Ta||Se===fi||Se===Lu||Se===Du,Pe=he.getClearColor(),Ue=he.getClearAlpha(),Ge=Pe.r,Fe=Pe.g,Oe=Pe.b;Ae?(m[0]=Ge,m[1]=Fe,m[2]=Oe,m[3]=Ue,O.clearBufferuiv(O.COLOR,0,m)):(v[0]=Ge,v[1]=Fe,v[2]=Oe,v[3]=Ue,O.clearBufferiv(O.COLOR,0,v))}else X|=O.COLOR_BUFFER_BIT}F&&(X|=O.DEPTH_BUFFER_BIT),G&&(X|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Xe,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),$.dispose(),ne.dispose(),k.dispose(),re.dispose(),le.dispose(),_.dispose(),Te.dispose(),be.dispose(),P.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Vt),xe.removeEventListener("sessionend",et),Re&&(Re.dispose(),Re=null),Tt.stop()};function Xe(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const S=K.autoReset,F=ce.enabled,G=ce.autoUpdate,X=ce.needsUpdate,Y=ce.type;we(),K.autoReset=S,ce.enabled=F,ce.autoUpdate=G,ce.needsUpdate=X,ce.type=Y}function ve(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function de(S){const F=S.target;F.removeEventListener("dispose",de),Q(F)}function Q(S){me(S),k.remove(S)}function me(S){const F=k.get(S).programs;F!==void 0&&(F.forEach(function(G){P.releaseProgram(G)}),S.isShaderMaterial&&P.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,G,X,Y,Se){F===null&&(F=Ze);const Ae=Y.isMesh&&Y.matrixWorld.determinant()<0,Pe=rf(S,F,G,X,Y);H.setMaterial(X,Ae);let Ue=G.index,Ge=1;if(X.wireframe===!0){if(Ue=M.getWireframeAttribute(G),Ue===void 0)return;Ge=2}const Fe=G.drawRange,Oe=G.attributes.position;let ot=Fe.start*Ge,Ft=(Fe.start+Fe.count)*Ge;Se!==null&&(ot=Math.max(ot,Se.start*Ge),Ft=Math.min(Ft,(Se.start+Se.count)*Ge)),Ue!==null?(ot=Math.max(ot,0),Ft=Math.min(Ft,Ue.count)):Oe!=null&&(ot=Math.max(ot,0),Ft=Math.min(Ft,Oe.count));const dt=Ft-ot;if(dt<0||dt===1/0)return;Te.setup(Y,X,Pe,G,Ue);let mn,st=De;if(Ue!==null&&(mn=ee.get(Ue),st=fe,st.setIndex(mn)),Y.isMesh)X.wireframe===!0?(H.setLineWidth(X.wireframeLinewidth*Ne()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(Y.isLine){let ke=X.linewidth;ke===void 0&&(ke=1),H.setLineWidth(ke*Ne()),Y.isLineSegments?st.setMode(O.LINES):Y.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else Y.isPoints?st.setMode(O.POINTS):Y.isSprite&&st.setMode(O.TRIANGLES);if(Y.isInstancedMesh)st.renderInstances(ot,dt,Y.count);else if(G.isInstancedBufferGeometry){const ke=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Os=Math.min(G.instanceCount,ke);st.renderInstances(ot,dt,Os)}else st.render(ot,dt)};function Ce(S,F,G){S.transparent===!0&&S.side===Rn&&S.forceSinglePass===!1?(S.side=It,S.needsUpdate=!0,Nr(S,F,G),S.side=Kn,S.needsUpdate=!0,Nr(S,F,G),S.side=Rn):Nr(S,F,G)}this.compile=function(S,F,G=null){G===null&&(G=S),p=ne.get(G),p.init(),b.push(p),G.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),S!==G&&S.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights(E._useLegacyLights);const X=new Set;return S.traverse(function(Y){const Se=Y.material;if(Se)if(Array.isArray(Se))for(let Ae=0;Ae<Se.length;Ae++){const Pe=Se[Ae];Ce(Pe,G,Y),X.add(Pe)}else Ce(Se,G,Y),X.add(Se)}),b.pop(),p=null,X},this.compileAsync=function(S,F,G=null){const X=this.compile(S,F,G);return new Promise(Y=>{function Se(){if(X.forEach(function(Ae){k.get(Ae).currentProgram.isReady()&&X.delete(Ae)}),X.size===0){Y(S);return}setTimeout(Se,10)}w.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let je=null;function at(S){je&&je(S)}function Vt(){Tt.stop()}function et(){Tt.start()}const Tt=new $u;Tt.setAnimationLoop(at),typeof self<"u"&&Tt.setContext(self),this.setAnimationLoop=function(S){je=S,xe.setAnimationLoop(S),S===null?Tt.stop():Tt.start()},xe.addEventListener("sessionstart",Vt),xe.addEventListener("sessionend",et),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(F),F=xe.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,F,C),p=ne.get(S,b.length),p.init(),b.push(p),He.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ge.setFromProjectionMatrix(He),Ee=this.localClippingEnabled,Me=pe.init(this.clippingPlanes,Ee),g=$.get(S,h.length),g.init(),h.push(g),sn(S,F,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(ie,ae),this.info.render.frame++,Me===!0&&pe.beginShadows();const G=p.state.shadowsArray;if(ce.render(G,S,F),Me===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),he.render(g,S),p.setupLights(E._useLegacyLights),F.isArrayCamera){const X=F.cameras;for(let Y=0,Se=X.length;Y<Se;Y++){const Ae=X[Y];Ra(g,S,Ae,Ae.viewport)}}else Ra(g,S,F);C!==null&&(te.updateMultisampleRenderTarget(C),te.updateRenderTargetMipmap(C)),S.isScene===!0&&S.onAfterRender(E,S,F),Te.resetDefaultState(),V=-1,x=null,b.pop(),b.length>0?p=b[b.length-1]:p=null,h.pop(),h.length>0?g=h[h.length-1]:g=null};function sn(S,F,G,X){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ge.intersectsSprite(S)){X&&Ie.setFromMatrixPosition(S.matrixWorld).applyMatrix4(He);const Ae=_.update(S),Pe=S.material;Pe.visible&&g.push(S,Ae,Pe,G,Ie.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ge.intersectsObject(S))){const Ae=_.update(S),Pe=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ie.copy(S.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ie.copy(Ae.boundingSphere.center)),Ie.applyMatrix4(S.matrixWorld).applyMatrix4(He)),Array.isArray(Pe)){const Ue=Ae.groups;for(let Ge=0,Fe=Ue.length;Ge<Fe;Ge++){const Oe=Ue[Ge],ot=Pe[Oe.materialIndex];ot&&ot.visible&&g.push(S,Ae,ot,G,Ie.z,Oe)}}else Pe.visible&&g.push(S,Ae,Pe,G,Ie.z,null)}}const Se=S.children;for(let Ae=0,Pe=Se.length;Ae<Pe;Ae++)sn(Se[Ae],F,G,X)}function Ra(S,F,G,X){const Y=S.opaque,Se=S.transmissive,Ae=S.transparent;p.setupLightsView(G),Me===!0&&pe.setGlobalState(E.clippingPlanes,G),Se.length>0&&nf(Y,Se,F,G),X&&H.viewport(A.copy(X)),Y.length>0&&Ir(Y,F,G),Se.length>0&&Ir(Se,F,G),Ae.length>0&&Ir(Ae,F,G),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function nf(S,F,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const Se=N.isWebGL2;Re===null&&(Re=new mi(1,1,{generateMipmaps:!0,type:w.has("EXT_color_buffer_half_float")?Ar:qn,minFilter:br,samples:Se?4:0})),E.getDrawingBufferSize(Le),Se?Re.setSize(Le.x,Le.y):Re.setSize(Zo(Le.x),Zo(Le.y));const Ae=E.getRenderTarget();E.setRenderTarget(Re),E.getClearColor(ue),U=E.getClearAlpha(),U<1&&E.setClearColor(16777215,.5),E.clear();const Pe=E.toneMapping;E.toneMapping=Xn,Ir(S,G,X),te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re);let Ue=!1;for(let Ge=0,Fe=F.length;Ge<Fe;Ge++){const Oe=F[Ge],ot=Oe.object,Ft=Oe.geometry,dt=Oe.material,mn=Oe.group;if(dt.side===Rn&&ot.layers.test(X.layers)){const st=dt.side;dt.side=It,dt.needsUpdate=!0,Ca(ot,G,X,Ft,dt,mn),dt.side=st,dt.needsUpdate=!0,Ue=!0}}Ue===!0&&(te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re)),E.setRenderTarget(Ae),E.setClearColor(ue,U),E.toneMapping=Pe}function Ir(S,F,G){const X=F.isScene===!0?F.overrideMaterial:null;for(let Y=0,Se=S.length;Y<Se;Y++){const Ae=S[Y],Pe=Ae.object,Ue=Ae.geometry,Ge=X===null?Ae.material:X,Fe=Ae.group;Pe.layers.test(G.layers)&&Ca(Pe,F,G,Ue,Ge,Fe)}}function Ca(S,F,G,X,Y,Se){S.onBeforeRender(E,F,G,X,Y,Se),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),Y.onBeforeRender(E,F,G,X,S,Se),Y.transparent===!0&&Y.side===Rn&&Y.forceSinglePass===!1?(Y.side=It,Y.needsUpdate=!0,E.renderBufferDirect(G,F,X,Y,S,Se),Y.side=Kn,Y.needsUpdate=!0,E.renderBufferDirect(G,F,X,Y,S,Se),Y.side=Rn):E.renderBufferDirect(G,F,X,Y,S,Se),S.onAfterRender(E,F,G,X,Y,Se)}function Nr(S,F,G){F.isScene!==!0&&(F=Ze);const X=k.get(S),Y=p.state.lights,Se=p.state.shadowsArray,Ae=Y.state.version,Pe=P.getParameters(S,Y.state,Se,F,G),Ue=P.getProgramCacheKey(Pe);let Ge=X.programs;X.environment=S.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(S.isMeshStandardMaterial?le:re).get(S.envMap||X.environment),Ge===void 0&&(S.addEventListener("dispose",de),Ge=new Map,X.programs=Ge);let Fe=Ge.get(Ue);if(Fe!==void 0){if(X.currentProgram===Fe&&X.lightsStateVersion===Ae)return La(S,Pe),Fe}else Pe.uniforms=P.getUniforms(S),S.onBuild(G,Pe,E),S.onBeforeCompile(Pe,E),Fe=P.acquireProgram(Pe,Ue),Ge.set(Ue,Fe),X.uniforms=Pe.uniforms;const Oe=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Oe.clippingPlanes=pe.uniform),La(S,Pe),X.needsLights=of(S),X.lightsStateVersion=Ae,X.needsLights&&(Oe.ambientLightColor.value=Y.state.ambient,Oe.lightProbe.value=Y.state.probe,Oe.directionalLights.value=Y.state.directional,Oe.directionalLightShadows.value=Y.state.directionalShadow,Oe.spotLights.value=Y.state.spot,Oe.spotLightShadows.value=Y.state.spotShadow,Oe.rectAreaLights.value=Y.state.rectArea,Oe.ltc_1.value=Y.state.rectAreaLTC1,Oe.ltc_2.value=Y.state.rectAreaLTC2,Oe.pointLights.value=Y.state.point,Oe.pointLightShadows.value=Y.state.pointShadow,Oe.hemisphereLights.value=Y.state.hemi,Oe.directionalShadowMap.value=Y.state.directionalShadowMap,Oe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Oe.spotShadowMap.value=Y.state.spotShadowMap,Oe.spotLightMatrix.value=Y.state.spotLightMatrix,Oe.spotLightMap.value=Y.state.spotLightMap,Oe.pointShadowMap.value=Y.state.pointShadowMap,Oe.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.currentProgram=Fe,X.uniformsList=null,Fe}function Pa(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=us.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function La(S,F){const G=k.get(S);G.outputColorSpace=F.outputColorSpace,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function rf(S,F,G,X,Y){F.isScene!==!0&&(F=Ze),te.resetTextureUnits();const Se=F.fog,Ae=X.isMeshStandardMaterial?F.environment:null,Pe=C===null?E.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Un,Ue=(X.isMeshStandardMaterial?le:re).get(X.envMap||Ae),Ge=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Fe=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Oe=!!G.morphAttributes.position,ot=!!G.morphAttributes.normal,Ft=!!G.morphAttributes.color;let dt=Xn;X.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(dt=E.toneMapping);const mn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,st=mn!==void 0?mn.length:0,ke=k.get(X),Os=p.state.lights;if(Me===!0&&(Ee===!0||S!==x)){const Ot=S===x&&X.id===V;pe.setState(X,S,Ot)}let lt=!1;X.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Os.state.version||ke.outputColorSpace!==Pe||Y.isInstancedMesh&&ke.instancing===!1||!Y.isInstancedMesh&&ke.instancing===!0||Y.isSkinnedMesh&&ke.skinning===!1||!Y.isSkinnedMesh&&ke.skinning===!0||Y.isInstancedMesh&&ke.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&ke.instancingColor===!1&&Y.instanceColor!==null||ke.envMap!==Ue||X.fog===!0&&ke.fog!==Se||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==pe.numPlanes||ke.numIntersection!==pe.numIntersection)||ke.vertexAlphas!==Ge||ke.vertexTangents!==Fe||ke.morphTargets!==Oe||ke.morphNormals!==ot||ke.morphColors!==Ft||ke.toneMapping!==dt||N.isWebGL2===!0&&ke.morphTargetsCount!==st)&&(lt=!0):(lt=!0,ke.__version=X.version);let $n=ke.currentProgram;lt===!0&&($n=Nr(X,F,Y));let Da=!1,Qi=!1,Bs=!1;const bt=$n.getUniforms(),Zn=ke.uniforms;if(H.useProgram($n.program)&&(Da=!0,Qi=!0,Bs=!0),X.id!==V&&(V=X.id,Qi=!0),Da||x!==S){bt.setValue(O,"projectionMatrix",S.projectionMatrix),bt.setValue(O,"viewMatrix",S.matrixWorldInverse);const Ot=bt.map.cameraPosition;Ot!==void 0&&Ot.setValue(O,Ie.setFromMatrixPosition(S.matrixWorld)),N.logarithmicDepthBuffer&&bt.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&bt.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Qi=!0,Bs=!0)}if(Y.isSkinnedMesh){bt.setOptional(O,Y,"bindMatrix"),bt.setOptional(O,Y,"bindMatrixInverse");const Ot=Y.skeleton;Ot&&(N.floatVertexTextures?(Ot.boneTexture===null&&Ot.computeBoneTexture(),bt.setValue(O,"boneTexture",Ot.boneTexture,te),bt.setValue(O,"boneTextureSize",Ot.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Hs=G.morphAttributes;if((Hs.position!==void 0||Hs.normal!==void 0||Hs.color!==void 0&&N.isWebGL2===!0)&&ye.update(Y,G,$n),(Qi||ke.receiveShadow!==Y.receiveShadow)&&(ke.receiveShadow=Y.receiveShadow,bt.setValue(O,"receiveShadow",Y.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Zn.envMap.value=Ue,Zn.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),Qi&&(bt.setValue(O,"toneMappingExposure",E.toneMappingExposure),ke.needsLights&&sf(Zn,Bs),Se&&X.fog===!0&&q.refreshFogUniforms(Zn,Se),q.refreshMaterialUniforms(Zn,X,z,Z,Re),us.upload(O,Pa(ke),Zn,te)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(us.upload(O,Pa(ke),Zn,te),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&bt.setValue(O,"center",Y.center),bt.setValue(O,"modelViewMatrix",Y.modelViewMatrix),bt.setValue(O,"normalMatrix",Y.normalMatrix),bt.setValue(O,"modelMatrix",Y.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Ot=X.uniformsGroups;for(let zs=0,af=Ot.length;zs<af;zs++)if(N.isWebGL2){const Ua=Ot[zs];be.update(Ua,$n),be.bind(Ua,$n)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return $n}function sf(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function of(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(S,F,G){k.get(S.texture).__webglTexture=F,k.get(S.depthTexture).__webglTexture=G;const X=k.get(S);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=G===void 0,X.__autoAllocateDepthBuffer||w.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,F){const G=k.get(S);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,G=0){C=S,R=F,D=G;let X=!0,Y=null,Se=!1,Ae=!1;if(S){const Ue=k.get(S);Ue.__useDefaultFramebuffer!==void 0?(H.bindFramebuffer(O.FRAMEBUFFER,null),X=!1):Ue.__webglFramebuffer===void 0?te.setupRenderTarget(S):Ue.__hasExternalTextures&&te.rebindTextures(S,k.get(S.texture).__webglTexture,k.get(S.depthTexture).__webglTexture);const Ge=S.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Ae=!0);const Fe=k.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Fe[F])?Y=Fe[F][G]:Y=Fe[F],Se=!0):N.isWebGL2&&S.samples>0&&te.useMultisampledRTT(S)===!1?Y=k.get(S).__webglMultisampledFramebuffer:Array.isArray(Fe)?Y=Fe[G]:Y=Fe,A.copy(S.viewport),J.copy(S.scissor),oe=S.scissorTest}else A.copy(se).multiplyScalar(z).floor(),J.copy(I).multiplyScalar(z).floor(),oe=W;if(H.bindFramebuffer(O.FRAMEBUFFER,Y)&&N.drawBuffers&&X&&H.drawBuffers(S,Y),H.viewport(A),H.scissor(J),H.setScissorTest(oe),Se){const Ue=k.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ue.__webglTexture,G)}else if(Ae){const Ue=k.get(S.texture),Ge=F||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ue.__webglTexture,G||0,Ge)}V=-1},this.readRenderTargetPixels=function(S,F,G,X,Y,Se,Ae){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=k.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe){H.bindFramebuffer(O.FRAMEBUFFER,Pe);try{const Ue=S.texture,Ge=Ue.format,Fe=Ue.type;if(Ge!==Jt&&Ye.convert(Ge)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=Fe===Ar&&(w.has("EXT_color_buffer_half_float")||N.isWebGL2&&w.has("EXT_color_buffer_float"));if(Fe!==qn&&Ye.convert(Fe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Fe===Wn&&(N.isWebGL2||w.has("OES_texture_float")||w.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-X&&G>=0&&G<=S.height-Y&&O.readPixels(F,G,X,Y,Ye.convert(Ge),Ye.convert(Fe),Se)}finally{const Ue=C!==null?k.get(C).__webglFramebuffer:null;H.bindFramebuffer(O.FRAMEBUFFER,Ue)}}},this.copyFramebufferToTexture=function(S,F,G=0){const X=Math.pow(2,-G),Y=Math.floor(F.image.width*X),Se=Math.floor(F.image.height*X);te.setTexture2D(F,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,S.x,S.y,Y,Se),H.unbindTexture()},this.copyTextureToTexture=function(S,F,G,X=0){const Y=F.image.width,Se=F.image.height,Ae=Ye.convert(G.format),Pe=Ye.convert(G.type);te.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),F.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,X,S.x,S.y,Y,Se,Ae,Pe,F.image.data):F.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,X,S.x,S.y,F.mipmaps[0].width,F.mipmaps[0].height,Ae,F.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,X,S.x,S.y,Ae,Pe,F.image),X===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),H.unbindTexture()},this.copyTextureToTexture3D=function(S,F,G,X,Y=0){if(E.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Se=S.max.x-S.min.x+1,Ae=S.max.y-S.min.y+1,Pe=S.max.z-S.min.z+1,Ue=Ye.convert(X.format),Ge=Ye.convert(X.type);let Fe;if(X.isData3DTexture)te.setTexture3D(X,0),Fe=O.TEXTURE_3D;else if(X.isDataArrayTexture)te.setTexture2DArray(X,0),Fe=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,X.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,X.unpackAlignment);const Oe=O.getParameter(O.UNPACK_ROW_LENGTH),ot=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ft=O.getParameter(O.UNPACK_SKIP_PIXELS),dt=O.getParameter(O.UNPACK_SKIP_ROWS),mn=O.getParameter(O.UNPACK_SKIP_IMAGES),st=G.isCompressedTexture?G.mipmaps[0]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,S.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,S.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,S.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Fe,Y,F.x,F.y,F.z,Se,Ae,Pe,Ue,Ge,st.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Fe,Y,F.x,F.y,F.z,Se,Ae,Pe,Ue,st.data)):O.texSubImage3D(Fe,Y,F.x,F.y,F.z,Se,Ae,Pe,Ue,Ge,st),O.pixelStorei(O.UNPACK_ROW_LENGTH,Oe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ot),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ft),O.pixelStorei(O.UNPACK_SKIP_ROWS,dt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,mn),Y===0&&X.generateMipmaps&&O.generateMipmap(Fe),H.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?te.setTextureCube(S,0):S.isData3DTexture?te.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?te.setTexture2DArray(S,0):te.setTexture2D(S,0),H.unbindTexture()},this.resetState=function(){R=0,D=0,C=null,H.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ba?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Us?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===_t?di:Fu}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===di?_t:Un}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Yx extends tf{}Yx.prototype.isWebGL1Renderer=!0;class jx extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Kx extends Ur{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new qe(16777215),this.specular=new qe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ou,this.normalScale=new Qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $x extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Zx extends $x{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ea}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ea);const Jx=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},Qx={setup(){const n=Xf(null);let e,t,i,r=null;const s=.02;let a=!1,o=0;const l=.3,c={w:!1,a:!1,s:!1,d:!1,space:!1};let u=0,f=0,d=!1,m=0,v=0;const g={position:new B(0,1,0),velocity:new B(0,0,0),rotation:0,speed:.3,acceleration:.015,friction:.92,maxSpeed:.5,angularVelocity:0,angularFriction:.85,maxAngularVelocity:.08},p=V=>{const x=V.key.toLowerCase();x==="w"&&(c.w=!0),x==="a"&&(c.a=!0),x==="s"&&(c.s=!0),x==="d"&&(c.d=!0),x===" "&&(c.space=!0,!a&&r&&(o=l,a=!0))},h=V=>{const x=V.key.toLowerCase();x==="w"&&(c.w=!1),x==="a"&&(c.a=!1),x==="s"&&(c.s=!1),x==="d"&&(c.d=!1),x===" "&&(c.space=!1)},b=V=>{V.preventDefault();const x=V.touches[0];u=x.clientX,f=x.clientY,d=!0},E=V=>{if(V.preventDefault(),!d)return;const x=V.touches[0],A=x.clientX-u,J=x.clientY-f;m=Math.max(-1,Math.min(1,A/100)),v=Math.max(-1,Math.min(1,-J/100))},y=V=>{V.preventDefault(),d=!1,m=0,v=0},R=()=>{if(!r)return;let V=0,x=0;c.d&&(V=g.maxAngularVelocity),c.a&&(V=-g.maxAngularVelocity),d?(V=m*g.maxAngularVelocity,x=v*g.maxSpeed):(c.w&&(x=g.maxSpeed),c.s&&(x=-g.maxSpeed*.7)),g.angularVelocity=V,g.rotation+=g.angularVelocity;const A=new B(Math.sin(g.rotation),0,Math.cos(g.rotation)),J=A.dot(g.velocity),oe=Math.sign(x-J)*g.acceleration,ue=J+oe;if(Math.abs(ue)>.01||c.w||c.s||d){const Z=Math.max(-g.maxSpeed*.7,Math.min(g.maxSpeed,ue));g.velocity.copy(A.multiplyScalar(Z))}!c.w&&!c.s&&!d&&g.velocity.multiplyScalar(g.friction),g.position.add(g.velocity),o-=s,g.position.y+=o,g.position.y<=1&&(g.position.y=1,o=0,a=!1);const U=20,j=20;g.position.x>U&&(g.position.x=U,g.velocity.x*=-.3),g.position.x<-U&&(g.position.x=-U,g.velocity.x*=-.3),g.position.z>j&&(g.position.z=j,g.velocity.z*=-.3),g.position.z<-j&&(g.position.z=-j,g.velocity.z*=-.3),r.position.copy(g.position),r.rotation.y=g.rotation},D=()=>{const V=new B(0,8,12);V.applyAxisAngle(new B(0,1,0),g.rotation),t.position.lerp(g.position.clone().add(V),.05),t.lookAt(g.position.x,g.position.y+1,g.position.z)},C=()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)};return ou(()=>{e=new jx,e.background=new qe(4473924),console.log("Scene created with background color"),t=new Xt(75,window.innerWidth/window.innerHeight,.1,1e3),t.position.set(0,8,12),t.lookAt(0,1,0),i=new tf({antialias:!0}),i.setSize(window.innerWidth,window.innerHeight),n.value.appendChild(i.domElement),console.log("Renderer created and added to DOM");const V=new Zx(16777215,.8);e.add(V),console.log("Lighting added");const x=new Ns(50,50),A=new ys({color:3355443}),J=new Qt(x,A);J.rotation.x=-Math.PI/2,e.add(J),console.log("Ground added to scene"),console.log("Skipping room walls for debugging");const oe=new _i(1.5,1,2.5),ue=new Kx({color:16711680});r=new Qt(oe,ue),r.position.copy(g.position),r.castShadow=!0,r.receiveShadow=!0,e.add(r),console.log("Placeholder car added to scene");const U=new _i(2,2,2),j=new ys({color:65280}),Z=new Qt(U,j);Z.position.set(5,2,0),e.add(Z),console.log("Test cube added to scene"),console.log("Model loading disabled for debugging"),window.addEventListener("keydown",p),window.addEventListener("keyup",h),window.addEventListener("resize",C),window.addEventListener("touchstart",b,{passive:!1}),window.addEventListener("touchmove",E,{passive:!1}),window.addEventListener("touchend",y,{passive:!1});const z=()=>{requestAnimationFrame(z),R(),D(),i.render(e,t)};z(),console.log("Animation loop started")}),_a(()=>{window.removeEventListener("keydown",p),window.removeEventListener("keyup",h),window.removeEventListener("resize",C),window.removeEventListener("touchstart",b),window.removeEventListener("touchmove",E),window.removeEventListener("touchend",y)}),{container:n}}},e0={id:"app"},t0={ref:"container",class:"canvas-container"};function n0(n,e,t,i,r,s){return $h(),Qh("div",e0,[yn("div",t0,null,512),e[0]||(e[0]=yn("div",{class:"ui-overlay"},[yn("div",{class:"controls-info"},[yn("p",null,[yn("strong",null,"Desktop:"),zo(" W/S to accelerate/brake | A/D to steer | SPACE to jump")]),yn("p",null,[yn("strong",null,"Mobile:"),zo(" Drag to steer and accelerate")])])],-1))])}const i0=Jx(Qx,[["render",n0],["__scopeId","data-v-ef17ca8b"]]);Bd(i0).mount("#app");
