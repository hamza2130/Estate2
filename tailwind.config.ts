import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#f2f5f9", 100: "#e1e8f1", 200: "#c4d2e3", 600: "#1d3b63", 700: "#152d4d", 800: "#0f223b", 900: "#0a1729" },
        gold: { 50: "#fbf7ec", 100: "#f5ebcc", 300: "#e2c46f", 400: "#d6b14f", 500: "#c49a35", 600: "#a57f27" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
