"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  Youtube,
} from "lucide-react";
import type { Anime } from "@/lib/types";
import { related, saveProgress, toggleWatchlist } from "@/lib/anime-store";
import { useIsSaved } from "@/hooks/use-anime-state";
import { hrefFor } from "@/lib/nav";
import { AnimeRail } from "./anime-rail";
import { PosterArt } from "./anime-card";
import { VideoPlayer } from "./video-player";

export function DetailView({
  anime,
  episodeId,
  onSelectEpisode,
}: {
  anime: Anime;
  episodeId?: string;
  onSelectEpisode: (id: string) => void;
}) {
  const saved = useIsSaved(anime.id);
  const [localEp, setLocalEp] = useState(episodeId ?? anime.episodes[0]?.id);
  const activeId = episodeId ?? localEp;
  const index = Math.max(
    0,
    anime.episodes.findIndex((e) => e.id === activeId),
  );
  const episode = anime.episodes[index];
  const recommendations = useMemo(() => related(anime), [anime]);

  function select(id: string) {
    setLocalEp(id);
    onSelectEpisode(id);
  }

  const info: [string, string][] = [
    ["Type", anime.type],
    ["Studio", anime.studio],
    ["Year", String(anime.year)],
    ["Status", anime.status],
    ["Score", anime.score.toFixed(1)],
    ["Rating", anime.ageRating],
    ["Popularity", `#${anime.popularityRank}`],
    ["Episodes", String(anime.episodes.length)],
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4">
          {episode ? (
            <VideoPlayer
              episode={episode}
              onProgress={(percent) =>
                saveProgress({ animeId: anime.id, episodeId: episode.id, percent })
              }
            />
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black sm:text-3xl">{anime.title}</h1>
              <p className="text-sm text-muted">
                {episode ? `Episode ${episode.number} · ${episode.title}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => select(anime.episodes[index - 1].id)}
                className="flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold disabled:opacity-40 enabled:hover:border-gold/60 enabled:hover:text-gold"
              >
                <ChevronLeft className="size-4" /> Prev
              </button>
              <button
                type="button"
                disabled={index >= anime.episodes.length - 1}
                onClick={() => select(anime.episodes[index + 1].id)}
                className="flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold disabled:opacity-40 enabled:hover:border-gold/60 enabled:hover:text-gold"
              >
                Next <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <aside className="flex max-h-[520px] flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3 text-sm font-bold">
            Episodes{" "}
            <span className="text-muted">({anime.episodes.length})</span>
          </div>
          <div className="scrollbar-gold flex-1 overflow-y-auto">
            {anime.episodes.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => select(e.id)}
                className={`flex w-full items-center gap-3 border-b border-border px-3 py-2.5 text-left hover:bg-surface ${
                  e.id === activeId ? "bg-surface" : ""
                }`}
              >
                <PosterArt
                  anime={anime}
                  className="h-11 w-16 shrink-0 rounded-md"
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold ${
                      e.id === activeId ? "text-gold" : ""
                    }`}
                  >
                    {e.number}. {e.title}
                  </span>
                  <span className="block text-xs text-muted">
                    {e.duration} · {e.sub ? "SUB" : ""}
                    {e.sub && e.dub ? " / " : ""}
                    {e.dub ? "DUB" : ""} · {e.sources.length} servers
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <section className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <PosterArt
          anime={anime}
          className="aspect-[2/3] w-full max-w-[200px] rounded-xl border border-border"
        />
        <div className="flex flex-col gap-4">
          {anime.altTitle ? (
            <p className="text-sm text-muted">{anime.altTitle}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 font-bold text-gold">
              <Star className="size-4 fill-current" /> {anime.score.toFixed(1)}
            </span>
            <button
              type="button"
              onClick={() => toggleWatchlist(anime.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${
                saved
                  ? "gold-gradient-bg text-black"
                  : "border border-border bg-surface hover:border-gold/60 hover:text-gold"
              }`}
            >
              {saved ? (
                <BookmarkCheck className="size-4" />
              ) : (
                <Bookmark className="size-4" />
              )}
              {saved ? "In watchlist" : "Add to watchlist"}
            </button>
            {anime.trailerUrl ? (
              <a
                href={anime.trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold hover:border-gold/60 hover:text-gold"
              >
                <Youtube className="size-4" /> Trailer
              </a>
            ) : null}
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            {anime.synopsis}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
            {info.map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="text-xs uppercase tracking-wide text-muted">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-2">
            {anime.genres.map((g) => (
              <Link
                key={g}
                href={hrefFor({ kind: "genre", genre: g })}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted hover:border-gold/60 hover:text-gold"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AnimeRail title="Related anime" anime={recommendations} />
    </div>
  );
}
