"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-10 pt-32">
      <div className="stadium-lights pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:56px_56px] opacity-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div className="container relative">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-label"
        >
          {label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-tight text-foreground xs:text-5xl sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-base text-muted-foreground sm:mt-4 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
