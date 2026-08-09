# Agentic Run Evidence — Portfolio Repositioning

A factual record of how the portfolio repositioning was executed: one goal-driven autonomous
run, supported by parallel research agents and an independent review agent.

Written 9 August 2026 from the Claude Code session transcripts. All figures below are counted
from those transcripts and from `~/.claude/history.jsonl`, which records only human-typed
input — not reconstructed from memory.

**Scope note.** This document describes *process*, not project content. Client identities,
private repositories, source code, credentials, staging hostnames, internal organisational
data and any confidential project details are deliberately excluded. Where a finding
concerned such material, the finding is described by its category only.

---

## 1. The run

| | |
|---|---|
| **Date** | 8 August 2026, 14:02–14:53 UTC |
| **Duration** | 50 minutes 48 seconds, continuous |
| **Purpose** | Execute the repositioning defined in `.claude/GOAL.md` — move the portfolio off a "Scrum Master / career pivot" narrative and onto full-stack development, real production software, and security and systems thinking |
| **Mechanism** | A goal-driven session hook holding the agent to a stopping condition rather than to a single prompt |
| **Governing documents** | `CLAUDE.md`, `.claude/GOAL.md`, `.claude/context/README.md`, `positioning.md`, `removals.md`, `projects/*.md` |

The goal was issued three times across two sessions; the third invocation, after a context
reset, is the one that ran to completion.

---

## 2. Stopping condition (sanitised)

The operative clauses of the goal instruction. Content-specific factual guardrails have been
removed; the control-flow and verification clauses are quoted as issued.

```
Work through .claude/GOAL.md systematically until every currently achievable criterion
is complete.

Treat the context files as factual boundaries. Do not invent project details,
technologies, responsibilities, metrics, dates, ownership, confidential information or
outcomes. Preserve anything marked unverified or pending.

Verification:
  Review changed content against the context files.
  Check consistency across homepage, About, Skills, projects, metadata and navigation.
  Check accessibility/responsive behaviour.
  Run lint and production build and fix issues introduced by this work.
  Check bundle/payload size as required by CLAUDE.md/GOAL.md.
  Verify a preview deployment if the configured tooling permits it.
  Do not promote to production, alter production DNS/domains, force-push, merge,
  purchase resources or perform irreversible production actions without my explicit
  approval.

Update .claude/GOAL.md checkboxes only after each criterion is genuinely verified.

If something cannot be completed because required facts, credentials, external access or
post-launch measurements are unavailable:
  do not invent or bypass it;
  leave it unchecked;
  document the blocker briefly;
  continue with other independent work.

Use subagents where useful for independent project work or review, but avoid concurrent
edits to shared files.

Continue autonomously until:
  all achievable GOAL items are verified;
  remaining unchecked items have genuine documented blockers; and
  final review, lint, build and applicable preview verification are complete.

At the end, report: what changed; completed GOAL items; remaining blockers;
verification results; significant files changed; and anything requiring my manual
review or approval.

Do not stop to ask whether to continue with ordinary checklist items. Continue unless a
decision requires unavailable information or an irreversible/external production action.
```

Three properties matter here. The condition is **verification-gated** — checkboxes may only
be ticked after a criterion is genuinely verified. It has an **honest-failure path** — an
unmet criterion must be left unchecked and documented, never bypassed or invented around.
And it carries an **irreversibility boundary** — production promotion, DNS, force-push,
merge and purchases are withheld from autonomous action regardless of progress.

---

## 3. Autonomy evidence

`~/.claude/history.jsonl` logs human keystrokes only. Between the goal being set and the
next human input there are none.

| Event | Timestamp (UTC) |
|---|---|
| Goal issued | 2026-08-08 14:02:09 |
| Final execution summary delivered | 2026-08-08 14:52:57 |
| Next human-typed message | 2026-08-09 02:39:21 |
| **Human prompts during execution** | **0** |

The run therefore worked through the unchecked acceptance criteria, ran its own checks, acted
on its own review findings and reached its stopping condition without a second implementation
prompt. The human's next message, some twelve hours later, responded to the run's escalations
rather than directing it.

---

## 4. Run statistics

| Metric | Value |
|---|---|
| Assistant turns | 358 |
| Tool calls | 230 |
| Skills self-invoked | 4 — frontend design, React/Next.js best practices, security review, browser automation |
| Subagents spawned in-run | 1 (independent reviewer) |
| Subagents across the whole programme | 7 |
| Lint findings fixed | 36 |
| Routes verified | 9 |
| Pages built | 14 |

No commit, push or deployment was made by the run. Every change was left in the working tree
for human review.

---

## 5. Parallel-agent topology

Seven subagents ran across the programme. Each has its own transcript and metadata record.

| Agent | Type | Window (UTC, 8 Aug) | Turns | Phase |
|---|---|---|---|---|
| Explore tech stack and config | read-only explore | 04:15:36 → 04:16:16 | 21 | Scoping |
| Explore pages and routing | read-only explore | 04:15:41 → 04:16:44 | 47 | Scoping |
| Explore components and styling | read-only explore | 04:15:49 → 04:16:55 | 38 | Scoping |
| Research external skill sources | read-only explore | 04:50:59 → 04:52:48 | 39 | Scoping |
| Research deployment tooling options | read-only explore | 06:10:54 → 06:12:33 | 34 | Scoping |
| Configure status line | utility | 06:40:36 → 06:41:16 | 17 | Setup |
| **Review case studies vs context** | **general-purpose** | **14:44:27 → 14:49:59** | **71** | **Execution** |

The first three overlap in wall-clock time — a genuine parallel fan-out, each agent given a
disjoint slice of the codebase (stack and tooling, routes and content model, components and
styling) and reporting a summary rather than raw file dumps.

The topology is deliberately asymmetric: **fan-out for reading, single-threaded for writing.**
`.claude/context/README.md` specifies that shared files — homepage and About copy, the central
content module, navigation, metadata and configuration — are handled in one coordinated
integration pass rather than by parallel agents, precisely to avoid conflicting edits and
inconsistent messaging. No two agents wrote to the same file.

---

## 6. Independent reviewer

The seventh agent is the one that carries the most weight. It ran *inside* the autonomous run,
after implementation and before the run reported done, as the integration/review step that
`.claude/context/README.md` prescribes.

It was constrained deliberately:

- **Read-only.** Instructed explicitly not to edit any file, so it could not quietly repair
  what it found and had to report instead.
- **Grounded in source-of-truth first.** Required to read the positioning document, all four
  project context files and the removals decisions *before* reading any produced content.
- **Fresh context.** Spawned without the implementing agent's history, so it assessed the
  output on its merits rather than reasoning from the intent behind it.
- **Narrowly briefed.** Checked factual consistency against context, project ownership
  (built vs inherited vs implemented from another's design), public/private boundaries, and
  unsupported claims — and was told to report concrete line-level findings.

This is the structural point: the agent that wrote the content was not the agent that
approved it.

---

## 7. Automated validation performed

Within the run, unprompted:

- `npm run lint` — 36 findings fixed to clean across 32 files. The lint script itself was
  found to be broken (it invoked a command removed in the current framework major) and was
  repaired as part of the work.
- `npm run build` — production build passing, 14 pages.
- **Route verification** — all 9 current routes returning 200; removed routes and the retired
  API endpoints confirmed returning 404; sitemap confirmed to list exactly the five current
  projects.
- **Accessibility contrast, computed rather than eyeballed** — measured against the site's
  forced dark theme: 7.9:1 on brand tag text, 13.8:1 on neutral text and chart labels.
- **Responsive check via browser automation** — home, about, work, skills and a project detail
  page rendered at 1400px and 400px.
- **Structured-data and metadata validation** — canonical URLs, OG image generation, JSON-LD.
- **Security review skill** invoked over the removal of the authentication and API surface.

---

## 8. Defects and findings caught

Two classes are worth separating: defects the run found in the pre-existing codebase, and
defects the reviewer found in the run's own output.

### Pre-existing defects found and fixed (outside the stated brief)

| Defect | Impact |
|---|---|
| Base URL was set to a localhost value, and pages compose absolute URLs from it | Every canonical URL, OG image reference, sitemap and robots entry was malformed |
| Dynamic OG image route returning 500 | Social preview images broken; two independent causes — a file-protocol fetch unsupported by the production server, and an image format the renderer cannot decode |
| Structured data serialising a React element as a description, and emitting the starter template's placeholder employer | Invalid and factually wrong JSON-LD on a live page |
| Lint script invoking a command removed in the current framework major | Linting had silently not been running |
| Tall full-page screenshots cropped to a 16:9 middle band | Project imagery showed an arbitrary slice rather than the top of each page |

### Findings raised by the independent reviewer against the run's own work

Twelve findings, graded. Two blockers, ten smaller. Representative examples:

- **BLOCKER — a claim on two shared pages contradicting the case study they linked to.** The
  About and Skills pages described a client site as being in commercial production. The
  project's own context document recorded that the public domain had not yet cut over. The
  case study itself was scrupulous about this; the shared copy was not. The reviewer's
  wording: *"the About and Skills pages directly contradict the case study they link to."*
- **BLOCKER — confidential detail visible inside a committed public asset.** A screenshot's
  browser address bar exposed an unreleased client staging hostname. The file was not
  referenced by any page, but it sat in the public directory and was therefore served at a
  fixed URL and committed to the repository.
- **SHOULD FIX — evidence levels resting on unshipped work.** Several skills were marked at
  the highest evidence tier — defined in the data model as "used in a system real people
  depend on" — on the strength of a project that was not yet serving anyone.
- **MINOR — a fabricated project constraint.** A case study asserted a delivery constraint
  that no context document supported, and which mildly contradicted the documented usage
  pattern of the application.

The last is the most instructive. It is not a bug; it is plausible, well-written narrative
detail that nothing verified. That class of error is exactly what a content-generating agent
produces and exactly what a fresh-context, source-of-truth-first reviewer is positioned to
catch.

---

## 9. How findings fed back into implementation

The findings were not filed for later. They were resolved inside the same run, before it
reported completion:

- Both blockers fixed — the production claim corrected on both shared pages to match the
  project's actual pre-cutover state, and the asset carrying the confidential detail removed
  from the served directory and escalated to the human with an explanation.
- The remaining ten findings applied, including the removal of the fabricated constraint, the
  narrowing of an over-broad privacy assurance, and the correction of unsupported specifics.
- The skills data downgraded four entries from the highest evidence tier to the tier below,
  with the reasoning recorded in `GOAL.md` so it can be reversed once the work actually ships.

That downgrade is still in the repository today, and the follow-up section of `GOAL.md` names
the exact entries to revisit after the cutover. The review did not merely produce a report; it
changed the shipped artefact and left a durable record of why.

---

## 10. Genuine blockers left unresolved

The run finished with three criteria **unchecked and annotated**, not quietly ticked:

1. **A profile link could not be machine-verified** — the platform returns an anti-automation
   status code to programmatic requests.
2. **Bundle and payload size check** — required tooling that was not yet authenticated, and
   authentication is interactive.
3. **Preview deployment verification** — same dependency.

For (2) the run substituted what it *could* measure — static asset totals, route weights, and
confirmation that no runtime dependency had been added and one had been removed — and said
plainly that this was a substitute, not the required check.

It also escalated six items for human judgement, including two image assets withheld from the
public directory (one exposing a staging hostname, one capturing an error state), a plaintext
secret still present in local and hosted environment configuration for a now-deleted feature,
and a tracked notes file left over from removed content.

**Subsequent resolution.** All three blockers were closed in later human-supervised sessions
once the deployment tooling was authenticated. The size check then surfaced a real regression
— every serverless function bundled at 78 MB, because content resolution through the working
directory caused the whole project tree to be traced into each function. Two fixes brought
this to **6.92 MB per page function**. The preview deployment was then verified end to end.
One item remains genuinely open: a client site link and its production performance metrics,
pending a domain cutover scheduled for 10 August 2026. It is recorded as pending rather than
estimated.

---

## 11. Final outcome

The run delivered a complete repositioning — removal of the superseded content section along
with its entire authentication, API, cookie and environment-variable surface after
dependency verification; five project case studies rewritten or reframed against approved
source material; homepage, About, Skills, metadata and structured data brought into line; and
a subjective numeric skills rating replaced with a defensible evidence-level model rendered
by a zero-JavaScript server component.

Alongside it: five pre-existing production defects found and fixed, twelve self-review
findings applied, a broken lint pipeline restored, and three criteria left honestly unchecked
with documented blockers.

The stopping condition held in both directions. The run did not stop early to ask permission
for ordinary checklist work, and it did not overstate completion to reach the end. The
distinction that makes this usable as evidence is that its report of what it had *not* done
is verifiable against the repository — and, in the case of the 78 MB regression that the
blocked size check would have caught, was later proven correct.

---

## 12. Exclusions

This document records process and outcomes only. Excluded by design:

- client, couple and individual identities;
- staging, preview and internal hostnames;
- private repository contents and source code;
- credentials, environment-variable values and secrets;
- participant records, identifiers, counts and internal organisational data;
- any project detail beyond what the approved public case studies already publish.

Findings that concerned such material are described here by category and severity only. The
underlying session transcripts are local, are not part of this repository, and are not
published.
