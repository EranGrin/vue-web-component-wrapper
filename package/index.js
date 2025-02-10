import { defineCustomElement } from './src/web-component-util'
import { defineCustomElement as defineCustomElementSFC}  from "./src/api-custom-element"

export { defineCustomElementSFC };
export const createWebComponent = ({
  elementName,
  rootComponent,
  plugins,
  cssFrameworkStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  disableRemoveStylesOnUnmount = false,
  disableShadowDOM = false,
  replaceRootWithHostInCssFramework = false,
  asyncInitialization = () => Promise.resolve(),
  loaderAttribute = 'data-web-component-loader',
  hideSlotContentUntilMounted = false,
}) => {
  if (!rootComponent) {
    console.warn('No root component provided. Please provide a root component to create a web component.')
    return
  }
  if (!elementName) {
    console.warn('No element name provided. Please provide an element name to create a web component.')
    return
  }
  if (!VueDefineCustomElement) {
    console.warn(
      'No VueDefineCustomElement provided. Please provide a VueDefineCustomElement to create a web component.'
    )
    return
  }
  if (!h) {
    console.warn('No h provided. Please provide an h to create a web component.')
    return
  }
  if (!createApp) {
    console.warn('No createApp provided. Please provide a createApp to create a web component.')
    return
  }
  if (!getCurrentInstance) {
    console.warn('No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.')
    return
  }

  defineCustomElement({
    rootComponent,
    plugins,
    cssFrameworkStyles,
    VueDefineCustomElement,
    h,
    createApp,
    getCurrentInstance,
    elementName,
    disableRemoveStylesOnUnmount,
    disableShadowDOM,
    replaceRootWithHostInCssFramework,
    asyncInitialization,
    loaderAttribute,
    hideSlotContentUntilMounted
  }, ).then((customElementConfig) => {
    customElements.define(
      elementName,
      customElementConfig
    )
  })
}

export { defineCustomElement } from './src/web-component-util'

export default createWebComponent;