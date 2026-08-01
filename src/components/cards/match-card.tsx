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
      <div className="flex h-10 w-14 items-center justify-center rounded-md bg-[#EAEDFF] text-[10px] font-semibold text-[#10164F]/80 sm:h-14 sm:w-20 sm:text-xs">
        TBD
      </div>
    ) : (
      <img
        src={flagUrl(code, "w160")}
        alt={country}
        className="h-10 w-14 rounded-md object-cover ring-1 ring-[#10164F]/25 sm:h-14 sm:w-20"
        loading="lazy"
      />
    );

  return (
    <motion.article
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border-[3px] border-[#10164F]/18 bg-white p-5 shadow-[0_14px_36px_-18px_rgba(16,22,79,0.4)] transition-shadow hover:border-[#304FFE] hover:shadow-[0_18px_44px_-14px_rgba(48,79,254,0.4)] sm:p-6",
        isLive && "border-[#B71D1C] ring-2 ring-[#B71D1C]/30"
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
                : "border-[#10164F]/22 text-[#10164F]/80 hover:text-[#10164F]"
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
          <span className="line-clamp-2 font-heading text-base font-bold tracking-wide text-[#10164F] sm:text-xl">
            {match.homeCountry}
          </span>
        </div>

        <div className="flex flex-col items-center px-1 sm:px-2">
          {isDone || isLive ? (
            <div className="font-display text-4xl leading-none text-[#10164F] sm:text-5xl">
              {match.homeScore}
              <span className="mx-1.5 text-[#304FFE]">:</span>
              {match.awayScore}
            </div>
          ) : (
            <div className="font-display text-2xl font-black text-[#304FFE] sm:text-3xl">VS</div>
          )}
          <span className="mt-1.5 text-[11px] font-black uppercase tracking-widest text-[#10164F]">
            {d.time}
          </span>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-1.5 text-center sm:gap-2">
          <Flag code={match.awayCode} country={match.awayCountry} />
          <span className="line-clamp-2 font-heading text-base font-bold tracking-wide text-[#10164F] sm:text-xl">
            {match.awayCountry}
          </span>
        </div>
      </div>

      {match.note && (
        <p className="mt-3 rounded-xl bg-[#EAEDFF] px-3 py-2.5 text-center text-xs font-bold text-[#10164F]">
          {match.note}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2 border-t-2 border-[#10164F]/15 pt-4 text-sm font-semibold text-[#10164F] sm:flex-row sm:items-center sm:justify-between">
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin className="h-4 w-4 shrink-0 text-[#304FFE]" />
          <span className="truncate">
            {match.stadium}, {match.city}
          </span>
        </span>
        <span className="shrink-0 font-black text-[#10164F]">
          {d.weekday} {d.day} {d.month}
        </span>
      </div>
    </motion.article>
  );
}
