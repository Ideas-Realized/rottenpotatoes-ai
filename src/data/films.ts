/**
 * ALL CONTENT BELOW IS FICTIONAL.
 * Titles, creators, scores, reviews, quotes and "generation tools" are invented
 * for this demo. Nothing here describes real people, films, or products.
 */

export type Format =
  | "Short Film"
  | "Trailer"
  | "Music Video"
  | "Experimental"
  | "Documentary";

export type KernelNotes = {
  story: number;
  visualCraft: number;
  originality: number;
  aiExecution: number;
};

export type Film = {
  slug: string;
  title: string;
  creator: string;
  creatorHandle: string;
  year: number;
  releaseDate: string; // ISO
  runtimeMin: number;
  format: Format;
  genres: string[];
  logline: string;
  synopsis: string;
  spudScore: number; // 0-100 curator score
  crowdCrop: number; // 0-100 community score
  crowdVotes: number;
  certifiedCrispy: boolean;
  kernelNotes: KernelNotes;
  consensus: string;
  tools: string[];
  posterHue: number; // drives CSS-generated poster art
  posterMotif:
    | "steamkitchen"
    | "rainwindow"
    | "descent"
    | "mirrorface"
    | "moonharvest"
    | "eclipse"
    | "tunnel"
    | "grid"
    | "orbit"
    | "strata"
    | "static";
  /** Short art-direction note for the CSS-generated key art. */
  artNote: string;
  /** Curator micro-detail: why this made the shelf. */
  editorNote: string;
  /** Copy for the illustrative trailer placeholder. */
  sampleNote: string;
  /** Editorial pick flag, drives default Discover ordering. */
  editorsPick: boolean;
};


export const GENRES = [
  "Sci-Fi",
  "Horror",
  "Comedy",
  "Drama",
  "Fantasy",
  "Noir",
  "Surreal",
  "Musical",
] as const;

export const FORMATS: Format[] = [
  "Short Film",
  "Trailer",
  "Music Video",
  "Experimental",
  "Documentary",
];

export const TOOLS = [
  "Lumenwave 3",
  "Tuberflow",
  "Halcyon Motion",
  "Mudlark Diffusion",
  "Voxpotato TTS",
  "Kettle Upscale",
  "Grainsmith",
  "Chorusbox Audio",
] as const;

export const films: Film[] = [
  {
    slug: "the-mashing-hour",
    title: "The Mashing Hour",
    creator: "Odile Fennimore",
    creatorHandle: "@fennimore.render",
    year: 2026,
    releaseDate: "2026-07-28",
    runtimeMin: 14,
    format: "Short Film",
    genres: ["Sci-Fi", "Drama"],
    logline:
      "A night-shift kitchen worker in a flooded megacity discovers the recipe archive has started dreaming without her.",
    synopsis:
      "Set across a single humid shift, this fictional short follows Wren as the automated kitchen she supervises begins improvising meals for people who no longer exist. The film's synthetic crowd scenes were assembled from invented prompt libraries, then hand-graded frame by frame.",
    spudScore: 94,
    crowdCrop: 88,
    crowdVotes: 4210,
    certifiedCrispy: true,
    kernelNotes: { story: 92, visualCraft: 96, originality: 95, aiExecution: 93 },
    consensus:
      "Tender, sweaty and unnervingly specific. The Mashing Hour proves generated cinema can hold a small human beat without blinking.",
    tools: ["Lumenwave 3", "Grainsmith", "Chorusbox Audio"],
    posterHue: 74,
    posterMotif: "eclipse",
  },
  {
    slug: "starch-noir",
    title: "Starch Noir",
    creator: "Bram Osei-Tutu",
    creatorHandle: "@bramplusnoise",
    year: 2026,
    releaseDate: "2026-06-11",
    runtimeMin: 9,
    format: "Short Film",
    genres: ["Noir", "Sci-Fi"],
    logline:
      "A private eye who can only see in 24 frames per second hunts the client who invented him.",
    synopsis:
      "A fictional hard-boiled pastiche that keeps tripping over its own artifice. Rain is rendered as a deliberate glitch and every alley repeats twice, which the filmmaker claims is intentional and we choose to believe.",
    spudScore: 87,
    crowdCrop: 91,
    crowdVotes: 6890,
    certifiedCrispy: true,
    kernelNotes: { story: 84, visualCraft: 90, originality: 86, aiExecution: 88 },
    consensus:
      "A confident genre exercise that wears its seams like a trench coat. Style over substance, but what a style.",
    tools: ["Tuberflow", "Kettle Upscale", "Voxpotato TTS"],
    posterHue: 28,
    posterMotif: "tunnel",
  },
  {
    slug: "root-cellar-lullaby",
    title: "Root Cellar Lullaby",
    creator: "Marisol Vantree",
    creatorHandle: "@vantree.works",
    year: 2026,
    releaseDate: "2026-08-02",
    runtimeMin: 4,
    format: "Music Video",
    genres: ["Musical", "Surreal"],
    logline:
      "Four minutes of subterranean choir practice, sung by things that should not have throats.",
    synopsis:
      "A fictional music video built as one descending shot. The choir was generated from an invented vocal model and then deliberately detuned by hand.",
    spudScore: 91,
    crowdCrop: 79,
    crowdVotes: 2115,
    certifiedCrispy: true,
    kernelNotes: { story: 78, visualCraft: 95, originality: 94, aiExecution: 90 },
    consensus:
      "Gorgeous, gross, hypnotic. The rare generated music video that earns its uncanny edges instead of apologising for them.",
    tools: ["Mudlark Diffusion", "Chorusbox Audio", "Grainsmith"],
    posterHue: 96,
    posterMotif: "strata",
  },
  {
    slug: "peeler",
    title: "Peeler",
    creator: "Ines Kaltbrunn",
    creatorHandle: "@kaltbrunn",
    year: 2025,
    releaseDate: "2025-11-19",
    runtimeMin: 22,
    format: "Short Film",
    genres: ["Horror"],
    logline:
      "A skincare influencer's new resurfacing routine works. It keeps working after she asks it to stop.",
    synopsis:
      "A fictional body-horror piece staged almost entirely in vertical video, then reframed for the screen. Practical prosthetic references were used to steer the generated close-ups.",
    spudScore: 76,
    crowdCrop: 94,
    crowdVotes: 12400,
    certifiedCrispy: true,
    kernelNotes: { story: 70, visualCraft: 82, originality: 74, aiExecution: 79 },
    consensus:
      "Crowd-pleasing nastiness with one truly unforgettable mirror sequence, dragged down by a final act that explains itself to death.",
    tools: ["Lumenwave 3", "Kettle Upscale"],
    posterHue: 12,
    posterMotif: "orbit",
  },
  {
    slug: "eleven-fields-of-static",
    title: "Eleven Fields of Static",
    creator: "Hollis Pang",
    creatorHandle: "@hollis.pang",
    year: 2026,
    releaseDate: "2026-05-04",
    runtimeMin: 31,
    format: "Experimental",
    genres: ["Surreal", "Drama"],
    logline:
      "Eleven unbroken takes of a wheat field being remembered slightly wrong each time.",
    synopsis:
      "A fictional long-form experiment in model drift. Each pass through the same prompt degrades further, until the field becomes an argument.",
    spudScore: 82,
    crowdCrop: 58,
    crowdVotes: 940,
    certifiedCrispy: false,
    kernelNotes: { story: 66, visualCraft: 88, originality: 96, aiExecution: 84 },
    consensus:
      "Demanding, patient, occasionally insufferable, and the most honest film about generative decay we have seen this year.",
    tools: ["Mudlark Diffusion", "Grainsmith"],
    posterHue: 55,
    posterMotif: "static",
  },
  {
    slug: "tuber-2-the-reckoning",
    title: "Tuber 2: The Reckoning",
    creator: "Gutshot Collective",
    creatorHandle: "@gutshot",
    year: 2026,
    releaseDate: "2026-08-09",
    runtimeMin: 2,
    format: "Trailer",
    genres: ["Comedy", "Fantasy"],
    logline:
      "A fake sequel trailer for a film that never existed, complete with a fake box-office record.",
    synopsis:
      "A fictional two-minute joke delivered with the budget confidence of a summer tentpole. Every credit in it is invented, including the studio.",
    spudScore: 68,
    crowdCrop: 86,
    crowdVotes: 15320,
    certifiedCrispy: false,
    kernelNotes: { story: 58, visualCraft: 74, originality: 62, aiExecution: 80 },
    consensus:
      "One perfect gag stretched across two minutes. Funny, disposable, and engineered for the repost economy.",
    tools: ["Tuberflow", "Voxpotato TTS", "Kettle Upscale"],
    posterHue: 44,
    posterMotif: "grid",
  },
  {
    slug: "how-we-faked-the-moon-harvest",
    title: "How We Faked the Moon Harvest",
    creator: "Priya Ellowin",
    creatorHandle: "@ellowin.doc",
    year: 2025,
    releaseDate: "2025-09-30",
    runtimeMin: 47,
    format: "Documentary",
    genres: ["Drama", "Sci-Fi"],
    logline:
      "An invented oral history of the fictional crew who generated the first feature-length crop opera.",
    synopsis:
      "A mockumentary that plays entirely straight. Talking heads are generated performers credited as such in the film's own disclosure card, which we appreciate more than we expected.",
    spudScore: 89,
    crowdCrop: 72,
    crowdVotes: 1780,
    certifiedCrispy: true,
    kernelNotes: { story: 91, visualCraft: 80, originality: 88, aiExecution: 86 },
    consensus:
      "A sly, generous fake history that treats disclosure as a storytelling device rather than a legal footnote.",
    tools: ["Lumenwave 3", "Voxpotato TTS", "Chorusbox Audio", "Grainsmith"],
    posterHue: 86,
    posterMotif: "strata",
  },
  {
    slug: "gravy-season",
    title: "Gravy Season",
    creator: "Dov Marchetti",
    creatorHandle: "@dov.season",
    year: 2026,
    releaseDate: "2026-03-16",
    runtimeMin: 7,
    format: "Short Film",
    genres: ["Comedy", "Drama"],
    logline:
      "Two estranged brothers cater a funeral for a man neither of them can quite remember.",
    synopsis:
      "A fictional chamber comedy with unusually restrained coverage. Notable for keeping generated faces in mid-shot long enough to actually act.",
    spudScore: 84,
    crowdCrop: 81,
    crowdVotes: 3260,
    certifiedCrispy: true,
    kernelNotes: { story: 88, visualCraft: 78, originality: 76, aiExecution: 85 },
    consensus:
      "Warm, well-written and refreshingly unimpressed with its own technology. The dialogue does the heavy lifting.",
    tools: ["Halcyon Motion", "Voxpotato TTS"],
    posterHue: 66,
    posterMotif: "eclipse",
  },
  {
    slug: "night-shift-at-the-render-farm",
    title: "Night Shift at the Render Farm",
    creator: "Kestrel Adeyemi",
    creatorHandle: "@kestrel.frames",
    year: 2026,
    releaseDate: "2026-08-13",
    runtimeMin: 11,
    format: "Short Film",
    genres: ["Horror", "Noir"],
    logline:
      "A janitor at a render farm keeps finding footage of tomorrow in the discard bin.",
    synopsis:
      "A fictional slow-burn shot in near-total darkness, lit almost exclusively by generated monitor glow. The final reveal is a single unmoving frame.",
    spudScore: 79,
    crowdCrop: 84,
    crowdVotes: 5030,
    certifiedCrispy: false,
    kernelNotes: { story: 76, visualCraft: 86, originality: 72, aiExecution: 81 },
    consensus:
      "Atmosphere for days and a genuinely great last frame, even if the middle stretch coasts on vibes.",
    tools: ["Halcyon Motion", "Mudlark Diffusion", "Grainsmith"],
    posterHue: 20,
    posterMotif: "tunnel",
  },
  {
    slug: "sprout-theory",
    title: "Sprout Theory",
    creator: "Yuki Barnhardt",
    creatorHandle: "@sprouttheory",
    year: 2026,
    releaseDate: "2026-08-15",
    runtimeMin: 5,
    format: "Experimental",
    genres: ["Fantasy", "Surreal"],
    logline:
      "A seed is interviewed about its plans. The seed declines to answer.",
    synopsis:
      "Five minutes of fictional deadpan absurdity, rendered in a soft handmade palette with visible brush-like artifacts left deliberately intact.",
    spudScore: 72,
    crowdCrop: 66,
    crowdVotes: 620,
    certifiedCrispy: false,
    kernelNotes: { story: 62, visualCraft: 84, originality: 82, aiExecution: 70 },
    consensus:
      "A charming shrug of a film. Slight by design, but the palette alone justifies the five minutes.",
    tools: ["Mudlark Diffusion", "Kettle Upscale"],
    posterHue: 108,
    posterMotif: "orbit",
  },
];

export type Reviewer = {
  id: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  initials: string;
  hue: number;
};

export const reviewers: Reviewer[] = [
  {
    id: "r-quill",
    name: "Devon Quillfeather",
    handle: "@quillfeather",
    role: "Lead Curator",
    bio: "Fictional critic. Watches everything at 1x and complains about it at 2x.",
    initials: "DQ",
    hue: 80,
  },
  {
    id: "r-onwuka",
    name: "Amara Onwuka",
    handle: "@amara.frames",
    role: "Visual Craft Editor",
    bio: "Fictional colourist turned critic. Will pause on a single frame for an hour.",
    initials: "AO",
    hue: 40,
  },
  {
    id: "r-strand",
    name: "Piet Strand",
    handle: "@pietstrand",
    role: "Genre Correspondent",
    bio: "Fictional horror obsessive. Believes every film improves with fewer explanations.",
    initials: "PS",
    hue: 18,
  },
  {
    id: "r-lo",
    name: "Nadia Lo",
    handle: "@nadialo",
    role: "Toolchain Analyst",
    bio: "Fictional pipeline nerd. Reads disclosure cards for fun.",
    initials: "NL",
    hue: 100,
  },
  {
    id: "r-baptiste",
    name: "Remy Baptiste",
    handle: "@remy.b",
    role: "Community Editor",
    bio: "Fictional former festival programmer. Keeps the Crowd Crop honest.",
    initials: "RB",
    hue: 60,
  },
];

export type Review = {
  id: string;
  filmSlug: string;
  reviewerId: string;
  score: number;
  fresh: boolean;
  headline: string;
  pullQuote: string;
  body: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "rv-01",
    filmSlug: "the-mashing-hour",
    reviewerId: "r-quill",
    score: 95,
    fresh: true,
    headline: "The first generated short that made me forget the pipeline",
    pullQuote: "It smells like a kitchen. I cannot explain how.",
    body: "Fennimore's fictional short does something almost no generated work manages: it stays still. There are maybe eleven cuts in fourteen minutes, and each one lands like a decision rather than a workaround. The archive's dream sequences flirt with incoherence and then pull back at exactly the right moment.",
    date: "2026-07-30",
  },
  {
    id: "rv-02",
    filmSlug: "the-mashing-hour",
    reviewerId: "r-onwuka",
    score: 92,
    fresh: true,
    headline: "A masterclass in humid, ugly, beautiful light",
    pullQuote: "Every highlight is dirty on purpose.",
    body: "The grade is the performance here. Steam diffuses the practical sources into a soft amber wash, and the deliberate grain hides exactly the artifacts that would otherwise break the spell.",
    date: "2026-07-31",
  },
  {
    id: "rv-03",
    filmSlug: "starch-noir",
    reviewerId: "r-strand",
    score: 88,
    fresh: true,
    headline: "Genre pastiche with a knife in its pocket",
    pullQuote: "The repeating alley is the best joke of the year.",
    body: "Osei-Tutu leans into artifice until it becomes theme. The voice work is stiff, but the stiffness reads as character rather than limitation, which is a needle almost nobody threads.",
    date: "2026-06-14",
  },
  {
    id: "rv-04",
    filmSlug: "starch-noir",
    reviewerId: "r-lo",
    score: 81,
    fresh: true,
    headline: "Immaculate toolchain, slightly thin third act",
    pullQuote: "The disclosure card is more transparent than most features.",
    body: "A clean fictional pipeline, well documented and honestly credited. The film's collapse in the final ninety seconds is a writing issue, not a rendering one.",
    date: "2026-06-16",
  },
  {
    id: "rv-05",
    filmSlug: "root-cellar-lullaby",
    reviewerId: "r-onwuka",
    score: 94,
    fresh: true,
    headline: "One descending shot, zero mercy",
    pullQuote: "I have not stopped hearing it.",
    body: "Vantree treats the camera move as a metronome and lets the choir fall out of tune around it. The detuning is manual, which is the entire point.",
    date: "2026-08-04",
  },
  {
    id: "rv-06",
    filmSlug: "peeler",
    reviewerId: "r-strand",
    score: 74,
    fresh: true,
    headline: "A great mirror scene trapped in an explainer",
    pullQuote: "Trust the audience. Cut the last four minutes.",
    body: "The escalation is genuinely upsetting until a voiceover arrives to describe what we already understood. The crowd loves it anyway, and honestly, fair.",
    date: "2025-11-24",
  },
  {
    id: "rv-07",
    filmSlug: "peeler",
    reviewerId: "r-baptiste",
    score: 69,
    fresh: false,
    headline: "The Crowd Crop is doing a lot of work here",
    pullQuote: "Popular is not the same as finished.",
    body: "Community enthusiasm for this fictional short outpaces the film by roughly twenty points. That gap is interesting, and it is why we publish both numbers.",
    date: "2025-12-02",
  },
  {
    id: "rv-08",
    filmSlug: "eleven-fields-of-static",
    reviewerId: "r-quill",
    score: 84,
    fresh: true,
    headline: "Thirty-one minutes of a field forgetting itself",
    pullQuote: "Insufferable in the way important work often is.",
    body: "Pang's fictional endurance piece will empty a room, and the people who stay will not shut up about it for a year. The eighth pass is the one that broke me.",
    date: "2026-05-09",
  },
  {
    id: "rv-09",
    filmSlug: "tuber-2-the-reckoning",
    reviewerId: "r-baptiste",
    score: 66,
    fresh: false,
    headline: "A perfect gag with a two-minute runtime problem",
    pullQuote: "Great trailer. Shame about the other ninety seconds.",
    body: "Gutshot's fictional fake sequel nails the grammar of a tentpole spot, then keeps going well past the punchline.",
    date: "2026-08-11",
  },
  {
    id: "rv-10",
    filmSlug: "how-we-faked-the-moon-harvest",
    reviewerId: "r-lo",
    score: 90,
    fresh: true,
    headline: "Disclosure as dramaturgy",
    pullQuote: "The credits are part of the film. More of this.",
    body: "Ellowin's invented oral history folds its own synthetic-performer credits into the narrative. It is the most useful thing anyone has done with a transparency card.",
    date: "2025-10-06",
  },
  {
    id: "rv-11",
    filmSlug: "gravy-season",
    reviewerId: "r-quill",
    score: 85,
    fresh: true,
    headline: "Two brothers, one funeral, no showing off",
    pullQuote: "The most confident thing here is the silence.",
    body: "Marchetti's fictional chamber piece holds mid-shots long enough for the writing to breathe, which remains the rarest choice in generated cinema.",
    date: "2026-03-21",
  },
  {
    id: "rv-12",
    filmSlug: "night-shift-at-the-render-farm",
    reviewerId: "r-strand",
    score: 78,
    fresh: true,
    headline: "Vibes, dread, and one immaculate final frame",
    pullQuote: "The middle sags. The ending does not.",
    body: "Adeyemi builds a genuinely oppressive dark, then coasts for four minutes before delivering the year's best still image.",
    date: "2026-08-15",
  },
  {
    id: "rv-13",
    filmSlug: "sprout-theory",
    reviewerId: "r-baptiste",
    score: 71,
    fresh: true,
    headline: "A shrug, but a well-painted one",
    pullQuote: "The seed declines. Respect.",
    body: "Barnhardt's fictional short is slight on purpose and honest about it. The handmade artifacts are the whole appeal.",
    date: "2026-08-16",
  },
  {
    id: "rv-14",
    filmSlug: "eleven-fields-of-static",
    reviewerId: "r-lo",
    score: 62,
    fresh: false,
    headline: "Drift as method, drift as excuse",
    pullQuote: "Sometimes degradation is just degradation.",
    body: "I admire the rigour of this fictional experiment and still think three of the eleven passes exist only to pad the runtime.",
    date: "2026-05-12",
  },
];

export type Editorial = {
  id: string;
  kicker: string;
  title: string;
  dek: string;
  author: string;
  readMin: number;
  hue: number;
};

export const editorials: Editorial[] = [
  {
    id: "ed-1",
    kicker: "Field Notes",
    title: "Nine ways to light a face that does not exist",
    dek: "Our visual craft editor breaks down the grading tricks separating the crispy from the mushy.",
    author: "Amara Onwuka",
    readMin: 8,
    hue: 40,
  },
  {
    id: "ed-2",
    kicker: "The Peel",
    title: "Against the infinite runtime",
    dek: "Generated work keeps getting longer. Almost none of it earns the extra minutes.",
    author: "Devon Quillfeather",
    readMin: 6,
    hue: 80,
  },
  {
    id: "ed-3",
    kicker: "Toolshed",
    title: "Read the disclosure card first",
    dek: "A practical guide to what a credits block actually tells you about a pipeline.",
    author: "Nadia Lo",
    readMin: 5,
    hue: 100,
  },
];

export const categories = [
  { label: "Short Films", format: "Short Film", blurb: "Under 30 minutes, over-delivering" },
  { label: "Fake Trailers", format: "Trailer", blurb: "Sequels to nothing at all" },
  { label: "Music Videos", format: "Music Video", blurb: "Sound first, sense later" },
  { label: "Experimental", format: "Experimental", blurb: "Where the models misbehave" },
  { label: "Documentary", format: "Documentary", blurb: "Invented histories, straight faces" },
];

export function getFilm(slug: string) {
  return films.find((f) => f.slug === slug);
}

export function reviewsForFilm(slug: string) {
  return reviews.filter((r) => r.filmSlug === slug);
}

export function getReviewer(id: string) {
  return reviewers.find((r) => r.id === id);
}

export function recommendations(slug: string, count = 3) {
  const film = getFilm(slug);
  if (!film) return [];
  return films
    .filter((f) => f.slug !== slug)
    .map((f) => ({
      film: f,
      overlap:
        f.genres.filter((g) => film.genres.includes(g)).length * 2 +
        (f.format === film.format ? 1 : 0),
    }))
    .sort((a, b) => b.overlap - a.overlap || b.film.spudScore - a.film.spudScore)
    .slice(0, count)
    .map((x) => x.film);
}

export function scoreTier(score: number) {
  if (score >= 85) return { label: "Crispy", tone: "gold" as const };
  if (score >= 60) return { label: "Edible", tone: "ember" as const };
  return { label: "Rotten", tone: "rot" as const };
}
