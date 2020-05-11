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
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${i}`);class n{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let c=0,d=-1,u=0;const{strings:p,values:{length:m}}=t;for(;u<m;){const t=a.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)o(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[u],s=h.exec(e)[2],i=s.toLowerCase()+"$lit$",n=t.getAttribute(i);t.removeAttribute(i);const o=n.split(r);this.parts.push({type:"attribute",index:d,name:s,strings:o}),u+=o.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(r),a=n.length-1;for(let e=0;e<a;e++){let i,r=n[e];if(""===r)i=l();else{const t=h.exec(r);null!==t&&o(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===n[a]?(s.insertBefore(l(),t),i.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(l(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const o=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},a=t=>-1!==t.index,l=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=u(i),o=i[n],a=-1,l=0;const h=[];let c=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,n=u(i,n),o=i[n]}h.forEach(t=>t.parentNode.removeChild(t))}const d=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(a(e))return s}return-1};
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
const p=new WeakMap,m=t=>"function"==typeof t&&p.has(t),g={},y={};
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
class b{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let n,o=0,l=0,h=r.nextNode();for(;o<i.length;)if(n=i[o],a(n)){for(;l<n.index;)l++,"TEMPLATE"===h.nodeName&&(s.push(h),r.currentNode=h.content),null===(h=r.nextNode())&&(r.currentNode=s.pop(),h=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(h.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(h,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const f=` ${s} `;class _{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",r=!1;for(let n=0;n<t;n++){const t=this.strings[n],o=t.lastIndexOf("\x3c!--");r=(o>-1||r)&&-1===t.indexOf("--\x3e",o+1);const a=h.exec(t);e+=null===a?t+(r?f:i):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t),v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class x{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(w(t)||!v(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===g||w(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=g,t(this)}this.value!==g&&this.committer.commit()}}class E{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}const t=this.__pendingValue;t!==g&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof _?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const s=new b(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new E(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class N{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=g}}class k extends x{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends S{}let T=!1;(()=>{try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class U{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=g}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function A(t){let e=P.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},P.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(s);return i=e.keyString.get(r),void 0===i&&(i=new n(t,t.getTemplateElement()),e.keyString.set(r,i)),e.stringsArray.set(t.strings,i),i}const P=new Map,I=new WeakMap;
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
 */const V=new
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
class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new k(t,e.slice(1),s).parts}return"@"===r?[new U(t,e.slice(1),i.eventContext)]:"?"===r?[new N(t,e.slice(1),s)]:new x(t,e,s).parts}handleTextExpression(t){return new E(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const $=(t,...e)=>new _(t,e,"html",V)
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
 */,M=(t,e)=>`${t}--${e}`;let D=!0;void 0===window.ShadyCSS?D=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),D=!1);const O=t=>e=>{const i=M(e.type,t);let r=P.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},P.set(i,r));let o=r.stringsArray.get(e.strings);if(void 0!==o)return o;const a=e.strings.join(s);if(o=r.keyString.get(a),void 0===o){const s=e.getTemplateElement();D&&window.ShadyCSS.prepareTemplateDom(s,t),o=new n(e,s),r.keyString.set(a,o)}return r.stringsArray.set(e.strings,o),o},B=["html","svg"],z=new Set,W=(t,e,s)=>{z.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{B.forEach(e=>{const s=P.get(M(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),c(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let o=u(r),a=0,l=-1;for(;n.nextNode();){for(l++,n.currentNode===s&&(a=d(e),s.parentNode.insertBefore(e,s));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=u(r,o);return}o=u(r,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),c(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const j={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},F=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:F};class L extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(s){const i=this[t];this[e]=s,this._requestUpdate(t,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=F){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||j,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||j.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=q){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,r=i.getPropertyOptions(t);i._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}L.finalized=!0;
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
const G="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,H=Symbol();class J{constructor(t,e){if(e!==H)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=t=>new J(String(t),H),Z=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof J)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new J(s,H)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const Q={};class X extends L{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Q&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Q}}var Y;X.finalized=!0,X.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,n=I.has(s),o=D&&11===s.nodeType&&!!s.host,a=o&&!z.has(r),l=a?document.createDocumentFragment():s;if(((t,s,i)=>{let r=I.get(s);void 0===r&&(e(s,s.firstChild),I.set(s,r=new E(Object.assign({templateFactory:A},i))),r.appendInto(s)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:O(r)},i)),a){const t=I.get(l);I.delete(l);const i=t.value instanceof b?t.value.template:void 0;W(r,l,i),e(s,s.firstChild),s.appendChild(l),I.set(s,t)}!n&&o&&window.ShadyCSS.styleElement(s.host)},function(t){t.Subscribed="SUBSCRIBED",t.Error="ERROR",t.Pending="PENDING",t.Warning="WARNING",t.Unsubscribed="UNSUBSCRIBED"}(Y||(Y={}));var tt,et,st,it={};it.Subscribed=Z`${K(Y.Subscribed)}`,it.Error=Z`${K(Y.Error)}`,it.Pending=Z`${K(Y.Pending)}`,it.Warning=Z`${K(Y.Warning)}`,it.Unsubscribed=Z`${K(Y.Unsubscribed)}`,function(t){t.Ready="READY",t.Down="DOWN",t.Warming="WARMUP",t.Error="ERROR"}(tt||(tt={})),function(t){t.VarNotExist="VAR-NOT-EXIST",t.WontSubcribe="WONT-SUB",t.CantSubcribe="CANT-SUB",t.CantUnSubcribe="CANT-UNSUB",t.BadValue="BAD-VALUE",t.NoNetwork="NO-NETWORK",t.NetError="NET-ERROR",t.Unauthorized="UNAUTHORIZED",t.BadReq="BAD-REQUEST",t.ServerError="SERVER-ERROR",t.NotFound="NOT-FOUND",t.BadData="BAD-DATA",t.EngineNotExist="NO-ENGINE",t.UnknownError="UKNOWN"}(et||(et={})),function(t){t.Write="WRITE",t.Read="READ",t.Subscribe="SUBSCRIBE",t.Unsubscribe="UNSUBSCRIBE",t.Update="UPDATE",t.Init="INITIALIZE",t.Unknown="UNKNOWN"}(st||(st={}));class rt{constructor(t,e,s="",i=""){if("string"!=typeof e)throw TypeError("Code must be a string");if("string"!=typeof t)throw TypeError("sysName must be a string");this.code=e,this.timestamp_ms=Date.now(),this.systemName=t,this.action=i||"",this.targetName=s||"",this.ack=!1,this.message=this.buildDefaultMessage()}buildDefaultMessage(){let t=`Error in system (${this.systemName})`;return""!==this.action&&(t+=" during "+this.action),""!==this.targetName&&(t+=` on target (${this.targetName})`),t+=`. Error Code: ${this.code}.`,t}}class nt{constructor(t){this.system=t.system,this.name=t.name,this.value=null,this.status=null}}class ot{constructor(t,e,s,i=null){this.error=null,this.success=t,this.name=e,this.value=i,this.system=s}setError(t,e=""){this.error={code:t,message:e}}}var at=(t,e)=>{const s=["sort","reverse","splice","pop","unshift","shift","push"];let i=!1;const r={get(t,e,s){try{return"prototype"===e?Reflect.get(t,e,s):new Proxy(t[e],r)}catch(i){return Reflect.get(t,e,s)}},defineProperty(t,s,r){const n=Reflect.defineProperty(t,s,r);return i||e(),n},deleteProperty(t,s){const r=Reflect.deleteProperty(t,s);return i||e(),r},apply(t,r,n){if(s.includes(t.name)){i=!0;const s=Reflect.apply(t,r,n);return e(),i=!1,s}return Reflect.apply(t,r,n)}};return new Proxy(t,r)},lt=!1,ht=!1;const ct=new Map;class dt{constructor(t){if(this.name=t,this.callbackMap=new Map,"string"!=typeof this.name)throw Error("Variable name must be a string.")}lock_callbacks(){if(lt)throw this.unlock_callbacks(),Error("Forbidden multiple-update during an update callback loop.");lt=!0}unlock_callbacks(){lt=!1}_call_watchers(t){for(let e of this.callbackMap.values())void 0===t?e():e(t)}attachWatcher(t,e){if(null==t)throw Error("Target is undefined.");this.callbackMap.set(t,e)}detachWatcher(t){if(null==t)throw Error("Target is undefined.");this.callbackMap.delete(t)}}class ut extends dt{constructor(t,e){super(t),"function"==typeof e&&(this.usrDefined_transition=e)}usrDefined_transition(t){}applyTransition(t){this.lock_callbacks();try{ht=!0,this.usrDefined_transition(t),ht=!1,this._call_watchers(t);for(let t of ct.values())t()}catch(t){throw ct.clear(),this.unlock_callbacks(),new Error(t.message)}ct.clear(),this.unlock_callbacks()}}class pt extends dt{constructor(t,e){super(t),this.type=typeof e,this.default_val=e,this._err_on_value="Wrong type assignment to state variable: "+this.name,this._valueProxy=void 0,this._auto_valueProxy=void 0,this.allowStandaloneAssign=!0,this.transitionMap=new Map;if(!["string","object","number","boolean"].includes(this.type))throw TypeError(this._err_on_value);this._val=this.GET()||this.CREATE(this.default_val),this._set_proxies()}_set_proxies(){"object"===this.type&&"object"==typeof this._val&&(this._valueProxy=at(this._val,this.updateWatcherIfAllowed.bind(this)),this._auto_valueProxy=at(this._val,this._markForWatchersUpdate.bind(this)))}set value(t){this._checkIsAllowed(),this._val=t,this._set_proxies(),ht?this._markForWatchersUpdate():this.updateWatchers()}get value(){return ht?"object"===this.type?this._auto_valueProxy:this._val:"object"===this.type?this._valueProxy:this._val}CREATE(t){if(typeof t!==this.type)throw TypeError(this._err_on_value);{let e="string"!==this.type?JSON.stringify(t):t;localStorage.setItem(this.name,e)}return t}UPDATE_DATA(){if(typeof this._val!==this.type)throw ht&&(ht=!1),lt&&this.unlock_callbacks(),TypeError(this._err_on_value);{let t="string"!==this.type?JSON.stringify(this._val):this._val;localStorage.setItem(this.name,t)}}RESET(){this.value=this.default_val}GET(){let t=localStorage.getItem(this.name);if(null===t)return t;if("string"!==this.type&&(t=JSON.parse(t),typeof t!==this.type))throw TypeError("State variable: "+this.name+" is corrupted, returns type "+typeof t+" expecting "+this.type);return t}_markForWatchersUpdate(){this.UPDATE_DATA(),ct.set(this,this._call_watchers.bind(this))}_checkIsAllowed(){if(!this.allowStandaloneAssign&&!ht)throw ht&&(ht=!1),"StateVariable "+this.name+" is not allowed assignment outside a state transition"}updateWatcherIfAllowed(){this._checkIsAllowed(),this.updateWatchers()}updateWatchers(){this.lock_callbacks();try{this.UPDATE_DATA(),this._call_watchers()}catch(t){throw this.unlock_callbacks(),new Error(t.message)}this.unlock_callbacks()}addTransition(t,e){let s=new ut(t);"function"==typeof e&&(s.usrDefined_transition=e.bind(this),this.transitionMap.set(t,s),this.allowStandaloneAssign=!1)}applyTransition(t,e){if(!this.transitionMap.has(t))throw Error(`Transition ${t} not found`);this.transitionMap.get(t).applyTransition(e)}}class mt extends dt{sendMessage(t){this._call_watchers(t)}}function gt(t,e){return class extends(function(t,e){return class extends e{constructor(...t){super(...t),this._transitionMap=new Map,this._messageMap=new Map,this._extractTransitions(),this._addGetterSetters()}_extractTransitions(){for(let e=0;e<t.length;e++){let s=t[e];if(s instanceof pt)for(let e of s.transitionMap.values())t.push(e)}}applyTransition(t,e){if(!this._transitionMap.has(t))throw Error(`Transition ${t} not found`);this._transitionMap.get(t)(e)}sendMessageOnChannel(t,e){if(!this._messageMap.has(t))throw Error(`Message channel ${t} not found`);this._messageMap.get(t)(e)}_addGetterSetters(){for(let e of t)if(e instanceof pt)"object"===e.type&&(this[`_${e.name}Proxy`]=at(e._val,()=>{throw e.name+" cannot be assigned from a custom element"})),Object.defineProperty(this,e.name,{set:t=>{throw e.name+" cannot be assigned from a custom element"},get:()=>"object"===e.type?this[`_${e.name}Proxy`]:e._val});else if(e instanceof mt)this._messageMap.set(e.name,e.sendMessage.bind(e));else{if(!(e instanceof ut))throw TypeError("Accept only StateVariable, StateTransition or Message.");this._transitionMap.set(e.name,e.applyTransition.bind(e))}}disconnectedCallback(){void 0!==super.disconnectedCallback&&super.disconnectedCallback();for(let e of t)e.detachWatcher(this)}}}(t,e)){connectedCallback(){void 0!==super.connectedCallback&&super.connectedCallback();for(let e of t)e instanceof mt?this["gotMessage_"+e.name]&&e.attachWatcher(this,this["gotMessage_"+e.name].bind(this)):e.attachWatcher(this,this._stateRequestUpdate(e.name).bind(this))}_stateRequestUpdate(t){return function(){this[`on_${t}_update`]&&this[`on_${t}_update`](),this.requestUpdate()}}}}const{replace:yt}="",bt=/[&<>'"]/g,ft={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},_t=t=>ft[t],wt=t=>yt.call(t,bt,_t);class vt extends pt{constructor(){super("datatree",{}),this.addTransition("create",this._create),this.addTransition("update",this._update),this.addTransition("multiupdate",this._multiupdate)}GetVar(t){return this.ExistVar(t)?this.value[t.system][t.name]:null}Create(t){this.applyTransition("create",t)}UpdateStatus(t,e){let s=new nt(t);s.status=e,this.applyTransition("update",s)}Update(t){Array.isArray(t)?this.applyTransition("multiupdate",t):this.applyTransition("update",t)}_create(t){if(t&&"string"==typeof t.system&&"string"==typeof t.name){t.system=wt(t.system),t.name=wt(t.name);let e={status:null,value:null};e.status=Y.Pending,this.value.hasOwnProperty(t.system)||(this.value[t.system]={}),this.value[t.system][t.name]=e}}_multiupdate(t){t.forEach(t=>{this._update(t)})}_update(t){this._checkVarType(t);let e=this.GetVar(t);if(!e)throw new Error("Requested Variable does not exist: "+t.name);"string"==typeof t.value&&(t.value=wt(t.value)),t.status&&(e.status=wt(t.status)),null!==t.value&&void 0!==t.value&&(e.value=t.value)}_checkVarType(t){if(!t)throw new TypeError("Variable cannot be null");if("string"!=typeof t.name)throw new TypeError("Variable Name must be a string")}ExistVar(t){return("string"==typeof t.system||"string"==typeof t.name)&&(!!this.value.hasOwnProperty(t.system)&&!!this.value[t.system].hasOwnProperty(t.name))}}class xt extends pt{constructor(t){super(t,[]),this.errorExpiry_days=7,this.addTransition("create",this._create),this.addTransition("ack",this._ack),this.addTransition("clean",this._cleanup),this.swipe_interval_ID=window.setInterval(()=>{this.applyTransition("clean")},1e4)}GetAll(){return this.value}setSwipeInterval(t){clearInterval(this.swipe_interval_ID),this.swipe_interval_ID=window.setInterval(()=>{this.applyTransition("clean")},t)}Create(t){if(!(t instanceof rt))throw TypeError("input must be a 'systemError' instance.");this.applyTransition("create",t)}_create(t){let e={code:wt(t.code),message:wt(t.message),systemName:wt(t.systemName),targetName:wt(t.targetName),action:wt(t.action),timestamp_ms:t.timestamp_ms,ack:t.ack};this.value.push(e)}Acknoweldge(t){this.applyTransition("ack",t)}_ack(t){let e=this.value[t];if(!e)throw Error(`Error ID '${t}' does not exist`);e.ack=!0}GetUnack(){return this.value.filter(t=>!t.ack)}CleanAll(){this.applyTransition("clean",!0)}_cleanup(t){if(0===this.value.lenght)return;if(t)return void(this.value=[]);let e=this.value.filter(t=>t.timestamp_ms+864e5*this.errorExpiry_days>Date.now());e.length<this.value.length&&(this.value=e)}}var St=new class{constructor(){this.dataTree=new vt,this.errorTray=new xt("errortray"),this.dataEngines=new Map,this.status=tt.Down,this._initPromise=new Promise(t=>{this._initResolve=t}),this._defaultEngine=null}AddEngine(t){let e=wt(t.name);this.dataEngines.set(e,t),null===this._defaultEngine&&(this._defaultEngine=t)}SetDefeultEngine(t){this.dataEngines.has(t.name)||this.AddEngine(t),this._defaultEngine=t}GetEngine(t){if("string"!=typeof t)throw Error("Engine Name must be a string");return"default"===t.toLocaleLowerCase()?this._defaultEngine:this.dataEngines.get(t)}async Subscribe(t,e){if("string"!=typeof e.name||"string"!=typeof e.system)throw Error("CANNOT SUBSCRIBE variable "+e.name);await this.isInitialized(),e.name=wt(e.name),e.system=wt(e.system);let s=this.GetEngine(t);if(!s)throw this.dataTree.Create(e),this.dataTree.UpdateStatus(e,Y.Error),this.CreateAndDispatchError(e.system,et.EngineNotExist,"",st.Subscribe),new Error(`Engine '${t}' does not exist.`);this.dataTree.ExistVar(e)?s.isVarSubscribed(e)||this.dataTree.GetVar(e).status===Y.Pending||this.dataTree.UpdateStatus(e,Y.Pending):this.dataTree.Create(e),s.RequestSubscription(e)}async Unsubscribe(t,e){if("string"!=typeof e.name||"string"!=typeof e.system)throw Error("CANNOT UNSUBSCRIBE variable "+e.name);await this.isInitialized();let s=this.GetEngine(t);if(!s)throw this.CreateAndDispatchError(e.system,et.EngineNotExist,"",st.Unsubscribe),new Error(`Engine '${t}' does not exist.`);s.RequestUnsubscription(e)}Update(t){this.dataTree.Update(t)}async Read(t,e){if("object"!=typeof e)throw new TypeError("'system' must be a string and 'vars' an array of strings");await this.isInitialized();let s=this.GetEngine(t);if(s){let t=await s.Read(e);return s.UpdateVars(t,Y.Subscribed,st.Read),t}throw this.CreateAndDispatchError(t,et.EngineNotExist,"",st.Read),new Error(`Engine '${t}' does not exist.`)}async Write(t,e,s){if("object"!=typeof e||"object"!=typeof s)throw new TypeError("'system' must be a string and 'vars' and values cannot be null");await this.isInitialized();let i=this.GetEngine(t);if(i){let t=e.map(t=>{let e=new nt(t);return e.status=Y.Pending,e});this.dataTree.Update(t);let r=await i.Write(e,s);return i.UpdateVars(r,Y.Subscribed,st.Write),r}throw this.CreateAndDispatchError(t,et.EngineNotExist,"",st.Write),new Error(`Engine '${t}' does not exist.`)}DispatchError(t){this.errorTray.Create(t)}CreateAndDispatchError(t,e,s="",i=""){let r=new rt(t,e,s,i);this.DispatchError(r)}async Init(){this._initResolve(),this.status=tt.Warming;let t=[];Array.from(this.dataEngines.values()).forEach(e=>t.push(e._init())),await Promise.all(t),this.status=tt.Ready}isInitialized(){return this._initPromise}};class Et extends(gt([St.dataTree,St.errorTray],X)){constructor(){super(),this.name="",this.system="default",this.engine="default",this._init=!1,this.service_manager=St}static get properties(){return{name:{type:String},system:{type:String},engine:{type:String}}}get value(){if(this._init)return this.service_manager.dataTree.ExistVar(this)?this.datatree[this.system][this.name].value:null}get status(){return this._init?this.service_manager.dataTree.ExistVar(this)?this.datatree[this.system][this.name].status:Y.Error:Y.Pending}set status(t){if("string"!=typeof t)return;if(!this.service_manager.dataTree.ExistVar(this))return;const e=this.getAttribute("status");e===t&&e===this.status||this.DataUpdate(null,t)}on_datatree_update(){this.setAttribute("status",this.status)}connectedCallback(){super.connectedCallback(),St.Subscribe(this.engine,this).then(()=>{this._init=!0,this.on_datatree_update(),this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),St.Unsubscribe(this.engine,this)}async Write(t){return await this.WriteMultiple([this],[t])}async WriteMultiple(t,e){return await St.Write(this.engine,t,e)}async Read(){return this.ReadMultiple([this])}async ReadMultiple(t){return await St.Read(this.engine,t)}DataUpdate(t,e){let s=new nt(this);s.status=e,s.value=t,this.DataUpdateMultiple(s)}DataUpdateMultiple(t){St.Update(t)}}customElements.define("x-loader",class extends X{static get styles(){return Z`
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
        `}render(){return $`
        <svg class="loader" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path style="fill: none; stroke-width: 75;" d="M 238 38 C 362.264 38 463 138.736 463 263"></path>
        </svg>
        `}});customElements.define("status-switch",class extends Et{static get styles(){return Z`
        
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
        `}render(){return $`
        <x-loader ?show="${this.status===Y.Pending}" > </x-loader>
        <slot  ?show="${this.status===Y.Subscribed}" name="sub"></slot>
        <slot  ?show="${this.status===Y.Unsubscribed}" name="unsub"> </slot>
        <slot  ?show="${this.status===Y.Error}" name="error"> </slot>
        `}});customElements.define("bool-color",class extends Et{static get styles(){return Z`
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
        `}render(){return $`
            <slot val="${this.value?"on":"off"}" 
                  @click="${this.click}"
                  ?show="${this.status!==Y.Pending}"> Empty Slot</slot>
            <x-loader ?show="${this.status===Y.Pending}"></x-loader>
        `}click(){let t=this.status;if(this.hasAttribute("read-only")||t===Y.Error||t===Y.Pending||t===Y.Unsubscribed)return;let e=!this.value;this.Write(e)}});customElements.define("color-box",class extends Et{static get styles(){return Z`
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
        `}render(){return $`
            <slot>Empty Slot</slot>
        `}});const Nt=Z`
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * Correct the font size and margin on 'h1' elements within 'section' and
 * 'article' contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd 'em' font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd 'em' font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent 'sub' and 'sup' elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from 'fieldset elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    'fieldset' elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to 'inherit' in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
:host(:focus) {
    outline:none;
}
:host(:active){
    outline:none;
}
            
button:focus {outline:none;}
input:focus {outline:none;}
::-moz-focus-inner {border:0;}

`;customElements.define("x-position",class extends X{constructor(){super(...arguments),this.orientation="N",this.top=0,this.left=0}static get styles(){return[Z`
        :host{
            display:block;
        }
        :host{
            position: relative;
        }
        :host([orientation="E"]) 
        {
            transform: rotate(90deg); 
        }
        :host([orientation="S"]) 
        {
            transform: rotate(180deg); 
        }
        :host([orientation="W"]) 
        {
            transform: rotate(270deg); 
        }
        
        `]}static get properties(){return{orientation:{type:String},top:{type:Number},left:{type:Number}}}render(){return $`
            <style>
                :host
                {
                    top : ${this.top}%;
                    left : ${this.left}%;
                }
            </style>
            <slot></slot>
        `}});customElements.define("hmi-label",class extends Et{constructor(){super(...arguments),this.orientation="N"}static get properties(){let t=super.properties;return t.orientation={type:String},t}static get styles(){return[Nt,Z`
            :host{
                display:flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
                box-sizing:border-box;
            }
            :host([orientation="W"])
            {
                flex-direction : row;
            }
            :host([orientation="E"])
            {
                flex-direction : row;
            }
            :host([orientation="E"])>div{
                margin-right : 0.2rem;
            }
            :host([orientation="W"])>div{
                margin-right : 0.2rem;
            }
            div{
                border-style : solid;
                border-width : var(--border-w,1px);
                border-color : var(--border-c,grey);
                border-radius : var(--border-r,0.4rem);
                padding: var(--padding,0.3rem);
                font-family: 'Roboto', sans-serif;
                margin-bottom : 0.2rem;
                width:100%;
                flex:1;
                max-width: 5rem;
                max-height: calc(1rem + 2*var(--padding,0.2rem));
                text-align:center;
                color:var(--base-color,#333333);
            }
            x-position{
                flex:2;
                display:flex;
                justify-content : center;
                align-items : center;
            }
            ::slotted(*)
            {
                min-height:1rem;
                min-width:1rem;
            }
            :host([status="ERROR"]) > div{
                color : var(--error-color,red);
            }
            :host([status="WARNING"]) > div{
                color : var(--warning-color,orange);
            }
        `]}render(){return $`
            <div><strong><slot name="label">${this.name}</slot></strong></div>
            <x-position orientation="${this.orientation}">
                <slot>Empty Slot</slot>
            </x-position>
        `}});customElements.define("labeled-icon",class extends Et{constructor(){super(...arguments),this.orientation="N",this.top=0,this.left=0}static get properties(){let t=super.properties;return t.orientation={type:String},t.top={type:Number},t.left={type:Number},t}static get styles(){return Z`
            :host{
                display:block;
            }
            slot#std::slotted(*)
            {
                width:2.5rem;
                height:2.5rem;
            }
        `}render(){return $`
            <x-position top="${this.top}" left="${this.left}">
            <hmi-label name="${this.name}"  engine="${this.engine}" system="${this.system}"
                       orientation="${this.orientation}">
    
                <slot name="label" slot="label">${this.name}</slot>
                <bool-color name="${this.name}"  engine="${this.engine}" system="${this.system}"> 
                    <slot id="std"></slot>
                </bool-color>
    
            </hmi-label>
            </x-position>
        `}});customElements.define("pvr-icon",class extends X{render(){return $`
        <style>
            :host{ 
                display:block;
            }
        </style>
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
        `}});customElements.define("pvd-icon",class extends X{render(){return $`
        <style>
            :host{ 
                display:block;
            }
        </style>
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
        `}});customElements.define("valve-pr",class extends Et{constructor(){super(...arguments),this.orientation="N"}static get properties(){let t=super.properties;return t.orientation={type:String},t}render(){return $`
            <labeled-icon name="${this.name}"  engine="${this.engine}" system="${this.system}"
                       orientation="${this.orientation}">
                <slot slot="label">${this.name}</slot>
                <pvr-icon></pvr-icon>
            </labeled-icon>
        `}});customElements.define("valve-pd",class extends Et{constructor(){super(...arguments),this.orientation="N"}static get properties(){let t=super.properties;return t.orientation={type:String},t}render(){return $`
            <labeled-icon name="${this.name}"  engine="${this.engine}" system="${this.system}"
                       orientation="${this.orientation}">
                <slot slot="label">${this.name}</slot>
                <pvd-icon></pvd-icon>
            </labeled-icon>
        `}});let kt=document.createElement("template");kt.innerHTML='\n<style>\n    :host{\n        display:block;\n    }\n</style>\n<svg viewBox="149.619 91.947 128.401 109.903" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">\n<path d="M 263.874 190.422 L 327.956 301.415 L 199.792 301.415 L 263.874 190.422 Z" transform="matrix(0.499275, 0.866443, -0.866443, 0.499275, 311.10025, -232.379578)" bx:shape="triangle 199.792 190.422 128.164 110.993 0.5 0 1@395242f4"></path>\n</svg>\n';class Ct extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(kt.content.cloneNode(!0))}}customElements.define("x-triangle",Ct);customElements.define("numeric-ind",class extends Et{constructor(){super(),this.precision=2,this.unit=""}static get properties(){let t=super.properties;return t.precision={type:Number},t.unit={type:String},t}static get styles(){return[Nt,Z`
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

        `]}render(){return $`
                <label><strong><slot>${this.name}</slot></strong> </label>
                <div class="display"> 
                    <x-loader ?show="${"PENDING"===this.status}"></x-loader>
                    <strong class="val" ?show="${"PENDING"!==this.status}" > ${Number.parseFloat(this.value).toFixed(this.precision)} </strong> 
                    <span>${this.unit}</span> 
                </div>
        `}});customElements.define("set-number",class extends Et{constructor(){super(),this.precision=2,this.unit="",this.onmousedown=this.show.bind(this),this.onkeydown=this.send.bind(this),this.inpt_val="",this.onblur=this.hide.bind(this)}static get properties(){let t=super.properties;return t.precision={type:Number},t.unit={type:String},t.showinpt={type:Boolean},t}static get styles(){return[Nt,Z`
            :host{
                display:flex;
                flex-direction: column;
                justify-content : center;
                align-items : center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
                cursor: pointer;
                width: 100%;
                max-width : 8rem;
                padding-top: 0.3rem;
                padding-bottom: 0.2rem;

            }
            
            :host([status="${it.Error}"])
            {
                cursor: not-allowed;
            }
            :host([status="${it.Error}"])
            {
                cursor: not-allowed;
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
            }
            :host([status="${it.Error}"]) > .set{
                color : #8B0000;
            }
            :host([status="${it.Unsubscribed}"]) > .set{
                color : #999900;
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
                margin:0px;
                margin-right : 0.1rem;
                color: hsl(0, 0%, 41%) ;
                background-color:hsl(0, 0%, 100%);
                border-radius:.4rem;
                padding:0.5rem;
                font-family: inherit; /* 1 */
                font-size: 0.8rem; /* 1 */
                font-weight: 500;
                line-height: 1; /* 1 */
                border: 1px solid hsl(0, 0%, 86%);
            }
            input:focus{
                border-color : #00d1b2;
            }
            input:invalid{
                border-color:red;
            }
            x-triangle{
                margin-left: 0.5rem;
                width:0.5rem;
            }
            x-triangle[rotate]{
                transform: rotate(90deg); 
            }

            button {
                margin : 0;
                box-sizing : border-box;
                text-align: center;
                text-decoration: none;
                font-size: .8rem;
                font-weight: 700;
                letter-spacing: .1rem;
                padding: 0.2rem;
                background-color: hsl(0, 0%, 100%);
                border: 1px solid hsl(0, 0%, 86%);
                border-radius: .4rem;
                color: hsl(0, 0%, 41%) ;
                cursor: pointer;
                -moz-appearance: none;
                -webkit-appearance: none;
            }
            button:hover{
                border-color : #00d1b2;
            }
            x-loader{
                margin-left : 0.2rem;
                width:0.8rem;
            }
            x-loader:not([show]){
                display : none;
            }
            span[show]{
                display:none;
            }
        `]}render(){return $`
                <label><strong><slot></slot></strong></label>
                <div class="set" id="setcont">set: 
                    <span ?show="${"PENDING"===this.status}">${Number.parseFloat(this.value).toFixed(this.precision)}</span>
                    <x-loader ?show="${"PENDING"===this.status}"></x-loader>
                    <x-triangle ?rotate="${this.showinpt}"></x-triangle> 
                </div>
                <div id="form" class="inpt" ?show="${this.showinpt}">
                        <input id="inpt" type="number" ?disabled="${"ERROR"===this.status||"UNSUBSCRIBED"===this.status}" value="" step="${Math.pow(10,-1*this.precision)}">
                        <button id="btn" type="submit" ?disabled="${"ERROR"===this.status||"UNSUBSCRIBED"===this.status}" @click="${this.send}">Set</button>
                </div>
        `}hide(t){if(!1===this.showinpt)return;this.showinpt=!1,this.removeAttribute("err");let e=this.shadowRoot.getElementById("inpt"),s=this.shadowRoot.getElementById("btn");e.blur(),s.blur(),this.blur()}show(t){if("ERROR"!==this.status&&"UNSUBSCRIBED"!==this.status||(this.showinpt=!0,setTimeout(this.hide.bind(this),1e3)),!0===this.showinpt)return;this.showinpt=!0;let e=this.shadowRoot.getElementById("inpt");setTimeout(()=>{e.focus()},0)}async send(t){if(this.status===Y.Error||this.status===Y.Unsubscribed)return;if(t instanceof KeyboardEvent&&13!==t.keyCode)return;let e=this.shadowRoot.getElementById("inpt").valueAsNumber;Number.isNaN(e)||((await this.Write(e))[0].success?this.hide(null):this.setAttribute("err","true"))}});let Tt=document.createElement("template");Tt.innerHTML='\n<style>\n    :host{\n        display:block;\n    }\n    .xcircle{\n        fill: var(--basic-color, lightgray);\n    }\n</style>\n<svg viewBox="159.193 82.61 52.45 52.508" xmlns="http://www.w3.org/2000/svg">\n  <circle class="st1" cx="47.7" cy="133.3" r="25.7" style="stroke-miterlimit: 10;" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)"></circle>\n  <path d="M 72.761 139.02 C 70.161 150.461 59.928 159 47.7 159 C 43.618 159 39.759 158.048 36.331 156.355" class="xcircle" style="stroke-miterlimit: 10;" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)"></path>\n  <path d="M 37.091 109.885 C 40.325 108.417 43.917 107.6 47.7 107.6 C 60.178 107.6 70.578 116.492 72.911 128.285" class="xcircle" style="stroke-miterlimit: 10;" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)"></path>\n  <line class="st1" x1="73" y1="138.5" x2="36.6" y2="156.5" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)" ></line>\n  <line class="st1" x1="36.6" y1="110.1" x2="73" y2="128.1" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)" ></line>\n</svg>\n';class Ut extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(Tt.content.cloneNode(!0))}}customElements.define("vacum-pump-icon",Ut);customElements.define("vacum-pump",class extends Et{constructor(){super(...arguments),this.orientation="N"}static get properties(){let t=super.properties;return t.orientation={type:String},t}render(){return $`
            <labeled-icon name="${this.name}"  engine="${this.engine}" system="${this.system}"
                       orientation="${this.orientation}">
                <slot slot="label">${this.name}</slot>
                <vacum-pump-icon></vacum-pump-icon>
            </labeled-icon>
        `}});let Rt=new class extends class{constructor(t){this.manager=St,this.status=tt.Down,this.toBeSubscribed=new Map,this.toBeUnsubscribed=new Set,this.subscribedVar=new Map,this.sub_timerID=null,this.unsub_timerID=null,this.aggregationTime_ms=10,this.name=t||"DataEngine",this.VarDispatchErrorCases=[et.VarNotExist,et.WontSubcribe,et.Unauthorized,et.UnknownError,et.CantUnSubcribe],this.VarErrorNoActCases=[et.BadValue,et.CantUnSubcribe,et.Unauthorized],this.VarErrorUnsubCases=[et.CantSubcribe,et.NoNetwork]}serializeSysObject(t){return"string"!=typeof t.name||t.name.includes(":")||"string"!=typeof t.system||t.system.includes(":")?null:t.system+":"+t.name}deserializeSysObject(t){let e=t.split(":");return 2!==e.length?null:{system:e[0],name:e[1]}}RequestSubscription(t){let e=this.serializeSysObject(t);if(null===e)throw Error("CANNOT SUBSCRIBE variable "+t.name);if(this.subscribedVar.has(e)){let t=this.subscribedVar.get(e);return void this.subscribedVar.set(e,t+1)}let s=this.toBeSubscribed.get(e)||0;this.toBeSubscribed.set(e,s+1),this.status!==tt.Down&&this.status!==tt.Warming&&(this.sub_timerID&&clearTimeout(this.sub_timerID),this.sub_timerID=window.setTimeout(this._subcribe.bind(this),this.aggregationTime_ms))}RequestUnsubscription(t){let e=this.serializeSysObject(t);if(null===e||!this.subscribedVar.has(e))throw Error("CANNOT UNSUBSCRIBE variable "+t.name);let s=this.subscribedVar.get(e);s>1?this.subscribedVar.set(e,s-1):(this.toBeUnsubscribed.add(e),this.unsub_timerID&&clearTimeout(this.unsub_timerID),this.unsub_timerID=window.setTimeout(this._unsubcribe.bind(this),this.aggregationTime_ms))}async _subcribe(){let t=Array.from(this.toBeSubscribed.keys()).map(t=>this.deserializeSysObject(t)),e=await this.Subscribe(t);this.updateSubscriberLists(e),this.UpdateVars(e,Y.Subscribed,st.Subscribe)}updateSubscriberLists(t){for(let e of t){let t=this.serializeSysObject(e);if(e.success){let e=this.toBeSubscribed.get(t);e+=this.subscribedVar.get(t)||0,this.subscribedVar.set(t,e),this.toBeSubscribed.delete(t)}else{let s=e.error?e.error.code:et.UnknownError;s!==et.NoNetwork&&s!==et.CantSubcribe&&this.toBeSubscribed.delete(t)}}}isVarSubscribed(t){let e=this.serializeSysObject(t);return this.subscribedVar.has(e)}UpdateVars(t,e,s=""){let i=[];for(let r of t){let t=new nt(r);if(r.success)t.status=e,null!==r.value&&void 0!==r.value&&(t.value=r.value);else{let e=r.error?r.error.code:et.UnknownError;if(this.VarDispatchErrorCases.includes(e)&&this.manager.CreateAndDispatchError(r.system,e,r.name,s),this.VarErrorUnsubCases.includes(e))t.status=Y.Unsubscribed;else if(this.VarErrorNoActCases.includes(e)){let e=this.manager.dataTree.GetVar(r);t.status=e.status===Y.Pending?Y.Subscribed:null}else t.status=Y.Error}i.push(t)}this.manager.Update(i)}async _unsubcribe(){let t=Array.from(this.toBeUnsubscribed).map(t=>this.deserializeSysObject(t)),e=await this.Unsubscribe(t);for(let t of e){let e=this.serializeSysObject(t);t.success&&this.subscribedVar.delete(e),this.toBeUnsubscribed.delete(e)}this.UpdateVars(e,Y.Unsubscribed,st.Unsubscribe)}async _init(){this.status=tt.Warming;let t=await this.Initialize();if(t.success)this.status=tt.Ready;else{this.status=tt.Error;let e=t.error?t.error.code:et.UnknownError,s=new rt(this.name,e,this.name,st.Init);this.manager.DispatchError(s)}this.toBeSubscribed.size>0&&this._subcribe()}UpdateData(t){this.manager.Update(t)}}{constructor(){super(...arguments),this.var_types=new Map}async Initialize(){return{success:!0}}_updateVariables(){let t=[];this.var_types.forEach((e,s)=>{if("number"===e){let e=Math.floor(100*Math.random());t.push(new ot(!0,s,"default",e))}}),0!==t.length&&this.UpdateVars(t,Y.Subscribed,st.Read)}async Subscribe(t){let e=[];return t.forEach(t=>{let s=document.querySelector(`[name="${t.name}"]`);if("string"!=typeof t.name||""===t.name||null===s)return void e.push(new ot(!1,t.name,t.system));if(null!==this.manager.dataTree.GetVar(t).value)return void e.push(new ot(!0,t.name,t.system));let i=0;s.tagName.toLowerCase().includes("bool")?(i=Math.random()>.5,this.var_types.set(t.name,"bool")):(i=Math.floor(100*Math.random()),this.var_types.set(t.name,"number")),e.push(new ot(!0,t.name,t.system,i))}),e}async Unsubscribe(t){return t.map(t=>new ot(!0,t.name,t.system))}async Write(t,e){let s=[];for(let i=0;i<t.length;i++)s.push(new ot(!0,t[i].name,t[i].system,e[i]));return s}async Read(t){throw new Error("Method not implemented.")}}("std");St.AddEngine(Rt),St.Init();
//# sourceMappingURL=main.js.map
