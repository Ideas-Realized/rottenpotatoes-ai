# Release QA Checklist

Run manually at the end of every implementation phase. There is no automated CI
enforcing this checklist. Review at both viewports: **390x844** (mobile) and
**1280x720** (desktop).

## Routes

- [ ] `/` renders, hero headline and one primary CTA present
- [ ] `/discover` renders with results and working search
- [ ] `/films/$slug` renders for every seeded film slug
- [ ] `/reviews` renders with filters
- [ ] `/about` renders
- [ ] `/submit` renders
- [ ] Every in-app link resolves; no dead or 404 route
- [ ] Unknown route shows the intended not-found state

## Interaction states

- [ ] Hover, active, and disabled states visible on buttons, links, filter chips
- [ ] Save/watchlist toggle flips label and `aria-pressed`, toast appears
- [ ] Watchlist state survives reload (localStorage, demo only)
- [ ] Newsletter submit shows demo-labelled success, no network call
- [ ] Submit form validates required fields and shows demo-labelled success
- [ ] Filters combine correctly; clear/reset restores defaults
- [ ] Empty state appears for a no-result query and names the query
- [ ] Watch stage placeholder opens and closes cleanly

## Accessibility

- [ ] Keyboard-only pass through each page: order is logical, focus always visible
- [ ] Mobile menu toggle exposes `aria-expanded` / `aria-controls` and is reachable
- [ ] One `<h1>` per page, headings nested in order
- [ ] Every control has a visible label or `aria-label`; decorative art is `aria-hidden`
- [ ] Touch targets at least 44x44 on mobile
- [ ] Text and gold-on-charcoal accents meet contrast requirements
- [ ] Live regions announce async/success feedback

## Reduced motion

- [ ] With `prefers-reduced-motion: reduce`, grain, marquee, and transform
      animations stop or reduce to a fade
- [ ] No content is unreachable when motion is disabled

## Layout and console

- [ ] No horizontal overflow at 390px; no clipped or overlapping text
- [ ] Sticky header does not cover focused content or anchors
- [ ] Long titles, loglines, and tool badges wrap rather than truncate unreadably
- [ ] Browser console clean: no errors, no React key/hydration warnings
- [ ] No failed network requests

## Fictional / sample disclosure

- [ ] Watch stage states the work is illustrative, not real streaming
- [ ] Scores, reviews, reviewers, creators, and tool metadata read as fictional
- [ ] Newsletter and submit success copy says demo/UI-only
- [ ] Footer disclosure line present
- [ ] No claim of real reviews, real streaming, or real submission processing

## Metadata and release

- [ ] Each content route has its own `head()` with unique title (<60 chars) and
      description (<160 chars), plus og and twitter fields
- [ ] No placeholder titles anywhere
- [ ] `robots.txt` intact; canonical/viewport correct
- [ ] Images and CSS art have accessible text equivalents
- [ ] Production build passes before publishing
