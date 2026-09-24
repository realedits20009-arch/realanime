"use client";

import { useEffect, useState } from "react";
import {
  continueWatching,
  getWatchlist,
  isSaved,
  subscribe,
} from "@/lib/anime-store";

/** Subscribes to localStorage-backed store updates after hydration. */
function useStore<T>(read: () => T, initial: T): T {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    setValue(read());
    return subscribe(() => setValue(read()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export function useWatchlist() {
  return useStore(getWatchlist, [] as string[]);
}

export function useIsSaved(id: string) {
  return useStore(() => isSaved(id), false);
}

export function useContinueWatching() {
  return useStore(continueWatching, [] as ReturnType<typeof continueWatching>);
}
