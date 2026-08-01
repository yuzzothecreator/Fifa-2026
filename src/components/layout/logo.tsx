import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Official WC26 mark — blue 26 + trophy, transparent background */
export function TrophyMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/wc26-logo.png" alt="FIFA World Cup 2026" className={cn("object-contain", className)} />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group relative flex h-12 w-[7.5rem] items-center sm:h-14 sm:w-[9rem] md:h-[4.25rem] md:w-[11rem]",
        className
      )}
      aria-label="FIFA World Cup 2026 home"
    >
      <Image
        src="/wc26-logo.png"
        alt="FIFA World Cup 2026"
        width={280}
        height={140}
        className="h-full w-full object-contain"
        priority
      />
    </Link>
  );
}
