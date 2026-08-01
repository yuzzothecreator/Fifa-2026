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
        // FIFA WC 2026 banner palette
        navy: "#304FFD",
        midnight: "#304FFD",
        "fifa-blue": "#304FFD",
        electric: "#304FFD",
        pitch: "#00C853",
        gold: "#FFFFFF",
        maple: "#E31C3D",
        sunset: "#E31C3D",
        soft: "#FFFFFF",
        mist: "#FFFFFF",
        "wc-blue": "#304FFD",
        "wc-green": "#00C853",
        "wc-red": "#E31C3D",
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
        neon: "0 10px 28px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
        "neon-green": "0 10px 28px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
        gold: "0 12px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
        "wc26-spectrum": "linear-gradient(90deg, #FFFFFF, #304FFD, #FFFFFF)",
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
