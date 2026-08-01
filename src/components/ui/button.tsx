import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-black uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#304FFD] shadow-[0_12px_28px_rgba(0,0,0,0.2)] hover:bg-white/90",
        pitch:
          "bg-white text-[#304FFD] shadow-[0_12px_28px_rgba(0,0,0,0.2)] hover:bg-white/90",
        gold: "bg-white text-[#304FFD] shadow-[0_12px_28px_rgba(0,0,0,0.2)] hover:bg-white/90",
        outline:
          "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
        secondary: "bg-white/15 text-white border border-white/25 hover:bg-white/25",
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
