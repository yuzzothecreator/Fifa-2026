"use client";

import * as React from "react";
import { Search, GitCompareArrows, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { PlayerCard } from "@/components/cards/player-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { players, flagUrl, playerPhotoFallback } from "@/lib/data";
import type { Player } from "@/lib/types";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";

const positions = ["All", "GK", "DEF", "MID", "FWD"] as const;

export default function PlayersPage() {
  const [query, setQuery] = React.useState("");
  const [pos, setPos] = React.useState<(typeof positions)[number]>("All");
  const [compareMode, setCompareMode] = React.useState(false);
  const [picked, setPicked] = React.useState<Player[]>([]);

  const filtered = players
    .filter((p) => (pos === "All" ? true : p.position === pos))
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.club.toLowerCase().includes(query.toLowerCase()));

  const toggle = (p: Player) => {
    setPicked((prev) => {
      if (prev.find((x) => x.id === p.id)) return prev.filter((x) => x.id !== p.id);
      if (prev.length >= 2) return [prev[1], p];
      return [...prev, p];
    });
  };

  return (
    <>
      <PageHeader
        label="The Stars"
        title="Players"
        description="Real international caps, career goals, World Cup tallies and 2026 tournament form. Compare stars head-to-head."
      />

      <section className="container py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search players or clubs..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-11" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {positions.map((p) => (
              <button
                key={p}
                onClick={() => setPos(p)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  pos === p ? "border-electric bg-electric/15 text-electric" : "border-border bg-foreground/5 text-foreground/70 hover:text-foreground"
                )}
              >
                {p}
              </button>
            ))}
            <Button
              variant={compareMode ? "gold" : "outline"}
              size="sm"
              onClick={() => {
                setCompareMode((c) => !c);
                setPicked([]);
              }}
            >
              <GitCompareArrows className="h-4 w-4" /> Compare
            </Button>
          </div>
        </div>

        {compareMode && (
          <p className="mt-4 text-sm text-gold">Compare mode on — tap two players to compare their stats.</p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <PlayerCard
              key={p.id}
              player={p}
              index={i}
              selectable={compareMode}
              selected={!!picked.find((x) => x.id === p.id)}
              onSelect={toggle}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {compareMode && picked.length === 2 && (
          <ComparePanel a={picked[0]} b={picked[1]} onClose={() => setPicked([])} />
        )}
      </AnimatePresence>
    </>
  );
}

function ComparePanel({ a, b, onClose }: { a: Player; b: Player; onClose: () => void }) {
  const rows: { label: string; key: keyof Player }[] = [
    { label: "Int'l Goals", key: "goals" },
    { label: "Caps", key: "appearances" },
    { label: "WC Career", key: "worldCupGoals" },
    { label: "WC 2026", key: "tournamentGoals" },
    { label: "Rating", key: "rating" },
  ];
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-24 md:pb-6"
    >
      <div className="glass-strong container relative mx-auto max-w-3xl rounded-3xl p-6 shadow-neon">
        <button onClick={onClose} className="absolute right-4 top-4 text-white/50 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <div className="grid grid-cols-3 items-center gap-4">
          <PlayerHead player={a} />
          <span className="text-center font-display text-3xl text-electric">VS</span>
          <PlayerHead player={b} align="right" />
        </div>
        <div className="mt-6 space-y-3">
          {rows.map((r) => {
            const av = a[r.key] as number;
            const bv = b[r.key] as number;
            const total = av + bv || 1;
            return (
              <div key={r.label}>
                <div className="mb-1 flex justify-between text-sm font-semibold text-white">
                  <span className={av >= bv ? "text-pitch" : ""}>{av}</span>
                  <span className="text-xs uppercase tracking-widest text-white/50">{r.label}</span>
                  <span className={bv >= av ? "text-electric" : ""}>{bv}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="bg-pitch" style={{ width: `${(av / total) * 100}%` }} />
                  <div className="ml-auto bg-electric" style={{ width: `${(bv / total) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function PlayerHead({ player, align = "left" }: { player: Player; align?: "left" | "right" }) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2 sm:gap-3", align === "right" && "flex-row-reverse text-right")}>
      <SafeImage
        src={player.photo}
        fallback={player.photoFallback ?? playerPhotoFallback}
        alt={player.name}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/20 sm:h-14 sm:w-14"
      />
      <div className="min-w-0">
        <p className="truncate font-heading text-base leading-none tracking-wide text-white sm:text-lg">{player.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
          <img src={flagUrl(player.code, "w40")} alt="" className="h-3 w-4 rounded-sm object-cover" />
          <span className="truncate">{player.country}</span>
        </p>
      </div>
    </div>
  );
}
