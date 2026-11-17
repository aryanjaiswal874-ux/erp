import{j as E,g as Tl,Z as Fl,h as Ua,f as $i,_ as wn,d as hr,$ as Ml,n as tu,a0 as Pl,a1 as Ji,a2 as Ol,a3 as Bl,X as Qi,a4 as Ll,a5 as Wl,E as Zi,a6 as Va,l as jl,a7 as zl,U as Ul,B as Vl,a8 as Gl,a9 as Hl,aa as ql}from"./vendor-ui-TAyo564V.js";import{r as ce}from"./vendor-react-B9U8_Qk5.js";import{u as nu,a as Kl,h as ye,A as st,D as ru}from"./index-wmIHrWYj.js";import{S as Br}from"./StatsCard-CjRjKchL.js";import"./vendor-utils-Dnk_-Q5K.js";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var au=function(r,t){return(au=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var a in n)n.hasOwnProperty(a)&&(e[a]=n[a])})(r,t)};function Mt(r,t){function e(){this.constructor=r}au(r,t),r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}function J(r,t,e,n){return new(e||(e=Promise))((function(a,o){function i(c){try{u(n.next(c))}catch(l){o(l)}}function s(c){try{u(n.throw(c))}catch(l){o(l)}}function u(c){c.done?a(c.value):new e((function(l){l(c.value)})).then(i,s)}u((n=n.apply(r,[])).next())}))}function Q(r,t){var e,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(u){return function(c){return(function(l){if(e)throw new TypeError("Generator is already executing.");for(;i;)try{if(e=1,n&&(a=2&l[0]?n.return:l[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,l[1])).done)return a;switch(n=0,a&&(l=[2&l[0],a.value]),l[0]){case 0:case 1:a=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,n=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){i.label=l[1];break}if(l[0]===6&&i.label<a[1]){i.label=a[1],a=l;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(l);break}a[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(r,i)}catch(h){l=[6,h],n=0}finally{e=a=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}})([u,c])}}}var Xl=(function(){function r(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags()}return r.prototype.setPlatform=function(t,e){this.platform!=null&&console.warn("Platform "+this.platformName+" has already been set. Overwriting the platform with "+e+"."),this.platformName=t,this.platform=e},r.prototype.registerFlag=function(t,e,n){if(this.flagRegistry[t]={evaluationFn:e,setHook:n},this.urlFlags[t]!=null){var a=this.urlFlags[t];console.warn("Setting feature override from URL "+t+": "+a+"."),this.set(t,a)}},r.prototype.get=function(t){return t in this.flags?this.flags[t]:(this.flags[t]=this.evaluateFlag(t),this.flags[t])},r.prototype.getNumber=function(t){return this.get(t)},r.prototype.getBool=function(t){return this.get(t)},r.prototype.getFlags=function(){return this.flags},Object.defineProperty(r.prototype,"features",{get:function(){return this.flags},enumerable:!0,configurable:!0}),r.prototype.set=function(t,e){if(this.flagRegistry[t]==null)throw new Error("Cannot set flag "+t+" as it has not been registered.");this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)},r.prototype.evaluateFlag=function(t){if(this.flagRegistry[t]==null)throw new Error("Cannot evaluate flag '"+t+"': no evaluation function found.");return this.flagRegistry[t].evaluationFn()},r.prototype.setFlags=function(t){this.flags=Object.assign({},t)},r.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},r.prototype.populateURLFlags=function(){var t=this;if(this.global!==void 0&&this.global.location!==void 0&&this.global.location.search!==void 0){var e,n,a=(e=this.global.location.search,n={},e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(function(o){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return Yl(n,i[0],i[1]),i.join("=")})),n);"tfjsflags"in a&&a.tfjsflags.split(",").forEach((function(o){var i=o.split(":"),s=i[0],u=i[1];t.urlFlags[s]=(function(c,l){if((l=l.toLowerCase())==="true"||l==="false")return l==="true";if(""+ +l===l)return+l;throw new Error("Could not parse value flag value "+l+" for flag "+c+".")})(s,u)}))}},r})();function Yl(r,t,e){r[decodeURIComponent(t)]=decodeURIComponent(e||"")}function L(){return ou}var ou=null,Zr=new Map,xo=new Map;function iu(r,t){var e=uu(r,t);return Zr.get(e)}function $l(r){return xo.get(r)}function es(r){for(var t=Zr.entries(),e=[];;){var n=t.next(),a=n.done,o=n.value;if(a)break;var i=o[0],s=o[1];i.split("_")[0]===r&&e.push(s)}return e}function su(r){var t=r.kernelName,e=r.backendName,n=uu(t,e);if(Zr.has(n))throw new Error("The kernel '"+t+"' for backend '"+e+"' is already registered");Zr.set(n,r)}function Jl(r){var t=r.kernelName;xo.has(t)&&console.warn("Overriding the gradient for '"+t+"'"),xo.set(t,r)}function uu(r,t){return t+"_"+r}function yo(r,t,e){return Math.max(r,Math.min(t,e))}function cu(r){return r%2==0?r:r+1}function Ql(r){for(var t=0,e=0;e<r.length;e++)t+=r[e];return t}function k(r,t){if(!r)throw new Error(typeof t=="string"?t:t())}function ke(r,t,e){e===void 0&&(e=""),k(He(r,t),(function(){return e+" Shapes "+r+" and "+t+" must match"}))}function rr(r){k(r!=null,(function(){return"The input to the tensor constructor must be a non-null value."}))}function Zn(r,t,e){if(t===void 0&&(t=[]),e===void 0&&(e=!1),t==null&&(t=[]),Array.isArray(r)||Ut(r)&&!e)for(var n=0;n<r.length;++n)Zn(r[n],t,e);else t.push(r);return t}function Z(r){if(r.length===0)return 1;for(var t=r[0],e=1;e<r.length;e++)t*=r[e];return t}function He(r,t){if(r===t)return!0;if(r==null||t==null||r.length!==t.length)return!1;for(var e=0;e<r.length;e++)if(r[e]!==t[e])return!1;return!0}function Oe(r){return r%1==0}function Zl(r){if(Math.tanh!=null)return Math.tanh(r);if(r===1/0)return 1;if(r===-1/0)return-1;var t=Math.exp(2*r);return(t-1)/(t+1)}function bo(r){var t=Math.ceil(Math.sqrt(r));return[t,Math.ceil(r/t)]}function Hn(r,t){return t<=r.length?r:r+" ".repeat(t-r.length)}function ts(r,t,e){return t===void 0&&(t=function(n){return 0}),new Promise((function(n,a){var o=0,i=function(){if(r())n();else{o++;var s=t(o);e!=null&&o>=e?a():setTimeout(i,s)}};i()}))}function eh(r,t){for(var e=1,n=-1,a=0;a<r.length;++a)if(r[a]>=0)e*=r[a];else if(r[a]===-1){if(n!==-1)throw Error("Shapes can only have 1 implicit size. Found -1 at dim "+n+" and dim "+a);n=a}else if(r[a]<0)throw Error("Shapes can not be < 0. Found "+r[a]+" at dim "+a);if(n===-1){if(t>0&&t!==e)throw Error("Size("+t+") must match the product of shape "+r);return r}if(e===0)throw Error("Cannot infer the missing size in ["+r+"] when there are 0 elements");if(t%e!=0)throw Error("The implicit shape can't be a fractional number. Got "+t+" / "+e);var o=r.slice();return o[n]=t/e,o}function Ve(r,t){var e=t.length;return k((r=r==null?t.map((function(n,a){return a})):[].concat(r)).every((function(n){return n>=-e&&n<e})),(function(){return"All values in axis param must be in range [-"+e+", "+e+") but got axis "+r})),k(r.every((function(n){return Oe(n)})),(function(){return"All values in axis param must be integers but got axis "+r})),r.map((function(n){return n<0?e+n:n}))}function kn(r,t){for(var e=[],n=[],a=t!=null&&Array.isArray(t)&&t.length===0,o=t==null||a?null:Ve(t,r).sort(),i=0,s=0;s<r.length;++s){if(o!=null){if(o[i]===s&&r[s]!==1)throw new Error("Can't squeeze axis "+s+" since its dim '"+r[s]+"' is not 1");(o[i]==null||o[i]>s)&&r[s]===1&&(e.push(r[s]),n.push(s)),o[i]<=s&&i++}r[s]!==1&&(e.push(r[s]),n.push(s))}return{newShape:e,keptDims:n}}function yr(r,t){var e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else{if(r!=="bool")throw new Error("Unknown data type "+r);e=new Uint8Array(t)}return e}function ea(r,t){var e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else if(r==="bool")e=new Uint8Array(t);else{if(r!=="string")throw new Error("Unknown data type "+r);e=new Array(t)}return e}function th(r,t){for(var e=0;e<r.length;e++){var n=r[e];if(isNaN(n)||!isFinite(n))throw Error("A tensor of type "+t+" being uploaded contains "+n+".")}}function nh(r){return r==="bool"||r==="complex64"||r==="float32"||r==="int32"||r==="string"}function rh(r,t){return t!=="complex64"&&(t!=="float32"||r==="complex64")&&(t!=="int32"||r==="float32"||r==="complex64")&&(t!=="bool"||r!=="bool")}function Ut(r){return r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array}function lu(r){if(r==="float32"||r==="int32")return 4;if(r==="complex64")return 8;if(r==="bool")return 1;throw new Error("Unknown dtype "+r)}function ah(r){if(r==null)return 0;var t=0;return r.forEach((function(e){return t+=e.length})),t}function zo(r){return typeof r=="string"||r instanceof String}function oh(r){return typeof r=="boolean"}function ih(r){return typeof r=="number"}function Ir(r){return Array.isArray(r)?Ir(r[0]):r instanceof Float32Array?"float32":r instanceof Int32Array||r instanceof Uint8Array?"int32":ih(r)?"float32":zo(r)?"string":oh(r)?"bool":"float32"}function wo(r){return!!(r&&r.constructor&&r.call&&r.apply)}function Co(r,t){for(var e=t;e<r;++e)if(r%e==0)return e;return r}function Vt(r){var t=r.length;if(t<2)return[];var e=new Array(t-1);e[t-2]=r[t-1];for(var n=t-3;n>=0;--n)e[n]=e[n+1]*r[n+1];return e}function hu(r,t,e){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(r)&&(r=Zn(r)),e&&th(r,t),(function(o,i){return o instanceof Float32Array&&i==="float32"||o instanceof Int32Array&&i==="int32"||o instanceof Uint8Array&&i==="bool"})(r,t))return r;if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool"){for(var n=new Uint8Array(r.length),a=0;a<n.length;++a)Math.round(r[a])!==0&&(n[a]=1);return n}throw new Error("Unknown data type "+t)}function ns(r,t){if(r.length===0)return t[0];var e=r.reduce((function(n,a){return n*a}));if(e===0)return[];if(e!==t.length)throw new Error("["+r+"] does not match the input size.");return(function n(a,o,i){var s=new Array;if(o.length===1)for(var u=o[0],c=0;c<u;c++)s[c]=i[a+c];else{u=o[0];var l=o.slice(1),h=l.reduce((function(f,d){return f*d}));for(c=0;c<u;c++)s[c]=n(a+c*h,l,i)}return s})(0,r,t)}function fu(r,t){for(var e=Rr(r,t),n=0;n<e.length;n++)e[n]=1;return e}function Rr(r,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool")return new Uint8Array(r);throw new Error("Unknown data type "+t)}function Lt(){return L().platform.now()}function du(r){r.forEach((function(t){k(Number.isInteger(t)&&t>=0,(function(){return"Tensor must have a shape comprised of positive integers but got shape ["+r+"]."}))}))}function sh(r,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",L().platform.encode(r,t)}function ta(r,t){return t===void 0&&(t="utf-8"),t=t||"utf-8",L().platform.decode(r,t)}function rs(r,t,e){if(t===0)return 0;if(t===1)return r[0];for(var n=r[r.length-1],a=0;a<r.length-1;++a)n+=e[a]*r[a];return n}function uh(r,t,e){if(t===0)return[];if(t===1)return[r];for(var n=new Array(t),a=0;a<n.length-1;++a)n[a]=Math.floor(r/e[a]),r-=n[a]*e[a];return n[n.length-1]=r,n}var ch=(function(){function r(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new lh)}return r.prototype.profileKernel=function(t,e,n){var a,o=this,i=this.backendTimer.time((function(){a=n()}));return a.forEach((function(s){s.data().then((function(u){(function(c,l,h){if(l!=="float32")return!1;for(var f=0;f<c.length;f++){var d=c[f];if(isNaN(d)||!isFinite(d))return console.warn("Found "+d+" in the result of '"+h+"'"),!0}})(u,s.dtype,t),i.then((function(c){var l="";c.getExtraProfileInfo!=null&&(l=c.getExtraProfileInfo()),o.logger.logKernelProfile(t,s,u,c.kernelMs,e,l)}))}))})),a},r})(),lh=(function(){function r(){}return r.prototype.logKernelProfile=function(t,e,n,a,o,i){var s=typeof a=="number"?Hn(a+"ms",9):a.error,u=Hn(t,25),c=e.rank,l=e.size,h=Hn(e.shape.toString(),14),f="";for(var d in o){var p=o[d].shape||e.shape,m=p.length;f+=d+": "+m+"D "+(m>0?p:"")+" "}console.log("%c"+u+"	%c"+s+"	%c"+c+"D "+h+"	%c"+l+"	%c"+f+"	%c"+i,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},r})(),as=20,fr=3,Ga=7;function hh(r,t,e,n){var a=Vt(t),o=(function(c,l,h,f){var d=Z(l),p=f[f.length-1],m=new Array(p).fill(0),v=l.length,g=h==="complex64"?pr(c):c;if(v>1)for(var y=0;y<d/p;y++)for(var b=y*p,x=0;x<p;x++)m[x]=Math.max(m[x],dr(g[b+x],0,h).length);return m})(r,t,e,a),i=t.length,s=(function c(l,h,f,d,p,m){m===void 0&&(m=!0);var v=f==="complex64"?2:1,g=h[0],y=h.length;if(y===0)return f==="complex64"?[dr(pr(l)[0],0,f)]:f==="bool"?[pu(l[0])]:[l[0].toString()];if(y===1){if(g>as){var b=fr*v,x=Array.from(l.slice(0,b)),w=Array.from(l.slice((g-fr)*v,g*v));return f==="complex64"&&(x=pr(x),w=pr(w)),["["+x.map((function(O,U){return dr(O,p[U],f)})).join(", ")+", ..., "+w.map((function(O,U){return dr(O,p[g-fr+U],f)})).join(", ")+"]"]}return["["+(f==="complex64"?pr(l):Array.from(l)).map((function(O,U){return dr(O,p[U],f)})).join(", ")+"]"]}var C=h.slice(1),N=d.slice(1),I=d[0]*v,R=[];if(g>as){for(var S=0;S<fr;S++){var F=(A=S*I)+I;R.push.apply(R,c(l.slice(A,F),C,f,N,p,!1))}for(R.push("..."),S=g-fr;S<g;S++)F=(A=S*I)+I,R.push.apply(R,c(l.slice(A,F),C,f,N,p,S===g-1))}else for(S=0;S<g;S++){var A;F=(A=S*I)+I,R.push.apply(R,c(l.slice(A,F),C,f,N,p,S===g-1))}var W=y===2?",":"";for(R[0]="["+R[0]+W,S=1;S<R.length-1;S++)R[S]=" "+R[S]+W;var B=`,
`;for(S=2;S<y;S++)B+=`
`;return R[R.length-1]=" "+R[R.length-1]+"]"+(m?"":B),R})(r,t,e,a,o),u=["Tensor"];return n&&(u.push("  dtype: "+e),u.push("  rank: "+i),u.push("  shape: ["+t+"]"),u.push("  values:")),u.push(s.map((function(c){return"    "+c})).join(`
`)),u.join(`
`)}function dr(r,t,e){return Hn(Array.isArray(r)?parseFloat(r[0].toFixed(Ga))+" + "+parseFloat(r[1].toFixed(Ga))+"j":zo(r)?"'"+r+"'":e==="bool"?pu(r):parseFloat(r.toFixed(Ga)).toString(),t)}function pu(r){return r===0?"false":"true"}function pr(r){for(var t=[],e=0;e<r.length;e+=2)t.push([r[e],r[e+1]]);return t}var br=(function(){function r(t,e,n){var a=this;if(this.dtype=e,this.shape=t.slice(),this.size=Z(t),n!=null){var o=n.length;k(o===this.size,(function(){return"Length of values '"+o+"' does not match the size inferred by the shape '"+a.size+"'."}))}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||ea(e,this.size),this.strides=Vt(t)}return r.prototype.set=function(t){for(var e=this,n=[],a=1;a<arguments.length;a++)n[a-1]=arguments[a];n.length===0&&(n=[0]),k(n.length===this.rank,(function(){return"The number of provided coordinates ("+n.length+") must match the rank ("+e.rank+")"}));var o=this.locToIndex(n);this.values[o]=t},r.prototype.get=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t.length===0&&(t=[0]);for(var n=0,a=0,o=t;a<o.length;a++){var i=o[a];if(i<0||i>=this.shape[n]){var s="Requested out of range element at "+t+".   Buffer shape="+this.shape;throw new Error(s)}n++}for(var u=t[t.length-1],c=0;c<t.length-1;++c)u+=this.strides[c]*t[c];return this.values[u]},r.prototype.locToIndex=function(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];for(var e=t[t.length-1],n=0;n<t.length-1;++n)e+=this.strides[n]*t[n];return e},r.prototype.indexToLoc=function(t){if(this.rank===0)return[];if(this.rank===1)return[t];for(var e=new Array(this.shape.length),n=0;n<e.length-1;++n)e[n]=Math.floor(t/this.strides[n]),t-=e[n]*this.strides[n];return e[e.length-1]=t,e},Object.defineProperty(r.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),r.prototype.toTensor=function(){return Wt().makeTensor(this.values,this.shape,this.dtype)},r})(),Wt=null,P=null,vu=null,Te=(function(){function r(t,e,n,a){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=Z(t),this.strides=Vt(t),this.dataId=n,this.id=a,this.rankType=this.rank<5?this.rank.toString():"higher"}return r.prototype.flatten=function(){return this.throwIfDisposed(),this.as1D()},r.prototype.asScalar=function(){return this.throwIfDisposed(),k(this.size===1,(function(){return"The array must have only 1 element."})),this.reshape([])},r.prototype.as1D=function(){return this.throwIfDisposed(),this.reshape([this.size])},r.prototype.as2D=function(t,e){return this.throwIfDisposed(),this.reshape([t,e])},r.prototype.as3D=function(t,e,n){return this.throwIfDisposed(),this.reshape([t,e,n])},r.prototype.as4D=function(t,e,n,a){return this.throwIfDisposed(),this.reshape([t,e,n,a])},r.prototype.as5D=function(t,e,n,a,o){return this.throwIfDisposed(),this.reshape([t,e,n,a,o])},r.prototype.asType=function(t){return this.throwIfDisposed(),P.cast(this,t)},Object.defineProperty(r.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),r.prototype.buffer=function(){return J(this,void 0,void 0,(function(){var t;return Q(this,(function(e){switch(e.label){case 0:return[4,this.data()];case 1:return t=e.sent(),[2,P.buffer(this.shape,this.dtype,t)]}}))}))},r.prototype.bufferSync=function(){return P.buffer(this.shape,this.dtype,this.dataSync())},r.prototype.array=function(){return J(this,void 0,void 0,(function(){var t;return Q(this,(function(e){switch(e.label){case 0:return[4,this.data()];case 1:return t=e.sent(),[2,ns(this.shape,t)]}}))}))},r.prototype.arraySync=function(){return ns(this.shape,this.dataSync())},r.prototype.data=function(){return J(this,void 0,void 0,(function(){var t,e;return Q(this,(function(n){switch(n.label){case 0:return this.throwIfDisposed(),t=Wt().read(this.dataId),this.dtype!=="string"?[3,2]:[4,t];case 1:e=n.sent();try{return[2,e.map((function(a){return ta(a)}))]}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}n.label=2;case 2:return[2,t]}}))}))},r.prototype.dataSync=function(){this.throwIfDisposed();var t=Wt().readSync(this.dataId);if(this.dtype==="string")try{return t.map((function(e){return ta(e)}))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t},r.prototype.bytes=function(){return J(this,void 0,void 0,(function(){var t;return Q(this,(function(e){switch(e.label){case 0:return this.throwIfDisposed(),[4,Wt().read(this.dataId)];case 1:return t=e.sent(),this.dtype==="string"?[2,t]:[2,new Uint8Array(t.buffer)]}}))}))},r.prototype.dispose=function(){this.isDisposed||(Wt().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(r.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!0,configurable:!0}),r.prototype.throwIfDisposed=function(){if(this.isDisposed)throw new Error("Tensor is disposed.")},r.prototype.toFloat=function(){return this.asType("float32")},r.prototype.toInt=function(){return this.asType("int32")},r.prototype.toBool=function(){return this.asType("bool")},r.prototype.print=function(t){return t===void 0&&(t=!1),P.print(this,t)},r.prototype.reshape=function(t){return this.throwIfDisposed(),P.reshape(this,t)},r.prototype.reshapeAs=function(t){return this.throwIfDisposed(),this.reshape(t.shape)},r.prototype.expandDims=function(t){return t===void 0&&(t=0),P.expandDims(this,t)},r.prototype.cumsum=function(t,e,n){return t===void 0&&(t=0),e===void 0&&(e=!1),n===void 0&&(n=!1),P.cumsum(this,t,e,n)},r.prototype.squeeze=function(t){return this.throwIfDisposed(),P.squeeze(this,t)},r.prototype.clone=function(){return this.throwIfDisposed(),P.clone(this)},r.prototype.oneHot=function(t,e,n){return this.throwIfDisposed(),P.oneHot(this,t,e,n)},r.prototype.toString=function(t){return t===void 0&&(t=!1),hh(this.dataSync(),this.shape,this.dtype,t)},r.prototype.tile=function(t){return this.throwIfDisposed(),P.tile(this,t)},r.prototype.gather=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),P.gather(this,t,e)},r.prototype.matMul=function(t,e,n){return e===void 0&&(e=!1),n===void 0&&(n=!1),this.throwIfDisposed(),P.matMul(this,t,e,n)},r.prototype.dot=function(t){return this.throwIfDisposed(),P.dot(this,t)},r.prototype.norm=function(t,e,n){return t===void 0&&(t="euclidean"),e===void 0&&(e=null),n===void 0&&(n=!1),this.throwIfDisposed(),P.norm(this,t,e,n)},r.prototype.slice=function(t,e){return this.throwIfDisposed(),P.slice(this,t,e)},r.prototype.reverse=function(t){return this.throwIfDisposed(),P.reverse(this,t)},r.prototype.concat=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),t instanceof r&&(t=[t]),P.concat([this].concat(t),e)},r.prototype.split=function(t,e){return e===void 0&&(e=0),this.throwIfDisposed(),P.split(this,t,e)},r.prototype.stack=function(t,e){return e===void 0&&(e=0),P.stack([this,t],e)},r.prototype.unstack=function(t){return t===void 0&&(t=0),P.unstack(this,t)},r.prototype.pad=function(t,e){return e===void 0&&(e=0),P.pad(this,t,e)},r.prototype.batchNormalization=function(t,e,n,a,o){return n===void 0&&(n=.001),vu("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon"),this.batchNorm(t,e,o,a,n)},r.prototype.batchNorm=function(t,e,n,a,o){return o===void 0&&(o=.001),this.throwIfDisposed(),P.batchNorm(this,t,e,n,a,o)},r.prototype.all=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.all(this,t,e)},r.prototype.any=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.any(this,t,e)},r.prototype.logSumExp=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.logSumExp(this,t,e)},r.prototype.sum=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.sum(this,t,e)},r.prototype.prod=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.prod(this,t,e)},r.prototype.mean=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.mean(this,t,e)},r.prototype.min=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.min(this,t,e)},r.prototype.max=function(t,e){return t===void 0&&(t=null),e===void 0&&(e=!1),this.throwIfDisposed(),P.max(this,t,e)},r.prototype.argMin=function(t){return t===void 0&&(t=null),this.throwIfDisposed(),P.argMin(this,t)},r.prototype.argMax=function(t){return t===void 0&&(t=null),this.throwIfDisposed(),P.argMax(this,t)},r.prototype.cast=function(t){return this.throwIfDisposed(),P.cast(this,t)},r.prototype.add=function(t){return this.throwIfDisposed(),P.add(this,t)},r.prototype.addStrict=function(t){return this.throwIfDisposed(),P.addStrict(this,t)},r.prototype.atan2=function(t){return this.throwIfDisposed(),P.atan2(this,t)},r.prototype.sub=function(t){return this.throwIfDisposed(),P.sub(this,t)},r.prototype.subStrict=function(t){return this.throwIfDisposed(),P.subStrict(this,t)},r.prototype.pow=function(t){return this.throwIfDisposed(),P.pow(this,t)},r.prototype.powStrict=function(t){return this.throwIfDisposed(),P.powStrict(this,t)},r.prototype.mul=function(t){return this.throwIfDisposed(),P.mul(this,t)},r.prototype.mulStrict=function(t){return this.throwIfDisposed(),P.mulStrict(this,t)},r.prototype.div=function(t){return this.throwIfDisposed(),P.div(this,t)},r.prototype.divNoNan=function(t){return this.throwIfDisposed(),P.divNoNan(this,t)},r.prototype.floorDiv=function(t){return this.throwIfDisposed(),P.floorDiv(this,t)},r.prototype.divStrict=function(t){return this.throwIfDisposed(),P.divStrict(this,t)},r.prototype.minimum=function(t){return this.throwIfDisposed(),P.minimum(this,t)},r.prototype.minimumStrict=function(t){return this.throwIfDisposed(),P.minimumStrict(this,t)},r.prototype.maximum=function(t){return this.throwIfDisposed(),P.maximum(this,t)},r.prototype.maximumStrict=function(t){return this.throwIfDisposed(),P.maximumStrict(this,t)},r.prototype.mod=function(t){return this.throwIfDisposed(),P.mod(this,t)},r.prototype.modStrict=function(t){return this.throwIfDisposed(),P.modStrict(this,t)},r.prototype.squaredDifferenceStrict=function(t){return this.throwIfDisposed(),P.squaredDifferenceStrict(this,t)},r.prototype.transpose=function(t){return this.throwIfDisposed(),P.transpose(this,t)},r.prototype.notEqual=function(t){return this.throwIfDisposed(),P.notEqual(this,t)},r.prototype.notEqualStrict=function(t){return this.throwIfDisposed(),P.notEqualStrict(this,t)},r.prototype.less=function(t){return this.throwIfDisposed(),P.less(this,t)},r.prototype.lessStrict=function(t){return this.throwIfDisposed(),P.lessStrict(this,t)},r.prototype.equal=function(t){return this.throwIfDisposed(),P.equal(this,t)},r.prototype.equalStrict=function(t){return this.throwIfDisposed(),P.equalStrict(this,t)},r.prototype.lessEqual=function(t){return this.throwIfDisposed(),P.lessEqual(this,t)},r.prototype.lessEqualStrict=function(t){return this.throwIfDisposed(),P.lessEqualStrict(this,t)},r.prototype.greater=function(t){return this.throwIfDisposed(),P.greater(this,t)},r.prototype.greaterStrict=function(t){return this.throwIfDisposed(),P.greaterStrict(this,t)},r.prototype.greaterEqual=function(t){return this.throwIfDisposed(),P.greaterEqual(this,t)},r.prototype.greaterEqualStrict=function(t){return this.throwIfDisposed(),P.greaterEqualStrict(this,t)},r.prototype.logicalAnd=function(t){return this.throwIfDisposed(),P.logicalAnd(this,t)},r.prototype.logicalOr=function(t){return this.throwIfDisposed(),P.logicalOr(this,t)},r.prototype.logicalNot=function(){return this.throwIfDisposed(),P.logicalNot(this)},r.prototype.logicalXor=function(t){return this.throwIfDisposed(),P.logicalXor(this,t)},r.prototype.where=function(t,e){return this.throwIfDisposed(),P.where(t,this,e)},r.prototype.neg=function(){return this.throwIfDisposed(),P.neg(this)},r.prototype.ceil=function(){return this.throwIfDisposed(),P.ceil(this)},r.prototype.floor=function(){return this.throwIfDisposed(),P.floor(this)},r.prototype.sign=function(){return this.throwIfDisposed(),P.sign(this)},r.prototype.isNaN=function(){return this.throwIfDisposed(),P.isNaN(this)},r.prototype.isInf=function(){return this.throwIfDisposed(),P.isInf(this)},r.prototype.isFinite=function(){return this.throwIfDisposed(),P.isFinite(this)},r.prototype.exp=function(){return this.throwIfDisposed(),P.exp(this)},r.prototype.expm1=function(){return this.throwIfDisposed(),P.expm1(this)},r.prototype.log=function(){return this.throwIfDisposed(),P.log(this)},r.prototype.log1p=function(){return this.throwIfDisposed(),P.log1p(this)},r.prototype.sqrt=function(){return this.throwIfDisposed(),P.sqrt(this)},r.prototype.rsqrt=function(){return this.throwIfDisposed(),P.rsqrt(this)},r.prototype.square=function(){return this.throwIfDisposed(),P.square(this)},r.prototype.reciprocal=function(){return this.throwIfDisposed(),P.reciprocal(this)},r.prototype.abs=function(){return this.throwIfDisposed(),P.abs(this)},r.prototype.clipByValue=function(t,e){return this.throwIfDisposed(),P.clipByValue(this,t,e)},r.prototype.relu=function(){return this.throwIfDisposed(),P.relu(this)},r.prototype.relu6=function(){return this.throwIfDisposed(),P.relu6(this)},r.prototype.elu=function(){return this.throwIfDisposed(),P.elu(this)},r.prototype.selu=function(){return this.throwIfDisposed(),P.selu(this)},r.prototype.leakyRelu=function(t){return t===void 0&&(t=.2),this.throwIfDisposed(),P.leakyRelu(this,t)},r.prototype.prelu=function(t){return this.throwIfDisposed(),P.prelu(this,t)},r.prototype.sigmoid=function(){return this.throwIfDisposed(),P.sigmoid(this)},r.prototype.logSigmoid=function(){return this.throwIfDisposed(),P.logSigmoid(this)},r.prototype.softplus=function(){return this.throwIfDisposed(),P.softplus(this)},r.prototype.zerosLike=function(){return this.throwIfDisposed(),P.zerosLike(this)},r.prototype.onesLike=function(){return this.throwIfDisposed(),P.onesLike(this)},r.prototype.sin=function(){return this.throwIfDisposed(),P.sin(this)},r.prototype.cos=function(){return this.throwIfDisposed(),P.cos(this)},r.prototype.tan=function(){return this.throwIfDisposed(),P.tan(this)},r.prototype.asin=function(){return this.throwIfDisposed(),P.asin(this)},r.prototype.acos=function(){return this.throwIfDisposed(),P.acos(this)},r.prototype.atan=function(){return this.throwIfDisposed(),P.atan(this)},r.prototype.sinh=function(){return this.throwIfDisposed(),P.sinh(this)},r.prototype.cosh=function(){return this.throwIfDisposed(),P.cosh(this)},r.prototype.tanh=function(){return this.throwIfDisposed(),P.tanh(this)},r.prototype.asinh=function(){return this.throwIfDisposed(),P.asinh(this)},r.prototype.acosh=function(){return this.throwIfDisposed(),P.acosh(this)},r.prototype.atanh=function(){return this.throwIfDisposed(),P.atanh(this)},r.prototype.erf=function(){return this.throwIfDisposed(),P.erf(this)},r.prototype.round=function(){return this.throwIfDisposed(),P.round(this)},r.prototype.step=function(t){return t===void 0&&(t=0),this.throwIfDisposed(),P.step(this,t)},r.prototype.softmax=function(t){return t===void 0&&(t=-1),this.throwIfDisposed(),P.softmax(this,t)},r.prototype.logSoftmax=function(t){return t===void 0&&(t=-1),this.throwIfDisposed(),P.logSoftmax(this,t)},r.prototype.resizeBilinear=function(t,e){return e===void 0&&(e=!1),this.throwIfDisposed(),P.image.resizeBilinear(this,t,e)},r.prototype.resizeNearestNeighbor=function(t,e){return e===void 0&&(e=!1),this.throwIfDisposed(),P.image.resizeNearestNeighbor(this,t,e)},r.prototype.conv1d=function(t,e,n,a,o,i){return a===void 0&&(a="NWC"),o===void 0&&(o=1),this.throwIfDisposed(),P.conv1d(this,t,e,n,a,o,i)},r.prototype.conv2d=function(t,e,n,a,o,i){return a===void 0&&(a="NHWC"),o===void 0&&(o=[1,1]),this.throwIfDisposed(),P.conv2d(this,t,e,n,a,o,i)},r.prototype.conv2dTranspose=function(t,e,n,a,o){return this.throwIfDisposed(),P.conv2dTranspose(this,t,e,n,a,o)},r.prototype.depthwiseConv2D=function(t,e,n,a,o,i){return a===void 0&&(a="NHWC"),o===void 0&&(o=[1,1]),this.throwIfDisposed(),P.depthwiseConv2d(this,t,e,n,a,o,i)},r.prototype.separableConv2d=function(t,e,n,a,o,i){return o===void 0&&(o=[1,1]),i===void 0&&(i="NHWC"),this.throwIfDisposed(),P.separableConv2d(this,t,e,n,a,o,i)},r.prototype.avgPool=function(t,e,n,a){return this.throwIfDisposed(),P.avgPool(this,t,e,n,a)},r.prototype.maxPool=function(t,e,n,a){return this.throwIfDisposed(),P.maxPool(this,t,e,n,a)},r.prototype.localResponseNormalization=function(t,e,n,a){return t===void 0&&(t=5),e===void 0&&(e=1),n===void 0&&(n=1),a===void 0&&(a=.5),P.localResponseNormalization(this,t,e,n,a)},r.prototype.pool=function(t,e,n,a,o){return this.throwIfDisposed(),P.pool(this,t,e,n,a,o)},r.prototype.variable=function(t,e,n){return t===void 0&&(t=!0),this.throwIfDisposed(),Wt().makeVariable(this,t,e,n)},r.prototype.unsortedSegmentSum=function(t,e){return this.throwIfDisposed(),P.unsortedSegmentSum(this,t,e)},r.prototype.batchToSpaceND=function(t,e){return this.throwIfDisposed(),P.batchToSpaceND(this,t,e)},r.prototype.spaceToBatchND=function(t,e){return this.throwIfDisposed(),P.spaceToBatchND(this,t,e)},r.prototype.topk=function(t,e){return t===void 0&&(t=1),e===void 0&&(e=!0),this.throwIfDisposed(),P.topk(this,t,e)},r.prototype.stridedSlice=function(t,e,n,a,o,i,s,u){return a===void 0&&(a=0),o===void 0&&(o=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),this.throwIfDisposed(),P.stridedSlice(this,t,e,n,a,o,i,s,u)},r.prototype.depthToSpace=function(t,e){return this.throwIfDisposed(),P.depthToSpace(this,t,e)},r.prototype.fft=function(){return this.throwIfDisposed(),P.spectral.fft(this)},r.prototype.ifft=function(){return this.throwIfDisposed(),P.spectral.ifft(this)},r.prototype.rfft=function(){return this.throwIfDisposed(),P.spectral.rfft(this)},r.prototype.irfft=function(){return this.throwIfDisposed(),P.spectral.irfft(this)},r})();Object.defineProperty(Te,Symbol.hasInstance,{value:function(r){return!!r&&r.dataId!=null&&r.shape!=null&&r.dtype!=null}});var os,_o,Eo,ko,Io,er=(function(r){function t(e,n,a,o){var i=r.call(this,e.shape,e.dtype,e.dataId,o)||this;return i.trainable=n,i.name=a,i}return Mt(t,r),t.prototype.assign=function(e){if(e.dtype!==this.dtype)throw new Error("dtype of the new value ("+e.dtype+") and previous value ("+this.dtype+") must match");if(!He(e.shape,this.shape))throw new Error("shape of the new value ("+e.shape+") and previous value ("+this.shape+") must match");Wt().disposeTensor(this),this.dataId=e.dataId,Wt().incRef(this,null)},t.prototype.dispose=function(){Wt().disposeVariable(this),this.isDisposedInternal=!0},t})(Te);Object.defineProperty(er,Symbol.hasInstance,{value:function(r){return r instanceof Te&&r.assign!=null&&r.assign instanceof Function}}),(function(r){r.R0="R0",r.R1="R1",r.R2="R2",r.R3="R3",r.R4="R4",r.R5="R5",r.R6="R6"})(os||(os={})),(function(r){r.float32="float32",r.int32="int32",r.bool="int32",r.complex64="complex64"})(_o||(_o={})),(function(r){r.float32="float32",r.int32="int32",r.bool="bool",r.complex64="complex64"})(Eo||(Eo={})),(function(r){r.float32="float32",r.int32="float32",r.bool="float32",r.complex64="complex64"})(ko||(ko={})),(function(r){r.float32="complex64",r.int32="complex64",r.bool="complex64",r.complex64="complex64"})(Io||(Io={}));var fh={float32:ko,int32:_o,bool:Eo,complex64:Io};function Xe(r,t){if(r==="string"||t==="string"){if(r==="string"&&t==="string")return"string";throw new Error("Can not upcast "+r+" with "+t)}return fh[r][t]}function Ha(r){return Xe(r,"int32")}function Me(r,t){if(r.dtype===t.dtype)return[r,t];var e=Xe(r.dtype,t.dtype);return[r.cast(e),t.cast(e)]}function dh(r,t){k(r.dtype===t.dtype,(function(){return"The dtypes of the first("+r.dtype+") and second("+t.dtype+") input must match"}))}function mu(r){var t=[];return(function e(n,a,o){if(n!=null){if(n instanceof Te)return void a.push(n);if(i=n,!(!Array.isArray(i)&&typeof i!="object")){var i,s=n;for(var u in s){var c=s[u];o.has(c)||(o.add(c),e(c,a,o))}}}})(r,t,new Set),t}var qa,is=(function(){function r(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null}}return r.prototype.dispose=function(){for(var t in this.registeredVariables)this.registeredVariables[t].dispose()},r})(),ph=(function(){function r(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new is}return r.prototype.ready=function(){return J(this,void 0,void 0,(function(){var t,e,n;return Q(this,(function(a){switch(a.label){case 0:if(this.pendingBackendInit!=null)return[2,this.pendingBackendInit.then((function(){}))];if(this.backendInstance!=null)return[2];t=this.getSortedBackends(),e=0,a.label=1;case 1:return e<t.length?(n=t[e],[4,this.initializeBackend(n).success]):[3,5];case 2:return a.sent()?[4,this.setBackend(n)]:[3,4];case 3:return a.sent(),[2];case 4:return e++,[3,1];case 5:throw new Error("Could not initialize any backends, all backend initializations failed.")}}))}))},Object.defineProperty(r.prototype,"backend",{get:function(){if(this.pendingBackendInit!=null)throw new Error("Backend '"+this.backendName+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");if(this.backendInstance==null){var t=this.initializeBackendsAndReturnBest(),e=t.name;if(t.asyncInit)throw new Error("The highest priority backend '"+e+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(e)}return this.backendInstance},enumerable:!0,configurable:!0}),r.prototype.backendNames=function(){return Object.keys(this.registryFactory)},r.prototype.findBackend=function(t){return!(t in this.registry)&&(!(t in this.registryFactory)||this.initializeBackend(t).asyncInit)?null:this.registry[t]},r.prototype.findBackendFactory=function(t){return t in this.registryFactory?this.registryFactory[t].factory:null},r.prototype.registerBackend=function(t,e,n){return n===void 0&&(n=1),t in this.registryFactory?(console.warn(t+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[t]={factory:e,priority:n},!0)},r.prototype.setBackend=function(t){return J(this,void 0,void 0,(function(){var e,n,a;return Q(this,(function(o){switch(o.label){case 0:if(this.registryFactory[t]==null)throw new Error("Backend name '"+t+"' not found in registry");return this.backendName=t,this.registry[t]!=null?[3,4]:(this.backendInstance=null,e=this.initializeBackend(t),n=e.success,e.asyncInit?[4,n]:[3,2]);case 1:return a=o.sent(),[3,3];case 2:a=n,o.label=3;case 3:if(!a)return[2,!1];o.label=4;case 4:return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new ch(this.backendInstance),[2,!0]}}))}))},r.prototype.setupRegisteredKernels=function(){var t=this;es(this.backendName).forEach((function(e){e.setupFunc!=null&&e.setupFunc(t.backendInstance)}))},r.prototype.disposeRegisteredKernels=function(t){var e=this;es(t).forEach((function(n){n.disposeFunc!=null&&n.disposeFunc(e.registry[t])}))},r.prototype.initializeBackend=function(t){var e=this,n=this.registryFactory[t];if(n==null)throw new Error("Cannot initialize backend "+t+", no registration found.");try{var a=n.factory();if(Promise.resolve(a)===a){var o=++this.pendingBackendInitId,i=a.then((function(s){return!(o<e.pendingBackendInitId)&&(e.registry[t]=s,e.pendingBackendInit=null,!0)})).catch((function(s){return!(o<e.pendingBackendInitId)&&(e.pendingBackendInit=null,console.warn("Initialization of backend "+t+" failed"),console.warn(s.stack||s.message),!1)}));return this.pendingBackendInit=i,{success:i,asyncInit:!0}}return this.registry[t]=a,{success:!0,asyncInit:!1}}catch(s){return console.warn("Initialization of backend "+t+" failed"),console.warn(s.stack||s.message),{success:!1,asyncInit:!1}}},r.prototype.removeBackend=function(t){if(!(t in this.registryFactory))throw new Error(t+" backend not found in registry");this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},r.prototype.getSortedBackends=function(){var t=this;if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((function(e,n){return t.registryFactory[n].priority-t.registryFactory[e].priority}))},r.prototype.initializeBackendsAndReturnBest=function(){for(var t=this.getSortedBackends(),e=0;e<t.length;e++){var n=t[e],a=this.initializeBackend(n),o=a.success,i=a.asyncInit;if(i||o)return{name:n,asyncInit:i}}throw new Error("Could not initialize any backends, all backend initializations failed.")},r.prototype.moveData=function(t,e){var n=this.state.tensorInfo.get(e),a=n.backend,o=this.readSync(e);a.disposeData(e),n.backend=t,t.move(e,o,n.shape,n.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},r.prototype.tidy=function(t,e){var n,a=this,o=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=t}return this.scopedRun((function(){return a.startScope(o)}),(function(){return a.endScope(n)}),(function(){return(n=e())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n}))},r.prototype.scopedRun=function(t,e,n){t();try{var a=n();return e(),a}catch(o){throw e(),o}},r.prototype.nextTensorId=function(){return r.nextTensorId++},r.prototype.nextVariableId=function(){return r.nextVariableId++},r.prototype.clone=function(t){var e=this.makeTensorFromDataId(t.dataId,t.shape,t.dtype),n={x:t};return this.addTapeNode(this.state.activeScope.name,n,[e],(function(a){return{x:function(){return a.toFloat()}}}),[]),e},r.prototype.runKernel=function(t,e,n,a,o){return this.runKernelFunc(null,e,null,t,n,a,o)},r.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},r.prototype.checkKernelForMemLeak=function(t,e,n){var a=this.backend.numDataIds(),o=0;n.forEach((function(u){o+=u.dtype==="complex64"?3:1}));var i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=a-e-o-i;if(s>0)throw new Error("Backend '"+this.backendName+"' has an internal memory leak ("+s+" data ids) after running '"+t+"'")},r.prototype.runKernelFunc=function(t,e,n,a,o,i,s){var u,c=this;i===void 0&&(i=[]),s===void 0&&(s=[]);var l=[],h=this.isTapeOn();a==null&&(a=this.state.activeScope!=null?this.state.activeScope.name:"");var f,d=function(y){h&&(l=y.map((function(b){return c.keep(c.clone(b))})))},p=this.state.numBytes,m=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);var v,g=iu(a,this.backendName);return f=g!=null?function(){var y=c.backend.numDataIds();v=g.kernelFunc({inputs:e,attrs:o,backend:c.backend});var b=Array.isArray(v)?v:[v];c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(a,y,b);var x=b.map((function(C){var N=C.dataId,I=C.shape,R=C.dtype;return c.makeTensorFromDataId(N,I,R)})),w=x.filter((function(C,N){return s[N]}));return d((i||[]).slice().concat(w)),x}:function(){var y=c.backend.numDataIds();v=c.tidy((function(){return t(c.backend,d)}));var b=Array.isArray(v)?v:[v];return c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(a,y,b),b},this.scopedRun((function(){return c.state.kernelDepth++}),(function(){return c.state.kernelDepth--}),(function(){u=c.ENV.getBool("DEBUG")?c.profiler.profileKernel(a,e,(function(){return f()})):f()})),h&&this.addTapeNode(a,e,u,n,l),this.state.profiling&&this.state.activeProfile.kernels.push({name:a,bytesAdded:this.state.numBytes-p,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-m,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(e).map((function(y){return e[y].shape})),outputShapes:u.map((function(y){return y.shape}))}),Array.isArray(v)?u:u[0]},r.prototype.makeTensor=function(t,e,n,a){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",a=a||this.backend;var o=t;n==="string"&&zo(t[0])&&(o=t.map((function(l){return sh(l)})));var i=a.write(o,e,n),s=new Te(e,n,i,this.nextTensorId());if(this.incRef(s,a),n==="string"){var u=this.state.tensorInfo.get(i),c=ah(o);this.state.numBytes+=c-u.bytes,u.bytes=c}return s},r.prototype.makeTensorFromDataId=function(t,e,n,a){var o=new Te(e,n=n||"float32",t,this.nextTensorId());return this.incRef(o,a),o},r.prototype.makeVariable=function(t,e,n,a){e===void 0&&(e=!0),n=n||this.nextVariableId().toString(),a!=null&&a!==t.dtype&&(t=t.asType(a));var o=new er(t,e,n,this.nextTensorId());if(this.state.registeredVariables[o.name]!=null)throw new Error("Variable with name "+o.name+" was already registered");return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o},r.prototype.incRef=function(t,e){var n=this.state.tensorInfo.has(t.dataId)?this.state.tensorInfo.get(t.dataId).refCount:0;if(this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++,n===0){this.state.numDataBuffers++;var a=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(a=t.size*lu(t.dtype)),this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:a,refCount:0}),this.state.numBytes+=a}this.state.tensorInfo.get(t.dataId).refCount++,t instanceof er||this.track(t)},r.prototype.disposeTensor=function(t){if(this.state.tensorInfo.has(t.dataId)){this.state.numTensors--,t.dtype==="string"&&this.state.numStringTensors--;var e=this.state.tensorInfo.get(t.dataId);e.refCount<=1?(t.dtype!=="complex64"&&(this.state.numBytes-=e.bytes),this.state.numDataBuffers--,e.backend.disposeData(t.dataId),this.state.tensorInfo.delete(t.dataId)):this.state.tensorInfo.get(t.dataId).refCount--}},r.prototype.disposeVariables=function(){for(var t in this.state.registeredVariables){var e=this.state.registeredVariables[t];this.disposeVariable(e)}},r.prototype.disposeVariable=function(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]},r.prototype.memory=function(){var t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t},r.prototype.profile=function(t){return J(this,void 0,void 0,(function(){var e,n;return Q(this,(function(a){return this.state.profiling=!0,e=this.state.numBytes,n=this.state.numTensors,this.state.activeProfile.kernels=[],this.state.activeProfile.result=t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,this.state.activeProfile.kernels.map((function(o){return o.totalBytesSnapshot}))),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-n,[2,this.state.activeProfile]}))}))},r.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&this.state.kernelDepth===0},r.prototype.addTapeNode=function(t,e,n,a,o){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:n,saved:o},u=$l(t);u!=null&&(a=u.gradFunc),a!=null&&(s.gradient=function(c){return c=c.map((function(l,h){if(l==null){var f=n[h],d=Rr(f.size,f.dtype);return i.makeTensor(d,f.shape,f.dtype)}return l})),a(c.length>1?c:c[0],o)}),this.state.activeTape.push(s)},r.prototype.keep=function(t){return t.kept=!0,t},r.prototype.startTape=function(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++},r.prototype.endTape=function(){this.state.gradientDepth--},r.prototype.startScope=function(t){var e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e},r.prototype.endScope=function(t){for(var e=this,n=mu(t),a=new Set(n.map((function(u){return u.id}))),o=0;o<this.state.activeScope.track.length;o++){var i=this.state.activeScope.track[o];i.kept||a.has(i.id)||i.dispose()}var s=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach((function(u){u.kept||u.scopeId!==s.id||e.track(u)}))},r.prototype.gradients=function(t,e,n,a){var o=this;if(a===void 0&&(a=!1),k(e.length>0,(function(){return"gradients() received an empty list of xs."})),n!=null&&n.dtype!=="float32")throw new Error("dy must have 'float32' dtype, but has '"+n.dtype+"'");var i=this.scopedRun((function(){return o.startTape()}),(function(){return o.endTape()}),(function(){return o.tidy("forward",t)}));k(i instanceof Te,(function(){return"The result y returned by f() must be a tensor."}));var s=(function(u,c,l){for(var h={},f={},d=0;d<c.length;d++)h[c[d].id]=!0;for(d=0;d<u.length;d++){var p=(C=u[d]).inputs;for(var m in p){for(var v=p[m],g=!1,y=0;y<c.length;y++)if(h[v.id]){C.outputs.forEach((function(S){return h[S.id]=!0})),g=!0,f[C.id]=!0;break}if(g)break}}var b={};b[l.id]=!0;var x={};for(d=u.length-1;d>=0;d--)for(p=(C=u[d]).inputs,y=0;y<C.outputs.length;y++)if(b[C.outputs[y].id]){for(var m in p)b[p[m].id]=!0,x[C.id]=!0;break}var w=[];for(d=0;d<u.length;d++){var C;if(f[(C=u[d]).id]&&x[C.id]){var N={};for(var m in C.inputs){var I=C.inputs[m];h[I.id]&&(N[m]=I)}var R=Object.assign({},C);R.inputs=N,R.outputs=C.outputs,w.push(R)}}return w})(this.state.activeTape,e,i);if(!a&&s.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",(function(){var u,c,l={};l[i.id]=n??(u=i.shape,c=fu(Z(u),"float32"),T.makeTensor(c,u,"float32")),(function(f,d,p){for(var m=function(g){var y=d[g],b=[];if(y.outputs.forEach((function(N){var I=f[N.id];I!=null?b.push(I):b.push(null)})),y.gradient==null)throw new Error("Cannot compute gradient: gradient function not found for "+y.kernelName+".");var x=y.gradient(b),w=function(N){if(!(N in x))throw new Error("Cannot backprop through input "+N+". Available gradients found: "+Object.keys(x)+".");var I=p((function(){return x[N]()}));if(I.dtype!=="float32")throw new Error("Error in gradient for op "+y.kernelName+". The gradient of input "+N+" must have 'float32' dtype, but has '"+I.dtype+"'");var R=y.inputs[N];if(!He(I.shape,R.shape))throw new Error("Error in gradient for op "+y.kernelName+". The gradient of input '"+N+"' has shape '"+I.shape+"', which does not match the shape of the input '"+R.shape+"'");if(f[R.id]==null)f[R.id]=I;else{var S=f[R.id];f[R.id]=S.add(I),S.dispose()}};for(var C in y.inputs)w(C)},v=d.length-1;v>=0;v--)m(v)})(l,s,(function(f){return o.tidy(f)}));var h=e.map((function(f){return l[f.id]}));return o.state.gradientDepth===0&&(o.state.activeTape.forEach((function(f){for(var d=0,p=f.saved;d<p.length;d++)p[d].dispose()})),o.state.activeTape=null),{value:i,grads:h}}))},r.prototype.customGrad=function(t){var e=this;return k(wo(t),(function(){return"The f passed in customGrad(f) must be a function."})),function(){for(var n,a=[],o=0;o<arguments.length;o++)a[o]=arguments[o];k(a.every((function(s){return s instanceof Te})),(function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"}));var i={};return a.forEach((function(s,u){i[u]=s})),e.runKernelFunc((function(s,u){return k((n=t.apply(void 0,a.concat([u]))).value instanceof Te,(function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"})),k(wo(n.gradFunc),(function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."})),n.value}),i,(function(s,u){var c=n.gradFunc(s,u),l=Array.isArray(c)?c:[c];k(l.length===a.length,(function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."})),k(l.every((function(f){return f instanceof Te})),(function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."}));var h={};return l.forEach((function(f,d){h[d]=function(){return f}})),h}))}},r.prototype.readSync=function(t){return this.state.tensorInfo.get(t).backend.readSync(t)},r.prototype.read=function(t){return this.state.tensorInfo.get(t).backend.read(t)},r.prototype.time=function(t){return J(this,void 0,void 0,(function(){var e,n;return Q(this,(function(a){switch(a.label){case 0:return e=Lt(),[4,this.backend.time(t)];case 1:return(n=a.sent()).wallMs=Lt()-e,[2,n]}}))}))},r.prototype.track=function(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t},Object.defineProperty(r.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!0,configurable:!0}),r.prototype.reset=function(){for(var t in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new is,this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},r.nextTensorId=0,r.nextVariableId=0,r})(),T=(function(){var r=(function(){if(qa==null){var e=void 0;if(typeof window<"u")e=window;else if(typeof global<"u")e=global;else if(typeof process<"u")e=process;else{if(typeof self>"u")throw new Error("Could not find a global object");e=self}qa=e}return qa})();if(r._tfengine==null){var t=new Xl(r);r._tfengine=new ph(t)}return(function(e){ou=e})(r._tfengine.ENV),Wt=function(){return r._tfengine},r._tfengine})();function gu(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var Qt=L();Qt.registerFlag("DEBUG",(function(){return!1}),(function(r){r&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")})),Qt.registerFlag("IS_BROWSER",(function(){return gu()})),Qt.registerFlag("IS_NODE",(function(){return typeof process<"u"&&process.versions!==void 0&&process.versions.node!==void 0})),Qt.registerFlag("IS_CHROME",(function(){return typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})),Qt.registerFlag("PROD",(function(){return!1})),Qt.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",(function(){return Qt.getBool("DEBUG")})),Qt.registerFlag("DEPRECATION_WARNINGS_ENABLED",(function(){return!0})),Qt.registerFlag("IS_TEST",(function(){return!1}));var wr,mt,vt,_n={},Ka={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function vh(r,t){_n[r]=t}function qt(r){r in _n||(_n[r]=(function(e){if(e!==1&&e!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var n=(function(a){if(typeof OffscreenCanvas<"u"&&a===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")})(e);return n.addEventListener("webglcontextlost",(function(a){a.preventDefault(),delete _n[e]}),!1),e===1?n.getContext("webgl",Ka)||n.getContext("experimental-webgl",Ka):n.getContext("webgl2",Ka)})(r));var t=_n[r];return t.isContextLost()?(delete _n[r],qt(r)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),_n[r])}function Ca(r,t){return[t,r]}function mr(r){var t=Z(r);return bo(Math.ceil(t/4))}function Sr(r,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(r/2))]}function Uo(r,t){var e,n,a,o,i,s,u,c,l,h=r;return L().getNumber("WEBGL_VERSION")===2?(e=h.R32F,n=h.R16F,a=h.RGBA16F,o=h.RGBA32F,i=h.RED,s=4,u=1,c=h.HALF_FLOAT,l=h.FLOAT):(e=r.RGBA,n=r.RGBA,a=r.RGBA,o=h.RGBA,i=r.RGBA,s=4,u=4,c=t!=null?t.HALF_FLOAT_OES:null,l=r.FLOAT),{internalFormatFloat:e,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:o,textureFormatFloat:i,downloadTextureFormat:r.RGBA,downloadUnpackNumChannels:s,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:l}}function ee(r,t,e){var n=e();return t&&(function(a){var o=a.getError();if(o!==a.NO_ERROR)throw new Error("WebGL Error: "+yh(a,o))})(r),n}(function(r){r[r.DENSE=0]="DENSE",r[r.SHARED_BATCH=1]="SHARED_BATCH"})(wr||(wr={})),(function(r){r[r.RENDER=0]="RENDER",r[r.UPLOAD=1]="UPLOAD",r[r.PIXELS=2]="PIXELS",r[r.DOWNLOAD=3]="DOWNLOAD"})(mt||(mt={})),(function(r){r[r.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",r[r.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",r[r.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",r[r.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",r[r.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(vt||(vt={}));var mh=596e-10,gh=65504;function xh(r){return!!(L().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||r===0||mh<Math.abs(r)&&Math.abs(r)<gh)}function yh(r,t){switch(t){case r.NO_ERROR:return"NO_ERROR";case r.INVALID_ENUM:return"INVALID_ENUM";case r.INVALID_VALUE:return"INVALID_VALUE";case r.INVALID_OPERATION:return"INVALID_OPERATION";case r.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case r.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case r.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+t}}function Lr(r,t,e){return tn(r,t,(function(){return r.getExtension(e)}),'Extension "'+e+'" not supported on this browser.')}function bh(r,t,e){var n=tn(r,t,(function(){return r.createShader(r.VERTEX_SHADER)}),"Unable to create vertex WebGLShader.");if(ee(r,t,(function(){return r.shaderSource(n,e)})),ee(r,t,(function(){return r.compileShader(n)})),r.getShaderParameter(n,r.COMPILE_STATUS)===!1)throw console.log(r.getShaderInfoLog(n)),new Error("Failed to compile vertex shader.");return n}function wh(r,t,e){var n=tn(r,t,(function(){return r.createShader(r.FRAGMENT_SHADER)}),"Unable to create fragment WebGLShader.");if(ee(r,t,(function(){return r.shaderSource(n,e)})),ee(r,t,(function(){return r.compileShader(n)})),r.getShaderParameter(n,r.COMPILE_STATUS)===!1)throw(function(a,o){var i=Ch.exec(o);if(i==null)return console.log("Couldn't parse line number in error: "+o),void console.log(a);for(var s=+i[1],u=a.split(`
`),c=u.length.toString().length+2,l=u.map((function(v,g){return Hn((g+1).toString(),c)+v})),h=0,f=0;f<l.length;f++)h=Math.max(l[f].length,h);var d=l.slice(0,s-1),p=l.slice(s-1,s),m=l.slice(s);console.log(d.join(`
`)),console.log(o.split(`
`)[0]),console.log("%c "+Hn(p[0],h),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(m.join(`
`))})(e,r.getShaderInfoLog(n)),new Error("Failed to compile fragment shader.");return n}var Xa,Ya,Ch=/ERROR: [0-9]+:([0-9]+):/g;function _h(r,t){return tn(r,t,(function(){return r.createProgram()}),"Unable to create WebGLProgram.")}function Eh(r,t,e){if(ee(r,t,(function(){return r.linkProgram(e)})),r.getProgramParameter(e,r.LINK_STATUS)===!1)throw console.log(r.getProgramInfoLog(e)),new Error("Failed to link vertex and fragment shaders.")}function $a(r,t,e){if(ee(r,t,(function(){return r.validateProgram(e)})),r.getProgramParameter(e,r.VALIDATE_STATUS)===!1)throw console.log(r.getProgramInfoLog(e)),new Error("Shader program validation failed.")}function kh(r,t,e){var n=tn(r,t,(function(){return r.createBuffer()}),"Unable to create WebGLBuffer");return ee(r,t,(function(){return r.bindBuffer(r.ARRAY_BUFFER,n)})),ee(r,t,(function(){return r.bufferData(r.ARRAY_BUFFER,e,r.STATIC_DRAW)})),n}function Ih(r,t,e){var n=tn(r,t,(function(){return r.createBuffer()}),"Unable to create WebGLBuffer");return ee(r,t,(function(){return r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n)})),ee(r,t,(function(){return r.bufferData(r.ELEMENT_ARRAY_BUFFER,e,r.STATIC_DRAW)})),n}function Rh(r,t){return tn(r,t,(function(){return r.createTexture()}),"Unable to create WebGLTexture.")}function Sh(r,t){var e=L().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(r<=0||t<=0){var n="["+r+"x"+t+"]";throw new Error("Requested texture size "+n+" is invalid.")}if(r>e||t>e)throw n="["+r+"x"+t+"]",new Error("Requested texture size "+n+" greater than WebGL maximum on this browser / GPU "+("["+e+"x"+e+"]")+".")}function Nh(r,t){return tn(r,t,(function(){return r.createFramebuffer()}),"Unable to create WebGLFramebuffer.")}function ss(r,t,e,n,a,o,i,s){var u=r.getAttribLocation(e,n);return u!==-1&&(ee(r,t,(function(){return r.bindBuffer(r.ARRAY_BUFFER,a)})),ee(r,t,(function(){return r.vertexAttribPointer(u,o,r.FLOAT,!1,i,s)})),ee(r,t,(function(){return r.enableVertexAttribArray(u)})),!0)}function Dh(r,t,e,n){Ph(r,n),ee(r,t,(function(){return r.activeTexture(r.TEXTURE0+n)})),ee(r,t,(function(){return r.bindTexture(r.TEXTURE_2D,e)}))}function Ah(r,t,e,n){return tn(r,t,(function(){return r.getUniformLocation(e,n)}),'uniform "'+n+'" not present in program.')}function Th(r,t,e){return r.getUniformLocation(t,e)}function Fh(r,t,e,n,a,o){ee(r,t,(function(){return Dh(r,t,n,o)})),ee(r,t,(function(){return r.uniform1i(a,o)}))}function Ja(r,t,e,n){ee(r,t,(function(){return r.bindFramebuffer(r.FRAMEBUFFER,n)})),ee(r,t,(function(){return r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0)}))}function us(r,t,e){ee(r,t,(function(){return r.bindFramebuffer(r.FRAMEBUFFER,e)})),ee(r,t,(function(){return r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0)}))}function Wr(r){var t=r.checkFramebufferStatus(r.FRAMEBUFFER);if(t!==r.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+Mh(r,t))}function Mh(r,t){switch(t){case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case r.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+t}}function tn(r,t,e,n){var a=ee(r,t,(function(){return e()}));if(a==null)throw new Error(n);return a}function Ph(r,t){var e=r.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,n=t+r.TEXTURE0;if(n<r.TEXTURE0||n>e)throw new Error("textureUnit must be in "+("[gl.TEXTURE0, gl.TEXTURE"+e+"]")+".")}function na(r,t){return t===void 0&&(t=2),Z(r.slice(0,r.length-t))}function ra(r){if(r.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[r.length>1?r[r.length-2]:1,r[r.length-1]]}function Qa(r){var t=[1,1,1];return r.length===0||r.length===1&&r[0]===1||(t=[na(r)].concat(ra(r))),t}function Oh(r,t){var e;t===void 0&&(t=!1);var n=L().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t&&(n*=2,(r=r.map((function(c,l){return l>=r.length-2?cu(r[l]):r[l]}))).length===1&&(r=[2,r[0]])),r.length!==2){var a=kn(r);r=a.newShape}var o=Z(r);if(r.length<=1&&o<=n)return[1,o];if(r.length===2&&r[0]<=n&&r[1]<=n)return r;if(r.length===3&&r[0]*r[1]<=n&&r[2]<=n)return[r[0]*r[1],r[2]];if(r.length===3&&r[0]<=n&&r[1]*r[2]<=n)return[r[0],r[1]*r[2]];if(r.length===4&&r[0]*r[1]*r[2]<=n&&r[3]<=n)return[r[0]*r[1]*r[2],r[3]];if(r.length===4&&r[0]<=n&&r[1]*r[2]*r[3]<=n)return[r[0],r[1]*r[2]*r[3]];if(t){var i=na(r),s=2,u=2;return r.length&&(s=(e=ra(r))[0],u=e[1]),bo(o=i*(s/2)*(u/2)).map((function(c){return 2*c}))}return bo(o)}function jr(r){return r%2==0}function zr(r,t){if(He(r=r.slice(-2),t=t.slice(-2))||!r.length||!t.length||r[0]===0||r[1]===0||t[0]===0||t[1]===0)return!0;if(r.length!==t.length){var e=r.slice(-1)[0],n=t.slice(-1)[0];if(e===n||jr(e)&&jr(n)&&(r[0]===1||t[0]===1))return!0}return r[1]===t[1]&&jr(r[0])&&jr(t[0])}function Bh(r){if(Xa==null){var t=qt(r);Xa=t.getParameter(t.MAX_TEXTURE_SIZE)}return Xa}function Lh(r){if(Ya==null){var t=qt(r);Ya=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Ya)}function Wh(r){if(r===0)return 0;var t=qt(r);return Rt(t,"EXT_disjoint_timer_query_webgl2")&&r===2?2:Rt(t,"EXT_disjoint_timer_query")?1:0}function Rt(r,t){return r.getExtension(t)!=null}function cs(r){try{if(qt(r)!=null)return!0}catch{return!1}return!1}function jh(r){if(r===0)return!1;var t=qt(r);if(r===1){if(!Rt(t,"OES_texture_float"))return!1}else if(!Rt(t,"EXT_color_buffer_float"))return!1;return Ro(t)}function zh(r){if(r===0)return!1;var t=qt(r);if(r!==1){if(Rt(t,"EXT_color_buffer_float"))return Ro(t);if(Rt(t,"EXT_color_buffer_half_float")){var e=t.getExtension("EXT_color_buffer_half_float");return(function(n,a){var o=Uo(n,a),i=n.createTexture();n.bindTexture(n.TEXTURE_2D,i),n.texImage2D(n.TEXTURE_2D,0,o.internalFormatHalfFloat,1,1,0,o.textureFormatFloat,o.textureTypeHalfFloat,null);var s=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,s),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,i,0);var u=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(i),n.deleteFramebuffer(s),u})(t,e)}return!1}return!!Rt(t,"OES_texture_float")&&!!Rt(t,"WEBGL_color_buffer_float")&&Ro(t)}function Ro(r){var t=Uo(r),e=r.createTexture();r.bindTexture(r.TEXTURE_2D,e),r.texImage2D(r.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);var n=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,n),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);var a=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e),r.deleteFramebuffer(n),a}function Uh(r){return r===2&&qt(r).fenceSync!=null}var ie=L();function xu(r){L().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(r+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function Y(r,t){return T.tidy(r,t)}function ht(r){mu(r).forEach((function(t){return t.dispose()}))}function Vh(r){return T.keep(r)}function aa(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];L().getBool("IS_TEST")||console.warn.apply(console,r)}function xn(r,t){var e=r;if(Ut(r))return t==="string"?[]:[r.length];if(!Array.isArray(r))return[];for(var n=[];Array.isArray(e)||Ut(e)&&t!=="string";)n.push(e.length),e=e[0];return Array.isArray(r)&&L().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&(function a(o,i,s){if(s=s||[],!Array.isArray(o)&&!Ut(o))return void k(i.length===0,(function(){return"Element arr["+s.join("][")+"] is a primitive, but should be an array/TypedArray of "+i[0]+" elements"}));k(i.length>0,(function(){return"Element arr["+s.join("][")+"] should be a primitive, but is an array of "+o.length+" elements"})),k(o.length===i[0],(function(){return"Element arr["+s.join("][")+"] should have "+i[0]+" elements, but has "+o.length+" elements"}));for(var u=i.slice(1),c=0;c<o.length;++c)a(o[c],u,s.concat(c))})(r,n,[]),n}function ls(r,t,e,n){if(r!=null&&(r!=="numeric"&&r!==t||r==="numeric"&&t==="string"))throw new Error("Argument '"+e+"' passed to '"+n+"' must be "+r+" tensor, but got "+t+" tensor")}function _(r,t,e,n){if(n===void 0&&(n="numeric"),r instanceof Te)return ls(n,r.dtype,t,e),r;var a=Ir(r);if(a!=="string"&&["bool","int32","float32"].indexOf(n)>=0&&(a=n),ls(n,a,t,e),r==null||!Ut(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string"){var o=r==null?"null":r.constructor.name;throw new Error("Argument '"+t+"' passed to '"+e+"' must be a Tensor or TensorLike, but got '"+o+"'")}var i=xn(r,a);Ut(r)||Array.isArray(r)||(r=[r]);var s=a!=="string"?hu(r,a,L().getBool("DEBUG")):Zn(r,[],!0);return T.makeTensor(s,i,a)}function oa(r,t,e,n){if(n===void 0&&(n="numeric"),!Array.isArray(r))throw new Error("Argument "+t+" passed to "+e+" must be a `Tensor[]` or `TensorLike[]`");return r.map((function(a,o){return _(a,t+"["+o+"]",e)}),n)}function yu(r,t){for(var e=0;e<r.length;++e)if(r[r.length-e-1]!==t-1-e)return!1;return!0}function Gh(r,t,e){for(var n=r.length+t.length,a=[],o=0,i=0,s=0;s<n;s++)e.indexOf(s)===-1?a.push(r[o++]):a.push(t[i++]);return a}function $e(r,t){for(var e=[],n=r.length,a=0;a<n;a++)t.indexOf(a)===-1&&e.push(r[a]);return[e,t.map((function(o){return r[o]}))]}function ft(r,t){return Gh(r,t.map((function(e){return 1})),t)}function pt(r,t,e){k(yu(t,e),(function(){return r+" supports only inner-most axes for now. Got axes "+t+" and rank-"+e+" input."}))}function Kt(r,t){if(yu(r,t))return null;for(var e=[],n=0;n<t;++n)r.indexOf(n)===-1&&e.push(n);return r.forEach((function(a){return e.push(a)})),e}function Vo(r){return r.map((function(t,e){return[e,t]})).sort((function(t,e){return t[1]-e[1]})).map((function(t){return t[0]}))}function Xt(r,t){for(var e=[],n=t-r;n<t;++n)e.push(n);return e}function Hh(r,t){var e=r[0].length;r.forEach((function(a,o){k(a.length===e,(function(){return"Error in concat"+e+"D: rank of tensors["+o+"] must be the same as the rank of the rest ("+e+")"}))})),k(t>=0&&t<e,(function(){return"Error in concat"+e+"D: axis must be between 0 and "+(e-1)+"."}));var n=r[0];r.forEach((function(a,o){for(var i=0;i<e;i++)k(i===t||a[i]===n[i],(function(){return"Error in concat"+e+"D: Shape of tensors["+o+"] ("+a+") does not match the shape of the rest ("+n+") along the non-concatenated axis "+o+"."}))}))}function tr(r,t){for(var e=r[0].slice(),n=1;n<r.length;n++)e[t]+=r[n][t];return e}function D(r){var t=Object.keys(r);if(t.length!==1)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+t.length+" keys.");var e=t[0],n=r[e];e.endsWith("_")&&(e=e.substring(0,e.length-1));var a=function(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];T.startScope(e);try{var s=n.apply(void 0,o);return s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),T.endScope(s),s}catch(u){throw T.endScope(null),u}};return Object.defineProperty(a,"name",{value:e,configurable:!0}),a}ie.registerFlag("HAS_WEBGL",(function(){return ie.getNumber("WEBGL_VERSION")>0})),ie.registerFlag("WEBGL_VERSION",(function(){return cs(2)?2:cs(1)?1:0})),ie.registerFlag("WEBGL_BUFFER_SUPPORTED",(function(){return ie.get("WEBGL_VERSION")===2})),ie.registerFlag("WEBGL_CPU_FORWARD",(function(){return!0})),ie.registerFlag("WEBGL_FORCE_F16_TEXTURES",(function(){return!1})),ie.registerFlag("WEBGL_PACK",(function(){return ie.getBool("HAS_WEBGL")})),ie.registerFlag("WEBGL_PACK_NORMALIZATION",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_PACK_CLIP",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_PACK_DEPTHWISECONV",(function(){return!1})),ie.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_PACK_REDUCE",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_LAZILY_UNPACK",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_CONV_IM2COL",(function(){return ie.getBool("WEBGL_PACK")})),ie.registerFlag("WEBGL_MAX_TEXTURE_SIZE",(function(){return Bh(ie.getNumber("WEBGL_VERSION"))})),ie.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",(function(){return Lh(ie.getNumber("WEBGL_VERSION"))})),ie.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",(function(){var r=ie.getNumber("WEBGL_VERSION");return r===0?0:Wh(r)})),ie.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",(function(){return ie.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&(r=navigator.userAgent||navigator.vendor||window.opera,!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4))));var r})),ie.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",(function(){return jh(ie.getNumber("WEBGL_VERSION"))})),ie.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",(function(){return!ie.getBool("WEBGL_FORCE_F16_TEXTURES")&&ie.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")})),ie.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",(function(){return zh(ie.getNumber("WEBGL_VERSION"))})),ie.registerFlag("WEBGL_FENCE_API_ENABLED",(function(){return Uh(ie.getNumber("WEBGL_VERSION"))})),ie.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",(function(){return ie.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0})),vu=xu;var Ke=D({complex_:function(r,t){var e=_(r,"real","complex"),n=_(t,"imag","complex");return ke(e.shape,n.shape,"real and imag shapes, "+e.shape+" and "+n.shape+", must match in call to tf.complex()."),T.runKernelFunc((function(a){return a.complex(e,n)}),{$real:e,$imag:n})}}),It=D({real_:function(r){var t=_(r,"input","real");return T.runKernelFunc((function(e){return e.real(t)}),{$input:t})}}),jt=D({imag_:function(r){var t=_(r,"input","imag");return T.runKernelFunc((function(e){return e.imag(t)}),{$input:t})}});function Ye(r,t,e){return yn(r,t,xn(r,e),e)}function yn(r,t,e,n){if(n==null&&(n=Ir(r)),n==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!Ut(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){du(t);var a=Z(t),o=Z(e);k(a===o,(function(){return"Based on the provided shape, ["+t+"], the tensor should have "+a+" values but has "+o}));for(var i=0;i<e.length;++i){var s=e[i],u=i!==e.length-1||s!==Z(t.slice(i));k(e[i]===t[i]||!u,(function(){return"Error creating a new Tensor. Inferred shape ("+e+") does not match the provided shape ("+t+"). "}))}}return Ut(r)||Array.isArray(r)||(r=[r]),t=t||e,r=n!=="string"?hu(r,n,L().getBool("DEBUG")):Zn(r,[],!0),T.makeTensor(r,t,n)}function K(r,t){if((Ut(r)&&t!=="string"||Array.isArray(r))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&Ut(r)&&!(r instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return yn(r,[],[],t)}function Be(r,t){rr(r);var e=xn(r,t);if(e.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return yn(r,null,e,t)}function dn(r,t,e){if(rr(r),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");var n=xn(r,e);if(n.length!==2&&n.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return yn(r,t,n,e)}function Go(r,t,e){if(rr(r),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");var n=xn(r,e);if(n.length!==3&&n.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return yn(r,t,n,e)}function ut(r,t,e){if(rr(r),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");var n=xn(r,e);if(n.length!==4&&n.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return yn(r,t,n,e)}function qh(r,t,e){if(rr(r),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");var n=xn(r,e);if(n.length!==5&&n.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return yn(r,t,n,e)}function Kh(r,t,e){if(rr(r),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");var n=xn(r,e);if(n.length!==6&&n.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(n.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return yn(r,t=t||n,n,e)}function Xh(r,t,e,n){return t===void 0&&(t=!0),T.makeVariable(r,t,e,n)}function ar(r,t){if(t===void 0&&(t="float32"),t==="complex64"){var e=ar(r,"float32"),n=Ae(r,"float32");return Ke(e,n)}var a=fu(Z(r),t);return T.makeTensor(a,r,t)}function Ae(r,t){if(t===void 0&&(t="float32"),t==="complex64"){var e=Ae(r,"float32"),n=Ae(r,"float32");return Ke(e,n)}var a=Rr(Z(r),t);return T.makeTensor(a,r,t)}function Gt(r,t,e){return T.runKernelFunc((function(n){return n.fill(r,t,e)}),{})}function Yh(r,t,e){if(e<=0)throw new Error("The number of values should be positive.");return T.runKernelFunc((function(n){return n.linspace(r,t,e)}),{})}function ia(r,t,e,n){if(e===void 0&&(e=1),n===void 0&&(n="float32"),e===0)throw new Error("Cannot have a step of zero");if(r===t||r<t&&e<0||t<r&&e>1)return Ae([0],n);var a=Rr(Math.abs(Math.ceil((t-r)/e)),n);t<r&&e===1&&(e=-1),a[0]=r;for(var o=1;o<a.length;o++)a[o]=a[o-1]+e;return Be(a,n)}var bu=D({onesLike_:function(r){var t=_(r,"x","onesLike");if(t.dtype==="complex64"){var e=bu(It(t)),n=Ce(jt(t));return Ke(e,n)}return T.runKernelFunc((function(a){return a.onesLike(t)}),{$x:t},(function(a,o){return{$x:function(){return Ce(a)}}}))}}),Ce=D({zerosLike_:function(r){var t=_(r,"x","zerosLike");return T.runKernelFunc((function(e){return e.zerosLike(t)}),{$x:t},(function(e,n){return{$x:function(){return Ce(e)}}}))}}),We=D({concat_:function(r,t){t===void 0&&(t=0),k(r.length>=1,(function(){return"Pass at least one tensor to concat"}));var e=oa(r,"tensors","concat");e[0].dtype==="complex64"&&e.forEach((function(s){if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype `+s.dtype+". ")})),t=Ve(t,e[0].shape)[0];var n=tr(e.map((function(s){return s.shape})),t);if(Z(n)===0)return Ye([],n);if((e=e.filter((function(s){return s.size>0}))).length===1)return e[0];var a=e.map((function(s){return s.shape}));Hh(a,t);var o=e,i={axis:t};return T.runKernelFunc((function(s){return s.concat(e,t)}),o,(function(s){var u=a.map((function(c){return c[t]}));return Ho(s,u,t).map((function(c){return function(){return c}}))}),"Concat",i)}}),$h=D({concat1d_:function(r){return We(r,0)}}),Jh=D({concat2d_:function(r,t){return We(r,t)}}),Qh=D({concat3d_:function(r,t){return We(r,t)}}),Zh=D({concat4d_:function(r,t){return We(r,t)}}),Ho=D({split_:function(r,t,e){e===void 0&&(e=0);var n,a=_(r,"x","split");return e=Ve(e,a.shape)[0],typeof t=="number"?(k(a.shape[e]%t==0,(function(){return"Number of splits must evenly divide the axis."})),n=new Array(t).fill(a.shape[e]/t)):(k(a.shape[e]===t.reduce((function(o,i){return o+i})),(function(){return"The sum of sizes must match the size of the axis dimension."})),n=t),T.runKernelFunc((function(o){return o.split(a,n,e)}),{$x:a},(function(o){return{$x:function(){return We(o,e)}}}))}});function An(r,t){return r(t={exports:{}},t.exports),t.exports}var ef=An((function(r){(function(t,e,n){function a(s){var u,c=this,l=(u=4022871197,function(h){h=h.toString();for(var f=0;f<h.length;f++){var d=.02519603282416938*(u+=h.charCodeAt(f));d-=u=d>>>0,u=(d*=u)>>>0,u+=4294967296*(d-=u)}return 23283064365386963e-26*(u>>>0)});c.next=function(){var h=2091639*c.s0+23283064365386963e-26*c.c;return c.s0=c.s1,c.s1=c.s2,c.s2=h-(c.c=0|h)},c.c=1,c.s0=l(" "),c.s1=l(" "),c.s2=l(" "),c.s0-=l(s),c.s0<0&&(c.s0+=1),c.s1-=l(s),c.s1<0&&(c.s1+=1),c.s2-=l(s),c.s2<0&&(c.s2+=1),l=null}function o(s,u){return u.c=s.c,u.s0=s.s0,u.s1=s.s1,u.s2=s.s2,u}function i(s,u){var c=new a(s),l=u&&u.state,h=c.next;return h.int32=function(){return 4294967296*c.next()|0},h.double=function(){return h()+11102230246251565e-32*(2097152*h()|0)},h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.alea=i})(0,r)})),tf=An((function(r){(function(t,e,n){function a(s){var u=this,c="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var h=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^h^h>>>8},s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),u.next()}function o(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u}function i(s,u){var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xor128=i})(0,r)})),nf=An((function(r){(function(t,e,n){function a(s){var u=this,c="";u.next=function(){var h=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^h^h<<1)|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),l==c.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function o(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u.v=s.v,u.d=s.d,u}function i(s,u){var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xorwow=i})(0,r)})),rf=An((function(r){(function(t,e,n){function a(s){var u=this;u.next=function(){var c,l,h=u.x,f=u.i;return c=h[f],l=(c^=c>>>7)^c<<24,l^=(c=h[f+1&7])^c>>>10,l^=(c=h[f+3&7])^c>>>3,l^=(c=h[f+4&7])^c<<7,c=h[f+7&7],l^=(c^=c<<13)^c<<9,h[f]=l,u.i=f+1&7,l},(function(c,l){var h,f=[];if(l===(0|l))f[0]=l;else for(l=""+l,h=0;h<l.length;++h)f[7&h]=f[7&h]<<15^l.charCodeAt(h)+f[h+1&7]<<13;for(;f.length<8;)f.push(0);for(h=0;h<8&&f[h]===0;++h);for(h==8?f[7]=-1:f[h],c.x=f,c.i=0,h=256;h>0;--h)c.next()})(u,s)}function o(s,u){return u.x=s.x.slice(),u.i=s.i,u}function i(s,u){s==null&&(s=+new Date);var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(l.x&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xorshift7=i})(0,r)})),af=An((function(r){(function(t,e,n){function a(s){var u=this;u.next=function(){var c,l,h=u.w,f=u.X,d=u.i;return u.w=h=h+1640531527|0,l=f[d+34&127],c=f[d=d+1&127],l^=l<<13,c^=c<<17,l^=l>>>15,c^=c>>>12,l=f[d]=l^c,u.i=d,l+(h^h>>>16)|0},(function(c,l){var h,f,d,p,m,v=[],g=128;for(l===(0|l)?(f=l,l=null):(l+="\0",f=0,g=Math.max(g,l.length)),d=0,p=-32;p<g;++p)l&&(f^=l.charCodeAt((p+32)%l.length)),p===0&&(m=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,p>=0&&(m=m+1640531527|0,d=(h=v[127&p]^=f+m)==0?d+1:0);for(d>=128&&(v[127&(l&&l.length||0)]=-1),d=127,p=512;p>0;--p)f=v[d+34&127],h=v[d=d+1&127],f^=f<<13,h^=h<<17,f^=f>>>15,h^=h>>>12,v[d]=f^h;c.w=m,c.X=v,c.i=d})(u,s)}function o(s,u){return u.i=s.i,u.w=s.w,u.X=s.X.slice(),u}function i(s,u){s==null&&(s=+new Date);var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(l.X&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.xor4096=i})(0,r)})),of=An((function(r){(function(t,e,n){function a(s){var u=this,c="";u.next=function(){var h=u.b,f=u.c,d=u.d,p=u.a;return h=h<<25^h>>>7^f,f=f-d|0,d=d<<24^d>>>8^p,p=p-h|0,u.b=h=h<<20^h>>>12^f,u.c=f=f-d|0,u.d=d<<16^f>>>16^p,u.a=p-h|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,s===Math.floor(s)?(u.a=s/4294967296|0,u.b=0|s):c+=s;for(var l=0;l<c.length+20;l++)u.b^=0|c.charCodeAt(l),u.next()}function o(s,u){return u.a=s.a,u.b=s.b,u.c=s.c,u.d=s.d,u}function i(s,u){var c=new a(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&o(l,c),h.state=function(){return o(c,{})}),h}e&&e.exports?e.exports=i:this.tychei=i})(0,r)})),En=An((function(r){(function(t,e){var n,a=this,o=256,i=6,s="random",u=e.pow(o,i),c=e.pow(2,52),l=2*c,h=o-1;function f(g,y,b){var x=[],w=m((function I(R,S){var F,A=[],W=typeof R;if(S&&W=="object")for(F in R)try{A.push(I(R[F],S-1))}catch{}return A.length?A:W=="string"?R:R+"\0"})((y=y==1?{entropy:!0}:y||{}).entropy?[g,v(t)]:g??(function(){try{var I;return n&&(I=n.randomBytes)?I=I(o):(I=new Uint8Array(o),(a.crypto||a.msCrypto).getRandomValues(I)),v(I)}catch{var R=a.navigator,S=R&&R.plugins;return[+new Date,a,S,a.screen,v(t)]}})(),3),x),C=new d(x),N=function(){for(var I=C.g(i),R=u,S=0;I<c;)I=(I+S)*o,R*=o,S=C.g(1);for(;I>=l;)I/=2,R/=2,S>>>=1;return(I+S)/R};return N.int32=function(){return 0|C.g(4)},N.quick=function(){return C.g(4)/4294967296},N.double=N,m(v(C.S),t),(y.pass||b||function(I,R,S,F){return F&&(F.S&&p(F,C),I.state=function(){return p(C,{})}),S?(e[s]=I,R):I})(N,w,"global"in y?y.global:this==e,y.state)}function d(g){var y,b=g.length,x=this,w=0,C=x.i=x.j=0,N=x.S=[];for(b||(g=[b++]);w<o;)N[w]=w++;for(w=0;w<o;w++)N[w]=N[C=h&C+g[w%b]+(y=N[w])],N[C]=y;(x.g=function(I){for(var R,S=0,F=x.i,A=x.j,W=x.S;I--;)R=W[F=h&F+1],S=S*o+W[h&(W[F]=W[A=h&A+R])+(W[A]=R)];return x.i=F,x.j=A,S})(o)}function p(g,y){return y.i=g.i,y.j=g.j,y.S=g.S.slice(),y}function m(g,y){for(var b,x=g+"",w=0;w<x.length;)y[h&w]=h&(b^=19*y[h&w])+x.charCodeAt(w++);return v(y)}function v(g){return String.fromCharCode.apply(0,g)}if(e["seed"+s]=f,m(e.random(),t),r.exports){r.exports=f;try{n=require("crypto")}catch{}}})([],Math)}));En.alea=ef,En.xor128=tf,En.xorwow=nf,En.xorshift7=rf,En.xor4096=af,En.tychei=of;var _a=En.alea,qo=(function(){function r(t,e,n,a,o){this.mean=t,this.stdDev=e,this.dtype=n,this.nextVal=NaN,this.truncated=a,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var i=o||Math.random();this.random=_a(i.toString())}return r.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var t=this.nextVal;return this.nextVal=NaN,t}for(var e,n,a=!1;!a;){var o=void 0,i=void 0,s=void 0;do s=(o=2*this.random()-1)*o+(i=2*this.random()-1)*i;while(s>=1||s===0);var u=Math.sqrt(-2*Math.log(s)/s);e=this.mean+this.stdDev*o*u,n=this.mean+this.stdDev*i*u,this.truncated&&!this.isValidTruncated(e)||(a=!0)}return this.truncated&&!this.isValidTruncated(n)||(this.nextVal=this.convertValue(n)),this.convertValue(e)},r.prototype.convertValue=function(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)},r.prototype.isValidTruncated=function(t){return t<=this.upper&&t>=this.lower},r})(),sf=(function(){function r(t,e,n,a){this.alpha=t,this.beta=1/e,this.dtype=n;var o=a||Math.random();this.randu=_a(o.toString()),this.randn=new qo(0,1,n,!1,this.randu()),this.d=t<1?t+2/3:t-1/3,this.c=1/Math.sqrt(9*this.d)}return r.prototype.nextValue=function(){for(var t,e,n,a,o,i;;){do a=this.randn.nextValue(),i=1+this.c*a;while(i<=0);if(i*=i*i,e=1-.331*(t=a*a)*t,n=.5*t+this.d*(1-i+Math.log(i)),(o=this.randu())<e||Math.log(o)<n)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)},r.prototype.convertValue=function(t){return this.dtype==="float32"?t:Math.round(t)},r})(),uf=(function(){function r(t,e,n,a){var o=this;if(t===void 0&&(t=0),e===void 0&&(e=1),this.canReturnFloat=function(){return o.dtype==null||o.dtype==="float32"},this.min=t,this.range=e-t,this.dtype=n,a==null&&(a=Math.random()),typeof a=="number"&&(a=a.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error("The difference between "+t+" - "+e+" <= 1 and dtype is not float");this.random=_a(a)}return r.prototype.convertValue=function(t){return this.canReturnFloat()?t:Math.round(t)},r.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},r})();function le(r,t,e){return t===void 0&&(t="float32"),t=t||"float32",du(r),new br(r,t,e)}function cf(r,t){t===void 0&&(t=!1),console.log(r.toString(t))}var wu=D({batchToSpaceND_:function(r,t,e){var n=_(r,"x","batchToSpaceND"),a=t.reduce((function(o,i){return o*i}));return k(n.rank>=1+t.length,(function(){return"input rank is "+n.rank+" but should be > than blockShape.length "+t.length})),k(e.length===t.length,(function(){return"crops.length is "+e.length+" but should be equal to blockShape.length  "+t.length})),k(n.shape[0]%a==0,(function(){return"input tensor batch is "+n.shape[0]+" but is not divisible by the product of the elements of blockShape "+t.join(" * ")+" === "+a})),T.runKernelFunc((function(o){return o.batchToSpaceND(n,t,e)}),{$x:n},(function(o){return{$x:function(){return o.spaceToBatchND(t,e)}}}))}}),lf=D({broadcastTo_:function(r,t){var e=_(r,"broadcastTo","x"),n=e.shape;if(t.some((function(u){return!(u>0)||u%1!=0})))throw new Error("broadcastTo(): Invalid broadcast shape ["+t+"].");if(t.length<e.rank)throw new Error("broadcastTo(): shape.length="+t.length+" < input.rank="+e.rank+".");if(t.length>e.rank){for(var a=e.shape.slice();a.length<t.length;)a.unshift(1);e=e.reshape(a)}for(var o=Array.from(t),i=t.length-1;i>=0;i--)if(e.shape[i]===t[i])o[i]=1;else if(e.shape[i]!==1)throw new Error("broadcastTo(): ["+n+"] cannot be broadcast to ["+t+"].");var s=o.map((function(u,c){return u>1?c:-1})).filter((function(u){return u>=0}));return s.length===0?e.clone():T.runKernelFunc((function(u){return u.tile(e,o)}),{input:e},(function(u){return{input:function(){return u.sum(s,!0)}}}))}}),hf=D({cast_:function(r,t){var e=_(r,"x","cast");if(!nh(t))throw new Error("Failed to cast to unknown dtype "+t);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");var n={dtype:t};return T.runKernelFunc((function(a){return a.cast(e,t)}),{x:e},(function(a){return{x:function(){return a.clone()}}}),"Cast",n)}}),ff=D({clone_:function(r){var t=_(r,"x","clone",null);return T.runKernelFunc((function(){return T.makeTensorFromDataId(t.dataId,t.shape,t.dtype)}),{$x:t},(function(e){return{$x:function(){return e.toFloat()}}}))}}),df=D({cumsum_:function(r,t,e,n){t===void 0&&(t=0),e===void 0&&(e=!1),n===void 0&&(n=!1);var a=_(r,"x","cumsum"),o=Kt([t|=0],a.rank),i=a;o!=null&&(i=a.transpose(o));var s=Xt(1,a.rank)[0],u=T.runKernelFunc((function(c){return c.cumsum(i,s,e,n)}),{permutedX:i},(function(c){return{permutedX:function(){return c.cumsum(t,e,!n)}}}));return o!=null&&(u=u.transpose(o)),u}}),pf=D({depthToSpace_:function(r,t,e){e===void 0&&(e="NHWC");var n=_(r,"x","depthToSpace"),a=e==="NHWC"?n.shape[1]:n.shape[2],o=e==="NHWC"?n.shape[2]:n.shape[3],i=e==="NHWC"?n.shape[3]:n.shape[1];return k(a*t>=0,(function(){return`Negative dimension size caused by overflow when multiplying
      `+a+" and "+t+`  for depthToSpace with input shape
      `+n.shape})),k(o*t>=0,(function(){return`Negative dimension size caused by overflow when multiplying
      `+o+" and "+t+` for depthToSpace with input shape
          `+n.shape})),k(i%(t*t)==0,(function(){return"Dimension size must be evenly divisible by "+t*t+" but is "+i+" for depthToSpace with input shape "+n.shape})),T.runKernelFunc((function(s){return s.depthToSpace(n,t,e)}),{$x:n})}}),kt=D({expandDims_:function(r,t){t===void 0&&(t=0);var e=_(r,"x","expandDims",null);k(t<=e.rank,(function(){return"Axis must be <= rank of the tensor"}));var n=e.shape.slice();return t<0&&(k(-(e.rank+1)<=t,(function(){return"Axis must be in the interval ["+-(e.rank+1)+", "+e.rank+"]"})),t=e.rank+t+1),n.splice(t,0,1),Tt(e,n)}}),Cu=D({eye_:function(r,t,e,n){n===void 0&&(n="float32"),t==null&&(t=r);for(var a=le([r,t],n),o=r<=t?r:t,i=0;i<o;++i)a.set(1,i,i);var s=a.toTensor().as2D(r,t);if(e==null)return s;if(e.length===1)return qn(kt(s,0),[e[0],1,1]);if(e.length===2)return qn(kt(kt(s,0),0),[e[0],e[1],1,1]);if(e.length===3)return qn(kt(kt(kt(s,0),0),0),[e[0],e[1],e[2],1,1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received "+e.length+"D.")}}),vf=D({multinomial_:function(r,t,e,n){n===void 0&&(n=!1);var a=_(r,"logits","multinomial"),o=a.size,i=a.rank;if(o<2)throw new Error("Error in multinomial: you need at least 2 outcomes, but got "+o+".");if(i>2)throw new Error("Rank of probabilities must be 1 or 2, but is "+i);e=e||Math.random();var s=i===1?a.as2D(1,-1):a,u=T.runKernelFunc((function(c){return c.multinomial(s,n,t,e)}),{logits2D:s});return i===1?u.as1D():u}}),So=D({oneHot_:function(r,t,e,n){if(e===void 0&&(e=1),n===void 0&&(n=0),t<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+t);var a=_(r,"indices","oneHot","int32"),o=a.shape.concat([t]);return a=a.flatten(),T.runKernelFunc((function(i){return i.oneHot(a,t,e,n)}),{$indices:a},(function(i){return{$indices:function(){return Ae(a.shape,"float32")}}})).reshape(o)}}),Tn=D({pad_:function(r,t,e){e===void 0&&(e=0);var n=_(r,"x","pad");if(n.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var a={paddings:t,constantValue:e};return T.runKernelFunc((function(o){return o.pad(n,t,e)}),{x:n},(function(o){var i=t.map((function(s){return s[0]}));return{x:function(){return o.slice(i,n.shape)}}}),"PadV2",a)}}),mf=D({pad1d_:function(r,t,e){return e===void 0&&(e=0),k(t.length===2,(function(){return"Invalid number of paddings. Must be length of 2."})),Tn(r,[t],e)}}),gf=D({pad2d_:function(r,t,e){return e===void 0&&(e=0),k(t.length===2&&t[0].length===2&&t[1].length===2,(function(){return"Invalid number of paddings. Must be length of 2 each."})),Tn(r,t,e)}}),xf=D({pad3d_:function(r,t,e){return e===void 0&&(e=0),k(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,(function(){return"Invalid number of paddings. Must be length of 2 each."})),Tn(r,t,e)}}),yf=D({pad4d_:function(r,t,e){return e===void 0&&(e=0),k(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,(function(){return"Invalid number of paddings. Must be length of 2 each."})),Tn(r,t,e)}}),bf=D({rand_:function(r,t,e){var n=Z(r),a=null;if(e==null||e==="float32")a=new Float32Array(n);else if(e==="int32")a=new Int32Array(n);else{if(e!=="bool")throw new Error("Unknown data type "+e);a=new Uint8Array(n)}for(var o=0;o<n;o++)a[o]=t();return T.makeTensor(a,r,e)}}),wf=D({randomNormal_:function(r,t,e,n,a){if(t===void 0&&(t=0),e===void 0&&(e=1),n!=null&&n==="bool")throw new Error("Unsupported data type "+n);for(var o=new qo(t,e,n,!1,a),i=le(r,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),Cf=D({randomGamma_:function(r,t,e,n,a){if(e===void 0&&(e=1),n===void 0&&(n="float32"),e==null&&(e=1),n==null&&(n="float32"),n!=="float32"&&n!=="int32")throw new Error("Unsupported data type "+n);for(var o=new sf(t,e,n,a),i=le(r,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),_u=D({randomUniform_:function(r,t,e,n,a){t===void 0&&(t=0),e===void 0&&(e=1),n===void 0&&(n="float32");for(var o=le(r,n),i=new uf(t,e,null,a),s=0;s<o.values.length;s++)o.values[s]=i.nextValue();return o.toTensor()}}),Tt=D({reshape_:function(r,t){var e=_(r,"x","reshape",null);t=eh(t,e.size),k(e.size===Z(t),(function(){return"new shape and old shape must have the same number of elements."}));var n={shape:t};return T.runKernelFunc((function(a){return a.reshape(e,t)}),{x:e},(function(a){return{x:function(){return a.reshape(e.shape)}}}),"Reshape",n)}}),Eu=D({spaceToBatchND_:function(r,t,e){var n=_(r,"x","spaceToBatchND");return k(n.rank>=1+t.length,(function(){return"input rank "+n.rank+" should be > than [blockShape] "+t.length})),k(e.length===t.length,(function(){return"paddings.shape[0] "+e.length+" must be equal to [blockShape] "+t.length})),k(n.shape.reduce((function(a,o,i){return i>0&&i<=t.length?a&&(o+e[i-1][0]+e[i-1][1])%t[i-1]==0:a}),!0),(function(){return"input spatial dimensions "+n.shape.slice(1)+" with paddings "+e.toString()+" must be divisible by blockShapes "+t.toString()})),T.runKernelFunc((function(a){return a.spaceToBatchND(n,t,e)}),{$x:n},(function(a){return{$x:function(){return a.batchToSpaceND(t,e)}}}))}}),ku=D({squeeze_:function(r,t){var e=_(r,"x","squeeze");return Tt(e,kn(e.shape,t).newShape)}}),yt=D({stack_:function(r,t){t===void 0&&(t=0);var e=oa(r,"tensors","stack");if(k(e.length>=1,(function(){return"Pass at least one tensor to tf.stack"})),e.length===1)return e[0].expandDims(t);var n=e[0].rank,a=e[0].shape,o=e[0].dtype;k(t<=n,(function(){return"Axis must be <= rank of the tensor"})),e.forEach((function(s){ke(a,s.shape,"All tensors passed to stack must have matching shapes")})),e.forEach((function(s){k(o===s.dtype,(function(){return"All tensors passed to stack must have matching dtypes"}))}));var i=e.map((function(s){return s.expandDims(t)}));return We(i,t)}}),qn=D({tile_:function(r,t){var e=_(r,"x","tile",null);k(e.rank===t.length,(function(){return"Error in transpose: rank of input "+e.rank+" must match length of reps "+t+"."}));var n=[e],a={reps:t};return T.runKernelFunc((function(o,i){var s=o.tile(e,t);return i([e]),s}),{x:e},(function(o,i){var s=i[0];return{x:function(){var u=Ce(s);if(s.rank===1)for(var c=0;c<t[0];++c)u=u.add(o.slice([c*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(c=0;c<t[0];++c)for(var l=0;l<t[1];++l)u=u.add(o.slice([c*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(var h=0;h<t[2];++h)u=u.add(o.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else{if(s.rank!==4)throw new Error("Gradient for tile operation is not implemented for rank-"+s.rank+" tensors yet.");for(c=0;c<t[0];++c)for(l=0;l<t[1];++l)for(h=0;h<t[2];++h)for(var f=0;f<t[3];++f)u=u.add(o.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2],f*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]))}return u}}}),"Tile",a,n)}}),_f=D({truncatedNormal_:function(r,t,e,n,a){if(t===void 0&&(t=0),e===void 0&&(e=1),n!=null&&n==="bool")throw new Error("Unsupported data type "+n);for(var o=new qo(t,e,n,!0,a),i=le(r,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),je=D({unstack_:function(r,t){t===void 0&&(t=0),t=t||0;var e=_(r,"x","unstack");k(t>=-e.shape.length&&t<e.shape.length,(function(){return"Axis = "+t+" is not in [-"+e.shape.length+", "+e.shape.length+")"})),t<0&&(t+=e.shape.length);var n={axis:t};return T.runKernelFunc((function(a){return a.unstack(e,t)}),{x:e},(function(a){return{x:function(){return yt(a,t)}}}),"Unpack",n)}}),Ef=function(r,t){return J(this,void 0,void 0,(function(){var e,n,a,o,i,s,u,c,l,h;return Q(this,(function(f){switch(f.label){case 0:return e=_(r,"x","setdiff1d"),n=_(t,"y","setdiff1d"),k(e.dtype===n.dtype,(function(){return"x and y should have the same dtype, but got x ("+e.dtype+") and y ("+n.dtype+")."})),k(e.rank===1,(function(){return"x should be 1D tensor, but got x ("+e.shape+")."})),k(n.rank===1,(function(){return"y should be 1D tensor, but got y ("+n.shape+")."})),[4,e.data()];case 1:return a=f.sent(),[4,n.data()];case 2:for(o=f.sent(),i=new Set(o),s=0,l=0;l<a.length;l++)i.has(a[l])||s++;for(u=new br([s],e.dtype),c=new br([s],"int32"),l=0,h=0;l<a.length;l++)i.has(a[l])||(u.values[h]=a[l],c.values[h]=l,h++);return[2,[u.toTensor(),c.toTensor()]]}}))}))};function sa(r,t,e,n){n===void 0&&(n=!0);var a=[];if(n)(a=a.concat(t.slice(0))).push(r[0]/e),a=a.concat(r.slice(1));else{a=a.concat(r[0]);for(var o=t.length,i=0;i<o;++i)a=a.concat([r[i+1]/t[i],t[i]]);a=a.concat(r.slice(o+1))}return a}function ua(r,t,e){e===void 0&&(e=!0);var n=[];if(e){n.push(t);for(var a=t+1;a<r;++a)a<=2*t?(n.push(a),n.push(a-(t+1))):n.push(a)}else{var o=[],i=[];for(a=1;a<r;++a)a>=2*t+1||a%2==1?i.push(a):o.push(a);n.push.apply(n,o),n.push(0),n.push.apply(n,i)}return n}function ca(r,t,e,n){n===void 0&&(n=!0);var a=[];n?a.push(r[0]/e):a.push(r[0]*e);for(var o=1;o<r.length;++o)o<=t.length?n?a.push(t[o-1]*r[o]):a.push(r[o]/t[o-1]):a.push(r[o]);return a}function Iu(r,t){for(var e=[0],n=0;n<t;++n)e.push(r[n][0]);return e}function Ru(r,t,e){for(var n=r.slice(0,1),a=0;a<e;++a)n.push(r[a+1]-t[a][0]-t[a][1]);return n}function Su(r,t){if(r.rank<1)throw new Error("tf.gatherND() expects the input to be rank 1 or higher, but the rank was "+r.rank+".");if(t.rank<1)throw new Error("tf.gatherND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(t.dtype!=="int32")throw new Error("tf.gatherND() expects the indices to be int32 type, but the dtype was "+t.dtype+".");if(t.shape[t.rank-1]>r.rank)throw new Error("index innermost dimension length must be <= tensor rank; saw: "+t.shape[t.rank-1]+" vs. "+r.rank);if(r.size===0)throw new Error("Requested more than 0 entries, but input is empty. Input shape: "+r.shape+".");for(var e=t.shape,n=e[e.length-1],a=1,o=0;o<e.length-1;++o)a*=e[o];var i=r.shape,s=e.slice();s.pop();var u=1;for(o=n;o<r.rank;++o)u*=i[o],s.push(i[o]);var c=Vt(r.shape).map((function(l){return l/u})).concat([1]).slice(0,n);return[s,a,u,c]}var Nu=30;function Za(r){return r<=Nu?r:Co(r,Math.floor(Math.sqrt(r)))}function kf(r,t,e){var n=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,o="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+e.shape+", indices.shape: "+t.shape+", shape: "+r+", sliceDim: "+n+", and batchDim: "+a+".";if(e.rank<a)throw new Error(o+" update.rank < "+a+". ");if(r.length<n+(e.rank-a))throw new Error(o+" Output shape length < "+(n+(e.rank-a)));if(e.rank!==a+r.length-n)throw new Error(o+" update.rank != "+(a+r.length-n));for(var i=0;i<a;++i)if(e.shape[i]!==t.shape[i])throw new Error(o+" updates.shape["+i+"] ("+e.shape[i]+") != indices.shape["+i+"] ("+t.shape[i]+").");for(i=0;i<e.rank-a;++i)if(e.shape[i+a]!==r[i+n])throw new Error(o+" updates.shape["+(i+a)+"] ("+e.shape[i+a]+") != shape["+(i+a)+"] ("+r[i+a]+")")}function If(r,t,e){if(t.rank<1)throw new Error("tf.scatterND() expects the indices to be rank 1 or higher, but the rank was "+t.rank+".");if(r.rank<1)throw new Error("tf.scatterND() expects the updates to be rank 1 or higher, but the rank was "+r.rank+".");if(t.dtype!=="int32")throw new Error("The dtype of 'indices' should be int32, but got dtype: "+t.dtype);if(e.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+e);if(e.length===0){if(t.size===0)throw new Error("Indices specified for empty output. indices shape: "+t.shape);if(r.size===0)throw new Error("Updates specified for empty output. updates shape: "+r.shape)}kf(e,t,r)}function la(r,t,e){for(var n=t.shape.length,a=n>1?t.shape[n-1]:1,o=e.length,i=1,s=a;s<o;++s)i*=e[s];var u=a<1?1:a;return{sliceRank:a,numUpdates:Z(t.shape)/u,sliceSize:i,strides:Vt(e.slice(0,a)).concat([1]),outputSize:Z(e)}}function Rf(r,t,e){k(r.rank===t.length,(function(){return"Error in slice"+r.rank+"D: Length of begin "+t+" must match the rank of the array ("+r.rank+")."})),k(r.rank===e.length,(function(){return"Error in slice"+r.rank+"D: Length of size "+e+" must match the rank of the array ("+r.rank+")."}));for(var n=function(o){k(t[o]+e[o]<=r.shape[o],(function(){return"Error in slice"+r.rank+"D: begin["+o+"] + size["+o+"] ("+(t[o]+e[o])+") would overflow input.shape["+o+"] ("+r.shape[o]+")"}))},a=0;a<r.rank;++a)n(a)}function hs(r){for(var t=[],e=0;r>0;)1&r&&t.push(e),r/=2,e++;return t}function Ko(r,t,e){for(var n=[],a=0;a<r.length;a++)n[a]=Math.ceil((t[a]-r[a])/e[a]);return n}function Sf(r,t,e,n,a){var o=t[a],i=e[a]||1;(r&1<<a||o==null)&&(o=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var s=n[a];return o<0&&(o+=s),o=yo(0,o,s-1)}function Nf(r,t,e,n,a){var o=t[a],i=e[a]||1;(r&1<<a||o==null)&&(o=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var s=n[a];return o<0&&(o+=s),o=i>0?yo(0,o,s):yo(-1,o,s-1)}function Du(r,t,e){for(var n=e.length,a=0;a<e.length;a++)if(e[a]>1){n=a;break}for(a=n+1;a<e.length;a++)if(t[a]>0||e[a]!==r[a])return!1;return!0}function Au(r,t){for(var e=r.length>0?r[r.length-1]:1,n=0;n<r.length-1;n++)e+=r[n]*t[n];return e}function Df(r,t){k(wo(r),(function(){return"The f passed in variableGrads(f) must be a function"})),k(t==null||Array.isArray(t)&&t.every((function(l){return l instanceof er})),(function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"}));var e=t!=null;if(!e)for(var n in t=[],T.registeredVariables)t.push(T.registeredVariables[n]);var a=e?t.filter((function(l){return!l.trainable})):null,o=t.length;k((t=t.filter((function(l){return l.trainable}))).length>0,(function(){return"variableGrads() expects at least one of the input variables to be trainable, but none of the "+o+" variables is trainable."}));var i=T.gradients(r,t,null,!0),s=i.value,u=i.grads;k(u.some((function(l){return l!=null})),(function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."})),k(s.rank===0,(function(){return"The f passed in variableGrads(f) must return a scalar, but it returned a rank-"+s.rank+" tensor"}));var c={};return t.forEach((function(l,h){u[h]!=null&&(c[l.name]=u[h])})),a!=null&&a.forEach((function(l){return c[l.name]=null})),{value:s,grads:c}}function Ea(r){return T.customGrad(r)}var nn=D({softmax_:function(r,t){t===void 0&&(t=-1);var e=_(r,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank "+e.rank+" and dim was "+t);return T.runKernelFunc((function(n,a){var o=n.softmax(e,t);return a([o]),o}),{logits:e},(function(n,a){var o=a[0],i=n.mul(o);return{logits:function(){return i.sub(i.sum([t],!0).mul(o))}}}),"Softmax",{dim:t},[],[!0])}}),Af=D({logSoftmax_:function(r,t){t===void 0&&(t=-1);var e=_(r,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. Logits was rank "+e.rank+" and axis was "+t);return Ea((function(n,a){var o=n.max(t,!0),i=n.sub(o),s=i.toFloat().sub(i.exp().sum(t,!0).log());return a([s]),{value:s,gradFunc:function(u,c){var l=c[0].exp();return u.sub(u.sum(t,!0).mul(l))}}}))(e)}}),Tu=(function(){function r(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}return r.prototype.get=function(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)},r.prototype.set=function(t,e){this.dataIdsCount++,this.data.set(t,e)},r.prototype.has=function(t){return this.data.has(t)},r.prototype.delete=function(t){return this.dataIdsCount--,this.data.delete(t)},r.prototype.numDataIds=function(){return this.dataIdsCount},r})(),Fu=(function(){function r(){}return r.prototype.time=function(t){return M("time")},r.prototype.read=function(t){return M("read")},r.prototype.readSync=function(t){return M("readSync")},r.prototype.numDataIds=function(){return M("numDataIds")},r.prototype.disposeData=function(t){return M("disposeData")},r.prototype.write=function(t,e,n){return M("write")},r.prototype.move=function(t,e,n,a){return M("move")},r.prototype.memory=function(){return M("memory")},r.prototype.floatPrecision=function(){return M("floatPrecision")},r.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},r.prototype.batchMatMul=function(t,e,n,a){return M("batchMatMul")},r.prototype.fusedBatchMatMul=function(t){return t.a,t.b,t.transposeA,t.transposeB,t.bias,t.activation,t.preluActivationWeights,M("fusedBatchMatMul")},r.prototype.slice=function(t,e,n){return M("slice")},r.prototype.stridedSlice=function(t,e,n,a){return M("stridedSlice")},r.prototype.unstack=function(t,e){return M("unstack")},r.prototype.reverse=function(t,e){return M("reverse")},r.prototype.concat=function(t,e){return M("concat")},r.prototype.neg=function(t){return M("neg")},r.prototype.add=function(t,e){return M("add")},r.prototype.addN=function(t){return M("addN")},r.prototype.subtract=function(t,e){return M("subtract")},r.prototype.multiply=function(t,e){return M("multiply")},r.prototype.realDivide=function(t,e){return M("realDivide")},r.prototype.floorDiv=function(t,e){return M("floorDiv")},r.prototype.sum=function(t,e){return M("sum")},r.prototype.prod=function(t,e){return M("prod")},r.prototype.unsortedSegmentSum=function(t,e,n){return M("unsortedSegmentSum")},r.prototype.argMin=function(t,e){return M("argMin")},r.prototype.argMax=function(t,e){return M("argMax")},r.prototype.equal=function(t,e){return M("equal")},r.prototype.notEqual=function(t,e){return M("notEqual")},r.prototype.less=function(t,e){return M("less")},r.prototype.lessEqual=function(t,e){return M("lessEqual")},r.prototype.greater=function(t,e){return M("greater")},r.prototype.greaterEqual=function(t,e){return M("greaterEqual")},r.prototype.logicalNot=function(t){return M("logicalNot")},r.prototype.logicalAnd=function(t,e){return M("logicalAnd")},r.prototype.logicalOr=function(t,e){return M("logicalOr")},r.prototype.where=function(t){return M("where")},r.prototype.select=function(t,e,n){return M("select")},r.prototype.topk=function(t,e,n){return M("topk")},r.prototype.min=function(t,e){return M("min")},r.prototype.minimum=function(t,e){return M("minimum")},r.prototype.mod=function(t,e){return M("mod")},r.prototype.max=function(t,e){return M("max")},r.prototype.maximum=function(t,e){return M("maximum")},r.prototype.all=function(t,e){return M("all")},r.prototype.any=function(t,e){return M("any")},r.prototype.squaredDifference=function(t,e){return M("squaredDifference")},r.prototype.ceil=function(t){return M("ceil")},r.prototype.floor=function(t){return M("floor")},r.prototype.round=function(t){return M("round")},r.prototype.sign=function(t){return M("sign")},r.prototype.isNaN=function(t){return M("isNaN")},r.prototype.isInf=function(t){return M("isInf")},r.prototype.isFinite=function(t){return M("isFinite")},r.prototype.pow=function(t,e){return M("pow")},r.prototype.exp=function(t){return M("exp")},r.prototype.expm1=function(t){return M("expm1")},r.prototype.softmax=function(t,e){return M("softmax")},r.prototype.log=function(t){return M("log")},r.prototype.log1p=function(t){return M("log1p")},r.prototype.sqrt=function(t){return M("sqrt")},r.prototype.rsqrt=function(t){return M("rsqrt")},r.prototype.square=function(t){return M("square")},r.prototype.reciprocal=function(t){return M("reciprocal")},r.prototype.relu=function(t){return M("relu")},r.prototype.relu6=function(t){return M("relu6")},r.prototype.prelu=function(t,e){return M("prelu")},r.prototype.elu=function(t){return M("elu")},r.prototype.eluDer=function(t,e){return M("eluDer")},r.prototype.selu=function(t){return M("selu")},r.prototype.int=function(t){return M("int")},r.prototype.clip=function(t,e,n){return M("clip")},r.prototype.abs=function(t){return M("abs")},r.prototype.complexAbs=function(t){return M("complexAbs")},r.prototype.sigmoid=function(t){return M("sigmoid")},r.prototype.softplus=function(t){return M("softplus")},r.prototype.sin=function(t){return M("sin")},r.prototype.cos=function(t){return M("cos")},r.prototype.tan=function(t){return M("tan")},r.prototype.asin=function(t){return M("asin")},r.prototype.acos=function(t){return M("acos")},r.prototype.atan=function(t){return M("atan")},r.prototype.atan2=function(t,e){return M("atan2")},r.prototype.sinh=function(t){return M("sinh")},r.prototype.cosh=function(t){return M("cosh")},r.prototype.tanh=function(t){return M("tanh")},r.prototype.asinh=function(t){return M("asinh")},r.prototype.acosh=function(t){return M("acosh")},r.prototype.atanh=function(t){return M("atanh")},r.prototype.erf=function(t){return M("erf")},r.prototype.step=function(t,e){return M("step")},r.prototype.fusedConv2d=function(t){return t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights,M("fusedConv2d")},r.prototype.conv2d=function(t,e,n){return M("conv2d")},r.prototype.conv2dDerInput=function(t,e,n){return M("conv2dDerInput")},r.prototype.conv2dDerFilter=function(t,e,n){return M("conv2dDerFilter")},r.prototype.fusedDepthwiseConv2D=function(t){return t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights,M("fusedDepthwiseConv2D")},r.prototype.depthwiseConv2D=function(t,e,n){return M("depthwiseConv2D")},r.prototype.depthwiseConv2DDerInput=function(t,e,n){return M("depthwiseConv2DDerInput")},r.prototype.depthwiseConv2DDerFilter=function(t,e,n){return M("depthwiseConv2DDerFilter")},r.prototype.conv3d=function(t,e,n){return M("conv3d")},r.prototype.conv3dDerInput=function(t,e,n){return M("conv3dDerInput")},r.prototype.conv3dDerFilter=function(t,e,n){return M("conv3dDerFilter")},r.prototype.maxPool=function(t,e){return M("maxPool")},r.prototype.maxPoolBackprop=function(t,e,n,a){return M("maxPoolBackprop")},r.prototype.avgPool=function(t,e){return M("avgPool")},r.prototype.avgPoolBackprop=function(t,e,n){return M("avgPoolBackprop")},r.prototype.avgPool3d=function(t,e){return M("avgPool3d")},r.prototype.avgPool3dBackprop=function(t,e,n){return M("avgPool3dBackprop")},r.prototype.maxPool3d=function(t,e){return M("maxPool3d")},r.prototype.maxPool3dBackprop=function(t,e,n,a){return M("maxPool3dBackprop")},r.prototype.reshape=function(t,e){return M("reshape")},r.prototype.cast=function(t,e){return M("cast")},r.prototype.tile=function(t,e){return M("tile")},r.prototype.pad=function(t,e,n){return M("pad")},r.prototype.transpose=function(t,e){return M("transpose")},r.prototype.gather=function(t,e,n){return M("gather")},r.prototype.gatherND=function(t,e){return M("gatherND")},r.prototype.scatterND=function(t,e,n){return M("scatterND")},r.prototype.batchToSpaceND=function(t,e,n){return M("batchToSpaceND")},r.prototype.spaceToBatchND=function(t,e,n){return M("spaceToBatchND")},r.prototype.resizeBilinear=function(t,e,n,a){return M("resizeBilinear")},r.prototype.resizeBilinearBackprop=function(t,e,n){return M("resizeBilinearBackprop")},r.prototype.resizeNearestNeighbor=function(t,e,n,a){return M("resizeNearestNeighbor")},r.prototype.resizeNearestNeighborBackprop=function(t,e,n){return M("resizeNearestNeighborBackprop")},r.prototype.batchNormalization=function(t,e,n,a,o,i){return M("batchNormalization")},r.prototype.localResponseNormalization4D=function(t,e,n,a,o){return M("localResponseNormalization4D")},r.prototype.LRNGrad=function(t,e,n,a,o,i,s){return M("LRNGrad")},r.prototype.multinomial=function(t,e,n,a){return M("multinomial")},r.prototype.oneHot=function(t,e,n,a){return M("oneHot")},r.prototype.cumsum=function(t,e,n,a){return M("cumsum")},r.prototype.nonMaxSuppression=function(t,e,n,a,o){return M("nonMaxSuppression")},r.prototype.fft=function(t){return M("fft")},r.prototype.ifft=function(t){return M("ifft")},r.prototype.complex=function(t,e){return M("complex")},r.prototype.real=function(t){return M("real")},r.prototype.imag=function(t){return M("imag")},r.prototype.cropAndResize=function(t,e,n,a,o,i){return M("cropAndResize")},r.prototype.depthToSpace=function(t,e,n){return M("depthToSpace")},r.prototype.split=function(t,e,n){return M("split")},r.prototype.sparseToDense=function(t,e,n,a){return M("sparseToDense")},r.prototype.diag=function(t){return M("diag")},r.prototype.fill=function(t,e,n){return M("fill")},r.prototype.onesLike=function(t){return M("onesLike")},r.prototype.zerosLike=function(t){return M("zerosLike")},r.prototype.linspace=function(t,e,n){return M("linspace")},r.prototype.dispose=function(){return M("dispose")},r})();function M(r){throw new Error("'"+r+"' not yet implemented or not found in the registry. Did you forget to import the kernel?")}function hn(r,t){for(var e=r.length,n=[],a=0;a<e;a++){var o=e-1-a,i=r[o]||1;(t[t.length-1-a]||1)>1&&i===1&&n.unshift(o)}return n}function ze(r,t){for(var e=[],n=0;n<t.length;n++){var a=r[r.length-n-1],o=t.length-n-1,i=t[o];(a==null||a===1&&i>1)&&e.unshift(o)}return e}function be(r,t){for(var e=[],n=Math.max(r.length,t.length),a=0;a<n;a++){var o=r[r.length-a-1];o==null&&(o=1);var i=t[t.length-a-1];if(i==null&&(i=1),o===1)e.unshift(i);else if(i===1)e.unshift(o);else{if(o!==i)throw Error("Operands could not be broadcast together with shapes "+r+" and "+t+".");e.unshift(o)}}return e}function Cr(r,t,e,n,a,o,i){i===void 0&&(i="channelsLast");var s,u=da(t),c=u[0],l=u[1];if(i==="channelsLast")s=[c,l,r[3],r[3]];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);s=[c,l,r[1],r[1]]}return Fn(r,s,e,n,a,o,!1,i)}function ha(r,t,e,n,a,o,i){i===void 0&&(i="NDHWC");var s,u,c=No(t),l=c[0],h=c[1],f=c[2];if(i==="NDHWC")u="channelsLast",s=[l,h,f,r[4],r[4]];else{if(i!=="NCDHW")throw new Error("Unknown dataFormat "+i);u="channelsFirst",s=[l,h,f,r[1],r[1]]}return fa(r,s,e,n,a,!1,u,o)}function Fn(r,t,e,n,a,o,i,s){i===void 0&&(i=!1),s===void 0&&(s="channelsLast");var u=[-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],f=u[3];if(s==="channelsLast")c=r[0],l=r[1],h=r[2],f=r[3];else{if(s!=="channelsFirst")throw new Error("Unknown dataFormat "+s);c=r[0],f=r[1],l=r[2],h=r[3]}var d,p=t[0],m=t[1],v=t[3],g=da(e),y=g[0],b=g[1],x=da(n),w=x[0],C=x[1],N=Kn(p,w),I=Kn(m,C),R=(function(B,O,U,z,j,G,q,X){var $,ae,se;if(typeof B=="number"){$={top:B,bottom:B,left:B,right:B,type:B===0?"VALID":"NUMBER"};var oe=(function(ge,_e,xe,Re,Ie){Re==null&&(Re=Mu(ge,_e,xe));var Se=ge[0],bt=ge[1],wt=gr((Se-_e+2*Re)/xe+1,Ie);k(Oe(wt),(function(){return"The output # of rows ("+wt+") must be an integer. Change the stride and/or zero pad parameters"}));var nt=gr((bt-_e+2*Re)/xe+1,Ie);return k(Oe(nt),(function(){return"The output # of columns ("+nt+") must be an integer. Change the stride and/or zero pad parameters"})),[wt,nt]})([O,U],G,z,B,X);ae=oe[0],se=oe[1]}else if(B==="same"){ae=Math.ceil(O/z),se=Math.ceil(U/j);var pe=Math.max(0,(ae-1)*z+G-O),he=Math.max(0,(se-1)*j+q-U),de=Math.floor(pe/2),we=pe-de,De=Math.floor(he/2);$={top:de,bottom:we,left:De,right:he-De,type:"SAME"}}else{if(B!=="valid")throw Error("Unknown padding parameter: "+B);$={top:0,bottom:0,left:0,right:0,type:"VALID"},ae=Math.ceil((O-G+1)/z),se=Math.ceil((U-q+1)/j)}return{padInfo:$,outHeight:ae,outWidth:se}})(a,l,h,y,b,N,I,o),S=R.padInfo,F=R.outHeight,A=R.outWidth,W=i?v*f:v;return s==="channelsFirst"?d=[c,W,F,A]:s==="channelsLast"&&(d=[c,F,A,W]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:h,inChannels:f,outHeight:F,outWidth:A,outChannels:W,padInfo:S,strideHeight:y,strideWidth:b,filterHeight:p,filterWidth:m,effectiveFilterHeight:N,effectiveFilterWidth:I,dilationHeight:w,dilationWidth:C,inShape:r,outShape:d,filterShape:t}}function fa(r,t,e,n,a,o,i,s){o===void 0&&(o=!1),i===void 0&&(i="channelsLast");var u=[-1,-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],f=u[3],d=u[4];if(i==="channelsLast")c=r[0],l=r[1],h=r[2],f=r[3],d=r[4];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);c=r[0],d=r[1],l=r[2],h=r[3],f=r[4]}var p,m=t[0],v=t[1],g=t[2],y=t[4],b=No(e),x=b[0],w=b[1],C=b[2],N=No(n),I=N[0],R=N[1],S=N[2],F=Kn(m,I),A=Kn(v,R),W=Kn(g,S),B=(function(q,X,$,ae,se,oe,pe,he,de,we,De){var ge,_e,xe,Re;if(typeof q=="number"){ge={top:q,bottom:q,left:q,right:q,front:q,back:q,type:q===0?"VALID":"NUMBER"};var Ie=(function($t,_t,On,un,rt,or){rt==null&&(rt=Mu($t,_t,un));var La=$t[0],ir=$t[1],sr=$t[2],ur=gr((La-_t+2*rt)/un+1,or);k(Oe(ur),(function(){return"The output # of depths ("+ur+") must be an integer. Change the stride and/or zero pad parameters"}));var cr=gr((ir-_t+2*rt)/un+1,or);k(Oe(cr),(function(){return"The output # of rows ("+cr+") must be an integer. Change the stride and/or zero pad parameters"}));var lr=gr((sr-_t+2*rt)/un+1,or);return k(Oe(lr),(function(){return"The output # of columns ("+lr+") must be an integer. Change the stride and/or zero pad parameters"})),[ur,cr,lr,On]})([X,$,ae,1],he,1,se,q,De);_e=Ie[0],xe=Ie[1],Re=Ie[2]}else if(q==="same"){_e=Math.ceil(X/se),xe=Math.ceil($/oe),Re=Math.ceil(ae/pe);var Se=(_e-1)*se+he-X,bt=(xe-1)*oe+de-$,wt=(Re-1)*pe+we-ae,nt=Math.floor(Se/2),Nt=Se-nt,ot=Math.floor(bt/2),Dt=bt-ot,Ct=Math.floor(wt/2);ge={top:ot,bottom:Dt,left:Ct,right:wt-Ct,front:nt,back:Nt,type:"SAME"}}else{if(q!=="valid")throw Error("Unknown padding parameter: "+q);ge={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},_e=Math.ceil((X-he+1)/se),xe=Math.ceil(($-de+1)/oe),Re=Math.ceil((ae-we+1)/pe)}return{padInfo:ge,outDepth:_e,outHeight:xe,outWidth:Re}})(a,l,h,f,x,w,C,F,A,W,s),O=B.padInfo,U=B.outDepth,z=B.outHeight,j=B.outWidth,G=o?y*d:y;return i==="channelsFirst"?p=[c,G,U,z,j]:i==="channelsLast"&&(p=[c,U,z,j,G]),{batchSize:c,dataFormat:i,inDepth:l,inHeight:h,inWidth:f,inChannels:d,outDepth:U,outHeight:z,outWidth:j,outChannels:G,padInfo:O,strideDepth:x,strideHeight:w,strideWidth:C,filterDepth:m,filterHeight:v,filterWidth:g,effectiveFilterDepth:F,effectiveFilterHeight:A,effectiveFilterWidth:W,dilationDepth:I,dilationHeight:R,dilationWidth:S,inShape:r,outShape:p,filterShape:t}}function Mu(r,t,e,n){n===void 0&&(n=1);var a=Kn(t,n);return Math.floor((r[0]*(e-1)-e+a)/2)}function da(r){return typeof r=="number"?[r,r,r]:r.length===2?[r[0],r[1],1]:r}function No(r){return typeof r=="number"?[r,r,r]:r}function Kn(r,t){return t<=1?r:r+(r-1)*(t-1)}function gr(r,t){if(!t)return r;switch(t){case"round":return Math.round(r);case"ceil":return Math.ceil(r);case"floor":return Math.floor(r);default:throw new Error("Unknown roundingMode "+t)}}function nr(r){var t=da(r),e=t[0],n=t[1],a=t[2];return e===1&&n===1&&a===1}function dt(r,t){return nr(r)||nr(t)}function Xo(r){if(r==="NHWC")return"channelsLast";if(r==="NCHW")return"channelsFirst";throw new Error("Unknown dataFormat "+r)}function Pu(r,t,e){if(t==="complex64"){if(r.dtype==="complex64")return r.clone();var n=Ae(r.shape),a=r.toFloat(),o=e.complex(a,n);return n.dispose(),a.dispose(),o}if(!rh(r.dtype,t))return T.makeTensorFromDataId(r.dataId,r.shape,t);if(r.dtype==="complex64"){var i=e.real(r);return o=i.cast(t),i.dispose(),o}if(t==="int32")return e.int(r);if(t==="bool"){var s=K(0,r.dtype);return o=e.notEqual(r,s),s.dispose(),o}throw new Error("Error in Cast: failed to cast "+r.dtype+" to "+t)}function Do(r,t){return T.makeTensorFromDataId(r.dataId,t,r.dtype)}function Ou(r,t,e){var n=(t-r)/(e-1),a=Rr(e,"float32");a[0]=r;for(var o=1;o<a.length;o++)a[o]=a[o-1]+n;return Be(a,"float32")}function Ao(r,t){if(r.length!==t.length)throw new Error("Cannot merge real and imag arrays of different lengths. real:"+r.length+", imag: "+t.length+".");for(var e=new Float32Array(2*r.length),n=0;n<e.length;n+=2)e[n]=r[n/2],e[n+1]=t[n/2];return e}function fs(r,t){return{real:r[2*t],imag:r[2*t+1]}}function Tf(r,t,e,n){r[2*n]=t,r[2*n+1]=e}function Ff(r,t,e){var n=(e?2:-2)*Math.PI*(r/t);return{real:Math.cos(n),imag:Math.sin(n)}}function Mf(r,t,e){var n=(function(o,i,s){return(function(u,c,l){for(var h=0,f=u.length,d=0,p=!1;h<f;){var m=l(c,u[d=h+(f-h>>>1)]);m>0?h=d+1:(f=d,p=!m)}return p?h:-h-1})(o,i,s||Pf)})(r,t,e),a=n<0?-(n+1):n;r.splice(a,0,t)}function Pf(r,t){return r>t?1:r<t?-1:0}function Yo(r,t,e,n,a){return Bu(r,t,e,n,a,0).selectedIndices}function $o(r,t,e,n,a,o){var i=Bu(r,t,e,n,a,o);return i.numValidOutputs.dispose(),{selectedIndices:i.selectedIndices,selectedScores:i.selectedScores}}function Bu(r,t,e,n,a,o,i,s){s===void 0&&(s=!1);for(var u=Array.from(t).map((function(x,w){return{score:x,boxIndex:w,suppressBeginIndex:0}})).filter((function(x){return x.score>a})).sort(ds),c=o>0?-.5/o:0,l=[],h=[];l.length<e&&u.length>0;){var f=u.pop(),d=f.score,p=f.boxIndex,m=f.suppressBeginIndex;if(d<a)break;for(var v=!1,g=l.length-1;g>=m;--g){var y=Of(r,p,l[g]);if(y>=n){v=!0;break}if(f.score=f.score*Bf(n,c,y),f.score<=a)break}f.suppressBeginIndex=l.length,v||(f.score===d?(l.push(p),h.push(f.score)):f.score>a&&Mf(u,f,ds))}var b=l.length;return s&&(l.fill(0,b),h.fill(0,b)),{selectedIndices:Be(l,"int32"),selectedScores:Be(h,"float32"),numValidOutputs:K(b,"int32")}}function Of(r,t,e){var n=r.subarray(4*t,4*t+4),a=r.subarray(4*e,4*e+4),o=Math.min(n[0],n[2]),i=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),u=Math.max(n[1],n[3]),c=Math.min(a[0],a[2]),l=Math.min(a[1],a[3]),h=Math.max(a[0],a[2]),f=Math.max(a[1],a[3]),d=(s-o)*(u-i),p=(h-c)*(f-l);if(d<=0||p<=0)return 0;var m=Math.max(o,c),v=Math.max(i,l),g=Math.min(s,h),y=Math.min(u,f),b=Math.max(g-m,0)*Math.max(y-v,0);return b/(d+p-b)}function Bf(r,t,e){var n=Math.exp(t*e*e);return e<=r?n:0}function ds(r,t){return r.score-t.score||r.score===t.score&&t.boxIndex-r.boxIndex}function Lu(r,t,e){var n=new Array(r.rank).fill(0),a=r.shape.slice();return t.map((function(o){a[e]=o;var i=r.slice(n,a);return n[e]+=o,i}))}function Wu(r,t){for(var e=new Array(r.rank),n=0;n<e.length;n++)e[n]=r.shape[n]*t[n];var a=le(e,r.dtype);for(n=0;n<a.values.length;++n){for(var o=a.indexToLoc(n),i=new Array(r.rank),s=0;s<i.length;s++)i[s]=o[s]%r.shape[s];var u=r.locToIndex(i);a.values[n]=r.values[u]}return a.toTensor()}function ju(r,t,e,n,a){for(var o=t[t.length-1],i=[r.length/o,o],s=i[0],u=i[1],c=yr(e,s*n),l=yr("int32",s*n),h=0;h<s;h++){for(var f=h*u,d=r.subarray(f,f+u),p=[],m=0;m<d.length;m++)p.push({value:d[m],index:m});p.sort((function(x,w){return w.value-x.value}));var v=h*n,g=c.subarray(v,v+n),y=l.subarray(v,v+n);for(m=0;m<n;m++)g[m]=p[m].value,y[m]=p[m].index}var b=t.slice();return b[b.length-1]=n,[Ye(c,b,e),Ye(l,b,"int32")]}function Jo(r,t){for(var e=[],n=0;n<t.length;n++)t[n]&&e.push(n);var a=le(r,"int32"),o=le([e.length,r.length],"int32");for(n=0;n<e.length;n++){var i=a.indexToLoc(e[n]),s=n*r.length;o.values.set(i,s)}return o.toTensor()}var Lf=function(r,t){this.outputShape=[],this.outputShape=r,this.variableNames=t.map((function(a,o){return"T"+o}));var e=[];this.variableNames.forEach((function(a){e.push("float v"+a+" = get"+a+"AtOutCoords();")}));var n=this.variableNames.map((function(a){return"v"+a})).join(" + ");this.userCode=`
      void main() {
        `+e.join(`
        `)+`

        float result = `+n+`;
        setOutput(result);
      }
    `},Wf=function(r,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.variableNames=t.map((function(a,o){return"T"+o}));var e=[];this.variableNames.forEach((function(a){e.push("vec4 v"+a+" = get"+a+"AtOutCoords();")}));var n=this.variableNames.map((function(a){return"v"+a})).join(" + ");this.userCode=`
      void main() {
        `+e.join(`
        `)+`

        vec4 result = `+n+`;
        setOutput(result);
      }
    `},jf=function(r,t,e){this.variableNames=["A"];var n=r.windowSize,a=r.batchSize,o=r.inSize,i=Math.ceil(o/n);e||this.variableNames.push("bestIndicesA"),this.outputShape=[a,i];var s=t==="max"?">":"<",u=e?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+n+`;

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < `+n+`; i++) {
          int inIdx = `+u+`;
          float candidate = getA(batch, inIdx);
          if (candidate `+s+` bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `};function zu(r,t){return["x","y","z","w","u","v"].slice(0,t).map((function(e){return r+"."+e}))}function ct(r,t){return t===1?[r]:zu(r,t)}function Qe(){var r,t,e,n,a,o,i,s,u,c;return L().getNumber("WEBGL_VERSION")===2?(r="#version 300 es",t="in",e="out",n="in",a="texture",o="outputColor",i="out vec4 outputColor;",s=`
      bool isnan_custom(float val) {
        return (val > 0.0 || val < 0.0) ? false : val != 0.0;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `,u="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(r="",t="attribute",e="varying",n="varying",a="texture2D",o="gl_FragColor",i="",s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:r,attribute:t,varyingVs:e,varyingFs:n,texture2D:a,output:o,defineOutput:i,defineSpecialNaN:s,defineSpecialInf:u,defineRound:c}}function In(r,t,e){e===void 0&&(e="index");var n=Vt(t);return n.map((function(a,o){return"int "+r[o]+" = "+e+" / "+a+"; "+(o===n.length-1?"int "+r[o+1]+" = "+e+" - "+r[o]+" * "+a:"index -= "+r[o]+" * "+a)+";"})).join("")}function Qo(r){var t=Vt(r).map((function(e){return e.toString()}));return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * `+t[0]+" + coords.y * "+t[1]+` + coords.z;
  }
`}var Uu=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;function zf(r,t,e,n){var a=[];r.forEach((function(d){var p=Z(d.shapeInfo.logicalShape);d.shapeInfo.isUniform?a.push("uniform float "+d.name+(p>1?"["+p+"]":"")+";"):(a.push("uniform sampler2D "+d.name+";"),a.push("uniform int offset"+d.name+";"))}));var o,i,s=a.join(`
`),u=r.map((function(d){return(function(p,m,v){v===void 0&&(v=!1);var g="";g+=v?Vu(p):zn(p);var y=p.shapeInfo.logicalShape,b=m.logicalShape;return y.length<=b.length&&(g+=v?(function(x,w){var C,N=x.name,I=N.charAt(0).toUpperCase()+N.slice(1),R="get"+I+"AtOutCoords",S=x.shapeInfo.logicalShape.length,F=w.logicalShape.length,A=hn(x.shapeInfo.logicalShape,w.logicalShape),W=Ne(F),B=F-S,O=["x","y","z","w","u","v"];C=S===0?"":F<2&&A.length>=1?"coords = 0;":A.map((function($){return"coords."+O[$+B]+" = 0;"})).join(`
`);var U="";U=F<2&&S>0?"coords":x.shapeInfo.logicalShape.map((function($,ae){return"coords."+O[ae+B]})).join(", ");var z="return outputValue;",j=Z(x.shapeInfo.logicalShape)===1,G=Z(w.logicalShape)===1;if(S!==1||j||G){if(j&&!G)z=F===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(A.length){var q=S-2,X=S-1;A.indexOf(q)>-1&&A.indexOf(X)>-1?z="return vec4(outputValue.x);":A.indexOf(q)>-1?z="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":A.indexOf(X)>-1&&(z="return vec4(outputValue.xx, outputValue.zz);")}}else z=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 `+R+`() {
      `+W+` coords = getOutputCoords();
      `+C+`
      vec4 outputValue = get`+I+"("+U+`);
      `+z+`
    }
  `})(p,m):(function(x,w){var C=x.name,N=C.charAt(0).toUpperCase()+C.slice(1),I="get"+N+"AtOutCoords",R=w.texShape,S=x.shapeInfo.texShape,F=x.shapeInfo.logicalShape.length,A=w.logicalShape.length;if(!x.shapeInfo.isUniform&&F===A&&x.shapeInfo.flatOffset==null&&He(S,R))return`
      float `+I+`() {
        return sampleTexture(`+C+`, resultUV);
      }
    `;var W,B=Ne(A),O=hn(x.shapeInfo.logicalShape,w.logicalShape),U=A-F,z=["x","y","z","w","u","v"];W=F===0?"":A<2&&O.length>=1?"coords = 0;":O.map((function(G){return"coords."+z[G+U]+" = 0;"})).join(`
`);var j="";return j=A<2&&F>0?"coords":x.shapeInfo.logicalShape.map((function(G,q){return"coords."+z[q+U]})).join(", "),`
    float `+I+`() {
      `+B+` coords = getOutputCoords();
      `+W+`
      return get`+N+"("+j+`);
    }
  `})(p,m)),g})(d,t,n)})).join(`
`),c=t.texShape,l=Qe(),h=(function(d){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return `+d.texture2D+`(textureSampler, uv).r;
    }
  `})(l),f=(function(d){return d.version+`
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    `+d.varyingFs+` vec2 resultUV;
    `+d.defineOutput+`
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    `+d.defineSpecialNaN+`
    `+d.defineSpecialInf+`
    `+d.defineRound+`

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    `+Uf+`
    `+Vf+`
    `+Gf+`
  `})(l);return t.isPacked?(o=(function(d,p){switch(d.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return(function(x,w){var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];return C[0]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * `+C[1]+`.0);
      }
    `:C[1]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * `+C[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));
      return 2 * (resTexRC.x * `+C[1]+` + resTexRC.y);
    }
  `})(0,p);case 2:return(function(x,w){var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];if(He(x,w))return`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(`+C[0]+", "+C[1]+`));
      }
    `;var N=Math.ceil(x[1]/2);return`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));

      int index = resTexRC.x * `+C[1]+` + resTexRC.y;
      int r = 2 * (index / `+N+`);
      int c = imod(index, `+N+`) * 2;

      return ivec2(r, c);
    }
  `})(d,p);case 3:return m=d,v=p,g=[Math.ceil(v[0]/2),Math.ceil(v[1]/2)],y=Math.ceil(m[2]/2),b=y*Math.ceil(m[1]/2),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+g[0]+", "+g[1]+`));
      int index = resTexRC.x * `+g[1]+` + resTexRC.y;

      int b = index / `+b+`;
      index -= b * `+b+`;

      int r = 2 * (index / `+y+`);
      int c = imod(index, `+y+`) * 2;

      return ivec3(b, r, c);
    }
  `;default:return(function(x,w){for(var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)],N=Math.ceil(x[x.length-1]/2),I=N*Math.ceil(x[x.length-2]/2),R=I,S="",F="b, r, c",A=2;A<x.length-1;A++)R*=x[x.length-A-1],S=`
      int b`+A+" = index / "+R+`;
      index -= b`+A+" * "+R+`;
    `+S,F="b"+A+", "+F;return`
    ivec`+x.length+` getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));
      int index = resTexRC.x * `+C[1]+` + resTexRC.y;

      `+S+`

      int b = index / `+I+`;
      index -= b * `+I+`;

      int r = 2 * (index / `+N+`);
      int c = imod(index, `+N+`) * 2;

      return ivec`+x.length+"("+F+`);
    }
  `})(d,p)}var m,v,g,y,b})(t.logicalShape,c),i=(function(d){return`
    void setOutput(vec4 val) {
      `+d.output+` = val;
    }
  `})(l)):(o=(function(d,p){switch(d.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return(function(g,y){return y[0]===1?`
      int getOutputCoords() {
        return int(resultUV.x * `+y[1]+`.0);
      }
    `:y[1]===1?`
      int getOutputCoords() {
        return int(resultUV.y * `+y[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+y[0]+", "+y[1]+`));
      return resTexRC.x * `+y[1]+` + resTexRC.y;
    }
  `})(0,p);case 2:return(function(g,y){return He(g,y)?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(`+y[0]+", "+y[1]+`));
      }
    `:g[1]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+y[0]+", "+y[1]+`));
        int index = resTexRC.x * `+y[1]+` + resTexRC.y;
        return ivec2(index, 0);
      }
    `:g[0]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+y[0]+", "+y[1]+`));
        int index = resTexRC.x * `+y[1]+` + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+y[0]+", "+y[1]+`));
      int index = resTexRC.x * `+y[1]+` + resTexRC.y;
      int r = index / `+g[1]+`;
      int c = index - r * `+g[1]+`;
      return ivec2(r, c);
    }
  `})(d,p);case 3:return m=p,v=In(["r","c","d"],d),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+m[0]+", "+m[1]+`));
      int index = resTexRC.x * `+m[1]+` + resTexRC.y;
      `+v+`
      return ivec3(r, c, d);
    }
  `;case 4:return(function(g,y){var b=In(["r","c","d","d2"],g);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+y[0]+", "+y[1]+`));
      int index = resTexRC.x * `+y[1]+` + resTexRC.y;
      `+b+`
      return ivec4(r, c, d, d2);
    }
  `})(d,p);case 5:return(function(g,y){var b=In(["r","c","d","d2","d3"],g);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(`+y[0]+`,
                             `+y[1]+`));

      int index = resTexRC.x * `+y[1]+` + resTexRC.y;

      `+b+`

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `})(d,p);case 6:return(function(g,y){var b=In(["r","c","d","d2","d3","d4"],g);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+y[0]+", "+y[1]+`));
      int index = resTexRC.x * `+y[1]+` + resTexRC.y;

      `+b+`

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `})(d,p);default:throw new Error(d.length+"-D output sampling is not yet supported")}var m,v})(t.logicalShape,c),i=(function(d){return`
    void setOutput(float val) {
      `+d.output+` = vec4(val, 0, 0, 0);
    }
  `})(l)),n&&(f+=Hf),[f,h,i,s,o,u,e].join(`
`)}function zn(r){var t=r.shapeInfo.logicalShape;switch(t.length){case 0:return(function(e){var n=e.name,a="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return"float "+a+"() {return "+n+";}";var o=e.shapeInfo.texShape,i=o[0],s=o[1];if(i===1&&s===1)return`
      float `+a+`() {
        return sampleTexture(`+n+`, halfCR);
      }
    `;var u=e.shapeInfo.texShape,c=u[0],l=u[1],h=Cn(n);return`
    float `+a+`() {
      vec2 uv = uvFromFlat(`+c+", "+l+", "+h+`);
      return sampleTexture(`+n+`, uv);
    }
  `})(r);case 1:return(function(e){var n=e.name,a="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`
      float `+a+`(int index) {
        `+Bn(e)+`
      }
    `;var o=e.shapeInfo.texShape,i=o[0],s=o[1];if(s===1&&i===1)return`
      float `+a+`(int index) {
        return sampleTexture(`+n+`, halfCR);
      }
    `;var u=Cn(n);return s===1?`
      float `+a+`(int index) {
        vec2 uv = vec2(0.5, (float(index + `+u+") + 0.5) / "+i+`.0);
        return sampleTexture(`+n+`, uv);
      }
    `:i===1?`
      float `+a+`(int index) {
        vec2 uv = vec2((float(index + `+u+") + 0.5) / "+s+`.0, 0.5);
        return sampleTexture(`+n+`, uv);
      }
    `:`
    float `+a+`(int index) {
      vec2 uv = uvFromFlat(`+i+", "+s+", index + "+u+`);
      return sampleTexture(`+n+`, uv);
    }
  `})(r);case 2:return(function(e){var n=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=e.shapeInfo.texShape;if(i!=null&&He(n,i)){var s=i[0],u=i[1];return`
    float `+o+`(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(`+u+".0, "+s+`.0);
      return sampleTexture(`+a+`, uv);
    }
  `}var c=kn(n),l=c.newShape,h=c.keptDims,f=l;if(f.length<n.length){var d=Un(e,f);return`
      `+zn(d)+`
      float `+o+`(int row, int col) {
        return `+o+"("+Vn(["row","col"],h)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(`+n[1]+`, 1)));
        `+Bn(e)+`
      }
    `;var p=i[0],m=i[1],v=Cn(a);return m===1?`
    float `+o+`(int row, int col) {
      float index = dot(vec3(row, col, `+v+"), vec3("+n[1]+`, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / `+p+`.0);
      return sampleTexture(`+a+`, uv);
    }
  `:p===1?`
    float `+o+`(int row, int col) {
      float index = dot(vec3(row, col, `+v+"), vec3("+n[1]+`, 1, 1));
      vec2 uv = vec2((index + 0.5) / `+m+`.0, 0.5);
      return sampleTexture(`+a+`, uv);
    }
  `:`
  float `+o+`(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * `+n[1]+" + col + "+v+`;
    vec2 uv = uvFromFlat(`+p+", "+m+`, index);
    return sampleTexture(`+a+`, uv);
  }
`})(r);case 3:return(function(e){var n=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=n[1]*n[2],s=n[2],u=kn(n),c=u.newShape,l=u.keptDims,h=c;if(h.length<n.length){var f=Un(e,h);return`
        `+zn(f)+`
        float `+o+`(int row, int col, int depth) {
          return `+o+"("+Vn(["row","col","depth"],l)+`);
        }
      `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(`+i+", "+s+`, 1)));
        `+Bn(e)+`
      }
    `;var d=e.shapeInfo.texShape,p=d[0],m=d[1],v=e.shapeInfo.flatOffset;if(m===i&&v==null)return`
        float `+o+`(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(`+s+`, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(`+m+".0, "+p+`.0);
          return sampleTexture(`+a+`, uv);
        }
      `;if(m===s&&v==null)return`
    float `+o+`(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(`+n[1]+`, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+m+".0, "+p+`.0);
      return sampleTexture(`+a+`, uv);
    }
  `;var g=Cn(a);return`
      float `+o+`(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * `+i+" + col * "+s+" + depth + "+g+`;
        vec2 uv = uvFromFlat(`+p+", "+m+`, index);
        return sampleTexture(`+a+`, uv);
      }
  `})(r);case 4:return(function(e){var n=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=n[3],s=n[2]*i,u=n[1]*s,c=kn(n),l=c.newShape,h=c.keptDims;if(l.length<n.length){var f=Un(e,l);return`
      `+zn(f)+`
      float `+o+`(int row, int col, int depth, int depth2) {
        return `+o+"("+Vn(["row","col","depth","depth2"],h)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(`+u+", "+s+", "+i+`, 1)));
        `+Bn(e)+`
      }
    `;var d=e.shapeInfo.flatOffset,p=e.shapeInfo.texShape,m=p[0],v=p[1];if(v===u&&d==null)return`
      float `+o+`(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(`+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+v+".0, "+m+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;if(v===i&&d==null)return`
      float `+o+`(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(`+n[1]*n[2]+", "+n[2]+`, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+v+".0, "+m+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;var g=Cn(a);return`
    float `+o+`(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+u+" + col * "+s+` +
          depth * `+i+` + depth2;
      vec2 uv = uvFromFlat(`+m+", "+v+", index + "+g+`);
      return sampleTexture(`+a+`, uv);
    }
  `})(r);case 5:return(function(e){var n=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=n[4],s=n[3]*i,u=n[2]*s,c=n[1]*u,l=kn(n),h=l.newShape,f=l.keptDims;if(h.length<n.length){var d=Un(e,h);return`
      `+zn(d)+`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        return `+o+"("+Vn(["row","col","depth","depth2","depth3"],f)+`);
      }
    `}if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(`+c+", "+u+", "+s+", "+i+`)) +
          depth3;
        `+Bn(e)+`
      }
    `;var p=e.shapeInfo.flatOffset,m=e.shapeInfo.texShape,v=m[0],g=m[1];if(g===c&&p==null)return`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(`+u+", "+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+g+".0, "+v+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;if(g===i&&p==null)return`
      float `+o+`(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(`+n[1]*n[2]*n[3]+`,
               `+n[2]*n[3]+", "+n[3]+`, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+g+".0, "+v+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;var y=Cn(a);return`
    float `+o+`(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+c+" + col * "+u+" + depth * "+s+` +
          depth2 * `+i+" + depth3 + "+y+`;
      vec2 uv = uvFromFlat(`+v+", "+g+`, index);
      return sampleTexture(`+a+`, uv);
    }
  `})(r);case 6:return(function(e){var n=e.shapeInfo.logicalShape,a=e.name,o="get"+a.charAt(0).toUpperCase()+a.slice(1),i=kn(n),s=i.newShape,u=i.keptDims;if(s.length<n.length){var c=Un(e,s);return`
      `+zn(c)+`
      float `+o+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return `+o+"("+Vn(["row","col","depth","depth2","depth3","depth4"],u)+`);
      }
    `}var l=n[5],h=n[4]*l,f=n[3]*h,d=n[2]*f,p=n[1]*d;if(e.shapeInfo.isUniform)return`
      float `+o+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(`+p+", "+d+", "+f+", "+h+`)) +
          dot(
            vec2(depth3, depth4),
            vec2(`+l+`, 1)));
        `+Bn(e)+`
      }
    `;var m=e.shapeInfo.flatOffset,v=e.shapeInfo.texShape,g=v[0],y=v[1];if(y===p&&m==null)return`
      float `+o+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(`+d+", "+f+", "+h+", "+l+`)) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+y+".0, "+g+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;if(y===l&&m==null)return`
      float `+o+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(`+n[1]*n[2]*n[3]*n[4]+`,
               `+n[2]*n[3]*n[4]+`,
               `+n[3]*n[4]+`,
               `+n[4]+`)) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+y+".0, "+g+`.0);
        return sampleTexture(`+a+`, uv);
      }
    `;var b=Cn(a);return`
    float `+o+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+p+" + col * "+d+" + depth * "+f+` +
          depth2 * `+h+" + depth3 * "+l+" + depth4 + "+b+`;
      vec2 uv = uvFromFlat(`+g+", "+y+`, index);
      return sampleTexture(`+a+`, uv);
    }
  `})(r);default:throw new Error(t.length+"-D input sampling is not yet supported")}}function Vu(r){var t,e,n;switch(r.shapeInfo.logicalShape.length){case 0:return t=r.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),n=Qe(),`
    vec4 `+e+`() {
      return `+n.texture2D+"("+t+`, halfCR);
    }
  `;case 1:return(function(a){var o=a.name,i="get"+o.charAt(0).toUpperCase()+o.slice(1),s=a.shapeInfo.texShape,u=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],c=Qe();return`
    vec4 `+i+`(int index) {
      vec2 uv = packedUVfrom1D(
        `+u[0]+", "+u[1]+`, index);
      return `+c.texture2D+"("+o+`, uv);
    }
  `})(r);case 2:return(function(a){var o=a.shapeInfo.logicalShape,i=a.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=a.shapeInfo.texShape,c=u[0],l=u[1],h=Qe();if(u!=null&&He(o,u))return`
      vec4 `+s+`(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(`+l+".0, "+c+`.0);

        return `+h.texture2D+"("+i+`, uv);
      }
    `;var f=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)],d=Math.ceil(o[1]/2);return`
    vec4 `+s+`(int row, int col) {
      vec2 uv = packedUVfrom2D(`+d+", "+f[0]+", "+f[1]+`, row, col);
      return `+h.texture2D+"("+i+`, uv);
    }
  `})(r);case 3:return(function(a){var o=a.shapeInfo.logicalShape,i=a.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=a.shapeInfo.texShape,c=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];if(o[0]===1){var l=o.slice(1),h=Un(a,l);return`
        `+Vu(h)+`
        vec4 `+s+`(int b, int row, int col) {
          return `+s+"("+Vn(["b","row","col"],[1,2])+`);
        }
      `}var f=c[0],d=c[1],p=Math.ceil(o[2]/2),m=p*Math.ceil(o[1]/2),v=Qe();return`
    vec4 `+s+`(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        `+f+", "+d+", "+m+", "+p+`, b, row, col);
      return `+v.texture2D+"("+i+`, uv);
    }
  `})(r);default:return(function(a){for(var o=a.shapeInfo.logicalShape,i=o.length,s=a.name,u="get"+s.charAt(0).toUpperCase()+s.slice(1),c=a.shapeInfo.texShape,l=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)],h=l[0],f=l[1],d=Math.ceil(o[i-1]/2),p=d*Math.ceil(o[i-2]/2),m="int b, int row, int col",v="b * "+p+" + (row / 2) * "+d+" + (col / 2)",g=2;g<i-1;g++)m="int b"+g+", "+m,p*=o[i-g-1],v="b"+g+" * "+p+" + "+v;var y=Qe();return`
    vec4 `+u+"("+m+`) {
      int index = `+v+`;
      int texR = index / `+f+`;
      int texC = index - texR * `+f+`;
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+f+", "+h+`);
      return `+y.texture2D+"("+s+`, uv);
    }
  `})(r)}}var Uf=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Vf=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Gf=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Hf=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function Cn(r){return"offset"+r}function Bn(r){var t=r.name,e=Z(r.shapeInfo.logicalShape);return e<2?"return "+t+";":`
    for (int i = 0; i < `+e+`; i++) {
      if (i == index) {
        return `+t+`[i];
      }
    }
  `}function Ne(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error("GPU for rank "+r+" is not yet supported")}function Un(r,t){var e=JSON.parse(JSON.stringify(r));return e.shapeInfo.logicalShape=t,e}function Vn(r,t){return t.map((function(e){return r[e]})).join(", ")}var qf=function(r,t,e,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,k(r.length>2,(function(){return"Packed arg"+(e.charAt(0).toUpperCase()+e.slice(1))+" supports only inputs with rank above 2."}));var a=r[r.length-1],o=Math.ceil(a/t);this.outputShape=r.slice(0,-1),o>1&&this.outputShape.push(o),n||this.variableNames.push("bestIndicesA");var i,s,u=this.outputShape,c=u.length,l=Ne(c),h=ct("coords",c);if(o===1){var f=Ne(s=c+1);i=`
        `+f+" sourceLocR = "+f+"("+h.join()+`, 0);
        ++`+h[c-1]+`;
        `+f+" sourceLocG = "+f+"("+h.join()+`, 0);
        ++`+h[c-2]+`;
        `+f+" sourceLocA = "+f+"("+h.join()+`, 0);
        --`+h[c-1]+`;
        `+f+" sourceLocB = "+f+"("+h.join()+`, 0);
        --`+h[c-2]+";"}else s=c,i=`
        `+l+` sourceLocR = coords;
        ++`+h[c-1]+`;
        `+l+` sourceLocG = coords;
        ++`+h[c-2]+`;
        `+l+` sourceLocA = coords;
        --`+h[c-1]+`;
        `+l+` sourceLocB = coords;
        --`+h[c-2]+";";var d=["x","y","z","w","u","v"].slice(0,s),p="."+d[s-1],m=d.map((function(I){return"int "+I})),v=ct("sourceLocR",s-1).concat("inIdx.r"),g=ct("sourceLocG",s-1).concat("inIdx.g"),y=ct("sourceLocB",s-1).concat("inIdx.b"),b=ct("sourceLocA",s-1).concat("inIdx.a"),x=e==="max"?"greaterThan":"lessThan",w=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(`+v.join()+`),
                             getBestIndicesAChannel(`+g.join()+`),
                             getBestIndicesAChannel(`+y.join()+`),
                             getBestIndicesAChannel(`+b.join()+")));",C=`vec4(
            getAChannel(`+v.join()+`),
            hasNextCol ? getAChannel(`+g.join()+`) : 0.,
            hasNextRow ? getAChannel(`+y.join()+`) : 0.,
            hasNextRow && hasNextCol ? getAChannel(`+b.join()+") : 0.)",N=n?"":`
      float getBestIndicesAChannel(`+m.join()+`) {
        return getChannel(getBestIndicesA(`+d.join()+`),
                                          vec2(`+d.slice(-2).join()+`));
      }`;this.userCode=`
      float getAChannel(`+m.join()+`) {
        return getChannel(getA(`+d.join()+`),
                               vec2(`+d.slice(-2).join()+`));
      }
      `+N+`
      void main() {
        `+l+` coords = getOutputCoords();
        bool hasNextCol = `+h[c-1]+" < "+(u[c-1]-1)+`;
        bool hasNextRow = `+h[c-2]+" < "+(u[c-2]-1)+`;
        `+i+`
        ivec4 srcIdx = ivec4(sourceLocR`+p+", sourceLocG"+p+`,
          sourceLocB`+p+", sourceLocA"+p+") * "+t+`;
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = `+C+`;

        for (int i = 0; i < `+t+`; i++) {
          inIdx = srcIdx;
          `+w+`
          vec4 candidate = `+C+`;
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(`+x+`(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `},Kf=function(r){this.variableNames=["dy"],this.outputShape=r.inShape;var t=r.filterHeight,e=r.filterWidth,n=r.strideHeight,a=r.strideWidth,o=r.dilationHeight,i=r.dilationWidth,s=r.effectiveFilterHeight,u=r.effectiveFilterWidth,c=s-1-r.padInfo.top,l=u-1-r.padInfo.left,h=1/(t*e);this.userCode=`
      const ivec2 pads = ivec2(`+c+", "+l+`);
      const float avgMultiplier = float(`+h+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+s+`;
            wR += `+o+`) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+u+`;
            wC+= `+i+`) {
            float dyC = float(dyCCorner + wC) / `+a+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `},Xf=function(r){this.variableNames=["dy"],this.outputShape=r.inShape;var t=r.filterDepth,e=r.filterHeight,n=r.filterWidth,a=r.strideDepth,o=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.effectiveFilterDepth,h=r.effectiveFilterHeight,f=r.effectiveFilterWidth,d=l-1-r.padInfo.front,p=h-1-r.padInfo.top,m=f-1-r.padInfo.left,v=1/(t*e*n);this.userCode=`
      const ivec3 pads = ivec3(`+d+", "+p+", "+m+`);
      const float avgMultiplier = float(`+v+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          float dyD = float(dyDCorner + wD) / `+a+`.0;

          if (dyD < 0.0 || dyD >= `+r.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+h+`;
              wR += `+u+`) {
            float dyR = float(dyRCorner + wR) / `+o+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+f+`;
                wC += `+c+`) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `},Yf=function(r,t,e,n,a,o){this.outputShape=[],this.variableNames=["x","mean","variance"],be(r,t),be(r,e);var i="0.0";n!=null&&(be(r,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="1.0";a!=null&&(be(r,a),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=r,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = `+i+`;
        float scale = `+s+`;
        float inv = scale * inversesqrt(variance + float(`+o+`));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `},$f=function(r,t,e,n,a,o){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],be(r,t),be(r,e);var i="vec4(0.0)";n!=null&&(be(r,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="vec4(1.0)";a!=null&&(be(r,a),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=r,this.userCode=`
      void main() {
        vec4 offset = `+i+`;
        vec4 scale = `+s+`;

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(`+o+`));

        setOutput((x - mean) * inv + offset);
      }
    `},Jf="return areal * breal - aimag * bimag;",Qf="return areal * bimag + aimag * breal;",ps=function(r,t,e){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=be(t,e),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        `+r+`
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `},eo="return a + b;",to="return a - b;",vs="return a * b;",Gu="return (a < 0.) ? b * a : a;",Pe=function(r,t,e){this.variableNames=["A","B"],this.outputShape=be(t,e),this.userCode=`
      float binaryOperation(float a, float b) {
        `+r+`
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `},Hu=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,Zt=function(r,t,e,n){n===void 0&&(n=!1),this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=be(t,e);var a=this.outputShape.length,o="";if(n)if(a===0||Z(this.outputShape)===1)o=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(o=`
          `+Ne(a)+` coords = getOutputCoords();
        `,a===1)o+=`
            result.y = (coords + 1) >= `+this.outputShape[0]+` ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{var i=ct("coords",a);o+=`
            bool nextRowOutOfBounds =
              (`+i[a-2]+" + 1) >= "+this.outputShape[a-2]+`;
            bool nextColOutOfBounds =
              (`+i[a-1]+" + 1) >= "+this.outputShape[a-1]+`;
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        `+r+`
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        `+o+`

        setOutput(result);
      }
    `},Zf=(function(){function r(t){this.variableNames=["A"],this.outputShape=t,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}return r.prototype.getCustomSetupFunc=function(t,e){var n=this;return function(a,o){n.minLoc==null&&(n.minLoc=a.getUniformLocationNoThrow(o,"minVal"),n.maxLoc=a.getUniformLocationNoThrow(o,"maxVal")),a.gl.uniform1f(n.minLoc,t),a.gl.uniform1f(n.maxLoc,e)}},r})(),ed=(function(){function r(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}return r.prototype.getCustomSetupFunc=function(t,e){var n=this;return function(a,o){n.minLoc==null&&(n.minLoc=a.getUniformLocationNoThrow(o,"minVal"),n.maxLoc=a.getUniformLocationNoThrow(o,"maxVal")),a.gl.uniform1f(n.minLoc,t),a.gl.uniform1f(n.maxLoc,e)}},r})(),td=function(r){this.variableNames=["real","imag"],this.outputShape=r,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `},nd=function(r){this.outputShape=[],this.outputShape=tr(r,1),this.variableNames=r.map((function(s,u){return"T"+u}));var t=new Array(r.length-1);t[0]=r[0][1];for(var e=1;e<t.length;e++)t[e]=t[e-1]+r[e][1];var n=["if (yC < "+t[0]+") setOutput(getT0(yR, yC));"];for(e=1;e<t.length;e++){var a=t[e-1];n.push("else if (yC < "+t[e]+") setOutput(getT"+e+"(yR, yC-"+a+"));")}var o=t.length,i=t[t.length-1];n.push("else setOutput(getT"+o+"(yR, yC-"+i+"));"),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        `+n.join(`
        `)+`
      }
    `},rd=function(r,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=tr(r,t);var e=this.outputShape,n=e.length,a=Ne(n),o=ct("coords",n),i=["x","y","z","w","u","v"].slice(0,n);this.variableNames=r.map((function(v,g){return"T"+g}));var s=new Array(r.length-1);s[0]=r[0][t];for(var u=1;u<s.length;u++)s[u]=s[u-1]+r[u][t];var c=i[t],l=i.slice(-2),h=i.join(),f="if ("+c+" < "+s[0]+`) {
        return getChannel(
            getT0(`+h+"), vec2("+l.join()+`));
        }`;for(u=1;u<s.length;u++){var d=s[u-1];f+=`
        if (`+c+" < "+s[u]+"  && "+c+" >= "+s[u-1]+`) {
          return getChannel(
            getT`+u+"("+Ur(i,c,d)+`),
            vec2(`+Ur(l,c,d)+`));
        }`}var p=s.length,m=s[s.length-1];f+=`
        return getChannel(
          getT`+p+"("+Ur(i,c,m)+`),
          vec2(`+Ur(l,c,m)+"));",this.userCode=`
      float getValue(`+i.map((function(v){return"int "+v}))+`) {
        `+f+`
      }

      void main() {
        `+a+` coords = getOutputCoords();
        vec4 result = vec4(getValue(`+o+`), 0., 0., 0.);

        `+o[n-1]+" = "+o[n-1]+` + 1;
        if (`+o[n-1]+" < "+e[n-1]+`) {
          result.g = getValue(`+o+`);
        }

        `+o[n-2]+" = "+o[n-2]+` + 1;
        if (`+o[n-2]+" < "+e[n-2]+`) {
          result.a = getValue(`+o+`);
        }

        `+o[n-1]+" = "+o[n-1]+` - 1;
        if (`+o[n-2]+" < "+e[n-2]+` &&
            `+o[n-1]+" < "+e[n-1]+`) {
          result.b = getValue(`+o+`);
        }
        setOutput(result);
      }
    `};function Ur(r,t,e){var n=r.indexOf(t);return r.map((function(a,o){return o===n?a+" - "+e:a})).join()}var ad=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var t=r.strideHeight,e=r.strideWidth,n=r.padInfo.top,a=r.padInfo.left,o=r.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yR = 0; yR < `+r.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+n+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+r.outWidth+`; yC++) {
              int xC = wC + yC * `+e+" - "+a+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              if (`+o+`) {
                float dyValue = getDy(b, yR, yC, d2);
                float xValue = getX(b, xR, xC, d1);
                dotProd += (xValue * dyValue);
              } else {
                float dyValue = getDy(b, d2, yR, yC);
                float xValue = getX(b, d1, xR, xC);
                dotProd += (xValue * dyValue);
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},od=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var t=r.filterHeight,e=r.filterWidth,n=r.strideHeight,a=r.strideWidth,o=r.dataFormat==="channelsLast",i=t-1-r.padInfo.top,s=e-1-r.padInfo.left,u=o?1:2,c=o?2:3,l=o?3:1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[`+l+`];

        ivec2 dyCorner = ivec2(coords[`+u+"], coords["+c+`]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+e+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+a+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+e+` - 1 - wC;

            for (int d2 = 0; d2 < `+r.outChannels+`; d2++) {

              if (`+o+`) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},id=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var t=r.strideDepth,e=r.strideHeight,n=r.strideWidth,a=r.padInfo.front,o=r.padInfo.top,i=r.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yF = 0; yF < `+r.outDepth+`; yF++) {
            int xF = wF + yF * `+t+" - "+a+`;

            if (xF < 0 || xF >= `+r.inDepth+`) {
              continue;
            }

            for (int yR = 0; yR < `+r.outHeight+`; yR++) {
              int xR = wR + yR * `+e+" - "+o+`;

              if (xR < 0 || xR >= `+r.inHeight+`) {
                continue;
              }

              for (int yC = 0; yC < `+r.outWidth+`; yC++) {
                int xC = wC + yC * `+n+" - "+i+`;

                if (xC < 0 || xC >= `+r.inWidth+`) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},sd=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var t=r.filterDepth,e=r.filterHeight,n=r.filterWidth,a=r.strideDepth,o=r.strideHeight,i=r.strideWidth,s=t-1-r.padInfo.front,u=e-1-r.padInfo.top,c=n-1-r.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(`+s+", "+u+", "+c+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < `+t+`; wF++) {
          float dyF = float(dyFCorner + wF) / `+a+`.0;

          if (dyF < 0.0 || dyF >= `+r.outDepth+`.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = `+t+` - 1 - wF;

          for (int wR = 0; wR < `+e+`; wR++) {
            float dyR = float(dyRCorner + wR) / `+o+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = `+e+` - 1 - wR;

            for (int wC = 0; wC < `+n+`; wC++) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = `+n+` - 1 - wC;

              for (int d2 = 0; d2 < `+r.outChannels+`; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},ud=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var t=r.strideHeight,e=r.strideWidth,n=r.padInfo.top,a=r.padInfo.left,o=r.outChannels/r.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * `+o+` + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yR = 0; yR < `+r.outHeight+`; yR++) {
            int xR = wR + yR * `+t+" - "+n+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+r.outWidth+`; yC++) {
              int xC = wC + yC * `+e+" - "+a+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `},cd=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var t=r.filterHeight,e=r.filterWidth,n=r.strideHeight,a=r.strideWidth,o=t-1-r.padInfo.top,i=e-1-r.padInfo.left,s=r.outChannels/r.inChannels;this.userCode=`
      const ivec2 pads = ivec2(`+o+", "+i+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < `+t+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+t+` - 1 - wR;

          for (int wC = 0; wC < `+e+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+a+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+e+` - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < `+s+`; dm++) {
              int d2 = d1 * `+s+` + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `},ms=function(r,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.outputShape=r.outShape;var a=r.padInfo.top,o=r.padInfo.left,i=r.strideHeight,s=r.strideWidth,u=r.dilationHeight,c=r.dilationWidth,l=r.filterHeight,h=r.filterWidth,f=4*Math.floor(r.inChannels/4),d=r.inChannels%4,p=r.dataFormat==="channelsLast",m=p?1:2,v=p?2:3,g=p?3:1,y="",b="";e&&(y=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`
          float activation(float x) {
            `+e+`
          }
        `,b="result = activation(result);");var x=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+y+`

      const ivec2 strides = ivec2(`+i+", "+s+`);
      const ivec2 pads = ivec2(`+a+", "+o+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[`+g+`];

        ivec2 xRCCorner =
            ivec2(coords[`+m+"], coords["+v+`]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+l+`; wR++) {
          int xR = xRCorner + wR * `+u+`;

          if (xR < 0 || xR >= `+r.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+h+`; wC++) {
            int xC = xCCorner + wC * `+c+`;

            if (xC < 0 || xC >= `+r.inWidth+`) {
              continue;
            }

            for (int d1 = 0; d1 < `+f+`; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (`+p+`) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (`+(d===1)+`) {

              if (`+p+`) {
                dotProd +=
                    getX(batch, xR, xC, `+f+`) *
                    getW(wR, wC, `+f+`, d2);
              } else {
                dotProd +=
                    getX(batch, `+f+`, xR, xC) *
                    getW(wR, wC, `+f+`, d2);
              }

            } else if (`+(d===2)+`) {
              vec2 wValues = vec2(
                getW(wR, wC, `+f+`, d2),
                getW(wR, wC, `+f+` + 1, d2)
              );

              if (`+p+`) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, `+f+`),
                  getX(batch, xR, xC, `+f+` + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, `+f+`, xR, xC),
                  getX(batch, `+f+` + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (`+(d===3)+`) {
              vec3 wValues = vec3(
                getW(wR, wC, `+f+`, d2),
                getW(wR, wC, `+f+` + 1, d2),
                getW(wR, wC, `+f+` + 2, d2)
              );

              if (`+p+`) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, `+f+`),
                  getX(batch, xR, xC, `+f+` + 1),
                  getX(batch, xR, xC, `+f+` + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, `+f+`, xR, xC),
                  getX(batch, `+f+` + 1, xR, xC),
                  getX(batch, `+f+` + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        `+x+`
        `+b+`
        setOutput(result);
      }
    `},ld=function(r){this.variableNames=["x","W"],this.outputShape=r.outShape;var t=r.padInfo.front,e=r.padInfo.top,n=r.padInfo.left,a=r.strideDepth,o=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.filterDepth,h=r.filterHeight,f=r.filterWidth,d=4*Math.floor(r.inChannels/4),p=r.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(`+a+", "+o+", "+i+`);
      const ivec3 pads = ivec3(`+t+", "+e+", "+n+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < `+l+`; wF++) {
          int xF = xFCorner + wF * `+s+`;

          if (xF < 0 || xF >= `+r.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`; wR++) {
            int xR = xRCorner + wR * `+u+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+f+`; wC++) {
              int xC = xCCorner + wC * `+c+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              for (int d1 = 0; d1 < `+d+`; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (`+(p===1)+`) {
                dotProd +=
                  getX(batch, xF, xR, xC, `+d+`) *
                  getW(wF, wR, wC, `+d+`, d2);
              } else if (`+(p===2)+`) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, `+d+`),
                  getX(batch, xF, xR, xC, `+d+` + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, `+d+`, d2),
                  getW(wF, wR, wC, `+d+` + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (`+(p===3)+`) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, `+d+`),
                  getX(batch, xF, xR, xC, `+d+` + 1),
                  getX(batch, xF, xR, xC, `+d+` + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, `+d+`, d2),
                  getW(wF, wR, wC, `+d+` + 1, d2),
                  getW(wF, wR, wC, `+d+` + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},gs=function(r,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.outputShape=r.outShape;var a=r.inHeight,o=r.inWidth,i=r.padInfo.top,s=r.padInfo.left,u=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,h=r.dilationWidth,f=r.filterHeight,d=r.filterWidth,p=r.outChannels/r.inChannels,m="",v="";e&&(m=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`
          float activation(float x) {
            `+e+`
          }
        `,v="result = activation(result);");var g=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+m+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / `+p+`;
        int q = d2 - d1 * `+p+`;

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < `+f+`; wR++) {
          int xR = xRCorner + wR * `+l+`;

          if (xR < 0 || xR >= `+a+`) {
            continue;
          }

          for (int wC = 0; wC < `+d+`; wC++) {
            int xC = xCCorner + wC * `+h+`;

            if (xC < 0 || xC >= `+o+`) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        `+g+`
        `+v+`
        setOutput(result);
      }
    `},xs=function(r,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r.outShape;for(var a=r.inHeight,o=r.inWidth,i=r.padInfo.top,s=r.padInfo.left,u=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,h=r.dilationWidth,f=r.filterHeight,d=r.filterWidth,p=d,m="int xR; int xC; int xCOffset;",v=0;v<f;v++)for(var g=0;g<d;g++)m+=`
          vec4 xTexelR`+v+"C"+2*g+` = vec4(0.);
          vec4 wR`+v+"C"+g+` = vec4(0.);
          vec4 xR`+v+"C"+g+" = vec4(0.);";for(v=0;v<f;v++)for(var y=0;y<p;y++){if(m+=`
          xR = xRCorner + `+v*l+`;
          xC = xCCorner + `+(g=2*y)*h+`;
        `,c===1){if(g<d&&(m+=s%2==1?`
                xCOffset = xC + 1;
                if(xR >= 0 && xR < `+a+" && xCOffset >= 0 && xCOffset < "+o+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+o+`) {
                    xTexelR`+v+"C"+g+`.zw = vec2(0.);
                  }
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + 1 - 2;
                if(xR >= 0 && xR < `+a+" && xCOffset >= 0 && xCOffset < "+o+`) {
                  vec4 previous = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+o+`) {
                    previous.zw = vec2(0.);
                  }

                  xR`+v+"C"+g+" = vec4(previous.zw, xTexelR"+v+"C"+g+`.xy);
                } else {
                  xR`+v+"C"+g+" = vec4(0, 0, xTexelR"+v+"C"+g+`.xy);
                }
              `:`
                if(xR >= 0 && xR < `+a+" && xC >= 0 && xC < "+o+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xR`+v+"C"+g+" = xTexelR"+v+"C"+g+`;
              `,g+1<d)){var b=s%2==0?cu(h):h;h%2==0&&s%2==1||h%2!=0&&s%2!=1?(m+=`
                  xCOffset = xC + `+s%2+" + "+b+`;

                  if(xR >= 0 && xR < `+a+` &&
                    xCOffset >= 0 && xCOffset < `+o+`) {
                    xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }
                `,h>1&&(m+=`
                    xCOffset -= 2;
                    if(xR >= 0 && xR < `+a+` &&
                      xCOffset >= 0 && xCOffset < `+o+`) {
                      xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);
                    } else {
                      xTexelR`+v+"C"+g+` = vec4(0.);
                    }
                  `),m+=`
                  xR`+v+"C"+(g+1)+` = vec4(
                    xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.xy);
                `):m+=`
                  xCOffset = xC + `+b+`;

                  if(xR >= 0 && xR < `+a+` &&
                    xCOffset >= 0 && xCOffset < `+o+`) {
                    xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }

                  xR`+v+"C"+(g+1)+" = xTexelR"+v+"C"+(g+2)+`;
                `}}else g<d&&(m+=`
              if(xR >= 0 && xR < `+a+`) {
            `,s%2==1?(m+=`
                xCOffset = xC + 1 - `+c+`;
                if(xCOffset >= 0 && xCOffset < `+o+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                if(xC + 1 >= 0 && xC + 1 < `+o+`) {
                  xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xC + 1, d1);
                } else {
                  xTexelR`+v+"C"+(g+2)+` = vec4(0.);
                }

                xR`+v+"C"+g+` = vec4(
                  xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.zw);
              `,g+1<d&&(m+=`
                  vec4 final = vec4(0.);
                  xCOffset = xC + 1 + `+c+`;
                  if(xCOffset >= 0 && xCOffset < `+o+`) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xR`+v+"C"+(g+1)+" = vec4(xTexelR"+v+"C"+(g+2)+`.xy, final.xy);
                `)):(m+=`
                if(xC >= 0 && xC < `+o+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + `+c+`;
                if(xCOffset >= 0 && xCOffset < `+o+`) {
                  xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+v+"C"+(g+2)+` = vec4(0.);
                }

                xR`+v+"C"+g+` = vec4(
                  xTexelR`+v+"C"+g+".xy, xTexelR"+v+"C"+(g+2)+`.xy);
              `,g+1<d&&(m+=`
                  xR`+v+"C"+(g+1)+` = vec4(
                    xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.zw);
                `)),m+="}");g<d&&(m+=`
            vec4 wTexelR`+v+"C"+g+" = getW("+v+", "+g+`, d1, q);
            wR`+v+"C"+g+" = vec4(wTexelR"+v+"C"+g+".xz, wTexelR"+v+"C"+g+`.xz);
          `,g+1<d&&(m+=`
              vec4 wTexelR`+v+"C"+(g+1)+" = getW("+v+", "+(g+1)+`, d1, q);
              wR`+v+"C"+(g+1)+` =
                vec4(wTexelR`+v+"C"+(g+1)+".xz, wTexelR"+v+"C"+(g+1)+".xz);"))}for(v=0;v<f;v++)for(g=0;g<d;g++)m+="dotProd += xR"+v+"C"+g+" * wR"+v+"C"+g+";";var x="",w="";e&&(x=n?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+e+`
        }`:`vec4 activation(vec4 x) {
          `+e+`
        }`,w="result = activation(result);");var C=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+x+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {

        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2;
        int q = 0;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        vec4 dotProd = vec4(0.);

        `+m+`

        vec4 result = dotProd;
        `+C+`
        `+w+`
        setOutput(result);
      }
    `},hd=function(r,t,e,n,a){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];var o=r[0],i=r[1],s=r[2],u=r[3],c=t[0],l=e[0],h=e[1];this.outputShape=[c,l,h,u];var f=n==="bilinear"?1:0,d=[i-1+".0",s-1+".0"],p=d[0],m=d[1],v=l>1?[""+(i-1)/(l-1),"(y2-y1) * height_ratio","y1*"+p+" + float(y)*(height_scale)"]:["0.0","0.0","0.5 * (y1+y2) * "+p],g=v[0],y=v[1],b=v[2],x=h>1?[""+(s-1)/(h-1),"(x2-x1) * width_ratio","x1*"+m+" + float(x)*(width_scale)"]:["0.0","0.0","0.5 * (x1+x2) * "+m],w=x[0],C=x[1],N=x[2];this.userCode=`
      const float height_ratio = float(`+g+`);
      const float width_ratio = float(`+w+`);
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= `+o+`) {
          return;
        }

        float height_scale = `+y+`;
        float width_scale = `+C+`;

        float in_y = `+b+`;
        if( in_y < 0.0 || in_y > `+p+` ) {
          setOutput(float(`+a+`));
          return;
        }
        float in_x = `+N+`;
        if( in_x < 0.0 || in_x > `+m+` ) {
          setOutput(float(`+a+`));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(`+f+` == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `},fd=function(r,t,e){this.variableNames=["x"],this.outputShape=r;var n=r.length,a=r[r.length-1],o=e?"<":">";this.userCode=`
      int getIndex(int i) {
        `+(e?"return "+a+" -i - 1;":"return i;")+`
      }

      void main() {
        `+Ne(n)+` coords = getOutputCoords();
        int end = `+ys(n,"coords")+`;
        float val = 0.0;
        for (int i = `+a+` - 1; i >= 0; i -= 1) {
          int idx = getIndex(i);
          if (idx `+o+` end) {
            continue;
          }
          if (idx == end && `+t+`) {
            continue;
          }
          `+ys(n,"coords")+` = idx;
          val += getX(`+(function(i,s){if(i===1)return""+s;if(i===2)return s+".x, "+s+".y";if(i===3)return s+".x, "+s+".y, "+s+".z";if(i===4)return s+".x, "+s+".y, "+s+".z, "+s+".w";throw Error("Cumulative sum for rank "+i+" is not yet supported")})(n,"coords")+`);
        }
        setOutput(val);
      }
    `};function ys(r,t){if(r===1)return""+t;if(r===2)return t+".y";if(r===3)return t+".z";if(r===4)return t+".w";throw Error("Cumulative sum for rank "+r+" is not yet supported")}var dd=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=wr.DENSE;var t=mr(r),e=Qe();this.outputShape=r,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+In(["r","c","d"],r)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        `+e.output+` = result;
      }
    `},pd=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=wr.DENSE;var t=mr(r),e=Qe();this.outputShape=r,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+In(["r","c","d"],r)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+t[0]+", "+t[1]+`));
        int index = 4 * (resTexRC.x * `+t[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        `+e.output+` = result;
      }
    `},vd=(function(){function r(t,e,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=n,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = `+this.getHeightCoordString()+`;
      int w = `+this.getWidthCoordString()+`;
      int d = `+this.getDepthCoordString()+`;

      int in_h = h / `+e+`;
      int offset_h = imod(h, `+e+`);
      int in_w = w / `+e+`;
      int offset_w = imod(w, `+e+`);
      int offset_d = (offset_h * `+e+` + offset_w) *
        `+this.getOutputDepthSize()+`;
      int in_d = d + offset_d;

      float result = `+this.getInputSamplingString()+`;
      setOutput(result);
    }
  `}return r.prototype.getHeightCoordString=function(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"},r.prototype.getWidthCoordString=function(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"},r.prototype.getDepthCoordString=function(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"},r.prototype.getOutputDepthSize=function(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]},r.prototype.getInputSamplingString=function(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"},r})(),md=function(r){this.variableNames=["X"],this.outputShape=[r,r],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `},gd=function(r){this.variableNames=["A"],this.outTexUsage=mt.DOWNLOAD;var t=Qe();this.outputShape=r,this.userCode=`
      `+Uu+`

      void main() {
        float x = getAAtOutCoords();
        `+t.output+` = encode_float(x);
      }
    `},xd=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=mt.DOWNLOAD;var t=Qe();this.outputShape=r,this.userCode=`
      `+Uu+`

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        `+t.output+` = encode_float(x);
      }
    `},yd=function(r,t,e){e===void 0&&(e=!1),this.variableNames=["A"];var n=Qe(),a=t[0],o=t[1];this.outputShape=r;var i="result";e&&(i="floor(result * 255. + 0.5)"),this.userCode=`
      `+Qo(r)+`

      void main() {
        ivec3 coords = getOutputCoords();

        int flatIndex = getFlatIndex(coords);
        int offset = imod(flatIndex, 4);

        flatIndex = idiv(flatIndex, 4, 1.);
        
        int r = flatIndex / `+o+`;
        int c = imod(flatIndex, `+o+`);
        vec2 uv = (vec2(c, r) + halfCR) / vec2(`+o+".0, "+a+`.0);
        vec4 values = `+n.texture2D+`(A, uv);

        float result;

        if(offset == 0) {
          result = values[0];
        } else if(offset == 1) {
          result = values[1];
        } else if(offset == 2) {
          result = values[2];
        } else {
          result = values[3];
        }

        `+n.output+" = vec4("+i+`, 0., 0., 0.);
      }
    `},bd=function(r,t,e){e===void 0&&(e=!1),this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var n=Qe(),a=t[0],o=t[1];this.outputShape=r;var i="",s="result";e&&(s="floor(result * 255. + 0.5)");for(var u=0;u<=1;u++)for(var c=0;c<=1;c++){var l=2*u+c;i+=`
          localCoords = coords;
          if(localCoords[2] + `+c+" < "+r[2]+`) {
            localCoords[2] += `+c+`;
            if(localCoords[1] + `+u+" < "+r[1]+`) {
              localCoords[1] += `+u+`;

              flatIndex = getFlatIndex(localCoords);
              offset = imod(flatIndex, 4);

              flatIndex = idiv(flatIndex, 4, 1.);

              r = flatIndex / `+o+`;
              c = imod(flatIndex, `+o+`);
              uv = (vec2(c, r) + halfCR) / vec2(`+o+".0, "+a+`.0);
              values = `+n.texture2D+`(A, uv);

              if(offset == 0) {
                result[`+l+`] = values[0];
              } else if(offset == 1) {
                result[`+l+`] = values[1];
              } else if(offset == 2) {
                result[`+l+`] = values[2];
              } else {
                result[`+l+`] = values[3];
              }
            }
          }
        `}this.userCode=`
      `+Qo(r)+`

      void main() {
        ivec3 coords = getOutputCoords();

        vec4 result = vec4(0.);
        int flatIndex, r, c, offset;
        ivec3 localCoords;
        vec2 uv;
        vec4 values;

        `+i+`

        `+n.output+" = "+s+`;
      }
    `},wd="return real * expR - imag * expI;",Cd="return real * expI + imag * expR;",bs=function(r,t,e){this.variableNames=["real","imag"];var n=t[1];this.outputShape=t;var a=e?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,o=e?n+".0":"1.0";this.userCode=`
      const float exponentMultiplier = `+a+`;

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        `+r+`
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(`+n+`);
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < `+n+`; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / `+o+`;
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `},_d=(function(){function r(t,e){this.outputShape=[],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      uniform float value;
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;return function(n,a){e.valueLoc==null&&(e.valueLoc=n.getUniformLocationNoThrow(a,"value")),n.gl.uniform1f(e.valueLoc,t)}},r})(),Ed=function(r,t,e){this.variableNames=["A","indices"];var n=r.slice();n[e]=t,this.outputShape=n,this.rank=n.length;var a=Ne(this.rank),o=(function(i,s){var u=i.length;if(u>4)throw Error("Gather for rank "+u+" is not yet supported");if(u===1)return"int(getIndices(resRC))";for(var c=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],h=0;h<i.length;h++)h===s?l.push("int(getIndices("+c[h]+"))"):l.push(""+c[h]);return l.join()})(r,e);this.userCode=`
      void main() {
        `+a+` resRC = getOutputCoords();
        setOutput(getA(`+o+`));
      }
    `},kd=function(r,t,e){this.sliceDim=r,this.strides=t,this.variableNames=["x","indices"],this.outputShape=e;var n=Ne(t.length),a=Ne(e.length),o=this.sliceDim>1?"strides[j]":"strides";this.userCode=`
        `+n+" strides = "+n+"("+this.strides+`);
         void main() {
          `+a+` coords = getOutputCoords();
          int flattenIndex = 0;
          for (int j = 0; j < `+this.sliceDim+`; j++) {
            int index = round(getIndices(coords[0], j));
            flattenIndex += index * `+o+`;
          }
          setOutput(getX(flattenIndex, coords[1]));
        }
      `};function Id(r,t){var e=Qe();return bh(r,t,e.version+`
    precision highp float;
    `+e.attribute+` vec3 clipSpacePos;
    `+e.attribute+` vec2 uv;
    `+e.varyingVs+` vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function Rd(r,t){return kh(r,t,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function Sd(r,t){return Ih(r,t,new Uint16Array([0,1,2,2,1,3]))}function Nr(r,t,e,n,a,o,i){Sh(e,n);var s=Rh(r,t),u=r.TEXTURE_2D;return ee(r,t,(function(){return r.bindTexture(u,s)})),ee(r,t,(function(){return r.texParameteri(u,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE)})),ee(r,t,(function(){return r.texParameteri(u,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)})),ee(r,t,(function(){return r.texParameteri(u,r.TEXTURE_MIN_FILTER,r.NEAREST)})),ee(r,t,(function(){return r.texParameteri(u,r.TEXTURE_MAG_FILTER,r.NEAREST)})),ee(r,t,(function(){return r.texImage2D(u,0,a,e,n,0,o,i,null)})),ee(r,t,(function(){return r.bindTexture(r.TEXTURE_2D,null)})),s}function Nd(r,t,e,n,a){var o=Ca(e,n);return Nr(r,t,o[0],o[1],a.internalFormatFloat,a.textureFormatFloat,r.FLOAT)}function Dd(r,t,e,n,a){var o=Ca(e,n);return Nr(r,t,o[0],o[1],a.internalFormatHalfFloat,a.textureFormatFloat,a.textureTypeHalfFloat)}function Ad(r,t,e,n,a){var o=Ca(e,n);return Nr(r,t,o[0],o[1],r.RGBA,r.RGBA,r.UNSIGNED_BYTE)}function Td(r,t,e,n,a){var o=Sr(e,n);return Nr(r,t,o[0],o[1],a.internalFormatPackedFloat,r.RGBA,r.FLOAT)}function Fd(r,t,e,n,a){var o=Sr(e,n);return Nr(r,t,o[0],o[1],a.internalFormatPackedHalfFloat,r.RGBA,a.textureTypeHalfFloat)}function Md(r,t,e,n){return ee(r,t,(function(){return r.bindBuffer(r.ARRAY_BUFFER,n)})),ss(r,t,e,"clipSpacePos",n,3,20,0)&&ss(r,t,e,"uv",n,2,20,12)}function Pd(r,t,e,n,a,o,i){var s,u,c;ee(r,t,(function(){return r.bindTexture(r.TEXTURE_2D,e)})),o instanceof Uint8Array?(s=new Uint8Array(n*a*4),u=r.UNSIGNED_BYTE,c=r.RGBA):(s=new Float32Array(n*a*4),u=r.FLOAT,c=i.internalFormatPackedFloat),s.set(o),ee(r,t,(function(){return r.texImage2D(r.TEXTURE_2D,0,c,n,a,0,r.RGBA,u,s)})),ee(r,t,(function(){return r.bindTexture(r.TEXTURE_2D,null)}))}function Od(r,t,e,n){ee(r,t,(function(){return r.bindTexture(r.TEXTURE_2D,e)})),n.data instanceof Uint8Array?ee(r,t,(function(){return r.texImage2D(r.TEXTURE_2D,0,r.RGBA,n.width,n.height,0,r.RGBA,r.UNSIGNED_BYTE,n.data)})):ee(r,t,(function(){return r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,n)})),ee(r,t,(function(){return r.bindTexture(r.TEXTURE_2D,null)}))}function Bd(r,t,e,n,a){var o=r.createBuffer();ee(r,t,(function(){return r.bindBuffer(r.PIXEL_PACK_BUFFER,o)}));var i=16*e*n;return ee(r,t,(function(){return r.bufferData(r.PIXEL_PACK_BUFFER,i,r.STREAM_READ)})),ee(r,t,(function(){return r.readPixels(0,0,n,e,r.RGBA,r.FLOAT,0)})),ee(r,t,(function(){return r.bindBuffer(r.PIXEL_PACK_BUFFER,null)})),o}function Ld(r,t,e){var n=r,a=new Float32Array(e);return n.bindBuffer(n.PIXEL_PACK_BUFFER,t),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,a),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),a}function Wd(r,t,e,n,a){var o=Ca(e,n),i=o[0],s=o[1],u=new Uint8Array(e*n*4);return ee(r,t,(function(){return r.readPixels(0,0,i,s,a.downloadTextureFormat,r.UNSIGNED_BYTE,u)})),new Float32Array(u.buffer)}function jd(r,t,e,n,a,o,i,s){var u=r,c=new Float32Array((function(l,h){var f=Sr(l,h);return f[0]*f[1]*4})(o,i));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}function zd(r,t,e,n){var a=new Float32Array(e*n*4);return ee(r,t,(function(){return r.readPixels(0,0,n,e,r.RGBA,r.FLOAT,a)})),a}var Ud=(function(){function r(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];var e=L().getNumber("WEBGL_VERSION");t!=null?(this.gl=t,vh(e,t)):this.gl=qt(e);var n="WEBGL_color_buffer_float";if(L().getNumber("WEBGL_VERSION")===1){if(this.textureFloatExtension=Lr(this.gl,this.debug,"OES_texture_float"),Rt(this.gl,"OES_texture_half_float"))this.textureHalfFloatExtension=Lr(this.gl,this.debug,"OES_texture_half_float");else if(L().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),Rt(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=Lr(this.gl,this.debug,"EXT_color_buffer_half_float");else if(L().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",Rt(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else{if(!Rt(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=Rd(this.gl,this.debug),this.indexBuffer=Sd(this.gl,this.debug),this.framebuffer=Nh(this.gl,this.debug),this.textureConfig=Uo(this.gl,this.textureHalfFloatExtension)}return Object.defineProperty(r.prototype,"debug",{get:function(){return L().getBool("DEBUG")},enumerable:!0,configurable:!0}),r.prototype.dispose=function(){var t=this;if(!this.disposed){this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var e=this.gl;ee(e,this.debug,(function(){return e.finish()})),ee(e,this.debug,(function(){return e.bindFramebuffer(e.FRAMEBUFFER,null)})),ee(e,this.debug,(function(){return e.deleteFramebuffer(t.framebuffer)})),ee(e,this.debug,(function(){return e.bindBuffer(e.ARRAY_BUFFER,null)})),ee(e,this.debug,(function(){return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)})),ee(e,this.debug,(function(){return e.deleteBuffer(t.indexBuffer)})),this.disposed=!0}},r.prototype.createFloat32MatrixTexture=function(t,e){return this.throwIfDisposed(),Nd(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.createFloat16MatrixTexture=function(t,e){return this.throwIfDisposed(),Dd(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.createUnsignedBytesMatrixTexture=function(t,e){return this.throwIfDisposed(),Ad(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.uploadPixelDataToTexture=function(t,e){this.throwIfDisposed(),Od(this.gl,this.debug,t,e)},r.prototype.uploadDenseMatrixToTexture=function(t,e,n,a){this.throwIfDisposed(),Pd(this.gl,this.debug,t,e,n,a,this.textureConfig)},r.prototype.createFloat16PackedMatrixTexture=function(t,e){return this.throwIfDisposed(),Fd(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.createPackedMatrixTexture=function(t,e){return this.throwIfDisposed(),Td(this.gl,this.debug,t,e,this.textureConfig)},r.prototype.deleteMatrixTexture=function(t){var e=this;this.throwIfDisposed(),this.outputTexture===t&&(us(this.gl,this.debug,this.framebuffer),this.outputTexture=null),ee(this.gl,this.debug,(function(){return e.gl.deleteTexture(t)}))},r.prototype.downloadByteEncodedFloatMatrixFromOutputTexture=function(t,e,n){var a=this;return this.downloadMatrixDriver(t,(function(){return Wd(a.gl,a.debug,e,n,a.textureConfig)}))},r.prototype.downloadPackedMatrixFromBuffer=function(t,e,n,a,o,i){return jd(this.gl,t,0,0,0,o,i,this.textureConfig)},r.prototype.downloadFloat32MatrixFromBuffer=function(t,e){return Ld(this.gl,t,e)},r.prototype.createBufferFromTexture=function(t,e,n){this.bindTextureToFrameBuffer(t);var a=Bd(this.gl,this.debug,e,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),a},r.prototype.createAndWaitForFence=function(){var t=this.createFence(this.gl);return this.pollFence(t)},r.prototype.createFence=function(t){var e,n,a=this;if(L().getBool("WEBGL_FENCE_API_ENABLED")){var o=t,i=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),n=function(){var s=o.clientWaitSync(i,0,0);return s===o.ALREADY_SIGNALED||s===o.CONDITION_SATISFIED},e=i}else L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),n=function(){return a.isQueryAvailable(e,L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}):n=function(){return!0};return{query:e,isFencePassed:n}},r.prototype.downloadMatrixFromPackedTexture=function(t,e,n){var a=this;return this.downloadMatrixDriver(t,(function(){return zd(a.gl,a.debug,e,n)}))},r.prototype.createProgram=function(t){this.throwIfDisposed();var e=this.gl,n=wh(e,this.debug,t),a=Id(e,this.debug),o=_h(e,this.debug);return ee(e,this.debug,(function(){return e.attachShader(o,a)})),ee(e,this.debug,(function(){return e.attachShader(o,n)})),Eh(e,this.debug,o),this.debug&&$a(e,this.debug,o),this.vertexAttrsAreBound||(this.setProgram(o),this.vertexAttrsAreBound=Md(e,this.debug,this.program,this.vertexBuffer)),o},r.prototype.deleteProgram=function(t){var e=this;this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&ee(this.gl,this.debug,(function(){return e.gl.deleteProgram(t)}))},r.prototype.setProgram=function(t){var e=this;this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&$a(this.gl,this.debug,this.program),ee(this.gl,this.debug,(function(){return e.gl.useProgram(t)}))},r.prototype.getUniformLocation=function(t,e,n){return n===void 0&&(n=!0),this.throwIfDisposed(),n?Ah(this.gl,this.debug,t,e):Th(this.gl,t,e)},r.prototype.getAttributeLocation=function(t,e){var n=this;return this.throwIfDisposed(),ee(this.gl,this.debug,(function(){return n.gl.getAttribLocation(t,e)}))},r.prototype.getUniformLocationNoThrow=function(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)},r.prototype.setInputMatrixTexture=function(t,e,n){this.throwIfDisposed(),this.throwIfNoProgram(),Fh(this.gl,this.debug,this.program,t,e,n)},r.prototype.setOutputMatrixTexture=function(t,e,n){this.setOutputMatrixTextureDriver(t,n,e)},r.prototype.setOutputPackedMatrixTexture=function(t,e,n){this.throwIfDisposed();var a=Sr(e,n),o=a[0],i=a[1];this.setOutputMatrixTextureDriver(t,o,i)},r.prototype.setOutputMatrixWriteRegion=function(t,e,n,a){this.setOutputMatrixWriteRegionDriver(n,t,a,e)},r.prototype.setOutputPackedMatrixWriteRegion=function(t,e,n,a){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")},r.prototype.debugValidate=function(){this.program!=null&&$a(this.gl,this.debug,this.program),Wr(this.gl)},r.prototype.executeProgram=function(){this.throwIfDisposed(),this.throwIfNoProgram();var t=this.gl;this.debug&&this.debugValidate(),ee(t,this.debug,(function(){return t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}))},r.prototype.blockUntilAllProgramsCompleted=function(){var t=this;this.throwIfDisposed(),ee(this.gl,this.debug,(function(){return t.gl.finish()}))},r.prototype.getQueryTimerExtension=function(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=Lr(this.gl,this.debug,L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension},r.prototype.getQueryTimerExtensionWebGL2=function(){return this.getQueryTimerExtension()},r.prototype.getQueryTimerExtensionWebGL1=function(){return this.getQueryTimerExtension()},r.prototype.beginQuery=function(){if(L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){var t=this.gl,e=this.getQueryTimerExtensionWebGL2(),n=t.createQuery();return t.beginQuery(e.TIME_ELAPSED_EXT,n),n}var a=this.getQueryTimerExtensionWebGL1(),o=a.createQueryEXT();return a.beginQueryEXT(a.TIME_ELAPSED_EXT,o),o},r.prototype.endQuery=function(){if(L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")!==2){var t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}else{var e=this.gl,n=this.getQueryTimerExtensionWebGL2();e.endQuery(n.TIME_ELAPSED_EXT)}},r.prototype.waitForQueryAndGetTime=function(t){return J(this,void 0,void 0,(function(){var e=this;return Q(this,(function(n){switch(n.label){case 0:return[4,ts((function(){return e.disposed||e.isQueryAvailable(t,L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}))];case 1:return n.sent(),[2,this.getQueryTime(t,L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))]}}))}))},r.prototype.getQueryTime=function(t,e){if(e===0)return null;if(e===2){var n=this.gl;return n.getQueryParameter(t,n.QUERY_RESULT)/1e6}var a=this.getQueryTimerExtensionWebGL1();return a.getQueryObjectEXT(t,a.QUERY_RESULT_EXT)/1e6},r.prototype.isQueryAvailable=function(t,e){if(e===0)return!0;if(e===2){var n=this.gl,a=this.getQueryTimerExtensionWebGL2(),o=n.getQueryParameter(t,n.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(a.GPU_DISJOINT_EXT)),o&&!this.disjoint}return o=(a=this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(t,a.QUERY_RESULT_AVAILABLE_EXT),this.disjoint==null&&(this.disjoint=this.gl.getParameter(a.GPU_DISJOINT_EXT)),o&&!this.disjoint},r.prototype.pollFence=function(t){var e=this;return new Promise((function(n){e.addItemToPoll((function(){return t.isFencePassed()}),(function(){return n()}))}))},r.prototype.pollItems=function(){for(var t=(function(n){for(var a=0;a<n.length&&n[a]();++a);return a-1})(this.itemsToPoll.map((function(n){return n.isDoneFn}))),e=0;e<=t;++e)(0,this.itemsToPoll[e].resolveFn)();this.itemsToPoll=this.itemsToPoll.slice(t+1)},r.prototype.addItemToPoll=function(t,e){var n=this;this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1||ts((function(){return n.pollItems(),n.itemsToPoll.length===0}))},r.prototype.bindTextureToFrameBuffer=function(t){this.throwIfDisposed(),Ja(this.gl,this.debug,t,this.framebuffer),this.debug&&Wr(this.gl)},r.prototype.unbindTextureToFrameBuffer=function(){this.outputTexture!=null?(Ja(this.gl,this.debug,this.outputTexture,this.framebuffer),this.debug&&Wr(this.gl)):us(this.gl,this.debug,this.framebuffer)},r.prototype.downloadMatrixDriver=function(t,e){this.bindTextureToFrameBuffer(t);var n=e();return this.unbindTextureToFrameBuffer(),n},r.prototype.setOutputMatrixTextureDriver=function(t,e,n){this.throwIfDisposed();var a=this.gl;Ja(a,this.debug,t,this.framebuffer),this.debug&&Wr(a),this.outputTexture=t,ee(a,this.debug,(function(){return a.viewport(0,0,e,n)})),ee(a,this.debug,(function(){return a.scissor(0,0,e,n)}))},r.prototype.setOutputMatrixWriteRegionDriver=function(t,e,n,a){var o=this;this.throwIfDisposed(),ee(this.gl,this.debug,(function(){return o.gl.scissor(t,e,n,a)}))},r.prototype.throwIfDisposed=function(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")},r.prototype.throwIfNoProgram=function(){if(this.program==null)throw new Error("No GPU program is currently set.")},r})();function ws(r,t){if(r.length!==t.length)throw Error("Binary was compiled with "+r.length+" inputs, but was executed with "+t.length+" inputs");r.forEach((function(e,n){var a=e.logicalShape,o=t[n],i=o.shape;if(!He(a,i))throw Error("Binary was compiled with different shapes than the current args. Shapes "+a+" and "+i+" must match");if(!e.isUniform||!o.isUniform){var s=e.texShape,u=o.isUniform?null:o.texData.texShape;if(!He(s,u))throw Error("Binary was compiled with different texture shapes than the current args. Shape "+s+" and "+u+" must match")}}))}var Vd=function(r,t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r;for(var n=e.filterWidth,a=e.inChannels,o=e.strideWidth,i=e.strideHeight,s=e.padInfo,u=e.outWidth,c=e.dilationWidth,l=e.dilationHeight,h=e.dataFormat,f=s.left,d=s.top,p=a*n,m=Qe(),v=h==="channelsLast",g=v?0:1,y=v?1:2,b="",x=0;x<=1;x++)for(var w=0;w<=1;w++)b+=`
          blockIndex = rc.y + `+w+`;
          pos = rc.x + `+x+`;

          if(blockIndex < `+r[1]+" && pos < "+r[0]+`) {
            offsetY = int(blockIndex / (`+u+")) * "+i+" - "+d+`;
            d0 = offsetY + `+l+" * (pos / "+p+`);

            if(d0 < `+t[g]+` && d0 >= 0) {

              offsetX = int(mod(float(blockIndex), `+u+".) * "+o+". - "+f+`.);
              d1 = offsetX + `+c+" * (int(mod(float(pos), "+p+".) / "+a+`.));

              if(d1 < `+t[y]+` && d1 >= 0) {

                ch = int(mod(float(pos), `+a+`.));

                if (`+v+`) {
                  innerDims = vec2(d1, ch);
                  result[`+(2*x+w)+`] = getChannel(
                    getA(d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[`+(2*x+w)+`] = getChannel(
                    getA(ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec2 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        `+b+`

        `+m.output+` = result;
      }
    `},Gd=function(r,t,e,n,a){this.variableNames=["x"],this.outputShape=[];var o,i=t,s=r[3]-1;this.outputShape=r;var u="float("+e+") + float("+n+") * sum";o=a===.5?"inversesqrt("+u+")":a===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+a+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -`+i+"; j <= "+i+`; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  `+s+`) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * `+o+`;
        setOutput(val);
      }
    `},Hd=function(r,t,e,n,a){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=r,this.depth=r[3],this.depthRadius=t,this.bias=e,this.alpha=n,this.beta=a,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < `+this.depth+`; ++d) {
          int depthBegin = int(max(0.0, float(d - `+t+`)));
          int depthEnd = int(min(float(`+this.depth+`),
              float(d + `+t+` + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = `+this.depth+`;

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(`+n+") * norm + float("+e+`);

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(`+n+`)
                * float(`+a+`)
                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * `+a+`);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `},qd=function(r,t,e,n,a){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;var o,i=t,s=r[3]-1;this.outputShape=r;var u="float("+e+") + float("+n+") * sum";o=a===.5?"inversesqrt("+u+")":a===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+a+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < `+this.outputShape[3]+`;
        bool hasNextRow = c < `+this.outputShape[2]+`;

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - `+i+`;
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - `+i+"; j <= "+i+`; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(`+s+`));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * `+o+`;
        setOutput(result);
      }
    `},Kd=function(r){this.variableNames=["dy","maxPos"],this.outputShape=r.inShape;var t=r.strideHeight,e=r.strideWidth,n=r.dilationHeight,a=r.effectiveFilterHeight,o=r.effectiveFilterWidth,i=a-1-r.padInfo.top,s=o-1-r.padInfo.left,u=a*o-1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+a+`;
          wR += `+n+`) {
          float dyR = float(dyRCorner + wR) / `+t+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+o+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+e+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = `+u+` - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * `+o+` + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `},Xd=function(r){this.variableNames=["dy","maxPos"],this.outputShape=r.inShape;var t=r.strideDepth,e=r.strideHeight,n=r.strideWidth,a=r.dilationDepth,o=r.dilationHeight,i=r.dilationWidth,s=r.effectiveFilterDepth,u=r.effectiveFilterHeight,c=r.effectiveFilterWidth,l=s-1-r.padInfo.front,h=u-1-r.padInfo.top,f=c-1-r.padInfo.left,d=s*u*c-1;this.userCode=`
      const ivec3 pads = ivec3(`+l+", "+h+", "+f+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+s+`;
           wD += `+a+`) {
          float dyD = float(dyDCorner + wD) / `+t+`.0;

          if (dyD < 0.0 || dyD >= `+r.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+u+`;
              wR += `+o+`) {
            float dyR = float(dyRCorner + wR) / `+e+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+c+`;
                wC += `+i+`) {
              float dyC = float(dyCCorner + wC) / `+n+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = `+d+` -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * `+u+" * "+c+` +
                  wR * `+c+` + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `},no=function(r,t,e,n,a,o,i){e===void 0&&(e=!1),n===void 0&&(n=!1),a===void 0&&(a=!1),o===void 0&&(o=null),i===void 0&&(i=!1),this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t;var s=e?r[1]:r[2],u=Math.ceil(s/2),c=e?"i * 2, rc.y":"rc.y, i * 2",l=n?"rc.z, i * 2":"i * 2, rc.z",h=e?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],f=n?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],d="",p="";o&&(d=i?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+o+`
        }`:`vec4 activation(vec4 x) {
          `+o+`
        }`,p="result = activation(result);");var m=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+d+`

      const float sharedDimension = `+u+`.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        for (int i = 0; i < `+u+`; i++) {
          vec4 a = getMatrixA(rc.x, `+c+`);
          vec4 b = getMatrixB(rc.x, `+l+`);

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (`+h[0]+" * "+f[0]+`);
          result += (`+h[1]+" * "+f[1]+`);
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        `+m+`

        `+p+`

        setOutput(result);
      }
    `},Yd=(function(){function r(t,e,n){this.variableNames=["probs"],this.outputShape=[t,n],this.userCode=`
      uniform float seed;

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < `+(e-1)+`; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(`+(e-1)+`));
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;return function(n,a){e.seedLoc==null&&(e.seedLoc=n.getUniformLocation(a,"seed")),n.gl.uniform1f(e.seedLoc,t)}},r})(),$d=function(r,t,e,n){this.variableNames=["indices"],this.outputShape=[r,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(`+n+"), float("+e+`),
                      float(index == coords.y)));
      }
    `},Jd=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=r;var t=r.length;if(t===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{var e=ct("rc",t),n=Ne(t),a=(function(s,u,c){if(s===1)return"rc > "+u[0];for(var l="",h=s-2;h<s;h++)l+=c[h]+" >= "+u[h],h<s-1&&(l+="||");return l})(t,r,e),o=(function(s,u,c,l){if(s===1)return"";var h=l.slice(-2);return`
    int r = `+h[0]+`;
    int c = `+h[1]+`;
    int rp1 = r + 1;
    int cp1 = c + 1;

    bool cEdge = cp1 >= `+u+`;
    bool rEdge = rp1 >= `+c+`;
  `})(t,r[r.length-1],r[r.length-2],e),i=(function(s,u){var c=s.length,l=(function(h,f){for(var d=[],p=0;p<=1;p++)for(var m=0;m<=1;m++){for(var v=(p===0?"r":"rp1")+", "+(m===0?"c":"cp1"),g=2;g<h;g++)v=f[f.length-1-g]+","+v;d.push(v)}return d})(c,u);return c===1?`getA(rc),
            rc + 1 >= `+s[0]+` ? 0. : getA(rc + 1),
            0, 0`:"getA("+l[0]+`),
          cEdge ? 0. : getA(`+l[1]+`),
          rEdge ? 0. : getA(`+l[2]+`),
          rEdge || cEdge ? 0. : getA(`+l[3]+")"})(r,e);this.userCode=`
        void main() {
          `+n+` rc = getOutputCoords();

          if(`+a+`) {
            setOutput(vec4(0));
          } else {
            `+o+`

            setOutput(vec4(`+i+`));
          }
        }
      `}},Qd=function(r,t,e){this.variableNames=["x"],this.outputShape=t.map((function(u,c){return u[0]+r[c]+u[1]}));var n=r.length,a=Ne(n),o=t.map((function(u){return u[0]})).join(","),i=t.map((function(u,c){return u[0]+r[c]})).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);this.userCode=n!==1?`
      `+a+" start = "+a+"("+o+`);
      `+a+" end = "+a+"("+i+`);

      void main() {
        `+a+` outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(float(`+e+`));
        } else {
          `+a+` coords = outC - start;
          setOutput(getX(`+s+`));
        }
      }
    `:`
        int start = `+o+`;
        int end = `+i+`;

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(float(`+e+`));
          } else {
            setOutput(getX(outC - start));
          }
        }
      `},Zd=function(r,t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((function(v,g){return v[0]+r[g]+v[1]}));for(var n=r.length,a=Ne(n),o=t.map((function(v){return v[0]})).join(","),i=t.map((function(v,g){return v[0]+r[g]})).join(","),s=ct("rc",n),u=ct("source",n),c=s[n-1]+" < "+this.outputShape[n-1],l=n===1?"source":"vec2("+u.slice(-2).join()+")",h=[a+" rc = outputLoc;",s[n-1]+` += 1;
       if(`+c+`) {
      `,n===1?"":`}
       rc = outputLoc;
       `+s[n-2]+` += 1;
       if(`+s[n-2]+" < "+this.outputShape[n-2]+") {",n===1?"":"  "+s[n-1]+` += 1;
         if(`+c+") {"],f=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",d="",p=0,m=n===1?2:4;p<m;p++)d+=`
        `+h[p]+`
        if (`+f+`) {
          result[`+p+"] = float("+e+`);
        } else {
          `+a+` source = rc - start;
          result[`+p+"] = getChannel(getX("+u.join()+"), "+l+`);
        }
      `;d+=n===1?"} ":"}}",this.userCode=`
      const `+a+" start = "+a+"("+o+`);
      const `+a+" end = "+a+"("+i+`);

      void main() {
        `+a+` outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        `+d+`
        setOutput(result);
      }
    `},ro=function(r,t,e){if(this.variableNames=["x"],t==="avg"&&e)throw new Error("Cannot compute positions for average pool.");var n=r.filterWidth,a=r.strideHeight,o=r.strideWidth,i=r.dilationHeight,s=r.dilationWidth,u=r.effectiveFilterHeight,c=r.effectiveFilterWidth,l=r.padInfo.top,h=r.padInfo.left;this.outputShape=r.outShape;var f=t==="avg",d="0.0";if(f||(d="-1.0 / 1e-20"),e)this.userCode=`
        const ivec2 strides = ivec2(`+a+", "+o+`);
        const ivec2 pads = ivec2(`+l+", "+h+`);

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < `+u+`;
              wR += `+i+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+c+`;
                wC += `+s+`) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = wR * `+c+` + wC;
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var p=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(p="avgValue / count");var m=4*Math.floor(n/4),v=n%4,g=`
      if (`+f+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(`+a+", "+o+`);
      const ivec2 pads = ivec2(`+l+", "+h+`);
      const float initializationValue = `+d+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= `+r.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+d+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < `+u+`;
            wR += `+i+`) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= `+r.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+m+`; wC += 4) {
            int xC = xCCorner + wC * `+s+`;

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              getValue(batch, xR, xC + 3 * `+s+`, d)
            );

            `+g+`
          }

          int xC = xCCorner + `+m+`;
          if (`+(v===1)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(v===2)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(v===3)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              initializationValue
            );

            `+g+`
          }
        }
        setOutput(`+p+`);
      }
    `}},ao=function(r,t,e){if(this.variableNames=["x"],t==="avg"&&e)throw new Error("Cannot compute positions for average pool.");var n=r.filterWidth,a=r.strideDepth,o=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.effectiveFilterDepth,h=r.effectiveFilterHeight,f=r.effectiveFilterWidth,d=r.padInfo.front,p=r.padInfo.top,m=r.padInfo.left;this.outputShape=r.outShape;var v=t==="avg",g="0.0";if(v||(g="-1.0 / 1e-20"),e)this.userCode=`
        const ivec3 strides =
            ivec3(`+a+", "+o+", "+i+`);
        const ivec3 pads = ivec3(`+d+", "+p+", "+m+`);

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < `+l+`;
              wD += `+s+`) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= `+r.inDepth+`) {
              continue;
            }

            for (int wR = 0; wR < `+h+`;
                wR += `+u+`) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= `+r.inHeight+`) {
                continue;
              }

              for (int wC = 0; wC < `+f+`;
                  wC += `+c+`) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= `+r.inWidth+`) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition =
                      wD * `+h+" * "+f+` +
                      wR * `+f+` + wC;;
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var y=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="avg"&&(y="avgValue / count");var b=4*Math.floor(n/4),x=n%4,w=`
      if (`+v+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(`+a+", "+o+", "+i+`);
      const ivec3 pads = ivec3(`+d+", "+p+", "+m+`);
      const float initializationValue = `+g+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= `+r.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+g+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= `+r.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`;
            wR += `+u+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+b+`; wC += 4) {
              int xC = xCCorner + wC * `+c+`;

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                getValue(batch, xD, xR, xC + 3 * `+c+`, ch)
              );

              `+w+`
            }

            int xC = xCCorner + `+b+`;
            if (`+(x===1)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(x===2)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(x===3)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                initializationValue
              );

              `+w+`
            }
          }
          setOutput(`+y+`);
        }
      }
    `}},ep=function(r,t){this.variableNames=["x"];var e=r.windowSize,n=r.batchSize,a=r.inSize,o=Math.ceil(a/e);this.outputShape=[n,o];var i="0.0",s="";t==="prod"?i="1.0":t==="min"?(i="1.0 / 1e-20",s="min"):t==="max"&&(i="-1.0 / 1e-20",s="max");var u=t+"("+t+"("+t+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";t==="sum"?u="sumValue":t==="prod"?u="prodValue":t==="all"?u="allValue":t==="any"&&(u="anyValue");var c=4*Math.floor(e/4),l=e%4,h=`
      if (`+(t==="sum")+`) {
        sumValue += dot(values, ones);
      } else if (`+(t==="prod")+`) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = `+s+`(values, minMaxValue);
      }
    `,f="vec4";t==="all"?(i="1.0",h=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,f="bvec4"):t==="any"&&(i="0.0",h=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,f="bvec4");var d="";a%e>0&&(d=`
        if (inIdx < 0 || inIdx >= `+a+`) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = `+i+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        `+d+`
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+e+`;

        vec4 minMaxValue = vec4(`+i+`);
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < `+c+`; i += 4) {
          int inIdx = inOffset + i;
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          `+h+`
        }

        int inIdx = inOffset + `+c+`;
        if (`+(l===1)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l===2)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l===3)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          `+h+`
        }
        setOutput(`+u+`);
      }
    `},tp=function(r,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r;for(var e="",n=0;n<4;n++){var a="thisRC = rc;";n%2==1&&(a+="thisRC.z += 1;"),n>1&&(a+="thisRC.y += 1;"),e+=`
        `+a+`
        `+(n>0?"if(thisRC.y < rows && thisRC.z < cols){":"")+`
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[`+n+`] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        `+(n>0?"}":"")+`
      `}this.userCode=`
      
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      `+In(["r","c","d"],t)+`
      return ivec3(r, c, d);
    }
  
      `+Qo(r)+`

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = `+r[1]+`;
        int cols = `+r[2]+`;

        `+e+`

        setOutput(result);
      }
    `},np=function(r,t,e){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var n=t.shape,a=n[1],o=n[2],i=r.shape,s=i[1],u=i[2],c=[e&&s>1?a-1:a,e&&u>1?o-1:o],l=[e&&s>1?s-1:s,e&&u>1?u-1:u],h=c[0]/l[0],f=c[1]/l[1],d=1/h,p=1/f,m=2*Math.ceil(d)+2,v=2*Math.ceil(p)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+f+`);

        const float invHeightScale = float(`+d+`);
        const float invWidthScale = float(`+p+`);

        const int winHeight = int(`+m+`);
        const int winWidth = int(`+v+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), `+(a-1)+`.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), `+(o-1)+`.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},rp=function(r,t,e,n){this.variableNames=["A"],this.outputShape=[];var a=r[0],o=r[1],i=r[2],s=r[3];this.outputShape=[a,t,e,s];var u=[n&&t>1?o-1:o,n&&e>1?i-1:i],c=[n&&t>1?t-1:t,n&&e>1?e-1:e];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+o+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `},ap=function(r,t,e,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];var a=r[0],o=r[1],i=r[2],s=r[3];this.outputShape=[a,t,e,s];var u=[n&&t>1?o-1:o,n&&e>1?i-1:i],c=[n&&t>1?t-1:t,n&&e>1?e-1:e];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`,
          `+u[1]/c[1]+`);
      const vec3 inputShapeRC = vec3(`+o+".0, "+i+`.0,
                                     `+i+`.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < `+(s-1)+`;
        bool hasNextRow = coords.z < `+(e-1)+`;

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `},op=function(r,t,e){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t.shape;var n=t.shape,a=n[1],o=n[2],i=r.shape,s=i[1],u=i[2],c=[e&&s>1?a-1:a,e&&u>1?o-1:o],l=[e&&s>1?s-1:s,e&&u>1?u-1:u],h=c[0]/l[0],f=c[1]/l[1],d=1/h,p=1/f,m=2*Math.ceil(d)+2,v=2*Math.ceil(p)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+f+`);

        const float invHeightScale = float(`+d+`);
        const float invWidthScale = float(`+p+`);

        const int winHeight = int(`+m+`);
        const int winWidth = int(`+v+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float sourceFracRow =
              float(`+c[0]+`) *
                (float(dyR) / float(`+l[0]+`));

            float sourceFracCol =
                float(`+c[1]+`) *
                  (float(dyC) / float(`+l[1]+`));

            int sourceNearestRow = int(min(
                float(int(`+a+`) - 1),
                `+e+` ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(`+o+`) - 1),
                `+e+` ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},ip=function(r,t,e,n){this.variableNames=["A"],this.outputShape=[];var a=r[0],o=r[1],i=r[2],s=r[3];this.outputShape=[a,t,e,s];var u=[n&&t>1?o-1:o,n&&e>1?i-1:i],c=[n&&t>1?t-1:t,n&&e>1?e-1:e],l=n?"0.5":"0.0";this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+o+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + `+l+`)));

        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `},sp=function(r,t){this.variableNames=["x"];var e=r.length;if(e>4)throw new Error("WebGL backend: Reverse of rank-"+e+" tensor is not yet supported");if(this.outputShape=r,e!==1){var n=r.map((function(o,i){return(function(s){return t.indexOf(s)!==-1&&r[s]!==1?r[s]+" - coords["+s+"] - 1":"coords["+s+"]"})(i)})).join(","),a=Ne(e);this.userCode=`
      void main() {
        `+a+` coords = getOutputCoords();
        setOutput(getX(`+n+`));
      }
    `}else this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(`+r[0]+` - coord - 1));
        }
      `},up=function(r,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;var e=r.length;if(e>4)throw new Error("WebGL backend: Reverse of rank-"+e+" tensor is not yet supported");this.outputShape=r;var n=ct("rc",e),a=n[e-1]+" + 1 < "+this.outputShape[e-1],o=n[e-2]+" + 1 < "+this.outputShape[e-2],i=Ne(e);function s(u){var c=r.map((function(l,h){return(function(f,d){return t.indexOf(f)!==-1&&r[f]!==1?r[f]+" - "+d[f]+" - 1":""+d[f]})(h,u)}));return"getChannel(getX("+c.join(",")+"), vec2("+c.slice(-2).join(",")+"))"}this.userCode=e===1?`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(`+r[0]+` - rc - 1),
            `+r[0]+` - rc - 1);
          if(`+a+`){
              result.g = getChannel(getX(`+r[0]+` - (rc  + 1) - 1),
                `+r[0]+` - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:`
        void main() {
          `+i+` rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = `+(function(u){return s(u)})(n.slice())+`;
          if(`+a+`){
            result.g = `+(function(u){return u[e-1]="("+u[e-1]+" + 1)",s(u)})(n.slice())+`;
          }
          if(`+o+`) {
            result.b = `+(function(u){return u[e-2]="("+u[e-2]+" + 1)",s(u)})(n.slice())+`;
            if(`+a+`) {
              result.a = `+(function(u){return u[e-1]="("+u[e-1]+" + 1)",u[e-2]="("+u[e-2]+" + 1)",s(u)})(n.slice())+`;
            }
          }
          setOutput(result);
        }
    `},Cs=function(r,t,e,n,a,o,i){this.variableNames=["updates","indices","defaultValue"],this.outputShape=o;var s=Ne(a.length),u=Ne(o.length),c="";e===1?c="i":e===2&&(c="i, j");var l="getIndices("+c+")",h="";n===1?h="i":n===2&&(h="i, coords[1]");var f="getUpdates("+h+")",d=t>1?"strides[j]":"strides";this.userCode=`
        `+s+" strides = "+s+"("+a+`);

        void main() {
          `+u+` coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < `+r+`; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < `+t+`; j++) {
              int index = round(`+l+`);
              flattenedIndex += index * `+d+`;
            }
            if (flattenedIndex == coords[0]) {
              sum += `+f+`;
              found = true;
            }
          }
          setOutput(mix(getDefaultValue(), sum, float(found)));
        }
      `},cp=function(r,t){this.variableNames=["x","segmentIds"];var e=r.windowSize,n=r.batchSize,a=r.inSize,o=r.numSegments,i=o*Math.ceil(a/e);this.outputShape=[n,i];var s=4*Math.floor(e/4),u=e%4,c=`
        sumValue += dot(values, segFilter);
    `,l="";a%e>0&&(l=`
        if (inIdx < 0 || inIdx >= `+a+`) {
          return initializationValue;
        }
      `);var h="";a%e>0&&(h=`
        if (inIdx < 0 || inIdx >= `+a+`) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        `+l+`
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        `+h+`
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          `+o+")) * float("+e+`));
        int currentSeg = int(mod(float(outIdx), float(`+o+`)));

        float sumValue = 0.0;

        for (int i = 0; i < `+s+`; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          `+c+`
        }

        int inIdx = inOffset + `+s+`;
        if (`+(u===1)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          `+c+`
        } else if (`+(u===2)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          `+c+`
        } else if (`+(u===3)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          `+c+`
        }
        setOutput(sumValue);
      }
    `},lp=function(r,t,e){var n,a;if(this.variableNames=["c","a","b"],this.outputShape=t,e>4)throw Error("Where for rank "+e+" is not yet supported");if(e===1)a="resRC",n="resRC";else{for(var o=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],s=[],u=0;u<t.length;u++)s.push(""+o[u]),u<r&&i.push(""+o[u]);n=i.join(),a=s.join()}var c=Ne(e);this.userCode=`
      void main() {
        `+c+` resRC = getOutputCoords();
        float cVal = getC(`+n+`);
        if (cVal >= 1.0) {
          setOutput(getA(`+a+`));
        } else {
          setOutput(getB(`+a+`));
        }
      }
    `},hp=(function(){function r(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;var e,n=Ne(this.rank),a="uniform int start["+this.rank+"];",o=(function(i){if(i===1)return"sourceLoc";if(i<=6)return oo.slice(0,i).map((function(s){return"sourceLoc."+s})).join(",");throw Error("Slicing for rank "+i+" is not yet supported")})(this.rank);e=`
        `+n+` sourceLoc;
        `+n+` coords = getOutputCoords();
        `+t.map((function(i,s){return"sourceLoc."+oo[s]+" = start["+s+"] + coords."+oo[s]+";"})).join(`
`)+`
      `,this.userCode=`
      `+a+`
      void main() {
        `+e+`
        setOutput(getSource(`+o+`));
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(n,a){e.startLoc==null&&(e.startLoc=n.getUniformLocationNoThrow(a,"start"),e.startLoc==null)||n.gl.uniform1iv(e.startLoc,t)}},r})(),oo=["x","y","z","w","u","v"],fp=(function(){function r(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length;var e=Ne(this.rank),n=ct("coords",this.rank),a=ct("sourceLoc",this.rank),o=this.rank===1?"sourceLoc":"vec2("+a.slice(-2).join()+")",i="getChannel(getSource("+a.join()+"), "+o+")",s=`
      result.x = `+i+`;
      if (++`+n[this.rank-1]+" < "+t[this.rank-1]+`) {
        ++`+a[this.rank-1]+`;
        result.y = `+i+`;
        --`+a[this.rank-1]+`;
      }
    `,u=this.rank===1?"":`
      --`+n[this.rank-1]+`;
      if (++`+n[this.rank-2]+" < "+t[this.rank-2]+`) {
        ++`+a[this.rank-2]+`;
        result.z = `+i+`;
        if (++`+n[this.rank-1]+" < "+t[this.rank-1]+`) {
          ++`+a[this.rank-1]+`;
          result.w = `+i+`;
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            `+e+"("+t.map((function(l,h){return"start["+h+"]"})).join()+");":t.map((function(l,h){return a[h]+" = "+n[h]+" + start["+h+"];"})).join(`
`);this.userCode=`
      uniform int start[`+this.rank+`];
      void main() {
        `+e+` coords = getOutputCoords();
        `+e+` sourceLoc;
        `+c+`
        vec4 result = vec4(0.);
        `+s+`
        `+u+`
        setOutput(result);
      }
    `}return r.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(n,a){e.startLoc==null&&(e.startLoc=n.getUniformLocationNoThrow(a,"start"),e.startLoc==null)||n.gl.uniform1iv(e.startLoc,t)}},r})(),dp=function(r,t,e){this.variableNames=["x"],this.outputShape=e;var n=e.length,a=Ne(e.length),o=Ne(e.length),i="";if(n===1)i="coords * strides + begin";else{var s=0;i=e.map((function(u,c){return s++,e.length===1?"coords * strides["+c+"] + begin["+c+"]":"coords["+(s-1)+"] * strides["+c+"] + begin["+c+"]"})).join(",")}this.userCode=`
      `+a+" begin = "+a+"("+r+`);
      `+a+" strides = "+a+"("+t+`);

      void main() {
        `+o+` coords = getOutputCoords();
        setOutput(getX(`+i+`));
      }
    `},pp=(function(){function r(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}return r.prototype.acquireTexture=function(t,e,n){var a,o=_s(e,n),i=Es(t,o,n);if(i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]),this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this.log();var s=this.freeTextures[i].shift();return this.usedTextures[i].push(s),s}return this.numUsedTextures++,this.log(),o===vt.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):o===vt.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):o===vt.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):o===vt.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):o===vt.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[i].push(a),a},r.prototype.releaseTexture=function(t,e,n,a){if(this.freeTextures!=null){var o=Es(e,_s(n,a),a);o in this.freeTextures||(this.freeTextures[o]=[]),this.freeTextures[o].push(t),this.numFreeTextures++,this.numUsedTextures--;var i=this.usedTextures[o],s=i.indexOf(t);if(s<0)throw new Error("Cannot release a texture that was never provided by this texture manager");i.splice(s,1),this.log()}},r.prototype.log=function(){if(this.logEnabled){var t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",this.numFreeTextures+" / "+this.numUsedTextures,"("+t+")")}},r.prototype.getNumUsedTextures=function(){return this.numUsedTextures},r.prototype.getNumFreeTextures=function(){return this.numFreeTextures},r.prototype.dispose=function(){var t=this;if(this.freeTextures!=null){for(var e in this.freeTextures)this.freeTextures[e].forEach((function(n){t.gpgpu.deleteMatrixTexture(n)}));for(var e in this.usedTextures)this.usedTextures[e].forEach((function(a){t.gpgpu.deleteMatrixTexture(a)}));this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0}},r})();function _s(r,t){if(r===mt.UPLOAD)return vt.PACKED_2X2_FLOAT32;if(r===mt.RENDER||r==null)return(function(e){return L().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?e?vt.PACKED_2X2_FLOAT32:vt.UNPACKED_FLOAT32:e?vt.PACKED_2X2_FLOAT16:vt.UNPACKED_FLOAT16})(t);if(r===mt.DOWNLOAD||r===mt.PIXELS)return vt.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+r)}function Es(r,t,e){return r[0]+"_"+r[1]+"_"+t+"_"+e}var vp=function(r,t){this.variableNames=["A"];for(var e=new Array(r.length),n=0;n<e.length;n++)e[n]=r[n]*t[n];this.outputShape=e,this.rank=e.length;var a=Ne(this.rank),o=(function(i){var s=i.length;if(s>5)throw Error("Tile for rank "+s+" is not yet supported");if(s===1)return"imod(resRC, "+i[0]+")";for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],c=[],l=0;l<i.length;l++)c.push("imod("+u[l]+", "+i[l]+")");return c.join()})(r);this.userCode=`
      void main() {
        `+a+` resRC = getOutputCoords();
        setOutput(getA(`+o+`));
      }
    `},mp=function(r,t){this.variableNames=["A"];for(var e=new Array(r.length),n=0;n<e.length;n++)e[n]=r[t[n]];this.outputShape=e,this.rank=e.length;var a=Ne(this.rank),o=(function(i){var s=i.length;if(s>6)throw Error("Transpose for rank "+s+" is not yet supported");for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],c=new Array(s),l=0;l<i.length;l++)c[i[l]]=u[l];return c.join()})(t);this.userCode=`
    void main() {
      `+a+` resRC = getOutputCoords();
      setOutput(getA(`+o+`));
    }
    `},gp=function(r,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;for(var e=new Array(r.length),n=0;n<e.length;n++)e[n]=r[t[n]];if(this.outputShape=e,this.rank=e.length,this.rank>6)throw Error("Packed transpose for rank "+this.rank+" is not yet supported.");var a=Ne(this.rank),o=zu("rc",this.rank),i=new Array(this.rank);for(n=0;n<t.length;n++)i[t[n]]=o[n];var s="vec2("+i.slice(-2).join()+")",u="++"+o[this.rank-1]+" < "+e[this.rank-1],c="getChannel(getA("+i.join()+"), "+s+")";this.userCode=`
    void main() {
      `+a+` rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = `+c+`;
      if(`+u+`) {
        result[1] = `+c+`;
      }
      --`+o[this.rank-1]+`;
      if(++`+o[this.rank-2]+" < "+e[this.rank-2]+`) {
        result[2] = `+c+`;
        if(`+u+`) {
          result[3] = `+c+`;
        }
      }
      setOutput(result);
    }
    `},Zo=1.7580993408473768,ei=1.0507009873554805,fe=function(r,t){this.variableNames=["A"],this.outputShape=r,this.userCode=`
      float unaryOperation(float x) {
        `+t+`
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `},Pt="if (isnan(x)) return x;",xp="return x;",ks="return abs(x);",qu=Pt+`
  return (x < 0.0) ? 0.0 : x;
`,Ku=Pt+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,Xu="return (x >= 0.0) ? x : (exp(x) - 1.0);",yp=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = `+Zo+`;
  float scale = `+ei+`;
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,Is="return -x;",Rs="return ceil(x);",Ss="return floor(x);",Ns="return exp(x);",Ds="return exp(x) - 1.0;",bp=Pt+`
  return sin(x);
`,wp=Pt+`
  return cos(x);
`,Cp=Pt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,_p=Pt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,Ep=Pt+`
  return atan(x);
`,kp=Pt+"return log(x + sqrt(x * x + 1.0));",Ip=Pt+`
  if (x < 1.0) return NAN;
  return log(x + sqrt(x * x - 1.0));`,Rp=Pt+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
  return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,Vr="return x;",Sp="return x;",Yu=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,$u=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Ju=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,vr=function(r,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.userCode=`
      vec4 unaryOperation(vec4 x) {
        `+t+`
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `},Np=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=r;var t=r.length,e=ct("rc",t),n=Ne(t),a=(function(s,u){if(s===1)return"rc";for(var c="",l=0;l<s;l++)c+=u[l],l<s-1&&(c+=",");return c})(t,e),o=e.slice(-2),i=t<=1?"rc":"vec2("+o.join(",")+")";this.userCode=`
      void main() {
        `+n+` rc = getOutputCoords();
        vec4 packedInput = getA(`+a+`);

        setOutput(getChannel(packedInput, `+i+`));
      }
    `},Gr={};function Hr(r,t){if(t===void 0&&(t=!1),r==="linear")return t?Sp:xp;if(r==="relu")return t?Yu:qu;if(r==="elu")return t?Ju:Xu;if(r==="relu6")return t?$u:Ku;if(r==="prelu")return t?Hu:Gu;throw new Error("Activation "+r+" has not been implemented for the WebGL backend.")}var Dp=600,Ap=(function(r){function t(e){var n,a=r.call(this)||this;if(a.pendingRead=new WeakMap,a.pendingDisposal=new WeakSet,a.dataRefCount=new WeakMap,a.numBytesInGPU=0,a.uploadWaitMs=0,a.downloadWaitMs=0,a.warnedAboutMemory=!1,a.pendingDeletes=0,a.disposed=!1,!L().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(e==null){var o=qt(L().getNumber("WEBGL_VERSION"));a.binaryCache=((n=L().getNumber("WEBGL_VERSION"))in Gr||(Gr[n]={}),Gr[n]),a.gpgpu=new Ud(o),a.canvas=o.canvas,a.gpgpuCreatedLocally=!0}else a.gpgpu=e,a.binaryCache={},a.gpgpuCreatedLocally=!1,a.canvas=e.gl.canvas;return a.textureManager=new pp(a.gpgpu),a.numMBBeforeWarning=L().global.screen==null?1024:L().global.screen.height*L().global.screen.width*window.devicePixelRatio*Dp/1024/1024,a.texData=new Tu(a,T),a}return Mt(t,r),t.prototype.numDataIds=function(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes},t.prototype.write=function(e,n,a){if(L().getBool("DEBUG")&&this.checkNumericalProblems(e),a==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");var o={};return this.texData.set(o,{shape:n,dtype:a,values:e,usage:mt.UPLOAD}),o},t.prototype.move=function(e,n,a,o){if(L().getBool("DEBUG")&&this.checkNumericalProblems(n),o==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:a,dtype:o,values:n,usage:mt.UPLOAD})},t.prototype.readSync=function(e){var n=this.texData.get(e),a=n.values,o=n.dtype,i=n.complexTensors,s=n.slice,u=n.shape,c=n.isPacked;if(s!=null){var l=void 0;l=c?new vr(u,Vr):new fe(u,Vr);var h=this.runWebGLProgram(l,[{dataId:e,shape:u,dtype:o}],o),f=this.readSync(h.dataId);return this.disposeData(h.dataId),f}if(a!=null)return this.convertAndCacheOnCPU(e);if(o==="string")return a;var d,p,m=this.activeTimers!=null;return m&&(d=Lt()),o==="complex64"?p=Ao(i.real.dataSync(),i.imag.dataSync()):p=this.getValuesFromTexture(e),m&&(this.downloadWaitMs+=Lt()-d),this.convertAndCacheOnCPU(e,p)},t.prototype.read=function(e){return J(this,void 0,void 0,(function(){var n,a,o,i,s,u,c,l,h,f,d,p,m,v,g,y,b,x,w,C,N,I;return Q(this,(function(R){switch(R.label){case 0:if(this.pendingRead.has(e))return n=this.pendingRead.get(e),[2,new Promise((function(S){return n.push(S)}))];if(a=this.texData.get(e),o=a.values,i=a.shape,s=a.slice,u=a.dtype,c=a.complexTensors,l=a.isPacked,s!=null)return h=void 0,h=l?new vr(i,Vr):new fe(i,Vr),f=this.runWebGLProgram(h,[{dataId:e,shape:i,dtype:u}],u),d=this.read(f.dataId),this.disposeData(f.dataId),[2,d];if(o!=null)return[2,this.convertAndCacheOnCPU(e)];if(!L().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&L().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");return p=null,u!=="complex64"&&L().get("WEBGL_BUFFER_SUPPORTED")&&(m=this.decode(e),v=this.texData.get(m.dataId),p=(I=this.gpgpu).createBufferFromTexture.apply(I,[v.texture].concat(mr(i)))),this.pendingRead.set(e,[]),u==="complex64"?[3,2]:[4,this.gpgpu.createAndWaitForFence()];case 1:R.sent(),R.label=2;case 2:return u!=="complex64"?[3,4]:[4,Promise.all([c.real.data(),c.imag.data()])];case 3:return y=R.sent(),b=y[0],x=y[1],g=Ao(b,x),[3,5];case 4:p==null?g=this.getValuesFromTexture(e):(w=Z(i),g=this.gpgpu.downloadFloat32MatrixFromBuffer(p,w)),R.label=5;case 5:return m!=null&&this.disposeData(m.dataId),C=this.convertAndCacheOnCPU(e,g),N=this.pendingRead.get(e),this.pendingRead.delete(e),N.forEach((function(S){return S(C)})),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e),this.pendingDeletes--),[2,C]}}))}))},t.prototype.checkNumericalProblems=function(e){if(e!=null)for(var n=0;n<e.length;n++){var a=e[n];if(!xh(a))throw L().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error("The value "+a+" cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'"):Error("The value "+a+" cannot be represented on this device.")}},t.prototype.getValuesFromTexture=function(e){var n,a=this.texData.get(e),o=a.shape,i=a.dtype,s=a.isPacked,u=Z(o);if(L().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){var c=this.decode(e),l=this.texData.get(c.dataId),h=(n=this.gpgpu).downloadMatrixFromPackedTexture.apply(n,[l.texture].concat(mr(o))).subarray(0,u);return this.disposeData(c.dataId),h}var f=L().getBool("WEBGL_PACK")&&s===!0,d=f?Qa(o):o,p=f?new xd(d):new gd(d),m=this.runWebGLProgram(p,[{shape:d,dtype:i,dataId:e}],"float32"),v=this.texData.get(m.dataId),g=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(v.texture,v.texShape[0],v.texShape[1]).subarray(0,u);return this.disposeData(m.dataId),g},t.prototype.time=function(e){return J(this,void 0,void 0,(function(){var n,a,o,i,s,u,c;return Q(this,(function(l){switch(l.label){case 0:return n=this.activeTimers,a=[],o=!1,this.programTimersStack==null?(this.programTimersStack=a,o=!0):this.activeTimers.push(a),this.activeTimers=a,e(),i=Zn(this.activeTimers.map((function(h){return h.query}))).filter((function(h){return h!=null})),s=Zn(this.activeTimers.map((function(h){return h.name}))).filter((function(h){return h!=null})),this.activeTimers=n,o&&(this.programTimersStack=null),u={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[4,Promise.all(i)]:[3,2];case 1:return c=l.sent(),u.kernelMs=Ql(c),u.getExtraProfileInfo=function(){return c.map((function(h,f){return{name:s[f],ms:h}})).map((function(h){return h.name+": "+h.ms})).join(", ")},[3,3];case 2:u.kernelMs={error:"WebGL query timers are not supported in this environment."},l.label=3;case 3:return this.uploadWaitMs=0,this.downloadWaitMs=0,[2,u]}}))}))},t.prototype.memory=function(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU}},t.prototype.startTimer=function(){return L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:Lt(),endMs:null}},t.prototype.endTimer=function(e){return L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=Lt(),e)},t.prototype.getQueryTime=function(e){return J(this,void 0,void 0,(function(){var n;return Q(this,(function(a){return L().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[2,this.gpgpu.waitForQueryAndGetTime(e)]:[2,(n=e).endMs-n.startMs]}))}))},t.prototype.disposeData=function(e){if(!this.pendingDisposal.has(e)){if(this.pendingRead.has(e))return this.pendingDisposal.add(e),void this.pendingDeletes++;if(this.texData.has(e)){this.releaseGPUData(e);var n=this.texData.get(e).complexTensors;n!=null&&(n.real.dispose(),n.imag.dispose()),this.texData.delete(e)}}},t.prototype.releaseGPUData=function(e){var n=this.texData.get(e),a=n.texture,o=n.dtype,i=n.texShape,s=n.usage,u=n.isPacked,c=n.slice,l=c&&c.origDataId||e,h=this.dataRefCount.get(l);h>1?this.dataRefCount.set(l,h-1):(this.dataRefCount.delete(l),a!=null&&(this.numBytesInGPU-=this.computeBytes(i,o),this.textureManager.releaseTexture(a,i,s,u)));var f=this.texData.get(e);f.texture=null,f.texShape=null,f.isPacked=!1,f.slice=null},t.prototype.getTexture=function(e){return this.uploadToGPU(e),this.texData.get(e).texture},t.prototype.getDataInfo=function(e){return this.texData.get(e)},t.prototype.getCPUBackend=function(){return L().getBool("WEBGL_CPU_FORWARD")?(this.cpuBackend==null&&(this.cpuBackend=T.findBackend("cpu")),this.cpuBackend):null},t.prototype.shouldExecuteOnCPU=function(e,n){var a=this;return n===void 0&&(n=128),this.getCPUBackend()!=null&&e.every((function(o){return a.texData.get(o.dataId).texture==null&&o.size<n}))},t.prototype.getGPGPUContext=function(){return this.gpgpu},t.prototype.complex=function(e,n){var a=this.makeOutput(e.shape,"complex64");return this.texData.get(a.dataId).complexTensors={real:T.keep(e.clone()),imag:T.keep(n.clone())},a},t.prototype.real=function(e){return this.texData.get(e.dataId).complexTensors.real.clone()},t.prototype.imag=function(e){return this.texData.get(e.dataId).complexTensors.imag.clone()},t.prototype.slice=function(e,n,a){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.slice(e,n,a);if(Z(a)===0)return Ye([],a,e.dtype);var o=this.texData.get(e.dataId).isPacked,i=Du(e.shape,n,a);if(o||!i){var s=L().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new fp(a):new hp(a),u=s.getCustomSetupFunc(n);return this.compileAndRun(s,[e],null,u)}return this.uploadToGPU(e.dataId),this.shallowSlice(e,n,a)},t.prototype.shallowSlice=function(e,n,a){var o=this.texData.get(e.dataId),i=this.makeOutput(a,e.dtype),s=this.texData.get(i.dataId);Object.assign(s,o),s.shape=a,s.dtype=e.dtype;var u=Au(n,e.strides);o.slice&&(u+=o.slice.flatOffset),s.slice={flatOffset:u,origDataId:o.slice&&o.slice.origDataId||e.dataId};var c=this.dataRefCount.get(s.slice.origDataId)||1;return this.dataRefCount.set(s.slice.origDataId,c+1),i},t.prototype.stridedSlice=function(e,n,a,o){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.stridedSlice(e,n,a,o);var i=Ko(n,a,o);if(i.some((function(u){return u===0})))return Ye([],i);var s=new dp(n,o,i);return this.compileAndRun(s,[e])},t.prototype.reverse=function(e,n){var a=L().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new up(e.shape,n):new sp(e.shape,n);return this.compileAndRun(a,[e])},t.prototype.concat=function(e,n){if(e[0].dtype==="complex64"){var a=e.map((function(d){return It(d)})),o=e.map((function(d){return jt(d)}));return Ke(this.concat(a,n),this.concat(o,n))}if(this.shouldExecuteOnCPU(e))return this.cpuBackend.concat(e,n);if(e.length===1)return e[0];if(e.length>L().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){var i=Math.floor(e.length/2),s=this.concat(e.slice(0,i),n),u=this.concat(e.slice(i),n);return this.concat([s,u],n)}if(L().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&e[0].rank>1){var c=new rd(e.map((function(d){return d.shape})),n);return this.compileAndRun(c,e)}var l=tr(e.map((function(d){return d.shape})),n),h=e.map((function(d){return d.as2D(-1,Z(d.shape.slice(n)))})),f=new nd(h.map((function(d){return d.shape})));return this.compileAndRun(f,h).reshape(l)},t.prototype.neg=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.neg(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Is,e.dtype);var n=new fe(e.shape,Is);return this.compileAndRun(n,[e])},t.prototype.batchMatMul=function(e,n,a,o){var i=a?e.shape[2]:e.shape[1],s=o?n.shape[1]:n.shape[2],u=a?e.shape[1]:e.shape[2],c=e.shape[0];if((i===1||s===1)&&u>1e3){a&&(e=e.transpose([0,2,1])),o&&(n=n.transpose([0,2,1]));var l=s===1?e:e.as3D(c,u,1),h=s===1?2:1,f=s===1?n.as3D(c,1,u):n;return this.multiply(l,f).sum(h,!0)}var d=Xe(e.dtype,n.dtype),p=new no(e.shape,[c,i,s],a,o);return this.compileAndRun(p,[e,n],d)},t.prototype.fusedBatchMatMul=function(e){var n=e.a,a=e.b,o=e.transposeA,i=e.transposeB,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=o?n.shape[2]:n.shape[1],h=i?a.shape[1]:a.shape[2],f=n.shape[0],d=Xe(n.dtype,a.dtype),p=s!=null,m=c!=null,v=u?Hr(u,!0):null,g=new no(n.shape,[f,l,h],o,i,p,v,m),y=[n,a];return s&&y.push(s),c&&y.push(c),this.compileAndRun(g,y,d)},t.prototype.multiply=function(e,n){if(e.dtype==="complex64"){var a=this.texData.get(e.dataId),o=this.texData.get(n.dataId),i=new ps(Jf,e.shape,n.shape),s=new ps(Qf,e.shape,n.shape),u=[this.makeComplexComponentTensorInfo(e,a.complexTensors.real),this.makeComplexComponentTensorInfo(e,a.complexTensors.imag),this.makeComplexComponentTensorInfo(n,o.complexTensors.real),this.makeComplexComponentTensorInfo(n,o.complexTensors.imag)],c=this.compileAndRun(i,u),l=this.compileAndRun(s,u),h=this.complex(c,l);return c.dispose(),l.dispose(),h}if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.multiply(e,n);if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,vs,e.dtype);var f=new Pe(vs,e.shape,n.shape);return this.compileAndRun(f,[e,n],e.dtype)},t.prototype.batchNormalization=function(e,n,a,o,i,s){var u=[e,n,a],c=null;s!=null&&(c=s.shape,u.push(s));var l=null;if(i!=null&&(l=i.shape,u.push(i)),L().getBool("WEBGL_PACK_NORMALIZATION")){var h=new $f(e.shape,n.shape,a.shape,c,l,o);return this.compileAndRun(h,u)}var f=new Yf(e.shape,n.shape,a.shape,c,l,o);return this.compileAndRun(f,u)},t.prototype.localResponseNormalization4D=function(e,n,a,o,i){var s=L().getBool("WEBGL_PACK_NORMALIZATION")?new qd(e.shape,n,a,o,i):new Gd(e.shape,n,a,o,i);return this.compileAndRun(s,[e])},t.prototype.LRNGrad=function(e,n,a,o,i,s,u){var c=new Hd(n.shape,o,i,s,u);return this.compileAndRun(c,[n,a,e])},t.prototype.tile=function(e,n){if(e.dtype==="string"){var a=this.readSync(e.dataId).map((function(i){return ta(i)}));return Wu(le(e.shape,e.dtype,a),n)}var o=new vp(e.shape,n);return this.compileAndRun(o,[e])},t.prototype.pad=function(e,n,a){var o=L().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Zd(e.shape,n,a):new Qd(e.shape,n,a);return this.compileAndRun(o,[e])},t.prototype.transpose=function(e,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.transpose(e,n);var a=L().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new gp(e.shape,n):new mp(e.shape,n);return this.compileAndRun(a,[e])},t.prototype.gather=function(e,n,a){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.gather(e,n,a);var o=new Ed(e.shape,n.size,a);return this.compileAndRun(o,[e,n])},t.prototype.batchToSpaceND=function(e,n,a){k(e.rank<=4,(function(){return"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet"}));var o=n.reduce((function(h,f){return h*f})),i=sa(e.shape,n,o),s=ua(i.length,n.length),u=ca(e.shape,n,o),c=Iu(a,n.length),l=Ru(u,a,n.length);return e.reshape(i).transpose(s).reshape(u).slice(c,l)},t.prototype.spaceToBatchND=function(e,n,a){k(e.rank<=4,(function(){return"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet"}));var o=n.reduce((function(f,d){return f*d})),i=[[0,0]];i.push.apply(i,a);for(var s=1+n.length;s<e.shape.length;++s)i.push([0,0]);var u=e.pad(i),c=sa(u.shape,n,o,!1),l=ua(c.length,n.length,!1),h=ca(u.shape,n,o,!1);return u.reshape(c).transpose(l).reshape(h)},t.prototype.reduce=function(e,n,a){var o=e.shape[0],i=e.shape[1],s=Za(i),u=new ep({windowSize:s,inSize:i,batchSize:o},n),c=this.compileAndRun(u,[e],a);return c.shape[1]===1?c:this.reduce(c,n,a)},t.prototype.argReduce=function(e,n,a){a===void 0&&(a=null);var o=e.shape[0],i=e.shape[1];a!=null&&(o=a.shape[0],i=a.shape[1]);var s=Za(i),u=new jf({windowSize:s,inSize:i,batchSize:o},n,a==null),c=[e];a!=null&&c.push(a);var l=this.compileAndRun(u,c,"int32");return l.shape[1]===1?l:this.argReduce(e,n,l)},t.prototype.argReducePacked=function(e,n,a){a===void 0&&(a=null);var o=a!=null?a.shape:e.shape,i=Za(o[o.length-1]),s=new qf(o,i,n,a==null),u=a==null?[e]:[e,a],c=this.compileAndRun(s,u,"int32");return c.rank===e.rank?this.argReducePacked(e,n,c):c},t.prototype.sum=function(e,n){pt("sum",n,e.rank);var a=$e(e.shape,n),o=a[0],i=Z(a[1]),s=e.as2D(-1,i),u=Ha(e.dtype);return this.reduce(s,"sum",u).reshape(o)},t.prototype.prod=function(e,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.prod(e,n);var a=$e(e.shape,n),o=a[0],i=Z(a[1]),s=e.as2D(-1,i),u=Ha(e.dtype);return this.reduce(s,"prod",u).reshape(o)},t.prototype.unsortedSegmentSum=function(e,n,a){var o=0,i=Kt([o],e.rank),s=e;i!=null&&(s=e.transpose(i),o=Xt(1,e.rank)[0]);var u=(function(d,p,m){for(var v=[],g=d.length,y=0;y<g;y++)y!==p?v.push(d[y]):v.push(m);return v})(s.shape,o,a),c=Z([s.shape[o]]),l=s.as2D(-1,c),h=Ha(e.dtype),f=this.segOpCompute(l,"unsortedSegmentSum",n,h,a).reshape(u);return i!=null&&(f=f.transpose(Vo(i))),f},t.prototype.segOpCompute=function(e,n,a,o,i){var s=e.shape[0],u=e.shape[1],c=(function(f,d){var p,m=!1;for(f<=Nu?(p=f,m=!0):p=Co(f,Math.floor(Math.sqrt(f)));!m;)p>d||p===f?m=!0:p=Co(f,p+1);return p})(u,i),l=new cp({windowSize:c,inSize:u,batchSize:s,numSegments:i}),h=this.compileAndRun(l,[e,a],o);return h.shape[1]===i?h:(a=ia(0,i).tile([u/c]),this.segOpCompute(h,n,a,o,i))},t.prototype.argMinMaxReduce=function(e,n,a){var o=[n];if(pt("arg"+a.charAt(0).toUpperCase()+a.slice(1),o,e.rank),!L().getBool("WEBGL_PACK_REDUCE")||e.rank<=2){var i=$e(e.shape,o),s=i[0],u=Z(i[1]),c=e.as2D(-1,u);return this.argReduce(c,a).reshape(s)}return this.argReducePacked(e,a)},t.prototype.argMin=function(e,n){return this.argMinMaxReduce(e,n,"min")},t.prototype.argMax=function(e,n){return this.argMinMaxReduce(e,n,"max")},t.prototype.cumsum=function(e,n,a,o){if(n!==e.rank-1)throw new Error("WebGL cumsum shader expects an inner-most axis="+(e.rank-1)+" but got axis="+n);var i=new fd(e.shape,a,o);return this.compileAndRun(i,[e])},t.prototype.equal=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(equal(a, b));
`,"bool");var a=new Pe("return float(a == b);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.notEqual=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(notEqual(a, b));
`,"bool");var a=new Pe("return float(a != b);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.less=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.less(e,n);if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(lessThan(a, b));
`,"bool");var a=new Pe("return float(a < b);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.lessEqual=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(lessThanEqual(a, b));
`,"bool");var a=new Pe("return float(a <= b);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.greater=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.greater(e,n);if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(greaterThan(a, b));
`,"bool");var a=new Pe("return float(a > b);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.greaterEqual=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(greaterThanEqual(a, b));
`,"bool");var a=new Pe("return float(a >= b);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.logicalNot=function(e){var n=new fe(e.shape,"return float(!(x >= 1.0));");return this.compileAndRun(n,[e])},t.prototype.logicalAnd=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,"bool");var a=new Pe("return float(a >= 1.0 && b >= 1.0);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.logicalOr=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,"bool");var a=new Pe("return float(a >= 1.0 || b >= 1.0);",e.shape,n.shape);return this.compileAndRun(a,[e,n],"bool")},t.prototype.select=function(e,n,a){var o=new lp(e.rank,n.shape,n.rank);return this.compileAndRun(o,[e,n,a],Xe(n.dtype,a.dtype))},t.prototype.where=function(e){aa("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");var n=e.dataSync();return Jo(e.shape,n)},t.prototype.topk=function(e,n,a){return ju(e.dataSync(),e.shape,e.dtype,n)},t.prototype.min=function(e,n){pt("min",n,e.rank);var a=$e(e.shape,n),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"min",s.dtype).reshape(o)},t.prototype.minimum=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.minimum(e,n);var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(`
  vec4 result = vec4(min(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Pe(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return min(a, b);
`,e.shape,n.shape);return this.compileAndRun(a,[e,n])},t.prototype.mod=function(e,n){var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(`
  vec4 result = mod(a, b);
  vec4 isNaN = vec4(equal(b, vec4(0.0)));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Pe(`if (b == 0.0) return NAN;
  return mod(a, b);`,e.shape,n.shape);return this.compileAndRun(a,[e,n])},t.prototype.max=function(e,n){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.max(e,n);pt("max",n,e.rank);var a=$e(e.shape,n),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"max",s.dtype).reshape(o)},t.prototype.maximum=function(e,n){if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.maximum(e,n);var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(`
  vec4 result = vec4(max(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Pe(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return max(a, b);
`,e.shape,n.shape);return this.compileAndRun(a,[e,n])},t.prototype.all=function(e,n){pt("all",n,e.rank);var a=$e(e.shape,n),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"all",s.dtype).reshape(o)},t.prototype.any=function(e,n){pt("any",n,e.rank);var a=$e(e.shape,n),o=a[0],i=Z(a[1]),s=e.as2D(-1,i);return this.reduce(s,"any",s.dtype).reshape(o)},t.prototype.realDivide=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,"float32",!0);var a=new Pe(`
if (a == b) {
  return 1.0;
};
return a / b;`,e.shape,n.shape);return this.compileAndRun(a,[e,n],"float32")},t.prototype.floorDiv=function(e,n){if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,"int32");var a=new Pe(`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,e.shape,n.shape);return this.compileAndRun(a,[e,n],"int32")},t.prototype.add=function(e,n){if(e.dtype==="complex64"&&n.dtype==="complex64")return this.complexSeparableBinaryOp(e,n,eo);if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.add(e,n);var a=Xe(e.dtype,n.dtype);if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,eo,a);var o=new Pe(eo,e.shape,n.shape);return this.compileAndRun(o,[e,n],a)},t.prototype.packedUnaryOp=function(e,n,a){var o=new vr(e.shape,n);return this.compileAndRun(o,[e],a)},t.prototype.packedBinaryOp=function(e,n,a,o,i){i===void 0&&(i=!1);var s=new Zt(a,e.shape,n.shape,i);return this.compileAndRun(s,[e,n],o)},t.prototype.complexSeparableBinaryOp=function(e,n,a){var o=this,i=this.texData.get(e.dataId),s=this.texData.get(n.dataId),u=[[i.complexTensors.real,s.complexTensors.real],[i.complexTensors.imag,s.complexTensors.imag]].map((function(f){var d=f[0],p=f[1],m=o.makeComplexComponentTensorInfo(e,d),v=o.makeComplexComponentTensorInfo(n,p),g=new Pe(a,e.shape,n.shape);return o.compileAndRun(g,[m,v],Xe(d.dtype,p.dtype))})),c=u[0],l=u[1],h=this.complex(c,l);return c.dispose(),l.dispose(),h},t.prototype.makeComplexComponentTensorInfo=function(e,n){return{dataId:n.dataId,dtype:n.dtype,shape:e.shape}},t.prototype.addN=function(e){if(e.length===1)return e[0];if(e.length>L().get("WEBGL_MAX_TEXTURES_IN_SHADER")){var n=Math.floor(e.length/2),a=this.addN(e.slice(0,n)),o=this.addN(e.slice(n));return this.addN([a,o])}var i=e.map((function(c){return c.dtype})).reduce((function(c,l){return Xe(c,l)})),s=e.map((function(c){return c.shape})),u=L().getBool("WEBGL_PACK")?new Wf(e[0].shape,s):new Lf(e[0].shape,s);return this.compileAndRun(u,e,i)},t.prototype.subtract=function(e,n){if(e.dtype==="complex64"&&n.dtype==="complex64")return this.complexSeparableBinaryOp(e,n,to);if(this.shouldExecuteOnCPU([e,n]))return this.cpuBackend.subtract(e,n);var a=Xe(e.dtype,n.dtype);if(L().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(e,n,to,e.dtype);var o=new Pe(to,e.shape,n.shape);return this.compileAndRun(o,[e,n],a)},t.prototype.pow=function(e,n){var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Pe(`
if(a < 0.0 && floor(b) < b){
  return NAN;
}
if (b == 0.0) {
  return 1.0;
}
return (round(mod(b, 2.0)) != 1) ?
    pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,e.shape,n.shape),o=Xe(e.dtype,n.dtype);return this.compileAndRun(a,[e,n],o)},t.prototype.ceil=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.ceil(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Rs,e.dtype);var n=new fe(e.shape,Rs);return this.compileAndRun(n,[e])},t.prototype.floor=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.floor(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ss,e.dtype);var n=new fe(e.shape,Ss);return this.compileAndRun(n,[e])},t.prototype.sign=function(e){var n=new fe(e.shape,`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`);return this.compileAndRun(n,[e])},t.prototype.isNaN=function(e){var n=new fe(e.shape,"return float(isnan(x));");return this.compileAndRun(n,[e],"bool")},t.prototype.isInf=function(e){var n=new fe(e.shape,"return float(isinf(x));");return this.compileAndRun(n,[e],"bool")},t.prototype.isFinite=function(e){var n=new fe(e.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(n,[e],"bool")},t.prototype.round=function(e){var n=new fe(e.shape,`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`);return this.compileAndRun(n,[e])},t.prototype.exp=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.exp(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ns,e.dtype);var n=new fe(e.shape,Ns);return this.compileAndRun(n,[e])},t.prototype.expm1=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.expm1(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ds,e.dtype);var n=new fe(e.shape,Ds);return this.compileAndRun(n,[e])},t.prototype.softmax=function(e,n){var a=Ve([n],e.shape),o=this.max(e,a),i=ft(o.shape,a),s=this.subtract(e,o.reshape(i)),u=this.exp(s),c=this.sum(u,a).reshape(i);return this.realDivide(u,c)},t.prototype.log=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.log(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,`
  vec4 result = log(x);
  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));
  result.r = isNaN.r == 1.0 ? NAN : result.r;
  result.g = isNaN.g == 1.0 ? NAN : result.g;
  result.b = isNaN.b == 1.0 ? NAN : result.b;
  result.a = isNaN.a == 1.0 ? NAN : result.a;

  return result;
`,e.dtype);var n=new fe(e.shape,`if (x < 0.0) return NAN;
  return log(x);`);return this.compileAndRun(n,[e])},t.prototype.log1p=function(e){var n=new fe(e.shape,"return log(1.0 + x);");return this.compileAndRun(n,[e])},t.prototype.sqrt=function(e){var n=new fe(e.shape,"return sqrt(x);");return this.compileAndRun(n,[e])},t.prototype.rsqrt=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.rsqrt(e);var n=new fe(e.shape,"return inversesqrt(x);");return this.compileAndRun(n,[e])},t.prototype.reciprocal=function(e){var n=new fe(e.shape,"return 1.0 / x;");return this.compileAndRun(n,[e])},t.prototype.relu=function(e){var n;return n=L().getBool("WEBGL_PACK")?new vr(e.shape,Yu):new fe(e.shape,qu),this.compileAndRun(n,[e])},t.prototype.relu6=function(e){var n;return n=L().getBool("WEBGL_PACK")?new vr(e.shape,$u):new fe(e.shape,Ku),this.compileAndRun(n,[e])},t.prototype.prelu=function(e,n){var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(Hu,e.shape,n.shape):new Pe(Gu,e.shape,n.shape);return this.compileAndRun(a,[e,n])},t.prototype.elu=function(e){if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ju,e.dtype);var n=new fe(e.shape,Xu);return this.compileAndRun(n,[e])},t.prototype.eluDer=function(e,n){var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,e.shape,n.shape):new Pe("return (b >= 1.0) ? a : a * (b + 1.0);",e.shape,n.shape);return this.compileAndRun(a,[e,n])},t.prototype.selu=function(e){var n=new fe(e.shape,yp);return this.compileAndRun(n,[e])},t.prototype.int=function(e){var n=new fe(e.shape,"return float(int(x));");return this.compileAndRun(n,[e],"int32")},t.prototype.clip=function(e,n,a){var o,i=(o=L().getBool("WEBGL_PACK_CLIP")?new ed(e.shape):new Zf(e.shape)).getCustomSetupFunc(n,a);return this.compileAndRun(o,[e],null,i)},t.prototype.abs=function(e){if(this.shouldExecuteOnCPU([e]))return this.cpuBackend.abs(e);if(L().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,ks,e.dtype);var n=new fe(e.shape,ks);return this.compileAndRun(n,[e])},t.prototype.complexAbs=function(e){var n=this.texData.get(e.dataId),a=new td(e.shape),o=[this.makeComplexComponentTensorInfo(e,n.complexTensors.real),this.makeComplexComponentTensorInfo(e,n.complexTensors.imag)];return this.compileAndRun(a,o)},t.prototype.sigmoid=function(e){var n=new fe(e.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(n,[e])},t.prototype.softplus=function(e){var n=new fe(e.shape,`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`);return this.compileAndRun(n,[e])},t.prototype.sin=function(e){var n=new fe(e.shape,bp);return this.compileAndRun(n,[e])},t.prototype.cos=function(e){var n=new fe(e.shape,wp);return this.compileAndRun(n,[e])},t.prototype.tan=function(e){var n=new fe(e.shape,"return tan(x);");return this.compileAndRun(n,[e])},t.prototype.asin=function(e){var n=new fe(e.shape,Cp);return this.compileAndRun(n,[e])},t.prototype.acos=function(e){var n=new fe(e.shape,_p);return this.compileAndRun(n,[e])},t.prototype.atan=function(e){var n=new fe(e.shape,Ep);return this.compileAndRun(n,[e])},t.prototype.atan2=function(e,n){var a=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt(`
  vec4 result = atan(a, b);
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,e.shape,n.shape):new Pe(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return atan(a, b);
`,e.shape,n.shape);return this.compileAndRun(a,[e,n])},t.prototype.sinh=function(e){var n=new fe(e.shape,`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`);return this.compileAndRun(n,[e])},t.prototype.cosh=function(e){var n=new fe(e.shape,`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`);return this.compileAndRun(n,[e])},t.prototype.tanh=function(e){var n=new fe(e.shape,`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`);return this.compileAndRun(n,[e])},t.prototype.asinh=function(e){var n=new fe(e.shape,kp);return this.compileAndRun(n,[e])},t.prototype.acosh=function(e){var n=new fe(e.shape,Ip);return this.compileAndRun(n,[e])},t.prototype.atanh=function(e){var n=new fe(e.shape,Rp);return this.compileAndRun(n,[e])},t.prototype.erf=function(e){var n=new fe(e.shape,`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = 0.3275911;
  float a1 = 0.254829592;
  float a2 = -0.284496736;
  float a3 = 1.421413741;
  float a4 = -1.453152027;
  float a5 = 1.061405429;

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`);return this.compileAndRun(n,[e])},t.prototype.step=function(e,n){var a=new fe(e.shape,(function(o){return o===void 0&&(o=0),Pt+`
    return x > 0.0 ? 1.0 : float(`+o+`);
  `})(n));return this.compileAndRun(a,[e])},t.prototype.conv2dByMatMul=function(e,n,a,o,i,s){var u=e.shape,c=this.texData.get(e.dataId),l=a.inChannels,h=u[0]*u[1]*u[2],f=a.outChannels,d=a.dataFormat==="channelsLast",p=(h===1||f===1)&&l>1e3,m=u[2]%2!=0&&!!c.isPacked;if(p||!L().getBool("WEBGL_LAZILY_UNPACK")||!L().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!m){var v=d?u[0]*u[1]*u[2]:u[0]*u[2]*u[3],g=this.reshape(e,[1,v,a.inChannels]),y=this.reshape(n,[1,a.inChannels,a.outChannels]);return this.reshape(this.fusedBatchMatMul({a:g,b:y,transposeA:!1,transposeB:!1,bias:o,activation:i,preluActivationWeights:s}),a.outShape)}var b=d?u[0]*u[1]*(u[2]+1):u[0]*u[2]*(u[3]+1),x={dataId:e.dataId,shape:[1,b,a.inChannels],dtype:e.dtype},w=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,k(zr(c.shape,x.shape),(function(){return"packed reshape "+c.shape+" to "+x.shape+" isn't free"}));var C=this.reshape(n,[1,a.inChannels,a.outChannels]),N=this.fusedBatchMatMul({a:x,b:C,transposeA:!1,transposeB:!1,bias:o,activation:i,preluActivationWeights:s}),I=this.texData.get(N.dataId);return k(I.isPacked,(function(){return"batchMatMul result is expected to be packed"})),c.shape=w,I.shape=a.outShape,T.makeTensorFromDataId(N.dataId,a.outShape,N.dtype)},t.prototype.conv2dWithIm2Row=function(e,n,a,o,i,s){var u=a.filterWidth,c=a.filterHeight,l=a.inChannels,h=a.outWidth,f=a.outHeight,d=a.dataFormat==="channelsLast",p=u*c*l,m=f*h,v=[p,m],g=e.squeeze([0]),y=n.reshape([1,p,-1]),b=new Vd(v,g.shape,a),x=this.compileAndRun(b,[g]).reshape([1,v[0],v[1]]),w=o!=null,C=s!=null,N=i?Hr(i,!0):null,I=new no(x.shape,[1,m,a.outChannels],!0,!1,w,N,C),R=[x,y];o&&R.push(o),C&&R.push(s);var S=this.compileAndRun(I,R);return d?S.reshape([1,f,h,a.outChannels]):S.reshape([1,a.outChannels,f,h])},t.prototype.fusedConv2d=function(e){var n=e.input,a=e.filter,o=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights;if(o.filterHeight===1&&o.filterWidth===1&&o.dilationHeight===1&&o.dilationWidth===1&&o.strideHeight===1&&o.strideWidth===1&&(o.padInfo.type==="SAME"||o.padInfo.type==="VALID"))return this.conv2dByMatMul(n,a,o,i,s,u);if(L().getBool("WEBGL_CONV_IM2COL")&&n.shape[0]===1)return this.conv2dWithIm2Row(n,a,o,i,s,u);var c=i!=null,l=u!=null,h=s?Hr(s,!1):null,f=new ms(o,c,h,l),d=[n,a];return i&&d.push(i),u&&d.push(u),this.compileAndRun(f,d)},t.prototype.conv2d=function(e,n,a){if(a.filterHeight===1&&a.filterWidth===1&&a.dilationHeight===1&&a.dilationWidth===1&&a.strideHeight===1&&a.strideWidth===1&&(a.padInfo.type==="SAME"||a.padInfo.type==="VALID"))return this.conv2dByMatMul(e,n,a);if(L().getBool("WEBGL_CONV_IM2COL")&&e.shape[0]===1)return this.conv2dWithIm2Row(e,n,a);var o=new ms(a);return this.compileAndRun(o,[e,n])},t.prototype.conv2dDerInput=function(e,n,a){var o=new od(a);return this.compileAndRun(o,[e,n])},t.prototype.conv2dDerFilter=function(e,n,a){var o=new ad(a);return this.compileAndRun(o,[e,n])},t.prototype.fusedDepthwiseConv2D=function(e){var n,a=e.input,o=e.filter,i=e.convInfo,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=L().getBool("WEBGL_PACK_DEPTHWISECONV")&&i.strideWidth<=2&&i.outChannels/i.inChannels==1,h=u?Hr(u,l):null,f=[a,o],d=s!=null,p=c!=null;return d&&f.push(s),p&&f.push(c),l?(n=new xs(i,d,h,p),this.compileAndRun(n,f)):(n=new gs(i,d,h,p),this.compileAndRun(n,f))},t.prototype.depthwiseConv2D=function(e,n,a){var o;return L().getBool("WEBGL_PACK_DEPTHWISECONV")&&a.strideWidth<=2&&a.outChannels/a.inChannels==1?(o=new xs(a),this.compileAndRun(o,[e,n])):(o=new gs(a),this.compileAndRun(o,[e,n]))},t.prototype.depthwiseConv2DDerInput=function(e,n,a){var o=new cd(a);return this.compileAndRun(o,[e,n])},t.prototype.depthwiseConv2DDerFilter=function(e,n,a){var o=new ud(a);return this.compileAndRun(o,[e,n])},t.prototype.conv3d=function(e,n,a){var o=new ld(a);return this.compileAndRun(o,[e,n])},t.prototype.conv3dDerInput=function(e,n,a){var o=new sd(a);return this.compileAndRun(o,[e,n])},t.prototype.conv3dDerFilter=function(e,n,a){var o=new id(a);return this.compileAndRun(o,[e,n])},t.prototype.maxPool=function(e,n){var a=new ro(n,"max",!1);return this.compileAndRun(a,[e])},t.prototype.avgPool=function(e,n){var a=new ro(n,"avg",!1);return this.compileAndRun(a,[e],"float32")},t.prototype.maxPoolBackprop=function(e,n,a,o){var i=new ro(o,"max",!0),s=this.compileAndRun(i,[n]),u=new Kd(o),c=this.compileAndRun(u,[e,s],n.dtype);return s.dispose(),c},t.prototype.avgPoolBackprop=function(e,n,a){var o=new Kf(a);return this.compileAndRun(o,[e],n.dtype)},t.prototype.cast=function(e,n){return Pu(e,n,this)},t.prototype.unstack=function(e,n){for(var a=e.shape[n],o=new Array(e.rank-1),i=0,s=0;s<e.rank;s++)s!==n&&(o[i++]=e.shape[s]);var u=new Array(e.rank).fill(0),c=e.shape.slice();c[n]=1;var l=new Array(a);for(s=0;s<l.length;s++)u[n]=s,l[s]=this.slice(e,u,c).reshape(o);return l},t.prototype.avgPool3d=function(e,n){var a=new ao(n,"avg",!1);return this.compileAndRun(a,[e],"float32")},t.prototype.avgPool3dBackprop=function(e,n,a){var o=new Xf(a);return this.compileAndRun(o,[e],n.dtype)},t.prototype.maxPool3d=function(e,n){var a=new ao(n,"max",!1);return this.compileAndRun(a,[e],"float32")},t.prototype.maxPool3dBackprop=function(e,n,a,o){var i=new ao(o,"max",!0),s=this.compileAndRun(i,[n]),u=new Xd(o),c=this.compileAndRun(u,[e,s],n.dtype);return s.dispose(),c},t.prototype.reshape=function(e,n){var a=this.texData.get(e.dataId);if(a.isPacked&&!zr(e.shape,n)&&(a.texture===null||!zr(a.shape,n))){var o=this.packedReshape(e,n);return T.makeTensorFromDataId(o.dataId,o.shape,o.dtype)}return Do(e,n)},t.prototype.resizeBilinear=function(e,n,a,o){var i=L().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ap(e.shape,n,a,o):new rp(e.shape,n,a,o);return this.compileAndRun(i,[e],"float32")},t.prototype.resizeBilinearBackprop=function(e,n,a){var o=new np(e,n,a);return this.compileAndRun(o,[e])},t.prototype.resizeNearestNeighbor=function(e,n,a,o){var i=new ip(e.shape,n,a,o);return this.compileAndRun(i,[e])},t.prototype.resizeNearestNeighborBackprop=function(e,n,a){var o=new op(e,n,a);return this.compileAndRun(o,[e])},t.prototype.multinomial=function(e,n,a,o){var i=n?e:nn(e),s=i.shape[0],u=i.shape[1],c=new Yd(s,u,a),l=c.getCustomSetupFunc(o);return this.compileAndRun(c,[i],"int32",l)},t.prototype.oneHot=function(e,n,a,o){var i=new $d(e.size,n,a,o);return this.compileAndRun(i,[e])},t.prototype.diag=function(e){var n=new md(e.size);return this.compileAndRun(n,[e])},t.prototype.nonMaxSuppression=function(e,n,a,o,i){return aa("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead"),Yo(e.dataSync(),n.dataSync(),a,o,i)},t.prototype.cropAndResize=function(e,n,a,o,i,s){var u=new hd(e.shape,n.shape,o,i,s);return this.compileAndRun(u,[e,n,a],"float32")},t.prototype.depthToSpace=function(e,n,a){k(n>1,(function(){return"blockSize should be > 1 for depthToSpace, but was: "+n}));var o=e.shape[0],i=a==="NHWC"?e.shape[1]:e.shape[2],s=a==="NHWC"?e.shape[2]:e.shape[3],u=a==="NHWC"?e.shape[3]:e.shape[1],c=i*n,l=s*n,h=u/(n*n),f=new vd(a==="NHWC"?[o,c,l,h]:[o,h,c,l],n,a);return this.compileAndRun(f,[e])},t.prototype.split=function(e,n,a){return Lu(e,n,a)},t.prototype.scatterND=function(e,n,a){var o=la(0,e,a),i=o.sliceRank,s=o.numUpdates,u=o.sliceSize,c=o.strides,l=o.outputSize,h=[l/u,u],f=e.reshape([s,i]),d=n.reshape([s,u]);if(l===0)return Do(Ye([]),a);var p=K(0),m=new Cs(s,i,f.rank,d.rank,c,h);return this.compileAndRun(m,[d,f,p]).reshape(a)},t.prototype.sparseToDense=function(e,n,a,o){var i=la(0,e,a),s=i.sliceRank,u=i.numUpdates,c=i.strides,l=i.outputSize,h=new Cs(u,s,e.rank,n.rank,c,[l,1]);return this.compileAndRun(h,[n,e,o]).reshape(a)},t.prototype.fft=function(e){return this.fftImpl(e,!1)},t.prototype.ifft=function(e){return this.fftImpl(e,!0)},t.prototype.fftImpl=function(e,n){var a=this.texData.get(e.dataId),o=new bs(wd,e.shape,n),i=new bs(Cd,e.shape,n),s=[this.makeComplexComponentTensorInfo(e,a.complexTensors.real),this.makeComplexComponentTensorInfo(e,a.complexTensors.imag)],u=this.compileAndRun(o,s),c=this.compileAndRun(i,s),l=this.complex(u,c).as2D(e.shape[0],e.shape[1]);return u.dispose(),c.dispose(),l},t.prototype.gatherND=function(e,n){var a=n.shape,o=a[a.length-1],i=Su(e,n),s=i[0],u=i[1],c=i[2],l=i[3],h=n.reshape([u,o]),f=e.reshape([e.size/c,c]),d=new kd(o,l,[u,c]);return this.compileAndRun(d,[f,h]).reshape(s)},t.prototype.fill=function(e,n,a){if((a=a||Ir(n))==="string"){var o=ea(a,Z(e));return o.fill(n),T.makeTensor(o,e,a,this)}var i=new _d(e,n),s=i.getCustomSetupFunc(n);return this.compileAndRun(i,[],a,s)},t.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported under string dtype");return this.fill(e.shape,1,e.dtype)},t.prototype.zerosLike=function(e){return this.fill(e.shape,e.dtype==="string"?"":0,e.dtype)},t.prototype.linspace=function(e,n,a){return Ou(e,n,a)},t.prototype.makeTensorInfo=function(e,n){var a=this.write(null,e,n);return this.texData.get(a).usage=null,{dataId:a,shape:e,dtype:n}},t.prototype.makeOutput=function(e,n){var a=this.makeTensorInfo(e,n).dataId;return T.makeTensorFromDataId(a,e,n,this)},t.prototype.unpackTensor=function(e){var n=new Np(e.shape);return this.runWebGLProgram(n,[e],e.dtype)},t.prototype.packTensor=function(e){var n=new Jd(e.shape);return this.runWebGLProgram(n,[e],e.dtype,null,!0)},t.prototype.packedReshape=function(e,n){var a=[na(e.shape)].concat(ra(e.shape)),o={dtype:e.dtype,shape:a,dataId:e.dataId},i=[na(n)].concat(ra(n)),s=new tp(i,a),u=this.runWebGLProgram(s,[o],e.dtype,null,!0);return{dataId:u.dataId,shape:n,dtype:u.dtype}},t.prototype.decode=function(e){var n,a=this.texData.get(e),o=a.isPacked,i=a.shape,s=a.dtype,u=Qa(i);return n=o?new pd(u):new dd(u),{dtype:s,shape:i,dataId:this.runWebGLProgram(n,[{shape:u,dtype:s,dataId:e}],s,null,!0).dataId}},t.prototype.runWebGLProgram=function(e,n,a,o,i){var s=this;i===void 0&&(i=!1);var u=this.makeTensorInfo(e.outputShape,a),c=this.texData.get(u.dataId);if(e.packedOutput&&(c.isPacked=!0),e.outPackingScheme===wr.DENSE){var l=mr(e.outputShape);c.texShape=l.map((function(b){return 2*b}))}if(e.outTexUsage!=null&&(c.usage=e.outTexUsage),Z(u.shape)===0)return c.values=yr(u.dtype,0),u;var h=[],f=n.map((function(b){if(b.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");var x=s.texData.get(b.dataId);if(x.texture==null){if(!e.packedInputs&&Z(b.shape)<=L().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:b.shape,texData:null,isUniform:!0,uniformValues:x.values};e.packedInputs&&(x.isPacked=!0,x.shape=b.shape)}else if(!!x.isPacked!=!!e.packedInputs)b=x.isPacked?s.unpackTensor(b):s.packTensor(b),h.push(b),x=s.texData.get(b.dataId);else if(x.isPacked&&!zr(x.shape,b.shape)){var w=b,C=b.shape;b.shape=x.shape,b=s.packedReshape(b,C),h.push(b),x=s.texData.get(b.dataId),w.shape=C}return s.uploadToGPU(b.dataId),{shape:b.shape,texData:x,isUniform:!1}}));this.uploadToGPU(u.dataId);var d,p={shape:u.shape,texData:c,isUniform:!1},m=(function(b,x,w){var C="";x.concat(w).forEach((function(R){var S=R.texData!=null&&R.texData.slice!=null&&R.texData.slice.flatOffset>0,F=R.isUniform?"uniform":R.texData.texShape;C+=R.shape+"_"+F+"_"+S}));var N=b.userCode,I=b.constructor.name;return I+="_"+C+"_"+N})(e,f,p),v=this.getAndSaveBinary(m,(function(){return(function(b,x,w,C){var N=x.userCode,I=w.map((function(j,G){var q={logicalShape:j.shape,texShape:j.isUniform?null:j.texData.texShape,isUniform:j.isUniform,isPacked:!j.isUniform&&j.texData.isPacked,flatOffset:null};return j.texData!=null&&j.texData.slice!=null&&j.texData.slice.flatOffset>0&&(q.flatOffset=j.texData.slice.flatOffset),{name:x.variableNames[G],shapeInfo:q}})),R=I.map((function(j){return j.shapeInfo})),S={logicalShape:C.shape,texShape:C.texData.texShape,isUniform:!1,isPacked:C.texData.isPacked,flatOffset:null},F=zf(I,S,N,x.packedInputs),A=b.createProgram(F),W=null,B=b.getUniformLocation(A,"NAN",!1);L().getNumber("WEBGL_VERSION")===1&&(W=b.getUniformLocation(A,"INFINITY",!1));for(var O={},U=0;U<x.variableNames.length;U++){var z=x.variableNames[U];O[z]=b.getUniformLocation(A,z,!1),O["offset"+z]=b.getUniformLocation(A,"offset"+z,!1)}return{program:x,source:F,webGLProgram:A,uniformLocations:O,inShapeInfos:R,outShapeInfo:S,infLoc:W,nanLoc:B}})(s.gpgpu,e,f,p)})),g=this.activeTimers!=null;if(g&&(d=this.startTimer()),(function(b,x,w,C,N){ws(x.inShapeInfos,w),ws([x.outShapeInfo],[C]);var I=C.texData.texture,R=C.texData.texShape;C.texData.isPacked?b.setOutputPackedMatrixTexture(I,R[0],R[1]):b.setOutputMatrixTexture(I,R[0],R[1]),b.setProgram(x.webGLProgram),L().getNumber("WEBGL_VERSION")===1&&x.infLoc!==null&&b.gl.uniform1f(x.infLoc,1/0),x.nanLoc!==null&&b.gl.uniform1f(x.nanLoc,NaN),w.forEach((function(S,F){var A=x.program.variableNames[F],W=x.uniformLocations[A],B=x.uniformLocations["offset"+A];if(W!=null)if(S.isUniform)if(Z(S.shape)<2)b.gl.uniform1f(W,S.uniformValues[0]);else{var O=S.uniformValues;O instanceof Float32Array||(O=new Float32Array(O)),b.gl.uniform1fv(W,O)}else S.texData.slice!=null&&B!=null&&b.gl.uniform1i(B,S.texData.slice.flatOffset),b.setInputMatrixTexture(S.texData.texture,W,F)})),N!=null&&N(b,x.webGLProgram),b.executeProgram()})(this.gpgpu,v,f,p,o),h.forEach((function(b){return s.disposeData(b.dataId)})),g&&(d=this.endTimer(d),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(d)})),!L().getBool("WEBGL_LAZILY_UNPACK")&&c.isPacked&&i===!1){var y=this.unpackTensor(u);return this.disposeData(u.dataId),y}return u},t.prototype.compileAndRun=function(e,n,a,o,i){i===void 0&&(i=!1),a=a||n[0].dtype;var s=this.runWebGLProgram(e,n,a,o,i);return T.makeTensorFromDataId(s.dataId,s.shape,s.dtype)},t.prototype.getAndSaveBinary=function(e,n){return e in this.binaryCache||(this.binaryCache[e]=n()),this.binaryCache[e]},t.prototype.getTextureManager=function(){return this.textureManager},t.prototype.dispose=function(){var e=this;this.disposed||(L().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach((function(n){e.gpgpu.deleteProgram(e.binaryCache[n].webGLProgram),delete e.binaryCache[n]})),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)},t.prototype.floatPrecision=function(){var e=this;return this.floatPrecisionValue==null&&(this.floatPrecisionValue=Y((function(){if(!L().get("WEBGL_RENDER_FLOAT32_ENABLED")){var n=L().getBool("DEBUG");L().set("DEBUG",!1);var a=e.abs(K(1e-8)).dataSync()[0];if(L().set("DEBUG",n),a>0)return 32}return 16}))),this.floatPrecisionValue},t.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},t.prototype.uploadToGPU=function(e){var n,a=this.texData.get(e),o=a.shape,i=a.dtype,s=a.values,u=a.texture,c=a.usage,l=a.isPacked;if(u==null){var h,f=this.activeTimers!=null;f&&(h=Lt());var d=a.texShape;if(d==null&&(d=Oh(o,l),a.texShape=d),s!=null){var p=Qa(o),m=void 0,v=d[1],g=d[0],y=s instanceof Uint8Array;l?(v=(n=Sr(d[0],d[1]))[0],g=n[1],m=new bd(p,[g,v],y)):m=new yd(p,[g,v],y);var b=this.makeTensorInfo([g,v],i);this.texData.get(b.dataId).usage=y?mt.PIXELS:mt.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),v,g,s);var x=this.runWebGLProgram(m,[b],i,null,!0),w=this.texData.get(x.dataId);a.texture=w.texture,a.texShape=w.texShape,a.isPacked=w.isPacked,a.usage=w.usage,this.disposeData(b.dataId),this.texData.delete(x.dataId),a.values=null,f&&(this.uploadWaitMs+=Lt()-h)}else{var C=this.acquireTexture(d,c,i,l);a.texture=C}}},t.prototype.convertAndCacheOnCPU=function(e,n){var a=this.texData.get(e),o=a.dtype;return this.releaseGPUData(e),n!=null&&(a.values=(function(i,s){if(s==="float32"||s==="complex64")return i;if(s==="int32"||s==="bool"){for(var u=s==="int32"?new Int32Array(i.length):new Uint8Array(i.length),c=0;c<u.length;++c)u[c]=Math.round(i[c]);return u}throw new Error("Unknown dtype "+s)})(n,o)),a.values},t.prototype.acquireTexture=function(e,n,a,o){if(this.numBytesInGPU+=this.computeBytes(e,a),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){var i=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn("High memory usage in GPU: "+i+" MB, most likely due to a memory leak")}return this.textureManager.acquireTexture(e,n,o)},t.prototype.computeBytes=function(e,n){return e[0]*e[1]*lu(n)},t})(Fu);gu()&&T.registerBackend("webgl",(function(){return new Ap}),2);var Tp=D({square_:function(r){var t=_(r,"x","square"),e=[t];return T.runKernelFunc((function(n,a){return a([t]),n.square(t)}),{x:t},null,"Square",{},e,[])}}),_r="SquaredDifference",Qu=D({squaredDifference_:function(r,t){var e,n=_(r,"a","squaredDifference"),a=_(t,"b","squaredDifference");e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape);var o={a:n,b:a},i=[n,a];return T.runKernelFunc((function(s,u){var c=s.squaredDifference(n,a);return u([n,a]),c}),o,(function(s,u){var c=u[0],l=u[1],h=K(2);return{a:function(){return s.mul(c.sub(l).mul(h))},b:function(){return s.mul(l.sub(c).mul(h))}}}),_r,{},i,[])}}),Fp=D({abs_:function(r){var t=_(r,"x","abs");return t.dtype==="complex64"?T.runKernelFunc((function(e){return e.complexAbs(t)}),{$x:t}):T.runKernelFunc((function(e,n){var a=e.abs(t);return n([t]),a}),{x:t},(function(e,n){var a=n[0];return{x:function(){return e.mul(a.toFloat().step(-1))}}}),"Abs")}}),Mp=D({acos_:function(r){var t=_(r,"x","acos");return T.runKernelFunc((function(e,n){var a=e.acos(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.divStrict(K(1).sub(a.toFloat().square()).sqrt()).neg()}}}))}}),Pp=D({acosh_:function(r){var t=_(r,"x","acosh");return T.runKernelFunc((function(e,n){var a=e.acosh(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.divStrict(a.toFloat().square().sub(1).sqrt())}}}))}}),Op=D({asin_:function(r){var t=_(r,"x","asin");return T.runKernelFunc((function(e,n){var a=e.asin(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.divStrict(K(1).sub(a.toFloat().square()).sqrt())}}}))}}),Bp=D({asinh_:function(r){var t=_(r,"x","asinh");return T.runKernelFunc((function(e,n){var a=e.asinh(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.divStrict(K(1).add(a.toFloat().square()).sqrt())}}}))}}),Lp=D({atan_:function(r){var t=_(r,"x","atan");return T.runKernelFunc((function(e,n){var a=e.atan(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.div(a.toFloat().square().add(1))}}}))}}),Wp=D({atanh_:function(r){var t=_(r,"x","atanh");return T.runKernelFunc((function(e,n){var a=e.atanh(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.div(K(1).sub(a.toFloat().square()))}}}))}}),jp=D({ceil_:function(r){var t=_(r,"x","ceil");return T.runKernelFunc((function(e){return e.ceil(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),ti=D({clipByValue_:function(r,t,e){var n=_(r,"x","clipByValue");k(t<=e,(function(){return"Error in clip: min ("+t+") must be less than or equal to max ("+e+")."}));var a=[n],o={min:t,max:e};return T.runKernelFunc((function(i,s){var u=i.clip(n,t,e);return s([n]),u}),{x:n},(function(i,s){var u=s[0];return{x:function(){return i.where(u.greaterEqual(t).logicalAnd(u.lessEqual(e)),Ce(i))}}}),"ClipByValue",o,a)}}),zp=D({cos_:function(r){var t=_(r,"x","cos"),e=[t];return T.runKernelFunc((function(n,a){var o=n.cos(t);return a([t]),o}),{x:t},(function(n,a){var o=a[0];return{x:function(){return o.toFloat().sin().neg().mul(n)}}}),"Cos",{},e)}}),Up=D({cosh_:function(r){var t=_(r,"x","cosh");return T.runKernelFunc((function(e,n){var a=e.cosh(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return a.toFloat().sinh().mulStrict(e)}}}))}}),Vp=D({erf_:function(r){var t=_(r,"x","erf");return k(t.dtype==="int32"||t.dtype==="float32",(function(){return"Input dtype must be `int32` or `float32`."})),t.dtype==="int32"&&(t=t.toFloat()),T.runKernelFunc((function(e,n){var a=e.erf(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.mul(a.square().neg().exp().mul(2/Math.sqrt(Math.PI)))}}}))}}),To=D({exp_:function(r){var t=_(r,"x","exp");return T.runKernelFunc((function(e,n){var a=e.exp(t);return n([a]),a}),{x:t},(function(e,n){return{x:function(){return e.mulStrict(n[0])}}}),"Exp",{},[],[!0])}}),Gp=D({expm1_:function(r){var t=_(r,"x","expm1");return T.runKernelFunc((function(e,n){var a=e.expm1(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.mul(a.exp())}}}))}}),Hp=D({floor_:function(r){var t=_(r,"x","floor");return T.runKernelFunc((function(e){return e.floor(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),qp=D({log_:function(r){var t=_(r,"x","log"),e=[t];return T.runKernelFunc((function(n,a){var o=n.log(t);return a([t]),o}),{x:t},(function(n,a){var o=a[0];return{x:function(){return n.div(o.toFloat())}}}),"Log",{},e)}}),Kp=D({log1p_:function(r){var t=_(r,"x","log1p");return T.runKernelFunc((function(e,n){var a=e.log1p(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.div(a.add(1))}}}))}}),Xp=D({logSigmoid_:function(r){var t=_(r,"x","logSigmoid");return T.runKernelFunc((function(e,n){var a=e.softplus(t.neg()).neg();return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.mul(a.neg().sigmoid())}}}))}}),pa=D({neg_:function(r){var t=_(r,"x","neg"),e=[t];return T.runKernelFunc((function(n){return n.neg(t)}),{x:t},(function(n){return{x:function(){return n.neg()}}}),"Neg",{},e)}}),Yp=D({reciprocal_:function(r){var t=_(r,"x","reciprocal");return T.runKernelFunc((function(e,n){var a=e.reciprocal(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.div(a.square().neg())}}}))}}),$p=D({round_:function(r){var t=_(r,"x","round");return T.runKernelFunc((function(e){return e.round(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),Zu=D({rsqrt_:function(r){var t=_(r,"x","rsqrt"),e=[t];return T.runKernelFunc((function(n,a){var o=n.rsqrt(t);return a([t]),o}),{x:t},(function(n,a){var o=a[0];return{x:function(){return n.div(o.pow(1.5).mul(2)).neg()}}}),"Rsqrt",{},e)}}),ec=D({sigmoid_:function(r){var t=_(r,"x","sigmoid");return T.runKernelFunc((function(e,n){var a=e.sigmoid(t);return n([a]),a}),{x:t},(function(e,n){var a=n[0];return{x:function(){return e.mul(a.mul(K(1).sub(a)))}}}),"Sigmoid")}}),Jp=D({sign_:function(r){var t=_(r,"x","sign");return T.runKernelFunc((function(e){return e.sign(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),Qp=D({isNaN_:function(r){var t=_(r,"x","isNaN");return T.runKernelFunc((function(e){return e.isNaN(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),Zp=D({isInf_:function(r){var t=_(r,"x","isInf");return T.runKernelFunc((function(e){return e.isInf(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),ev=D({isFinite_:function(r){var t=_(r,"x","isFinite");return T.runKernelFunc((function(e){return e.isFinite(t)}),{$x:t},(function(e){return{$x:function(){return Ce(e)}}}))}}),tv=D({sin_:function(r){var t=_(r,"x","sin"),e=[t];return T.runKernelFunc((function(n,a){var o=n.sin(t);return a([t]),o}),{x:t},(function(n,a){var o=a[0];return{x:function(){return o.toFloat().cos().mul(n)}}}),"Sin",{},e)}}),nv=D({sinh_:function(r){var t=_(r,"x","sinh");return T.runKernelFunc((function(e,n){var a=e.sinh(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return a.toFloat().cosh().mulStrict(e)}}}))}}),rv=D({softplus_:function(r){var t=_(r,"x","softplus");return T.runKernelFunc((function(e,n){var a=e.softplus(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.mul(a.sigmoid())}}}))}}),av=D({sqrt_:function(r){var t=_(r,"x","sqrt");return T.runKernelFunc((function(e,n){var a=e.sqrt(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.div(a.toFloat().sqrt().mul(2))}}}))}}),ov=D({step_:function(r,t){t===void 0&&(t=0);var e=_(r,"x","step");return T.runKernelFunc((function(n){return n.step(e,t)}),{$x:e},(function(n){return{$x:function(){return Ce(n)}}}))}}),iv=D({tan_:function(r){var t=_(r,"x","tan");return T.runKernelFunc((function(e,n){var a=e.tan(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return e.div(a.cos().square())}}}))}}),sv=D({tanh_:function(r){var t=_(r,"x","tanh");return T.runKernelFunc((function(e,n){var a=e.tanh(t);return n([a]),a}),{x:t},(function(e,n){var a=n[0];return{x:function(){return K(1).sub(a.square()).mulStrict(e)}}}),"Tanh",{},null,[!0])}});function tc(r,t,e,n,a,o){var i,s,u=_(r,"x","batchNorm"),c=_(t,"mean","batchNorm"),l=_(e,"variance","batchNorm");return a!=null&&(i=_(a,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),k(u.rank===2,(function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."})),k(c.rank===2||c.rank===1,(function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank "+c.rank+"."})),k(l.rank===2||l.rank===1,(function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank "+l.rank+"."})),i!=null&&k(i.rank===2||i.rank===1,(function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank "+i.rank+"."})),s!=null&&k(s.rank===2||s.rank===1,(function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank "+s.rank+"."})),Dr(u,c,l,s,i,o)}function nc(r,t,e,n,a,o){var i,s,u=_(r,"x","batchNorm"),c=_(t,"mean","batchNorm"),l=_(e,"variance","batchNorm");return a!=null&&(i=_(a,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),k(u.rank===3,(function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."})),k(c.rank===3||c.rank===1,(function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank "+c.rank+"."})),k(l.rank===3||l.rank===1,(function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank "+l.rank+"."})),i!=null&&k(i.rank===3||i.rank===1,(function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank "+i.rank+"."})),s!=null&&k(s.rank===3||s.rank===1,(function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank "+s.rank+"."})),Dr(u,c,l,s,i,o)}function rc(r,t,e,n,a,o){var i,s,u=_(r,"x","batchNorm"),c=_(t,"mean","batchNorm"),l=_(e,"variance","batchNorm");return a!=null&&(i=_(a,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),k(u.rank===4,(function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+u.rank+"."})),k(c.rank===4||c.rank===1,(function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank "+c.rank+"."})),k(l.rank===4||l.rank===1,(function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank "+l.rank+"."})),i!=null&&k(i.rank===4||i.rank===1,(function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank "+i.rank+"."})),s!=null&&k(s.rank===4||s.rank===1,(function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank "+s.rank+"."})),Dr(u,c,l,s,i,o)}function Dr(r,t,e,n,a,o){o==null&&(o=.001);var i,s,u,c=_(r,"x","batchNorm"),l=_(t,"mean","batchNorm"),h=_(e,"variance","batchNorm");a!=null&&(i=_(a,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),k(l.rank===h.rank,(function(){return"Batch normalization gradient requires mean and variance to have equal ranks."})),k(s==null||l.rank===s.rank,(function(){return"Batch normalization gradient requires mean and offset to have equal ranks."})),k(i==null||l.rank===i.rank,(function(){return"Batch normalization gradient requires mean and scale to have equal ranks."})),u=c.rank===0||c.rank===1?c.as4D(1,1,1,c.size):c.rank===2?c.as4D(1,1,c.shape[0],c.shape[1]):c.rank===3?c.as4D(1,c.shape[0],c.shape[1],c.shape[2]):c;var f=[c,l,h,i];return T.runKernelFunc((function(d,p){var m=d.batchNormalization(u,qr(l),qr(h),o,qr(i),qr(s));return p([c,l,h,i]),m}),{x:c,mean:l,variance:h,scale:i,offset:s},(function(d,p){var m=p,v=m[0],g=m[1],y=m[2],b=m[3],x=b??K(1),w=ze(g.shape,u.shape),C=[];if(g.rank===1){for(var N=0;N<u.shape.length-1;++N)C.push(u.shape[N]);C.push(1)}var I=v.sub(g),R=d.mul(x),S=Zu(y.add(K(o))),F=S.mul(S).mul(S).mul(K(-.5));return{x:function(){return g.rank===1?d.mul(qn(S.as4D(1,1,1,g.shape[0]),C)).mul(x).reshape(v.shape):d.mul(S).mul(x).reshape(v.shape)},mean:function(){var A=S.mul(K(-1)).mul(R);return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)},variance:function(){var A=F.mul(I).mul(R);return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)},scale:function(){var A=I.mul(S),W=d.mul(A);return g.rank===1&&(W=W.sum(w)),W.reshape(g.shape)},offset:function(){var A=d;return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)}}}),"BatchNormalization",{varianceEpsilon:o},f).reshape(c.shape)}function qr(r){return r==null?null:r.rank===0?r.as1D():r.rank===1?r:r.rank===2?r.as4D(1,1,r.shape[0],r.shape[1]):r.rank===3?r.as4D(1,r.shape[0],r.shape[1],r.shape[2]):r}function ka(){xu("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon")}var uv=D({batchNormalization2d_:function(r,t,e,n,a,o){return n===void 0&&(n=.001),ka(),tc(r,t,e,o,a,n)}}),cv=D({batchNormalization3d_:function(r,t,e,n,a,o){return n===void 0&&(n=.001),ka(),nc(r,t,e,o,a,n)}}),lv=D({batchNormalization4d_:function(r,t,e,n,a,o){return n===void 0&&(n=.001),ka(),rc(r,t,e,o,a,n)}}),hv=D({batchNormalization_:function(r,t,e,n,a,o){return n===void 0&&(n=.001),ka(),Dr(r,t,e,o,a,n)}}),ac=D({batchNorm_:Dr}),fv=D({batchNorm2d_:tc}),dv=D({batchNorm3d_:nc}),pv=D({batchNorm4d_:rc}),Ia=D({logicalAnd_:function(r,t){var e=_(r,"a","logicalAnd","bool"),n=_(t,"b","logicalAnd","bool");return be(e.shape,n.shape),T.runKernelFunc((function(a){return a.logicalAnd(e,n)}),{a:e,b:n},null,"LogicalAnd")}}),vv=D({logicalNot_:function(r){var t=_(r,"x","logicalNot","bool");return T.runKernelFunc((function(e){return e.logicalNot(t)}),{$x:t})}}),oc=D({logicalOr_:function(r,t){var e=_(r,"a","logicalOr","bool"),n=_(t,"b","logicalOr","bool");return be(e.shape,n.shape),T.runKernelFunc((function(a){return a.logicalOr(e,n)}),{$a:e,$b:n})}}),mv=D({logicalXor_:function(r,t){var e=_(r,"a","logicalXor","bool"),n=_(t,"b","logicalXor","bool");return be(e.shape,n.shape),oc(r,t).logicalAnd(Ia(r,t).logicalNot())}}),Nn=D({where_:function(r,t,e){var n=_(t,"a","where"),a=_(e,"b","where"),o=_(r,"condition","where","bool");return ke(n.shape,a.shape,"Error in where: "),o.rank===1?k(o.shape[0]===n.shape[0],(function(){return"The first dimension of `a` must match the size of `condition`."})):ke(o.shape,a.shape,"Error in where: "),T.runKernelFunc((function(i,s){var u=i.select(o,n,a);return s([o]),u}),{$condition:o,$a:n,$b:a},(function(i,s){var u=s[0];return{$condition:function(){return Ce(u).toFloat()},$a:function(){return i.mul(u.cast(i.dtype))},$b:function(){return i.mul(u.logicalNot().cast(i.dtype))}}}))}}),ic=function(r){return J(this,void 0,void 0,(function(){var t,e,n;return Q(this,(function(a){switch(a.label){case 0:return[4,(t=_(r,"condition","whereAsync","bool")).data()];case 1:return e=a.sent(),n=Jo(t.shape,e),r!==t&&t.dispose(),[2,n]}}))}))},me=D({add_:function(r,t){var e,n=_(r,"a","add"),a=_(t,"b","add");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape);return T.runKernelFunc((function(i){return i.add(n,a)}),{a:n,b:a},(function(i){return{a:function(){var s=i,u=ze(n.shape,o);return u.length>0&&(s=s.sum(u)),s.reshape(n.shape)},b:function(){var s=i,u=ze(a.shape,o);return u.length>0&&(s=s.sum(u)),s.reshape(a.shape)}}}),"Add")}}),gv=D({addN_:function(r){k(Array.isArray(r),(function(){return"The argument passed to tf.addN() must be a list of tensors"})),k(r.length>=1,(function(){return"Must pass at least one tensor to tf.addN(), but got "+r.length}));var t=r.map((function(a,o){return _(a,"tensors"+o,"addN")})),e=t[0];t.forEach((function(a){if(a.dtype!==e.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")})),t.forEach((function(a){if(!He(a.shape,e.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")}));var n=t;return T.runKernelFunc((function(a){return a.addN(t)}),n,(function(a){var o={};return t.forEach((function(i,s){o[s]=function(){return a.clone()}})),o}),"AddN")}}),xv=D({addStrict_:function(r,t){var e=_(r,"a","addStrict"),n=_(t,"b","addStrict");return ke(e.shape,n.shape,"Error in addStrict: "),e.add(n)}}),yv=D({atan2_:function(r,t){var e,n=_(r,"a","atan2"),a=_(t,"b","atan2");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape);return T.runKernelFunc((function(i,s){var u=i.atan2(n,a);return s([n,a]),u}),{$a:n,$b:a},(function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=me(u.square(),c.square()),h=i.mul(c.div(l)),f=ze(u.shape,o);return f.length>0&&(h=h.sum(f)),h.reshape(u.shape)},$b:function(){var l=me(u.square(),c.square()),h=pa(i.mul(u.div(l))),f=ze(c.shape,o);return f.length>0&&(h=h.sum(f)),h.reshape(c.shape)}}}))}}),At=D({div_:function(r,t){var e,n=_(r,"a","div"),a=_(t,"b","div");if(e=Me(n,a),n=e[0],a=e[1],n.dtype==="int32"&&a.dtype==="int32")return sc(n,a);var o=be(n.shape,a.shape);return T.runKernelFunc((function(i,s){var u=i.realDivide(n,a);return s([n,a]),u}),{a:n,b:a},(function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),h=ze(u.shape,o);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=ze(c.shape,o);h.length>0&&(l=l.sum(h).reshape(c.shape));var f=c.square();return l.div(f.toFloat()).neg()}}}),"Div")}}),bv=D({divNoNan_:function(r,t){var e,n=_(r,"a","div"),a=_(t,"b","div");n=(e=Me(n,a))[0],a=e[1];var o=At(n,a),i=Ce(o),s=a.equal(i);return Nn(s,i,o)}}),wv=D({divStrict_:function(r,t){var e=_(r,"a","div"),n=_(t,"b","div");return ke(e.shape,n.shape,"Error in divideStrict: "),e.div(n)}}),sc=D({floorDiv_:function(r,t){var e,n=_(r,"a","floorDiv"),a=_(t,"b","floorDiv");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape);return T.runKernelFunc((function(i,s){var u=i.floorDiv(n,a);return s([n,a]),u}),{a:n,b:a},(function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),h=ze(u.shape,o);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=ze(c.shape,o);h.length>0&&(l=l.sum(h).reshape(c.shape));var f=c.square();return l.div(f.toFloat()).neg()}}}),"FloorDiv")}}),ni=D({maximum_:function(r,t){var e,n=_(r,"a","maximum"),a=_(t,"b","maximum");return e=Me(n,a),n=e[0],a=e[1],n.dtype==="bool"&&(n=n.toInt(),a=a.toInt()),be(n.shape,a.shape),T.runKernelFunc((function(o,i){var s=o.maximum(n,a);return i([n,a]),s}),{a:n,b:a},(function(o,i){var s=i[0],u=i[1];return{a:function(){return o.mul(s.greaterEqual(u).toFloat())},b:function(){return o.mul(s.less(u).toFloat())}}}),"Maximum")}}),Cv=D({maximumStrict_:function(r,t){var e=_(r,"a","maximumStrict"),n=_(t,"b","maximumStrict");return ke(e.shape,n.shape,"Error in maximumStrict: "),e.maximum(n)}}),uc=D({minimum_:function(r,t){var e,n=_(r,"a","minimum"),a=_(t,"b","minimum");return e=Me(n,a),n=e[0],a=e[1],n.dtype==="bool"&&(n=n.toInt(),a=a.toInt()),be(n.shape,a.shape),T.runKernelFunc((function(o,i){var s=o.minimum(n,a);return i([n,a]),s}),{a:n,b:a},(function(o,i){var s=i[0],u=i[1];return{a:function(){return o.mul(s.lessEqual(u).toFloat())},b:function(){return o.mul(s.greater(u).toFloat())}}}),"Minimum")}}),_v=D({minimumStrict_:function(r,t){var e=_(r,"a","minimumStrict"),n=_(t,"b","minimumStrict");return ke(e.shape,n.shape,"Error in minimumStrict: "),e.minimum(n)}}),Ev=D({mod_:function(r,t){var e,n=_(r,"a","mod"),a=_(t,"b","mod");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape);return T.runKernelFunc((function(i,s){var u=i.mod(n,a);return s([n,a]),u}),{$a:n,$b:a},(function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=ze(u.shape,o);return l.length>0?i.sum(l).reshape(u.shape):i},$b:function(){var l=i.mul(u.div(c).floor().neg()),h=ze(c.shape,o);return h.length>0?l.sum(h).reshape(c.shape):l}}}))}}),kv=D({modStrict_:function(r,t){var e=_(r,"a","modStrict"),n=_(t,"b","modStrict");return ke(e.shape,n.shape,"Error in modStrict: "),e.mod(n)}}),et=D({mul_:function(r,t){var e,n=_(r,"a","mul"),a=_(t,"b","mul");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape);return T.runKernelFunc((function(i,s){var u=i.multiply(n,a);return s([n,a]),u}),{a:n,b:a},(function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.mul(c.toFloat()),h=ze(u.shape,o);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=ze(c.shape,o);return h.length>0?l.sum(h).reshape(c.shape):l}}}),"Mul")}}),Iv=D({mulStrict_:function(r,t){var e=_(r,"a","mul"),n=_(t,"b","mul");return ke(e.shape,n.shape,"Error in multiplyStrict: "),e.mul(n)}}),va=D({pow_:function(r,t){var e,n=_(r,"base","pow"),a=_(t,"exp","pow");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape),i=[n,a];return T.runKernelFunc((function(s,u){var c=s.pow(n,a);return u([n,a,c]),c}),{a:n,b:a},(function(s,u){var c=u[0],l=u[1],h=u[2];return{a:function(){var f=l.toFloat(),d=s.mul(f.mul(c.pow(f.sub(K(1))))),p=ze(c.shape,o);return p.length>0&&(d=d.sum(p)),d.reshape(c.shape)},b:function(){var f=c.greater(0),d=c.log().where(f,Ce(c)),p=s.mul(h.mul(d)),m=ze(l.shape,o);return m.length>0&&(p=p.sum(m)),p.reshape(l.shape)}}}),"Pow",{},i,[!0])}}),Rv=D({powStrict_:function(r,t){return ke(r.shape,t.shape,"Error in powStrict: "),r.pow(t)}}),Sv=D({squaredDifferenceStrict_:function(r,t){var e=_(r,"a","squaredDifferenceStrict"),n=_(t,"b","squaredDifferenceStrict");return ke(e.shape,n.shape,"Error in squaredDifferenceStrict: "),e.squaredDifference(n)}}),Ue=D({sub_:function(r,t){var e,n=_(r,"a","sub"),a=_(t,"b","sub");e=Me(n,a),n=e[0],a=e[1];var o=be(n.shape,a.shape);return T.runKernelFunc((function(i){return i.subtract(n,a)}),{a:n,b:a},(function(i){return{a:function(){var s=i,u=ze(n.shape,o);return u.length>0&&(s=s.sum(u)),s.reshape(n.shape)},b:function(){var s=i,u=ze(a.shape,o);return u.length>0&&(s=s.sum(u)),s.neg().reshape(a.shape)}}}),"Sub")}}),Nv=D({subStrict_:function(r,t){var e=_(r,"a","subStrict"),n=_(t,"b","subStrict");return ke(e.shape,n.shape,"Error in subStrict: "),e.sub(n)}}),cc=D({equal_:function(r,t){var e,n=_(r,"a","equal"),a=_(t,"b","equal");return e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape),T.runKernelFunc((function(o){return o.equal(n,a)}),{$a:n,$b:a})}}),Dv=D({equalStrict_:function(r,t){var e=_(r,"a","equalStrict"),n=_(t,"b","equalStrict");return ke(e.shape,n.shape,"Error in equalStrict: "),e.equal(n)}}),Av=D({greater_:function(r,t){var e,n=_(r,"a","greater"),a=_(t,"b","greater");return e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape),T.runKernelFunc((function(o){return o.greater(n,a)}),{a:n,b:a},null,"Greater")}}),lc=D({greaterEqual_:function(r,t){var e,n=_(r,"a","greaterEqual"),a=_(t,"b","greaterEqual");return e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape),T.runKernelFunc((function(o,i){var s=o.greaterEqual(n,a);return i([n,a]),s}),{a:n,b:a},(function(o,i){var s=i[0],u=i[1];return{a:function(){return Ce(s)},b:function(){return Ce(u)}}}),"GreaterEqual")}}),Tv=D({greaterEqualStrict_:function(r,t){var e=_(r,"a","greaterEqualStrict"),n=_(t,"b","greaterEqualStrict");return ke(e.shape,n.shape,"Error in greaterEqualStrict: "),e.greaterEqual(n)}}),Fv=D({greaterStrict_:function(r,t){var e=_(r,"a","greaterStrict"),n=_(t,"b","greaterStrict");return ke(e.shape,n.shape,"Error in greaterStrict: "),e.greater(n)}}),Mv=D({less_:function(r,t){var e,n=_(r,"a","less"),a=_(t,"b","less");return e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape),T.runKernelFunc((function(o){return o.less(n,a)}),{a:n,b:a},null,"Less")}}),Pv=D({lessEqual_:function(r,t){var e,n=_(r,"a","lessEqual"),a=_(t,"b","lessEqual");return e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape),T.runKernelFunc((function(o,i){var s=o.lessEqual(n,a);return i([n,a]),s}),{a:n,b:a},null,"LessEqual")}}),Ov=D({lessEqualStrict_:function(r,t){var e=_(r,"a","lessEqualStrict"),n=_(t,"b","lessEqualStrict");return ke(e.shape,n.shape,"Error in lessEqualStrict: "),e.lessEqual(n)}}),Bv=D({lessStrict_:function(r,t){var e=_(r,"a","lessStrict"),n=_(t,"b","lessStrict");return ke(e.shape,n.shape,"Error in lessStrict: "),e.less(n)}}),Lv=D({notEqual_:function(r,t){var e,n=_(r,"a","notEqual"),a=_(t,"b","notEqual");return e=Me(n,a),n=e[0],a=e[1],be(n.shape,a.shape),T.runKernelFunc((function(o){return o.notEqual(n,a)}),{a:n,b:a},null,"NotEqual")}}),Wv=D({notEqualStrict_:function(r,t){var e=_(r,"a","notEqualStrict"),n=_(t,"b","notEqualStrict");return ke(e.shape,n.shape,"Error in notEqualStrict: "),e.notEqual(n)}});function As(r,t){for(var e=[],n=r;n<t;++n)e.push(n);return e}function Ts(r){for(var t=[],e=0;e<r.length;++e)for(var n=0;n<r[e].length;++n)t.push(r[e][n]);return t}var ri=D({gather_:function(r,t,e){e===void 0&&(e=0);var n=_(r,"x","gather"),a=_(t,"indices","gather","int32");e=Ve(e,n.shape)[0];var o=(function(i,s,u){for(var c=i.shape[u],l=[],h=1,f=1,d=0;d<u;d++)l.push(i.shape[d]),h*=i.shape[d];for(d=0;d<s.rank;d++)l.push(s.shape[d]);for(d=u+1;d<i.rank;d++)l.push(i.shape[d]),f*=i.shape[d];return{batchSize:h,sliceSize:f,dimSize:c,outputShape:l}})(n,a,e);return T.runKernelFunc((function(i,s){var u=i.gather(n,a.flatten(),e);return s([a]),u}),{x:n,indices:a},(function(i,s){var u=s[0];return{x:function(){var c=n.shape,l=u.size,h=c.slice(0,e),f=h.length,d=c.slice(e,c.length).slice(1),p=d.length,m=As(0,f),v=As(f+1,f+1+p),g=Ts([h,[l],d]),y=i.reshape(g),b=u.reshape([l]),x=Ts([[f],m,v]),w=y.transpose(x),C=hc(w,b,n.shape[e]),N=Vo(x);return C=C.transpose(N)},indices:function(){return u}}}),"Gather",{axis:e}).reshape(o.outputShape)}}),hc=D({unsortedSegmentSum_:function(r,t,e){var n=_(r,"x","unsortedSegmentSum"),a=_(t,"segmentIds","unsortedSegmentSum","int32");return k(Oe(e),(function(){return"numSegments must be of dtype int"})),T.runKernelFunc((function(o,i){var s=o.unsortedSegmentSum(n,a,e);return i([a]),s}),{$x:n},(function(o,i){var s=i[0];return{$x:function(){return(function(u,c){for(var l=ni(c,Ce(c)),h=ri(u,l),f=lc(c,K(0,"int32")),d=h.rank-f.rank,p=0;p<d;++p)f=kt(f,p+1);f=Ia(f,ar(h.shape,"bool"));var m=Ce(h);return Nn(f,h,m)})(o,s)}}}))}}),jv=function(r,t,e){return J(this,void 0,void 0,(function(){var n,a,o,i,s,u,c,l,h,f,d,p,m;return Q(this,(function(v){switch(v.label){case 0:for(n=_(r,"tensor","boolMask"),a=_(t,"mask","boolMask","bool"),o=e??0,i=a.rank,s=n.shape,k(i>0,(function(){return"mask cannot be scalar"})),ke(s.slice(o,o+i),a.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=o;c<o+i;c++)u*=s[c];return l=s.slice(0,o).concat([u],s.slice(o+i)),h=n.reshape(l),f=a.reshape([-1]),[4,ic(f)];case 1:return d=v.sent(),p=d.squeeze([1]),m=ri(h,p,o),r!==n&&n.dispose(),t!==a&&a.dispose(),p.dispose(),h.dispose(),f.dispose(),d.dispose(),[2,m]}}))}))};function fc(r,t,e,n,a,o,i){o===void 0&&(o="NHWC"),k(r.length===t.rank,(function(){return"Length of inShape ("+r.length+") and rank of dy ("+t.rank+") must match"}));var s=r,u=t,c=!1;t.rank===3&&(c=!0,u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]),s=[1,r[0],r[1],r[2]]),k(s.length===4,(function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+s.length+"."})),k(u.rank===4,(function(){return"Error in conv2dDerInput: dy must be rank 4, but got rank "+u.rank})),k(e.rank===4,(function(){return"Error in conv2dDerInput: filter must be rank 4, but got rank "+e.rank}));var l=o==="NHWC"?s[3]:s[1],h=o==="NHWC"?u.shape[3]:u.shape[1];k(l===e.shape[2],(function(){return"Error in conv2dDerInput: depth of input ("+l+") must match input depth for filter "+e.shape[2]+"."})),k(h===e.shape[3],(function(){return"Error in conv2dDerInput: depth of output ("+h+") must match output depth for filter "+e.shape[3]+"."})),i!=null&&k(Oe(a),(function(){return"Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+a+"."}));var f=Xo(o),d=Fn(s,e.shape,n,1,a,i,!1,f),p=T.runKernelFunc((function(m,v){var g=m.conv2dDerInput(u,e,d);return v([e,u]),g}),{dy4D:u,filter:e},(function(m,v){var g=v[0],y=v[1];return{dy4D:function(){return St(m,g,n,a,o,1,i)},filter:function(){return ai(m,y,g.shape,n,a,o,i)}}}));return c?p.as3D(p.shape[1],p.shape[2],p.shape[3]):p}function io(r){var t=(function(o){return typeof o=="number"?[o,o,o]:o.length===2?[o[0],o[1],1]:o})(r),e=t[0],n=t[1],a=t[2];return e===1&&n===1&&a===1}function dc(r,t,e,n,a){k(r.length===t.rank,(function(){return"Length of inShape ("+r.length+") and rank of dy ("+t.rank+") must match"}));var o=r,i=t,s=!1;t.rank===4&&(s=!0,i=t.as5D(1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]),o=[1,r[0],r[1],r[2],r[3]]);var u=o[4],c=i.shape[4];k(o.length===5,(function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+o.length+"."})),k(i.rank===5,(function(){return"Error in conv3dDerInput: dy must be rank 5, but got rank "+i.rank})),k(e.rank===5,(function(){return"Error in conv3dDerInput: filter must be rank 5, but got rank "+e.rank})),k(u===e.shape[3],(function(){return"Error in conv3dDerInput: depth of input ("+u+") must match input depth for filter "+e.shape[3]+"."})),k(c===e.shape[4],(function(){return"Error in conv3dDerInput: depth of output ("+c+") must match output depth for filter "+e.shape[4]+"."}));var l=fa(o,e.shape,n,1,a),h=T.runKernelFunc((function(f){return f.conv3dDerInput(i,e,l)}),{dy5D:i});return s?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}var zv=D({conv1d_:function(r,t,e,n,a,o,i){a===void 0&&(a="NWC"),o===void 0&&(o=1);var s=_(r,"x","conv1d"),u=_(t,"filter","conv1d"),c=s,l=!1;s.rank===2&&(l=!0,c=s.as3D(1,s.shape[0],s.shape[1])),k(c.rank===3,(function(){return"Error in conv1d: input must be rank 3, but got rank "+c.rank+"."})),k(u.rank===3,(function(){return"Error in conv1d: filter must be rank 3, but got rank "+u.rank+"."})),i!=null&&k(Oe(n),(function(){return"Error in conv1d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."})),k(c.shape[2]===u.shape[1],(function(){return"Error in conv1d: depth of input ("+c.shape[2]+") must match input depth for filter "+u.shape[1]+"."})),k(dt(e,o),(function(){return"Error in conv1D: Either stride or dilation must be 1. Got stride "+e+" and dilation '"+o+"'"})),k(a==="NWC",(function(){return"Error in conv1d: got dataFormat of "+a+" but only NWC is currently supported."}));var h=u.as4D(1,u.shape[0],u.shape[1],u.shape[2]),f=c.as4D(c.shape[0],1,c.shape[1],c.shape[2]),d=St(f,h,[1,e],n,"NHWC",[1,o],i);return l?d.as2D(d.shape[2],d.shape[3]):d.as3D(d.shape[0],d.shape[2],d.shape[3])}}),St=D({conv2d_:function(r,t,e,n,a,o,i){a===void 0&&(a="NHWC"),o===void 0&&(o=[1,1]);var s=_(r,"x","conv2d"),u=_(t,"filter","conv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),k(c.rank===4,(function(){return"Error in conv2d: input must be rank 4, but got rank "+c.rank+"."})),k(u.rank===4,(function(){return"Error in conv2d: filter must be rank 4, but got rank "+u.rank+"."})),i!=null&&k(Oe(n),(function(){return"Error in conv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."}));var h=a==="NHWC"?c.shape[3]:c.shape[1];k(h===u.shape[2],(function(){return"Error in conv2d: depth of input ("+h+") must match input depth for filter "+u.shape[2]+"."})),k(dt(e,o),(function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+o+"'"}));var f=Xo(a),d=Fn(c.shape,u.shape,e,o,n,i,!1,f),p=[u,c],m=T.runKernelFunc((function(v,g){var y=v.conv2d(c,u,d);return g([u,c]),y}),{x:c,filter:u},(function(v,g){var y=g,b=y[0],x=y[1];return k(nr(o),(function(){return"Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+o+"'"})),{x:function(){return pc(x.shape,v,b,e,n,a)},filter:function(){return ai(x,v,b.shape,e,n,a)}}}),"Conv2D",d,p);return l?m.as3D(m.shape[1],m.shape[2],m.shape[3]):m}}),Uv=D({conv3d_:function(r,t,e,n,a,o){a===void 0&&(a="NDHWC"),o===void 0&&(o=[1,1,1]);var i=_(r,"x","conv3d"),s=_(t,"filter","conv3d"),u=i,c=!1;i.rank===4&&(c=!0,u=i.as5D(1,i.shape[0],i.shape[1],i.shape[2],i.shape[3])),k(u.rank===5,(function(){return"Error in conv3d: input must be rank 5, but got rank "+u.rank+"."})),k(s.rank===5,(function(){return"Error in conv3d: filter must be rank 5, but got rank "+s.rank+"."})),k(u.shape[4]===s.shape[3],(function(){return"Error in conv3d: depth of input ("+u.shape[4]+") must match input depth for filter "+s.shape[3]+"."})),k((function(f,d){return io(f)||io(d)})(e,o),(function(){return"Error in conv3D: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+o+"'"})),k(a==="NDHWC",(function(){return"Error in conv3d: got dataFormat of "+a+" but only NDHWC is currently supported."}));var l=fa(u.shape,s.shape,e,o,n),h=T.runKernelFunc((function(f,d){var p=f.conv3d(u,s,l);return d([u,s]),p}),{x:u,$filter:s},(function(f,d){k(io(o),(function(){return"Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+o+"'"}));var p=d[0],m=d[1];return{x:function(){return dc(p.shape,f,m,e,n)},$filter:function(){return(function(v,g,y,b,x){var w=v;v.rank===4&&(w=v.as5D(1,v.shape[0],v.shape[1],v.shape[2],v.shape[3]));var C=g;C.rank===4&&(C=g.as5D(1,g.shape[0],g.shape[1],g.shape[2],g.shape[3])),k(w.rank===5,(function(){return"Error in conv3dDerFilter: input must be rank 5, but got shape "+w.shape+"."})),k(C.rank===5,(function(){return"Error in conv3dDerFilter: dy must be rank 5, but got shape "+C.shape+"."})),k(y.length===5,(function(){return"Error in conv3dDerFilter: filterShape must be length 5, but got "+y+"."})),k(w.shape[4]===y[3],(function(){return"Error in conv3dDerFilter: depth of input "+w.shape[4]+") must match input depth in filter ("+y[3]+"."})),k(C.shape[4]===y[4],(function(){return"Error in conv3dDerFilter: depth of dy ("+C.shape[4]+") must match output depth for filter ("+y[4]+")."}));var N=fa(w.shape,y,b,1,x);return T.runKernelFunc((function(I){return I.conv3dDerFilter(w,C,N)}),{x5D:w,dy5D:C})})(p,f,m.shape,e,n)}}}));return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),ai=D({conv2dDerFilter_:function(r,t,e,n,a,o,i){o===void 0&&(o="NHWC");var s=r;r.rank===3&&(s=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var u=t;u.rank===3&&(u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),k(s.rank===4,(function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+s.shape+"."})),k(u.rank===4,(function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+u.shape+"."})),k(e.length===4,(function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+e+"."}));var c=o==="NHWC"?s.shape[3]:s.shape[1],l=o==="NHWC"?u.shape[3]:u.shape[1];k(c===e[2],(function(){return"Error in conv2dDerFilter: depth of input "+c+") must match input depth in filter ("+e[2]+"."})),k(l===e[3],(function(){return"Error in conv2dDerFilter: depth of dy ("+l+") must match output depth for filter ("+e[3]+")."})),i!=null&&k(Oe(a),(function(){return"Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+a+"."}));var h=Xo(o),f=Fn(s.shape,e,n,1,a,i,!1,h);return T.runKernelFunc((function(d){return d.conv2dDerFilter(s,u,f)}),{x4D:s,dy4D:u})}}),pc=D({conv2dDerInput_:fc}),Ra=D({depthwiseConv2d_:function(r,t,e,n,a,o,i){o===void 0&&(o=[1,1]);var s=_(r,"x","depthwiseConv2d"),u=_(t,"filter","depthwiseConv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),k(c.rank===4,(function(){return"Error in depthwiseConv2d: input must be rank 4, but got rank "+c.rank+"."})),k(u.rank===4,(function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+u.rank+"."})),k(c.shape[3]===u.shape[2],(function(){return"Error in depthwiseConv2d: number of input channels ("+c.shape[3]+") must match the inChannels dimension in filter "+u.shape[2]+"."})),o==null&&(o=[1,1]),k(dt(e,o),(function(){return"Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+o+"'"})),i!=null&&k(Oe(n),(function(){return"Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."}));var h=Fn(c.shape,u.shape,e,o,n,i,!0),f=[c,u],d=T.runKernelFunc((function(p,m){var v=p.depthwiseConv2D(c,u,h);return m([c,u]),v}),{x:c,filter:u},(function(p,m){k(nr(o),(function(){return"Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+o+"'"}));var v=m[0],g=m[1];return{x:function(){return vc(v.shape,p,g,h)},filter:function(){return mc(v,p,g.shape,h)}}}),"DepthwiseConv2dNative",h,f);return l?d.as3D(d.shape[1],d.shape[2],d.shape[3]):d}}),vc=D({depthwiseConv2dDerInput_:function(r,t,e,n){var a=t,o=!1;t.rank===3&&(o=!0,a=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]));var i=T.runKernelFunc((function(s){return s.depthwiseConv2DDerInput(a,e,n)}),{dy4D:a});return o?i.as3D(i.shape[1],i.shape[2],i.shape[3]):i}}),mc=D({depthwiseConv2dDerFilter_:function(r,t,e,n){var a=r;r.rank===3&&(a=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var o=t;return o.rank===3&&(o=t.as4D(1,t.shape[0],t.shape[1],t.shape[2])),T.runKernelFunc((function(i){return i.depthwiseConv2DDerFilter(a,o,n)}),{x4D:a,dy4D:o})}}),oi=D({separableConv2d_:function(r,t,e,n,a,o,i){o===void 0&&(o=[1,1]),i===void 0&&(i="NHWC");var s=_(r,"x","separableConv2d"),u=_(t,"depthwiseFilter","separableConv2d"),c=_(e,"pointwiseFilter","separableConv2d"),l=s,h=!1;if(s.rank===3&&(h=!0,l=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");k(l.rank===4,(function(){return"Error in separableConv2d: input must be rank 4, but got rank "+l.rank+"."})),k(u.rank===4,(function(){return"Error in separableConv2d: depthwise filter must be rank 4, but got rank "+u.rank+"."})),k(c.rank===4,(function(){return"Error in separableConv2d: pointwise filter must be rank 4, but got rank "+u.rank+"."})),k(c.shape[0]===1,(function(){return"Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got "+c.shape[0]+"."})),k(c.shape[1]===1,(function(){return"Error in separableConv2d: the second dimension of pointwise filter must be 1, but got "+c.shape[1]+"."}));var f=u.shape[2],d=u.shape[3];k(c.shape[2]===f*d,(function(){return"Error in separableConv2d: the third dimension of pointwise filter must be "+f*d+", but got "+c.shape[2]+"."}));var p=Ra(l,u,n,a,i,o),m=St(p,c,1,"valid",i);return h?m.as3D(m.shape[1],m.shape[2],m.shape[3]):m}}),Vv=D({conv2dTranspose_:function(r,t,e,n,a,o){return fc(e,_(r,"x","conv2dTranspose"),_(t,"filter","conv2dTranspose"),n,a,"NHWC",o)}}),Gv=D({conv3dTranspose_:function(r,t,e,n,a){return dc(e,_(r,"x","conv3dTranspose"),_(t,"filter","conv3dTranspose"),n,a)}}),Sa=D({matMul_:function(r,t,e,n){var a;e===void 0&&(e=!1),n===void 0&&(n=!1);var o=_(r,"a","matMul"),i=_(t,"b","matMul");a=Me(o,i),o=a[0],i=a[1];var s=e?o.shape[o.rank-2]:o.shape[o.rank-1],u=n?i.shape[i.rank-1]:i.shape[i.rank-2],c=e?o.shape[o.rank-1]:o.shape[o.rank-2],l=n?i.shape[i.rank-2]:i.shape[i.rank-1],h=o.shape.slice(0,-2),f=i.shape.slice(0,-2),d=Z(h),p=Z(f);k(o.rank>=2&&i.rank>=2&&o.rank===i.rank,(function(){return"Error in matMul: inputs must have the same rank of at least 2, got ranks "+o.rank+" and "+i.rank+"."})),k(He(h,f),(function(){return"Error in matMul: outer dimensions ("+h+") and ("+f+") of Tensors with shapes "+o.shape+" and "+i.shape+" must match."})),k(s===u,(function(){return"Error in matMul: inner shapes ("+s+") and ("+u+") of Tensors with shapes "+o.shape+" and "+i.shape+" and transposeA="+e+" and transposeB="+n+" must match."}));var m=o.shape.slice(0,-2).concat([c,l]),v=e?o.as3D(d,s,c):o.as3D(d,c,s),g=n?i.as3D(p,l,u):i.as3D(p,u,l),y={transposeA:e,transposeB:n};return T.runKernelFunc((function(b,x){var w=b.batchMatMul(v,g,e,n);return x([v,g]),w}),{a:v,b:g},(function(b,x){var w=x,C=w[0],N=w[1];return e||n?!e&&n?{a:function(){return b.matMul(N,!1,!1)},b:function(){return b.matMul(C,!0,!1)}}:e&&!n?{a:function(){return N.matMul(b,!1,!0)},b:function(){return C.matMul(b,!1,!1)}}:{a:function(){return N.matMul(b,!0,!0)},b:function(){return b.matMul(C,!0,!0)}}:{a:function(){return b.matMul(N,!1,!0)},b:function(){return C.matMul(b,!0,!1)}}}),"BatchMatMul",y).reshape(m)}}),Hv=D({dot_:function(r,t){var e=_(r,"t1","dot"),n=_(t,"t2","dot");k(!(e.rank!==1&&e.rank!==2||n.rank!==1&&n.rank!==2),(function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+e.rank+" and "+n.rank+"."}));var a=e.rank===1?e.size:e.shape[1],o=n.rank===1?n.size:n.shape[0];return k(a===o,(function(){return"Error in dot: inner dimensions of inputs must match, but got "+a+" and "+o+"."})),e.rank===1&&n.rank===1?e.as2D(1,-1).matMul(n.as2D(-1,1)).asScalar():e.rank===1&&n.rank===2?e.as2D(1,-1).matMul(n.as2D(n.shape[0],n.shape[1])).as1D():e.rank===2&&n.rank===1?e.matMul(n.as2D(-1,1)).as1D():e.matMul(n.as2D(n.shape[0],n.shape[1]))}}),qv=D({outerProduct_:function(r,t){var e=_(r,"v1","outerProduct"),n=_(t,"v2","outerProduct");return k(e.rank===1&&n.rank===1,(function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+e.rank+" and "+n.rank+"."})),e.as2D(-1,1).matMul(n.as2D(1,-1))}}),Ar=D({reverse_:function(r,t){var e=_(r,"x","reverse");if(e.rank===0)return e.clone();var n=Ve(t,e.shape);return T.runKernelFunc((function(a){return a.reverse(e,n)}),{$x:e},(function(a){return{$x:function(){return a.reverse(n)}}})).reshapeAs(e)}}),Kv=D({reverse1d_:function(r){var t=_(r,"x","reverse");return k(t.rank===1,(function(){return"Error in reverse1D: x must be rank 1 but got rank "+t.rank+"."})),Ar(t,0)}}),Xv=D({reverse2d_:function(r,t){var e=_(r,"x","reverse");return k(e.rank===2,(function(){return"Error in reverse2D: x must be rank 2 but got rank "+e.rank+"."})),Ar(e,t)}}),Yv=D({reverse3d_:function(r,t){var e=_(r,"x","reverse");return k(e.rank===3,(function(){return"Error in reverse3D: x must be rank 3 but got rank "+e.rank+"."})),Ar(e,t)}}),$v=D({reverse4d_:function(r,t){var e=_(r,"x","reverse");return k(e.rank===4,(function(){return"Error in reverse4D: x must be rank 4 but got rank "+e.rank+"."})),Ar(e,t)}});function gc(r,t,e,n,a,o){var i=_(r,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),k(s.rank===4,(function(){return"Error in maxPool: input must be rank 4 but got rank "+s.rank+"."})),k(dt(e,n),(function(){return"Error in maxPool: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+n+"'"})),o!=null&&k(Oe(a),(function(){return"Error in maxPool: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+a+"."}));var c=Cr(s.shape,t,e,n,a,o);if(c.filterWidth===1&&c.filterHeight===1&&He(c.inShape,c.outShape))return i.clone();var l=[s],h=T.runKernelFunc((function(f,d){var p=f.maxPool(s,c);return d([s,p]),p}),{x:s},(function(f,d){var p=d[0],m=d[1];return{x:function(){return(function(v,g,y,b,x,w,C,N){var I=_(v,"dy","maxPoolBackprop"),R=_(g,"input","maxPoolBackprop"),S=_(y,"output","maxPoolBackprop");k(R.rank===I.rank,(function(){return"Rank of input ("+R.rank+") does not match rank of dy ("+I.rank+")"})),k(dt(x,w),(function(){return"Error in maxPoolBackProp: Either strides or dilations must be 1. Got strides "+x+" and dilations '"+w+"'"})),k(I.rank===4,(function(){return"Error in maxPoolBackprop: dy must be rank 4 but got rank "+I.rank+"."})),k(R.rank===4,(function(){return"Error in maxPoolBackprop: input must be rank 4 but got rank "+R.rank+"."}));var F=Cr(R.shape,b,x,w,C,N);return T.runKernelFunc((function(A){return A.maxPoolBackprop(I,R,S,F)}),{$dy:I,$input:R})})(f,p,m,t,e,n,a)}}}),"MaxPool",c,l);return u?h.as3D(h.shape[1],h.shape[2],h.shape[3]):h}function xc(r,t,e,n,a,o){var i=_(r,"x","avgPool","float32");k(dt(e,n),(function(){return"Error in avgPool: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+n+"'"}));var s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),k(s.rank===4,(function(){return"Error in avgPool: x must be rank 4 but got rank "+s.rank+"."})),o!=null&&k(Oe(a),(function(){return"Error in avgPool: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+a+"."}));var c=Cr(s.shape,t,e,n,a,o);if(c.filterWidth===1&&c.filterHeight===1&&He(c.inShape,c.outShape))return i.clone();var l=T.runKernelFunc((function(h){return h.avgPool(s,c)}),{x:s},(function(h){return{x:function(){return(function(f,d,p,m,v,g){var y=_(f,"dy","avgPoolBackprop"),b=_(d,"input","avgPoolBackprop");k(b.rank===y.rank,(function(){return"Rank of input ("+b.rank+") does not match rank of dy ("+y.rank+")"})),k(dt(m,v),(function(){return"Error in avgPoolBackprop: Either strides or dilations must be 1. Got strides "+m+" and dilations '"+v+"'"}));var x=b,w=y,C=!1;b.rank===3&&(C=!0,x=b.as4D(1,b.shape[0],b.shape[1],b.shape[2]),w=y.as4D(1,y.shape[0],y.shape[1],y.shape[2])),k(w.rank===4,(function(){return"Error in avgPoolBackprop: dy must be rank 4 but got rank "+w.rank+"."})),k(x.rank===4,(function(){return"Error in avgPoolBackprop: input must be rank 4 but got rank "+x.rank+"."}));var N=Cr(x.shape,p,m,v,g),I=T.runKernelFunc((function(R){return R.avgPoolBackprop(w,x,N)}),{dy4D:w,input4D:x});return C?I.as3D(I.shape[1],I.shape[2],I.shape[3]):I})(h,s,t,e,n,a)}}}),"AvgPool",c);return l=l.cast(i.dtype),u?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}var Ge=D({maxPool_:function(r,t,e,n,a){return gc(r,t,e,1,n,a)}}),Tr=D({avgPool_:function(r,t,e,n,a){return xc(r,t,e,1,n,a)}}),Jv=D({pool_:function(r,t,e,n,a,o){a==null&&(a=[1,1]),o==null&&(o=1),n===0&&(n="valid");var i=_(r,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),k(dt(o,a),(function(){return"Error in pool: Either strides or dilations must be 1. Got strides "+o+" and dilations '"+a+"'"}));var c,l=Cr(s.shape,t,o,a,n),h=[l.dilationHeight,l.dilationWidth];c=n==="same"?(function(x,w){var C=x.map((function(R,S){return R+(R-1)*(w[S]-1)})).map((function(R){return R-1})),N=C.map((function(R){return Math.floor(R/2)})),I=C.map((function(R,S){return R-N[S]}));return C.map((function(R,S){return[N[S],I[S]]}))})([l.filterHeight,l.filterWidth],h):[[0,0],[0,0]];var f=h[0]===1&&h[1]===1,d=(function(x,w,C){var N=C.map((function(B){return B[0]})),I=C.map((function(B){return B[1]})),R=x.concat(N,I),S=w.map((function(B,O){return(B-R[O]%B)%B})),F=I.map((function(B,O){return B+S[O]})),A=w.map((function(B,O){return[N[O],F[O]]})),W=w.map((function(B,O){return[0,S[O]]}));return[A,W]})([l.inHeight,l.inWidth],h,c),p=d[0],m=d[1],v=f?n:"valid",g=f?s:Eu(s,h,p),y=(e==="avg"?function(){return xc(g,t,o,1,v)}:function(){return gc(g,t,o,1,v)})(),b=f?y:wu(y,h,m);return u?b.as3D(b.shape[1],b.shape[2],b.shape[3]):b}}),Qv=D({maxPool3d_:function(r,t,e,n,a,o,i){o===void 0&&(o="NDHWC");var s=_(r,"x","maxPool3d"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),k(u.rank===5,(function(){return"Error in maxPool3d: x must be rank 5 but got rank "+u.rank+"."})),k(o==="NDHWC",(function(){return"Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of "+o})),k(dt(e,i),(function(){return"Error in maxPool3d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+i+"'"})),a!=null&&k(Oe(n),(function(){return"Error in maxPool3d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+n+"."}));var l=ha(u.shape,t,e,i,n,a,o),h=T.runKernelFunc((function(f,d){var p=f.maxPool3d(u,l);return d([u,p]),p}),{x:u},(function(f,d){var p=d[0],m=d[1];return{x:function(){return(function(v,g,y,b,x,w,C,N){var I=_(v,"dy","maxPool3dBackprop"),R=_(g,"input","maxPool3dBackprop"),S=_(y,"output","maxPool3dBackprop"),F=I,A=R,W=S,B=!1;R.rank===4&&(B=!0,F=I.as5D(1,I.shape[0],I.shape[1],I.shape[2],I.shape[3]),A=R.as5D(1,R.shape[0],R.shape[1],R.shape[2],R.shape[3]),W=S.as5D(1,S.shape[0],S.shape[1],S.shape[2],S.shape[3])),k(F.rank===5,(function(){return"Error in maxPool3dBackprop: dy must be rank 5 but got rank "+F.rank+"."})),k(A.rank===5,(function(){return"Error in maxPool3dBackprop: input must be rank 5 but got rank "+A.rank+"."})),k(W.rank===5,(function(){return"Error in maxPool3dBackprop: output must be rank 5 but got rank "+W.rank+"."})),w==null&&(w=[1,1,1]),k(dt(x,w),(function(){return"Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides "+x+" and dilations '"+w+"'"})),N!=null&&k(Oe(C),(function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+N+" but got pad "+C+"."}));var O=ha(A.shape,b,x,w,C,N),U=T.runKernelFunc((function(z){return z.maxPool3dBackprop(F,A,W,O)}),{dy5D:F,input5D:A});return B?U.as4D(U.shape[1],U.shape[2],U.shape[3],U.shape[4]):U})(f,p,m,t,e,i,n,a)}}}));return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),Zv=D({avgPool3d_:function(r,t,e,n,a,o,i){o===void 0&&(o="NDHWC");var s=_(r,"x","avgPool3d","float32"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),k(u.rank===5,(function(){return"Error in avgPool3d: x must be rank 5 but got rank "+u.rank+"."})),k(o==="NDHWC",(function(){return"Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of "+o})),k(dt(e,i),(function(){return"Error in avgPool3d: Either strides or dilations must be 1. Got strides "+e+" and dilations '"+i+"'"})),a!=null&&k(Oe(n),(function(){return"Error in avgPool3d: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+n+"."}));var l=ha(u.shape,t,e,i,n,a,o),h=T.runKernelFunc((function(f){return f.avgPool3d(u,l)}),{x:u},(function(f){return{x:function(){return(function(d,p,m,v,g,y,b){var x=_(d,"dy","avgPool3dBackprop"),w=_(p,"input","avgPool3dBackprop"),C=x,N=w,I=!1;w.rank===4&&(I=!0,C=x.as5D(1,x.shape[0],x.shape[1],x.shape[2],x.shape[3]),N=w.as5D(1,w.shape[0],w.shape[1],w.shape[2],w.shape[3])),k(C.rank===5,(function(){return"Error in avgPool3dBackprop: dy must be rank 5 but got rank "+C.rank+"."})),k(N.rank===5,(function(){return"Error in avgPool3dBackprop: input must be rank 5 but got rank "+N.rank+"."})),g==null&&(g=[1,1,1]),k(dt(v,g),(function(){return"Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides "+v+" and dilations '"+g+"'"})),b!=null&&k(Oe(y),(function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+b+" but got pad "+y+"."}));var R=ha(N.shape,m,v,g,y,b),S=T.runKernelFunc((function(F){return F.avgPool3dBackprop(C,N,R)}),{dy5D:C,input5D:N});return I?S.as4D(S.shape[1],S.shape[2],S.shape[3],S.shape[4]):S})(f,u,t,e,i,n,a)}}}));return h=h.cast(u.dtype),c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),Ht=D({slice_:function(r,t,e){var n,a,o=_(r,"x","slice");if(o.rank===0)throw new Error("Slicing scalar is not possible");(n=typeof t=="number"?[t].concat(new Array(o.rank-1).fill(0)):t.length<o.rank?t.concat(new Array(o.rank-t.length).fill(0)):t.slice()).forEach((function(u){k(u!==-1,(function(){return"slice() does not support negative begin indexing."}))})),a=(a=e==null?new Array(o.rank).fill(-1):typeof e=="number"?[e].concat(new Array(o.rank-1).fill(-1)):e.length<o.rank?e.concat(new Array(o.rank-e.length).fill(-1)):e).map((function(u,c){return u>=0?u:(k(u===-1,(function(){return"Negative size values should be exactly -1 but got "+u+" for the slice() size at index "+c+"."})),o.shape[c]-n[c])})),Rf(o,n,a);var i=o.shape,s={begin:n,size:a};return T.runKernelFunc((function(u){return u.slice(o,n,a)}),{x:o},(function(u){for(var c=[],l=0;l<u.rank;l++)c.push([n[l],i[l]-n[l]-a[l]]);return{x:function(){return u.pad(c)}}}),"Slice",s)}}),em=D({slice1d_:function(r,t,e){var n=_(r,"x","slice1d");return k(n.rank===1,(function(){return"slice1d expects a rank-1 tensor, but got a rank-"+n.rank+" tensor"})),Ht(n,[t],[e])}}),tm=D({slice2d_:function(r,t,e){var n=_(r,"x","slice2d");return k(n.rank===2,(function(){return"slice2d expects a rank-2 tensor, but got a rank-"+n.rank+" tensor"})),Ht(n,t,e)}}),yc=D({slice3d_:function(r,t,e){var n=_(r,"x","slice3d");return k(n.rank===3,(function(){return"slice3d expects a rank-3 tensor, but got a rank-"+n.rank+" tensor"})),Ht(n,t,e)}}),nm=D({slice4d_:function(r,t,e){var n=_(r,"x","slice4d");return k(n.rank===4,(function(){return"slice4d expects a rank-4 tensor, but got a rank-"+n.rank+" tensor"})),Ht(n,t,e)}});function bc(r,t,e,n,a){return t.rank<e.rank&&(t=t.reshape(ft(t.shape,n))),r.rank<e.rank&&(r=r.reshape(ft(r.shape,n))),{x:function(){var o=r.mul(e.equal(t).cast(r.dtype));return a==null?o:o.transpose(a)}}}var rm=D({all_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","all","bool"),a=Ve(t,n.shape),o=a,i=Kt(o,n.rank);i!=null&&(n=n.transpose(i),o=Xt(o.length,n.rank));var s=T.runKernelFunc((function(c){return c.all(n,o)}),{$x:n});if(e){var u=ft(s.shape,a);return s.reshape(u)}return s}}),am=D({any_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","any","bool"),a=Ve(t,n.shape),o=a,i=Kt(o,n.rank);i!=null&&(n=n.transpose(i),o=Xt(o.length,n.rank));var s=T.runKernelFunc((function(c){return c.any(n,o)}),{$x:n});if(e){var u=ft(s.shape,a);return s.reshape(u)}return s}}),om=D({argMax_:function(r,t){t===void 0&&(t=0);var e=_(r,"x","argMax");t==null&&(t=0);var n=Ve(t,e.shape),a=Kt(n,e.rank);a!=null&&(e=e.transpose(a),n=Xt(n.length,e.rank));var o={axis:n[0]},i=[e];return T.runKernelFunc((function(s,u){var c=s.argMax(e,n[0]);return u([e]),c}),{x:e},(function(s,u){var c=u[0];return{x:function(){return Ce(c)}}}),"ArgMax",o,i)}}),im=D({argMin_:function(r,t){t===void 0&&(t=0);var e=_(r,"x","argMin");t==null&&(t=0);var n=Ve(t,e.shape),a=Kt(n,e.rank);return a!=null&&(e=e.transpose(a),n=Xt(n.length,e.rank)),T.runKernelFunc((function(o,i){var s=o.argMin(e,n[0]);return i([e]),s}),{$x:e},(function(o,i){var s=i[0];return{$x:function(){return Ce(s)}}}))}}),sm=D({logSumExp_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","logSumExp"),a=Ve(t,n.shape),o=n.max(a,!0),i=n.sub(o).exp().sum(a).log(),s=o.reshape(i.shape).add(i);if(e){var u=ft(s.shape,a);return s.reshape(u)}return s}}),Na=D({max_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","max"),a=n,o=Ve(t,n.shape),i=o,s=Kt(i,n.rank);s!=null&&(n=n.transpose(s),i=Xt(i.length,n.rank));var u=[n],c=T.runKernelFunc((function(h,f){var d=h.max(n,i);return f([a,d]),d}),{x:n},(function(h,f){return bc(h,f[1],f[0],o,s)}),"Max",{axes:i},u,[!0]);if(e){var l=ft(c.shape,o);c=c.reshape(l)}return c}}),um=D({mean_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","mean"),a=Ve(t,n.shape),o=Z($e(n.shape,a)[1]);return Ea((function(i){var s=K(o);return{value:(s.dtype===i.dtype?i:i.cast(s.dtype)).div(s).sum(t,e),gradFunc:function(u){var c=i.shape.slice();return a.forEach((function(l){c[l]=1})),u.reshape(c).mul(ar(i.shape,"float32")).div(o)}}}))(n)}}),cm=D({min_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","min"),a=n,o=Ve(t,n.shape),i=o,s=Kt(i,n.rank);s!=null&&(n=n.transpose(s),i=Xt(i.length,n.rank));var u=[n],c=T.runKernelFunc((function(h,f){var d=h.min(n,i);return f([a,d]),d}),{x:n},(function(h,f){return bc(h,f[1],f[0],o,s)}),"Min",{axes:i},u,[!0]);if(e){var l=ft(c.shape,o);c=c.reshape(l)}return c}}),lm=D({moments_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=Ve(t,(r=_(r,"x","moments")).shape),a=r.mean(n,e),o=a.shape;e||(o=ft(a.shape,n));var i=r.toFloat().sub(a.reshape(o)).square();return{mean:a,variance:i.mean(n,e)}}}),wc=D({sum_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","sum");n.dtype==="bool"&&(n=n.toInt());var a=Ve(t,n.shape);return Ea((function(o){var i=Kt(a,o.rank),s=a,u=o;i!=null&&(u=o.transpose(i),s=Xt(s.length,o.rank));var c=function(d){var p=o.shape.slice();return a.forEach((function(m){p[m]=1})),d.reshape(p).mul(ar(o.shape,"float32"))},l={axes:s},h=T.runKernelFunc((function(d){return d.sum(u,s)}),{x:u},(function(d){return{x:function(){return c(d)}}}),"Sum",l);if(e){var f=ft(h.shape,a);h=h.reshape(f)}return{value:h,gradFunc:c}}))(n)}}),hm=D({prod_:function(r,t,e){t===void 0&&(t=null),e===void 0&&(e=!1);var n=_(r,"x","prod");n.dtype==="bool"&&(n=n.toInt());var a=Ve(t,n.shape),o=Kt(a,n.rank),i=a,s=n;o!=null&&(s=n.transpose(o),i=Xt(i.length,n.rank));var u=T.runKernelFunc((function(l){return l.prod(s,i)}),{permutedX:s});if(e){var c=ft(u.shape,a);u=u.reshape(c)}return u}}),Cc=D({elu_:function(r){var t=_(r,"x","elu");return T.runKernelFunc((function(e,n){var a=e.elu(t);return n([a]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){return T.runKernelFunc((function(o){return o.eluDer(e,a)}),{dy:e,y:a})}}}))}}),fm=D({leakyRelu_:function(r,t){t===void 0&&(t=.2);var e=_(r,"x","leakyRelu");return ni(K(t).mul(e),e)}}),_c=D({prelu_:function(r,t){var e=_(r,"x","prelu"),n=_(t,"alpha","prelu");return T.runKernelFunc((function(a,o){var i=a.prelu(e,n);return o([e,n]),i}),{x:e,alpha:n},(function(a,o){var i=o[0],s=o[1],u=i.greater(0);return{x:function(){return Nn(u,a,a.mul(s))},alpha:function(){var c=Nn(u,Ce(a),a.mul(i)),l=ze(s.shape,a.shape);return l.length>0&&(c=c.sum(l)),c.reshape(s.shape)}}}),"Prelu")}}),Fe=D({relu_:function(r){var t=_(r,"x","relu");return t.dtype==="bool"?t.toInt():T.runKernelFunc((function(e,n){var a=e.relu(t);return n([t]),a}),{x:t},(function(e,n){var a=n[0];return{x:function(){return e.mulStrict(a.step().toFloat())}}}),"Relu")}}),Ec=D({relu6_:function(r){var t=_(r,"x","relu6");return t.dtype==="bool"?t.toInt():T.runKernelFunc((function(e,n){var a=e.relu6(t);return n([t]),a}),{x:t},(function(e,n){var a=n[0],o=a.lessEqual(6).mul(a.step());return{x:function(){return e.mulStrict(o.toFloat())}}}),"Relu6")}}),dm=D({selu_:function(r){var t=_(r,"x","selu");return T.runKernelFunc((function(e,n){var a=e.selu(t);return n([t]),a}),{$x:t},(function(e,n){var a=n[0];return{$x:function(){var o=a.greater(K(0)),i=K(Zo),s=K(ei),u=e.mul(s),c=e.mul(i).mul(a.toFloat().exp());return Nn(o,u,c)}}}))}}),mn=D({transpose_:function(r,t){var e=_(r,"x","transpose");if(t==null&&(t=e.shape.map((function(a,o){return o})).reverse()),k(e.rank===t.length,(function(){return"Error in transpose: rank of input "+e.rank+" must match length of perm "+t+"."})),t.forEach((function(a){k(a>=0&&a<e.rank,(function(){return"All entries in 'perm' must be between 0 and "+(e.rank-1)+" but got "+t}))})),e.rank<=1)return e.clone();var n={perm:t};return T.runKernelFunc((function(a){return a.transpose(e,t)}),{x:e},(function(a){var o=Vo(t);return{x:function(){return a.transpose(o)}}}),"Transpose",n)}}),pm=D({localResponseNormalization_:function(r,t,e,n,a){t===void 0&&(t=5),e===void 0&&(e=1),n===void 0&&(n=1),a===void 0&&(a=.5);var o=_(r,"x","localResponseNormalization");k(o.rank===4||o.rank===3,(function(){return`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank `+o.rank+"."})),k(Oe(t),(function(){return"Error in localResponseNormalization: depthRadius must be an integer but got depthRadius "+t+"."}));var i=o,s=!1;o.rank===3&&(s=!0,i=o.as4D(1,o.shape[0],o.shape[1],o.shape[2]));var u=T.runKernelFunc((function(c,l){var h=c.localResponseNormalization4D(i,t,e,n,a);return l([i,h]),h}),{x4D:i},(function(c,l){var h=l[0],f=l[1];return{x4D:function(){return T.runKernelFunc((function(d){return d.LRNGrad(c,h,f,t,e,n,a)}),{})}}}));return s?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),kc=D({norm_:function(r,t,e,n){t===void 0&&(t="euclidean"),e===void 0&&(e=null),n===void 0&&(n=!1);var a=(function s(u,c,l){if(l===void 0&&(l=null),u.rank===0)return u.abs();if(u.rank!==1&&l===null)return s(u.reshape([-1]),c,l);if(u.rank===1||typeof l=="number"||Array.isArray(l)&&l.length===1){if(c===1)return u.abs().sum(l);if(c===1/0)return u.abs().max(l);if(c===-1/0)return u.abs().min(l);if(c==="euclidean"||c===2)return u.abs().pow(K(2,"int32")).sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}if(Array.isArray(l)&&l.length===2){if(c===1)return u.abs().sum(l[0]).max(l[1]-1);if(c===1/0)return u.abs().sum(l[1]).max(l[0]);if(c===-1/0)return u.abs().sum(l[1]).min(l[0]);if(c==="fro"||c==="euclidean")return u.square().sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}throw new Error("Error in norm: invalid axis: "+l)})(r=_(r,"x","norm"),t,e),o=a.shape;if(n){var i=Ve(e,r.shape);o=ft(a.shape,i)}return a.reshape(o)}}),vm=D({basicLSTMCell_:function(r,t,e,n,a,o){var i=_(r,"forgetBias","basicLSTMCell"),s=_(t,"lstmKernel","basicLSTMCell"),u=_(e,"lstmBias","basicLSTMCell"),c=_(n,"data","basicLSTMCell"),l=_(a,"c","basicLSTMCell"),h=_(o,"h","basicLSTMCell"),f=c.concat(h,1).matMul(s).add(u),d=f.shape[0],p=f.shape[1]/4,m=[d,p],v=f.slice([0,0],m),g=f.slice([0,p],m),y=f.slice([0,2*p],m),b=f.slice([0,3*p],m),x=v.sigmoid().mulStrict(g.tanh()).addStrict(l.mulStrict(i.add(y).sigmoid())),w=x.tanh().mulStrict(b.sigmoid());return[x,w]}}),mm=D({multiRNNCell_:function(r,t,e,n){for(var a=_(t,"data","multiRNNCell"),o=oa(e,"c","multiRNNCell"),i=oa(n,"h","multiRNNCell"),s=a,u=[],c=0;c<r.length;c++){var l=r[c](s,o[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}var h=[],f=[];for(c=0;c<u.length;c+=2)h.push(u[c]),f.push(u[c+1]);return[h,f]}}),gm=D({movingAverage_:function(r,t,e,n,a){a===void 0&&(a=!0);var o=_(r,"v","movingAverage"),i=_(t,"x","movingAverage"),s=_(e,"decay","movingAverage");dh(o,i),k(He(o.shape,i.shape),(function(){return"Shape mismatch in v and x"}));var u=K(1),c=u.sub(s),l=i.sub(o).mul(c);if(a){k(n!=null,(function(){return"When using zeroDebias: true, step is required."}));var h=_(n,"step","movingAverage");l=l.div(u.sub(va(s,h)))}return o.add(l)}}),xm=D({stridedSlice_:function(r,t,e,n,a,o,i,s,u){if(a===void 0&&(a=0),o===void 0&&(o=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),n==null&&(n=new Array(t.length)),i!==0)throw new Error("ellipsis mask is not yet supported");var c=_(r,"x","stridedSlice"),l=hs(s),h=c.shape.slice();l.forEach((function(v){t[v]=0,e[v]=1,h.splice(v,0,1)})),c=c.reshape(h);for(var f=0;f<c.rank;f++)t[f]=Sf(a,t,n,c.shape,f),e[f]=Nf(o,e,n,c.shape,f),n[f]=n[f]||1;var d=hs(u);d.forEach((function(v){e[v]=t[v]+1,n[v]=1}));var p=Ko(t,e,n),m=p.filter((function(v,g){return d.indexOf(g)===-1}));return n.every((function(v){return v===1}))?Ht(c,t,p).reshape(m):T.runKernelFunc((function(v){return v.stridedSlice(c,t,e,n)}),{$x:c}).reshape(m)}}),ym=D({topk_:function(r,t,e){t===void 0&&(t=1),e===void 0&&(e=!0);var n=_(r,"x","topk");if(n.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");var a=n.shape[n.shape.length-1];if(t>a)throw new Error("'k' passed to topk() must be <= the last dimension ("+a+") but got "+t);var o=T.runKernelFunc((function(i){return i.topk(n,t,e)}),{$x:n});return{values:o[0],indices:o[1]}}}),bm=D({scatterND_:function(r,t,e){var n=_(r,"indices","scatterND","int32"),a=_(t,"updates","scatterND");return If(a,n,e),T.runKernelFunc((function(o){return o.scatterND(n,a,e)}),{indices:n,updates:a},null,"ScatterNd",{shape:e})}}),ii=D({fft_:function(r){k(r.dtype==="complex64",(function(){return"The dtype for tf.spectral.fft() must be complex64 but got "+r.dtype+"."}));var t=r.shape[r.shape.length-1],e=r.size/t,n=r.as2D(e,t);return T.runKernelFunc((function(a){return a.fft(n)}),{input:r}).reshape(r.shape)}}),ma=D({ifft_:function(r){k(r.dtype==="complex64",(function(){return"The dtype for tf.spectral.ifft() must be complex64 but got "+r.dtype+"."}));var t=r.shape[r.shape.length-1],e=r.size/t,n=r.as2D(e,t);return T.runKernelFunc((function(a){return a.ifft(n)}),{input:r}).reshape(r.shape)}}),si=D({rfft_:function(r,t){k(r.dtype==="float32",(function(){return"The dtype for rfft() must be real value but got "+r.dtype}));var e,n=r.shape[r.shape.length-1],a=r.size/n;if(t!=null&&t<n){var o=r.shape.map((function(g){return 0})),i=r.shape.map((function(g){return g}));i[r.shape.length-1]=t,e=r.slice(o,i),n=t}else if(t!=null&&t>n){var s=r.shape.map((function(g){return g}));s[r.shape.length-1]=t-n,e=r.concat(Ae(s),r.shape.length-1),n=t}else e=r;var u=e.zerosLike(),c=Ke(e,u).as2D(a,n),l=ii(c),h=Math.floor(n/2)+1,f=It(l),d=jt(l),p=f.split([h,n-h],f.shape.length-1),m=d.split([h,n-h],d.shape.length-1),v=e.shape.slice();return v[e.shape.length-1]=h,Ke(p[0],m[0]).reshape(v)}}),Ic=D({irfft_:function(r){var t=r.shape[r.shape.length-1],e=r.size/t;if(t<=2){var n=r.as2D(e,t),a=ma(n);return It(a)}var o=[e,2*(t-1)],i=It(r).as2D(e,t),s=jt(r).as2D(e,t),u=i.slice([0,1],[e,t-2]).reverse(1),c=s.slice([0,1],[e,t-2]).reverse(1).mul(K(-1)),l=i.concat(u,1),h=s.concat(c,1);return n=Ke(l,h).as2D(o[0],o[1]),a=ma(n),It(a)}}),wm=Object.freeze({fft:ii,ifft:ma,rfft:si,irfft:Ic}),Cm=D({sparseToDense_:function(r,t,e,n){n===void 0&&(n=0);var a=_(r,"sparseIndices","sparseToDense","int32"),o=_(t,"sparseValues","sparseToDense"),i=_(n,"defaultValue","sparseToDense",o.dtype);return(function(s,u,c,l){if(s.dtype!=="int32")throw new Error("tf.sparseToDense() expects the indices to be int32 type, but the dtype was "+s.dtype+".");if(s.rank>2)throw new Error("sparseIndices should be a scalar, vector, or matrix, but got shape "+s.shape+".");var h=s.rank>0?s.shape[0]:1,f=s.rank>1?s.shape[1]:1;if(c.length!==f)throw new Error("outputShape has incorrect number of elements:, "+c.length+", should be: "+f+".");var d=u.size;if(u.rank!==0&&(u.rank!==1||d!==h))throw new Error("sparseValues has incorrect shape "+u.shape+", should be [] or ["+h+"]");if(u.dtype!==l.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")})(a,o,e,i),T.runKernelFunc((function(s){return s.sparseToDense(a,o,e,i)}),{$sparseIndices:a,$sparseValues:o,$defaultValue:i})}}),_m=D({gatherND_:function(r,t){var e=_(t,"indices","gatherND","int32"),n=_(r,"x","gatherND");return T.runKernelFunc((function(a){return a.gatherND(n,e)}),{x:n,indices:e},null,"GatherNd")}}),Em=D({diag_:function(r){var t=_(r,"x","diag").flatten(),e=r.shape.concat(r.shape);return T.runKernelFunc((function(n){return n.diag(t)}),{$x:t}).reshape(e)}}),km=D({dropout_:function(r,t,e,n){var a=_(r,"x","dropout");if(k(a.dtype==="float32",(function(){return"x has to be a floating point tensor since it's going to be scaled, but got a "+a.dtype+" tensor instead."})),k(t>=0&&t<1,(function(){return"rate must be a float in the range [0, 1), but got "+t+"."})),t===0)return r instanceof Te?a.clone():a;var o=(function(u,c){if(c==null)return u.shape.slice();if(He(u.shape,c))return c;if(u.shape.length===c.length){for(var l=[],h=0;h<u.shape.length;h++)c[h]==null&&u.shape[h]!=null?l.push(u.shape[h]):l.push(c[h]);return l}return c})(a,e),i=1-t,s=_u(o,0,1,"float32",n).add(i).floor().div(i);return a.mul(s)}});function Rc(r,t,e){for(var n=1-r%2,a=new Float32Array(r),o=0;o<r;++o){var i=2*Math.PI*o/(r+n-1);a[o]=t-e*Math.cos(i)}return Be(a,"float32")}var ui=D({hannWindow_:function(r){return Rc(r,.5,.5)}}),Sc=D({hammingWindow_:function(r){return Rc(r,.54,.46)}}),ci=D({frame_:function(r,t,e,n,a){n===void 0&&(n=!1),a===void 0&&(a=0);for(var o=0,i=[];o+t<=r.size;)i.push(Ht(r,o,t)),o+=e;if(n)for(;o<r.size;){var s=o+t-r.size,u=We([Ht(r,o,t-s),Gt([s],a)]);i.push(u),o+=e}return i.length===0?dn([],[0,t]):We(i).as2D(i.length,t)}}),Nc=D({stft_:function(r,t,e,n,a){var o;a===void 0&&(a=ui),n==null&&(o=t,n=Math.floor(Math.pow(2,Math.ceil(Math.log(o)/Math.log(2)))));for(var i=ci(r,t,e),s=et(i,a(t)),u=[],c=0;c<i.shape[0];c++)u.push(si(s.slice([c,0],[1,t]),n));return We(u)}}),Im=Object.freeze({hannWindow:ui,hammingWindow:Sc,frame:ci,stft:Nc}),Ze,Rm=function(r,t,e){return e===void 0&&(e=1),J(this,void 0,void 0,(function(){var n,a,o,i,s,u,c,l,h,f,d,p,m,v;return Q(this,(function(g){switch(g.label){case 0:return n=_(r,"predictions","inTopK"),a=_(t,"targets","inTopK"),k(n.rank>1,(function(){return"inTopK() expects the predictions to be of rank 2 or higher, but got "+n.rank})),k(n.rank-1===a.rank,(function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+n.rank+" and targets rank "+a.rank})),ke(n.shape.slice(0,n.shape.length-1),a.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),o=n.shape[n.shape.length-1],k(e>0&&e<=o,(function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last dimension ("+o+"), but got "+e})),[4,n.data()];case 1:return i=g.sent(),[4,a.data()];case 2:for(s=g.sent(),u=[i.length/o,o],l=u[1],h=yr("bool",c=u[0]),f=0;f<c;f++){for(d=f*l,p=i.subarray(d,d+l),m=[],v=0;v<p.length;v++)m.push({value:p[v],index:v});for(m.sort((function(y,b){return b.value-y.value})),h[f]=0,v=0;v<e;v++)if(m[v].index===s[f]){h[f]=1;break}}return r!==n&&n.dispose(),t!==a&&a.dispose(),[2,Ye(h,a.shape,"bool")]}}))}))};(function(r){r[r.NONE=0]="NONE",r[r.MEAN=1]="MEAN",r[r.SUM=2]="SUM",r[r.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(Ze||(Ze={}));var Sm=D({absoluteDifference_:function(r,t,e,n){n===void 0&&(n=Ze.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"labels","absoluteDifference"),o=_(t,"predictions","absoluteDifference"),i=null;e!=null&&(i=_(e,"weights","absoluteDifference")),ke(a.shape,o.shape,"Error in absoluteDifference: ");var s=a.sub(o).abs();return rn(s,i,n)}}),rn=D({computeWeightedLoss_:function(r,t,e){e===void 0&&(e=Ze.SUM_BY_NONZERO_WEIGHTS);var n=_(r,"losses","computeWeightedLoss"),a=null;t!=null&&(a=_(t,"weights","computeWeightedLoss"));var o=a==null?n:n.mul(a);if(e===Ze.NONE)return o;if(e===Ze.SUM)return o.sum();if(e===Ze.MEAN){if(a==null)return o.mean();var i=n.size/a.size,s=o.sum().div(a.sum());return i>1?s.div(K(i)):s}if(e===Ze.SUM_BY_NONZERO_WEIGHTS){if(a==null)return o.sum().div(K(n.size));var u=a.mul(ar(n.shape)).notEqual(K(0)).sum().toFloat();return o.sum().div(u)}throw Error("Unknown reduction: "+e)}}),Nm=D({cosineDistance_:function(r,t,e,n,a){a===void 0&&(a=Ze.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"labels","cosineDistance"),i=_(t,"predictions","cosineDistance"),s=null;n!=null&&(s=_(n,"weights","cosineDistance")),ke(o.shape,i.shape,"Error in cosineDistance: ");var u=K(1).sub(o.mul(i).sum(e,!0));return rn(u,s,a)}}),Dm=D({hingeLoss_:function(r,t,e,n){n===void 0&&(n=Ze.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"labels","hingeLoss"),o=_(t,"predictions","hingeLoss"),i=null;e!=null&&(i=_(e,"weights","hingeLoss")),ke(a.shape,o.shape,"Error in hingeLoss: ");var s=K(1);a=K(2).mul(a).sub(s);var u=s.sub(a.mul(o)).relu();return rn(u,i,n)}}),Am=D({huberLoss_:function(r,t,e,n,a){n===void 0&&(n=1),a===void 0&&(a=Ze.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"labels","huberLoss"),i=_(t,"predictions","huberLoss"),s=null;e!=null&&(s=_(e,"weights","huberLoss")),ke(o.shape,i.shape,"Error in huberLoss: ");var u=K(n),c=i.sub(o).abs(),l=uc(c,u),h=c.sub(l),f=K(.5).mul(l.square()).add(u.mul(h));return rn(f,s,a)}}),Tm=D({logLoss_:function(r,t,e,n,a){n===void 0&&(n=1e-7),a===void 0&&(a=Ze.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"labels","logLoss"),i=_(t,"predictions","logLoss"),s=null;e!=null&&(s=_(e,"weights","logLoss")),ke(o.shape,i.shape,"Error in logLoss: ");var u=K(1),c=K(n),l=o.mul(i.add(c).log()).neg().sub(u.sub(o).mul(u.sub(i).add(c).log()));return rn(l,s,a)}}),Fm=D({meanSquaredError_:function(r,t,e,n){n===void 0&&(n=Ze.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"labels","meanSquaredError"),o=_(t,"predictions","meanSquaredError"),i=null;e!=null&&(i=_(e,"weights","meanSquaredError")),ke(a.shape,o.shape,"Error in meanSquaredError: ");var s=a.squaredDifference(o);return rn(s,i,n)}}),Mm=D({sigmoidCrossEntropy_:function(r,t,e,n,a){n===void 0&&(n=0),a===void 0&&(a=Ze.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"multiClassLabels","sigmoidCrossEntropy"),i=_(t,"logits","sigmoidCrossEntropy"),s=null;if(e!=null&&(s=_(e,"weights","sigmoidCrossEntropy")),ke(o.shape,i.shape,"Error in sigmoidCrossEntropy: "),n>0){var u=K(n),c=K(1),l=K(.5);o=o.mul(c.sub(u)).add(l.mul(u))}var h=(function(f,d){var p=_(f,"labels","sigmoidCrossEntropyWithLogits"),m=_(d,"logits","sigmoidCrossEntropyWithLogits");ke(p.shape,m.shape,"Error in sigmoidCrossEntropyWithLogits: ");var v=m.relu(),g=m.mul(p),y=m.abs().neg().exp().log1p();return v.sub(g).add(y)})(o,i);return rn(h,s,a)}}),Pm=D({softmaxCrossEntropy_:function(r,t,e,n,a){n===void 0&&(n=0),a===void 0&&(a=Ze.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"onehotLabels","softmaxCrossEntropy"),i=_(t,"logits","softmaxCrossEntropy"),s=null;if(e!=null&&(s=_(e,"weights","softmaxCrossEntropy")),ke(o.shape,i.shape,"Error in softmaxCrossEntropy: "),n>0){var u=K(n),c=K(1),l=K(o.shape[1]);o=o.mul(c.sub(u)).add(u.div(l))}var h=(function(f,d,p){if(p===void 0&&(p=-1),p===-1&&(p=d.rank-1),p!==d.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank "+d.rank+" and dim was "+p);return Ea((function(m,v,g){var y=v.logSumExp([p],!0),b=v.toFloat().sub(y);return g([m,b]),{value:b.mul(m).neg().sum([p]),gradFunc:function(x,w){var C=w[0],N=w[1],I=ft(x.shape,[p]);return[x.reshape(I).mul(C.toFloat().sub(N.exp())),x.reshape(I).mul(N.exp().sub(C.toFloat()))]}}}))(f,d)})(o,i);return rn(h,s,a)}}),Om=Object.freeze({get Reduction(){return Ze},absoluteDifference:Sm,computeWeightedLoss:rn,cosineDistance:Nm,hingeLoss:Dm,huberLoss:Am,logLoss:Tm,meanSquaredError:Fm,sigmoidCrossEntropy:Mm,softmaxCrossEntropy:Pm});function Fs(r,t){return t===void 0&&(t=!1),T.tidy((function(){if(r.shape.length!==2)throw new Error("qr2d() requires a 2D Tensor, but got a "+r.shape.length+"D Tensor.");for(var e=r.shape[0],n=r.shape[1],a=Cu(e),o=r.clone(),i=dn([[1]],[1,1]),s=i.clone(),u=e>=n?n:e,c=function(h){var f,d=o,p=s,m=a;f=T.tidy((function(){var v=o.slice([h,h],[e-h,1]),g=v.norm(),y=o.slice([h,h],[1,1]),b=dn([[-1]]).where(y.greater(0),dn([[1]])),x=y.sub(b.mul(g)),w=v.div(x);s=w.shape[0]===1?i.clone():i.concat(w.slice([1,0],[w.shape[0]-1,w.shape[1]]),0);var C=b.matMul(x).div(g).neg(),N=o.slice([h,0],[e-h,n]),I=C.mul(s);if(h===0)o=N.sub(I.matMul(s.transpose().matMul(N)));else{var R=N.sub(I.matMul(s.transpose().matMul(N)));o=o.slice([0,0],[h,n]).concat(R,0)}var S=a.slice([0,h],[e,a.shape[1]-h]);if(h===0)a=S.sub(S.matMul(s).matMul(I.transpose()));else{var F=S.sub(S.matMul(s).matMul(I.transpose()));a=a.slice([0,0],[e,h]).concat(F,1)}return[s,o,a]})),s=f[0],o=f[1],a=f[2],ht([d,p,m])},l=0;l<u;++l)c(l);return!t&&e>n&&(a=a.slice([0,0],[e,n]),o=o.slice([0,0],[n,n])),[a,o]}))}var Bm=D({bandPart_:function(r,t,e){if(t%1!=0)throw new Error("bandPart(): numLower must be an integer, got "+t+".");if(e%1!=0)throw new Error("bandPart(): numUpper must be an integer, got "+e+".");var n=_(r,"a","bandPart");if(n.rank<2)throw new Error("bandPart(): Rank must be at least 2, got "+n.rank+".");var a=n.shape,o=n.shape.slice(-2),i=o[0],s=o[1];if(!(t<=i))throw new Error("bandPart(): numLower ("+t+") must not be greater than the number of rows ("+i+").");if(!(e<=s))throw new Error("bandPart(): numUpper ("+e+") must not be greater than the number of columns ("+s+").");t<0&&(t=i),e<0&&(e=s);var u=ia(0,i,1,"int32").reshape([-1,1]),c=ia(0,s,1,"int32"),l=Ue(u,c),h=Ia(l.lessEqual(K(+t,"int32")),l.greaterEqual(K(-e,"int32"))),f=Ae([i,s],n.dtype);return yt(je(n.reshape([-1,i,s])).map((function(d){return Nn(h,d,f)}))).reshape(a)}}),Lm=D({gramSchmidt_:function(r){var t;if(Array.isArray(r)){t=!1,k(r!=null&&r.length>0,(function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"}));for(var e=r[0].shape[0],n=function(u){k(r[u].shape[0]===e,(function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: ("+r[u].shape[0]+" vs. "+e+")"}))},a=1;a<r.length;++a)n(a)}else t=!0,r=Ho(r,r.shape[0],0).map((function(u){return ku(u,[0])}));k(r.length<=r[0].shape[0],(function(){return"Gram-Schmidt: Number of vectors ("+r.length+") exceeds number of dimensions ("+r[0].shape[0]+")."}));var o=[],i=r,s=function(u){o.push(T.tidy((function(){var c=i[u];if(u>0)for(var l=0;l<u;++l){var h=wc(o[l].mulStrict(c)).mul(o[l]);c=c.sub(h)}return c.div(kc(c,"euclidean"))})))};for(a=0;a<r.length;++a)s(a);return t?yt(o,0):o}}),Wm=D({qr_:function(r,t){if(t===void 0&&(t=!1),r.rank<2)throw new Error("qr() requires input tensor to have a rank >= 2, but got rank "+r.rank);if(r.rank===2)return Fs(r,t);var e=r.shape.slice(0,r.shape.length-2).reduce((function(i,s){return i*s})),n=je(r.reshape([e,r.shape[r.shape.length-2],r.shape[r.shape.length-1]]),0),a=[],o=[];return n.forEach((function(i){var s=Fs(i,t),u=s[0],c=s[1];a.push(u),o.push(c)})),[yt(a,0).reshape(r.shape),yt(o,0).reshape(r.shape)]}}),jm=Object.freeze({bandPart:Bm,gramSchmidt:Lm,qr:Wm});function Da(r,t,e,n,a,o){n==null&&(n=.5),a==null&&(a=Number.NEGATIVE_INFINITY),o==null&&(o=0);var i=r.shape[0];return e=Math.min(e,i),k(0<=n&&n<=1,(function(){return"iouThreshold must be in [0, 1], but was '"+n+"'"})),k(r.rank===2,(function(){return"boxes must be a 2D tensor, but was of rank '"+r.rank+"'"})),k(r.shape[1]===4,(function(){return"boxes must have 4 columns, but 2nd dimension was "+r.shape[1]})),k(t.rank===1,(function(){return"scores must be a 1D tensor"})),k(t.shape[0]===i,(function(){return"scores has incompatible shape with boxes. Expected "+i+", but was "+t.shape[0]})),k(0<=o&&o<=1,(function(){return"softNmsSigma must be in [0, 1], but was '"+o+"'"})),{maxOutputSize:e,iouThreshold:n,scoreThreshold:a,softNmsSigma:o}}var zm=D({resizeBilinear_:function(r,t,e){e===void 0&&(e=!1);var n=_(r,"images","resizeBilinear");k(n.rank===3||n.rank===4,(function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got rank "+n.rank+"."})),k(t.length===2,(function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+t+"."}));var a=n,o=!1;n.rank===3&&(o=!0,a=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var i=t[0],s=t[1],u=T.runKernelFunc((function(c,l){return l([a]),c.resizeBilinear(a,i,s,e)}),{x:a},(function(c,l){return{x:function(){return T.runKernelFunc((function(h){return h.resizeBilinearBackprop(c,l[0],e)}),{})}}}),"ResizeBilinear",{alignCorners:e,newHeight:i,newWidth:s});return o?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Um=D({resizeNearestNeighbor_:function(r,t,e){e===void 0&&(e=!1);var n=_(r,"images","resizeNearestNeighbor");k(n.rank===3||n.rank===4,(function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank "+n.rank+"."})),k(t.length===2,(function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+t+"."})),k(n.dtype==="float32"||n.dtype==="int32",(function(){return"`images` must have `int32` or `float32` as dtype"}));var a=n,o=!1;n.rank===3&&(o=!0,a=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var i=t[0],s=t[1],u=T.runKernelFunc((function(c,l){return l([a]),c.resizeNearestNeighbor(a,i,s,e)}),{batchImages:a},(function(c,l){return{batchImages:function(){return T.runKernelFunc((function(h){return h.resizeNearestNeighborBackprop(c,l[0],e)}),{})}}}));return o?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Vm=D({nonMaxSuppression_:function(r,t,e,n,a){n===void 0&&(n=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY);var o=_(r,"boxes","nonMaxSuppression"),i=_(t,"scores","nonMaxSuppression"),s=Da(o,i,e,n,a);e=s.maxOutputSize,n=s.iouThreshold,a=s.scoreThreshold;var u={maxOutputSize:e,iouThreshold:n,scoreThreshold:a};return T.runKernelFunc((function(c){return c.nonMaxSuppression(o,i,e,n,a)}),{boxes:o,scores:i},null,"NonMaxSuppressionV3",u)}}),Gm=function(r,t,e,n,a){return n===void 0&&(n=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY),J(this,void 0,void 0,(function(){var o,i,s,u,c,l,h;return Q(this,(function(f){switch(f.label){case 0:return o=_(r,"boxes","nonMaxSuppressionAsync"),i=_(t,"scores","nonMaxSuppressionAsync"),s=Da(o,i,e,n,a),e=s.maxOutputSize,n=s.iouThreshold,a=s.scoreThreshold,[4,Promise.all([o.data(),i.data()])];case 1:return u=f.sent(),c=u[0],l=u[1],h=Yo(c,l,e,n,a),o!==r&&o.dispose(),i!==t&&i.dispose(),[2,h]}}))}))},Hm=D({nonMaxSuppressionWithScore_:function(r,t,e,n,a,o){n===void 0&&(n=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY),o===void 0&&(o=0);var i=_(r,"boxes","nonMaxSuppression"),s=_(t,"scores","nonMaxSuppression"),u=Da(i,s,e,n,a,o),c={maxOutputSize:e=u.maxOutputSize,iouThreshold:n=u.iouThreshold,scoreThreshold:a=u.scoreThreshold,softNmsSigma:o=u.softNmsSigma},l=T.runKernel("NonMaxSuppressionV5",{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),qm=function(r,t,e,n,a,o){return n===void 0&&(n=.5),a===void 0&&(a=Number.NEGATIVE_INFINITY),o===void 0&&(o=0),J(this,void 0,void 0,(function(){var i,s,u,c,l,h,f;return Q(this,(function(d){switch(d.label){case 0:return i=_(r,"boxes","nonMaxSuppressionAsync"),s=_(t,"scores","nonMaxSuppressionAsync"),u=Da(i,s,e,n,a,o),e=u.maxOutputSize,n=u.iouThreshold,a=u.scoreThreshold,o=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return c=d.sent(),l=c[0],h=c[1],f=$o(l,h,e,n,a,o),i!==r&&i.dispose(),s!==t&&s.dispose(),[2,f]}}))}))},Km=D({cropAndResize_:function(r,t,e,n,a,o){var i=_(r,"image","cropAndResize"),s=_(t,"boxes","cropAndResize","float32"),u=_(e,"boxInd","cropAndResize","int32");a=a||"bilinear",o=o||0;var c=s.shape[0];return k(i.rank===4,(function(){return"Error in cropAndResize: image must be rank 4,but got rank "+i.rank+"."})),k(s.rank===2&&s.shape[1]===4,(function(){return"Error in cropAndResize: boxes must be have size ["+c+",4] but had shape "+s.shape+"."})),k(u.rank===1&&u.shape[0]===c,(function(){return"Error in cropAndResize: boxInd must be have size ["+c+"] but had shape "+s.shape+"."})),k(n.length===2,(function(){return"Error in cropAndResize: cropSize must be of length 2, but got length "+n.length+"."})),k(n[0]>=1&&n[1]>=1,(function(){return"cropSize must be atleast [1,1], but was "+n})),k(a==="bilinear"||a==="nearest",(function(){return"method must be bilinear or nearest, but was "+a})),T.runKernelFunc((function(l,h){return l.cropAndResize(i,s,u,n,a,o)}),{images:i,boxes:s,boxInd:u},null,"CropAndResize",{method:a,extrapolationValue:o,cropSize:n})}}),li=Object.freeze({resizeBilinear:zm,resizeNearestNeighbor:Um,nonMaxSuppression:Vm,nonMaxSuppressionAsync:Gm,nonMaxSuppressionWithScore:Hm,nonMaxSuppressionWithScoreAsync:qm,cropAndResize:Km}),hi=function(r,t){return!(r>0)||t==="linear"},fi=function(r,t,e){if(e==null||e==="linear")return r;if(e==="relu")return r.mul(t.step());throw new Error("Gradient for activation "+e+" has not been implemented yet.")},di=function(r,t){var e=t,n=ze(r.shape,t.shape);return n.length>0&&(e=e.sum(n)),e.reshape(r.shape)},pi=function(r,t,e){if(t==="linear")return r;if(t==="relu")return Fe(r);if(t==="elu")return Cc(r);if(t==="relu6")return Ec(r);if(t==="prelu")return _c(r,e);throw new Error("Unknown fused activation "+t+".")},Xm=D({fusedMatMul_:function(r){var t,e=r.a,n=r.b,a=r.transposeA,o=a!==void 0&&a,i=r.transposeB,s=i!==void 0&&i,u=r.bias,c=r.activation,l=c===void 0?"linear":c,h=r.preluActivationWeights;if(hi(T.state.gradientDepth,l)===!1){var f=Sa(e,n,o,s);return u!=null&&(f=me(f,u)),pi(f,l,h)}var d=_(e,"a","fused matMul"),p=_(n,"b","fused matMul");t=Me(d,p),d=t[0],p=t[1];var m=o?d.shape[d.rank-2]:d.shape[d.rank-1],v=s?p.shape[p.rank-1]:p.shape[p.rank-2],g=o?d.shape[d.rank-1]:d.shape[d.rank-2],y=s?p.shape[p.rank-2]:p.shape[p.rank-1],b=d.shape.slice(0,-2),x=p.shape.slice(0,-2),w=Z(b),C=Z(x);k(d.rank>=2&&p.rank>=2&&d.rank===p.rank,(function(){return"Error in fused matMul: inputs must have the same rank of at least 2, got ranks "+d.rank+" and "+p.rank+"."})),k(He(b,x),(function(){return"Error in fused matMul: outer dimensions ("+b+") and ("+x+") of Tensors with shapes "+d.shape+" and "+p.shape+" must match."})),k(m===v,(function(){return"Error in fused matMul: inner shapes ("+m+") and ("+v+") of Tensors with shapes "+d.shape+" and "+p.shape+" and transposeA="+o+" and transposeB="+s+" must match."}));var N,I,R=d.shape.slice(0,-2).concat([g,y]),S=o?d.as3D(w,m,g):d.as3D(w,g,m),F=s?p.as3D(C,y,v):p.as3D(C,v,y);u!=null&&be(R,(N=Me(N=_(u,"bias","fused matMul"),d)[0]).shape),h!=null&&(I=_(h,"prelu weights","fused matMul"));var A={a:S,b:F};u!=null&&(A.bias=N),h!=null&&(A.preluActivationWeights=I);var W=[S,F];return T.runKernelFunc((function(B,O){var U=B.fusedBatchMatMul({a:S,b:F,transposeA:o,transposeB:s,bias:N,activation:l,preluActivationWeights:I});return O([S,F,U]),U}),A,(function(B,O){var U=O[0],z=O[1],j=O[2],G=fi(B,j,l),q={};return u!=null&&(q={bias:function(){return di(N,G)}}),Object.assign(o||s?!o&&s?{a:function(){return G.matMul(z,!1,!1)},b:function(){return G.matMul(U,!0,!1)}}:o&&!s?{a:function(){return z.matMul(G,!1,!0)},b:function(){return U.matMul(G,!1,!1)}}:{a:function(){return z.matMul(G,!0,!0)},b:function(){return G.matMul(U,!0,!0)}}:{a:function(){return G.matMul(z,!1,!0)},b:function(){return U.matMul(G,!0,!1)}},q)}),"_FusedMatMul",{transposeA:o,transposeB:s,activation:l},W,[!0]).reshape(R)}}),Ym=D({fusedConv2d_:function(r){var t=r.x,e=r.filter,n=r.strides,a=r.pad,o=r.dataFormat,i=o===void 0?"NHWC":o,s=r.dilations,u=s===void 0?[1,1]:s,c=r.dimRoundingMode,l=r.bias,h=r.activation,f=h===void 0?"linear":h,d=r.preluActivationWeights;if(f=f||"linear",hi(T.state.gradientDepth,f)===!1){var p=St(t,e,n,a,i,u,c);return l!=null&&(p=me(p,l)),pi(p,f,d)}var m=_(t,"x","conv2d"),v=_(e,"filter","conv2d"),g=m,y=!1;m.rank===3&&(y=!0,g=m.as4D(1,m.shape[0],m.shape[1],m.shape[2])),k(g.rank===4,(function(){return"Error in fused conv2d: input must be rank 4, but got rank "+g.rank+"."})),k(v.rank===4,(function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+v.rank+"."})),c!=null&&k(Oe(a),(function(){return"Error in fused conv2d: pad must be an integer when using, dimRoundingMode "+c+" but got pad "+a+"."})),k(g.shape[3]===v.shape[2],(function(){return"Error in conv2d: depth of input ("+g.shape[3]+") must match input depth for filter "+v.shape[2]+"."})),k(dt(n,u),(function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+u+"'"})),k(i==="NHWC",(function(){return"Error in conv2d: got dataFormat of "+i+" but only NHWC is currently supported."}));var b,x,w=Fn(g.shape,v.shape,n,u,a,c);l!=null&&(b=Me(b=_(l,"bias","fused conv2d"),m)[0],be(w.outShape,b.shape)),d!=null&&(x=_(d,"prelu weights","fused conv2d"));var C={x:g,filter:v};l!=null&&(C.bias=b),d!=null&&(C.preluActivationWeights=x);var N=[v,g],I=T.runKernelFunc((function(R,S){var F=R.fusedConv2d({input:g,filter:v,convInfo:w,bias:b,activation:f,preluActivationWeights:x});return S([v,g,F]),F}),C,(function(R,S){var F=S,A=F[0],W=F[1],B=F[2],O=fi(R,B,f);k(nr(u),(function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+u+"'"}));var U={};return l!=null&&(U={bias:function(){return di(b,O)}}),Object.assign({x:function(){return pc(W.shape,O,A,n,a)},filter:function(){return ai(W,O,A.shape,n,a)}},U)}),"FusedConv2D",{convInfo:w,activation:f},N,[!0]);return y?I.as3D(I.shape[1],I.shape[2],I.shape[3]):I}}),$m=D({fusedDepthwiseConv2d_:function(r){var t=r.x,e=r.filter,n=r.strides,a=r.pad,o=r.dataFormat,i=o===void 0?"NHWC":o,s=r.dilations,u=s===void 0?[1,1]:s,c=r.dimRoundingMode,l=r.bias,h=r.activation,f=h===void 0?"linear":h,d=r.preluActivationWeights;if(hi(T.state.gradientDepth,f)===!1){var p=Ra(t,e,n,a,i,u,c);return l!=null&&(p=me(p,l)),pi(p,f,d)}var m=_(t,"x","depthwiseConv2d"),v=_(e,"filter","depthwiseConv2d"),g=m,y=!1;m.rank===3&&(y=!0,g=m.as4D(1,m.shape[0],m.shape[1],m.shape[2])),k(g.rank===4,(function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got rank "+g.rank+"."})),k(v.rank===4,(function(){return"Error in fused depthwiseConv2d: filter must be rank 4, but got rank "+v.rank+"."})),k(g.shape[3]===v.shape[2],(function(){return"Error in fused depthwiseConv2d: number of input channels ("+g.shape[3]+") must match the inChannels dimension in filter "+v.shape[2]+"."})),u==null&&(u=[1,1]),k(dt(n,u),(function(){return"Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+u+"'"})),c!=null&&k(Oe(a),(function(){return"Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode "+c+" but got pad "+a+"."}));var b,x,w=Fn(g.shape,v.shape,n,u,a,c,!0);l!=null&&(b=Me(b=_(l,"bias","fused conv2d"),m)[0],be(w.outShape,b.shape)),d!=null&&(x=_(d,"prelu weights","fused depthwiseConv2d"));var C={x:g,filter:v};l!=null&&(C.bias=b),d!=null&&(C.preluActivationWeights=x);var N=[v,g],I=T.runKernelFunc((function(R,S){var F=R.fusedDepthwiseConv2D({input:g,filter:v,convInfo:w,bias:b,activation:f,preluActivationWeights:x});return S([v,g,F]),F}),C,(function(R,S){k(nr(u),(function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+u+"'"}));var F=S[0],A=S[1],W=S[2],B=fi(R,W,f),O={};return l!=null&&(O={bias:function(){return di(b,B)}}),Object.assign({x:function(){return vc(A.shape,B,F,w)},filter:function(){return mc(A,B,F.shape,w)}},O)}),"FusedDepthwiseConv2D",{convInfo:w,activation:f},N,[!0]);return y?I.as3D(I.shape[1],I.shape[2],I.shape[3]):I}}),Jm=Object.freeze({matMul:Xm,conv2d:Ym,depthwiseConv2d:$m}),Qm=Object.freeze({image:li,linalg:jm,losses:Om,spectral:wm,fused:Jm,signal:Im,square:Tp,squaredDifference:Qu,conv1d:zv,conv2d:St,conv3d:Uv,depthwiseConv2d:Ra,separableConv2d:oi,conv2dTranspose:Vv,conv3dTranspose:Gv,op:D,batchNormalization2d:uv,batchNormalization3d:cv,batchNormalization4d:lv,batchNormalization:hv,batchNorm:ac,batchNorm2d:fv,batchNorm3d:dv,batchNorm4d:pv,booleanMaskAsync:jv,complex:Ke,real:It,imag:jt,concat:We,concat1d:$h,concat2d:Jh,concat3d:Qh,concat4d:Zh,split:Ho,matMul:Sa,dot:Hv,outerProduct:qv,reverse:Ar,reverse1d:Kv,reverse2d:Xv,reverse3d:Yv,reverse4d:$v,maxPool:Ge,avgPool:Tr,pool:Jv,maxPool3d:Qv,avgPool3d:Zv,slice:Ht,slice1d:em,slice2d:tm,slice3d:yc,slice4d:nm,abs:Fp,acos:Mp,acosh:Pp,asin:Op,asinh:Bp,atan:Lp,atanh:Wp,ceil:jp,clipByValue:ti,cos:zp,cosh:Up,erf:Vp,exp:To,expm1:Gp,floor:Hp,log:qp,log1p:Kp,logSigmoid:Xp,neg:pa,reciprocal:Yp,round:$p,rsqrt:Zu,sigmoid:ec,sign:Jp,isNaN:Qp,isInf:Zp,isFinite:ev,sin:tv,sinh:nv,softplus:rv,sqrt:av,step:ov,tan:iv,tanh:sv,all:rm,any:am,argMax:om,argMin:im,logSumExp:sm,max:Na,mean:um,min:cm,moments:lm,sum:wc,prod:hm,equal:cc,equalStrict:Dv,greater:Av,greaterEqual:lc,greaterEqualStrict:Tv,greaterStrict:Fv,less:Mv,lessEqual:Pv,lessEqualStrict:Ov,lessStrict:Bv,notEqual:Lv,notEqualStrict:Wv,add:me,addN:gv,addStrict:xv,atan2:yv,div:At,divNoNan:bv,divStrict:wv,floorDiv:sc,maximum:ni,maximumStrict:Cv,minimum:uc,minimumStrict:_v,mod:Ev,modStrict:kv,mul:et,mulStrict:Iv,pow:va,powStrict:Rv,squaredDifferenceStrict:Sv,sub:Ue,subStrict:Nv,elu:Cc,leakyRelu:fm,prelu:_c,relu:Fe,relu6:Ec,selu:dm,logicalAnd:Ia,logicalNot:vv,logicalOr:oc,logicalXor:mv,where:Nn,whereAsync:ic,buffer:le,print:cf,batchToSpaceND:wu,broadcastTo:lf,cast:hf,clone:ff,cumsum:df,depthToSpace:pf,expandDims:kt,eye:Cu,multinomial:vf,oneHot:So,pad:Tn,pad1d:mf,pad2d:gf,pad3d:xf,pad4d:yf,rand:bf,randomNormal:wf,randomGamma:Cf,randomUniform:_u,reshape:Tt,spaceToBatchND:Eu,squeeze:ku,stack:yt,tile:qn,truncatedNormal:_f,unstack:je,setdiff1dAsync:Ef,fill:Gt,linspace:Yh,ones:ar,range:ia,scalar:K,tensor:Ye,tensor1d:Be,tensor2d:dn,tensor3d:Go,tensor4d:ut,tensor5d:qh,tensor6d:Kh,variable:Xh,zeros:Ae,onesLike:bu,zerosLike:Ce,transpose:mn,softmax:nn,logSoftmax:Af,localResponseNormalization:pm,norm:kc,gather:ri,unsortedSegmentSum:hc,basicLSTMCell:vm,multiRNNCell:mm,movingAverage:gm,stridedSlice:xm,topk:ym,scatterND:bm,fft:ii,ifft:ma,rfft:si,irfft:Ic,sparseToDense:Cm,gatherND:_m,diag:Em,dropout:km,hannWindow:ui,hammingWindow:Sc,frame:ci,stft:Nc,inTopKAsync:Rm});function V(r,t){Array.isArray(r)||(r=[r]),r.forEach((function(e){e!=null&&k(e.dtype!=="complex64",(function(){return t+" does not support complex64 tensors."}))}))}function so(r,t,e,n){if(e==="linear")return r.linear(t);if(e==="relu")return r.relu(t);if(e==="elu")return r.elu(t);if(e==="relu6")return r.relu6(t);if(e==="prelu")return r.prelu(t,n);throw new Error("Activation "+e+" has not been implemented for the CPU backend.")}var Zm=(function(r){function t(){var e=r.call(this)||this;return e.blockSize=48,e.firstUse=!0,e.data=new Tu(e,T),e}return Mt(t,r),t.prototype.write=function(e,n,a){this.firstUse&&(this.firstUse=!1,L().get("IS_NODE")&&aa(`
============================
Hi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================`));var o={};return this.data.set(o,{values:e,dtype:a}),o},t.prototype.move=function(e,n,a,o){this.data.set(e,{values:n,dtype:o})},t.prototype.numDataIds=function(){return this.data.numDataIds()},t.prototype.read=function(e){return J(this,void 0,void 0,(function(){return Q(this,(function(n){return[2,this.readSync(e)]}))}))},t.prototype.readSync=function(e){var n=this.data.get(e),a=n.dtype,o=n.complexTensors;return a==="complex64"?Ao(this.readSync(o.real.dataId),this.readSync(o.imag.dataId)):this.data.get(e).values},t.prototype.bufferSync=function(e){var n=this.readSync(e.dataId),a=n;if(e.dtype==="string")try{a=n.map((function(o){return ta(o)}))}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return le(e.shape,e.dtype,a)},t.prototype.makeOutput=function(e,n,a){var o=this.write(e,n,a);return T.makeTensorFromDataId(o,n,a,this)},t.prototype.disposeData=function(e){if(this.data.has(e)){var n=this.data.get(e).complexTensors;n!=null&&(n.real.dispose(),n.imag.dispose()),this.data.delete(e)}},t.prototype.time=function(e){return J(this,void 0,void 0,(function(){var n;return Q(this,(function(a){return n=Lt(),e(),[2,{kernelMs:Lt()-n}]}))}))},t.prototype.memory=function(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}},t.prototype.complex=function(e,n){var a=this.makeOutput(null,e.shape,"complex64");return this.data.get(a.dataId).complexTensors={real:T.keep(e.clone()),imag:T.keep(n.clone())},a},t.prototype.real=function(e){return this.data.get(e.dataId).complexTensors.real.clone()},t.prototype.imag=function(e){return this.data.get(e.dataId).complexTensors.imag.clone()},t.prototype.slice=function(e,n,a){if(V(e,"slice"),Du(e.shape,n,a)){var o=Au(n,e.strides),i=Z(a);return Ye(this.readSync(e.dataId).subarray(o,o+i),a,e.dtype)}for(var s=le(a,e.dtype),u=this.bufferSync(e),c=0;c<s.size;++c){var l=s.indexToLoc(c).map((function(h,f){return h+n[f]}));s.values[c]=u.get.apply(u,l)}return s.toTensor()},t.prototype.stridedSlice=function(e,n,a,o){V(e,"stridedSlice");var i=Ko(n,a,o);if(i.some((function(d){return d===0})))return Ye([],i);for(var s=le(i,e.dtype),u=this.bufferSync(e),c=0;c<s.size;c++){for(var l=s.indexToLoc(c),h=new Array(l.length),f=0;f<h.length;f++)h[f]=l[f]*o[f]+n[f];s.set.apply(s,[u.get.apply(u,h)].concat(l))}return s.toTensor()},t.prototype.diag=function(e){for(var n=this.readSync(e.dataId),a=le([e.size,e.size],e.dtype),o=a.values,i=0;i<n.length;i++)o[i*e.size+i]=n[i];return a.toTensor()},t.prototype.unstack=function(e,n){for(var a=e.shape[n],o=new Array(e.rank-1),i=0,s=0;s<e.rank;s++)s!==n&&(o[i++]=e.shape[s]);var u=new Array(e.rank).fill(0),c=e.shape.slice();c[n]=1;var l=new Array(a);for(s=0;s<l.length;s++)u[n]=s,l[s]=this.slice(e,u,c).reshape(o);return l},t.prototype.reverse=function(e,n){V(e,"reverse");for(var a=le(e.shape,e.dtype),o=this.bufferSync(e),i=function(u){var c=a.indexToLoc(u),l=c.slice();n.forEach((function(h){return l[h]=e.shape[h]-1-l[h]})),a.set.apply(a,[o.get.apply(o,l)].concat(c))},s=0;s<a.size;s++)i(s);return a.toTensor()},t.prototype.concat=function(e,n){var a=this;if(e[0].dtype==="complex64"){var o=e.map((function(d){return It(d)})),i=e.map((function(d){return jt(d)}));return Ke(this.concat(o,n),this.concat(i,n))}var s=e.map((function(d){var p=Z(d.shape.slice(n));return d.as2D(-1,p)})),u=tr(s.map((function(d){return d.shape})),1),c=le(u,e[0].dtype).values;if(s[0].shape[0]===1){var l=0;s.forEach((function(d){c.set(a.readSync(d.dataId),l),l+=d.size}))}else{var h=0;s.forEach((function(d){for(var p=a.readSync(d.dataId),m=0,v=0;v<d.shape[0];++v)for(var g=v*u[1]+h,y=0;y<d.shape[1];++y)c[g+y]=p[m++];h+=d.shape[1]}))}var f=tr(e.map((function(d){return d.shape})),n);return Ye(c,f,e[0].dtype)},t.prototype.neg=function(e){return V(e,"neg"),this.multiply(K(-1),e)},t.prototype.add=function(e,n){return e.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),n.cast("complex64"),(function(a,o,i,s){return{real:a+i,imag:o+s}})):this.broadcastedBinaryOp(e,n,Xe(e.dtype,n.dtype),(function(a,o){return a+o}))},t.prototype.addN=function(e){var n=this;V(e,"addN");for(var a=e.map((function(l){return n.readSync(l.dataId)})),o=le(e[0].shape,e[0].dtype),i=o.values,s=0;s<e.length;s++)for(var u=a[s],c=0;c<i.length;c++)i[c]+=u[c];return o.toTensor()},t.prototype.softmax=function(e,n){var a=Ve([n],e.shape),o=this.max(e,a),i=ft(o.shape,a),s=this.subtract(e,o.reshape(i)),u=this.exp(s),c=this.sum(u,a).reshape(i);return this.realDivide(u,c)},t.prototype.subtract=function(e,n){return e.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),n.cast("complex64"),(function(a,o,i,s){return{real:a-i,imag:o-s}})):this.broadcastedBinaryOp(e,n,Xe(e.dtype,n.dtype),(function(a,o){return a-o}))},t.prototype.pow=function(e,n){return V([e,n],"pow"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){return Math.pow(a,o)}))},t.prototype.batchMatMul=function(e,n,a,o){V([e,n],"matMul");for(var i=a?e.shape[1]:e.shape[2],s=a?e.shape[2]:e.shape[1],u=o?n.shape[1]:n.shape[2],c=e.shape[0],l=this.readSync(e.dataId),h=this.readSync(n.dataId),f=a?[e.strides[0],1,e.strides[1]]:[e.strides[0],e.strides[1],1],d=f[0],p=f[1],m=f[2],v=o?[1,n.strides[1],n.strides[0]]:[n.strides[1],1,n.strides[0]],g=v[0],y=v[1],b=v[2],x=s*u,w=le([c,s,u],e.dtype),C=w.values,N=this.blockSize,I=0;I<c;I++)for(var R=0;R<s;R+=N)for(var S=0;S<u;S+=N)for(var F=0;F<i;F+=N)for(var A=Math.min(R+N,s),W=Math.min(S+N,u),B=Math.min(F+N,i),O=R;O<A;O++)for(var U=S;U<W;U++){for(var z=0,j=F;j<B;j++)z+=l[I*d+O*p+j*m]*h[j*g+U*y+I*b];C[I*x+(O*u+U)]+=z}return w.toTensor()},t.prototype.fusedBatchMatMul=function(e){var n=e.a,a=e.b,o=e.transposeA,i=e.transposeB,s=e.bias,u=e.activation,c=e.preluActivationWeights,l=this.batchMatMul(n,a,o,i);return s&&(l=this.add(l,s)),u&&(l=so(this,l,u,c)),l},t.prototype.multiply=function(e,n){return e.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(e.cast("complex64"),n.cast("complex64"),(function(a,o,i,s){return{real:a*i-o*s,imag:a*s+o*i}})):this.broadcastedBinaryOp(e,n,Xe(e.dtype,n.dtype),(function(a,o){return a*o}))},t.prototype.realDivide=function(e,n){return V([e,n],"realDivide"),this.broadcastedBinaryOp(e,n,"float32",(function(a,o){return a/o}))},t.prototype.floorDiv=function(e,n){return V([e,n],"floorDiv"),this.broadcastedBinaryOp(e,n,"int32",(function(a,o){return Math.floor(a/o)}))},t.prototype.sum=function(e,n){V(e,"sum"),pt("sum",n,e.rank);for(var a=$e(e.shape,n),o=a[0],i=a[1],s=Ae(o,Xe(e.dtype,"int32")),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=0,p=0;p<u;++p)d+=l[f+p];c[h]=d}return s},t.prototype.prod=function(e,n){V(e,"sum");for(var a=$e(e.shape,n),o=a[0],i=a[1],s=Ae(o,Xe(e.dtype,"int32")),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=1,p=0;p<u;++p)d*=l[f+p];c[h]=d}return s},t.prototype.unsortedSegmentSum=function(e,n,a){V(e,"unsortedSegmentSum");for(var o=[],i=e.rank-n.rank,s=0;s<i;++s)n=n.expandDims(s+1);for(s=0;s<a;++s){var u=K(s,"int32"),c=cc(u,n).asType("float32").mul(e).sum(0);o.push(c)}return yt(o)},t.prototype.argMin=function(e,n){V(e,"argMin");var a=[n];pt("argMin",a,e.rank);for(var o=$e(e.shape,a),i=o[0],s=o[1],u=Ae(i,"int32"),c=Z(s),l=this.readSync(u.dataId),h=this.readSync(e.dataId),f=0;f<l.length;++f){for(var d=f*c,p=h[d],m=0,v=0;v<c;++v){var g=h[d+v];g<p&&(p=g,m=v)}l[f]=m}return u},t.prototype.argMax=function(e,n){V(e,"argMax");var a=[n];pt("argMax",a,e.rank);for(var o=$e(e.shape,a),i=o[0],s=o[1],u=Ae(i,"int32"),c=Z(s),l=this.readSync(u.dataId),h=this.readSync(e.dataId),f=0;f<l.length;++f){for(var d=f*c,p=h[d],m=0,v=0;v<c;++v){var g=h[d+v];g>p&&(p=g,m=v)}l[f]=m}return u},t.prototype.cumsum=function(e,n,a,o){if(V(e,"cumsum"),n!==e.rank-1)throw new Error("backend.cumsum in CPU expects an inner-most axis="+(e.rank-1)+" but got axis="+n);for(var i=Xe(e.dtype,"int32"),s=Ae(e.shape,i),u=this.readSync(s.dataId),c=this.readSync(e.dataId),l=e.shape[e.rank-1],h=o?function(v,g){return v+l-g-1}:function(v,g){return v+g},f=0;f<c.length;f+=l)for(var d=0;d<l;d++){var p=h(f,d);if(d===0)u[p]=a?0:c[p];else{var m=h(f,d-1);u[p]=a?c[m]+u[m]:c[p]+u[m]}}return s},t.prototype.equal=function(e,n){return V([e,n],"equal"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a===o?1:0}))},t.prototype.notEqual=function(e,n){return V([e,n],"notEqual"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a!==o?1:0}))},t.prototype.less=function(e,n){return V([e,n],"less"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a<o?1:0}))},t.prototype.lessEqual=function(e,n){return V([e,n],"lessEqual"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a<=o?1:0}))},t.prototype.greater=function(e,n){return V([e,n],"greater"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a>o?1:0}))},t.prototype.greaterEqual=function(e,n){return V([e,n],"greaterEqual"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a>=o?1:0}))},t.prototype.logicalNot=function(e){V(e,"logicalNot");for(var n=this.readSync(e.dataId),a=new Uint8Array(n.length),o=0;o<n.length;++o)a[o]=n[o]?0:1;return this.makeOutput(a,e.shape,"bool")},t.prototype.logicalAnd=function(e,n){return V([e,n],"logicalAnd"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a&&o}))},t.prototype.logicalOr=function(e,n){return V([e,n],"logicalOr"),this.broadcastedBinaryOp(e,n,"bool",(function(a,o){return a||o}))},t.prototype.select=function(e,n,a){V([e,n,a],"select");for(var o=this.readSync(e.dataId),i=this.readSync(n.dataId),s=this.readSync(a.dataId),u=Ae(n.shape,Xe(n.dtype,a.dtype)),c=this.readSync(u.dataId),l=0,h=e.rank===0||e.rank>1||n.rank===1?1:Z(n.shape.slice(1)),f=0;f<o.length;f++)for(var d=0;d<h;d++)o[f]===1?c[l++]=i[f]:c[l++]=s[f];return u},t.prototype.where=function(e){V([e],"where");var n=this.readSync(e.dataId);return Jo(e.shape,n)},t.prototype.topk=function(e,n,a){return V(e,"topk"),ju(this.readSync(e.dataId),e.shape,e.dtype,n)},t.prototype.min=function(e,n){V(e,"min"),pt("min",n,e.rank);for(var a=$e(e.shape,n),o=a[0],i=a[1],s=Ae(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var m=l[f+p];m<d&&(d=m)}c[h]=d}return s},t.prototype.minimum=function(e,n){return V([e,n],"minimum"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){return Math.min(a,o)}))},t.prototype.mod=function(e,n){return V([e,n],"mod"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){var i=a%o;return a<0&&o<0||a>=0&&o>=0?i:(i+o)%o}))},t.prototype.max=function(e,n){V(e,"max"),pt("max",n,e.rank);for(var a=$e(e.shape,n),o=a[0],i=a[1],s=Ae(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var m=l[f+p];m>d&&(d=m)}c[h]=d}return s},t.prototype.maximum=function(e,n){return V([e,n],"maximum"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){return Math.max(a,o)}))},t.prototype.all=function(e,n){V(e,"all"),pt("all",n,e.rank);for(var a=$e(e.shape,n),o=a[0],i=a[1],s=Ae(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var m=l[f+p];d=d&&m}c[h]=d}return s},t.prototype.any=function(e,n){V(e,"any"),pt("any",n,e.rank);for(var a=$e(e.shape,n),o=a[0],i=a[1],s=Ae(o,e.dtype),u=Z(i),c=this.readSync(s.dataId),l=this.readSync(e.dataId),h=0;h<c.length;++h){for(var f=h*u,d=l[f],p=0;p<u;++p){var m=l[f+p];d=d||m}c[h]=d}return s},t.prototype.squaredDifference=function(e,n){return V([e,n],"squaredDifference"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){var i=a-o;return i*i}))},t.prototype.ceil=function(e){V(e,"ceil");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o)a[o]=Math.ceil(n[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.floor=function(e){V(e,"floor");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o)a[o]=Math.floor(n[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.sign=function(e){V(e,"x");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o)n[o]<0?a[o]=-1:n[o]>0?a[o]=1:a[o]=0;return this.makeOutput(a,e.shape,"float32")},t.prototype.isNaN=function(e){V(e,"x");for(var n=this.readSync(e.dataId),a=new Uint8Array(n.length),o=0;o<n.length;++o)Number.isNaN(n[o])&&(a[o]=1);return this.makeOutput(a,e.shape,"bool")},t.prototype.isInf=function(e){V(e,"x");for(var n=this.readSync(e.dataId),a=new Uint8Array(n.length),o=0;o<n.length;++o)Math.abs(n[o])===1/0&&(a[o]=1);return this.makeOutput(a,e.shape,"bool")},t.prototype.isFinite=function(e){V(e,"x");for(var n=this.readSync(e.dataId),a=new Uint8Array(n.length),o=0;o<n.length;++o)Number.isFinite(n[o])&&(a[o]=1);return this.makeOutput(a,e.shape,"bool")},t.prototype.round=function(e){V(e,"round");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o){var i=Math.floor(n[o]);n[o]-i<.5?a[o]=Math.floor(n[o]):n[o]-i>.5?a[o]=Math.ceil(n[o]):a[o]=i%2==0?i:i+1}return this.makeOutput(a,e.shape,"float32")},t.prototype.exp=function(e){V(e,"exp");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o)a[o]=Math.exp(n[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.expm1=function(e){V(e,"expm1");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o)a[o]=Math.expm1(n[o]);return this.makeOutput(a,e.shape,"float32")},t.prototype.log=function(e){V(e,"log");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o){var i=n[o];a[o]=Math.log(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.log1p=function(e){V(e,"log1p");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o){var i=n[o];a[o]=Math.log1p(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.sqrt=function(e){V(e,"sqrt");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o){var i=n[o];a[o]=Math.sqrt(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.rsqrt=function(e){V(e,"rsqrt");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o){var i=n[o];a[o]=1/Math.sqrt(i)}return this.makeOutput(a,e.shape,"float32")},t.prototype.reciprocal=function(e){V(e,"reciprocal");for(var n=this.readSync(e.dataId),a=new Float32Array(n.length),o=0;o<n.length;++o)a[o]=1/n[o];return this.makeOutput(a,e.shape,"float32")},t.prototype.linear=function(e){return e},t.prototype.relu=function(e){V(e,"relu");for(var n=Ae(e.shape,e.dtype),a=this.readSync(n.dataId),o=this.readSync(e.dataId),i=0;i<o.length;++i)a[i]=Math.max(0,o[i]);return n},t.prototype.relu6=function(e){V(e,"relu");for(var n=Ae(e.shape,e.dtype),a=this.readSync(n.dataId),o=this.readSync(e.dataId),i=0;i<o.length;++i)a[i]=Math.min(Math.max(0,o[i]),6);return n},t.prototype.prelu=function(e,n){return V([e,n],"prelu"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){return a<0?o*a:a}))},t.prototype.elu=function(e){V(e,"elu");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o){var i=a[o];n[o]=i>=0?i:Math.exp(i)-1}return this.makeOutput(n,e.shape,"float32")},t.prototype.eluDer=function(e,n){V([e,n],"eluDer");for(var a=new Float32Array(n.size),o=this.readSync(n.dataId),i=this.readSync(e.dataId),s=0;s<o.length;++s){var u=o[s];a[s]=u>=1?i[s]:i[s]*(u+1)}return this.makeOutput(a,n.shape,"float32")},t.prototype.selu=function(e){V(e,"selu");for(var n=Zo,a=ei,o=new Float32Array(e.size),i=this.readSync(e.dataId),s=0;s<i.length;++s){var u=i[s];o[s]=u>=0?a*u:n*(Math.exp(u)-1)}return this.makeOutput(o,e.shape,"float32")},t.prototype.clip=function(e,n,a){V(e,"clip");for(var o=new Float32Array(e.size),i=this.readSync(e.dataId),s=0;s<i.length;++s){var u=i[s];o[s]=u>a?a:u<n?n:u}return this.makeOutput(o,e.shape,"float32")},t.prototype.abs=function(e){for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.abs(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.complexAbs=function(e){for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<e.size;++o){var i=a[2*o],s=a[2*o+1];n[o]=Math.hypot(i,s)}return this.makeOutput(n,e.shape,"float32")},t.prototype.int=function(e){V(e,"int");for(var n=new Int32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=a[o];return this.makeOutput(n,e.shape,"int32")},t.prototype.sigmoid=function(e){V(e,"sigmoid");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=1/(1+Math.exp(-a[o]));return this.makeOutput(n,e.shape,"float32")},t.prototype.softplus=function(e){V(e,"softplus");for(var n=Math.log(11920928955078125e-23)+2,a=new Float32Array(e.size),o=this.readSync(e.dataId),i=0;i<o.length;++i){var s=o[i]>-n,u=o[i]<n,c=Math.exp(o[i]),l=void 0;l=u?c:s?o[i]:Math.log(1+c),a[i]=l}return this.makeOutput(a,e.shape,"float32")},t.prototype.sin=function(e){V(e,"sin");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.sin(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.cos=function(e){V(e,"cos");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.cos(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.tan=function(e){V(e,"tan");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.tan(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.asin=function(e){V(e,"asin");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.asin(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.acos=function(e){V(e,"acos");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.acos(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.atan=function(e){V(e,"atan");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.atan(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.atan2=function(e,n){return V([e,n],"atan2"),this.broadcastedBinaryOp(e,n,e.dtype,(function(a,o){return Math.atan2(a,o)}))},t.prototype.sinh=function(e){V(e,"sinh");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.sinh(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.cosh=function(e){V(e,"cosh");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.cosh(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.tanh=function(e){V(e,"tanh");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Zl(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.asinh=function(e){V(e,"asinh");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.asinh(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.acosh=function(e){V(e,"acosh");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.acosh(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.atanh=function(e){V(e,"atanh");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o)n[o]=Math.atanh(a[o]);return this.makeOutput(n,e.shape,"float32")},t.prototype.erf=function(e){V(e,"erf");for(var n=new Float32Array(e.size),a=this.readSync(e.dataId),o=0;o<a.length;++o){var i=Math.sign(a[o]),s=Math.abs(a[o]),u=1/(1+.3275911*s);n[o]=i*(1-((((1.061405429*u-1.453152027)*u+1.421413741)*u-.284496736)*u+.254829592)*u*Math.exp(-s*s))}return this.makeOutput(n,e.shape,"float32")},t.prototype.step=function(e,n){n===void 0&&(n=0),V(e,"step");for(var a=new Float32Array(e.size),o=this.readSync(e.dataId),i=0;i<o.length;++i){var s=o[i];isNaN(s)?a[i]=NaN:a[i]=s>0?1:n}return this.makeOutput(a,e.shape,"float32")},t.prototype.fusedConv2d=function(e){var n=e.input,a=e.filter,o=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights,c=this.conv2d(n,a,o);return i&&(c=this.add(c,i)),s&&(c=so(this,c,s,u)),c},t.prototype.conv2d=function(e,n,a){V([e,n],"conv2d");for(var o=a.filterHeight,i=a.filterWidth,s=a.dilationHeight,u=a.dilationWidth,c=a.padInfo.left,l=a.padInfo.top,h=a.dataFormat==="channelsLast",f=le(a.outShape,e.dtype),d=e.strides[0],p=h?e.strides[1]:e.strides[2],m=h?e.strides[2]:1,v=h?1:e.strides[1],g=f.strides[0],y=h?f.strides[1]:f.strides[2],b=h?f.strides[2]:1,x=h?1:f.strides[1],w=this.readSync(e.dataId),C=this.readSync(n.dataId),N=f.values,I=0;I<a.batchSize;++I)for(var R=I*d,S=I*g,F=0;F<a.outHeight;++F)for(var A=S+F*y,W=F*a.strideHeight-l,B=0;B<o;B++){var O=W+B*s;if(!(O<0||O>=a.inHeight))for(var U=B*n.strides[0],z=R+O*p,j=0;j<a.outWidth;++j)for(var G=A+j*b,q=j*a.strideWidth-c,X=0;X<i;X++){var $=q+X*u;if(!($<0||$>=a.inWidth))for(var ae=z+$*m,se=U+X*n.strides[1],oe=0;oe<a.inChannels;++oe){for(var pe=w[ae+oe*v],he=0;he<a.outChannels;++he)N[G+he*x]+=pe*C[se+he];se+=a.outChannels}}}return f.toTensor()},t.prototype.conv3d=function(e,n,a){for(var o=a.filterDepth,i=a.filterHeight,s=a.filterWidth,u=a.dilationDepth,c=a.dilationHeight,l=a.dilationWidth,h=a.padInfo.front,f=a.padInfo.left,d=a.padInfo.top,p=le(a.outShape,e.dtype),m=this.readSync(e.dataId),v=this.readSync(n.dataId),g=p.values,y=0;y<a.batchSize;++y)for(var b=y*e.strides[0],x=y*p.strides[0],w=0;w<a.outDepth;++w)for(var C=x+w*p.strides[1],N=w*a.strideDepth-h,I=0;I<o;I++){var R=N+I*u;if(!(R<0||R>=a.inDepth))for(var S=I*n.strides[0],F=b+R*e.strides[1],A=0;A<a.outHeight;++A)for(var W=C+A*p.strides[2],B=A*a.strideHeight-d,O=0;O<i;O++){var U=B+O*c;if(!(U<0||U>=a.inHeight))for(var z=S+O*n.strides[1],j=F+U*e.strides[2],G=0;G<a.outWidth;++G)for(var q=W+G*a.outChannels,X=G*a.strideWidth-f,$=0;$<s;$++){var ae=X+$*l;if(!(ae<0||ae>=a.inWidth))for(var se=z+$*n.strides[2],oe=j+ae*a.inChannels,pe=se,he=0;he<a.inChannels;++he){for(var de=m[oe+he],we=0;we<a.outChannels;++we)g[q+we]+=de*v[pe+we];pe+=a.outChannels}}}}return p.toTensor()},t.prototype.conv2dDerInput=function(e,n,a){V([e,n],"conv2dDerInput");for(var o=le(a.inShape,"float32"),i=o.values,s=this.readSync(e.dataId),u=this.readSync(n.dataId),c=n.strides,l=c[0],h=c[1],f=c[2],d=a.batchSize,p=a.filterHeight,m=a.filterWidth,v=a.inChannels,g=a.inHeight,y=a.inWidth,b=a.outChannels,x=a.outHeight,w=a.outWidth,C=a.strideHeight,N=a.strideWidth,I=a.dataFormat,R=p-1-a.padInfo.top,S=m-1-a.padInfo.left,F=I==="channelsLast",A=o.strides[0],W=F?o.strides[1]:o.strides[2],B=F?o.strides[2]:1,O=F?1:o.strides[1],U=e.strides[0],z=F?e.strides[1]:e.strides[2],j=F?e.strides[2]:1,G=F?1:e.strides[1],q=0;q<d;++q)for(var X=0;X<v;++X)for(var $=0;$<g;++$)for(var ae=$-R,se=Math.max(0,Math.ceil(ae/C)),oe=Math.min(x,(p+ae)/C),pe=0;pe<y;++pe){for(var he=pe-S,de=Math.max(0,Math.ceil(he/N)),we=Math.min(w,(m+he)/N),De=0,ge=se;ge<oe;++ge)for(var _e=ge*C-ae,xe=de;xe<we;++xe)for(var Re=U*q+z*ge+j*xe,Ie=l*(p-1-_e)+h*(m-1-(xe*N-he))+f*X,Se=0;Se<b;++Se)De+=s[Re+G*Se]*u[Ie+Se];i[A*q+W*$+B*pe+O*X]=De}return o.toTensor()},t.prototype.conv3dDerInput=function(e,n,a){for(var o=le(a.inShape,"float32"),i=o.values,s=o.strides,u=s[0],c=s[1],l=s[2],h=s[3],f=this.readSync(e.dataId),d=e.strides,p=d[0],m=d[1],v=d[2],g=d[3],y=this.readSync(n.dataId),b=n.strides,x=b[0],w=b[1],C=b[2],N=b[3],I=a.batchSize,R=a.filterDepth,S=a.filterHeight,F=a.filterWidth,A=a.inChannels,W=a.inDepth,B=a.inHeight,O=a.inWidth,U=a.outChannels,z=a.outDepth,j=a.outHeight,G=a.outWidth,q=a.strideDepth,X=a.strideHeight,$=a.strideWidth,ae=R-1-a.padInfo.front,se=S-1-a.padInfo.top,oe=F-1-a.padInfo.left,pe=0;pe<I;++pe)for(var he=0;he<A;++he)for(var de=0;de<W;++de)for(var we=de-ae,De=Math.max(0,Math.ceil(we/q)),ge=Math.min(z,(R+we)/q),_e=0;_e<B;++_e)for(var xe=_e-se,Re=Math.max(0,Math.ceil(xe/X)),Ie=Math.min(j,(S+xe)/X),Se=0;Se<O;++Se){for(var bt=Se-oe,wt=Math.max(0,Math.ceil(bt/$)),nt=Math.min(G,(F+bt)/$),Nt=0,ot=De;ot<ge;++ot)for(var Dt=ot*q-we,Ct=Re;Ct<Ie;++Ct)for(var $t=Ct*X-xe,_t=wt;_t<nt;++_t)for(var On=p*pe+m*ot+v*Ct+g*_t,un=x*(R-1-Dt)+w*(S-1-$t)+C*(F-1-(_t*$-bt))+N*he,rt=0;rt<U;++rt)Nt+=f[On+rt]*y[un+rt];i[u*pe+c*de+l*_e+h*Se+he]=Nt}return o.toTensor()},t.prototype.conv2dDerFilter=function(e,n,a){V([e,n],"conv2dDerFilter");for(var o=a.strideHeight,i=a.strideWidth,s=a.filterHeight,u=a.filterWidth,c=a.dataFormat==="channelsLast",l=le(a.filterShape,"float32"),h=a.padInfo.left,f=a.padInfo.top,d=this.bufferSync(e),p=this.bufferSync(n),m=0;m<s;++m)for(var v=Math.max(0,Math.ceil((f-m)/o)),g=Math.min(a.outHeight,(a.inHeight+f-m)/o),y=0;y<u;++y)for(var b=Math.max(0,Math.ceil((h-y)/i)),x=Math.min(a.outWidth,(a.inWidth+h-y)/i),w=0;w<a.inChannels;++w)for(var C=0;C<a.outChannels;++C){for(var N=0,I=0;I<a.batchSize;++I)for(var R=v;R<g;++R)for(var S=m+R*o-f,F=b;F<x;++F){var A=y+F*i-h;N+=c?d.get(I,S,A,w)*p.get(I,R,F,C):d.get(I,w,S,A)*p.get(I,C,R,F)}l.set(N,m,y,w,C)}return l.toTensor()},t.prototype.conv3dDerFilter=function(e,n,a){for(var o=a.strideDepth,i=a.strideHeight,s=a.strideWidth,u=a.filterDepth,c=a.filterHeight,l=a.filterWidth,h=le(a.filterShape,"float32"),f=h.values,d=h.strides,p=d[0],m=d[1],v=d[2],g=d[3],y=this.readSync(n.dataId),b=n.strides,x=b[0],w=b[1],C=b[2],N=b[3],I=this.readSync(e.dataId),R=e.strides,S=R[0],F=R[1],A=R[2],W=R[3],B=a.padInfo.front,O=a.padInfo.left,U=a.padInfo.top,z=0;z<u;++z)for(var j=Math.max(0,Math.ceil((B-z)/o)),G=Math.min(a.outDepth,(a.inDepth+B-z)/o),q=z*p,X=0;X<c;++X)for(var $=Math.max(0,Math.ceil((U-X)/i)),ae=Math.min(a.outHeight,(a.inHeight+U-X)/i),se=X*m+q,oe=0;oe<l;++oe)for(var pe=Math.max(0,Math.ceil((O-oe)/s)),he=Math.min(a.outWidth,(a.inWidth+O-oe)/s),de=oe*v+se,we=0;we<a.inChannels;++we)for(var De=we*g+de,ge=0;ge<a.outChannels;++ge){for(var _e=0,xe=0;xe<a.batchSize;++xe)for(var Re=xe*S,Ie=xe*x,Se=j;Se<G;++Se)for(var bt=(z+Se*o-B)*F+Re,wt=Se*w+Ie,nt=$;nt<ae;++nt)for(var Nt=(X+nt*i-U)*A+bt,ot=nt*C+wt,Dt=pe;Dt<he;++Dt){var Ct=Dt*N+ot;_e+=I[(oe+Dt*s-O)*W+Nt+we]*y[Ct+ge]}f[De+ge]=_e}return h.toTensor()},t.prototype.fusedDepthwiseConv2D=function(e){var n=e.input,a=e.filter,o=e.convInfo,i=e.bias,s=e.activation,u=e.preluActivationWeights,c=this.depthwiseConv2D(n,a,o);return i&&(c=this.add(c,i)),s&&(c=so(this,c,s,u)),c},t.prototype.depthwiseConv2D=function(e,n,a){V([e,n],"depthwiseConv2D");for(var o=a.filterHeight,i=a.filterWidth,s=a.dilationHeight,u=a.dilationWidth,c=a.padInfo.left,l=a.padInfo.top,h=a.outChannels/a.inChannels,f=le(a.outShape,e.dtype),d=this.readSync(e.dataId),p=this.readSync(n.dataId),m=f.values,v=0;v<a.batchSize;++v)for(var g=v*e.strides[0],y=v*f.strides[0],b=0;b<a.outHeight;++b)for(var x=y+b*f.strides[1],w=b*a.strideHeight-c,C=0;C<o;++C){var N=w+C*s;if(!(N<0||N>=a.inHeight))for(var I=C*n.strides[0],R=g+N*e.strides[1],S=0;S<a.outWidth;++S)for(var F=x+S*f.strides[2],A=S*a.strideWidth-l,W=0;W<i;++W){var B=A+W*u;if(!(B<0||B>=a.inWidth))for(var O=I+W*n.strides[1],U=R+B*a.inChannels,z=F,j=O,G=0;G<a.inChannels;++G){for(var q=d[U+G],X=0;X<h;++X)m[z+X]+=q*p[j+X];z+=h,j+=h}}}return f.toTensor()},t.prototype.depthwiseConv2DDerInput=function(e,n,a){V([e,n],"depthwiseConv2DDerInput");for(var o=le(a.inShape,"float32"),i=o.values,s=o.strides,u=s[0],c=s[1],l=s[2],h=this.readSync(e.dataId),f=e.strides,d=f[0],p=f[1],m=f[2],v=this.readSync(n.dataId),g=n.strides,y=g[0],b=g[1],x=g[2],w=a.batchSize,C=a.filterHeight,N=a.filterWidth,I=a.inChannels,R=a.inHeight,S=a.inWidth,F=a.outChannels,A=a.outHeight,W=a.outWidth,B=a.strideHeight,O=a.strideWidth,U=C-1-a.padInfo.top,z=N-1-a.padInfo.left,j=F/I,G=0;G<w;++G)for(var q=0;q<I;++q)for(var X=0;X<R;++X)for(var $=X-U,ae=Math.max(0,Math.ceil($/B)),se=Math.min(A,(C+$)/B),oe=0;oe<S;++oe){for(var pe=oe-z,he=Math.max(0,Math.ceil(pe/O)),de=Math.min(W,(N+pe)/O),we=0,De=ae;De<se;++De)for(var ge=De*B-$,_e=he;_e<de;++_e)for(var xe=d*G+p*De+m*_e,Re=y*(C-1-ge)+b*(N-1-(_e*O-pe))+x*q,Ie=0;Ie<j;++Ie)we+=h[xe+(q*j+Ie)]*v[Re+Ie];i[u*G+c*X+l*oe+q]=we}return o.toTensor()},t.prototype.depthwiseConv2DDerFilter=function(e,n,a){V([e,n],"depthwiseConv2DDerFilter");for(var o=a.strideHeight,i=a.strideWidth,s=a.filterHeight,u=a.filterWidth,c=le(a.filterShape,"float32"),l=a.padInfo.left,h=a.padInfo.top,f=a.outChannels/a.inChannels,d=this.bufferSync(e),p=this.bufferSync(n),m=0;m<s;++m)for(var v=Math.max(0,Math.ceil((h-m)/o)),g=Math.min(a.outHeight,(a.inHeight+h-m)/o),y=0;y<u;++y)for(var b=Math.max(0,Math.ceil((l-y)/i)),x=Math.min(a.outWidth,(a.inWidth+l-y)/i),w=0;w<a.outChannels;++w){for(var C=Math.trunc(w/f),N=w%f,I=0,R=0;R<a.batchSize;++R)for(var S=v;S<g;++S)for(var F=m+S*o-h,A=b;A<x;++A){var W=y+A*i-l;I+=d.get(R,F,W,C)*p.get(R,S,A,w)}c.set(I,m,y,C,N)}return c.toTensor()},t.prototype.tile=function(e,n){return V(e,"tile"),Wu(this.bufferSync(e),n)},t.prototype.pad=function(e,n,a){V(e,"pad");var o=n.map((function(f,d){return f[0]+e.shape[d]+f[1]})),i=n.map((function(f){return f[0]})),s=this.bufferSync(e),u=le(o,e.dtype);a!==0&&u.values.fill(a);for(var c=0;c<e.size;c++){var l=s.indexToLoc(c),h=l.map((function(f,d){return f+i[d]}));u.set.apply(u,[s.get.apply(s,l)].concat(h))}return u.toTensor()},t.prototype.transpose=function(e,n){V(e,"transpose");for(var a=new Array(e.rank),o=0;o<a.length;o++)a[o]=e.shape[n[o]];var i=this.readSync(e.dataId),s=le(a,e.dtype),u=this.bufferSync(e);for(o=0;o<e.size;++o){for(var c=u.indexToLoc(o),l=new Array(c.length),h=0;h<l.length;h++)l[h]=c[n[h]];var f=s.locToIndex(l);s.values[f]=i[o]}return s.toTensor()},t.prototype.gather=function(e,n,a){V([e,n],"gather");var o=e.shape.slice(),i=this.readSync(n.dataId);o[a]=i.length;for(var s=le(o,e.dtype),u=this.bufferSync(e),c=0;c<s.size;++c){var l=s.indexToLoc(c),h=l.slice();h[a]=i[l[a]];var f=u.locToIndex(h);s.values[c]=u.values[f]}return s.toTensor()},t.prototype.batchToSpaceND=function(e,n,a){V([e],"batchToSpaceND");var o=n.reduce((function(h,f){return h*f})),i=sa(e.shape,n,o),s=ua(i.length,n.length),u=ca(e.shape,n,o),c=Iu(a,n.length),l=Ru(u,a,n.length);return e.reshape(i).transpose(s).reshape(u).slice(c,l)},t.prototype.spaceToBatchND=function(e,n,a){V([e],"spaceToBatchND");var o=n.reduce((function(f,d){return f*d})),i=[[0,0]];i.push.apply(i,a);for(var s=1+n.length;s<e.shape.length;++s)i.push([0,0]);var u=e.pad(i),c=sa(u.shape,n,o,!1),l=ua(c.length,n.length,!1),h=ca(u.shape,n,o,!1);return u.reshape(c).transpose(l).reshape(h)},t.prototype.pool=function(e,n,a){V(e,"pool");for(var o=n.strideHeight,i=n.strideWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,h=n.padInfo.top,f=n.padInfo.left,d=a==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,p=this.readSync(e.dataId),m=le(n.outShape,e.dtype),v=m.values,g=n.outShape[1]*n.outShape[2]*n.outShape[3],y=n.outShape[2]*n.outShape[3],b=n.outShape[3],x=0;x<n.batchSize;++x)for(var w=x*g,C=x*e.strides[0],N=0;N<n.inChannels;++N)for(var I=0;I<n.outHeight;++I)for(var R=I*o-h,S=Math.max(0,R),F=Math.min(n.inHeight,c+R),A=w+I*y,W=0;W<n.outWidth;++W){for(var B=W*i-f,O=Math.max(0,B),U=Math.min(n.inWidth,l+B),z=d,j=0,G=0,q=S;q<F;q+=s){for(var X=C+q*e.strides[1],$=O;$<U;$+=u){var ae=p[X+$*e.strides[2]+N];a==="max"&&ae>z?z=ae:a==="avg"&&(j+=ae,G++)}if(isNaN(z))break}v[A+W*b+N]=a==="avg"?j/G:z}return m.toTensor()},t.prototype.maxPool=function(e,n){return this.pool(e,n,"max")},t.prototype.maxPoolPositions=function(e,n){for(var a=le(n.outShape,"int32"),o=n.strideHeight,i=n.strideWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,h=n.padInfo.top,f=n.padInfo.left,d=this.bufferSync(e),p=0;p<n.batchSize;++p)for(var m=0;m<n.inChannels;++m)for(var v=0;v<n.outHeight;++v){for(var g=v*o-h,y=g;y<0;)y+=s;for(var b=Math.min(n.inHeight,c+g),x=0;x<n.outWidth;++x){for(var w=x*i-f,C=w;C<0;)C+=u;for(var N=Math.min(n.inWidth,l+w),I=Number.NEGATIVE_INFINITY,R=-1,S=y;S<b;S+=s)for(var F=S-g,A=C;A<N;A+=u){var W=A-w,B=d.get(p,S,A,m);B>I&&(I=B,R=F*l+W)}a.set(R,p,v,x,m)}}return a.toTensor()},t.prototype.maxPoolBackprop=function(e,n,a,o){V([n,a],"maxPoolBackprop");for(var i=this.maxPoolPositions(n,o),s=o.strideHeight,u=o.strideWidth,c=o.dilationHeight,l=o.dilationWidth,h=o.effectiveFilterHeight,f=o.effectiveFilterWidth,d=f-1-o.padInfo.left,p=h-1-o.padInfo.top,m=le(n.shape,"float32"),v=this.bufferSync(i),g=this.bufferSync(e),y=0;y<o.batchSize;++y)for(var b=0;b<o.inChannels;++b)for(var x=0;x<o.inHeight;++x)for(var w=0;w<o.inWidth;++w){for(var C=x-p,N=w-d,I=0,R=0;R<h;R+=c){var S=(C+R)/s;if(!(S<0||S>=o.outHeight||Math.floor(S)!==S))for(var F=0;F<f;F+=l){var A=(N+F)/u;if(!(A<0||A>=o.outWidth||Math.floor(A)!==A)){var W=h*f-1-v.get(y,S,A,b)===R*f+F?1:0;W!==0&&(I+=g.get(y,S,A,b)*W)}}}m.set(I,y,x,w,b)}return m.toTensor()},t.prototype.avgPoolBackprop=function(e,n,a){V([e,n],"avgPoolBackprop");for(var o=a.strideHeight,i=a.strideWidth,s=a.filterHeight,u=a.filterWidth,c=a.dilationHeight,l=a.dilationWidth,h=a.effectiveFilterHeight,f=a.effectiveFilterWidth,d=f-1-a.padInfo.left,p=h-1-a.padInfo.top,m=le(n.shape,"float32"),v=1/(s*u),g=this.bufferSync(e),y=0;y<a.batchSize;++y)for(var b=0;b<a.inChannels;++b)for(var x=0;x<a.inHeight;++x)for(var w=0;w<a.inWidth;++w){for(var C=x-p,N=w-d,I=0,R=0;R<h;R+=c){var S=(C+R)/o;if(!(S<0||S>=a.outHeight||Math.floor(S)!==S))for(var F=0;F<f;F+=l){var A=(N+F)/i;A<0||A>=a.outWidth||Math.floor(A)!==A||(I+=g.get(y,S,A,b))}}m.set(I*v,y,x,w,b)}return m.toTensor()},t.prototype.pool3d=function(e,n,a){V(e,"pool3d");for(var o=n.strideDepth,i=n.strideHeight,s=n.strideWidth,u=n.dilationDepth,c=n.dilationHeight,l=n.dilationWidth,h=n.effectiveFilterDepth,f=n.effectiveFilterHeight,d=n.effectiveFilterWidth,p=n.padInfo.front,m=n.padInfo.top,v=n.padInfo.left,g=a==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,y=this.readSync(e.dataId),b=le(n.outShape,e.dtype),x=b.values,w=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],C=n.outShape[2]*n.outShape[3]*n.outShape[4],N=n.outShape[3]*n.outShape[4],I=n.outShape[4],R=0;R<n.batchSize;++R)for(var S=R*w,F=R*e.strides[0],A=0;A<n.inChannels;++A)for(var W=0;W<n.outDepth;++W){for(var B=W*o-p,O=B;O<0;)O+=u;for(var U=Math.min(n.inDepth,h+B),z=S+W*C,j=0;j<n.outHeight;++j){for(var G=j*i-m,q=G;q<0;)q+=c;for(var X=Math.min(n.inHeight,f+G),$=z+j*N,ae=0;ae<n.outWidth;++ae){for(var se=ae*s-v,oe=se;oe<0;)oe+=l;for(var pe=Math.min(n.inWidth,d+se),he=$+ae*I,de=g,we=0,De=0,ge=O;ge<U;ge+=u){for(var _e=F+ge*e.strides[1],xe=q;xe<X;xe+=c){for(var Re=_e+xe*e.strides[2],Ie=oe;Ie<pe;Ie+=l){var Se=y[Re+Ie*e.strides[3]+A];if(a==="max"&&Se>de?de=Se:a==="avg"&&(we+=Se,De++),isNaN(de))break}if(isNaN(de))break}if(isNaN(de))break}x[he+A]=a==="avg"?we/De:de}}}return b.toTensor()},t.prototype.avgPool3d=function(e,n){return V(e,"avgPool3d"),this.pool3d(e,n,"avg").toFloat()},t.prototype.avgPool3dBackprop=function(e,n,a){V([e,n],"avgPool3dBackprop");for(var o=a.strideDepth,i=a.strideHeight,s=a.strideWidth,u=a.filterDepth,c=a.filterHeight,l=a.filterWidth,h=a.dilationDepth,f=a.dilationHeight,d=a.dilationWidth,p=a.effectiveFilterDepth,m=a.effectiveFilterHeight,v=a.effectiveFilterWidth,g=p-1-a.padInfo.front,y=v-1-a.padInfo.left,b=m-1-a.padInfo.top,x=le(n.shape,"float32"),w=1/(u*c*l),C=this.bufferSync(e),N=0;N<a.batchSize;++N)for(var I=0;I<a.inChannels;++I)for(var R=0;R<a.inDepth;++R)for(var S=0;S<a.inHeight;++S)for(var F=0;F<a.inWidth;++F){for(var A=R-g,W=S-b,B=F-y,O=0,U=0;U<p;U+=h){var z=(A+U)/o;if(!(z<0||z>=a.outDepth||Math.floor(z)!==z))for(var j=0;j<m;j+=f){var G=(W+j)/i;if(!(G<0||G>=a.outHeight||Math.floor(G)!==G))for(var q=0;q<v;q+=d){var X=(B+q)/s;X<0||X>=a.outWidth||Math.floor(X)!==X||(O+=C.get(N,z,G,X,I))}}}x.set(O*w,N,R,S,F,I)}return x.toTensor()},t.prototype.maxPool3d=function(e,n){return V(e,"maxPool3d"),this.pool3d(e,n,"max").toFloat()},t.prototype.maxPool3dPositions=function(e,n){for(var a=le(n.outShape,"int32"),o=n.strideDepth,i=n.strideHeight,s=n.strideWidth,u=n.dilationDepth,c=n.dilationHeight,l=n.dilationWidth,h=n.effectiveFilterDepth,f=n.effectiveFilterHeight,d=n.effectiveFilterWidth,p=n.padInfo.front,m=n.padInfo.top,v=n.padInfo.left,g=this.bufferSync(e),y=0;y<n.batchSize;++y)for(var b=0;b<n.inChannels;++b)for(var x=0;x<n.outDepth;++x){for(var w=x*o-p,C=w;C<0;)C+=u;for(var N=Math.min(n.inDepth,h+w),I=0;I<n.outHeight;++I){for(var R=I*i-m,S=R;S<0;)S+=c;for(var F=Math.min(n.inHeight,f+R),A=0;A<n.outWidth;++A){for(var W=A*s-v,B=W;B<0;)B+=l;for(var O=Math.min(n.inWidth,d+W),U=Number.NEGATIVE_INFINITY,z=-1,j=C;j<N;j+=u)for(var G=j-w,q=S;q<F;q+=c)for(var X=q-R,$=B;$<O;$+=l){var ae=$-W,se=g.get(y,j,q,$,b);se>=U&&(U=se,z=G*f*d+X*f+ae)}a.set(z,y,x,I,A,b)}}}return a.toTensor()},t.prototype.maxPool3dBackprop=function(e,n,a,o){V([n,a],"maxPool3dBackprop");for(var i=this.maxPool3dPositions(n,o),s=o.strideDepth,u=o.strideHeight,c=o.strideWidth,l=o.dilationDepth,h=o.dilationHeight,f=o.dilationWidth,d=o.effectiveFilterDepth,p=o.effectiveFilterHeight,m=o.effectiveFilterWidth,v=d-1-o.padInfo.front,g=m-1-o.padInfo.left,y=p-1-o.padInfo.top,b=le(n.shape,"float32"),x=this.bufferSync(i),w=this.bufferSync(e),C=0;C<o.batchSize;++C)for(var N=0;N<o.inChannels;++N)for(var I=0;I<o.inDepth;++I)for(var R=0;R<o.inHeight;++R)for(var S=0;S<o.inWidth;++S){for(var F=I-v,A=R-y,W=S-g,B=0,O=0;O<d;O+=l){var U=(F+O)/s;if(!(U<0||U>=o.outDepth||Math.floor(U)!==U))for(var z=0;z<p;z+=h){var j=(A+z)/u;if(!(j<0||j>=o.outHeight||Math.floor(j)!==j))for(var G=0;G<m;G+=f){var q=(W+G)/c;if(!(q<0||q>=o.outWidth||Math.floor(q)!==q)){var X=d*p*m-1-x.get(C,U,j,q,N)===O*p*m+z*m+G?1:0;X!==0&&(B+=w.get(C,U,j,q,N)*X)}}}}b.set(B,C,I,R,S,N)}return b.toTensor()},t.prototype.cast=function(e,n){return Pu(e,n,this)},t.prototype.reshape=function(e,n){return Do(e,n)},t.prototype.avgPool=function(e,n){return V(e,"avgPool"),this.pool(e,n,"avg").toFloat()},t.prototype.resizeBilinear=function(e,n,a,o){V(e,"resizeBilinear");for(var i=e.shape,s=i[0],u=i[1],c=i[2],l=i[3],h=this.readSync(e.dataId),f=new Float32Array(Z([s,n,a,l])),d=[o&&n>1?u-1:u,o&&a>1?c-1:c],p=[o&&n>1?n-1:n,o&&a>1?a-1:a],m=0,v=d[0]/p[0],g=d[1]/p[1],y=0;y<s;y++)for(var b=0;b<n;b++)for(var x=v*b,w=Math.floor(x),C=x-w,N=Math.min(u-1,Math.ceil(x)),I=y*e.strides[0]+w*e.strides[1],R=y*e.strides[0]+N*e.strides[1],S=0;S<a;S++)for(var F=g*S,A=Math.floor(F),W=F-A,B=Math.min(c-1,Math.ceil(F)),O=I+A*e.strides[2],U=R+A*e.strides[2],z=I+B*e.strides[2],j=R+B*e.strides[2],G=0;G<l;G++){var q=h[O+G],X=h[U+G],$=q+(h[z+G]-q)*W,ae=$+(X+(h[j+G]-X)*W-$)*C;f[m++]=ae}return Ye(f,[s,n,a,l])},t.prototype.resizeBilinearBackprop=function(e,n,a){V([e,n],"resizeBilinearBackprop");for(var o=n.shape,i=o[0],s=o[1],u=o[2],c=o[3],l=e.shape,h=l[1],f=l[2],d=new Float32Array(i*s*u*c),p=[a&&h>1?s-1:s,a&&f>1?u-1:u],m=[a&&h>1?h-1:h,a&&f>1?f-1:f],v=p[0]/m[0],g=p[1]/m[1],y=this.readSync(e.dataId),b=0,x=0;x<i;x++)for(var w=x*n.strides[0],C=0;C<h;C++)for(var N=C*v,I=Math.floor(N),R=Math.min(Math.ceil(N),s-1),S=w+I*n.strides[1],F=w+R*n.strides[1],A=N-I,W=1-A,B=0;B<f;B++)for(var O=B*g,U=Math.floor(O),z=Math.min(Math.ceil(O),u-1),j=O-U,G=1-j,q=S+U*n.strides[2],X=S+z*n.strides[2],$=F+U*n.strides[2],ae=F+z*n.strides[2],se=W*G,oe=W*j,pe=A*G,he=A*j,de=0;de<c;de++){var we=y[b++];d[q+de]+=we*se,d[X+de]+=we*oe,d[$+de]+=we*pe,d[ae+de]+=we*he}return ut(d,[i,u,s,c],n.dtype)},t.prototype.resizeNearestNeighbor=function(e,n,a,o){V(e,"resizeNearestNeighbor");for(var i=e.shape,s=i[0],u=i[1],c=i[2],l=i[3],h=this.readSync(e.dataId),f=new Float32Array(s*n*a*l),d=[o&&n>1?u-1:u,o&&a>1?c-1:c],p=[o&&n>1?n-1:n,o&&a>1?a-1:a],m=d[0]/p[0],v=d[1]/p[1],g=0,y=0;y<s;y++)for(var b=y*e.strides[0],x=0;x<n;x++)for(var w=m*x,C=b+Math.min(u-1,o?Math.round(w):Math.floor(w))*e.strides[1],N=0;N<a;N++)for(var I=v*N,R=C+Math.min(c-1,o?Math.round(I):Math.floor(I))*e.strides[2],S=0;S<l;S++){var F=h[R+S];f[g++]=F}return Ye(f,[s,n,a,l],e.dtype)},t.prototype.resizeNearestNeighborBackprop=function(e,n,a){V([e,n],"resizeNearestNeighborBackprop");for(var o=n.shape,i=o[0],s=o[1],u=o[2],c=o[3],l=e.shape,h=l[1],f=l[2],d=new Float32Array(i*s*u*c),p=this.readSync(e.dataId),m=[a&&h>1?s-1:s,a&&f>1?u-1:u],v=[a&&h>1?h-1:h,a&&f>1?f-1:f],g=m[0]/v[0],y=m[1]/v[1],b=1/g,x=1/y,w=2*Math.ceil(b)+2,C=2*Math.ceil(x)+2,N=0;N<i;N++)for(var I=N*n.strides[0],R=0;R<s;R++)for(var S=I+R*n.strides[1],F=Math.floor(R*b),A=Math.floor(F-w/2),W=0;W<u;W++)for(var B=S+W*n.strides[2],O=Math.floor(W*x),U=Math.floor(O-C/2),z=0;z<c;z++){for(var j=0,G=0;G<w;G++){var q=G+A;if(!(q<0||q>=h)){var X=I+q*e.strides[1],$=q*g;if(R===Math.min(s-1,a?Math.round($):Math.floor($)))for(var ae=0;ae<C;ae++){var se=ae+U;if(!(se<0||se>=f)){var oe=X+se*e.strides[2],pe=se*y;W===Math.min(u-1,a?Math.round(pe):Math.floor(pe))&&(j+=p[oe+z])}}}}d[B+z]=j}return ut(d,n.shape,n.dtype)},t.prototype.batchNormalization=function(e,n,a,o,i,s){V([e,n,a,i,s],"batchNorm");for(var u=this.readSync(e.dataId),c=this.readSync(n.dataId),l=this.readSync(a.dataId),h=i?this.readSync(i.dataId):new Float32Array([1]),f=s?this.readSync(s.dataId):new Float32Array([0]),d=new Float32Array(u.length),p=f.length,m=h.length,v=l.length,g=c.length,y=0,b=0,x=0,w=0,C=0;C<u.length;++C)d[C]=f[y++]+(u[C]-c[b++])*h[x++]/Math.sqrt(l[w++]+o),y>=p&&(y=0),b>=g&&(b=0),x>=m&&(x=0),w>=v&&(w=0);return ut(d,e.shape)},t.prototype.localResponseNormalization4D=function(e,n,a,o,i){V(e,"localResponseNormalization4D");var s=e.shape[3],u=s-1,c=this.readSync(e.dataId),l=e.size,h=new Float32Array(l);function f(v){for(var g=v%s,y=v-g+Math.max(0,g-n),b=v-g+Math.min(g+n,u),x=0;y<=b;y++){var w=c[y];x+=w*w}return x}for(var d=0;d<l;d++){var p=f(d),m=c[d]*Math.pow(a+o*p,-i);h[d]=m}return ut(h,e.shape)},t.prototype.LRNGrad=function(e,n,a,o,i,s,u){V(e,"LRNGrad");for(var c=e.shape[3],l=this.readSync(e.dataId),h=this.readSync(n.dataId),f=this.readSync(a.dataId),d=new Float32Array(e.size),p=e.size,m=0;m<p;m++){for(var v=m%c,g=m-v+Math.max(0,v-o),y=m-v+Math.min(c,v+o+1),b=0,x=g;x<y;x++)b+=Math.pow(h[x],2);for(b=s*b+i,x=g;x<y;x++){var w=-2*s*u*h[x]*f[m]/b;m===x&&(w+=Math.pow(b,-u)),w*=l[m],d[x]+=w}}return ut(d,e.shape)},t.prototype.multinomial=function(e,n,a,o){V(e,"multinomial");for(var i=n?e:nn(e),s=i.shape[0],u=i.shape[1],c=Ae([s,a],"int32"),l=this.readSync(c.dataId),h=this.readSync(i.dataId),f=0;f<s;++f){var d=f*u,p=new Float32Array(u-1);p[0]=h[d];for(var m=1;m<p.length;++m)p[m]=p[m-1]+h[d+m];for(var v=_a(o.toString()),g=f*a,y=0;y<a;++y){var b=v();l[g+y]=p.length;for(var x=0;x<p.length;x++)if(b<p[x]){l[g+y]=x;break}}}return c},t.prototype.oneHot=function(e,n,a,o){V(e,"oneHot");var i=new Float32Array(e.size*n);i.fill(o);for(var s=this.readSync(e.dataId),u=0;u<e.size;++u)s[u]>=0&&s[u]<n&&(i[u*n+s[u]]=a);return dn(i,[e.size,n],"int32")},t.prototype.nonMaxSuppression=function(e,n,a,o,i){return V(e,"nonMaxSuppression"),Yo(this.readSync(e.dataId),this.readSync(n.dataId),a,o,i)},t.prototype.fft=function(e){return this.fftBatch(e,!1)},t.prototype.ifft=function(e){return this.fftBatch(e,!0)},t.prototype.fftBatch=function(e,n){for(var a=e.shape[0],o=e.shape[1],i=le(e.shape,"float32"),s=le(e.shape,"float32"),u=It(e).as2D(a,o),c=jt(e).as2D(a,o),l=0;l<a;l++)for(var h=u.slice([l,0],[1,o]),f=c.slice([l,0],[1,o]),d=Ke(h,f),p=this.readSync(this.fftImpl(d,n).dataId),m=0;m<o;m++){var v=fs(p,m);i.values[l*o+m]=v.real,s.values[l*o+m]=v.imag}return Ke(i.toTensor(),s.toTensor()).as2D(a,o)},t.prototype.fftImpl=function(e,n){var a=e.as1D(),o=a.size;if(this.isExponentOf2(o)){var i=this.fftRadix2(a,o,n).as2D(e.shape[0],e.shape[1]);return n&&(i=Ke(It(i).div(K(o)),jt(i).div(K(o)))),i}var s=this.readSync(e.dataId),u=(function(c){for(var l=new Float32Array(c.length/2),h=new Float32Array(c.length/2),f=0;f<c.length;f+=2)l[f/2]=c[f],h[f/2]=c[f+1];return{real:l,imag:h}})(this.fourierTransformByMatmul(s,o,n));return Ke(u.real,u.imag).as2D(e.shape[0],e.shape[1])},t.prototype.isExponentOf2=function(e){return(e&e-1)==0},t.prototype.fftRadix2=function(e,n,a){if(n===1)return e;var o=this.readSync(e.dataId),i=n/2,s=(function(g){for(var y=Math.ceil(g.length/4),b=new Float32Array(y),x=new Float32Array(y),w=0;w<g.length;w+=4)b[Math.floor(w/4)]=g[w],x[Math.floor(w/4)]=g[w+1];return{real:b,imag:x}})(o),u=Ke(s.real,s.imag).as1D(),c=(function(g){for(var y=Math.floor(g.length/4),b=new Float32Array(y),x=new Float32Array(y),w=2;w<g.length;w+=4)b[Math.floor(w/4)]=g[w],x[Math.floor(w/4)]=g[w+1];return{real:b,imag:x}})(o),l=Ke(c.real,c.imag).as1D();u=this.fftRadix2(u,i,a),l=this.fftRadix2(l,i,a);var h=(function(g,y){for(var b=new Float32Array(g/2),x=new Float32Array(g/2),w=0;w<Math.ceil(g/2);w++){var C=(y?2:-2)*Math.PI*(w/g);b[w]=Math.cos(C),x[w]=Math.sin(C)}return{real:b,imag:x}})(n,a),f=Ke(h.real,h.imag).mul(l),d=u.add(f),p=u.sub(f),m=It(d).concat(It(p)),v=jt(d).concat(jt(p));return Ke(m,v).as1D()},t.prototype.fourierTransformByMatmul=function(e,n,a){for(var o=new Float32Array(2*n),i=0;i<n;i++){for(var s=0,u=0,c=0;c<n;c++){var l=Ff(i*c,n,a),h=fs(e,c);s+=h.real*l.real-h.imag*l.imag,u+=h.real*l.imag+h.imag*l.real}a&&(s/=n,u/=n),Tf(o,s,u,i)}return o},t.prototype.depthToSpace=function(e,n,a){k(a==="NHWC",(function(){return"Only NHWC dataFormat supported on CPU for depthToSpace. Got "+a})),k(n>1,(function(){return"blockSize should be > 1 for depthToSpace, but was: "+n}));for(var o=e.shape[0],i=e.shape[1],s=e.shape[2],u=e.shape[3],c=i*n,l=s*n,h=u/(n*n),f=this.readSync(e.dataId),d=new Float32Array(o*c*l*h),p=0,m=0;m<o;++m)for(var v=0;v<c;++v)for(var g=Math.floor(v/n),y=v%n,b=0;b<l;++b)for(var x=Math.floor(b/n),w=(y*n+b%n)*h,C=0;C<h;++C){var N=C+w+u*(x+s*(g+i*m));d[p++]=f[N]}return ut(d,[o,c,l,h])},t.prototype.broadcastedBinaryOp=function(e,n,a,o){var i=be(e.shape,n.shape),s=le(i,a),u=this.readSync(e.dataId),c=this.readSync(n.dataId),l=hn(e.shape,i),h=hn(n.shape,i),f=s.values;if(l.length+h.length===0)for(var d=0;d<f.length;++d)f[d]=o(u[d%u.length],c[d%c.length]);else{var p=this.bufferSync(e),m=this.bufferSync(n),v=function(g){var y=s.indexToLoc(g),b=y.slice(-e.rank);l.forEach((function(N){return b[N]=0}));var x=p.locToIndex(b),w=y.slice(-n.rank);h.forEach((function(N){return w[N]=0}));var C=m.locToIndex(w);f[g]=o(u[x],c[C])};for(d=0;d<f.length;++d)v(d)}return s.toTensor()},t.prototype.broadcastedBinaryComplexOp=function(e,n,a){var o=be(e.shape,n.shape),i=le(o,"float32"),s=le(o,"float32"),u=this.readSync(e.dataId),c=this.readSync(n.dataId),l=hn(e.shape,o),h=hn(n.shape,o),f=i.values,d=s.values;if(l.length+h.length===0)for(var p=0;p<f.length;p++){var m=p%u.length,v=p%c.length,g=a(u[2*m],u[2*m+1],c[2*v],c[2*v+1]);f[p]=g.real,d[p]=g.imag}else{var y=this.bufferSync(this.data.get(e.dataId).complexTensors.real),b=this.bufferSync(this.data.get(n.dataId).complexTensors.real),x=function(w){var C=i.indexToLoc(w),N=C.slice(-e.rank);l.forEach((function(A){return N[A]=0}));var I=y.locToIndex(N),R=C.slice(-n.rank);h.forEach((function(A){return R[A]=0}));var S=b.locToIndex(R),F=a(u[2*I],u[2*I+1],c[2*S],c[2*S+1]);f[w]=F.real,d[w]=F.imag};for(p=0;p<f.length;p++)x(p)}return this.complex(i.toTensor(),s.toTensor())},t.prototype.split=function(e,n,a){return Lu(e,n,a)},t.prototype.dispose=function(){},t.prototype.floatPrecision=function(){return 32},t.prototype.epsilon=function(){return 1e-7},t.prototype.cropAndResize=function(e,n,a,o,i,s){for(var u=e.shape,c=u[0],l=u[1],h=u[2],f=u[3],d=n.shape[0],p=o[0],m=o[1],v=le([d,p,m,f],"float32"),g=this.readSync(n.dataId),y=this.readSync(a.dataId),b=this.readSync(e.dataId),x=e.strides,w=v.strides,C=0;C<d;C++){var N=4*C,I=g[N],R=g[N+1],S=g[N+2],F=g[N+3],A=y[C];if(!(A>=c))for(var W=p>1?(S-I)*(l-1)/(p-1):0,B=m>1?(F-R)*(h-1)/(m-1):0,O=0;O<p;O++){var U=p>1?I*(l-1)+O*W:.5*(I+S)*(l-1);if(U<0||U>l-1)for(var z=0;z<m;z++)for(var j=0;j<f;j++){var G=j+z*w[2]+O*w[1]+C*w[0];v.values[G]=s}else if(i==="bilinear"){var q=Math.floor(U),X=Math.ceil(U),$=U-q;for(z=0;z<m;z++)if((ge=m>1?R*(h-1)+z*B:.5*(R+F)*(h-1))<0||ge>h-1)for(j=0;j<f;j++)G=j+z*w[2]+O*w[1]+C*w[0],v.values[G]=s;else{var ae=Math.floor(ge),se=Math.ceil(ge),oe=ge-ae;for(j=0;j<f;j++){var pe=b[G=j+ae*x[2]+q*x[1]+A*x[0]],he=b[G=j+se*x[2]+q*x[1]+A*x[0]],de=b[G=j+ae*x[2]+X*x[1]+A*x[0]],we=pe+(he-pe)*oe,De=de+(b[G=j+se*x[2]+X*x[1]+A*x[0]]-de)*oe;G=j+z*w[2]+O*w[1]+C*w[0],v.values[G]=we+(De-we)*$}}}else for(z=0;z<m;++z){var ge;if((ge=m>1?R*(h-1)+z*B:.5*(R+F)*(h-1))<0||ge>h-1)for(j=0;j<f;j++)G=j+z*w[2]+O*w[1]+C*w[0],v.values[G]=s;else{var _e=Math.round(ge),xe=Math.round(U);for(j=0;j<f;j++){var Re=j+_e*x[2]+xe*x[1]+A*x[0],Ie=j+z*w[2]+O*w[1]+C*w[0];v.values[Ie]=b[Re]}}}}}return v.toTensor()},t.prototype.sparseToDense=function(e,n,a,o){var i=la(0,e,a),s=i.sliceRank,u=i.numUpdates,c=i.sliceSize,l=i.strides,h=i.outputSize;return this.scatter(e,n,a,h,c,u,s,l,o,!1)},t.prototype.gatherND=function(e,n){var a=n.shape,o=a[a.length-1],i=Su(e,n),s=i[0],u=i[1],c=i[2],l=i[3];if(u===0)return Ye([],s,e.dtype);for(var h=new br([u,c],e.dtype),f=this.readSync(n.dataId),d=this.readSync(e.dataId),p=0;p<u;p++){for(var m=[],v=0,g=0;g<o;g++){var y=f[p*o+g];v+=y*l[g],m.push(y)}if(v<0||v>=e.size/c)throw new Error("Invalid indices: "+m+" does not index into "+e.shape);for(var b=0;b<c;b++)h.values[p*c+b]=d[v*c+b]}return h.toTensor().reshape(s)},t.prototype.scatterND=function(e,n,a){var o=la(0,e,a),i=o.sliceRank,s=o.numUpdates,u=o.sliceSize,c=o.strides,l=o.outputSize,h=K(0);return this.scatter(e,n,a,l,u,s,i,c,h,!0)},t.prototype.fill=function(e,n,a){var o=ea(a=a||Ir(n),Z(e));return o.fill(n),T.makeTensor(o,e,a,this)},t.prototype.onesLike=function(e){if(e.dtype==="string")throw new Error("onesLike is not supported for string tensors");return this.fill(e.shape,1,e.dtype)},t.prototype.zerosLike=function(e){var n=ea(e.dtype,Z(e.shape));return this.makeOutput(n,e.shape,e.dtype)},t.prototype.linspace=function(e,n,a){return Ou(e,n,a)},t.prototype.scatter=function(e,n,a,o,i,s,u,c,l,h){var f=[o/i,i],d=this.readSync(e.dataId),p=this.readSync(n.dataId);if(o===0)return Ye([],a,n.dtype);var m=new br(f,n.dtype);m.values.fill(this.readSync(l.dataId)[0]);for(var v=0;v<s;v++){for(var g=[],y=0,b=0;b<u;b++){var x=d[v*u+b];g.push(x),y+=x*c[b]}if(y<0||y>=o/i)throw new Error("Invalid indices: "+g+" does not index into "+a);for(var w=0;w<i;w++)h?m.values[y*i+w]+=p[v*i+w]:m.values[y*i+w]=n.rank===0?p[0]:p[v*i+w]}return m.toTensor().reshape(a)},t})(Fu);T.registerBackend("cpu",(function(){return new Zm}),1);for(var uo=0,Ms=[{kernelName:"NonMaxSuppressionV5",backendName:"cpu",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=r.attrs,a=t,o=a.boxes,i=a.scores,s=n,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,f=e;V(o,"NonMaxSuppressionWithScore");var d=$o(f.data.get(o.dataId).values,f.data.get(i.dataId).values,u,c,l,h);return[d.selectedIndices,d.selectedScores]}},{kernelName:"Square",backendName:"cpu",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t.x,a=e;V(n,"square");for(var o=a.data.get(n.dataId).values,i=new Float32Array(o.length),s=0;s<o.length;++s){var u=o[s];i[s]=u*u}return{dataId:a.write(i,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}},{kernelName:_r,backendName:"cpu",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t,a=n.a,o=n.b,i=e;V([a,o],_r);var s=i.data.get(a.dataId).values,u=i.data.get(o.dataId).values,c=(function(f,d,p,m,v,g){var y=be(f,d),b=y.length,x=Vt(y),w=yr(v,Z(y)),C=f.length,N=d.length,I=Vt(f),R=Vt(d),S=hn(f,y),F=hn(d,y);if(S.length+F.length===0)for(var A=0;A<w.length;++A)w[A]=g(p[A%p.length],m[A%m.length]);else{var W=function(B){var O=uh(B,b,x),U=O.slice(-C);S.forEach((function(q){return U[q]=0}));var z=rs(U,C,I),j=O.slice(-N);F.forEach((function(q){return j[q]=0}));var G=rs(j,N,R);w[B]=g(p[z],m[G])};for(A=0;A<w.length;++A)W(A)}return[w,y]})(a.shape,o.shape,s,u,a.dtype,(function(f,d){var p=f-d;return p*p})),l=c[0],h=c[1];return{dataId:i.write(l,h,a.dtype),shape:h,dtype:a.dtype}}}];uo<Ms.length;uo++)su(Ms[uo]);var Ln,eg=function(r){this.variableNames=["A"];var t=Qe(),e=r[0],n=r[1];this.outputShape=r,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+n+".0, "+e+`.0);

        vec4 values = `+t.texture2D+`(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `},tg=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var t=Qe(),e=r[0],n=r[1];this.outputShape=r,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(`+n+".0, "+e+`.0);
            vec4 values = `+t.texture2D+`(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        `+t.output+` = result;
      }
    `};for(var co=0,Ps=[{kernelName:"FromPixels",backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=r.attrs,a=t.pixels,o=n.numChannels,i=typeof HTMLVideoElement<"u"&&a instanceof HTMLVideoElement,s=typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement,u=i?[a.videoWidth,a.videoHeight]:[a.width,a.height],c=u[0],l=u[1],h=[l,c],f=[l,c,o];(s||i)&&(Ln==null&&(Ln=document.createElement("canvas").getContext("2d")),Ln.canvas.width=c,Ln.canvas.height=l,Ln.drawImage(a,0,0,c,l),a=Ln.canvas);var d=e.makeTensorInfo(h,"int32");e.texData.get(d.dataId).usage=mt.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(d.dataId),a);var p=L().getBool("WEBGL_PACK")?new tg(f):new eg(f),m=e.runWebGLProgram(p,[d],"int32");return e.disposeData(d.dataId),m}},{kernelName:"NonMaxSuppressionV5",backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=r.attrs;aa("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");var a=t,o=a.boxes,i=a.scores,s=n,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,f=e,d=$o(f.readSync(o.dataId),f.readSync(i.dataId),u,c,l,h);return[d.selectedIndices,d.selectedScores]}},{kernelName:"Square",backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t.x,a=e,o=new fe(n.shape,"return x * x;");return a.runWebGLProgram(o,[n],n.dtype)}},{kernelName:_r,backendName:"webgl",kernelFunc:function(r){var t=r.inputs,e=r.backend,n=t,a=n.a,o=n.b,i=e,s=L().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Zt("return (a - b) * (a - b);",a.shape,o.shape):new Pe("return (a - b) * (a - b);",a.shape,o.shape);return i.compileAndRun(s,[a,o])}}];co<Ps.length;co++)su(Ps[co]);for(var lo=0,Os=[{kernelName:"Square",gradFunc:function(r,t){var e=t[0];return{x:function(){return r.mul(e.toFloat().mul(2))}}}},{kernelName:_r,gradFunc:function(r,t){var e=t[0],n=t[1],a=K(2);return{a:function(){return et(r,et(a,Ue(e,n)))},b:function(){return et(r,et(a,Ue(n,e)))}}}}];lo<Os.length;lo++)Jl(Os[lo]);var ng=(function(){function r(){}return r.prototype.fetch=function(t,e){return fetch(t,e)},r.prototype.now=function(){return performance.now()},r.prototype.encode=function(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error("Browser's encoder only supports utf-8, but got "+e);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)},r.prototype.decode=function(t,e){return new TextDecoder(e).decode(t)},r})();L().get("IS_BROWSER")&&L().setPlatform("browser",new ng);var ho,rg=function(){return require("node-fetch")},ag=(function(){function r(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}return r.prototype.fetch=function(t,e){return L().global.fetch!=null?L().global.fetch(t,e):(ho==null&&(ho=rg()),ho(t,e))},r.prototype.now=function(){var t=process.hrtime();return 1e3*t[0]+t[1]/1e6},r.prototype.encode=function(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error("Node built-in encoder only supports utf-8, but got "+e);return this.textEncoder.encode(t)},r.prototype.decode=function(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)},r})();L().get("IS_NODE")&&L().setPlatform("node",new ag);var Fo={float32:4,int32:4,uint16:2,uint8:1,bool:1},ga=4;function Dc(r,t){for(var e={},n=0,a=function(s){var u=s.name,c=s.dtype,l=s.shape,h=Z(l),f=void 0;if("quantization"in s){var d=s.quantization;if(d.dtype!=="uint8"&&d.dtype!=="uint16")throw new Error("Weight "+s.name+" has unknown quantization dtype "+d.dtype+". Supported quantization dtypes are: 'uint8' and 'uint16'.");var p=Fo[d.dtype],m=r.slice(n,n+h*p),v=d.dtype==="uint8"?new Uint8Array(m):new Uint16Array(m);if(c==="float32")f=Float32Array.from(v,(function(C){return C*d.scale+d.min}));else{if(c!=="int32")throw new Error("Unsupported dtype in weight '"+u+"': "+c);f=Int32Array.from(v,(function(C){return Math.round(C*d.scale+d.min)}))}n+=h*p}else if(c==="string"){var g=Z(s.shape);f=[];for(var y=0;y<g;y++){var b=new Uint32Array(r.slice(n,n+ga))[0];n+=ga;var x=new Uint8Array(r.slice(n,n+b));f.push(x),n+=b}}else{var w=Fo[c];if(m=r.slice(n,n+h*w),c==="float32")f=new Float32Array(m);else if(c==="int32")f=new Int32Array(m);else{if(c!=="bool")throw new Error("Unsupported dtype in weight '"+u+"': "+c);f=new Uint8Array(m)}n+=h*w}e[u]=Ye(f,l,c)},o=0,i=t;o<i.length;o++)a(i[o]);return e}function og(r){if(r===null)throw new Error("Invalid input value: "+JSON.stringify(r));var t=0,e=[];r.forEach((function(o){if(t+=o.byteLength,e.push(o.byteLength===o.buffer.byteLength?o:new o.constructor(o)),!(o instanceof Float32Array||o instanceof Int32Array||o instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+o.constructor.name)}));var n=new Uint8Array(t),a=0;return e.forEach((function(o){n.set(new Uint8Array(o.buffer),a),a+=o.byteLength})),n.buffer}var Mo=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function Bs(r){return Mo?Buffer.byteLength(r):new Blob([r]).size}function vi(r){var t=0;r.forEach((function(a){t+=a.byteLength}));var e=new Uint8Array(t),n=0;return r.forEach((function(a){e.set(new Uint8Array(a),n),n+=a.byteLength})),e.buffer}function Ls(r){for(r=r.trim();r.endsWith("/");)r=r.slice(0,r.length-1);var t=r.split("/");return t[t.length-1]}function Fr(r){if(r.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:r.modelTopology==null?0:Bs(JSON.stringify(r.modelTopology)),weightSpecsBytes:r.weightSpecs==null?0:Bs(JSON.stringify(r.weightSpecs)),weightDataBytes:r.weightData==null?0:r.weightData.byteLength}}var gt=(function(){function r(){this.saveRouters=[],this.loadRouters=[]}return r.getInstance=function(){return r.instance==null&&(r.instance=new r),r.instance},r.registerSaveRouter=function(t){r.getInstance().saveRouters.push(t)},r.registerLoadRouter=function(t){r.getInstance().loadRouters.push(t)},r.getSaveHandlers=function(t){return r.getHandlers(t,"save")},r.getLoadHandlers=function(t,e){return r.getHandlers(t,"load",e)},r.getHandlers=function(t,e,n){var a=[];return(e==="load"?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach((function(o){var i=o(t,n);i!==null&&a.push(i)})),a},r})(),Xn="://",pn=(function(){function r(){this.managers={}}return r.getInstance=function(){return r.instance==null&&(r.instance=new r),r.instance},r.registerManager=function(t,e){k(t!=null,(function(){return"scheme must not be undefined or null."})),t.endsWith(Xn)&&(t=t.slice(0,t.indexOf(Xn))),k(t.length>0,(function(){return"scheme must not be an empty string."}));var n=r.getInstance();k(n.managers[t]==null,(function(){return"A model store manager is already registered for scheme '"+t+"'."})),n.managers[t]=e},r.getManager=function(t){var e=this.getInstance().managers[t];if(e==null)throw new Error("Cannot find model manager for scheme '"+t+"'");return e},r.getSchemes=function(){return Object.keys(this.getInstance().managers)},r})();function Qr(r){if(r.indexOf(Xn)===-1)throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+pn.getSchemes().join(","));return{scheme:r.split(Xn)[0],path:r.split(Xn)[1]}}function Ws(r,t,e){return e===void 0&&(e=!1),J(this,void 0,void 0,(function(){var n,a,o,i,s,u,c,l,h;return Q(this,(function(f){switch(f.label){case 0:return k(r!==t,(function(){return"Old path and new path are the same: '"+r+"'"})),k((n=gt.getLoadHandlers(r)).length>0,(function(){return"Copying failed because no load handler is found for source URL "+r+"."})),k(n.length<2,(function(){return"Copying failed because more than one ("+n.length+") load handlers for source URL "+r+"."})),a=n[0],k((o=gt.getSaveHandlers(t)).length>0,(function(){return"Copying failed because no save handler is found for destination URL "+t+"."})),k(o.length<2,(function(){return"Copying failed because more than one ("+n.length+") save handlers for destination URL "+t+"."})),i=o[0],s=Qr(r).scheme,u=Qr(r).path,c=s===Qr(r).scheme,[4,a.load()];case 1:return l=f.sent(),e&&c?[4,pn.getManager(s).removeModel(u)]:[3,3];case 2:f.sent(),f.label=3;case 3:return[4,i.save(l)];case 4:return h=f.sent(),!e||c?[3,6]:[4,pn.getManager(s).removeModel(u)];case 5:f.sent(),f.label=6;case 6:return[2,h.modelArtifactsInfo]}}))}))}var Rn="models_store",fn="model_info_store";function Ac(){if(!L().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var r=window||self,t=r.indexedDB||r.mozIndexedDB||r.webkitIndexedDB||r.msIndexedDB||r.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function Po(r){var t=r.result;t.createObjectStore(Rn,{keyPath:"modelPath"}),t.createObjectStore(fn,{keyPath:"modelPath"})}var Yn=(function(){function r(t){if(this.indexedDB=Ac(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}return r.prototype.save=function(t){return J(this,void 0,void 0,(function(){return Q(this,(function(e){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,t)]}))}))},r.prototype.load=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(t){return[2,this.databaseAction(this.modelPath)]}))}))},r.prototype.databaseAction=function(t,e){var n=this;return new Promise((function(a,o){var i=n.indexedDB.open("tensorflowjs",1);i.onupgradeneeded=function(){return Po(i)},i.onsuccess=function(){var s=i.result;if(e==null){var u=s.transaction(Rn,"readonly"),c=u.objectStore(Rn).get(n.modelPath);c.onsuccess=function(){if(c.result==null)return s.close(),o(new Error("Cannot find model with path '"+n.modelPath+"' in IndexedDB."));a(c.result.modelArtifacts)},c.onerror=function(m){return s.close(),o(c.error)},u.oncomplete=function(){return s.close()}}else{var l,h=Fr(e),f=s.transaction(fn,"readwrite"),d=f.objectStore(fn),p=d.put({modelPath:n.modelPath,modelArtifactsInfo:h});p.onsuccess=function(){var m=(l=s.transaction(Rn,"readwrite")).objectStore(Rn).put({modelPath:n.modelPath,modelArtifacts:e,modelArtifactsInfo:h});m.onsuccess=function(){return a({modelArtifactsInfo:h})},m.onerror=function(v){var g=(d=f.objectStore(fn)).delete(n.modelPath);g.onsuccess=function(){return s.close(),o(m.error)},g.onerror=function(y){return s.close(),o(m.error)}}},p.onerror=function(m){return s.close(),o(p.error)},f.oncomplete=function(){l==null?s.close():l.oncomplete=function(){return s.close()}}}},i.onerror=function(s){return o(i.error)}}))},r.URL_SCHEME="indexeddb://",r})(),js=function(r){return L().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Yn.URL_SCHEME)?(t=r.slice(Yn.URL_SCHEME.length),new Yn(t)):null;var t};gt.registerSaveRouter(js),gt.registerLoadRouter(js);var ig=(function(){function r(){this.indexedDB=Ac()}return r.prototype.listModels=function(){return J(this,void 0,void 0,(function(){var t=this;return Q(this,(function(e){return[2,new Promise((function(n,a){var o=t.indexedDB.open("tensorflowjs",1);o.onupgradeneeded=function(){return Po(o)},o.onsuccess=function(){var i=o.result,s=i.transaction(fn,"readonly"),u=s.objectStore(fn).getAll();u.onsuccess=function(){for(var c={},l=0,h=u.result;l<h.length;l++){var f=h[l];c[f.modelPath]=f.modelArtifactsInfo}n(c)},u.onerror=function(c){return i.close(),a(u.error)},s.oncomplete=function(){return i.close()}},o.onerror=function(i){return a(o.error)}}))]}))}))},r.prototype.removeModel=function(t){return J(this,void 0,void 0,(function(){var e=this;return Q(this,(function(n){var a;return t=(a=t).startsWith(Yn.URL_SCHEME)?a.slice(Yn.URL_SCHEME.length):a,[2,new Promise((function(o,i){var s=e.indexedDB.open("tensorflowjs",1);s.onupgradeneeded=function(){return Po(s)},s.onsuccess=function(){var u,c=s.result,l=c.transaction(fn,"readwrite"),h=l.objectStore(fn),f=h.get(t);f.onsuccess=function(){if(f.result==null)return c.close(),i(new Error("Cannot find model with path '"+t+"' in IndexedDB."));var d=h.delete(t),p=function(){var m=(u=c.transaction(Rn,"readwrite")).objectStore(Rn).delete(t);m.onsuccess=function(){return o(f.result.modelArtifactsInfo)},m.onerror=function(v){return i(f.error)}};d.onsuccess=p,d.onerror=function(m){return p(),c.close(),i(f.error)}},f.onerror=function(d){return c.close(),i(f.error)},l.oncomplete=function(){u==null?c.close():u.oncomplete=function(){return c.close()}}},s.onerror=function(u){return i(s.error)}}))]}))}))},r})();if(L().getBool("IS_BROWSER"))try{pn.registerManager(Yn.URL_SCHEME,new ig)}catch{}var en="/",Gn="tensorflowjs_models",Tc="info",sg="model_topology",ug="weight_specs",cg="weight_data",lg="model_metadata";function Fc(r){return{info:[Gn,r,Tc].join(en),topology:[Gn,r,sg].join(en),weightSpecs:[Gn,r,ug].join(en),weightData:[Gn,r,cg].join(en),modelMetadata:[Gn,r,lg].join(en)}}function hg(r){var t=r.split(en);if(t.length<3)throw new Error("Invalid key format: "+r);return t.slice(1,t.length-1).join(en)}var $n=(function(){function r(t){if(!L().getBool("IS_BROWSER")||typeof window>"u"||window.localStorage===void 0)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=Fc(this.modelPath)}return r.prototype.save=function(t){return J(this,void 0,void 0,(function(){var e,n,a;return Q(this,(function(o){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");e=JSON.stringify(t.modelTopology),n=JSON.stringify(t.weightSpecs),a=Fr(t);try{return this.LS.setItem(this.keys.info,JSON.stringify(a)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,(function(i){if(Mo)return Buffer.from(i).toString("base64");for(var s=new Uint8Array(i),u="",c=0,l=s.length;c<l;c++)u+=String.fromCharCode(s[c]);return btoa(u)})(t.weightData)),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata})),[2,{modelArtifactsInfo:a}]}catch{throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error("Failed to save model '"+this.modelPath+"' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes="+a.modelTopologyBytes+", weightSpecsBytes="+a.weightSpecsBytes+", weightDataBytes="+a.weightDataBytes+".")}return[2]}))}))},r.prototype.load=function(){return J(this,void 0,void 0,(function(){var t,e,n,a,o,i,s;return Q(this,(function(u){if((t=JSON.parse(this.LS.getItem(this.keys.info)))==null)throw new Error("In local storage, there is no model with name '"+this.modelPath+"'");if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(e={},(n=JSON.parse(this.LS.getItem(this.keys.topology)))==null)throw new Error("In local storage, the topology of model '"+this.modelPath+"' is missing.");if(e.modelTopology=n,(a=JSON.parse(this.LS.getItem(this.keys.weightSpecs)))==null)throw new Error("In local storage, the weight specs of model '"+this.modelPath+"' are missing.");if(e.weightSpecs=a,(o=this.LS.getItem(this.keys.modelMetadata))!=null&&(i=JSON.parse(o),e.format=i.format,e.generatedBy=i.generatedBy,e.convertedBy=i.convertedBy,e.userDefinedMetadata=i.userDefinedMetadata),(s=this.LS.getItem(this.keys.weightData))==null)throw new Error("In local storage, the binary weight values of model '"+this.modelPath+"' are missing.");return e.weightData=(function(c){if(Mo){var l=Buffer.from(c,"base64");return l.buffer.slice(l.byteOffset,l.byteOffset+l.byteLength)}for(var h=atob(c),f=new Uint8Array(h.length),d=0;d<h.length;++d)f.set([h.charCodeAt(d)],d);return f.buffer})(s),[2,e]}))}))},r.URL_SCHEME="localstorage://",r})(),zs=function(r){return L().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith($n.URL_SCHEME)?(t=r.slice($n.URL_SCHEME.length),new $n(t)):null;var t};gt.registerSaveRouter(zs),gt.registerLoadRouter(zs);var fg=(function(){function r(){k(L().getBool("IS_BROWSER"),(function(){return"Current environment is not a web browser"})),k(typeof window>"u"||window.localStorage!==void 0,(function(){return"Current browser does not appear to support localStorage"})),this.LS=window.localStorage}return r.prototype.listModels=function(){return J(this,void 0,void 0,(function(){var t,e,n,a,o,i;return Q(this,(function(s){for(t={},e=Gn+en,n=en+Tc,a=0;a<this.LS.length;++a)(o=this.LS.key(a)).startsWith(e)&&o.endsWith(n)&&(i=hg(o),t[i]=JSON.parse(this.LS.getItem(o)));return[2,t]}))}))},r.prototype.removeModel=function(t){return J(this,void 0,void 0,(function(){var e,n;return Q(this,(function(a){var o;if(t=(o=t).startsWith($n.URL_SCHEME)?o.slice($n.URL_SCHEME.length):o,e=Fc(t),this.LS.getItem(e.info)==null)throw new Error("Cannot find model at path '"+t+"'");return n=JSON.parse(this.LS.getItem(e.info)),this.LS.removeItem(e.info),this.LS.removeItem(e.topology),this.LS.removeItem(e.weightSpecs),this.LS.removeItem(e.weightData),[2,n]}))}))},r})();if(L().getBool("IS_BROWSER"))try{pn.registerManager($n.URL_SCHEME,new fg)}catch{}var dg="model",pg=".json",vg=".weights.bin";function Us(r){return new Promise((function(t){return setTimeout(t)})).then(r)}var fo=(function(){function r(t){if(!L().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(r.URL_SCHEME)&&(t=t.slice(r.URL_SCHEME.length)),t!=null&&t.length!==0||(t=dg),this.modelTopologyFileName=t+pg,this.weightDataFileName=t+vg}return r.prototype.save=function(t){return J(this,void 0,void 0,(function(){var e,n,a,o,i,s;return Q(this,(function(u){switch(u.label){case 0:if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");if(e=window.URL.createObjectURL(new Blob([t.weightData],{type:"application/octet-stream"})),!(t.modelTopology instanceof ArrayBuffer))return[3,1];throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],a={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,weightsManifest:n},o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),(i=this.jsonAnchor==null?document.createElement("a"):this.jsonAnchor).download=this.modelTopologyFileName,i.href=o,[4,Us((function(){return i.dispatchEvent(new MouseEvent("click"))}))];case 2:return u.sent(),t.weightData==null?[3,4]:((s=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=e,[4,Us((function(){return s.dispatchEvent(new MouseEvent("click"))}))]);case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:Fr(t)}]}}))}))},r.URL_SCHEME="downloads://",r})(),mg=(function(){function r(t){if(t==null||t.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+t);this.files=t}return r.prototype.load=function(){return J(this,void 0,void 0,(function(){var t,e,n=this;return Q(this,(function(a){return t=this.files[0],e=this.files.slice(1),[2,new Promise((function(o,i){var s=new FileReader;s.onload=function(u){var c=JSON.parse(u.target.result),l=c.modelTopology;if(l!=null){e.length===0&&o({modelTopology:l});var h=c.weightsManifest;if(h!=null){var f;try{f=n.checkManifestAndWeightFiles(h,e)}catch(v){return void i(v)}var d=[],p=[],m=[];h.forEach((function(v){v.paths.forEach((function(g){p.push(g),m.push(null)})),d.push.apply(d,v.weights)})),h.forEach((function(v){v.paths.forEach((function(g){var y=new FileReader;y.onload=function(b){var x=b.target.result,w=p.indexOf(g);m[w]=x,m.indexOf(null)===-1&&o({modelTopology:l,weightSpecs:d,weightData:vi(m),format:c.format,generatedBy:c.generatedBy,convertedBy:c.convertedBy,userDefinedMetadata:c.userDefinedMetadata})},y.onerror=function(b){return i("Failed to weights data from file of path '"+g+"'.")},y.readAsArrayBuffer(f[g])}))}))}else i(new Error("weightManifest field is missing from file "+t.name))}else i(new Error("modelTopology field is missing from file "+t.name))},s.onerror=function(u){return i("Failed to read model topology and weights manifest JSON from file '"+t.name+"'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")},s.readAsText(t)}))]}))}))},r.prototype.checkManifestAndWeightFiles=function(t,e){for(var n=[],a=e.map((function(u){return Ls(u.name)})),o={},i=0,s=t;i<s.length;i++)s[i].paths.forEach((function(u){var c=Ls(u);if(n.indexOf(c)!==-1)throw new Error("Duplicate file basename found in weights manifest: '"+c+"'");if(n.push(c),a.indexOf(c)===-1)throw new Error("Weight file with basename '"+c+"' is not provided.");o[u]=e[a.indexOf(c)]}));if(n.length!==e.length)throw new Error("Mismatch in the number of files in weights manifest ("+n.length+") and the number of weight files provided ("+e.length+").");return o},r})();function Vs(r,t,e,n){(function(o){k(o!=null&&Array.isArray(o)&&o.length>0,(function(){return"promises must be a none empty array"}))})(r),(function(o,i){k(o>=0&&o<=1,(function(){return"Progress fraction must be in range [0, 1], but got startFraction "+o})),k(i>=0&&i<=1,(function(){return"Progress fraction must be in range [0, 1], but got endFraction "+i})),k(i>=o,(function(){return"startFraction must be no more than endFraction, but got startFraction "+o+" and endFraction "+i}))})(e=e??0,n=n??1);var a=0;return Promise.all(r.map((function(o){return o.then((function(i){var s=e+ ++a/r.length*(n-e);return t(s),i})),o})))}function Mc(r,t){return J(this,void 0,void 0,(function(){var e,n,a,o,i,s,u,c,l;return Q(this,(function(h){switch(h.label){case 0:return t==null&&(t={}),e=t.fetchFunc==null?L().platform.fetch:t.fetchFunc,n=r.map((function(f){return e(f,t.requestInit,{isBinary:!0})})),a=0,o=.5,t.onProgress!=null?[3,2]:[4,Promise.all(n)];case 1:return i=h.sent(),[3,4];case 2:return[4,Vs(n,t.onProgress,a,o)];case 3:i=h.sent(),h.label=4;case 4:return s=i.map((function(f){return f.arrayBuffer()})),u=.5,c=1,t.onProgress!=null?[3,6]:[4,Promise.all(s)];case 5:return l=h.sent(),[3,8];case 6:return[4,Vs(s,t.onProgress,u,c)];case 7:l=h.sent(),h.label=8;case 8:return[2,l]}}))}))}function Gs(r){var t=this;return function(e,n,a){return n===void 0&&(n=""),J(t,void 0,void 0,(function(){var o,i,s,u,c,l,h,f,d,p;return Q(this,(function(m){switch(m.label){case 0:if(o=e.map((function(){return!1})),i={},s=a!=null?a.map((function(){return!1})):[],u=[],e.forEach((function(v,g){var y=0;v.weights.forEach((function(b){var x="quantization"in b?b.quantization.dtype:b.dtype,w=Fo[x]*Z(b.shape),C=function(){o[g]=!0,i[g]==null&&(i[g]=[]),i[g].push({manifestEntry:b,groupOffset:y,sizeBytes:w})};a!=null?a.forEach((function(N,I){N===b.name&&(C(),s[I]=!0)})):C(),u.push(b.name),y+=w}))})),!s.every((function(v){return v})))throw c=a.filter((function(v,g){return!s[g]})),new Error("Could not find weights in manifest with names: "+c.join(", ")+`. 
Manifest JSON has weights with names: `+u.join(", ")+".");return l=o.reduce((function(v,g,y){return g&&v.push(y),v}),[]),h=[],l.forEach((function(v){e[v].paths.forEach((function(g){var y=n+(n.endsWith("/")?"":"/")+g;h.push(y)}))})),[4,r(h)];case 1:return f=m.sent(),d={},p=0,l.forEach((function(v){for(var g=e[v].paths.length,y=0,b=0;b<g;b++)y+=f[p+b].byteLength;for(var x=new ArrayBuffer(y),w=new Uint8Array(x),C=0,N=0;N<g;N++){var I=new Uint8Array(f[p+N]);w.set(I,C),C+=I.byteLength}i[v].forEach((function(R){var S=Dc(x.slice(R.groupOffset,R.groupOffset+R.sizeBytes),[R.manifestEntry]);for(var F in S)d[F]=S[F]})),p+=g})),[2,d]}}))}))}}gt.registerSaveRouter((function(r){return L().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(fo.URL_SCHEME)?(function(t){return t===void 0&&(t="model"),new fo(t)})(r.slice(fo.URL_SCHEME.length)):null}));var Pc=(function(){function r(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.onProgress=e.onProgress,e.fetchFunc!=null?(k(typeof e.fetchFunc=="function",(function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"})),this.fetch=e.fetchFunc):this.fetch=L().platform.fetch,k(t!=null&&t.length>0,(function(){return"URL path for http must not be null, undefined or empty."})),Array.isArray(t)&&k(t.length===2,(function(){return"URL paths for http must have a length of 2, (actual length is "+t.length+")."})),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{}}return r.prototype.save=function(t){return J(this,void 0,void 0,(function(){var e,n,a,o;return Q(this,(function(i){switch(i.label){case 0:if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,n=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],a={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata,weightsManifest:n},e.body.append("model.json",new Blob([JSON.stringify(a)],{type:"application/json"}),"model.json"),t.weightData!=null&&e.body.append("model.weights.bin",new Blob([t.weightData],{type:"application/octet-stream"}),"model.weights.bin"),[4,this.fetch(this.path,e)];case 1:if((o=i.sent()).ok)return[2,{modelArtifactsInfo:Fr(t),responses:[o]}];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+o.status+".")}}))}))},r.prototype.load=function(){return J(this,void 0,void 0,(function(){var t,e,n,a,o,i,s,u,c,l,h,f;return Q(this,(function(d){switch(d.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(t=d.sent()).ok)throw new Error("Request to "+this.path+" failed with status code "+t.status+". Please verify this URL points to the model JSON of the model to load.");d.label=2;case 2:return d.trys.push([2,4,,5]),[4,t.json()];case 3:return e=d.sent(),[3,5];case 4:throw d.sent(),n="Failed to parse model JSON of response from "+this.path+".",this.path.endsWith(".pb")?n+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":n+=" Please make sure the server is serving valid JSON for this request.",new Error(n);case 5:if(a=e.modelTopology,o=e.weightsManifest,i=e.generatedBy,s=e.convertedBy,u=e.format,c=e.userDefinedMetadata,a==null&&o==null)throw new Error("The JSON from HTTP path "+this.path+" contains neither model topology or manifest for weights.");return o==null?[3,7]:[4,this.loadWeights(o)];case 6:f=d.sent(),l=f[0],h=f[1],d.label=7;case 7:return[2,{modelTopology:a,weightSpecs:l,weightData:h,userDefinedMetadata:c,generatedBy:i,convertedBy:s,format:u}]}}))}))},r.prototype.loadWeights=function(t){return J(this,void 0,void 0,(function(){var e,n,a,o,i,s,u,c,l,h,f;return Q(this,(function(d){switch(d.label){case 0:for(e=Array.isArray(this.path)?this.path[1]:this.path,n=(function(p){var m=p.lastIndexOf("/"),v=p.lastIndexOf("?"),g=p.substring(0,m),y=v>m?p.substring(v):"";return[g+"/",y]})(e),a=n[0],o=n[1],i=this.weightPathPrefix||a,s=[],u=0,c=t;u<c.length;u++)l=c[u],s.push.apply(s,l.weights);return h=[],t.forEach((function(p){p.paths.forEach((function(m){h.push(i+m+o)}))})),[4,Mc(h,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress})];case 1:return f=d.sent(),[2,[s,vi(f)]]}}))}))},r.URL_SCHEME_REGEX=/^https?:\/\//,r})();function Oo(r){return r.match(Pc.URL_SCHEME_REGEX)!=null}var Hs=function(r,t){return typeof fetch>"u"?null:(Array.isArray(r)?r.every((function(e){return Oo(e)})):Oo(r))?Bo(r,{onProgress:t}):null};function Bo(r,t){return new Pc(r,t)}gt.registerSaveRouter(Hs),gt.registerLoadRouter(Hs);var po=(function(){function r(t){this.modelArtifacts=t}return r.prototype.load=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(t){return[2,this.modelArtifacts]}))}))},r})(),gg=(function(){function r(t){this.saveHandler=t}return r.prototype.save=function(t){return J(this,void 0,void 0,(function(){return Q(this,(function(e){return[2,this.saveHandler(t)]}))}))},r})(),Oc=Object.freeze({browserFiles:function(r){return new mg(r)},browserHTTPRequest:function(r,t){return Bo(r,t)},concatenateArrayBuffers:vi,decodeWeights:Dc,encodeWeights:function(r,t){return J(this,void 0,void 0,(function(){var e,n,a,o,i,s=this;return Q(this,(function(u){switch(u.label){case 0:for(e=[],n=[],a=Array.isArray(r)?r.map((function(c){return c.name})):Object.keys(r),o=function(c){var l=a[c],h=Array.isArray(r)?r[c].tensor:r[l];if(h.dtype!=="float32"&&h.dtype!=="int32"&&h.dtype!=="bool"&&h.dtype!=="string")throw new Error("Unsupported dtype in weight '"+l+"': "+h.dtype);var f={name:l,shape:h.shape,dtype:h.dtype};if(h.dtype==="string"){var d=new Promise((function(p){return J(s,void 0,void 0,(function(){var m,v,g,y,b,x,w;return Q(this,(function(C){switch(C.label){case 0:return[4,h.bytes()];case 1:for(m=C.sent(),v=m.reduce((function(N,I){return N+I.length}),0)+ga*m.length,g=new Uint8Array(v),y=0,b=0;b<m.length;b++)x=m[b],w=new Uint8Array(new Uint32Array([x.length]).buffer),g.set(w,y),y+=ga,g.set(x,y),y+=x.length;return p(g),[2]}}))}))}));n.push(d)}else n.push(h.data());t!=null&&(f.group=t),e.push(f)},i=0;i<a.length;++i)o(i);return[4,Promise.all(n)];case 1:return[2,{data:og(u.sent()),specs:e}]}}))}))},fromMemory:function(r,t,e,n){return arguments.length===1?r.modelTopology!=null||r.weightSpecs!=null?new po(r):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new po({modelTopology:r})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new po({modelTopology:r,weightSpecs:t,weightData:e,trainingConfig:n}))},getLoadHandlers:function(r,t){return gt.getLoadHandlers(r,t)},getModelArtifactsInfoForJSON:Fr,getSaveHandlers:function(r){return gt.getSaveHandlers(r)},http:Bo,isHTTPScheme:Oo,loadWeights:function(r,t,e,n){return t===void 0&&(t=""),J(this,void 0,void 0,(function(){return Q(this,(function(a){return[2,Gs((function(o){return Mc(o,{requestInit:n})}))(r,t,e)]}))}))},registerLoadRouter:function(r){return gt.registerLoadRouter(r)},registerSaveRouter:function(r){return gt.registerSaveRouter(r)},weightsLoaderFactory:Gs,withSaveHandler:function(r){return new gg(r)},copyModel:function(r,t){return J(this,void 0,void 0,(function(){return Q(this,(function(e){return[2,Ws(r,t,!1)]}))}))},listModels:function(){return J(this,void 0,void 0,(function(){var r,t,e,n,a,o,i;return Q(this,(function(s){switch(s.label){case 0:r=pn.getSchemes(),t={},e=0,n=r,s.label=1;case 1:return e<n.length?(a=n[e],[4,pn.getManager(a).listModels()]):[3,4];case 2:for(i in o=s.sent())t[a+Xn+i]=o[i];s.label=3;case 3:return e++,[3,1];case 4:return[2,t]}}))}))},moveModel:function(r,t){return J(this,void 0,void 0,(function(){return Q(this,(function(e){return[2,Ws(r,t,!0)]}))}))},removeModel:function(r){return J(this,void 0,void 0,(function(){var t;return Q(this,(function(e){return t=Qr(r),[2,pn.getManager(t.scheme).removeModel(t.path)]}))}))}}),Wn;D({confusionMatrix_:function(r,t,e){var n=_(r,"labels","confusionMatrix"),a=_(t,"predictions","confusionMatrix");k(e==null||e>0&&Number.isInteger(e),(function(){return"If provided, numClasses must be a positive integer, but got "+e})),k(n.rank===1,(function(){return"Expected the rank of labels to be 1, but got "+n.rank})),k(a.rank===1,(function(){return"Expected the rank of predictions to be 1, but got "+a.rank})),k(n.shape[0]===a.shape[0],(function(){return"Mismatch in the number of examples: "+n.shape[0]+" vs. "+a.shape[0]+". Labels and predictions should have the same number of elements."})),k(e>0&&Number.isInteger(e),(function(){return"numClasses is required to be a positive integer, but got "+e}));var o=So(n.asType("int32"),e),i=So(a.asType("int32"),e);return o.transpose().matMul(i).asType("int32")}});var xg=D({fromPixels_:function(r,t){if(t===void 0&&(t=3),t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(r==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var e=!1,n=!1,a=!1,o=!1,i=!1;if(r.data instanceof Uint8Array)e=!0;else if(typeof ImageData<"u"&&r instanceof ImageData)n=!0;else if(typeof HTMLVideoElement<"u"&&r instanceof HTMLVideoElement)a=!0;else if(typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement)o=!0;else{if(r.getContext==null)throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was "+r.constructor.name);i=!0}if(a&&a&&r.readyState<2)throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");if(iu("FromPixels",T.backendName)!=null)return T.runKernel("FromPixels",{pixels:r},{numChannels:t});var s,u,c=a?[r.videoWidth,r.videoHeight]:[r.width,r.height],l=c[0],h=c[1];if(i?s=r.getContext("2d").getImageData(0,0,l,h).data:n||e?s=r.data:(o||a)&&(Wn==null&&(Wn=document.createElement("canvas").getContext("2d")),Wn.canvas.width=l,Wn.canvas.height=h,Wn.drawImage(r,0,0,l,h),s=Wn.getImageData(0,0,l,h).data),t===4)u=new Int32Array(s);else{var f=l*h;u=new Int32Array(f*t);for(var d=0;d<f;d++)for(var p=0;p<t;++p)u[d*t+p]=s[4*d+p]}return Go(u,[h,l,t],"int32")}}),mi=Object.freeze({toPixels:function(r,t){return J(this,void 0,void 0,(function(){var e,n,a,o,i,s,u,c,l,h,f,d,p,m,v,g,y,b,x,w,C,N,I;return Q(this,(function(R){switch(R.label){case 0:if(e=_(r,"img","toPixels"),r instanceof Te||(e=e.toInt()),e.rank!==2&&e.rank!==3)throw new Error("toPixels only supports rank 2 or 3 tensors, got rank "+e.rank+".");if(n=e.shape.slice(0,2),a=n[0],o=n[1],(i=e.rank===2?1:e.shape[2])>4||i===2)throw new Error("toPixels only supports depth of size 1, 3 or 4 but got "+i);return[4,e.data()];case 1:return s=R.sent(),u=e.min(),c=e.max(),[4,Promise.all([u.data(),c.data()])];case 2:if(l=R.sent(),h=l[0],f=l[1],d=h[0],p=f[0],u.dispose(),c.dispose(),e.dtype==="float32"){if(d<0||p>1)throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range ["+d+" - "+p+"].")}else{if(e.dtype!=="int32")throw new Error("Unsupported type for toPixels: "+e.dtype+". Please use float32 or int32 tensors.");if(d<0||p>255)throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range ["+d+" - "+p+"].")}for(m=e.dtype==="float32"?255:1,v=new Uint8ClampedArray(o*a*4),g=0;g<a*o;++g)y=void 0,b=void 0,x=void 0,w=void 0,i===1?(y=s[g]*m,b=s[g]*m,x=s[g]*m,w=255):i===3?(y=s[3*g]*m,b=s[3*g+1]*m,x=s[3*g+2]*m,w=255):i===4&&(y=s[4*g]*m,b=s[4*g+1]*m,x=s[4*g+2]*m,w=s[4*g+3]*m),v[(C=4*g)+0]=Math.round(y),v[C+1]=Math.round(b),v[C+2]=Math.round(x),v[C+3]=Math.round(w);return t!=null&&(t.width=o,t.height=a,N=t.getContext("2d"),I=new ImageData(v,o,a),N.putImageData(I,0,0)),e!==r&&e.dispose(),[2,v]}}))}))},fromPixels:xg}),yg=(function(){function r(){}return r.prototype.getClassName=function(){return this.constructor.className},r.fromConfig=function(t,e){return new t(e)},r})(),bg=(function(){function r(){this.classNameMap={}}return r.getMap=function(){return r.instance==null&&(r.instance=new r),r.instance},r.register=function(t){r.getMap().classNameMap[t.className]=[t,t.fromConfig]},r})();function Mn(r){k(r.className!=null,(function(){return"Class being registered does not have the static className property defined."})),k(typeof r.className=="string",(function(){return"className is required to be a string, but got type "+typeof r.className})),k(r.className.length>0,(function(){return"Class being registered has an empty-string as its className, which is disallowed."})),bg.register(r)}var Pn=(function(r){function t(){return r!==null&&r.apply(this,arguments)||this}return Mt(t,r),t.prototype.minimize=function(e,n,a){n===void 0&&(n=!1);var o=this.computeGradients(e,a),i=o.value,s=o.grads;if(a!=null){var u=a.map((function(c){return{name:c.name,tensor:s[c.name]}}));this.applyGradients(u)}else this.applyGradients(s);return ht(s),n?i:(i.dispose(),null)},Object.defineProperty(t.prototype,"iterations",{get:function(){return this.iterations_==null&&(this.iterations_=0),this.iterations_},enumerable:!0,configurable:!0}),t.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},t.prototype.computeGradients=function(e,n){return Df(e,n)},t.prototype.dispose=function(){this.iterations_!=null&&ht(this.iterations_)},t.prototype.saveIterations=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(e){return this.iterations_==null&&(this.iterations_=0),[2,{name:"iter",tensor:K(this.iterations_,"int32")}]}))}))},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(e){throw new Error("getWeights() is not implemented for this optimizer yet.")}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){return Q(this,(function(n){throw new Error("setWeights() is not implemented for this optimizer class "+this.getClassName())}))}))},t.prototype.extractIterations=function(e){return J(this,void 0,void 0,(function(){var n;return Q(this,(function(a){switch(a.label){case 0:return n=this,[4,e[0].tensor.data()];case 1:return n.iterations_=a.sent()[0],[2,e.slice(1)]}}))}))},t})(yg);Object.defineProperty(Pn,Symbol.hasInstance,{value:function(r){return r.minimize!=null&&r.computeGradients!=null&&r.applyGradients!=null}});var wg=(function(r){function t(e,n,a){a===void 0&&(a=null);var o=r.call(this)||this;return o.learningRate=e,o.rho=n,o.epsilon=a,o.accumulatedGrads=[],o.accumulatedUpdates=[],a==null&&(o.epsilon=T.backend.epsilon()),o}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=T.registeredVariables[a];n.accumulatedGrads[o]==null&&(n.accumulatedGrads[o]={originalName:a+"/accum_grad",variable:Y((function(){return Ce(i).variable(!1)}))}),n.accumulatedUpdates[o]==null&&(n.accumulatedUpdates[o]={originalName:a+"/accum_var",variable:Y((function(){return Ce(i).variable(!1)}))});var s=Array.isArray(e)?e[o].tensor:e[a];if(s!=null){var u=n.accumulatedGrads[o].variable,c=n.accumulatedUpdates[o].variable;Y((function(){var l=u.mul(n.rho).add(s.square().mul(1-n.rho)),h=c.add(n.epsilon).sqrt().div(u.add(n.epsilon).sqrt()).mul(s),f=c.mul(n.rho).add(h.square().mul(1-n.rho));u.assign(l),c.assign(f);var d=h.mul(-n.learningRate).add(i);i.assign(d)}))}})),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedUpdates!=null&&(ht(this.accumulatedGrads.map((function(e){return e.variable}))),ht(this.accumulatedUpdates.map((function(e){return e.variable}))))},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){var e;return Q(this,(function(n){switch(n.label){case 0:return e=this.accumulatedGrads.concat(this.accumulatedUpdates),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(e.map((function(a){return{name:a.originalName,tensor:a.variable}})))]}}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){var n;return Q(this,(function(a){switch(a.label){case 0:return[4,this.extractIterations(e)];case 1:return e=a.sent(),n=e.length/2,this.accumulatedGrads=e.slice(0,n).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),this.accumulatedUpdates=e.slice(n,2*n).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},t.fromConfig=function(e,n){return new e(n.learningRate,n.rho,n.epsilon)},t.className="Adadelta",t})(Pn);Mn(wg);var Cg=(function(r){function t(e,n){n===void 0&&(n=.1);var a=r.call(this)||this;return a.learningRate=e,a.initialAccumulatorValue=n,a.accumulatedGrads=[],a}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=T.registeredVariables[a];n.accumulatedGrads[o]==null&&(n.accumulatedGrads[o]={originalName:a+"/accumulator",variable:Y((function(){return Gt(i.shape,n.initialAccumulatorValue).variable(!1)}))});var s=Array.isArray(e)?e[o].tensor:e[a];if(s!=null){var u=n.accumulatedGrads[o].variable;Y((function(){var c=u.add(s.square());u.assign(c);var l=s.div(c.add(T.backend.epsilon()).sqrt()).mul(-n.learningRate).add(i);i.assign(l)}))}})),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedGrads!=null&&ht(this.accumulatedGrads.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map((function(n){return{name:n.originalName,tensor:n.variable}})))]}}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){return Q(this,(function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),this.accumulatedGrads=e.map((function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},t.fromConfig=function(e,n){return new e(n.learningRate,n.initialAccumulatorValue)},t.className="Adagrad",t})(Pn);Mn(Cg);var _g=(function(r){function t(e,n,a,o){o===void 0&&(o=null);var i=r.call(this)||this;return i.learningRate=e,i.beta1=n,i.beta2=a,i.epsilon=o,i.accumulatedFirstMoment=[],i.accumulatedSecondMoment=[],Y((function(){i.accBeta1=K(n).variable(),i.accBeta2=K(a).variable()})),o==null&&(i.epsilon=T.backend.epsilon()),i}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this,a=Array.isArray(e)?e.map((function(o){return o.name})):Object.keys(e);Y((function(){var o=Ue(1,n.accBeta1),i=Ue(1,n.accBeta2);a.forEach((function(s,u){var c=T.registeredVariables[s];n.accumulatedFirstMoment[u]==null&&(n.accumulatedFirstMoment[u]={originalName:s+"/m",variable:Y((function(){return Ce(c).variable(!1)}))}),n.accumulatedSecondMoment[u]==null&&(n.accumulatedSecondMoment[u]={originalName:s+"/v",variable:Y((function(){return Ce(c).variable(!1)}))});var l=Array.isArray(e)?e[u].tensor:e[s];if(l!=null){var h=n.accumulatedFirstMoment[u].variable,f=n.accumulatedSecondMoment[u].variable,d=h.mul(n.beta1).add(l.mul(1-n.beta1)),p=f.mul(n.beta2).add(l.square().mul(1-n.beta2)),m=d.div(o),v=p.div(i);h.assign(d),f.assign(p);var g=m.div(v.sqrt().add(n.epsilon)).mul(-n.learningRate).add(c);c.assign(g)}})),n.accBeta1.assign(n.accBeta1.mul(n.beta1)),n.accBeta2.assign(n.accBeta2.mul(n.beta2))})),this.incrementIterations()},t.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&ht(this.accumulatedFirstMoment.map((function(e){return e.variable}))),this.accumulatedSecondMoment!=null&&ht(this.accumulatedSecondMoment.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){var e;return Q(this,(function(n){switch(n.label){case 0:return e=this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(e.map((function(a){return{name:a.originalName,tensor:a.variable}})))]}}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){var n,a=this;return Q(this,(function(o){switch(o.label){case 0:return[4,this.extractIterations(e)];case 1:return e=o.sent(),Y((function(){a.accBeta1.assign(va(a.beta1,a.iterations_+1)),a.accBeta2.assign(va(a.beta2,a.iterations_+1))})),n=e.length/2,this.accumulatedFirstMoment=e.slice(0,n).map((function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}})),this.accumulatedSecondMoment=e.slice(n,2*n).map((function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},t.fromConfig=function(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon)},t.className="Adam",t})(Pn);Mn(_g);var Eg=(function(r){function t(e,n,a,o,i){o===void 0&&(o=null),i===void 0&&(i=0);var s=r.call(this)||this;return s.learningRate=e,s.beta1=n,s.beta2=a,s.epsilon=o,s.decay=i,s.accumulatedFirstMoment=[],s.accumulatedWeightedInfNorm=[],Y((function(){s.iteration=K(0).variable(),s.accBeta1=K(n).variable()})),o==null&&(s.epsilon=T.backend.epsilon()),s}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this,a=Array.isArray(e)?e.map((function(o){return o.name})):Object.keys(e);Y((function(){var o=Ue(1,n.accBeta1),i=At(-n.learningRate,n.iteration.mul(n.decay).add(1));a.forEach((function(s,u){var c=T.registeredVariables[s];n.accumulatedFirstMoment[u]==null&&(n.accumulatedFirstMoment[u]={originalName:s+"/m",variable:Ce(c).variable(!1)}),n.accumulatedWeightedInfNorm[u]==null&&(n.accumulatedWeightedInfNorm[u]={originalName:s+"/v",variable:Ce(c).variable(!1)});var l=Array.isArray(e)?e[u].tensor:e[s];if(l!=null){var h=n.accumulatedFirstMoment[u].variable,f=n.accumulatedWeightedInfNorm[u].variable,d=h.mul(n.beta1).add(l.mul(1-n.beta1)),p=f.mul(n.beta2),m=l.abs(),v=p.maximum(m);h.assign(d),f.assign(v);var g=i.div(o).mul(d.div(v.add(n.epsilon))).add(c);c.assign(g)}})),n.iteration.assign(n.iteration.add(1)),n.accBeta1.assign(n.accBeta1.mul(n.beta1))})),this.incrementIterations()},t.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&ht(this.accumulatedFirstMoment.map((function(e){return e.variable}))),this.accumulatedWeightedInfNorm!=null&&ht(this.accumulatedWeightedInfNorm.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(e){throw new Error("getWeights() is not implemented for Adamax yet.")}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){return Q(this,(function(n){throw new Error("setWeights() is not implemented for Adamax yet.")}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},t.fromConfig=function(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon,n.decay)},t.className="Adamax",t})(Pn);Mn(Eg);var Bc=(function(r){function t(e){var n=r.call(this)||this;return n.learningRate=e,n.setLearningRate(e),n}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=Array.isArray(e)?e[o].tensor:e[a];if(i!=null){var s=T.registeredVariables[a];Y((function(){var u=n.c.mul(i).add(s);s.assign(u)}))}})),this.incrementIterations()},t.prototype.setLearningRate=function(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Vh(K(-e))},t.prototype.dispose=function(){this.c.dispose()},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){return Q(this,(function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:if((e=n.sent()).length!==0)throw new Error("SGD optimizer does not have settable weights.");return[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate}},t.fromConfig=function(e,n){return new e(n.learningRate)},t.className="SGD",t})(Pn);Mn(Bc);var kg=(function(r){function t(e,n,a){a===void 0&&(a=!1);var o=r.call(this,e)||this;return o.learningRate=e,o.momentum=n,o.useNesterov=a,o.accumulations=[],o.m=K(o.momentum),o}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=T.registeredVariables[a];n.accumulations[o]==null&&(n.accumulations[o]={originalName:a+"/momentum",variable:Y((function(){return Ce(i).variable(!1)}))});var s=n.accumulations[o].variable,u=Array.isArray(e)?e[o].tensor:e[a];u!=null&&Y((function(){var c,l=n.m.mul(s).add(u);c=n.useNesterov?n.c.mul(u.add(l.mul(n.m))).add(i):n.c.mul(l).add(i),s.assign(l),i.assign(c)}))})),this.incrementIterations()},t.prototype.dispose=function(){this.m.dispose(),this.accumulations!=null&&ht(this.accumulations.map((function(e){return e.variable})))},t.prototype.setMomentum=function(e){this.momentum=e},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){return Q(this,(function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map((function(n){return{name:n.originalName,tensor:n.variable}})))]}}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){return Q(this,(function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),this.accumulations=e.map((function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}})),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},t.fromConfig=function(e,n){return new e(n.learningRate,n.momentum,n.useNesterov)},t.className="Momentum",t})(Bc);Mn(kg);var Ig=(function(r){function t(e,n,a,o,i){n===void 0&&(n=.9),a===void 0&&(a=0),o===void 0&&(o=null),i===void 0&&(i=!1);var s=r.call(this)||this;if(s.learningRate=e,s.decay=n,s.momentum=a,s.epsilon=o,s.accumulatedMeanSquares=[],s.accumulatedMoments=[],s.accumulatedMeanGrads=[],s.centered=i,o==null&&(s.epsilon=T.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.");return s}return Mt(t,r),t.prototype.applyGradients=function(e){var n=this;(Array.isArray(e)?e.map((function(a){return a.name})):Object.keys(e)).forEach((function(a,o){var i=T.registeredVariables[a];n.accumulatedMeanSquares[o]==null&&(n.accumulatedMeanSquares[o]={originalName:a+"/rms",variable:Y((function(){return Ce(i).variable(!1)}))}),n.accumulatedMoments[o]==null&&(n.accumulatedMoments[o]={originalName:a+"/momentum",variable:Y((function(){return Ce(i).variable(!1)}))}),n.accumulatedMeanGrads[o]==null&&n.centered&&(n.accumulatedMeanGrads[o]={originalName:a+"/mg",variable:Y((function(){return Ce(i).variable(!1)}))});var s=Array.isArray(e)?e[o].tensor:e[a];if(s!=null){var u=n.accumulatedMeanSquares[o].variable,c=n.accumulatedMoments[o].variable;Y((function(){var l=u.mul(n.decay).add(s.square().mul(1-n.decay));if(n.centered){var h=n.accumulatedMeanGrads[o].variable,f=h.mul(n.decay).add(s.mul(1-n.decay)),d=c.mul(n.momentum).add(s.mul(n.learningRate).div(l.sub(f.square().add(n.epsilon)).sqrt()));u.assign(l),h.assign(f),c.assign(d);var p=i.sub(d);i.assign(p)}else{var m=u.mul(n.decay).add(s.square().mul(1-n.decay));d=c.mul(n.momentum).add(s.mul(n.learningRate).div(m.add(n.epsilon).sqrt())),u.assign(m),c.assign(d),p=i.sub(d),i.assign(p)}}))}})),this.incrementIterations()},t.prototype.dispose=function(){this.accumulatedMeanSquares!=null&&ht(this.accumulatedMeanSquares.map((function(e){return e.variable}))),this.accumulatedMeanGrads!=null&&this.centered&&ht(this.accumulatedMeanGrads.map((function(e){return e.variable}))),this.accumulatedMoments!=null&&ht(this.accumulatedMoments.map((function(e){return e.variable})))},t.prototype.getWeights=function(){return J(this,void 0,void 0,(function(){var e;return Q(this,(function(n){switch(n.label){case 0:return e=this.accumulatedMeanSquares.concat(this.accumulatedMoments),this.centered&&e.push.apply(e,this.accumulatedMeanGrads),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(e.map((function(a){return{name:a.originalName,tensor:a.variable}})))]}}))}))},t.prototype.setWeights=function(e){return J(this,void 0,void 0,(function(){var n;return Q(this,(function(a){switch(a.label){case 0:return[4,this.extractIterations(e)];case 1:return e=a.sent(),n=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,n).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),this.accumulatedMoments=e.slice(n,2*n).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}})),this.centered&&(this.accumulatedMeanGrads=e.slice(2*n,3*n).map((function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}))),[2]}}))}))},t.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},t.fromConfig=function(e,n){return new e(n.learningRate,n.decay,n.momentum,n.epsilon,n.centered)},t.className="RMSProp",t})(Pn);Mn(Ig);Te.prototype.squaredDifference=function(r){return Qu(this,r)},P=Qm;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var Lo=function(r,t){return Lo=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var a in n)n.hasOwnProperty(a)&&(e[a]=n[a])},Lo(r,t)};function ue(r,t){Lo(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}var Je=function(){return Je=Object.assign||function(t){for(var e,n=1,a=arguments.length;n<a;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},Je.apply(this,arguments)};function te(r,t,e,n){function a(o){return o instanceof e?o:new e(function(i){i(o)})}return new(e||(e=Promise))(function(o,i){function s(l){try{c(n.next(l))}catch(h){i(h)}}function u(l){try{c(n.throw(l))}catch(h){i(h)}}function c(l){l.done?o(l.value):a(l.value).then(s,u)}c((n=n.apply(r,[])).next())})}function ne(r,t){var e={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,a,o,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(c){return function(l){return u([c,l])}}function u(c){if(n)throw new TypeError("Generator is already executing.");for(;e;)try{if(n=1,a&&(o=c[0]&2?a.return:c[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,c[1])).done)return o;switch(a=0,o&&(c=[c[0]&2,o.value]),c[0]){case 0:case 1:o=c;break;case 4:return e.label++,{value:c[1],done:!1};case 5:e.label++,a=c[1],c=[0];continue;case 7:c=e.ops.pop(),e.trys.pop();continue;default:if(o=e.trys,!(o=o.length>0&&o[o.length-1])&&(c[0]===6||c[0]===2)){e=0;continue}if(c[0]===3&&(!o||c[1]>o[0]&&c[1]<o[3])){e.label=c[1];break}if(c[0]===6&&e.label<o[1]){e.label=o[1],o=c;break}if(o&&e.label<o[2]){e.label=o[2],e.ops.push(c);break}o[2]&&e.ops.pop(),e.trys.pop();continue}c=t.call(r,e)}catch(l){c=[6,l],a=0}finally{n=o=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function xr(){for(var r=0,t=0,e=arguments.length;t<e;t++)r+=arguments[t].length;for(var n=Array(r),a=0,t=0;t<e;t++)for(var o=arguments[t],i=0,s=o.length;i<s;i++,a++)n[a]=o[i];return n}var Jn=(function(){function r(t,e){if(!Sn(t)||!Sn(e))throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have "+JSON.stringify({width:t,height:e}));this._width=t,this._height=e}return Object.defineProperty(r.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),r.prototype.reverse=function(){return new r(1/this.width,1/this.height)},r})();function Aa(r,t){return r instanceof Te&&r.shape.length===t}function Rg(r){return Aa(r,2)}function Ta(r){return Aa(r,3)}function vn(r){return Aa(r,4)}function Sg(r){return r%1!==0}function qs(r){return r%2===0}function Ng(r,t){t===void 0&&(t=2);var e=Math.pow(10,t);return Math.floor(r*e)/e}function Ks(r){return r&&r.width&&r.height}function Dg(r,t){var e=r.width,n=r.height,a=t/Math.max(n,e);return new Jn(Math.round(e*a),Math.round(n*a))}function gi(r){return r.reduce(function(t,e){return t.add(e)},new Ee(0,0)).div(new Ee(r.length,r.length))}function Er(r,t,e){return Array(r).fill(0).map(function(n,a){return t+a*e})}function Sn(r){return!!r&&r!==1/0&&r!==-1/0&&!isNaN(r)||r===0}function Xs(r){return Sn(r)&&0<=r&&r<=1}var Ee=(function(){function r(t,e){this._x=t,this._y=e}return Object.defineProperty(r.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),r.prototype.add=function(t){return new r(this.x+t.x,this.y+t.y)},r.prototype.sub=function(t){return new r(this.x-t.x,this.y-t.y)},r.prototype.mul=function(t){return new r(this.x*t.x,this.y*t.y)},r.prototype.div=function(t){return new r(this.x/t.x,this.y/t.y)},r.prototype.abs=function(){return new r(Math.abs(this.x),Math.abs(this.y))},r.prototype.magnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},r.prototype.floor=function(){return new r(Math.floor(this.x),Math.floor(this.y))},r})(),gn=(function(){function r(t,e){e===void 0&&(e=!0);var n=t||{},a=[n.left,n.top,n.right,n.bottom].every(Sn),o=[n.x,n.y,n.width,n.height].every(Sn);if(!o&&!a)throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have "+JSON.stringify(n));var i=o?[n.x,n.y,n.width,n.height]:[n.left,n.top,n.right-n.left,n.bottom-n.top],s=i[0],u=i[1],c=i[2],l=i[3];r.assertIsValidBox({x:s,y:u,width:c,height:l},"Box.constructor",e),this._x=s,this._y=u,this._width=c,this._height=l}return r.isRect=function(t){return!!t&&[t.x,t.y,t.width,t.height].every(Sn)},r.assertIsValidBox=function(t,e,n){if(n===void 0&&(n=!1),!r.isRect(t))throw new Error(e+" - invalid box: "+JSON.stringify(t)+", expected object with properties x, y, width, height");if(!n&&(t.width<0||t.height<0))throw new Error(e+" - width ("+t.width+") and height ("+t.height+") must be positive numbers")},Object.defineProperty(r.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"left",{get:function(){return this.x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"top",{get:function(){return this.y},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"area",{get:function(){return this.width*this.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"topLeft",{get:function(){return new Ee(this.left,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"topRight",{get:function(){return new Ee(this.right,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottomLeft",{get:function(){return new Ee(this.left,this.bottom)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottomRight",{get:function(){return new Ee(this.right,this.bottom)},enumerable:!0,configurable:!0}),r.prototype.round=function(){var t=[this.x,this.y,this.width,this.height].map(function(i){return Math.round(i)}),e=t[0],n=t[1],a=t[2],o=t[3];return new r({x:e,y:n,width:a,height:o})},r.prototype.floor=function(){var t=[this.x,this.y,this.width,this.height].map(function(i){return Math.floor(i)}),e=t[0],n=t[1],a=t[2],o=t[3];return new r({x:e,y:n,width:a,height:o})},r.prototype.toSquare=function(){var t=this,e=t.x,n=t.y,a=t.width,o=t.height,i=Math.abs(a-o);return a<o&&(e-=i/2,a+=i),o<a&&(n-=i/2,o+=i),new r({x:e,y:n,width:a,height:o})},r.prototype.rescale=function(t){var e=Ks(t)?t.width:t,n=Ks(t)?t.height:t;return new r({x:this.x*e,y:this.y*n,width:this.width*e,height:this.height*n})},r.prototype.pad=function(t,e){var n=[this.x-t/2,this.y-e/2,this.width+t,this.height+e],a=n[0],o=n[1],i=n[2],s=n[3];return new r({x:a,y:o,width:i,height:s})},r.prototype.clipAtImageBorders=function(t,e){var n=this,a=n.x,o=n.y,i=n.right,s=n.bottom,u=Math.max(a,0),c=Math.max(o,0),l=i-u,h=s-c,f=Math.min(l,t-u),d=Math.min(h,e-c);return new r({x:u,y:c,width:f,height:d}).floor()},r.prototype.shift=function(t,e){var n=this,a=n.width,o=n.height,i=this.x+t,s=this.y+e;return new r({x:i,y:s,width:a,height:o})},r.prototype.padAtBorders=function(t,e){var n=this.width+1,a=this.height+1,o=1,i=1,s=n,u=a,c=this.left,l=this.top,h=this.right,f=this.bottom;return h>e&&(s=-h+e+n,h=e),f>t&&(u=-f+t+a,f=t),c<1&&(u=2-c,c=1),l<1&&(u=2-l,l=1),{dy:i,edy:u,dx:o,edx:s,y:l,ey:f,x:c,ex:h,w:n,h:a}},r.prototype.calibrate=function(t){return new r({left:this.left+t.left*this.width,top:this.top+t.top*this.height,right:this.right+t.right*this.width,bottom:this.bottom+t.bottom*this.height}).toSquare().round()},r})(),Fa=(function(r){ue(t,r);function t(e,n,a,o,i){return i===void 0&&(i=!1),r.call(this,{left:e,top:n,right:a,bottom:o},i)||this}return t})(gn),Lc=(function(){function r(t,e,n,a,o){this._imageDims=new Jn(o.width,o.height),this._score=t,this._classScore=e,this._className=n,this._box=new gn(a).rescale(this._imageDims)}return Object.defineProperty(r.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"className",{get:function(){return this._className},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"box",{get:function(){return this._box},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageDims",{get:function(){return this._imageDims},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageWidth",{get:function(){return this.imageDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageHeight",{get:function(){return this.imageDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"relativeBox",{get:function(){return new gn(this._box).rescale(this.imageDims.reverse())},enumerable:!0,configurable:!0}),r.prototype.forSize=function(t,e){return new r(this.score,this.classScore,this.className,this.relativeBox,{width:t,height:e})},r})(),Yt=(function(r){ue(t,r);function t(e,n,a){return r.call(this,e,e,"",n,a)||this}return t.prototype.forSize=function(e,n){var a=r.prototype.forSize.call(this,e,n),o=a.score,i=a.relativeBox,s=a.imageDims;return new t(o,i,s)},t})(Lc);function Ag(r,t,e){e===void 0&&(e=!0);var n=Math.max(0,Math.min(r.right,t.right)-Math.max(r.left,t.left)),a=Math.max(0,Math.min(r.bottom,t.bottom)-Math.max(r.top,t.top)),o=n*a;return e?o/(r.area+t.area-o):o/Math.min(r.area,t.area)}function Tg(r){var t=r.map(function(s){return s.x}),e=r.map(function(s){return s.y}),n=t.reduce(function(s,u){return u<s?u:s},1/0),a=e.reduce(function(s,u){return u<s?u:s},1/0),o=t.reduce(function(s,u){return s<u?u:s},0),i=e.reduce(function(s,u){return s<u?u:s},0);return new Fa(n,a,o,i)}function kr(r,t,e,n){n===void 0&&(n=!0);for(var a=t.map(function(s,u){return{score:s,boxIndex:u}}).sort(function(s,u){return s.score-u.score}).map(function(s){return s.boxIndex}),o=[],i=function(){var s=a.pop();o.push(s);for(var u=a,c=[],l=0;l<u.length;l++){var h=u[l],f=r[s],d=r[h];c.push(Ag(f,d,n))}a=a.filter(function(p,m){return c[m]<=e})};a.length>0;)i();return o}function Mr(r,t){return Y(function(){var e=t[0],n=t[1],a=t[2],o=Gt(xr(r.shape.slice(0,3),[1]),e),i=Gt(xr(r.shape.slice(0,3),[1]),n),s=Gt(xr(r.shape.slice(0,3),[1]),a),u=We([o,i,s],3);return Ue(r,u)})}function Fg(r,t){return t===void 0&&(t=!1),Y(function(){var e=r.shape.slice(1),n=e[0],a=e[1];if(n===a)return r;var o=Math.abs(n-a),i=Math.round(o*(t?.5:1)),s=n>a?2:1,u=function(d){var p=r.shape.slice();return p[s]=d,Gt(p,0)},c=u(i),l=o-c.shape[s],h=t&&l?u(l):null,f=[h,r,c].filter(function(d){return!!d}).map(function(d){return d.toFloat()});return We(f,s)})}function vo(r){return 1/(1+Math.exp(-r))}var xi=(function(r){ue(t,r);function t(e,n,a,o,i){return i===void 0&&(i=!1),r.call(this,{x:e,y:n,width:a,height:o},i)||this}return t})(gn),Mg=.5,Pg=.43,Og=.45,xa=(function(){function r(t,e,n){n===void 0&&(n=new Ee(0,0));var a=e.width,o=e.height;this._imgDims=new Jn(a,o),this._shift=n,this._positions=t.map(function(i){return i.mul(new Ee(a,o)).add(n)})}return Object.defineProperty(r.prototype,"shift",{get:function(){return new Ee(this._shift.x,this._shift.y)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageWidth",{get:function(){return this._imgDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageHeight",{get:function(){return this._imgDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"positions",{get:function(){return this._positions},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"relativePositions",{get:function(){var t=this;return this._positions.map(function(e){return e.sub(t._shift).div(new Ee(t.imageWidth,t.imageHeight))})},enumerable:!0,configurable:!0}),r.prototype.forSize=function(t,e){return new this.constructor(this.relativePositions,{width:t,height:e})},r.prototype.shiftBy=function(t,e){return new this.constructor(this.relativePositions,this._imgDims,new Ee(t,e))},r.prototype.shiftByPoint=function(t){return this.shiftBy(t.x,t.y)},r.prototype.align=function(t,e){if(e===void 0&&(e={}),t){var n=t instanceof Yt?t.box.floor():new gn(t);return this.shiftBy(n.x,n.y).align(null,e)}var a=Object.assign({},{useDlibAlignment:!1,minBoxPadding:.2},e),o=a.useDlibAlignment,i=a.minBoxPadding;return o?this.alignDlib():this.alignMinBbox(i)},r.prototype.alignDlib=function(){var t=this.getRefPointsForAlignment(),e=t[0],n=t[1],a=t[2],o=function(h){return a.sub(h).magnitude()},i=(o(e)+o(n))/2,s=Math.floor(i/Og),u=gi(t),c=Math.floor(Math.max(0,u.x-Mg*s)),l=Math.floor(Math.max(0,u.y-Pg*s));return new xi(c,l,Math.min(s,this.imageWidth+c),Math.min(s,this.imageHeight+l))},r.prototype.alignMinBbox=function(t){var e=Tg(this.positions);return e.pad(e.width*t,e.height*t)},r.prototype.getRefPointsForAlignment=function(){throw new Error("getRefPointsForAlignment not implemented by base class")},r})(),Bg=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.getRefPointsForAlignment=function(){var e=this.positions;return[e[0],e[1],gi([e[3],e[4]])]},t})(xa),Lg=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.getJawOutline=function(){return this.positions.slice(0,17)},t.prototype.getLeftEyeBrow=function(){return this.positions.slice(17,22)},t.prototype.getRightEyeBrow=function(){return this.positions.slice(22,27)},t.prototype.getNose=function(){return this.positions.slice(27,36)},t.prototype.getLeftEye=function(){return this.positions.slice(36,42)},t.prototype.getRightEye=function(){return this.positions.slice(42,48)},t.prototype.getMouth=function(){return this.positions.slice(48,68)},t.prototype.getRefPointsForAlignment=function(){return[this.getLeftEye(),this.getRightEye(),this.getMouth()].map(gi)},t})(xa),Ys=(function(){function r(t,e){this._label=t,this._distance=e}return Object.defineProperty(r.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"distance",{get:function(){return this._distance},enumerable:!0,configurable:!0}),r.prototype.toString=function(t){return t===void 0&&(t=!0),""+this.label+(t?" ("+Ng(this.distance)+")":"")},r})(),$s=(function(r){ue(t,r);function t(e,n){var a=r.call(this,e)||this;return a._label=n,a}return t.assertIsValidLabeledBox=function(e,n){if(gn.assertIsValidBox(e,n),!Sn(e.label))throw new Error(n+" - expected property label ("+e.label+") to be a number")},Object.defineProperty(t.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),t})(gn),Kr=(function(){function r(t,e){if(typeof t!="string")throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");if(!Array.isArray(e)||e.some(function(n){return!(n instanceof Float32Array)}))throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");this._label=t,this._descriptors=e}return Object.defineProperty(r.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"descriptors",{get:function(){return this._descriptors},enumerable:!0,configurable:!0}),r.prototype.toJSON=function(){return{label:this.label,descriptors:this.descriptors.map(function(t){return Array.from(t)})}},r.fromJSON=function(t){var e=t.descriptors.map(function(n){return new Float32Array(n)});return new r(t.label,e)},r})();(function(r){ue(t,r);function t(e,n,a,o){var i=r.call(this,e,n)||this;return i._score=a,i._classScore=o,i}return t.assertIsValidPredictedBox=function(e,n){if($s.assertIsValidLabeledBox(e,n),!Xs(e.score)||!Xs(e.classScore))throw new Error(n+" - expected properties score ("+e.score+") and ("+e.classScore+") to be a number between [0, 1]")},Object.defineProperty(t.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),t})($s);function Wg(r){return r.detection instanceof Yt}function yi(r,t){var e={detection:t};return Object.assign({},r,e)}function Wc(){var r=window.fetch||function(){throw new Error("fetch - missing fetch implementation for browser environment")},t=function(){throw new Error("readFile - filesystem not available for browser environment")};return{Canvas:HTMLCanvasElement,CanvasRenderingContext2D,Image:HTMLImageElement,ImageData,Video:HTMLVideoElement,createCanvasElement:function(){return document.createElement("canvas")},createImageElement:function(){return document.createElement("img")},fetch:r,readFile:t}}function jc(r){var t="";if(!r)try{r=require("fs")}catch(n){t=n.toString()}var e=r?function(n){return new Promise(function(a,o){r.readFile(n,function(i,s){return i?o(i):a(s)})})}:function(){throw new Error("readFile - failed to require fs in nodejs environment with error: "+t)};return{readFile:e}}function zc(){var r=global.Canvas||global.HTMLCanvasElement,t=global.Image||global.HTMLImageElement,e=function(){if(r)return new r;throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment")},n=function(){if(t)return new t;throw new Error("createImageElement - missing Image implementation for nodejs environment")},a=global.fetch||function(){throw new Error("fetch - missing fetch implementation for nodejs environment")},o=jc();return Je({Canvas:r||(function(){function i(){}return i})(),CanvasRenderingContext2D:global.CanvasRenderingContext2D||(function(){function i(){}return i})(),Image:t||(function(){function i(){}return i})(),ImageData:global.ImageData||(function(){function i(){}return i})(),Video:global.HTMLVideoElement||(function(){function i(){}return i})(),createCanvasElement:e,createImageElement:n,fetch:a},o)}function Uc(){return typeof window=="object"&&typeof document<"u"&&typeof HTMLImageElement<"u"&&typeof HTMLCanvasElement<"u"&&typeof HTMLVideoElement<"u"&&typeof ImageData<"u"&&typeof CanvasRenderingContext2D<"u"}function Vc(){return typeof global=="object"&&typeof require=="function"&&typeof module<"u"&&typeof process<"u"&&!!process.version}var Le;function jg(){if(!Le)throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");return Le}function Wo(r){Le=r}function bi(){Uc()&&Wo(Wc()),Vc()&&Wo(zc())}function zg(r){if(Le||bi(),!Le)throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");var t=r.Canvas,e=t===void 0?Le.Canvas:t,n=r.Image,a=n===void 0?Le.Image:n;Le.Canvas=e,Le.Image=a,Le.createCanvasElement=r.createCanvasElement||(function(){return new e}),Le.createImageElement=r.createImageElement||(function(){return new a}),Le.ImageData=r.ImageData||Le.ImageData,Le.Video=r.Video||Le.Video,Le.fetch=r.fetch||Le.fetch,Le.readFile=r.readFile||Le.readFile}var tt={getEnv:jg,setEnv:Wo,initialize:bi,createBrowserEnv:Wc,createFileSystem:jc,createNodejsEnv:zc,monkeyPatch:zg,isBrowser:Uc,isNodejs:Vc};bi();function Gc(r){return!tt.isNodejs()&&typeof r=="string"?document.getElementById(r):r}function Dn(r){var t=tt.getEnv(),e=t.Canvas,n=t.CanvasRenderingContext2D;if(r instanceof n)return r;var a=Gc(r);if(!(a instanceof e))throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");var o=a.getContext("2d");if(!o)throw new Error("resolveContext2d - canvas 2d context is null");return o}var Js;(function(r){r.TOP_LEFT="TOP_LEFT",r.TOP_RIGHT="TOP_RIGHT",r.BOTTOM_LEFT="BOTTOM_LEFT",r.BOTTOM_RIGHT="BOTTOM_RIGHT"})(Js||(Js={}));function Hc(r){var t=tt.getEnv(),e=t.Image,n=t.Video;return r instanceof e&&r.complete||r instanceof n&&r.readyState>=3}function Ug(r){return new Promise(function(t,e){if(r instanceof tt.getEnv().Canvas||Hc(r))return t();function n(o){o.currentTarget&&(o.currentTarget.removeEventListener("load",n),o.currentTarget.removeEventListener("error",a),t(o))}function a(o){o.currentTarget&&(o.currentTarget.removeEventListener("load",n),o.currentTarget.removeEventListener("error",a),e(o))}r.addEventListener("load",n),r.addEventListener("error",a)})}function qc(r){var t=tt.getEnv(),e=t.Image,n=t.Video;return r instanceof e?new Jn(r.naturalWidth,r.naturalHeight):r instanceof n?new Jn(r.videoWidth,r.videoHeight):new Jn(r.width,r.height)}function Ma(r){var t=r.width,e=r.height,n=tt.getEnv().createCanvasElement,a=n();return a.width=t,a.height=e,a}function wi(r,t){var e=tt.getEnv().ImageData;if(!(r instanceof e)&&!Hc(r))throw new Error("createCanvasFromMedia - media has not finished loading yet");var n=qc(r),a=n.width,o=n.height,i=Ma({width:a,height:o});return r instanceof e?Dn(i).putImageData(r,0,0):Dn(i).drawImage(r,0,0,a,o),i}function Vg(r,t){return te(this,void 0,void 0,function(){var e,n,a,o,i,s;return ne(this,function(u){switch(u.label){case 0:return e=tt.getEnv().createCanvasElement(),n=r.shape.slice(vn(r)?1:0),a=n[0],o=n[1],i=n[2],s=Y(function(){return r.as3D(a,o,i).toInt()}),[4,mi.toPixels(s,e)];case 1:return u.sent(),s.dispose(),[2,e]}})})}function Qs(r){var t=tt.getEnv(),e=t.Image,n=t.Canvas,a=t.Video;return r instanceof e||r instanceof n||r instanceof a}function Gg(r,t,e){e===void 0&&(e=!1);var n=tt.getEnv(),a=n.Image,o=n.Canvas;if(!(r instanceof a||r instanceof o))throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");var i=qc(r),s=t/Math.max(i.height,i.width),u=s*i.width,c=s*i.height,l=Ma({width:t,height:t}),h=r instanceof o?r:wi(r),f=Math.abs(u-c)/2,d=e&&u<c?f:0,p=e&&c<u?f:0;return Dn(l).drawImage(h,d,p,u,c),l}var ya=(function(){function r(t,e){var n=this;if(e===void 0&&(e=!1),this._imageTensors=[],this._canvases=[],this._treatAsBatchInput=!1,this._inputDimensions=[],!Array.isArray(t))throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have "+t);this._treatAsBatchInput=e,this._batchSize=t.length,t.forEach(function(a,o){if(Ta(a)){n._imageTensors[o]=a,n._inputDimensions[o]=a.shape;return}if(vn(a)){var i=a.shape[0];if(i!==1)throw new Error("NetInput - tf.Tensor4D with batchSize "+i+" passed, but not supported in input array");n._imageTensors[o]=a,n._inputDimensions[o]=a.shape.slice(1);return}var s=a instanceof tt.getEnv().Canvas?a:wi(a);n._canvases[o]=s,n._inputDimensions[o]=[s.height,s.width,3]})}return Object.defineProperty(r.prototype,"imageTensors",{get:function(){return this._imageTensors},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canvases",{get:function(){return this._canvases},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isBatchInput",{get:function(){return this.batchSize>1||this._treatAsBatchInput},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"batchSize",{get:function(){return this._batchSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputDimensions",{get:function(){return this._inputDimensions},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"reshapedInputDimensions",{get:function(){var t=this;return Er(this.batchSize,0,1).map(function(e,n){return t.getReshapedInputDimensions(n)})},enumerable:!0,configurable:!0}),r.prototype.getInput=function(t){return this.canvases[t]||this.imageTensors[t]},r.prototype.getInputDimensions=function(t){return this._inputDimensions[t]},r.prototype.getInputHeight=function(t){return this._inputDimensions[t][0]},r.prototype.getInputWidth=function(t){return this._inputDimensions[t][1]},r.prototype.getReshapedInputDimensions=function(t){if(typeof this.inputSize!="number")throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");var e=this.getInputWidth(t),n=this.getInputHeight(t);return Dg({width:e,height:n},this.inputSize)},r.prototype.toBatchTensor=function(t,e){var n=this;return e===void 0&&(e=!0),this._inputSize=t,Y(function(){var a=Er(n.batchSize,0,1).map(function(i){var s=n.getInput(i);if(s instanceof Te){var u=vn(s)?s:s.expandDims();return u=Fg(u,e),(u.shape[1]!==t||u.shape[2]!==t)&&(u=li.resizeBilinear(u,[t,t])),u.as3D(t,t,3)}if(s instanceof tt.getEnv().Canvas)return mi.fromPixels(Gg(s,t,e));throw new Error("toBatchTensor - at batchIdx "+i+", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have "+s)}),o=yt(a.map(function(i){return i.toFloat()})).as4D(n.batchSize,t,t,3);return o})},r})();function qe(r){return te(this,void 0,void 0,function(){var t,e,n;return ne(this,function(a){switch(a.label){case 0:if(r instanceof ya)return[2,r];if(t=Array.isArray(r)?r:[r],!t.length)throw new Error("toNetInput - empty array passed as input");return e=function(o){return Array.isArray(r)?" at input index "+o+":":""},n=t.map(Gc),n.forEach(function(o,i){if(!Qs(o)&&!Ta(o)&&!vn(o))throw typeof t[i]=="string"?new Error("toNetInput -"+e(i)+" string passed, but could not resolve HTMLElement for element id "+t[i]):new Error("toNetInput -"+e(i)+" expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id");if(vn(o)){var s=o.shape[0];if(s!==1)throw new Error("toNetInput -"+e(i)+" tf.Tensor4D with batchSize "+s+" passed, but not supported in input array")}}),[4,Promise.all(n.map(function(o){return Qs(o)&&Ug(o)}))];case 1:return a.sent(),[2,new ya(n,Array.isArray(r))]}})})}function Ci(r,t){return te(this,void 0,void 0,function(){var e,n,a,o,i,s,u;return ne(this,function(c){switch(c.label){case 0:return e=tt.getEnv().Canvas,n=r,r instanceof e?[3,5]:[4,qe(r)];case 1:if(a=c.sent(),a.batchSize>1)throw new Error("extractFaces - batchSize > 1 not supported");return o=a.getInput(0),o instanceof e?(i=o,[3,4]):[3,2];case 2:return[4,Vg(o)];case 3:i=c.sent(),c.label=4;case 4:n=i,c.label=5;case 5:return s=Dn(n),u=t.map(function(l){return l instanceof Yt?l.forSize(n.width,n.height).box.floor():l}).map(function(l){return l.clipAtImageBorders(n.width,n.height)}),[2,u.map(function(l){var h=l.x,f=l.y,d=l.width,p=l.height,m=Ma({width:d,height:p});return Dn(m).putImageData(s.getImageData(h,f,d,p),0,0),m})]}})})}function _i(r,t){return te(this,void 0,void 0,function(){return ne(this,function(e){if(!Ta(r)&&!vn(r))throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");if(vn(r)&&r.shape[0]>1)throw new Error("extractFaceTensors - batchSize > 1 not supported");return[2,Y(function(){var n=r.shape.slice(vn(r)?1:0),a=n[0],o=n[1],i=n[2],s=t.map(function(c){return c instanceof Yt?c.forSize(o,a).box:c}).map(function(c){return c.clipAtImageBorders(o,a)}),u=s.map(function(c){var l=c.x,h=c.y,f=c.width,d=c.height;return yc(r.as3D(a,o,i),[h,l,0],[d,f,i])});return u})]})})}function Hg(r,t){return te(this,void 0,void 0,function(){var e,n;return ne(this,function(a){switch(a.label){case 0:return e=tt.getEnv().fetch,[4,e(r,t)];case 1:if(n=a.sent(),!(n.status<400))throw new Error("failed to fetch: ("+n.status+") "+n.statusText+", from url: "+n.url);return[2,n]}})})}function qg(r){return te(this,void 0,void 0,function(){return ne(this,function(t){switch(t.label){case 0:return[4,Hg(r)];case 1:return[2,t.sent().json()]}})})}function Kc(r,t){var e=t+"-weights_manifest.json";if(!r)return{modelBaseUri:"",manifestUri:e};if(r==="/")return{modelBaseUri:"/",manifestUri:"/"+e};var n=r.startsWith("http://")?"http://":r.startsWith("https://")?"https://":"";r=r.replace(n,"");var a=r.split("/").filter(function(s){return s}),o=r.endsWith(".json")?a[a.length-1]:e,i=n+(r.endsWith(".json")?a.slice(0,a.length-1):a).join("/");return i=r.startsWith("/")?"/"+i:i,{modelBaseUri:i,manifestUri:i==="/"?"/"+o:i+"/"+o}}function Kg(r,t){return te(this,void 0,void 0,function(){var e,n,a,o;return ne(this,function(i){switch(i.label){case 0:return e=Kc(r,t),n=e.manifestUri,a=e.modelBaseUri,[4,qg(n)];case 1:return o=i.sent(),[2,Oc.loadWeights(o,a)]}})})}var an=(function(){function r(t){this._name=t,this._params=void 0,this._paramMappings=[]}return Object.defineProperty(r.prototype,"params",{get:function(){return this._params},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"paramMappings",{get:function(){return this._paramMappings},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isLoaded",{get:function(){return!!this.params},enumerable:!0,configurable:!0}),r.prototype.getParamFromPath=function(t){var e=this.traversePropertyPath(t),n=e.obj,a=e.objProp;return n[a]},r.prototype.reassignParamFromPath=function(t,e){var n=this.traversePropertyPath(t),a=n.obj,o=n.objProp;a[o].dispose(),a[o]=e},r.prototype.getParamList=function(){var t=this;return this._paramMappings.map(function(e){var n=e.paramPath;return{path:n,tensor:t.getParamFromPath(n)}})},r.prototype.getTrainableParams=function(){return this.getParamList().filter(function(t){return t.tensor instanceof er})},r.prototype.getFrozenParams=function(){return this.getParamList().filter(function(t){return!(t.tensor instanceof er)})},r.prototype.variable=function(){var t=this;this.getFrozenParams().forEach(function(e){var n=e.path,a=e.tensor;t.reassignParamFromPath(n,a.variable())})},r.prototype.freeze=function(){var t=this;this.getTrainableParams().forEach(function(e){var n=e.path,a=e.tensor,o=Ye(a.dataSync());a.dispose(),t.reassignParamFromPath(n,o)})},r.prototype.dispose=function(t){t===void 0&&(t=!0),this.getParamList().forEach(function(e){if(t&&e.tensor.isDisposed)throw new Error("param tensor has already been disposed for path "+e.path);e.tensor.dispose()}),this._params=void 0},r.prototype.serializeParams=function(){return new Float32Array(this.getParamList().map(function(t){var e=t.tensor;return Array.from(e.dataSync())}).reduce(function(t,e){return t.concat(e)}))},r.prototype.load=function(t){return te(this,void 0,void 0,function(){return ne(this,function(e){switch(e.label){case 0:return t instanceof Float32Array?(this.extractWeights(t),[2]):[4,this.loadFromUri(t)];case 1:return e.sent(),[2]}})})},r.prototype.loadFromUri=function(t){return te(this,void 0,void 0,function(){var e;return ne(this,function(n){switch(n.label){case 0:if(t&&typeof t!="string")throw new Error(this._name+".loadFromUri - expected model uri");return[4,Kg(t,this.getDefaultModelName())];case 1:return e=n.sent(),this.loadFromWeightMap(e),[2]}})})},r.prototype.loadFromDisk=function(t){return te(this,void 0,void 0,function(){var e,n,a,o,i,s,u,c,l,h;return ne(this,function(f){switch(f.label){case 0:if(t&&typeof t!="string")throw new Error(this._name+".loadFromDisk - expected model file path");return e=tt.getEnv().readFile,n=Kc(t,this.getDefaultModelName()),a=n.manifestUri,o=n.modelBaseUri,i=function(d){return Promise.all(d.map(function(p){return e(p).then(function(m){return m.buffer})}))},s=Oc.weightsLoaderFactory(i),l=(c=JSON).parse,[4,e(a)];case 1:return u=l.apply(c,[f.sent().toString()]),[4,s(u,o)];case 2:return h=f.sent(),this.loadFromWeightMap(h),[2]}})})},r.prototype.loadFromWeightMap=function(t){var e=this.extractParamsFromWeigthMap(t),n=e.paramMappings,a=e.params;this._paramMappings=n,this._params=a},r.prototype.extractWeights=function(t){var e=this.extractParams(t),n=e.paramMappings,a=e.params;this._paramMappings=n,this._params=a},r.prototype.traversePropertyPath=function(t){if(!this.params)throw new Error("traversePropertyPath - model has no loaded params");var e=t.split("/").reduce(function(o,i){if(!o.nextObj.hasOwnProperty(i))throw new Error("traversePropertyPath - object does not have property "+i+", for path "+t);return{obj:o.nextObj,objProp:i,nextObj:o.nextObj[i]}},{nextObj:this.params}),n=e.obj,a=e.objProp;if(!n||!a||!(n[a]instanceof Te))throw new Error("traversePropertyPath - parameter is not a tensor, for path "+t);return{obj:n,objProp:a}},r})();function xt(r,t,e){return Y(function(){var n=oi(r,t.depthwise_filter,t.pointwise_filter,e,"same");return n=me(n,t.bias),n})}function mo(r,t,e){return e===void 0&&(e=!1),Y(function(){var n=Fe(e?me(St(r,t.conv0.filters,[2,2],"same"),t.conv0.bias):xt(r,t.conv0,[2,2])),a=xt(n,t.conv1,[1,1]),o=Fe(me(n,a)),i=xt(o,t.conv2,[1,1]);return Fe(me(n,me(a,i)))})}function Xr(r,t,e,n){return e===void 0&&(e=!1),n===void 0&&(n=!0),Y(function(){var a=Fe(e?me(St(r,t.conv0.filters,n?[2,2]:[1,1],"same"),t.conv0.bias):xt(r,t.conv0,n?[2,2]:[1,1])),o=xt(a,t.conv1,[1,1]),i=Fe(me(a,o)),s=xt(i,t.conv2,[1,1]),u=Fe(me(a,me(o,s))),c=xt(u,t.conv3,[1,1]);return Fe(me(a,me(o,me(s,c))))})}function Ft(r,t,e,n){return e===void 0&&(e="same"),n===void 0&&(n=!1),Y(function(){var a=me(St(r,t.filters,[1,1],e),t.bias);return n?Fe(a):a})}function on(r,t){Object.keys(r).forEach(function(e){t.some(function(n){return n.originalPath===e})||r[e].dispose()})}function Pa(r,t){return function(e,n,a,o){var i=ut(r(e*n*a*a),[a,a,e,n]),s=Be(r(n));return t.push({paramPath:o+"/filters"},{paramPath:o+"/bias"}),{filters:i,bias:s}}}function Ei(r,t){return function(e,n,a){var o=dn(r(e*n),[e,n]),i=Be(r(n));return t.push({paramPath:a+"/weights"},{paramPath:a+"/bias"}),{weights:o,bias:i}}}var Xc=(function(){function r(t,e,n){this.depthwise_filter=t,this.pointwise_filter=e,this.bias=n}return r})();function ki(r,t){return function(e,n,a){var o=ut(r(9*e),[3,3,e,1]),i=ut(r(e*n),[1,1,e,n]),s=Be(r(n));return t.push({paramPath:a+"/depthwise_filter"},{paramPath:a+"/pointwise_filter"},{paramPath:a+"/bias"}),new Xc(o,i,s)}}function Ii(r){return function(t){var e=r(t+"/depthwise_filter",4),n=r(t+"/pointwise_filter",4),a=r(t+"/bias",1);return new Xc(e,n,a)}}function bn(r,t){return function(e,n,a){var o=r[e];if(!Aa(o,n))throw new Error("expected weightMap["+e+"] to be a Tensor"+n+"D, instead have "+o);return t.push({originalPath:e,paramPath:a||e}),o}}function sn(r){var t=r;function e(a){var o=t.slice(0,a);return t=t.slice(a),o}function n(){return t}return{extractWeights:e,getRemainingWeights:n}}function Yc(r,t){var e=Pa(r,t),n=ki(r,t);function a(i,s,u,c){c===void 0&&(c=!1);var l=c?e(i,s,3,u+"/conv0"):n(i,s,u+"/conv0"),h=n(s,s,u+"/conv1"),f=n(s,s,u+"/conv2");return{conv0:l,conv1:h,conv2:f}}function o(i,s,u,c){c===void 0&&(c=!1);var l=a(i,s,u,c),h=l.conv0,f=l.conv1,d=l.conv2,p=n(s,s,u+"/conv3");return{conv0:h,conv1:f,conv2:d,conv3:p}}return{extractDenseBlock3Params:a,extractDenseBlock4Params:o}}function Xg(r){var t=[],e=sn(r),n=e.extractWeights,a=e.getRemainingWeights,o=Yc(n,t).extractDenseBlock4Params,i=o(3,32,"dense0",!0),s=o(32,64,"dense1"),u=o(64,128,"dense2"),c=o(128,256,"dense3");if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{dense0:i,dense1:s,dense2:u,dense3:c}}}function $c(r){return function(t){var e=r(t+"/filters",4),n=r(t+"/bias",1);return{filters:e,bias:n}}}function Jc(r,t){var e=bn(r,t),n=$c(e),a=Ii(e);function o(s,u){u===void 0&&(u=!1);var c=u?n(s+"/conv0"):a(s+"/conv0"),l=a(s+"/conv1"),h=a(s+"/conv2");return{conv0:c,conv1:l,conv2:h}}function i(s,u){u===void 0&&(u=!1);var c=u?n(s+"/conv0"):a(s+"/conv0"),l=a(s+"/conv1"),h=a(s+"/conv2"),f=a(s+"/conv3");return{conv0:c,conv1:l,conv2:h,conv3:f}}return{extractDenseBlock3Params:o,extractDenseBlock4Params:i}}function Yg(r){var t=[],e=Jc(r,t).extractDenseBlock4Params,n={dense0:e("dense0",!0),dense1:e("dense1"),dense2:e("dense2"),dense3:e("dense3")};return on(r,t),{params:n,paramMappings:t}}var Qc=(function(r){ue(t,r);function t(){return r.call(this,"FaceFeatureExtractor")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("FaceFeatureExtractor - load model before inference");return Y(function(){var a=e.toBatchTensor(112,!0),o=[122.782,117.001,104.298],i=Mr(a,o).div(K(255)),s=Xr(i,n.dense0,!0);return s=Xr(s,n.dense1),s=Xr(s,n.dense2),s=Xr(s,n.dense3),s=Tr(s,[7,7],[2,2],"valid"),s})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"face_feature_extractor_model"},t.prototype.extractParamsFromWeigthMap=function(e){return Yg(e)},t.prototype.extractParams=function(e){return Xg(e)},t})(an);function zt(r,t){return Y(function(){return me(Sa(r,t.weights),t.bias)})}function $g(r,t,e){var n=[],a=sn(r),o=a.extractWeights,i=a.getRemainingWeights,s=Ei(o,n),u=s(t,e,"fc");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{fc:u}}}function Jg(r){var t=[],e=bn(r,t);function n(o){var i=e(o+"/weights",2),s=e(o+"/bias",1);return{weights:i,bias:s}}var a={fc:n("fc")};return on(r,t),{params:a,paramMappings:t}}function Zc(r){var t={},e={};return Object.keys(r).forEach(function(n){var a=n.startsWith("fc")?e:t;a[n]=r[n]}),{featureExtractorMap:t,classifierMap:e}}var el=(function(r){ue(t,r);function t(e,n){var a=r.call(this,e)||this;return a._faceFeatureExtractor=n,a}return Object.defineProperty(t.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),t.prototype.runNet=function(e){var n=this,a=this.params;if(!a)throw new Error(this._name+" - load model before inference");return Y(function(){var o=e instanceof ya?n.faceFeatureExtractor.forwardInput(e):e;return zt(o.as2D(o.shape[0],-1),a.fc)})},t.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),r.prototype.dispose.call(this,e)},t.prototype.loadClassifierParams=function(e){var n=this.extractClassifierParams(e),a=n.params,o=n.paramMappings;this._params=a,this._paramMappings=o},t.prototype.extractClassifierParams=function(e){return $g(e,this.getClassifierChannelsIn(),this.getClassifierChannelsOut())},t.prototype.extractParamsFromWeigthMap=function(e){var n=Zc(e),a=n.featureExtractorMap,o=n.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(a),Jg(o)},t.prototype.extractParams=function(e){var n=this.getClassifierChannelsIn(),a=this.getClassifierChannelsOut(),o=a*n+a,i=e.slice(0,e.length-o),s=e.slice(e.length-o);return this.faceFeatureExtractor.extractWeights(i),this.extractClassifierParams(s)},t})(an),Zs=["neutral","happy","sad","angry","fearful","disgusted","surprised"],Qg=(function(){function r(t){var e=this;if(t.length!==7)throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: "+t.length);Zs.forEach(function(n,a){e[n]=t[a]})}return r.prototype.asSortedArray=function(){var t=this;return Zs.map(function(e){return{expression:e,probability:t[e]}}).sort(function(e,n){return n.probability-e.probability})},r})(),Zg=(function(r){ue(t,r);function t(e){return e===void 0&&(e=new Qc),r.call(this,"FaceExpressionNet",e)||this}return t.prototype.forwardInput=function(e){var n=this;return Y(function(){return nn(n.runNet(e))})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.predictExpressions=function(e){return te(this,void 0,void 0,function(){var n,a,o,i,s=this;return ne(this,function(u){switch(u.label){case 0:return[4,qe(e)];case 1:return n=u.sent(),[4,this.forwardInput(n)];case 2:return a=u.sent(),[4,Promise.all(je(a).map(function(c){return te(s,void 0,void 0,function(){var l;return ne(this,function(h){switch(h.label){case 0:return[4,c.data()];case 1:return l=h.sent(),c.dispose(),[2,l]}})})}))];case 3:return o=u.sent(),a.dispose(),i=o.map(function(c){return new Qg(c)}),[2,n.isBatchInput?i:i[0]]}})})},t.prototype.getDefaultModelName=function(){return"face_expression_model"},t.prototype.getClassifierChannelsIn=function(){return 256},t.prototype.getClassifierChannelsOut=function(){return 7},t})(el);function tl(r,t){var e={expressions:t};return Object.assign({},r,e)}function e0(r){return Wg(r)&&r.landmarks instanceof xa&&r.unshiftedLandmarks instanceof xa&&r.alignedRect instanceof Yt}function Ri(r,t){var e=r.detection.box,n=t.shiftBy(e.x,e.y),a=n.align(),o=r.detection.imageDims,i=new Yt(r.detection.score,a.rescale(o.reverse()),o),s={landmarks:n,unshiftedLandmarks:t,alignedRect:i};return Object.assign({},r,s)}function t0(r,t){var e=Pa(r,t),n=ki(r,t);function a(i,s,u){var c=n(i,s,u+"/separable_conv0"),l=n(s,s,u+"/separable_conv1"),h=e(i,s,1,u+"/expansion_conv");return{separable_conv0:c,separable_conv1:l,expansion_conv:h}}function o(i,s){var u=n(i,i,s+"/separable_conv0"),c=n(i,i,s+"/separable_conv1"),l=n(i,i,s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:e,extractSeparableConvParams:n,extractReductionBlockParams:a,extractMainBlockParams:o}}function n0(r,t){var e=[],n=sn(r),a=n.extractWeights,o=n.getRemainingWeights,i=t0(a,e),s=i.extractConvParams,u=i.extractSeparableConvParams,c=i.extractReductionBlockParams,l=i.extractMainBlockParams,h=s(3,32,3,"entry_flow/conv_in"),f=c(32,64,"entry_flow/reduction_block_0"),d=c(64,128,"entry_flow/reduction_block_1"),p={conv_in:h,reduction_block_0:f,reduction_block_1:d},m={};Er(t,0,1).forEach(function(b){m["main_block_"+b]=l(128,"middle_flow/main_block_"+b)});var v=c(128,256,"exit_flow/reduction_block"),g=u(256,512,"exit_flow/separable_conv"),y={reduction_block:v,separable_conv:g};if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:e,params:{entry_flow:p,middle_flow:m,exit_flow:y}}}function r0(r,t){var e=bn(r,t),n=$c(e),a=Ii(e);function o(s){var u=a(s+"/separable_conv0"),c=a(s+"/separable_conv1"),l=n(s+"/expansion_conv");return{separable_conv0:u,separable_conv1:c,expansion_conv:l}}function i(s){var u=a(s+"/separable_conv0"),c=a(s+"/separable_conv1"),l=a(s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:n,extractSeparableConvParams:a,extractReductionBlockParams:o,extractMainBlockParams:i}}function a0(r,t){var e=[],n=r0(r,e),a=n.extractConvParams,o=n.extractSeparableConvParams,i=n.extractReductionBlockParams,s=n.extractMainBlockParams,u=a("entry_flow/conv_in"),c=i("entry_flow/reduction_block_0"),l=i("entry_flow/reduction_block_1"),h={conv_in:u,reduction_block_0:c,reduction_block_1:l},f={};Er(t,0,1).forEach(function(v){f["main_block_"+v]=s("middle_flow/main_block_"+v)});var d=i("exit_flow/reduction_block"),p=o("exit_flow/separable_conv"),m={reduction_block:d,separable_conv:p};return on(r,e),{params:{entry_flow:h,middle_flow:f,exit_flow:m},paramMappings:e}}function nl(r,t,e){return me(St(r,t.filters,e,"same"),t.bias)}function go(r,t,e){e===void 0&&(e=!0);var n=e?Fe(r):r;return n=xt(n,t.separable_conv0,[1,1]),n=xt(Fe(n),t.separable_conv1,[1,1]),n=Ge(n,[3,3],[2,2],"same"),n=me(n,nl(r,t.expansion_conv,[2,2])),n}function o0(r,t){var e=xt(Fe(r),t.separable_conv0,[1,1]);return e=xt(Fe(e),t.separable_conv1,[1,1]),e=xt(Fe(e),t.separable_conv2,[1,1]),e=me(e,r),e}var i0=(function(r){ue(t,r);function t(e){var n=r.call(this,"TinyXception")||this;return n._numMainBlocks=e,n}return t.prototype.forwardInput=function(e){var n=this,a=this.params;if(!a)throw new Error("TinyXception - load model before inference");return Y(function(){var o=e.toBatchTensor(112,!0),i=[122.782,117.001,104.298],s=Mr(o,i).div(K(256)),u=Fe(nl(s,a.entry_flow.conv_in,[2,2]));return u=go(u,a.entry_flow.reduction_block_0,!1),u=go(u,a.entry_flow.reduction_block_1),Er(n._numMainBlocks,0,1).forEach(function(c){u=o0(u,a.middle_flow["main_block_"+c])}),u=go(u,a.exit_flow.reduction_block),u=Fe(xt(u,a.exit_flow.separable_conv,[1,1])),u})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"tiny_xception_model"},t.prototype.extractParamsFromWeigthMap=function(e){return a0(e,this._numMainBlocks)},t.prototype.extractParams=function(e){return n0(e,this._numMainBlocks)},t})(an);function s0(r){var t=[],e=sn(r),n=e.extractWeights,a=e.getRemainingWeights,o=Ei(n,t),i=o(512,1,"fc/age"),s=o(512,2,"fc/gender");if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{fc:{age:i,gender:s}}}}function u0(r){var t=[],e=bn(r,t);function n(o){var i=e(o+"/weights",2),s=e(o+"/bias",1);return{weights:i,bias:s}}var a={fc:{age:n("fc/age"),gender:n("fc/gender")}};return on(r,t),{params:a,paramMappings:t}}var ba;(function(r){r.FEMALE="female",r.MALE="male"})(ba||(ba={}));var c0=(function(r){ue(t,r);function t(e){e===void 0&&(e=new i0(2));var n=r.call(this,"AgeGenderNet")||this;return n._faceFeatureExtractor=e,n}return Object.defineProperty(t.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),t.prototype.runNet=function(e){var n=this,a=this.params;if(!a)throw new Error(this._name+" - load model before inference");return Y(function(){var o=e instanceof ya?n.faceFeatureExtractor.forwardInput(e):e,i=Tr(o,[7,7],[2,2],"valid").as2D(o.shape[0],-1),s=zt(i,a.fc.age).as1D(),u=zt(i,a.fc.gender);return{age:s,gender:u}})},t.prototype.forwardInput=function(e){var n=this;return Y(function(){var a=n.runNet(e),o=a.age,i=a.gender;return{age:o,gender:nn(i)}})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.predictAgeAndGender=function(e){return te(this,void 0,void 0,function(){var n,a,o,i,s,u,c=this;return ne(this,function(l){switch(l.label){case 0:return[4,qe(e)];case 1:return n=l.sent(),[4,this.forwardInput(n)];case 2:return a=l.sent(),o=je(a.age),i=je(a.gender),s=o.map(function(h,f){return{ageTensor:h,genderTensor:i[f]}}),[4,Promise.all(s.map(function(h){var f=h.ageTensor,d=h.genderTensor;return te(c,void 0,void 0,function(){var p,m,v,g,y;return ne(this,function(b){switch(b.label){case 0:return[4,f.data()];case 1:return p=b.sent()[0],[4,d.data()];case 2:return m=b.sent()[0],v=m>.5,g=v?ba.MALE:ba.FEMALE,y=v?m:1-m,f.dispose(),d.dispose(),[2,{age:p,gender:g,genderProbability:y}]}})})}))];case 3:return u=l.sent(),a.age.dispose(),a.gender.dispose(),[2,n.isBatchInput?u:u[0]]}})})},t.prototype.getDefaultModelName=function(){return"age_gender_model"},t.prototype.dispose=function(e){e===void 0&&(e=!0),this.faceFeatureExtractor.dispose(e),r.prototype.dispose.call(this,e)},t.prototype.loadClassifierParams=function(e){var n=this.extractClassifierParams(e),a=n.params,o=n.paramMappings;this._params=a,this._paramMappings=o},t.prototype.extractClassifierParams=function(e){return s0(e)},t.prototype.extractParamsFromWeigthMap=function(e){var n=Zc(e),a=n.featureExtractorMap,o=n.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(a),u0(o)},t.prototype.extractParams=function(e){var n=1539,a=e.slice(0,e.length-n),o=e.slice(e.length-n);return this.faceFeatureExtractor.extractWeights(a),this.extractClassifierParams(o)},t})(an),rl=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.postProcess=function(e,n,a){var o=a.map(function(s){var u=s.width,c=s.height,l=n/Math.max(c,u);return{width:u*l,height:c*l}}),i=o.length;return Y(function(){var s=function(f,d){return yt([Gt([68],f),Gt([68],d)],1).as2D(1,136).as1D()},u=function(f,d){var p=o[f],m=p.width,v=p.height;return d(m,v)?Math.abs(m-v)/2:0},c=function(f){return u(f,function(d,p){return d<p})},l=function(f){return u(f,function(d,p){return p<d})},h=e.mul(Gt([i,136],n)).sub(yt(Array.from(Array(i),function(f,d){return s(c(d),l(d))}))).div(yt(Array.from(Array(i),function(f,d){return s(o[d].width,o[d].height)})));return h})},t.prototype.forwardInput=function(e){var n=this;return Y(function(){var a=n.runNet(e);return n.postProcess(a,e.inputSize,e.inputDimensions.map(function(o){var i=o[0],s=o[1];return{height:i,width:s}}))})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.detectLandmarks=function(e){return te(this,void 0,void 0,function(){var n,a,o,i=this;return ne(this,function(s){switch(s.label){case 0:return[4,qe(e)];case 1:return n=s.sent(),a=Y(function(){return je(i.forwardInput(n))}),[4,Promise.all(a.map(function(u,c){return te(i,void 0,void 0,function(){var l,h,f,d,p;return ne(this,function(m){switch(m.label){case 0:return f=(h=Array).from,[4,u.data()];case 1:return l=f.apply(h,[m.sent()]),d=l.filter(function(v,g){return qs(g)}),p=l.filter(function(v,g){return!qs(g)}),[2,new Lg(Array(68).fill(0).map(function(v,g){return new Ee(d[g],p[g])}),{height:n.getInputHeight(c),width:n.getInputWidth(c)})]}})})}))];case 2:return o=s.sent(),a.forEach(function(u){return u.dispose()}),[2,n.isBatchInput?o:o[0]]}})})},t.prototype.getClassifierChannelsOut=function(){return 136},t})(el),al=(function(r){ue(t,r);function t(e){return e===void 0&&(e=new Qc),r.call(this,"FaceLandmark68Net",e)||this}return t.prototype.getDefaultModelName=function(){return"face_landmark_68_model"},t.prototype.getClassifierChannelsIn=function(){return 256},t})(rl);function l0(r){var t=[],e=Jc(r,t).extractDenseBlock3Params,n={dense0:e("dense0",!0),dense1:e("dense1"),dense2:e("dense2")};return on(r,t),{params:n,paramMappings:t}}function h0(r){var t=[],e=sn(r),n=e.extractWeights,a=e.getRemainingWeights,o=Yc(n,t).extractDenseBlock3Params,i=o(3,32,"dense0",!0),s=o(32,64,"dense1"),u=o(64,128,"dense2");if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{dense0:i,dense1:s,dense2:u}}}var f0=(function(r){ue(t,r);function t(){return r.call(this,"TinyFaceFeatureExtractor")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("TinyFaceFeatureExtractor - load model before inference");return Y(function(){var a=e.toBatchTensor(112,!0),o=[122.782,117.001,104.298],i=Mr(a,o).div(K(255)),s=mo(i,n.dense0,!0);return s=mo(s,n.dense1),s=mo(s,n.dense2),s=Tr(s,[14,14],[2,2],"valid"),s})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.getDefaultModelName=function(){return"face_feature_extractor_tiny_model"},t.prototype.extractParamsFromWeigthMap=function(e){return l0(e)},t.prototype.extractParams=function(e){return h0(e)},t})(an),d0=(function(r){ue(t,r);function t(e){return e===void 0&&(e=new f0),r.call(this,"FaceLandmark68TinyNet",e)||this}return t.prototype.getDefaultModelName=function(){return"face_landmark_68_tiny_model"},t.prototype.getClassifierChannelsIn=function(){return 128},t})(rl);(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t})(al);function p0(r,t){return me(et(r,t.weights),t.biases)}function Si(r,t,e,n,a){a===void 0&&(a="same");var o=t.conv,i=o.filters,s=o.bias,u=St(r,i,e,a);return u=me(u,s),u=p0(u,t.scale),n?Fe(u):u}function v0(r,t){return Si(r,t,[1,1],!0)}function ol(r,t){return Si(r,t,[1,1],!1)}function il(r,t){return Si(r,t,[2,2],!0,"valid")}function m0(r,t){function e(s,u,c){var l=r(s),h=l.length/(u*c*c);if(Sg(h))throw new Error("depth has to be an integer: "+h+", weights.length: "+l.length+", numFilters: "+u+", filterSize: "+c);return Y(function(){return mn(ut(l,[u,h,c,c]),[2,3,1,0])})}function n(s,u,c,l){var h=e(s,u,c),f=Be(r(u));return t.push({paramPath:l+"/filters"},{paramPath:l+"/bias"}),{filters:h,bias:f}}function a(s,u){var c=Be(r(s)),l=Be(r(s));return t.push({paramPath:u+"/weights"},{paramPath:u+"/biases"}),{weights:c,biases:l}}function o(s,u,c,l){var h=n(s,u,c,l+"/conv"),f=a(u,l+"/scale");return{conv:h,scale:f}}function i(s,u,c,l,h){h===void 0&&(h=!1);var f=o((h?.5:1)*s,u,c,l+"/conv1"),d=o(s,u,c,l+"/conv2");return{conv1:f,conv2:d}}return{extractConvLayerParams:o,extractResidualLayerParams:i}}function g0(r){var t=sn(r),e=t.extractWeights,n=t.getRemainingWeights,a=[],o=m0(e,a),i=o.extractConvLayerParams,s=o.extractResidualLayerParams,u=i(4704,32,7,"conv32_down"),c=s(9216,32,3,"conv32_1"),l=s(9216,32,3,"conv32_2"),h=s(9216,32,3,"conv32_3"),f=s(36864,64,3,"conv64_down",!0),d=s(36864,64,3,"conv64_1"),p=s(36864,64,3,"conv64_2"),m=s(36864,64,3,"conv64_3"),v=s(147456,128,3,"conv128_down",!0),g=s(147456,128,3,"conv128_1"),y=s(147456,128,3,"conv128_2"),b=s(589824,256,3,"conv256_down",!0),x=s(589824,256,3,"conv256_1"),w=s(589824,256,3,"conv256_2"),C=s(589824,256,3,"conv256_down_out"),N=Y(function(){return mn(dn(e(256*128),[128,256]),[1,0])});if(a.push({paramPath:"fc"}),n().length!==0)throw new Error("weights remaing after extract: "+n().length);var I={conv32_down:u,conv32_1:c,conv32_2:l,conv32_3:h,conv64_down:f,conv64_1:d,conv64_2:p,conv64_3:m,conv128_down:v,conv128_1:g,conv128_2:y,conv256_down:b,conv256_1:x,conv256_2:w,conv256_down_out:C,fc:N};return{params:I,paramMappings:a}}function x0(r,t){var e=bn(r,t);function n(i){var s=e(i+"/scale/weights",1),u=e(i+"/scale/biases",1);return{weights:s,biases:u}}function a(i){var s=e(i+"/conv/filters",4),u=e(i+"/conv/bias",1),c=n(i);return{conv:{filters:s,bias:u},scale:c}}function o(i){return{conv1:a(i+"/conv1"),conv2:a(i+"/conv2")}}return{extractConvLayerParams:a,extractResidualLayerParams:o}}function y0(r){var t=[],e=x0(r,t),n=e.extractConvLayerParams,a=e.extractResidualLayerParams,o=n("conv32_down"),i=a("conv32_1"),s=a("conv32_2"),u=a("conv32_3"),c=a("conv64_down"),l=a("conv64_1"),h=a("conv64_2"),f=a("conv64_3"),d=a("conv128_down"),p=a("conv128_1"),m=a("conv128_2"),v=a("conv256_down"),g=a("conv256_1"),y=a("conv256_2"),b=a("conv256_down_out"),x=r.fc;if(t.push({originalPath:"fc",paramPath:"fc"}),!Rg(x))throw new Error("expected weightMap[fc] to be a Tensor2D, instead have "+x);var w={conv32_down:o,conv32_1:i,conv32_2:s,conv32_3:u,conv64_down:c,conv64_1:l,conv64_2:h,conv64_3:f,conv128_down:d,conv128_1:p,conv128_2:m,conv256_down:v,conv256_1:g,conv256_2:y,conv256_down_out:b,fc:x};return on(r,t),{params:w,paramMappings:t}}function Ot(r,t){var e=v0(r,t.conv1);return e=ol(e,t.conv2),e=me(e,r),e=Fe(e),e}function Yr(r,t){var e=il(r,t.conv1);e=ol(e,t.conv2);var n=Tr(r,2,2,"valid"),a=Ae(n.shape),o=n.shape[3]!==e.shape[3],i=n.shape[1]!==e.shape[1]||n.shape[2]!==e.shape[2];if(i){var s=xr(e.shape);s[1]=1;var u=Ae(s);e=We([e,u],1);var c=xr(e.shape);c[2]=1;var l=Ae(c);e=We([e,l],2)}return n=o?We([n,a],3):n,e=me(n,e),e=Fe(e),e}var b0=(function(r){ue(t,r);function t(){return r.call(this,"FaceRecognitionNet")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("FaceRecognitionNet - load model before inference");return Y(function(){var a=e.toBatchTensor(150,!0).toFloat(),o=[122.782,117.001,104.298],i=Mr(a,o).div(K(256)),s=il(i,n.conv32_down);s=Ge(s,3,2,"valid"),s=Ot(s,n.conv32_1),s=Ot(s,n.conv32_2),s=Ot(s,n.conv32_3),s=Yr(s,n.conv64_down),s=Ot(s,n.conv64_1),s=Ot(s,n.conv64_2),s=Ot(s,n.conv64_3),s=Yr(s,n.conv128_down),s=Ot(s,n.conv128_1),s=Ot(s,n.conv128_2),s=Yr(s,n.conv256_down),s=Ot(s,n.conv256_1),s=Ot(s,n.conv256_2),s=Yr(s,n.conv256_down_out);var u=s.mean([1,2]),c=Sa(u,n.fc);return c})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.computeFaceDescriptor=function(e){return te(this,void 0,void 0,function(){var n,a,o,i=this;return ne(this,function(s){switch(s.label){case 0:return[4,qe(e)];case 1:return n=s.sent(),a=Y(function(){return je(i.forwardInput(n))}),[4,Promise.all(a.map(function(u){return u.data()}))];case 2:return o=s.sent(),a.forEach(function(u){return u.dispose()}),[2,n.isBatchInput?o:o[0]]}})})},t.prototype.getDefaultModelName=function(){return"face_recognition_model"},t.prototype.extractParamsFromWeigthMap=function(e){return y0(e)},t.prototype.extractParams=function(e){return g0(e)},t})(an);function sl(r,t){var e={descriptor:t};return Object.assign({},r,e)}function ul(r,t){var e={age:t};return Object.assign({},r,e)}function cl(r,t,e){var n={gender:t,genderProbability:e};return Object.assign({},r,n)}var ll=(function(){function r(t){var e=t===void 0?{}:t,n=e.minFaceSize,a=e.scaleFactor,o=e.maxNumScales,i=e.scoreThresholds,s=e.scaleSteps;if(this._name="MtcnnOptions",this._minFaceSize=n||20,this._scaleFactor=a||.709,this._maxNumScales=o||10,this._scoreThresholds=i||[.6,.7,.7],this._scaleSteps=s,typeof this._minFaceSize!="number"||this._minFaceSize<0)throw new Error(this._name+" - expected minFaceSize to be a number > 0");if(typeof this._scaleFactor!="number"||this._scaleFactor<=0||this._scaleFactor>=1)throw new Error(this._name+" - expected scaleFactor to be a number between 0 and 1");if(typeof this._maxNumScales!="number"||this._maxNumScales<0)throw new Error(this._name+" - expected maxNumScales to be a number > 0");if(!Array.isArray(this._scoreThresholds)||this._scoreThresholds.length!==3||this._scoreThresholds.some(function(u){return typeof u!="number"}))throw new Error(this._name+" - expected scoreThresholds to be an array of numbers of length 3");if(this._scaleSteps&&(!Array.isArray(this._scaleSteps)||this._scaleSteps.some(function(u){return typeof u!="number"})))throw new Error(this._name+" - expected scaleSteps to be an array of numbers")}return Object.defineProperty(r.prototype,"minFaceSize",{get:function(){return this._minFaceSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scaleFactor",{get:function(){return this._scaleFactor},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxNumScales",{get:function(){return this._maxNumScales},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scoreThresholds",{get:function(){return this._scoreThresholds},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scaleSteps",{get:function(){return this._scaleSteps},enumerable:!0,configurable:!0}),r})();function w0(r,t){function e(u,c){var l=ut(r(9*u),[3,3,u,1]),h=Be(r(u)),f=Be(r(u)),d=Be(r(u)),p=Be(r(u));return t.push({paramPath:c+"/filters"},{paramPath:c+"/batch_norm_scale"},{paramPath:c+"/batch_norm_offset"},{paramPath:c+"/batch_norm_mean"},{paramPath:c+"/batch_norm_variance"}),{filters:l,batch_norm_scale:h,batch_norm_offset:f,batch_norm_mean:d,batch_norm_variance:p}}function n(u,c,l,h,f){var d=ut(r(u*c*l*l),[l,l,u,c]),p=Be(r(c));return t.push({paramPath:h+"/filters"},{paramPath:h+"/"+(f?"batch_norm_offset":"bias")}),{filters:d,bias:p}}function a(u,c,l,h){var f=n(u,c,l,h,!0),d=f.filters,p=f.bias;return{filters:d,batch_norm_offset:p}}function o(u,c,l){var h=e(u,l+"/depthwise_conv"),f=a(u,c,1,l+"/pointwise_conv");return{depthwise_conv:h,pointwise_conv:f}}function i(){var u=a(3,32,3,"mobilenetv1/conv_0"),c=o(32,64,"mobilenetv1/conv_1"),l=o(64,128,"mobilenetv1/conv_2"),h=o(128,128,"mobilenetv1/conv_3"),f=o(128,256,"mobilenetv1/conv_4"),d=o(256,256,"mobilenetv1/conv_5"),p=o(256,512,"mobilenetv1/conv_6"),m=o(512,512,"mobilenetv1/conv_7"),v=o(512,512,"mobilenetv1/conv_8"),g=o(512,512,"mobilenetv1/conv_9"),y=o(512,512,"mobilenetv1/conv_10"),b=o(512,512,"mobilenetv1/conv_11"),x=o(512,1024,"mobilenetv1/conv_12"),w=o(1024,1024,"mobilenetv1/conv_13");return{conv_0:u,conv_1:c,conv_2:l,conv_3:h,conv_4:f,conv_5:d,conv_6:p,conv_7:m,conv_8:v,conv_9:g,conv_10:y,conv_11:b,conv_12:x,conv_13:w}}function s(){var u=a(1024,256,1,"prediction_layer/conv_0"),c=a(256,512,3,"prediction_layer/conv_1"),l=a(512,128,1,"prediction_layer/conv_2"),h=a(128,256,3,"prediction_layer/conv_3"),f=a(256,128,1,"prediction_layer/conv_4"),d=a(128,256,3,"prediction_layer/conv_5"),p=a(256,64,1,"prediction_layer/conv_6"),m=a(64,128,3,"prediction_layer/conv_7"),v=n(512,12,1,"prediction_layer/box_predictor_0/box_encoding_predictor"),g=n(512,9,1,"prediction_layer/box_predictor_0/class_predictor"),y=n(1024,24,1,"prediction_layer/box_predictor_1/box_encoding_predictor"),b=n(1024,18,1,"prediction_layer/box_predictor_1/class_predictor"),x=n(512,24,1,"prediction_layer/box_predictor_2/box_encoding_predictor"),w=n(512,18,1,"prediction_layer/box_predictor_2/class_predictor"),C=n(256,24,1,"prediction_layer/box_predictor_3/box_encoding_predictor"),N=n(256,18,1,"prediction_layer/box_predictor_3/class_predictor"),I=n(256,24,1,"prediction_layer/box_predictor_4/box_encoding_predictor"),R=n(256,18,1,"prediction_layer/box_predictor_4/class_predictor"),S=n(128,24,1,"prediction_layer/box_predictor_5/box_encoding_predictor"),F=n(128,18,1,"prediction_layer/box_predictor_5/class_predictor"),A={box_encoding_predictor:v,class_predictor:g},W={box_encoding_predictor:y,class_predictor:b},B={box_encoding_predictor:x,class_predictor:w},O={box_encoding_predictor:C,class_predictor:N},U={box_encoding_predictor:I,class_predictor:R},z={box_encoding_predictor:S,class_predictor:F};return{conv_0:u,conv_1:c,conv_2:l,conv_3:h,conv_4:f,conv_5:d,conv_6:p,conv_7:m,box_predictor_0:A,box_predictor_1:W,box_predictor_2:B,box_predictor_3:O,box_predictor_4:U,box_predictor_5:z}}return{extractMobilenetV1Params:i,extractPredictionLayerParams:s}}function C0(r){var t=[],e=sn(r),n=e.extractWeights,a=e.getRemainingWeights,o=w0(n,t),i=o.extractMobilenetV1Params,s=o.extractPredictionLayerParams,u=i(),c=s(),l=Go(n(5118*4),[1,5118,4]),h={extra_dim:l};if(t.push({paramPath:"output_layer/extra_dim"}),a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{params:{mobilenetv1:u,prediction_layer:c,output_layer:h},paramMappings:t}}function _0(r,t){var e=bn(r,t);function n(c,l,h){var f=e(c+"/Conv2d_"+l+"_pointwise/weights",4,h+"/filters"),d=e(c+"/Conv2d_"+l+"_pointwise/convolution_bn_offset",1,h+"/batch_norm_offset");return{filters:f,batch_norm_offset:d}}function a(c){var l="mobilenetv1/conv_"+c,h="MobilenetV1/Conv2d_"+c+"_depthwise",f=l+"/depthwise_conv",d=l+"/pointwise_conv",p=e(h+"/depthwise_weights",4,f+"/filters"),m=e(h+"/BatchNorm/gamma",1,f+"/batch_norm_scale"),v=e(h+"/BatchNorm/beta",1,f+"/batch_norm_offset"),g=e(h+"/BatchNorm/moving_mean",1,f+"/batch_norm_mean"),y=e(h+"/BatchNorm/moving_variance",1,f+"/batch_norm_variance");return{depthwise_conv:{filters:p,batch_norm_scale:m,batch_norm_offset:v,batch_norm_mean:g,batch_norm_variance:y},pointwise_conv:n("MobilenetV1",c,d)}}function o(){return{conv_0:n("MobilenetV1",0,"mobilenetv1/conv_0"),conv_1:a(1),conv_2:a(2),conv_3:a(3),conv_4:a(4),conv_5:a(5),conv_6:a(6),conv_7:a(7),conv_8:a(8),conv_9:a(9),conv_10:a(10),conv_11:a(11),conv_12:a(12),conv_13:a(13)}}function i(c,l){var h=e(c+"/weights",4,l+"/filters"),f=e(c+"/biases",1,l+"/bias");return{filters:h,bias:f}}function s(c){var l=i("Prediction/BoxPredictor_"+c+"/BoxEncodingPredictor","prediction_layer/box_predictor_"+c+"/box_encoding_predictor"),h=i("Prediction/BoxPredictor_"+c+"/ClassPredictor","prediction_layer/box_predictor_"+c+"/class_predictor");return{box_encoding_predictor:l,class_predictor:h}}function u(){return{conv_0:n("Prediction",0,"prediction_layer/conv_0"),conv_1:n("Prediction",1,"prediction_layer/conv_1"),conv_2:n("Prediction",2,"prediction_layer/conv_2"),conv_3:n("Prediction",3,"prediction_layer/conv_3"),conv_4:n("Prediction",4,"prediction_layer/conv_4"),conv_5:n("Prediction",5,"prediction_layer/conv_5"),conv_6:n("Prediction",6,"prediction_layer/conv_6"),conv_7:n("Prediction",7,"prediction_layer/conv_7"),box_predictor_0:s(0),box_predictor_1:s(1),box_predictor_2:s(2),box_predictor_3:s(3),box_predictor_4:s(4),box_predictor_5:s(5)}}return{extractMobilenetV1Params:o,extractPredictionLayerParams:u}}function E0(r){var t=[],e=_0(r,t),n=e.extractMobilenetV1Params,a=e.extractPredictionLayerParams,o=r["Output/extra_dim"];if(t.push({originalPath:"Output/extra_dim",paramPath:"output_layer/extra_dim"}),!Ta(o))throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have "+o);var i={mobilenetv1:n(),prediction_layer:a(),output_layer:{extra_dim:o}};return on(r,t),{params:i,paramMappings:t}}function Bt(r,t,e){return Y(function(){var n=St(r,t.filters,e,"same");return n=me(n,t.batch_norm_offset),ti(n,0,6)})}var k0=.0010000000474974513;function I0(r,t,e){return Y(function(){var n=Ra(r,t.filters,e,"same");return n=ac(n,t.batch_norm_mean,t.batch_norm_variance,t.batch_norm_offset,t.batch_norm_scale,k0),ti(n,0,6)})}function R0(r){return[2,4,6,12].some(function(t){return t===r})?[2,2]:[1,1]}function S0(r,t){return Y(function(){var e=null,n=Bt(r,t.conv_0,[2,2]),a=[t.conv_1,t.conv_2,t.conv_3,t.conv_4,t.conv_5,t.conv_6,t.conv_7,t.conv_8,t.conv_9,t.conv_10,t.conv_11,t.conv_12,t.conv_13];if(a.forEach(function(o,i){var s=i+1,u=R0(s);n=I0(n,o.depthwise_conv,u),n=Bt(n,o.pointwise_conv,[1,1]),s===11&&(e=n)}),e===null)throw new Error("mobileNetV1 - output of conv layer 11 is null");return{out:n,conv11:e}})}function N0(r,t,e,n,a){var o=r.shape[0],i=Math.min(e,o),s=t.map(function(l,h){return{score:l,boxIndex:h}}).filter(function(l){return l.score>a}).sort(function(l,h){return h.score-l.score}),u=function(l){return l<=n?1:0},c=[];return s.forEach(function(l){if(!(c.length>=i)){for(var h=l.score,f=c.length-1;f>=0;--f){var d=D0(r,l.boxIndex,c[f]);if(d!==0&&(l.score*=u(d),l.score<=a))break}h===l.score&&c.push(l.boxIndex)}}),c}function D0(r,t,e){var n=r.arraySync(),a=Math.min(n[t][0],n[t][2]),o=Math.min(n[t][1],n[t][3]),i=Math.max(n[t][0],n[t][2]),s=Math.max(n[t][1],n[t][3]),u=Math.min(n[e][0],n[e][2]),c=Math.min(n[e][1],n[e][3]),l=Math.max(n[e][0],n[e][2]),h=Math.max(n[e][1],n[e][3]),f=(i-a)*(s-o),d=(l-u)*(h-c);if(f<=0||d<=0)return 0;var p=Math.max(a,u),m=Math.max(o,c),v=Math.min(i,l),g=Math.min(s,h),y=Math.max(v-p,0)*Math.max(g-m,0);return y/(f+d-y)}function A0(r){var t=je(mn(r,[1,0])),e=[Ue(t[2],t[0]),Ue(t[3],t[1])],n=[me(t[0],At(e[0],K(2))),me(t[1],At(e[1],K(2)))];return{sizes:e,centers:n}}function T0(r,t){var e=A0(r),n=e.sizes,a=e.centers,o=je(mn(t,[1,0])),i=At(et(To(At(o[2],K(5))),n[0]),K(2)),s=me(et(At(o[0],K(10)),n[0]),a[0]),u=At(et(To(At(o[3],K(5))),n[1]),K(2)),c=me(et(At(o[1],K(10)),n[1]),a[1]);return mn(yt([Ue(s,i),Ue(c,u),me(s,i),me(c,u)]),[1,0])}function F0(r,t,e){return Y(function(){var n=r.shape[0],a=T0(Tt(qn(e.extra_dim,[n,1,1]),[-1,4]),Tt(r,[-1,4]));a=Tt(a,[n,a.shape[0]/n,4]);var o=ec(Ht(t,[0,0,1],[-1,-1,-1])),i=Ht(o,[0,0,0],[-1,-1,1]);i=Tt(i,[n,i.shape[1]]);var s=je(a),u=je(i);return{boxes:s,scores:u}})}function jn(r,t){return Y(function(){var e=r.shape[0],n=Tt(Ft(r,t.box_encoding_predictor),[e,-1,1,4]),a=Tt(Ft(r,t.class_predictor),[e,-1,3]);return{boxPredictionEncoding:n,classPrediction:a}})}function M0(r,t,e){return Y(function(){var n=Bt(r,e.conv_0,[1,1]),a=Bt(n,e.conv_1,[2,2]),o=Bt(a,e.conv_2,[1,1]),i=Bt(o,e.conv_3,[2,2]),s=Bt(i,e.conv_4,[1,1]),u=Bt(s,e.conv_5,[2,2]),c=Bt(u,e.conv_6,[1,1]),l=Bt(c,e.conv_7,[2,2]),h=jn(t,e.box_predictor_0),f=jn(r,e.box_predictor_1),d=jn(a,e.box_predictor_2),p=jn(i,e.box_predictor_3),m=jn(u,e.box_predictor_4),v=jn(l,e.box_predictor_5),g=We([h.boxPredictionEncoding,f.boxPredictionEncoding,d.boxPredictionEncoding,p.boxPredictionEncoding,m.boxPredictionEncoding,v.boxPredictionEncoding],1),y=We([h.classPrediction,f.classPrediction,d.classPrediction,p.classPrediction,m.classPrediction,v.classPrediction],1);return{boxPredictions:g,classPredictions:y}})}var Oa=(function(){function r(t){var e=t===void 0?{}:t,n=e.minConfidence,a=e.maxResults;if(this._name="SsdMobilenetv1Options",this._minConfidence=n||.5,this._maxResults=a||100,typeof this._minConfidence!="number"||this._minConfidence<=0||this._minConfidence>=1)throw new Error(this._name+" - expected minConfidence to be a number between 0 and 1");if(typeof this._maxResults!="number")throw new Error(this._name+" - expected maxResults to be a number")}return Object.defineProperty(r.prototype,"minConfidence",{get:function(){return this._minConfidence},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxResults",{get:function(){return this._maxResults},enumerable:!0,configurable:!0}),r})(),hl=(function(r){ue(t,r);function t(){return r.call(this,"SsdMobilenetv1")||this}return t.prototype.forwardInput=function(e){var n=this.params;if(!n)throw new Error("SsdMobilenetv1 - load model before inference");return Y(function(){var a=e.toBatchTensor(512,!1).toFloat(),o=Ue(et(a,K(.007843137718737125)),K(1)),i=S0(o,n.mobilenetv1),s=M0(i.out,i.conv11,n.prediction_layer),u=s.boxPredictions,c=s.classPredictions;return F0(u,c,n.output_layer)})},t.prototype.forward=function(e){return te(this,void 0,void 0,function(){var n;return ne(this,function(a){switch(a.label){case 0:return n=this.forwardInput,[4,qe(e)];case 1:return[2,n.apply(this,[a.sent()])]}})})},t.prototype.locateFaces=function(e,n){return n===void 0&&(n={}),te(this,void 0,void 0,function(){var a,o,i,s,u,c,l,h,f,d,p,m,v,g,y,b,x,w,C,N,I;return ne(this,function(R){switch(R.label){case 0:return a=new Oa(n),o=a.maxResults,i=a.minConfidence,[4,qe(e)];case 1:for(s=R.sent(),u=this.forwardInput(s),c=u.boxes,l=u.scores,h=c[0],f=l[0],d=1;d<c.length;d++)c[d].dispose(),l[d].dispose();return v=(m=Array).from,[4,f.data()];case 2:return p=v.apply(m,[R.sent()]),g=.5,y=N0(h,p,o,g,i),b=s.getReshapedInputDimensions(0),x=s.inputSize,w=x/b.width,C=x/b.height,N=h.arraySync(),I=y.map(function(S){var F=[Math.max(0,N[S][0]),Math.min(1,N[S][2])].map(function(z){return z*C}),A=F[0],W=F[1],B=[Math.max(0,N[S][1]),Math.min(1,N[S][3])].map(function(z){return z*w}),O=B[0],U=B[1];return new Yt(p[S],new xi(O,A,U-O,W-A),{height:s.getInputHeight(0),width:s.getInputWidth(0)})}),h.dispose(),f.dispose(),[2,I]}})})},t.prototype.getDefaultModelName=function(){return"ssd_mobilenetv1_model"},t.prototype.extractParamsFromWeigthMap=function(e){return E0(e)},t.prototype.extractParams=function(e){return C0(e)},t})(an);(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t})(hl);var P0=.4,O0=[new Ee(.738768,.874946),new Ee(2.42204,2.65704),new Ee(4.30971,7.04493),new Ee(10.246,4.59428),new Ee(12.6868,11.8741)],B0=[new Ee(1.603231,2.094468),new Ee(6.041143,7.080126),new Ee(2.882459,3.518061),new Ee(4.266906,5.178857),new Ee(9.041765,10.66308)],L0=[117.001,114.697,97.404],W0="tiny_yolov2_model",j0="tiny_yolov2_separable_conv_model",$r=function(r){return typeof r=="number"};function z0(r){if(!r)throw new Error("invalid config: "+r);if(typeof r.withSeparableConvs!="boolean")throw new Error("config.withSeparableConvs has to be a boolean, have: "+r.withSeparableConvs);if(!$r(r.iouThreshold)||r.iouThreshold<0||r.iouThreshold>1)throw new Error("config.iouThreshold has to be a number between [0, 1], have: "+r.iouThreshold);if(!Array.isArray(r.classes)||!r.classes.length||!r.classes.every(function(t){return typeof t=="string"}))throw new Error("config.classes has to be an array class names: string[], have: "+JSON.stringify(r.classes));if(!Array.isArray(r.anchors)||!r.anchors.length||!r.anchors.map(function(t){return t||{}}).every(function(t){return $r(t.x)&&$r(t.y)}))throw new Error("config.anchors has to be an array of { x: number, y: number }, have: "+JSON.stringify(r.anchors));if(r.meanRgb&&(!Array.isArray(r.meanRgb)||r.meanRgb.length!==3||!r.meanRgb.every($r)))throw new Error("config.meanRgb has to be an array of shape [number, number, number], have: "+JSON.stringify(r.meanRgb))}function Ni(r){return Y(function(){var t=et(r,K(.10000000149011612));return me(Fe(Ue(r,t)),t)})}function cn(r,t){return Y(function(){var e=Tn(r,[[0,0],[1,1],[1,1],[0,0]]);return e=St(e,t.conv.filters,[1,1],"valid"),e=Ue(e,t.bn.sub),e=et(e,t.bn.truediv),e=me(e,t.conv.bias),Ni(e)})}function ln(r,t){return Y(function(){var e=Tn(r,[[0,0],[1,1],[1,1],[0,0]]);return e=oi(e,t.depthwise_filter,t.pointwise_filter,[1,1],"valid"),e=me(e,t.bias),Ni(e)})}function U0(r,t){var e=Pa(r,t);function n(i,s){var u=Be(r(i)),c=Be(r(i));return t.push({paramPath:s+"/sub"},{paramPath:s+"/truediv"}),{sub:u,truediv:c}}function a(i,s,u){var c=e(i,s,3,u+"/conv"),l=n(s,u+"/bn");return{conv:c,bn:l}}var o=ki(r,t);return{extractConvParams:e,extractConvWithBatchNormParams:a,extractSeparableConvParams:o}}function V0(r,t,e,n){var a=sn(r),o=a.extractWeights,i=a.getRemainingWeights,s=[],u=U0(o,s),c=u.extractConvParams,l=u.extractConvWithBatchNormParams,h=u.extractSeparableConvParams,f;if(t.withSeparableConvs){var d=n[0],p=n[1],m=n[2],v=n[3],g=n[4],y=n[5],b=n[6],x=n[7],w=n[8],C=t.isFirstLayerConv2d?c(d,p,3,"conv0"):h(d,p,"conv0"),N=h(p,m,"conv1"),I=h(m,v,"conv2"),R=h(v,g,"conv3"),S=h(g,y,"conv4"),F=h(y,b,"conv5"),A=x?h(b,x,"conv6"):void 0,W=w?h(x,w,"conv7"):void 0,B=c(w||x||b,5*e,1,"conv8");f={conv0:C,conv1:N,conv2:I,conv3:R,conv4:S,conv5:F,conv6:A,conv7:W,conv8:B}}else{var d=n[0],p=n[1],m=n[2],v=n[3],g=n[4],y=n[5],b=n[6],x=n[7],w=n[8],C=l(d,p,"conv0"),N=l(p,m,"conv1"),I=l(m,v,"conv2"),R=l(v,g,"conv3"),S=l(g,y,"conv4"),F=l(y,b,"conv5"),A=l(b,x,"conv6"),W=l(x,w,"conv7"),B=c(w,5*e,1,"conv8");f={conv0:C,conv1:N,conv2:I,conv3:R,conv4:S,conv5:F,conv6:A,conv7:W,conv8:B}}if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{params:f,paramMappings:s}}function G0(r,t){var e=bn(r,t);function n(s){var u=e(s+"/sub",1),c=e(s+"/truediv",1);return{sub:u,truediv:c}}function a(s){var u=e(s+"/filters",4),c=e(s+"/bias",1);return{filters:u,bias:c}}function o(s){var u=a(s+"/conv"),c=n(s+"/bn");return{conv:u,bn:c}}var i=Ii(e);return{extractConvParams:a,extractConvWithBatchNormParams:o,extractSeparableConvParams:i}}function H0(r,t){var e=[],n=G0(r,e),a=n.extractConvParams,o=n.extractConvWithBatchNormParams,i=n.extractSeparableConvParams,s;if(t.withSeparableConvs){var u=t.filterSizes&&t.filterSizes.length||9;s={conv0:t.isFirstLayerConv2d?a("conv0"):i("conv0"),conv1:i("conv1"),conv2:i("conv2"),conv3:i("conv3"),conv4:i("conv4"),conv5:i("conv5"),conv6:u>7?i("conv6"):void 0,conv7:u>8?i("conv7"):void 0,conv8:a("conv8")}}else s={conv0:o("conv0"),conv1:o("conv1"),conv2:o("conv2"),conv3:o("conv3"),conv4:o("conv4"),conv5:o("conv5"),conv6:o("conv6"),conv7:o("conv7"),conv8:a("conv8")};return on(r,e),{params:s,paramMappings:e}}var eu;(function(r){r[r.XS=224]="XS",r[r.SM=320]="SM",r[r.MD=416]="MD",r[r.LG=608]="LG"})(eu||(eu={}));var Di=(function(){function r(t){var e=t===void 0?{}:t,n=e.inputSize,a=e.scoreThreshold;if(this._name="TinyYolov2Options",this._inputSize=n||416,this._scoreThreshold=a||.5,typeof this._inputSize!="number"||this._inputSize%32!==0)throw new Error(this._name+" - expected inputSize to be a number divisible by 32");if(typeof this._scoreThreshold!="number"||this._scoreThreshold<=0||this._scoreThreshold>=1)throw new Error(this._name+" - expected scoreThreshold to be a number between 0 and 1")}return Object.defineProperty(r.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scoreThreshold",{get:function(){return this._scoreThreshold},enumerable:!0,configurable:!0}),r})(),fl=(function(r){ue(t,r);function t(e){var n=r.call(this,"TinyYolov2")||this;return z0(e),n._config=e,n}return Object.defineProperty(t.prototype,"config",{get:function(){return this._config},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"withClassScores",{get:function(){return this.config.withClassScores||this.config.classes.length>1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"boxEncodingSize",{get:function(){return 5+(this.withClassScores?this.config.classes.length:0)},enumerable:!0,configurable:!0}),t.prototype.runTinyYolov2=function(e,n){var a=cn(e,n.conv0);return a=Ge(a,[2,2],[2,2],"same"),a=cn(a,n.conv1),a=Ge(a,[2,2],[2,2],"same"),a=cn(a,n.conv2),a=Ge(a,[2,2],[2,2],"same"),a=cn(a,n.conv3),a=Ge(a,[2,2],[2,2],"same"),a=cn(a,n.conv4),a=Ge(a,[2,2],[2,2],"same"),a=cn(a,n.conv5),a=Ge(a,[2,2],[1,1],"same"),a=cn(a,n.conv6),a=cn(a,n.conv7),Ft(a,n.conv8,"valid",!1)},t.prototype.runMobilenet=function(e,n){var a=this.config.isFirstLayerConv2d?Ni(Ft(e,n.conv0,"valid",!1)):ln(e,n.conv0);return a=Ge(a,[2,2],[2,2],"same"),a=ln(a,n.conv1),a=Ge(a,[2,2],[2,2],"same"),a=ln(a,n.conv2),a=Ge(a,[2,2],[2,2],"same"),a=ln(a,n.conv3),a=Ge(a,[2,2],[2,2],"same"),a=ln(a,n.conv4),a=Ge(a,[2,2],[2,2],"same"),a=ln(a,n.conv5),a=Ge(a,[2,2],[1,1],"same"),a=n.conv6?ln(a,n.conv6):a,a=n.conv7?ln(a,n.conv7):a,Ft(a,n.conv8,"valid",!1)},t.prototype.forwardInput=function(e,n){var a=this,o=this.params;if(!o)throw new Error("TinyYolov2 - load model before inference");return Y(function(){var i=e.toBatchTensor(n,!1).toFloat();return i=a.config.meanRgb?Mr(i,a.config.meanRgb):i,i=i.div(K(256)),a.config.withSeparableConvs?a.runMobilenet(i,o):a.runTinyYolov2(i,o)})},t.prototype.forward=function(e,n){return te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return a=this.forwardInput,[4,qe(e)];case 1:return[4,a.apply(this,[o.sent(),n])];case 2:return[2,o.sent()]}})})},t.prototype.detect=function(e,n){return n===void 0&&(n={}),te(this,void 0,void 0,function(){var a,o,i,s,u,c,l,h,f,d,p,m,v,g,y=this;return ne(this,function(b){switch(b.label){case 0:return a=new Di(n),o=a.inputSize,i=a.scoreThreshold,[4,qe(e)];case 1:return s=b.sent(),[4,this.forwardInput(s,o)];case 2:return u=b.sent(),c=Y(function(){return je(u)[0].expandDims()}),l={width:s.getInputWidth(0),height:s.getInputHeight(0)},[4,this.extractBoxes(c,s.getReshapedInputDimensions(0),i)];case 3:return h=b.sent(),u.dispose(),c.dispose(),f=h.map(function(x){return x.box}),d=h.map(function(x){return x.score}),p=h.map(function(x){return x.classScore}),m=h.map(function(x){return y.config.classes[x.label]}),v=kr(f.map(function(x){return x.rescale(o)}),d,this.config.iouThreshold,!0),g=v.map(function(x){return new Lc(d[x],p[x],m[x],f[x],l)}),[2,g]}})})},t.prototype.getDefaultModelName=function(){return""},t.prototype.extractParamsFromWeigthMap=function(e){return H0(e,this.config)},t.prototype.extractParams=function(e){var n=this.config.filterSizes||t.DEFAULT_FILTER_SIZES,a=n?n.length:void 0;if(a!==7&&a!==8&&a!==9)throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found "+a+" filterSizes in config");return V0(e,this.config,this.boxEncodingSize,n)},t.prototype.extractBoxes=function(e,n,a){return te(this,void 0,void 0,function(){var o,i,s,u,c,l,h,f,d,p,m,v,g,y,b,x,w,C,N,I,R,S,F,A,W,B,O,U,z,j=this;return ne(this,function(G){switch(G.label){case 0:return o=n.width,i=n.height,s=Math.max(o,i),u=s/o,c=s/i,l=e.shape[1],h=this.config.anchors.length,f=Y(function(){var q=e.reshape([l,l,h,j.boxEncodingSize]),X=q.slice([0,0,0,0],[l,l,h,4]),$=q.slice([0,0,0,4],[l,l,h,1]),ae=j.withClassScores?nn(q.slice([0,0,0,5],[l,l,h,j.config.classes.length]),3):K(0);return[X,$,ae]}),d=f[0],p=f[1],m=f[2],v=[],[4,p.array()];case 1:return g=G.sent(),[4,d.array()];case 2:y=G.sent(),b=0,G.label=3;case 3:if(!(b<l))return[3,12];x=0,G.label=4;case 4:if(!(x<l))return[3,11];w=0,G.label=5;case 5:return w<h?(C=vo(g[b][x][w][0]),!a||C>a?(N=(x+vo(y[b][x][w][0]))/l*u,I=(b+vo(y[b][x][w][1]))/l*c,R=Math.exp(y[b][x][w][2])*this.config.anchors[w].x/l*u,S=Math.exp(y[b][x][w][3])*this.config.anchors[w].y/l*c,F=N-R/2,A=I-S/2,W={row:b,col:x,anchor:w},this.withClassScores?[4,this.extractPredictedClass(m,W)]:[3,7]):[3,9]):[3,10];case 6:return z=G.sent(),[3,8];case 7:z={classScore:1,label:0},G.label=8;case 8:B=z,O=B.classScore,U=B.label,v.push(Je({box:new Fa(F,A,F+R,A+S),score:C,classScore:C*O,label:U},W)),G.label=9;case 9:return w++,[3,5];case 10:return x++,[3,4];case 11:return b++,[3,3];case 12:return d.dispose(),p.dispose(),m.dispose(),[2,v]}})})},t.prototype.extractPredictedClass=function(e,n){return te(this,void 0,void 0,function(){var a,o,i,s;return ne(this,function(u){switch(u.label){case 0:return a=n.row,o=n.col,i=n.anchor,[4,e.array()];case 1:return s=u.sent(),[2,Array(this.config.classes.length).fill(0).map(function(c,l){return s[a][o][i][l]}).map(function(c,l){return{classScore:c,label:l}}).reduce(function(c,l){return c.classScore>l.classScore?c:l})]}})})},t.DEFAULT_FILTER_SIZES=[3,16,32,64,128,256,512,1024,1024],t})(an),q0=(function(r){ue(t,r);function t(e){e===void 0&&(e=!0);var n=this,a=Object.assign({},{withSeparableConvs:e,iouThreshold:P0,classes:["face"]},e?{anchors:B0,meanRgb:L0}:{anchors:O0,withClassScores:!0});return n=r.call(this,a)||this,n}return Object.defineProperty(t.prototype,"withSeparableConvs",{get:function(){return this.config.withSeparableConvs},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),t.prototype.locateFaces=function(e,n){return te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.detect(e,n)];case 1:return a=o.sent(),[2,a.map(function(i){return new Yt(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},t.prototype.getDefaultModelName=function(){return this.withSeparableConvs?j0:W0},t.prototype.extractParamsFromWeigthMap=function(e){return r.prototype.extractParamsFromWeigthMap.call(this,e)},t})(fl),dl=(function(r){ue(t,r);function t(){var e=r!==null&&r.apply(this,arguments)||this;return e._name="TinyFaceDetectorOptions",e}return t})(Di),Pr=(function(){function r(){}return r.prototype.then=function(t){return te(this,void 0,void 0,function(){var e;return ne(this,function(n){switch(n.label){case 0:return e=t,[4,this.run()];case 1:return[2,e.apply(void 0,[n.sent()])]}})})},r.prototype.run=function(){return te(this,void 0,void 0,function(){return ne(this,function(t){throw new Error("ComposableTask - run is not implemented")})})},r})();function Ba(r,t,e,n,a){return a===void 0&&(a=function(o){var i=o.alignedRect;return i}),te(this,void 0,void 0,function(){var o,i,s,u,c;return ne(this,function(l){switch(l.label){case 0:return o=r.map(function(h){return e0(h)?a(h):h.detection}),s=n,s?[3,5]:t instanceof Te?[4,_i(t,o)]:[3,2];case 1:return u=l.sent(),[3,4];case 2:return[4,Ci(t,o)];case 3:u=l.sent(),l.label=4;case 4:s=u,l.label=5;case 5:return i=s,[4,e(i)];case 6:return c=l.sent(),i.forEach(function(h){return h instanceof Te&&h.dispose()}),[2,c]}})})}function Ai(r,t,e,n,a){return te(this,void 0,void 0,function(){var o=this;return ne(this,function(i){return[2,Ba([r],t,function(s){return te(o,void 0,void 0,function(){return ne(this,function(u){return[2,e(s[0])]})})},n,a)]})})}function K0(r){return Y(function(){return yt(je(r,3).reverse(),3)})}var Jr=2,wa=12;function X0(r,t){var e=Pa(r,t),n=Ei(r,t);function a(c,l){var h=Be(r(c));return t.push({paramPath:l}),h}function o(c,l,h){h===void 0&&(h=!1);var f=e(c[0],c[1],3,l+"/conv1"),d=a(c[1],l+"/prelu1_alpha"),p=e(c[1],c[2],3,l+"/conv2"),m=a(c[2],l+"/prelu2_alpha"),v=e(c[2],c[3],h?2:3,l+"/conv3"),g=a(c[3],l+"/prelu3_alpha");return{conv1:f,prelu1_alpha:d,conv2:p,prelu2_alpha:m,conv3:v,prelu3_alpha:g}}function i(){var c=o([3,10,16,32],"pnet"),l=e(32,2,1,"pnet/conv4_1"),h=e(32,4,1,"pnet/conv4_2");return Je(Je({},c),{conv4_1:l,conv4_2:h})}function s(){var c=o([3,28,48,64],"rnet",!0),l=n(576,128,"rnet/fc1"),h=a(128,"rnet/prelu4_alpha"),f=n(128,2,"rnet/fc2_1"),d=n(128,4,"rnet/fc2_2");return Je(Je({},c),{fc1:l,prelu4_alpha:h,fc2_1:f,fc2_2:d})}function u(){var c=o([3,32,64,64],"onet"),l=e(64,128,2,"onet/conv4"),h=a(128,"onet/prelu4_alpha"),f=n(1152,256,"onet/fc1"),d=a(256,"onet/prelu5_alpha"),p=n(256,2,"onet/fc2_1"),m=n(256,4,"onet/fc2_2"),v=n(256,10,"onet/fc2_3");return Je(Je({},c),{conv4:l,prelu4_alpha:h,fc1:f,prelu5_alpha:d,fc2_1:p,fc2_2:m,fc2_3:v})}return{extractPNetParams:i,extractRNetParams:s,extractONetParams:u}}function Y0(r){var t=sn(r),e=t.extractWeights,n=t.getRemainingWeights,a=[],o=X0(e,a),i=o.extractPNetParams,s=o.extractRNetParams,u=o.extractONetParams,c=i(),l=s(),h=u();if(n().length!==0)throw new Error("weights remaing after extract: "+n().length);return{params:{pnet:c,rnet:l,onet:h},paramMappings:a}}function $0(r,t){var e=bn(r,t);function n(l){var h=e(l+"/weights",4,l+"/filters"),f=e(l+"/bias",1);return{filters:h,bias:f}}function a(l){var h=e(l+"/weights",2),f=e(l+"/bias",1);return{weights:h,bias:f}}function o(l){return e(l,1)}function i(l){var h=n(l+"/conv1"),f=o(l+"/prelu1_alpha"),d=n(l+"/conv2"),p=o(l+"/prelu2_alpha"),m=n(l+"/conv3"),v=o(l+"/prelu3_alpha");return{conv1:h,prelu1_alpha:f,conv2:d,prelu2_alpha:p,conv3:m,prelu3_alpha:v}}function s(){var l=i("pnet"),h=n("pnet/conv4_1"),f=n("pnet/conv4_2");return Je(Je({},l),{conv4_1:h,conv4_2:f})}function u(){var l=i("rnet"),h=a("rnet/fc1"),f=o("rnet/prelu4_alpha"),d=a("rnet/fc2_1"),p=a("rnet/fc2_2");return Je(Je({},l),{fc1:h,prelu4_alpha:f,fc2_1:d,fc2_2:p})}function c(){var l=i("onet"),h=n("onet/conv4"),f=o("onet/prelu4_alpha"),d=a("onet/fc1"),p=o("onet/prelu5_alpha"),m=a("onet/fc2_1"),v=a("onet/fc2_2"),g=a("onet/fc2_3");return Je(Je({},l),{conv4:h,prelu4_alpha:f,fc1:d,prelu5_alpha:p,fc2_1:m,fc2_2:v,fc2_3:g})}return{extractPNetParams:s,extractRNetParams:u,extractONetParams:c}}function J0(r){var t=[],e=$0(r,t),n=e.extractPNetParams,a=e.extractRNetParams,o=e.extractONetParams,i=n(),s=a(),u=o();return on(r,t),{params:{pnet:i,rnet:s,onet:u},paramMappings:t}}function jo(r,t){var e=t[0],n=t[1];return{height:Math.floor(e*r),width:Math.floor(n*r)}}function Q0(r,t,e){for(var n=e[0],a=e[1],o=wa/r,i=[],s=Math.min(n,a)*o,u=0;s>=12;)i.push(o*Math.pow(t,u)),s=s*t,u+=1;return i}var Ti=(function(r){ue(t,r);function t(e,n,a,o){return r.call(this,{left:e,top:n,right:a,bottom:o},!0)||this}return t})(gn);function pl(r){return Y(function(){return et(Ue(r,K(127.5)),K(.0078125))})}function Qn(r,t){return Y(function(){return me(Fe(r),et(t,pa(Fe(pa(r)))))})}function Fi(r,t,e){return e===void 0&&(e=!1),Y(function(){var n=Ft(r,t.conv1,"valid");return n=Qn(n,t.prelu1_alpha),n=Ge(n,e?[2,2]:[3,3],[2,2],"same"),n=Ft(n,t.conv2,"valid"),n=Qn(n,t.prelu2_alpha),n=e?n:Ge(n,[3,3],[2,2],"valid"),n=Ft(n,t.conv3,"valid"),n=Qn(n,t.prelu3_alpha),n})}function Z0(r,t){return Y(function(){var e=Fi(r,t,!0),n=Ft(e,t.conv4_1,"valid"),a=kt(Na(n,3),3),o=nn(Ue(n,a),3),i=Ft(e,t.conv4_2,"valid");return{prob:o,regions:i}})}function ex(r,t){return Y(function(){var e=jo(t,r.shape.slice(1)),n=e.height,a=e.width,o=li.resizeBilinear(r,[n,a]),i=pl(o);return mn(i,[0,2,1,3])})}function tx(r,t,e,n){for(var a=[],o=r.arraySync(),i=0;i<r.shape[0];i++)for(var s=0;s<r.shape[1];s++)o[i][s]>=n&&a.push(new Ee(s,i));var u=a.map(function(c){var l=new Fa(Math.round((c.y*Jr+1)/e),Math.round((c.x*Jr+1)/e),Math.round((c.y*Jr+wa)/e),Math.round((c.x*Jr+wa)/e)),h=o[c.y][c.x],f=t.arraySync(),d=new Ti(f[c.y][c.x][0],f[c.y][c.x][1],f[c.y][c.x][2],f[c.y][c.x][3]);return{cell:l,score:h,region:d}});return u}function nx(r,t,e,n,a){a.stage1=[];var o=t.map(function(f){return Y(function(){var d={scale:f},p=ex(r,f),m=Date.now(),v=Z0(p,n),g=v.prob,y=v.regions;d.pnet=Date.now()-m;var b=je(je(g,3)[1])[0],x=je(y)[0];return{scoresTensor:b,regionsTensor:x,scale:f,statsForScale:d}})}),i=o.map(function(f){var d=f.scoresTensor,p=f.regionsTensor,m=f.scale,v=f.statsForScale,g=tx(d,p,m,e);if(d.dispose(),p.dispose(),!g.length)return a.stage1.push(v),[];var y=Date.now(),b=kr(g.map(function(x){return x.cell}),g.map(function(x){return x.score}),.5);return v.nms=Date.now()-y,v.numBoxes=b.length,a.stage1.push(v),b.map(function(x){return g[x]})}),s=i.reduce(function(f,d){return f.concat(d)},[]),u=[],c=[];if(s.length>0){var l=Date.now(),h=kr(s.map(function(f){return f.cell}),s.map(function(f){return f.score}),.7);a.stage1_nms=Date.now()-l,c=h.map(function(f){return s[f].score}),u=h.map(function(f){return s[f]}).map(function(f){var d=f.cell,p=f.region;return new Fa(d.left+p.left*d.width,d.top+p.top*d.height,d.right+p.right*d.width,d.bottom+p.bottom*d.height).toSquare().round()})}return{boxes:u,scores:c}}function vl(r,t,e){var n=e.width,a=e.height;return te(this,void 0,void 0,function(){var o,i,s,u=this;return ne(this,function(c){switch(c.label){case 0:return o=Dn(r),[4,Promise.all(t.map(function(l){return te(u,void 0,void 0,function(){var h,f,d,p,m,v,g,y;return ne(this,function(b){return h=l.padAtBorders(r.height,r.width),f=h.y,d=h.ey,p=h.x,m=h.ex,v=p-1,g=f-1,y=o.getImageData(v,g,m-v,d-g),[2,tt.isNodejs()?wi(y):createImageBitmap(y)]})})}))];case 1:return i=c.sent(),s=[],i.forEach(function(l){var h=Ma({width:n,height:a}),f=Dn(h);f.drawImage(l,0,0,n,a);for(var d=f.getImageData(0,0,n,a).data,p=[],m=0;m<d.length;m+=4)p.push(d[m+2]),p.push(d[m+1]),p.push(d[m]);s.push(p)}),[2,s.map(function(l){var h=Y(function(){var f=mn(ut(l,[1,n,a,3]),[0,2,1,3]).toFloat();return pl(f)});return h})]}})})}function rx(r,t){return Y(function(){var e=Fi(r,t),n=Tt(e,[e.shape[0],t.fc1.weights.shape[0]]),a=zt(n,t.fc1),o=Qn(a,t.prelu4_alpha),i=zt(o,t.fc2_1),s=kt(Na(i,1),1),u=nn(Ue(i,s),1),c=zt(o,t.fc2_2),l=je(u,1)[1];return{scores:l,regions:c}})}function ax(r,t,e,n,a){return te(this,void 0,void 0,function(){var o,i,s,u,c,l,h,f,d,p,m,v,g,y;return ne(this,function(b){switch(b.label){case 0:return o=Date.now(),[4,vl(r,t,{width:24,height:24})];case 1:return i=b.sent(),a.stage2_extractImagePatches=Date.now()-o,o=Date.now(),s=i.map(function(x){var w=rx(x,n);return x.dispose(),w}),a.stage2_rnet=Date.now()-o,u=s.length>1?We(s.map(function(x){return x.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[b.sent()]),u.dispose(),f=c.map(function(x,w){return{score:x,idx:w}}).filter(function(x){return x.score>e}).map(function(x){var w=x.idx;return w}),d=f.map(function(x){return t[x]}),p=f.map(function(x){return c[x]}),m=[],v=[],d.length>0&&(o=Date.now(),g=kr(d,p,.7),a.stage2_nms=Date.now()-o,y=g.map(function(x){var w=s[f[x]].regions.arraySync();return new Ti(w[0][0],w[0][1],w[0][2],w[0][3])}),v=g.map(function(x){return p[x]}),m=g.map(function(x,w){return d[x].calibrate(y[w])})),s.forEach(function(x){x.regions.dispose(),x.scores.dispose()}),[2,{boxes:m,scores:v}]}})})}function ox(r,t){return Y(function(){var e=Fi(r,t);e=Ge(e,[2,2],[2,2],"same"),e=Ft(e,t.conv4,"valid"),e=Qn(e,t.prelu4_alpha);var n=Tt(e,[e.shape[0],t.fc1.weights.shape[0]]),a=zt(n,t.fc1),o=Qn(a,t.prelu5_alpha),i=zt(o,t.fc2_1),s=kt(Na(i,1),1),u=nn(Ue(i,s),1),c=zt(o,t.fc2_2),l=zt(o,t.fc2_3),h=je(u,1)[1];return{scores:h,regions:c,points:l}})}function ix(r,t,e,n,a){return te(this,void 0,void 0,function(){var o,i,s,u,c,l,h,f,d,p,m,v,g,y,b;return ne(this,function(x){switch(x.label){case 0:return o=Date.now(),[4,vl(r,t,{width:48,height:48})];case 1:return i=x.sent(),a.stage3_extractImagePatches=Date.now()-o,o=Date.now(),s=i.map(function(w){var C=ox(w,n);return w.dispose(),C}),a.stage3_onet=Date.now()-o,u=s.length>1?We(s.map(function(w){return w.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[x.sent()]),u.dispose(),f=c.map(function(w,C){return{score:w,idx:C}}).filter(function(w){return w.score>e}).map(function(w){var C=w.idx;return C}),d=f.map(function(w){var C=s[w].regions.arraySync();return new Ti(C[0][0],C[0][1],C[0][2],C[0][3])}),p=f.map(function(w,C){return t[w].calibrate(d[C])}),m=f.map(function(w){return c[w]}),v=[],g=[],y=[],p.length>0&&(o=Date.now(),b=kr(p,m,.7,!1),a.stage3_nms=Date.now()-o,v=b.map(function(w){return p[w]}),g=b.map(function(w){return m[w]}),y=b.map(function(w,C){return Array(5).fill(0).map(function(N,I){var R=s[w].points.arraySync();return new Ee(R[0][I]*(v[C].width+1)+v[C].left,R[0][I+5]*(v[C].height+1)+v[C].top)})})),s.forEach(function(w){w.regions.dispose(),w.scores.dispose(),w.points.dispose()}),[2,{boxes:v,scores:g,points:y}]}})})}var sx=(function(r){ue(t,r);function t(){return r.call(this,"Mtcnn")||this}return t.prototype.load=function(e){return te(this,void 0,void 0,function(){return ne(this,function(n){return console.warn("mtcnn is deprecated and will be removed soon"),[2,r.prototype.load.call(this,e)]})})},t.prototype.loadFromDisk=function(e){return te(this,void 0,void 0,function(){return ne(this,function(n){return console.warn("mtcnn is deprecated and will be removed soon"),[2,r.prototype.loadFromDisk.call(this,e)]})})},t.prototype.forwardInput=function(e,n){return n===void 0&&(n={}),te(this,void 0,void 0,function(){var a,o,i,s,u,c,l,h,f,d,p,m,v,g,y,b,x,w,C,N,I;return ne(this,function(R){switch(R.label){case 0:if(a=this.params,!a)throw new Error("Mtcnn - load model before inference");if(o=e.canvases[0],!o)throw new Error("Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.");return i={},s=Date.now(),u=Y(function(){return K0(kt(mi.fromPixels(o)).toFloat())}),c=function(S){return u.dispose(),i.total=Date.now()-s,S},l=u.shape.slice(1),h=l[0],f=l[1],d=new ll(n),p=d.minFaceSize,m=d.scaleFactor,v=d.maxNumScales,g=d.scoreThresholds,y=d.scaleSteps,b=(y||Q0(p,m,[h,f])).filter(function(S){var F=jo(S,[h,f]);return Math.min(F.width,F.height)>wa}).slice(0,v),i.scales=b,i.pyramid=b.map(function(S){return jo(S,[h,f])}),x=Date.now(),[4,nx(u,b,g[0],a.pnet,i)];case 1:return w=R.sent(),i.total_stage1=Date.now()-x,w.boxes.length?(i.stage2_numInputBoxes=w.boxes.length,x=Date.now(),[4,ax(o,w.boxes,g[1],a.rnet,i)]):[2,c({results:[],stats:i})];case 2:return C=R.sent(),i.total_stage2=Date.now()-x,C.boxes.length?(i.stage3_numInputBoxes=C.boxes.length,x=Date.now(),[4,ix(o,C.boxes,g[2],a.onet,i)]):[2,c({results:[],stats:i})];case 3:return N=R.sent(),i.total_stage3=Date.now()-x,I=N.boxes.map(function(S,F){return Ri(yi({},new Yt(N.scores[F],new xi(S.left/f,S.top/h,S.width/f,S.height/h),{height:h,width:f})),new Bg(N.points[F].map(function(A){return A.sub(new Ee(S.left,S.top)).div(new Ee(S.width,S.height))}),{width:S.width,height:S.height}))}),[2,c({results:I,stats:i})]}})})},t.prototype.forward=function(e,n){return n===void 0&&(n={}),te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return a=this.forwardInput,[4,qe(e)];case 1:return[4,a.apply(this,[o.sent(),n])];case 2:return[2,o.sent().results]}})})},t.prototype.forwardWithStats=function(e,n){return n===void 0&&(n={}),te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return a=this.forwardInput,[4,qe(e)];case 1:return[2,a.apply(this,[o.sent(),n])]}})})},t.prototype.getDefaultModelName=function(){return"mtcnn_model"},t.prototype.extractParamsFromWeigthMap=function(e){return J0(e)},t.prototype.extractParams=function(e){return Y0(e)},t})(an),ux=.4,cx=[new Ee(1.603231,2.094468),new Ee(6.041143,7.080126),new Ee(2.882459,3.518061),new Ee(4.266906,5.178857),new Ee(9.041765,10.66308)],lx=[117.001,114.697,97.404],hx=(function(r){ue(t,r);function t(){var e=this,n={withSeparableConvs:!0,iouThreshold:ux,classes:["face"],anchors:cx,meanRgb:lx,isFirstLayerConv2d:!0,filterSizes:[3,16,32,64,128,256,512]};return e=r.call(this,n)||this,e}return Object.defineProperty(t.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),t.prototype.locateFaces=function(e,n){return te(this,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.detect(e,n)];case 1:return a=o.sent(),[2,a.map(function(i){return new Yt(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},t.prototype.getDefaultModelName=function(){return"tiny_face_detector_model"},t.prototype.extractParamsFromWeigthMap=function(e){return r.prototype.extractParamsFromWeigthMap.call(this,e)},t})(fl),lt={ssdMobilenetv1:new hl,tinyFaceDetector:new hx,tinyYolov2:new q0,mtcnn:new sx,faceLandmark68Net:new al,faceLandmark68TinyNet:new d0,faceRecognitionNet:new b0,faceExpressionNet:new Zg,ageGenderNet:new c0},ml=(function(r){ue(t,r);function t(e,n,a){var o=r.call(this)||this;return o.parentTask=e,o.input=n,o.extractedFaces=a,o}return t})(Pr),Mi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n,a=this;return ne(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),[4,Ba(e,this.input,function(i){return te(a,void 0,void 0,function(){return ne(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return lt.faceExpressionNet.predictExpressions(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return n=o.sent(),[2,e.map(function(i,s){return tl(i,n[s])})]}})})},t.prototype.withAgeAndGender=function(){return new Li(this,this.input)},t})(ml),Pi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n;return ne(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),e?[4,Ai(e,this.input,function(o){return lt.faceExpressionNet.predictExpressions(o)},this.extractedFaces)]:[2];case 2:return n=a.sent(),[2,tl(e,n)]}})})},t.prototype.withAgeAndGender=function(){return new Wi(this,this.input)},t})(ml),Oi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withAgeAndGender=function(){return new ji(this,this.input)},t.prototype.withFaceDescriptors=function(){return new Ui(this,this.input)},t})(Mi),Bi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withAgeAndGender=function(){return new zi(this,this.input)},t.prototype.withFaceDescriptor=function(){return new Vi(this,this.input)},t})(Pi),gl=(function(r){ue(t,r);function t(e,n,a){var o=r.call(this)||this;return o.parentTask=e,o.input=n,o.extractedFaces=a,o}return t})(Pr),Li=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n,a=this;return ne(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return e=o.sent(),[4,Ba(e,this.input,function(i){return te(a,void 0,void 0,function(){return ne(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return lt.ageGenderNet.predictAgeAndGender(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return n=o.sent(),[2,e.map(function(i,s){var u=n[s],c=u.age,l=u.gender,h=u.genderProbability;return ul(cl(i,l,h),c)})]}})})},t.prototype.withFaceExpressions=function(){return new Mi(this,this.input)},t})(gl),Wi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n,a,o,i;return ne(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return e=s.sent(),e?[4,Ai(e,this.input,function(u){return lt.ageGenderNet.predictAgeAndGender(u)},this.extractedFaces)]:[2];case 2:return n=s.sent(),a=n.age,o=n.gender,i=n.genderProbability,[2,ul(cl(e,o,i),a)]}})})},t.prototype.withFaceExpressions=function(){return new Pi(this,this.input)},t})(gl),ji=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withFaceExpressions=function(){return new Oi(this,this.input)},t.prototype.withFaceDescriptors=function(){return new Ui(this,this.input)},t})(Li),zi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.withFaceExpressions=function(){return new Bi(this,this.input)},t.prototype.withFaceDescriptor=function(){return new Vi(this,this.input)},t})(Wi),xl=(function(r){ue(t,r);function t(e,n){var a=r.call(this)||this;return a.parentTask=e,a.input=n,a}return t})(Pr),Ui=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n;return ne(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),[4,Ba(e,this.input,function(o){return Promise.all(o.map(function(i){return lt.faceRecognitionNet.computeFaceDescriptor(i)}))},null,function(o){return o.landmarks.align(null,{useDlibAlignment:!0})})];case 2:return n=a.sent(),[2,n.map(function(o,i){return sl(e[i],o)})]}})})},t.prototype.withFaceExpressions=function(){return new Oi(this,this.input)},t.prototype.withAgeAndGender=function(){return new ji(this,this.input)},t})(xl),Vi=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n;return ne(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return e=a.sent(),e?[4,Ai(e,this.input,function(o){return lt.faceRecognitionNet.computeFaceDescriptor(o)},null,function(o){return o.landmarks.align(null,{useDlibAlignment:!0})})]:[2];case 2:return n=a.sent(),[2,sl(e,n)]}})})},t.prototype.withFaceExpressions=function(){return new Bi(this,this.input)},t.prototype.withAgeAndGender=function(){return new zi(this,this.input)},t})(xl),yl=(function(r){ue(t,r);function t(e,n,a){var o=r.call(this)||this;return o.parentTask=e,o.input=n,o.useTinyLandmarkNet=a,o}return Object.defineProperty(t.prototype,"landmarkNet",{get:function(){return this.useTinyLandmarkNet?lt.faceLandmark68TinyNet:lt.faceLandmark68Net},enumerable:!0,configurable:!0}),t})(Pr),fx=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n,a,o,i,s=this;return ne(this,function(u){switch(u.label){case 0:return[4,this.parentTask];case 1:return e=u.sent(),n=e.map(function(c){return c.detection}),this.input instanceof Te?[4,_i(this.input,n)]:[3,3];case 2:return o=u.sent(),[3,5];case 3:return[4,Ci(this.input,n)];case 4:o=u.sent(),u.label=5;case 5:return a=o,[4,Promise.all(a.map(function(c){return s.landmarkNet.detectLandmarks(c)}))];case 6:return i=u.sent(),a.forEach(function(c){return c instanceof Te&&c.dispose()}),[2,e.map(function(c,l){return Ri(c,i[l])})]}})})},t.prototype.withFaceExpressions=function(){return new Oi(this,this.input)},t.prototype.withAgeAndGender=function(){return new ji(this,this.input)},t.prototype.withFaceDescriptors=function(){return new Ui(this,this.input)},t})(yl),dx=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n,a,o,i;return ne(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return e=s.sent(),e?(n=e.detection,this.input instanceof Te?[4,_i(this.input,[n])]:[3,3]):[2];case 2:return o=s.sent(),[3,5];case 3:return[4,Ci(this.input,[n])];case 4:o=s.sent(),s.label=5;case 5:return a=o,[4,this.landmarkNet.detectLandmarks(a[0])];case 6:return i=s.sent(),a.forEach(function(u){return u instanceof Te&&u.dispose()}),[2,Ri(e,i)]}})})},t.prototype.withFaceExpressions=function(){return new Bi(this,this.input)},t.prototype.withAgeAndGender=function(){return new zi(this,this.input)},t.prototype.withFaceDescriptor=function(){return new Vi(this,this.input)},t})(yl),bl=(function(r){ue(t,r);function t(e,n){n===void 0&&(n=new Oa);var a=r.call(this)||this;return a.input=e,a.options=n,a}return t})(Pr),wl=(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n,a,o;return ne(this,function(i){switch(i.label){case 0:return e=this,n=e.input,a=e.options,a instanceof ll?[4,lt.mtcnn.forward(n,a)]:[3,2];case 1:return[2,i.sent().map(function(s){return s.detection})];case 2:if(o=a instanceof dl?function(s){return lt.tinyFaceDetector.locateFaces(s,a)}:a instanceof Oa?function(s){return lt.ssdMobilenetv1.locateFaces(s,a)}:a instanceof Di?function(s){return lt.tinyYolov2.locateFaces(s,a)}:null,!o)throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options");return[2,o(n)]}})})},t.prototype.runAndExtendWithFaceDetections=function(){var e=this;return new Promise(function(n){return te(e,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.run()];case 1:return a=o.sent(),[2,n(a.map(function(i){return yi({},i)}))]}})})})},t.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new fx(this.runAndExtendWithFaceDetections(),this.input,e)},t.prototype.withFaceExpressions=function(){return new Mi(this.runAndExtendWithFaceDetections(),this.input)},t.prototype.withAgeAndGender=function(){return new Li(this.runAndExtendWithFaceDetections(),this.input)},t})(bl);(function(r){ue(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.run=function(){return te(this,void 0,void 0,function(){var e,n;return ne(this,function(a){switch(a.label){case 0:return[4,new wl(this.input,this.options)];case 1:return e=a.sent(),n=e[0],e.forEach(function(o){o.score>n.score&&(n=o)}),[2,n]}})})},t.prototype.runAndExtendWithFaceDetection=function(){var e=this;return new Promise(function(n){return te(e,void 0,void 0,function(){var a;return ne(this,function(o){switch(o.label){case 0:return[4,this.run()];case 1:return a=o.sent(),[2,n(a?yi({},a):void 0)]}})})})},t.prototype.withFaceLandmarks=function(e){return e===void 0&&(e=!1),new dx(this.runAndExtendWithFaceDetection(),this.input,e)},t.prototype.withFaceExpressions=function(){return new Pi(this.runAndExtendWithFaceDetection(),this.input)},t.prototype.withAgeAndGender=function(){return new Wi(this.runAndExtendWithFaceDetection(),this.input)},t})(bl);function px(r,t){return t===void 0&&(t=new Oa),new wl(r,t)}function vx(r,t){if(r.length!==t.length)throw new Error("euclideanDistance: arr1.length !== arr2.length");var e=Array.from(r),n=Array.from(t);return Math.sqrt(e.map(function(a,o){return a-n[o]}).reduce(function(a,o){return a+Math.pow(o,2)},0))}(function(){function r(t,e){e===void 0&&(e=.6),this._distanceThreshold=e;var n=Array.isArray(t)?t:[t];if(!n.length)throw new Error("FaceRecognizer.constructor - expected atleast one input");var a=1,o=function(){return"person "+a++};this._labeledDescriptors=n.map(function(i){if(i instanceof Kr)return i;if(i instanceof Float32Array)return new Kr(o(),[i]);if(i.descriptor&&i.descriptor instanceof Float32Array)return new Kr(o(),[i.descriptor]);throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>")})}return Object.defineProperty(r.prototype,"labeledDescriptors",{get:function(){return this._labeledDescriptors},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"distanceThreshold",{get:function(){return this._distanceThreshold},enumerable:!0,configurable:!0}),r.prototype.computeMeanDistance=function(t,e){return e.map(function(n){return vx(n,t)}).reduce(function(n,a){return n+a},0)/(e.length||1)},r.prototype.matchDescriptor=function(t){var e=this;return this.labeledDescriptors.map(function(n){var a=n.descriptors,o=n.label;return new Ys(o,e.computeMeanDistance(t,a))}).reduce(function(n,a){return n.distance<a.distance?n:a})},r.prototype.findBestMatch=function(t){var e=this.matchDescriptor(t);return e.distance<this.distanceThreshold?e:new Ys("unknown",e.distance)},r.prototype.toJSON=function(){return{distanceThreshold:this.distanceThreshold,labeledDescriptors:this.labeledDescriptors.map(function(t){return t.toJSON()})}},r.fromJSON=function(t){var e=t.labeledDescriptors.map(function(n){return Kr.fromJSON(n)});return new r(e,t.distanceThreshold)},r})();const mx=r=>{const[t,e]=ce.useState("00:00:00"),n=r.startTime;return ce.useEffect(()=>{if(!n)return;const a=()=>{const i=ye(),s=ye(n,"HH:mm:ss"),u=ye.duration(i.diff(s)),c=Math.max(0,u.asMilliseconds()),l=ye.duration(c),h=String(Math.floor(l.asHours())).padStart(2,"0"),f=String(l.minutes()).padStart(2,"0"),d=String(l.seconds()).padStart(2,"0");e(`${h}:${f}:${d}`)};a();const o=setInterval(a,1e3);return()=>clearInterval(o)},[n]),E.jsx("span",{className:r.className||"font-mono text-[11px] font-black text-emerald-600 tabular-nums",children:t})},gx=({selectedDate:r,onSelectDate:t})=>{const[e,n]=ce.useState(ye(r)),a=e.clone().startOf("month"),o=e.clone().endOf("month"),i=a.day(),s=o.date(),u=ye().format("YYYY-MM-DD"),c=["SUN","MON","TUE","WED","THU","FRI","SAT"],l=()=>n(e.clone().subtract(1,"month")),h=()=>n(e.clone().add(1,"month"));return E.jsxs("div",{className:"bg-sky-50 border border-sky-100 rounded-lg shadow-sm w-full h-full flex flex-col hover:shadow-md transition-shadow",children:[E.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50",children:[E.jsx("span",{className:"text-sm font-black text-blue-900 uppercase tracking-tighter",children:e.format("MMMM YYYY")}),E.jsxs("div",{className:"flex items-center gap-2",children:[E.jsx("button",{onClick:l,className:"p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all border border-transparent hover:border-slate-200",children:E.jsx(Hl,{size:14,className:"text-slate-400"})}),E.jsx("button",{onClick:h,className:"p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all border border-transparent hover:border-slate-200",children:E.jsx(ql,{size:14,className:"text-slate-400"})})]})]}),E.jsxs("div",{className:"grid grid-cols-7 px-1.5 sm:px-3 pb-3 sm:pb-5 pt-3 gap-0.5 sm:gap-1 flex-1 content-start",children:[c.map(f=>E.jsx("div",{className:"text-center text-[10px] font-black py-2 uppercase text-emerald-600 tracking-[0.1em]",children:f},f)),Array.from({length:i}).map((f,d)=>E.jsx("div",{className:"h-8"},`e-${d}`)),Array.from({length:s}).map((f,d)=>{const p=d+1,m=e.clone().date(p).format("YYYY-MM-DD"),v=m===u,g=m===r,y=e.clone().date(p).day()===0;return E.jsxs("button",{onClick:()=>t(m),className:`h-8 w-full flex flex-col items-center justify-center text-[11px] font-black rounded-lg transition-all relative
                ${g?"bg-slate-900 text-white shadow-md ring-2 ring-slate-900 ring-offset-1":""}
                ${v&&!g?"bg-blue-600 text-white shadow-sm":""}
                ${y&&!g&&!v?"text-red-500":""}
                ${!g&&!v&&!y?"text-slate-700 hover:bg-white/50":""}
              `,children:[p,v&&!g&&E.jsx("span",{className:"absolute bottom-1 w-1 h-1 bg-white rounded-full"})]},p)})]})]})},xx=()=>{const{user:r}=nu(),{showToast:t}=Kl(),[e,n]=ce.useState(ye().format("YYYY-MM-DD")),[a,o]=ce.useState(null),[i,s]=ce.useState(null),[u,c]=ce.useState([]),[l,h]=ce.useState(""),[f,d]=ce.useState("1. "),[p,m]=ce.useState(!1),[v,g]=ce.useState([]),[y,b]=ce.useState([]),[x,w]=ce.useState(!0),[C,N]=ce.useState(!1),I=ce.useRef(null),R=ce.useRef(null),[S,F]=ce.useState(!1),[A,W]=ce.useState("in"),[B,O]=ce.useState(!1),[U,z]=ce.useState(null),[j,G]=ce.useState(!1),[q,X]=ce.useState(0),[$,ae]=ce.useState(!1),se=ce.useRef(null),[oe,pe]=ce.useState(null),[he,de]=ce.useState("Fetching location..."),[we,De]=ce.useState(!1),[ge,_e]=ce.useState(!1),[xe,Re]=ce.useState(""),[Ie,Se]=ce.useState(""),[bt,wt]=ce.useState(""),[nt,Nt]=ce.useState(null),[ot,Dt]=ce.useState(""),[Ct,$t]=ce.useState(null),[_t,On]=ce.useState(!1);ce.useEffect(()=>{(async()=>{try{await lt.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"),G(!0)}catch(re){console.error("Biometric models failed to load",re)}})(),un()},[r==null?void 0:r.id]),ce.useEffect(()=>{r!=null&&r.id&&(sr(),ir())},[e,r==null?void 0:r.id]),ce.useEffect(()=>(S?(ur(),A==="in"&&cr()):Wa(),()=>Wa()),[S,A]);const un=async()=>{if(r!=null&&r.id){w(!0);try{await Promise.all([rt(),or(),La(),ir(),sr()])}catch(H){console.error("Dashboard mount fetch failed",H)}finally{w(!1)}}},rt=async()=>{var H;try{const re=ye().format("YYYY-MM-DD"),ve=await st.get(`/erp/attendance/history?startDate=${re}&endDate=${re}&employee_id=${r.id}`);((H=ve.data)==null?void 0:H.length)>0?o(ve.data[0]):o(null)}catch{}},or=async()=>{try{const H=await st.get("/erp/office-settings");s(H.data)}catch{}},La=async()=>{try{const H=await st.get("erp/todo");c(Array.isArray(H.data)?H.data:[])}catch{}},ir=async()=>{try{const H=ye(e).startOf("month").format("YYYY-MM-DD"),re=ye(e).endOf("month").format("YYYY-MM-DD"),ve=await st.get(`erp/work-report?startDate=${H}&endDate=${re}&employee_id=${r.id}`);g(Array.isArray(ve.data)?ve.data:[])}catch{}},sr=async()=>{try{const H=ye(e).startOf("month").format("YYYY-MM-DD"),re=ye(e).endOf("month").format("YYYY-MM-DD"),ve=await st.get(`/erp/attendance/history?startDate=${H}&endDate=${re}&employee_id=${r.id}`);b(Array.isArray(ve.data)?ve.data:[])}catch{}},ur=()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(async H=>{const re={lat:H.coords.latitude,lng:H.coords.longitude};pe(re),await lr(re.lat,re.lng)},()=>de("Location Access Denied"))},cr=async()=>{O(!0),z(null);try{const H=await navigator.mediaDevices.getUserMedia({video:!0});I.current&&(I.current.srcObject=H,I.current.onloadedmetadata=()=>{I.current.play(),A==="in"&&_l()})}catch{t("Camera access denied","error"),O(!1)}},lr=async(H,re)=>{try{const it=await(await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${H},${re}&key=`)).json();it.status==="OK"&&it.results.length>0?de(it.results[0].formatted_address):de(`${H.toFixed(4)}, ${re.toFixed(4)}`)}catch{de(`${H.toFixed(4)}, ${re.toFixed(4)}`)}},_l=()=>{se.current&&clearInterval(se.current),se.current=setInterval(async()=>{I.current&&j&&A==="in"&&((await px(I.current,new dl({inputSize:224,scoreThreshold:.1}))).length>0?(ae(!0),X(0)):X(re=>{const ve=re+1;return ve>3&&ae(!1),ve}))},150)},Wa=()=>{var H;se.current&&(clearInterval(se.current),se.current=null),(H=I.current)!=null&&H.srcObject&&(I.current.srcObject.getTracks().forEach(re=>re.stop()),I.current.srcObject=null),O(!1),ae(!1),X(0)},ja=()=>{F(!1),Wa(),z(null)},Gi=async(H=!1)=>{var ve,at,it,Or;if(he==="Fetching location...")return t("Please wait, fetching your location...","warning");if(!oe)return t("Location could not be determined. Please enable GPS.","warning");let re=U;if(A==="in"){if(!$)return t("Face not detected","warning");const Et=R.current,Jt=Et.getContext("2d");Et.width=400,Et.height=300,Jt.save(),Jt.translate(Et.width,0),Jt.scale(-1,1),Jt.drawImage(I.current,0,0,400,300),Jt.restore(),re=Et.toDataURL("image/jpeg")}N(!0);try{const Et=A==="in"?"erp/attendance/in":"erp/attendance/out",Jt={location:he||"Unknown",photo:re,lat:oe==null?void 0:oe.lat,lng:oe==null?void 0:oe.lng};H&&(Jt.force=!0,Jt.force_reason=Ie);const bx=await st.post(Et,Jt),Xi=ye(),Yi=Xi.format("hh:mm A");A==="in"?t(`✅ Attendance Marked Successfully

👤 Employee: ${r.full_name}
📅 Date: ${Xi.format("DD MMMM YYYY (dddd)")}
🕒 Time: ${Yi}
📍 Location: ${he||"Verified"}`,"success"):t(`✔️ ${r.full_name} logged out from work at ${Yi}${H?`
Reason: `+Ie:""}`,"info"),ja(),De(!1),Se(""),rt(),sr()}catch(Et){(at=(ve=Et.response)==null?void 0:ve.data)!=null&&at.requireForce?(t(Et.response.data.message,"warning"),wt(Et.response.data.message),De(!0),ja()):t(((Or=(it=Et.response)==null?void 0:it.data)==null?void 0:Or.message)||"Error","error")}finally{N(!1)}},El=async()=>{var H,re;if(!xe.trim())return t("Please enter a reason for the break","warning");N(!0);try{await st.post("erp/attendance/break",{reason:xe});const ve=ye().format("hh:mm A");t(`🔴 ${r==null?void 0:r.full_name} took a break at ${ve}
Reason: ${xe}`,"info"),_e(!1),Re(""),rt()}catch(ve){t(((re=(H=ve.response)==null?void 0:H.data)==null?void 0:re.message)||"Error starting break","error")}finally{N(!1)}},kl=async()=>{var H,re;N(!0);try{await st.post("erp/attendance/resume");const ve=ye().format("hh:mm A");t(`🟢 ${r==null?void 0:r.full_name} resumed work at ${ve}`,"success"),rt()}catch(ve){t(((re=(H=ve.response)==null?void 0:H.data)==null?void 0:re.message)||"Error resuming work","error")}finally{N(!1)}},Il=async H=>{if(H.preventDefault(),!!l.trim())try{const{data:re}=await st.post("erp/todo",{task:l});c([re,...u]),h(""),t("Task added","success")}catch{t("Error adding task","error")}},Rl=async(H,re)=>{const ve=re==="completed"?"pending":"completed";try{await st.put(`erp/todo/${H}`,{status:ve}),c(u.map(at=>at.id===H?{...at,status:ve}:at))}catch{}},Sl=async H=>{$t(H);try{await st.delete(`erp/todo/${H}`),c(u.filter(re=>re.id!==H)),t("Task removed","success")}catch{t("Could not remove task","error")}finally{$t(null)}},Hi=async H=>{if(ot.trim()){On(!0);try{await st.put(`/erp/todo/${H}/edit`,{task:ot}),c(u.map(re=>re.id===H?{...re,task:ot}:re)),Nt(null),t("Task updated","success")}catch{t("Could not update task","error")}finally{On(!1)}}},Nl=H=>{Nt(H.id),Dt(H.task)},Dl=H=>{if(H.key==="Enter"){H.preventDefault();const re=f.split(`
`),at=re[re.length-1].match(/^(\d+)\.\s/);if(at){const it=parseInt(at[1])+1;d(Or=>Or+`
`+it+". ")}else d(it=>it+`
1. `)}},Al=async()=>{var H,re;if(f.trim()==="1."||f.trim()==="")return t("Report content required","warning");m(!0);try{await st.post("erp/work-report",{report_content:f,date:ye().format("YYYY-MM-DD")}),t("Daily report submitted","success"),d("1. "),ir()}catch(ve){t(((re=(H=ve.response)==null?void 0:H.data)==null?void 0:re.message)||"Error","error")}finally{m(!1)}},qi=(a==null?void 0:a.current_work_status)==="start",Ki=(a==null?void 0:a.current_work_status)==="stop";u.filter(H=>H.status!=="completed").length,u.filter(H=>H.status==="completed").length;const za=v.find(H=>ye(H.date).format("YYYY-MM-DD")===ye(e).format("YYYY-MM-DD"));return E.jsxs("div",{className:"space-y-4 max-w-[1600px] mx-auto pb-10 relative min-h-[400px]",children:[E.jsx(ru,{loading:x,title:"Building Your Workspace..."}),E.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-10 gap-4 items-stretch",children:[E.jsx("div",{className:"lg:col-span-10 xl:col-span-6 flex flex-col gap-4",children:E.jsxs("div",{className:"flex flex-col md:flex-row gap-4 items-stretch h-full",children:[E.jsx("div",{className:"w-full md:w-[320px] shrink-0 h-[340px] md:h-full",children:E.jsx(gx,{selectedDate:e,onSelectDate:n})}),E.jsxs("div",{className:"flex-1 bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full min-h-[340px] hover:shadow-md transition-all duration-300",children:[E.jsxs("div",{className:"px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between",children:[E.jsxs("div",{children:[E.jsxs("h3",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2",children:["Office Timing ",E.jsx("span",{className:"text-[8px] text-rose-400",children:"(Sunday Off)"})]}),E.jsx("div",{className:"flex flex-wrap items-center gap-2",children:E.jsxs("div",{className:"p-1 px-2 bg-blue-50 rounded-md flex items-center gap-1.5 border border-blue-100/50 shadow-sm",children:[E.jsx(Ua,{size:12,className:"text-blue-500"}),E.jsxs("span",{className:"text-[10px] sm:text-[11px] font-black text-slate-700 whitespace-nowrap",children:[i!=null&&i.office_in_time?E.jsx("span",{className:"text-emerald-600",children:ye(i.office_in_time,"HH:mm:ss").format("hh:mm A")}):"--",E.jsx("span",{className:"mx-1 text-slate-300",children:"→"}),i!=null&&i.office_out_time?E.jsx("span",{className:"text-rose-600",children:ye(i.office_out_time,"HH:mm:ss").format("hh:mm A")}):"--"]})]})})]}),E.jsx("div",{className:`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-md transition-all ${(a==null?void 0:a.status)==="present"?"bg-emerald-500 text-white border-emerald-400":(a==null?void 0:a.status)==="absent"?"bg-rose-500 text-white border-rose-400":"bg-amber-500 text-white border-amber-400"}`,children:(a==null?void 0:a.status)||"Pending"})]}),E.jsxs("div",{className:"p-4 flex-1 flex flex-col justify-center",children:[E.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5",children:[E.jsxs("div",{className:"bg-emerald-50 border border-emerald-100 p-2.5 rounded-md flex flex-row sm:flex-col items-center sm:justify-center justify-between",children:[E.jsx("span",{className:"text-[8px] font-black text-emerald-500 uppercase tracking-widest sm:mb-1 leading-none",children:"In Time"}),E.jsx("span",{className:"text-sm font-black text-emerald-700",children:a!=null&&a.in_time?ye(a.in_time,"HH:mm:ss").format("hh:mm A"):"--:--"})]}),E.jsxs("div",{className:"bg-amber-50 border border-amber-100 p-2.5 rounded-md flex flex-row sm:flex-col items-center sm:justify-center justify-between",children:[E.jsx("span",{className:"text-[8px] font-black text-amber-500 uppercase tracking-widest sm:mb-1 leading-none",children:"Out Time"}),E.jsx("span",{className:"text-sm font-black text-amber-700",children:a!=null&&a.out_time?ye(a.out_time,"HH:mm:ss").format("hh:mm A"):"--:--"})]})]}),E.jsxs("div",{className:"text-center mb-6",children:[E.jsx("p",{className:"text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5",children:"Work Hours"}),qi?E.jsxs("div",{className:"flex flex-col items-center",children:[E.jsxs("div",{className:"flex items-center justify-center gap-1.5 text-emerald-600 mb-1",children:[E.jsx("span",{className:"w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"}),E.jsx(mx,{startTime:a==null?void 0:a.in_time,className:"text-4xl font-black tracking-tighter tabular-nums leading-none"})]}),E.jsxs("p",{className:"text-[11px] font-black text-blue-600 tabular-nums uppercase tracking-tight",children:["Total Worked: ",(a==null?void 0:a.total_work_hours)||"00:00:00"]})]}):E.jsx("h2",{className:"text-2xl font-black text-slate-900 tracking-tighter tabular-nums leading-none",children:(a==null?void 0:a.total_work_hours)||"00:00:00"})]}),E.jsx("div",{className:"grid grid-cols-2 gap-2",children:qi?E.jsxs(E.Fragment,{children:[E.jsxs("button",{onClick:()=>{W("out"),F(!0)},className:"bg-gradient-to-br from-rose-500 to-rose-700 text-white h-9 rounded-md text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-rose-200 transition-all flex items-center justify-center gap-1.5 active:scale-95",children:[E.jsx($i,{size:12})," Punch Out"]}),E.jsxs("button",{onClick:()=>{Re(""),_e(!0)},className:"border-2 border-amber-200 text-amber-600 h-9 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-amber-50 transition-all flex items-center justify-center gap-1.5 active:scale-95",children:[E.jsx(Ua,{size:12})," Break"]})]}):(a==null?void 0:a.current_work_status)==="break"?E.jsxs("button",{onClick:kl,className:"col-span-2 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white h-9 rounded-md text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95",children:[E.jsx(wn,{size:12})," Resume Work"]}):E.jsx("button",{onClick:()=>{W("in"),F(!0)},disabled:Ki&&(a==null?void 0:a.in_time),className:"col-span-2 bg-gradient-to-br from-slate-800 to-slate-950 text-white h-9 rounded-md text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-slate-200 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95",children:Ki?E.jsxs(E.Fragment,{children:[E.jsx(hr,{size:12,className:"text-emerald-400"}),"You are signed out"]}):E.jsxs(E.Fragment,{children:[E.jsx(Ml,{size:12})," Punch In"]})})})]})]})]})}),E.jsxs("div",{className:"lg:col-span-4 bg-[#fff1f2]/60 border border-[#fecdd3]/60 rounded-md shadow-sm flex flex-col overflow-hidden h-full min-h-[340px]",children:[E.jsxs("div",{className:"px-4 py-2 border-b border-[#fecdd3]/40 flex items-center justify-between bg-white/40",children:[E.jsxs("h3",{className:"text-[10px] font-black text-[#9f1239] uppercase tracking-[0.2em] flex items-center gap-2",children:[E.jsx(tu,{size:12,className:"text-[#fb7185]"}),ye(e).isSame(ye(),"day")?"Today's Work Report":`Work Report: ${ye(e).format("DD MMM")}`]}),za&&E.jsxs("span",{className:"flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100",children:[E.jsx(hr,{size:10})," SUBMITTED"]})]}),E.jsx("div",{className:"p-4 flex-1 flex flex-col relative",children:za?E.jsx("div",{className:"flex-1 bg-white/40 rounded border border-[#fecdd3]/20 p-4 text-[11px] font-medium text-[#881337] whitespace-pre-wrap leading-[2] overflow-y-auto custom-scrollbar",children:za.report_content}):E.jsxs("div",{className:"flex-1 flex flex-col",children:[E.jsx("textarea",{value:f,onKeyDown:Dl,onChange:H=>d(H.target.value),placeholder:"1. _________",className:"flex-1 bg-transparent border-none text-[11px] font-bold text-slate-700 leading-[2.18] focus:ring-0 resize-none p-0 placeholder:text-[#fecdd3]",style:{backgroundImage:"repeating-linear-gradient(transparent, transparent 23px, #fecdd3 23px, #fecdd3 24px)",backgroundSize:"100% 24px",backgroundAttachment:"local"}}),E.jsx("button",{onClick:Al,disabled:p,className:"mt-4 w-full bg-[#e11d48] text-white h-8 rounded text-[9px] font-black uppercase tracking-widest hover:bg-[#be123c] transition-all disabled:opacity-50 shadow-sm flex items-center justify-center gap-2",children:p?E.jsx(wn,{size:11,className:"animate-spin"}):E.jsxs(E.Fragment,{children:[E.jsx(Pl,{size:11})," Submit Report"]})})]})})]})]}),E.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-10 gap-4 mt-4",children:[E.jsxs("div",{className:"lg:col-span-4 bg-[#fefce8] border border-[#fde68a] rounded-md shadow-sm relative overflow-hidden flex flex-col min-h-[340px]",children:[E.jsxs("div",{className:"absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center group pointer-events-none z-10",children:[E.jsx("div",{className:"w-1.5 h-1.5 bg-slate-800 rounded-full shadow-sm mb-[1px]"}),E.jsx("div",{className:"w-4 h-4 bg-rose-500 rounded-full shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.2)]"})]}),E.jsx("div",{className:"px-5 pt-8 pb-3 flex items-center justify-between",children:E.jsxs("h3",{className:"text-[10px] font-black text-amber-900 uppercase tracking-[0.2em] flex items-center gap-2",children:[E.jsx(Ji,{size:12,className:"text-amber-600"})," To-Do List"]})}),E.jsxs("div",{className:"px-5 pb-5 flex-1 flex flex-col",children:[E.jsxs("form",{onSubmit:Il,className:"flex gap-2 mb-4 border-b border-amber-300/50 pb-2",children:[E.jsx("input",{value:l,onChange:H=>h(H.target.value),placeholder:"Add to list...",className:"flex-1 bg-transparent border-none text-[11px] font-bold text-amber-900 placeholder:text-amber-300 outline-none p-0 focus:ring-0"}),E.jsx("button",{type:"submit",className:"text-amber-500 hover:text-amber-700 transition-colors",children:E.jsx(Ol,{size:16,strokeWidth:3})})]}),E.jsx("div",{className:"space-y-0 flex-1 overflow-y-auto custom-scrollbar",children:u.length>0?u.map(H=>E.jsxs("div",{className:"group flex items-center gap-3 py-2 border-b border-blue-100 border-dashed last:border-0 hover:bg-white/20 transition-colors px-1 -mx-1",children:[E.jsx("button",{onClick:()=>Rl(H.id,H.status),className:"shrink-0 transition-transform active:scale-90",children:H.status==="completed"?E.jsx(hr,{size:15,className:"text-emerald-500"}):E.jsx(Bl,{size:15,className:"text-amber-300 hover:text-amber-500"})}),nt===H.id?E.jsxs("div",{className:"flex-1 flex gap-1 items-center bg-white/50 p-1 rounded border border-amber-200 shadow-inner",children:[E.jsx("input",{value:ot,onChange:re=>Dt(re.target.value),onKeyDown:re=>{re.key==="Enter"&&Hi(H.id),re.key==="Escape"&&Nt(null)},className:"flex-1 bg-transparent border-none text-[11px] font-bold text-amber-900 outline-none p-0 focus:ring-0",autoFocus:!0}),E.jsx("button",{onClick:()=>Hi(H.id),disabled:_t,className:"text-emerald-500 hover:text-emerald-700 transition-colors p-0.5",children:_t?E.jsx(wn,{size:12,className:"animate-spin"}):E.jsx(hr,{size:12})}),E.jsx("button",{onClick:()=>Nt(null),className:"text-rose-400 hover:text-rose-600 transition-colors p-0.5",children:E.jsx(Qi,{size:12})})]}):E.jsxs(E.Fragment,{children:[E.jsx("span",{className:`flex-1 text-[11px] font-bold tracking-tight ${H.status==="completed"?"text-amber-300 line-through":"text-amber-900/80"}`,children:H.task}),E.jsxs("div",{className:"flex items-center gap-1",children:[E.jsx("button",{onClick:()=>Nl(H),className:"text-amber-400 hover:text-blue-500 p-1",children:E.jsx(Ll,{size:11})}),E.jsx("button",{onClick:()=>Sl(H.id),disabled:Ct===H.id,className:"text-amber-400 hover:text-rose-500 p-1",children:Ct===H.id?E.jsx(wn,{size:11,className:"animate-spin text-rose-500"}):E.jsx(Wl,{size:11})})]})]})]},H.id)):E.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center opacity-30 select-none",children:[E.jsx(Ji,{size:32,className:"text-amber-900 mb-2"}),E.jsx("span",{className:"text-[9px] font-black uppercase tracking-widest",children:"No pending tasks"})]})})]})]}),E.jsxs("div",{className:"lg:col-span-6 bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full",children:[E.jsxs("div",{className:"px-4 py-2 border-b border-slate-100 bg-slate-50/20 flex items-center justify-between shrink-0",children:[E.jsxs("h3",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",children:[E.jsx(Zi,{size:12,className:"text-blue-400"})," Attendance Record"]}),E.jsx("span",{className:"text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-0.5 rounded-full",children:ye(e).format("MMMM YYYY")})]}),E.jsx("div",{className:"flex-1 overflow-x-auto custom-scrollbar",children:E.jsx("div",{className:"min-w-[600px] lg:min-w-full",children:E.jsxs("table",{className:"w-full text-left border-collapse",children:[E.jsx("thead",{className:"sticky top-0 z-10",children:E.jsxs("tr",{className:"bg-blue-900",children:[E.jsx("th",{className:"px-4 py-3 text-[9px] font-black text-yellow-400 uppercase tracking-widest",children:"Date"}),E.jsx("th",{className:"px-4 py-3 text-[9px] font-black text-yellow-400 uppercase tracking-widest text-center",children:"In Time"}),E.jsx("th",{className:"px-4 py-3 text-[9px] font-black text-yellow-400 uppercase tracking-widest text-center",children:"Out Time"}),E.jsx("th",{className:"px-4 py-3 text-[9px] font-black text-yellow-400 uppercase tracking-widest text-center",children:"Worked"}),E.jsx("th",{className:"px-4 py-3 text-[9px] font-black text-yellow-400 uppercase tracking-widest text-center",children:"Status"})]})}),E.jsx("tbody",{className:"divide-y divide-slate-50 text-[10px]",children:y.length>0?y.map(H=>E.jsxs("tr",{className:"hover:bg-slate-50/50 transition-colors group",children:[E.jsxs("td",{className:"px-4 py-2.5 font-bold text-slate-700 whitespace-nowrap",children:[ye(H.date).format("DD MMM")," ",E.jsx("span",{className:"text-slate-300 ml-1.5 font-medium",children:ye(H.date).format("ddd")})]}),E.jsx("td",{className:"px-4 py-2.5 text-center text-slate-500 font-bold tabular-nums",children:H.in_time?ye(H.in_time,"HH:mm:ss").format("hh:mm A"):"--"}),E.jsx("td",{className:"px-4 py-2.5 text-center text-slate-500 font-bold tabular-nums",children:H.out_time?ye(H.out_time,"HH:mm:ss").format("hh:mm A"):"--"}),E.jsx("td",{className:"px-4 py-2.5 text-center font-black text-slate-900 tracking-tight tabular-nums",children:H.total_work_hours||"--"}),E.jsx("td",{className:"px-4 py-2.5 text-center",children:E.jsx("div",{className:"flex items-center justify-center",children:E.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${H.status==="present"?"bg-emerald-500":"bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]"}`,title:H.status.toUpperCase()})})})]},H.id)):E.jsx("tr",{children:E.jsxs("td",{colSpan:"5",className:"py-20 text-center",children:[E.jsx(Zi,{size:24,className:"mx-auto text-slate-100 mb-2"}),E.jsx("p",{className:"text-[9px] font-black text-slate-200 uppercase tracking-widest",children:"No archival records found"})]})})})]})})})]})]}),S&&E.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm",children:[E.jsxs("div",{className:"bg-white rounded-md shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200",children:[E.jsxs("div",{className:"px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between",children:[E.jsxs("h3",{className:"font-black text-slate-900 text-[10px] uppercase tracking-widest flex items-center gap-2",children:[E.jsx(Va,{size:12,className:"text-blue-600"}),"Punch ",A==="in"?"In":"Out"," Verification"]}),E.jsx("button",{onClick:ja,className:"text-slate-400 hover:text-slate-900 transition-colors",children:E.jsx(Qi,{size:18})})]}),E.jsxs("div",{className:"p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6",children:[E.jsxs("div",{className:"space-y-4",children:[A==="in"?E.jsx("div",{className:"space-y-4 relative",children:E.jsxs("div",{className:`relative aspect-[4/3] bg-slate-900 rounded overflow-hidden border-2 transition-all duration-500 ${$?"border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]":"border-slate-800"}`,children:[E.jsx("video",{ref:I,autoPlay:!0,className:"w-full h-full object-cover scale-x-[-1]"}),E.jsx("div",{className:"absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-[scan_2s_linear_infinite] opacity-80 pointer-events-none z-20"}),!$&&E.jsx("div",{className:"absolute inset-x-0 bottom-4 flex justify-center z-30",children:E.jsx("div",{className:"bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 animate-[blink_1.5s_infinite]",children:E.jsx("p",{className:"text-[8px] font-black text-amber-400 uppercase tracking-[0.2em]",children:"Position face in frame"})})}),$&&E.jsxs("div",{className:"absolute top-4 right-4 flex items-center gap-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-[8.5px] font-black tracking-widest shadow-lg z-30",children:[E.jsx(hr,{size:12})," VERIFICATION COMPLETE"]})]})}):E.jsxs("div",{className:"aspect-[4/3] bg-slate-50 rounded-sm border border-slate-100 flex flex-col items-center justify-center text-slate-400",children:[E.jsx($i,{size:48,className:"opacity-10 mb-4"}),E.jsx("p",{className:"text-[10px] font-black uppercase tracking-widest text-slate-500",children:"Standard Punch Out"}),E.jsx("p",{className:"text-[9px] text-slate-300 mt-1 uppercase font-bold tracking-tighter",children:"No biometric data required"})]}),E.jsxs("div",{className:"p-3 bg-slate-50 border border-slate-100 rounded flex items-start gap-2.5",children:[E.jsx(jl,{size:14,className:"text-rose-500 shrink-0 mt-0.5"}),E.jsxs("div",{children:[E.jsx("p",{className:"text-[8px] font-black text-slate-400 uppercase tracking-widest",children:"Verified Geolocation"}),E.jsx("p",{className:"text-[10px] text-slate-600 font-bold mt-0.5 leading-tight",children:he})]})]})]}),E.jsxs("div",{className:"flex flex-col h-full bg-slate-50/50 p-4 border-l border-slate-100",children:[E.jsxs("div",{className:"flex-1 space-y-6",children:[E.jsxs("div",{className:"space-y-4",children:[E.jsxs("div",{className:"flex justify-between items-center border-b border-slate-100 pb-3",children:[E.jsxs("div",{children:[E.jsx("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest",children:"Service Type"}),E.jsxs("h4",{className:"text-sm font-black text-slate-900",children:["Punch ",A==="in"?"IN":"OUT"]})]}),E.jsxs("div",{className:"text-right",children:[E.jsx("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest",children:"Date"}),E.jsxs("h4",{className:"text-[11px] font-black text-slate-900",children:[ye().format("DD-MM-YYYY")," (",ye().format("ddd").toUpperCase(),")"]})]})]}),E.jsxs("div",{className:"flex justify-between items-center pt-1",children:[E.jsxs("div",{children:[E.jsx("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest",children:"Current Time"}),E.jsx("h4",{className:"text-sm font-black text-slate-900 tabular-nums",children:ye().format("hh:mm:ss A")})]}),E.jsxs("div",{className:"text-right",children:[E.jsx("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest",children:"Remark"}),(()=>{const H=ye();if(A==="in"){if(!(i!=null&&i.office_in_time))return E.jsx("h4",{className:"text-[10px] font-black text-slate-400",children:"N/A"});const re=ye(i.office_in_time,"HH:mm:ss"),ve=H.diff(re,"minutes");if(ve>0){const at=Math.floor(ve/60),it=ve%60;return E.jsxs("h4",{className:"text-[10px] font-black text-rose-600",children:["LATE: ",at,"h ",it,"m"]})}return E.jsx("h4",{className:"text-[10px] font-black text-emerald-600",children:"ON TIME"})}else{if(!(i!=null&&i.office_out_time))return E.jsx("h4",{className:"text-[10px] font-black text-slate-400",children:"N/A"});const ve=ye(i.office_out_time,"HH:mm:ss").diff(H,"minutes");if(ve>0){const at=Math.floor(ve/60),it=ve%60;return E.jsxs("h4",{className:"text-[10px] font-black text-rose-500 underline decoration-rose-200",children:["EARLY BY: ",at,"h ",it,"m"]})}return E.jsx("h4",{className:"text-[10px] font-black text-emerald-600",children:"ON TIME"})}})()]})]})]}),E.jsx("div",{className:"bg-white border border-slate-200 p-4 rounded-lg shadow-sm",children:E.jsxs("p",{className:"text-[11px] font-bold text-slate-600 leading-relaxed text-center",children:["Attendance will be marked for"," ",E.jsx("span",{className:"text-blue-600 font-black",children:ye().format("DD MMMM YYYY")})," ","at the current verified location."]})})]}),E.jsx("button",{onClick:()=>Gi(!1),disabled:C||A==="in"&&!$||he==="Fetching location..."||he==="Location Access Denied",className:`w-full h-12 rounded text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${A==="in"?"bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-100 disabled:text-slate-300":"bg-rose-600 hover:bg-rose-700 text-white"}`,children:C?E.jsxs(E.Fragment,{children:[E.jsx(wn,{size:14,className:"animate-spin"}),E.jsx("span",{className:"animate-pulse",children:"Attendance being marked..."})]}):`Execute Punch ${A.toUpperCase()}..`})]})]})]}),E.jsx("canvas",{ref:R,style:{display:"none"},width:"400",height:"300"})]}),we&&E.jsx("div",{className:"fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm",children:E.jsxs("div",{className:"bg-white rounded shadow-2xl max-w-md w-full p-6 border border-slate-200",children:[E.jsxs("div",{className:"flex items-center gap-3 text-rose-600 mb-4 pb-3 border-b border-rose-50",children:[E.jsx(Va,{size:16,className:"text-rose-500"}),E.jsxs("h3",{className:"font-black text-[11px] uppercase tracking-[0.2em]",children:["Punch ",A==="in"?"In":"Out"," Warning"]})]}),E.jsx("p",{className:"text-[11px] font-bold text-slate-600 mb-4 leading-relaxed",children:bt}),E.jsxs("div",{className:"mb-5",children:[E.jsx("label",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block",children:"Mandatory Justification"}),E.jsx("textarea",{value:Ie,onChange:H=>Se(H.target.value),placeholder:"Specify reason for non-standard logout...",rows:4,className:"w-full p-3 rounded bg-slate-50 border border-slate-200 text-[11px] font-bold outline-none focus:border-rose-400 focus:bg-white transition-all placeholder:text-slate-300 resize-none"})]}),E.jsxs("div",{className:"flex justify-end gap-3",children:[E.jsx("button",{onClick:()=>De(!1),className:"px-5 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 rounded hover:bg-slate-50 transition-colors",children:"Cancel"}),E.jsxs("button",{onClick:()=>Gi(!0),disabled:!Ie.trim()||C,className:"px-5 py-2 bg-rose-600 text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 disabled:opacity-50 flex items-center gap-2 shadow-md transition-all active:scale-95",children:[C?E.jsx(wn,{size:12,className:"animate-spin"}):E.jsx(Va,{size:12}),"Authorize ",A==="in"?"Punch In":"Logout"]})]})]})}),ge&&E.jsx("div",{className:"fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm",children:E.jsxs("div",{className:"relative bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden border border-slate-200",children:[E.jsx("div",{className:"bg-slate-950 p-4 border-b border-white/5",children:E.jsxs("h3",{className:"text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] flex items-center gap-2",children:[E.jsx(Ua,{size:12})," Taking a Break"]})}),E.jsxs("div",{className:"p-6",children:[E.jsx("p",{className:"text-[11px] font-bold text-slate-500 mb-4 leading-relaxed",children:"Please specify the reason for taking a break from your active session."}),E.jsxs("div",{className:"space-y-4",children:[E.jsx("textarea",{value:xe,onChange:H=>Re(H.target.value),placeholder:"e.g. Lunch Break, Client Meeting, Personal Work...",rows:3,className:"w-full p-4 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-bold outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300 resize-none",autoFocus:!0}),E.jsxs("div",{className:"flex justify-center gap-2",children:[E.jsx("button",{onClick:()=>_e(!1),className:"px-6 h-10 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors",children:"Cancel"}),E.jsx("button",{onClick:El,disabled:!xe.trim()||C,className:"px-8 h-10 bg-amber-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 disabled:opacity-50 shadow-lg shadow-amber-200/50 flex items-center gap-2 transition-all active:scale-95",children:C?E.jsx(wn,{size:12,className:"animate-spin"}):"Confirm Break"})]})]})]})]})})]})},yx=()=>{var s;const[r,t]=ce.useState(null),[e,n]=ce.useState(!0),[a,o]=ce.useState("");ce.useEffect(()=>{(async()=>{try{await lt.tinyFaceDetector.loadFromUri("/models/tiny_face_detector")}catch(c){console.error("Models failed",c)}})()},[]),ce.useEffect(()=>{i()},[]);const i=async()=>{var u,c;try{n(!0),o("");const{data:l}=await st.get("/admin/stats");t(l)}catch(l){o(((c=(u=l.response)==null?void 0:u.data)==null?void 0:c.message)||l.message||"Failed to load data")}finally{n(!1)}};return E.jsxs("div",{className:"space-y-5 relative min-h-[400px]",children:[E.jsx(ru,{loading:e,title:"Loading Analytics..."}),E.jsxs("div",{className:"flex justify-between items-center bg-white p-5 border border-slate-200 rounded-lg shadow-sm",children:[E.jsxs("div",{children:[E.jsx("h2",{className:"text-sm font-bold text-slate-800",children:"Platform Analytics"}),E.jsx("p",{className:"text-[10px] font-medium text-slate-400 mt-0.5",children:"Real-time performance metrics"})]}),E.jsxs("div",{className:"flex items-center gap-3",children:[a&&E.jsxs("span",{className:"text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100",children:["Error: ",a]}),E.jsxs("span",{className:"text-[10px] font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 uppercase tracking-wider",children:[E.jsx(zl,{size:12})," Online"]})]})]}),a&&E.jsxs("div",{className:"bg-rose-50 border border-rose-200 p-6 rounded-lg text-center",children:[E.jsx("p",{className:"text-rose-800 font-bold text-sm mb-3",children:a}),E.jsx("button",{onClick:i,className:"bg-rose-600 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-all",children:"Try Again"})]}),r&&E.jsxs(E.Fragment,{children:[E.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[E.jsx(Br,{title:"ACTIVE USERS",value:r.users||0,icon:Ul,index:3}),E.jsx(Br,{title:"TOTAL ORDERS",value:r.orders||0,icon:tu,index:5}),E.jsx(Br,{title:"TOTAL LEADS",value:r.leads||0,icon:Vl,index:7}),E.jsx(Br,{title:"SERVICES",value:r.products||0,icon:Gl,index:1})]}),E.jsxs("div",{className:"bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden",children:[E.jsx("div",{className:"px-5 py-4 border-b border-slate-100 flex justify-between items-center",children:E.jsx("h2",{className:"text-xs font-bold text-slate-700 uppercase tracking-wider",children:"Recent Orders"})}),E.jsx("div",{className:"overflow-x-auto",children:E.jsxs("table",{className:"w-full text-left border-collapse",children:[E.jsx("thead",{children:E.jsxs("tr",{className:"border-b border-slate-100 text-slate-400 text-[10px] uppercase font-bold tracking-wider bg-slate-50/50",children:[E.jsx("th",{className:"py-3 px-5 text-center w-14",children:"#"}),E.jsx("th",{className:"py-3 px-5",children:"Order ID"}),E.jsx("th",{className:"py-3 px-5",children:"Join Date"}),E.jsx("th",{className:"py-3 px-5",children:"Gross"}),E.jsx("th",{className:"py-3 px-5",children:"Monthly Sal."}),E.jsx("th",{className:"py-3 px-5",children:"UPI ID"}),E.jsx("th",{className:"py-3 px-5 text-right",children:"Amount"}),E.jsx("th",{className:"py-3 px-5",children:"Status"})]})}),E.jsx("tbody",{className:"text-xs text-slate-700 divide-y divide-slate-50",children:((s=r.recentOrders)==null?void 0:s.length)>0?r.recentOrders.map((u,c)=>{var l,h,f,d;return E.jsxs("tr",{className:"hover:bg-slate-50/80 transition-colors",children:[E.jsx("td",{className:"py-3 px-5 text-center text-slate-400 font-medium",children:c+1}),E.jsxs("td",{className:"py-3 px-5 font-bold text-slate-900",children:["#",u.id.substring(0,8).toUpperCase()]}),E.jsxs("td",{className:"py-3 px-5",children:[E.jsx("div",{className:"text-[11px] font-bold text-slate-900",children:new Date(u.createdAt).toLocaleDateString("en-GB")}),E.jsx("div",{className:"text-[9px] text-slate-400 font-medium",children:new Date(u.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})})]}),E.jsxs("td",{className:"py-3 px-5 font-bold text-slate-900",children:["₹",(((l=u.User)==null?void 0:l.gross_salary)||0).toLocaleString()]}),E.jsxs("td",{className:"py-3 px-5 font-bold text-emerald-600",children:["₹",Math.round((((h=u.User)==null?void 0:h.gross_salary)||0)/12).toLocaleString()]}),E.jsxs("td",{className:"py-3 px-5",children:[E.jsx("div",{className:"font-bold text-slate-800",children:(f=u.User)==null?void 0:f.full_name}),E.jsx("div",{className:"text-[10px] text-slate-400",children:(d=u.User)==null?void 0:d.email})]}),E.jsxs("td",{className:"py-3 px-5 text-right font-bold text-slate-900",children:["₹",u.amount]}),E.jsx("td",{className:"py-3 px-5",children:E.jsx("span",{className:`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${u.status==="Completed"?"bg-emerald-50 text-emerald-700 border-emerald-100":u.status==="In Progress"?"bg-blue-50 text-blue-700 border-blue-100":"bg-amber-50 text-amber-700 border-amber-100"}`,children:u.status})})]},u.id)}):E.jsx("tr",{children:E.jsx("td",{colSpan:"7",className:"py-10 text-center text-slate-400 font-bold uppercase text-[10px] tracking-wider",children:"No Records Found"})})})]})})]})]})]})},Ix=()=>{const{user:r}=nu(),[t,e]=ce.useState("my"),n=["admin","super_admin"].includes(r==null?void 0:r.role);return E.jsxs("div",{className:"space-y-4 md:space-y-5 font-sans p-2 md:p-0",children:[E.jsxs("div",{className:"flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm w-full md:w-fit overflow-x-auto no-scrollbar",children:[E.jsxs("button",{onClick:()=>e("my"),className:`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold transition-all ${t==="my"?"bg-blue-600 text-white shadow-sm":"text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`,children:[E.jsx(Tl,{size:14})," My Dashboard"]}),n&&E.jsxs("button",{onClick:()=>e("overview"),className:`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold transition-all ${t==="overview"?"bg-blue-600 text-white shadow-sm":"text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`,children:[E.jsx(Fl,{size:14})," Business Overview"]})]}),t==="my"?E.jsx(xx,{}):E.jsx(yx,{})]})},Cl=document.createElement("style");Cl.textContent=`
  @keyframes scan {
    0% { top: 0%; opacity: 0; }
    30% { opacity: 1; }
    70% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;document.head.appendChild(Cl);export{Ix as default};
