# **Thank you to Once UI's Magic Portfolio boilerplate**

👉 [**Gina’s New Portfolio**](https://ginas-new-portfolio.vercel.app/) 🚀  

## **Overview**
This portfolio was built using [Once UI's Magic Portfolio](https://once-ui.com), leveraging its design system while implementing significant customisations to tailor it to my needs.

## **Project Status**
The portfolio features production and near-production work: a commercial Astro/Cloudflare website, an inherited TypeScript product with Stripe and CRM integrations, a Next.js/Supabase data platform, a full-stack guestbook PWA, and an end-to-end data pipeline. Several of these live in private work or organisational repositories, so their case studies describe the architecture and engineering rather than linking source code. Happy to talk through any of them directly.

### **Key Learning Curve & Deployment Challenges**

Building and deploying this portfolio provided a valuable learning experience, particularly in:

- **Optimising code & reducing payload size** to comply with **1MB deployment restrictions** on Vercel.
- **Tree-shaking dependencies** to minimise unnecessary package loads.
- **Dynamic routing and metadata generation** using Next.js.
- **Implementing UI enhancements**, including interactive modals and evidence-grouped skills presentation.

## **🤖 How this portfolio is built and maintained**

The 2026 repositioning of this site was itself an exercise in AI-assisted engineering, run as a governed workflow rather than a series of one-off prompts. The scaffolding lives in [`.claude/`](.claude/) and is committed alongside the code, so the process is inspectable rather than asserted.

### **🎯 A written Definition of Done**

[`.claude/GOAL.md`](.claude/GOAL.md) holds 40 completion criteria spanning positioning, case studies, removals, skills, accessibility, lint, build, payload size and deployment verification. Claude Code worked against that goal until each one was satisfied.

Two rules stop it being decorative:

- a criterion is ticked only once it has been **verified**, never because code was written for it;
- anything that genuinely cannot be completed — a link no automated request can check, a measurement that needs a live production domain — stays unticked with the blocker written down, rather than quietly worked around.

### **📚 Context as a factual boundary**

[`.claude/context/`](.claude/context/) holds the reviewed source material: the approved messaging direction, the keep/remove/replace decisions, and one document per project recording verified facts, ownership and privacy boundaries.

Agents are instructed to treat these as limits — not to invent technologies, metrics, dates, responsibilities or outcomes beyond what the documents support, and to preserve anything deliberately marked unverified. This is what keeps a portfolio honest when a model is doing the drafting: claims about my work trace back to a reviewed document, not to a model's sense of what sounds impressive.

Repo-local skills in [`.claude/skills/`](.claude/skills/) carry the standards that apply to every change — a design skill extended with WCAG 2.2 AA contrast, reduced-motion and keyboard-focus requirements, and a Next.js performance skill adapted from Vercel Engineering's.

### **👥 Separating authoring from review**

Drafting and reviewing were deliberately handled by different agents. A review agent read only the source-of-truth documents and the finished pages, checking for invented facts, blurred project ownership, privacy leaks and contradictions between pages.

That separation earned its place. The review pass caught that the About and Skills pages described a client's Astro site as "in commercial production" while its own case study — correctly — stated the domain cutover had not yet happened. A reviewer working from the author's assumptions would have read straight past it.

### **✅ Automated validation**

Every quality claim is backed by a check that can fail:

| Check | What it caught |
|---|---|
| `npm run lint` (Biome), `next build`, `tsc --noEmit` | Kept green on every change; `next lint` had silently stopped working when Next 16 removed it |
| `VERCEL_ANALYZE_BUILD_OUTPUT=1 vercel build` | Every serverless function weighing **78 MB**, because `public/` was being traced into each bundle — now **6.9 MB** |
| `vercel deploy` preview + authenticated route checks | Confirmed all routes, generated OG images, sitemap and removed-route 404s on a real deployment before any promotion to production |
| `npm audit` | **13 advisories (one critical)** originating from dependencies nothing in the project imported — now **0** |
| Browser automation via the Chrome MCP | Skills-chart labels clipped on narrow screens; the fix was validated against measured text metrics across a 320–900 px sweep |

Deployment inspection is wired up through the **Vercel MCP**, with the **Vercel CLI** performing the build-output analysis and preview deployments above.

## **Custom Features & Enhancements**
Beyond the original Once-UI template, I introduced several **custom features** to improve usability, accessibility, and interactivity.

### **🔹 Acknowledgement Pop-Up**
- Implemented a **custom pop-up modal** that appears upon first visit, paying respect to Traditional Custodians.
- Users need to **acknowledge the modal**, before diving into content.

### **🔹 Evidence-based Skills page**
- Skills are grouped by capability and tagged with the **strongest evidence behind them** — production experience, practical experience, working knowledge, or currently developing — instead of subjective out-of-ten scores.
- A single chart.js overview summarises how that evidence is distributed, with a screen-reader text alternative alongside the canvas.

### **🔹 Portfolio Optimisation**
- **Lazy-loaded components & images** to improve performance.
- **Optimised once-ui imports** to **tree-shake unused dependencies**, preventing unnecessary code from being bundled.
- **Refactored metadata generation** to streamline Open Graph image handling using **next/og**.

## **📌 Features from Once-UI**

### **🎨 Once UI Design System**
- Fully responsive design, optimised for all screen sizes.
- Endless customisation options via **[data attributes](https://once-ui.com/docs/theming)**.
- Pre-built **tokens, components & features** for rapid development.

### **📈 SEO & Metadata**
- Automatic **Open Graph & Twitter card image generation** using **next/og**.
- Schema.org metadata generation based on content structure.

### **📝 Content Management**
- Dynamic content rendering for sections based on JSON or Markdown files.
- Auto-generated and displayed **social links**.

## **🚀 Deployment**
This portfolio is **deployed on Vercel**. Nearly every route is statically pre-rendered at build time; the only dynamic route is `/og`, which generates Open Graph images on the **Node.js runtime** — deliberately, after the Edge runtime once exceeded Vercel's deployment payload limit.

Changes are verified on a **preview deployment** before anything is promoted to production.

## **💡 Lessons Learned**
Building this portfolio has been an incredible journey, significantly enhancing my expertise in:
- **Next.js performance optimisation**
- **Reducing build size and handling deployment constraints**
- **Leveraging Once-UI’s design system while maintaining customisation flexibility**
- **Improving project structure for scalability**
  
### **✨ Thank You to Once-UI & the Dev Community**
A huge thanks to **Once-UI** for providing an **amazing boilerplate** and to the **developer community** for the insightful discussions around **Next.js, optimisation strategies, and deployment best practices**!

---

### **📌 Next Steps**
1. **Continued Portfolio Enhancements** – Further optimising performance and adding new projects.
2. **User Feedback Integration** – Iterating on UX improvements based on visitor behavior.
3. **Post-launch metrics for Andromedae** – Replacing pre-launch benchmarks with production Lighthouse and Core Web Vitals results once the domain cutover is verified.

---

### **🔗 Visit My Portfolio Here:**
👉 [**Gina’s New Portfolio**](https://ginas-new-portfolio.vercel.app/) 🚀  
