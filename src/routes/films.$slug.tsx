import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Share2, Star, Wrench } from "lucide-react";
import { toast } from "sonner";

import { FilmCard, SaveButton } from "@/components/FilmCard";
import { ScoreMeter, SpudScore } from "@/components/SpudScore";
import { ReviewCard } from "@/components/ReviewCard";
import { TrailerStage } from "@/components/TrailerStage";
import { Button } from "@/components/ui/button";
import { getFilm, recommendations, reviewsForFilm, scoreTier } from "@/data/films";

export const Route = createFileRoute("/films/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Rotten Potatoes" }, { name: "robots", content: "noindex" }],
      };
    }
    const { film } = loaderData;
    const title = `${film.title} (${film.year}) — Spud Score ${film.spudScore} | Rotten Potatoes`;
    return {
      meta: [
        { title },
        { name: "description", content: film.logline },
        { property: "og:title", content: title },
        { property: "og:description", content: film.logline },
      ],
    };
  },
  component: FilmDetail,
});

function FilmDetail() {
  const { film } = Route.useLoaderData();
  const filmReviews = reviewsForFilm(film.slug);
  const recs = recommendations(film.slug);
  const tier = scoreTier(film.spudScore);

  return (
    <article>
      {/* HERO */}
      <div className="spotlight border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <nav aria-label="Breadcrumb" className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/discover" className="hover:text-gold">
              Discover
            </Link>{" "}
            / <span className="text-gold">{film.format}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            {/* watch stage */}
            <div>
              <TrailerStage film={film} />

              {film.editorsPick && (
                <p className="mt-6 inline-flex items-center gap-1.5 rounded-sm border border-gold/40 bg-gold/10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold">
                  <Star className="size-3" aria-hidden="true" /> Editor&apos;s pick
                </p>
              )}

              <h1 className="mt-4 text-4xl leading-[0.9] sm:text-6xl">{film.title}</h1>

              <p className="mt-4 text-sm text-muted-foreground">
                {film.creator} <span className="text-gold">{film.creatorHandle}</span> · {film.year}{" "}
                · <Clock className="inline size-3.5" aria-hidden="true" /> {film.runtimeMin} min ·{" "}
                {film.genres.join(" / ")}
              </p>
              <p className="mt-5 max-w-2xl text-lg text-foreground/90">{film.logline}</p>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{film.synopsis}</p>

              <p className="mt-6 max-w-2xl border-l-2 border-gold pl-4 text-sm text-foreground/85">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                  Why we chose it —{" "}
                </span>
                {film.editorNote}
              </p>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                Key art generated in CSS · {film.artNote}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <SaveButton film={film} className="h-9 px-3 text-sm" />
                <Button
                  variant="rind"
                  onClick={() =>
                    toast.success("Link copied (demo)", {
                      description: "Sharing is simulated in this build.",
                    })
                  }
                >
                  <Share2 className="size-4" /> Share
                </Button>
              </div>
            </div>

            {/* score column */}
            <aside className="space-y-6">
              <div className="rounded-lg border border-gold/30 bg-card p-6 text-center">
                <p className="eyebrow">Spud Score</p>
                <div className="mt-3 flex justify-center">
                  <SpudScore score={film.spudScore} size="lg" />
                </div>
                <p className="mt-3 font-display text-xl text-gold">{tier.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on {filmReviews.length} curator{" "}
                  {filmReviews.length === 1 ? "review" : "reviews"}
                </p>
                <hr className="my-5 border-border/70" />
                <p className="eyebrow">Crowd Crop</p>
                <div className="mt-3 flex justify-center">
                  <SpudScore score={film.crowdCrop} size="md" label="Crowd Crop" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {film.crowdVotes.toLocaleString()} fictional votes
                </p>
              </div>

              <div className="space-y-5 rounded-lg border border-border/70 bg-card p-6">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  Kernel Notes
                </h2>
                <ScoreMeter label="Story" value={film.kernelNotes.story} />
                <ScoreMeter label="Visual Craft" value={film.kernelNotes.visualCraft} />
                <ScoreMeter label="Originality" value={film.kernelNotes.originality} />
                <ScoreMeter label="AI Execution" value={film.kernelNotes.aiExecution} />
              </div>

              <div className="rounded-lg border border-border/70 bg-card p-6">
                <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  <Wrench className="size-3.5" aria-hidden="true" /> Toolchain
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {film.tools.map((t) => (
                    <li
                      key={t}
                      className="rounded-sm border border-gold/40 bg-gold/10 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-gold"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Tool names are fictional and used for demonstration only.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* CONSENSUS */}
      <section aria-labelledby="consensus-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 id="consensus-heading" className="eyebrow">
          Curator consensus
        </h2>
        <blockquote className="mt-4 max-w-3xl border-l-2 border-gold pl-5 font-display text-2xl leading-tight sm:text-3xl">
          “{film.consensus}”
        </blockquote>
      </section>

      {/* REVIEWS */}
      <section
        aria-labelledby="reviews-heading"
        className="border-y border-border/70 bg-surface/40 py-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="reviews-heading" className="text-3xl">
            Reviews
          </h2>
          {filmReviews.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No curator reviews logged yet for this fictional title.
            </p>
          ) : (
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {filmReviews.map((r) => (
                <li key={r.id}>
                  <ReviewCard review={r} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section aria-labelledby="recs-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 id="recs-heading" className="text-3xl">
          If you liked this
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recs.map((f) => (
            <li key={f.slug}>
              <FilmCard film={f} className="h-full" />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
