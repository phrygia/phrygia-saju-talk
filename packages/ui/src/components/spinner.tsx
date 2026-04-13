"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-border border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-5 w-5",
        lg: "h-7 w-7",
        xl: "h-11 w-11",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner };
