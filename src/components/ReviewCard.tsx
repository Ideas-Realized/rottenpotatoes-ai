import { Link } from "@tanstack/react-router";

import { SpudScore } from "@/components/SpudScore";
import { cn } from "@/lib/utils";
import { getFilm, getReviewer, type Review } from "@/data/films";

export function ReviewerAvatar({
  initials,
  hue,
  className,
}: {
  initials: string;
  hue: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-sm font-display text-sm text-background",
        className,
      )}
      style={{ backgroundColor: `oklch(0.78 0.14 ${hue})` }}
    >
      {initials}
    </span>
  );
}

export function ReviewCard({ review, showFilm = true }: { review: Review; showFilm?: boolean }) {
  const reviewer = getReviewer(review.reviewerId);
  const film = getFilm(review.filmSlug);

  return (
    <article className="flex h-full flex-col rounded-md border border-border/70 bg-card p-5 transition-colors hover:border-gold/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {reviewer && <ReviewerAvatar initials={reviewer.initials} hue={reviewer.hue} />}
          <div>
            <p className="text-sm font-medium">{reviewer?.name}</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              {reviewer?.role}
            </p>
          </div>
        </div>
        <SpudScore score={review.score} size="sm" />
      </div>

      {showFilm && film && (
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gold">
          <Link to="/films/$slug" params={{ slug: film.slug }} className="hover:underline">
            {film.title}
          </Link>{" "}
          · {film.format}
        </p>
      )}

      <h3 className="mt-3 text-lg leading-tight normal-case">{review.headline}</h3>
      <p className="mt-2 border-l-2 border-gold/60 pl-3 text-sm italic text-foreground/90">
        “{review.pullQuote}”
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{review.body}</p>
      <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
        <time dateTime={review.date}>{review.date}</time>
        <span className={review.fresh ? "text-gold" : "text-rot"}>
          {review.fresh ? "Crispy" : "Mushy"}
        </span>
      </div>
    </article>
  );
}
