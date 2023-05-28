const getStylesRecursively = (component) => {
  const customElementStyles = []

  if (component.styles) {
    customElementStyles.push(...component.styles)
  }

  const childComponents = component.components
  if (childComponents) {
    Object.keys(childComponents).forEach((name) => {
      const styles = getStylesRecursively(childComponents[name])
      customElementStyles.push(...styles)
    })
  }

  return customElementStyles
}

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

const getCustomElementStyle = (styles) => {
  const uniqueStyle = styles.map((style) => {
    if (Array.isArray(style)) return style
    return style.replace(/\n/g, '')
  })

  console.log('getCustomElementStyle', uniqueStyle)
  return [uniqueStyle.join()]
}

export const defineCustomElement = ({
  rootComponent,
  plugins,
  cssFrameworkStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
}) =>
  VueDefineCustomElement({
    styles: [cssFrameworkStyles],
    // styles: [...getStylesRecursively(rootComponent)],
    // styles: [cssFrameworkStyles, ...getStylesRecursively(rootComponent)],
    // styles: getCustomElementStyle([...getStylesRecursively(rootComponent), cssFrameworkStyles]),
    props: rootComponent.props,
    setup(props) {
      const app = createApp()
      app.component('main', rootComponent)
      app.mixin({
        mounted() {
          const insertStyles = (styles) => {
            if (styles?.length) {
              this.__style = document.createElement('style')
              this.__style.innerText = styles.join().replace(/\n/g, '')
              nearestElement(this.$el).prepend(this.__style)
              console.log('__Style', this.__style.innerText)
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

      return () => h(rootComponent, props)
    },
  })
