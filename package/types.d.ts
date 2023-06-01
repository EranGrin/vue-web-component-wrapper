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
}

export function createWebComponent(options: CreateWebComponentOptions): void
