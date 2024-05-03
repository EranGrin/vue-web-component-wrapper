## Demo
https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=vite-demo

## Usage

### vite 
Vite can handle postcss and tailwindcss out of the box, but for the web component to work, you need to follow the steps below:


1. **Add create style.css file**:
    ```css
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
    ```
    you can add any global css to this file
2. **Import the style.css file with ?inline**:<br>
    ```javascript
    import style from './style.css?inline';
    ```
3. **Create your web component** passing the style variable as the cssFrameworkStyles option:<br>
    ```javascript
    createWebComponent({
      rootComponent: App,
      elementName: 'my-web-component',
      plugins: pluginsWrapper,
      cssFrameworkStyles: style,
      VueDefineCustomElement,
      h,
      createApp,
      getCurrentInstance,
      disableStyleRemoval: false,
    });
    ```
4. **Fonts workaround**:<br>
   ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the App.vue
    ```css
    header  {
        @apply font-sans;
    }

    main {
        @apply font-sans;
    }
    ```
