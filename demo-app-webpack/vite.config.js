import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname,'src/main.js'),
      name: 'MyWebComponent',
      fileName: 'my-web-component',
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
  plugins: [vue()],
});