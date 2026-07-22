import Link from "next/link";
import { cn } from "@/lib/utils";

/** Stylised FIFA World Cup trophy mark (original artwork, not the official emblem). */
export function TrophyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="World Cup trophy">
      <defs>
        <linearGradient id="wc-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="45%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#c8901a" />
        </linearGradient>
      </defs>
      {/* globe on top */}
      <circle cx="32" cy="13" r="7" fill="url(#wc-gold)" />
      <path d="M25.5 11h13M32 6.2v13.6M27 7.6c2.4 3.6 7.6 3.6 10 0M27 18.4c2.4-3.6 7.6-3.6 10 0" stroke="#c8901a" strokeWidth="0.9" fill="none" opacity="0.6" />
      {/* twisting body */}
      <path d="M24.5 19c-7 13 1 23 7.5 25 6.5-2 14.5-12 7.5-25-2.6 6-4.9 8.4-7.5 8.4S27.1 25 24.5 19Z" fill="url(#wc-gold)" />
      {/* base */}
      <rect x="24" y="45" width="16" height="4.2" rx="1.4" fill="url(#wc-gold)" />
      <rect x="19.5" y="50" width="25" height="6.5" rx="2.4" fill="url(#wc-gold)" />
    </svg>
  );
}

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-midnight ring-1 ring-white/15">
        {/* spectrum glow ring (official 2026 identity) */}
        <span className="spectrum-bar absolute inset-0 rounded-xl opacity-40 blur-md transition-opacity group-hover:opacity-70" />
        <TrophyMark className="relative h-8 w-8 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
      </span>
      {withText && (
        <span className="leading-none">
          <span className="block font-display text-2xl tracking-tight">
            <span className="text-white">WC</span>
            <span className="spectrum-text">26</span>
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-white/50">
            World Cup 2026
          </span>
        </span>
      )}
    </Link>
  );
}
