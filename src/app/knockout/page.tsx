"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { BracketTree } from "@/components/knockout/bracket-tree";
import { Badge } from "@/components/ui/badge";
import { knockoutMatches, flagUrl } from "@/lib/data";
import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROUNDS = [
  "Round of 32",
  "Round of 16",
  "Quarter-final",
  "Semi-final",
  "Third-place",
  "Final",
] as const;

export default function KnockoutPage() {
  return (
    <>
      <PageHeader
        label="Path to Glory"
        title="Knockout Bracket"
        description="Complete FIFA World Cup 2026 knockout path — Round of 32 through Spain’s Final win at MetLife Stadium."
      />

      <section className="container space-y-12 py-10">
        <BracketTree />

        <div>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="font-heading text-3xl tracking-wide text-[#10164F]">All knockout ties</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-[#304FFE]/40 to-transparent" />
          </div>

          {ROUNDS.map((round) => {
            const roundMatches = knockoutMatches.filter((m) => m.stage.includes(round));
            if (roundMatches.length === 0) return null;
            return (
              <div key={round} className="mb-10">
                <div className="mb-5 flex items-center gap-4">
                  <h3 className="font-heading text-2xl tracking-wide text-[#10164F]">{round}</h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#304FFE]/30 to-transparent" />
                  <Badge variant="default">{roundMatches.length || "TBD"}</Badge>
                </div>
                {roundMatches.length === 0 ? (
                  <div className="glass rounded-2xl p-8 text-center font-semibold text-[#10164F]/70">
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
        </div>

        <div className="pitch-panel relative overflow-hidden rounded-3xl border border-[#304FFE] p-8 md:p-12">
          <div className="spectrum-bar absolute inset-x-0 top-0 h-1" />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white">Champions · 19 July 2026</p>
          <h3 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
            Spain win the World Cup
          </h3>
          <p className="mt-3 max-w-xl text-base font-medium text-white/95">
            Spain 1–0 Argentina at MetLife Stadium — New York New Jersey. England take third with a 6–4 win over France.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/matches/m104"
              className="inline-flex text-sm font-black text-white underline-offset-4 hover:underline"
            >
              View Final →
            </Link>
            <Link
              href="/matches/m103"
              className="inline-flex text-sm font-black text-white/85 underline-offset-4 hover:underline"
            >
              Third-place play-off →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function BracketCard({ match }: { match: Match }) {
  const done = match.status === "FINISHED";
  const homeWin = done && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWin = done && (match.awayScore ?? 0) > (match.homeScore ?? 0);
  // Penalty winners from note when scores tied
  const noteWinHome =
    done &&
    Boolean(match.note?.toLowerCase().startsWith(match.homeCountry.toLowerCase()));
  const noteWinAway =
    done &&
    Boolean(match.note?.toLowerCase().startsWith(match.awayCountry.toLowerCase()));

  return (
    <Link
      href={`/matches/${match.id}`}
      className={cn(
        "block rounded-2xl border-[3px] border-[#10164F]/20 bg-white p-5 shadow-[0_12px_32px_-16px_rgba(16,22,79,0.4)] transition-all hover:-translate-y-1 hover:border-[#304FFE] hover:shadow-[0_18px_40px_-14px_rgba(48,79,254,0.4)]",
        done && "border-[#304FFE]/35"
      )}
    >
      <div className="mb-4 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#10164F]">
        <span className="truncate">{match.stadium}</span>
        <Badge variant={done ? "pitch" : "muted"}>{done ? "FT" : match.status}</Badge>
      </div>
      <Side
        code={match.homeCode}
        country={match.homeCountry}
        score={match.homeScore}
        highlight={homeWin || noteWinHome}
      />
      <div className="my-2 text-center font-display text-sm font-black text-[#304FFE]">vs</div>
      <Side
        code={match.awayCode}
        country={match.awayCountry}
        score={match.awayScore}
        highlight={awayWin || noteWinAway}
      />
      {match.note && (
        <p className="mt-3 text-center text-xs font-black text-[#B71D1C]">{match.note}</p>
      )}
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
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5",
        highlight ? "bg-[#304FFE] text-white" : "bg-[#EAEDFF]"
      )}
    >
      {code === "tbd" ? (
        <div className="h-8 w-11 rounded-md bg-white/30" />
      ) : (
        <img
          src={flagUrl(code, "w80")}
          alt=""
          className="h-8 w-11 rounded-md object-cover ring-2 ring-white"
        />
      )}
      <span className={cn("flex-1 text-base font-black", highlight ? "text-white" : "text-[#10164F]")}>
        {country}
      </span>
      {score != null && (
        <span className={cn("font-display text-3xl leading-none", highlight ? "text-white" : "text-[#10164F]")}>
          {score}
        </span>
      )}
    </div>
  );
}
