# vue-web-component-wrapper

## Introduction
`vue-web-component-wrapper` is a powerful Vue 3 plugin designed for transforming full-fledged Vue applications into reusable web components (custom elements). These web components can be integrated into any website, enhancing flexibility and reusability.

## Why use `vue-web-component-wrapper`?
As of now, Vue 3 does not support the creation of full aplication as web components out of the box. This plugin aims to solve this problem by providing a simple and easy-to-use solution for creating web components from Vue applications. It also provides support for Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.
## Demo
Check out these demo projects to see `vue-web-component-wrapper` in action:
- **Webpack implentaion**: Check out this [Webpack Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=webpack-demo)
- **Vite.js implentaion**: Check out this [Vite Demo Project](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=vite-demo)

## Key Features:
- **Vue Plugins Compatibility**: Seamlessly integrates with Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.
- **CSS Framework Support**: Works with popular CSS frameworks like Tailwind CSS, Bootstrap.
- **CSS Preprocessor Support**: Allows you to use CSS preprocessors like SCSS and LESS.
- **Scoped CSS**: Allows you to use scoped css in your components.
- **Shadow DOM Support**: Facilitates the encapsulation of styles and scripts for your components, preventing clashes with the rest of your application.


## Tips
- **Testing Production Build**: the easiest way to test your production build is to run a local server in the `dist` folder. I use [valet](https://laravel.com/docs/10.x/valet) for this, but any local server should work.