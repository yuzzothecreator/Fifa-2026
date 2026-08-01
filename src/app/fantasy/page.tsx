"use client";

import * as React from "react";
import { Sparkles, Trash2, Save, Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PlayerCard } from "@/components/cards/player-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { players, flagUrl } from "@/lib/data";
import type { Player } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NYNJ } from "@/components/brand/section-band";

const SLOTS: { key: Player["position"]; label: string; count: number }[] = [
  { key: "GK", label: "Goalkeeper", count: 1 },
  { key: "DEF", label: "Defenders", count: 3 },
  { key: "MID", label: "Midfielders", count: 3 },
  { key: "FWD", label: "Forwards", count: 4 },
];

const BUDGET = 100;
const STORAGE_KEY = "wc26-fantasy-xi";

function costOf(p: Player) {
  return Math.round(p.rating * 2.2 + p.tournamentGoals * 0.8);
}

export default function FantasyPage() {
  const [squad, setSquad] = React.useState<Player[]>([]);
  const [saved, setSaved] = React.useState(false);
  const [filter, setFilter] = React.useState<Player["position"] | "All">("All");

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as string[];
        setSquad(ids.map((id) => players.find((p) => p.id === id)).filter(Boolean) as Player[]);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const spent = squad.reduce((s, p) => s + costOf(p), 0);
  const remaining = BUDGET - spent;

  const countByPos = (pos: Player["position"]) => squad.filter((p) => p.position === pos).length;
  const maxFor = (pos: Player["position"]) => SLOTS.find((s) => s.key === pos)!.count;

  const toggle = (player: Player) => {
    setSaved(false);
    setSquad((prev) => {
      if (prev.find((p) => p.id === player.id)) return prev.filter((p) => p.id !== player.id);
      if (prev.length >= 11) return prev;
      if (countByPos(player.position) >= maxFor(player.position)) return prev;
      if (spent + costOf(player) > BUDGET) return prev;
      return [...prev, player];
    });
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(squad.map((p) => p.id)));
    setSaved(true);
  };

  const clear = () => {
    setSquad([]);
    setSaved(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const pool = players.filter((p) => (filter === "All" ? true : p.position === filter));
  const projected = squad.reduce((s, p) => s + p.tournamentGoals * 4 + p.rating, 0);

  const stats = [
    { label: "Squad", value: `${squad.length}/11` },
    { label: "Budget left", value: remaining.toFixed(0) },
    { label: "Spent", value: spent.toFixed(0) },
    { label: "Projected pts", value: projected.toFixed(0) },
  ];

  return (
    <>
      <PageHeader
        label="Fantasy Football"
        title="Build Your XI"
        description="Pick an 11-player squad within a 100-credit budget using real 2026 World Cup form. Formation: 1–3–3–4."
      />

      <section className="container py-10 pb-24 md:pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[#10164F]/10 bg-white p-5 text-center shadow-[0_18px_48px_-24px_rgba(16,22,79,0.28)]"
            >
              <p className="font-display text-4xl text-[#10164F]">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#10164F]/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Pitch */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/20 p-6 text-white"
            style={{ backgroundColor: NYNJ.navy }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,0.1) 28px,rgba(255,255,255,0.1) 30px)",
              }}
            />
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
              style={{ backgroundColor: NYNJ.blue }}
            />
            <div className="relative space-y-6">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/70">
                Your pitch · 1–3–3–4
              </p>
              {SLOTS.map((slot) => {
                const picked = squad.filter((p) => p.position === slot.key);
                return (
                  <div key={slot.key}>
                    <p className="mb-2 text-center text-[10px] uppercase tracking-[0.25em] text-white/60">
                      {slot.label} ({picked.length}/{slot.count})
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Array.from({ length: slot.count }).map((_, i) => {
                        const player = picked[i];
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => player && toggle(player)}
                            className={cn(
                              "flex h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center transition-colors",
                              player
                                ? "border-white/40 bg-[#304FFE] text-white shadow-lg"
                                : "border-dashed border-white/35 bg-white/10 text-white/50 hover:border-white/60 hover:bg-white/15"
                            )}
                          >
                            {player ? (
                              <>
                                <img
                                  src={flagUrl(player.code, "w40")}
                                  alt=""
                                  className="mb-1 h-3 w-5 rounded-sm object-cover"
                                />
                                <span className="line-clamp-2 px-1 text-[10px] font-semibold leading-tight">
                                  {player.name.split(" ").slice(-1)}
                                </span>
                                <span className="text-[9px] text-white/80">{costOf(player)}</span>
                              </>
                            ) : (
                              <span className="text-lg">+</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative mt-6 flex gap-2">
              <Button
                onClick={save}
                className="flex-1 bg-white text-[#10164F] hover:bg-[#EAEDFF]"
                disabled={squad.length === 0}
              >
                <Save className="h-4 w-4" /> {saved ? "Saved" : "Save XI"}
              </Button>
              <Button
                onClick={clear}
                variant="outline"
                size="icon"
                aria-label="Clear"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#10164F]"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {squad.length === 11 && (
              <p className="relative mt-3 flex items-center justify-center gap-2 text-sm text-white">
                <Trophy className="h-4 w-4 text-[#304FFE]" /> Full XI ready — good luck!
              </p>
            )}
          </div>

          {/* Pool */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-[#10164F]">
                <Sparkles className="h-5 w-5 text-[#304FFE]" /> Player Pool
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["All", "GK", "DEF", "MID", "FWD"] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setFilter(pos)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                      filter === pos
                        ? "border-[#304FFE] bg-[#304FFE] text-white"
                        : "border-[#10164F]/15 bg-white text-[#10164F]/70 hover:border-[#304FFE]/40"
                    )}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {pool.map((player, i) => {
                const selected = !!squad.find((p) => p.id === player.id);
                const blocked =
                  !selected &&
                  (squad.length >= 11 ||
                    countByPos(player.position) >= maxFor(player.position) ||
                    spent + costOf(player) > BUDGET);
                return (
                  <div key={player.id} className="relative">
                    <div className="absolute left-3 top-3 z-10">
                      <Badge variant={selected ? "gold" : "muted"}>{costOf(player)} cr</Badge>
                    </div>
                    <div
                      className={cn(blocked && "pointer-events-none opacity-40", selected && "ring-2 ring-[#304FFE] rounded-2xl")}
                      onClick={() => !blocked && toggle(player)}
                    >
                      <PlayerCard player={player} index={i} selectable selected={selected} onSelect={toggle} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
