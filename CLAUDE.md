# CLAUDE.md

Orientation for working on this repo. Read this before making changes — it covers the stack, structure, conventions, known quirks, and the active repositioning project.

## Stack

- **Next.js 16** (App Router, `src/app/`), **React 19**, **TypeScript** (strict mode)
- Built on the **Once UI "Magic Portfolio"** boilerplate — a large vendored design-system component library at `src/once-ui/` (~70 primitives: `Flex`, `Column`, `Row`, `Grid`, `Card`, `Dialog`, `Toast`, effect components like `RevealFx`/`GlitchFx`/`TiltFx`/`HoloFx`, etc.), imported via `@/once-ui/components`
- **Styling**: SCSS Modules (`ComponentName.module.scss`) layered on Once UI's CSS-custom-property token system (`src/once-ui/tokens/theme.scss`). **No Tailwind.**
- **Content**: MDX (`@next/mdx`, `gray-matter`, `next-mdx-remote`) for project case studies; a plain JS content module (`src/app/resources/content.js`) for static site copy
- **Linting/formatting**: **Biome** (`biome.json`, pinned to `@biomejs/biome@1.9.4` as a devDependency) — not ESLint/Prettier. `npm run lint` runs `biome lint src/app src/components`; the vendored `src/once-ui/` library is deliberately out of scope.
- **No test suite** — no test framework, no test files, no test script. Don't assume tests exist or write tests unless explicitly asked to set up a framework first.
- Deployed on **Vercel**

## Commands

```
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # biome lint src/app src/components
npm run format   # biome format --write src/app src/components
npm run clean    # rm -rf .next
ANALYZE=true npm run build   # bundle analyzer (see next.config.mjs)
```

## Route map

```
src/app/
├── page.tsx                → / (home)
├── about/page.tsx          → /about
├── work/page.tsx           → /work (project index)
├── work/[slug]/page.tsx    → /work/:slug (project detail, from work/projects/*.mdx)
├── skills/page.tsx         → /skills (evidence-grouped skill tags + one chart.js overview chart)
├── og/route.tsx            → /og (dynamic OG image via next/og; runtime = "nodejs" — see Known Quirks)
├── robots.ts, sitemap.ts   → generated from routes config + MDX slugs
└── not-found.tsx           → 404
```

Project slugs are the MDX filenames: `andromedae`, `hold-my-spoon`, `she-codes-data-platform`, `wedding-guestbook-platform`, `end-to-end-data-engineering`.

There is no Pages Router directory and no API routes — `/agile`, its resource MDX, and the `src/pages/api/` password gate were removed with the repositioning (see `.claude/context/removals.md`).

## Content model

- **`src/app/resources/content.js`** — the central copy/content source for static sections (`person`, `social`, `home`, `about`, `work`, `skills`, `flags`)
- **`src/components/skills/skillsData.ts`** — the `/skills` data: capability groups and per-skill *evidence levels* (`production` / `practical` / `working` / `developing`). Deliberately not numeric scores. `SkillGroupList` renders the tags; `OverviewSkillsChart` renders the single summary chart.
- **`src/app/resources/config.js`** — site config: `baseURL` (host only — pages compose `https://${baseURL}`), `routes` (enable/disable pages), `style` (Once UI theme tokens — `theme`, `brand`, `accent`, `neutral`, `border`, `surface`, `transition`, currently forcing `theme: "dark"`), `effects` (background visuals)
- **`src/app/work/projects/*.mdx`** — one file per project, frontmatter-driven (`title`, `publishedAt`, `summary`, `images`, `team`, `linkLive`, `linkGithubFrontend`, `linkGithubBackend`), parsed by `getPosts()` in `src/app/utils/utils.ts`. `publishedAt` also controls ordering on `/work` and which projects the homepage features.

**To add a new project**: drop a new `.mdx` file into `src/app/work/projects/` with the right frontmatter, add matching images under `public/images/projects/`. The index page, `[slug]` route, and sitemap all pick it up automatically via `getPosts()` — no manual registration elsewhere needed. Start body headings at `##`; the page title is already an `h1`.

**To remove a project**: delete the `.mdx` file, remove its images, and check `content.js` for any hardcoded references (see `.claude/context/removals.md` for the active removal list).

## Styling conventions

- Once UI primitives (`Flex`, `Column`, `Row`, `Grid`) take style **props** (`padding`, `gap`, `radius`, `background`, etc.) rather than className soup — prefer these over raw divs/CSS where a Once UI primitive already covers it.
- Theme knobs live in `config.js` as `data-*` attributes consumed in `layout.tsx` — change the theme by changing tokens there, not by hardcoding colors.
- Component-local styles go in an adjacent `.module.scss` file; prefer token variables (`var(--brand-*)`, `var(--neutral-*)`, etc.) over new hardcoded hex values so light/dark theme switching (and contrast) keeps working.
- `"use client"` on interactive components; server components for layout/page shells (see `src/app/layout.tsx`, an async server component).
- Props typed via `interface XProps`; components typed `React.FC<XProps>`.

## Known quirks

- **Vercel payload limit already bit this project once** — commit `2668946` switched `src/app/og/route.tsx` from the `edge` to `nodejs` runtime after a 1MB deployment payload failure. Don't revert that. Check bundle/function size (`ANALYZE=true npm run build`, or `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes`) before adding heavy dependencies or new routes.
- **`public/` is deliberately excluded from function traces.** `getPosts()` resolves MDX through `process.cwd()`, which makes Next trace the whole project into every serverless function — that put every function at 78 MB. `next.config.mjs` now sets `outputFileTracingRoot` and `outputFileTracingExcludes` to keep statically-served assets out of function bundles (now ~6.9 MB per page function). **`public/fonts/Inter.ttf` and `public/images/GinaHeadShot-og.jpg` must stay traced** — `/og` reads both at runtime. If you add a runtime file read under `public/`, add it back to the trace.
- **`/og` reads assets off disk, not over HTTP.** Turbopack's production server doesn't implement `fetch()` for `file://` URLs, and satori can't decode WebP — hence the JPEG avatar copy. Don't switch it back to fetching `person.avatar`.
- **Full-page screenshots as project images**: most assets under `public/images/projects/` are tall full-page captures, while the carousel and detail hero use a 16:9 frame. `.topAnchored` in `src/components/ProjectCard.module.scss` anchors them with `object-position: top` so the top of the page shows instead of an arbitrary middle band. Keep that class on any new project image frame. Images *inside* MDX bodies are different — `createImage` in `mdx.tsx` renders them at natural height via `next/image` so diagrams stay readable, rather than cropping them to 16:9.
- **Two Biome rules are off** in `biome.json`: `noDangerouslySetInnerHtml` (JSON-LD structured data on every page) and `noExplicitAny` (deliberate casts at the Once UI type boundary in `mdx.tsx` and `layout.tsx`). Everything else in `src/app` and `src/components` is clean — keep it that way.
- **Barrel files** (`src/once-ui/components/index.ts`, `src/components/index.ts`) exist but `src/components/index.ts` only re-exports 5 of the components — others are imported by direct path. Follow whatever the surrounding code already does.

## Security

- **The site has no authentication, no API routes, no cookies and no server-side user input.** The `/agile` password gate, `src/pages/api/authenticate.ts`, `src/pages/api/check-auth.ts`, the `authToken` cookie, the `cookie` dependency and `AGILE_RESOURCE_PASSWORD` were all removed with the Agile Resources feature. Don't reintroduce an auth flow without a real requirement.
- Use the built-in **`security-review`** skill for any change touching auth, cookies, the password gate, or anything handling user input.
- The **`security-guidance`** plugin (Anthropic official, `claude-plugins-official` marketplace) is recommended as a standing safety net — pattern-based warnings on edits plus LLM diff review. Install it yourself with `/plugin install security-guidance@claude-plugins-official` (this is a runtime/CLI action, not something achievable via file edits).

## Vercel tooling: CLI + MCP, split by purpose

The repo is linked to the `ginas-new-portfolio` Vercel project (`.vercel/repo.json`), and the Vercel MCP server is configured.

- **Vercel MCP** (`https://mcp.vercel.com`, hosted, OAuth) — for read/inspection: deployment status, build/runtime logs, docs search. Good fit for a review-agent role (e.g. "did the last preview deploy succeed"). Add with `claude mcp add --transport http vercel https://mcp.vercel.com`, then `/mcp` to authorize. It grants account-level access including paid domain-purchase tools — require confirmation on those, don't hand them to an unattended agent.
- **Vercel CLI** — for anything that writes state or needs a real local build: `vercel env add` for env vars, `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes` to catch bundle-size regressions locally before pushing (see the payload-limit quirk above).

## Skills available in this repo

- **`.claude/skills/react-best-practices/SKILL.md`** — Next.js/React performance patterns (waterfalls, bundle size, server-side perf), adapted from Vercel Engineering's upstream skill and trimmed to what matters for this SSG-heavy site. Reach for it on anything touching data fetching, `page.tsx` server components, or the `og` route.
- **`.claude/skills/frontend-design/SKILL.md`** — design-direction guidance adapted from Anthropic's `frontend-design` skill, with an added Accessibility & Contrast section (WCAG 2.2 AA contrast minimums, reduced motion, keyboard focus, semantic HTML) and a repo-specific note about checking Once UI token contrast against this site's forced dark theme. Reach for it on any visual/design/copy change.
- Built-in **`security-review`** and **`code-review`** skills — use as normal.

## Portfolio repositioning (landed)

The site has been repositioned from a "Scrum Master / career pivot" narrative to **TypeScript and full-stack development, real production software and AI-assisted engineering**, supported by React/Next.js, Astro, APIs/integrations, Supabase/PostgreSQL, cyber security, systems thinking and collaborative delivery.

Keep any new copy consistent with `.claude/context/positioning.md` — in particular: don't lead with Scrum Master, career-changer or "aspiring developer" framing; present AI as an engineering workflow, not a tool list; and preserve accurate ownership (built vs inherited vs implemented-from-someone-else's-design).

The project set is:

- **Andromedae** — commercial Astro/Cloudflare website and structured Claude Code workflow;
- **Hold My Spoon** — inherited TypeScript product with API/integration, Stripe/webhook and production-debugging work;
- **She Codes Data Platform** — connected Next.js/TypeScript/Supabase data platform with identity, automation, privacy and data-integrity work;
- **Wedding Guestbook & Media Platform** — full-stack Next.js PWA developed from Bianca Di Biase's supplied design, with an admin dashboard giving a non-technical couple independent control. **Deliberately unlinked and screenshot-free**: it holds real guests' private media, so the couple are not named and the case study relies on a generalised architecture diagram. Do not add a live link, screenshots or client names to this one;
- **End-to-End Data Engineering Pipeline** — retained and reframed, not replaced.

This work is tracked in:

- **`.claude/GOAL.md`** — target state and definition-of-done checklist. Check here before assuming the repositioning is complete or fully scoped.
- **`.claude/context/positioning.md`** — approved messaging direction and framing guardrails.
- **`.claude/context/removals.md`** — approved keep/remove/replace decisions, including removal of Agile Resources.
- **`.claude/context/projects/*.md`** — populated factual source documents for the replacement case studies. Do not invent project details, metrics, ownership or technologies beyond what the relevant context file supports.

### Current-state vs target-state rule

`CLAUDE.md` documents how the repository works **now**. `GOAL.md`, `positioning.md` and `removals.md` describe the intended **target state**. Where the implementation has landed, this file has been updated to match; if a future change is planned but not yet done, keep describing the current state here until it lands and is verified.

### Open items carried forward

- **Andromedae has no `linkLive`** until the production-domain cutover (scheduled 10 August 2026) succeeds — `www.andromedae.com.au` still served the legacy Wix site as of 8 August 2026. Add the link, and replace the pre-launch Lighthouse framing with measured production results, only after verifying the live domain.
- **`baseURL` is `ginas-new-portfolio.vercel.app`** in `config.js`. Change it if a custom domain is set up; everything that builds canonical URLs, OG images, JSON-LD, the sitemap and robots reads from it.

### Agent workflow

Project agents may draft separate project MDX files in parallel, each reading the shared positioning plus its own project context. Shared files such as homepage/About copy, `content.js`, Skills, config, metadata and navigation should be handled in a coordinated integration/review phase to reduce conflicting edits and inconsistent messaging.

A review agent should then check all project drafts together for factual consistency, tone, project ownership, public/private boundaries, accessibility and technical accuracy before changes are considered complete. See `.claude/context/README.md` for the full workflow.
