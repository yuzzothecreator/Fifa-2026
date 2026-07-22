import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Trophy, MapPin } from "lucide-react";
import {
  getTeamByCode,
  getTeamMatches,
  getPlayersByCountry,
  getGroupStandings,
  flagUrl,
  teams,
} from "@/lib/data";
import { MatchCard } from "@/components/cards/match-card";
import { PlayerCard } from "@/components/cards/player-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return teams.map((t) => ({ code: t.code }));
}

export function generateMetadata({ params }: { params: { code: string } }): Metadata {
  const team = getTeamByCode(params.code);
  return {
    title: team ? `${team.country} — World Cup 2026` : "Team",
    description: team
      ? `${team.country} at FIFA World Cup 2026. Coach ${team.coach}, Group ${team.group}, FIFA ranking #${team.ranking}.`
      : "Team profile",
  };
}

export default function TeamDetailPage({ params }: { params: { code: string } }) {
  const team = getTeamByCode(params.code);
  if (!team) notFound();

  const standings = getGroupStandings(team.group);
  const position = standings.findIndex((s) => s.code === team.code) + 1;
  const row = standings.find((s) => s.code === team.code);
  const fixtures = getTeamMatches(team.code);
  const squad = getPlayersByCountry(team.code);

  return (
    <div className="pb-16 pt-28">
      <section className="force-dark relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(60% 80% at 20% 0%, ${team.color}66, transparent 60%), linear-gradient(180deg,#020617,#071426)`,
          }}
        />
        <div className="stadium-lights pointer-events-none absolute inset-0 opacity-50" />
        <div className="container relative py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/teams"><ArrowLeft className="h-4 w-4" /> All teams</Link>
          </Button>
          <div className="flex flex-wrap items-end gap-6">
            <img
              src={flagUrl(team.code, "w320")}
              alt={`${team.country} flag`}
              className="h-24 w-36 rounded-2xl object-cover ring-2 ring-white/20 shadow-neon"
            />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">Group {team.group}</p>
              <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl">
                {team.country}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="gold"><Trophy className="h-3 w-3" /> FIFA #{team.ranking}</Badge>
                <Badge variant="muted">{team.continent}</Badge>
                {(team.titles ?? 0) > 0 && <Badge variant="pitch">{team.titles}× World Champions</Badge>}
                {position > 0 && <Badge variant="default">Group pos. #{position}</Badge>}
              </div>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-white/45">Head Coach</p>
              <p className="mt-1 font-heading text-2xl tracking-wide text-white">{team.coach}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {row && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { l: "Played", v: row.played },
                { l: "Points", v: row.points },
                { l: "GD", v: row.gd > 0 ? `+${row.gd}` : row.gd },
                { l: "GF–GA", v: `${row.gf}–${row.ga}` },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4 text-center">
                  <p className="font-display text-3xl text-white">{s.v}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/45">{s.l}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            <h2 className="font-heading text-2xl tracking-wide text-foreground">Fixtures & results</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {fixtures.map((m, i) => (
                <Link key={m.id} href={`/matches/${m.id}`} className="block">
                  <MatchCard match={m} index={i} />
                </Link>
              ))}
              {fixtures.length === 0 && (
                <div className="glass rounded-2xl p-8 text-white/50">No fixtures loaded for this side yet.</div>
              )}
            </div>
          </div>

          {squad.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl tracking-wide text-foreground">Key players</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {squad.map((p, i) => (
                  <PlayerCard key={p.id} player={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-heading text-xl tracking-wide text-white">Squad preview</h3>
            <ul className="mt-4 space-y-2">
              {team.squadPreview.map((name) => (
                <li key={name} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/80">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="flex items-center gap-2 font-heading text-xl tracking-wide text-white">
              <MapPin className="h-4 w-4 text-electric" /> Group {team.group} table
            </h3>
            <ol className="mt-4 space-y-2">
              {standings.map((s, i) => (
                <li
                  key={s.code}
                  className={`flex items-center gap-2 rounded-xl px-2 py-2 text-sm ${
                    s.code === team.code ? "bg-electric/15 text-electric" : "text-white/70"
                  }`}
                >
                  <span className="w-5 text-white/30">{i + 1}</span>
                  <img src={flagUrl(s.code, "w40")} alt="" className="h-3.5 w-5 rounded-sm object-cover" />
                  <span className="flex-1 truncate">{s.country}</span>
                  <span className="font-semibold">{s.points}</span>
                </li>
              ))}
            </ol>
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <Link href="/groups">Full groups</Link>
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}
