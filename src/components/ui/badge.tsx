import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-electric/60 bg-electric/25 text-electric",
        pitch: "border border-pitch/60 bg-pitch/25 text-pitch",
        gold: "border border-gold/60 bg-gold/25 text-gold",
        live: "border border-red-500/60 bg-red-500/25 text-red-400",
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
