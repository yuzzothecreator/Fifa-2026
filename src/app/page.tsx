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
import { SectionBand, WC26 } from "@/components/brand/section-band";
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
      {/* BG: blue + green TL + red BR (banner) */}
      <Hero />
      <LiveScoreTicker />

      {/* BG: Mexico green · USA blue · Canada red */}
      <HostNations />

      {/* BG: blue */}
      <SectionBand tone="blue" className="py-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatsCard icon="goals" label="Goals Scored" value={tournamentStats.goalsScored} accent="pitch" />
            <StatsCard icon="teams" label="Teams Qualified" value={tournamentStats.teamsQualified} accent="electric" />
            <StatsCard icon="stadiums" label="Stadiums" value={tournamentStats.stadiums} accent="maple" />
            <StatsCard icon="trophy" label="Matches Listed" value={tournamentStats.matchesPlayed} suffix={`/${tournamentStats.totalMatches}`} accent="gold" />
          </div>
        </div>
      </SectionBand>

      {/* BG: blue */}
      <SectionBand tone="blue" className="pb-16 pt-6">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              label="Match Centre"
              title="Latest Results & Next Up"
              description="Real FIFA World Cup 2026 fixtures across all 16 host cities."
            />
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/15">
                <Link href="/knockout">Knockout <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild className="bg-white text-[#304FFD] hover:bg-white/90">
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
        </div>
      </SectionBand>

      {/* BG: blue */}
      <SectionBand tone="blue" className="py-10">
        <div className="container">
          <Reveal>
            <TotalGoalsChart />
          </Reveal>
        </div>
      </SectionBand>

      {/* BG: red */}
      <SectionBand tone="red" className="py-16">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div
              className="overflow-hidden rounded-3xl border-2 border-white/40"
              style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
                <h3 className="font-heading text-2xl tracking-wide text-white">Group A snapshot</h3>
                <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Link href="/groups">All groups</Link>
                </Button>
              </div>
              <div className="divide-y divide-white/15">
                {groupA.map((row, i) => (
                  <Link
                    key={row.code}
                    href={`/teams/${row.code}`}
                    className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-white/10"
                  >
                    <span className="w-6 font-display text-xl text-white/40">{i + 1}</span>
                    <img src={flagUrl(row.code, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
                    <span className="flex-1 font-medium text-white">{row.country}</span>
                    <span className="text-xs text-white/60">
                      {row.gf}:{row.ga}
                    </span>
                    <span className="font-display text-xl text-white">{row.points}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <GoldenBootBoard />
        </div>
      </SectionBand>

      {/* BG: green */}
      <SectionBand tone="green" className="py-16">
        <div className="container">
          <Reveal>
            <GoldenGloveBoard />
          </Reveal>
        </div>
      </SectionBand>

      {/* BG: green */}
      <SectionBand tone="green" className="py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              label="Contenders"
              title="Top Ranked Nations"
              description="FIFA ranking favourites chasing the ultimate prize."
            />
            <Button asChild className="bg-white text-[#00C853] hover:bg-white/90">
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
        </div>
      </SectionBand>

      {/* BG: white */}
      <SectionBand tone="white" className="py-16">
        <div className="container">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl border-2 p-8 md:p-12"
              style={{ borderColor: WC26.blue, backgroundColor: WC26.white }}
            >
              <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <Badge className="border-[#304FFD]/25 bg-[#304FFD]/10 text-[#304FFD]">
                    <BrainCircuit className="h-3.5 w-3.5" /> AI Match Predictor
                  </Badge>
                  <h3 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-[#304FFD] md:text-5xl">
                    Build your Fantasy XI
                  </h3>
                  <p className="mt-4 max-w-md text-[#304FFD]/70">
                    Use real WC 2026 form — Messi, Mbappé, Haaland and more — to craft an 11-player squad within budget.
                  </p>
                  <Button asChild className="mt-6 bg-[#304FFD] text-white hover:bg-[#304FFD]/90">
                    <Link href="/fantasy">
                      <Sparkles className="h-4 w-4" /> Open Fantasy
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-6 ml-3 border-[#304FFD] text-[#304FFD]">
                    <Link href="/fan-zone">Fan Zone</Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { m: "France vs Morocco", a: 58, b: 24 },
                    { m: "Brazil vs Norway", a: 55, b: 28 },
                    { m: "Argentina vs Egypt", a: 72, b: 14 },
                  ].map((p) => (
                    <div
                      key={p.m}
                      className="rounded-2xl border p-4"
                      style={{ borderColor: `${WC26.blue}26`, backgroundColor: `${WC26.blue}0D` }}
                    >
                      <div className="flex items-center justify-between text-sm font-semibold text-[#304FFD]">
                        <span>{p.m}</span>
                        <span>
                          {p.a}% – {p.b}%
                        </span>
                      </div>
                      <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-[#304FFD]/10">
                        <div style={{ width: `${p.a}%`, backgroundColor: WC26.blue }} />
                        <div className="ml-auto" style={{ width: `${p.b}%`, backgroundColor: WC26.red }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionBand>

      {/* BG: red */}
      <SectionBand tone="red" className="py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              label="Venues"
              title="Iconic Stadiums"
              description="16 FIFA-confirmed arenas across North America."
            />
            <Button asChild className="bg-white text-[#E31C3D] hover:bg-white/90">
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
        </div>
      </SectionBand>

      {/* BG: blue */}
      <SectionBand tone="blue" className="py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              label="Latest"
              title="Newsroom"
              description="Breaking stories and analysis from the tournament."
            />
            <Button asChild className="bg-white text-[#304FFD] hover:bg-white/90">
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
        </div>
      </SectionBand>

      {/* BG: banner waves */}
      <SectionBand tone="blue" waves className="py-16">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border-2 border-white/50 bg-black/10 p-10 text-center backdrop-blur-[2px] md:p-16">
              <Radio className="mx-auto h-8 w-8 text-white" />
              <h3 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-none tracking-tight text-white md:text-6xl">
                Never miss a World Cup moment
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Favourite teams, set reminders, climb the fan leaderboard and build your Fantasy XI.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-[#304FFD] hover:bg-white/90">
                  <Link href="/login">Create Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/15">
                  <Link href="/fan-zone">Enter Fan Zone</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionBand>
    </>
  );
}
