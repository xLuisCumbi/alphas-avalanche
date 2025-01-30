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
                'avax-red': '#FF394A',
            },
        },
    },
    plugins: [],
}