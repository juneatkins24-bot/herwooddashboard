import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cormorant for display/editorial, DM Sans for everything else.
        // Abril Fatface is reserved for the brand mark — not wired here.
        display: ["var(--font-cormorant)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Primary
        baby: "#A8C4E0",      // Baby Blue — backgrounds, highlights, UI
        brick: "#B83A2A",     // Brick Red — CTAs, one per screen max
        // Supporting
        night: "#0E1820",     // dark bg / body text
        porcelain: "#F2F4F7", // light bg / reversed text
        warm: "#E8E0D0",      // Warm Off-White — paper / print bg
        pale: "#D6E4F0",      // Pale Blue — tints / subtle bg / interactive hover
      },
    },
  },
  plugins: [],
};

export default config;
