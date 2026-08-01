"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Trophy } from "lucide-react";
import { matches, flagUrl } from "@/lib/data";
import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PanZoomCanvas } from "@/components/shared/pan-zoom-canvas";
import { ChampionPoster } from "@/components/knockout/champion-poster";

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
type FocusMode = "full" | "r32" | "upper" | "lower" | "late";

const COLUMNS: { key: ColKey; title: string; short: string }[] = [
  { key: "r32", title: "Round of 32", short: "R32" },
  { key: "r16", title: "Round of 16", short: "R16" },
  { key: "qf", title: "Quarter-finals", short: "QF" },
  { key: "sf", title: "Semi-finals", short: "SF" },
  { key: "final", title: "Final", short: "Final" },
];

const FOCUS_OPTIONS: { id: FocusMode; label: string; hint: string }[] = [
  { id: "r32", label: "Round of 32", hint: "Expanded cards" },
  { id: "full", label: "Full tree", hint: "All 32 → Final" },
  { id: "upper", label: "Spain half", hint: "Top path" },
  { id: "lower", label: "Argentina half", hint: "Bottom path" },
  { id: "late", label: "QF → Final", hint: "Compact" },
];

function sliceForFocus(key: ColKey, mode: FocusMode): readonly string[] {
  const slots = BRACKET_SLOTS[key];
  if (mode === "r32") return key === "r32" ? slots : [];
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

export function BracketTree({
  className,
  showChampion = true,
}: {
  className?: string;
  showChampion?: boolean;
}) {
  const [focus, setFocus] = React.useState<FocusMode>("r32");
  const [openRounds, setOpenRounds] = React.useState<Record<string, boolean>>({
    r32: true,
    r16: true,
    qf: true,
    sf: true,
    final: true,
  });

  React.useEffect(() => {
    if (focus === "late") {
      setOpenRounds({ r32: false, r16: false, qf: true, sf: true, final: true });
    } else if (focus === "r32") {
      setOpenRounds({ r32: true, r16: false, qf: false, sf: false, final: false });
    } else {
      setOpenRounds({ r32: true, r16: true, qf: true, sf: true, final: true });
    }
  }, [focus]);

  const visibleColumns = COLUMNS.filter((c) => sliceForFocus(c.key, focus).length > 0);
  const leafCount =
    focus === "late"
      ? BRACKET_SLOTS.qf.length
      : focus === "full"
        ? BRACKET_SLOTS.r32.length
        : BRACKET_SLOTS.r32.length / 2;

  // Flexible tree height grows with how many leaf nodes we show
  const treeMinHeight = Math.max(420, leafCount * 88);

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
        </div>
      </div>

      {showChampion && <ChampionPoster compact className="mb-2" />}

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

      {focus === "r32" ? (
        <div className="rounded-3xl border-2 border-[#10164F]/20 bg-[#EAEDFF] p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#304FFE]">
                First knockout round
              </p>
              <h3 className="mt-1 font-heading text-2xl tracking-wide text-[#10164F]">
                Round of 32 · {BRACKET_SLOTS.r32.length} ties
              </h3>
            </div>
            <Badge variant="pitch">{BRACKET_SLOTS.r32.length} matches</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {BRACKET_SLOTS.r32.map((id) => (
              <BracketNode key={id} match={getMatch(id)} expanded />
            ))}
          </div>
        </div>
      ) : (
        <PanZoomCanvas
          key={focus}
          initialScale={0.92}
          autoFit={focus !== "full"}
          fitMinScale={0.82}
        >
          {/* Flexible graph: columns + SVG vertices stretch together */}
          <div
            className="flex items-stretch gap-0 p-6 sm:p-8"
            style={{ minHeight: treeMinHeight, minWidth: visibleColumns.length * 260 }}
          >
            {visibleColumns.map((col, colIndex) => {
              const slots = sliceForFocus(col.key, focus);
              const nextCol = visibleColumns[colIndex + 1];
              const nextSlots = nextCol ? sliceForFocus(nextCol.key, focus) : [];
              const isLast = colIndex === visibleColumns.length - 1;

              return (
                <React.Fragment key={col.key}>
                  <BracketColumn
                    title={col.title}
                    short={col.short}
                    slots={slots}
                    highlightFinal={col.key === "final"}
                    emphasize={col.key === "r32"}
                  />
                  {!isLast && nextSlots.length > 0 && (
                    <FlexibleVertex
                      fromCount={slots.length}
                      toCount={nextSlots.length}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </PanZoomCanvas>
      )}

      {focus !== "r32" && (
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
                className="overflow-hidden rounded-2xl border-2 border-[#10164F]/20 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleRound(col.key)}
                  className="flex w-full items-center justify-between gap-3 bg-[#304FFE] px-4 py-3.5 text-left text-white"
                >
                  <span className="font-heading text-lg tracking-wide">
                    {col.title}
                    <span className="ml-2 text-sm font-bold text-white/90">
                      ({listSlots.length})
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300 ease-out",
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
                    <div className="space-y-3 bg-[#EAEDFF] p-3">
                      {listSlots.map((id) => (
                        <BracketNode
                          key={id}
                          match={getMatch(id)}
                          highlight={col.key === "final"}
                          expanded
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Flexible column: equal-height node cells that grow with the tree */
function BracketColumn({
  title,
  short,
  slots,
  highlightFinal,
  emphasize,
}: {
  title: string;
  short: string;
  slots: readonly string[];
  highlightFinal?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div className="flex w-[min(22vw,300px)] min-w-[220px] max-w-[320px] flex-1 flex-col">
      <div className="mb-3 flex h-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#10164F] px-3 text-center shadow-lg ring-2 ring-[#304FFE]/40 sm:h-16">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-white">{short}</span>
        <p className="mt-0.5 text-[11px] font-bold text-[#EAEDFF] sm:text-xs">{title}</p>
      </div>

      <div
        className="grid min-h-0 flex-1 gap-2"
        style={{ gridTemplateRows: `repeat(${slots.length}, minmax(4.5rem, 1fr))` }}
      >
        {slots.map((id) => (
          <div key={id} className="flex min-h-0 items-stretch">
            <BracketNode
              match={getMatch(id)}
              highlight={highlightFinal}
              expanded={emphasize}
              flexible
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Flexible vertex/edge between rounds.
 * SVG scales with column height; stroke stays crisp while zooming the canvas.
 */
function FlexibleVertex({ fromCount, toCount }: { fromCount: number; toCount: number }) {
  const unit = 100;
  const height = toCount * unit;
  // How many source nodes feed each target (usually 2)
  const fanIn = Math.max(1, Math.round(fromCount / toCount));

  return (
    <div className="relative w-8 shrink-0 self-stretch sm:w-12 md:w-14" aria-hidden>
      <div className="mb-3 h-14 shrink-0 sm:h-16" />
      <svg
        className="h-[calc(100%-3.5rem)] w-full sm:h-[calc(100%-4rem)]"
        viewBox={`0 0 48 ${height}`}
        preserveAspectRatio="none"
      >
        {Array.from({ length: toCount }).map((_, i) => {
          const block = unit;
          // Elbow spans the vertical space of `fanIn` source nodes inside this block
          const y1 = i * block + block * (0.5 - 0.28 * Math.min(fanIn, 2));
          const y2 = i * block + block * (0.5 + 0.28 * Math.min(fanIn, 2));
          const ym = i * block + block * 0.5;
          return (
            <g key={i}>
              <path
                d={`M 0 ${y1} H 22 V ${y2} H 0`}
                fill="none"
                stroke="#304FFE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M 22 ${ym} H 48`}
                fill="none"
                stroke="#304FFE"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="46" cy={ym} r="3.5" fill="#304FFE" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BracketNode({
  match,
  highlight,
  expanded,
  flexible,
}: {
  match: Match | null;
  highlight?: boolean;
  expanded?: boolean;
  /** Stretch to fill grid cell */
  flexible?: boolean;
}) {
  if (!match) {
    return (
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#10164F]/30 bg-white px-3",
          flexible ? "h-full min-h-[4.5rem]" : expanded ? "min-h-[8.5rem] py-5" : "min-h-[7.25rem] py-4"
        )}
      >
        <p className="text-xs font-black uppercase tracking-wider text-[#10164F]/70">TBD</p>
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
        "flex w-full flex-col justify-center rounded-2xl border-[3px] bg-white shadow-[0_10px_28px_-14px_rgba(16,22,79,0.45)] transition-shadow hover:shadow-[0_16px_36px_-12px_rgba(48,79,254,0.45)]",
        flexible
          ? "h-full min-h-0 overflow-hidden px-2.5 py-2 sm:px-3 sm:py-2.5"
          : expanded
            ? "min-h-[8.75rem] px-4 py-4"
            : "min-h-[7.5rem] px-3.5 py-3",
        highlight
          ? "border-[#F1BF00] bg-gradient-to-br from-[#AA151B] to-[#10164F] text-white ring-4 ring-[#F1BF00]/40"
          : "border-[#10164F]/25 hover:border-[#304FFE]",
        live && "border-[#B71D1C] ring-2 ring-[#B71D1C]/25"
      )}
    >
      <div className="mb-1 flex shrink-0 items-center justify-between gap-1 sm:mb-1.5 sm:gap-2">
        {highlight ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#F1BF00] sm:text-xs">
            <Trophy className="h-3.5 w-3.5" /> Champions
          </span>
        ) : (
          <span className="truncate text-[10px] font-black uppercase tracking-wider text-[#10164F] sm:text-xs">
            {match.city}
          </span>
        )}
        <Badge
          variant={live ? "live" : done ? "pitch" : "muted"}
          className="shrink-0 px-2 py-0.5 text-[9px] sm:text-[10px]"
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
        compact={flexible && !expanded}
        onDark={highlight}
      />
      <div
        className={cn(
          "my-0.5 h-px shrink-0 sm:my-1",
          highlight ? "bg-white/25" : "bg-[#10164F]/15"
        )}
      />
      <TeamRow
        code={match.awayCode}
        country={match.awayCountry}
        score={match.awayScore}
        winner={win === "away"}
        dim={Boolean(done && win === "home")}
        compact={flexible && !expanded}
        onDark={highlight}
      />
      {match.note && (
        <p
          className={cn(
            "mt-1 truncate text-[10px] font-black sm:mt-1.5 sm:text-xs",
            highlight ? "text-[#F1BF00]" : "text-[#B71D1C]"
          )}
        >
          {match.note}
        </p>
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
  compact,
  onDark,
}: {
  code: string;
  country: string;
  score?: number;
  winner?: boolean;
  dim?: boolean;
  compact?: boolean;
  /** Final champion card uses dark red/navy — keep loser text light */
  onDark?: boolean;
}) {
  const mutedOnDark = onDark && !winner;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center rounded-xl",
        compact ? "gap-1.5 px-1.5 py-0.5" : "gap-2.5 px-2.5 py-1.5",
        winner && "bg-[#304FFE] text-white",
        mutedOnDark && "bg-white/10",
        dim && "opacity-55"
      )}
    >
      {code === "tbd" ? (
        <span
          className={cn(
            "shrink-0 rounded-md bg-[#EAEDFF]",
            compact ? "h-5 w-7" : "h-7 w-10"
          )}
        />
      ) : (
        <img
          src={flagUrl(code, "w80")}
          alt=""
          className={cn(
            "shrink-0 rounded-md object-cover ring-2 ring-white shadow-sm",
            compact ? "h-5 w-7" : "h-7 w-10"
          )}
        />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate font-black leading-tight",
          compact ? "text-xs sm:text-sm" : "text-[15px]",
          winner ? "text-white" : mutedOnDark ? "text-white/85" : "text-[#10164F]"
        )}
      >
        {country}
      </span>
      {score != null && (
        <span
          className={cn(
            "shrink-0 font-display leading-none tabular-nums",
            compact ? "text-lg sm:text-xl" : "text-2xl",
            winner ? "text-white" : mutedOnDark ? "text-white/90" : "text-[#10164F]"
          )}
        >
          {score}
        </span>
      )}
    </div>
  );
}
