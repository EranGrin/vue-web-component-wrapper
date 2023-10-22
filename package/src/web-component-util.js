
const nearestElement = (el) => {
  while (el?.nodeType !== 1 /* ELEMENT */) {
    if (!el.parentElement) {
      throw new Error(
        'No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)'
      )
    }
    el = el.parentElement
  }
  return el
}


export const defineCustomElement = ({
  rootComponent,
  plugins,
  cssFrameworkStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  elementName,
}) =>
  VueDefineCustomElement({
    styles: [cssFrameworkStyles],
    props: rootComponent.props,
    setup(props) {
      const app = createApp()
      app.component('app-root', rootComponent)
      app.mixin({
        mounted() {
          const insertStyles = (styles) => {
            if (styles?.length) {
              this.__style = document.createElement('style')
              this.__style.innerText = styles.join().replace(/\n/g, '')
              nearestElement(this.$el).prepend(this.__style)
              // console.log('__Style', this.__style.innerText)
            }
          }

          insertStyles(this.$?.type.styles)
          if (this.$options.components) {
            for (const comp of Object.values(this.$options.components)) {
              insertStyles(comp.styles)
            }
          }
        },
        unmounted() {
          this.__style?.remove()
        },
      })

      app.use(plugins)
      
      const inst = getCurrentInstance()
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)

      // Add support for Vue Devtools
      if (process.env.NODE_ENV === 'development' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const root = document.querySelector(elementName);
        app._container = root;
        app._instance = inst;
        
        const types = {
          Comment: Symbol('v-cmt'),
          Fragment: Symbol('v-fgt'),
          Static: Symbol('v-stc'),
          Text: Symbol('v-txt'),
        };
        
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('app:init', app, app.version, types);
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
      }

      return () => h(rootComponent, props)
    },
  })
