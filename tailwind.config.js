/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
      },
      height: {
        '711': '711px',
        '300': '300px',
      },
      width: {
        '234': '234px',
      },
      fontSize: {
        '7xl': '5rem',
      },
      colors: {
        'erin': {
          border: '#8EC0A1',
          hover: '#027a48',
        },
        'event': {
          'green': '#2B5741',
          'orange': '#C2410C',
          'amber': '#B45309',
        },
      },
    },
  },
  plugins: [],
}
