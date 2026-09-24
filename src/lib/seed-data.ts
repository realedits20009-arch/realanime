import type { Anime, Episode } from "./types";

const TEST_MP4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

function makeEpisodes(animeId: string, count: number, dubFrom = 1): Episode[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      id: `${animeId}-ep-${n}`,
      number: n,
      title: `Episode ${n}`,
      duration: "24m",
      sub: true,
      dub: n >= dubFrom,
      sources: [
        { quality: "1080p", label: "Server 1 · HD", url: TEST_MP4 },
        { quality: "720p", label: "Server 2 · SD", url: TEST_MP4 },
        { quality: "480p", label: "Server 3 · Low", url: TEST_MP4 },
      ],
    } satisfies Episode;
  });
}

type Seed = Omit<Anime, "episodes"> & { episodeCount: number };

const seeds: Seed[] = [
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    altTitle: "呪術廻戦",
    synopsis:
      "Yuji Itadori swallows a cursed finger to save a friend and becomes the host of the King of Curses. Now enrolled at Jujutsu High, he fights curses while racing to collect every last finger.",
    genres: ["Action", "Supernatural", "Shounen"],
    type: "TV",
    studio: "MAPPA",
    year: 2020,
    status: "Airing",
    score: 8.7,
    ageRating: "R",
    popularityRank: 1,
    trailerUrl: "https://www.youtube.com/watch?v=pkKu9hLT-t8",
    accent: "#a855f7",
    featured: true,
    trending: true,
    topAiring: true,
    episodeCount: 12,
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    altTitle: "Kimetsu no Yaiba",
    synopsis:
      "After his family is slaughtered and his sister turned into a demon, Tanjiro Kamado joins the Demon Slayer Corps to find a cure and cut down the demon who ruined his life.",
    genres: ["Action", "Historical", "Supernatural"],
    type: "TV",
    studio: "ufotable",
    year: 2019,
    status: "Airing",
    score: 8.6,
    ageRating: "R",
    popularityRank: 2,
    accent: "#22d3ee",
    featured: true,
    trending: true,
    topAiring: true,
    episodeCount: 10,
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    altTitle: "Shingeki no Kyojin",
    synopsis:
      "Humanity hides behind concentric walls from man-eating Titans. When the outermost wall falls, Eren Yeager vows to kill every Titan and learn the truth buried in his basement.",
    genres: ["Action", "Drama", "Mystery"],
    type: "TV",
    studio: "WIT Studio",
    year: 2013,
    status: "Completed",
    score: 9.0,
    ageRating: "R+",
    popularityRank: 3,
    accent: "#ef4444",
    featured: true,
    trending: true,
    episodeCount: 12,
  },
  {
    id: "one-piece",
    title: "One Piece",
    altTitle: "ワンピース",
    synopsis:
      "Monkey D. Luffy sails the Grand Line with a crew of misfits, chasing the legendary treasure that will crown him King of the Pirates.",
    genres: ["Action", "Adventure", "Comedy", "Shounen"],
    type: "TV",
    studio: "Toei Animation",
    year: 1999,
    status: "Airing",
    score: 8.9,
    ageRating: "PG-13",
    popularityRank: 4,
    accent: "#f59e0b",
    trending: true,
    topAiring: true,
    episodeCount: 14,
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    altTitle: "チェンソーマン",
    synopsis:
      "Denji is a broke devil hunter with a chainsaw devil for a heart. Recruited by Public Safety, he chases a normal life one bloody contract at a time.",
    genres: ["Action", "Supernatural", "Comedy"],
    type: "TV",
    studio: "MAPPA",
    year: 2022,
    status: "Completed",
    score: 8.5,
    ageRating: "R+",
    popularityRank: 5,
    accent: "#fb7185",
    trending: true,
    episodeCount: 12,
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    altTitle: "スパイファミリー",
    synopsis:
      "Master spy Twilight builds a fake family to get close to a target — unaware his wife is an assassin and his daughter reads minds.",
    genres: ["Comedy", "Action", "Slice of Life"],
    type: "TV",
    studio: "Wit Studio",
    year: 2022,
    status: "Airing",
    score: 8.4,
    ageRating: "PG-13",
    popularityRank: 6,
    accent: "#34d399",
    topAiring: true,
    episodeCount: 10,
  },
  {
    id: "your-name",
    title: "Your Name",
    altTitle: "Kimi no Na wa",
    synopsis:
      "Two teenagers living far apart begin swapping bodies in their sleep, and a comet's arrival turns their strange bond into a race against time.",
    genres: ["Romance", "Drama", "Supernatural"],
    type: "Movie",
    studio: "CoMix Wave Films",
    year: 2016,
    status: "Completed",
    score: 8.8,
    ageRating: "PG",
    popularityRank: 7,
    accent: "#60a5fa",
    episodeCount: 1,
  },
  {
    id: "naruto-shippuden",
    title: "Naruto Shippuden",
    altTitle: "ナルト 疾風伝",
    synopsis:
      "Naruto returns to the Hidden Leaf stronger than ever, standing between his village and the Akatsuki as war looms over the ninja world.",
    genres: ["Action", "Adventure", "Shounen"],
    type: "TV",
    studio: "Pierrot",
    year: 2007,
    status: "Completed",
    score: 8.2,
    ageRating: "PG-13",
    popularityRank: 8,
    accent: "#fbbf24",
    episodeCount: 14,
  },
  {
    id: "death-note",
    title: "Death Note",
    altTitle: "デスノート",
    synopsis:
      "A gifted student finds a notebook that kills anyone whose name he writes in it, and a genius detective sets out to stop him.",
    genres: ["Mystery", "Psychological", "Supernatural"],
    type: "TV",
    studio: "Madhouse",
    year: 2006,
    status: "Completed",
    score: 8.6,
    ageRating: "R",
    popularityRank: 9,
    accent: "#94a3b8",
    episodeCount: 12,
  },
  {
    id: "hunter-x-hunter",
    title: "Hunter x Hunter",
    altTitle: "ハンター×ハンター",
    synopsis:
      "Gon Freecss takes the deadly Hunter Exam to find the father who left him behind, and finds friends worth bleeding for along the way.",
    genres: ["Adventure", "Action", "Isekai"],
    type: "TV",
    studio: "Madhouse",
    year: 2011,
    status: "Completed",
    score: 9.0,
    ageRating: "PG-13",
    popularityRank: 10,
    accent: "#4ade80",
    episodeCount: 12,
  },
];

export const SEED_ANIME: Anime[] = seeds.map(({ episodeCount, ...rest }) => ({
  ...rest,
  episodes: makeEpisodes(rest.id, episodeCount),
}));

export const ALL_GENRES: string[] = Array.from(
  new Set(SEED_ANIME.flatMap((a) => a.genres)),
).sort();
