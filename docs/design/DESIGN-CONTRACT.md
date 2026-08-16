# Rotten Potatoes Design Contract

The binding design rules for this repository. Any change that conflicts with this
document is wrong unless the contract is updated first.

## Product

Rotten Potatoes is a public editorial discovery and review destination for
fictional, sample AI-generated video work.

- Primary visitor action: browse a film, understand why it was chosen, open its
  illustrative watch experience.
- Secondary creator action: submit a film (UI only).
- Never imply real streaming, real reviews, or real submission processing until
  those systems actually exist.

## Brand

- Traits: cinematic, editorial, irreverent.
- Not this: a Rotten Tomatoes clone, generic SaaS, an AI neon-tech dashboard.
- Public name is always "Rotten Potatoes". "Spud Score" names the scoring system
  only, never the product.

## Visual signature

"Cult cinema review desk":

- Near-black film-magazine ground.
- Warm potato-gold key light.
- Off-white type.
- Restrained deep-red negative signal (`--rot`), used sparingly.
- Tactile grain and halftone texture.
- Framed, CSS-generated key art. Every featured film gets a distinct key-art
  concept inside the shared art direction. No external image dependencies and no
  copyrighted movie imagery.

Type: `--font-display` (Anton) for display and headings, body sans for copy,
mono for eyebrows, metadata, and score numerals.

## System rules

- Use semantic tokens and registered/reusable primitives before inventing new
  one-off controls.
- No raw colors in feature components when a semantic token exists
  (`background`, `foreground`, `card`, `muted-foreground`, `border`, `gold`,
  `gold-deep`, `ember`, `rot`, `surface`, `surface-raised`).
- Keep shared primitives general; keep Rotten Potatoes-specific composition,
  poster art, and animation in its own vertical slice.
- One primary CTA per surface.

## UX and accessibility

- Mobile-first.
- Visible keyboard focus on every interactive element.
- Semantic headings, labels, and alt/`aria` text.
- Meaningful loading, empty, error, and success states.
- Minimum 44px touch targets.
- Adequate contrast against the near-black ground.
- Reduced-motion fallback for grain, marquees, and transitions.
- Any illustrative media must clearly say it is illustrative or fictional.

## Delivery and QA

- One bounded implementation phase per prompt.
- Never rewrite a prior prompt; send numbered addenda (see
  [docs/prompts/README.md](../prompts/README.md)).
- After each phase, inspect real 390x844 mobile and 1280x720 desktop previews and
  check console errors, overflow, routes, and interaction states
  (see [docs/qa/CHECKLIST.md](../qa/CHECKLIST.md)).
- If a Lovable call is ambiguous or times out, verify the current preview and the
  committed diff before retrying.
- Do not add backend, auth, payments, email delivery, real uploads, or real
  submission processing unless explicitly asked.
