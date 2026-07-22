"use client";

import { motion } from "framer-motion";
import { Target, Users, Building2, Trophy, Radio, Footprints, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

// A string key is used instead of passing the icon component directly, so the
// card can be rendered from Server Components (functions aren't serializable).
const iconMap: Record<string, LucideIcon> = {
  goals: Target,
  teams: Users,
  stadiums: Building2,
  trophy: Trophy,
  live: Radio,
  boot: Footprints,
};

export type StatsIcon = keyof typeof iconMap;

interface Props {
  icon: StatsIcon;
  label: string;
  value: number;
  suffix?: string;
  accent?: "electric" | "pitch" | "gold";
}

const accentMap = {
  electric: { text: "text-electric", ring: "shadow-neon", bg: "bg-electric/15", border: "border-electric/30" },
  pitch: { text: "text-pitch", ring: "shadow-neon-green", bg: "bg-pitch/15", border: "border-pitch/30" },
  gold: { text: "text-gold", ring: "shadow-gold", bg: "bg-gold/15", border: "border-gold/30" },
};

export function StatsCard({ icon, label, value, suffix, accent = "electric" }: Props) {
  const a = accentMap[accent];
  const Icon = iconMap[icon] ?? Trophy;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={cn("glass relative overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-neon", a.border)}
    >
      <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", a.bg, a.ring)}>
        <Icon className={cn("h-6 w-6", a.text)} />
      </div>
      <div className="font-display text-5xl leading-none text-white">
        <AnimatedCounter to={value} suffix={suffix} />
      </div>
      <p className="mt-2 text-sm uppercase tracking-widest text-white/50">{label}</p>
      <div className={cn("pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl", a.bg)} />
    </motion.div>
  );
}
