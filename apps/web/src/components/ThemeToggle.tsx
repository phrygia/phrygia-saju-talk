"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <div>
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-9 h-9 rounded-md border border-[rgba(124,92,252,0.2)] text-violet text-base flex items-center justify-center transition-all bg-[rgba(124,92,252,0.1)] hover:bg-[rgba(124,92,252,0.2)]"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
