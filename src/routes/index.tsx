import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Film, Sparkles } from "lucide-react";

import { FilmCard, SaveButton } from "@/components/FilmCard";
import { Newsletter } from "@/components/SiteChrome";
import { PosterArt } from "@/components/PosterArt";
import { ScoreMeter, SpudScore } from "@/components/SpudScore";
import { Button } from "@/components/ui/button";
import { categories, editorials, films } from "@/data/films";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rotten Potatoes — AI cinema has entered the chat" },
      {
        name: "description",
        content:
          "Discover AI-generated short films, fake trailers, music videos and experiments. Curated Spud Scores, honest reviews and the toolchain behind every piece.",
      },
      { property: "og:title", content: "Rotten Potatoes — AI cinema has entered the chat" },
      {
        property: "og:description",
        content:
          "A fictional review destination for AI-generated video: Spud Scores, Kernel Notes and the tools behind each film.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = films.find((f) => f.slug === "the-mashing-hour")!;
  const fresh = [...films]
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
    .slice(0, 6);
  const crispy = films.filter((f) => f.certifiedCrispy).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="spotlight relative overflow-hidden border-b border-border/70">
        <div className="halftone absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="relative">
            <p className="eyebrow">Est. 2026 · Reviews from the render farm</p>
            <h1 className="mt-5 text-5xl leading-[0.86] sm:text-7xl xl:text-8xl">
              AI cinema has{" "}
              <span className="text-gradient-gold">entered the chat.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              We watch the generated stuff so you don't have to watch all of it. Curated Spud
              Scores, Kernel Notes on craft, and a full toolchain breakdown for every fictional
              film in the vault.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="crispy" size="lg">
                <Link to="/discover">
                  Browse Films <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="rind" size="lg">
                <Link to="/submit">Submit a Film</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-gold/25 pt-6">
              {[
                { k: "Films logged", v: films.length },
                { k: "Curators", v: 5 },
                { k: "Certified Crispy", v: films.filter((f) => f.certifiedCrispy).length },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="font-display text-3xl text-gold">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="film-edge overflow-hidden rounded-lg border border-gold/25 bg-surface p-3 shadow-[var(--shadow-frame)]">
              <PosterArt film={featured} className="aspect-[3/4] w-full" compact showCredit />
            </div>
            <div className="mt-3 rounded-md border border-gold/40 bg-background/95 p-4 backdrop-blur sm:absolute sm:bottom-5 sm:left-5 sm:right-5 sm:mt-0">
              <p className="eyebrow">Now on the marquee</p>
              <p className="mt-1 font-display text-lg leading-tight sm:text-xl">{featured.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {featured.creator} · {featured.runtimeMin} min
              </p>
              <p className="mt-2 line-clamp-2 text-[0.7rem] leading-snug text-foreground/75">
                {featured.editorNote}
              </p>
            </div>
          </div>

        </div>

        {/* marquee ticker */}
        <div className="overflow-hidden border-t border-gold/25 bg-gold/10 py-2">
          <div className="marquee-track gap-8 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-gold">
            {[...films, ...films].map((f, i) => (
              <span key={`${f.slug}-${i}`} className="whitespace-nowrap">
                {f.title} — {f.spudScore} ·
              </span>
            ))}
          </div>
        </div>
      </section>

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
