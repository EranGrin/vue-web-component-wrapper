var F = Object.defineProperty;
var G = (e, n, t) => n in e ? F(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var m = (e, n, t) => G(e, typeof n != "symbol" ? n + "" : n, t);
import { defineComponent as W, nextTick as X, render as D, createVNode as I, h as R } from "vue";
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Z = Object.assign, $ = Array.isArray, J = (e) => typeof e == "string", B = (e) => {
  const n = /* @__PURE__ */ Object.create(null);
  return (t) => n[t] || (n[t] = e(t));
}, Q = /-(\w)/g, S = B(
  (e) => e.replace(Q, (n, t) => t ? t.toUpperCase() : "")
), Y = /\B([A-Z])/g, N = B(
  (e) => e.replace(Y, "-$1").toLowerCase()
), C = (e) => {
  const n = J(e) ? Number(e) : NaN;
  return isNaN(n) ? e : n;
};
/*!#__NO_SIDE_EFFECTS__*/
// @__NO_SIDE_EFFECTS__
function ee(e, n, t) {
  const s = W(e);
  class o extends T {
    constructor(i) {
      super(s, i, n, t);
    }
  }
  return m(o, "def", s), o;
}
const te = typeof HTMLElement < "u" ? HTMLElement : class {
};
class T extends te {
  constructor(t, s = {}, o = { shadowRoot: !0 }, r) {
    super();
    /**
     * @internal
     */
    m(this, "_instance", null);
    m(this, "_connected", !1);
    m(this, "_resolved", !1);
    m(this, "_numberProps", null);
    m(this, "_styles");
    m(this, "_slots", {});
    m(this, "_ob", null);
    this._def = t, this._props = s, this._config = o, this._root && r ? r(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, X(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), D(null, this._root), this._instance = null);
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
      for (const r of o)
        this._setAttr(r.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (o, r = !1) => {
      var y;
      const { props: i } = o, _ = this._collectNestedStyles(o);
      let E;
      if (i && !$(i))
        for (const d in i) {
          const c = i[d];
          (c === Number || c && c.type === Number) && (d in this._props && (this._props[d] = C(this._props[d])), (E || (E = /* @__PURE__ */ Object.create(null)))[S(d)] = !0);
        }
      if (this._numberProps = E, r && this._resolveProps(o), !this._config.shadowRoot) {
        this._slots = {};
        const d = (c) => Array.from(c).map((l) => {
          var h;
          if (l.nodeType === Node.ELEMENT_NODE) {
            const u = l, b = Object.fromEntries(
              Array.from(u.attributes).map((O) => [O.name, O.value])
            );
            return R(
              u.tagName.toLowerCase(),
              b,
              d(u.childNodes)
            );
          } else if (l.nodeType === Node.TEXT_NODE)
            return ((h = l.textContent) == null ? void 0 : h.trim()) || null;
          return null;
        }).filter((l) => l != null);
        for (const c of Array.from(this.childNodes)) {
          const l = c.nodeType === Node.ELEMENT_NODE && c.getAttribute("slot") || "default";
          if (this._slots[l] || (this._slots[l] = []), c.nodeType === Node.ELEMENT_NODE) {
            const h = c, u = Object.fromEntries(
              Array.from(h.attributes).map((b) => [b.name, b.value])
            );
            this._slots[l].push(
              R(
                h.tagName.toLowerCase(),
                u,
                d(h.childNodes)
              )
            );
          } else if (c.nodeType === Node.TEXT_NODE) {
            const h = (y = c.textContent) == null ? void 0 : y.trim();
            h && this._slots[l].push(h);
          }
        }
        this.replaceChildren();
      }
      this._applyStyles(_), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, o = $(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && o.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of o.map(S))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(i) {
          this._setProp(r, i);
        }
      });
  }
  _setAttr(t) {
    let s = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const o = S(t);
    this._numberProps && this._numberProps[o] && (s = C(s)), this._setProp(o, s, !1);
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
  _setProp(t, s, o = !0, r = !0) {
    s !== this._props[t] && (this._props[t] = s, r && this._instance && this._update(), o && (s === !0 ? this.setAttribute(N(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(N(t), s + "") : s || this.removeAttribute(N(t))));
  }
  _update() {
    D(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = I(this._def, Z({}, this._props), this._slots);
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const o = (i, _) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: _
          })
        );
      };
      s.emit = (i, ..._) => {
        o(i, _), N(i) !== i && o(N(i), _);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof T) {
          s.parent = r._instance, s.provides = r._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((s) => {
      const o = document.createElement("style");
      o.textContent = s, this._config.nonce && o.setAttribute("nonce", this._config.nonce), this._root.prepend(o);
    });
  }
  _collectNestedStyles(t) {
    let s = t.styles ?? [];
    return t.components && Object.values(t.components).forEach((o) => {
      s = s.concat(this._collectNestedStyles(o));
    }), s;
  }
}
const H = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function se(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
function oe(e) {
  return typeof e == "string" ? e.replace(/:root/g, ":host") : Array.isArray(e) ? e.map((n) => n.replace(/:root/g, ":host")) : e;
}
const re = ({
  rootComponent: e,
  plugins: n,
  cssFrameworkStyles: t,
  VueDefineCustomElement: s,
  h: o,
  createApp: r,
  getCurrentInstance: i,
  elementName: _,
  disableRemoveStylesOnUnmount: E,
  disableShadowDOM: y,
  replaceRootWithHostInCssFramework: d,
  asyncInitialization: c,
  loaderAttribute: l,
  hideSlotContentUntilMounted: h,
  nonce: u
}) => {
  const b = y ? ee : s, O = d ? oe(t) : t, M = b({
    styles: [O],
    nonce: u,
    props: {
      ...e.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] }
      // v-model support
    },
    emits: e == null ? void 0 : e.emits,
    setup(K, { slots: U }) {
      var L;
      const P = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], f = r();
      if (f.component("app-root", e), e.provide) {
        const a = typeof e.provide == "function" ? e.provide() : e.provide;
        Object.keys(a).forEach((p) => {
          f.provide(p, a[p]);
        });
      }
      f.mixin({
        mounted() {
          var g, A, j, V;
          if (((A = (g = this.$) == null ? void 0 : g.type) == null ? void 0 : A.name) === "vue-custom-element-root-component")
            return;
          const a = (v) => {
            v != null && v.length && (this.__style = document.createElement("style"), this.__style.innerText = v.join().replace(/\n/g, ""), u && this.__style.setAttribute("nonce", u), H(this.$el).append(this.__style));
          };
          if (a((j = this.$) == null ? void 0 : j.type.styles), this.$options.components)
            for (const v of Object.values(this.$options.components))
              a(v.styles);
          const p = ((V = this.$el.getRootNode()) == null ? void 0 : V.host) || H(this.$el);
          p && (h && p.querySelectorAll("[hidden]").forEach((q) => {
            q.removeAttribute("hidden");
          }), p.querySelectorAll(`[${l}]`).forEach((x) => {
            x.remove();
          }));
        },
        unmounted() {
          var a;
          E || (a = this.__style) == null || a.remove();
        }
      }), f.use(n);
      const w = i();
      if (Object.assign(w.appContext, f._context), Object.assign(w.provides, f._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const a = document.querySelector(_);
        f._container = a, f._instance = w;
        const p = {
          Comment: Symbol("v-cmt"),
          Fragment: Symbol("v-fgt"),
          Static: Symbol("v-stc"),
          Text: Symbol("v-txt")
        };
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", f, f.version, p), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = f;
      }
      const z = P == null ? void 0 : P.reduce((a, p) => {
        const g = se(p);
        return a[g] = (A) => {
          w.emit(p, A);
        }, a;
      }, {}), k = (L = e == null ? void 0 : e.namedSlots) == null ? void 0 : L.reduce((a, p) => (a[p] = () => o("slot", {
        name: p
      }), a), {});
      return () => o(
        e,
        {
          ...K,
          ...z
        },
        {
          default: () => o("slot"),
          ...k,
          ...U
        }
      );
    }
  }, { shadowRoot: !y, nonce: u });
  return c().then(() => M);
}, ce = ({
  elementName: e,
  rootComponent: n,
  plugins: t,
  cssFrameworkStyles: s,
  VueDefineCustomElement: o,
  h: r,
  createApp: i,
  getCurrentInstance: _,
  disableRemoveStylesOnUnmount: E = !1,
  disableShadowDOM: y = !1,
  replaceRootWithHostInCssFramework: d = !1,
  asyncInitialization: c = () => Promise.resolve(),
  loaderAttribute: l = "data-web-component-loader",
  hideSlotContentUntilMounted: h = !1,
  nonce: u
  // Used for Content Security Policy (CSP) compliance - will be applied to inline styles
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
  if (!r) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!i) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!_) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  re({
    rootComponent: n,
    plugins: t,
    cssFrameworkStyles: s,
    VueDefineCustomElement: o,
    h: r,
    createApp: i,
    getCurrentInstance: _,
    elementName: e,
    disableRemoveStylesOnUnmount: E,
    disableShadowDOM: y,
    replaceRootWithHostInCssFramework: d,
    asyncInitialization: c,
    loaderAttribute: l,
    hideSlotContentUntilMounted: h,
    nonce: u
  }).then((b) => {
    customElements.define(
      e,
      b
    );
  });
};
export {
  ce as createWebComponent,
  ce as default,
  re as defineCustomElement,
  ee as defineCustomElementSFC
};
