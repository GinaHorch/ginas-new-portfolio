# Project: Andromedae Website

## What is it?

A complete rebuild of Andromedae's commercial website for an Australian SMSF administration business. The new website replaces the organisation's legacy Wix site with a modern, maintainable Astro implementation designed around the company's updated visual identity and business requirements.

The site provides information about Andromedae's SMSF administration services, company, team, fees, contact options, privacy and security practices, complaints process and supporting business information.

This is a production replacement rather than a portfolio demonstration. The Astro implementation has been deployed and tested through Cloudflare/Wrangler, with the public-domain cutover scheduled for **Monday, 10 August 2026**. Until that cutover succeeds, `https://www.andromedae.com.au/` continues to serve the legacy Wix site.

## Your role

I am responsible for the technical implementation and production delivery of the new website.

My work includes:

- translating the supplied Figma design direction into a working responsive website;
- establishing the Astro project architecture;
- developing reusable components and page layouts;
- implementing the site in TypeScript, Astro and CSS;
- developing and maintaining the design-token and styling system;
- implementing responsive behaviour across desktop and mobile;
- optimising and managing website imagery;
- addressing accessibility requirements including semantic structure, heading hierarchy, keyboard navigation, focus states, image alternatives and colour contrast;
- implementing SEO fundamentals including metadata, sitemap and robots configuration;
- preparing redirects from legacy Wix URLs;
- configuring Cloudflare deployment;
- implementing production security headers;
- preparing the Wix-to-Cloudflare production migration;
- planning DNS, TLS and rollback requirements;
- testing the site prior to production release; and
- documenting the deployment and ongoing development approach.

I am also responsible for maintaining the website after launch as part of my broader systems, security and development role at Andromedae.

## Tech stack

- **Astro**
- **TypeScript**
- **HTML**
- **Vanilla CSS**
- **Astro image optimisation**
- **Cloudflare**
- **Cloudflare Workers / Wrangler deployment workflow**
- **Git / GitHub**
- **Figma** as the design source
- **Claude Code** as the primary AI-assisted development environment

The site deliberately uses a lightweight component and CSS architecture rather than adding a large UI framework where one is not required.

## How Claude Code was used

Claude Code forms part of a structured engineering workflow rather than being used only for ad-hoc code generation.

The project uses a persistent `CLAUDE.md` file to give Claude project-specific context and engineering constraints, including:

- project architecture;
- component conventions;
- styling rules;
- accessibility expectations;
- image-handling requirements;
- implementation constraints;
- verification requirements; and
- instructions about what constitutes acceptable completed work.

I have also been developing reusable Claude Code skills for the project, including design-related workflows.

Claude Code has been used to support:

- implementation planning;
- component development;
- analysing existing project patterns before making changes;
- translating design requirements into implementation tasks;
- debugging;
- refactoring;
- responsive-design reviews;
- accessibility review;
- deployment preparation;
- security review;
- documentation;
- code review; and
- verification.

My role remains to define the requirements and constraints, make architectural and security decisions, review proposed changes, test the resulting application and determine whether work meets the project's Definition of Done.

The project is increasingly an example of my approach to **context engineering for AI-assisted software development**: giving an agent persistent project knowledge, explicit rules, reusable skills and verification expectations rather than treating each interaction as an isolated prompt.

Do not quantify the project as a percentage of "AI-written" versus "hand-written" code. The meaningful distinction is how AI assistance is governed, reviewed and verified.

## Live link / repo

**Public domain:**  
https://www.andromedae.com.au/

As of **8 August 2026**, the public domain still serves the legacy Wix site. The Astro/Cloudflare production cutover is scheduled for **10 August 2026**.

**Repository:** Private work GitHub repository.

## Key achievements / metrics

### Confirmed achievements before production-domain cutover

- complete commercial website rebuild;
- migration path from Wix to a developer-managed Astro architecture;
- Cloudflare Workers deployment configured;
- pre-production build deployed and tested through Cloudflare/Wrangler;
- reusable component architecture;
- responsive implementation;
- accessibility incorporated into development requirements;
- security headers and production configuration prepared;
- legacy URL preservation planned through redirects;
- SEO migration prepared;
- documented rollback strategy for the production cutover.

### Metrics to capture after successful launch

Do not claim these until measured against the public production site:

- Lighthouse Performance score;
- Lighthouse Accessibility score;
- Lighthouse Best Practices score;
- Lighthouse SEO score;
- Core Web Vitals;
- final page weight;
- reduction in third-party scripts compared with Wix, if measured reliably;
- page-load performance before vs after migration, if measured on comparable conditions;
- legacy redirects successfully verified;
- Search Console indexing after cutover.

Pre-launch benchmark results from the Cloudflare/Wrangler deployment may be retained as development evidence, but they must be labelled **pre-launch**. Re-run Lighthouse against the public production domain after cutover before using a score as a production metric.

## Screenshots / assets needed

Store under an appropriate project folder such as `public/images/projects/andromedae/` or the final replacement project's existing asset path.

Recommended assets:

- `andromedae-home-desktop.png` — representative desktop homepage;
- `andromedae-home-mobile.png` — mobile responsive view;
- `andromedae-services.png` — service section/page showing component design;
- `andromedae-team.png` — team/about implementation;
- `andromedae-contact-us.png` — contact/booking experience if visually useful;
- ~~`andromedae-lighthouse.png`~~ — removed at the 10 August 2026 cutover. It showed the pre-launch Wrangler result, which the measured production figures superseded. Lighthouse results are now stated as text in the case study rather than as a screenshot: it keeps them readable to assistive technology, and it avoids a stale image contradicting the numbers beside it. Re-shoot only if a screenshot adds something the text cannot;
- `claude-code-workflow.png` — diagram of the structured agentic workflow without exposing private source code or business information.

## One-line pitch

### Before production cutover

**Rebuilt a commercial Astro website and prepared its secure Cloudflare production migration using a structured Claude Code engineering workflow, reusable components and accessibility-first implementation.**

### After successful production cutover

**Rebuilt and deployed a commercial Astro website using a structured Claude Code engineering workflow, reusable components, accessibility and secure Cloudflare configuration.**
