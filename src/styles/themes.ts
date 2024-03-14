const bluePalette = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  contrast: {
    50: "rgba(black, 0.87)",
    100: "rgba(black, 0.87)",
    200: "rgba(black, 0.87)",
    300: "white",
    400: "white",
    500: "white",
    600: "white",
    700: "white",
    800: "white",
    900: "white"
  }
}

const purplePalette = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  contrast: {
    50: "rgba(black, 0.87)",
    100: "rgba(black, 0.87)",
    200: "rgba(black, 0.87)",
    300: "white",
    400: "white",
    500: "white",
    600: "white",
    700: "white",
    800: "white",
    900: "white"
  }
}

const redPalette = {
  50: "#ffebef",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  contrast: {
    50: "rgba(black, 0.87)",
    100: "rgba(black, 0.87)",
    200: "rgba(black, 0.87)",
    300: "white",
    400: "white",
    500: "white",
    600: "white",
    700: "white",
    800: "white",
    900: "white"
  }
}

const generalPurposeColors = {
  "bg-caution-primary": redPalette[900],
  "bg-caution-hovered": redPalette[500],
  "text-caution-primary": redPalette["contrast"][900]
}

const themeSpecificColors = {
  light: {
    "bg-primary": "#f1f0f0",
    "bg-secondary": "white",
    "bg-tertiary": "#F8F8F8",
    "bg-hovered": "#d6d6d6",
    "bg-action-primary": bluePalette[400],
    "bg-action-primary-hovered": bluePalette[300],
    "bg-action-secondary": purplePalette[500],
    "bg-action-tertiary": bluePalette[200],
    "text-primary": "#050505",
    "text-secondary": "#65676B",
    "text-inverted": "white",
    "text-action-primary": "white",
    border: "#e0e0e0"
  },
  dark: {
    "bg-primary": "#303030",
    "bg-secondary": "#424242",
    "bg-tertiary": "#393939",
    "bg-hovered": "#4d4d4d",
    "bg-action-primary": bluePalette[400],
    "bg-action-primary-hovered": bluePalette[300],
    "bg-action-secondary": purplePalette[500],
    "bg-action-tertiary": bluePalette[200],
    "text-primary": "white",
    "text-secondary": "#B0B3B8",
    "text-inverted": "rgba(0, 0, 0, 0.87)",
    "text-action-primary": "white",
    border: "#e0e0e0"
  }
}

export default {
  generalPurposeColors,
  themeSpecificColors,
  bluePalette,
  purplePalette,
  redPalette
}

// TODO: Implement the following variables as well
// Source: stash.com
/*
--bg-primary: var(--neutral-dark1);
--bg-secondary: var(--neutral-dark2);
--bg-alternate: var(--blue-primary);
--bg-action-primary: var(--blue-primary);
--bg-action-secondary: var(--neutral-dark3);
--bg-action-tertiary: var(--neutral-dark1);
--bg-action-disabled-primary: var(--neutral-dark6);
--bg-positive: var(--green-light);
--bg-negative: var(--red-light);
--bg-warning: var(--gold-light);
--bg-target-primary: var(--neutral-dark7);
--bg-target-secondary: var(--neutral-dark5);
--bg-target-tertiary: var(--neutral-dark3);
--bg-hover-primary: var(--blue-highlight);
--bg-hover-secondary: var(--neutral-dark4);
--bg-hover-tertiary: var(--neutral-dark2);
--bg-accent: var(--blue-primary);
--text-primary: var(--neutral-dark9);
--text-secondary: var(--neutral-dark8);
--text-tertiary: var(--neutral-dark7);
--text-placeholder: var(--neutral-dark6);
--text-disabled: var(--neutral-dark5);
--text-inverted: var(--neutral-dark9);
--text-action-primary: var(--neutral-dark9);
--text-action-secondary: var(--neutral-dark9);
--text-action-tertiary: var(--neutral-dark9);
--text-action-disabled-primary: var(--neutral-dark5);
--text-action-disabled-secondary: var(--neutral-dark1);
--text-positive: var(--green-primary);
--text-negative: var(--red-primary);
--text-warning: var(--gold-primary);
--text-positive-dark: var(--green-dark);
--text-negative-dark: var(--red-dark);
--text-warning-dark: var(--gold-dark);
--border-primary: var(--neutral-dark4);
--border-active: var(--blue-primary);
--border-focused: var(--blue-light);
--shadow-primary: var(undefined);
--shadow-button: var(undefined);
--divider: var(--neutral-dark4);
--icon-default: var(--neutral-dark9);
--icon-active: var(--blue-primary);
--icon-tertiary: var(--neutral-dark7);
--icon-placeholder: var(--neutral-dark6);
--icon-disabled: var(--neutral-dark5);
--icon-inverted: var(--neutral-dark9);
color-scheme: dark;
*/
