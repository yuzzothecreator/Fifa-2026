import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** FIFA WC 2026 banner colors — used as backgrounds */
export const WC26 = {
  blue: "#304FFD",
  green: "#00C853",
  red: "#E31C3D",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export type BrandTone = "blue" | "green" | "red" | "white";

const toneStyle: Record<BrandTone, CSSProperties> = {
  blue: { backgroundColor: WC26.blue, color: WC26.white },
  green: { backgroundColor: WC26.green, color: WC26.white },
  red: { backgroundColor: WC26.red, color: WC26.white },
  white: { backgroundColor: WC26.white, color: WC26.blue },
};

/** Full-bleed curved green (TL) + red (BR) on a blue field — matches the banner */
export function BrandWaves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blue base */}
        <rect width="1440" height="800" fill={WC26.blue} />
        {/* Green top-left blob */}
        <path
          d="M0 0 H720 C900 0 980 80 960 220 C920 420 640 480 400 420 C180 360 40 220 0 140 Z"
          fill={WC26.green}
        />
        {/* Red bottom-right blob */}
        <path
          d="M1440 800 H720 C540 800 460 720 480 580 C520 380 800 320 1040 380 C1260 440 1400 580 1440 660 Z"
          fill={WC26.red}
        />
      </svg>
    </div>
  );
}

/** Solid brand background for a whole section */
export function SectionBand({
  tone = "blue",
  waves = false,
  className,
  children,
}: {
  tone?: BrandTone;
  waves?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={waves ? { backgroundColor: WC26.blue, color: WC26.white } : toneStyle[tone]}
    >
      {waves && <BrandWaves />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
