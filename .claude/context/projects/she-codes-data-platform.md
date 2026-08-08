# Project: She Codes Data Platform

## What is it?

The She Codes Data Platform is a connected data and application platform developed to help She Codes Australia manage and understand its community, mentors, events, participation and impact.

What began as dashboard/data work developed into a substantially broader system supporting different user groups and operational workflows.

The platform includes experiences for:

- the She Codes community;
- mentors;
- administrators;
- organisational leadership; and
- onboarding/account claiming.

It connects data that historically existed across multiple operational platforms and provides a more unified view of people, participation and mentor engagement.

Because the repository belongs to She Codes Australia and contains internal systems, the public portfolio must focus on architecture, engineering problems and anonymised examples rather than exposing private organisational or participant data.

## Your role

I initially worked on the platform through a paid engagement and subsequently continued development and maintenance as a volunteer.

My work has included substantial full-stack, data and platform development, including:

- TypeScript/React dashboard development;
- Supabase/PostgreSQL data work;
- data modelling and data-quality investigation;
- person and identity resolution;
- external-system mappings;
- mentor records;
- email relationships;
- user-role relationships;
- events and attendance data;
- transaction data;
- mentor points and recognition;
- onboarding and account-claiming workflows;
- consent handling;
- authentication behaviour;
- administration workflows;
- reporting;
- automated data synchronisation;
- API integrations;
- webhooks;
- scheduled workflows;
- database repair and reconciliation;
- duplicate-record investigation;
- safe record-merging approaches;
- privacy review;
- permissions/access review;
- production debugging; and
- ongoing maintenance.

An increasingly important part of the work has involved investigating **what the system actually does under unusual or historical data conditions**, rather than assuming the intended/ideal user flow represents every account in the database.

## Tech stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Supabase**
- **PostgreSQL**
- **Supabase Auth**
- **Row Level Security (RLS)**
- **Next.js API routes**
- **Deno / TypeScript Supabase Edge Functions**
- **Python 3.11**
- **GitHub Actions**
- **Netlify**
- **Tailwind CSS**
- **TanStack Query**
- **Cursor** as the primary AI-assisted development and investigation environment

The platform also integrates with multiple third-party services covering event management, community communication, scheduling, CRM/marketing automation and messaging. Public case-study copy may keep vendors generic where that better protects She Codes' internal architecture.

## How AI-assisted tooling was used

Development combined several AI tools rather than relying on one.

- **Cursor** was the primary AI-assisted development and investigation environment.
- **Supabase AI** supported schema- and query-level reasoning directly in the database environment.
- **ChatGPT** supported broader investigation, planning and cross-referencing outside the IDE.

I developed a **cross-tool continuity workflow** so an investigation could move between tools without restarting from scratch. Verified schema understanding, constraints, findings, assumptions and unresolved questions were carried forward when changing tools so the next environment began from established context rather than re-deriving it.

AI assistance has supported work such as:

- navigating unfamiliar or complex sections of the codebase;
- tracing application behaviour across routes and database functions;
- investigating bugs;
- interpreting TypeScript and SQL;
- developing and modifying application features;
- generating candidate SQL for investigation;
- identifying dependencies;
- reviewing authentication and consent flows;
- reasoning about database relationships;
- developing controlled repair procedures;
- documenting findings; and
- reviewing implementation options.

The engineering responsibility remains mine.

For potentially destructive data work, **AI-generated SQL is not treated as inherently safe**.

My workflow has increasingly involved:

1. inspecting the relevant schema and code;
2. identifying foreign-key and dependency relationships;
3. running diagnostic queries;
4. rehearsing proposed changes;
5. verifying affected records;
6. preserving audit/history information where required;
7. applying the smallest appropriate change; and
8. performing post-change verification.

I also deliberately retain lessons from failed or imperfect AI-assisted runs so later work benefits from previous debugging rather than repeatedly rediscovering the same problems.

## Data platform specifics

The platform connects information across previously separate systems.

Examples of data and functions include:

- person records;
- mentors;
- email identities;
- user accounts;
- user roles;
- events;
- event attendance;
- mentor activity;
- mentor points and transactions;
- external-platform identifiers;
- profile information;
- mentor recognition;
- community activity;
- reporting and exports;
- consent status;
- account claiming;
- communications; and
- administrative approval workflows.

A particularly interesting technical problem is **identity resolution**.

One real person may historically appear in multiple systems with:

- different IDs;
- different email addresses;
- old and new records;
- platform-specific identifiers; and
- partially overlapping profile information.

Resolving those records incorrectly can corrupt relationships across attendance, mentor history, transactions or authentication.

The platform therefore requires careful reasoning about the distinction between:

**a person**  
**an account**  
**an email address**  
**a mentor record**  
**an external-system identity**

This has made data integrity and controlled reconciliation a major component of my work.

## Authentication, permissions and privacy

The system uses Supabase authentication and PostgreSQL Row Level Security.

Security-related work has included:

- authenticated role-based access;
- mentor account claiming;
- email verification;
- explicit dashboard consent;
- reviewing differences between manually created and self-claimed accounts;
- investigating access-control edge cases;
- RLS behaviour;
- server-side service-role operations;
- privacy review; and
- checking for unintended disclosure through public views.

One audit identified an important edge case in which the intended consent workflow and the actual behaviour of manually created historical accounts did not align.

Public portfolio copy may describe the engineering lesson and remediation approach, but should **not** publish internal account counts, personal identifiers or details that expose She Codes' private data or organisational issues.

## Automation and integrations

The platform uses automated processes rather than relying exclusively on interactive user actions.

This includes:

- scheduled GitHub Actions;
- data synchronisation;
- external API processing;
- webhook handling;
- mentor data processing;
- communication workflows;
- event-related workflows;
- database updates; and
- health/monitoring processes.

The architecture includes multiple scheduled automation jobs together with Python automation and Supabase/Deno Edge Functions connecting external operational systems to the platform.

Avoid brittle exact counts in public copy unless there is a reason to date the statement. Prefer **"multiple scheduled GitHub Actions and automated workflows"** over a count that may change as the platform evolves.

## Live link / repo

**Repository:** Private She Codes Australia GitHub repository.

**Previous public deployment:**  
https://shecodes-dashboard.netlify.app/

The previous public deployment is currently offline while changes are underway.

Recommended public wording:

> **Private organisational repository · previous public deployment currently offline while changes are underway.**

There is no need to explain internal organisational decisions.

## Key achievements / evidence

Strong technical evidence includes:

- developed and maintained a connected production data platform;
- integrated data across multiple operational systems;
- Next.js/React/TypeScript application development;
- substantial PostgreSQL/Supabase work;
- role-specific application experiences;
- automated synchronisation and processing;
- multiple scheduled GitHub Actions and automated workflows;
- API and webhook integrations;
- authentication and account-claim workflows;
- consent and privacy investigation;
- person/identity reconciliation;
- historical-data repair;
- constraint-aware database changes;
- mentor recognition and points workflows;
- reporting and administrative tooling; and
- cross-tool AI context continuity for complex investigations.

Safe scale wording:

> **Worked with a large historical mentor and community dataset spanning multiple external operational systems.**

Do not publish exact private user/account/consent counts unless She Codes has explicitly approved them for public use.

## Screenshots / assets needed

This project requires extra care because the underlying data belongs to She Codes.

Recommended assets:

- `she-codes-australia-landing.png` — authenticated/public-safe landing screen with no private data;
- `shecodes-data-architecture.png` — simplified architecture diagram showing external community/event/communication platforms → integration/automation layer → Supabase/PostgreSQL → Next.js platform;
- an anonymised/test-data mentor/dashboard view if useful;
- an identity-model diagram showing Person → Emails → Mentor/Auth/External IDs if helpful to explain the technical challenge.

Do not use screenshots containing:

- real private email addresses;
- personal participant records;
- consent/account status tied to identifiable people;
- production admin secrets;
- authentication tokens;
- private organisational debugging information.

## One-line pitch

**Built and maintained a connected Next.js/TypeScript data platform integrating multiple operational systems, with significant work across PostgreSQL, automation, identity resolution, authentication, privacy and data integrity.**
