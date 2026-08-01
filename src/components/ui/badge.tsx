import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-[#304FFD]/25 bg-[#304FFD]/10 text-[#304FFD]",
        pitch: "border border-[#304FFD]/30 bg-[#304FFD]/10 text-[#304FFD]",
        gold: "border border-[#304FFD]/30 bg-white text-[#304FFD]",
        live: "border border-[#304FFD]/40 bg-[#304FFD] text-white",
        muted: "border border-[#304FFD]/15 bg-white text-[#304FFD]/60",
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
