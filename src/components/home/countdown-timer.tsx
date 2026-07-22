"use client";

import * as React from "react";
import { motion } from "framer-motion";
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

export function CountdownTimer() {
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
      <div className="glass inline-flex items-center gap-3 rounded-2xl px-5 py-4">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pitch opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-pitch" />
        </span>
        <span className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
          The tournament is underway
        </span>
      </div>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div className="glass flex min-w-[64px] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[84px] sm:px-4">
            <motion.span
              key={u.value}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-3xl leading-none text-white sm:text-5xl"
            >
              {mounted ? String(u.value).padStart(2, "0") : "--"}
            </motion.span>
            <span className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-white/50">{u.label}</span>
          </div>
          {i < units.length - 1 && <span className="font-display text-2xl text-electric/60 sm:text-4xl">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
