"use client";

import type { Anime, WatchProgress } from "./types";
import { ALL_GENRES, SEED_ANIME } from "./seed-data";

const UPLOADS_KEY = "realanime.uploads";
const WATCHLIST_KEY = "realanime.watchlist";
const PROGRESS_KEY = "realanime.progress";

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  listeners.forEach((l) => l());
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode — ignore */
  }
  emit();
}

/* ---------- catalog ---------- */

export function getUploads(): Anime[] {
  return read<Anime[]>(UPLOADS_KEY, []);
}

export function addUpload(anime: Anime) {
  write(UPLOADS_KEY, [anime, ...getUploads().filter((a) => a.id !== anime.id)]);
}

export function getCatalog(): Anime[] {
  return [...getUploads(), ...SEED_ANIME];
}

export function getAnime(id: string): Anime | undefined {
  return getCatalog().find((a) => a.id === id);
}

export const genres = ALL_GENRES;

export function byGenre(genre: string, catalog = getCatalog()) {
  return catalog.filter((a) => a.genres.includes(genre));
}

export function featured(catalog = getCatalog()) {
  const list = catalog.filter((a) => a.featured);
  return list.length ? list : catalog.slice(0, 3);
}

export function trending(catalog = getCatalog()) {
  return catalog.filter((a) => a.trending);
}

export function topAiring(catalog = getCatalog()) {
  return catalog.filter((a) => a.topAiring || a.status === "Airing");
}

export function recentlyAdded(catalog = getCatalog()) {
  return [...catalog].sort((a, b) => b.year - a.year);
}

export function related(anime: Anime, catalog = getCatalog()) {
  return catalog
    .filter((a) => a.id !== anime.id)
    .map((a) => {
      const shared = a.genres.filter((g) => anime.genres.includes(g)).length;
      const studio = a.studio === anime.studio ? 2 : 0;
      const type = a.type === anime.type ? 1 : 0;
      return { a, weight: shared * 3 + studio + type };
    })
    .sort((x, y) => y.weight - x.weight || y.a.score - x.a.score)
    .slice(0, 8)
    .map((x) => x.a);
}

export type SortKey = "relevance" | "score" | "newest" | "az";

export function search(
  query: string,
  opts: { genre?: string; type?: string; sort?: SortKey } = {},
) {
  const q = query.trim().toLowerCase();
  let list = getCatalog().filter((a) => {
    if (opts.genre && !a.genres.includes(opts.genre)) return false;
    if (opts.type && a.type !== opts.type) return false;
    if (!q) return true;
    return [a.title, a.altTitle ?? "", a.studio, ...a.genres]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  switch (opts.sort ?? "relevance") {
    case "score":
      list = [...list].sort((a, b) => b.score - a.score);
      break;
    case "newest":
      list = [...list].sort((a, b) => b.year - a.year);
      break;
    case "az":
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      list = [...list].sort((a, b) => a.popularityRank - b.popularityRank);
  }
  return list;
}

/* ---------- watchlist ---------- */

export function getWatchlist(): string[] {
  return read<string[]>(WATCHLIST_KEY, []);
}

export function isSaved(id: string) {
  return getWatchlist().includes(id);
}

export function toggleWatchlist(id: string) {
  const list = getWatchlist();
  write(
    WATCHLIST_KEY,
    list.includes(id) ? list.filter((x) => x !== id) : [id, ...list],
  );
}

/* ---------- continue watching ---------- */

export function getProgress(): WatchProgress[] {
  return read<WatchProgress[]>(PROGRESS_KEY, []);
}

export function progressFor(animeId: string) {
  return getProgress().find((p) => p.animeId === animeId);
}

export function saveProgress(entry: Omit<WatchProgress, "updatedAt">) {
  const rest = getProgress().filter((p) => p.animeId !== entry.animeId);
  write(PROGRESS_KEY, [{ ...entry, updatedAt: Date.now() }, ...rest].slice(0, 20));
}

export function continueWatching() {
  const catalog = getCatalog();
  return getProgress()
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map((p) => ({ progress: p, anime: catalog.find((a) => a.id === p.animeId) }))
    .filter((x): x is { progress: WatchProgress; anime: Anime } => !!x.anime);
}

export function exportCatalog() {
  return JSON.stringify(getCatalog(), null, 2);
}
