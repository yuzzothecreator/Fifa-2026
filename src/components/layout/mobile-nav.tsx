"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="glass-strong mx-2 mb-2 flex items-center justify-around rounded-2xl px-1.5 py-2 shadow-neon xs:mx-3 xs:mb-3 xs:px-2">
        {mobileNavLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-0.5 py-1.5 text-[9px] font-semibold uppercase tracking-wide transition-colors xs:gap-1 xs:text-[10px]",
                active ? "text-electric" : "text-white/55"
              )}
            >
              <link.icon className={cn("h-5 w-5 shrink-0", active && "drop-shadow-[0_0_8px_rgba(0,180,255,0.85)]")} />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
