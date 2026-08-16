import { useEffect, useRef, useState } from "react";
import { Info, Pause, Play, RotateCcw, Volume2 } from "lucide-react";

import { PosterArt } from "@/components/PosterArt";
import { cn } from "@/lib/utils";
import type { Film } from "@/data/films";

/**
 * Cinematic, deliberately non-streaming "watch" stage.
 * Nothing here plays real video: pressing Watch advances a simulated
 * timeline over the film's CSS key art and labels itself as a placeholder
 * throughout.
 */
export function TrailerStage({ film, className }: { film: Film; className?: string }) {
  const total = 45; // seconds of simulated illustrative sample
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= total) {
          setPlaying(false);
          return total;
        }
        return e + 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const pct = (elapsed / total) * 100;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className={cn("space-y-3", className)}>
      <figure className="film-edge relative aspect-video overflow-hidden rounded-lg border border-gold/25 bg-surface shadow-[var(--shadow-frame)]">
        <PosterArt film={film} className="absolute inset-0 size-full" compact />

        {/* letterbox bars for the "sample" state */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 bg-background/85 transition-all duration-700",
            started ? "h-[7%]" : "h-0",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 bg-background/85 transition-all duration-700",
            started ? "h-[7%]" : "h-0",
          )}
        />

        <span className="absolute left-3 top-3 z-20 rounded-sm border border-gold/45 bg-background/80 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
          Fictional sample · not a real stream
        </span>

        {!started && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <button
              type="button"
              onClick={() => {
                setStarted(true);
                setPlaying(true);
              }}
              className="group flex items-center gap-3 rounded-full border border-gold/70 bg-background/75 py-3 pl-4 pr-6 text-gold backdrop-blur transition-all hover:scale-[1.03] hover:bg-gold/15"
              aria-label={`Start the illustrative sample for ${film.title}`}
            >
              <span className="grid size-11 place-items-center rounded-full border border-gold/60 bg-gold/15">
                <Play className="size-5 translate-x-[1px]" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-display text-lg leading-none tracking-wide">
                  Watch the sample
                </span>
                <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground">
                  0:45 illustrative placeholder
                </span>
              </span>
            </button>
          </div>
        )}

        {started && elapsed >= total && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/55 px-6 text-center backdrop-blur-sm">
            <p className="font-display text-2xl">Sample ends here</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              That is the whole placeholder. The full {film.runtimeMin}-minute work is fictional and
              is not hosted anywhere.
            </p>
            <button
              type="button"
              onClick={() => {
                setElapsed(0);
                setPlaying(true);
              }}
              className="inline-flex items-center gap-2 rounded-sm border border-gold/60 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold hover:bg-gold/10"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Replay sample
            </button>
          </div>
        )}
      </figure>

      {/* transport bar */}
      <div className="rounded-md border border-border/70 bg-card/80 p-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              setPlaying((p) => !p);
              if (elapsed >= total) setElapsed(0);
            }}
            aria-label={playing ? "Pause the illustrative sample" : "Play the illustrative sample"}
            className="grid size-11 shrink-0 sm:size-10 place-items-center rounded-sm border border-gold/50 bg-gold/10 text-gold transition-colors hover:bg-gold/20"
          >
            {playing ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4 translate-x-[1px]" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={Math.round(pct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Illustrative sample progress"
            >
              <div
                className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-[width] duration-500 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="tabular-nums text-gold">
                {fmt(elapsed)} / {fmt(total)}
              </span>
              <span className="truncate pl-3">Full work: {film.runtimeMin} min (fictional)</span>
            </div>
          </div>

          <Volume2
            className="hidden size-4 shrink-0 text-muted-foreground sm:block"
            aria-hidden="true"
          />
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
        <span>{film.sampleNote}</span>
      </p>
    </div>
  );
}
