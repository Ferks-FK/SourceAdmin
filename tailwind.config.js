const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/ts/**/*.{jsx,tsx,js}'],

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
            keyframes: {
                spin: {
                    '100&': { transform: 'rotate(360deg)' },
                }
            },
            animation: {
                'spinner': 'spin 1s cubic-bezier(0.55, 0.25, 0.25, 0.7) infinite'
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
