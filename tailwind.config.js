// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/app/management/**/*.{js,ts,jsx,tsx}",
        "./src/client_component/**/*.{js,ts,jsx,tsx}",
        "./src/component/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                myRed: "#ff0000",
                myRed_hover: "#d6283b",
            },
        },
    },
    plugins: [],
};
