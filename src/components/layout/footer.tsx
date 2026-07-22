"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Youtube, Facebook, Send } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Tournament",
    links: [
      { label: "Fixtures", href: "/fixtures" },
      { label: "Teams", href: "/teams" },
      { label: "Stadiums", href: "/stadiums" },
      { label: "Dashboard", href: "/dashboard" },
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
    <footer className="force-dark relative mt-24 border-t border-white/10 bg-midnight">
      <div className="stadium-lights pointer-events-none absolute inset-0 overflow-hidden opacity-40" />
      <div className="container relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              The definitive digital home of the FIFA World Cup 2026. Every match, every goal,
              every moment — across the USA, Canada & Mexico.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-electric hover:text-electric"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-lg tracking-wider text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-electric">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl glass p-6 md:grid-cols-2 md:items-center">
          <div>
            <h4 className="font-heading text-xl tracking-wide text-white">Never miss a moment</h4>
            <p className="text-sm text-white/60">Get fixtures, results and breaking news in your inbox.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="you@email.com" required />
            <Button type="submit" variant="pitch" size="icon" aria-label="Subscribe">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row">
          <p>© 2026 World Cup 2026 Hub. A concept fan platform — not affiliated with FIFA.</p>
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
