/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js, jsx}"
  ],
  theme: {
    screens: {
      "xs": "375px",
      "sm": "576px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
    },
    extend: {
      colors: {
        "OffWhite": "#fcfcfc",
        "OffBlack": "#030303",
        "Gray75": "#bfbfbf",
        "Gray25": "#404040",
      },
    },
  },
  plugins: [],
}

