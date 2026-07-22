"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { MatchCard } from "@/components/cards/match-card";
import { matches } from "@/lib/data";
import type { MatchStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: { key: "ALL" | MatchStatus; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "LIVE", label: "Live" },
  { key: "SCHEDULED", label: "Upcoming" },
  { key: "FINISHED", label: "Results" },
];

export default function FixturesPage() {
  const [filter, setFilter] = React.useState<"ALL" | MatchStatus>("ALL");

  const list = matches
    .filter((m) => (filter === "ALL" ? true : m.status === filter))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group by calendar day for the "calendar view"
  const groups = list.reduce<Record<string, typeof matches>>((acc, m) => {
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
        label="Match Schedule"
        title="Fixtures"
        description="104 matches. 16 cities. One month of football. Filter by status and never miss a kickoff."
      />

      <section className="container py-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                filter === f.key
                  ? "border-electric bg-electric/15 text-electric"
                  : "border-border bg-foreground/5 text-foreground/70 hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-10">
          {Object.entries(groups).map(([day, dayMatches]) => (
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
