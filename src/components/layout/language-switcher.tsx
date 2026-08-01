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

  const activeLabel = languages.find((l) => l.code === active)?.code ?? "en";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border-2 border-[#10164F] bg-[#EAEDFF] px-3.5 text-sm font-black uppercase tracking-wide text-[#10164F] shadow-sm transition-colors hover:border-[#304FFE] hover:bg-[#304FFE] hover:text-white"
      >
        <Globe className="h-4 w-4 shrink-0 stroke-[2.5]" />
        <span>{activeLabel}</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-2xl border-2 border-[#10164F]/15 bg-white p-1.5 shadow-[0_18px_48px_-16px_rgba(16,22,79,0.45)]">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setActive(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#10164F] transition-colors hover:bg-[#EAEDFF]",
                active === l.code && "bg-[#304FFE] text-white hover:bg-[#304FFE]"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                {l.label}
              </span>
              {active === l.code && <Check className="h-4 w-4 stroke-[2.5]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
