import Link from "next/link";
import { Trophy } from "lucide-react";
import { goldenBoot, flagUrl } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function GoldenBootBoard() {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <Badge variant="gold"><Trophy className="h-3.5 w-3.5" /> Golden Boot Race</Badge>
          <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-tight text-white md:text-4xl">
            Top scorers · WC 2026
          </h3>
        </div>
        <Link href="/players" className="text-sm font-semibold text-electric hover:underline">
          All players →
        </Link>
      </div>

      <ol className="relative mt-6 space-y-2">
        {goldenBoot.map((p, i) => (
          <li key={p.id}>
            <Link
              href={`/players/${p.id}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 transition-colors hover:border-gold/40 hover:bg-gold/5"
            >
              <span className={`w-7 font-display text-2xl ${i === 0 ? "gold-text" : "text-white/30"}`}>
                {i + 1}
              </span>
              <img
                src={flagUrl(p.code, "w40")}
                alt=""
                className="h-5 w-7 rounded-sm object-cover ring-1 ring-white/20"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-lg tracking-wide text-white">{p.name}</p>
                <p className="text-xs text-white/45">{p.country} · {p.club}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl leading-none text-white">{p.tournamentGoals}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">goals</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
