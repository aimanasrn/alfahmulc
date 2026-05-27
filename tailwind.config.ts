import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d8e6ff",
          200: "#b6d0ff",
          500: "#1b4fa8",
          700: "#153f87",
          900: "#0f2d63",
        },
        accent: {
          100: "#fff5cf",
          300: "#f5d55f",
          400: "#edc536",
          500: "#dcae12",
        },
        cream: {
          50: "#fffdf3",
          100: "#fff8de",
        },
        sky: {
          200: "#a9dce7",
          400: "#69c2d1",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(27, 79, 168, 0.18)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(27,79,168,0.2), transparent 36%), radial-gradient(circle at bottom right, rgba(220,174,18,0.18), transparent 28%), linear-gradient(180deg, rgba(255,248,222,0.6), rgba(255,255,255,0))",
      },
    },
  },
  plugins: [],
} satisfies Config;
