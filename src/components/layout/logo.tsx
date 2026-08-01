import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

export function Logo({
  className,
  withText = true,
  inverted = false,
}: {
  className?: string;
  withText?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1",
          inverted ? "bg-[#304FFD] ring-white/30" : "bg-[#304FFD] ring-[#304FFD]/20"
        )}
      >
        <Image
          src="/fifa-logo.png"
          alt="FIFA"
          width={40}
          height={40}
          className="relative h-9 w-9 object-contain"
          priority
        />
      </span>
      {withText && (
        <span className="leading-none">
          <span
            className={cn(
              "block font-display text-2xl tracking-tight",
              inverted ? "text-white" : "text-[#304FFD]"
            )}
          >
            WC<span className={inverted ? "text-white" : "text-[#304FFD]"}>26</span>
          </span>
          <span
            className={cn(
              "block text-[9px] font-bold uppercase tracking-[0.28em]",
              inverted ? "text-white/70" : "text-[#304FFD]/55"
            )}
          >
            World Cup 2026
          </span>
        </span>
      )}
    </Link>
  );
}
