import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        terminal: {
          bg: "#000000",
          text: "#50fa7b",
          glow: "#50fa7b33",
        },
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "type-text": "type 2s steps(40, end)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        type: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;