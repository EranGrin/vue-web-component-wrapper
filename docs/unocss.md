## Demo
https://stackblitz.com/~/github.com/EranGrin/element-plus-unocss-web-component
## Usage

### UnoCSS + Vite
Install UnoCSS plugin for Vite based on [unocss vite plugin](https://unocss.dev/integrations/vite)

1. **Add shadow dom option to the vite plugin**:
    ```javascript
     UnoCSS( {
      mode: 'shadow-dom',
    }),
    ```
    you can add any global css to this file

2. **Add create style.css file**:
    ```css
    @unocss-placeholder;
    ```
    you can add any global css to this file
3. **Import the style.css file with ?inline**:<br>
    ```javascript
    import style from './style.css?inline';
    ```
4. **Create your web component** passing the style variable as the cssFrameworkStyles option:<br>
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
5. **In Components**:
    All Components that use UnoCSS should have the @unocss-placeholder directive at the top of the style tag
    ```css
    <style>
    @unocss-placeholder;

    .any-other-css {
        color: red;
    }
    </style>
    ```
6. **Fonts workaround**:<br>
   ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the App.vue
