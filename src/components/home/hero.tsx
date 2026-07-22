"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./countdown-timer";
import { FloatingParticles } from "./floating-particles";

export function Hero() {
  return (
    <section className="force-dark relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Stadium background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=80"
          alt="Stadium at night"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-navy/80 to-midnight" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,transparent,rgba(2,6,23,0.85))]" />
      </div>

      {/* Animated stadium lights + grid */}
      <div className="stadium-lights pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:60px_60px] opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <FloatingParticles />

      <div className="container relative z-10 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          <Sparkles className="h-3.5 w-3.5" /> USA · Canada · Mexico — Summer 2026
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-white/70"
        >
          Experience every match, every goal, every moment. The definitive home of the FIFA World
          Cup 2026 — 48 nations, 16 cities, one unforgettable summer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button asChild size="lg">
            <Link href="/teams">
              Explore Teams <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/fixtures">
              <CalendarDays className="h-5 w-5" /> View Fixtures
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">Kickoff in</p>
          <CountdownTimer />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-electric"
          />
        </div>
      </motion.div>
    </section>
  );
}
