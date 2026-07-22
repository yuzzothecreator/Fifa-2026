"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { TeamCard } from "@/components/cards/team-card";
import { Input } from "@/components/ui/input";
import { teams } from "@/lib/data";
import { cn } from "@/lib/utils";

const continents = ["All", "Europe", "South America", "North America", "Africa", "Asia", "Oceania"] as const;

export default function TeamsPage() {
  const [query, setQuery] = React.useState("");
  const [continent, setContinent] = React.useState<(typeof continents)[number]>("All");

  const filtered = teams
    .filter((t) => (continent === "All" ? true : t.continent === continent))
    .filter((t) => t.country.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <>
      <PageHeader
        label="48 Nations"
        title="The Teams"
        description="Explore every qualified nation, their squads, coaches and FIFA rankings on the road to glory."
      />

      <section className="container py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-11"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {continents.map((c) => (
              <button
                key={c}
                onClick={() => setContinent(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  continent === c
                    ? "border-electric bg-electric/15 text-electric"
                    : "border-border bg-foreground/5 text-foreground/70 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} teams</p>

        {filtered.length === 0 ? (
          <div className="glass mt-6 rounded-2xl p-12 text-center text-white/60">No teams match your search.</div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((t, i) => (
              <TeamCard key={t.id} team={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
