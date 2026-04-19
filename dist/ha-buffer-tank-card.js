var HaBufferTankCard=function(t){"use strict";function e(t,e,n,i){var r,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(o<3?r(s):o>3?r(e,n,s):r(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s}"function"==typeof SuppressedError&&SuppressedError;const n=globalThis,i=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new s(n,t,r)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,m=globalThis,_=m.trustedTypes,y=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,$=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},v=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(t,n,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){const{get:i,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...u(t),...p(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=n.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(e,n.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const n=this.constructor,i=n._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=n.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,n,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),n??=o.getPropertyOptions(t),!((n.hasChanged??v)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,n,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=t=>t,E=k.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+M,P=`<${N}>`,T=document,H=()=>T.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,F="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,j=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,z=/^(?:script|style|textarea|title)$/i,W=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),q=W(1),G=W(2),V=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),K=new WeakMap,X=T.createTreeWalker(T,129);function Z(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const n=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",s=L;for(let e=0;e<n;e++){const n=t[e];let a,l,c=-1,h=0;for(;h<n.length&&(s.lastIndex=h,l=s.exec(n),null!==l);)h=s.lastIndex,s===L?"!--"===l[1]?s=R:void 0!==l[1]?s=I:void 0!==l[2]?(z.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=j):void 0!==l[3]&&(s=j):s===j?">"===l[0]?(s=r??L,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?j:'"'===l[3]?D:B):s===D||s===B?s=j:s===R||s===I?s=L:(s=j,r=void 0);const d=s===j&&t[e+1].startsWith("/>")?" ":"";o+=s===L?n+P:c>=0?(i.push(a),n.slice(0,c)+C+n.slice(c)+M+d):n+M+(-2===c?e:d)}return[Z(t,o+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Q{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let r=0,o=0;const s=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=Q.createElement(l,n),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[o++],n=i.getAttribute(t).split(M),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:s[2],strings:n,ctor:"."===s[1]?rt:"?"===s[1]?ot:"@"===s[1]?st:it}),i.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(z.test(i.tagName)){const t=i.textContent.split(M),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let n=0;n<e;n++)i.append(t[n],H()),X.nextNode(),a.push({type:2,index:++r});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===N)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(M,t+1));)a.push({type:7,index:r}),t+=M.length-1}r++}}static createElement(t,e){const n=T.createElement("template");return n.innerHTML=t,n}}function tt(t,e,n=t,i){if(e===V)return e;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(e=tt(t,r._$AS(t,e.values),r,i)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);X.currentNode=i;let r=X.nextNode(),o=0,s=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new nt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new at(r,this,t)),this._$AV.push(e),a=n[++s]}o!==a?.index&&(r=X.nextNode(),o++)}return X.currentNode=T,i}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),U(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,i="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Q.createElement(Z(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new et(i,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const r of t)i===e.length?e.push(n=new nt(this.O(H()),this.O(H()),this,this.options)):n=e[i],n._$AI(r),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,r){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=J}_$AI(t,e=this,n,i){const r=this.strings;let o=!1;if(void 0===r)t=tt(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const i=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=tt(this,i[n+s],e,s),a===V&&(a=this._$AH[s]),o||=!U(a)||a!==this._$AH[s],a===J?t=J:t!==J&&(t+=(a??"")+r[s+1]),this._$AH[s]=a}o&&!i&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}}class st extends it{constructor(t,e,n,i,r){super(t,e,n,i,r),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??J)===V)return;const n=this._$AH,i=t===J&&n!==J||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==J&&(n===J||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}let at=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}};const lt=k.litHtmlPolyfillSupport;lt?.(Q,nt),(k.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let ht=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const i=n?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=n?.renderBefore??null;i._$litPart$=r=new nt(e.insertBefore(H(),t),t,void 0,n??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.2");const ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},pt=(t=ut,e,n)=>{const{kind:i,metadata:r}=n;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),"accessor"===i){const{name:i}=n;return{set(n){const r=e.get.call(this);e.set.call(this,n),this.requestUpdate(i,r,t,!0,n)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];e.call(this,n),this.requestUpdate(i,r,t,!0,n)}}throw Error("Unsupported decorator location: "+i)};function ft(t){return(e,n)=>"object"==typeof n?pt(t,e,n):((t,e,n)=>{const i=e.hasOwnProperty(n);return e.constructor.createProperty(n,t),i?Object.getOwnPropertyDescriptor(e,n):void 0})(t,e,n)}function mt(t){return ft({...t,state:!0,attribute:!1})}var _t,yt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(_t||(_t={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(yt||(yt={}));var gt=["closed","locked","off"],$t=function(t,e,n,i){i=i||{},n=null==n?{}:n;var r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=n,t.dispatchEvent(r),r},bt=function(t){$t(window,"haptic",t)},vt=function(t,e,n,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(bt("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(n.entity||n.camera_image)&&$t(t,"hass-more-info",{entityId:n.entity?n.entity:n.camera_image});break;case"navigate":i.navigation_path&&function(t,e,n){void 0===n&&(n=!1),n?history.replaceState(null,"",e):history.pushState(null,"",e),$t(window,"location-changed",{replace:n})}(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":n.entity&&(function(t,e){(function(t,e,n){void 0===n&&(n=!0);var i,r=function(t){return t.substr(0,t.indexOf("."))}(e),o="group"===r?"homeassistant":r;switch(r){case"lock":i=n?"unlock":"lock";break;case"cover":i=n?"open_cover":"close_cover";break;default:i=n?"turn_on":"turn_off"}t.callService(o,i,{entity_id:e})})(t,e,gt.includes(t.states[e].state))}(e,n.entity),bt("success"));break;case"call-service":if(!i.service)return void bt("failure");var r=i.service.split(".",2);e.callService(r[0],r[1],i.service_data,i.target),bt("success");break;case"fire-dom-event":$t(t,"ll-custom",i)}};function wt(t){return void 0!==t&&"none"!==t.action}class xt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class kt extends HTMLElement{constructor(){super(...arguments),this.holdTime=500,this.held=!1}bind(t,e={}){if(t.actionHandler&&JSON.stringify(t.actionHandler.options)===JSON.stringify(e))return;t.actionHandler&&(t.removeEventListener("touchstart",t.actionHandler.start),t.removeEventListener("touchend",t.actionHandler.end),t.removeEventListener("touchcancel",t.actionHandler.end),t.removeEventListener("mousedown",t.actionHandler.start),t.removeEventListener("click",t.actionHandler.end),t.removeEventListener("keyup",t.actionHandler.end)),t.actionHandler={options:e},t.actionHandler.start=t=>{this.held=!1,e.hasHold&&(this.timer=window.setTimeout(()=>{this.held=!0},this.holdTime)),t.stopPropagation()},t.actionHandler.end=n=>{["touchend","touchcancel"].includes(n.type)&&void 0===this.timer||(window.clearTimeout(this.timer),this.timer=void 0,this.held?$t(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===n.type&&n.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,$t(t,"action",{action:"tap"})},250):(window.clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,$t(t,"action",{action:"double_tap"})):$t(t,"action",{action:"tap"}))};t.addEventListener("touchstart",t.actionHandler.start,{passive:!0}),t.addEventListener("touchend",t.actionHandler.end),t.addEventListener("touchcancel",t.actionHandler.end),t.addEventListener("mousedown",t.actionHandler.start,{passive:!0}),t.addEventListener("click",t.actionHandler.end),t.addEventListener("keyup",e=>{"Enter"!==e.key&&" "!==e.key||t.actionHandler?.end?.(e)})}}if(!customElements.get("buffer-tank-action-handler"))try{customElements.define("buffer-tank-action-handler",kt)}catch(t){if(!(t instanceof DOMException&&"NotSupportedError"===t.name))throw t}const At=(t,e)=>{(()=>{const t=document.body;let e=t.querySelector("buffer-tank-action-handler");return e||(e=document.createElement("buffer-tank-action-handler"),t.appendChild(e)),e})().bind(t,e)};const Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends xt{render(t={}){return V}update(t,[e]){return At(t.element,e??{}),V}}),St=["#011F9D","#0030C9","#659CFB","#CAE6FF","#FB623A","#F12710"],Ct=100,Mt=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;class Nt extends Error{}function Pt(t){if(t.entity)return"A";if(t.sensors&&t.tank_height)return"B";throw new Nt("Configure either `entity` (Mode A) or `sensors` + `tank_height` (Mode B).")}function Tt(t){if(!t||"object"!=typeof t)throw new Nt("Invalid configuration object.");const e=t,n={type:String(e.type??"custom:buffer-tank-card")};if("string"==typeof e.entity&&e.entity&&(n.entity=e.entity),void 0!==e.sensors){if(!Array.isArray(e.sensors))throw new Nt("`sensors` must be a list.");if(e.sensors.length<1)throw new Nt("`sensors` must contain at least one entry.");n.sensors=e.sensors.map((t,e)=>function(t,e){if(!t||"object"!=typeof t)throw new Nt(`sensors[${e}] must be an object.`);const n=t;if("string"!=typeof n.entity||!n.entity)throw new Nt(`sensors[${e}].entity is required.`);if("number"!=typeof n.position||!Number.isFinite(n.position))throw new Nt(`sensors[${e}].position must be a number (mm from bottom).`);const i={entity:n.entity,position:n.position};return"string"==typeof n.name&&(i.name=n.name),i}(t,e))}if(void 0!==e.tank_height){if("number"!=typeof e.tank_height||e.tank_height<=0)throw new Nt("`tank_height` must be a positive number (mm).");n.tank_height=e.tank_height}if(n.sensors&&n.tank_height)for(const t of n.sensors)if(t.position<0||t.position>n.tank_height)throw new Nt(`Sensor ${t.entity} position ${t.position} must be between 0 and tank_height (${n.tank_height}).`);if(void 0!==e.min_temperature){if("number"!=typeof e.min_temperature)throw new Nt("`min_temperature` must be a number.");n.min_temperature=e.min_temperature}if(void 0!==e.max_temperature){if("number"!=typeof e.max_temperature)throw new Nt("`max_temperature` must be a number.");n.max_temperature=e.max_temperature}if(void 0!==e.color_hot||void 0!==e.color_cold)throw new Nt('`color_hot` and `color_cold` were replaced by `colors` (array of hex colors, cold → hot). Example: `colors: ["#011F9D", "#0030C9", "#659CFB", "#CAE6FF", "#FB623A", "#F12710"]`.');if(void 0!==e.colors){if(!Array.isArray(e.colors))throw new Nt("`colors` must be a list of hex color strings (cold → hot).");if(e.colors.length<2)throw new Nt("`colors` must contain at least two entries (cold → hot).");const t=[];e.colors.forEach((e,n)=>{if("string"!=typeof e||!Mt.test(e))throw new Nt(`colors[${n}] must be a hex color string like "#1976d2" or "#abc".`);t.push(e)}),n.colors=t}if(void 0!==e.probe_side){if("left"!==e.probe_side&&"right"!==e.probe_side&&"alternating"!==e.probe_side)throw new Nt("`probe_side` must be one of: left, right, alternating.");n.probe_side=e.probe_side}return"boolean"==typeof e.show_stats&&(n.show_stats=e.show_stats),"boolean"==typeof e.show_thermocline&&(n.show_thermocline=e.show_thermocline),"string"==typeof e.name&&(n.name=e.name),void 0!==e.heat_exchanger&&(n.heat_exchanger=function(t){if(!t||"object"!=typeof t)throw new Nt("`heat_exchanger` must be an object.");const e=t,n={};if(void 0!==e.position){if("top"!==e.position&&"bottom"!==e.position)throw new Nt("`heat_exchanger.position` must be `top` or `bottom`.");n.position=e.position}if(void 0!==e.supply_entity){if("string"!=typeof e.supply_entity||!e.supply_entity)throw new Nt("`heat_exchanger.supply_entity` must be a non-empty string.");n.supply_entity=e.supply_entity}if(void 0!==e.return_entity){if("string"!=typeof e.return_entity||!e.return_entity)throw new Nt("`heat_exchanger.return_entity` must be a non-empty string.");n.return_entity=e.return_entity}if(void 0!==e.enabled)if("boolean"==typeof e.enabled)n.enabled=e.enabled;else{if("string"!=typeof e.enabled||!e.enabled)throw new Nt("`heat_exchanger.enabled` must be a boolean or a non-empty entity id.");n.enabled=e.enabled}if(void 0!==e.reverse_flow)if("boolean"==typeof e.reverse_flow)n.reverse_flow=e.reverse_flow;else{if("string"!=typeof e.reverse_flow||!e.reverse_flow)throw new Nt("`heat_exchanger.reverse_flow` must be a boolean or a non-empty entity id.");n.reverse_flow=e.reverse_flow}if(void 0!==e.turns){if("number"!=typeof e.turns||!Number.isFinite(e.turns)||e.turns<1)throw new Nt("`heat_exchanger.turns` must be a number >= 1.");n.turns=e.turns}if(void 0!==e.height_fraction){if("number"!=typeof e.height_fraction||!Number.isFinite(e.height_fraction)||e.height_fraction<=0||e.height_fraction>1)throw new Nt("`heat_exchanger.height_fraction` must be a number in (0, 1].");n.height_fraction=e.height_fraction}if(void 0!==e.flow_animation){if("boolean"!=typeof e.flow_animation)throw new Nt("`heat_exchanger.flow_animation` must be a boolean.");n.flow_animation=e.flow_animation}if(void 0!==e.flow_speed){if("number"!=typeof e.flow_speed||!Number.isFinite(e.flow_speed)||e.flow_speed<=0)throw new Nt("`heat_exchanger.flow_speed` must be a positive number (seconds).");n.flow_speed=e.flow_speed}if(void 0!==e.flow_color){if("string"!=typeof e.flow_color||!e.flow_color.trim())throw new Nt("`heat_exchanger.flow_color` must be a non-empty CSS color string.");n.flow_color=e.flow_color}if(void 0!==e.name){if("string"!=typeof e.name)throw new Nt("`heat_exchanger.name` must be a string.");n.name=e.name}return n}(e.heat_exchanger)),e.tap_action&&(n.tap_action=e.tap_action),e.hold_action&&(n.hold_action=e.hold_action),e.double_tap_action&&(n.double_tap_action=e.double_tap_action),Pt(n),n}function Ht(t,e){if(0===t.length)return NaN;if(e<=t[0].position_mm)return t[0].temperature;const n=t[t.length-1];if(e>=n.position_mm)return n.temperature;for(let n=0;n<t.length-1;n++){const i=t[n],r=t[n+1];if(e>=i.position_mm&&e<=r.position_mm){const t=r.position_mm-i.position_mm;if(t<=0)return i.temperature;const n=(e-i.position_mm)/t;return i.temperature+(r.temperature-i.temperature)*n}}return n.temperature}const Ut=new Set(["unavailable","unknown","none",""]);function Ot(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){if(Ut.has(t.toLowerCase()))return null;const e=parseFloat(t);return Number.isFinite(e)?e:null}return null}function Ft(t){const e=t.filter(t=>Number.isFinite(t));if(0===e.length)return{average:null,delta:null};const n=e.reduce((t,e)=>t+e,0);return{average:n/e.length,delta:Math.max(...e)-Math.min(...e)}}function Lt(t,e){const n="A"===Pt(e)?function(t,e){const n=e.entity,i=t?.states?.[n];if(!i)return Bt(e,`Entity ${n} not found.`);if(Ut.has(String(i.state).toLowerCase()))return Bt(e,`Entity ${n} is ${i.state}.`);const r=i.attributes??{},o=Ot(r.tank_height_mm);if(null===o||o<=0)return Bt(e,`Entity ${n} is missing attribute tank_height_mm. Update the buffer tank integration.`);const s=Array.isArray(r.layers)?r.layers:null;let a;a=s&&s.length>0?s.map(t=>{const e=Ot(t);return null===e?NaN:e}):new Array(Ct).fill(NaN);const l=[],c=Array.isArray(r.probes)?r.probes:[];for(const t of c){if(!t||"object"!=typeof t)continue;const e=t,n=Ot(e.position_mm);null!==n&&l.push({entity:"string"==typeof e.entity?e.entity:"string"==typeof e.entity_id?e.entity_id:void 0,name:"string"==typeof e.name?e.name:void 0,position_mm:n,temperature:Ot(e.temperature),virtual:Boolean(e.virtual)})}const h=Ot(r.reference_temperature),d=Ot(r.min_temperature),u=Ot(r.max_temperature),p=e.min_temperature??d??h??20,f=e.max_temperature??u??80,m=Ot(i.state),_=Ft(a),y=Ot(r.thermocline_position_mm),g=Ot(r.thermocline_thickness_mm);return{mode:"A",tank_height_mm:o,layers:a,probes:l,min_temperature:p,max_temperature:f,reference_temperature:h??void 0,thermocline_position_mm:y,thermocline_thickness_mm:g,soc:m,average:_.average,delta:_.delta,available:a.some(t=>Number.isFinite(t)),error:void 0}}(t,e):function(t,e){const n=e.tank_height,i=[],r=[];for(const n of e.sensors??[]){const e=t?.states?.[n.entity],o=e?Ot(e.state):null;i.push({entity:n.entity,name:n.name??e?.attributes?.friendly_name??n.entity,position_mm:n.position,temperature:o,virtual:!1}),null!==o&&r.push({position_mm:n.position,temperature:o})}const o=function(t,e,n=100){const i=t.filter(t=>Number.isFinite(t.temperature)&&Number.isFinite(t.position_mm)).slice().sort((t,e)=>t.position_mm-e.position_mm),r=new Array(n);if(0===i.length)return r.fill(NaN),r;if(1===i.length)return r.fill(i[0].temperature),r;for(let t=0;t<n;t++){const o=t/(n-1)*e;r[t]=Ht(i,o)}return r}(r,n,Ct),s=Ft(o);return{mode:"B",tank_height_mm:n,layers:o,probes:i,min_temperature:e.min_temperature??20,max_temperature:e.max_temperature??80,thermocline_position_mm:null,thermocline_thickness_mm:null,soc:null,average:s.average,delta:s.delta,available:r.length>0,error:0===r.length?"No probe has a valid temperature.":void 0}}(t,e);return e.heat_exchanger&&(n.heat_exchanger=function(t,e){const n=e.heat_exchanger,i=(l=n,{position:l.position??"bottom",turns:l.turns??6,height_fraction:l.height_fraction??.35,flow_animation:l.flow_animation??!1,flow_speed:l.flow_speed??3,flow_color:l.flow_color??"rgba(255,255,255,0.55)"}),r=jt(t,n.enabled,!0),o=jt(t,n.reverse_flow,!1),s=n.supply_entity?Ot(t?.states?.[n.supply_entity]?.state):null,a=n.return_entity?Ot(t?.states?.[n.return_entity]?.state):null;var l;return{position:i.position,enabled:r,reverse_flow:o,turns:i.turns,height_fraction:i.height_fraction,supply_temperature:s,return_temperature:a,flow_animation:i.flow_animation,flow_speed:i.flow_speed,flow_color:i.flow_color,name:n.name}}(t,e)),n}const Rt=new Set(["on","true","yes","open","enabled","active","1"]),It=new Set(["off","false","no","closed","disabled","inactive","0"]);function jt(t,e,n){if(void 0===e)return n;if("boolean"==typeof e)return e;const i=t?.states?.[e]?.state;if(null==i)return!1;const r=String(i).toLowerCase();if(Rt.has(r))return!0;if(It.has(r))return!1;const o=parseFloat(r);return!!Number.isFinite(o)&&0!==o}function Bt(t,e){return{mode:t.entity?"A":"B",tank_height_mm:t.tank_height??2e3,layers:new Array(Ct).fill(NaN),probes:[],min_temperature:t.min_temperature??20,max_temperature:t.max_temperature??80,thermocline_position_mm:null,thermocline_thickness_mm:null,soc:null,average:null,delta:null,available:!1,error:e}}function Dt(t){let e=t.trim();if(e.startsWith("#")&&(e=e.slice(1)),3===e.length&&(e=e.split("").map(t=>t+t).join("")),6!==e.length)return[128,128,128];const n=parseInt(e,16);return Number.isNaN(n)?[128,128,128]:[n>>16&255,n>>8&255,255&n]}function zt(t){return Math.max(0,Math.min(255,Math.round(t))).toString(16).padStart(2,"0")}function Wt(t,e,n){return Math.max(e,Math.min(n,t))}function qt(t,e){if(0===t.length)return"#808080";if(1===t.length)return t[0];const n=Wt(e,0,1)*(t.length-1),i=Math.min(t.length-2,Math.floor(n));return function(t,e,n){const[i,r,o]=Dt(t),[s,a,l]=Dt(e),c=Wt(n,0,1);return`#${zt(i+(s-i)*c)}${zt(r+(a-r)*c)}${zt(o+(l-o)*c)}`}(t[i],t[i+1],n-i)}function Gt(t,e,n,i){if(!Number.isFinite(t))return qt(i,0);if(n===e)return qt(i,.5);return qt(i,(t-e)/(n-e))}const Vt=40,Jt=120,Kt=360,Xt=Vt,Zt=160,Yt=20,Qt=380;function te(t,e,n){const i=function(t){return t.colors??[...St]}(e),r=t.min_temperature,o=t.max_temperature,s=r===o,a=function(t){return t.show_stats??!0}(e),l=function(t,e,n,i,r){const o=t.length;if(0===o)return[];const s=[];for(let a=0;a<o;a++){const l=t[a];let c;if(Number.isFinite(l))if(r)c=qt(i,.5);else{c=qt(i,Wt((l-e)/(n-e),0,1))}else c=qt(i,.5);const h=1===o?0:a/(o-1);s.push(G`<stop offset="${h}" stop-color="${c}" />`)}return s}(t.layers,r,o,i,s),c=function(t,e,n){if(0===t.length)return[];const i=function(t){return t.probe_side??"alternating"}(n),r=t.slice().sort((t,e)=>e.position_mm-t.position_mm),o=[];return r.forEach((t,n)=>{let r;r="left"===i||"right"!==i&&n%2==0;const s=ee(t.position_mm,e),a=r?Xt:Zt,l=r?50:150,c=r?36:164,h=r?"end":"start",d=t.name??t.entity??"Probe",u=t.temperature,p=null!==u&&Number.isFinite(u)?`${u.toFixed(1)} °C`:"n/a";o.push(G`
      <line
        x1="${a}"
        y1="${s}"
        x2="${l}"
        y2="${s}"
        stroke="var(--primary-text-color, #222)"
        stroke-width="1.5"
        stroke-dasharray="${t.virtual?"2 2":"none"}"
      />
      <text
        x="${c}"
        y="${s-1}"
        text-anchor="${h}"
        font-size="9"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${d}</text>
      <text
        x="${c}"
        y="${s+9}"
        text-anchor="${h}"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${p}</text>
    `)}),o}(t.probes,t.tank_height_mm,e),h=n.showThermocline?function(t,e){const n=t.thermocline_position_mm,i=t.thermocline_thickness_mm;if(null===n||null===i||!Number.isFinite(n)||!Number.isFinite(i))return null;if(i<=0||t.tank_height_mm<=0)return null;const r=Kt/t.tank_height_mm,o=Math.max(2,i*r),s=ee(n,t.tank_height_mm),a=s-o/2,l=Math.max(20,Math.min(380-o,a));return G`
    <rect
      x="${41}"
      y="${l}"
      width="${118}"
      height="${o}"
      fill="url(#${e})"
      pointer-events="none"
    />
  `}(t,n.hatchId):null,d=t.heat_exchanger?function(t,e,n,i,r){const o=function(t){const e=Math.max(1,Math.round(t.turns)),n=Wt(t.height_fraction,.05,1),i=14,r=Kt-2*i,o=Math.max(40,Math.min(r,Kt*n)),s="top"===t.position?Yt+i:Qt-i-o,a=s+o,l=100,c=45.6,h=Math.max(6,Math.min(18,o/(3*e))),d=(o-2*h)/e,u=Wt(.55*d,6,12),p=64,f=e*p,m=[];for(let t=0;t<=f;t++){const e=t/p,n=2*Math.PI*e,i=l+c*Math.cos(n),r=s+h+e*d+h*Math.sin(n);m.push({x:i,y:r,front:Math.sin(n)>0})}const _=t.reverse_flow?m.slice().reverse():m,y=_[0],g=_[_.length-1],$={x1:y.x,y1:y.y,x2:ne,y2:y.y},b={x1:g.x,y1:g.y,x2:ne,y2:g.y},v=[{x:$.x2,y:$.y2},{x:$.x1,y:$.y1},..._,{x:b.x2,y:b.y2}],w=ie(v);return{regionTop:s,regionBottom:a,cx:l,rx:c,ry:h,pitch:d,strokeWidth:u,points:m,supplyPipe:$,returnPipe:b,flowPath:w,labelX:ne}}(t),{regionTop:s,regionBottom:a,points:l,strokeWidth:c,supplyPipe:h,returnPipe:d,flowPath:u,labelX:p}=o,{front:f,back:m}=function(t){const e=[],n=[];if(0===t.length)return{front:e,back:n};let i=t[0].front,r=[t[0]];for(let o=1;o<t.length;o++){const s=t[o];s.front===i?r.push(s):(r.push(s),(i?e:n).push(ie(r)),r=[s],i=s.front)}r.length>1&&(i?e:n).push(ie(r));return{front:e,back:n}}(l),_=c+1.5,y=.95*c,g=.95*_,$=oe(h),b=oe(d),v=h.y1<=d.y1,w=v?h.y1-c/2-3:h.y1+c/2+10,x=v?d.y1+c/2+10:d.y1-c/2-3;if(!t.enabled){const t="var(--primary-text-color, #444)";return G`
      <g class="buffer-tank-hx buffer-tank-hx--disabled" pointer-events="none">
        ${m.map(e=>G`
          <path
            d="${e}"
            fill="none"
            stroke="${t}"
            stroke-width="${y}"
            stroke-linecap="round"
            stroke-dasharray="3 3"
            opacity="0.55"
          />`)}
        ${f.map(e=>G`
          <path
            d="${e}"
            fill="none"
            stroke="${t}"
            stroke-width="${c}"
            stroke-linecap="round"
            opacity="0.85"
          />`)}
        <path
          d="${$}"
          fill="none"
          stroke="${t}"
          stroke-width="${c}"
          stroke-linecap="round"
          opacity="0.85"
        />
        <path
          d="${b}"
          fill="none"
          stroke="${t}"
          stroke-width="${c}"
          stroke-linecap="round"
          opacity="0.85"
        />
      </g>
    `}const k=t.supply_temperature,A=t.return_temperature,E=qt(i,.5),S=null!==k&&Number.isFinite(k)?Gt(k,e,n,i):E,C=null!==A&&Number.isFinite(A)?Gt(A,e,n,i):E,M="var(--primary-text-color, #222)",N=t.flow_animation?G`
      <path
        class="buffer-tank-hx__flow"
        d="${u}"
        fill="none"
        stroke="${t.flow_color}"
        stroke-width="${Math.max(1.5,.38*c)}"
        stroke-linecap="round"
        style="--btc-flow-duration: ${t.flow_speed}s"
      />`:null,P=t.reverse_flow?C:S,T=t.reverse_flow?S:C;return G`
    <defs>
      <linearGradient
        id="${r}"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="${s}"
        x2="0"
        y2="${a}"
      >
        <stop offset="0" stop-color="${P}" />
        <stop offset="1" stop-color="${T}" />
      </linearGradient>
    </defs>
    <g class="buffer-tank-hx" pointer-events="none">
      ${m.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="${M}"
          stroke-width="${g}"
          stroke-linecap="round"
          opacity="0.6"
        />`)}
      ${m.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="url(#${r})"
          stroke-width="${y}"
          stroke-linecap="round"
          opacity="0.95"
        />`)}
      ${f.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="${M}"
          stroke-width="${_}"
          stroke-linecap="round"
          opacity="0.55"
        />`)}
      ${f.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="url(#${r})"
          stroke-width="${c}"
          stroke-linecap="round"
          opacity="1"
        />`)}
      <path
        d="${$}"
        fill="none"
        stroke="${M}"
        stroke-width="${_}"
        stroke-linecap="round"
        opacity="0.55"
      />
      <path
        d="${$}"
        fill="none"
        stroke="${S}"
        stroke-width="${c}"
        stroke-linecap="round"
      />
      <path
        d="${b}"
        fill="none"
        stroke="${M}"
        stroke-width="${_}"
        stroke-linecap="round"
        opacity="0.55"
      />
      <path
        d="${b}"
        fill="none"
        stroke="${C}"
        stroke-width="${c}"
        stroke-linecap="round"
      />
      ${N}
      <text
        x="${p}"
        y="${w}"
        text-anchor="end"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${re(k)}</text>
      <text
        x="${p}"
        y="${x}"
        text-anchor="end"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${re(A)}</text>
    </g>
  `}(t.heat_exchanger,r,o,i,n.coilGradientId):null,u=a?function(t){const e=[];"A"===t.mode&&null!==t.soc&&Number.isFinite(t.soc)&&e.push(`SoC: ${t.soc.toFixed(0)} %`);null!==t.average&&e.push(`Ø ${t.average.toFixed(1)} °C`);null!==t.delta&&e.push(`Δ ${t.delta.toFixed(1)} K`);if(0===e.length)return null;const n=100,i=200-18*(e.length-1)/2;return G`
    <g font-family="var(--paper-font-body1_-_font-family, sans-serif)" text-anchor="middle"
       paint-order="stroke" stroke="#ffffff" stroke-width="3" fill="#000000">
      ${e.map((t,e)=>G`
          <text x="${n}" y="${i+18*e}" font-size="16" font-weight="600">${t}</text>
        `)}
    </g>
  `}(t):null;return G`
    <svg
      viewBox="0 0 ${200} ${400}"
      preserveAspectRatio="xMidYMid meet"
      class="buffer-tank-svg"
      role="img"
      aria-label="Buffer tank"
    >
      <defs>
        <linearGradient id="${n.gradientId}" x1="0" y1="1" x2="0" y2="0">
          ${l}
        </linearGradient>
        ${n.showThermocline?G`
        <pattern id="${n.hatchId}" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,0.35)" stroke-width="2" />
        </pattern>`:null}
      </defs>
      <rect
        x="${Vt}"
        y="${20}"
        width="${Jt}"
        height="${Kt}"
        rx="${14}"
        ry="${14}"
        fill="url(#${n.gradientId})"
        stroke="var(--primary-text-color, #222)"
        stroke-width="1.5"
      />
      ${h}
      ${d}
      ${c}
      ${u}
    </svg>
  `}function ee(t,e){const n=Wt(t,0,e);return Yt+Kt*(1-(e>0?n/e:0))}const ne=192;function ie(t){return t.map((t,e)=>`${0===e?"M":"L"}${t.x.toFixed(2)} ${t.y.toFixed(2)}`).join(" ")}function re(t){return null!==t&&Number.isFinite(t)?`${t.toFixed(1)} °C`:"n/a"}function oe(t){return`M${t.x1.toFixed(2)} ${t.y1.toFixed(2)} L${t.x2.toFixed(2)} ${t.y2.toFixed(2)}`}const se="buffer-tank-card",ae=window,le=!0===ae.__bufferTankCardLoaded;if(ae.__bufferTankCardLoaded=!0,!le){console.info("%c buffer-tank-card %c v0.1.0 ","background:#1976d2;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600;","background:#d32f2f;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;");const t=ae.customCards??(ae.customCards=[]);t.some(t=>t.type===se)||t.push({type:se,name:"Buffer Tank Card",description:"Visualizes a buffer/heat storage tank with a temperature gradient and probes.",preview:!0})}let ce=0;class he extends ht{constructor(){super(...arguments),this._gradientId="btc-grad-"+ ++ce,this._hatchId=`btc-hatch-${ce}`,this._coilGradientId=`btc-coil-${ce}`,this._handleAction=t=>{this.hass&&this._config&&t.detail?.action&&function(t,e,n,i){var r;"double_tap"===i&&n.double_tap_action?r=n.double_tap_action:"hold"===i&&n.hold_action?r=n.hold_action:"tap"===i&&n.tap_action&&(r=n.tap_action),vt(t,e,n,r)}(this,this.hass,this._config,t.detail.action)}}static getStubConfig(){return{tank_height:2e3,sensors:[{entity:"sensor.probe_top",position:1800},{entity:"sensor.probe_middle",position:1e3},{entity:"sensor.probe_bottom",position:200}]}}setConfig(t){try{this._config=Tt(t),this._configError=void 0}catch(t){throw this._config=void 0,this._configError=t instanceof Nt?t.message:String(t),t}}getCardSize(){return 5}render(){if(this._configError||!this._config)return this._renderWarning(this._configError??"Invalid configuration.");if(!this.hass)return q`<ha-card><div class="empty">Loading…</div></ha-card>`;let t;try{t=Lt(this.hass,this._config)}catch(t){const e=t instanceof Error?t.message:String(t);return this._renderWarning(e)}return t.available?this._renderCard(t,!1):this._renderCard(t,!0)}_renderCard(t,e){const n=this._config,i="A"===t.mode&&(n.show_thermocline??!0)&&null!==t.thermocline_position_mm&&null!==t.thermocline_thickness_mm;return q`
      <ha-card
        class=${e?"dimmed":""}
        .header=${n.name??J}
        @action=${this._handleAction}
        .actionHandler=${Et({hasHold:wt(n.hold_action),hasDoubleClick:wt(n.double_tap_action)})}
        tabindex=${wt(n.tap_action)?"0":"-1"}
      >
        <div class="tank-wrapper">
          ${te(t,n,{gradientId:this._gradientId,hatchId:this._hatchId,coilGradientId:this._coilGradientId,showThermocline:i})}
          ${t.error?q`<div class="overlay-error">${t.error}</div>`:J}
        </div>
      </ha-card>
    `}_renderWarning(t){return q`<hui-warning>${t}</hui-warning>`}static get styles(){return a`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
        padding: 12px;
        position: relative;
      }
      ha-card.dimmed {
        opacity: 0.55;
      }
      .tank-wrapper {
        position: relative;
        width: 100%;
        max-width: 260px;
        margin: 0 auto;
      }
      .buffer-tank-svg {
        width: 100%;
        height: auto;
        display: block;
      }
      .overlay-error {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        text-align: center;
        font-size: 12px;
        color: var(--error-color, #d32f2f);
        background: var(--card-background-color, rgba(255, 255, 255, 0.9));
        padding: 2px 6px;
        border-radius: 4px;
      }
      .empty {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color, #666);
      }
      .buffer-tank-hx__flow {
        stroke-dasharray: 3 10;
        animation: btc-hx-flow var(--btc-flow-duration, 3s) linear infinite;
      }
      @keyframes btc-hx-flow {
        to {
          stroke-dashoffset: -13;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .buffer-tank-hx__flow {
          animation: none;
        }
      }
    `}}if(e([ft({attribute:!1})],he.prototype,"hass",void 0),e([mt()],he.prototype,"_config",void 0),e([mt()],he.prototype,"_configError",void 0),!customElements.get(se))try{customElements.define(se,he)}catch(t){if(!(t instanceof DOMException&&"NotSupportedError"===t.name))throw t}return t.BufferTankCard=he,t}({});
