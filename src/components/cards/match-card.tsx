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
      <div className="flex h-14 w-20 items-center justify-center rounded-md bg-white/10 text-xs font-semibold text-white/50">
        TBD
      </div>
    ) : (
      <img
        src={flagUrl(code, "w160")}
        alt={country}
        className="h-14 w-20 rounded-md object-cover ring-1 ring-white/20"
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
        "relative overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-neon",
        isLive && "border-red-500/40"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="muted" className="max-w-[70%] truncate">
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
            onClick={() => setReminded((r) => !r)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
              reminded ? "border-gold/50 bg-gold/15 text-gold" : "border-white/15 text-white/60 hover:text-white"
            )}
          >
            <Bell className={cn("h-3 w-3", reminded && "fill-gold")} />
            {reminded ? "Set" : "Remind"}
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <Flag code={match.homeCode} country={match.homeCountry} />
          <span className="font-heading text-lg tracking-wide text-white">{match.homeCountry}</span>
        </div>

        <div className="flex flex-col items-center px-2">
          {isDone || isLive ? (
            <div className="font-display text-4xl leading-none text-white">
              {match.homeScore}
              <span className="mx-1 text-white/40">:</span>
              {match.awayScore}
            </div>
          ) : (
            <div className="font-display text-2xl text-electric">VS</div>
          )}
          <span className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{d.time}</span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <Flag code={match.awayCode} country={match.awayCountry} />
          <span className="font-heading text-lg tracking-wide text-white">{match.awayCountry}</span>
        </div>
      </div>

      {match.note && (
        <p className="mt-3 rounded-xl bg-white/5 px-3 py-2 text-center text-xs text-gold/90">{match.note}</p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-electric" />
          {match.stadium}, {match.city}
        </span>
        <span className="font-semibold text-white/70">
          {d.weekday} {d.day} {d.month}
        </span>
      </div>
    </motion.article>
  );
}
