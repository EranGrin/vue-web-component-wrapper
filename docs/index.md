# vue-web-component-wrapper

## Introduction
`vue-web-component-wrapper` is a powerful Vue 3 plugin designed for transforming full-fledged Vue applications into reusable web components (custom elements). These web components can be integrated into any website, enhancing flexibility and reusability.

## Why use `vue-web-component-wrapper`?
As of now, Vue 3 does not support the creation of full applications as web components out of the box. This plugin aims to solve this problem by providing a simple and easy-to-use solution for creating web components from Vue applications. It also provides support for Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.

## Demo
Check out these demo projects to see `vue-web-component-wrapper` in action:
- **Webpack implementation**: Check out this [Webpack Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=webpack-demo)
- **Vite.js implementation**: Check out this [Vite Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=vite-demo)

## Key Features
- **Vue Plugins Compatibility**: Seamlessly integrates with key Vue ecosystem plugins.
- **CSS Framework Support**: Compatible with major CSS frameworks like Tailwind CSS and Bootstrap.
- **CSS Preprocessor Support**: Supports CSS preprocessors including SCSS and LESS.
- **Scoped CSS**: Enables the use of scoped CSS in your components.
- **Shadow DOM Support**: Facilitates the encapsulation of styles and scripts, preventing clashes with the rest of your application.
- **VUE Devtool Support**: Fully supports the Vue DevTools browser extension.
- **Slot and Named Slot Support**: Allows for the definition and use of slots and named slots within web components.
- **Enhanced v-model Support**: Improved support for two-way data binding using the `v-model` architecture.
- **Event Emitting Capability**: Enables the emission and handling of custom events from web components.
- **Disable Style Removal on Unmount**: Option to control the removal of styles upon component unmount, addressing issues with CSS transition.
- **Disable Shadow DOM**: Option to disable the Shadow DOM, rendering content in the light DOM.
- **Replace `:root` with `:host`**: New feature to replace `:root` selectors with `:host` in your CSS, ensuring proper style scoping within the Shadow DOM.

## New Feature Highlight: Replace `:root` with `:host`
Our latest feature allows you to automatically replace `:root` selectors with `:host` in your CSS styles. This is particularly useful when working with CSS frameworks or custom styles that define variables or styles on the `:root` selector. By replacing `:root` with `:host`, these styles are correctly scoped within your web component's Shadow DOM.

[Learn more about the Replace `:root` with `:host` feature](./guide/replace-root-with-host.md)

## Tips
- **Testing Production Build**: The easiest way to test your production build is to run a local server in the `dist` folder. You can use [valet](https://laravel.com/docs/10.x/valet) for this, but any local server should work.
