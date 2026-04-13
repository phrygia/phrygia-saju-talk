"use client";

import * as React from "react";
import { cn } from "../lib/utils";
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
}

function Skeleton({ className, rounded = false, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse w-full h-full bg-[linear-gradient(90deg,rgba(139,92,246,0.08)_0%,rgba(139,92,246,0.22)_50%,rgba(139,92,246,0.08)_100%)]",
        rounded ? "rounded-full" : "rounded-sm",
        className,
      )}
      {...props}
    />
  );
}
export { Skeleton };
