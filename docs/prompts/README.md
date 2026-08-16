# Prompt Practice

How work is requested on this project. Two rules, both non-negotiable.

## 1. Append-only numbered addenda

The original prompt for a phase is a historical record. Never rewrite, reword, or
replace it. Corrections and additions ship as numbered addenda that reference the
prompt they amend.

```text
Phase 3 — Discover refinements
  Addendum 3.1 — sort labels should name the rationale, not the field
  Addendum 3.2 — editor's picks toggle stays visible when results are empty
  Addendum 3.3 — revert 3.1 wording to "Editorial order"
```

Guidelines:

- One bounded change of scope per addendum; keep it short and testable.
- State the intent, not the implementation, unless a specific technique matters.
- A reversal is a new addendum, never an edit to an earlier one.
- Addenda inherit every constraint of the parent prompt and of
  [DESIGN-CONTRACT.md](../design/DESIGN-CONTRACT.md).
- Numbering never restarts inside a phase and gaps are fine.

## 2. Verify before retry

If a Lovable action is ambiguous, appears to stall, or times out, **do not resend
the same prompt.** Resending is how duplicate routes, duplicate components, and
half-applied edits get created.

Verify first:

1. Reload the current preview and check the affected route directly.
2. Inspect the committed diff / changed files for partially applied work.
3. Check the console for errors from the partial state.
4. Then either continue with a numbered addendum describing only the remaining
   gap, or explicitly ask for the partial change to be reverted.

Retry the identical prompt only after confirming that nothing from it landed.
