import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-fifa-blue/40 bg-fifa-blue/15 text-electric",
        pitch: "border border-pitch/40 bg-pitch/15 text-[#9bb8b4]",
        gold: "border border-gold/40 bg-gold/12 text-gold",
        live: "border border-maple/40 bg-maple/15 text-[#c9898c]",
        muted: "border border-white/15 bg-white/5 text-white/70",
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
