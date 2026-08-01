"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, Calendar } from "lucide-react";
import type { Stadium } from "@/lib/types";
import { STADIUM_FALLBACK } from "@/lib/data";
import { SafeImage } from "@/components/shared/safe-image";

export function StadiumCard({ stadium, index = 0 }: { stadium: Stadium; index?: number }) {
  return (
    <Link href={`/stadiums/${stadium.id}`} className="block">
      <motion.article
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
        whileHover={{ rotateX: 6, rotateY: -6, y: -8 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl glass transition-shadow hover:shadow-neon"
      >
        <div className="relative h-64 overflow-hidden">
          <SafeImage
            src={stadium.image}
            fallback={STADIUM_FALLBACK}
            alt={stadium.localName}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10164F] via-[#10164F]/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5" style={{ transform: "translateZ(40px)" }}>
            <p className="text-xs uppercase tracking-widest text-white/70">{stadium.localName}</p>
            <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-white">
              {stadium.name}
            </h3>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-[#10164F]/70">
              <MapPin className="h-4 w-4 text-[#304FFE]" />
              {stadium.city}, {stadium.country}
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-[#10164F]">
              <Users className="h-4 w-4 text-[#B71D1C]" />
              {stadium.capacity.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#10164F]/45">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Opened {stadium.opened}
            </span>
            <span>{stadium.matchesHosted} WC matches hosted</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
