import App from './App.vue';
import AppChild from './AppChild.vue';
import tailwindStyles from './assets/tailwind.css?raw';
import { createWebHashHistory, createRouter } from "vue-router";
import { createI18n } from 'vue-i18n';
import { createStore } from 'vuex'
import { defaultRoutes} from './main.routes.js'
import { store } from './store/index.js'
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
// import { createWebComponent } from '../../package/index.js';
import { createWebComponent } from 'vue-web-component-wrapper';


const pluginsWrapper = {
  install(GivenVue) {
    const Vue = GivenVue;

    const createdStore = createStore(store)
    Vue.use(createdStore)

    const router = createRouter({
        history: createWebHashHistory(),
        routes: defaultRoutes,
    })
    Vue.use(router);
       
    const i18n = createI18n()
    Vue.use(i18n);
  }
}


createWebComponent({
  rootComponent: App,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: tailwindStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  disableRemoveStylesOnUnmount: true,
});

createWebComponent({
  rootComponent: AppChild,
  elementName: 'my-child-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: tailwindStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  disableRemoveStylesOnUnmount: true,
});
