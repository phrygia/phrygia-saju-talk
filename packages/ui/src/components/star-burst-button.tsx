"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import styles from "./star-burst-button.module.scss";

const SYMBOLS = ["✦", "✧", "★", "·", "*", "✶"];
const VARIANT_COLORS: Record<string, string[]> = {
  default: ["#a78bfa", "#c4b5fd", "#f0c060", "#e0d0ff"],
  secondary: ["#a78bfa", "#c4b5fd", "#f0c060", "#7c5cfc"],
  gold: ["#f0c060", "#fbbf24", "#fde68a", "#d97706"],
  ghost: ["#a78bfa", "#c4b5fd", "#e0d0ff", "#f0c060"],
};
const PARTICLE_COUNT = 8;

const starBurstButtonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: "",
      secondary: styles.secondary,
      gold: styles.gold,
      ghost: styles.ghost,
    },
    size: {
      default: "",
      sm: styles.sm,
      lg: styles.lg,
    },
    fullWidth: {
      true: styles.fullWidth,
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    fullWidth: false,
  },
});

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

export interface StarBurstButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof starBurstButtonVariants> {
  particleCount?: number;
}

function StarBurstButton({
  className,
  variant = "default",
  size = "default",
  fullWidth,
  particleCount = PARTICLE_COUNT,
  onClick,
  children,
  disabled,
  ...props
}: StarBurstButtonProps) {
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const counterRef = React.useRef(0);

  const particleClass = cn(
    styles.particle,
    size === "sm" && styles.particleSm,
    size === "lg" && styles.particleLg,
  );
  const colors: string[] =
    VARIANT_COLORS[variant ?? "default"] ?? VARIANT_COLORS["default"]!;

  const handleButtonEffect = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        (_, i) => {
          const angle = (i / particleCount) * Math.PI * 2;
          const dist = 20 + Math.random() * 18;
          return {
            id: ++counterRef.current,
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] ?? "✦",
            color:
              colors[Math.floor(Math.random() * colors.length)] ?? "#a78bfa",
          };
        },
      );

      setParticles((prev) => [...prev, ...newParticles]);

      const ids = new Set(newParticles.map((p) => p.id));

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
      }, 750);
    },
    [disabled, particleCount, colors],
  );

  return (
    <button
      disabled={disabled}
      className={cn(
        "outline-none",
        starBurstButtonVariants({ variant, size, fullWidth, className }),
      )}
      onMouseEnter={handleButtonEffect}
      onClick={(e) => {
        if (onClick) onClick?.(e);
      }}
      {...props}
    >
      {children}

      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={particleClass}
          style={{ left: p.x, top: p.y, color: p.color }}
        >
          {p.symbol}
        </span>
      ))}
    </button>
  );
}

StarBurstButton.displayName = "StarBurstButton";
export { StarBurstButton, starBurstButtonVariants };
