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
        // NYNJ / DD.NYC official tokens (distinct roles — not all blue)
        navy: "#10164F",
        midnight: "#10164F",
        "fifa-blue": "#304FFE",
        electric: "#304FFE",
        pitch: "#10164F",
        gold: "#10164F",
        maple: "#B71D1C",
        sunset: "#B71D1C",
        soft: "#EAEDFF",
        mist: "#EAEDFF",
        "wc-blue": "#304FFE",
        "wc-green": "#10164F",
        "wc-red": "#B71D1C",
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
        neon: "0 12px 32px rgba(16,22,79,0.18), 0 2px 8px rgba(16,22,79,0.08)",
        "neon-green": "0 12px 32px rgba(48,79,254,0.18), 0 2px 8px rgba(48,79,254,0.08)",
        gold: "0 12px 32px rgba(16,22,79,0.2), 0 2px 8px rgba(16,22,79,0.1)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(16,22,79,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,22,79,0.06) 1px, transparent 1px)",
        "wc26-spectrum": "linear-gradient(90deg, #10164F, #304FFE, #B71D1C)",
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
