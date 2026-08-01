"use client";

import { motion } from "framer-motion";
import { worldCupGoalsHistory } from "@/lib/data";
import { cn } from "@/lib/utils";

const palette = [
  "#3f6f6b", "#4a6b94", "#c4a35a", "#b8755c", "#8b4548",
  "#6b5a82", "#5a6b8a", "#7a9e8e", "#a3a86a", "#8f7540",
  "#3a5788", "#9c6b5c", "#5f7a76", "#7d6b8a", "#b89a6a",
  "#6a5a58", "#4f6d72", "#8a7a5a", "#6b7a94", "#a07a6a",
  "#5c6e68", "#9a8a5c", "#c4a35a",
];

export function TotalGoalsChart() {
  const max = Math.max(...worldCupGoalsHistory.map((d) => d.goals));

  return (
    <section className="force-dark">
      <div className="spectrum-frame">
        <div className="spectrum-frame-inner p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-white sm:text-5xl">
                Total Goals Scored
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold/80">
                At Every FIFA World Cup™
              </p>
            </div>
            <img src="/fifa-logo.png" alt="FIFA" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
          </div>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex h-64 min-w-[720px] items-end gap-1.5 sm:h-72 sm:gap-2 md:min-w-0">
              {worldCupGoalsHistory.map((d, i) => {
                const h = Math.max(8, (d.goals / max) * 100);
                return (
                  <div key={d.year} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
                    <span
                      className={cn(
                        "text-[9px] font-bold tabular-nums sm:text-[10px]",
                        d.highlight ? "text-gold" : "text-white/70"
                      )}
                    >
                      {d.goals}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.7, delay: i * 0.03, ease: "easeOut" }}
                      className={cn(
                        "w-full max-w-[28px] rounded-t-sm sm:max-w-none",
                        d.highlight && "goals-bar-glow"
                      )}
                      style={{
                        background: d.highlight ? "#c4a35a" : palette[i % palette.length],
                        minHeight: 8,
                      }}
                      title={`${d.year}: ${d.goals} goals`}
                    />
                    <span
                      className={cn(
                        "mt-1 origin-center -rotate-90 text-[8px] font-semibold tabular-nums sm:rotate-0 sm:text-[10px]",
                        d.highlight ? "text-gold" : "text-white/45"
                      )}
                    >
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-white/45">
            <span>FIFA World Cup™ editions · 1930–2026</span>
            <span className="font-semibold text-gold">2026 · 48 teams · 308 goals (projected)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
