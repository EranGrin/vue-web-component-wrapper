# vue-web-component-wrapper

## Introduction
`vue-web-component-wrapper` is a powerful Vue 3 plugin designed for transforming full-fledged Vue applications into reusable web components (custom elements). These web components can be integrated into any website, enhancing flexibility and reusability.

## Why use `vue-web-component-wrapper`?
As of now, Vue 3 does not support the creation of full aplication as web components out of the box. This plugin aims to solve this problem by providing a simple and easy-to-use solution for creating web components from Vue applications. It also provides support for Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.
## Demo
Check out these demo projects to see `vue-web-component-wrapper` in action:
- **Webpack implentaion**: Check out this [Webpack Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=webpack-demo)
- **Vite.js implentaion**: Check out this [Vite Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=vite-demo)

## Key Features
- **Vue Plugins Compatibility**: Integrates seamlessly with key Vue ecosystem plugins.
- **CSS Framework Support**: Compatible with major CSS frameworks like Tailwind CSS and Bootstrap.
- **CSS Preprocessor Support**: Supports CSS preprocessors including SCSS and LESS.
- **Scoped CSS**: Enables the use of scoped CSS in your components.
- **Shadow DOM Support**: Facilitates the encapsulation of styles and scripts, preventing clashes with the rest of your application.
- **VUE Devtool Support**: Fully supports the Vue DevTools browser extension.
- **Slot and Named Slot Support**: Allows for the definition and use of slots and named slots within web components.
- **Enhanced v-model Support**: Improved support for two-way data binding using the `v-model` architecture.
- **Event Emitting Capability**: Enables the emission and handling of custom events from web components.
- **Disable Style Removal on Unmount**: Option to control the removal of styles upon component unmount, addressing issues with CSS transition.


## Tips
- **Testing Production Build**: the easiest way to test your production build is to run a local server in the `dist` folder. I use [valet](https://laravel.com/docs/10.x/valet) for this, but any local server should work.