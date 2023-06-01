## Vite.js Configuration

Here's a sample Vite configuration. Comparing with Webpack, Vite.js is able to handle assets files like .css and .scss, and media files, importing them as you do regularly. Vue files will be parsed using oficial [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) depending of config. If you would like to add plugins for Vite, just install them with your favorite Node package manager.

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    sourcemap: 'inline',
  },
  plugins: [
    vue({
      customElement: true,
    }),
  ],
})
```
In your main.js/ts file, you will have to import the css framework in slightly different way then webpack with ```?inline``` at the end of the import statement.
This leads to a new iusse with fonts, which are not loaded when using ```?inline```. To fix this, you can import the font css in the App.vue file.
### main.js/ts
```javascript
// ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the App.vue
import style from './style.css?inline' 
```
Workaround for fonts:
### App.vue
```css
<style>
header  {
  @apply font-sans;
}

main {
  @apply font-sans;
}
</style>
```