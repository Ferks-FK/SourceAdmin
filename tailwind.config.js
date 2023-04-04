const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/scripts/**/*.{jsx,js}'],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                header: ['"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
            },
            colors: {
                dark: '#212529',
                lightDark: '#2e3338'
            }
        },
        screens: {
            'mobile': '320px',
            'sm': '640px',
            'mb': '600px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        }
    },

    plugins: [require('@tailwindcss/forms')],
};
