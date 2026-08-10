# Goal: Portfolio Repositioning

This is the definition of done for the portfolio repositioning project — what an agent, review pass, or later autonomous loop checks to know the work is complete.

The context documents in `.claude/context/` define the approved messaging, project facts, public/private boundaries and removal decisions. Do not invent missing details to satisfy this checklist.

## Why

The portfolio currently frames Gina primarily around a **"Scrum Master / career pivot"** narrative.

The goal is to reposition it around **full-stack development across TypeScript and Python, real production software, and security and systems thinking**, supported by demonstrated capability across React/Next.js, Astro, APIs and integrations, Supabase/PostgreSQL, AI-assisted engineering and collaborative delivery.

**Revised August 2026.** This originally read "TypeScript and full-stack development". That was pitched at a single recruiter and proved too narrow — see the *Why this is broader than "TypeScript developer"* section of `positioning.md`.

React remains a prominent skill, but the portfolio should not narrow Gina's current capability to "React developer" alone.

## Completion criteria

### Context and source material

- [x] `.claude/context/positioning.md` contains the approved target messaging, audience, tone, hierarchy, skills direction and framing guardrails.
- [x] `.claude/context/removals.md` contains the approved keep/remove/replace decisions and Agile-resource cleanup requirements.
- [x] `.claude/context/projects/andromedae.md` is populated with verified project facts and pre-/post-launch metric guardrails.
- [x] `.claude/context/projects/hold-my-spoon.md` is populated with verified inherited-codebase, API/integration and AI-assisted workflow details.
- [x] `.claude/context/projects/she-codes-data-platform.md` is populated with verified platform, data, identity, privacy and AI-assisted workflow details.
- [x] `.claude/context/projects/wedding-apps.md` is populated with verified wedding guestbook details, design attribution and privacy boundaries.
- [x] The retained end-to-end data engineering project is either given its own context document or is reframed only from verified facts already present in its existing MDX.

### Site positioning

- [x] Homepage (`/`) and About (`/about`) clearly position Gina as a current software developer, not primarily as a Scrum Master or career changer.
- [x] Above-the-fold messaging leads with full-stack development, real software, and security/systems depth, consistent with `positioning.md`. *(Re-verified against the widened positioning: the hero states systems, security and development across TypeScript and Python.)*
- [x] React/Next.js remain prominent without excluding Astro, APIs, databases, deployment, security and systems capability.
- [x] AI is presented as an engineering workflow involving context, constraints, review and verification — not as a substitute for technical judgement.
- [x] Cyber security and systems experience strengthen the development story without overwhelming it.
- [x] Agile philosophy remains visible as collaborative/iterative ways of working, while Scrum Master identity is de-emphasised.
- [x] Current GitHub and LinkedIn links are verified. GitHub (`github.com/GinaHorch`) resolves to the right profile. LinkedIn (`linkedin.com/in/gina-sis/`) returns HTTP 999 to automated requests and was confirmed by the site owner instead; `content.js` already uses it, so no change was needed. The stale `gina-horch` handle that used to sit in project frontmatter is gone.
- [x] Homepage/page metadata and OG copy reflect the new positioning and no longer lead with Scrum Master/career-pivot language.

### Project case studies

- [x] A case study exists for **Andromedae** with accurate pre-/post-launch language and no unverified production metrics.
- [x] A case study exists for **Hold My Spoon** that clearly states the app was inherited partially built and demonstrates substantial development, APIs/integrations, Stripe/webhook work and iterative production support.
- [x] A case study exists for **She Codes Data Platform** that presents it as a connected data/application platform rather than merely a dashboard and protects private organisational data.
- [x] A full case study exists for the **Wedding Guestbook & Media Platform**, crediting Bianca Di Biase for design/visual identity, respecting the private repository, and exposing no private guest/admin data. Per the updated context document it is deliberately *not* linked and carries no screenshots — the couple are unnamed, the app is access-restricted, and the project is represented by a generalised architecture diagram.
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
- [x] Bundle/payload size is checked via `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes`. The first run found **every function at 78 MB**, because `getPosts()` resolves MDX through `process.cwd()` and Next was tracing the whole project — including `public/` — into each function bundle. Two fixes:
  1. Deleted ~53 MB of orphaned Agile/Scrum/SAFe resource PDFs from `public/pdf/` (nothing referenced them after the `/agile` removal; the four personal certificate PDFs were kept).
  2. Added `outputFileTracingRoot` and `outputFileTracingExcludes` to `next.config.mjs` so statically-served assets under `public/` stay out of function bundles. `public/fonts/Inter.ttf` and `public/images/GinaHeadShot-og.jpg` remain traced because `/og` reads them at runtime.

  Result: **78 MB → 6.92 MB** for every page function, 4.20 MB for `/robots.txt` and `/sitemap.xml`, and 22.06 MB for `/og` (dominated by `next/og`'s satori/resvg wasm, and comfortably inside the Node runtime limit — the route stays on `nodejs`). The "inferred workspace root" build warning is also gone.
- [x] Preview deployment is verified via `vercel deploy`. Deployed with `vercel deploy --prebuilt` to the **preview** target only (`target: null`) — not promoted to production. Deployment Protection is enabled on the project, so verification used `vercel curl`. All nine current routes return 200 with the right titles; `/og` renders; the sitemap and `robots.txt` are correct; `/agile`, `/api/check-auth` and the retired `/work/becko-ava-wedding-guestbook` slug all return 404; and no client names appear anywhere in the rendered output.

  Note: the first deploy failed with *"the Root Directory must be a relative path…"*. The cause was a repo-scoped Vercel link (`.vercel/repo.json` with `"directory": "."`). Re-linking at project scope (`.vercel/project.json`) fixed it.
- [x] `CLAUDE.md` is updated after structural removals so it accurately describes the final repository state.

## Execution model

See `.claude/context/README.md` for the intended workflow.

Project case studies may be drafted in parallel from their own context files. Shared homepage/About/Skills/navigation/config work should be coordinated through an integration/review phase to avoid conflicting edits and inconsistent messaging.

After this workflow has been completed manually and reliably at least once, it may become a candidate for an autonomous `/loop` that works through unchecked criteria. Starting that loop is a separate explicit decision and is not implied by the existence of this file.

## Status

**Implementation complete except for three externally blocked items** (LinkedIn link verification, Vercel bundle-payload check, Vercel preview deployment). Each is annotated inline above.

The Andromedae production-domain cutover **completed on 10 August 2026** and was verified: `www.andromedae.com.au` is served from Cloudflare with no Wix markers in the response, the apex domain 301s to `www`, and the security headers are live. Production Lighthouse was measured against the public domain and the case study now carries those figures and a `linkLive`.

### Follow-ups for the maintainer

**Outstanding — on the Andromedae site itself (not this repository):**

- **Fonts are now 70% of the page.** `Montserrat-VariableFont_wght.ttf` transfers at 280 KB and `roxboroughcf-extrabold.otf` at 43 KB — 323 KB of a 461 KB page, served as raw TTF/OTF relying on Brotli in transit rather than as WOFF2. WOFF2's compression is font-aware, and Montserrat ships Cyrillic, Greek and Vietnamese coverage the site does not use. Converting to WOFF2 and subsetting to Latin should take the fonts to roughly 60–80 KB and the page to around 200 KB. This is what is now holding mobile LCP at 2.5s rather than clearly below it.
- **One console error remains by design** — Cloudflare's bot-management inline script carries a per-request token, so it cannot be allow-listed by hash. Best Practices stays at 93 unless `unsafe-inline` is added, which is not worth it. Recorded as accepted, not outstanding work.

**Resolved 10 August 2026, after the cutover — verified independently:**

- ~~Mobile LCP 6.1s~~ — hero promoted to a real `<img>` with a width-based `srcset`, `sizes="100vw"` and `fetchpriority="high"`. A 412px viewport now receives the 828px variant at 28 KB rather than the 2880px variant at 422 KB. Mobile LCP 6.1s → **2.5s** (median of three runs), mobile Performance 75 → **95**, total page 843 KB → 461 KB.
- ~~Cloudflare Web Analytics collecting nothing~~ — `static.cloudflareinsights.com` added to `script-src` and `cloudflareinsights.com` to `connect-src`. The beacon now loads; the rest of the policy is unchanged and still carries no `unsafe-inline` for scripts.
- ~~Undescriptive "Read More" link~~ — gone; zero generic link texts on the homepage. SEO 85 → **92**.
- `Content-Signal` in `robots.txt` — deliberately kept. It is the only remaining SEO deduction.

**Resolved at the 10 August 2026 cutover:**

- ~~Add `linkLive`~~ — added to `andromedae.mdx` after verifying the live domain.
- ~~Re-run Lighthouse against the public production domain~~ — measured on desktop and mobile; the pre-launch paragraph and its screenshot are gone, replaced with the measured figures, the verified production security headers, and the cause of each deduction.
- ~~Relax the "built for a commercial client" wording~~ — now "in commercial production" in both the About intro and the Software Development skill group.
- ~~Reconsider the `practical` evidence levels that were held back by the pending cutover~~ — `Astro`, `Cloudflare`, `Cloudflare Workers / Wrangler`, `Security headers / CSP` and `Accessibility (WCAG)` are now `production`. The site is a commercial business's live public website, which meets the level's definition ("in a system real people depend on"), and Lighthouse accessibility measured 100 against the live domain.

**Resolved:**

- ~~`AGILE_RESOURCE_PASSWORD`~~ deleted from `.env.local` and from the Vercel project.
- ~~Lighthouse screenshot exposing the staging URL~~ — replaced with a cropped version and published in the case study.
- ~~Wedding gallery screenshot showing an error state~~ — removed; the case study is now deliberately screenshot-free (see below).
- ~~LinkedIn handle~~ confirmed as `gina-sis`; `content.js` already used it and needs no change.
- ~~`notes.txt`~~ deleted.

**Wedding case study — standing constraint:** the couple are not named, the application is not linked, and no screenshots of it are published. It is represented by a generalised architecture diagram only. Do not reintroduce a live link, screenshots or client names.
