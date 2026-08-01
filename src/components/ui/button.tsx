import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-black shadow-gold hover:shadow-[0_0_34px_rgba(255,199,44,0.75)] hover:brightness-105",
        pitch:
          "bg-pitch text-white shadow-neon-green hover:shadow-[0_0_32px_rgba(0,160,153,0.7)] hover:brightness-110",
        gold: "bg-gold text-black shadow-gold hover:brightness-105",
        outline:
          "border border-white/30 bg-black/30 text-white backdrop-blur hover:border-gold hover:text-gold",
        ghost: "text-foreground/80 hover:bg-foreground/10 hover:text-foreground",
        secondary: "bg-fifa-blue text-white hover:brightness-110",
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
