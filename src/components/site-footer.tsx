import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-black text-foreground">
            REAL<span className="text-gold">ANIME</span>
          </span>{" "}
          — a demo catalog. All video sources are public test streams.
        </p>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <Link href="/?watchlist=1" className="hover:text-gold">
            Watchlist
          </Link>
          <Link href="/?admin=1" className="hover:text-gold">
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
