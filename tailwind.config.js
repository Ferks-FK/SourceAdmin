const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/js/**/*.{jsx,js}'],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                header: ['"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
            },
            colors: {
                transparent: colors.transparent,
                dark: {
                    primary: '#212529',
                    secondary: '#2e3338',
                    neutral: '#1a1e22'
                }
            },
            maxWidth: {
                "sidebar-width": "var(--sidebar-width)"
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
