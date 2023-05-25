// import { defineCustomElement } from 'vue';
import myTwoButtons from './components/MyTwoButtons.ce.vue';

// const myBtnsComponent = defineCustomElement(myTwoButtons);

// customElements.define('mytwo-buttons', myBtnsComponent);


import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';
const pluginsWrapper = {};
createWebComponent({
  rootComponent: myTwoButtons,
  elementName: 'mytwo-buttons',
  plugins: pluginsWrapper,
  // cssFrameworkStyles: tailwindStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance
});