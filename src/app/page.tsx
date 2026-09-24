"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimeCard } from "@/components/anime-card";
import { DetailView } from "@/components/detail-view";
import { HomeView } from "@/components/home-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalog, getWatchlist, search, subscribe } from "@/lib/anime-store";
import { hrefFor, viewFromParams } from "@/lib/nav";
import { SEED_ANIME } from "@/lib/seed-data";

function CatalogPage() {
  const router = useRouter();
  const params = useSearchParams();
  const view = viewFromParams(params);
  const [catalog, setCatalog] = useState(SEED_ANIME);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    setCatalog(getCatalog());
    setWatchlist(getWatchlist());
    return subscribe(() => {
      setCatalog(getCatalog());
      setWatchlist(getWatchlist());
    });
  }, []);

  let content: React.ReactNode;
  if (view.kind === "home") {
    content = <HomeView catalog={catalog} />;
  } else if (view.kind === "detail") {
    const anime = catalog.find((item) => item.id === view.animeId);
    content = anime ? (
      <DetailView
        key={anime.id}
        anime={anime}
        episodeId={view.episode}
        onSelectEpisode={(episode) => router.push(hrefFor({ kind: "detail", animeId: anime.id, episode }))}
      />
    ) : <p>Anime not found.</p>;
  } else {
    const title = view.kind === "genre" ? view.genre : view.kind === "search" ? `Results for “${view.query}”` : view.kind === "watchlist" ? "Your Watchlist" : "Admin";
    const items = view.kind === "genre"
      ? catalog.filter((anime) => anime.genres.includes(view.genre))
      : view.kind === "search"
        ? search(view.query)
        : view.kind === "watchlist"
          ? catalog.filter((anime) => watchlist.includes(anime.id))
          : [];
    content = (
      <section className="min-h-[50vh]">
        <h1 className="mb-6 text-3xl font-black">{title}</h1>
        {items.length ? (
          <div className="flex flex-wrap gap-5">
            {items.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
          </div>
        ) : (
          <p className="text-muted">{view.kind === "admin" ? "The admin upload panel is not available yet." : "No anime found."}</p>
        )}
      </section>
    );
  }

  return (
    <>
      <SiteHeader
        query={view.kind === "search" ? view.query : ""}
        onSearch={(value) => router.replace(value.trim() ? hrefFor({ kind: "search", query: value }) : "/")}
      />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-8">{content}</main>
      <SiteFooter />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CatalogPage />
    </Suspense>
  );
}
