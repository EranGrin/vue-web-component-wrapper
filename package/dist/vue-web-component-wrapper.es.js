const b = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function y(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
const h = ({
  rootComponent: e,
  plugins: c,
  cssFrameworkStyles: l,
  VueDefineCustomElement: u,
  h: s,
  createApp: a,
  getCurrentInstance: o,
  elementName: p,
  disableRemoveStylesOnUnmount: _
}) => u({
  styles: [l],
  props: {
    ...e.props,
    modelValue: { type: [String, Number, Boolean, Array, Object] }
    // v-model support
  },
  emits: e == null ? void 0 : e.emits,
  setup(f) {
    var m;
    const v = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], r = a();
    if (r.component("app-root", e), e.provide) {
      const t = typeof e.provide == "function" ? e.provide() : e.provide;
      Object.keys(t).forEach((n) => {
        r.provide(n, t[n]);
      });
    }
    r.mixin({
      mounted() {
        var n;
        const t = (i) => {
          i != null && i.length && (this.__style = document.createElement("style"), this.__style.innerText = i.join().replace(/\n/g, ""), b(this.$el).prepend(this.__style));
        };
        if (t((n = this.$) == null ? void 0 : n.type.styles), this.$options.components)
          for (const i of Object.values(this.$options.components))
            t(i.styles);
      },
      unmounted() {
        var t;
        _ || (t = this.__style) == null || t.remove();
      }
    }), r.use(c);
    const d = o();
    if (Object.assign(d.appContext, r._context), Object.assign(d.provides, r._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const t = document.querySelector(p);
      r._container = t, r._instance = d;
      const n = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", r, r.version, n), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = r;
    }
    const w = v == null ? void 0 : v.reduce((t, n) => {
      const i = y(n);
      return t[i] = (E) => {
        d.emit(n, E);
      }, t;
    }, {}), O = (m = e == null ? void 0 : e.namedSlots) == null ? void 0 : m.reduce((t, n) => (t[n] = () => s("slot", { name: n }), t), {});
    return () => s(
      e,
      {
        ...f,
        ...w
      },
      {
        default: () => s("slot"),
        ...O
      }
    );
  }
}), S = ({
  elementName: e,
  rootComponent: c,
  plugins: l,
  cssFrameworkStyles: u,
  VueDefineCustomElement: s,
  h: a,
  createApp: o,
  getCurrentInstance: p,
  disableRemoveStylesOnUnmount: _
}) => {
  if (!c) {
    console.warn("No root component provided. Please provide a root component to create a web component.");
    return;
  }
  if (!e) {
    console.warn("No element name provided. Please provide an element name to create a web component.");
    return;
  }
  if (!s) {
    console.warn(
      "No VueDefineCustomElement provided. Please provide a VueDefineCustomElement to create a web component."
    );
    return;
  }
  if (!a) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!o) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!p) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  customElements.define(
    e,
    h({
      rootComponent: c,
      plugins: l,
      cssFrameworkStyles: u,
      VueDefineCustomElement: s,
      h: a,
      createApp: o,
      getCurrentInstance: p,
      elementName: e,
      disableRemoveStylesOnUnmount: _
    })
  );
};
export {
  S as createWebComponent
};
