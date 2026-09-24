"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Info, Play, Star } from "lucide-react";
import type { Anime } from "@/lib/types";
import { hrefFor } from "@/lib/nav";
import { PosterArt } from "./anime-card";

export function HeroSlider({ anime }: { anime: Anime[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (anime.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % anime.length), 7000);
    return () => clearInterval(t);
  }, [anime.length]);

  if (!anime.length) return null;
  const current = anime[index % anime.length];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="absolute inset-0">
        <PosterArt anime={current} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
      </div>

      <div
        key={current.id}
        className="animate-fade-up relative flex max-w-2xl flex-col gap-4 p-6 sm:p-10 md:py-16"
      >
        <span className="w-fit rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          #{index + 1} Spotlight
        </span>

        <h1 className="gold-gradient-text text-3xl font-black leading-tight sm:text-5xl">
          {current.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="flex items-center gap-1 font-semibold text-gold">
            <Star className="size-4 fill-current" /> {current.score.toFixed(1)}
          </span>
          <span>{current.type}</span>
          <span>{current.year}</span>
          <span>{current.episodes.length} episodes</span>
          <span className="rounded border border-border px-1.5 text-xs">
            {current.ageRating}
          </span>
        </div>

        <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {current.synopsis}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={hrefFor({ kind: "detail", animeId: current.id })}
            className="gold-gradient-bg flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            <Play className="size-4 fill-current" /> Watch now
          </Link>
          <Link
            href={hrefFor({ kind: "detail", animeId: current.id })}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:border-gold/60 hover:text-gold"
          >
            <Info className="size-4" /> Details
          </Link>
        </div>

        <div className="mt-2 flex gap-2">
          {anime.map((a, i) => (
            <button
              key={a.id}
              type="button"
              aria-label={`Show ${a.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index % anime.length ? "w-8 bg-gold" : "w-3 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
