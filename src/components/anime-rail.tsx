"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Anime } from "@/lib/types";
import { AnimeCard } from "./anime-card";

export function AnimeRail({
  title,
  anime,
  moreHref,
}: {
  title: string;
  anime: Anime[];
  moreHref?: string;
}) {
  if (!anime.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold sm:text-xl">
          <span className="mr-2 inline-block h-4 w-1 rounded-full bg-gold align-middle" />
          {title}
        </h2>
        {moreHref ? (
          <Link
            href={moreHref}
            className="flex items-center gap-1 text-sm text-muted hover:text-gold"
          >
            View all <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </div>

      <div className="scrollbar-hide -mx-1 flex gap-4 overflow-x-auto px-1 pb-1">
        {anime.map((a) => (
          <AnimeCard key={a.id} anime={a} />
        ))}
      </div>
    </section>
  );
}
