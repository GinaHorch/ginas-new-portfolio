# Goal: Portfolio Repositioning

This is the definition of done for the portfolio repositioning project — what an agent, review pass, or later autonomous loop checks to know the work is complete.

The context documents in `.claude/context/` define the approved messaging, project facts, public/private boundaries and removal decisions. Do not invent missing details to satisfy this checklist.

## Why

The portfolio currently frames Gina primarily around a **"Scrum Master / career pivot"** narrative.

The goal is to reposition it around **TypeScript and full-stack development, real production software and AI-assisted engineering**, supported by demonstrated capability across React/Next.js, Astro, APIs and integrations, Supabase/PostgreSQL, cyber security, systems thinking and collaborative delivery.

React remains a prominent skill, but the portfolio should not narrow Gina's current capability to "React developer" alone.

## Completion criteria

### Context and source material

- [x] `.claude/context/positioning.md` contains the approved target messaging, audience, tone, hierarchy, skills direction and framing guardrails.
- [x] `.claude/context/removals.md` contains the approved keep/remove/replace decisions and Agile-resource cleanup requirements.
- [x] `.claude/context/projects/andromedae.md` is populated with verified project facts and pre-/post-launch metric guardrails.
- [x] `.claude/context/projects/hold-my-spoon.md` is populated with verified inherited-codebase, API/integration and AI-assisted workflow details.
- [x] `.claude/context/projects/she-codes-data-platform.md` is populated with verified platform, data, identity, privacy and AI-assisted workflow details.
- [x] `.claude/context/projects/wedding-apps.md` is populated with verified Becko & Ava Wedding Guestbook details, design attribution and privacy boundaries.
- [x] The retained end-to-end data engineering project is either given its own context document or is reframed only from verified facts already present in its existing MDX.

### Site positioning

- [x] Homepage (`/`) and About (`/about`) clearly position Gina as a current software developer, not primarily as a Scrum Master or career changer.
- [x] Above-the-fold messaging leads with TypeScript/full-stack development, real software and AI-assisted engineering, consistent with `positioning.md`.
- [x] React/Next.js remain prominent without excluding Astro, APIs, databases, deployment, security and systems capability.
- [x] AI is presented as an engineering workflow involving context, constraints, review and verification — not as a substitute for technical judgement.
- [x] Cyber security and systems experience strengthen the development story without overwhelming it.
- [x] Agile philosophy remains visible as collaborative/iterative ways of working, while Scrum Master identity is de-emphasised.
- [ ] Current GitHub and LinkedIn links are verified. — **GitHub verified** (`github.com/GinaHorch` resolves to the right profile). **LinkedIn blocked:** `linkedin.com/in/gina-sis/` returns HTTP 999 to automated requests, so it cannot be verified programmatically. Note that project MDX previously carried a *different* handle (`gina-horch`); the unused duplicate was dropped, but a human needs to confirm which handle is current.
- [x] Homepage/page metadata and OG copy reflect the new positioning and no longer lead with Scrum Master/career-pivot language.

### Project case studies

- [x] A case study exists for **Andromedae** with accurate pre-/post-launch language and no unverified production metrics.
- [x] A case study exists for **Hold My Spoon** that clearly states the app was inherited partially built and demonstrates substantial development, APIs/integrations, Stripe/webhook work and iterative production support.
- [x] A case study exists for **She Codes Data Platform** that presents it as a connected data/application platform rather than merely a dashboard and protects private organisational data.
- [x] A full case study exists for **Becko & Ava Wedding Guestbook**, linking the public live application, crediting Bianca Di Biase for design/visual identity, respecting the private repository, and exposing no private guest/admin data.
- [x] The retained end-to-end data engineering project is reframed toward the new positioning without invented facts.
- [x] Project ownership is accurate across all case studies: built vs inherited, design vs development, and organisational/private boundaries are not blurred.

### Removals and navigation

- [x] Projects marked **Remove** in `removals.md` are fully removed: MDX, remaining assets, homepage/work references and metadata references.
- [x] Projects marked **Replace** are correctly replaced with the four current project case studies and use consistent titles/slugs/assets.
- [x] `/agile` and its Agile Resource content are removed.
- [x] Auth/API/env/cookie infrastructure used **only** by the removed Agile Resources is removed after dependency verification.
- [x] No obsolete `AGILE_RESOURCE_PASSWORD`, Agile protected-route, Agile navigation or sitemap references remain if they have no other use.
- [x] Scrum Master / Scrum-focused certification cards that reinforce the old primary identity are removed.

### Skills

- [x] `/skills` is rebalanced toward Software Development, AI-Assisted Engineering, Data & Integrations, Cyber Security, Cloud & Systems, and Collaborative Delivery.
- [x] TypeScript, React/Next.js, APIs, Supabase/PostgreSQL and AI-assisted workflows receive appropriate prominence.
- [x] Cyber security skills from professional/practical work and Diploma/lab learning are included without overstating level of expertise.
- [x] Agile/SAFe/Scrum/Kanban remain only as proportionate supporting ways-of-working skills.
- [x] Unsupported percentage-style proficiency claims are removed or replaced with more defensible experience categories where practical.

### Review and quality

- [x] All new/changed content is reviewed against `.claude/skills/frontend-design/SKILL.md`, including Accessibility & Contrast requirements.
- [x] All React/Next.js changes are reviewed against `.claude/skills/react-best-practices/SKILL.md` where relevant.
- [x] Public/private boundaries are reviewed for all projects before deployment.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [ ] Bundle/payload size is checked via `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes` (the `/og` route has hit Vercel's payload limit before — see commit `2668946`). — **Blocked:** the Vercel CLI is not installed and the repo is not linked (`vercel login`/`vercel link` are interactive). Local build output was checked instead: `.next/static` totals 1.5 MB across all routes, `.next/server/app/og` is 36 KB plus a 408 KB font asset, no runtime dependency was added and `cookie` was removed. The `/og` route stays on the `nodejs` runtime.
- [ ] Preview deployment is verified via `vercel deploy` or Vercel MCP before promoting to production. — **Blocked:** same reason; no Vercel CLI, no linked project, no Vercel MCP server configured. Verified locally instead against `next build` + `next start`: every route returns 200, `/og` renders, and the sitemap lists only the five current projects.
- [x] `CLAUDE.md` is updated after structural removals so it accurately describes the final repository state.

## Execution model

See `.claude/context/README.md` for the intended workflow.

Project case studies may be drafted in parallel from their own context files. Shared homepage/About/Skills/navigation/config work should be coordinated through an integration/review phase to avoid conflicting edits and inconsistent messaging.

After this workflow has been completed manually and reliably at least once, it may become a candidate for an autonomous `/loop` that works through unchecked criteria. Starting that loop is a separate explicit decision and is not implied by the existence of this file.

## Status

**Implementation complete except for three externally blocked items** (LinkedIn link verification, Vercel bundle-payload check, Vercel preview deployment). Each is annotated inline above.

Andromedae production-domain cutover is scheduled for **10 August 2026**. Production Lighthouse/Core Web Vitals and post-launch metrics remain pending until measured against the public production site. The case study currently states pre-launch numbers and labels them as such, and carries **no `linkLive`** — the public domain still served the legacy Wix site at the time of writing.

### Follow-ups for the maintainer

- Add `linkLive: "https://www.andromedae.com.au/"` to `andromedae.mdx` after the cutover is verified, and replace the pre-launch Lighthouse paragraph with measured production results.
- Delete the now-unused `AGILE_RESOURCE_PASSWORD` from the local `.env.local` and from the Vercel project's environment variables. Nothing reads it any more.
- `public/images/projects/project-04/wedding-gallery-swipe.png` was left out of the wedding case study: it captures an "Error fetching messages: TypeError: Failed to fetch" state. Replace it with a working gallery screenshot to use it.
- `public/images/projects/project-01/andromedae-lighthouse.png` is not published: its address bar exposes the client's pre-production Cloudflare Workers URL. Crop that out, or re-shoot against the production domain after cutover.
- Confirm which LinkedIn handle is current (`gina-sis` is what the site uses).
- `notes.txt` at the repo root still contains planning notes for the removed Agile Resources section.
