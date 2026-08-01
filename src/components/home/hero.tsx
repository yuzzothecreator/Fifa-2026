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
      className="relative flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden text-white"
      style={{ backgroundColor: NYNJ.navy }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <BrandWaves />
      </div>

      <div className="container relative z-20 flex h-full w-full items-center justify-center px-4 py-24">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-8 inline-flex rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-20px_rgba(16,22,79,0.45)]">
            <Image
              src="/wc26-logo.png"
              alt="FIFA World Cup 2026"
              width={280}
              height={158}
              priority
              className="h-14 w-auto object-contain sm:h-16 md:h-20"
            />
          </div>

          <h1 className="font-display text-[clamp(2.5rem,10vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-white">
            Stay informed
            <br />
            and get match-ready
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            USA · Canada · Mexico — live fixtures, groups, venues and fantasy for the biggest World Cup ever.
          </p>

          <div className="mt-8 w-full">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-white/60">
              Kickoff countdown
            </p>
            <CountdownTimer />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
