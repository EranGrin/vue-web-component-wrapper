<p align="center">
    <h1 align="center">vue-web-component-wrapper</h1>
</p>
<p align="center">
    <em>Transforming full-fledged Vue3 applications into reusable web components</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/license-MIT-green" alt="License MIT">
	<img src="https://img.shields.io/badge/version-1.6.8-blue" alt="version 1.6.8">
	<img src="https://img.shields.io/badge/maintained-yes-brightgreen" alt="maintained yes">
</p>

<hr>

## Introduction

**vue-web-component-wrapper** is a powerful Vue 3 plugin designed to transform full-fledged Vue applications into reusable web components (custom elements). These web components can be integrated into any website, enhancing flexibility and reusability.

## Why Use vue-web-component-wrapper?

As of now, Vue 3 does not support the creation of full applications as web components out of the box. This plugin aims to solve this problem by providing a simple and easy-to-use solution for creating web components from Vue applications. It also provides support for Vue ecosystem plugins such as [Vuex](https://vuex.vuejs.org/), [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/), [Vue I18n](https://vue-i18n.intlify.dev/), and [VeeValidate](https://vee-validate.logaretm.com/v4/).

## Demo

Check out these demo projects to see **vue-web-component-wrapper** in action:

- **Webpack Implementation**: [Webpack Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=webpack-demo)
- **Vite.js Implementation**: [Vite Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=vite-demo)

## Documentation

See the [Documentation](https://erangrin.github.io/vue-web-component-wrapper) for more details.

## Key Features

- **Vue Plugins Compatibility**: Seamlessly integrates with Vue ecosystem plugins like Vuex, Vue Router, and Vue I18n.
- **CSS Framework Support**: Works with popular CSS frameworks such as Tailwind CSS, Bootstrap, Vuetify, Element Plus, and more.
- **CSS Preprocessor Support**: Allows the use of CSS preprocessors like SCSS and LESS.
- **Scoped CSS**: Supports scoped CSS in your components.
- **Shadow DOM Support**: Encapsulates styles and scripts to prevent clashes with the rest of your application.
- **Vue DevTools Support**: Compatible with the Vue DevTools browser extension.
- **Slot and Named Slot Support**: Define and use slots and named slots within web components.
- **v-model Support**: Improved support for two-way data binding using the `v-model` architecture.
- **Event Emitting Support**: Emit and handle custom events from web components.
- **Provide/Inject Support**: Pass data from parent to child components using `provide` and `inject`.
- **Disable Removal of Styles on Unmount**: Control the removal of styles upon component unmount to solve issues with CSS transitions.
- **Disable Shadow DOM**: Option to disable Shadow DOM for web components.
- **Replace `:root` with `:host`**: Optionally replace `:root` selectors with `:host` in your CSS to ensure styles are correctly scoped within the Shadow DOM.

## CSS Frameworks Examples

- **Tailwind CSS**: [Demo](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=tailwind-demo)
- **UnoCSS**: [Demo](https://stackblitz.com/~/github.com/EranGrin/element-plus-unocss-web-component?file=src/style.css:L1-L2)
- **Vuetify**: [Demo](https://stackblitz.com/~/github.com/EranGrin/vuetify-web-component-wrapper)
- **Element Plus**: [Demo](https://stackblitz.com/~/github.com/EranGrin/element-plus-unocss-web-component?file=src/style.css:L1-L2)
- **Bootstrap**: [Demo](https://stackblitz.com/~/github.com/EranGrin/bootstrap-demo-webcomponent)

For more details, see the [Documentation](https://erangrin.github.io/vue-web-component-wrapper).

## Installation

```bash
npm install vue-web-component-wrapper
# or
yarn add vue-web-component-wrapper
# or
pnpm add vue-web-component-wrapper
```

## Usage

To create a web component using **vue-web-component-wrapper**, follow the steps below:

### 1. Import the Necessary Modules

In your entry file, import the required modules:

```javascript
import App from './App.vue';
import tailwindStyles from './assets/tailwind.css?raw';
import { createWebHashHistory, createRouter } from 'vue-router';
import { createI18n } from 'vue-i18n';
import { createStore } from 'vuex';
import { createPinia } from 'pinia';
import { defaultRoutes } from './main.routes.js';
import { store } from './store/index.js';
import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';
```

### 2. Set Up the Instances and Plugins

Configure your Vuex/Pinia store, Vue Router, and other Vue plugins:

```javascript
export const pluginsWrapper = {
  install(GivenVue) {
    const Vue = GivenVue;

    // Vuex
    const createdStore = createStore(store);
    Vue.use(createdStore);

    // Or Pinia
    const pinia = createPinia();
    Vue.use(pinia);

    // Vue Router
    const router = createRouter({
      history: createWebHashHistory(),
      routes: defaultRoutes,
    });
    Vue.use(router);

    // Vue I18n
    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
    });
    Vue.use(i18n);
  },
};
```

### 3. Create Your Web Component

Use `createWebComponent` to create your web component. Specify your root Vue component, the element name, any plugins, and CSS framework styles:

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
  disableStyleRemoval: false, // default is false
  disableShadowDOM: false,    // default is false
  replaceRootWithHost: false, // default is false
});
```

#### Options Explained

- **rootComponent**: The root component of your Vue application.
- **elementName**: The tag name for your custom web component (must contain a hyphen and be lowercase).
- **plugins**: Vue plugins to use in your application.
- **cssFrameworkStyles**: Global CSS or SCSS styles your application needs.
- **VueDefineCustomElement**: The `defineCustomElement` function from Vue.
- **h**: The `h` function from Vue.
- **createApp**: The `createApp` function from Vue.
- **getCurrentInstance**: The `getCurrentInstance` function from Vue.
- **disableStyleRemoval**: Disable removal of styles on unmount (useful for CSS transitions).
- **disableShadowDOM**: Disable Shadow DOM for web components.
- **replaceRootWithHost**: Replace `:root` selectors with `:host` in your CSS styles.

### replaceRootWithHost

The `replaceRootWithHost` option replaces all occurrences of `:root` with `:host` in your `cssFrameworkStyles`. This is useful when working with CSS variables defined on `:root`, ensuring they are properly scoped within the Shadow DOM.

#### Example Usage

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
  replaceRootWithHost: true,
});
```

### cssFrameworkStyles

The `cssFrameworkStyles` option imports the CSS of your CSS framework or any other global CSS styles your application needs. By setting `replaceRootWithHost` to `true`, any `:root` selectors in your styles will be replaced with `:host`, ensuring correct scoping within the web component.

### 4. Build Your Application

Tested bundlers to build the web-component application.

## Bundler Configurations

<details>
<summary>Vite Configuration</summary>

### Vite.js Configuration

Here's a sample Vite configuration. Vite.js handles asset files like `.css` and `.scss`, and media files, importing them as usual. Vue files are parsed using the official [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue).

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    sourcemap: 'inline',
  },
  plugins: [
    vue({
      customElement: true,
    }),
  ],
});
```

#### `main.js/ts`

In your main file, import the CSS framework with `?inline`:

```javascript
// Fonts are not loaded with ?inline; import font CSS in App.vue
import style from './style.css?inline';
```

#### `App.vue`

Workaround for fonts:

```html
<style>
@import url('https://fonts.googleapis.com/css2?family=YourFont');

header {
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

### Webpack Configuration

Here's a sample webpack configuration to handle `.vue`, `.css`, and `.scss` files:

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
                    indentedSyntax: false,
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
                    indentedSyntax: false,
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

#### `main.js/ts`

Import the CSS framework with `?raw`:

```javascript
import style from './style.css?raw';
```

</details>

<details>
<summary>Vite + Rollup Configuration</summary>

### Vite + Rollup Configuration

This configuration provides enhanced build options using Vite with Rollup:

```typescript
import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }): UserConfig => {
  return {
    esbuild: {
      // Remove debugger statements in production
      drop: mode === 'production' ? ['debugger'] : [],
    },
    build: {
      emptyOutDir: true,
      target: 'ES2020',
      rollupOptions: {
        output: {
          // Maintain original file names
          entryFileNames: '[name].js',
        },
      },
      // Disable CSS code splitting
      cssCodeSplit: false,
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // Define custom elements starting with 'app-element'
            isCustomElement: (tag) => tag.startsWith('app-element'),
          },
        },
        customElement: true,
      }),
      {
        // Hot reload fix for Vue components
        name: 'force-reload',
        handleHotUpdate({ file, server }) {
          if (file.endsWith('.vue')) {
            server.ws.send({ type: 'full-reload' });
            return [];
          }
        },
      },
    ],
  };
});
```

**Features:**


- Custom element support for tags starting with 'app-element'.
- Disabled CSS code splitting for better web component compatibility.
- Hot reload improvements for Vue components.
- Rollup output configuration to maintain file names.

</details>

## Web Component Without Shadow DOM

To create a web component without Shadow DOM, set the `disableShadowDOM` option to `true` in the `createWebComponent` function:

```javascript
createWebComponent({
  // ...other options
  disableShadowDOM: true,
});
```

This feature uses a patch to the Vue source code, which may lead to issues with future versions of Vue. Please report any issues in the repository.

### Demo Without Shadow DOM

[Demo Link](https://stackblitz.com/~/github.com/EranGrin/web-component-no-shadow-dom-demo)

## SFC as Custom Element

Enhance the functionality of Single File Components (SFC) as Custom Elements using `defineCustomElement` with two new features:

1. **Nested Components**: Use nested components with styles, sharing base components between multiple custom elements.
2. **Shadow DOM Option**: Disable Shadow DOM for the SFC custom element.

### Usage

```javascript
// main.js
import { defineCustomElementSFC } from 'vue-web-component-wrapper';
const MyComponentElement = defineCustomElementSFC(MyComponent, { shadowRoot: false });
customElements.define('my-component', MyComponentElement);
```

### Demo SFC Custom Element

[Demo Link](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=SFC-demo)

## Tips

- **Testing Production Build**: To test your production build, run a local server in the `dist` folder. You can use [Valet](https://laravel.com/docs/10.x/valet) or any local server.

## Future Plans

1. **TypeScript Support**: Adding proper strict types.

## Contributing

Contributions are welcome! To contribute:

- **Fork** the repository.
- **Create a new branch** for your feature or bug fix.
- **Make your changes** and commit them with a clear message.
- **Push your changes** to your fork.
- **Submit a pull request** to the main repository.

Please follow the code style and conventions used in the project.

If you find a bug or have a feature request, please [open an issue](https://github.com/EranGrin/vue-web-component-wrapper/issues).

## License

This project is licensed under the MIT License.