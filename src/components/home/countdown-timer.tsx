"use client";

import * as React from "react";
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

  React.useEffect(() => {
    setTime(getRemaining(target));
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (time.over) {
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
    <div
      className={cn(
        "mx-auto flex w-full max-w-4xl flex-wrap items-end justify-center gap-x-3 gap-y-6 sm:gap-x-5",
        large && "gap-x-4 sm:gap-x-6"
      )}
      suppressHydrationWarning
    >
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div className="min-w-[4.25rem] flex-1 basis-[4.25rem] text-center sm:min-w-[5.5rem] sm:flex-none">
            <p
              className={cn(
                "font-display tabular-nums leading-none text-white",
                large
                  ? "text-[clamp(2.25rem,8vw,5.5rem)]"
                  : "text-[clamp(1.75rem,6vw,3rem)]"
              )}
              suppressHydrationWarning
            >
              {String(u.value).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 sm:text-xs">
              {u.label}
            </p>
          </div>
          {i < units.length - 1 && (
            <span
              className={cn(
                "hidden self-center pb-6 font-display text-white/35 sm:inline",
                large ? "text-4xl md:text-5xl" : "text-2xl"
              )}
              aria-hidden
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
