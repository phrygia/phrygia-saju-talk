"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import styles from "./select.module.scss";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  labelRequired?: boolean;
  ref?: React.Ref<HTMLSelectElement>;
}

const Select = ({
  className,
  children,
  label,
  labelRequired = false,
  ref,
  ...props
}: SelectProps) => (
  <div className={styles.wrapper}>
    {label && (
      <label htmlFor={props?.id} className={styles.label}>
        {labelRequired && <span className={styles.required}>*</span>}
        {label}
      </label>
    )}
    <select ref={ref} className={cn(styles.select, className)} {...props}>
      {children}
    </select>
  </div>
);

Select.displayName = "Select";
export { Select };
export { styles as selectStyles };
