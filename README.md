# 🎬 Real Anime

A clean, fast anime streaming website with a **gold & black theme**, modeled after the structure of hianime.lol. Built with Next.js 16 + Tailwind CSS + shadcn/ui. Deployable on Vercel straight from GitHub.

![theme](https://img.shields.io/badge/theme-Gold_%26_Black-fbbf24) ![deploy](https://img.shields.io/badge/deploy-Vercel-000000) ![stack](https://img.shields.io/badge/stack-Next.js_16-000000)

## ✨ Features

### Home page (hianime.lol structure)
- **Hero slider** — rotating featured anime with title, synopsis, score, and Watch button
- **Continue Watching** — picks up where you left off (progress bar)
- **Trending Now** — curated trending rail
- **Top Airing** — currently broadcasting series
- **Recently Added** — newest uploads first
- **By Genre** — multiple rails, one per genre (Action, Romance, Isekai, etc.)
- **Genre quick-pick chips** at the bottom

### Detail page
- **HTML5 video player** with **quality switcher** (4K / 1080p / 720p / 480p / 360p) and **multi-server** fallback per episode
- **Episode list** sidebar with thumbnails, duration, sub/dub tag, source count
- **Next / Prev episode** navigation
- **Synopsis & info** — title, alt title, type, studio, year, status, score, age rating, popularity rank, genres
- **Related anime** — recommended by shared genres, studio, and type
- **Watchlist toggle** — bookmark any anime
- **YouTube trailer** link

### Pro features
- 🔍 **Live search** across titles, alt titles, studios, and genres
- 🎚️ **Filters** — by genre, type (TV/Movie/OVA/ONA/Special), and sort by relevance/score/newest/A→Z
- 📚 **Watchlist** stored in `localStorage`
- ⏯️ **Continue watching** with progress tracking
- 🏷️ **Genre pages** — dedicated view per genre with sorting
- 🛡️ **Admin upload panel** — password-protected
- 📤 **Export JSON** — download full catalog to commit to GitHub

### Upload panel (admin-only)
The admin panel at `/?admin=1` lets you upload anime with:
- **Core info**: title, alt title, poster URL, banner URL, synopsis, genres (multi-select), type
- **Studio & release**: studio, year, airing status
- **Episodes + URLs**: add unlimited episodes, each with multiple video sources (quality + label + URL)
- **Rating & age**: score (0–10), age rating (G/PG/PG-13/R/R+), popularity rank, trailer URL
- **Sub/Dub tags** per episode
- **Home placement flags**: Featured (hero), Trending, Top Airing

Uploads persist in the admin's browser via `localStorage`. Use **Export JSON** to download the full catalog (seed + uploads) and commit it back to GitHub so it ships with the next deploy.

## 🚀 Deploy on Vercel (from GitHub)

1. **Push this repo to GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: Real Anime — initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/real-anime.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Pick your GitHub repo
   - Framework preset: **Next.js** (auto-detected)
   - Root directory: `./`
   - Build command: `next build` (default)
   - Output directory: `.next` (default)
   - Click **Deploy** — that's it.

3. **(Optional) Set the admin password**
   - In your Vercel project → **Settings → Environment Variables**
   - Add: `NEXT_PUBLIC_ADMIN_PASSWORD` = your secret password
   - Redeploy. The default password (`realanime`) will no longer work.

4. **(Optional) Persist uploads across devices**
   - Use the admin panel's **Export JSON** button to download your catalog
   - Replace `src/lib/seed-data.ts` content with the exported JSON
   - Commit & push — your uploads are now part of the build for everyone

## 🛠️ Local development

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint     # ESLint
```

## 🎨 Theme

Gold & black, always dark. Key CSS variables live in `src/app/globals.css`:
- `--gold` — primary gold (#fbbf24-ish, oklch)
- `--gold-light` — highlight
- `--gold-dark` — deep gold
- `--background` — near-black with a warm tint
- `--card` — slightly lighter dark surface

Utility classes available: `.text-gold`, `.bg-gold`, `.gold-gradient-text`, `.gold-gradient-bg`, `.gold-glow`, `.gold-glow-strong`, `.scrollbar-gold`, `.scrollbar-hide`.

## 📁 Project structure

```
src/
├── app/
│   ├── globals.css         # Gold & black theme
│   ├── layout.tsx          # Metadata, favicon, fonts
│   └── page.tsx            # Single-route router (/?anime=, /?genre=, etc.)
├── components/
│   ├── site-header.tsx     # Sticky header w/ search + watchlist badge
│   ├── site-footer.tsx     # Sticky footer
│   ├── hero-slider.tsx     # Rotating featured banner
│   ├── anime-card.tsx      # Poster card with hover play, score, save
│   ├── anime-rail.tsx      # Horizontal scroll rail
│   ├── continue-watching-rail.tsx
│   ├── home-view.tsx       # Home page composition
│   ├── detail-view.tsx     # Anime detail page
│   ├── video-player.tsx    # HTML5 player + quality switcher
│   ├── genre-view.tsx      # /?genre=Action
│   ├── search-view.tsx     # /?q=...
│   ├── watchlist-view.tsx  # /?watchlist=1
│   └── admin-view.tsx      # /?admin=1 — upload panel
├── hooks/
│   └── use-anime-state.ts  # Watchlist + continue-watching subscriptions
├── lib/
│   ├── types.ts            # Anime, Episode, VideoSource, etc.
│   ├── seed-data.ts        # 10 pre-seeded popular anime
│   ├── anime-store.ts      # localStorage CRUD + queries
│   └── nav.ts              # Query-param navigation helpers
public/
├── favicon.svg             # Gold "R" on black
└── logo.svg                # "REAL ANIME" wordmark
```

## 📝 Tech notes

- **Single route** (`/`) — all views (home, detail, genre, search, watchlist, admin) are query-param-driven. This works perfectly on Vercel's static-friendly output and avoids any dynamic-route gotchas.
- **No backend required** — data lives in `src/lib/seed-data.ts` (compiled in) + admin uploads in `localStorage`. The site is fully functional on Vercel's read-only filesystem.
- **Pre-seeded with 10 popular anime** — Jujutsu Kaisen, Demon Slayer, Attack on Titan, One Piece, Chainsaw Man, Spy x Family, Your Name, Naruto Shippuden, Death Note, Hunter x Hunter. Each has multiple episodes with public test video URLs so the player actually plays something.
- **Player supports `.mp4` and `.m3u8`** (HLS) URLs — paste your own links in the admin panel.

## 🎯 Roadmap (optional)

- [ ] Vercel Postgres / KV for true cross-device persistence
- [ ] NextAuth login for multi-user uploads
- [ ] Comments per anime
- [ ] Watch history page
- [ ] Custom video player skin (currently native HTML5)

---

Made with ❤️ for anime fans. Replace the sample data with your own catalog and ship it.
