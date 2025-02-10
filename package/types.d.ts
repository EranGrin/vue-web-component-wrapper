import { Component, App } from 'vue'

interface Plugin {
  install: (app: App) => void
}

export interface CreateWebComponentOptions {
  elementName: string
  rootComponent: Component
  plugins?: Plugin
  cssFrameworkStyles?: string
  VueDefineCustomElement: (...args: any[]) => any
  h: (...args: any[]) => any
  getCurrentInstance: (...args: any[]) => any
  createApp: (...args: any[]) => any
  disableRemoveStylesOnUnmount?: boolean
  disableShadowDOM?: boolean
  replaceRootWithHostInCssFramework?: boolean
}

export function createWebComponent(options: CreateWebComponentOptions): void
export default createWebComponent


interface defineCustomElementSFCOptions {
  shadowRoot: boolean
}

export function defineCustomElementSFC(component: Component, options: defineCustomElementSFCOptions): any