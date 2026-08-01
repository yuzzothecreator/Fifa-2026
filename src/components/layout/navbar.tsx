"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b-2 border-[#10164F]/15 bg-white py-3 shadow-[0_12px_40px_-20px_rgba(16,22,79,0.35)]">
        <div className="container flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.slice(0, 7).map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-xs font-black uppercase tracking-[0.16em] transition-colors",
                    active
                      ? "text-[#304FFE]"
                      : "text-[#10164F] hover:text-[#304FFE]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <Button
              asChild
              size="sm"
              className="h-10 bg-[#304FFE] px-5 text-xs font-black uppercase tracking-wide text-white shadow-md hover:bg-[#1a3af0]"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#10164F] bg-[#EAEDFF] text-[#10164F] lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5 stroke-[2.5]" /> : <Menu className="h-5 w-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="container mt-2 grid grid-cols-2 gap-1 rounded-2xl border-2 border-[#10164F]/15 bg-white p-3 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-black uppercase tracking-wide text-[#10164F]",
                    pathname === link.href && "bg-[#304FFE] text-white"
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
