import { useEffect } from "react";

export function useEscape(onEscape: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onEscape();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEscape, enabled]);
}
