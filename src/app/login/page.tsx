"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Chrome, Github, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";
import { LOGIN_IMAGE } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [mode, setMode] = React.useState<"login" | "register">("login");

  return (
    <section className="force-dark relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-28">
      <div className="absolute inset-0">
        <img
          src={LOGIN_IMAGE}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 to-midnight" />
      </div>
      <div className="stadium-lights pointer-events-none absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-6 shadow-neon sm:p-8"
      >
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center font-display text-4xl uppercase tracking-tight text-white">
          {mode === "login" ? "Welcome Back" : "Join the Hub"}
        </h1>
        <p className="mt-1 text-center text-sm text-white/50">
          {mode === "login" ? "Sign in to your fan account" : "Create your free fan account"}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { icon: Chrome, label: "Google" },
            { icon: Apple, label: "Apple" },
            { icon: Github, label: "GitHub" },
          ].map((s) => (
            <button
              key={s.label}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm text-white/80 transition-colors hover:border-electric hover:text-electric"
            >
              <s.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-white/30">
          <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
        </div>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input placeholder="Full name" className="pl-11" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input type="email" placeholder="Email address" className="pl-11" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input type="password" placeholder="Password" className="pl-11" />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          {mode === "login" ? "New to WC26? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-semibold text-electric hover:underline"
          >
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p className="mt-4 text-center text-xs text-white/30">
          Demo admin: <span className="text-white/60">admin@wc26.com / admin1234</span>
        </p>
        <div className="mt-2 text-center">
          <Link href="/" className={cn("text-xs text-white/40 hover:text-white")}>← Back to home</Link>
        </div>
      </motion.div>
    </section>
  );
}
