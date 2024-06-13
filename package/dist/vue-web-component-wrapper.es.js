var x = Object.defineProperty;
var T = (e, i, t) => i in e ? x(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var d = (e, i, t) => (T(e, typeof i != "symbol" ? i + "" : i, t), t);
import { defineComponent as D, nextTick as R, render as O, createVNode as H, h as B } from "vue";
/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const $ = Object.assign, N = Array.isArray, K = (e) => typeof e == "string", P = (e) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (t) => i[t] || (i[t] = e(t));
}, U = /-(\w)/g, y = P((e) => e.replace(U, (i, t) => t ? t.toUpperCase() : "")), z = /\B([A-Z])/g, m = P(
  (e) => e.replace(z, "-$1").toLowerCase()
), g = (e) => {
  const i = K(e) ? Number(e) : NaN;
  return isNaN(i) ? e : i;
};
/*! #__NO_SIDE_EFFECTS__ */
function M(e, i, t) {
  const s = D(e);
  class o extends E {
    constructor(r) {
      super(s, r, i, t);
    }
  }
  return d(o, "def", s), o;
}
const k = typeof HTMLElement < "u" ? HTMLElement : class {
};
class E extends k {
  constructor(t, s = {}, o = { shadowRoot: !0 }, n) {
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
    this._def = t, this._props = s, this._config = o, this._root && n ? n(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, R(() => {
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
      for (const n of o)
        this._setAttr(n.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (o, n = !1) => {
      const { props: r } = o, p = this._collectNestedStyles(o);
      let f;
      if (r && !N(r))
        for (const a in r) {
          const _ = r[a];
          (_ === Number || _ && _.type === Number) && (a in this._props && (this._props[a] = g(this._props[a])), (f || (f = /* @__PURE__ */ Object.create(null)))[y(a)] = !0);
        }
      if (this._numberProps = f, n && this._resolveProps(o), !this._config.shadowRoot) {
        this._slots = {};
        for (const a of Array.from(this.children)) {
          const _ = a.getAttribute("slot") || "default";
          this._slots[_] || (this._slots[_] = []), this._slots[_].push(
            B(a.tagName.toLowerCase(), {}, a.innerHTML)
          );
        }
        this.replaceChildren();
      }
      this._applyStyles(p), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, o = N(s) ? s : Object.keys(s || {});
    for (const n of Object.keys(this))
      n[0] !== "_" && o.includes(n) && this._setProp(n, this[n], !0, !1);
    for (const n of o.map(y))
      Object.defineProperty(this, n, {
        get() {
          return this._getProp(n);
        },
        set(r) {
          this._setProp(n, r);
        }
      });
  }
  _setAttr(t) {
    let s = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const o = y(t);
    this._numberProps && this._numberProps[o] && (s = g(s)), this._setProp(o, s, !1);
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
  _setProp(t, s, o = !0, n = !0) {
    s !== this._props[t] && (this._props[t] = s, n && this._instance && this._update(), o && (s === !0 ? this.setAttribute(m(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(m(t), s + "") : s || this.removeAttribute(m(t))));
  }
  _update() {
    O(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = H(this._def, $({}, this._props), this._slots);
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const o = (r, p) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: p
          })
        );
      };
      s.emit = (r, ...p) => {
        o(r, p), m(r) !== r && o(m(r), p);
      };
      let n = this;
      for (; n = n && (n.parentNode || n.host); )
        if (n instanceof E) {
          s.parent = n._instance, s.provides = n._instance.provides;
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
  _collectNestedStyles(t) {
    let s = t.styles ?? [];
    return t.components && Object.values(t.components).forEach((o) => {
      s = s.concat(this._collectNestedStyles(o));
    }), s;
  }
}
const C = (e) => {
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
const G = ({
  rootComponent: e,
  plugins: i,
  cssFrameworkStyles: t,
  VueDefineCustomElement: s,
  h: o,
  createApp: n,
  getCurrentInstance: r,
  elementName: p,
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
  setup(S, { slots: A }) {
    var w;
    const v = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], h = n();
    if (h.component("app-root", e), e.provide) {
      const c = typeof e.provide == "function" ? e.provide() : e.provide;
      Object.keys(c).forEach((l) => {
        h.provide(l, c[l]);
      });
    }
    h.mixin({
      mounted() {
        var l;
        const c = (u) => {
          u != null && u.length && (this.__style = document.createElement("style"), this.__style.innerText = u.join().replace(/\n/g, ""), C(this.$el).prepend(this.__style));
        };
        if (c((l = this.$) == null ? void 0 : l.type.styles), this.$options.components)
          for (const u of Object.values(this.$options.components))
            c(u.styles);
      },
      unmounted() {
        var c;
        f || (c = this.__style) == null || c.remove();
      }
    }), h.use(i);
    const b = r();
    if (Object.assign(b.appContext, h._context), Object.assign(b.provides, h._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const c = document.querySelector(p);
      h._container = c, h._instance = b;
      const l = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", h, h.version, l), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = h;
    }
    const L = v == null ? void 0 : v.reduce((c, l) => {
      const u = F(l);
      return c[u] = (j) => {
        b.emit(l, j);
      }, c;
    }, {}), V = (w = e == null ? void 0 : e.namedSlots) == null ? void 0 : w.reduce((c, l) => (c[l] = () => o("slot", { name: l }), c), {});
    return () => o(
      e,
      {
        ...S,
        ...L
      },
      {
        default: () => o("slot"),
        ...V,
        ...A
      }
    );
  }
}, a && { shadowRoot: !1 }), W = ({
  elementName: e,
  rootComponent: i,
  plugins: t,
  cssFrameworkStyles: s,
  VueDefineCustomElement: o,
  h: n,
  createApp: r,
  getCurrentInstance: p,
  disableRemoveStylesOnUnmount: f = !1,
  disableShadowDOM: a = !1
}) => {
  if (!i) {
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
  if (!n) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!r) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!p) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  const _ = G({
    rootComponent: i,
    plugins: t,
    cssFrameworkStyles: s,
    VueDefineCustomElement: o,
    h: n,
    createApp: r,
    getCurrentInstance: p,
    elementName: e,
    disableRemoveStylesOnUnmount: f,
    disableShadowDOM: a
  });
  customElements.define(
    e,
    _
  );
};
export {
  W as createWebComponent,
  W as default,
  G as defineCustomElement,
  M as defineCustomElementSFC
};
