"use client";

import { worldCupGoalsHistory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { NYNJ } from "@/components/brand/section-band";

export function TotalGoalsChart() {
  const max = Math.max(...worldCupGoalsHistory.map((d) => d.goals));
  const highlight = worldCupGoalsHistory.find((d) => d.highlight);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#10164F]/18 bg-white shadow-[0_24px_60px_-28px_rgba(16,22,79,0.35)]">
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b border-[#10164F]/18 px-5 py-5 sm:px-8"
        style={{ backgroundColor: NYNJ.navy }}
      >
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white">
            At every FIFA World Cup™
          </p>
          <p className="mt-2 font-display text-2xl uppercase leading-none tracking-tight text-white sm:text-3xl">
            1930 — 2026
          </p>
        </div>
        <img
          src="/wc26-logo.png"
          alt="FIFA World Cup 2026"
          className="h-12 w-auto object-contain sm:h-14"
        />
      </div>

      <div className="p-5 sm:p-8">
        <div className="overflow-x-auto pb-2">
          <div className="flex h-72 min-w-[760px] items-end gap-1.5 sm:h-80 sm:gap-2 md:min-w-0">
            {worldCupGoalsHistory.map((d) => {
              const pct = Math.max(6, (d.goals / max) * 100);
              return (
                <div
                  key={d.year}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                  title={`${d.year}: ${d.goals} goals`}
                >
                  <span
                    className={cn(
                      "text-[10px] font-black tabular-nums",
                      d.highlight ? "text-[#304FFE]" : "text-[#10164F]"
                    )}
                  >
                    {d.goals}
                  </span>
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div
                      className={cn(
                        "w-full max-w-[32px] rounded-t-md transition-transform duration-300 group-hover:brightness-110 sm:max-w-none",
                        d.highlight
                          ? "bg-[#304FFE] ring-2 ring-[#304FFE]/30 ring-offset-2"
                          : "bg-[#10164F]"
                      )}
                      style={{ height: `${pct}%`, minHeight: 12 }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[9px] font-bold tabular-nums sm:text-[11px]",
                      d.highlight ? "text-[#304FFE]" : "text-[#10164F]/75"
                    )}
                  >
                    {d.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#10164F]/18 pt-5">
          <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-wider text-[#10164F]/80">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#10164F]" /> Past editions
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#304FFE]" /> 2026 projected
            </span>
          </div>
          {highlight && (
            <p className="text-sm font-black text-[#10164F]">
              2026 · 48 teams ·{" "}
              <span className="text-[#304FFE]">{highlight.goals} goals</span> projected
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
