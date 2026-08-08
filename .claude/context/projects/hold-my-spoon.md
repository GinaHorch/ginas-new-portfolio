# Project: Hold My Spoon

## What is it?

Hold My Spoon is a public web application designed to make recipes easier to follow, particularly for neurodivergent users and people who find traditional recipe formats overwhelming.

Users can bring recipes into the application and transform them into a clearer cooking workflow, including structured instructions, ingredient information, shopping support and a focused Cook Mode.

The application is also available as an installable Progressive Web App.

## Original state

Hold My Spoon was already partially developed when I became involved.

I did **not** originate the product or build its original codebase from scratch.

My role was to take over an existing application that was moving toward full-scale launch, understand the code and supporting systems, complete and improve functionality, resolve issues identified through testing and stakeholder feedback, and help bring the product into a usable production state.

This distinction should remain explicit in the portfolio. Inheriting and successfully extending someone else's application demonstrates the ability to understand an existing codebase, work within established product constraints and diagnose behaviour across connected systems.

## Your role

I worked as an **App Creator and Collaborator** on Hold My Spoon and took responsibility for substantial development, debugging, integration, testing and production support within the existing application.

My contribution included:

- understanding and extending an existing TypeScript application;
- completing and improving existing functionality;
- developing features through repeated stakeholder-feedback cycles;
- debugging application behaviour;
- production testing;
- resolving user-flow issues;
- supporting the application through launch;
- backend automation work;
- API and third-party integration work;
- subscription and account-access workflows;
- Stripe integration and webhook behaviour;
- GoHighLevel / LeadConnector funnel and CRM integration;
- testing purchasing and subscription flows;
- investigating billing and subscription edge cases;
- working on application-access provisioning following purchases/subscriptions;
- improving the product through iterative releases; and
- supporting the live product after release.

The product later moved into maintenance mode, with work focused primarily on keeping existing systems operating reliably rather than continued feature expansion.

## Tech stack

Confirmed or strongly evidenced:

- **TypeScript**
- **React**
- **Progressive Web App (PWA)**
- **Replit**
- **Stripe**
- **Stripe Webhooks**
- **GoHighLevel / LeadConnector**
- **API integrations**
- **Git / private work repository**
- AI-assisted application development through **Replit**

The final portfolio should identify any additional framework/backend technologies from the private repository before publishing a definitive full-stack list. Do not infer or invent missing stack details.

## API and integration work

API/integration work is a core part of this case study and should not be reduced to a generic frontend description.

Hold My Spoon operates within a wider commercial workflow involving the application plus external subscription, payment, CRM/funnel and access-provisioning systems.

Relevant connected systems include:

- **Hold My Spoon application**
- **Stripe**
- **Stripe webhooks**
- **GoHighLevel / LeadConnector**
- customer subscription, purchase and application-access workflows

Do not publish a simplified linear architecture diagram unless the exact direction of each event/data flow has been verified from the implementation. A safer public diagram is a connected-systems view showing Hold My Spoon integrated with Stripe and GoHighLevel/LeadConnector, with verified webhook/API relationships labelled separately.

The integration work included working with subscription lifecycle events and Stripe webhooks so commercial events could trigger the appropriate application behaviour.

One important engineering area was ensuring account/application access correctly reflected subscription events generated through external systems rather than assuming every purchase originated directly inside the application.

Testing exposed real-world integration edge cases involving:

- subscription creation;
- product upgrades;
- duplicate purchasing;
- subscription-tier state;
- user access;
- billing behaviour;
- payment flows; and
- feedback to the user during purchasing.

This demonstrates reasoning across distributed application behaviour and external APIs, not only UI development.

## How AI-assisted tooling was used

Hold My Spoon was developed heavily through Replit and its AI-assisted development environment.

The workflow was highly iterative rather than "generate once and accept":

**requirement or issue → implementation → test → stakeholder review → identify problem/change → revise → test again → release**

AI tooling was used to accelerate:

- code implementation;
- investigation;
- debugging;
- feature modification;
- API/integration work;
- backend automation;
- interpreting existing code;
- identifying potential causes of bugs; and
- implementing iterative changes.

I remained responsible for:

- translating stakeholder feedback into technical requirements;
- understanding how the existing application behaved;
- testing proposed changes;
- identifying when generated changes did not solve the underlying problem;
- reasoning across the application and external integrations;
- validating commercial workflows;
- making decisions about acceptable behaviour; and
- determining whether changes were ready for release.

This makes Hold My Spoon an example of AI-assisted work on an **existing production codebase**, rather than AI-assisted greenfield development.

## Live link / repo

**Live product:**  
https://holdmyspoon.com/

The public URL provides access to the product/landing experience. The current commercial trial/subscription structure may change over time and is not required for the portfolio case study; do not make current pricing/trial terms part of the technical project narrative unless they are specifically relevant and re-verified.

**Repository:** Private Andromedae/work GitHub repository.

## Key achievements / metrics

Confirmed achievements:

- took over a partially developed application;
- helped bring it into production;
- shipped improvements through repeated stakeholder/testing cycles;
- worked across frontend, backend automation and integrations;
- supported Stripe subscription/payment workflows;
- worked with GoHighLevel/LeadConnector integrations;
- implemented/debugged webhook-driven behaviour;
- resolved production issues and edge cases; and
- supported an installable public PWA.

Potential metrics such as registered users, PWA installs, recipes processed, subscription conversions, release counts or reduction in failed access/purchase scenarios must not be invented. Include them only if reliable analytics are later available and appropriate to publish.

## Screenshots / assets needed

Recommended:

- `holdmyspoon-home.png` — public landing page;
- a public recipe/import screen if it can be shown without requiring private user data;
- a reformatted recipe or Cook Mode screen if publicly safe;
- a mobile/PWA view;
- a simplified connected-systems diagram showing Hold My Spoon, Stripe and GoHighLevel/LeadConnector without exposing secrets or private implementation details.

A technical integration diagram may communicate this project's engineering contribution more effectively than screenshots of private Replit, Stripe or CRM dashboards.

## One-line pitch

**Took ownership of a partially developed TypeScript product and substantially improved it through AI-assisted development, API integrations, Stripe/webhook workflows, production debugging and iterative stakeholder testing.**
