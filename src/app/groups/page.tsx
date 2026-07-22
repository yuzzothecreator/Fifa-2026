"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { GROUP_LETTERS, getGroupStandings, flagUrl, teams, matches } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function GroupsPage() {
  const [active, setActive] = React.useState<string>("A");
  const standings = getGroupStandings(active);
  const groupTeams = teams.filter((t) => t.group === active);
  const groupMatches = matches
    .filter((m) => m.group === active && m.stage.startsWith("Group"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      <PageHeader
        label="12 Groups · 48 Nations"
        title="Group Stage"
        description="Official Final Draw groups with live standings calculated from FIFA World Cup 2026 match results."
      />

      <section className="container py-10">
        <div className="flex flex-wrap gap-2">
          {GROUP_LETTERS.map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border font-display text-xl transition-colors",
                active === g
                  ? "border-electric bg-electric/15 text-electric shadow-neon"
                  : "border-border bg-foreground/5 text-foreground/70 hover:text-foreground"
              )}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-heading text-2xl tracking-wide text-white">Group {active}</h2>
              <Badge variant="default">{groupTeams.length} teams</Badge>
            </div>
            <div className="overflow-x-auto -mx-0">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
                    {["#", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"].map((h) => (
                      <th
                        key={h}
                        className={cn(
                          "px-2 py-3 font-semibold first:pl-4 last:pr-4 sm:px-3 sm:first:pl-5 sm:last:pr-5",
                          ["GF", "GA", "GD"].includes(h) && "hidden xs:table-cell",
                          ["W", "D", "L"].includes(h) && "hidden sm:table-cell"
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {standings.map((row, i) => (
                    <tr key={row.code} className={cn(i < 2 && "bg-pitch/5", i === 2 && "bg-electric/5")}>
                      <td className="px-2 py-3 pl-4 font-display text-lg text-white/40 sm:px-3 sm:pl-5">{i + 1}</td>
                      <td className="px-2 py-3 sm:px-3">
                        <span className="flex items-center gap-2 font-medium text-white">
                          <img src={flagUrl(row.code, "w40")} alt="" className="h-4 w-6 shrink-0 rounded-sm object-cover" />
                          <span className="truncate">{row.country}</span>
                          {i < 2 && <Badge variant="pitch" className="ml-1 !px-2 !py-0 text-[9px]">Q</Badge>}
                          {i === 2 && <Badge variant="default" className="ml-1 !px-2 !py-0 text-[9px]">3rd*</Badge>}
                        </span>
                      </td>
                      <td className="px-2 py-3 text-white/70 sm:px-3">{row.played}</td>
                      <td className="hidden px-2 py-3 text-white/70 sm:table-cell sm:px-3">{row.won}</td>
                      <td className="hidden px-2 py-3 text-white/70 sm:table-cell sm:px-3">{row.drawn}</td>
                      <td className="hidden px-2 py-3 text-white/70 sm:table-cell sm:px-3">{row.lost}</td>
                      <td className="hidden px-2 py-3 text-white/70 xs:table-cell sm:px-3">{row.gf}</td>
                      <td className="hidden px-2 py-3 text-white/70 xs:table-cell sm:px-3">{row.ga}</td>
                      <td className="hidden px-2 py-3 text-white/70 xs:table-cell sm:px-3">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                      <td className="px-2 py-3 pr-4 font-display text-xl text-electric sm:px-3 sm:pr-5">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-white/10 px-5 py-3 text-xs text-white/40">
              Top 2 qualify automatically. Eight best 3rd-placed teams across all groups also advance to the Round of 32.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading text-xl tracking-wide text-foreground">Group {active} fixtures</h3>
            {groupMatches.map((match) => (
              <div key={match.id} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  <span className="truncate pl-2">{match.stadium}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="flex flex-1 items-center gap-2 text-sm font-medium text-white">
                    <img src={flagUrl(match.homeCode, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
                    {match.homeCountry}
                  </span>
                  <span className="font-display text-2xl text-white">
                    {match.status === "FINISHED" ? `${match.homeScore}–${match.awayScore}` : "vs"}
                  </span>
                  <span className="flex flex-1 items-center justify-end gap-2 text-sm font-medium text-white">
                    {match.awayCountry}
                    <img src={flagUrl(match.awayCode, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
