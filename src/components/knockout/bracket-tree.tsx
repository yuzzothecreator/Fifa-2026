"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { matches, flagUrl } from "@/lib/data";
import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * Slot order preserves feed relationships:
 * two consecutive earlier-round slots feed the next-round slot at index i/2.
 * null keeps the tree shape when a fixture is not loaded yet.
 */
const BRACKET_SLOTS = {
  // Ordered so each pair feeds the next column (half 1: FR/ES path, half 2: EN/AR path)
  r32: [
    "m74",
    "m77",
    "m75",
    "m73",
    "m83",
    "m84",
    "m81",
    "m82",
    "m76",
    "m78",
    "m79",
    "m80",
    "m86",
    "m88",
    "m85",
    "m87",
  ],
  r16: ["m89", "m90", "m93", "m94", "m91", "m92", "m95", "m96"],
  qf: ["m97", "m98", "m99", "m100"],
  sf: ["m101", "m102"],
  final: ["m104"],
} as const;

const COLUMNS: { key: keyof typeof BRACKET_SLOTS; title: string; short: string }[] = [
  { key: "r32", title: "Round of 32", short: "R32" },
  { key: "r16", title: "Round of 16", short: "R16" },
  { key: "qf", title: "Quarter-finals", short: "QF" },
  { key: "sf", title: "Semi-finals", short: "SF" },
  { key: "final", title: "Final", short: "Final" },
];

const ROW_UNIT = 5.75; // rem per R32 row — keeps later rounds vertically centered

function getMatch(id: string | null): Match | null {
  if (!id) return null;
  return matches.find((m) => m.id === id) ?? null;
}

function winnerSide(match: Match): "home" | "away" | null {
  if (match.status !== "FINISHED") return null;
  if (match.note) {
    const note = match.note.toLowerCase();
    if (note.includes("penalties") || note.includes("win")) {
      if (note.startsWith(match.homeCountry.toLowerCase())) return "home";
      if (note.startsWith(match.awayCountry.toLowerCase())) return "away";
    }
  }
  const h = match.homeScore ?? 0;
  const a = match.awayScore ?? 0;
  if (h === a) return null;
  return h > a ? "home" : "away";
}

export function BracketTree({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#304FFE]">
            Path to glory
          </p>
          <h2 className="mt-1 font-display text-3xl uppercase leading-none tracking-tight text-[#10164F] sm:text-4xl">
            Knockout bracket
          </h2>
          <p className="mt-2 text-sm font-bold text-[#304FFE]">
            Champions: Spain 1–0 Argentina · MetLife Stadium
          </p>
        </div>
        <p className="text-sm font-semibold text-[#10164F]/80">
          Full path · R32 → Final
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border-2 border-[#10164F]/15 bg-white p-4 shadow-[0_24px_60px_-28px_rgba(16,22,79,0.3)] sm:p-6">
        <div className="flex min-w-[1080px] gap-0">
          {COLUMNS.map((col, colIndex) => {
            const slots = BRACKET_SLOTS[col.key];
            const span = BRACKET_SLOTS.r32.length / slots.length;
            const isLast = colIndex === COLUMNS.length - 1;
            const treeHeight = BRACKET_SLOTS.r32.length * ROW_UNIT;

            return (
              <div key={col.key} className="flex items-start">
                <div className="flex w-[196px] shrink-0 flex-col sm:w-[214px]">
                  <div className="mb-3 h-12 shrink-0 text-center">
                    <span className="inline-flex rounded-full bg-[#10164F] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      {col.short}
                    </span>
                    <p className="mt-1.5 text-[11px] font-bold text-[#10164F]/75">{col.title}</p>
                  </div>

                  <div className="relative" style={{ height: `${treeHeight}rem` }}>
                    {slots.map((id, i) => (
                      <div
                        key={`${col.key}-${i}`}
                        className="absolute left-0 right-0 flex items-center px-0.5"
                        style={{
                          top: `${i * span * ROW_UNIT}rem`,
                          height: `${span * ROW_UNIT}rem`,
                        }}
                      >
                        <BracketNode match={getMatch(id)} highlight={col.key === "final"} />
                      </div>
                    ))}
                  </div>
                </div>

                {!isLast && (
                  <ConnectorColumn
                    fromCount={slots.length}
                    toCount={BRACKET_SLOTS[COLUMNS[colIndex + 1].key].length}
                    treeHeight={treeHeight}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ConnectorColumn({
  fromCount,
  toCount,
  treeHeight,
}: {
  fromCount: number;
  toCount: number;
  treeHeight: number;
}) {
  const span = fromCount / toCount;
  return (
    <div className="w-8 shrink-0 sm:w-11">
      <div className="mb-3 h-12" />
      <div className="relative" style={{ height: `${treeHeight}rem` }}>
        {Array.from({ length: toCount }).map((_, i) => {
          const top = i * span * ROW_UNIT;
          const height = span * ROW_UNIT;
          return (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{ top: `${top}rem`, height: `${height}rem` }}
            >
              <div
                className="absolute left-0 w-[55%] rounded-r-sm border-y-2 border-r-2 border-[#10164F]/30"
                style={{ top: "20%", bottom: "20%" }}
              />
              <div className="absolute left-[55%] top-1/2 h-0.5 w-[45%] -translate-y-1/2 bg-[#10164F]/30" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BracketNode({ match, highlight }: { match: Match | null; highlight?: boolean }) {
  if (!match) {
    return (
      <div
        className={cn(
          "w-full rounded-xl border-2 border-dashed border-[#10164F]/20 bg-[#EAEDFF]/80 px-3 py-2",
          highlight && "border-[#304FFE]/35 bg-[#EAEDFF]"
        )}
      >
        <p className="text-center text-[10px] font-black uppercase tracking-wider text-[#10164F]/55">TBD</p>
        <p className="mt-0.5 text-center text-[11px] font-semibold text-[#10164F]/70">Awaiting fixture</p>
      </div>
    );
  }

  const done = match.status === "FINISHED";
  const live = match.status === "LIVE";
  const win = winnerSide(match);

  return (
    <Link
      href={`/matches/${match.id}`}
      className={cn(
        "block w-full rounded-xl border-2 bg-white px-2.5 py-1.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#304FFE] hover:shadow-md",
        highlight ? "border-[#304FFE] ring-2 ring-[#304FFE]/20" : "border-[#10164F]/15",
        live && "border-[#B71D1C] ring-2 ring-[#B71D1C]/20"
      )}
    >
      <div className="mb-1 flex items-center justify-between gap-1">
        {highlight ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#304FFE]">
            <Trophy className="h-3 w-3" /> Final
          </span>
        ) : (
          <span className="truncate text-[9px] font-bold uppercase tracking-wider text-[#10164F]/60">
            {match.city}
          </span>
        )}
        <Badge
          variant={live ? "live" : done ? "pitch" : "muted"}
          className="scale-90 px-1.5 py-0 text-[9px]"
        >
          {live ? "LIVE" : done ? "FT" : "VS"}
        </Badge>
      </div>
      <TeamRow
        code={match.homeCode}
        country={match.homeCountry}
        score={match.homeScore}
        winner={win === "home"}
        dim={Boolean(done && win === "away")}
      />
      <TeamRow
        code={match.awayCode}
        country={match.awayCountry}
        score={match.awayScore}
        winner={win === "away"}
        dim={Boolean(done && win === "home")}
      />
      {match.note && (
        <p className="mt-0.5 truncate text-[9px] font-semibold text-[#B71D1C]">{match.note}</p>
      )}
    </Link>
  );
}

function TeamRow({
  code,
  country,
  score,
  winner,
  dim,
}: {
  code: string;
  country: string;
  score?: number;
  winner?: boolean;
  dim?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md px-1 py-0.5",
        winner && "bg-[#EAEDFF]",
        dim && "opacity-45"
      )}
    >
      {code === "tbd" ? (
        <span className="h-4 w-6 rounded-sm bg-[#EAEDFF]" />
      ) : (
        <img
          src={flagUrl(code, "w40")}
          alt=""
          className="h-4 w-6 rounded-sm object-cover ring-1 ring-[#10164F]/15"
        />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-xs font-bold text-[#10164F]",
          winner && "text-[#304FFE]"
        )}
      >
        {country}
      </span>
      {score != null && (
        <span className={cn("font-display text-sm tabular-nums text-[#10164F]", winner && "text-[#304FFE]")}>
          {score}
        </span>
      )}
    </div>
  );
}
