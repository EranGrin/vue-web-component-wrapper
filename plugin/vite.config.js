import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            name: 'Vue3WebComponentWrapper',
            fileName: (format) => `vue3-web-component-wrapper.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})