"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "saju_search_history";
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      //
    }
  }, []);

  const save = useCallback((histories: string[]) => {
    setHistory(histories);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
  }, []);

  const addHistory = useCallback((keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const deduplicated = prev.filter((item) => item !== trimmed);
      const next = [trimmed, ...deduplicated].slice(0, MAX_HISTORY);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, []);

  const removeHistory = useCallback(
    (keyword: string) => {
      const next = history.filter((item) => item !== keyword);

      save(next);
    },
    [history, save],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);

    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addHistory, removeHistory, clearHistory };
}
