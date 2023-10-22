const u = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
}, v = ({
  rootComponent: e,
  plugins: r,
  cssFrameworkStyles: m,
  VueDefineCustomElement: d,
  h: s,
  createApp: p,
  getCurrentInstance: i,
  elementName: a
}) => d({
  styles: [m],
  props: e.props,
  setup(l) {
    const t = p();
    t.component("app-root", e), t.mixin({
      mounted() {
        var c;
        const n = (o) => {
          o != null && o.length && (this.__style = document.createElement("style"), this.__style.innerText = o.join().replace(/\n/g, ""), u(this.$el).prepend(this.__style));
        };
        if (n((c = this.$) == null ? void 0 : c.type.styles), this.$options.components)
          for (const o of Object.values(this.$options.components))
            n(o.styles);
      },
      unmounted() {
        var n;
        (n = this.__style) == null || n.remove();
      }
    }), t.use(r);
    const _ = i();
    if (Object.assign(_.appContext, t._context), Object.assign(_.provides, t._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      const n = document.querySelector(a);
      t._container = n, t._instance = _;
      const c = {
        Comment: Symbol("v-cmt"),
        Fragment: Symbol("v-fgt"),
        Static: Symbol("v-stc"),
        Text: Symbol("v-txt")
      };
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", t, t.version, c), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = t;
    }
    return () => s(e, l);
  }
}), w = ({
  elementName: e,
  rootComponent: r,
  plugins: m,
  cssFrameworkStyles: d,
  VueDefineCustomElement: s,
  h: p,
  createApp: i,
  getCurrentInstance: a
}) => {
  if (!r) {
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
  if (!p) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!i) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!a) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  customElements.define(
    e,
    v({
      rootComponent: r,
      plugins: m,
      cssFrameworkStyles: d,
      VueDefineCustomElement: s,
      h: p,
      createApp: i,
      getCurrentInstance: a,
      elementName: e
    })
  );
};
export {
  w as createWebComponent
};
