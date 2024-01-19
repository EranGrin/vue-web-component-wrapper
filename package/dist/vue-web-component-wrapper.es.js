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
const S = ({
  rootComponent: e,
  plugins: i,
  cssFrameworkStyles: l,
  VueDefineCustomElement: u,
  h: o,
  createApp: a,
  getCurrentInstance: c,
  elementName: p,
  disableRemoveStylesOnUnmount: m
}) => u({
  styles: [l],
  props: {
    ...e.props,
    modelValue: { type: [String, Number, Boolean, Array, Object] }
    // v-model support
  },
  emits: e == null ? void 0 : e.emits,
  setup(w) {
    var v;
    const _ = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], n = a();
    n.component("app-root", e), n.mixin({
      mounted() {
        var r;
        const t = (s) => {
          s != null && s.length && (this.__style = document.createElement("style"), this.__style.innerText = s.join().replace(/\n/g, ""), b(this.$el).prepend(this.__style));
        };
        if (t((r = this.$) == null ? void 0 : r.type.styles), this.$options.components)
          for (const s of Object.values(this.$options.components))
            t(s.styles);
      },
      unmounted() {
        var t;
        m || (t = this.__style) == null || t.remove();
      }
    }), n.use(i);
    const d = c();
    if (Object.assign(d.appContext, n._context), Object.assign(d.provides, n._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const t = document.querySelector(p);
      n._container = t, n._instance = d;
      const r = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", n, n.version, r), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = n;
    }
    const O = _ == null ? void 0 : _.reduce((t, r) => {
      const s = y(r);
      return t[s] = (E) => {
        d.emit(r, E);
      }, t;
    }, {}), f = (v = e == null ? void 0 : e.namedSlots) == null ? void 0 : v.reduce((t, r) => (t[r] = () => o("slot", { name: r }), t), {});
    return () => o(
      e,
      {
        ...w,
        ...O
      },
      {
        default: () => o("slot"),
        ...f
      }
    );
  }
}), h = ({
  elementName: e,
  rootComponent: i,
  plugins: l,
  cssFrameworkStyles: u,
  VueDefineCustomElement: o,
  h: a,
  createApp: c,
  getCurrentInstance: p,
  disableRemoveStylesOnUnmount: m
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
  if (!a) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!c) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!p) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  customElements.define(
    e,
    S({
      rootComponent: i,
      plugins: l,
      cssFrameworkStyles: u,
      VueDefineCustomElement: o,
      h: a,
      createApp: c,
      getCurrentInstance: p,
      elementName: e,
      disableRemoveStylesOnUnmount: m
    })
  );
};
export {
  h as createWebComponent
};
