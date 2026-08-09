# Context Documents

This folder contains the **user-approved source-of-truth material** for the portfolio repositioning project. See `.claude/GOAL.md` for the completion checklist.

Some documents were developed collaboratively with AI from verified project information. Agents must treat the approved content here as factual boundaries and **must not invent technologies, responsibilities, metrics, outcomes, project ownership, or messaging beyond what these documents support**.

## Source-of-truth hierarchy

For repositioning work, use the documents in this order:

1. **`CLAUDE.md`** — current repository architecture, commands, conventions, quirks and technical operating rules.
2. **`.claude/GOAL.md`** — target state and definition of done for the repositioning project.
3. **`positioning.md`** — approved messaging direction, audience, tone, hierarchy and framing guardrails.
4. **`removals.md`** — approved project/section removals and replacement mapping.
5. **`projects/*.md`** — factual source material for each replacement project case study.

If a planned target state conflicts with a description of the repository's current state, treat `CLAUDE.md` as the description of **what exists now** and `GOAL.md` / context documents as the description of **what should exist after the work is complete**.

Do not silently rewrite current-state technical documentation as if a planned removal or migration has already happened.

## How each document is used

- **`positioning.md`** — read before touching homepage, About, Skills, project summaries, page titles, metadata or SEO copy.
- **`projects/andromedae.md`** — factual source for the Andromedae project case study.
- **`projects/hold-my-spoon.md`** — factual source for the Hold My Spoon case study, including inherited-codebase and API/integration boundaries.
- **`projects/she-codes-data-platform.md`** — factual source for the She Codes Data Platform case study. Privacy and organisational confidentiality constraints are especially important here.
- **`projects/wedding-apps.md`** — factual source for the Wedding Guestbook & Media Platform case study. The application is access-restricted and the repository private; the couple are not named and no screenshots or live link are published.
- **`removals.md`** — determines what is replaced, retained or deleted. Nothing should be removed based on inference.

## Agent reading rules

### Every agent working on repositioning

Read:

1. `CLAUDE.md`
2. `.claude/GOAL.md`
3. `.claude/context/positioning.md`

### Project case-study agent

Additionally read only the corresponding project context file before drafting that project's MDX. Do not infer missing stack details or metrics from another project.

### Removal/cleanup agent

Additionally read `removals.md` and verify dependencies before deleting routes, content, API endpoints, assets or environment-variable references.

### Integration/review agent

Read all project context files plus `removals.md`, then review shared copy and navigation for:

- tone consistency
- factual consistency
- accurate project ownership
- public/private boundaries
- messaging alignment
- accessibility/contrast requirements
- React/Next.js best practices

Shared files such as homepage/About copy, `content.js`, configuration, metadata and navigation should preferably be handled in the integration/review phase rather than by multiple project agents in parallel.

## Workflow this supports

1. Context documents are reviewed and approved.
2. One agent per replacement project may draft/update separate project MDX files in parallel, reading its own project context plus the shared positioning rules.
3. An integration/review agent checks all drafts together for tone, technical accuracy, privacy, ownership and consistency.
4. Shared homepage/About/Skills/navigation/config changes are applied in a coordinated pass.
5. Removal work is verified against `removals.md`, including dependencies that existed only for removed Agile Resources.
6. Review against `.claude/skills/frontend-design/SKILL.md` and `.claude/skills/react-best-practices/SKILL.md`.
7. Lint, build, bundle-size and preview-deployment checks are completed before production.
8. `.claude/GOAL.md` is checked off only when the relevant work has actually landed and been verified.

This workflow may later be wrapped in an autonomous loop after it has been proven manually. Starting such a loop is a separate explicit decision.

## Retained end-to-end data engineering project

`project5.mdx` is being retained and reframed, but there is not currently a dedicated context file for it.

Until one is added, agents must:

- preserve the existing verified technical facts in that MDX;
- improve only framing, structure and relevance to the new developer/data-engineering positioning;
- not add new technologies, responsibilities, results or metrics unless they are explicitly verified from the repository or added to context.

## Status

**Context complete; the repositioning has been implemented against it.**

- `positioning.md`, `removals.md` and all four replacement-project context documents are populated.
- The site now carries the four replacement case studies plus the retained, reframed data-engineering project. `/agile` and its password gate are gone.
- The retained end-to-end data-engineering project still has the guardrail above — it was reframed from existing verified facts only, and still has no dedicated context document.
- Andromedae production metrics remain intentionally pending the scheduled public-domain cutover and post-launch verification. The case study labels its Lighthouse numbers pre-launch and links no live site yet.

See the follow-ups section at the end of `.claude/GOAL.md` for the remaining human-in-the-loop items.
