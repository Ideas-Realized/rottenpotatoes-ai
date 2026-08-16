import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ReviewCard, ReviewerAvatar } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFilm, reviewers, reviews } from "@/data/films";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Editorial Reviews — Rotten Potatoes" },
      {
        name: "description",
        content:
          "Every fictional curator review in one feed. Filter by reviewer, verdict and format, sorted by date or score.",
      },
      { property: "og:title", content: "Editorial Reviews — Rotten Potatoes" },
      {
        property: "og:description",
        content: "Curator reviews of AI-generated films, with named reviewers and open scoring.",
      },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const [reviewer, setReviewer] = useState("all");
  const [verdict, setVerdict] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("newest");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = reviews.filter((r) => {
      const film = getFilm(r.filmSlug);
      if (reviewer !== "all" && r.reviewerId !== reviewer) return false;
      if (verdict === "fresh" && !r.fresh) return false;
      if (verdict === "mushy" && r.fresh) return false;
      if (format !== "all" && film?.format !== format) return false;
      if (
        term &&
        ![r.headline, r.body, r.pullQuote, film?.title ?? ""].join(" ").toLowerCase().includes(term)
      )
        return false;
      return true;
    });
    return [...list].sort((a, b) =>
      sort === "newest" ? b.date.localeCompare(a.date) : b.score - a.score,
    );
  }, [reviewer, verdict, format, sort, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="eyebrow">The verdicts</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">Reviews</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every review is signed. Five fictional curators, {reviews.length} write-ups, no anonymous
        hit jobs.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {reviewers.map((r) => (
          <li
            key={r.id}
            className="rounded-md border border-border/70 bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <ReviewerAvatar initials={r.initials} hue={r.hue} />
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-gold">
                  {r.role}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{r.bio}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-3 rounded-lg border border-border/70 bg-card p-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Label htmlFor="review-search" className="font-mono text-xs uppercase tracking-[0.14em]">
            Search
          </Label>
          <Input
            id="review-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reviews…"
            className="mt-2"
          />
        </div>
        <FilterSelect
          label="Reviewer"
          value={reviewer}
          onChange={setReviewer}
          options={[
            { v: "all", l: "All reviewers" },
            ...reviewers.map((r) => ({ v: r.id, l: r.name })),
          ]}
        />
        <FilterSelect
          label="Verdict"
          value={verdict}
          onChange={setVerdict}
          options={[
            { v: "all", l: "All verdicts" },
            { v: "fresh", l: "Crispy only" },
            { v: "mushy", l: "Mushy only" },
          ]}
        />
        <FilterSelect
          label="Format"
          value={format}
          onChange={setFormat}
          options={[
            { v: "all", l: "All formats" },
            { v: "Short Film", l: "Short Film" },
            { v: "Trailer", l: "Trailer" },
            { v: "Music Video", l: "Music Video" },
            { v: "Experimental", l: "Experimental" },
            { v: "Documentary", l: "Documentary" },
          ]}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "review" : "reviews"}
        </p>
        <FilterSelect
          label="Sort"
          inline
          value={sort}
          onChange={setSort}
          options={[
            { v: "newest", l: "Newest first" },
            { v: "score", l: "Highest score" },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center">
          <h2 className="text-2xl">No reviews match that</h2>
          <Button
            variant="rind"
            className="mt-6"
            onClick={() => {
              setReviewer("all");
              setVerdict("all");
              setFormat("all");
              setQ("");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => (
            <li key={r.id}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  inline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
  inline?: boolean;
}) {
  return (
    <div className={inline ? "flex items-center gap-2" : undefined}>
      <span className="block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={inline ? "w-48" : "mt-2"} aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.v} value={o.v}>
              {o.l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
