import { cn } from "@/lib/utils";
import type { Film } from "@/data/films";

type Props = {
  film: Pick<Film, "title" | "posterHue" | "posterMotif" | "year" | "format">;
  className?: string;
  compact?: boolean;
};

/**
 * CSS-generated cinematic poster art. No image assets, no external URLs.
 * Each film gets a deterministic hue + motif from the seed data.
 */
export function PosterArt({ film, className, compact = false }: Props) {
  const h = film.posterHue;
  const base = `oklch(0.2 0.02 ${h})`;
  const mid = `oklch(0.42 0.12 ${h})`;
  const hot = `oklch(0.82 0.16 ${h})`;

  const motifs: Record<Film["posterMotif"], React.CSSProperties> = {
    eclipse: {
      backgroundImage: `radial-gradient(circle at 50% 62%, ${hot} 0 12%, ${mid} 12.5% 26%, transparent 27%), linear-gradient(180deg, ${base}, oklch(0.12 0.01 ${h}))`,
    },
    tunnel: {
      backgroundImage: `repeating-radial-gradient(circle at 50% 45%, ${hot} 0 1px, transparent 1px 9%), linear-gradient(160deg, ${mid}, ${base} 70%)`,
    },
    grid: {
      backgroundImage: `repeating-linear-gradient(90deg, ${hot} 0 1px, transparent 1px 9%), repeating-linear-gradient(0deg, ${mid} 0 1px, transparent 1px 14%), linear-gradient(200deg, ${base}, oklch(0.1 0.01 ${h}))`,
    },
    orbit: {
      backgroundImage: `radial-gradient(ellipse 70% 18% at 50% 50%, ${hot} 0 40%, transparent 42%), radial-gradient(circle at 50% 50%, ${mid} 0 22%, transparent 23%), linear-gradient(140deg, ${base}, oklch(0.11 0.01 ${h}))`,
    },
    strata: {
      backgroundImage: `repeating-linear-gradient(175deg, ${hot} 0 2px, transparent 2px 7px), linear-gradient(180deg, ${mid} 0%, ${base} 55%, oklch(0.1 0.01 ${h}) 100%)`,
    },
    static: {
      backgroundImage: `repeating-linear-gradient(0deg, ${hot} 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, ${mid} 0 2px, transparent 2px 5px), linear-gradient(180deg, ${base}, oklch(0.1 0.01 ${h}))`,
    },
  };

  return (
    <div
      role="img"
      aria-label={`Abstract generated poster art for the fictional film ${film.title}`}
      className={cn(
        "relative overflow-hidden rounded-sm bg-surface",
        "after:absolute after:inset-0 after:bg-[linear-gradient(to_top,oklch(0.12_0.01_60/0.92),transparent_65%)]",
        className,
      )}
      style={motifs[film.posterMotif]}
    >
      <div className="halftone absolute inset-0 opacity-25 mix-blend-screen" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, oklch(0 0 0/0.5) 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-3">
        <p className="font-mono text-[0.55rem] tracking-[0.28em] text-gold/80">
          {film.format.toUpperCase()} / {film.year}
        </p>
        {!compact && (
          <p className="font-display text-lg leading-[0.95] text-foreground drop-shadow-[0_2px_8px_oklch(0_0_0/0.8)]">
            {film.title}
          </p>
        )}
      </div>
    </div>
  );
}
