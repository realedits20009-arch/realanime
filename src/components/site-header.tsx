"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Search, Shield } from "lucide-react";
import { useWatchlist } from "@/hooks/use-anime-state";
import { hrefFor } from "@/lib/nav";

export function SiteHeader({
  query = "",
  onSearch,
}: {
  query?: string;
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState(query);
  const watchlist = useWatchlist();

  useEffect(() => setValue(query), [query]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:gap-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="gold-gradient-bg flex size-8 items-center justify-center rounded-lg text-base font-black text-black">
            R
          </span>
          <span className="hidden text-lg font-black tracking-tight sm:block">
            REAL<span className="text-gold">ANIME</span>
          </span>
        </Link>

        <form
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(value);
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search anime, studios, genres…"
            aria-label="Search anime"
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:border-gold/60"
          />
        </form>

        <Link
          href={hrefFor({ kind: "watchlist" })}
          className="relative flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold hover:border-gold/60 hover:text-gold"
        >
          <Bookmark className="size-4" />
          <span className="hidden sm:inline">Watchlist</span>
          {watchlist.length > 0 ? (
            <span className="ml-1 rounded-full bg-gold px-1.5 text-xs font-bold text-black">
              {watchlist.length}
            </span>
          ) : null}
        </Link>

        <Link
          href={hrefFor({ kind: "admin" })}
          aria-label="Admin panel"
          className="rounded-lg border border-border bg-surface p-2 text-muted hover:border-gold/60 hover:text-gold"
        >
          <Shield className="size-4" />
        </Link>
      </div>
    </header>
  );
}
