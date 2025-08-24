import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef6ff",
          100: "#d9ebff",
          200: "#b3d7ff",
          300: "#84bdff",
          400: "#4a9aff",
          500: "#1e7fff", // main accent
          600: "#0b68e6",
          700: "#0a53b4",
          800: "#093f86",
          900: "#072c5d",
        },
      },
      boxShadow: {
        card: "0 10px 20px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
