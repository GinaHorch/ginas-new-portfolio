---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults. Adapted from Anthropic's claude-code frontend-design plugin, with an added Accessibility & Contrast section and a repo-specific Once UI note.
license: Complete terms in LICENSE.txt (upstream); accessibility section added for this repo, MIT-equivalent
metadata:
  source: https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md
  adapted-for: ginas-new-portfolio
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. If there's any information in your memory about the human's preferences, context about what they're building, or designs you've made before – use that as a hint. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

For this repo specifically: the subject is a working developer's portfolio repositioning toward React/TypeScript/AI-augmented development (see `.claude/context/positioning.md` and `.claude/GOAL.md`). Ground design choices in that subject — real project work, real tools (Next.js, Astro, Supabase, Cursor, Claude Code) — rather than generic "portfolio template" defaults.

## Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the template answer, only use if that's truly the best option.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content.

Structure is information. Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence - like a real process or a typed timeline where order carries information the reader needs. Question if choices like numbered markers actually make sense before incorporating them.

Leverage motion deliberately. Think about where and if animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. An orchestrated moment usually lands harder than scattered effects; choose what the direction calls for. However, sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated. In this repo, motion is implemented via Once UI effect components (`RevealFx`, `GlitchFx`, `TiltFx`, `HoloFx`) — reuse those rather than introducing a new animation library.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance. For this repo, real copy should come from `.claude/context/` documents, not be invented.

## Process: brainstorm, explore, plan, critique, build, critique again

For calibration: AI-generated design right now clusters around three looks: (1) a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta accent; (2) a near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns. All three are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. Just like a human designer who's hired, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the human's design brief: create a compact token system with color, type, layout, and signature. Color: describe the palette as 4–6 named hex values. Type: the typefaces for 2+ roles (a characterful display face that's used with restraint, a complementary body face, and a utility face for captions or data if needed). Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Signature: the single unique element this page will be remembered by that embodies the brief in an appropriate way.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan exactly and deriving every color and type decision from it. **For this repo, also run the proposed color/type tokens through the contrast checks in the Accessibility & Contrast section below before finalizing the plan** — a striking palette that fails contrast isn't a usable design here.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and a element-based selector like .cta). This can happen often with paddings/margins between sections. In this repo, component styles live in adjacent `.module.scss` files layered on top of Once UI's token system (`src/once-ui/tokens/theme.scss`) — prefer token variables (`var(--brand-*)`, `var(--neutral-*)`, etc.) over new hardcoded colors so light/dark theme switching keeps working.

Try to do a lot of this planning and iteration in your thinking, and only show ideas to the user when you have higher confidence it'll delight them.

## Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Not taking a risk can be a risk itself! Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected (see Accessibility & Contrast below for what that quality floor actually means in checkable terms). Critique your own work as you build, taking screenshots if your environment supports it – a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creators have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

## Accessibility & Contrast

*(Added for this repo — the upstream skill mentions "visible keyboard focus, reduced motion respected" as a quality floor but doesn't define checkable criteria. This section fills that gap.)*

Treat these as hard requirements, not nice-to-haves, for any design/styling change:

- **Text contrast**: body text and its background must meet **WCAG 2.2 AA — 4.5:1** contrast ratio. Large text (≥24px regular, or ≥19px/14pt bold) may use the relaxed **3:1** minimum.
- **UI component and focus-indicator contrast**: interactive elements (buttons, inputs, focus rings) must meet **3:1** contrast against their adjacent background, per WCAG 2.2 SC 1.4.11 and 2.4.11.
- **This site forces `theme: "dark"`** in `src/app/resources/config.js` — any new `brand`/`accent`/`neutral` token combination (the Once UI `data-*` theming knobs) must be checked for contrast against the dark background specifically, not assumed safe because it "looks fine" in an editor preview. When proposing a new palette, state the actual hex values resolved from the tokens and their contrast ratio against the page background, not just the token names.
- **`prefers-reduced-motion` must be respected** for any new animation — Once UI's effect components (`RevealFx`, `GlitchFx`, `TiltFx`, `HoloFx`) should degrade gracefully; don't add raw CSS/JS animations that bypass this.
- **Keyboard focus** must be visible and follow a logical tab order. Don't remove the default focus ring without providing an equally visible custom one.
- **Semantic HTML over generic wrappers**: prefer Once UI's polymorphic `as="nav"|"header"|"main"|"article"` props on `Flex`/`Column` where the content is structurally meaningful, rather than defaulting every container to a `div`-equivalent.
- **Images need real `alt` text** — this repo already does this well (see `SmartImage.tsx`, `mdx.tsx`); keep it up when adding new project images, especially the new case-study images for the repositioning work.
- When in doubt on a specific ratio, compute it (e.g. via a contrast-ratio formula on the resolved hex values) rather than eyeballing it — call this out explicitly if you can't verify programmatically in the current environment, rather than asserting compliance without checking.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to use. They are design material, not decoration. Bring the same intentionality to copy that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's side of the screen. Name things by what people control and recognize, never by how the system is built. A person manages notifications, not webhook config. Describe what something does in plain terms rather than selling it. Being specific is always better than being clever.

Use active voice as default. A control should say exactly what happens when it's used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the register conversational and tuned: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each element do exactly one job. A label labels, an example demonstrates, and nothing quietly does double duty. For this repo, tone should match `.claude/context/positioning.md` once it's filled in — currently unset.
