"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Sparkles, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./countdown-timer";
import { FloatingParticles } from "./floating-particles";

export function Hero() {
  return (
    <section className="force-dark relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2200&q=85"
          alt="Packed stadium under night lights"
          className="h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-navy/75 to-midnight" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,transparent,rgba(2,6,23,0.9))]" />
      </div>

      <div className="stadium-lights pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:60px_60px] opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <FloatingParticles />

      <div className="container relative z-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3"
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
          className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          The World&apos;s Greatest
          <br />
          <span className="spectrum-text neon-text">Football Show</span> Returns
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="spectrum-bar mt-6 h-1 w-40 origin-left rounded-full sm:w-56"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-white/70"
        >
          48 nations. 16 cities. 104 matches. Live results, groups, stadiums and fantasy — the premium digital home of the biggest World Cup ever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild size="lg">
            <Link href="/fixtures">
              <CalendarDays className="h-5 w-5" /> Match Centre <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/groups">
              <Grid3X3 className="h-5 w-5" /> Groups & Standings
            </Link>
          </Button>
          <Button asChild size="lg" variant="pitch">
            <Link href="/knockout">Knockout Bracket</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">Tournament clock</p>
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
        >
          {[
            { k: "48", l: "Teams" },
            { k: "16", l: "Stadiums" },
            { k: "104", l: "Matches" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl px-4 py-3 text-center">
              <p className="font-display text-3xl text-white">{s.k}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/45">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
