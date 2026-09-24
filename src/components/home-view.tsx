"use client";

import Link from "next/link";
import type { Anime } from "@/lib/types";
import {
  byGenre,
  featured,
  genres,
  recentlyAdded,
  topAiring,
  trending,
} from "@/lib/anime-store";
import { hrefFor } from "@/lib/nav";
import { HeroSlider } from "./hero-slider";
import { AnimeRail } from "./anime-rail";
import { ContinueWatchingRail } from "./continue-watching-rail";

export function HomeView({ catalog }: { catalog: Anime[] }) {
  const genreRails = genres.slice(0, 5);

  return (
    <div className="flex flex-col gap-10">
      <HeroSlider anime={featured(catalog).slice(0, 5)} />
      <ContinueWatchingRail />
      <AnimeRail title="Trending Now" anime={trending(catalog)} />
      <AnimeRail title="Top Airing" anime={topAiring(catalog)} />
      <AnimeRail title="Recently Added" anime={recentlyAdded(catalog).slice(0, 12)} />

      {genreRails.map((g) => (
        <AnimeRail
          key={g}
          title={g}
          anime={byGenre(g, catalog)}
          moreHref={hrefFor({ kind: "genre", genre: g })}
        />
      ))}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold sm:text-xl">
          <span className="mr-2 inline-block h-4 w-1 rounded-full bg-gold align-middle" />
          Browse by Genre
        </h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <Link
              key={g}
              href={hrefFor({ kind: "genre", genre: g })}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted hover:border-gold/60 hover:text-gold"
            >
              {g}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
