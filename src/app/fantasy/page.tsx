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

  return (
    <>
      <PageHeader
        label="Fantasy Football"
        title="Build Your XI"
        description="Pick an 11-player squad within a 100-credit budget using real 2026 World Cup form. Formation: 1–3–3–4."
      />

      <section className="container py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Squad", value: `${squad.length}/11` },
            { label: "Budget left", value: remaining.toFixed(0) },
            { label: "Spent", value: spent.toFixed(0) },
            { label: "Projected pts", value: projected.toFixed(0) },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <p className="font-display text-4xl text-white">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Pitch */}
          <div className="relative overflow-hidden rounded-3xl border border-pitch/30 bg-gradient-to-b from-[#0a3d24] to-[#062816] p-6">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(255,255,255,0.08)_28px,rgba(255,255,255,0.08)_30px)]" />
            <div className="relative space-y-6">
              {SLOTS.map((slot) => {
                const picked = squad.filter((p) => p.position === slot.key);
                return (
                  <div key={slot.key}>
                    <p className="mb-2 text-center text-[10px] uppercase tracking-[0.25em] text-white/50">
                      {slot.label} ({picked.length}/{slot.count})
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Array.from({ length: slot.count }).map((_, i) => {
                        const player = picked[i];
                        return (
                          <button
                            key={i}
                            onClick={() => player && toggle(player)}
                            className={cn(
                              "flex h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center transition-colors",
                              player
                                ? "border-gold/50 bg-black/40 text-white"
                                : "border-dashed border-white/20 bg-white/5 text-white/30"
                            )}
                          >
                            {player ? (
                              <>
                                <img src={flagUrl(player.code, "w40")} alt="" className="mb-1 h-3 w-5 rounded-sm object-cover" />
                                <span className="line-clamp-2 px-1 text-[10px] font-semibold leading-tight">{player.name.split(" ").slice(-1)}</span>
                                <span className="text-[9px] text-gold">{costOf(player)}</span>
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
              <Button onClick={save} variant="gold" className="flex-1" disabled={squad.length === 0}>
                <Save className="h-4 w-4" /> {saved ? "Saved" : "Save XI"}
              </Button>
              <Button onClick={clear} variant="outline" size="icon" aria-label="Clear">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {squad.length === 11 && (
              <p className="relative mt-3 flex items-center justify-center gap-2 text-sm text-pitch">
                <Trophy className="h-4 w-4" /> Full XI ready — good luck!
              </p>
            )}
          </div>

          {/* Pool */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-foreground">
                <Sparkles className="h-5 w-5 text-electric" /> Player Pool
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["All", "GK", "DEF", "MID", "FWD"] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setFilter(pos)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
                      filter === pos
                        ? "border-electric bg-electric/15 text-electric"
                        : "border-border bg-foreground/5 text-foreground/70"
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
                    <div className={cn(blocked && "opacity-40")} onClick={() => !blocked && toggle(player)}>
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
