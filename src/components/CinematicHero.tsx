import { Link } from "@tanstack/react-router";
import { ArrowRight, Clapperboard, ScanLine, Sparkles } from "lucide-react";
import { LazyMotion, m, useReducedMotion } from "framer-motion";

import { PosterArt } from "@/components/PosterArt";
import { SpudScore } from "@/components/SpudScore";
import { Button } from "@/components/ui/button";
import type { Film } from "@/data/films";

type Props = {
  featured: Film;
  filmCount: number;
  crispyCount: number;
};

const spring = { stiffness: 150, damping: 22, mass: 0.55 };
const loadMotionFeatures = () => import("@/lib/motion-features").then((module) => module.default);

export function CinematicHero({ featured, filmCount, crispyCount }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="cinematic-hero" aria-labelledby="home-hero-heading">
      <div className="cinematic-hero__halftone" aria-hidden="true" />
      <div className="cinematic-hero__beam" aria-hidden="true" />

      <div className="cinematic-hero__layout">
        <div className="cinematic-hero__copy">
          <p className="eyebrow flex items-center gap-2">
            <Clapperboard className="size-3.5" aria-hidden="true" />A cult cinema review desk for
            the render era
          </p>

          <h1 id="home-hero-heading" className="cinematic-hero__title">
            Not every prompt <span>deserves a premiere.</span>
          </h1>

          <p className="cinematic-hero__lede">
            We dig through the render queue for the fictional shorts worth talking about, then score
            the story, visual craft, originality, and AI execution without grading on a curve.
          </p>

          <div className="cinematic-hero__actions">
            <Button asChild variant="crispy" size="lg" className="hero-primary-action group">
              <Link to="/discover">
                Enter the vault
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="rind" size="lg" className="hero-secondary-action">
              <Link to="/submit">Submit a film</Link>
            </Button>
          </div>

          <dl className="cinematic-hero__stats">
            {[
              { label: "In the vault", value: filmCount.toString().padStart(2, "0") },
              { label: "Curator voices", value: "05" },
              { label: "Certified crispy", value: crispyCount.toString().padStart(2, "0") },
            ].map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="cinematic-hero__stage">
          <div className="cinematic-hero__stage-index" aria-hidden="true">
            <span>RP / 001</span>
            <ScanLine className="size-4" />
          </div>

          <LazyMotion features={loadMotionFeatures} strict>
            <m.article
              className="hero-feature"
              style={{ transformPerspective: 1400 }}
              whileHover={
                reducedMotion ? undefined : { y: -6, scale: 1.01, rotateX: -1.1, rotateY: 1.5 }
              }
              whileTap={reducedMotion ? undefined : { scale: 0.995 }}
              transition={{ type: "spring", ...spring }}
            >
              <Link
                to="/films/$slug"
                params={{ slug: featured.slug }}
                className="hero-feature__link"
                aria-label={`Read the full review of ${featured.title}`}
              >
                <div className="hero-feature__art">
                  <PosterArt
                    film={featured}
                    className="absolute inset-0 size-full rounded-none"
                    compact
                    showLockup={false}
                  />
                  <div className="hero-feature__cursor-light" aria-hidden="true" />
                  <div className="hero-feature__topline">
                    <span>Now on the marquee</span>
                    <span>Fictional work</span>
                  </div>
                  <div className="hero-feature__art-caption" aria-hidden="true">
                    <span>CSS key art</span>
                    <span>{featured.artNote}</span>
                  </div>
                </div>

                <div className="hero-feature__copy">
                  <div className="min-w-0">
                    <p className="hero-feature__eyebrow">
                      Editor&apos;s pick <span>/</span> {featured.format} <span>/</span>{" "}
                      {featured.runtimeMin} min
                    </p>
                    <h2>{featured.title}</h2>
                    <p className="hero-feature__logline">{featured.logline}</p>
                    <div className="hero-feature__meta">
                      <span>{featured.creator}</span>
                      <span>{featured.genres.join(" / ")}</span>
                      <span className="hero-feature__read">
                        Full review <ArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <SpudScore score={featured.spudScore} size="lg" />
                </div>
              </Link>
            </m.article>

            <m.div className="hero-feature__ticket" aria-hidden="true">
              <Sparkles className="size-3.5" />
              Certified crispy
            </m.div>
          </LazyMotion>
        </div>
      </div>

      <div className="cinematic-hero__marquee" aria-label="Film scores from the vault">
        <div className="marquee-track">
          <span>
            The Mashing Hour / 94&nbsp;&nbsp; Root Cellar Lullaby / 91&nbsp;&nbsp; Starch Noir / 87
            &nbsp;&nbsp; Peeler / 86&nbsp;&nbsp;
          </span>
          <span aria-hidden="true">
            The Mashing Hour / 94&nbsp;&nbsp; Root Cellar Lullaby / 91&nbsp;&nbsp; Starch Noir / 87
            &nbsp;&nbsp; Peeler / 86&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </section>
  );
}
