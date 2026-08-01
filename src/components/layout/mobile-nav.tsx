"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#10164F]/10 bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around px-1 py-2">
        {mobileNavLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 px-0.5 py-1.5 text-[9px] font-bold uppercase tracking-wide",
                active ? "text-[#304FFE]" : "text-[#10164F]/40"
              )}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
