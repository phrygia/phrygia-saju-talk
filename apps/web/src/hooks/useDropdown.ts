import { useState, useCallback } from "react";

export function useToggleSet<T>() {
  const [set, setSet] = useState<T[]>([]);

  const toggle = useCallback((item: T) => {
    setSet((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  }, []);

  const has = useCallback((item: T) => set.includes(item), [set]);

  return { has, toggle };
}
