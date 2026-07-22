"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { knockoutMatches, flagUrl } from "@/lib/data";
import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROUNDS = ["Round of 32", "Round of 16", "Quarter-final", "Semi-final", "Final"] as const;

export default function KnockoutPage() {
  return (
    <>
      <PageHeader
        label="Path to Glory"
        title="Knockout Bracket"
        description="Real FIFA World Cup 2026 knockout ties — Round of 32 through the Final at MetLife Stadium."
      />

      <section className="container space-y-12 py-10">
        {ROUNDS.map((round) => {
          const roundMatches = knockoutMatches.filter((m) => m.stage.includes(round));
          if (roundMatches.length === 0 && round !== "Final" && round !== "Semi-final") return null;
          return (
            <div key={round}>
              <div className="mb-5 flex items-center gap-4">
                <h2 className="font-heading text-3xl tracking-wide text-foreground">{round}</h2>
                <span className="h-px flex-1 bg-gradient-to-r from-electric/40 to-transparent" />
                <Badge variant="default">{roundMatches.length || "TBD"}</Badge>
              </div>
              {roundMatches.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center text-white/50">
                  Awaiting confirmed fixtures for this round.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {roundMatches.map((m) => (
                    <BracketCard key={m.id} match={m} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="pitch-panel relative overflow-hidden rounded-3xl border border-pitch/30 p-8 md:p-12">
          <div className="spectrum-bar absolute inset-x-0 top-0 h-1" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pitch">The Final</p>
          <h3 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
            New York New Jersey Stadium
          </h3>
          <p className="mt-3 max-w-xl text-white/60">
            MetLife Stadium · East Rutherford · 19 July 2026 — confirmed by FIFA as the showpiece venue of the biggest World Cup in history.
          </p>
          <Link href="/matches/m104" className="mt-6 inline-flex text-sm font-semibold text-electric hover:underline">
            View final fixture →
          </Link>
        </div>
      </section>
    </>
  );
}

function BracketCard({ match }: { match: Match }) {
  const done = match.status === "FINISHED";
  return (
    <Link
      href={`/matches/${match.id}`}
      className={cn(
        "glass block rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-neon",
        done && "border-pitch/20"
      )}
    >
      <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
        <span>{match.stadium}</span>
        <Badge variant={done ? "pitch" : "muted"}>{done ? "FT" : match.status}</Badge>
      </div>
      <Side code={match.homeCode} country={match.homeCountry} score={match.homeScore} highlight={done && (match.homeScore ?? 0) > (match.awayScore ?? 0)} />
      <div className="my-2 text-center font-display text-sm text-white/25">vs</div>
      <Side code={match.awayCode} country={match.awayCountry} score={match.awayScore} highlight={done && (match.awayScore ?? 0) > (match.homeScore ?? 0)} />
      {match.note && <p className="mt-3 text-center text-[11px] text-gold/80">{match.note}</p>}
    </Link>
  );
}

function Side({
  code,
  country,
  score,
  highlight,
}: {
  code: string;
  country: string;
  score?: number;
  highlight?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl px-2 py-2", highlight && "bg-pitch/10")}>
      {code === "tbd" ? (
        <div className="h-6 w-9 rounded bg-white/10" />
      ) : (
        <img src={flagUrl(code, "w40")} alt="" className="h-6 w-9 rounded object-cover" />
      )}
      <span className={cn("flex-1 font-medium", highlight ? "text-pitch" : "text-white")}>{country}</span>
      {score != null && <span className="font-display text-2xl text-white">{score}</span>}
    </div>
  );
}
