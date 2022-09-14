/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#664de5',
        'secondary': '#8771f5',
      },
      boxShadow: {
        'input': '0 0 0 1px #8771f5',
        'inputError': '0 0 0 1px #f41e1e',
      }
    },
  },
  plugins: [],
}
