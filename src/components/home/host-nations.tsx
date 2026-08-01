import Link from "next/link";
import { HOST_NATIONS, flagUrl } from "@/lib/data";
import { NYNJ } from "@/components/brand/section-band";
import { ArrowRight } from "lucide-react";

/** NYNJ schedule-row rhythm: soft → blue → navy */
const hostBg: Record<string, string> = {
  mx: NYNJ.soft,
  us: NYNJ.blue,
  ca: NYNJ.navy,
};

const hostText: Record<string, string> = {
  mx: NYNJ.navy,
  us: NYNJ.white,
  ca: NYNJ.white,
};

const hostRing: Record<string, string> = {
  mx: "ring-[#10164F]/20",
  us: "ring-white/40",
  ca: "ring-white/40",
};

export function HostNations() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-3">
        {HOST_NATIONS.map((h) => {
          const color = hostText[h.code] ?? NYNJ.white;
          return (
            <Link
              key={h.code}
              href={`/teams/${h.code}`}
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden p-8 sm:min-h-[380px] sm:p-10"
              style={{ backgroundColor: hostBg[h.code] ?? NYNJ.navy, color }}
            >
              {/* Crisp flag — full color, no washout */}
              <div className="relative z-10">
                <div
                  className={`overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] ring-2 ${hostRing[h.code] ?? "ring-white/30"} transition-transform duration-500 group-hover:scale-[1.03]`}
                >
                  <img
                    src={flagUrl(h.code, "w640")}
                    alt={`${h.country} flag`}
                    className="aspect-[3/2] w-full max-w-[220px] object-cover sm:max-w-[260px]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="relative z-10 mt-8">
                <p className="text-[11px] font-black uppercase tracking-[0.35em] opacity-80">
                  Host nation
                </p>
                <h3 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight sm:text-6xl">
                  {h.country}
                </h3>
                <p className="mt-3 text-sm font-semibold opacity-80">{h.role}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] opacity-90 transition-transform group-hover:translate-x-1">
                  View team <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
