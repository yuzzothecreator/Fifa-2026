import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border border-[#304FFE]/30 bg-[#EAEDFF] text-[#304FFE]",
        pitch: "border border-[#304FFE]/35 bg-[#304FFE] text-white",
        gold: "border border-[#10164F]/20 bg-[#10164F] text-white",
        live: "border border-[#B71D1C]/40 bg-[#B71D1C] text-white",
        muted: "border border-[#10164F]/20 bg-[#EAEDFF] text-[#10164F]",
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
