"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { flagUrl, playerPhotoFallback } from "@/lib/data";
import type { Player } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/shared/safe-image";

const posColor: Record<Player["position"], "default" | "pitch" | "gold" | "muted"> = {
  GK: "gold",
  DEF: "muted",
  MID: "default",
  FWD: "pitch",
};

export function PlayerCard({
  player,
  index = 0,
  selectable,
  selected,
  onSelect,
}: {
  player: Player;
  index?: number;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (p: Player) => void;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(sry, [-0.5, 0.5], ["-9deg", "9deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
      style={{ perspective: 900 }}
    >
      <motion.article
        onMouseMove={onMove}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        onClick={() => selectable && onSelect?.(player)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative overflow-hidden rounded-2xl glass transition-shadow hover:shadow-neon ${
          selectable ? "cursor-pointer" : ""
        } ${selected ? "ring-2 ring-gold" : ""}`}
      >
        <div className="relative h-56 overflow-hidden">
          <SafeImage
            src={player.photo}
            fallback={player.photoFallback ?? playerPhotoFallback}
            alt={player.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          <span className="absolute right-4 top-4 font-display text-6xl leading-none text-white/20">
            {player.number}
          </span>
          <img
            src={flagUrl(player.code, "w80")}
            alt={player.country}
            className="absolute left-4 top-4 h-6 w-9 rounded-sm object-cover ring-1 ring-white/30"
            loading="lazy"
          />
          <div className="absolute bottom-3 left-4 flex gap-2" style={{ transform: "translateZ(30px)" }}>
            <Badge variant={posColor[player.position]}>{player.position}</Badge>
            <Badge variant="gold">WC26: {player.tournamentGoals}</Badge>
          </div>
        </div>

        <div className="p-5">
          {selectable ? (
            <>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-2xl leading-none tracking-wide text-white">{player.name}</h3>
                  <p className="mt-1 text-sm text-white/50">{player.club} · Age {player.age}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/55">{player.bio}</p>
            </>
          ) : (
            <Link href={`/players/${player.id}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-2xl leading-none tracking-wide text-white transition-colors hover:text-electric">
                    {player.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{player.club} · Age {player.age}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/55">{player.bio}</p>
            </Link>
          )}

          <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-center">
            <Stat label="Caps" value={player.appearances} />
            <Stat label="Int. G" value={player.goals} />
            <Stat label="WC G" value={player.worldCupGoals} />
            <Stat label="Rating" value={player.rating} accent />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <p className={`font-display text-xl leading-none ${accent ? "gold-text" : "text-white"}`}>{value}</p>
      <p className="mt-1 text-[9px] uppercase tracking-widest text-white/40">{label}</p>
    </div>
  );
}
