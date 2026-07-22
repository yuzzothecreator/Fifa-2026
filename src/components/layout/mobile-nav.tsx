"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="glass-strong mx-3 mb-3 flex items-center justify-around rounded-2xl px-2 py-2 shadow-neon">
        {mobileNavLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors",
                active ? "text-electric" : "text-white/55"
              )}
            >
              <link.icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_8px_rgba(0,168,255,0.8)]")} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
