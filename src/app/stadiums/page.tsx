import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { StadiumCard } from "@/components/cards/stadium-card";
import { stadiums } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stadiums",
  description: "Explore the 16 iconic host stadiums of the FIFA World Cup 2026.",
};

export default function StadiumsPage() {
  const totalCapacity = stadiums.reduce((s, x) => s + x.capacity, 0);

  return (
    <>
      <PageHeader
        label="Host Venues"
        title="Stadiums"
        description="From the Azteca to MetLife — the cathedrals of football that will host the world's greatest show."
      />

      <section className="container py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Stadiums", value: stadiums.length },
            { label: "Host Cities", value: 16 },
            { label: "Countries", value: 3 },
            { label: "Total Seats", value: `${Math.round(totalCapacity / 1000)}K` },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <p className="font-display text-4xl text-white">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stadiums.map((s, i) => (
            <StadiumCard key={s.id} stadium={s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
