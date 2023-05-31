import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

const config: UserConfig = {
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'Vue3WebComponentWrapper',
      fileName: (format) => `vue-web-component-wrapper.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
}

export default config
