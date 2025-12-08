/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './themes/devopsdays/layouts/**/*.html',
        './content/**/*.md',
    ],
    safelist: [
        // Session type colors - needed for dynamic class generation
        'bg-red-50', 'bg-red-100', 'text-red-800', 'border-red-500',
        'bg-green-50', 'bg-green-100', 'text-green-800', 'border-green-500',
        'bg-yellow-50', 'bg-yellow-100', 'text-yellow-800', 'border-yellow-500',
        'bg-purple-50', 'bg-purple-100', 'text-purple-800', 'border-purple-500',
        'bg-orange-50', 'bg-orange-100', 'text-orange-800', 'border-orange-500',
        'bg-gray-50', 'bg-gray-100', 'text-gray-800', 'border-gray-500',
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
