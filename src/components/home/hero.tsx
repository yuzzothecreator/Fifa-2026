"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWaves, NYNJ } from "@/components/brand/section-band";
import { CountdownTimer } from "./countdown-timer";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 text-white sm:pb-28 sm:pt-32"
      style={{ backgroundColor: NYNJ.navy }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <BrandWaves />
      </div>

      <div className="container relative z-20 w-full">
        <div className="max-w-4xl">
          <Image
            src="/wc26-logo.png"
            alt="FIFA World Cup 2026"
            width={280}
            height={158}
            priority
            className="mb-8 h-16 w-auto object-contain brightness-0 invert sm:h-20 md:h-24"
          />

          <h1 className="font-display text-[clamp(2.75rem,11vw,7.5rem)] uppercase leading-[0.88] tracking-tight text-white">
            Stay informed
            <br />
            and get match-ready
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            USA · Canada · Mexico — live fixtures, groups, venues and fantasy for the biggest World Cup ever.
          </p>

          <div className="mt-8">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-white/60">
              Kickoff countdown
            </p>
            <CountdownTimer />
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-white text-[#10164F] hover:bg-[#EAEDFF]">
              <Link href="/fixtures">
                Match Centre <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#10164F]"
            >
              <Link href="/groups">Groups & Standings</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
