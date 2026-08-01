"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Youtube, Facebook, Send } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NYNJ } from "@/components/brand/section-band";

const columns = [
  {
    title: "Tournament",
    links: [
      { label: "Groups", href: "/groups" },
      { label: "Fixtures", href: "/fixtures" },
      { label: "Knockout", href: "/knockout" },
      { label: "Teams", href: "/teams" },
      { label: "Fantasy", href: "/fantasy" },
      { label: "Stadiums", href: "/stadiums" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Players", href: "/players" },
      { label: "News", href: "/news" },
      { label: "Fan Zone", href: "/fan-zone" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socials = [Twitter, Instagram, Youtube, Facebook, Github];

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ backgroundColor: NYNJ.navy }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: NYNJ.blue }}
      />
      <div className="container relative z-10 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Built in the spirit of the official NYNJ host experience — every match, every goal, every moment.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-[#304FFE] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-16 grid gap-6 rounded-2xl border border-white/15 p-6 md:grid-cols-2 md:items-center md:p-8"
          style={{ backgroundColor: "rgba(48,79,254,0.25)" }}
        >
          <div>
            <h4 className="font-display text-3xl uppercase tracking-tight text-white">Stay updated</h4>
            <p className="mt-2 text-sm text-white/70">Fixtures, results and breaking news in your inbox.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="you@email.com"
              required
              className="rounded-full border-white/30 bg-white text-[#10164F]"
            />
            <Button type="submit" className="rounded-full bg-white text-[#10164F] hover:bg-[#EAEDFF]" size="icon" aria-label="Subscribe">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/50 md:flex-row">
          <p>© 2026 World Cup 2026 Hub. Fan concept — not affiliated with FIFA.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
