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
        isDark ? "border-gold/40 bg-gold/10" : "border-fifa-blue/40 bg-fifa-blue/10"
      )}
    >
      <Sun
        className={cn(
          "absolute left-2 h-4 w-4 transition-colors",
          isDark ? "text-white/40" : "text-gold"
        )}
      />
      <Moon
        className={cn(
          "absolute right-2 h-4 w-4 transition-colors",
          isDark ? "text-gold" : "text-black/40"
        )}
      />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
          isDark ? "ml-auto bg-gold text-black shadow-gold" : "mr-auto bg-fifa-blue text-white shadow-neon"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}
