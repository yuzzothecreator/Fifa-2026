import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-black uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304FFD] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#304FFD] text-white shadow-[0_12px_28px_rgba(48,79,253,0.25)] hover:brightness-105",
        pitch:
          "bg-[#304FFD] text-white shadow-[0_12px_28px_rgba(48,79,253,0.25)] hover:brightness-105",
        gold: "bg-[#304FFD] text-white shadow-[0_12px_28px_rgba(48,79,253,0.25)] hover:brightness-105",
        outline:
          "border border-[#304FFD]/30 bg-white text-[#304FFD] hover:border-[#304FFD] hover:bg-[#304FFD]/5",
        ghost: "text-[#304FFD]/80 hover:bg-[#304FFD]/10 hover:text-[#304FFD]",
        secondary: "bg-white text-[#304FFD] border border-[#304FFD]/20 hover:bg-[#304FFD]/5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
