import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Scale, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScoreMeter } from "@/components/SpudScore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Methodology & Policies — Rotten Potatoes" },
      {
        name: "description",
        content:
          "How the fictional Spud Score is calculated, how editorial and community signals differ, plus disclosure and code-of-conduct policies.",
      },
      { property: "og:title", content: "Methodology & Policies — Rotten Potatoes" },
      {
        property: "og:description",
        content:
          "How the fictional Spud Score is calculated, how editorial and community signals differ, plus disclosure and code-of-conduct policies.",
      },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Methodology & Policies — Rotten Potatoes" },
      {
        name: "twitter:description",
        content:
          "How the fictional Spud Score is calculated, how editorial and community signals differ, plus disclosure and code-of-conduct policies.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: About,
});

const weights = [
  { label: "Story (30%)", value: 30, hint: "Structure, intent, whether it earns its runtime." },
  { label: "Visual Craft (30%)", value: 30, hint: "Grade, composition, motion, artifact control." },
  {
    label: "Originality (25%)",
    value: 25,
    hint: "Is this a voice, or a preset with a title card?",
  },
  { label: "AI Execution (15%)", value: 15, hint: "Toolchain discipline and honest disclosure." },
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Methodology</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">How we grade a potato</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Rotten Potatoes is a fictional publication built as a product demo. Every film, creator,
        reviewer, score, review and tool named across this site is invented. Nothing here reviews a
        real work or a real product.
      </p>

      <section aria-labelledby="score-heading" className="mt-14">
        <h2 id="score-heading" className="text-3xl">
          The Spud Score
        </h2>
        <p className="mt-3 text-muted-foreground">
          One weighted number from four Kernel Notes. Each note is scored 0 to 100 by a named
          curator, published in full, and never averaged in secret.
        </p>
        <div className="mt-8 space-y-6 rounded-lg border border-border/70 bg-card p-6">
          {weights.map((w) => (
            <ScoreMeter key={w.label} label={w.label} value={w.value} hint={w.hint} headingLevel="h3" />
          ))}
        </div>
      </section>

      <section aria-labelledby="signals-heading" className="mt-14">
        <h2 id="signals-heading" className="text-3xl">
          Editorial vs community signals
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-gold/30 bg-card p-6">
            <Scale className="size-5 text-gold" aria-hidden="true" />
            <h3 className="mt-4 text-xl">Spud Score (editorial)</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Curators watch the whole thing, once, at normal speed. Scores are signed, dated and
              editable only with a visible correction note.
            </p>
          </article>
          <article className="rounded-lg border border-border/70 bg-card p-6">
            <Users className="size-5 text-gold" aria-hidden="true" />
            <h3 className="mt-4 text-xl">Crowd Crop (community)</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              An unweighted audience average. We remove obvious brigading and nothing else. When it
              disagrees with us by twenty points, we publish both and say so.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="policy-heading" className="mt-14">
        <h2 id="policy-heading" className="text-3xl">
          Disclosure & conduct
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="a">
            <AccordionTrigger>What creators must disclose</AccordionTrigger>
            <AccordionContent>
              Submissions list every generative tool used, whether any synthetic likeness or voice
              appears, and whether third-party footage was used as reference. Undisclosed synthetic
              performers cost a work its Certified Crispy status.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Likeness and consent</AccordionTrigger>
            <AccordionContent>
              No generated likeness of a real, identifiable person without written permission from
              that person. No exceptions for satire, parody, or "it's obviously fake."
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Conflicts of interest</AccordionTrigger>
            <AccordionContent>
              Curators recuse themselves from any work they contributed to, were paid by, or share a
              collective with. Recusals are printed next to the score.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="d">
            <AccordionTrigger>Community code of conduct</AccordionTrigger>
            <AccordionContent>
              Criticise the work, not the person. No harassment of creators or curators, no
              vote-brigading, no scraping the vault for training data without permission.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="e">
            <AccordionTrigger>Corrections</AccordionTrigger>
            <AccordionContent>
              Factual errors are fixed within 48 hours with a dated note appended to the review. We
              do not silently edit verdicts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mt-14 rounded-lg border border-gold/30 bg-surface p-6">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 size-6 shrink-0 text-gold" aria-hidden="true" />
          <div>
            <h2 className="text-2xl">Demo disclosure</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This build has no accounts, no payments, no uploads and no database. Watchlists and
              form submissions are simulated in the browser only.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="crispy">
                <Link to="/discover">Browse the vault</Link>
              </Button>
              <Button asChild variant="rind">
                <Link to="/submit">Submit a film</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
