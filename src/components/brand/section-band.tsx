import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Official NYNJ / DD.NYC colors from
 * https://nynjfwc26.com/wp-content/themes/fifa-dd.nyc/static/css/main.css
 */
export const NYNJ = {
  white: "#FFFFFF", // --c0
  navy: "#10164F", // --c1
  blue: "#304FFE", // --c2
  black: "#000000", // --c3
  soft: "#EAEDFF", // --c4
  red: "#B71D1C", // --c12
} as const;

export type BrandTone = "white" | "navy" | "blue" | "soft" | "red";

const toneStyle: Record<BrandTone, CSSProperties> = {
  white: { backgroundColor: NYNJ.white, color: NYNJ.navy },
  soft: { backgroundColor: NYNJ.soft, color: NYNJ.navy },
  navy: { backgroundColor: NYNJ.navy, color: NYNJ.white },
  blue: { backgroundColor: NYNJ.blue, color: NYNJ.white },
  red: { backgroundColor: NYNJ.red, color: NYNJ.white },
};

/** Keep export name for existing imports */
export const WC26 = {
  blue: NYNJ.blue,
  green: NYNJ.blue,
  red: NYNJ.red,
  white: NYNJ.white,
  black: NYNJ.black,
  navy: NYNJ.navy,
  soft: NYNJ.soft,
} as const;

export function BrandWaves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <rect width="1440" height="900" fill={NYNJ.navy} />
        <path
          d="M0 0 H760 C940 20 1020 120 990 280 C940 500 620 560 360 480 C140 410 30 240 0 160 Z"
          fill={NYNJ.blue}
        />
        <path
          d="M1440 900 H680 C500 880 420 760 450 600 C500 380 820 320 1080 400 C1300 470 1410 640 1440 740 Z"
          fill={NYNJ.red}
        />
      </svg>
    </div>
  );
}

export function SectionBand({
  tone = "white",
  waves = false,
  className,
  children,
}: {
  tone?: BrandTone;
  waves?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "navy" || tone === "blue" || tone === "red" || waves;
  return (
    <section
      className={cn(
        "chapter",
        waves && "overflow-hidden",
        dark && "section-band-dark force-dark",
        className
      )}
      style={waves ? { backgroundColor: NYNJ.navy, color: NYNJ.white } : toneStyle[tone]}
    >
      {waves && <BrandWaves />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function BrandMarquee({
  text = "HOME OF THE FIFA WORLD CUP 26™",
  tone = "navy",
}: {
  text?: string;
  tone?: BrandTone;
}) {
  const items = Array.from({ length: 8 }, () => `${text} · `);
  return (
    <div className="overflow-hidden border-y border-white/10 py-4" style={toneStyle[tone]}>
      <div className="marquee-track flex w-max whitespace-nowrap font-display text-2xl uppercase tracking-tight sm:text-4xl md:text-5xl">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-2" style={{ color: tone === "soft" || tone === "white" ? NYNJ.navy : NYNJ.white }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
