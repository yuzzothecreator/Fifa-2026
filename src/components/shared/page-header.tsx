"use client";

import { cn } from "@/lib/utils";
import { NYNJ } from "@/components/brand/section-band";

interface Props {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: Props) {
  return (
    <section
      className="relative overflow-hidden border-b border-[#10164F]/18 pb-10 pt-28 sm:pt-32"
      style={{ backgroundColor: NYNJ.soft }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div className="container relative">
        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#304FFE]">{label}</span>
        <h1 className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-tight text-[#10164F] xs:text-5xl sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className={cn("mt-3 max-w-2xl text-base text-[#10164F]/90 sm:mt-4 sm:text-lg")}>{description}</p>
        )}
      </div>
    </section>
  );
}
