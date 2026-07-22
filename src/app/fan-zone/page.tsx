"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Vote, Trophy, MessageSquare, Send, Crown, Medal } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { matches, flagUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

const initialPoll = [
  { label: "Brazil", votes: 4010, code: "br" },
  { label: "Argentina", votes: 3120, code: "ar" },
  { label: "France", votes: 2890, code: "fr" },
  { label: "Spain", votes: 2450, code: "es" },
];

const leaderboard = [
  { name: "Sofia_R", points: 2480, country: "es" },
  { name: "GoalMachine", points: 2310, country: "br" },
  { name: "LeoFan10", points: 2205, country: "ar" },
  { name: "TheGaffer", points: 1990, country: "gb-eng" },
  { name: "KDB_17", points: 1875, country: "be" },
];

export default function FanZonePage() {
  const [poll, setPoll] = React.useState(initialPoll);
  const [voted, setVoted] = React.useState<string | null>(null);
  const total = poll.reduce((s, o) => s + o.votes, 0);

  const [comments, setComments] = React.useState([
    { user: "Sofia_R", body: "Spain's midfield is unstoppable this year. Pedri + Rodri = 🔥", time: "2h" },
    { user: "GoalMachine", body: "No way, Brazil are winning it all. Vini is on another level.", time: "1h" },
  ]);
  const [draft, setDraft] = React.useState("");

  const predictable = matches.filter((m) => m.status === "SCHEDULED").slice(0, 3);

  const vote = (label: string) => {
    if (voted) return;
    setVoted(label);
    setPoll((p) => p.map((o) => (o.label === label ? { ...o, votes: o.votes + 1 } : o)));
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((c) => [{ user: "You", body: draft.trim(), time: "now" }, ...c]);
    setDraft("");
  };

  return (
    <>
      <PageHeader
        label="Community"
        title="Fan Zone"
        description="Vote in polls, predict scores, climb the leaderboard and join the global conversation."
      />

      <section className="container grid gap-6 py-10 lg:grid-cols-2">
        {/* POLL */}
        <Reveal>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
              <Vote className="h-5 w-5 text-electric" /> Who will win the World Cup?
            </h3>
            <div className="mt-5 space-y-3">
              {poll.map((o) => {
                const pct = Math.round((o.votes / total) * 100);
                return (
                  <button
                    key={o.label}
                    onClick={() => vote(o.label)}
                    disabled={!!voted}
                    className={cn(
                      "relative w-full overflow-hidden rounded-xl border p-3 text-left transition-colors",
                      voted === o.label ? "border-electric" : "border-white/10 hover:border-white/25",
                      voted && "cursor-default"
                    )}
                  >
                    {voted && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        className="absolute inset-y-0 left-0 bg-electric/15"
                      />
                    )}
                    <div className="relative flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium text-white">
                        <img src={flagUrl(o.code, "w40")} alt="" className="h-4 w-6 rounded-sm object-cover" />
                        {o.label}
                      </span>
                      {voted && <span className="font-semibold text-electric">{pct}%</span>}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-white/40">{total.toLocaleString()} votes · {voted ? "Thanks for voting!" : "Tap to vote"}</p>
          </div>
        </Reveal>

        {/* PREDICTIONS */}
        <Reveal delay={0.1}>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
              <Trophy className="h-5 w-5 text-gold" /> Predict the Scores
            </h3>
            <div className="mt-5 space-y-3">
              {predictable.map((m) => (
                <PredictionRow key={m.id} home={m.homeCode} away={m.awayCode} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* LEADERBOARD */}
        <Reveal delay={0.15}>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
              <Crown className="h-5 w-5 text-gold" /> Fan Leaderboard
            </h3>
            <ul className="mt-5 space-y-2">
              {leaderboard.map((u, i) => (
                <li
                  key={u.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-white/10 p-3",
                    i === 0 && "border-gold/40 bg-gold/5"
                  )}
                >
                  <span className="flex h-8 w-8 items-center justify-center font-display text-xl text-white/40">
                    {i < 3 ? <Medal className={cn("h-5 w-5", i === 0 ? "text-gold" : i === 1 ? "text-white/70" : "text-amber-700")} /> : i + 1}
                  </span>
                  <img src={flagUrl(u.country, "w40")} alt="" className="h-5 w-7 rounded-sm object-cover" />
                  <span className="flex-1 font-medium text-white">{u.name}</span>
                  <span className="font-display text-xl text-electric">{u.points.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* COMMENTS */}
        <Reveal delay={0.2}>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
              <MessageSquare className="h-5 w-5 text-pitch" /> Fan Wall
            </h3>
            <form onSubmit={addComment} className="mt-5 flex gap-2">
              <Input placeholder="Share your take..." value={draft} onChange={(e) => setDraft(e.target.value)} />
              <Button type="submit" variant="pitch" size="icon"><Send className="h-4 w-4" /></Button>
            </form>
            <ul className="mt-5 space-y-3">
              {comments.map((c, i) => (
                <li key={i} className="rounded-xl border border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{c.user}</span>
                    <Badge variant="muted">{c.time}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function PredictionRow({ home, away }: { home: string; away: string }) {
  const [h, setH] = React.useState<number | "">("");
  const [a, setA] = React.useState<number | "">("");
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 p-3">
      <div className="flex items-center gap-2">
        <img src={flagUrl(home, "w40")} alt="" className="h-5 w-7 rounded-sm object-cover" />
        <input
          type="number"
          min={0}
          value={h}
          onChange={(e) => { setH(e.target.value === "" ? "" : Number(e.target.value)); setSaved(false); }}
          className="h-10 w-12 rounded-lg border border-white/15 bg-white/5 text-center text-white focus:border-electric focus:outline-none"
        />
        <span className="text-white/40">:</span>
        <input
          type="number"
          min={0}
          value={a}
          onChange={(e) => { setA(e.target.value === "" ? "" : Number(e.target.value)); setSaved(false); }}
          className="h-10 w-12 rounded-lg border border-white/15 bg-white/5 text-center text-white focus:border-electric focus:outline-none"
        />
        <img src={flagUrl(away, "w40")} alt="" className="h-5 w-7 rounded-sm object-cover" />
      </div>
      <Button size="sm" variant={saved ? "gold" : "outline"} onClick={() => h !== "" && a !== "" && setSaved(true)}>
        {saved ? "Saved" : "Save"}
      </Button>
    </div>
  );
}
