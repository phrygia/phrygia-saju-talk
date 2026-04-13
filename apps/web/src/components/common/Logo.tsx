import React from "react";

export default function Logo({
  className = "",
  fill = "var(--foreground)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      width="130"
      height="18"
      viewBox="0 0 130 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="61"
        y="13"
        fontFamily="Helvetica Neue, Arial, sans-serif"
        fontSize="15"
        fill={fill}
        textAnchor="middle"
        letterSpacing="5"
      >
        SAJU TALK
      </text>
    </svg>
  );
}
