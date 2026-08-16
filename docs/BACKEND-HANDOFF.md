# Backend Handoff — Proposed Next Phase

This document describes the recommended backend phase for Rotten Potatoes. It is a planning artifact only; none of the systems below are implemented in V1.

## Scope boundary

V1 is a public demo frontend with local seeded data. The next phase should add persistence, auth, and moderation while keeping the existing editorial voice and fictional/sample disclosures. Do not add payments, real streaming, or email until the product explicitly needs them.

## Proposed entities

| Entity | Purpose | Key concepts |
| --- | --- | --- |
| `films` | Public editorial catalog entries. | title, slug, year, runtime, format, genre, logline, synopsis, spud_score, crowd_crop, kernel_notes, art_motif, editors_pick, art_credit, tool_ids, status (`draft` / `published` / `archived`). |
| `creators` | People or studios behind a film. | display_name, bio, website, social_links, verified flag. |
| `submissions` | Creator-submitted works awaiting review. | film_id (nullable until accepted), submitted_by, status (`pending` / `in_review` / `approved` / `rejected`), moderation_notes, submitted_at, decided_at. |
| `editorial_reviews` | Staff reviews and verdicts. | film_id, reviewer_id, pull_quote, verdict, body, score_components, published_at. |
| `community_ratings` | Visitor crowd scores and short reactions. | film_id, user_id, rating (1–10), optional comment, moderated flag. |
| `moderation_decisions` | Audit trail of approve/reject/flag actions. | target_type, target_id, moderator_id, decision, reason, created_at. |
| `toolchain_disclosures` | Generation tools and techniques used. | name, category, description, website, disclosure_text. |

## Roles

- **Visitor**: browses public films, reads reviews, rates films, saves a watchlist (anonymous or authenticated).
- **Creator**: submits films, edits own drafts, sees submission status, receives decisions.
- **Reviewer / Editor**: reviews submissions, writes editorial reviews, curates picks, publishes films.
- **Admin**: manages roles, moderates community ratings, configures toolchains, can archive content.

## Submission-to-publication workflow

1. **Creator drafts** a submission in the UI.
2. **Submit** creates a `submissions` row in `pending` status and links to a `films` draft row.
3. **Moderation queue** assigns the submission to an editor.
4. **Editorial review**: editor checks disclosures, verifies fictional/sample labelling, scores Kernel Notes, and writes a verdict.
5. **Decision**:
   - Approved: film status becomes `published`, submission becomes `approved`, editorial review is published.
   - Rejected: submission becomes `rejected` with a moderation note; creator can revise and resubmit.
6. **Community ratings** open after publication.

## Moderation and disclosure safeguards

- Human editorial review is required before any submission becomes public.
- Every published film must carry a clear fictional/sample disclosure and an art/toolchain credit.
- Reject submissions that claim to be real films, real people, or copyrighted works.
- Use Row-Level Security (RLS) so creators only see their own submissions and drafts.
- Maintain a `moderation_decisions` audit log for every approve/reject/flag action.
- Community ratings should support flagging and a `moderated` state to hide abusive content.

## Staged implementation order

1. **Database schema** — create `films`, `creators`, `submissions`, `editorial_reviews`, `community_ratings`, `moderation_decisions`, and `toolchain_disclosures` with RLS policies and grants.
2. **Authentication** — add creator/editor/admin sign-up and roles (Lovable Cloud / Supabase recommended).
3. **Submission intake** — replace the UI-only submit form with a real `submissions` insert; optionally store attachments in object storage.
4. **Editorial review workflow** — build an editor dashboard for reviewing, scoring, approving, and rejecting submissions.
5. **Community ratings** — allow authenticated visitors to submit crowd scores and short reactions.
6. **Email notifications** — notify creators of submission decisions and editors of new submissions. **Keep this last and clearly deferred until the product needs it.**

## Out-of-scope for the backend phase unless requested

- Real video streaming or hosting.
- Payments, subscriptions, or paywalls.
- Marketing email newsletters.
- Integration with external review aggregators.
