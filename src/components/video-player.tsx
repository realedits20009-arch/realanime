"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Episode } from "@/lib/types";

export function VideoPlayer({
  episode,
  poster,
  onProgress,
}: {
  episode: Episode;
  poster?: string;
  onProgress?: (percent: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const source = useMemo(
    () => episode.sources[sourceIndex] ?? episode.sources[0],
    [episode, sourceIndex],
  );

  useEffect(() => {
    setSourceIndex(0);
    setFailed(false);
  }, [episode.id]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
        <video
          ref={videoRef}
          key={`${episode.id}-${sourceIndex}`}
          src={source?.url}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full"
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (el.duration > 0) {
              onProgress?.((el.currentTime / el.duration) * 100);
            }
          }}
        />
        {failed ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-14 mx-auto w-fit rounded-lg bg-black/80 px-3 py-2 text-xs text-muted">
            This server is unavailable — try another one below.
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Servers
        </span>
        {episode.sources.map((s, i) => (
          <button
            key={`${s.quality}-${i}`}
            type="button"
            onClick={() => {
              setSourceIndex(i);
              setFailed(false);
            }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              i === sourceIndex
                ? "border-gold bg-gold text-black"
                : "border-border bg-surface text-muted hover:border-gold/60 hover:text-gold"
            }`}
          >
            {s.quality} · {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
