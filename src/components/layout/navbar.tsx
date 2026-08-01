"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-white/95 py-2 shadow-[0_12px_40px_-20px_rgba(16,22,79,0.35)] backdrop-blur-md"
            : "bg-transparent py-4"
        )}
      >
        <div className="container flex items-center justify-between gap-4">
          <Logo inverted={!scrolled} />

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, 7).map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
                    scrolled
                      ? active
                        ? "text-[#304FFE]"
                        : "text-[#10164F]/55 hover:text-[#10164F]"
                      : active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className={cn(!scrolled && "[&_button]:border-white/40 [&_button]:text-white")}>
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden md:inline-flex",
                scrolled ? "bg-[#304FFE] text-white" : "bg-white text-[#10164F] hover:bg-[#EAEDFF]"
              )}
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <button
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 lg:hidden",
                scrolled
                  ? "border-[#10164F]/20 text-[#10164F]"
                  : "border-white/40 text-white"
              )}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="container mt-2 grid grid-cols-2 gap-1 rounded-2xl border border-[#10164F]/10 bg-white p-3 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-[#10164F]",
                    pathname === link.href && "bg-[#EAEDFF]"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
