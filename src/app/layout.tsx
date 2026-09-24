import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real Anime — Watch anime free in HD",
  description:
    "Real Anime is a clean, fast anime streaming site. Stream trending, top airing and newly added anime in HD with sub and dub.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
