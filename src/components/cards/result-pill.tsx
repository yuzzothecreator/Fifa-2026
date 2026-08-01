"use client";

import Link from "next/link";
import type { Match } from "@/lib/types";
import { flagUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

function parsePenalties(note?: string): { home?: number; away?: number } | null {
  if (!note) return null;
  const m = note.match(/(\d+)\s*[–-]\s*(\d+)\s+on penalties/i);
  if (!m) return null;
  return { home: Number(m[1]), away: Number(m[2]) };
}

export function ResultPill({ match }: { match: Match }) {
  const isFinal = match.stage === "Final";
  const isBronze = /bronze|third/i.test(match.stage);
  const aet = /extra time|aet/i.test(match.note ?? "");
  const pens = parsePenalties(match.note);
  const finished = match.status === "FINISHED";
  const scheduled = match.status === "SCHEDULED";

  return (
    <Link
      href={`/matches/${match.id}`}
      className={cn(
        "result-pill w-full justify-center sm:w-auto",
        isFinal && "result-pill-final",
        isBronze && "border-white/40"
      )}
      title={`${match.homeCountry} vs ${match.awayCountry} · ${match.stage}`}
    >
      {match.homeCode !== "tbd" ? (
        <img src={flagUrl(match.homeCode, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
      ) : (
        <span className="h-4 w-6 rounded-sm bg-white/15" />
      )}

      <span className="flex min-w-[4.5rem] flex-col items-center leading-none">
        {finished ? (
          <>
            <span className="font-display text-lg tracking-wide text-[#10164F]">
              {pens && <span className="mr-1 text-[10px] text-[#10164F]/75">({pens.home})</span>}
              {match.homeScore ?? 0}
              <span className="mx-1 text-[#10164F]/30">-</span>
              {match.awayScore ?? 0}
              {pens && <span className="ml-1 text-[10px] text-[#10164F]/75">({pens.away})</span>}
            </span>
            {aet && <span className="mt-0.5 text-[8px] uppercase tracking-widest text-[#10164F]/75">AET</span>}
          </>
        ) : scheduled ? (
          <span className="font-display text-sm text-[#304FFE]">vs</span>
        ) : (
          <span className="font-display text-sm text-[#B71D1C]">LIVE</span>
        )}
      </span>

      {match.awayCode !== "tbd" ? (
        <img src={flagUrl(match.awayCode, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
      ) : (
        <span className="h-4 w-6 rounded-sm bg-white/15" />
      )}
    </Link>
  );
}

export function ResultsWall({ matches }: { matches: Match[] }) {
  const finished = matches.filter((m) => m.status === "FINISHED");
  const finals = matches.filter((m) => m.stage === "Final" || /bronze|third/i.test(m.stage));
  const grid = finished.filter((m) => !finals.includes(m));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="spectrum-bar mx-auto mb-4 h-1 w-40 rounded-full" />
        <div className="flex items-center justify-center gap-3">
          <img
            src="/wc26-logo.png"
            alt=""
            className="h-10 w-[4.5rem] object-contain"
          />
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#304FFE]">
            FIFA World Cup 2026™
          </p>
        </div>
        <h2 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight text-[#10164F] sm:text-7xl">
          Results
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {grid.map((m) => (
          <ResultPill key={m.id} match={m} />
        ))}
      </div>

      {finals.length > 0 && (
        <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
          {finals.map((m) => (
            <div
              key={m.id}
              className={cn(
                "rounded-2xl border-2 px-4 py-3",
                m.stage === "Final"
                  ? "border-[#B71D1C]/40 bg-[#EAEDFF]"
                  : "border-[#10164F]/20 bg-white"
              )}
            >
              <p
                className={cn(
                  "mb-2 text-center text-[10px] font-black uppercase tracking-[0.3em]",
                  m.stage === "Final" ? "text-[#B71D1C]" : "text-[#10164F]"
                )}
              >
                {m.stage === "Final" ? "The Final" : "Bronze Final"}
              </p>
              <ResultPill match={m} />
            </div>
          ))}
        </div>
      )}

      {finished.length === 0 && (
        <p className="text-center font-semibold text-[#10164F]/80">
          No finished matches yet — switch filters or check Upcoming.
        </p>
      )}
    </div>
  );
}
