import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edf4ff",
          100: "#d9e7ff",
          200: "#b8d0ff",
          300: "#8db3ff",
          400: "#4f82f2",
          500: "#1556d8",
          600: "#1149bf",
          700: "#0d3ea3",
          800: "#0c3587",
          900: "#0b2c69",
        },
        accent: {
          50: "#fffbea",
          100: "#fff1b8",
          200: "#ffe17a",
          300: "#ffd23a",
          400: "#ffc400",
          500: "#f2b500",
          600: "#d99500",
        },
        cream: {
          50: "#fffef8",
          100: "#fff8e7",
        },
        sky: {
          50: "#f1f7ff",
          100: "#dcecff",
          200: "#bad7ff",
          400: "#6ea3ff",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(21, 86, 216, 0.24)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(21,86,216,0.24), transparent 36%), radial-gradient(circle at bottom right, rgba(255,196,0,0.2), transparent 28%), linear-gradient(180deg, rgba(255,248,231,0.82), rgba(255,255,255,0))",
      },
    },
  },
  plugins: [],
} satisfies Config;
