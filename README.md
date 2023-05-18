

# vue-web-component-wrapper

## Introduction
`vue-web-component-wrapper` is a powerful Vue 3 plugin designed for transforming full-fledged Vue applications into reusable web components (custom elements). These web components can be integrated into any website, enhancing flexibility and reusability.

## Why use `vue-web-component-wrapper`?
As of now, Vue 3 does not support the creation of full aplication as web components out of the box. This plugin aims to solve this problem by providing a simple and easy-to-use solution for creating web components from Vue applications. It also provides support for Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.
## Demo
Check out the [Demo Project](https://stackblitz.com/edit/webpack-5-react-starter-zsn6gy?file=package.jsont) to see `vue-web-component-wrapper` in action!

## Key Features:
- **Vue Plugins Compatibility**: Seamlessly integrates with Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.
- **CSS Framework Support**: Works with popular CSS frameworks like Tailwind CSS, Bootstrap.
- **CSS Preprocessor Support**: Allows you to use CSS preprocessors like SCSS and LESS.
- **Scoped CSS**: Allows you to use scoped css in your components.
- **Shadow DOM Support**: Facilitates the encapsulation of styles and scripts for your components, preventing clashes with the rest of your application.
## Installation
Install the plugin using npm or yarn:

```bash
npm install vue-web-component-wrapper
# or
yarn add vue-web-component-wrapper
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


## Webpack Configuration

The plugin is only tested with webpack. Here's a sample webpack configuration that helps webpack understand how to load and process .vue, .css, and .scss files. It also sets up an HTML plugin for webpack.

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

## Future Plans

Here are some developments I'm planning to work on:
1. **TypeScript Support**: Adding TypeScript support.
2. **Vite Bundler Support**: Adding support for the Vite bundler.

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

