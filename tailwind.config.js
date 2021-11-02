module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '85': '85vh',
      '90': '90vh',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
