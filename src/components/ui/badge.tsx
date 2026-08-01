import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-[#10164F]/15 bg-[#EAEDFF] text-[#10164F]",
        pitch: "border border-[#304FFE]/25 bg-[#304FFE]/10 text-[#304FFE]",
        gold: "border border-[#10164F]/15 bg-[#10164F] text-white",
        live: "border border-[#B71D1C]/30 bg-[#B71D1C] text-white",
        muted: "border border-[#10164F]/10 bg-white text-[#10164F]/60",
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
