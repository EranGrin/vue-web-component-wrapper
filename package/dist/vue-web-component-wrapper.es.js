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
  cssFrameworkStyles: c,
  VueDefineCustomElement: m,
  h: p,
  createApp: s,
  getCurrentInstance: a
}) => m({
  styles: [c],
  props: e.props,
  setup(i) {
    const n = s();
    n.component("app-root", e), n.mixin({
      mounted() {
        var l;
        const o = (t) => {
          t != null && t.length && (this.__style = document.createElement("style"), this.__style.innerText = t.join().replace(/\n/g, ""), u(this.$el).prepend(this.__style));
        };
        if (o((l = this.$) == null ? void 0 : l.type.styles), this.$options.components)
          for (const t of Object.values(this.$options.components))
            o(t.styles);
      },
      unmounted() {
        var o;
        (o = this.__style) == null || o.remove();
      }
    }), n.use(r);
    const d = a();
    return Object.assign(d.appContext, n._context), Object.assign(d.provides, n._context.provides), () => p(e, i);
  }
}), w = ({
  elementName: e,
  rootComponent: r,
  plugins: c,
  cssFrameworkStyles: m,
  VueDefineCustomElement: p,
  h: s,
  createApp: a,
  getCurrentInstance: i
}) => {
  if (!r) {
    console.warn("No root component provided. Please provide a root component to create a web component.");
    return;
  }
  if (!e) {
    console.warn("No element name provided. Please provide an element name to create a web component.");
    return;
  }
  if (!p) {
    console.warn(
      "No VueDefineCustomElement provided. Please provide a VueDefineCustomElement to create a web component."
    );
    return;
  }
  if (!s) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!a) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!i) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  customElements.define(
    e,
    v({
      rootComponent: r,
      plugins: c,
      cssFrameworkStyles: m,
      VueDefineCustomElement: p,
      h: s,
      createApp: a,
      getCurrentInstance: i
    })
  );
};
export {
  w as createWebComponent
};
