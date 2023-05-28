import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },
  build: {
    sourcemap: 'inline',
  },
  plugins: [
    vue({
      customElement: true,
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue'],
      dts: './auto-imports.d.ts',
      dirs: ['src/plugins'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components', 'src/routes'],
      extensions: ['vue'],
      dts: './components.d.ts',
    }),
  ],
})
