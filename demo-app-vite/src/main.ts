// import { defineCustomElement } from 'vue';
import devtools from '@vue/devtools';
import app from './App.vue';
import style from './style.css';
import { pluginsWrapper } from './plugins/plugins';

import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance
} from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';

if (process.env.NODE_ENV === 'development') {
  devtools.connect('localhost', 8098);
}

createWebComponent({
  rootComponent: app,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: style,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance
});
