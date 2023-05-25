// import { defineCustomElement } from 'vue';
import myTwoButtons from './components/MyTwoButtons.ce.vue';
import style from './style.css';

// const myBtnsComponent = defineCustomElement(myTwoButtons);

// customElements.define('mytwo-buttons', myBtnsComponent);


import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';
const pluginsWrapper = {
  install: () => {
   console.log('installing plugins');
  }
};
createWebComponent({
  rootComponent: myTwoButtons,
  elementName: 'mytwo-buttons',
  plugins: pluginsWrapper,
  cssFrameworkStyles: style,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance
});