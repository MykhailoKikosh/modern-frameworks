import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    // Dev server proxy to avoid CORS during local development
    server: {
        proxy: {
            // Proxy any request starting with /api to the Platzi API
            '/api': {
                // Use Escuelajs public test API for local dev (provides /categories, /products endpoints)
                target: 'https://api.escuelajs.co/api/v1',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
