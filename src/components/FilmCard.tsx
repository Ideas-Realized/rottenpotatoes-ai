import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { toast } from "sonner";

import { PosterArt } from "@/components/PosterArt";
import { SpudScore } from "@/components/SpudScore";
import { useWatchlist } from "@/components/watchlist";
import { cn } from "@/lib/utils";
import type { Film } from "@/data/films";

export function SaveButton({ film, className }: { film: Film; className?: string }) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(film.slug);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${film.title} from watchlist` : `Save ${film.title} to watchlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const now = toggle(film.slug);
        toast(now ? "Added to your watchlist" : "Removed from your watchlist", {
          description: now
            ? `${film.title} is in the bag (demo only, nothing is stored server-side).`
            : `${film.title} left the bag.`,
        });
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-background/70 px-2 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-gold/60 hover:text-gold",
        saved && "border-gold/70 text-gold",
        className,
      )}
    >
      {saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
      {saved ? "Saved" : "Save"}
    </button>
  );
}

export function FilmCard({ film, className }: { film: Film; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-frame)]",
        className,
      )}
    >
      <Link
        to="/films/$slug"
        params={{ slug: film.slug }}
        className="block focus-visible:outline-none"
        aria-label={`Open ${film.title} details`}
      >
        <PosterArt film={film} className="aspect-[2/3] w-full" />
      </Link>

      <div className="absolute right-2 top-2 z-20 flex flex-col items-end gap-2">
        <SpudScore score={film.spudScore} size="sm" />
        <SaveButton film={film} />
      </div>

      {film.certifiedCrispy && (
        <span className="absolute left-2 top-2 z-20 rounded-sm bg-gold px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.16em] text-primary-foreground">
          Certified Crispy
        </span>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg leading-tight">
          <Link
            to="/films/$slug"
            params={{ slug: film.slug }}
            className="transition-colors hover:text-gold"
          >
            {film.title}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground">
          {film.creator} · {film.format}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground/90">{film.logline}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {film.runtimeMin} min
          </span>
          <span>{film.genres.join(" / ")}</span>
        </div>
      </div>
    </article>
  );
}
