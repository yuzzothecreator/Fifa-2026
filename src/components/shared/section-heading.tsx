"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ label, title, description, align = "left", className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}
    >
      {label && <span className="section-label">{label}</span>}
      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-2xl text-base text-muted-foreground", align === "center" && "mx-auto")}>{description}</p>
      )}
    </motion.div>
  );
}
