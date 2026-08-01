"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Grid3X3, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE, flagUrl } from "@/lib/data";
import { CountdownTimer } from "./countdown-timer";

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
    <section className="force-dark relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Cinematic full-bleed */}
      <div className="absolute inset-0">
        <motion.img
          src={HERO_IMAGE}
          alt="Packed stadium under night lights"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,transparent,rgba(0,0,0,0.75))]" />
      </div>

      <div className="spectrum-bar absolute inset-x-0 top-0 z-[1] h-[3px]" />
      <div className="stadium-lights pointer-events-none absolute inset-0 opacity-60" />

      {/* Soft WC26 atmosphere — blue · teal · gold · maple */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[15%] h-[50%] w-[45%] rounded-full bg-fifa-blue/30 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[-5%] h-[40%] w-[40%] rounded-full bg-pitch/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] left-[40%] h-[30%] w-[30%] rounded-full bg-gold/20 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[20%] top-[30%] h-[25%] w-[25%] rounded-full bg-maple/15 blur-[80px]"
      />

      <div className="container relative z-10 w-full pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Main copy column */}
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
                className="h-[4.25rem] w-[4.25rem] object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)] sm:h-[5.5rem] sm:w-[5.5rem]"
              />
              <div className="min-w-0">
                <p className="font-display text-[1.65rem] uppercase leading-none tracking-tight text-white sm:text-4xl">
                  FIFA World Cup
                </p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:text-xs sm:tracking-[0.35em]">
                  <span className="spectrum-text">2026™</span>
                  <span className="hidden text-white/25 sm:inline">·</span>
                  <span>Official Hub</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-2.5"
            >
              {hosts.map((h) => (
                <span
                  key={h.code}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md"
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
              className="mt-6 max-w-[14ch] font-display text-[2.75rem] uppercase leading-[0.88] tracking-tight text-white xs:text-5xl sm:mt-7 sm:max-w-none sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-8xl"
            >
              The world&apos;s greatest
              <br />
              <span className="spectrum-text neon-text">football show</span>
              <br className="hidden xs:block" />
              <span className="text-white"> returns</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="spectrum-bar mt-5 h-[3px] w-28 origin-left rounded-full sm:mt-6 sm:w-48"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            >
              48 nations. 16 cities. 104 matches. Live results, groups, stadiums and fantasy — the premium digital home of the biggest World Cup ever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/fixtures">
                  <CalendarDays className="h-5 w-5" /> Match Centre <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-black/30 text-white hover:border-electric hover:text-electric sm:w-auto"
              >
                <Link href="/groups">
                  <Grid3X3 className="h-5 w-5" /> Groups & Standings
                </Link>
              </Button>
              <Button asChild size="lg" variant="pitch" className="w-full sm:w-auto">
                <Link href="/knockout">
                  <GitBranch className="h-5 w-5" /> Knockout Bracket
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Side panel — clock + stats */}
          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="spectrum-frame">
              <div className="spectrum-frame-inner p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    Tournament clock
                  </p>
                  <span className="rounded-full bg-pitch/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-pitch">
                    Live
                  </span>
                </div>
                <div className="mt-4">
                  <CountdownTimer />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 sm:gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-2xl leading-none text-white sm:text-3xl">{s.value}</p>
                      <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 hidden text-center text-[10px] uppercase tracking-[0.25em] text-white/35 lg:block">
              USA · Canada · Mexico · June–July 2026
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
