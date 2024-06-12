var x = Object.defineProperty;
var T = (e, n, t) => n in e ? x(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var d = (e, n, t) => (T(e, typeof n != "symbol" ? n + "" : n, t), t);
import { defineComponent as D, nextTick as H, render as O, createVNode as R, h as B } from "vue";
/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const $ = Object.assign, g = Array.isArray, K = (e) => typeof e == "string", P = (e) => {
  const n = /* @__PURE__ */ Object.create(null);
  return (t) => n[t] || (n[t] = e(t));
}, U = /-(\w)/g, y = P((e) => e.replace(U, (n, t) => t ? t.toUpperCase() : "")), z = /\B([A-Z])/g, m = P(
  (e) => e.replace(z, "-$1").toLowerCase()
), N = (e) => {
  const n = K(e) ? Number(e) : NaN;
  return isNaN(n) ? e : n;
};
/*! #__NO_SIDE_EFFECTS__ */
function M(e, n, t) {
  const s = D(e);
  class o extends E {
    constructor(r) {
      super(s, r, n, t);
    }
  }
  return d(o, "def", s), o;
}
const k = typeof HTMLElement < "u" ? HTMLElement : class {
};
class E extends k {
  constructor(t, s = {}, o = {}, i) {
    super();
    /**
     * @internal
     */
    d(this, "_instance", null);
    d(this, "_connected", !1);
    d(this, "_resolved", !1);
    d(this, "_numberProps", null);
    d(this, "_styles");
    d(this, "_slots", {});
    d(this, "_ob", null);
    this._def = t, this._props = s, this._config = o, this._root && i ? i(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, H(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), O(null, this._root), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    this._ob = new MutationObserver((o) => {
      for (const i of o)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (o, i = !1) => {
      const { props: r, styles: l } = o;
      let f;
      if (r && !g(r))
        for (const a in r) {
          const h = r[a];
          (h === Number || h && h.type === Number) && (a in this._props && (this._props[a] = N(this._props[a])), (f || (f = /* @__PURE__ */ Object.create(null)))[y(a)] = !0);
        }
      if (this._numberProps = f, i && this._resolveProps(o), !this._config.shadowRoot) {
        this._slots = {};
        for (const a of Array.from(this.children)) {
          const h = a.getAttribute("slot") || "default";
          this._slots[h] || (this._slots[h] = []), this._slots[h].push(B(a.tagName.toLowerCase(), {}, a.innerHTML));
        }
        this.replaceChildren();
      }
      this._applyStyles(l), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, o = g(s) ? s : Object.keys(s || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && o.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of o.map(y))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r);
        }
      });
  }
  _setAttr(t) {
    let s = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const o = y(t);
    this._numberProps && this._numberProps[o] && (s = N(s)), this._setProp(o, s, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, o = !0, i = !0) {
    s !== this._props[t] && (this._props[t] = s, i && this._instance && this._update(), o && (s === !0 ? this.setAttribute(m(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(m(t), s + "") : s || this.removeAttribute(m(t))));
  }
  _update() {
    O(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = R(this._def, $({}, this._props), this._slots);
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const o = (r, l) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: l
          })
        );
      };
      s.emit = (r, ...l) => {
        o(r, l), m(r) !== r && o(m(r), l);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof E) {
          s.parent = i._instance, s.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((s) => {
      const o = document.createElement("style");
      o.textContent = s, this._root.appendChild(o);
    });
  }
}
const G = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function F(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
const q = ({
  rootComponent: e,
  plugins: n,
  cssFrameworkStyles: t,
  VueDefineCustomElement: s,
  h: o,
  createApp: i,
  getCurrentInstance: r,
  elementName: l,
  disableRemoveStylesOnUnmount: f,
  disableShadowDOM: a
}) => (a ? M : s)({
  styles: [t],
  props: {
    ...e.props,
    modelValue: { type: [String, Number, Boolean, Array, Object] }
    // v-model support
  },
  emits: e == null ? void 0 : e.emits,
  setup(A, { slots: L }) {
    var w;
    const v = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], _ = i();
    if (_.component("app-root", e), e.provide) {
      const c = typeof e.provide == "function" ? e.provide() : e.provide;
      Object.keys(c).forEach((p) => {
        _.provide(p, c[p]);
      });
    }
    _.mixin({
      mounted() {
        var p;
        const c = (u) => {
          u != null && u.length && (this.__style = document.createElement("style"), this.__style.innerText = u.join().replace(/\n/g, ""), G(this.$el).prepend(this.__style));
        };
        if (c((p = this.$) == null ? void 0 : p.type.styles), this.$options.components)
          for (const u of Object.values(this.$options.components))
            c(u.styles);
      },
      unmounted() {
        var c;
        f || (c = this.__style) == null || c.remove();
      }
    }), _.use(n);
    const b = r();
    if (Object.assign(b.appContext, _._context), Object.assign(b.provides, _._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const c = document.querySelector(l);
      _._container = c, _._instance = b;
      const p = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", _, _.version, p), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = _;
    }
    const S = v == null ? void 0 : v.reduce((c, p) => {
      const u = F(p);
      return c[u] = (j) => {
        b.emit(p, j);
      }, c;
    }, {}), V = (w = e == null ? void 0 : e.namedSlots) == null ? void 0 : w.reduce((c, p) => (c[p] = () => o("slot", { name: p }), c), {});
    return () => o(
      e,
      {
        ...A,
        ...S
      },
      {
        default: () => o("slot"),
        ...V,
        ...L
      }
    );
  }
}, a && { shadowRoot: !1 }), W = ({
  elementName: e,
  rootComponent: n,
  plugins: t,
  cssFrameworkStyles: s,
  VueDefineCustomElement: o,
  h: i,
  createApp: r,
  getCurrentInstance: l,
  disableRemoveStylesOnUnmount: f = !1,
  disableShadowDOM: a = !1
}) => {
  if (!n) {
    console.warn("No root component provided. Please provide a root component to create a web component.");
    return;
  }
  if (!e) {
    console.warn("No element name provided. Please provide an element name to create a web component.");
    return;
  }
  if (!o) {
    console.warn(
      "No VueDefineCustomElement provided. Please provide a VueDefineCustomElement to create a web component."
    );
    return;
  }
  if (!i) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!r) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!l) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  const h = q({
    rootComponent: n,
    plugins: t,
    cssFrameworkStyles: s,
    VueDefineCustomElement: o,
    h: i,
    createApp: r,
    getCurrentInstance: l,
    elementName: e,
    disableRemoveStylesOnUnmount: f,
    disableShadowDOM: a
  });
  customElements.define(
    e,
    h
  );
};
export {
  W as createWebComponent,
  W as default
};
