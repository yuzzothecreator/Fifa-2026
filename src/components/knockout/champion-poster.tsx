"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Star } from "lucide-react";
import { flagUrl } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Congratulatory champion poster — Spain WC 2026 */
export function ChampionPoster({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border-[3px] border-[#10164F] shadow-[0_28px_70px_-24px_rgba(16,22,79,0.55)]",
        className
      )}
    >
      {/* Poster field — Spain red → gold wash over navy base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 80% at 50% -10%, rgba(241,191,0,0.55), transparent 55%),
            linear-gradient(165deg, #10164F 0%, #1a237e 40%, #AA151B 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent, transparent 12px, rgba(255,255,255,0.35) 12px, rgba(255,255,255,0.35) 13px)",
        }}
      />
      <div className="spectrum-bar absolute inset-x-0 top-0 h-1.5" />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center text-center",
          compact ? "px-5 py-8 sm:px-8 sm:py-10" : "px-6 py-12 sm:px-10 sm:py-16 md:py-20"
        )}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 18 }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#F1BF00] bg-[#F1BF00] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-[#10164F]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Congratulations
          <Sparkles className="h-3.5 w-3.5" />
        </motion.div>

        <p
          className={cn(
            "mt-5 font-black uppercase tracking-[0.45em] text-[#F1BF00]",
            compact ? "text-[10px]" : "text-xs sm:text-sm"
          )}
        >
          FIFA World Cup 2026™ Champions
        </p>

        <div className="mt-6 flex items-center gap-4 sm:gap-6">
          <motion.img
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            src={flagUrl("es", "w320")}
            alt="Spain"
            className={cn(
              "rounded-xl object-cover shadow-2xl ring-4 ring-[#F1BF00]",
              compact ? "h-16 w-24" : "h-20 w-32 sm:h-28 sm:w-44"
            )}
          />
          <motion.div
            animate={{ rotate: [0, -8, 8, 0], y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1BF00] text-[#10164F] shadow-[0_0_40px_rgba(241,191,0,0.55)] sm:h-20 sm:w-20"
          >
            <Trophy className={compact ? "h-8 w-8" : "h-10 w-10"} strokeWidth={2.25} />
          </motion.div>
          <motion.img
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            src={flagUrl("ar", "w320")}
            alt="Argentina"
            className={cn(
              "rounded-xl object-cover opacity-70 shadow-2xl ring-2 ring-white/40 grayscale-[30%]",
              compact ? "h-14 w-20" : "h-16 w-28 sm:h-20 sm:w-32"
            )}
          />
        </div>

        <h2
          className={cn(
            "mt-7 font-display uppercase leading-[0.85] tracking-tight text-white",
            compact
              ? "text-5xl sm:text-6xl"
              : "text-[clamp(3.5rem,12vw,8rem)]"
          )}
        >
          Spain
        </h2>
        <p
          className={cn(
            "mt-2 font-display uppercase tracking-wide text-[#F1BF00]",
            compact ? "text-2xl" : "text-3xl sm:text-5xl"
          )}
        >
          World Champions
        </p>

        <div className="mt-6 flex items-center gap-3 sm:gap-5">
          <ScoreChip code="es" country="Spain" score={1} winner />
          <span className="font-display text-3xl text-white/50 sm:text-4xl">–</span>
          <ScoreChip code="ar" country="Argentina" score={0} />
        </div>

        <p
          className={cn(
            "mt-5 max-w-xl font-semibold leading-relaxed text-white",
            compact ? "text-sm" : "text-base sm:text-lg"
          )}
        >
          Spain defeat Argentina 1–0 in the Final at MetLife Stadium — New York New Jersey · 19 July 2026
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[#F1BF00]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#F1BF00]" />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size={compact ? "default" : "lg"} className="bg-[#F1BF00] font-black text-[#10164F] hover:bg-white">
            <Link href="/matches/m104">View Final match</Link>
          </Button>
          <Button
            asChild
            size={compact ? "default" : "lg"}
            variant="outline"
            className="border-2 border-white bg-transparent font-black text-white hover:bg-white hover:text-[#10164F]"
          >
            <Link href="/teams/es">Spain squad</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

function ScoreChip({
  code,
  country,
  score,
  winner,
}: {
  code: string;
  country: string;
  score: number;
  winner?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-2xl border-2 px-3 py-2 sm:px-4 sm:py-2.5",
        winner
          ? "border-[#F1BF00] bg-[#F1BF00] text-[#10164F]"
          : "border-white/30 bg-white/10 text-white"
      )}
    >
      <img
        src={flagUrl(code, "w80")}
        alt=""
        className="h-6 w-9 rounded object-cover ring-1 ring-black/10 sm:h-7 sm:w-10"
      />
      <span className="hidden text-sm font-black sm:inline">{country}</span>
      <span className="font-display text-3xl leading-none sm:text-4xl">{score}</span>
    </div>
  );
}
