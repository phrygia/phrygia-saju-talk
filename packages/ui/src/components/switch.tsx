"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import styles from "./switch.module.scss";

const switchVariants = cva(styles.switch, {
  variants: {
    disabled: {
      true: "",
    },
    size: {
      sm: styles.small,
      md: "",
    },
  },
  defaultVariants: {
    disabled: false,
    size: "md",
  },
});

export interface SwitchProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof switchVariants> {
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
}

function Switch({
  id,
  className,
  size = "md",
  disabled = false,
  checkedChildren,
  unCheckedChildren,
  ...props
}: SwitchProps) {
  const reactId = React.useId();
  const inputId = id ?? `switch-${reactId.replace(/:/g, "")}`;

  return (
    <div className={cn(switchVariants({ size, disabled }), className)}>
      <input
        type="checkbox"
        id={inputId}
        disabled={disabled}
        className={styles.input}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(styles.label, disabled && styles.disabled)}
      >
        {checkedChildren && (
          <div className={cn(styles.stateLabel, styles.stateLabelOn)}>
            {checkedChildren}
          </div>
        )}
        {unCheckedChildren && (
          <div className={cn(styles.stateLabel, styles.stateLabelOff)}>
            {unCheckedChildren}
          </div>
        )}
      </label>
    </div>
  );
}

export { Switch, switchVariants };
