"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import { Spinner } from "./spinner";
import styles from "./button.module.scss";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: "",
      disabled: "",
      secondary: styles.secondary,
      danger: styles.danger,
      loading: styles.loading,
    },
    size: {
      default: "",
      sm: styles.sm,
      lg: styles.lg,
    },
    loading: {
      true: styles.loading,
      false: "",
    },
    fullWidth: {
      true: "w-full md:min-w-40",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    loading: false,
    fullWidth: false,
  },
});

const buttonLoadingSizes: Record<"default" | "sm" | "lg", "sm" | "md"> = {
  default: "sm",
  sm: "sm",
  lg: "md",
};

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  type,
  variant,
  size = "default",
  loading,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  const spinnerSize =
    buttonLoadingSizes[size as keyof typeof buttonLoadingSizes];

  return (
    <button
      type={type}
      disabled={variant === "disabled" || loading || props.disabled}
      className={cn(
        buttonVariants({ variant, size, loading, fullWidth, className }),
      )}
      {...props}
    >
      {loading && (
        <Spinner
          className="mr-2 border-gray-100 border-t-white/30"
          size={spinnerSize}
        />
      )}
      {children}
    </button>
  );
}

Button.displayName = "Button";
export { Button, buttonVariants };
