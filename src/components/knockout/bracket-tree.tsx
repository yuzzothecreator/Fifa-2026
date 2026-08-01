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
  // Larger row height when fewer matches — easier to read
  const rowUnit = focus === "full" ? 6.1 : focus === "late" ? 7.25 : 6.75;

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
                "block text-[10px] font-semibold",
                focus === opt.id ? "text-white/85" : "text-[#10164F]/65"
              )}
            >
              {opt.hint}
            </span>
          </button>
        ))}
      </div>

      {/* Pan / zoom canvas — drag like a map or Supabase schema viewer */}
      <PanZoomCanvas key={focus} initialScale={focus === "full" ? 0.55 : 0.8}>
        <div
          className="flex gap-0 p-6"
          style={{
            minWidth: `${visibleColumns.length * 240 + (visibleColumns.length - 1) * 44}px`,
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
                <div className="flex w-[220px] shrink-0 flex-col sm:w-[236px]">
                  <div className="mb-3 flex h-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#10164F] px-2 text-center shadow-md">
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      {col.short}
                    </span>
                    <p className="mt-0.5 text-[11px] font-semibold text-white/85">{col.title}</p>
                  </div>

                  <div className="relative" style={{ height: `${treeHeight}rem` }}>
                    {slots.map((id, i) => (
                      <div
                        key={`${col.key}-${i}`}
                        className="absolute left-0 right-0 flex items-center px-0.5"
                        style={{
                          top: `${i * span * rowUnit}rem`,
                          height: `${span * rowUnit}rem`,
                        }}
                      >
                        <BracketNode match={getMatch(id)} highlight={col.key === "final"} large />
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
                        large
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
    <div className="w-9 shrink-0 sm:w-12">
      <div className="mb-3 h-14" />
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
                className="absolute left-0 w-[55%] rounded-r-md border-y-[3px] border-r-[3px] border-[#10164F]/40"
                style={{ top: "18%", bottom: "18%" }}
              />
              <div className="absolute left-[55%] top-1/2 h-[3px] w-[45%] -translate-y-1/2 bg-[#10164F]/40" />
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
  large,
}: {
  match: Match | null;
  highlight?: boolean;
  large?: boolean;
}) {
  if (!match) {
    return (
      <div className="w-full rounded-2xl border-2 border-dashed border-[#10164F]/25 bg-white px-3 py-3">
        <p className="text-center text-[10px] font-black uppercase tracking-wider text-[#10164F]/55">
          TBD
        </p>
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
        "block w-full rounded-2xl border-2 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#304FFE] hover:shadow-md",
        large ? "px-3 py-2.5" : "px-2.5 py-1.5",
        highlight ? "border-[#304FFE] ring-2 ring-[#304FFE]/25" : "border-[#10164F]/18",
        live && "border-[#B71D1C] ring-2 ring-[#B71D1C]/20"
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-1">
        {highlight ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#304FFE]">
            <Trophy className="h-3.5 w-3.5" /> Final
          </span>
        ) : (
          <span className="truncate text-[10px] font-bold uppercase tracking-wider text-[#10164F]/70">
            {match.city}
          </span>
        )}
        <Badge
          variant={live ? "live" : done ? "pitch" : "muted"}
          className="px-2 py-0.5 text-[10px]"
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
        large={large}
      />
      <TeamRow
        code={match.awayCode}
        country={match.awayCountry}
        score={match.awayScore}
        winner={win === "away"}
        dim={Boolean(done && win === "home")}
        large={large}
      />
      {match.note && (
        <p className="mt-1 truncate text-[10px] font-bold text-[#B71D1C]">{match.note}</p>
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
  large,
}: {
  code: string;
  country: string;
  score?: number;
  winner?: boolean;
  dim?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-1.5",
        large ? "py-1" : "py-0.5",
        winner && "bg-[#EAEDFF]",
        dim && "opacity-50"
      )}
    >
      {code === "tbd" ? (
        <span className={cn("rounded-sm bg-[#EAEDFF]", large ? "h-5 w-7" : "h-4 w-6")} />
      ) : (
        <img
          src={flagUrl(code, large ? "w80" : "w40")}
          alt=""
          className={cn(
            "rounded-sm object-cover ring-1 ring-[#10164F]/20",
            large ? "h-5 w-7" : "h-4 w-6"
          )}
        />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate font-black text-[#10164F]",
          large ? "text-sm" : "text-xs",
          winner && "text-[#304FFE]"
        )}
      >
        {country}
      </span>
      {score != null && (
        <span
          className={cn(
            "font-display tabular-nums text-[#10164F]",
            large ? "text-xl" : "text-sm",
            winner && "text-[#304FFE]"
          )}
        >
          {score}
        </span>
      )}
    </div>
  );
}
