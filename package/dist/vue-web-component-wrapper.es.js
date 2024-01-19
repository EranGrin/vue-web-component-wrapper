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
  cssFrameworkStyles: m,
  VueDefineCustomElement: l,
  h: s,
  createApp: a,
  getCurrentInstance: c,
  elementName: p,
  disableRemoveStylesOnUnmount: u
}) => l({
  styles: [m],
  props: {
    ...e.props,
    modelValue: { type: [String, Number, Boolean, Array, Object] }
    // v-model support
  },
  emits: e.emits,
  setup(w) {
    var v;
    const _ = [...e.emits, "update:modelValue"], n = a();
    n.component("app-root", e), n.mixin({
      mounted() {
        var o;
        const t = (r) => {
          r != null && r.length && (this.__style = document.createElement("style"), this.__style.innerText = r.join().replace(/\n/g, ""), b(this.$el).prepend(this.__style));
        };
        if (t((o = this.$) == null ? void 0 : o.type.styles), this.$options.components)
          for (const r of Object.values(this.$options.components))
            t(r.styles);
      },
      unmounted() {
        var t;
        u || (t = this.__style) == null || t.remove();
      }
    }), n.use(i);
    const d = c();
    if (Object.assign(d.appContext, n._context), Object.assign(d.provides, n._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const t = document.querySelector(p);
      n._container = t, n._instance = d;
      const o = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", n, n.version, o), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = n;
    }
    const O = _ == null ? void 0 : _.reduce((t, o) => {
      const r = y(o);
      return t[r] = (E) => {
        d.emit(o, E);
      }, t;
    }, {}), f = (v = e == null ? void 0 : e.namedSlots) == null ? void 0 : v.reduce((t, o) => (t[o] = () => s("slot", { name: o }), t), {});
    return () => s(
      e,
      {
        ...w,
        ...O
      },
      {
        default: () => s("slot"),
        ...f
      }
    );
  }
}), h = ({
  elementName: e,
  rootComponent: i,
  plugins: m,
  cssFrameworkStyles: l,
  VueDefineCustomElement: s,
  h: a,
  createApp: c,
  getCurrentInstance: p,
  disableRemoveStylesOnUnmount: u
}) => {
  if (!i) {
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
      plugins: m,
      cssFrameworkStyles: l,
      VueDefineCustomElement: s,
      h: a,
      createApp: c,
      getCurrentInstance: p,
      elementName: e,
      disableRemoveStylesOnUnmount: u
    })
  );
};
export {
  h as createWebComponent
};
