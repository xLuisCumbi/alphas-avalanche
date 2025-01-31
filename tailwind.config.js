/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'avax-blue': '#161617',
                'avax-dark-gray': '#000000',
                'avax-white': '#FFFFFF',
                'avax-red': {
                    DEFAULT: '#FF394A',
                    light: '#FF394A99',
                    dark: '#E62E3E',
                },
                'ava-red': '#FF394A',
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                DEFAULT: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
        },
    },
    plugins: [],
}