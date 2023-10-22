import { defineCustomElement } from './src/web-component-util'

export const createWebComponent = ({
  elementName,
  rootComponent,
  plugins,
  cssFrameworkStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
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

  customElements.define(
    elementName,
    defineCustomElement({
      rootComponent,
      plugins,
      cssFrameworkStyles,
      VueDefineCustomElement,
      h,
      createApp,
      getCurrentInstance,
      elementName,
    })
  )
}
