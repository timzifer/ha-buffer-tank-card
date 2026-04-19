var HaBufferTankCard=function(t){"use strict";function e(t,e,n,r){var o,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(i<3?o(s):i>3?o(e,n,s):o(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s}"function"==typeof SuppressedError&&SuppressedError;const n=globalThis,r=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new s(n,t,o)},l=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,m=globalThis,_=m.trustedTypes,y=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,$=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},w=(t,e)=>!c(t,e),v={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(t,n,e);void 0!==r&&h(this.prototype,t,r)}}static getPropertyDescriptor(t,e,n){const{get:r,set:o}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const i=r?.call(this);o?.call(this,e),this.requestUpdate(t,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of e){const e=document.createElement("style"),o=n.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=r.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,n);if(void 0!==r&&!0===n.reflect){const o=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(e,n.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const n=this.constructor,r=n._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=n.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const i=o.fromAttribute(e,t.type);this[r]=i??this._$Ej?.get(r)??i,this._$Em=null}}requestUpdate(t,e,n,r=!1,o){if(void 0!==t){const i=this.constructor;if(!1===r&&(o=this[t]),n??=i.getPropertyOptions(t),!((n.hasChanged??w)(o,e)||n.useDefault&&n.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:r,wrapped:o},i){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),!0!==o||void 0!==i)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,n,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=t=>t,E=k.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+M,P=`<${N}>`,F=document,T=()=>F.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,I=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,z=/^(?:script|style|textarea|title)$/i,W=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),q=W(1),G=W(2),V=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),K=new WeakMap,X=F.createTreeWalker(F,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const n=t.length-1,r=[];let o,i=2===e?"<svg>":3===e?"<math>":"",s=L;for(let e=0;e<n;e++){const n=t[e];let a,l,c=-1,h=0;for(;h<n.length&&(s.lastIndex=h,l=s.exec(n),null!==l);)h=s.lastIndex,s===L?"!--"===l[1]?s=R:void 0!==l[1]?s=j:void 0!==l[2]?(z.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=I):void 0!==l[3]&&(s=I):s===I?">"===l[0]?(s=o??L,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?I:'"'===l[3]?D:B):s===D||s===B?s=I:s===R||s===j?s=L:(s=I,o=void 0);const u=s===I&&t[e+1].startsWith("/>")?" ":"";i+=s===L?n+P:c>=0?(r.push(a),n.slice(0,c)+C+n.slice(c)+M+u):n+M+(-2===c?e:u)}return[Z(t,i+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Q{constructor({strings:t,_$litType$:e},n){let r;this.parts=[];let o=0,i=0;const s=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=Q.createElement(l,n),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=X.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=c[i++],n=r.getAttribute(t).split(M),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:s[2],strings:n,ctor:"."===s[1]?ot:"?"===s[1]?it:"@"===s[1]?st:rt}),r.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:o}),r.removeAttribute(t));if(z.test(r.tagName)){const t=r.textContent.split(M),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let n=0;n<e;n++)r.append(t[n],T()),X.nextNode(),a.push({type:2,index:++o});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===N)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(M,t+1));)a.push({type:7,index:o}),t+=M.length-1}o++}}static createElement(t,e){const n=F.createElement("template");return n.innerHTML=t,n}}function tt(t,e,n=t,r){if(e===V)return e;let o=void 0!==r?n._$Co?.[r]:n._$Cl;const i=H(e)?void 0:e._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),void 0===i?o=void 0:(o=new i(t),o._$AT(t,n,r)),void 0!==r?(n._$Co??=[])[r]=o:n._$Cl=o),void 0!==o&&(e=tt(t,o._$AS(t,e.values),o,r)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,r=(t?.creationScope??F).importNode(e,!0);X.currentNode=r;let o=X.nextNode(),i=0,s=0,a=n[0];for(;void 0!==a;){if(i===a.index){let e;2===a.type?e=new nt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new at(o,this,t)),this._$AV.push(e),a=n[++s]}i!==a?.index&&(o=X.nextNode(),i++)}return X.currentNode=F,r}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,r){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),H(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,r="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Q.createElement(Z(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new et(r,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,r=0;for(const o of t)r===e.length?e.push(n=new nt(this.O(T()),this.O(T()),this,this.options)):n=e[r],n._$AI(o),r++;r<e.length&&(this._$AR(n&&n._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,r,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=J}_$AI(t,e=this,n,r){const o=this.strings;let i=!1;if(void 0===o)t=tt(this,t,e,0),i=!H(t)||t!==this._$AH&&t!==V,i&&(this._$AH=t);else{const r=t;let s,a;for(t=o[0],s=0;s<o.length-1;s++)a=tt(this,r[n+s],e,s),a===V&&(a=this._$AH[s]),i||=!H(a)||a!==this._$AH[s],a===J?t=J:t!==J&&(t+=(a??"")+o[s+1]),this._$AH[s]=a}i&&!r&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends rt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}}class it extends rt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}}class st extends rt{constructor(t,e,n,r,o){super(t,e,n,r,o),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??J)===V)return;const n=this._$AH,r=t===J&&n!==J||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==J&&(n===J||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}let at=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}};const lt=k.litHtmlPolyfillSupport;lt?.(Q,nt),(k.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let ht=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const r=n?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=n?.renderBefore??null;r._$litPart$=o=new nt(e.insertBefore(T(),t),t,void 0,n??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const ut=ct.litElementPolyfillSupport;ut?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},pt=(t=dt,e,n)=>{const{kind:r,metadata:o}=n;let i=globalThis.litPropertyMetadata.get(o);if(void 0===i&&globalThis.litPropertyMetadata.set(o,i=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),i.set(n.name,t),"accessor"===r){const{name:r}=n;return{set(n){const o=e.get.call(this);e.set.call(this,n),this.requestUpdate(r,o,t,!0,n)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=n;return function(n){const o=this[r];e.call(this,n),this.requestUpdate(r,o,t,!0,n)}}throw Error("Unsupported decorator location: "+r)};function ft(t){return(e,n)=>"object"==typeof n?pt(t,e,n):((t,e,n)=>{const r=e.hasOwnProperty(n);return e.constructor.createProperty(n,t),r?Object.getOwnPropertyDescriptor(e,n):void 0})(t,e,n)}function mt(t){return ft({...t,state:!0,attribute:!1})}var _t,yt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(_t||(_t={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(yt||(yt={}));var gt=["closed","locked","off"],$t=function(t,e,n,r){r=r||{},n=null==n?{}:n;var o=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return o.detail=n,t.dispatchEvent(o),o},bt=function(t){$t(window,"haptic",t)},wt=function(t,e,n,r){if(r||(r={action:"more-info"}),!r.confirmation||r.confirmation.exemptions&&r.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(bt("warning"),confirm(r.confirmation.text||"Are you sure you want to "+r.action+"?")))switch(r.action){case"more-info":(n.entity||n.camera_image)&&$t(t,"hass-more-info",{entityId:n.entity?n.entity:n.camera_image});break;case"navigate":r.navigation_path&&function(t,e,n){void 0===n&&(n=!1),n?history.replaceState(null,"",e):history.pushState(null,"",e),$t(window,"location-changed",{replace:n})}(0,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":n.entity&&(function(t,e){(function(t,e,n){void 0===n&&(n=!0);var r,o=function(t){return t.substr(0,t.indexOf("."))}(e),i="group"===o?"homeassistant":o;switch(o){case"lock":r=n?"unlock":"lock";break;case"cover":r=n?"open_cover":"close_cover";break;default:r=n?"turn_on":"turn_off"}t.callService(i,r,{entity_id:e})})(t,e,gt.includes(t.states[e].state))}(e,n.entity),bt("success"));break;case"call-service":if(!r.service)return void bt("failure");var o=r.service.split(".",2);e.callService(o[0],o[1],r.service_data,r.target),bt("success");break;case"fire-dom-event":$t(t,"ll-custom",r)}};function vt(t){return void 0!==t&&"none"!==t.action}class xt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class kt extends HTMLElement{constructor(){super(...arguments),this.holdTime=500,this.held=!1}bind(t,e={}){if(t.actionHandler&&JSON.stringify(t.actionHandler.options)===JSON.stringify(e))return;t.actionHandler&&(t.removeEventListener("touchstart",t.actionHandler.start),t.removeEventListener("touchend",t.actionHandler.end),t.removeEventListener("touchcancel",t.actionHandler.end),t.removeEventListener("mousedown",t.actionHandler.start),t.removeEventListener("click",t.actionHandler.end),t.removeEventListener("keyup",t.actionHandler.end)),t.actionHandler={options:e},t.actionHandler.start=t=>{this.held=!1,e.hasHold&&(this.timer=window.setTimeout(()=>{this.held=!0},this.holdTime)),t.stopPropagation()},t.actionHandler.end=n=>{["touchend","touchcancel"].includes(n.type)&&void 0===this.timer||(window.clearTimeout(this.timer),this.timer=void 0,this.held?$t(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===n.type&&n.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,$t(t,"action",{action:"tap"})},250):(window.clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,$t(t,"action",{action:"double_tap"})):$t(t,"action",{action:"tap"}))};t.addEventListener("touchstart",t.actionHandler.start,{passive:!0}),t.addEventListener("touchend",t.actionHandler.end),t.addEventListener("touchcancel",t.actionHandler.end),t.addEventListener("mousedown",t.actionHandler.start,{passive:!0}),t.addEventListener("click",t.actionHandler.end),t.addEventListener("keyup",e=>{"Enter"!==e.key&&" "!==e.key||t.actionHandler?.end?.(e)})}}if(!customElements.get("buffer-tank-action-handler"))try{customElements.define("buffer-tank-action-handler",kt)}catch(t){if(!(t instanceof DOMException&&"NotSupportedError"===t.name))throw t}const At=(t,e)=>{(()=>{const t=document.body;let e=t.querySelector("buffer-tank-action-handler");return e||(e=document.createElement("buffer-tank-action-handler"),t.appendChild(e)),e})().bind(t,e)};const Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends xt{render(t={}){return V}update(t,[e]){return At(t.element,e??{}),V}}),St=[{temperature:20,color:"#011F9D"},{temperature:25,color:"#0030C9"},{temperature:30,color:"#659CFB"},{temperature:35,color:"#CAE6FF"},{temperature:50,color:"#FB623A"},{temperature:80,color:"#F12710"}],Ct=100,Mt=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;class Nt extends Error{}function Pt(t){if(t.entity)return"A";if(t.sensors&&t.tank_height)return"B";throw new Nt("Configure either `entity` (Mode A) or `sensors` + `tank_height` (Mode B).")}function Ft(t){if(!t||"object"!=typeof t)throw new Nt("`heat_exchanger` must be an object.");const e=t,n={};if(void 0!==e.position){if("top"!==e.position&&"bottom"!==e.position)throw new Nt("`heat_exchanger.position` must be `top` or `bottom`.");n.position=e.position}if(void 0!==e.supply_entity){if("string"!=typeof e.supply_entity||!e.supply_entity)throw new Nt("`heat_exchanger.supply_entity` must be a non-empty string.");n.supply_entity=e.supply_entity}if(void 0!==e.return_entity){if("string"!=typeof e.return_entity||!e.return_entity)throw new Nt("`heat_exchanger.return_entity` must be a non-empty string.");n.return_entity=e.return_entity}if(void 0!==e.enabled)if("boolean"==typeof e.enabled)n.enabled=e.enabled;else{if("string"!=typeof e.enabled||!e.enabled)throw new Nt("`heat_exchanger.enabled` must be a boolean or a non-empty entity id.");n.enabled=e.enabled}if(void 0!==e.reverse_flow)if("boolean"==typeof e.reverse_flow)n.reverse_flow=e.reverse_flow;else{if("string"!=typeof e.reverse_flow||!e.reverse_flow)throw new Nt("`heat_exchanger.reverse_flow` must be a boolean or a non-empty entity id.");n.reverse_flow=e.reverse_flow}if(void 0!==e.turns){if("number"!=typeof e.turns||!Number.isFinite(e.turns)||e.turns<1)throw new Nt("`heat_exchanger.turns` must be a number >= 1.");n.turns=e.turns}if(void 0!==e.height_fraction){if("number"!=typeof e.height_fraction||!Number.isFinite(e.height_fraction)||e.height_fraction<=0||e.height_fraction>1)throw new Nt("`heat_exchanger.height_fraction` must be a number in (0, 1].");n.height_fraction=e.height_fraction}if(void 0!==e.flow_animation){if("boolean"!=typeof e.flow_animation)throw new Nt("`heat_exchanger.flow_animation` must be a boolean.");n.flow_animation=e.flow_animation}if(void 0!==e.flow_speed&&(n.flow_speed=function(t){if("number"==typeof t){if(!Number.isFinite(t)||t<0)throw new Nt("`heat_exchanger.flow_speed` must be a number in 0–1 (fraction) or 0–100 (percent), or an entity id.");return t}if("string"==typeof t&&t.trim())return t;throw new Nt("`heat_exchanger.flow_speed` must be a number (0–1 fraction or 0–100 percent) or an entity id string.")}(e.flow_speed)),void 0!==e.flow_color){if("string"!=typeof e.flow_color||!e.flow_color.trim())throw new Nt("`heat_exchanger.flow_color` must be a non-empty CSS color string.");n.flow_color=e.flow_color}if(void 0!==e.name){if("string"!=typeof e.name)throw new Nt("`heat_exchanger.name` must be a string.");n.name=e.name}return n}function Tt(t){if(Array.isArray(t))throw new Nt('`colors` must be a map of temperature → hex color (e.g. `colors: { 20: "#011F9D", 35: "#CAE6FF", 80: "#F12710" }`). The legacy list form was removed.');if(!t||"object"!=typeof t)throw new Nt('`colors` must be a map of temperature → hex color (e.g. `colors: { 20: "#011F9D", 35: "#CAE6FF", 80: "#F12710" }`).');const e=Object.entries(t);if(e.length<2)throw new Nt("`colors` must contain at least two temperature → color entries.");const n=e.map(([t,e])=>{const n=function(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){const e=parseFloat(t);if(Number.isFinite(e))return e}throw new Nt(`colors keys must be numeric temperatures (e.g. \`35: "#CAE6FF"\`); got \`${String(t)}\`.`)}(t);if("string"!=typeof e||!Mt.test(e))throw new Nt(`colors[${t}] must be a hex color string like "#1976d2" or "#abc".`);return{temperature:n,color:e}});n.sort((t,e)=>t.temperature-e.temperature);for(let t=1;t<n.length;t++)if(n[t].temperature===n[t-1].temperature)throw new Nt(`colors contains duplicate temperature ${n[t].temperature}. Use unique keys.`);return n}function Ht(t){if(!t||"object"!=typeof t)throw new Nt("Invalid configuration object.");const e=t,n={type:String(e.type??"custom:buffer-tank-card")};if("string"==typeof e.entity&&e.entity&&(n.entity=e.entity),void 0!==e.sensors){if(!Array.isArray(e.sensors))throw new Nt("`sensors` must be a list.");if(e.sensors.length<1)throw new Nt("`sensors` must contain at least one entry.");n.sensors=e.sensors.map((t,e)=>function(t,e){if(!t||"object"!=typeof t)throw new Nt(`sensors[${e}] must be an object.`);const n=t;if("string"!=typeof n.entity||!n.entity)throw new Nt(`sensors[${e}].entity is required.`);if("number"!=typeof n.position||!Number.isFinite(n.position))throw new Nt(`sensors[${e}].position must be a number (mm from bottom).`);const r={entity:n.entity,position:n.position};return"string"==typeof n.name&&(r.name=n.name),r}(t,e))}if(void 0!==e.tank_height){if("number"!=typeof e.tank_height||e.tank_height<=0)throw new Nt("`tank_height` must be a positive number (mm).");n.tank_height=e.tank_height}if(n.sensors&&n.tank_height)for(const t of n.sensors)if(t.position<0||t.position>n.tank_height)throw new Nt(`Sensor ${t.entity} position ${t.position} must be between 0 and tank_height (${n.tank_height}).`);if(void 0!==e.min_temperature){if("number"!=typeof e.min_temperature)throw new Nt("`min_temperature` must be a number.");n.min_temperature=e.min_temperature}if(void 0!==e.max_temperature){if("number"!=typeof e.max_temperature)throw new Nt("`max_temperature` must be a number.");n.max_temperature=e.max_temperature}if(void 0!==e.color_hot||void 0!==e.color_cold)throw new Nt('`color_hot` and `color_cold` were replaced by `colors` (map of temperature → hex color). Example: `colors: { 20: "#011F9D", 35: "#CAE6FF", 80: "#F12710" }`.');if(void 0!==e.colors&&(n.colors=Tt(e.colors)),void 0!==e.probe_side){if("left"!==e.probe_side&&"right"!==e.probe_side&&"alternating"!==e.probe_side)throw new Nt("`probe_side` must be one of: left, right, alternating.");n.probe_side=e.probe_side}return"boolean"==typeof e.show_stats&&(n.show_stats=e.show_stats),"boolean"==typeof e.show_thermocline&&(n.show_thermocline=e.show_thermocline),"string"==typeof e.name&&(n.name=e.name),void 0!==e.heat_exchanger&&(n.heat_exchanger=Ft(e.heat_exchanger)),e.tap_action&&(n.tap_action=e.tap_action),e.hold_action&&(n.hold_action=e.hold_action),e.double_tap_action&&(n.double_tap_action=e.double_tap_action),Pt(n),n}function Ut(t){if(!Number.isFinite(t)||t<=0)return 0;const e=t<=1?t:t/100;return e<=0?0:e>=1?1:e}function Ot(t){return 20-19.5*(t<=0?0:t>=1?1:t)}function Lt(t,e,n=100){const r=function(t){return t.filter(t=>Number.isFinite(t.temperature)&&Number.isFinite(t.position_mm)).slice().sort((t,e)=>t.position_mm-e.position_mm)}(t),o=new Array(n);if(0===r.length)return o.fill(NaN),o;if(1===r.length)return o.fill(r[0].temperature),o;const i=function(t){const e=t.length,n=new Array(e-1),r=new Array(e-1);for(let o=0;o<e-1;o++){const e=t[o+1].position_mm-t[o].position_mm;n[o]=e,r[o]=e>0?(t[o+1].temperature-t[o].temperature)/e:0}const o=new Array(e);if(2===e)o[0]=r[0],o[1]=r[0];else{o[0]=r[0],o[e-1]=r[e-2];for(let t=1;t<e-1;t++){const e=r[t-1],n=r[t];0===e||0===n||Math.sign(e)!==Math.sign(n)?o[t]=0:o[t]=(e+n)/2}}for(let t=0;t<e-1;t++){if(0===r[t]){o[t]=0,o[t+1]=0;continue}const e=o[t]/r[t],n=o[t+1]/r[t],i=e*e+n*n;if(i>9){const s=3/Math.sqrt(i);o[t]=s*e*r[t],o[t+1]=s*n*r[t]}}const i=new Array(e-1);for(let r=0;r<e-1;r++)i[r]={x0:t[r].position_mm,x1:t[r+1].position_mm,y0:t[r].temperature,y1:t[r+1].temperature,m0:o[r],m1:o[r+1],h:n[r]};return i}(r);for(let t=0;t<n;t++){const s=t/(n-1)*e;o[t]=Rt(i,r,s)}return o}function Rt(t,e,n){const r=e[0],o=e[e.length-1];if(n<=r.position_mm)return r.temperature;if(n>=o.position_mm)return o.temperature;for(let e=0;e<t.length;e++){const r=t[e];if(n>=r.x0&&n<=r.x1){if(r.h<=0)return r.y0;const t=(n-r.x0)/r.h,e=t*t,o=e*t,i=o-2*e+t,s=-2*o+3*e,a=o-e;return(2*o-3*e+1)*r.y0+r.h*i*r.m0+s*r.y1+r.h*a*r.m1}}return o.temperature}const jt=new Set(["unavailable","unknown","none",""]);function It(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t){if(jt.has(t.toLowerCase()))return null;const e=parseFloat(t);return Number.isFinite(e)?e:null}return null}function Bt(t){const e=t.filter(t=>Number.isFinite(t));if(0===e.length)return{average:null,delta:null};const n=e.reduce((t,e)=>t+e,0);return{average:n/e.length,delta:Math.max(...e)-Math.min(...e)}}function Dt(t,e){const n="A"===Pt(e)?function(t,e){const n=e.entity,r=t?.states?.[n];if(!r)return Gt(e,`Entity ${n} not found.`);if(jt.has(String(r.state).toLowerCase()))return Gt(e,`Entity ${n} is ${r.state}.`);const o=r.attributes??{},i=It(o.tank_height_mm);if(null===i||i<=0)return Gt(e,`Entity ${n} is missing attribute tank_height_mm. Update the buffer tank integration.`);const s=Array.isArray(o.layers)?o.layers:null;let a;a=s&&s.length>0?s.map(t=>{const e=It(t);return null===e?NaN:e}):new Array(Ct).fill(NaN);const l=[],c=Array.isArray(o.probes)?o.probes:[];for(const t of c){if(!t||"object"!=typeof t)continue;const e=t,n=It(e.position_mm);null!==n&&l.push({entity:"string"==typeof e.entity?e.entity:"string"==typeof e.entity_id?e.entity_id:void 0,name:"string"==typeof e.name?e.name:void 0,position_mm:n,temperature:It(e.temperature),virtual:Boolean(e.virtual)})}const h=It(o.reference_temperature),u=It(o.min_temperature),d=It(o.max_temperature),p=e.min_temperature??u??h??20,f=e.max_temperature??d??80,m=It(r.state),_=Bt(a),y=It(o.thermocline_position_mm),g=It(o.thermocline_thickness_mm);return{mode:"A",tank_height_mm:i,layers:a,probes:l,min_temperature:p,max_temperature:f,reference_temperature:h??void 0,thermocline_position_mm:y,thermocline_thickness_mm:g,soc:m,average:_.average,delta:_.delta,available:a.some(t=>Number.isFinite(t)),error:void 0}}(t,e):function(t,e){const n=e.tank_height,r=[],o=[];for(const n of e.sensors??[]){const e=t?.states?.[n.entity],i=e?It(e.state):null;r.push({entity:n.entity,name:n.name??e?.attributes?.friendly_name??n.entity,position_mm:n.position,temperature:i,virtual:!1}),null!==i&&o.push({position_mm:n.position,temperature:i})}const i=Lt(o,n,Ct),s=Bt(i);return{mode:"B",tank_height_mm:n,layers:i,probes:r,min_temperature:e.min_temperature??20,max_temperature:e.max_temperature??80,thermocline_position_mm:null,thermocline_thickness_mm:null,soc:null,average:s.average,delta:s.delta,available:o.length>0,error:0===o.length?"No probe has a valid temperature.":void 0}}(t,e);return e.heat_exchanger&&(n.heat_exchanger=function(t,e){const n=e.heat_exchanger,r=(h=n,{position:h.position??"bottom",turns:h.turns??6,height_fraction:h.height_fraction??.35,flow_animation:h.flow_animation??!1,flow_color:h.flow_color??"rgba(255,255,255,0.55)"}),o=qt(t,n.enabled,!0),i=qt(t,n.reverse_flow,!1),s=n.supply_entity?It(t?.states?.[n.supply_entity]?.state):null,a=n.return_entity?It(t?.states?.[n.return_entity]?.state):null,l=function(t,e,n){if(void 0===e)return Ut(n);if("number"==typeof e)return Ut(e);const r=t?.states?.[e]?.state,o=It(r);return Ut(null===o?n:o)}(t,n.flow_speed,.5),c=r.flow_animation&&l>0;var h;return{position:r.position,enabled:o,reverse_flow:i,turns:r.turns,height_fraction:r.height_fraction,supply_temperature:s,return_temperature:a,flow_animation:c,flow_speed:Ot(l),flow_color:r.flow_color,name:n.name}}(t,e)),n}const zt=new Set(["on","true","yes","open","enabled","active","1"]),Wt=new Set(["off","false","no","closed","disabled","inactive","0"]);function qt(t,e,n){if(void 0===e)return n;if("boolean"==typeof e)return e;const r=t?.states?.[e]?.state;if(null==r)return!1;const o=String(r).toLowerCase();if(zt.has(o))return!0;if(Wt.has(o))return!1;const i=parseFloat(o);return!!Number.isFinite(i)&&0!==i}function Gt(t,e){return{mode:t.entity?"A":"B",tank_height_mm:t.tank_height??2e3,layers:new Array(Ct).fill(NaN),probes:[],min_temperature:t.min_temperature??20,max_temperature:t.max_temperature??80,thermocline_position_mm:null,thermocline_thickness_mm:null,soc:null,average:null,delta:null,available:!1,error:e}}function Vt(t){let e=t.trim();if(e.startsWith("#")&&(e=e.slice(1)),3===e.length&&(e=e.split("").map(t=>t+t).join("")),6!==e.length)return[128,128,128];const n=parseInt(e,16);return Number.isNaN(n)?[128,128,128]:[n>>16&255,n>>8&255,255&n]}function Jt(t){return Math.max(0,Math.min(255,Math.round(t))).toString(16).padStart(2,"0")}function Kt(t,e,n){return Math.max(e,Math.min(n,t))}function Xt(t,e,n){const[r,o,i]=Vt(t),[s,a,l]=Vt(e),c=Kt(n,0,1);return`#${Jt(r+(s-r)*c)}${Jt(o+(a-o)*c)}${Jt(i+(l-i)*c)}`}function Zt(t,e){if(0===e.length)return"#808080";if(!Number.isFinite(t))return function(t){return 0===t.length?"#808080":t[Math.floor(t.length/2)].color}(e);if(1===e.length)return e[0].color;if(t<=e[0].temperature)return e[0].color;const n=e[e.length-1];if(t>=n.temperature)return n.color;for(let n=0;n<e.length-1;n++){const r=e[n],o=e[n+1];if(t>=r.temperature&&t<=o.temperature){const e=o.temperature-r.temperature;if(e<=0)return r.color;const n=(t-r.temperature)/e;return Xt(r.color,o.color,n)}}return n.color}function Yt(t){return 0===t.length?"#808080":t[Math.floor(t.length/2)].color}const Qt=40,te=120,ee=360,ne=Qt,re=160,oe=20,ie=380;function se(t,e,n){const r=function(t){return t.colors??St.map(t=>({...t}))}(e),o=function(t){return t.show_stats??!0}(e),i=function(t,e){const n=t.length;if(0===n)return[];const r=Yt(e),o=[];for(let i=0;i<n;i++){const s=t[i],a=Number.isFinite(s)?Zt(s,e):r,l=1===n?0:i/(n-1);o.push(G`<stop offset="${l}" stop-color="${a}" />`)}return o}(t.layers,r),s=function(t,e,n){if(0===t.length)return[];const r=function(t){return t.probe_side??"alternating"}(n),o=t.slice().sort((t,e)=>e.position_mm-t.position_mm),i=[];return o.forEach((t,n)=>{let o;o="left"===r||"right"!==r&&n%2==0;const s=ae(t.position_mm,e),a=o?ne:re,l=o?50:150,c=o?36:164,h=o?"end":"start",u=t.name??t.entity??"Probe",d=t.temperature,p=null!==d&&Number.isFinite(d)?`${d.toFixed(1)} °C`:"n/a";i.push(G`
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
      >${u}</text>
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
    `)}),i}(t.probes,t.tank_height_mm,e),a=n.showThermocline?function(t,e){const n=t.thermocline_position_mm,r=t.thermocline_thickness_mm;if(null===n||null===r||!Number.isFinite(n)||!Number.isFinite(r))return null;if(r<=0||t.tank_height_mm<=0)return null;const o=ee/t.tank_height_mm,i=Math.max(2,r*o),s=ae(n,t.tank_height_mm),a=s-i/2,l=Math.max(20,Math.min(380-i,a));return G`
    <rect
      x="${41}"
      y="${l}"
      width="${118}"
      height="${i}"
      fill="url(#${e})"
      pointer-events="none"
    />
  `}(t,n.hatchId):null,l=t.heat_exchanger?function(t,e,n){const r=function(t){const e=Math.max(1,Math.round(t.turns)),n=Kt(t.height_fraction,.05,1),r=14,o=ee-2*r,i=Math.max(40,Math.min(o,ee*n)),s="top"===t.position?oe+r:ie-r-i,a=s+i,l=100,c=45.6,h=Math.max(6,Math.min(18,i/(3*e))),u=(i-2*h)/e,d=Kt(.55*u,6,12),p=64,f=e*p,m=[];for(let t=0;t<=f;t++){const e=t/p,n=2*Math.PI*e,r=l+c*Math.cos(n),o=s+h+e*u+h*Math.sin(n);m.push({x:r,y:o,front:Math.sin(n)>0})}const _=t.reverse_flow?m.slice().reverse():m,y=_[0],g=_[_.length-1],$={x1:y.x,y1:y.y,x2:le,y2:y.y},b={x1:g.x,y1:g.y,x2:le,y2:g.y},w=[{x:$.x2,y:$.y2},{x:$.x1,y:$.y1},..._,{x:b.x2,y:b.y2}],v=ce(w);return{regionTop:s,regionBottom:a,cx:l,rx:c,ry:h,pitch:u,strokeWidth:d,points:m,supplyPipe:$,returnPipe:b,flowPath:v,labelX:le}}(t),{regionTop:o,regionBottom:i,points:s,strokeWidth:a,supplyPipe:l,returnPipe:c,flowPath:h,labelX:u}=r,{front:d,back:p}=function(t){const e=[],n=[];if(0===t.length)return{front:e,back:n};let r=t[0].front,o=[t[0]];for(let i=1;i<t.length;i++){const s=t[i];s.front===r?o.push(s):(o.push(s),(r?e:n).push(ce(o)),o=[s],r=s.front)}o.length>1&&(r?e:n).push(ce(o));return{front:e,back:n}}(s),f=a+1.5,m=.95*a,_=.95*f,y=ue(l),g=ue(c),$=l.y1<=c.y1,b=$?l.y1-a/2-3:l.y1+a/2+10,w=$?c.y1+a/2+10:c.y1-a/2-3;if(!t.enabled){const t="var(--primary-text-color, #444)";return G`
      <g class="buffer-tank-hx buffer-tank-hx--disabled" pointer-events="none">
        ${p.map(e=>G`
          <path
            d="${e}"
            fill="none"
            stroke="${t}"
            stroke-width="${m}"
            stroke-linecap="round"
            stroke-dasharray="3 3"
            opacity="0.55"
          />`)}
        ${d.map(e=>G`
          <path
            d="${e}"
            fill="none"
            stroke="${t}"
            stroke-width="${a}"
            stroke-linecap="round"
            opacity="0.85"
          />`)}
        <path
          d="${y}"
          fill="none"
          stroke="${t}"
          stroke-width="${a}"
          stroke-linecap="round"
          opacity="0.85"
        />
        <path
          d="${g}"
          fill="none"
          stroke="${t}"
          stroke-width="${a}"
          stroke-linecap="round"
          opacity="0.85"
        />
      </g>
    `}const v=t.supply_temperature,x=t.return_temperature,k=Yt(e),A=null!==v&&Number.isFinite(v)?Zt(v,e):k,E=null!==x&&Number.isFinite(x)?Zt(x,e):k,S="var(--primary-text-color, #222)",C=t.flow_animation?G`
      <path
        class="buffer-tank-hx__flow"
        d="${h}"
        fill="none"
        stroke="${t.flow_color}"
        stroke-width="${Math.max(1.5,.38*a)}"
        stroke-linecap="round"
        style="--btc-flow-duration: ${t.flow_speed}s"
      />`:null,M=t.reverse_flow?E:A,N=t.reverse_flow?A:E;return G`
    <defs>
      <linearGradient
        id="${n}"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="${o}"
        x2="0"
        y2="${i}"
      >
        <stop offset="0" stop-color="${M}" />
        <stop offset="1" stop-color="${N}" />
      </linearGradient>
    </defs>
    <g class="buffer-tank-hx" pointer-events="none">
      ${p.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="${S}"
          stroke-width="${_}"
          stroke-linecap="round"
          opacity="0.6"
        />`)}
      ${p.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="url(#${n})"
          stroke-width="${m}"
          stroke-linecap="round"
          opacity="0.95"
        />`)}
      ${d.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="${S}"
          stroke-width="${f}"
          stroke-linecap="round"
          opacity="0.55"
        />`)}
      ${d.map(t=>G`
        <path
          d="${t}"
          fill="none"
          stroke="url(#${n})"
          stroke-width="${a}"
          stroke-linecap="round"
          opacity="1"
        />`)}
      <path
        d="${y}"
        fill="none"
        stroke="${S}"
        stroke-width="${f}"
        stroke-linecap="round"
        opacity="0.55"
      />
      <path
        d="${y}"
        fill="none"
        stroke="${A}"
        stroke-width="${a}"
        stroke-linecap="round"
      />
      <path
        d="${g}"
        fill="none"
        stroke="${S}"
        stroke-width="${f}"
        stroke-linecap="round"
        opacity="0.55"
      />
      <path
        d="${g}"
        fill="none"
        stroke="${E}"
        stroke-width="${a}"
        stroke-linecap="round"
      />
      ${C}
      <text
        x="${u}"
        y="${b}"
        text-anchor="end"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${he(v)}</text>
      <text
        x="${u}"
        y="${w}"
        text-anchor="end"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${he(x)}</text>
    </g>
  `}(t.heat_exchanger,r,n.coilGradientId):null,c=o?function(t){const e=[];"A"===t.mode&&null!==t.soc&&Number.isFinite(t.soc)&&e.push(`SoC: ${t.soc.toFixed(0)} %`);null!==t.average&&e.push(`Ø ${t.average.toFixed(1)} °C`);null!==t.delta&&e.push(`Δ ${t.delta.toFixed(1)} K`);if(0===e.length)return null;const n=100,r=200-18*(e.length-1)/2;return G`
    <g font-family="var(--paper-font-body1_-_font-family, sans-serif)" text-anchor="middle"
       paint-order="stroke" stroke="#ffffff" stroke-width="3" fill="#000000">
      ${e.map((t,e)=>G`
          <text x="${n}" y="${r+18*e}" font-size="16" font-weight="600">${t}</text>
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
          ${i}
        </linearGradient>
        ${n.showThermocline?G`
        <pattern id="${n.hatchId}" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,0.35)" stroke-width="2" />
        </pattern>`:null}
      </defs>
      <rect
        x="${Qt}"
        y="${20}"
        width="${te}"
        height="${ee}"
        rx="${14}"
        ry="${14}"
        fill="url(#${n.gradientId})"
        stroke="var(--primary-text-color, #222)"
        stroke-width="1.5"
      />
      ${a}
      ${l}
      ${s}
      ${c}
    </svg>
  `}function ae(t,e){const n=Kt(t,0,e);return oe+ee*(1-(e>0?n/e:0))}const le=192;function ce(t){return t.map((t,e)=>`${0===e?"M":"L"}${t.x.toFixed(2)} ${t.y.toFixed(2)}`).join(" ")}function he(t){return null!==t&&Number.isFinite(t)?`${t.toFixed(1)} °C`:"n/a"}function ue(t){return`M${t.x1.toFixed(2)} ${t.y1.toFixed(2)} L${t.x2.toFixed(2)} ${t.y2.toFixed(2)}`}const de="buffer-tank-card",pe=window,fe=!0===pe.__bufferTankCardLoaded;if(pe.__bufferTankCardLoaded=!0,!fe){console.info("%c buffer-tank-card %c v0.1.0 ","background:#1976d2;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600;","background:#d32f2f;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;");const t=pe.customCards??(pe.customCards=[]);t.some(t=>t.type===de)||t.push({type:de,name:"Buffer Tank Card",description:"Visualizes a buffer/heat storage tank with a temperature gradient and probes.",preview:!0})}let me=0;class _e extends ht{constructor(){super(...arguments),this._gradientId="btc-grad-"+ ++me,this._hatchId=`btc-hatch-${me}`,this._coilGradientId=`btc-coil-${me}`,this._handleAction=t=>{this.hass&&this._config&&t.detail?.action&&function(t,e,n,r){var o;"double_tap"===r&&n.double_tap_action?o=n.double_tap_action:"hold"===r&&n.hold_action?o=n.hold_action:"tap"===r&&n.tap_action&&(o=n.tap_action),wt(t,e,n,o)}(this,this.hass,this._config,t.detail.action)}}static getStubConfig(){return{tank_height:2e3,sensors:[{entity:"sensor.probe_top",position:1800},{entity:"sensor.probe_middle",position:1e3},{entity:"sensor.probe_bottom",position:200}]}}setConfig(t){try{this._config=Ht(t),this._configError=void 0}catch(t){throw this._config=void 0,this._configError=t instanceof Nt?t.message:String(t),t}}getCardSize(){return 5}render(){if(this._configError||!this._config)return this._renderWarning(this._configError??"Invalid configuration.");if(!this.hass)return q`<ha-card><div class="empty">Loading…</div></ha-card>`;let t;try{t=Dt(this.hass,this._config)}catch(t){const e=t instanceof Error?t.message:String(t);return this._renderWarning(e)}return t.available?this._renderCard(t,!1):this._renderCard(t,!0)}_renderCard(t,e){const n=this._config,r="A"===t.mode&&(n.show_thermocline??!0)&&null!==t.thermocline_position_mm&&null!==t.thermocline_thickness_mm;return q`
      <ha-card
        class=${e?"dimmed":""}
        .header=${n.name??J}
        @action=${this._handleAction}
        .actionHandler=${Et({hasHold:vt(n.hold_action),hasDoubleClick:vt(n.double_tap_action)})}
        tabindex=${vt(n.tap_action)?"0":"-1"}
      >
        <div class="tank-wrapper">
          ${se(t,n,{gradientId:this._gradientId,hatchId:this._hatchId,coilGradientId:this._coilGradientId,showThermocline:r})}
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
    `}}if(e([ft({attribute:!1})],_e.prototype,"hass",void 0),e([mt()],_e.prototype,"_config",void 0),e([mt()],_e.prototype,"_configError",void 0),!customElements.get(de))try{customElements.define(de,_e)}catch(t){if(!(t instanceof DOMException&&"NotSupportedError"===t.name))throw t}return t.BufferTankCard=_e,t}({});
