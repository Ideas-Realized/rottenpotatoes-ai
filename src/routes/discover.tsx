import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, Star, X } from "lucide-react";

import { FilmCard } from "@/components/FilmCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editorialOrder, films, FORMATS, GENRES, TOOLS, type Format } from "@/data/films";

type SearchParams = { format?: string | undefined; q?: string | undefined };

export const Route = createFileRoute("/discover")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    format: typeof search["format"] === "string" ? search["format"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),

  head: () => ({
    meta: [
      { title: "Discover AI Films — Rotten Potatoes" },
      {
        name: "description",
        content:
          "Search and filter fictional AI-generated films by format, genre, runtime, generation tools, release date and Spud Score.",
      },
      { property: "og:title", content: "Discover AI Films — Rotten Potatoes" },
      {
        property: "og:description",
        content: "Filter the vault by format, genre, runtime, toolchain and score.",
      },
    ],
  }),
  component: Discover,
});

type SortKey = "editorial" | "score" | "newest" | "crowd" | "runtime";

function Discover() {
  const params = Route.useSearch();
  const navigate = useNavigate({ from: "/discover" });

  const [query, setQuery] = useState(params.q ?? "");
  const [formats, setFormats] = useState<string[]>(params.format ? [params.format] : []);
  const [genres, setGenres] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [maxRuntime, setMaxRuntime] = useState(50);
  const [minScore, setMinScore] = useState(0);
  const [year, setYear] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("editorial");
  const [picksOnly, setPicksOnly] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = films.filter((f) => {
      if (
        q &&
        ![f.title, f.creator, f.logline, f.genres.join(" "), f.tools.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (picksOnly && !f.editorsPick) return false;
      if (formats.length && !formats.includes(f.format)) return false;
      if (genres.length && !f.genres.some((g) => genres.includes(g))) return false;
      if (tools.length && !f.tools.some((t) => tools.includes(t))) return false;
      if (f.runtimeMin > maxRuntime) return false;
      if (f.spudScore < minScore) return false;
      if (year !== "all" && String(f.year) !== year) return false;
      return true;
    });

    const sorters: Record<SortKey, (a: typeof films[number], b: typeof films[number]) => number> = {
      editorial: editorialOrder,
      score: (a, b) => b.spudScore - a.spudScore,
      crowd: (a, b) => b.crowdCrop - a.crowdCrop,
      newest: (a, b) => b.releaseDate.localeCompare(a.releaseDate),
      runtime: (a, b) => a.runtimeMin - b.runtimeMin,
    };
    return [...out].sort(sorters[sort]);
  }, [query, formats, genres, tools, maxRuntime, minScore, year, sort, picksOnly]);

  const activeCount =
    formats.length +
    genres.length +
    tools.length +
    (maxRuntime < 50 ? 1 : 0) +
    (minScore > 0 ? 1 : 0) +
    (year !== "all" ? 1 : 0) +
    (picksOnly ? 1 : 0);

  const reset = () => {
    setQuery("");
    setFormats([]);
    setGenres([]);
    setTools([]);
    setMaxRuntime(50);
    setMinScore(0);
    setYear("all");
    setPicksOnly(false);
    navigate({ search: {} });
  };

  const sortBlurb: Record<SortKey, string> = {
    editorial: "Curator picks first, then Spud Score, then recency. Our house order.",
    score: "Straight Spud Score, highest first. Ignores what we would actually recommend.",
    crowd: "Community numbers only. Expect the crowd-pleasers to jump.",
    newest: "Most recent fictional release date first.",
    runtime: "Shortest first, for when you have nine minutes.",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="eyebrow">The vault</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">Discover</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {films.length} fictional works, filterable down to the frame. Sorted the way our curators
        would hand them to you, not by raw score. Everything below is invented for this demo.
      </p>


      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Label htmlFor="film-search" className="sr-only">
            Search films
          </Label>
          <Input
            id="film-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, creators, tools, loglines…"
            className="h-11 pl-9"
          />
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="h-11 sm:w-60" aria-label="Sort results">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="editorial">Editorial order (default)</SelectItem>
            <SelectItem value="score">Highest Spud Score</SelectItem>
            <SelectItem value="crowd">Highest Crowd Crop</SelectItem>
            <SelectItem value="newest">Newest release</SelectItem>
            <SelectItem value="runtime">Shortest runtime</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="rind"
          className="h-11 lg:hidden"
          aria-expanded={panelOpen}
          aria-controls="filter-panel"
          onClick={() => setPanelOpen((v) => !v)}
        >
          <SlidersHorizontal className="size-4" /> Filters {activeCount ? `(${activeCount})` : ""}
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">{sortBlurb[sort]}</p>
        <button
          type="button"
          onClick={() => setPicksOnly((v) => !v)}
          aria-pressed={picksOnly}
          className={`inline-flex min-h-9 w-fit items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-colors ${
            picksOnly
              ? "border-gold bg-gold/15 text-gold"
              : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold"
          }`}
        >
          <Star className="size-3" aria-hidden="true" /> Editor&apos;s picks only
        </button>
      </div>


      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside
          id="filter-panel"
          aria-label="Filters"
          className={`${panelOpen ? "block" : "hidden"} h-max space-y-7 rounded-lg border border-border/70 bg-card p-5 lg:sticky lg:top-24 lg:block`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Filters</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold"
              >
                <X className="size-3" aria-hidden="true" /> Clear
              </button>
            )}
          </div>

          <FilterGroup legend="Format">
            {FORMATS.map((f) => (
              <CheckRow
                key={f}
                id={`fmt-${f}`}
                label={f}
                checked={formats.includes(f as Format)}
                onChange={() => toggle(formats, setFormats, f)}
              />
            ))}
          </FilterGroup>

          <FilterGroup legend="Genre">
            {GENRES.map((g) => (
              <CheckRow
                key={g}
                id={`gen-${g}`}
                label={g}
                checked={genres.includes(g)}
                onChange={() => toggle(genres, setGenres, g)}
              />
            ))}
          </FilterGroup>

          <FilterGroup legend="Generation tools">
            {TOOLS.map((t) => (
              <CheckRow
                key={t}
                id={`tool-${t}`}
                label={t}
                checked={tools.includes(t)}
                onChange={() => toggle(tools, setTools, t)}
              />
            ))}
          </FilterGroup>

          <div>
            <Label htmlFor="runtime" className="font-mono text-xs uppercase tracking-[0.16em]">
              Max runtime: {maxRuntime} min
            </Label>
            <Slider
              id="runtime"
              className="mt-3"
              min={2}
              max={50}
              step={1}
              value={[maxRuntime]}
              onValueChange={(v) => setMaxRuntime(v[0] ?? 50)}
            />
          </div>

          <div>
            <Label htmlFor="minscore" className="font-mono text-xs uppercase tracking-[0.16em]">
              Min Spud Score: {minScore}
            </Label>
            <Slider
              id="minscore"
              className="mt-3"
              min={0}
              max={100}
              step={5}
              value={[minScore]}
              onValueChange={(v) => setMinScore(v[0] ?? 0)}
            />
          </div>

          <div>
            <Label className="font-mono text-xs uppercase tracking-[0.16em]">Release year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="mt-2" aria-label="Release year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        <section aria-label="Results">
          <p aria-live="polite" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {results.length} {results.length === 1 ? "film" : "films"} found
          </p>
          {results.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-border p-12 text-center">
              <h2 className="text-2xl">Nothing in this bin</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Loosen a filter and the potatoes will return.
              </p>
              <Button variant="rind" className="mt-6" onClick={reset}>
                Clear filters
              </Button>
            </div>
          ) : (
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((film) => (
                <li key={film.slug}>
                  <FilmCard film={film} className="h-full" />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {legend}
      </legend>
      <div className="mt-3 space-y-2">{children}</div>
    </fieldset>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-foreground/90">
        {label}
      </Label>
    </div>
  );
}
