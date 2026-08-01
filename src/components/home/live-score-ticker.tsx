"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { matches, flagUrl } from "@/lib/data";
import { NYNJ } from "@/components/brand/section-band";

export function LiveScoreTicker() {
  const seen = new Set<string>();
  const items = [
    ...matches.filter((m) => m.status === "LIVE"),
    ...matches.filter((m) => m.status === "FINISHED").slice(-12),
    ...matches.filter((m) => m.status === "SCHEDULED").slice(0, 6),
  ].filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });

  const row = (prefix: string) =>
    items.map((m) => (
      <Link
        key={`${prefix}-${m.id}`}
        href={`/matches/${m.id}`}
        className="flex items-center gap-3 whitespace-nowrap text-sm text-white/90 hover:text-white"
        tabIndex={prefix === "dup" ? -1 : undefined}
      >
        <span className="flex items-center gap-1.5">
          {m.homeCode !== "tbd" && (
            <img src={flagUrl(m.homeCode, "w40")} alt="" className="h-3 w-4 object-cover" />
          )}
          {m.homeCountry}
        </span>
        <span className="font-display text-lg leading-none">
          {m.status === "SCHEDULED" ? "vs" : `${m.homeScore ?? 0}–${m.awayScore ?? 0}`}
        </span>
        <span className="flex items-center gap-1.5">
          {m.awayCountry}
          {m.awayCode !== "tbd" && (
            <img src={flagUrl(m.awayCode, "w40")} alt="" className="h-3 w-4 object-cover" />
          )}
        </span>
      </Link>
    ));

  return (
    <div className="relative z-40 text-white" style={{ backgroundColor: NYNJ.navy }}>
      <div className="flex items-center overflow-hidden border-y border-white/10">
        <div
          className="flex shrink-0 items-center gap-2 px-4 py-3"
          style={{ backgroundColor: NYNJ.blue }}
        >
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Live</span>
        </div>
        <div className="relative flex-1 overflow-hidden py-3">
          <div className="ticker-track flex w-max">
            <div className="ticker-group flex items-center gap-10 pl-6 pr-10">{row("a")}</div>
            <div className="ticker-group flex items-center gap-10 pl-6 pr-10" aria-hidden>
              {row("dup")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
