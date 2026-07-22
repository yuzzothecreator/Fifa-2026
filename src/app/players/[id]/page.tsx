import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Shirt } from "lucide-react";
import { getPlayerById, players, flagUrl, playerPhotoFallback, getTeamByCode } from "@/lib/data";
import { SafeImage } from "@/components/shared/safe-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return players.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const player = getPlayerById(params.id);
  return {
    title: player ? `${player.name} — Stats` : "Player",
    description: player?.bio,
  };
}

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  const player = getPlayerById(params.id);
  if (!player) notFound();
  const team = getTeamByCode(player.code);

  const stats = [
    { label: "International Caps", value: player.appearances },
    { label: "International Goals", value: player.goals },
    { label: "International Assists", value: player.assists },
    { label: "World Cup Goals (career)", value: player.worldCupGoals },
    { label: "WC 2026 Goals", value: player.tournamentGoals },
    { label: "Form Rating", value: player.rating },
  ];

  return (
    <div className="pb-16 pt-28">
      <section className="force-dark relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={player.photo}
            fallback={player.photoFallback ?? playerPhotoFallback}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-navy/90 to-midnight" />
        </div>
        <div className="container relative py-8 sm:py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link href="/players"><ArrowLeft className="h-4 w-4" /> All players</Link>
          </Button>
          <div className="grid items-end gap-6 sm:gap-8 lg:grid-cols-[280px_1fr]">
            <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl ring-1 ring-white/20 shadow-neon lg:mx-0 lg:max-w-none">
              <SafeImage
                src={player.photo}
                fallback={player.photoFallback ?? playerPhotoFallback}
                alt={player.name}
                className="aspect-[3/4] w-full object-cover object-top"
              />
              <span className="absolute right-4 top-4 font-display text-7xl text-white/25">{player.number}</span>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="pitch">{player.position}</Badge>
                <Badge variant="gold">WC26 · {player.tournamentGoals} goals</Badge>
                <Badge variant="muted">Age {player.age}</Badge>
              </div>
              <h1 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-7xl">
                {player.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-white/70">
                <img src={flagUrl(player.code, "w80")} alt="" className="h-6 w-9 rounded object-cover" />
                <span className="font-heading text-2xl tracking-wide text-white">{player.country}</span>
                <span className="text-white/30">·</span>
                <span className="flex items-center gap-1.5"><Shirt className="h-4 w-4 text-electric" /> {player.club}</span>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65">{player.bio}</p>
              {team && (
                <Button asChild variant="outline" className="mt-6">
                  <Link href={`/teams/${team.code}`}>View {team.country} squad</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-10">
        <h2 className="font-heading text-2xl tracking-wide text-foreground">Career & tournament statistics</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <p className="font-display text-4xl text-white">{s.value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-white/45">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
