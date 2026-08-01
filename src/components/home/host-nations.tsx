import Link from "next/link";
import { HOST_NATIONS, flagUrl } from "@/lib/data";
import { WC26 } from "@/components/brand/section-band";

const hostBg: Record<string, string> = {
  mx: WC26.green,
  us: WC26.blue,
  ca: WC26.red,
};

export function HostNations() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-3">
        {HOST_NATIONS.map((h) => (
          <Link
            key={h.code}
            href={`/teams/${h.code}`}
            className="group flex items-center gap-4 px-6 py-8 text-white transition-opacity hover:opacity-90 md:px-8"
            style={{ backgroundColor: hostBg[h.code] ?? WC26.blue }}
          >
            <img
              src={flagUrl(h.code, "w160")}
              alt={h.country}
              className="h-12 w-16 rounded-lg object-cover ring-2 ring-white/50 transition-transform group-hover:scale-105"
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">
                Host Nation
              </p>
              <h3 className="font-heading text-2xl tracking-wide text-white">{h.country}</h3>
              <p className="text-xs text-white/75">{h.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
