import Link from "next/link";
import { ArrowRight, Radio, Sparkles } from "lucide-react";
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
import { TeamCard } from "@/components/cards/team-card";
import { StadiumCard } from "@/components/cards/stadium-card";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { BrandMarquee, SectionBand } from "@/components/brand/section-band";
import { CountdownTimer } from "@/components/home/countdown-timer";
import { matches, teams, stadiums, news, tournamentStats } from "@/lib/data";

export default function HomePage() {
  const liveOrNext = [
    ...matches.filter((m) => m.status === "LIVE"),
    ...matches.filter((m) => m.status === "SCHEDULED"),
    ...matches.filter((m) => m.status === "FINISHED").reverse(),
  ].slice(0, 3);
  const topTeams = [...teams].sort((a, b) => a.ranking - b.ranking).slice(0, 4);
  const featuredStadiums = stadiums.slice(0, 3);
  const featuredNews = news.find((n) => n.featured) ?? news[0];
  const restNews = news.filter((n) => n.id !== featuredNews.id).slice(0, 2);

  return (
    <>
      <Hero />

      {/* NYNJ schedule rhythm: navy → blue → soft */}
      <BrandMarquee text="HOME OF THE FIFA WORLD CUP 26™" tone="navy" />
      <BrandMarquee text="#WEARE26  #FIFAWORLDCUP  #SOMOS26" tone="blue" />

      <LiveScoreTicker />

      {/* soft lavender chapter — intro + live tournament stats */}
      <SectionBand tone="soft" className="chapter-pad">
        <div className="container space-y-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                label="And we are one"
                title="Welcome to the world’s greatest football show"
                description="From city skyline to shoreline, three nations host a tournament unlike any other — with world-famous icons, local gems, and an unbridled love for the game on the global stage."
              />
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button asChild>
                <Link href="/fixtures">View Match Schedule</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/stadiums">Explore Venues</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatsCard icon="goals" label="Goals Scored" value={tournamentStats.goalsScored} accent="pitch" />
            <StatsCard icon="teams" label="Teams Qualified" value={tournamentStats.teamsQualified} accent="electric" />
            <StatsCard icon="stadiums" label="Stadiums" value={tournamentStats.stadiums} accent="maple" />
            <StatsCard
              icon="trophy"
              label="Matches Listed"
              value={tournamentStats.matchesPlayed}
              suffix={`/${tournamentStats.totalMatches}`}
              accent="gold"
            />
          </div>
        </div>
      </SectionBand>

      <HostNations />

      {/* navy countdown */}
      <SectionBand tone="navy" className="chapter-pad text-center">
        <div className="container">
          <p className="mb-10 text-[11px] font-bold uppercase tracking-[0.4em] text-white/60">
            Until FIFA World Cup 26™ kickoff
          </p>
          <CountdownTimer large />
        </div>
      </SectionBand>

      {/* white matches */}
      <SectionBand tone="white" className="chapter-pad">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Match schedule"
              title="Latest results & next up"
              description="FIFA World Cup 2026 fixtures across host cities."
            />
            <Button asChild variant="outline">
              <Link href="/fixtures">
                Full schedule <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveOrNext.map((m, i) => (
              <Link key={m.id} href={`/matches/${m.id}`}>
                <MatchCard match={m} index={i} />
              </Link>
            ))}
          </div>
        </div>
      </SectionBand>

      {/* blue goals */}
      <SectionBand tone="blue" className="chapter-pad">
        <div className="container">
          <div className="mb-12">
            <SectionHeading
              light
              label="History"
              title="Total goals scored"
              description="Every FIFA World Cup™ edition — 1930 to 2026."
            />
          </div>
          <Reveal>
            <TotalGoalsChart />
          </Reveal>
        </div>
      </SectionBand>

      {/* soft awards */}
      <SectionBand tone="soft" className="chapter-pad">
        <div className="container space-y-20">
          <div>
            <div className="mb-12">
              <SectionHeading label="Awards" title="Golden Boot race" />
            </div>
            <GoldenBootBoard />
          </div>
          <div>
            <div className="mb-12">
              <SectionHeading label="Awards" title="Golden Glove winners" />
            </div>
            <Reveal>
              <GoldenGloveBoard />
            </Reveal>
          </div>
        </div>
      </SectionBand>

      {/* navy teams */}
      <SectionBand tone="navy" className="chapter-pad">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              light
              label="Contenders"
              title="Top ranked nations"
              description="FIFA ranking favourites chasing the ultimate prize."
            />
            <Button asChild className="bg-white text-[#10164F] hover:bg-[#EAEDFF]">
              <Link href="/teams">
                All 48 teams <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topTeams.map((t, i) => (
              <TeamCard key={t.id} team={t} index={i} />
            ))}
          </div>
        </div>
      </SectionBand>

      {/* blue fantasy */}
      <SectionBand tone="blue" waves className="chapter-pad">
        <div className="container text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/70">Fantasy</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9] tracking-tight text-white">
            Build your Fantasy XI
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/75">
            Craft an 11-player squad with real WC 2026 form — Messi, Mbappé, Haaland and more.
          </p>
          <Button asChild size="lg" className="mt-10 bg-white text-[#10164F] hover:bg-[#EAEDFF]">
            <Link href="/fantasy">
              <Sparkles className="h-4 w-4" /> Open Fantasy
            </Link>
          </Button>
        </div>
      </SectionBand>

      {/* soft stadiums */}
      <SectionBand tone="soft" className="chapter-pad">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Venues"
              title="Iconic stadiums"
              description="16 FIFA-confirmed arenas across North America."
            />
            <Button asChild variant="outline">
              <Link href="/stadiums">
                All stadiums <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStadiums.map((s, i) => (
              <StadiumCard key={s.id} stadium={s} index={i} />
            ))}
          </div>
        </div>
      </SectionBand>

      {/* white news */}
      <SectionBand tone="white" className="chapter-pad">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Latest"
              title="Newsroom"
              description="Stories and analysis from the tournament."
            />
            <Button asChild>
              <Link href="/news">
                All news <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6">
            <NewsCard article={featuredNews} featured />
            <div className="grid gap-6 md:grid-cols-2">
              {restNews.map((n, i) => (
                <NewsCard key={n.id} article={n} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionBand>

      {/* navy CTA */}
      <SectionBand tone="navy" className="chapter-pad text-center">
        <div className="container">
          <Radio className="mx-auto h-8 w-8 text-[#B71D1C]" />
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-white">
            Never miss a World Cup moment
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/70">
            Favourite teams, set reminders, climb the fan leaderboard and build your Fantasy XI.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[#304FFE] text-white hover:brightness-110">
              <Link href="/login">Create Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#10164F]"
            >
              <Link href="/fan-zone">Enter Fan Zone</Link>
            </Button>
          </div>
        </div>
      </SectionBand>
    </>
  );
}
