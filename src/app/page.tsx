import Link from "next/link";
import { ArrowRight, Radio, BrainCircuit, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { StatsCard } from "@/components/cards/stats-card";
import { MatchCard } from "@/components/cards/match-card";
import { TeamCard } from "@/components/cards/team-card";
import { StadiumCard } from "@/components/cards/stadium-card";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { matches, teams, stadiums, news, tournamentStats } from "@/lib/data";

export default function HomePage() {
  const liveOrNext = matches.filter((m) => m.status !== "SCHEDULED").concat(matches.filter((m) => m.status === "SCHEDULED")).slice(0, 3);
  const topTeams = [...teams].sort((a, b) => a.ranking - b.ranking).slice(0, 4);
  const featuredStadiums = stadiums.slice(0, 3);
  const featuredNews = news.find((n) => n.featured) ?? news[0];
  const restNews = news.filter((n) => n.id !== featuredNews.id).slice(0, 2);

  return (
    <>
      <Hero />

      {/* STATS */}
      <section className="container relative -mt-10 pb-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard icon="goals" label="Goals Scored" value={tournamentStats.goalsScored} accent="pitch" />
          <StatsCard icon="teams" label="Teams Qualified" value={tournamentStats.teamsQualified} accent="electric" />
          <StatsCard icon="stadiums" label="Stadiums" value={tournamentStats.stadiums} accent="gold" />
          <StatsCard icon="trophy" label="Total Matches" value={tournamentStats.totalMatches} accent="electric" />
        </div>
      </section>

      {/* LIVE + FIXTURES */}
      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="Match Center" title="Live & Upcoming" description="Follow every kickoff in real time across all 16 host cities." />
          <Button asChild variant="outline">
            <Link href="/fixtures">All Fixtures <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {liveOrNext.map((m, i) => (
            <MatchCard key={m.id} match={m} index={i} />
          ))}
        </div>
      </section>

      {/* TOP TEAMS */}
      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="Contenders" title="Top Ranked Nations" description="The favourites chasing football's ultimate prize." />
          <Button asChild variant="outline">
            <Link href="/teams">All Teams <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topTeams.map((t, i) => (
            <TeamCard key={t.id} team={t} index={i} />
          ))}
        </div>
      </section>

      {/* AI PREDICTION */}
      <section className="container py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-pitch/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="default"><BrainCircuit className="h-3.5 w-3.5" /> AI Match Predictor</Badge>
                <h3 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">
                  Who wins the <span className="brand-gradient-text">final?</span>
                </h3>
                <p className="mt-4 max-w-md text-white/60">
                  Our prediction engine crunches FIFA rankings, form and head-to-head history to
                  forecast every fixture. Test your instincts against the machine.
                </p>
                <Button asChild className="mt-6" variant="pitch">
                  <Link href="/fan-zone"><Sparkles className="h-4 w-4" /> Make a Prediction</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { m: "Brazil vs France", a: 46, b: 31 },
                  { m: "Argentina vs Germany", a: 52, b: 27 },
                  { m: "Spain vs Morocco", a: 61, b: 18 },
                ].map((p) => (
                  <div key={p.m} className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-white">
                      <span>{p.m}</span>
                      <span className="text-electric">{p.a}% – {p.b}%</span>
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

      {/* STADIUMS */}
      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="Venues" title="Iconic Stadiums" description="16 world-class arenas across North America." />
          <Button asChild variant="outline">
            <Link href="/stadiums">All Stadiums <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredStadiums.map((s, i) => (
            <StadiumCard key={s.id} stadium={s} index={i} />
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="Latest" title="Newsroom" description="Breaking stories, analysis and features from the tournament." />
          <Button asChild variant="outline">
            <Link href="/news">All News <ArrowRight className="h-4 w-4" /></Link>
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

      {/* CTA */}
      <section className="container py-16">
        <Reveal>
          <div className="force-dark relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy via-navy to-midnight p-10 text-center md:p-16">
            <div className="stadium-lights pointer-events-none absolute inset-0 opacity-60" />
            <Radio className="mx-auto h-8 w-8 text-electric" />
            <h3 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-none tracking-tight text-white md:text-6xl">
              Join millions of fans worldwide
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Create your free account to favourite teams, set match reminders, make predictions and
              climb the global fan leaderboard.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg"><Link href="/login">Create Account</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/fan-zone">Enter Fan Zone</Link></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
