const themes = require("./src/styles/themes")
const { createThemes } = require("tw-colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      spacing: {
        "max-container-width": "64rem"
      }
    }
  },
  plugins: [
    createThemes({
      light: themes.colors.light,
      dark: themes.colors.dark
    })
  ]
}
