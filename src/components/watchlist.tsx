import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "rp-watchlist-demo";

type Ctx = {
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => boolean;
};

const WatchlistContext = createContext<Ctx | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* demo-only storage */
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    let nowSaved = false;
    setSaved((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      nowSaved = next.includes(slug);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* demo-only storage */
      }
      return next;
    });
    return nowSaved;
  }, []);

  const value = useMemo<Ctx>(
    () => ({ saved, isSaved: (slug) => saved.includes(slug), toggle }),
    [saved, toggle],
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
