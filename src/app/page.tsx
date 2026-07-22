import Link from "next/link";
import { ArrowRight, Radio, BrainCircuit, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { LiveScoreTicker } from "@/components/home/live-score-ticker";
import { HostNations } from "@/components/home/host-nations";
import { GoldenBootBoard } from "@/components/home/golden-boot-board";
import { GoldenGloveBoard } from "@/components/home/golden-glove-board";
import { TotalGoalsChart } from "@/components/home/total-goals-chart";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { StatsCard } from "@/components/cards/stats-card";
import { MatchCard } from "@/components/cards/match-card";
import { ResultPill } from "@/components/cards/result-pill";
import { TeamCard } from "@/components/cards/team-card";
import { StadiumCard } from "@/components/cards/stadium-card";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { matches, teams, stadiums, news, tournamentStats, getGroupStandings, flagUrl } from "@/lib/data";

export default function HomePage() {
  const liveOrNext = [
    ...matches.filter((m) => m.status === "LIVE"),
    ...matches.filter((m) => m.status === "SCHEDULED"),
    ...matches.filter((m) => m.status === "FINISHED").reverse(),
  ].slice(0, 3);
  const recentResults = matches.filter((m) => m.status === "FINISHED").slice(-15);
  const topTeams = [...teams].sort((a, b) => a.ranking - b.ranking).slice(0, 4);
  const featuredStadiums = stadiums.slice(0, 3);
  const featuredNews = news.find((n) => n.featured) ?? news[0];
  const restNews = news.filter((n) => n.id !== featuredNews.id).slice(0, 2);
  const groupA = getGroupStandings("A");

  return (
    <>
      <Hero />
      <LiveScoreTicker />
      <HostNations />

      <section className="container relative pb-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard icon="goals" label="Goals Scored" value={tournamentStats.goalsScored} accent="pitch" />
          <StatsCard icon="teams" label="Teams Qualified" value={tournamentStats.teamsQualified} accent="electric" />
          <StatsCard icon="stadiums" label="Stadiums" value={tournamentStats.stadiums} accent="gold" />
          <StatsCard icon="trophy" label="Matches Listed" value={tournamentStats.matchesPlayed} suffix={`/${tournamentStats.totalMatches}`} accent="electric" />
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            label="Match Centre"
            title="Latest Results & Next Up"
            description="Real FIFA World Cup 2026 fixtures across all 16 host cities."
          />
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/knockout">Knockout <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/fixtures">All Fixtures <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {liveOrNext.map((m, i) => (
            <Link key={m.id} href={`/matches/${m.id}`}>
              <MatchCard match={m} index={i} />
            </Link>
          ))}
        </div>

        {recentResults.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-heading text-xl tracking-wide text-white">Results wall</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/fixtures?view=results">Full results →</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentResults.map((m) => (
                <ResultPill key={m.id} match={m} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="container py-10">
        <Reveal>
          <TotalGoalsChart />
        </Reveal>
      </section>

      <section className="container grid gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h3 className="font-heading text-2xl tracking-wide text-white">Group A snapshot</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/groups">All groups</Link>
              </Button>
            </div>
            <div className="divide-y divide-white/5">
              {groupA.map((row, i) => (
                <Link
                  key={row.code}
                  href={`/teams/${row.code}`}
                  className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-white/5"
                >
                  <span className="w-6 font-display text-xl text-white/30">{i + 1}</span>
                  <img src={flagUrl(row.code, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
                  <span className="flex-1 font-medium text-white">{row.country}</span>
                  <span className="text-xs text-white/40">
                    {row.gf}:{row.ga}
                  </span>
                  <span className="font-display text-xl text-electric">{row.points}</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
        <GoldenBootBoard />
      </section>

      <section className="container py-16">
        <Reveal>
          <GoldenGloveBoard />
        </Reveal>
      </section>

      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            label="Contenders"
            title="Top Ranked Nations"
            description="FIFA ranking favourites chasing the ultimate prize."
          />
          <Button asChild variant="outline">
            <Link href="/teams">
              All 48 Teams <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topTeams.map((t, i) => (
            <TeamCard key={t.id} team={t} index={i} />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-pitch/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="default">
                  <BrainCircuit className="h-3.5 w-3.5" /> AI Match Predictor
                </Badge>
                <h3 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">
                  Build your <span className="spectrum-text">Fantasy XI</span>
                </h3>
                <p className="mt-4 max-w-md text-white/60">
                  Use real WC 2026 form — Messi, Mbappé, Haaland and more — to craft an 11-player squad within budget.
                </p>
                <Button asChild className="mt-6" variant="pitch">
                  <Link href="/fantasy">
                    <Sparkles className="h-4 w-4" /> Open Fantasy
                  </Link>
                </Button>
                <Button asChild className="mt-6 ml-3" variant="outline">
                  <Link href="/fan-zone">Fan Zone</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { m: "France vs Morocco", a: 58, b: 24 },
                  { m: "Brazil vs Norway", a: 55, b: 28 },
                  { m: "Argentina vs Egypt", a: 72, b: 14 },
                ].map((p) => (
                  <div key={p.m} className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-white">
                      <span>{p.m}</span>
                      <span className="text-electric">
                        {p.a}% – {p.b}%
                      </span>
                    </div>
                    <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="bg-electric" style={{ width: `${p.a}%` }} />
                      <div className="ml-auto bg-pitch" style={{ width: `${p.b}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            label="Venues"
            title="Iconic Stadiums"
            description="16 FIFA-confirmed arenas across North America."
          />
          <Button asChild variant="outline">
            <Link href="/stadiums">
              All Stadiums <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredStadiums.map((s, i) => (
            <StadiumCard key={s.id} stadium={s} index={i} />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            label="Latest"
            title="Newsroom"
            description="Breaking stories and analysis from the tournament."
          />
          <Button asChild variant="outline">
            <Link href="/news">
              All News <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5">
          <NewsCard article={featuredNews} featured />
          <div className="grid gap-5 md:grid-cols-2">
            {restNews.map((n, i) => (
              <NewsCard key={n.id} article={n} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <Reveal>
          <div className="force-dark relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy via-navy to-midnight p-10 text-center md:p-16">
            <div className="stadium-lights pointer-events-none absolute inset-0 opacity-60" />
            <Radio className="mx-auto h-8 w-8 text-electric" />
            <h3 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-none tracking-tight text-white md:text-6xl">
              Never miss a World Cup moment
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Favourite teams, set reminders, climb the fan leaderboard and build your Fantasy XI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">Create Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/fan-zone">Enter Fan Zone</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
