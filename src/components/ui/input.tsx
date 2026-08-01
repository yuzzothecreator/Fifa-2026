import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-full border-2 border-[#10164F]/22 bg-white px-5 py-2 text-sm font-semibold text-[#10164F] placeholder:text-[#10164F]/55 transition-colors focus-visible:border-[#304FFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304FFE]/35 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
