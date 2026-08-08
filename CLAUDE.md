# CLAUDE.md

Orientation for working on this repo. Read this before making changes — it covers the stack, structure, conventions, known quirks, and the active repositioning project.

## Stack

- **Next.js 16** (App Router, `src/app/`), **React 19**, **TypeScript** (strict mode)
- Built on the **Once UI "Magic Portfolio"** boilerplate — a large vendored design-system component library at `src/once-ui/` (~70 primitives: `Flex`, `Column`, `Row`, `Grid`, `Card`, `Dialog`, `Toast`, effect components like `RevealFx`/`GlitchFx`/`TiltFx`/`HoloFx`, etc.), imported via `@/once-ui/components`
- **Styling**: SCSS Modules (`ComponentName.module.scss`) layered on Once UI's CSS-custom-property token system (`src/once-ui/tokens/theme.scss`). **No Tailwind.**
- **Content**: MDX (`@next/mdx`, `gray-matter`, `next-mdx-remote`) for project and Agile-resource case studies; a plain JS content module (`src/app/resources/content.js`) for static site copy
- **Linting/formatting**: **Biome** (`biome.json`) — not ESLint/Prettier, despite `next lint` existing as a script
- **No test suite** — no test framework, no test files, no test script. Don't assume tests exist or write tests unless explicitly asked to set up a framework first.
- Deployed on **Vercel**

## Commands

```
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # next lint (Biome is the actual formatter/linter of record)
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
├── agile/page.tsx          → /agile (Agile Resources index)
├── agile/[slug]/page.tsx   → /agile/:slug (resource detail, from agile/resources/*.mdx)
├── skills/page.tsx         → /skills (chart-driven, chart.js)
├── og/route.tsx            → /og (dynamic OG image via next/og; runtime = "nodejs" — see Known Quirks)
├── robots.ts, sitemap.ts   → generated from routes config + MDX slugs
└── not-found.tsx           → 404

src/pages/api/               (legacy Pages Router, auth only)
├── authenticate.ts          → POST, checks AGILE_RESOURCE_PASSWORD env var, sets authToken cookie
└── check-auth.ts            → GET, reads authToken cookie
```

## Content model

- **`src/app/resources/content.js`** — the central copy/content source for static sections (`person`, `social`, `home`, `about`, `work`, `agileResources`, `skills`, etc.)
- **`src/app/resources/config.js`** — site config: `baseURL`, `routes` (enable/disable pages), `protectedRoutes`, `style` (Once UI theme tokens — `theme`, `brand`, `accent`, `neutral`, `border`, `surface`, `transition`, currently forcing `theme: "dark"`), `effects` (background visuals)
- **`src/app/work/projects/*.mdx`** and **`src/app/agile/resources/*.mdx`** — one file per project/resource, frontmatter-driven (`title`, `publishedAt`, `summary`, `image`, `team`, various links), parsed by `getPosts()` in `src/app/utils/utils.ts`

**To add a new project**: drop a new `.mdx` file into `src/app/work/projects/` with the right frontmatter, add matching images under `public/images/projects/`. The index page, `[slug]` route, and sitemap all pick it up automatically via `getPosts()` — no manual registration elsewhere needed. Same pattern for `src/app/agile/resources/`.

**To remove a project**: delete the `.mdx` file, remove its images, and check `content.js` for any hardcoded references (see `.claude/context/removals.md` for the active removal list).

## Styling conventions

- Once UI primitives (`Flex`, `Column`, `Row`, `Grid`) take style **props** (`padding`, `gap`, `radius`, `background`, etc.) rather than className soup — prefer these over raw divs/CSS where a Once UI primitive already covers it.
- Theme knobs live in `config.js` as `data-*` attributes consumed in `layout.tsx` — change the theme by changing tokens there, not by hardcoding colors.
- Component-local styles go in an adjacent `.module.scss` file; prefer token variables (`var(--brand-*)`, `var(--neutral-*)`, etc.) over new hardcoded hex values so light/dark theme switching (and contrast) keeps working.
- `"use client"` on interactive components; server components for layout/page shells (see `src/app/layout.tsx`, an async server component).
- Props typed via `interface XProps`; components typed `React.FC<XProps>`.

## Known quirks

- **Vercel payload limit already bit this project once** — commit `2668946` switched `src/app/og/route.tsx` from the `edge` to `nodejs` runtime after a 1MB deployment payload failure. Don't revert that. Check bundle/function size (`ANALYZE=true npm run build`, or `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes`) before adding heavy dependencies or new routes.
- **Mixed routing**: the password-gate API routes still live in `src/pages/api/` (Pages Router) alongside the App Router used for everything else. This is intentional, not a migration in progress.
- **`sitemap.ts` references a `skills/[slug]` pattern** that has no matching route — harmless dead code, not a bug to "fix" unexpectedly.
- **Barrel files** (`src/once-ui/components/index.ts`, `src/components/index.ts`) exist but `src/components/index.ts` only re-exports 5 of the components — others are imported by direct path. Follow whatever the surrounding code already does.

## Security

- The `/agile/resource7` password gate reads its password from `process.env.AGILE_RESOURCE_PASSWORD` (fixed from a previously hardcoded plaintext value). It fails closed (500) if the env var is unset. Set the real value in `.env.local` (gitignored via `.env*.local`) for local dev, and via `vercel env add` / the Vercel dashboard for production.
- Use the built-in **`security-review`** skill for any change touching auth, cookies, the password gate, or anything handling user input.
- The **`security-guidance`** plugin (Anthropic official, `claude-plugins-official` marketplace) is recommended as a standing safety net — pattern-based warnings on edits plus LLM diff review. Install it yourself with `/plugin install security-guidance@claude-plugins-official` (this is a runtime/CLI action, not something achievable via file edits).

## Vercel tooling: CLI + MCP, split by purpose

The repo is not yet linked to a Vercel project (no `.vercel/` folder) — run `vercel login` and `vercel link` once before using either of these.

- **Vercel MCP** (`https://mcp.vercel.com`, hosted, OAuth) — for read/inspection: deployment status, build/runtime logs, docs search. Good fit for a review-agent role (e.g. "did the last preview deploy succeed"). Add with `claude mcp add --transport http vercel https://mcp.vercel.com`, then `/mcp` to authorize. It grants account-level access including paid domain-purchase tools — require confirmation on those, don't hand them to an unattended agent.
- **Vercel CLI** — for anything that writes state or needs a real local build: `vercel env add` for env vars, `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes` to catch bundle-size regressions locally before pushing (see the payload-limit quirk above).

## Skills available in this repo

- **`.claude/skills/react-best-practices/SKILL.md`** — Next.js/React performance patterns (waterfalls, bundle size, server-side perf), adapted from Vercel Engineering's upstream skill and trimmed to what matters for this SSG-heavy site. Reach for it on anything touching data fetching, `page.tsx` server components, or the `og` route.
- **`.claude/skills/frontend-design/SKILL.md`** — design-direction guidance adapted from Anthropic's `frontend-design` skill, with an added Accessibility & Contrast section (WCAG 2.2 AA contrast minimums, reduced motion, keyboard focus, semantic HTML) and a repo-specific note about checking Once UI token contrast against this site's forced dark theme. Reach for it on any visual/design/copy change.
- Built-in **`security-review`** and **`code-review`** skills — use as normal.

## Active project: portfolio repositioning

The site is being repositioned from a "Scrum Master career pivot" narrative toward **React, TypeScript, and AI-augmented development**, with old projects swapped for new ones (Andromedae, Hold My Spoon, She Codes Data Platform & Dashboard, private wedding-app work). This is tracked in:

- **`.claude/GOAL.md`** — the definition-of-done checklist. Check here before assuming the repositioning is complete or scoped.
- **`.claude/context/`** — source-of-truth documents (positioning direction, per-project details, removal list). **Currently empty templates** — don't invent project details, metrics, or messaging; wait for these to be filled in.

Intended workflow once context docs are filled in: one agent per new project case study drafts/updates its MDX in parallel (reading only its own context file), then a review agent checks consistency, tone, and technical accuracy across all drafts before anything lands. See `.claude/context/README.md` for details. This may eventually run as an autonomous loop against the `GOAL.md` checklist, but starting that loop is a separate, explicit step — not implied by this file existing.
