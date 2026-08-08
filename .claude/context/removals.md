# Projects & Sections Marked for Removal

*(Template — fill in before an agent removes anything. Nothing gets deleted based on inference.)*

The current site has 7 project MDX files (`src/app/work/projects/project1.mdx` through `project7.mdx`). List which ones are being retired and why, e.g.:

| File | Project name | Keep / Remove | Notes |
|---|---|---|---|
| `project1.mdx` | ? | ? | ? |
| `project2.mdx` | ? | ? | ? |
| `project3.mdx` | ? | ? | ? |
| `project4.mdx` | ? | ? | ? |
| `project5.mdx` | ? | ? | ? |
| `project6.mdx` | ? | ? | ? |
| `project7.mdx` | ? | ? | ? |

For each project marked "Remove," an agent will need to:
- Delete the `.mdx` file under `src/app/work/projects/`
- Remove associated images under `public/images/projects/project-0N/`
- Check `src/app/resources/content.js` for any hardcoded references
- Confirm the sitemap (`src/app/sitemap.ts`) picks up the removal automatically (it's generated from `getPosts()`, so it should — but verify after removal)

## Sections

- **`/agile` (Agile Resources)** — keep, reframe, or remove? See the open question in `positioning.md`.
- **Anything else to remove or retire?**
