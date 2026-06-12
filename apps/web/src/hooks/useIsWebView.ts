import { useEffect, useState } from "react";

export function useIsWebView() {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    setIsWebView(typeof window !== "undefined" && "ReactNativeWebView" in window);
  }, []);

  return isWebView;
}
