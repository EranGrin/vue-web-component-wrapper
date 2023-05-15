

# vue3-web-component-wrapper

## Introduction
`vue3-web-component-wrapper` is a Vue 3 plugin that allows developers to define custom elements based on Vue's built-in custom elements. It allows seamless integration with Vuex for state management, Vue Router for routing, and Vue I18n for internationalization. You can also include your custom Tailwind CSS and Sass styles with your components.

Please note that the plugin is currently compatible with webpack, and additional configuration is necessary for working with Tailwind CSS and Sass. Support for vite might be considered in the future based on user demand.

## Installation
To install the plugin, use one of the following commands:

```bash
npm install vue3-web-component-wrapper
```

or

```bash
yarn add vue3-web-component-wrapper
```

## Usage
First, import the necessary modules in your entry file:

```javascript
import App from './App.vue';
import tailwindStyles from './assets/tailwind.css?raw';
import { createWebHashHistory, createRouter } from "vue-router";
import { createI18n } from 'vue-i18n';
import { createStore } from 'vuex'
import { defaultRoutes} from './main.routes.js'
import {store} from './store/index.js'
import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue3-web-component-wrapper';
```

Next, create the necessary instances and use your plugin:

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

Finally, use `createWebComponent`:

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

## Webpack Configuration

The plugin is compatible with webpack. Here's a sample webpack configuration:

```javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-component.js',
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
This configuration file helps webpack understand how to load and process .vue, .css, and .scss files.

## Contributing
We welcome contributions! Please see here for details.

## License
MIT

