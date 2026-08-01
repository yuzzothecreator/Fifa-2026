"use client";

import { motion } from "framer-motion";
import { worldCupGoalsHistory } from "@/lib/data";
import { cn } from "@/lib/utils";

const palette = [
  "#10164F", "#304FFE", "#EAEDFF", "#10164F", "#304FFE",
  "#EAEDFF", "#10164F", "#304FFE", "#EAEDFF", "#10164F",
  "#304FFE", "#EAEDFF", "#10164F", "#304FFE", "#EAEDFF",
  "#10164F", "#304FFE", "#EAEDFF", "#10164F", "#304FFE",
  "#EAEDFF", "#10164F", "#304FFE",
];

export function TotalGoalsChart() {
  const max = Math.max(...worldCupGoalsHistory.map((d) => d.goals));

  return (
    <section>
      <div className="spectrum-frame">
        <div className="spectrum-frame-inner bg-[#10164F] p-5 text-white sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-white sm:text-5xl">
                Total Goals Scored
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                At Every FIFA World Cup™
              </p>
            </div>
            <img
              src="/wc26-logo.png"
              alt="FIFA"
              className="h-10 w-[4.5rem] object-contain brightness-0 invert sm:h-12 sm:w-24"
            />
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
                        d.highlight ? "text-white" : "text-white/70"
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
                        background: d.highlight ? "#304FFE" : palette[i % palette.length],
                        border: palette[i % palette.length] === "#EAEDFF" ? "1px solid rgba(255,255,255,0.35)" : "none",
                        boxSizing: "border-box" as const,
                        minHeight: 8,
                      }}
                      title={`${d.year}: ${d.goals} goals`}
                    />
                    <span
                      className={cn(
                        "mt-1 origin-center -rotate-90 text-[8px] font-semibold tabular-nums sm:rotate-0 sm:text-[10px]",
                        d.highlight ? "text-white" : "text-white/45"
                      )}
                    >
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-4 text-xs text-white/55">
            <span>FIFA World Cup™ editions · 1930–2026</span>
            <span className="font-semibold text-white">2026 · 48 teams · 308 goals (projected)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
