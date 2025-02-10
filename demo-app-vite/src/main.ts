import app from './App.vue'
import appChild from './AppChild.vue'

// ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the App.vue
import style from './style.css?inline' 

import { pluginsWrapper } from './plugins'

import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import createWebComponent  from '../../package/index.js'
// import { createWebComponent }  from '../../package/index.js'

//////////////////////////////////////////////////////////////////////////////////////
////// in real use case, you should import createWebComponent from 'vue-web-component-wrapper'
// import createWebComponent from 'vue-web-component-wrapper'
// add vue-web-component-wrapper to package.json asl well

const asyncPromise = () => { 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("p1")
    }, 1000)
  })
}

createWebComponent({
  rootComponent: app,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: style,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  disableShadowDOM: false,
  asyncInitialization: asyncPromise,
  hideSlotContentUntilMounted: true
})

createWebComponent({
  rootComponent: appChild,
  elementName: 'my-child-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: style,
  disableShadowDOM: false,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  asyncInitialization: () => new Promise((res) => setTimeout(() => res("p1"), 1000)),
  hideSlotContentUntilMounted: true
})