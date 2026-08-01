"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Grid3X3, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE, flagUrl } from "@/lib/data";
import { CountdownTimer } from "./countdown-timer";
import { BrandWaves, WC26 } from "@/components/brand/section-band";

const hosts = [
  { code: "us", label: "USA" },
  { code: "ca", label: "Canada" },
  { code: "mx", label: "Mexico" },
] as const;

const stats = [
  { value: "48", label: "Teams" },
  { value: "16", label: "Stadiums" },
  { value: "104", label: "Matches" },
] as const;

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden text-white"
      style={{ backgroundColor: WC26.blue }}
    >
      {/* Banner-style background: blue + green TL + red BR */}
      <BrandWaves />

      <div className="absolute inset-0 z-[1] opacity-15">
        <motion.img
          src={HERO_IMAGE}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="h-full w-full object-cover object-center mix-blend-luminosity"
        />
      </div>

      <div className="absolute inset-x-0 top-0 z-[2] h-1 bg-white/80" />

      <div className="container relative z-10 w-full pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Image
                src="/fifa-logo.png"
                alt="FIFA"
                width={88}
                height={88}
                priority
                className="h-[4.25rem] w-[4.25rem] object-contain sm:h-[5.5rem] sm:w-[5.5rem]"
              />
              <div className="min-w-0">
                <p className="font-display text-[1.65rem] uppercase leading-none tracking-tight text-white sm:text-4xl">
                  FIFA World Cup
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-xs">
                  2026™ · Official Hub
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6"
            >
              {hosts.map((h) => (
                <span
                  key={h.code}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 backdrop-blur-md"
                >
                  <img
                    src={flagUrl(h.code, "w40")}
                    alt=""
                    className="h-3.5 w-5 rounded-[2px] object-cover"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-[11px]">
                    {h.label}
                  </span>
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="mt-6 max-w-[16ch] font-display text-[2.75rem] uppercase leading-[0.88] tracking-tight text-white xs:text-5xl sm:mt-7 sm:max-w-none sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-8xl"
            >
              Stay informed
              <br />
              and get
              <br />
              match-ready
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
            >
              48 nations. 16 cities. 104 matches. Live results, groups, stadiums and fantasy — the premium digital home of the biggest World Cup ever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              <Button asChild size="lg" className="w-full bg-white text-[#304FFD] hover:bg-white/90 sm:w-auto">
                <Link href="/fixtures">
                  <CalendarDays className="h-5 w-5" /> Match Centre <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/15 sm:w-auto">
                <Link href="/groups">
                  <Grid3X3 className="h-5 w-5" /> Groups & Standings
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/15 sm:w-auto">
                <Link href="/knockout">
                  <GitBranch className="h-5 w-5" /> Knockout Bracket
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div
              className="overflow-hidden rounded-[1.1rem] border-2 border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]"
              style={{ backgroundColor: WC26.blue }}
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                    Tournament clock
                  </p>
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                    Live
                  </span>
                </div>
                <div className="mt-4">
                  <CountdownTimer />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/20 pt-4 sm:gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-2xl leading-none text-white sm:text-3xl">{s.value}</p>
                      <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-white/55 sm:text-[10px]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
