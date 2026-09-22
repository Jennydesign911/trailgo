import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: "#1F3626",
          light: "#2F4A34",
          dark: "#152619",
        },
        moss: "#4A6B4F",
        clay: {
          DEFAULT: "#BC5B2E",
          light: "#D4794F",
          dark: "#9A4A23",
        },
        paper: "#F3F1E8",
        mist: "#E4E2D5",
        gold: "#D9A441",
        ink: "#16241C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 20px 50px -20px rgba(22, 36, 28, 0.35)",
        soft: "0 8px 24px -12px rgba(22, 36, 28, 0.25)",
      },
      backgroundImage: {
        "trail-1": "linear-gradient(135deg, #2F4A34 0%, #1F3626 60%, #16241C 100%)",
        "trail-2": "linear-gradient(135deg, #4A6B4F 0%, #2F4A34 55%, #1F3626 100%)",
        "trail-3": "linear-gradient(135deg, #BC5B2E 0%, #7A4526 70%, #3B2417 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
