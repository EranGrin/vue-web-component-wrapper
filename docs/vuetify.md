## Demo
https://stackblitz.com/~/github.com/EranGrin/vuetify-web-component-wrapper

## Usage

1. **Install Vuetify**:
    ```bash
    npm install vuetify
    ```
    or
    ```bash
    yarn add vuetify
    ```
2. **Create the vutify plugin configuration file**:
    ```javascript
    // Styles
    import '@mdi/font/css/materialdesignicons.css'
    import 'vuetify/styles'

    // Composables
    import { createVuetify } from 'vuetify'

    export default createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    })
    ```
3. **Add the plugin to the plugins warpper**:
    ```javascript
    import vuetify from './vuetify'

    export const pluginsWrapper = {
        install(GivenVue: any) {
            const Vue = GivenVue

            Vue.use(vuetify)
        }
    }
    ```
4. **Create style.css file**:
    ```css
    @import 'vuetify/dist/vuetify.min.css';
    ```
    you can add any global css to this file
5. **Import the style.css file with ?inline**:<br>
    ```javascript
    import style from './style.css?inline';
    ```
6. **Create your web component** passing the style variable as the cssFrameworkStyles option:<br>
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
