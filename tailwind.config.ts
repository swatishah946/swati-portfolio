import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stone: "rgb(var(--stone) / <alpha-value>)",
        slab: "rgb(var(--slab) / <alpha-value>)",
        slab2: "rgb(var(--slab2) / <alpha-value>)",
        soft: "rgb(var(--soft) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        khata: "rgb(var(--khata) / <alpha-value>)",
        marigold: "rgb(var(--marigold) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1240px" },
    },
  },
  plugins: [],
};
export default config;
