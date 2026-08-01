import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-fifa-blue/50 bg-fifa-blue/25 text-[#8eb0ff]",
        pitch: "border border-pitch/60 bg-pitch/20 text-pitch",
        gold: "border border-gold/70 bg-gold/20 text-gold",
        live: "border border-maple/60 bg-maple/20 text-[#ff6b7a]",
        muted: "border border-white/20 bg-white/10 text-white/80",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
