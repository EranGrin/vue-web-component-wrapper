## Demo
https://stackblitz.com/~/github.com/EranGrin/element-plus-unocss-web-component
## Usage


### Element-Plus + Vite
install Element Plus dependencies
```bash
npm install unplugin-element-plus
npm install unplugin-vue-components
npm install sass
```

1. **Add SASS to resolve css globally**:
    ```javascript
    import ElementPlus from 'unplugin-element-plus/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
    defineConfig({
        resolve: {
        alias: {
                '~/': `${pathSrc}/`,
                },
        },
        css: {
            preprocessorOptions: {
                scss: {
                additionalData: `
                    @use "~/styles/element/index.scss";
                `,
                },
            },
            },
    }),
    ```
2. **Create css variables file styles/element/index.scss**:
    ```scss
    $--colors: (
        "primary": (
            "base": rgb(182, 0, 182),
        ),
        "success": (
            "base": #21ba45,
        ),
    )

    @use "element-plus/theme-chalk/dark/css-vars.css" as *;

    @forward "element-plus/theme-chalk/src/common/var.scss" with (
        $colors: $--colors,
        $button-padding-horizontal: ("default": 50px)
    );
    ```
    you can add any global css to this file
3. **Add Element-Plus to the unplugin-vue-components Components**:
    ```javascript
    Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: './components.d.ts',
        resolvers: [
                    ElementPlusResolver({
                    importStyle: 'sass',
                    directives: true,
                    }),
                ],
        }),
    ```
4. **Add Element-Plus to the Vite plugins**:
    ```javascript 
    ElementPlus({
        useSource: true,
    }),
    ```
5. **Create style.css file**:
    ```css
        @import 'element-plus/theme-chalk/src/index.scss';
        @use '~/styles/index.scss';
    ```
    you can add any global css to this file
6. **Import the style.css file with ?inline**:<br>
    ```javascript
    import style from './style.css?inline';
    ```
7. **Create your web component** passing the style variable as the cssFrameworkStyles option:<br>
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
8. **Fonts workaround**:<br>
   ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the App.vue
