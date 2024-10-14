var D = Object.defineProperty;
var H = (e, r, t) => r in e ? D(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var u = (e, r, t) => (H(e, typeof r != "symbol" ? r + "" : r, t), t);
import { defineComponent as $, nextTick as B, render as A, createVNode as K, h as U } from "vue";
/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const z = Object.assign, P = Array.isArray, M = (e) => typeof e == "string", L = (e) => {
  const r = /* @__PURE__ */ Object.create(null);
  return (t) => r[t] || (r[t] = e(t));
}, k = /-(\w)/g, O = L((e) => e.replace(k, (r, t) => t ? t.toUpperCase() : "")), C = /\B([A-Z])/g, m = L(
  (e) => e.replace(C, "-$1").toLowerCase()
), S = (e) => {
  const r = M(e) ? Number(e) : NaN;
  return isNaN(r) ? e : r;
};
/*! #__NO_SIDE_EFFECTS__ */
function F(e, r, t) {
  const s = $(e);
  class o extends g {
    constructor(i) {
      super(s, i, r, t);
    }
  }
  return u(o, "def", s), o;
}
const G = typeof HTMLElement < "u" ? HTMLElement : class {
};
class g extends G {
  constructor(t, s = {}, o = { shadowRoot: !0 }, n) {
    super();
    /**
     * @internal
     */
    u(this, "_instance", null);
    u(this, "_connected", !1);
    u(this, "_resolved", !1);
    u(this, "_numberProps", null);
    u(this, "_styles");
    u(this, "_slots", {});
    u(this, "_ob", null);
    this._def = t, this._props = s, this._config = o, this._root && n ? n(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, B(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), A(null, this._root), this._instance = null);
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
      const { props: i } = o, p = this._collectNestedStyles(o);
      let d;
      if (i && !P(i))
        for (const a in i) {
          const h = i[a];
          (h === Number || h && h.type === Number) && (a in this._props && (this._props[a] = S(this._props[a])), (d || (d = /* @__PURE__ */ Object.create(null)))[O(a)] = !0);
        }
      if (this._numberProps = d, n && this._resolveProps(o), !this._config.shadowRoot) {
        this._slots = {};
        for (const a of Array.from(this.children)) {
          const h = a.getAttribute("slot") || "default";
          this._slots[h] || (this._slots[h] = []), this._slots[h].push(
            U(a.tagName.toLowerCase(), {}, a.innerHTML)
          );
        }
        this.replaceChildren();
      }
      this._applyStyles(p), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, o = P(s) ? s : Object.keys(s || {});
    for (const n of Object.keys(this))
      n[0] !== "_" && o.includes(n) && this._setProp(n, this[n], !0, !1);
    for (const n of o.map(O))
      Object.defineProperty(this, n, {
        get() {
          return this._getProp(n);
        },
        set(i) {
          this._setProp(n, i);
        }
      });
  }
  _setAttr(t) {
    let s = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const o = O(t);
    this._numberProps && this._numberProps[o] && (s = S(s)), this._setProp(o, s, !1);
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
    A(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = K(this._def, z({}, this._props), this._slots);
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const o = (i, p) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: p
          })
        );
      };
      s.emit = (i, ...p) => {
        o(i, p), m(i) !== i && o(m(i), p);
      };
      let n = this;
      for (; n = n && (n.parentNode || n.host); )
        if (n instanceof g) {
          s.parent = n._instance, s.provides = n._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((s) => {
      const o = document.createElement("style");
      o.textContent = s, this._root.prepend(o);
    });
  }
  _collectNestedStyles(t) {
    let s = t.styles ?? [];
    return t.components && Object.values(t.components).forEach((o) => {
      s = s.concat(this._collectNestedStyles(o));
    }), s;
  }
}
const W = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function q(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
function I(e) {
  return typeof e == "string" ? e.replace(/:root/g, ":host") : Array.isArray(e) ? e.map((r) => r.replace(/:root/g, ":host")) : e;
}
const Z = ({
  rootComponent: e,
  plugins: r,
  cssFrameworkStyles: t,
  VueDefineCustomElement: s,
  h: o,
  createApp: n,
  getCurrentInstance: i,
  elementName: p,
  disableRemoveStylesOnUnmount: d,
  disableShadowDOM: a,
  replaceRootWithHostInCssFramework: h
}) => {
  const E = a ? F : s, V = h ? I(t) : t;
  return E({
    name: "vue-custom-element-root-component",
    styles: [V],
    props: {
      ...e.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] }
      // v-model support
    },
    emits: e == null ? void 0 : e.emits,
    setup(j, { slots: x }) {
      var N;
      const w = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], _ = n();
      if (_.component("app-root", e), e.provide) {
        const c = typeof e.provide == "function" ? e.provide() : e.provide;
        Object.keys(c).forEach((l) => {
          _.provide(l, c[l]);
        });
      }
      _.mixin({
        mounted() {
          var l, v, y;
          if (((v = (l = this.$) == null ? void 0 : l.type) == null ? void 0 : v.name) === "vue-custom-element-root-component")
            return;
          const c = (f) => {
            f != null && f.length && (this.__style = document.createElement("style"), this.__style.innerText = f.join().replace(/\n/g, ""), W(this.$el).append(this.__style));
          };
          if (c((y = this.$) == null ? void 0 : y.type.styles), this.$options.components)
            for (const f of Object.values(this.$options.components))
              c(f.styles);
        },
        unmounted() {
          var c;
          d || (c = this.__style) == null || c.remove();
        }
      }), _.use(r);
      const b = i();
      if (Object.assign(b.appContext, _._context), Object.assign(b.provides, _._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const c = document.querySelector(p);
        _._container = c, _._instance = b;
        const l = {
          Comment: Symbol("v-cmt"),
          Fragment: Symbol("v-fgt"),
          Static: Symbol("v-stc"),
          Text: Symbol("v-txt")
        };
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", _, _.version, l), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = _;
      }
      const T = w == null ? void 0 : w.reduce((c, l) => {
        const v = q(l);
        return c[v] = (y) => {
          b.emit(l, y);
        }, c;
      }, {}), R = (N = e == null ? void 0 : e.namedSlots) == null ? void 0 : N.reduce((c, l) => (c[l] = () => o("slot", { name: l }), c), {});
      return () => o(
        e,
        {
          ...j,
          ...T
        },
        {
          default: () => o("slot"),
          ...R,
          ...x
        }
      );
    }
  }, a && { shadowRoot: !1 });
}, X = ({
  elementName: e,
  rootComponent: r,
  plugins: t,
  cssFrameworkStyles: s,
  VueDefineCustomElement: o,
  h: n,
  createApp: i,
  getCurrentInstance: p,
  disableRemoveStylesOnUnmount: d = !1,
  disableShadowDOM: a = !1,
  replaceRootWithHostInCssFramework: h = !1
}) => {
  if (!r) {
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
  if (!i) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!p) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  const E = Z({
    rootComponent: r,
    plugins: t,
    cssFrameworkStyles: s,
    VueDefineCustomElement: o,
    h: n,
    createApp: i,
    getCurrentInstance: p,
    elementName: e,
    disableRemoveStylesOnUnmount: d,
    disableShadowDOM: a,
    replaceRootWithHostInCssFramework: h
  });
  customElements.define(
    e,
    E
  );
};
export {
  X as createWebComponent,
  X as default,
  Z as defineCustomElement,
  F as defineCustomElementSFC
};
