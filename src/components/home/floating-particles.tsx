"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Deterministic pseudo-random so server/client markup matches
function seeded(i: number) {
  const x = Math.sin(i * 99.13) * 10000;
  return x - Math.floor(x);
}

export function FloatingParticles({ count = 14 }: { count?: number }) {
  const items = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: seeded(i) * 100,
        top: seeded(i + 40) * 100,
        size: 12 + seeded(i + 80) * 26,
        duration: 8 + seeded(i + 120) * 10,
        delay: seeded(i + 160) * 5,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className="absolute select-none opacity-30"
          style={{ left: `${p.left}%`, top: `${p.top}%`, fontSize: p.size }}
          animate={{ y: [0, -40, 0], rotate: [0, 20, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚽
        </motion.div>
      ))}
    </div>
  );
}
