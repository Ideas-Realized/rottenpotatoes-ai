# Page Signature — "Cult cinema review desk"

The shared stage every page is composed on: near-black ground, grain and halftone
texture, gold hairline frames, mono eyebrows, oversized display headlines, and
generous vertical rhythm between clearly labelled editorial sections.

## Page roles

### Home (`/`)
The editorial front page. Establishes voice with the hero headline, one primary
CTA plus one secondary, then Featured Film of the Week, the Freshly Generated
rail, the Certified Crispy grid, categories, the Spud Score explainer, editorial
cards, and the newsletter block. Home sells taste, not features.

### Discover (`/discover`)
The working vault. Search plus format, genre, runtime, tool, date, and score
filters over local seed data. Default order is editorial (picks first, then
score, then recency) with a one-line rationale for the active sort. Empty states
name the query and offer a way back.

### Film detail (`/films/$slug`)
The review desk spread. Cinematic watch stage with an explicit
fictional/illustrative placeholder state, then title, creator, year, runtime,
genre, logline, Spud Score, Crowd Crop, Kernel Notes (Story, Visual Craft,
Originality, AI Execution), curator consensus, toolchain badges, reviews, and
recommendations.

### Reviews (`/reviews`)
Filterable editorial feed of reviewer voices, verdict-forward.

### About / Methodology (`/about`)
Transparent explanation of scoring, editorial vs community signals, disclosure,
and code of conduct.

### Submit (`/submit`)
Polished creator submission form, UI only, with success feedback labelled as
demo.

## Navigation tone

Compact and typographic: mono uppercase links with wide tracking, active state in
gold, one `crispy` CTA in the header. Mobile collapses to a single Menu toggle
disclosing a stacked list with full-width tap rows. Footer is a quiet index plus
the fictional-demo disclosure line.

## Hero and key art

Heroes are letterboxed frames, not photographic banners. All key art is
CSS-generated from the `PosterArt` motif system, each featured film with its own
concept (kitchen steam, rain window, descent, mirror face, moon harvest, and
so on) sharing scanlines, vignette, and gold hairline framing. Art credit lines
are hidden on small screens; captions stack instead of overlapping.

## Color and motion boundaries

- Gold is the key light: accents, scores, active states, one CTA per surface.
- Deep red (`rot`) is negative signal only: mushy verdicts, destructive states.
- No purple/indigo gradients, no neon tech glow, no rainbow data viz.
- Motion is subtle and short: hover lift, fade/slide entrances, slow grain and
  marquee drift. No parallax spectacle, no autoplaying video, no looping
  attention grabs. Everything heavier than a fade respects
  `prefers-reduced-motion`.

## What it must not become

- A Rotten Tomatoes clone in layout, copy, iconography, or scoring visuals.
- A generic SaaS marketing page or an AI dashboard.
- A site that appears to stream real films or publish real reviews.
- A page where "Spud Score" outranks the Rotten Potatoes name.
