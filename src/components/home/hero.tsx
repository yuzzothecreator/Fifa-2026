"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Sparkles, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE } from "@/lib/data";
import { CountdownTimer } from "./countdown-timer";
import { FloatingParticles } from "./floating-particles";

export function Hero() {
  return (
    <section className="force-dark relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Packed stadium under night lights"
          className="h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-navy/75 to-midnight" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,transparent,rgba(2,6,23,0.9))]" />
      </div>

      <div className="stadium-lights pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:60px_60px] opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <FloatingParticles />

      <div className="container relative z-10 pb-20 pt-24 sm:pb-16 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <span className="section-label">
            <Sparkles className="h-3.5 w-3.5" /> FIFA World Cup 2026™ Hub
          </span>
          <span className="host-chip">🇺🇸 USA</span>
          <span className="host-chip">🇨🇦 Canada</span>
          <span className="host-chip">🇲🇽 Mexico</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-5xl font-display text-[2.65rem] uppercase leading-[0.92] tracking-tight text-white xs:text-5xl sm:mt-6 sm:text-7xl lg:text-8xl"
        >
          The World&apos;s Greatest
          <br />
          <span className="spectrum-text neon-text">Football Show</span> Returns
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="spectrum-bar mt-5 h-1 w-32 origin-left rounded-full sm:mt-6 sm:w-56"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 max-w-xl text-base text-white/70 sm:mt-6 sm:text-lg"
        >
          48 nations. 16 cities. 104 matches. Live results, groups, stadiums and fantasy — the premium digital home of the biggest World Cup ever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/fixtures">
              <CalendarDays className="h-5 w-5" /> Match Centre <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/groups">
              <Grid3X3 className="h-5 w-5" /> Groups & Standings
            </Link>
          </Button>
          <Button asChild size="lg" variant="pitch" className="w-full sm:w-auto">
            <Link href="/knockout">Knockout Bracket</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-12"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs sm:tracking-[0.3em]">Tournament clock</p>
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid max-w-2xl grid-cols-3 gap-2 sm:mt-10 sm:gap-3"
        >
          {[
            { k: "48", l: "Teams" },
            { k: "16", l: "Stadiums" },
            { k: "104", l: "Matches" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl px-2 py-3 text-center sm:rounded-2xl sm:px-4">
              <p className="font-display text-2xl text-white sm:text-3xl">{s.k}</p>
              <p className="text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
