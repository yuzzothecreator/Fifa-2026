"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWaves, NYNJ } from "@/components/brand/section-band";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-x-hidden text-white"
      style={{ backgroundColor: NYNJ.navy }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <BrandWaves />
      </div>

      {/* pt/pb reserve space for fixed navbar + mobile bottom nav so nothing is clipped */}
      <div className="container relative z-20 flex w-full items-center justify-center px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-[clamp(2rem,8vw,6.5rem)] uppercase leading-[0.9] tracking-tight text-white max-[700px]:text-[clamp(1.75rem,9vh,3.5rem)]">
            Stay informed
            <br />
            and get match-ready
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-base md:text-lg">
            USA · Canada · Mexico — live fixtures, groups, venues and fantasy for the biggest World Cup ever.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
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
