---
name: react-best-practices
description: React and Next.js performance patterns for this portfolio (Next.js 16 App Router, React 19, mostly static/SSG pages). Use when writing, reviewing, or refactoring components, pages, MDX rendering, or data fetching in src/app or src/components. Adapted from Vercel Engineering's react-best-practices skill, trimmed to the tiers that matter for a low-interactivity, SSG-heavy site.
license: MIT (adapted from vercel-labs/agent-skills)
metadata:
  source: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md
  adapted-for: ginas-new-portfolio
---

# React / Next.js Best Practices (adapted for this repo)

This repo is a mostly-static, SSG-heavy Next.js 16 App Router site (project/agile-resource pages, MDX content, a skills chart page) with very little client-side interactivity. Upstream Vercel's `react-best-practices` skill has 70 rules across 8 priority tiers; the MEDIUM/LOW tiers (re-render micro-optimization, JS micro-optimization) mostly target highly interactive client apps and don't apply much here. This adaptation keeps only the **CRITICAL and HIGH** tiers, which are the ones actually relevant to this codebase: page-load waterfalls, bundle size (the site already hit Vercel's 1MB payload limit once, see the `/og` route history), and server-side rendering cost.

## 1. Eliminating Waterfalls (CRITICAL)

Applies to: `generateStaticParams`/`generateMetadata` in `work/[slug]`, `agile/[slug]`, any data loading in server components or API routes.

- **Check cheap sync conditions before awaiting** flags or remote values — don't `await` something whose result you might discard immediately.
- **Defer `await` into the branch where it's actually used**, not at the top of the function.
- **Use `Promise.all()`** for independent async operations instead of sequential `await`s (e.g. if a page ever needs to fetch/read multiple MDX files or images concurrently).
- **Start promises early, await late** in API routes and route handlers (`src/app/og/route.tsx`, `src/pages/api/*`) — kick off work before you need the result, not right before you use it.
- **Use Suspense boundaries** to stream content instead of blocking the whole page on one slow subtree.

## 2. Bundle Size Optimization (CRITICAL)

Directly relevant — this repo already failed a Vercel deploy once from bundle/payload size (commit `2668946`, `/og` route moved from edge to nodejs runtime).

- **Import directly, avoid barrel-file imports.** `src/once-ui/components/index.ts` and `src/components/index.ts` are barrel files — importing from them pulls in more than you need. Prefer importing the specific component file when bundle size matters (e.g. in a route likely to be size-constrained, like `og/route.tsx`).
- **Prefer statically analyzable import and filesystem paths** so Next.js can trace and tree-shake correctly, rather than dynamic `require`/computed paths.
- **Use `next/dynamic`** for heavy components not needed on initial render (e.g. chart components in `src/components/skills/*Chart.js`, which use `chart.js`/`react-chartjs-2` — a comparatively heavy dependency for a mostly-static page).
- **Defer third-party scripts** (analytics, logging) until after hydration if any are added later.
- **Load modules only when the feature is active** (conditional/feature-gated loading) rather than unconditionally importing everything.
- **Preload on hover/focus** for perceived speed on internal navigation (project cards, nav links).
- Run `ANALYZE=true npm run build` (bundle analyzer is already configured in `next.config.mjs`) before adding a new heavy dependency, and `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build --yes` to catch per-function payload size before it fails a deploy.

## 3. Server-Side Performance (HIGH)

Applies to: `src/app/*/page.tsx` server components, `generateMetadata`, `src/app/og/route.tsx`, `src/pages/api/*`.

- **Authenticate server actions and API routes properly** — relevant to `src/pages/api/authenticate.ts`/`check-auth.ts` (the password-gate routes).
- **Use `React.cache()`** for per-request deduplication if the same MDX/content read happens more than once per request (e.g. `getPosts()` in `src/app/utils/utils.ts`).
- **Hoist static I/O to module scope** — e.g. font loading in `og/route.tsx` (`Inter.ttf` from `public/fonts/`) should be read once at module level, not re-read per request.
- **Avoid module-level mutable state** in server components/route handlers — each request should be independent.
- **Minimize data serialized to client components** — only pass the props a `"use client"` component actually needs, not entire content objects.
- **Parallelize independent fetches** in server components (e.g. if a page needs both post metadata and image metadata, fetch them concurrently, not sequentially).
- Use `after()` for genuinely non-blocking work (e.g. logging) so it doesn't delay the response.

## How to apply

Reach for this skill when: writing or reviewing anything under `src/app/**/page.tsx`, `src/app/og/route.tsx`, `src/pages/api/*`, or components that do data fetching or render MDX. Skip re-render/JS-micro-optimization concerns (upstream tiers 4–8) unless a specific page becomes genuinely interactive and profiling shows it matters — premature micro-optimization on a static portfolio isn't worth the complexity.

For the full 70-rule upstream reference (including the tiers trimmed here), see `AGENTS.md` at https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/AGENTS.md.
