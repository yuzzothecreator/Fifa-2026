"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, CalendarDays, User, Newspaper, BarChart3,
  Plus, Pencil, Trash2, TrendingUp, Eye, Search,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { teams, matches, players, news, flagUrl } from "@/lib/data";
import { formatMatchDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "overview" | "teams" | "matches" | "players" | "news";

const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "teams", label: "Teams", icon: Users },
  { key: "matches", label: "Matches", icon: CalendarDays },
  { key: "players", label: "Players", icon: User },
  { key: "news", label: "News", icon: Newspaper },
];

export default function AdminPage() {
  const [tab, setTab] = React.useState<Tab>("overview");

  return (
    <>
      <PageHeader label="Control Panel" title="Admin Dashboard" description="Manage teams, matches, players and news. Monitor platform analytics." />

      <section className="container py-10">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="glass h-max rounded-2xl p-3 lg:sticky lg:top-24">
            <nav className="flex gap-1 overflow-x-auto lg:flex-col">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    tab === t.key ? "bg-electric/15 text-electric" : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {tab === "overview" && <Overview />}
            {tab === "teams" && <TeamsAdmin />}
            {tab === "matches" && <MatchesAdmin />}
            {tab === "players" && <PlayersAdmin />}
            {tab === "news" && <NewsAdmin />}
          </div>
        </div>
      </section>
    </>
  );
}

function Overview() {
  const stats = [
    { label: "Total Teams", value: teams.length, icon: Users, accent: "text-electric" },
    { label: "Total Matches", value: 104, icon: CalendarDays, accent: "text-pitch" },
    { label: "Players", value: players.length, icon: User, accent: "text-gold" },
    { label: "News Articles", value: news.length, icon: Newspaper, accent: "text-electric" },
  ];
  const traffic = [42, 58, 51, 73, 66, 89, 95];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <s.icon className={cn("h-6 w-6", s.accent)} />
            <p className="mt-3 font-display text-4xl text-white">{s.value}</p>
            <p className="text-xs uppercase tracking-widest text-white/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
            <BarChart3 className="h-5 w-5 text-electric" /> Weekly Traffic
          </h3>
          <Badge variant="pitch"><TrendingUp className="h-3 w-3" /> +18.4%</Badge>
        </div>
        <div className="mt-6 flex h-48 items-end gap-3">
          {traffic.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="w-full rounded-t-lg bg-gradient-to-t from-electric/40 to-electric"
              />
              <span className="text-xs text-white/40">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-heading text-2xl tracking-wide text-white">Recent Activity</h3>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            { icon: Eye, text: "MetLife Stadium page reached 1.2M views", time: "10m ago" },
            { icon: Newspaper, text: "New article published: Mbappé hat-trick", time: "1h ago" },
            { icon: Users, text: "Team ranking updated — Argentina #1", time: "3h ago" },
          ].map((a, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl border border-white/10 p-3 text-white/70">
              <a.icon className="h-4 w-4 text-electric" />
              <span className="flex-1">{a.text}</span>
              <span className="text-xs text-white/40">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function Toolbar({ title }: { title: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="font-heading text-2xl tracking-wide text-foreground">{title}</h3>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input placeholder="Search..." className="h-10 w-44 pl-9" />
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add</Button>
      </div>
    </div>
  );
}

function RowActions() {
  return (
    <div className="flex justify-end gap-1">
      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-electric hover:text-electric">
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-red-500 hover:text-red-400">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function TableShell({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="glass mt-5 overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
              {head.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold last:text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function TeamsAdmin() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Toolbar title="Manage Teams" />
      <TableShell head={["Team", "Continent", "Coach", "Rank", "Actions"]}>
        {teams.map((t) => (
          <tr key={t.id} className="text-white/80 hover:bg-white/5">
            <td className="px-4 py-3">
              <span className="flex items-center gap-2 font-medium text-white">
                <img src={flagUrl(t.code, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" /> {t.country}
              </span>
            </td>
            <td className="px-4 py-3">{t.continent}</td>
            <td className="px-4 py-3">{t.coach}</td>
            <td className="px-4 py-3"><Badge variant="gold">#{t.ranking}</Badge></td>
            <td className="px-4 py-3"><RowActions /></td>
          </tr>
        ))}
      </TableShell>
    </motion.div>
  );
}

function MatchesAdmin() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Toolbar title="Manage Matches" />
      <TableShell head={["Fixture", "Stadium", "Date", "Status", "Actions"]}>
        {matches.map((m) => {
          const d = formatMatchDate(m.date);
          return (
            <tr key={m.id} className="text-white/80 hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">{m.homeCountry} v {m.awayCountry}</td>
              <td className="px-4 py-3">{m.stadium}</td>
              <td className="px-4 py-3">{d.day} {d.month}</td>
              <td className="px-4 py-3">
                <Badge variant={m.status === "LIVE" ? "live" : m.status === "FINISHED" ? "pitch" : "muted"}>
                  {m.status}
                </Badge>
              </td>
              <td className="px-4 py-3"><RowActions /></td>
            </tr>
          );
        })}
      </TableShell>
    </motion.div>
  );
}

function PlayersAdmin() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Toolbar title="Manage Players" />
      <TableShell head={["Player", "Position", "Club", "Goals", "Actions"]}>
        {players.map((p) => (
          <tr key={p.id} className="text-white/80 hover:bg-white/5">
            <td className="px-4 py-3">
              <span className="flex items-center gap-2 font-medium text-white">
                <img src={p.photo} alt="" className="h-8 w-8 rounded-full object-cover" /> {p.name}
              </span>
            </td>
            <td className="px-4 py-3"><Badge variant="default">{p.position}</Badge></td>
            <td className="px-4 py-3">{p.club}</td>
            <td className="px-4 py-3">{p.goals}</td>
            <td className="px-4 py-3"><RowActions /></td>
          </tr>
        ))}
      </TableShell>
    </motion.div>
  );
}

function NewsAdmin() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Toolbar title="Manage News" />
      <TableShell head={["Title", "Category", "Featured", "Read", "Actions"]}>
        {news.map((n) => (
          <tr key={n.id} className="text-white/80 hover:bg-white/5">
            <td className="max-w-xs truncate px-4 py-3 font-medium text-white">{n.title}</td>
            <td className="px-4 py-3"><Badge variant="muted">{n.category}</Badge></td>
            <td className="px-4 py-3">{n.featured ? "Yes" : "No"}</td>
            <td className="px-4 py-3">{n.readTime}m</td>
            <td className="px-4 py-3"><RowActions /></td>
          </tr>
        ))}
      </TableShell>
    </motion.div>
  );
}
