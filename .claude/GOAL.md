# Goal: Portfolio Repositioning

This is the definition-of-done for the repositioning project — what an agent (or an autonomous loop, once one is started) checks against to know the work is complete. It's a living checklist: some items can't be scoped precisely until the context documents in `.claude/context/` are filled in.

## Why

The portfolio currently frames the user primarily around a "Scrum Master career pivot" narrative. The goal is to reposition it around **React, TypeScript, and AI-augmented development**, replacing outdated project examples with current, more representative work.

## Completion criteria

- [ ] `.claude/context/positioning.md` is filled in (target messaging, audience, tone, what to lead with/de-emphasize)
- [ ] `.claude/context/removals.md` is filled in (which of the 7 existing projects are kept vs. removed, and why)
- [ ] `.claude/context/projects/*.md` are filled in for all four new projects (Andromedae, Hold My Spoon, She Codes Data Platform & Dashboard, wedding apps)
- [ ] Homepage (`/`) and About (`/about`) messaging leads with React/TypeScript/AI-augmented development, per `positioning.md` — not a Scrum Master/career-pivot frame
- [ ] Case study pages exist for: Andromedae, Hold My Spoon, She Codes Data Platform & Dashboard
- [ ] A mention/section exists for private wedding-app React/TypeScript work, respecting the confidentiality constraints noted in `wedding-apps.md`
- [ ] Projects marked "Remove" in `removals.md` are fully removed: MDX file, images under `public/images/projects/`, and any references in `src/app/resources/content.js`
- [ ] `/skills` page and `/agile` (Agile Resources) section resolved per the open question in `positioning.md` (kept as-is / reframed / removed) — **not yet decided, do not act on this without an explicit answer in positioning.md**
- [ ] All new/changed content reviewed against `.claude/skills/frontend-design/SKILL.md` (including its Accessibility & Contrast section) and `.claude/skills/react-best-practices/SKILL.md`
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Bundle/payload size checked via `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes` (the `/og` route has hit Vercel's payload limit before — see commit `2668946`)
- [ ] Preview deployment verified (via `vercel deploy` or a Vercel MCP deployment check) before promoting to production
- [ ] `AGILE_RESOURCE_PASSWORD` env var is set in the real Vercel project (local `.env.local` fix landed separately — see `CLAUDE.md`)

## How this gets executed

See `.claude/context/README.md` for the intended workflow: one agent per project case study drafts in parallel from its context doc, then a review agent checks consistency, tone, and technical accuracy across all drafts before anything lands. Once that pattern has been run through manually at least once successfully, it's a candidate for wrapping in an autonomous `/loop` that keeps picking off unchecked boxes above until everything is checked — but starting that loop is a separate, explicit decision, not something that happens automatically when this file is created.

## Status

**Not started.** All context documents are currently empty templates. The next step is the user filling in `.claude/context/positioning.md`, `.claude/context/removals.md`, and the four `.claude/context/projects/*.md` files.
