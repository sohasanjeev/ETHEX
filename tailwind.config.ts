import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        euro: {
          dark: "#070E1E",
          navy: "#0C1B3D",
          deep: "#142852",
          blue: "#1E40AF",
          royal: "#2563EB",
          sky: "#38BDF8",
          gold: "#F59E0B",
          amber: "#D97706",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(12, 27, 61, 0.08)",
        cardHover: "0 12px 32px -4px rgba(12, 27, 61, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
