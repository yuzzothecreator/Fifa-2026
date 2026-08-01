"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Trophy } from "lucide-react";
import type { Team } from "@/lib/types";
import { flagUrl } from "@/lib/data";
import { useFavoriteTeams } from "@/lib/favorites";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TeamCard({ team, index = 0 }: { team: Team; index?: number }) {
  const { isFavorite, toggle, ready } = useFavoriteTeams();
  const fav = ready && isFavorite(team.id);

  return (
    <motion.article
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-neon"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: team.color }}
      />
      <div className="flex items-start justify-between">
        <Link href={`/teams/${team.code}`} className="flex items-center gap-3">
          <img
            src={flagUrl(team.code, "w160")}
            alt={`${team.country} flag`}
            className="h-12 w-16 rounded-md object-cover ring-1 ring-[#10164F]/25"
            loading="lazy"
          />
          <div>
            <h3 className="font-heading text-2xl leading-none tracking-wide text-[#10164F] transition-colors group-hover:text-[#304FFE]">
              {team.country}
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#10164F]/75">Group {team.group}</p>
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(team.id);
          }}
          aria-label="Favorite team"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
            fav
              ? "border-[#B71D1C]/40 bg-[#B71D1C]/10 text-[#B71D1C]"
              : "border-[#10164F]/22 bg-[#EAEDFF] text-[#10164F]/75 hover:text-[#10164F]"
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-[#B71D1C]")} />
        </button>
      </div>

      <Link href={`/teams/${team.code}`} className="mt-4 block">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">
            <Trophy className="h-3 w-3" /> FIFA #{team.ranking}
          </Badge>
          <Badge variant="muted">{team.continent}</Badge>
          {(team.titles ?? 0) > 0 && <Badge variant="pitch">{team.titles}× champions</Badge>}
        </div>

        <div className="mt-4 space-y-1 border-t border-[#10164F]/18 pt-4">
          <p className="text-xs uppercase tracking-widest text-[#10164F]/90">Head Coach</p>
          <p className="text-sm font-medium text-[#10164F]">{team.coach}</p>
        </div>

        <div className="mt-3">
          <p className="text-xs uppercase tracking-widest text-[#10164F]/90">Squad Preview</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {team.squadPreview.map((p) => (
              <span
                key={p}
                className="rounded-full bg-[#EAEDFF] px-2.5 py-1 text-xs text-[#10164F]/90"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
