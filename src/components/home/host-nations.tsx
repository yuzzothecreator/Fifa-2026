import Link from "next/link";
import { HOST_NATIONS, flagUrl } from "@/lib/data";
import { NYNJ } from "@/components/brand/section-band";

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
              className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden p-8 sm:min-h-[340px] sm:p-10"
              style={{ backgroundColor: hostBg[h.code] ?? NYNJ.navy, color }}
            >
              <img
                src={flagUrl(h.code, "w320")}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] opacity-70">
                  Host nation
                </p>
                <h3 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight sm:text-6xl">
                  {h.country}
                </h3>
                <p className="mt-3 text-sm opacity-75">{h.role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
