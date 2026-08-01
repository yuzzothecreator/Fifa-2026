"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TOURNAMENT_START } from "@/lib/data";

function getRemaining(target: number) {
  const diff = target - Date.now();
  return {
    over: diff <= 0,
    days: Math.floor(Math.max(0, diff) / 86400000),
    hours: Math.floor((Math.max(0, diff) / 3600000) % 24),
    minutes: Math.floor((Math.max(0, diff) / 60000) % 60),
    seconds: Math.floor((Math.max(0, diff) / 1000) % 60),
  };
}

export function CountdownTimer({ large = false }: { large?: boolean }) {
  const target = React.useMemo(() => new Date(TOURNAMENT_START).getTime(), []);
  const [time, setTime] = React.useState(() => getRemaining(target));
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (mounted && time.over) {
    return (
      <p className="font-display text-3xl uppercase tracking-tight text-white sm:text-5xl">
        The tournament is underway
      </p>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className={cn("flex items-stretch justify-center gap-2 sm:gap-4", large && "gap-3 sm:gap-6")}>
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div className="min-w-[4.5rem] text-center sm:min-w-[6rem]">
            <motion.p
              key={u.value}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={cn(
                "font-display leading-none text-white",
                large ? "text-5xl sm:text-7xl md:text-8xl" : "text-3xl sm:text-5xl"
              )}
            >
              {mounted ? String(u.value).padStart(2, "0") : "--"}
            </motion.p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/65 sm:text-xs">
              {u.label}
            </p>
          </div>
          {i < units.length - 1 && (
            <span
              className={cn(
                "self-start pt-1 font-display text-white/40",
                large ? "text-4xl sm:text-6xl" : "text-2xl sm:text-4xl"
              )}
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
