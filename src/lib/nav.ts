"use client";

export type View =
  | { kind: "home" }
  | { kind: "detail"; animeId: string; episode?: string }
  | { kind: "genre"; genre: string }
  | { kind: "search"; query: string }
  | { kind: "watchlist" }
  | { kind: "admin" };

export function viewFromParams(params: URLSearchParams): View {
  const anime = params.get("anime");
  if (anime) return { kind: "detail", animeId: anime, episode: params.get("ep") ?? undefined };
  const genre = params.get("genre");
  if (genre) return { kind: "genre", genre };
  const q = params.get("q");
  if (q) return { kind: "search", query: q };
  if (params.get("watchlist")) return { kind: "watchlist" };
  if (params.get("admin")) return { kind: "admin" };
  return { kind: "home" };
}

export function hrefFor(view: View): string {
  switch (view.kind) {
    case "detail":
      return `/?anime=${encodeURIComponent(view.animeId)}${
        view.episode ? `&ep=${encodeURIComponent(view.episode)}` : ""
      }`;
    case "genre":
      return `/?genre=${encodeURIComponent(view.genre)}`;
    case "search":
      return `/?q=${encodeURIComponent(view.query)}`;
    case "watchlist":
      return "/?watchlist=1";
    case "admin":
      return "/?admin=1";
    default:
      return "/";
  }
}
