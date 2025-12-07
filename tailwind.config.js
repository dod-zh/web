/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './themes/devopsdays/layouts/**/*.html',
        './content/**/*.md',
    ],
    theme: {
        extend: {
            colors: {
                'indigo-dye': '#205474',
                'cerulean': '#1C80AA',
                'rich-black': '#0A191B',
                'rich-black-2': '#0A1819',
            },
        },
    },
    plugins: [],
}
