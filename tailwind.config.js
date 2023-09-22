/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js, jsx}"
  ],
  theme: {
    screens: {
      "sm": "376px",
      "md": "768px",
      "lg": "1024px",
    },
    extend: {},
  },
  plugins: [],
}

