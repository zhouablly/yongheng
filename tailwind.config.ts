import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "var(--porcelain)",
        milk: "var(--milk)",
        "mist-blue": "var(--mist-blue)",
        "sea-glass": "var(--sea-glass)",
        "faded-peach": "var(--faded-peach)",
        "sun-wash": "var(--sun-wash)",
        "paper-brown": "var(--paper-brown)",
        "soft-ink": "var(--soft-ink)",
        "ash-gray": "var(--ash-gray)",
        line: "var(--line)",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-sc)", "serif"],
        display: ["var(--font-cormorant-garamond)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "fade-up": "fadeUp 1s ease-out forwards",
        "slow-zoom": "slowZoom 20s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
