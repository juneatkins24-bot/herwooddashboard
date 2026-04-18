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
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Inter", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Cambria", "serif"],
      },
      colors: {
        ink: "#121212",
        paper: "#f7f5f0",
        muted: "#6b6b6b",
      },
    },
  },
  plugins: [],
};

export default config;
