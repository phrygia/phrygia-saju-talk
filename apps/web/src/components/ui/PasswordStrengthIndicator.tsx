import React from "react";
import {
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from "@/src/lib/password";
import { cn } from "@repo/ui/lib/utils";

export default function PasswordStrengthIndicator({
  strength,
  className = "",
}: {
  strength: number;
  className?: string;
}) {
  const getLabel = getPasswordStrengthLabel(strength);
  const labelColor = getPasswordStrengthColor(getLabel);

  return (
    <div className={cn("flex gap-[4px] items-center min-h-[10px]", className)}>
      {[1, 2, 3, 4].map((i) => (
        <div
          className="h-[3px] flex-1 rounded-sm bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.07)] overflow-hidden"
          key={i}
        >
          <div
            className="h-full rounded-sm transition-all w-0"
            style={{
              width: strength >= i ? "100%" : "0%",
              transition: "0.2s",
              backgroundColor: labelColor,
            }}
          />
        </div>
      ))}
      <div
        className="text-[10px] text-foreground-muted text-right"
        style={{
          color: labelColor,
        }}
      >
        {getLabel}
      </div>
    </div>
  );
}
