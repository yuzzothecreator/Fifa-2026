"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Treat anything that isn't explicit "light" as dark (matches defaultTheme)
  const isDark = !mounted ? true : theme !== "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-10 w-[68px] items-center rounded-full border p-1 transition-colors",
        isDark
          ? "border-electric/40 bg-electric/10"
          : "border-gold/50 bg-gold/20"
      )}
    >
      {/* Track icons (always visible) */}
      <Sun
        className={cn(
          "absolute left-2 h-4 w-4 transition-colors",
          isDark ? "text-white/40" : "text-gold"
        )}
      />
      <Moon
        className={cn(
          "absolute right-2 h-4 w-4 transition-colors",
          isDark ? "text-electric" : "text-black/40"
        )}
      />
      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
          isDark ? "ml-auto bg-electric text-black shadow-neon" : "mr-auto bg-gold text-black shadow-gold"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}
