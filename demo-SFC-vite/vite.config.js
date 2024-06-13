import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ customElement: true })],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'MyComponent',
      fileName: (format) => `my-component.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: /^vue/,
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})