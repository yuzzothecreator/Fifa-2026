"use client";

import { Hand } from "lucide-react";
import { goldenGlove, flagUrl } from "@/lib/data";
import { SafeImage } from "@/components/shared/safe-image";
import { PLAYER_FALLBACK } from "@/lib/data";
import { cn } from "@/lib/utils";

const frameClass: Record<string, string> = {
  spectrum: "",
  blue: "spectrum-frame-blue",
  fire: "spectrum-frame-fire",
  cyan: "spectrum-frame-cyan",
  lime: "spectrum-frame-lime",
};

export function GoldenGloveBoard() {
  const hero = goldenGlove.find((g) => g.featured)!;
  const rest = goldenGlove.filter((g) => !g.featured);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="section-label">
            <Hand className="h-3.5 w-3.5" /> Adidas Golden Glove
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">
            Golden Glove Winners
          </h2>
        </div>
        <p className="font-mono text-sm tracking-widest text-white/80">2010–2026</p>
      </div>

      <div className={cn("spectrum-frame mb-4")}>
        <div className="spectrum-frame-inner">
          <div className="grid sm:grid-cols-[1.1fr_0.9fr]">
            <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[280px]">
              <SafeImage
                src={hero.photo}
                fallback={PLAYER_FALLBACK}
                alt={hero.name}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#304FFD] via-transparent to-transparent sm:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-end gap-3 bg-white px-5 py-6 text-[#304FFD] sm:px-8 sm:py-8">
              <p className="font-display text-5xl leading-none sm:text-6xl">{hero.year}</p>
              <div className="flex items-end justify-between gap-3">
                <h3 className="font-heading text-3xl uppercase leading-none tracking-wide sm:text-4xl">
                  {hero.name}
                </h3>
                <img
                  src={flagUrl(hero.code, "w80")}
                  alt={hero.country}
                  className="h-8 w-12 rounded-md object-cover ring-2 ring-[#304FFD]/20"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#304FFD]/60">
                Best Goalkeeper · {hero.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((g) => (
          <div key={g.year} className={cn("spectrum-frame", frameClass[g.frame])}>
            <div className="spectrum-frame-inner flex flex-col">
              <div className="relative aspect-[4/5]">
                <SafeImage
                  src={g.photo}
                  fallback={PLAYER_FALLBACK}
                  alt={g.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#304FFD] via-[#304FFD]/40 to-transparent" />
                <img
                  src={flagUrl(g.code, "w40")}
                  alt=""
                  className="absolute bottom-3 left-3 h-5 w-7 rounded-sm object-cover ring-1 ring-white/40"
                />
              </div>
              <div className="bg-white px-3 py-3">
                <p className="truncate text-[11px] font-bold uppercase tracking-wider text-[#304FFD]">{g.name}</p>
                <p className="font-display text-3xl leading-none text-[#304FFD]">{g.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
