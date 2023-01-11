import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/scripts/index.tsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
      alias: {
        '@': resolve(dirname(fileURLToPath(import.meta.url)), 'resources', 'scripts')
      }
    }
});
