import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Users, Calendar, MapPin } from "lucide-react";
import { getStadiumById, stadiums, matches, STADIUM_FALLBACK } from "@/lib/data";
import { SafeImage } from "@/components/shared/safe-image";
import { MatchCard } from "@/components/cards/match-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return stadiums.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = getStadiumById(params.id);
  return {
    title: s ? `${s.localName} — ${s.city}` : "Stadium",
    description: s ? `FIFA World Cup 2026 venue · capacity ${s.capacity.toLocaleString()}` : "Stadium",
  };
}

export default function StadiumDetailPage({ params }: { params: { id: string } }) {
  const stadium = getStadiumById(params.id);
  if (!stadium) notFound();

  const hosted = matches.filter((m) => m.stadium === stadium.name);

  return (
    <div className="pb-16 pt-28">
      <section className="force-dark relative min-h-[60vh] overflow-hidden">
        <SafeImage
          src={stadium.image}
          fallback={STADIUM_FALLBACK}
          alt={stadium.localName}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
        <div className="stadium-lights pointer-events-none absolute inset-0" />
        <div className="container relative flex h-full min-h-[60vh] flex-col justify-end py-12">
          <Button asChild variant="ghost" size="sm" className="mb-auto w-fit">
            <Link href="/stadiums"><ArrowLeft className="h-4 w-4" /> All stadiums</Link>
          </Button>
          <Badge variant="gold" className="mb-3 w-fit">{stadium.country}</Badge>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">{stadium.name}</p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl">
            {stadium.localName}
          </h1>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-electric" /> {stadium.city}</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-pitch" /> {stadium.capacity.toLocaleString()} seats</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> Opened {stadium.opened}</span>
          </div>
        </div>
      </section>

      <section className="container mt-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { l: "FIFA capacity", v: stadium.capacity.toLocaleString() },
            { l: "Opened", v: stadium.opened },
            { l: "WC matches", v: stadium.matchesHosted },
            { l: "Fixtures listed", v: hosted.length },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5 text-center">
              <p className="font-display text-3xl text-white">{s.v}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/45">{s.l}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-heading text-2xl tracking-wide text-foreground">Matches at this venue</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {hosted.map((m, i) => (
            <Link key={m.id} href={`/matches/${m.id}`}>
              <MatchCard match={m} index={i} />
            </Link>
          ))}
          {hosted.length === 0 && (
            <div className="glass col-span-full rounded-2xl p-10 text-center text-white/50">
              No fixtures currently assigned in the loaded schedule.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
