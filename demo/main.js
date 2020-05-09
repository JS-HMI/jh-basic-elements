var t,e,s,i;!function(t){t.Subscribed="SUBSCRIBED",t.Error="ERROR",t.Pending="PENDING",t.Warning="WARNING",t.Unsubscribed="UNSUBSCRIBED"}(t||(t={})),function(t){t.Ready="READY",t.Down="DOWN",t.Warming="WARMUP",t.Error="ERROR"}(e||(e={})),function(t){t.VarNotExist="VAR-NOT-EXIST",t.WontSubcribe="WONT-SUB",t.CantSubcribe="CANT-SUB",t.CantUnSubcribe="CANT-UNSUB",t.BadValue="BAD-VALUE",t.NoNetwork="NO-NETWORK",t.NetError="NET-ERROR",t.Unauthorized="UNAUTHORIZED",t.BadReq="BAD-REQUEST",t.ServerError="SERVER-ERROR",t.NotFound="NOT-FOUND",t.BadData="BAD-DATA",t.EngineNotExist="NO-ENGINE",t.UnknownError="UKNOWN"}(s||(s={})),function(t){t.Write="WRITE",t.Read="READ",t.Subscribe="SUBSCRIBE",t.Unsubscribe="UNSUBSCRIBE",t.Update="UPDATE",t.Init="INITIALIZE",t.Unknown="UNKNOWN"}(i||(i={}));class r{constructor(t,e,s="",i=""){if("string"!=typeof e)throw TypeError("Code must be a string");if("string"!=typeof t)throw TypeError("sysName must be a string");this.code=e,this.timestamp_ms=Date.now(),this.systemName=t,this.action=i||"",this.targetName=s||"",this.ack=!1,this.message=this.buildDefaultMessage()}buildDefaultMessage(){let t=`Error in system (${this.systemName})`;return""!==this.action&&(t+=" during "+this.action),""!==this.targetName&&(t+=` on target (${this.targetName})`),t+=`. Error Code: ${this.code}.`,t}}class n{constructor(t){this.system=t.system,this.name=t.name,this.value=null,this.status=null}}class a{constructor(t,e,s,i=null){this.error=null,this.success=t,this.name=e,this.value=i,this.system=s}setError(t,e=""){this.error={code:t,message:e}}}var o=(t,e)=>{const s=["sort","reverse","splice","pop","unshift","shift","push"];let i=!1;const r={get(t,e,s){try{return"prototype"===e?Reflect.get(t,e,s):new Proxy(t[e],r)}catch(i){return Reflect.get(t,e,s)}},defineProperty(t,s,r){const n=Reflect.defineProperty(t,s,r);return i||e(),n},deleteProperty(t,s){const r=Reflect.deleteProperty(t,s);return i||e(),r},apply(t,r,n){if(s.includes(t.name)){i=!0;const s=Reflect.apply(t,r,n);return e(),i=!1,s}return Reflect.apply(t,r,n)}};return new Proxy(t,r)},l=!1,h=!1;const c=new Map;class d{constructor(t){if(this.name=t,this.callbackMap=new Map,"string"!=typeof this.name)throw Error("Variable name must be a string.")}lock_callbacks(){if(l)throw this.unlock_callbacks(),Error("Forbidden multiple-update during an update callback loop.");l=!0}unlock_callbacks(){l=!1}_call_watchers(t){for(let e of this.callbackMap.values())void 0===t?e():e(t)}attachWatcher(t,e){if(null==t)throw Error("Target is undefined.");this.callbackMap.set(t,e)}detachWatcher(t){if(null==t)throw Error("Target is undefined.");this.callbackMap.delete(t)}}class u extends d{constructor(t,e){super(t),"function"==typeof e&&(this.usrDefined_transition=e)}usrDefined_transition(t){}applyTransition(t){this.lock_callbacks();try{h=!0,this.usrDefined_transition(t),h=!1,this._call_watchers(t);for(let t of c.values())t()}catch(t){throw c.clear(),this.unlock_callbacks(),new Error(t.message)}c.clear(),this.unlock_callbacks()}}class p extends d{constructor(t,e){super(t),this.type=typeof e,this.default_val=e,this._err_on_value="Wrong type assignment to state variable: "+this.name,this._valueProxy=void 0,this._auto_valueProxy=void 0,this.allowStandaloneAssign=!0,this.transitionMap=new Map;if(!["string","object","number","boolean"].includes(this.type))throw TypeError(this._err_on_value);this._val=this.GET()||this.CREATE(this.default_val),this._set_proxies()}_set_proxies(){"object"===this.type&&"object"==typeof this._val&&(this._valueProxy=o(this._val,this.updateWatcherIfAllowed.bind(this)),this._auto_valueProxy=o(this._val,this._markForWatchersUpdate.bind(this)))}set value(t){this._checkIsAllowed(),this._val=t,this._set_proxies(),h?this._markForWatchersUpdate():this.updateWatchers()}get value(){return h?"object"===this.type?this._auto_valueProxy:this._val:"object"===this.type?this._valueProxy:this._val}CREATE(t){if(typeof t!==this.type)throw TypeError(this._err_on_value);{let e="string"!==this.type?JSON.stringify(t):t;localStorage.setItem(this.name,e)}return t}UPDATE_DATA(){if(typeof this._val!==this.type)throw h&&(h=!1),l&&this.unlock_callbacks(),TypeError(this._err_on_value);{let t="string"!==this.type?JSON.stringify(this._val):this._val;localStorage.setItem(this.name,t)}}RESET(){this.value=this.default_val}GET(){let t=localStorage.getItem(this.name);if(null===t)return t;if("string"!==this.type&&(t=JSON.parse(t),typeof t!==this.type))throw TypeError("State variable: "+this.name+" is corrupted, returns type "+typeof t+" expecting "+this.type);return t}_markForWatchersUpdate(){this.UPDATE_DATA(),c.set(this,this._call_watchers.bind(this))}_checkIsAllowed(){if(!this.allowStandaloneAssign&&!h)throw h&&(h=!1),"StateVariable "+this.name+" is not allowed assignment outside a state transition"}updateWatcherIfAllowed(){this._checkIsAllowed(),this.updateWatchers()}updateWatchers(){this.lock_callbacks();try{this.UPDATE_DATA(),this._call_watchers()}catch(t){throw this.unlock_callbacks(),new Error(t.message)}this.unlock_callbacks()}addTransition(t,e){let s=new u(t);"function"==typeof e&&(s.usrDefined_transition=e.bind(this),this.transitionMap.set(t,s),this.allowStandaloneAssign=!1)}applyTransition(t,e){if(!this.transitionMap.has(t))throw Error(`Transition ${t} not found`);this.transitionMap.get(t).applyTransition(e)}}class m extends d{sendMessage(t){this._call_watchers(t)}}let y=(t,e)=>class extends e{constructor(){super(),this._transitionMap=new Map,this._messageMap=new Map,this._extractTransitions(),this._addGetterSetters()}_extractTransitions(){for(let e=0;e<t.length;e++){let s=t[e];if(s instanceof p)for(let e of s.transitionMap.values())t.push(e)}}applyTransition(t,e){if(!this._transitionMap.has(t))throw Error(`Transition ${t} not found`);this._transitionMap.get(t)(e)}sendMessageOnChannel(t,e){if(!this._messageMap.has(t))throw Error(`Message channel ${t} not found`);this._messageMap.get(t)(e)}_addGetterSetters(){for(let e of t)if(e instanceof p)"object"===e.type&&(this[`_${e.name}Proxy`]=o(e._val,()=>{throw e.name+" cannot be assigned from a custom element"})),Object.defineProperty(this,e.name,{set:t=>{throw e.name+" cannot be assigned from a custom element"},get:()=>"object"===e.type?this[`_${e.name}Proxy`]:e._val});else if(e instanceof m)this._messageMap.set(e.name,e.sendMessage.bind(e));else{if(!(e instanceof u))throw TypeError("Accept only StateVariable, StateTransition or Message.");this._transitionMap.set(e.name,e.applyTransition.bind(e))}}disconnectedCallback(){void 0!==super.disconnectedCallback&&super.disconnectedCallback();for(let e of t)e.detachWatcher(this)}},g=(t,e)=>class extends(y(t,e)){connectedCallback(){void 0!==super.connectedCallback&&super.connectedCallback();for(let e of t)e instanceof m?this["gotMessage_"+e.name]&&e.attachWatcher(this,this["gotMessage_"+e.name].bind(this)):e.attachWatcher(this,this._stateRequestUpdate(e.name).bind(this))}_stateRequestUpdate(t){return function(){this[`on_${t}_update`]&&this[`on_${t}_update`](),this.requestUpdate()}}};const{replace:f}="",b=/[&<>'"]/g,_={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},w=t=>_[t],v=t=>f.call(t,b,w);class S extends p{constructor(){super("datatree",{}),this.addTransition("create",this._create),this.addTransition("update",this._update),this.addTransition("multiupdate",this._multiupdate)}GetVar(t){return this.ExistVar(t)?this.value[t.system][t.name]:null}Create(t){this.applyTransition("create",t)}UpdateStatus(t,e){let s=new n(t);s.status=e,this.applyTransition("update",s)}Update(t){Array.isArray(t)?this.applyTransition("multiupdate",t):this.applyTransition("update",t)}_create(e){if(e&&"string"==typeof e.system&&"string"==typeof e.name){e.system=v(e.system),e.name=v(e.name);let s={status:null,value:null};s.status=t.Pending,this.value.hasOwnProperty(e.system)||(this.value[e.system]={}),this.value[e.system][e.name]=s}}_multiupdate(t){t.forEach(t=>{this._update(t)})}_update(t){this._checkVarType(t);let e=this.GetVar(t);if(!e)throw new Error("Requested Variable does not exist: "+t.name);"string"==typeof t.value&&(t.value=v(t.value)),t.status&&(e.status=v(t.status)),null!==t.value&&void 0!==t.value&&(e.value=t.value)}_checkVarType(t){if(!t)throw new TypeError("Variable cannot be null");if("string"!=typeof t.name)throw new TypeError("Variable Name must be a string")}ExistVar(t){return("string"==typeof t.system||"string"==typeof t.name)&&(!!this.value.hasOwnProperty(t.system)&&!!this.value[t.system].hasOwnProperty(t.name))}}class E extends p{constructor(t){super(t,[]),this.errorExpiry_days=7,this.addTransition("create",this._create),this.addTransition("ack",this._ack),this.addTransition("clean",this._cleanup),this.swipe_interval_ID=window.setInterval(()=>{this.applyTransition("clean")},1e4)}GetAll(){return this.value}setSwipeInterval(t){clearInterval(this.swipe_interval_ID),this.swipe_interval_ID=window.setInterval(()=>{this.applyTransition("clean")},t)}Create(t){if(!(t instanceof r))throw TypeError("input must be a 'systemError' instance.");this.applyTransition("create",t)}_create(t){let e={code:v(t.code),message:v(t.message),systemName:v(t.systemName),targetName:v(t.targetName),action:v(t.action),timestamp_ms:t.timestamp_ms,ack:t.ack};this.value.push(e)}Acknoweldge(t){this.applyTransition("ack",t)}_ack(t){let e=this.value[t];if(!e)throw Error(`Error ID '${t}' does not exist`);e.ack=!0}GetUnack(){return this.value.filter(t=>!t.ack)}CleanAll(){this.applyTransition("clean",!0)}_cleanup(t){if(0===this.value.lenght)return;if(t)return void(this.value=[]);let e=this.value.filter(t=>t.timestamp_ms+864e5*this.errorExpiry_days>Date.now());e.length<this.value.length&&(this.value=e)}}var x=new class{constructor(){this.dataTree=new S,this.errorTray=new E("errortray"),this.dataEngines=new Map,this.status=e.Down,this._initPromise=new Promise(t=>{this._initResolve=t}),this._defaultEngine=null}AddEngine(t){let e=v(t.name);this.dataEngines.set(e,t),null===this._defaultEngine&&(this._defaultEngine=t)}SetDefeultEngine(t){this.dataEngines.has(t.name)||this.AddEngine(t),this._defaultEngine=t}GetEngine(t){if("string"!=typeof t)throw Error("Engine Name must be a string");return"default"===t.toLocaleLowerCase()?this._defaultEngine:this.dataEngines.get(t)}async Subscribe(e,r){if("string"!=typeof r.name||"string"!=typeof r.system)throw Error("CANNOT SUBSCRIBE variable "+r.name);await this.isInitialized(),r.name=v(r.name),r.system=v(r.system);let n=this.GetEngine(e);if(!n)throw this.dataTree.Create(r),this.dataTree.UpdateStatus(r,t.Error),this.CreateAndDispatchError(r.system,s.EngineNotExist,"",i.Subscribe),new Error(`Engine '${e}' does not exist.`);this.dataTree.ExistVar(r)?n.isVarSubscribed(r)||this.dataTree.GetVar(r).status===t.Pending||this.dataTree.UpdateStatus(r,t.Pending):this.dataTree.Create(r),n.RequestSubscription(r)}async Unsubscribe(t,e){if("string"!=typeof e.name||"string"!=typeof e.system)throw Error("CANNOT UNSUBSCRIBE variable "+e.name);await this.isInitialized();let r=this.GetEngine(t);if(!r)throw this.CreateAndDispatchError(e.system,s.EngineNotExist,"",i.Unsubscribe),new Error(`Engine '${t}' does not exist.`);r.RequestUnsubscription(e)}Update(t){this.dataTree.Update(t)}async Read(e,r){if("object"!=typeof r)throw new TypeError("'system' must be a string and 'vars' an array of strings");await this.isInitialized();let n=this.GetEngine(e);if(n){let e=await n.Read(r);return n.UpdateVars(e,t.Subscribed,i.Read),e}throw this.CreateAndDispatchError(e,s.EngineNotExist,"",i.Read),new Error(`Engine '${e}' does not exist.`)}async Write(e,r,a){if("object"!=typeof r||"object"!=typeof a)throw new TypeError("'system' must be a string and 'vars' and values cannot be null");await this.isInitialized();let o=this.GetEngine(e);if(o){let e=r.map(e=>{let s=new n(e);return s.status=t.Pending,s});this.dataTree.Update(e);let s=await o.Write(r,a);return o.UpdateVars(s,t.Subscribed,i.Write),s}throw this.CreateAndDispatchError(e,s.EngineNotExist,"",i.Write),new Error(`Engine '${e}' does not exist.`)}DispatchError(t){this.errorTray.Create(t)}CreateAndDispatchError(t,e,s="",i=""){let n=new r(t,e,s,i);this.DispatchError(n)}async Init(){this._initResolve(),this.status=e.Warming;let t=[];Array.from(this.dataEngines.values()).forEach(e=>t.push(e._init())),await Promise.all(t),this.status=e.Ready}isInitialized(){return this._initPromise}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const N="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,T=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},k=`{{lit-${String(Math.random()).slice(2)}}}`,U=`\x3c!--${k}--\x3e`,C=new RegExp(`${k}|${U}`);class P{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],r=document.createTreeWalker(e.content,133,null,!1);let n=0,a=-1,o=0;const{strings:l,values:{length:h}}=t;for(;o<h;){const t=r.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)A(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=l[o],s=M.exec(e)[2],i=s.toLowerCase()+"$lit$",r=t.getAttribute(i);t.removeAttribute(i);const n=r.split(C);this.parts.push({type:"attribute",index:a,name:s,strings:n}),o+=n.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(k)>=0){const i=t.parentNode,r=e.split(C),n=r.length-1;for(let e=0;e<n;e++){let s,n=r[e];if(""===n)s=V();else{const t=M.exec(n);null!==t&&A(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),s=document.createTextNode(n)}i.insertBefore(s,t),this.parts.push({type:"node",index:++a})}""===r[n]?(i.insertBefore(V(),t),s.push(t)):t.data=r[n],o+=n}}else if(8===t.nodeType)if(t.data===k){const e=t.parentNode;null!==t.previousSibling&&a!==n||(a++,e.insertBefore(V(),t)),n=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(s.push(t),a--),o++}else{let e=-1;for(;-1!==(e=t.data.indexOf(k,e+1));)this.parts.push({type:"node",index:-1}),o++}}else r.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const A=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},R=t=>-1!==t.index,V=()=>document.createComment(""),M=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function I(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=O(i),a=i[n],o=-1,l=0;const h=[];let c=null;for(;r.nextNode();){o++;const t=r.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==a&&a.index===o;)a.index=null!==c?-1:a.index-l,n=O(i,n),a=i[n]}h.forEach(t=>t.parentNode.removeChild(t))}const D=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},O=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(R(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const $=new WeakMap,B=t=>"function"==typeof t&&$.has(t),W={},j={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class z{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=N?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let r,n=0,a=0,o=i.nextNode();for(;n<s.length;)if(r=s[n],R(r)){for(;a<r.index;)a++,"TEMPLATE"===o.nodeName&&(e.push(o),i.currentNode=o.content),null===(o=i.nextNode())&&(i.currentNode=e.pop(),o=i.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,r.name,r.strings,this.options));n++}else this.__parts.push(void 0),n++;return N&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const q=` ${k} `;class L{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],r=t.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===t.indexOf("--\x3e",r+1);const n=M.exec(t);e+=null===n?t+(s?q:U):t.substr(0,n.index)+n[1]+n[2]+"$lit$"+n[3]+k}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const F=t=>null===t||!("object"==typeof t||"function"==typeof t),G=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class H{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new J(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(F(t)||!G(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class J{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===W||F(t)&&t===this.value||(this.value=t,B(t)||(this.committer.dirty=!0))}commit(){for(;B(this.value);){const t=this.value;this.value=W,t(this)}this.value!==W&&this.committer.commit()}}class K{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(V()),this.endNode=t.appendChild(V())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=V()),t.__insert(this.endNode=V())}insertAfterPart(t){t.__insert(this.startNode=V()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;B(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=W,t(this)}const t=this.__pendingValue;t!==W&&(F(t)?t!==this.value&&this.__commitText(t):t instanceof L?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):G(t)?this.__commitIterable(t):t===j?(this.value=j,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof z&&this.value.template===e)this.value.update(t.values);else{const s=new z(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new K(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){T(this.startNode.parentNode,t.nextSibling,this.endNode)}}class Z{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;B(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=W,t(this)}if(this.__pendingValue===W)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=W}}class Q extends H{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new X(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class X extends J{}let Y=!1;(()=>{try{const t={get capture(){return Y=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class tt{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;B(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=W,t(this)}if(this.__pendingValue===W)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=et(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=W}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const et=t=>t&&(Y?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function st(t){let e=it.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},it.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(k);return s=e.keyString.get(i),void 0===s&&(s=new P(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const it=new Map,rt=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const nt=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new Q(t,e.slice(1),s).parts}return"@"===r?[new tt(t,e.slice(1),i.eventContext)]:"?"===r?[new Z(t,e.slice(1),s)]:new H(t,e,s).parts}handleTextExpression(t){return new K(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const at=(t,...e)=>new L(t,e,"html",nt)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,ot=(t,e)=>`${t}--${e}`;let lt=!0;void 0===window.ShadyCSS?lt=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),lt=!1);const ht=t=>e=>{const s=ot(e.type,t);let i=it.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},it.set(s,i));let r=i.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(k);if(r=i.keyString.get(n),void 0===r){const s=e.getTemplateElement();lt&&window.ShadyCSS.prepareTemplateDom(s,t),r=new P(e,s),i.keyString.set(n,r)}return i.stringsArray.set(e.strings,r),r},ct=["html","svg"],dt=new Set,ut=(t,e,s)=>{dt.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const a=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{ct.forEach(e=>{const s=it.get(ot(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),I(t,s)})})})(t);const o=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let a=O(r),o=0,l=-1;for(;n.nextNode();){for(l++,n.currentNode===s&&(o=D(e),s.parentNode.insertBefore(e,s));-1!==a&&r[a].index===l;){if(o>0){for(;-1!==a;)r[a].index+=o,a=O(r,a);return}a=O(r,a)}}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),I(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const pt={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},mt=(t,e)=>e!==t&&(e==e||t==t),yt={attribute:!0,type:String,converter:pt,reflect:!1,hasChanged:mt};class gt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=yt){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(s){const i=this[t];this[e]=s,this._requestUpdate(t,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||yt}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=mt){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||pt,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||pt.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=yt){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,r=i.getPropertyOptions(t);i._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}gt.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const ft="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol();class _t{constructor(t,e){if(e!==bt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(ft?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const wt=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof _t)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new _t(s,bt)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const vt={};class St extends gt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ft?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==vt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return vt}}St.finalized=!0,St.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,r=rt.has(e),n=lt&&11===e.nodeType&&!!e.host,a=n&&!dt.has(i),o=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=rt.get(e);void 0===i&&(T(e,e.firstChild),rt.set(e,i=new K(Object.assign({templateFactory:st},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,o,Object.assign({templateFactory:ht(i)},s)),a){const t=rt.get(o);rt.delete(o);const s=t.value instanceof z?t.value.template:void 0;ut(i,o,s),T(e,e.firstChild),e.appendChild(o),rt.set(e,t)}!r&&n&&window.ShadyCSS.styleElement(e.host)};class Et extends(g([x.dataTree,x.errorTray],St)){constructor(){super(),this.name="",this.system="default",this.engine="default",this._init=!1,this.service_manager=x}static get properties(){return{name:{type:String},system:{type:String},engine:{type:String}}}get value(){if(this._init)return this.service_manager.dataTree.ExistVar(this)?this.datatree[this.system][this.name].value:null}get status(){return this._init?this.service_manager.dataTree.ExistVar(this)?this.datatree[this.system][this.name].status:t.Error:t.Pending}set status(t){if("string"!=typeof t)return;if(!this.service_manager.dataTree.ExistVar(this))return;const e=this.getAttribute("status");e===t&&e===this.status||this.DataUpdate(null,t)}on_datatree_update(){this.setAttribute("status",this.status)}connectedCallback(){super.connectedCallback(),x.Subscribe(this.engine,this).then(()=>{this._init=!0,this.on_datatree_update(),this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),x.Unsubscribe(this.engine,this)}async Write(t){return await this.WriteMultiple([this],[t])}async WriteMultiple(t,e){return await x.Write(this.engine,t,e)}async Read(){return this.ReadMultiple([this])}async ReadMultiple(t){return await x.Read(this.engine,t)}DataUpdate(t,e){let s=new n(this);s.status=e,s.value=t,this.DataUpdateMultiple(s)}DataUpdateMultiple(t){x.Update(t)}}customElements.define("x-loader",class extends St{static get styles(){return wt`
            :host{
                display:block;
            }
            path{
                stroke: var(--color, #3498db);
            }
            .loader {
                animation: spin var(--speed,0.7s) linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}render(){return at`
        <svg class="loader" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path style="fill: none; stroke-width: 75;" d="M 238 38 C 362.264 38 463 138.736 463 263"></path>
        </svg>
        `}});customElements.define("status-switch",class extends Et{static get styles(){return wt`
        
            :host{
                display: block;
            }
            * {
                display : none;
            }
            x-loader{
                --color : var(--loaderColor);
            }

            [show]{
                display:block;
            }
        `}render(){return at`
        <x-loader ?show="${this.status===t.Pending}" > </x-loader>
        <slot  ?show="${this.status===t.Subscribed}" name="sub"></slot>
        <slot  ?show="${this.status===t.Unsubscribed}" name="unsub"> </slot>
        <slot  ?show="${this.status===t.Error}" name="error"> </slot>
        `}});customElements.define("bool-color",class extends Et{static get styles(){return wt`
            :host{
                display:block;
                cursor : pointer;
            }
            slot, x-loader{
                display:none;
            }
            slot[show]{
                display:contents;
            }
            x-loader[show]{
                display:block;
            }
            slot {
                cursor : pointer;
            }
            :host([status="ERROR"]) > slot{
                cursor : not-allowed ;
            }
            :host([status="UNSUBSCRIBED"]) > slot{
                cursor : not-allowed ;
            }
            :host([read-only]) > slot{
                cursor : auto ;
            }
            [show]{
                display:block;
            }
            [val="on"]::slotted(*){
                stroke : var(--on-stroke-c,black);
                fill : var(--on-fill-c,green);
            }
            [val="off"]::slotted(*){
                stroke : var(--off-stroke-c,black);
                fill : var(--off-fill-c,lightgray);
            }
            :host([status="ERROR"]) > ::slotted(*){
                stroke : var(--error-stroke-c,black);
                fill : var(--error-fill-c,red);
            }
            :host([status="UNSUBSCRIBED"]) > ::slotted(*){
                stroke : var(--unsub-stroke-c,yellow);
            }
        `}render(){return at`
            <slot val="${this.value?"on":"off"}" 
                  @click="${this.onclick}"
                  ?show="${this.status!==t.Pending}"> Empty Slot</slot>
            <x-loader ?show="${this.status===t.Pending}"></x-loader>
        `}onclick(){let e=this.status;if(this.hasAttribute("read-only")||e===t.Error||e===t.Pending||e===t.Unsubscribed)return;let s=!this.value;this.Write(s)}});customElements.define("color-box",class extends Et{static get styles(){return wt`
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items: center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
                border-style : solid;
                border-width : var(--border-w,1px);
                border-color : var(--border-c,grey);
                border-radius : var(--border-r,0.4rem);
                padding: var(--padding,0.4rem);
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            }
            :host([status="ERROR"]) {
                background-color: var(--err-color, #ff726f);
            }
            :host([status="UNSUBSCRIBED"]) {
                background-color: var(--unsub-color, yellow);
            }
            :host([status="WARNING"]) {
                background-color: var(--warn-color, orange);
            }
        `}render(){return at`
            <slot>Empty Slot</slot>
        `}});customElements.define("hmi-label",class extends Et{static get styles(){return wt`
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
            }
            div{
                border-style : solid;
                border-width : var(--border-w,1px);
                border-color : var(--border-c,grey);
                border-radius : var(--border-r,0.4rem);
                padding: var(--padding,0.2rem);
                font-family: 'Roboto', sans-serif;
                margin-bottom : 0.2rem;
                width:100%;
                text-align:center;
                color:var(--base-color,#333333);
            }
            :host([status="ERROR"]) > div{
                color : var(--error-color,red);
            }
            :host([status="WARNING"]) > div{
                color : var(--warning-color,orange);
            }
        `}render(){return at`
            <div><strong><slot name="label">${this.name}</slot></strong></div>
            <slot>Empty Slot</slot>
        `}});customElements.define("pvr-icon",class extends St{render(){return at`
        <svg viewBox="251.36 1.721 53.863 51.142" xmlns="http://www.w3.org/2000/svg">
            <g>
            <g>
                <polygon  points="278.2,37.2 253,22.6 253,51.7" style="stroke-miterlimit: 10;"></polygon>
                <polygon  points="278.8,37.2 304,51.7 304,22.6" style="stroke-miterlimit: 10;"></polygon>
            </g>
            <circle cx="278.8" cy="37.2" r="9.6" style="stroke-miterlimit: 10;"></circle>
            <rect x="266.8" y="3.2" class="st0" width="23.9" height="13.9" style="stroke-miterlimit: 10;"></rect>
            <rect x="271.8" y="3.2" class="st3" width="13.9" height="13.9" style="fill:none; stroke-miterlimit: 10;"></rect>
            <line x1="278.8" y1="27.6" x2="278.8" y2="10.1" style="stroke-miterlimit: 10;"></line>
            <line x1="271.8" y1="10.1" x2="285.7" y2="10.1" style="stroke-miterlimit: 10;"></line>
            </g>
        </svg>
        `}});customElements.define("pvd-icon",class extends St{render(){return at`
        <svg viewBox="140.37 3.264 54.407 50.055" xmlns="http://www.w3.org/2000/svg" >
            <g>
            <g>
                <polygon  points="167.1,37.2 141.9,22.6 141.9,51.7" style="stroke-miterlimit: 10;"></polygon>
                <polygon  points="167.7,37.2 192.9,51.7 192.9,22.6" style="stroke-miterlimit: 10;"></polygon>
            </g>
            <circle  cx="167.7" cy="37.2" r="9.6" style="stroke-miterlimit: 10;"></circle>
            <line  x1="167.7" y1="27.6" x2="167.7" y2="12.3" style="stroke-miterlimit: 10;"></line>
            <path  d="M175.4,12.3c0-4.2-3.4-7.7-7.7-7.7S160,8,160,12.3H175.4z" style="stroke-miterlimit: 10;"></path>
            </g>
        </svg>
        `}});customElements.define("valve-pr",class extends Et{static get styles(){return wt`
            bool-color{
                width : 100%;
            }
        `}render(){return at`
            <hmi-label name="${this.name}"  engine="${this.engine}" system="${this.system}">
                <slot slot="label">${this.name}</slot>
                <bool-color name="${this.name}"  engine="${this.engine}" system="${this.system}"> 
                    <pvr-icon></pvr-icon>
                </bool-color>
            </hmi-label>
        `}});customElements.define("valve-pd",class extends Et{static get styles(){return wt`
            bool-color{
                width : 100%;
            }
        `}render(){return at`
            <hmi-label name="${this.name}"  engine="${this.engine}" system="${this.system}">
                <slot slot="label">${this.name}</slot>
                <bool-color name="${this.name}"  engine="${this.engine}" system="${this.system}"> 
                    <pvd-icon></pvd-icon>
                </bool-color>
            </hmi-label>
        `}});let xt=document.createElement("template");xt.innerHTML='\n<style>\n    :host{\n        display:block;\n    }\n</style>\n<svg viewBox="149.619 91.947 128.401 109.903" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">\n<path d="M 263.874 190.422 L 327.956 301.415 L 199.792 301.415 L 263.874 190.422 Z" transform="matrix(0.499275, 0.866443, -0.866443, 0.499275, 311.10025, -232.379578)" bx:shape="triangle 199.792 190.422 128.164 110.993 0.5 0 1@395242f4"></path>\n</svg>\n';class Nt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(xt.content.cloneNode(!0))}}customElements.define("x-triangle",Nt);customElements.define("numeric-ind",class extends Et{static get properties(){let t=super.properties;return t.precision={type:Number},t.unit={type:String},t}constructor(){super(),this.precision=2,this.unit=""}static get styles(){return wt`
            :host{
                display:flex;
                flex-direction: column;
                justify-content : center;
                align-items : center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
            }
            div.display{
                max-width:10rem;
                min-width:5rem;
                display :flex;
                flex-direction : row;
                align-items : center;
                justify-content : space-evenly;
            }
            .val {
                margin-right : 0.5rem;
                color: #555555
            }

            x-loader{
                margin-right : 0.5rem;
                width:0.9rem;
            }
            x-loader:not([show]){
                display : none;
            }
            .val:not([show]){
                display : none;
            }

        `}render(){return at`
                <label><strong><slot>${this.name}</slot></strong> </label>
                <div class="display"> 
                    <x-loader ?show="${"PENDING"===this.status}"></x-loader>
                    <strong class="val" ?show="${"PENDING"!==this.status}" > ${Number.parseFloat(this.value).toFixed(this.precision)} </strong> 
                    <span>${this.unit}</span> 
                </div>
        `}});customElements.define("set-number",class extends Et{static get properties(){let t=super.properties;return t.precision={type:Number},t.unit={type:String},t.showinpt={type:Boolean},t}constructor(){super(),this.precision=2,this.unit="",this.onmousedown=this.show.bind(this),this.onkeydown=this.send.bind(this),this.inpt_val="",this.onblur=this.hide.bind(this)}static get styles(){return wt`
            :host{
                display:flex;
                flex-direction: column;
                justify-content : center;
                align-items : center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
                cursor: pointer;
                width: 100%;
                padding-top: 0.3rem;
                padding-bottom: 0.2rem;

            }
            :host([err]){
                background-color:red;
            }
            .set{
                font-size : smaller;
                align-self : flex-start;
                display:flex;
                justify-content : flex-start;
                align-items : center;
                color : blue;
                width:100%;
                margin-bottom: 0.2rem;
                
                min-height: 0rem;
                -moz-transition: width 1s ease-in-out, left 1.5s ease-in-out;
               -webkit-transition: width 1s ease-in-out, left 1.5s ease-in-out;
                -moz-transition: width 1s ease-in-out, left 1.5s ease-in-out;
                -o-transition: width 1s ease-in-out, left 1.5s ease-in-out;
                transition: width 1s ease-in-out, left 1.5s ease-in-out;
                
                
            }
            .inpt{
                display:flex;
                justify-content:center;
                align-items: center;
                max-width:0rem;
                max-height: 0rem;
                transition: max-height 0.2s ease-out, max-width 0.2s ease-out;
                transition-delay: 0s;
                overflow:hidden;
            }
            .inpt[show]{
                max-width: 10rem;
                max-height : 5rem;
            }
            input{
                width: 3rem;
            }
            input:invalid{
                border-color:red;
            }
            x-triangle{
                margin-left: 0.5rem;
                width:0.5rem;
            }
            x-triangle[show]{
                transform: rotate(90deg); 
            }
        `}render(){return at`
                <label><strong><slot></slot></strong></label>
                <div class="set" id="setcont">set: ${Number.parseFloat(this.value).toFixed(this.precision)} <x-triangle ?show="${this.showinpt}"></x-triangle> </div>
                <div id="form" class="inpt" ?show="${this.showinpt}">
                        <input id="inpt" type="number" value="" step="${Math.pow(10,-1*this.precision)}">
                        <input id="btn" type="submit" value="set" @click="${this.send}">
                </div>
        `}hide(t){if(!1===this.showinpt)return;this.showinpt=!1,this.removeAttribute("err");let e=this.shadowRoot.getElementById("inpt"),s=this.shadowRoot.getElementById("btn");e.blur(),s.blur(),this.blur()}show(t){if(!0===this.showinpt)return;this.showinpt=!0;let e=this.shadowRoot.getElementById("inpt");setTimeout(()=>{e.focus()},0)}async send(t){if(t instanceof KeyboardEvent&&13!==t.keyCode)return;let e=this.shadowRoot.getElementById("inpt").valueAsNumber;Number.isNaN(e)||((await this.Write(e))[0].success?this.hide(null):this.setAttribute("err",!0))}});let Tt=new class extends class{constructor(t){this.manager=x,this.status=e.Down,this.toBeSubscribed=new Map,this.toBeUnsubscribed=new Set,this.subscribedVar=new Map,this.sub_timerID=null,this.unsub_timerID=null,this.aggregationTime_ms=10,this.name=t||"DataEngine",this.VarDispatchErrorCases=[s.VarNotExist,s.WontSubcribe,s.Unauthorized,s.UnknownError,s.CantUnSubcribe],this.VarErrorNoActCases=[s.BadValue,s.CantUnSubcribe,s.Unauthorized],this.VarErrorUnsubCases=[s.CantSubcribe,s.NoNetwork]}serializeSysObject(t){return"string"!=typeof t.name||t.name.includes(":")||"string"!=typeof t.system||t.system.includes(":")?null:t.system+":"+t.name}deserializeSysObject(t){let e=t.split(":");return 2!==e.length?null:{system:e[0],name:e[1]}}RequestSubscription(t){let s=this.serializeSysObject(t);if(null===s)throw Error("CANNOT SUBSCRIBE variable "+t.name);if(this.subscribedVar.has(s)){let t=this.subscribedVar.get(s);return void this.subscribedVar.set(s,t+1)}let i=this.toBeSubscribed.get(s)||0;this.toBeSubscribed.set(s,i+1),this.status!==e.Down&&this.status!==e.Warming&&(this.sub_timerID&&clearTimeout(this.sub_timerID),this.sub_timerID=window.setTimeout(this._subcribe.bind(this),this.aggregationTime_ms))}RequestUnsubscription(t){let e=this.serializeSysObject(t);if(null===e||!this.subscribedVar.has(e))throw Error("CANNOT UNSUBSCRIBE variable "+t.name);let s=this.subscribedVar.get(e);s>1?this.subscribedVar.set(e,s-1):(this.toBeUnsubscribed.add(e),this.unsub_timerID&&clearTimeout(this.unsub_timerID),this.unsub_timerID=window.setTimeout(this._unsubcribe.bind(this),this.aggregationTime_ms))}async _subcribe(){let e=Array.from(this.toBeSubscribed.keys()).map(t=>this.deserializeSysObject(t)),s=await this.Subscribe(e);this.updateSubscriberLists(s),this.UpdateVars(s,t.Subscribed,i.Subscribe)}updateSubscriberLists(t){for(let e of t){let t=this.serializeSysObject(e);if(e.success){let e=this.toBeSubscribed.get(t);e+=this.subscribedVar.get(t)||0,this.subscribedVar.set(t,e),this.toBeSubscribed.delete(t)}else{let i=e.error?e.error.code:s.UnknownError;i!==s.NoNetwork&&i!==s.CantSubcribe&&this.toBeSubscribed.delete(t)}}}isVarSubscribed(t){let e=this.serializeSysObject(t);return this.subscribedVar.has(e)}UpdateVars(e,i,r=""){let a=[];for(let o of e){let e=new n(o);if(o.success)e.status=i,null!==o.value&&void 0!==o.value&&(e.value=o.value);else{let i=o.error?o.error.code:s.UnknownError;if(this.VarDispatchErrorCases.includes(i)&&this.manager.CreateAndDispatchError(o.system,i,o.name,r),this.VarErrorUnsubCases.includes(i))e.status=t.Unsubscribed;else if(this.VarErrorNoActCases.includes(i)){let s=this.manager.dataTree.GetVar(o);e.status=s.status===t.Pending?t.Subscribed:null}else e.status=t.Error}a.push(e)}this.manager.Update(a)}async _unsubcribe(){let e=Array.from(this.toBeUnsubscribed).map(t=>this.deserializeSysObject(t)),s=await this.Unsubscribe(e);for(let t of s){let e=this.serializeSysObject(t);t.success&&this.subscribedVar.delete(e),this.toBeUnsubscribed.delete(e)}this.UpdateVars(s,t.Unsubscribed,i.Unsubscribe)}async _init(){this.status=e.Warming;let t=await this.Initialize();if(t.success)this.status=e.Ready;else{this.status=e.Error;let n=t.error?t.error.code:s.UnknownError,a=new r(this.name,n,this.name,i.Init);this.manager.DispatchError(a)}this.toBeSubscribed.size>0&&this._subcribe()}UpdateData(t){this.manager.Update(t)}}{constructor(){super(...arguments),this.var_types=new Map}async Initialize(){return{success:!0}}_updateVariables(){let e=[];this.var_types.forEach((t,s)=>{if("number"===t){let t=Math.floor(100*Math.random());e.push(new a(!0,s,"default",t))}}),0!==e.length&&this.UpdateVars(e,t.Subscribed,i.Read)}async Subscribe(t){let e=[];return t.forEach(t=>{let s=document.querySelector(`[name="${t.name}"]`);if("string"!=typeof t.name||""===t.name||null===s)return void e.push(new a(!1,t.name,t.system));if(null!==this.manager.dataTree.GetVar(t).value)return void e.push(new a(!0,t.name,t.system));let i=0;s.tagName.toLowerCase().includes("bool")?(i=Math.random()>.5,this.var_types.set(t.name,"bool")):(i=Math.floor(100*Math.random()),this.var_types.set(t.name,"number")),e.push(new a(!0,t.name,t.system,i))}),e}async Unsubscribe(t){return t.map(t=>new a(!0,t.name,t.system))}async Write(t,e){let s=[];for(let i=0;i<t.length;i++)s.push(new a(!0,t[i].name,t[i].system,e[i]));return s}async Read(t){throw new Error("Method not implemented.")}}("std");x.AddEngine(Tt),x.Init();
//# sourceMappingURL=main.js.map
