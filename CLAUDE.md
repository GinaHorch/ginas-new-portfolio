# CLAUDE.md

Orientation for working on this repo. Read this before making changes — it covers the stack, structure, conventions, known quirks, and the active repositioning project.

## Stack

- **Next.js 16** (App Router, `src/app/`), **React 19**, **TypeScript** (strict mode)
- Built on the **Once UI "Magic Portfolio"** boilerplate — a large vendored design-system component library at `src/once-ui/` (~70 primitives: `Flex`, `Column`, `Row`, `Grid`, `Card`, `Dialog`, `Toast`, effect components like `RevealFx`/`GlitchFx`/`TiltFx`/`HoloFx`, etc.), imported via `@/once-ui/components`
- **Styling**: SCSS Modules (`ComponentName.module.scss`) layered on Once UI's CSS-custom-property token system (`src/once-ui/tokens/theme.scss`). **No Tailwind.**
- **Content**: MDX (`@next/mdx`, `gray-matter`, `next-mdx-remote`) for project case studies; a plain JS content module (`src/app/resources/content.js`) for static site copy
- **Linting/formatting**: **Biome** (`biome.json`, pinned to `@biomejs/biome@1.9.4` as a devDependency) — not ESLint/Prettier. `npm run lint` runs `biome lint src/app src/components`; the vendored `src/once-ui/` library is deliberately out of scope.
- **Testing**: **Playwright** end-to-end tests in `tests/`. There are no unit tests and no unit-test runner — don't assume Jest/Vitest exists.
- **ESLint is gone.** It had no config, no script and no CI use — a leftover from `next lint`, which Next 16 removed. It was also the only thing pulling in `ajv` (a Dependabot ReDoS alert). Don't reinstall it; Biome is the linter of record.
- **`npm` and `install` were listed as runtime dependencies** and have been removed. Nothing imported them; `npm`'s vendored tree was the source of most of the repo's audit alerts, including the only critical one. If `npm audit` suddenly reports a lot of new advisories, check whether something re-added them.
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

npm run test:e2e         # Playwright, all projects
npm run test:e2e:ui      # Playwright UI mode, for debugging a failure
npm run test:e2e:update  # re-record visual baselines (deliberate visual changes only)
npm run test:e2e:report  # open the last HTML report
```

## Testing

Playwright specs live in `tests/`, run against a **production build** on port 3100 (the dev server injects a dev-tools indicator and serves images differently, both of which pollute snapshots). `playwright.config.ts` starts and stops that server itself, and reuses one if it is already running.

Two projects run every spec: `desktop` (1280x900 Chrome) and `mobile` (Pixel 5). Specs that only make sense on one use `test.skip(({ isMobile }) => ...)`.

| Spec | Covers |
|---|---|
| `visitor-journey.spec.ts` | The real path through the site: land → acknowledge Country → hero → About → Projects → a case study → Skills. Also asserts every page has exactly one `h1`. |
| `mobile-navigation.spec.ts` | The small-screen header — it moves to the bottom of the viewport and drops text labels for icons — plus accessible names, tap navigation, and no horizontal overflow on any page. |
| `visual-regression.spec.ts` | Full-page screenshots per page per project, the acknowledgement modal, and the skills chart on its own. |

### Rules for changes affecting user-visible behaviour

1. Run the existing Playwright tests.
2. Add or update a test when the approved behaviour changes.
3. **Do not modify a failing test simply to make the implementation pass** unless the requirement itself has changed.
4. If a test fails, inspect the failure and trace (`npm run test:e2e:report`, or `npx playwright show-trace <trace.zip>`) and determine whether the *implementation* or the *expectation* is wrong.
5. The task is not complete until the relevant Playwright tests and `npm run build` pass.

Rule 4 is the one that earns its keep. When these tests were introduced, two failures had two different causes: the homepage assertion was stale because the hero copy had legitimately been rewritten (expectation wrong — update the test), while `/work` genuinely had no `h1` at all (implementation wrong — fix the page). Reaching for the same fix in both cases would have been wrong once.

### Writing tests against this site

- **The Acknowledgement of Country modal** is rendered by the homepage only, not the layout, and is gated on `sessionStorage.hasAcknowledged`. It appears on the first visit of every test context. It opens from a `useEffect`, so *polling* for it after navigation is a race — use `skipAcknowledgement()` to seed sessionStorage before navigation, or `acknowledgeCountry()` to dismiss it deliberately.
- **Nav items exist twice in the DOM** (labelled and icon-only, one hidden by CSS). Use the `navLink()` helper rather than `getByRole` directly, or locators hit strict-mode violations.
- **Visual baselines are committed** under `tests/visual-regression.spec.ts-snapshots/` and are per project and platform (`-desktop-darwin`, `-mobile-darwin`) — recorded on macOS. **CI runs Linux and therefore skips visual regression entirely**: `.github/workflows/playwright.yml` runs `npx playwright test --grep-invert "visual regression"`. Without that flag every snapshot test fails with *"A snapshot doesn't exist at …-desktop-linux.png"*, because Playwright will not create a baseline under `CI=true`. Copying the darwin files to `-linux` names does not fix it either — font rasterisation differs between the platforms by much more than the 150-pixel budget. **Visual regression is a local gate: run `npm run test:e2e` before pushing.** If CI ever needs to cover pixels, generate a second baseline set inside `mcr.microsoft.com/playwright:v<version>-noble` and pin the workflow to that same container, accepting that every intentional visual change then has to be re-recorded twice.
- **Snapshot budget is `maxDiffPixels: 150`**, absolute rather than a ratio — a ratio scales with page height, so on a long page a real layout shift can hide under it.
- `stabiliseForScreenshot()` disables motion, scrolls to trigger lazy images, waits for fonts, and the header (containing a live clock) is masked out.

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

Project slugs are the MDX filenames: `andromedae`, `hold-my-spoon`, `she-codes-data-platform`, `wedding-guestbook-platform`, `end-to-end-data-engineering`, `spec-driven-agentic-development`.

`spec-driven-agentic-development` is a process case study rather than an application. It is excluded from the homepage's featured projects (`<Projects range={[1, 2]} exclude={[...]} />` in `src/app/page.tsx`) so the homepage keeps leading with production applications, per the messaging hierarchy in `positioning.md`. It renders `<RunEvidencePanel />`, a zero-JS server component registered in `src/components/mdx.tsx`; every figure in it is traceable to `.claude/context/agentic-run-evidence.md`.

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

- **Vercel MCP** (hosted, OAuth) — for read/inspection: deployment status, build/runtime logs, docs search. Already added as `vercel-ginas-new-portfolio`. If `claude mcp list` shows it as **"Needs authentication"**, run `/mcp` in Claude Code, select it and complete the browser OAuth flow — until then its tools are not exposed to the session and the CLI has to do the work. It grants account-level access including paid domain-purchase tools — require confirmation on those, don't hand them to an unattended agent.
- **Vercel CLI** — for anything that writes state or needs a real local build: `vercel env add` for env vars, `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes` to catch bundle-size regressions locally before pushing (see the payload-limit quirk above).

## Skills available in this repo

- **`.claude/skills/react-best-practices/SKILL.md`** — Next.js/React performance patterns (waterfalls, bundle size, server-side perf), adapted from Vercel Engineering's upstream skill and trimmed to what matters for this SSG-heavy site. Reach for it on anything touching data fetching, `page.tsx` server components, or the `og` route.
- **`.claude/skills/frontend-design/SKILL.md`** — design-direction guidance adapted from Anthropic's `frontend-design` skill, with an added Accessibility & Contrast section (WCAG 2.2 AA contrast minimums, reduced motion, keyboard focus, semantic HTML) and a repo-specific note about checking Once UI token contrast against this site's forced dark theme. Reach for it on any visual/design/copy change.
- Built-in **`security-review`** and **`code-review`** skills — use as normal.

## Portfolio repositioning (landed)

The site has been repositioned from a "Scrum Master / career pivot" narrative to **full-stack development across TypeScript and Python, real production software, and security and systems thinking**, supported by React/Next.js, Astro, APIs/integrations, Supabase/PostgreSQL, AI-assisted engineering and collaborative delivery. The positioning was widened in August 2026 — an earlier "TypeScript developer" framing was too narrow. `.claude/context/positioning.md` is the source of truth and records why.

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
- **`.claude/context/agentic-run-evidence.md`** — how the repositioning was executed: the goal-driven autonomous run, run statistics, parallel/review agent topology, validation performed and blockers preserved. It is the factual source for the `spec-driven-agentic-development` case study — treat it the same way as the project context files, and don't add claims to that case study which this document doesn't support.

### Current-state vs target-state rule

`CLAUDE.md` documents how the repository works **now**. `GOAL.md`, `positioning.md` and `removals.md` describe the intended **target state**. Where the implementation has landed, this file has been updated to match; if a future change is planned but not yet done, keep describing the current state here until it lands and is verified.

### Open items carried forward

- **Andromedae went live on 10 August 2026.** The case study carries a `linkLive` and Lighthouse figures measured against the public domain — desktop 96/100/93/92, mobile 95/100/93/92, mobile LCP 2.5s — as medians over repeated runs, not single runs. The hero-image regression found at launch (6.1s mobile LCP) has been fixed on the client site and re-verified here. Remaining open items are on that site, not in this repo: fonts are 70% of the page (raw TTF/OTF rather than WOFF2, unsubsetted), and one console error persists by design because Cloudflare's bot-management script cannot be hash-allow-listed. See the follow-ups in `.claude/GOAL.md`. **Re-measure before changing any figure here, quote medians, and never quote the desktop score alone** — the desktop number hid a 6.1s mobile LCP once already.
- **`baseURL` is `ginas-new-portfolio.vercel.app`** in `config.js`. Change it if a custom domain is set up; everything that builds canonical URLs, OG images, JSON-LD, the sitemap and robots reads from it.

### Agent workflow

Project agents may draft separate project MDX files in parallel, each reading the shared positioning plus its own project context. Shared files such as homepage/About copy, `content.js`, Skills, config, metadata and navigation should be handled in a coordinated integration/review phase to reduce conflicting edits and inconsistent messaging.

A review agent should then check all project drafts together for factual consistency, tone, project ownership, public/private boundaries, accessibility and technical accuracy before changes are considered complete. See `.claude/context/README.md` for the full workflow.
