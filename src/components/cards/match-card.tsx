"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Bell, Radio } from "lucide-react";
import type { Match } from "@/lib/types";
import { flagUrl } from "@/lib/data";
import { formatMatchDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MatchCard({ match, index = 0 }: { match: Match; index?: number }) {
  const [reminded, setReminded] = React.useState(false);
  const d = formatMatchDate(match.date);
  const isLive = match.status === "LIVE";
  const isDone = match.status === "FINISHED";
  const stageLabel = match.group !== "—" ? `${match.stage} · Group ${match.group}` : match.stage;

  const Flag = ({ code, country }: { code: string; country: string }) =>
    code === "tbd" ? (
      <div className="flex h-10 w-14 items-center justify-center rounded-md bg-[#EAEDFF] text-[10px] font-semibold text-[#10164F]/50 sm:h-14 sm:w-20 sm:text-xs">
        TBD
      </div>
    ) : (
      <img
        src={flagUrl(code, "w160")}
        alt={country}
        className="h-10 w-14 rounded-md object-cover ring-1 ring-[#10164F]/15 sm:h-14 sm:w-20"
        loading="lazy"
      />
    );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative overflow-hidden rounded-2xl glass p-4 transition-shadow hover:shadow-neon sm:p-5",
        isLive && "ring-2 ring-[#B71D1C]/40"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="muted" className="max-w-[65%] truncate text-[10px] sm:max-w-[70%] sm:text-xs">
          {stageLabel}
        </Badge>
        {isLive ? (
          <Badge variant="live">
            <Radio className="h-3 w-3 animate-pulse" /> LIVE {match.minute}&apos;
          </Badge>
        ) : isDone ? (
          <Badge variant="pitch">Full Time</Badge>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setReminded((r) => !r);
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
              reminded
                ? "border-[#304FFE] bg-[#EAEDFF] text-[#304FFE]"
                : "border-[#10164F]/15 text-[#10164F]/55 hover:text-[#10164F]"
            )}
          >
            <Bell className={cn("h-3 w-3", reminded && "fill-[#304FFE]")} />
            {reminded ? "Set" : "Remind"}
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-5 sm:gap-3">
        <div className="flex min-w-0 flex-col items-center gap-1.5 text-center sm:gap-2">
          <Flag code={match.homeCode} country={match.homeCountry} />
          <span className="line-clamp-2 font-heading text-sm tracking-wide text-[#10164F] sm:text-lg">
            {match.homeCountry}
          </span>
        </div>

        <div className="flex flex-col items-center px-1 sm:px-2">
          {isDone || isLive ? (
            <div className="font-display text-3xl leading-none text-[#10164F] sm:text-4xl">
              {match.homeScore}
              <span className="mx-1 text-[#10164F]/30">:</span>
              {match.awayScore}
            </div>
          ) : (
            <div className="font-display text-xl text-[#304FFE] sm:text-2xl">VS</div>
          )}
          <span className="mt-1 text-[10px] uppercase tracking-widest text-[#10164F]/40">{d.time}</span>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-1.5 text-center sm:gap-2">
          <Flag code={match.awayCode} country={match.awayCountry} />
          <span className="line-clamp-2 font-heading text-sm tracking-wide text-[#10164F] sm:text-lg">
            {match.awayCountry}
          </span>
        </div>
      </div>

      {match.note && (
        <p className="mt-3 rounded-xl bg-[#EAEDFF] px-3 py-2 text-center text-xs text-[#10164F]/80">
          {match.note}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2 border-t border-[#10164F]/10 pt-4 text-xs text-[#10164F]/55 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#304FFE]" />
          <span className="truncate">
            {match.stadium}, {match.city}
          </span>
        </span>
        <span className="shrink-0 font-semibold text-[#10164F]/70">
          {d.weekday} {d.day} {d.month}
        </span>
      </div>
    </motion.article>
  );
}
