import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/css/datatable.css',
                'resources/js/app.js',
                'resources/js/custom.js',
                'resources/js/ajax/table_bans.js'
            ],
            refresh: true,
        }),
    ],
});
