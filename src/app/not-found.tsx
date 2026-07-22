import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center">
      <div className="stadium-lights pointer-events-none absolute inset-0" />
      <p className="font-display text-[28vw] leading-none brand-gradient-text neon-text sm:text-[18rem]">404</p>
      <h1 className="font-heading text-3xl tracking-wide text-white">Offside! This page doesn&apos;t exist.</h1>
      <p className="mt-2 max-w-md text-white/60">The page you&apos;re looking for was flagged out of play.</p>
      <Button asChild className="mt-6"><Link href="/">Back to Kickoff</Link></Button>
    </section>
  );
}
