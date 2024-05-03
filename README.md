<p align="center">
    <h1 align="center">vue-web-component-wrapper</h1>
</p>
<p align="center">
    <em>Transforming full-fledged Vue3 applications into reusable web components</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/license-MIT-green" alt="License MIT">
	<img src="https://img.shields.io/badge/version-1.4.4-blue" alt="version 1.4.4">
	<img src="https://img.shields.io/badge/maintained-yes-brightgreen" alt="maintained yes">
</p>

<hr>


## Introduction
`vue-web-component-wrapper` is a powerful Vue 3 plugin designed for transforming full-fledged Vue applications into reusable web components (custom elements). These web components can be integrated into any website, enhancing flexibility and reusability.

## Why use `vue-web-component-wrapper`?
As of now, Vue 3 does not support the creation of full aplication as web components out of the box. This plugin aims to solve this problem by providing a simple and easy-to-use solution for creating web components from Vue applications. It also provides support for Vue ecosystem plugins such as [Vuex](https://vuex.vuejs.org/) or [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/), [Vue I18n](https://vue-i18n.intlify.dev/) and [VeeValidate](https://vee-validate.logaretm.com/v4/).
## Demo
Check out these demo projects to see `vue-web-component-wrapper` in action:
- **Webpack implentaion**: Check out this [Webpack Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=webpack-demo)
- **Vite.js implentaion**: Check out this [Vite Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=vite-demo)

## Documentation
Check out the [Docs](https://erangrin.github.io/vue-web-component-wrapper)

## Key Features:
- **Vue Plugins Compatibility**: Seamlessly integrates with Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.
- **CSS Framework Support**: Works with popular CSS frameworks like Tailwind CSS, Bootstrap.
- **CSS Preprocessor Support**: Allows you to use CSS preprocessors like SCSS and LESS.
- **Scoped CSS**: Allows you to use scoped css in your components.
- **Shadow DOM Support**: Facilitates the encapsulation of styles and scripts for your components, preventing clashes with the rest of your application.
- **VUE Devtool Support**: Supports the Vue DevTools browser extension.
- **Slot and Named Slot Support**: Define and use slots and named slots within web components.
- **v-model Support**: Improved support for two-way data binding using `v-model` architecture.
- **Event Emitting Support**: Emit and handle custom events from web components.
- **Provide/Inject Support**: Pass data from parent to child components using `provide` and `inject`.
- **Disable Removal of Styles on Unmount**: Control the removal of styles upon component unmount which can solve issue with css transition.


## Installation

```bash
npm install vue-web-component-wrapper
# or
yarn add vue-web-component-wrapper
# or
pnpm add vue-web-component-wrapper
```

## Usage

To create a web component using `vue-web-component-wrapper`, follow the steps below:

1. **Import the necessary modules** in your entry file:
```javascript
import App from './App.vue';
import tailwindStyles from './assets/tailwind.css?raw';
import { createWebHashHistory, createRouter } from "vue-router";
import { createI18n } from 'vue-i18n';
import { createStore } from 'vuex'
import { createPinia } from 'pinia'
import { defaultRoutes } from './main.routes.js'
import { store } from './store/index.js'
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';
```
2. **Set up the instances** and use your plugins. This is where you configure your Vuex/Pinia store, Vue router, and other Vue plugins.
```javascript
export const pluginsWrapper = {
  install(GivenVue: any) {
    const Vue = GivenVue

    //Vuex
    const createdStore = createStore(store)
    Vue.use(createdStore)

    //or Pinia
    const pinia = createPinia()
    Vue.use(pinia)

    //Vue Router
    const router = createRouter({
      history: createWebHashHistory(),
      routes: defaultRoutes,
    })
    Vue.use(router)

    //Vue I18n
    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
    })
    Vue.use(i18n)
  },
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
  getCurrentInstance,
  disableStyleRemoval: false,
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
- `disableStyleRemoval`: Boolean to disable removal of styles on unmount.

### cssFrameworkStyles
The `cssFrameworkStyles` option is used to import the CSS of your CSS framework or any other css style that your application needs to have globally, this option can also handle css vars that define on a `:root` selector.

4. **Build your application**. Tested bundler to build the web-component application.
## Bundlers Configuration

<details>
<summary>Vite Configuration</summary>

## Vite.js Configuration

Here's a sample Vite configuration. Comparing with Webpack, Vite.js is able to handle assets files like .css and .scss, and media files, importing them as you do regularly. Vue files will be parsed using oficial [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) depending of config. If you would like to add plugins for Vite, just install them with your favorite Node package manager.

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    sourcemap: 'inline',
  },
  plugins: [
    vue({
      customElement: true,
    }),
  ],
})
```
In your main.js/ts file, you will have to import the css framework in slightly different way then webpack with ```?inline``` at the end of the import statement.
This leads to a new iusse with fonts, which are not loaded when using ```?inline```. To fix this, you can import the font css in the App.vue file.
### main.js/ts
```javascript
// ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the App.vue
import style from './style.css?inline' 
```
Workaround for fonts:
### App.vue
```css
<style>
header  {
  @apply font-sans;
}

main {
  @apply font-sans;
}
</style>
```
</details>



<details>
<summary>Webpack Configuration</summary>

## Webpack Configuration

Here's a sample webpack configuration that helps webpack understand how to load and process .vue, .css, and .scss files. It also sets up an HTML plugin for webpack.

```javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-web-component.js',
  },
  module: {
    rules: [
      {
        test: /\.(vue|ce\.vue)$/,
        loader: 'vue-loader',
        options: {
            customElement: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        oneOf: [
          {
            resourceQuery: /raw/,
            use: [
              'to-string-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    indentedSyntax: false, // Use the SCSS syntax
                  },
                },
              },
            ],
          },
          {
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    indentedSyntax: false, // Use the SCSS syntax
                  },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.vue', '.json'],
  },
};

```
With webpack you will have to import the css framework in slightly different way then vite with ```?raw``` at the end of the import statement.
### main.js/ts
```javascript
import style from './style.css?raw' 
```
</details>

## Tips
- **Testing Production Build**: the easiest way to test your production build is to run a local server in the `dist` folder. I use [valet](https://laravel.com/docs/10.x/valet) for this, but any local server should work.
## Future Plans

1. **TypeScript Support**: Adding proper strict types.


## Contributing
Contributions are welcome! To contribute to the project, please follow these steps:
- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and commit them with a clear message
- Push your changes to your fork
- Submit a pull request to the main repository

Please make sure to follow the code style and conventions used in the project.
If you find a bug or have a feature request, please open an issue on the repository.

## License
This project is licensed under the MIT License

