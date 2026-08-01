"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("en");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        className="flex h-10 items-center gap-2 rounded-full border border-[#10164F]/20 bg-[#EAEDFF] px-3 text-sm font-bold uppercase text-[#10164F] transition-colors hover:border-[#304FFE]"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{active}</span>
      </button>
      {open && (
        <div className="glass-strong absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl p-1.5 shadow-neon">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setActive(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-[#10164F]/70 transition-colors hover:bg-[#EAEDFF]",
                active === l.code && "text-[#304FFE]"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                {l.label}
              </span>
              {active === l.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
