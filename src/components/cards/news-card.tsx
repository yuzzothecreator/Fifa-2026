"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import type { NewsArticle } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const catVariant: Record<NewsArticle["category"], "default" | "pitch" | "gold" | "live" | "muted"> = {
  Breaking: "live",
  "Match Report": "pitch",
  Analysis: "default",
  Feature: "gold",
  Transfer: "muted",
};

export function NewsCard({
  article,
  index = 0,
  featured,
}: {
  article: NewsArticle;
  index?: number;
  featured?: boolean;
}) {
  const date = new Date(article.publishedDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl glass transition-shadow hover:shadow-neon",
        featured && "md:flex-row"
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "h-64 md:h-auto md:w-1/2" : "h-48")}>
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge variant={catVariant[article.category]}>{article.category}</Badge>
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col p-5", featured && "md:justify-center md:p-8")}>
        <h3
          className={cn(
            "font-heading leading-tight tracking-wide text-white transition-colors group-hover:text-electric",
            featured ? "text-3xl" : "text-xl"
          )}
        >
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/60">{article.description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-white/45">
          <span className="flex items-center gap-3">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.readTime} min read
            </span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-electric transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.article>
  );
}
