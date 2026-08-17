import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Film } from "@/data/films";

type ArtFilm = Pick<
  Film,
  "title" | "posterHue" | "posterMotif" | "year" | "format" | "runtimeMin"
> & { creator?: string; artNote?: string };

type Props = {
  film: ArtFilm;
  className?: string;
  /** Hides the big title lockup (used inside small cards). */
  compact?: boolean;
  /** Removes all typography so a parent composition can provide a separate caption. */
  showLockup?: boolean;
  /** Adds the credit block + art-direction caption for hero placements. */
  showCredit?: boolean;
};

type Layer = { style: CSSProperties; className?: string };

/**
 * CSS-generated cinematic key art. No image assets, no external URLs.
 * Every film gets a deterministic hue plus a hand-composed motif made of
 * stacked gradient layers, so each poster reads as a distinct visual concept
 * while sharing one art direction: charcoal ground, gold key light,
 * halftone grain, vignette, and a typographic lockup.
 */
export function PosterArt({
  film,
  className,
  compact = false,
  showLockup = true,
  showCredit = false,
}: Props) {
  const h = film.posterHue;
  const ink = `oklch(0.13 0.012 ${h})`;
  const base = `oklch(0.2 0.026 ${h})`;
  const mid = `oklch(0.42 0.11 ${h})`;
  const warm = `oklch(0.62 0.15 ${h})`;
  const hot = `oklch(0.86 0.16 ${h})`;

  const compositions: Record<Film["posterMotif"], Layer[]> = {
    /* ---------- signature key art ---------- */

    // Backlit figure in a steam-filled service kitchen.
    steamkitchen: [
      {
        style: { backgroundImage: `linear-gradient(185deg, ${mid} 0%, ${base} 48%, ${ink} 100%)` },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(90deg, ${ink} 0 2px, transparent 2px 34px), repeating-linear-gradient(0deg, ${ink} 0 2px, transparent 2px 46px)`,
          opacity: 0.55,
          top: "8%",
          bottom: "38%",
          left: "12%",
          right: "12%",
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(ellipse 52% 34% at 50% 30%, ${hot} 0%, transparent 70%)`,
          mixBlendMode: "screen",
          opacity: 0.85,
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(ellipse 26% 46% at 50% 78%, ${ink} 0 62%, transparent 66%)`,
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(circle at 50% 34%, ${ink} 0 46%, transparent 50%)`,
          top: "34%",
          height: "16%",
          left: "36%",
          right: "36%",
        },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(96deg, ${warm} 0 1px, transparent 1px 22px)`,
          opacity: 0.28,
          mixBlendMode: "screen",
        },
      },
    ],

    // Venetian-blind noir: rain streaks, one lamp cone.
    rainwindow: [
      { style: { backgroundImage: `linear-gradient(200deg, ${base} 0%, ${ink} 78%)` } },
      {
        style: {
          backgroundImage: `linear-gradient(255deg, transparent 34%, ${warm} 50%, transparent 66%)`,
          opacity: 0.5,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(8deg, ${hot} 0 3px, transparent 3px 26px)`,
          opacity: 0.34,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(92deg, oklch(0 0 0/0.85) 0 6px, transparent 6px 9px)`,
          opacity: 0.6,
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(circle at 74% 22%, ${hot} 0 4%, ${warm} 5% 9%, transparent 12%)`,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(ellipse 18% 40% at 30% 88%, ${ink} 0 70%, transparent 74%)`,
        },
      },
    ],

    // Descending arches into a root cellar.
    descent: [
      {
        style: { backgroundImage: `linear-gradient(180deg, ${ink} 0%, ${base} 40%, ${mid} 100%)` },
      },
      {
        style: {
          backgroundImage: `repeating-radial-gradient(ellipse 62% 40% at 50% 96%, transparent 0 5%, ${ink} 5% 7%, transparent 7% 12%)`,
          opacity: 0.9,
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(ellipse 34% 22% at 50% 96%, ${hot} 0%, ${warm} 42%, transparent 76%)`,
          mixBlendMode: "screen",
          opacity: 0.9,
        },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(90deg, ${warm} 0 1px, transparent 1px 15px)`,
          opacity: 0.2,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `linear-gradient(180deg, ${ink} 0 6%, transparent 22%)`,
        },
      },
    ],

    // Split mirror with concentric peel rings.
    mirrorface: [
      { style: { backgroundImage: `linear-gradient(170deg, ${base} 0%, ${ink} 88%)` } },
      {
        style: {
          backgroundImage: `repeating-radial-gradient(circle at 50% 42%, ${warm} 0 1px, transparent 1px 11px)`,
          opacity: 0.55,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `radial-gradient(circle at 50% 42%, ${hot} 0 9%, ${mid} 10% 21%, transparent 24%)`,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `linear-gradient(90deg, transparent 0 49.3%, ${hot} 49.3% 50.7%, transparent 50.7%)`,
          opacity: 0.75,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `linear-gradient(90deg, oklch(0 0 0/0.45) 0 50%, transparent 50%)`,
        },
      },
    ],

    // Oversized low moon behind a hard wheat horizon.
    moonharvest: [
      {
        style: { backgroundImage: `linear-gradient(180deg, ${ink} 0%, ${base} 52%, ${mid} 100%)` },
      },
      {
        style: {
          backgroundImage: `radial-gradient(circle at 50% 62%, ${hot} 0 21%, ${warm} 21% 22.5%, transparent 23%)`,
          mixBlendMode: "screen",
        },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(90deg, ${ink} 0 2px, transparent 2px 5px)`,
          top: "58%",
          opacity: 0.9,
        },
      },
      {
        style: {
          backgroundImage: `linear-gradient(180deg, transparent 0 57.5%, ${ink} 58.5% 100%)`,
          opacity: 0.55,
        },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(0deg, ${warm} 0 1px, transparent 1px 30px)`,
          opacity: 0.16,
          mixBlendMode: "screen",
        },
      },
    ],

    /* ---------- library motifs ---------- */

    eclipse: [
      { style: { backgroundImage: `linear-gradient(180deg, ${base}, ${ink})` } },
      {
        style: {
          backgroundImage: `radial-gradient(circle at 50% 60%, ${hot} 0 13%, ${mid} 13.5% 27%, transparent 28%)`,
          mixBlendMode: "screen",
        },
      },
    ],
    tunnel: [
      { style: { backgroundImage: `linear-gradient(160deg, ${mid}, ${ink} 74%)` } },
      {
        style: {
          backgroundImage: `repeating-radial-gradient(circle at 50% 45%, ${hot} 0 1px, transparent 1px 9%)`,
          opacity: 0.7,
          mixBlendMode: "screen",
        },
      },
    ],
    grid: [
      { style: { backgroundImage: `linear-gradient(200deg, ${base}, ${ink})` } },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(90deg, ${hot} 0 1px, transparent 1px 9%), repeating-linear-gradient(0deg, ${mid} 0 1px, transparent 1px 14%)`,
          opacity: 0.7,
          mixBlendMode: "screen",
        },
      },
    ],
    orbit: [
      { style: { backgroundImage: `linear-gradient(140deg, ${base}, ${ink})` } },
      {
        style: {
          backgroundImage: `radial-gradient(ellipse 70% 16% at 50% 50%, ${hot} 0 40%, transparent 42%), radial-gradient(circle at 50% 50%, ${mid} 0 22%, transparent 23%)`,
          mixBlendMode: "screen",
        },
      },
    ],
    strata: [
      {
        style: { backgroundImage: `linear-gradient(180deg, ${mid} 0%, ${base} 55%, ${ink} 100%)` },
      },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(175deg, ${hot} 0 2px, transparent 2px 8px)`,
          opacity: 0.5,
          mixBlendMode: "screen",
        },
      },
    ],
    static: [
      { style: { backgroundImage: `linear-gradient(180deg, ${base}, ${ink})` } },
      {
        style: {
          backgroundImage: `repeating-linear-gradient(0deg, ${hot} 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, ${mid} 0 2px, transparent 2px 5px)`,
          opacity: 0.55,
          mixBlendMode: "screen",
        },
      },
    ],
  };

  const layers = compositions[film.posterMotif];

  return (
    <div
      role="img"
      aria-label={`Abstract generated key art for the fictional film ${film.title}: ${film.artNote ?? film.posterMotif} composition`}
      className={cn("relative overflow-hidden rounded-sm bg-surface", className)}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn("absolute inset-0", layer.className)}
          style={layer.style}
        />
      ))}

      {/* shared art direction: halftone, scanlines, vignette, gold hairline */}
      <div className="halftone absolute inset-0 opacity-20 mix-blend-screen" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, oklch(0 0 0/0.55) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 92% 76% at 50% 44%, transparent 42%, oklch(0.08 0.01 60/0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(to top, oklch(0.11 0.01 60/0.94) 0%, transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-2 rounded-sm border border-gold/20"
        aria-hidden="true"
      />

      {showLockup && (
        <div className="relative z-10 flex h-full flex-col justify-end gap-1 p-3 sm:p-4">
          <p className="font-mono text-[0.55rem] tracking-[0.28em] text-gold/85">
            {film.format.toUpperCase()} / {film.year} / {film.runtimeMin}MIN
          </p>
          {!compact && (
            <p className="font-display text-2xl leading-[0.88] text-foreground drop-shadow-[0_2px_10px_oklch(0_0_0/0.85)] sm:text-4xl">
              {film.title}
            </p>
          )}
          {showCredit && (
            <p className="mt-1 hidden max-w-[38ch] font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground sm:block">
              {film.creator ? `A fictional work by ${film.creator}` : "Fictional work"}
              {film.artNote ? ` · Key art: ${film.artNote}` : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function KeyArtCaption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}
