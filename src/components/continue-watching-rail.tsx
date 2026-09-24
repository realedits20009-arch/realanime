"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useContinueWatching } from "@/hooks/use-anime-state";
import { hrefFor } from "@/lib/nav";
import { PosterArt } from "./anime-card";

export function ContinueWatchingRail() {
  const items = useContinueWatching();
  if (!items.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold sm:text-xl">
        <span className="mr-2 inline-block h-4 w-1 rounded-full bg-gold align-middle" />
        Continue Watching
      </h2>

      <div className="scrollbar-hide -mx-1 flex gap-4 overflow-x-auto px-1 pb-1">
        {items.map(({ anime, progress }) => {
          const ep = anime.episodes.find((e) => e.id === progress.episodeId);
          return (
            <Link
              key={anime.id}
              href={hrefFor({
                kind: "detail",
                animeId: anime.id,
                episode: progress.episodeId,
              })}
              className="group w-[260px] shrink-0 overflow-hidden rounded-xl border border-border bg-card hover:border-gold/60"
            >
              <div className="relative aspect-video">
                <PosterArt anime={anime} className="h-full w-full" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex size-11 items-center justify-center rounded-full bg-gold text-black">
                    <Play className="size-5 fill-current" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
                  <span
                    className="block h-full bg-gold"
                    style={{ width: `${Math.round(progress.percent)}%` }}
                  />
                </span>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold group-hover:text-gold">
                  {anime.title}
                </p>
                <p className="text-xs text-muted">
                  {ep ? `Episode ${ep.number}` : "Resume"} ·{" "}
                  {Math.round(progress.percent)}% watched
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
