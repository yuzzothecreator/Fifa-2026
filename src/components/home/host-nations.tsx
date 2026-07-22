import Link from "next/link";
import { HOST_NATIONS, flagUrl } from "@/lib/data";

export function HostNations() {
  return (
    <section className="container py-10">
      <div className="overflow-hidden rounded-3xl glass-strong">
        <div className="spectrum-bar h-1 w-full" />
        <div className="grid gap-0 md:grid-cols-3">
          {HOST_NATIONS.map((h, i) => (
            <Link
              key={h.code}
              href={`/teams/${h.code}`}
              className={`group relative flex items-center gap-4 p-6 transition-colors hover:bg-white/5 ${
                i < 2 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <img
                src={flagUrl(h.code, "w160")}
                alt={h.country}
                className="h-12 w-16 rounded-lg object-cover ring-1 ring-white/20 transition-transform group-hover:scale-105"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">Host Nation</p>
                <h3 className="font-heading text-2xl tracking-wide text-white">{h.country}</h3>
                <p className="text-xs text-white/50">{h.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
