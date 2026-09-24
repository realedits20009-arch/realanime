"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, Play, Star } from "lucide-react";
import type { Anime } from "@/lib/types";
import { toggleWatchlist } from "@/lib/anime-store";
import { useIsSaved } from "@/hooks/use-anime-state";
import { hrefFor } from "@/lib/nav";

export function PosterArt({
  anime,
  className = "",
}: {
  anime: Anime;
  className?: string;
}) {
  const initials = anime.title
    .split(" ")
    .slice(0, 3)
    .map((w) => w[0])
    .join("");
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 0%, ${anime.accent}55 0%, #0b0a08 70%)`,
      }}
    >
      <span
        className="text-4xl font-black tracking-tight opacity-70"
        style={{ color: anime.accent }}
      >
        {initials}
      </span>
    </div>
  );
}

export function AnimeCard({ anime }: { anime: Anime }) {
  const saved = useIsSaved(anime.id);

  return (
    <div className="group w-[160px] shrink-0 sm:w-[184px]">
      <Link
        href={hrefFor({ kind: "detail", animeId: anime.id })}
        className="relative block aspect-[2/3] overflow-hidden rounded-xl border border-border bg-card transition-colors group-hover:border-gold/60"
      >
        <PosterArt anime={anime} className="h-full w-full" />

        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-gold backdrop-blur">
          <Star className="size-3 fill-current" />
          {anime.score.toFixed(1)}
        </span>

        <span className="absolute right-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted backdrop-blur">
          {anime.type}
        </span>

        <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex size-12 items-center justify-center rounded-full bg-gold text-black">
            <Play className="size-5 fill-current" />
          </span>
        </span>

        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-8 text-[11px] text-muted">
          {anime.episodes.length} eps · {anime.year}
        </span>
      </Link>

      <div className="mt-2 flex items-start gap-2">
        <Link
          href={hrefFor({ kind: "detail", animeId: anime.id })}
          className="line-clamp-2 flex-1 text-sm font-semibold leading-snug hover:text-gold"
        >
          {anime.title}
        </Link>
        <button
          type="button"
          aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
          onClick={() => toggleWatchlist(anime.id)}
          className="mt-0.5 text-muted hover:text-gold"
        >
          {saved ? (
            <BookmarkCheck className="size-4 text-gold" />
          ) : (
            <Bookmark className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
