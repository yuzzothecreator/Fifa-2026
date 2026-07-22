"use client";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-neon"
      style={{ borderColor: `${team.color}33` }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-50"
        style={{ background: team.color }}
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={flagUrl(team.code, "w160")}
            alt={`${team.country} flag`}
            className="h-12 w-16 rounded-md object-cover ring-1 ring-white/20"
            loading="lazy"
          />
          <div>
            <h3 className="font-heading text-2xl leading-none tracking-wide text-white">{team.country}</h3>
            <p className="text-xs uppercase tracking-widest text-white/50">Group {team.group}</p>
          </div>
        </div>
        <button
          onClick={() => toggle(team.id)}
          aria-label="Favorite team"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
            fav ? "border-gold/50 bg-gold/15 text-gold" : "border-white/15 bg-white/5 text-white/50 hover:text-white"
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-gold")} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="gold">
          <Trophy className="h-3 w-3" /> FIFA #{team.ranking}
        </Badge>
        <Badge variant="muted">{team.continent}</Badge>
        {(team.titles ?? 0) > 0 && <Badge variant="pitch">{team.titles}× champions</Badge>}
      </div>

      <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
        <p className="text-xs uppercase tracking-widest text-white/40">Head Coach</p>
        <p className="text-sm font-medium text-white">{team.coach}</p>
      </div>

      <div className="mt-3">
        <p className="text-xs uppercase tracking-widest text-white/40">Squad Preview</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {team.squadPreview.map((p) => (
            <span key={p} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
