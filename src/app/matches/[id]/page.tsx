import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { getMatchById, matches, flagUrl, getStadiumByName, getTeamByCode } from "@/lib/data";
import { formatMatchDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/shared/safe-image";
import { STADIUM_FALLBACK } from "@/lib/data";

export function generateStaticParams() {
  return matches.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const match = getMatchById(params.id);
  return {
    title: match ? `${match.homeCountry} vs ${match.awayCountry}` : "Match",
    description: match ? `${match.stage} · ${match.stadium}` : "Match centre",
  };
}

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const match = getMatchById(params.id);
  if (!match) notFound();

  const d = formatMatchDate(match.date);
  const stadium = getStadiumByName(match.stadium);
  const home = getTeamByCode(match.homeCode);
  const away = getTeamByCode(match.awayCode);
  const isDone = match.status === "FINISHED";
  const isLive = match.status === "LIVE";

  return (
    <div className="pb-16 pt-28">
      <section className="force-dark relative overflow-hidden">
        {stadium && (
          <div className="absolute inset-0">
            <SafeImage src={stadium.image} fallback={STADIUM_FALLBACK} alt="" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-navy/85 to-midnight" />
          </div>
        )}
        <div className="stadium-lights pointer-events-none absolute inset-0" />
        <div className="container relative py-12">
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href="/fixtures"><ArrowLeft className="h-4 w-4" /> Fixtures</Link>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="muted">{match.stage}</Badge>
            {match.group !== "—" && <Badge variant="default">Group {match.group}</Badge>}
            {isLive && <Badge variant="live">LIVE {match.minute}&apos;</Badge>}
            {isDone && <Badge variant="pitch">Full Time</Badge>}
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10">
            <TeamSide code={match.homeCode} country={match.homeCountry} href={home ? `/teams/${home.code}` : undefined} align="right" />
            <div className="text-center">
              {isDone || isLive ? (
                <p className="font-display text-6xl leading-none text-white md:text-8xl">
                  {match.homeScore}<span className="mx-2 text-white/30">:</span>{match.awayScore}
                </p>
              ) : (
                <p className="font-display text-5xl text-electric md:text-6xl">VS</p>
              )}
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">{d.time} · {d.full}</p>
            </div>
            <TeamSide code={match.awayCode} country={match.awayCountry} href={away ? `/teams/${away.code}` : undefined} align="left" />
          </div>

          {match.note && (
            <p className="mx-auto mt-8 max-w-xl rounded-2xl border border-gold/30 bg-gold/10 px-5 py-3 text-center text-sm text-gold">
              {match.note}
            </p>
          )}

          <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-electric" />
              {match.stadium}, {match.city}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-pitch" />
              {d.weekday} {d.day} {d.month} 2026
            </span>
          </div>

          {stadium && (
            <div className="mx-auto mt-8 max-w-md text-center">
              <Button asChild variant="outline">
                <Link href={`/stadiums/${stadium.id}`}>Stadium profile · Cap. {stadium.capacity.toLocaleString()}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TeamSide({
  code,
  country,
  href,
  align,
}: {
  code: string;
  country: string;
  href?: string;
  align: "left" | "right";
}) {
  const inner = (
    <div className={`flex flex-col items-center gap-3 ${align === "right" ? "md:items-end" : "md:items-start"}`}>
      {code === "tbd" ? (
        <div className="flex h-20 w-28 items-center justify-center rounded-xl bg-white/10 text-sm text-white/40">TBD</div>
      ) : (
        <img src={flagUrl(code, "w320")} alt={country} className="h-20 w-28 rounded-xl object-cover ring-2 ring-white/20" />
      )}
      <h2 className="font-heading text-2xl tracking-wide text-white md:text-4xl">{country}</h2>
    </div>
  );
  return href ? <Link href={href} className="transition-opacity hover:opacity-80">{inner}</Link> : inner;
}
