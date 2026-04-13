"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import styles from "./input.module.scss";

const inputVariants = cva(styles.input, {
  variants: {
    variant: {
      default: styles.default,
      error: styles.error,
      warning: styles.warning,
    },
    disabled: {
      true: styles.disabled,
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantProps<typeof inputVariants>["variant"];
  label?: string;
  labelRequired?: boolean;
  errorMessage?: string;
  warningMessage?: string;
  icon?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
  className,
  type,
  variant,
  label,
  labelRequired = false,
  errorMessage,
  warningMessage,
  icon,
  disabled,
  ref,
  ...props
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={props?.id}>
          {labelRequired && <span className={styles.required}>*</span>}
          {label}
        </label>
      )}
      <div className={icon ? styles.inputWrap : undefined}>
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(inputVariants({ variant, disabled, className }))}
          {...props}
        />
        {icon && <span className={styles.inputIcon}>{icon}</span>}
      </div>

      {variant === "error" && errorMessage && (
        <p className={cn(styles.text, styles.errorText)}>{errorMessage}</p>
      )}
      {variant === "warning" && warningMessage && (
        <p className={cn(styles.text, styles.warningText)}>{warningMessage}</p>
      )}
    </div>
  );
};

export { Input, inputVariants };
