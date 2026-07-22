"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { matches, flagUrl } from "@/lib/data";

export function LiveScoreTicker() {
  const items = [
    ...matches.filter((m) => m.status === "LIVE"),
    ...matches.filter((m) => m.status === "FINISHED").slice(-12),
    ...matches.filter((m) => m.status === "SCHEDULED").slice(0, 6),
  ];

  const doubled = [...items, ...items];

  return (
    <div className="force-dark relative z-40 border-y border-white/10 bg-midnight/90 backdrop-blur-xl">
      <div className="spectrum-bar h-0.5 w-full" />
      <div className="flex items-center gap-0 overflow-hidden">
        <div className="flex shrink-0 items-center gap-2 border-r border-white/10 bg-red-500/15 px-4 py-2.5">
          <Radio className="h-3.5 w-3.5 animate-pulse text-red-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">Scores</span>
        </div>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="ticker-track flex w-max gap-8 pl-6">
            {doubled.map((m, i) => (
              <Link
                key={`${m.id}-${i}`}
                href={`/matches/${m.id}`}
                className="flex items-center gap-3 whitespace-nowrap text-sm transition-colors hover:text-electric"
              >
                <span className="flex items-center gap-1.5 text-white/80">
                  {m.homeCode !== "tbd" && (
                    <img src={flagUrl(m.homeCode, "w40")} alt="" className="h-3 w-4 rounded-sm object-cover" />
                  )}
                  {m.homeCountry}
                </span>
                <span className="font-display text-lg leading-none text-white">
                  {m.status === "SCHEDULED"
                    ? "vs"
                    : `${m.homeScore ?? 0}–${m.awayScore ?? 0}`}
                </span>
                <span className="flex items-center gap-1.5 text-white/80">
                  {m.awayCountry}
                  {m.awayCode !== "tbd" && (
                    <img src={flagUrl(m.awayCode, "w40")} alt="" className="h-3 w-4 rounded-sm object-cover" />
                  )}
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
                  {m.stage.replace("Group Stage · Opening Match", "Opening").split("·")[0].trim()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
