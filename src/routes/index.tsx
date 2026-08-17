import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Film, Sparkles } from "lucide-react";

import { CinematicHero } from "@/components/CinematicHero";
import { FilmCard, SaveButton } from "@/components/FilmCard";
import { Newsletter } from "@/components/SiteChrome";
import { ScoreMeter, SpudScore } from "@/components/SpudScore";
import { Button } from "@/components/ui/button";
import { categories, editorials, films } from "@/data/films";
import { SITE_URL } from "@/lib/site";

const TITLE = "Rotten Potatoes — Not every prompt deserves a premiere";
const DESCRIPTION =
  "A fictional cult-cinema review desk for generated shorts, trailers and experiments. Sample Spud Scores, curators and toolchains are invented.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

function Home() {
  const featured = films.find((f) => f.slug === "the-mashing-hour")!;
  const fresh = [...films].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate)).slice(0, 6);
  const crispy = films.filter((f) => f.certifiedCrispy).slice(0, 4);

  return (
    <>
      <CinematicHero
        featured={featured}
        filmCount={films.length}
        crispyCount={films.filter((film) => film.certifiedCrispy).length}
      />

      {/* FEATURED FILM OF THE WEEK */}
      <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="eyebrow">Featured film of the week</p>
        <h2 id="featured-heading" className="mt-3 text-4xl sm:text-5xl">
          {featured.title}
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-lg text-muted-foreground">{featured.logline}</p>
            <blockquote className="mt-6 border-l-2 border-gold pl-4 text-base italic text-foreground/90">
              “{featured.consensus}”
              <footer className="mt-2 font-mono text-[0.65rem] uppercase not-italic tracking-[0.18em] text-muted-foreground">
                Curator consensus
              </footer>
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SpudScore score={featured.spudScore} size="lg" />
              <SpudScore score={featured.crowdCrop} size="md" label="Crowd Crop" />
              <SaveButton film={featured} className="h-9 px-3" />
              <Button asChild variant="rind">
                <Link to="/films/$slug" params={{ slug: featured.slug }}>
                  Full review
                </Link>
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5 rounded-lg border border-border/70 bg-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Kernel Notes</h3>
            <ScoreMeter label="Story" value={featured.kernelNotes.story} />
            <ScoreMeter label="Visual Craft" value={featured.kernelNotes.visualCraft} />
            <ScoreMeter label="Originality" value={featured.kernelNotes.originality} />
            <ScoreMeter label="AI Execution" value={featured.kernelNotes.aiExecution} />
            <p className="border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
              <span className="font-mono uppercase tracking-[0.16em] text-gold">
                Why we chose it —{" "}
              </span>
              {featured.editorNote}
            </p>
          </div>
        </div>
      </section>

      {/* FRESHLY GENERATED RAIL */}
      <section
        aria-labelledby="fresh-heading"
        className="border-y border-border/70 bg-surface/40 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Straight out of the render queue</p>
              <h2 id="fresh-heading" className="mt-2 text-3xl sm:text-4xl">
                Freshly Generated
              </h2>
            </div>
            <Link
              to="/discover"
              className="font-mono text-xs uppercase tracking-[0.18em] text-gold hover:underline"
            >
              See all {films.length} films
            </Link>
          </div>
          <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4">
            {fresh.map((film) => (
              <li key={film.slug} className="w-[248px] shrink-0 snap-start">
                <FilmCard film={film} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CERTIFIED CRISPY GRID */}
      <section aria-labelledby="crispy-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 text-gold" aria-hidden="true" />
          <p className="eyebrow">85+ Spud Score, no asterisks</p>
        </div>
        <h2 id="crispy-heading" className="mt-3 text-3xl sm:text-4xl">
          Certified Crispy
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {crispy.map((film) => (
            <li key={film.slug}>
              <FilmCard film={film} className="h-full" />
            </li>
          ))}
        </ul>
      </section>

      {/* CATEGORIES */}
      <section
        aria-labelledby="cats-heading"
        className="border-y border-border/70 bg-surface/40 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="cats-heading" className="text-3xl sm:text-4xl">
            Pick your poison
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <li key={c.label}>
                <Link
                  to="/discover"
                  search={{ format: c.format }}
                  className="group flex h-full flex-col justify-between rounded-md border border-border/70 bg-card p-5 transition-colors hover:border-gold/60"
                >
                  <Film className="size-5 text-gold" aria-hidden="true" />
                  <div className="mt-8">
                    <p className="font-display text-lg leading-tight group-hover:text-gold">
                      {c.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SPUD SCORE EXPLAINER */}
      <section aria-labelledby="score-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="eyebrow">How the scoring works</p>
        <h2 id="score-heading" className="mt-3 max-w-3xl text-3xl sm:text-4xl">
          Two numbers. No mystery meat.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Spud Score",
              d: "The curator number. A weighted blend of our four Kernel Notes, published with the reviewer names attached.",
              n: "0–100",
            },
            {
              t: "Crowd Crop",
              d: "What everyone else thought. Unweighted, unmoderated beyond spam removal, and shown next to ours even when it disagrees loudly.",
              n: "0–100",
            },
            {
              t: "Certified Crispy",
              d: "Awarded at 85+ Spud Score with at least two curator reviews. Revoked if a disclosure turns out to be wrong.",
              n: "85+",
            },
          ].map((x) => (
            <article key={x.t} className="rounded-lg border border-border/70 bg-card p-6">
              <p className="font-display text-4xl text-gold">{x.n}</p>
              <h3 className="mt-4 text-xl">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </article>
          ))}
        </div>
        <Button asChild variant="rind" className="mt-8">
          <Link to="/about">Read the full methodology</Link>
        </Button>
      </section>

      {/* EDITORIAL */}
      <section
        aria-labelledby="ed-heading"
        className="border-y border-border/70 bg-surface/40 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="ed-heading" className="text-3xl sm:text-4xl">
            From the desk
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {editorials.map((e) => (
              <li key={e.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-md border border-border/70 bg-card">
                  <div
                    className="halftone h-28 w-full"
                    aria-hidden="true"
                    style={{
                      backgroundColor: `oklch(0.3 0.08 ${e.hue})`,
                    }}
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow">{e.kicker}</p>
                    <h3 className="mt-2 text-xl leading-tight group-hover:text-gold">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{e.dek}</p>
                    <p className="mt-auto pt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {e.author} · <Clock className="inline size-3" aria-hidden="true" />{" "}
                      {e.readMin} min read
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Newsletter />
      </div>
    </>
  );
}
