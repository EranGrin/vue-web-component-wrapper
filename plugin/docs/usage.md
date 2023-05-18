## Usage

To create a web component using `vue-web-component-wrapper`, follow the steps below:

1. **Import the necessary modules** in your entry file:
```javascript
import App from './App.vue';
import tailwindStyles from './assets/tailwind.css?raw';
import { createWebHashHistory, createRouter } from "vue-router";
import { createI18n } from 'vue-i18n';
import { createStore } from 'vuex'
import { defaultRoutes} from './main.routes.js'
import {store} from './store/index.js'
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';
```
2. **Set up the instances** and use your plugins. This is where you configure your Vuex store, Vue router, and other Vue plugins.
```javascript
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
```
3. **Create your web component** using `createWebComponent`. It takes an options object where you specify your root Vue component, the element name for your custom element, any plugins you want to use, and any CSS framework styles.
```javascript
createWebComponent({
  rootComponent: App,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: tailwindStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance
});
```
Each option in the `createWebComponent` function has a specific purpose:
- `rootComponent`: The root component of your Vue application.
- `elementName`: The tag name for your custom web component. It must contain a hyphen and be lowercase.
- `plugins`: Any Vue plugins you want to use in your application.
- `cssFrameworkStyles`: Any CSS or SCSS styles that your application needs.
- `VueDefineCustomElement`: The `defineCustomElement` function from Vue.
- `h`: The `h` function from Vue.
- `createApp`: The `createApp` function from Vue.
- `getCurrentInstance`: The `getCurrentInstance` function from Vue.