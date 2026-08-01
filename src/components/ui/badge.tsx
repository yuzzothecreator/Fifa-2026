import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-white/25 bg-white/10 text-white",
        pitch: "border border-white/30 bg-white/10 text-white",
        gold: "border border-white/30 bg-white text-[#304FFD]",
        live: "border border-white/40 bg-white text-[#304FFD]",
        muted: "border border-white/15 bg-white/5 text-white/60",
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
