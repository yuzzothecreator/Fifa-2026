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
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group relative flex h-10 w-[4.75rem] items-center sm:h-11 sm:w-[5.5rem]", className)}
      aria-label="FIFA World Cup 2026 home"
    >
      <Image
        src="/wc26-logo.png"
        alt="FIFA World Cup 2026"
        width={160}
        height={90}
        className={cn("h-full w-full object-contain", inverted && "brightness-0 invert")}
        priority
      />
    </Link>
  );
}
