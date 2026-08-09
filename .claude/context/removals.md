# Projects & Sections Marked for Removal

> **Purpose:** This is the approved removal/replacement map. Nothing should be deleted or retained based on agent inference.

The current site has seven project MDX files (`src/app/work/projects/project1.mdx` through `project7.mdx`). Apply the following decisions:

| File | Project name | Decision | Notes |
|---|---|---|---|
| `project1.mdx` | culture4kids | Replace | Replace with Andromedae. Relevant replacement assets have already been prepared/replaced. |
| `project2.mdx` | the good list | Replace | Replace with Hold My Spoon. Relevant replacement assets have already been prepared/replaced. |
| `project3.mdx` | job-tracker | Replace | Replace with She Codes Data Platform. Relevant replacement assets have already been prepared/replaced. |
| `project4.mdx` | DDD Diamond Smash | Replace | Replace with the Wedding Guestbook & Media Platform. Relevant replacement assets have already been prepared/replaced. |
| `project5.mdx` | end-to-end data engineering | Keep / Reframe | Retain the project. Reframe existing verified content toward the new developer/data-engineering positioning. Do not introduce new project facts, technologies, responsibilities, outcomes or metrics unless separately verified or added to context. |
| `project6.mdx` | portfolio | Remove | Public images/folder already removed. Delete the MDX and verify no remaining references. |
| `project7.mdx` | redux to do list | Remove | Public images/folder already removed. Delete the MDX and verify no remaining references. |

## Removal checklist for project MDX files

For each project marked **Remove**:

- Delete the `.mdx` file under `src/app/work/projects/`.
- Remove associated images under `public/images/projects/project-0N/` if they still exist.
- Check `src/app/resources/content.js` for hardcoded references.
- Check navigation, homepage/project-card content and metadata for hardcoded references.
- Confirm `src/app/sitemap.ts` no longer emits the removed project. It is generated from `getPosts()`, so this should happen automatically, but verify it after removal.
- Run lint/build checks after removal.

For each project marked **Replace**, update the relevant project MDX rather than deleting the route pattern unless the chosen implementation uses a new slug. Ensure the final slug/title/link mapping is internally consistent.

## Agile Resources (`/agile`)

**Decision: remove the Agile Resources section.**

This removes the Scrum-heavy resource section and should also allow cleanup of the password gate that exists solely for Agile Resources.

Before deleting auth-related code, confirm it is not used by any non-Agile feature.

Review and remove, where exclusively associated with `/agile`:

- `src/app/agile/`
- `src/app/agile/resources/*.mdx`
- Agile-resource images/assets
- `agileResources` content in `src/app/resources/content.js`
- navigation links to `/agile`
- route/config entries for `/agile`
- `protectedRoutes` entries for Agile resources
- `src/pages/api/authenticate.ts`
- `src/pages/api/check-auth.ts`
- `AGILE_RESOURCE_PASSWORD` references
- auth-token cookie logic used only by the Agile password gate
- sitemap references/entries associated with Agile resources
- any documentation that instructs maintainers to configure Agile-resource authentication after the feature has been removed

Do **not** remove an endpoint, cookie or environment-variable dependency until repository search confirms it has no other use.

After removal, update `CLAUDE.md` so its route map, security notes, content model and known quirks describe the new current state rather than the retired Agile feature.

## Scrum Master certifications and positioning

Remove Scrum Master / Scrum-focused certification cards and certification-heavy positioning from visible portfolio content where they reinforce the old primary identity.

Do **not** remove all evidence of collaborative delivery experience.

The following may remain where relevant and proportionate:

- Agile
- Scrum
- Kanban
- SAFe
- iterative delivery
- stakeholder collaboration
- retrospectives
- continuous improvement
- Definition of Done

These should appear as supporting **ways of working**, not as the main portfolio identity.

## Outcome

All decisions in this document have been applied. Final slug mapping:

| Decision | Now |
|---|---|
| culture4kids → Replace | `andromedae.mdx` → `/work/andromedae` |
| the good list → Replace | `hold-my-spoon.mdx` → `/work/hold-my-spoon` |
| job-tracker → Replace | `she-codes-data-platform.mdx` → `/work/she-codes-data-platform` |
| DDD Diamond Smash → Replace | `wedding-guestbook-platform.mdx` → `/work/wedding-guestbook-platform` |
| end-to-end data engineering → Keep / Reframe | `end-to-end-data-engineering.mdx` → `/work/end-to-end-data-engineering` |
| portfolio → Remove | deleted |
| redux to do list → Remove | deleted |

Note: this table's original `project1.mdx`/`project2.mdx` rows had the two project names swapped relative to the files on disk. The mapping above follows the **project names and their asset folders**, which were unambiguous. Files were renamed from `projectN.mdx` to descriptive slugs, so `/work/:slug` URLs changed.

Also removed after repository-wide dependency checks confirmed they were exclusive to Agile Resources: `src/pages/api/` (the whole Pages Router directory), the `authToken` cookie logic, the `cookie` and `@types/cookie` dependencies, `protectedRoutes`, the `AGILE_RESOURCE_PASSWORD` entry in `.env.example`, `public/images/agile/`, and the Scrum/SAFe badge images under `public/images/skills/`.

## Final verification

After removals/replacements:

- no navigation link leads to `/agile`;
- no removed project appears in `/work`, sitemap or metadata;
- no unused Agile password/auth dependency remains if it was exclusive to the removed feature;
- no Scrum Master certification dominates the Skills/About presentation;
- Agile philosophy remains represented only as an appropriate supporting way of working;
- lint and build pass.
