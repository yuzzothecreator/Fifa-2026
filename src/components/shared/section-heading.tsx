"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  light,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-[0.4em]",
            light ? "text-white" : "text-[#304FFE]"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(2.25rem,6vw,4.5rem)] uppercase leading-[0.9] tracking-tight",
          light ? "text-white" : "text-[#10164F]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base font-medium leading-relaxed sm:text-lg",
            light ? "text-white/90" : "text-[#10164F]/80",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
