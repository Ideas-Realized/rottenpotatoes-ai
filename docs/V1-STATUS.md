# Rotten Potatoes — V1 Status Matrix

This matrix covers the public-demo frontend as delivered at the end of V1 Phase 3. It does not include backend, authentication, payments, email delivery, real uploads, or real submission processing.

| Requirement | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Public / published frontend | Complete | Production build passes; all public routes (`/`, `/discover`, `/films/$slug`, `/reviews`, `/about`, `/submit`) render at 390x844 and 1280x720. | Published via Lovable; preview and production URLs are active. |
| Rotten Potatoes branding and Spud Score | Complete | `docs/design/DESIGN-CONTRACT.md` and `docs/design/PAGE-SIGNATURE.md` record the brand; product copy uses "Rotten Potatoes" as the public name and "Spud Score" only for the scoring system. | Visual direction is "cult cinema review desk," not a Rotten Tomatoes clone. |
| Design system artifacts | Complete | `docs/design/DESIGN-CONTRACT.md`, `docs/design/PAGE-SIGNATURE.md`, `docs/design/COMPONENT-REGISTRY.md`, `docs/qa/CHECKLIST.md`, `docs/prompts/README.md`, and `docs/README.md` are present and linked. | Manual guardrails; no automated CI enforces them. |
| Routes and responsive editorial experience | Complete | Home, Discover, Film detail, Reviews, About, and Submit routes are implemented; responsive checks passed on mobile and desktop viewports. | Local seeded data powers search, filters, and film detail. |
| Fictional / sample disclosure | Complete | Trailer stage states the work is illustrative/fictional; footer carries a demo disclosure; submit and newsletter success copy is labelled UI-only/demo. | No claim of real streaming, real reviews, or real submission processing. |
| Illustrative watch experience | Complete | `TrailerStage` component provides a cinematic, non-streaming placeholder with runtime/progress treatment and explicit fictional-sample disclaimers. | Does not pretend to stream a real film. |
| Metadata, canonical, sitemap, robots | Complete | Every leaf route has a unique `head()` with title, description, `og:*`, `twitter:*`, and canonical link; `/sitemap.xml` returns valid XML for static routes plus every seeded film slug; `public/robots.txt` references the sitemap. | Canonical origin is `https://rottenpotatoes-ai.lovable.app`. |
| Accessibility / reduced motion / touch targets | Complete | `prefers-reduced-motion: reduce` stops grain, marquee, transitions, and decorative hover transforms; mobile interactive targets are at least 44px; global gold `:focus-visible` outline is enforced; heading hierarchy and menu ARIA semantics were fixed. | Verified with headless Chromium at both viewports. |
| Lint / build status | Complete | `bunx eslint .` reports 0 errors (7 pre-existing shadcn fast-refresh warnings); `bun run build` completes successfully with nitro output. | Warnings are from generated shadcn components and do not block the build. |
| GitHub sync status | Not configured | `git remote -v` shows `origin` pointing to Lovable private storage, not GitHub; no `.github/workflows` or GitHub Actions exist. | Local `C:\dev\RottenPotato` directory remains empty (per project owner). |
| Deferred backend scope | Deferred | No database tables, auth flows, payment integration, email service, real upload handling, or real submission processing are implemented. | Scope for the next phase is described in `docs/BACKEND-HANDOFF.md`. |

## How to read this matrix

- **Complete** means the item is implemented and verified in the current codebase.
- **Not configured / Deferred** means the item is intentionally out of scope for V1 and is queued for a future phase.
