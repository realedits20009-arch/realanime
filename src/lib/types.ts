export type AnimeType = "TV" | "Movie" | "OVA" | "ONA" | "Special";
export type AiringStatus = "Airing" | "Completed" | "Upcoming";
export type AgeRating = "G" | "PG" | "PG-13" | "R" | "R+";

export interface VideoSource {
  quality: "4K" | "1080p" | "720p" | "480p" | "360p";
  label: string;
  url: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  sub: boolean;
  dub: boolean;
  sources: VideoSource[];
}

export interface Anime {
  id: string;
  title: string;
  altTitle?: string;
  synopsis: string;
  genres: string[];
  type: AnimeType;
  studio: string;
  year: number;
  status: AiringStatus;
  score: number;
  ageRating: AgeRating;
  popularityRank: number;
  trailerUrl?: string;
  accent: string;
  featured?: boolean;
  trending?: boolean;
  topAiring?: boolean;
  episodes: Episode[];
}

export interface WatchProgress {
  animeId: string;
  episodeId: string;
  percent: number;
  updatedAt: number;
}
