import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** FIFA World Cup trophy + FIFA wordmark (user-provided brand mark). */
export function TrophyMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/fifa-logo.png"
      alt="FIFA World Cup"
      className={cn("object-contain", className)}
    />
  );
}

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-white/15">
        <span className="spectrum-bar absolute inset-0 rounded-xl opacity-30 blur-md transition-opacity group-hover:opacity-55" />
        <Image
          src="/fifa-logo.png"
          alt="FIFA"
          width={40}
          height={40}
          className="relative h-9 w-9 object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.35)]"
          priority
        />
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
