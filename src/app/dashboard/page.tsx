import type { Metadata } from "next";
import Link from "next/link";
import { Radio, TrendingUp, ArrowRight, Footprints } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/cards/stats-card";
import { MatchCard } from "@/components/cards/match-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { matches, teams, tournamentStats, flagUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tournament Dashboard",
  description: "Live scores, statistics and team rankings for FIFA World Cup 2026.",
};

export default function DashboardPage() {
  const live = matches.filter((m) => m.status === "LIVE");
  const upcoming = matches.filter((m) => m.status === "SCHEDULED").slice(0, 4);
  const ranked = [...teams].sort((a, b) => a.ranking - b.ranking).slice(0, 8);

  return (
    <>
      <PageHeader
        label="Command Center"
        title="Tournament Dashboard"
        description="Everything happening at World Cup 2026 — live, in one place."
      />

      <section className="container py-10">
        {/* Stat overview */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard icon="goals" label="Goals Scored" value={tournamentStats.goalsScored} accent="pitch" />
          <StatsCard icon="teams" label="Teams Qualified" value={tournamentStats.teamsQualified} accent="electric" />
          <StatsCard icon="stadiums" label="Stadiums" value={tournamentStats.stadiums} accent="gold" />
          <StatsCard icon="trophy" label="Matches Played" value={tournamentStats.matchesPlayed} suffix={`/${tournamentStats.totalMatches}`} accent="electric" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            {/* Live */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Badge variant="live"><Radio className="h-3 w-3 animate-pulse" /> Live Now</Badge>
                <span className="h-px flex-1 bg-gradient-to-r from-red-500/40 to-transparent" />
              </div>
              {live.length ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {live.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
                </div>
              ) : (
                <div className="glass rounded-2xl p-8 text-center text-white/50">No live matches right now.</div>
              )}
            </div>

            {/* Upcoming */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-2xl tracking-wide text-foreground">Upcoming Fixtures</h2>
                <Button asChild variant="ghost" size="sm"><Link href="/fixtures">View all <ArrowRight className="h-4 w-4" /></Link></Button>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {upcoming.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
              </div>
            </div>
          </div>

          {/* Rankings + top scorer */}
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
                <TrendingUp className="h-5 w-5 text-electric" /> FIFA Rankings
              </h3>
              <ul className="mt-4 space-y-1">
                {ranked.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5">
                    <span className="w-6 font-display text-xl text-white/30">{t.ranking}</span>
                    <img src={flagUrl(t.code, "w40")} alt="" className="h-5 w-7 rounded-sm object-cover" />
                    <span className="flex-1 font-medium text-white">{t.country}</span>
                    <span className="text-xs uppercase tracking-wider text-white/40">{t.continent}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass relative overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/20 blur-2xl" />
              <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
                <Footprints className="h-5 w-5 text-gold" /> Golden Boot Race
              </h3>
              <div className="mt-4 flex items-center gap-4">
                <p className="font-display text-4xl gold-text">{tournamentStats.topScorer.goals}</p>
                <div>
                  <p className="font-heading text-xl tracking-wide text-white">{tournamentStats.topScorer.name}</p>
                  <p className="text-sm text-white/50">Goals at WC 2026 (tied)</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
