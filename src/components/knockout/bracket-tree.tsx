"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Trophy } from "lucide-react";
import { matches, flagUrl } from "@/lib/data";
import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PanZoomCanvas } from "@/components/shared/pan-zoom-canvas";

/**
 * Slot order preserves feed relationships:
 * two consecutive earlier-round slots feed the next-round slot at index i/2.
 */
const BRACKET_SLOTS = {
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

type ColKey = keyof typeof BRACKET_SLOTS;
type FocusMode = "full" | "upper" | "lower" | "late";

const COLUMNS: { key: ColKey; title: string; short: string }[] = [
  { key: "r32", title: "Round of 32", short: "R32" },
  { key: "r16", title: "Round of 16", short: "R16" },
  { key: "qf", title: "Quarter-finals", short: "QF" },
  { key: "sf", title: "Semi-finals", short: "SF" },
  { key: "final", title: "Final", short: "Final" },
];

const FOCUS_OPTIONS: { id: FocusMode; label: string; hint: string }[] = [
  { id: "full", label: "Full tree", hint: "All 32 → Final" },
  { id: "upper", label: "Spain half", hint: "Top path" },
  { id: "lower", label: "Argentina half", hint: "Bottom path" },
  { id: "late", label: "QF → Final", hint: "Compact" },
];

function sliceForFocus(key: ColKey, mode: FocusMode): readonly string[] {
  const slots = BRACKET_SLOTS[key];
  if (mode === "full") return slots;
  if (mode === "late") {
    if (key === "r32" || key === "r16") return [];
    return slots;
  }
  const half = slots.length / 2;
  return mode === "upper" ? slots.slice(0, half) : slots.slice(half);
}

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
  const [focus, setFocus] = React.useState<FocusMode>("full");
  const [openRounds, setOpenRounds] = React.useState<Record<string, boolean>>({
    r32: false,
    r16: false,
    qf: true,
    sf: true,
    final: true,
  });

  React.useEffect(() => {
    if (focus === "late") {
      setOpenRounds({ r32: false, r16: false, qf: true, sf: true, final: true });
    } else if (focus === "full") {
      setOpenRounds({ r32: true, r16: true, qf: true, sf: true, final: true });
    } else {
      setOpenRounds({ r32: true, r16: true, qf: true, sf: true, final: true });
    }
  }, [focus]);

  const visibleColumns = COLUMNS.filter((c) => sliceForFocus(c.key, focus).length > 0);
  const baseRows =
    focus === "late"
      ? BRACKET_SLOTS.qf.length
      : focus === "full"
        ? BRACKET_SLOTS.r32.length
        : BRACKET_SLOTS.r32.length / 2;
  // Roomier rows so match cards don’t look collapsed
  const rowUnit = focus === "full" ? 7.6 : focus === "late" ? 8.75 : 8.1;

  const toggleRound = (key: string) =>
    setOpenRounds((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
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
      </div>

      {/* Focus / collapse controls */}
      <div className="flex flex-wrap gap-2">
        {FOCUS_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setFocus(opt.id)}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-left transition-colors",
              focus === opt.id
                ? "border-[#304FFE] bg-[#304FFE] text-white"
                : "border-[#10164F]/20 bg-white text-[#10164F] hover:border-[#304FFE]"
            )}
          >
            <span className="block text-xs font-black uppercase tracking-wide">{opt.label}</span>
            <span
              className={cn(
                "block text-[10px] font-bold",
                focus === opt.id ? "text-white/90" : "text-[#10164F]/80"
              )}
            >
              {opt.hint}
            </span>
          </button>
        ))}
      </div>

      {/* Pan / zoom canvas — drag like a map or Supabase schema viewer */}
      <PanZoomCanvas key={focus} initialScale={focus === "full" ? 0.62 : 0.88}>
        <div
          className="flex gap-0 p-8"
          style={{
            minWidth: `${visibleColumns.length * 280 + (visibleColumns.length - 1) * 56}px`,
          }}
        >
          {visibleColumns.map((col, colIndex) => {
            const slots = sliceForFocus(col.key, focus);
            const nextCol = visibleColumns[colIndex + 1];
            const nextSlots = nextCol ? sliceForFocus(nextCol.key, focus) : [];
            const span = baseRows / slots.length;
            const isLast = colIndex === visibleColumns.length - 1;
            const treeHeight = baseRows * rowUnit;

            return (
              <div key={col.key} className="flex items-start">
                <div className="flex w-[260px] shrink-0 flex-col sm:w-[272px]">
                  <div className="mb-4 flex h-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#10164F] px-3 text-center shadow-lg ring-2 ring-[#304FFE]/40">
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-white">
                      {col.short}
                    </span>
                    <p className="mt-1 text-xs font-bold text-[#EAEDFF]">{col.title}</p>
                  </div>

                  <div className="relative" style={{ height: `${treeHeight}rem` }}>
                    {slots.map((id, i) => (
                      <div
                        key={`${col.key}-${i}`}
                        className="absolute left-0 right-0 flex items-center px-1"
                        style={{
                          top: `${i * span * rowUnit}rem`,
                          height: `${span * rowUnit}rem`,
                        }}
                      >
                        <BracketNode match={getMatch(id)} highlight={col.key === "final"} />
                      </div>
                    ))}
                  </div>
                </div>

                {!isLast && nextSlots.length > 0 && (
                  <ConnectorColumn
                    fromCount={slots.length}
                    toCount={nextSlots.length}
                    treeHeight={treeHeight}
                    rowUnit={rowUnit}
                  />
                )}
              </div>
            );
          })}
        </div>
      </PanZoomCanvas>

      {/* Accordion list — clearer on phones */}
      <div className="space-y-2 lg:hidden">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#10164F]/70">
          Round list · tap to expand
        </p>
        {visibleColumns.map((col) => {
          const listSlots = sliceForFocus(col.key, focus);
          const open = Boolean(openRounds[col.key]);
          return (
            <div
              key={`acc-${col.key}`}
              className="overflow-hidden rounded-2xl border-2 border-[#10164F]/15 bg-white"
            >
              <button
                type="button"
                onClick={() => toggleRound(col.key)}
                className="flex w-full items-center justify-between gap-3 bg-[#EAEDFF] px-4 py-3 text-left"
              >
                <span className="font-heading text-lg tracking-wide text-[#10164F]">
                  {col.title}
                  <span className="ml-2 text-sm font-bold text-[#304FFE]">({listSlots.length})</span>
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[#304FFE] transition-transform duration-300 ease-out",
                    open && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 p-3">
                    {listSlots.map((id) => (
                      <BracketNode
                        key={id}
                        match={getMatch(id)}
                        highlight={col.key === "final"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConnectorColumn({
  fromCount,
  toCount,
  treeHeight,
  rowUnit,
}: {
  fromCount: number;
  toCount: number;
  treeHeight: number;
  rowUnit: number;
}) {
  const span = fromCount / toCount;
  return (
    <div className="w-11 shrink-0 sm:w-14">
      <div className="mb-4 h-16" />
      <div className="relative" style={{ height: `${treeHeight}rem` }}>
        {Array.from({ length: toCount }).map((_, i) => {
          const top = i * span * rowUnit;
          const height = span * rowUnit;
          return (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{ top: `${top}rem`, height: `${height}rem` }}
            >
              <div
                className="absolute left-0 w-[55%] rounded-r-md border-y-[3px] border-r-[3px] border-[#304FFE]"
                style={{ top: "16%", bottom: "16%" }}
              />
              <div className="absolute left-[55%] top-1/2 h-[3px] w-[45%] -translate-y-1/2 bg-[#304FFE]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BracketNode({
  match,
  highlight,
}: {
  match: Match | null;
  highlight?: boolean;
}) {
  if (!match) {
    return (
      <div className="flex min-h-[6.5rem] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#10164F]/30 bg-white px-4 py-4">
        <p className="text-xs font-black uppercase tracking-wider text-[#10164F]/70">TBD</p>
        <p className="mt-1 text-sm font-semibold text-[#10164F]">Awaiting fixture</p>
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
        "block min-h-[6.5rem] w-full rounded-2xl border-[3px] bg-white px-3.5 py-3 shadow-[0_10px_28px_-14px_rgba(16,22,79,0.45)] transition-shadow hover:shadow-[0_16px_36px_-12px_rgba(48,79,254,0.45)]",
        highlight
          ? "border-[#304FFE] bg-[#EAEDFF] ring-4 ring-[#304FFE]/25"
          : "border-[#10164F]/25 hover:border-[#304FFE]",
        live && "border-[#B71D1C] ring-4 ring-[#B71D1C]/25"
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {highlight ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#304FFE]">
            <Trophy className="h-4 w-4" /> Final
          </span>
        ) : (
          <span className="truncate text-[11px] font-black uppercase tracking-wider text-[#10164F]">
            {match.city}
          </span>
        )}
        <Badge
          variant={live ? "live" : done ? "pitch" : "muted"}
          className="px-2.5 py-1 text-[10px]"
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
      <div className="my-1 h-px bg-[#10164F]/12" />
      <TeamRow
        code={match.awayCode}
        country={match.awayCountry}
        score={match.awayScore}
        winner={win === "away"}
        dim={Boolean(done && win === "home")}
      />
      {match.note && (
        <p className="mt-2 truncate text-[11px] font-black text-[#B71D1C]">{match.note}</p>
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
        "flex items-center gap-2.5 rounded-xl px-2 py-1.5",
        winner && "bg-[#304FFE] text-white",
        dim && "opacity-55"
      )}
    >
      {code === "tbd" ? (
        <span className="h-7 w-10 rounded-md bg-[#EAEDFF]" />
      ) : (
        <img
          src={flagUrl(code, "w80")}
          alt=""
          className="h-7 w-10 rounded-md object-cover ring-2 ring-white shadow-sm"
        />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-[15px] font-black leading-tight",
          winner ? "text-white" : "text-[#10164F]"
        )}
      >
        {country}
      </span>
      {score != null && (
        <span
          className={cn(
            "font-display text-2xl leading-none tabular-nums",
            winner ? "text-white" : "text-[#10164F]"
          )}
        >
          {score}
        </span>
      )}
    </div>
  );
}
