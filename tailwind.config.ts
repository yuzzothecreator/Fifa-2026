import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "1.5rem",
      },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // FIFA World Cup 2026™ brand tokens
        navy: "#0a1628",
        midnight: "#000000",
        "fifa-blue": "#0033A0",
        electric: "#2F6BFF",
        pitch: "#00A099",
        gold: "#FFC72C",
        maple: "#C8102E",
        sunset: "#FF7300",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        heading: ["var(--font-bebas)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        neon: "0 0 22px rgba(47,107,255,0.5), 0 0 48px rgba(0,51,160,0.3)",
        "neon-green": "0 0 22px rgba(0,160,153,0.5), 0 0 48px rgba(0,160,153,0.25)",
        gold: "0 0 22px rgba(255,199,44,0.55), 0 0 44px rgba(255,199,44,0.25)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255,199,44,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(47,107,255,0.08) 1px, transparent 1px)",
        "wc26-spectrum":
          "linear-gradient(90deg, #0033A0, #2F6BFF, #00A099, #FFC72C, #FF7300, #C8102E, #9B2CFF)",
      },
      screens: {
        xs: "390px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) rotate(8deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spot-sweep": {
          "0%, 100%": { transform: "translateX(-30%) rotate(6deg)", opacity: "0.35" },
          "50%": { transform: "translateX(30%) rotate(6deg)", opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "spot-sweep": "spot-sweep 9s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
