# Component Registry

Factual inventory of shared code. Reuse before extending; extend before creating.

## Rotten Potatoes vertical slice (`src/components`)

| Component | File | Purpose |
| --- | --- | --- |
| `SiteHeader`, `Newsletter`, `SiteFooter` | `SiteChrome.tsx` | Sticky nav with mobile disclosure, UI-only newsletter block, footer index and fictional-demo disclosure |
| `FilmCard`, `SaveButton` | `FilmCard.tsx` | Standard film tile: poster, Spud Score, Certified Crispy / Editor's pick flags, "why we chose it" note, save toggle |
| `PosterArt` | `PosterArt.tsx` | CSS-generated key art motifs with scanlines, vignette, gold frame; `compact` and `showCredit` variants |
| `TrailerStage` | `TrailerStage.tsx` | Letterboxed watch stage with illustrative/fictional placeholder state and runtime treatment |
| `ReviewCard`, `ReviewerAvatar` | `ReviewCard.tsx` | Review spread with reviewer identity, pull quote, verdict |
| `SpudScore`, `SpudGlyph`, `ScoreMeter` | `SpudScore.tsx` | Score badge tiers, potato glyph, Kernel Notes meters |
| `WatchlistProvider`, `useWatchlist` | `watchlist.tsx` | Demo-only localStorage watchlist context |

Data and helpers live in `src/data/films.ts` (`films`, `reviewers`, `reviews`,
`getFilm`, `getReviewer`, `scoreTier`, `editorialOrder`, `editorsPicks`).

## UI primitives (`src/components/ui`)

shadcn primitives, styled through semantic tokens. Present today: accordion,
alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar,
card, carousel, chart, checkbox, collapsible, command, context-menu, dialog,
drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar,
navigation-menu, pagination, popover, progress, radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch,
table, tabs, textarea, toggle, toggle-group, tooltip.

`button.tsx` carries the brand variants `crispy`, `rind`, and `rot`. Toasts use
sonner via `@/components/ui/sonner`, mounted once in `__root.tsx`.

## Reuse vs extend

**Reuse as-is** when the need matches an existing component's role: any film tile
uses `FilmCard`, any score display uses `SpudScore` / `ScoreMeter`, any review
uses `ReviewCard`, any key art uses `PosterArt`.

**Extend** by adding a prop or variant to the existing component when the change
is a bounded presentational difference (density, framing, whether a credit line
shows). Brand-specific button looks become `button.tsx` variants, not local
class soup.

**Create new** only when the role genuinely does not exist yet. Then: keep
primitives in `ui/` general and token-driven, keep Rotten Potatoes composition,
poster art, and animation in the vertical slice, and register it in this table in
the same phase.

**Never** duplicate a component to tweak styling, hardcode raw colors where a
semantic token exists, or place product-specific copy inside a `ui/` primitive.
