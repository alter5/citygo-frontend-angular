const themes = require("./src/styles/themes")
const { createThemes } = require("tw-colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      spacing: {
        "max-container-width": "64rem"
      },
      boxShadow: {
        primary: "0 0 5px hsl(var(--twc-bg-action-primary))"
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
