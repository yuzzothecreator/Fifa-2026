import Link from "next/link";
import { ArrowRight, Radio, Sparkles, Bell, Trophy, Users } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { LiveScoreTicker } from "@/components/home/live-score-ticker";
import { HostNations } from "@/components/home/host-nations";
import { GoldenBootBoard } from "@/components/home/golden-boot-board";
import { GoldenGloveBoard } from "@/components/home/golden-glove-board";
import { TotalGoalsChart } from "@/components/home/total-goals-chart";
import { CountdownTimer } from "@/components/home/countdown-timer";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { StatsCard } from "@/components/cards/stats-card";
import { MatchCard } from "@/components/cards/match-card";
import { ResultPill } from "@/components/cards/result-pill";
import { TeamCard } from "@/components/cards/team-card";
import { StadiumCard } from "@/components/cards/stadium-card";
import { NewsCard } from "@/components/cards/news-card";
import { PlayerCard } from "@/components/cards/player-card";
import { Button } from "@/components/ui/button";
import { BrandMarquee, SectionBand } from "@/components/brand/section-band";
import {
  matches,
  teams,
  stadiums,
  news,
  tournamentStats,
  players,
  getGroupStandings,
  flagUrl,
} from "@/lib/data";

export default function HomePage() {
  const liveOrNext = [
    ...matches.filter((m) => m.status === "LIVE"),
    ...matches.filter((m) => m.status === "SCHEDULED"),
    ...matches.filter((m) => m.status === "FINISHED").reverse(),
  ].slice(0, 3);
  const recentResults = matches.filter((m) => m.status === "FINISHED").slice(-12);
  const topTeams = [...teams].sort((a, b) => a.ranking - b.ranking).slice(0, 4);
  const featuredStadiums = stadiums.slice(0, 3);
  const featuredNews = news.find((n) => n.featured) ?? news[0];
  const restNews = news.filter((n) => n.id !== featuredNews.id).slice(0, 2);
  const fantasyStars = [...players].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const groupA = getGroupStandings("A");

  return (
    <>
      <Hero />

      <BrandMarquee
        tone="navy"
        items={["HOME OF THE FIFA WORLD CUP 26™", "#WEARE26", "#FIFAWORLDCUP", "#SOMOS26"]}
      />

      <LiveScoreTicker />

      {/* soft intro + stats */}
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

      {/* navy countdown — always filled */}
      <SectionBand tone="navy" className="chapter-pad overflow-visible text-center">
        <div className="container space-y-8 sm:space-y-10">
          <SectionHeading
            light
            align="center"
            className="max-w-4xl"
            label="Tournament clock"
            title="Until FIFA World Cup 26™ kickoff"
            description="Mark the date — the world’s greatest football show opens across USA, Canada and Mexico."
          />
          <div className="overflow-visible px-1">
            <CountdownTimer large />
          </div>
          <div className="flex flex-wrap justify-center gap-3 pb-2">
            <Button asChild className="bg-white text-[#10164F] hover:bg-[#EAEDFF]">
              <Link href="/fixtures">Browse fixtures</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#10164F]"
            >
              <Link href="/groups">View groups</Link>
            </Button>
          </div>
        </div>
      </SectionBand>

      {/* white matches + results wall */}
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
          {recentResults.length > 0 && (
            <div className="mt-12 rounded-3xl bg-[#EAEDFF] p-6 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-heading text-2xl tracking-wide text-[#10164F]">Results wall</h3>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/fixtures">Full results →</Link>
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

      {/* soft goals chart */}
      <SectionBand tone="soft" className="chapter-pad overflow-visible">
        <div className="container">
          <div className="mb-10">
            <SectionHeading
              label="History"
              title="Total goals scored"
              description="Every FIFA World Cup™ edition — 1930 to 2026."
            />
          </div>
          <TotalGoalsChart />
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

      {/* group snapshot — never an empty band */}
      <SectionBand tone="soft" className="chapter-pad">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              label="Groups"
              title="Group A snapshot"
              description="Live table from finished group-stage matches — open the full groups hub for every pool."
            />
            <Button asChild className="mt-8">
              <Link href="/groups">
                All 12 groups <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#10164F]/10 bg-white lg:col-span-7">
            <div className="grid grid-cols-[auto_1fr_repeat(4,minmax(0,2.5rem))] gap-2 border-b border-[#10164F]/10 bg-[#EAEDFF] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#10164F]/55 sm:px-6">
              <span>#</span>
              <span>Team</span>
              <span className="text-center">P</span>
              <span className="text-center">GD</span>
              <span className="text-center">Pts</span>
              <span className="text-center">GF</span>
            </div>
            <ul>
              {groupA.map((row, i) => (
                <li
                  key={row.code}
                  className="grid grid-cols-[auto_1fr_repeat(4,minmax(0,2.5rem))] items-center gap-2 border-b border-[#10164F]/08 px-4 py-3 last:border-0 sm:px-6"
                >
                  <span className="w-5 font-display text-lg text-[#10164F]/35">{i + 1}</span>
                  <Link href={`/teams/${row.code}`} className="flex min-w-0 items-center gap-2.5">
                    <img
                      src={flagUrl(row.code, "w40")}
                      alt=""
                      className="h-4 w-6 rounded-sm object-cover ring-1 ring-[#10164F]/10"
                    />
                    <span className="truncate font-heading text-lg tracking-wide text-[#10164F]">
                      {row.country}
                    </span>
                  </Link>
                  <span className="text-center text-sm text-[#10164F]/70">{row.played}</span>
                  <span className="text-center text-sm text-[#10164F]/70">{row.gd}</span>
                  <span className="text-center font-display text-xl text-[#304FFE]">{row.points}</span>
                  <span className="text-center text-sm text-[#10164F]/70">{row.gf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionBand>

      {/* fantasy — players + CTA so the band isn’t empty */}
      <SectionBand tone="blue" waves className="chapter-pad">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/70">Fantasy</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9] tracking-tight text-white">
              Build your Fantasy XI
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-white/75">
              Craft an 11-player squad with real WC 2026 form — Messi, Mbappé, Haaland and more.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fantasyStars.map((p, i) => (
              <PlayerCard key={p.id} player={p} index={i} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="bg-white text-[#10164F] hover:bg-[#EAEDFF]">
              <Link href="/fantasy">
                <Sparkles className="h-4 w-4" /> Open Fantasy
              </Link>
            </Button>
          </div>
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

      {/* navy CTA with feature tiles */}
      <SectionBand tone="navy" className="chapter-pad">
        <div className="container text-center">
          <Radio className="mx-auto h-8 w-8 text-[#B71D1C]" />
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-white">
            Never miss a World Cup moment
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/70">
            Favourite teams, set reminders, climb the fan leaderboard and build your Fantasy XI.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              { icon: Bell, title: "Match reminders", body: "Get nudged before kickoff for every fixture you care about." },
              { icon: Trophy, title: "Fan leaderboard", body: "Climb the ranks with predictions and Fantasy points." },
              { icon: Users, title: "Favourite teams", body: "Pin your nations and follow their path to the final." },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/15 bg-white/10 px-5 py-6 text-left backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-[#304FFE]" />
                <h3 className="mt-4 font-heading text-xl tracking-wide text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{body}</p>
              </div>
            ))}
          </div>
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
