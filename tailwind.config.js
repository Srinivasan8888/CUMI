/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "dark_color": "#2d2d2d",
        "light-white": "rgba(255,255,255,0.17)",
      }
    },
  },
  plugins: [],
}

