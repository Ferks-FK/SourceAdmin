import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/App.tsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            'ziggy-js': './vendor/tightenco/ziggy/src/js/index.js',
            '@': resolve(dirname(fileURLToPath(import.meta.url)), 'resources/js'),
            '@type': resolve(dirname(fileURLToPath(import.meta.url)), 'resources/@types')
        }
    },
    build: {
        chunkSizeWarningLimit: 768,
        target: 'esnext'
    }
});
