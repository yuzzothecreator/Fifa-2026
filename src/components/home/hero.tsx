"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWaves } from "@/components/brand/section-band";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 text-white sm:pb-24 sm:pt-32">
      <BrandWaves />

      <div className="container relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <div className="mb-8 flex items-center gap-4">
            <Image
              src="/wc26-logo.png"
              alt="FIFA World Cup 2026"
              width={160}
              height={90}
              priority
              className="h-12 w-[5.5rem] object-contain brightness-0 invert sm:h-14 sm:w-28"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/85">
              FIFA World Cup 2026™
            </p>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,12vw,8.5rem)] uppercase leading-[0.85] tracking-tight text-white">
            Stay informed
            <br />
            and get
            <br />
            match-ready
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            USA · Canada · Mexico — live fixtures, groups, venues and fantasy for the biggest World Cup ever.
          </p>

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
        </motion.div>
      </div>
    </section>
  );
}
