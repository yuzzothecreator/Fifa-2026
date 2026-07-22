"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { MatchCard } from "@/components/cards/match-card";
import { matches, GROUP_LETTERS } from "@/lib/data";
import type { MatchStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusFilters: { key: "ALL" | MatchStatus; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "LIVE", label: "Live" },
  { key: "SCHEDULED", label: "Upcoming" },
  { key: "FINISHED", label: "Results" },
];

const stageFilters = ["All", "Group Stage", "Round of 32", "Round of 16", "Quarter-final", "Final"] as const;

export default function FixturesPage() {
  const [status, setStatus] = React.useState<"ALL" | MatchStatus>("ALL");
  const [stage, setStage] = React.useState<(typeof stageFilters)[number]>("All");
  const [group, setGroup] = React.useState<string>("All");

  const list = matches
    .filter((m) => (status === "ALL" ? true : m.status === status))
    .filter((m) => (stage === "All" ? true : m.stage.includes(stage)))
    .filter((m) => (group === "All" ? true : m.group === group))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dayGroups = list.reduce<Record<string, typeof matches>>((acc, m) => {
    const key = new Date(m.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    (acc[key] ??= []).push(m);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        label={`${matches.length} fixtures loaded · 104 total`}
        title="Fixtures & Results"
        description="Real FIFA World Cup 2026 results and schedule — opening match at Mexico City Stadium through the Final at MetLife."
      />

      <section className="container py-10">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatus(f.key)}
              className={cn(
                "rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                status === f.key
                  ? "border-electric bg-electric/15 text-electric"
                  : "border-border bg-foreground/5 text-foreground/70 hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {stageFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                stage === s
                  ? "border-pitch bg-pitch/15 text-pitch"
                  : "border-border bg-foreground/5 text-foreground/60 hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => setGroup("All")}
            className={cn(
              "rounded-lg border px-3 py-1 text-xs font-semibold",
              group === "All" ? "border-gold bg-gold/15 text-gold" : "border-border text-foreground/60"
            )}
          >
            All groups
          </button>
          {GROUP_LETTERS.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={cn(
                "h-8 w-8 rounded-lg border font-display text-sm",
                group === g ? "border-gold bg-gold/15 text-gold" : "border-border text-foreground/60"
              )}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-10">
          {Object.entries(dayGroups).map(([day, dayMatches]) => (
            <div key={day}>
              <div className="mb-4 flex items-center gap-4">
                <h2 className="font-heading text-2xl tracking-wide text-foreground">{day}</h2>
                <span className="h-px flex-1 bg-gradient-to-r from-electric/40 to-transparent" />
                <span className="text-sm text-muted-foreground">{dayMatches.length} matches</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {dayMatches.map((m, i) => (
                  <MatchCard key={m.id} match={m} index={i} />
                ))}
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="glass rounded-2xl p-12 text-center text-white/60">No matches in this view.</div>
          )}
        </div>
      </section>
    </>
  );
}
