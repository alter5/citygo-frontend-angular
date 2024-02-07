import themes from "./src/styles/themes"
import { createThemes } from "tw-colors"

export default  {
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
      light: themes.colors.light,
      dark: themes.colors.dark
    })
  ],
  blocklist: ['container']
}

