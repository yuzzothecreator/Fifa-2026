import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Brand-colored WC26 mark (#304FFE) on a light chip so it stays readable everywhere */
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
        "group relative flex h-11 items-center rounded-xl bg-white px-2.5 py-1.5 shadow-[0_8px_24px_-12px_rgba(16,22,79,0.35)] sm:h-12 sm:px-3",
        className
      )}
      aria-label="FIFA World Cup 2026 home"
    >
      <Image
        src="/wc26-logo.png"
        alt="FIFA World Cup 2026"
        width={160}
        height={90}
        className="h-8 w-auto object-contain sm:h-9"
        priority
      />
    </Link>
  );
}
