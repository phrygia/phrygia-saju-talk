"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import inputStyles from "./input.module.scss";
import styles from "./radio.module.scss";

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> {
  name: string;
  options: RadioOption[];
  label?: string;
  labelRequired?: boolean;
  value?: string;
  defaultValue?: string;
  direction?: "vertical" | "horizontal";
  onValueChange?: (value: string) => void;
}

const RadioGroup = ({
  className,
  name,
  options,
  label,
  labelRequired = false,
  value,
  defaultValue,
  direction = "vertical",
  onValueChange,
  disabled = false,
  ...props
}: RadioGroupProps) => {
  const groupId = React.useId();
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = value ?? internalValue;

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <fieldset
      className={cn(styles.wrapper, className)}
      disabled={disabled}
      {...props}
    >
      {label && (
        <legend className={inputStyles.label}>
          {labelRequired && <span className={inputStyles.requiredMark}>*</span>}
          {label}
        </legend>
      )}

      <div
        className={cn(
          styles.group,
          direction === "horizontal" ? styles.horizontal : styles.vertical,
        )}
      >
        {options.map((option) => {
          const normalizedValue = option.value
            .replace(/\s+/g, "-")
            .toLowerCase();
          const optionId = `${name}-${groupId.replace(/:/g, "")}-${normalizedValue}`;
          const isDisabled = disabled || option.disabled;
          return (
            <div key={option.value} className={styles.option}>
              <input
                id={optionId}
                className={styles.input}
                type="radio"
                name={name}
                value={option.value}
                checked={currentValue === option.value}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
              />
              <label htmlFor={optionId} className={styles.optionLabel}>
                <span className={styles.indicator} aria-hidden="true" />
                <span className={styles.content}>
                  <span className={styles.text}>{option.label}</span>
                  {option.description && (
                    <span className={styles.description}>
                      {option.description}
                    </span>
                  )}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

RadioGroup.displayName = "RadioGroup";
export { RadioGroup };
