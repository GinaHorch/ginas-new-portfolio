# Project: SIS Time Tracker

Factual source for `src/app/work/projects/sis-time-tracker.mdx`. Compiled on 2026-10-05 from the
`sis-timetracker` repository (README, CLAUDE.md, supabase/migrations/README.md, CI config, git
history) and from checks run in the session that wrote it. Do not add claims this file does not
support.

## What it is

A time-tracking and invoicing web app for Gina's own sole-trader business, Social Insight
Solutions (SIS). Logs hours against clients and projects, filters by Australian financial year,
generates and regenerates PDF invoices (including superannuation as a separate line), sends
invoice reminders per billing cycle, and charts monthly revenue. Single user.

## Ownership and status

- **Built by Gina, solo.** First commit 14 July 2025. All 148 non-Dependabot commits are hers
  (AI-assisted — see below).
- **In real use** for the business's invoicing. 15 invoices issued to date (counter at 15 on
  2026-10-05). Do not publish invoice amounts, client names or revenue figures.
- **Runs locally** (`npm run dev`); data lives in a hosted Supabase project. Not publicly hosted.
  It was on GitHub Pages; that stopped when the paid GitHub plan was cancelled (Pages on a
  private repo needs one).
- **Planned host: Cloudflare Pages, when remote access is operationally needed** — chosen because
  it can send real HTTP security headers (closing the framing gap), serves from a domain root,
  and retires the `gh-pages` dependency. Not done yet; describe as planned.
- **Repository is private.** No source link, no live link.

## Stack

React 19, TypeScript (strict), Vite 8, Tailwind CSS 4, Radix UI primitives, Supabase (Auth,
PostgreSQL, Storage), zod, Chart.js, jsPDF, Vitest, Playwright, GitHub Actions, Dependabot.
AI-assisted development with Claude Code.

## The hardening work (3–5 October 2026)

An iterative review-and-hardening pass: review, fix, re-run, repeat — 47 commits over three
days. **No single findings count or severity summary is on record**; frame it as a review and
hardening pass, not as "N findings". Structured against the OWASP Top 10:2025.

### Threat model

"Local" app, public attack surface: the backend is a public Supabase endpoint and the anon key
ships in the client bundle by design. Anyone with it can call PostgREST and Storage directly.
So RLS and Supabase Auth are the security boundary; UI route guards are convenience only.
Designed as if multi-user and public.

### What was found (all verified, not inferred)

- Every table had RLS enabled but its only policy was `USING (true)` — any authenticated
  account could read, change and delete every row. No owner column existed to scope by.
- The invoices storage bucket was public — an invoice PDF was fetched with no credentials
  (and again with a deliberately invalid API key), HTTP 200.
- Public sign-up was open at the API (`disable_signup: false`) without email verification,
  even after the sign-up form had been removed from the UI.
- Invoice numbers were allocated with a read-then-write pair.
- Failed reads returned `[]`, indistinguishable from an empty table — the invoice form could
  total real work to a $0 invoice, and regeneration could overwrite a real PDF and stored totals
  with zeros.
- TypeScript files were not linted at all (ESLint matched only .js/.jsx: 2 files linted, now
  42). Enabling it exposed a real Rules-of-Hooks crash in a form modal.
- No CI, no tests, no Content-Security-Policy.
- Debug logs printed the authenticated user's UUID (six calls).
- A date formatter parsed date-only strings as UTC: in New York `2026-01-01` displayed as
  `31-12-2025`, moving work across a financial-year boundary. Passed every test in Perth; found
  by running the suite under five timezones.
- Any live session could set a new password with no further proof.
- Project updates sent a whole row object (mass assignment of `id`, `user_id`).

### What was changed

- Owner-scoped RLS on all five tables (`user_id = auth.uid()`, select/insert/update/delete),
  `anon` grants revoked, private bucket with owner-scoped storage policies and short-lived signed
  URLs. Verified live: 20 policies, none `USING (true)`, zero anon grants.
- Sign-up closed and email confirmation on — verified against `/auth/v1/settings`.
- TOTP MFA enabled; 12-character minimum; generic auth error messages (no account
  enumeration); reset redirects restricted to an allow-list.
- Password-change gate: re-authentication code required unless the session came from a
  reset link; uncertain cases take the strict path. Compensates for Supabase's server-side
  "secure password change", not available on the current plan. Known limit: a stolen session
  token calling the API directly is not stopped by it.
- Atomic `reserve_invoice_number()`; PDFs stored at the row's saved path, never rebuilt from
  the number; creating an invoice cannot overwrite an existing file.
- Fail-closed reads (`null` on failure, blocking error panel, regeneration aborts).
- Business invariants as DB constraints (migration 0008): positive hours, non-negative
  whole-cent money, `total = fee + super`, one invoice per project period, known billing cycles,
  en-dash financial-year format.
- Generated DB types + zod validation of every row at the boundary, mirroring the constraints.
- Env-var config with startup validation (rejects a service-role key pasted as the anon key).
- `logError()` helper; no emails, tokens, user ids or amounts logged.
- CSP on both HTML entry points, verified in a browser against the production build; inline
  script moved into the bundle.
- Explicit column allow-list for project updates.
- Nine idempotent, versioned migrations, applied by hand after review; all verified applied.

### Accessibility (WCAG 2.2 AA), 5 October 2026

Static audit of every component, then a live keyboard/reflow check of the signed-in app (Gina
signed in; nothing saved, deleted or generated). The live pass found three defects the static
read could not:

- Dialogs never restored focus on close (Radix only returns focus to a `DialogTrigger`; every
  dialog in the app opens from state).
- A dialog taller than the viewport was cut off: Generate Invoice was 1066px tall in a 700px
  window, its title 184px off-screen with the page scroll-locked.
- Invoice filters overflowed a 320px viewport.

Static findings fixed: no delete confirmation for time entries (3.3.4); chart canvas had no
text alternative or data table (1.1.1); no `<main>` landmark; errors only in toasts; focus lost
on form swaps; several contrast misses; unnamed progress bars.

A CSS bug was masking a contrast failure: oklch tokens wrapped in `hsl()` were invalid, and the
unlayered rule overrode every Tailwind border class, so every border rendered black. Black
passed WCAG 1.4.11; the intended light-grey form-field borders (~1.5:1) would not have. Fixed
both together; an e2e test guards it and was mutation-checked against the old CSS.

Also found in passing: both project forms offered a "Weekly" billing cycle the database rejects.

Not covered: real screen reader testing, axe-core, 400% zoom.

### Verification (current as of 2026-10-05)

- `typecheck`, `lint` (type-aware typescript-eslint + jsx-a11y, warnings fail), 200 Vitest unit
  tests, the same suite under 5 timezones (UTC-10 to UTC+14), 15 Playwright tests against the
  production build, `npm audit --audit-level=high` — all in CI on every push; actions pinned by
  SHA; Dependabot weekly.
- Browser tests are hermetic (never sign in).
- Mutation-checked tests: fail-closed reads (`return []` makes it fail), password-change gate
  (falling back to "recovery" fails four tests), border contrast (old CSS fails it).
- `npm audit`: 0 vulnerabilities on 2026-10-05.

### Decisions and trade-offs

- Leaked-password protection and secure password change not on the current Supabase plan —
  compensated and documented.
- Three dependency upgrades deliberately held (TypeScript 7, ESLint 10, gh-pages pinned to
  6.1.1 because every newer release pulls a high-severity advisory with no fixed version). Audit
  threshold not relaxed.
- Business bank details remain in the client bundle (invoice PDF builder): env vars would not
  help (Vite inlines them); the real fix is a protected table. Low priority — the same details
  are on every invoice sent.
- `style-src 'unsafe-inline'` required by Radix/sonner inline style attributes.
- No framing protection without real headers — closed by the Cloudflare move.
- A mistake caught: while closing sign-up, the Email provider was also switched off, which
  would lock out the only account; found by checking live auth settings.

### Still open

1. Move to Cloudflare Pages when needed, with real security headers.
2. Six components set state inside an effect (lint rule disabled); a refactor with real risk.
3. No React component tests; invoice generation not tested end to end (needs a seeded account).
4. Second-user readiness: nothing creates an `invoice_counter` row for a new account.
5. Read business details from a protected table if the app ever goes public.
6. Screen reader and axe-core testing.

## AI-assisted workflow

Claude Code, configured to the project's standards:

- `CLAUDE.md`: threat model, one rule per OWASP 2025 category, WCAG 2.2 AA rules, TypeScript
  rules, project gotchas — now a living record of why decisions were made.
- Five custom skills: OWASP security review, Supabase RLS audit, accessibility audit,
  dependency and secrets hygiene, TypeScript quality.
- Supabase MCP configured read-only and scoped to the one project; MCP versions pinned.
- Rules: every finding cites file and line and is labelled Confirmed / Likely / Needs
  verification; reviews state what they did not cover; the assistant proposes SQL and Gina
  reviews and applies migrations by hand; no security control is weakened to make a build pass.
