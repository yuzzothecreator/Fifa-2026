import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Black silhouette mark — invert on dark surfaces so it reads white */
export function TrophyMark({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/wc26-logo.png"
      alt="FIFA World Cup 2026"
      className={cn("object-contain", light && "brightness-0 invert", className)}
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
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span className="relative flex h-10 w-[4.5rem] shrink-0 items-center justify-center sm:h-11 sm:w-20">
        <Image
          src="/wc26-logo.png"
          alt="FIFA World Cup 2026"
          width={160}
          height={90}
          className={cn(
            "h-full w-full object-contain",
            inverted && "brightness-0 invert"
          )}
          priority
        />
      </span>
      {withText && (
        <span className="leading-none">
          <span
            className={cn(
              "block font-display text-2xl tracking-tight",
              inverted ? "text-white" : "text-[#10164F]"
            )}
          >
            WC<span className={inverted ? "text-white" : "text-[#304FFE]"}>26</span>
          </span>
          <span
            className={cn(
              "block text-[9px] font-bold uppercase tracking-[0.28em]",
              inverted ? "text-white/70" : "text-[#10164F]/55"
            )}
          >
            World Cup 2026
          </span>
        </span>
      )}
    </Link>
  );
}
