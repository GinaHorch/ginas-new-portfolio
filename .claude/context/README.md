# Context Documents

This folder holds the source-of-truth material for the portfolio repositioning project (see `.claude/GOAL.md` for the completion checklist). Nothing in this folder is fabricated by Claude — these are templates for the user to fill in with real information, and agents working on this project should treat them as the ground truth rather than inventing project details, metrics, or messaging.

## How this gets used

- **`positioning.md`** — the target messaging direction (audience, tone, what to lead with, what to de-emphasize). Any agent touching homepage/about copy, page titles, or metadata should read this first.
- **`projects/*.md`** — one file per new project case study. An agent drafting or updating a specific project's MDX (`src/app/work/projects/*.mdx`) should read only the corresponding file here, not invent details about tech stack, role, or outcomes.
- **`removals.md`** — which existing projects/sections are being retired and why. Prevents agents from guessing which of the current 7 projects to remove.

## Workflow this supports

Once these are filled in:
1. One agent per project in `projects/` drafts/updates that project's case study in parallel, reading its own file plus `positioning.md`.
2. A review agent checks all drafts together for tone consistency, factual consistency with the source docs, and adherence to `.claude/skills/frontend-design/SKILL.md` (including the accessibility/contrast section) and `.claude/skills/react-best-practices/SKILL.md`.
3. Changes land once review passes and `.claude/GOAL.md` criteria are checked off.
4. This cycle can eventually run as an autonomous loop once proven manually once — see `.claude/GOAL.md` for how "done" is defined.

## Status

All templates in this folder are currently **empty skeletons** — the repositioning work has not started. Fill in `positioning.md` and the `projects/*.md` files (and `removals.md`) before asking an agent to draft any case study content.
