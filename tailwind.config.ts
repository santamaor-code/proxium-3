import type { Config } from "tailwindcss";

// Design tokens derived from the BioH brand mark (sage + charcoal)
// plus a terracotta accent reserved strictly for calls to action.
// See src/styles/tokens.css for the CSS-variable mirror of this scale.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#EEF4F2",
          100: "#DCE9E5",
          200: "#B9D3CB",
          300: "#96BDB1",
          400: "#7FA79C", // brand primary, from BioH logo
          500: "#638E82",
          600: "#4C6F65",
          700: "#38524A",
          800: "#243530",
          900: "#131C19",
        },
        charcoal: {
          DEFAULT: "#2B2B2B",
          soft: "#5F5E5A",
        },
        stone: {
          50: "#FAF9F7", // page background, warm off-white
          100: "#F1EFE8",
          200: "#D3D1C7",
          300: "#B4B2A9",
        },
        terracotta: {
          DEFAULT: "#D96B41", // CTA-only accent, never decorative
          dark: "#B0532F",
          light: "#F0997B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "-apple-system", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
