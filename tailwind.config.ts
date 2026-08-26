
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural, warm background tones for premium food website
        background: "#FDFBF7",
        "bg-secondary": "#F8F4EC",
        "bg-tertiary": "#F0E8D8",

        // Earthy forest green accents
        "accent-primary": "#2D5016",
        "accent-secondary": "#1A3409",
        "accent-soft": "#8BAF72",

        // Vibrant complementary colors
        "terracotta": "#C9683E",
        "terracotta-soft": "#E8A87C",
        "deep-purple": "#4A2C40",
        "purple-soft": "#8A5E73",
        "warm-gold": "#D4AF37",
        "gold-soft": "#F5E6C8",
        "light-pink": "#FFE4E1",

        // Warm brown for secondary accents
        "warm-brown": "#8B6F47",

        // Deep text colors
        "text-primary": "#2C2416",
        "text-secondary": "#5C4A32",
        "text-muted": "#8C7A5C",

        // Neutral border/divider
        border: "#D4C8B0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(45, 80, 22, 0.15)',
        'glow-terracotta': '0 0 30px rgba(201, 104, 62, 0.2)',
        'glow-purple': '0 0 30px rgba(74, 44, 64, 0.2)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
