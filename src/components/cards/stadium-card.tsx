"use client";

import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import type { Stadium } from "@/lib/types";

export function StadiumCard({ stadium, index = 0 }: { stadium: Stadium; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ rotateX: 6, rotateY: -6, y: -8 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden rounded-2xl glass transition-shadow hover:shadow-neon"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={stadium.image}
          alt={stadium.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
        <div className="stadium-lights pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-5 right-5" style={{ transform: "translateZ(40px)" }}>
          <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-white">{stadium.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between p-5">
        <span className="flex items-center gap-2 text-sm text-white/70">
          <MapPin className="h-4 w-4 text-electric" />
          {stadium.city}, {stadium.country}
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          <Users className="h-4 w-4 text-pitch" />
          {stadium.capacity.toLocaleString()}
        </span>
      </div>
    </motion.article>
  );
}
