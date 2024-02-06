const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        'max-container-width': '64rem'
      }
    },
  },
  plugins: [
    createThemes({
      light: {
        
      }
    })
  ],
  blocklist: ['container']
}

