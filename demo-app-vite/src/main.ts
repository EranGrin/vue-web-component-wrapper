import app from './App.vue'
import style from './style.css' //Should be ./style.css?inline, need test
import { pluginsWrapper } from './plugins'

import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import { createWebComponent } from 'vue-web-component-wrapper'

createWebComponent({
  rootComponent: app,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: style,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
})
