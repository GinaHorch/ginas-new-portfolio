Project 4: Wedding Guestbook & Media Platform
What is it?

A full-stack, installable Progressive Web App built for real wedding guests to share messages, photographs and videos during and after a couple's wedding — replacing a traditional physical guestbook. Guests could leave a personal message, upload media, and browse memories shared by other guests, all from their phones via a QR code.

This is the second, solo-built iteration of a wedding guestbook concept I first worked on as part of a group project, Snappily Ever After. For this version I rebuilt the concept from a supplied professional design and added a full non-technical-friendly admin dashboard, so the couple could manage their own event data directly rather than depending on a developer.

Because this application holds real guests' personal messages, photographs and videos, it's described here without images, without identifying the couple, and without a public link — see "Privacy approach" below.

Design and attribution

Visual design and identity for this iteration were created by Bianca Di Biase, including custom illustrations and UX direction. My role was development and technical implementation.

This attribution stays visible because it accurately reflects ownership and demonstrates my ability to work from another professional's design, rather than implying I created the visual identity myself.

Your role

I developed the working application from the supplied design. My contribution included:

Next.js application development;
TypeScript implementation;
translating the visual design into responsive components;
Supabase integration;
database-backed guest messages;
photograph and video uploads;
media storage;
client-side image compression;
interactive image/video galleries;
responsive carousel functionality;
PWA functionality with service-worker caching and mobile installation;
a non-technical-friendly admin dashboard, giving the couple independent control over guest messages, photos, videos and access — without needing developer support;
authenticated administration and protected admin routes;
content moderation and media download functionality;
production deployment to Vercel; and
QR-code-compatible access for wedding guests.
Tech stack
Next.js 16
React
TypeScript
Supabase
React Dropzone
SwiperJS
Browser Image Compression
Progressive Web App / Service Worker
Vercel
Cursor
Git / GitHub
How AI-assisted tooling was used

Development used Cursor as the primary AI-assisted development environment, alongside Supabase AI for schema and query assistance directly against the database.

AI assistance supported translating requirements into implementation tasks, component development, TypeScript implementation, Supabase integration, debugging, file-upload handling, responsive behaviour, PWA configuration, admin functionality, and iterative UI refinement.

I remained responsible for understanding the supplied design, determining how to implement the UX technically, defining application behaviour, integrating the frontend and backend, testing guest and administrator flows, validating uploads, testing responsive/mobile behaviour, reviewing AI-generated changes, and deploying the final application. AI tooling accelerated implementation; it did not independently build the application.

Application / data specifics

Guests can leave a message, upload up to five photographs and one video per message, browse submitted media, and install the app as a PWA. Client-side image compression reduces unnecessarily large uploads before files reach backend storage.

The admin dashboard lets the couple — without any technical background — view guest messages, review and moderate photographs and videos, approve or reject submissions, manage access, and download media.

Together this spans frontend + authentication + database + storage + media processing + administration + deployment — full-stack work, not just a public-facing UI.

Privacy approach

This application is not publicly linked from this portfolio. It holds real guests' personal messages, photographs and videos, and administrative access belonging to the couple who own the event — publishing a live link or screenshots would expose real people's private content without their consent. The couple's names aren't used here for the same reason, and the app has been taken offline / access-restricted rather than left publicly reachable now that it's no longer needed live.

Repository: private.

Instead, this project is represented through written description and the architecture diagram above, covering the full-stack, media-processing, security and deployment work involved.

Key achievements / metrics
complete deployed application used for a real event;
full-stack Next.js/TypeScript implementation;
Supabase-backed data and media, with access-controlled storage;
built a non-technical-friendly admin dashboard giving the client couple full independent control over their guest content and access;
multi-file media upload with client-side image optimisation;
content moderation;
responsive, installable PWA with service-worker caching;
Vercel production deployment.

Functional metric: supports up to 5 photographs + 1 video per guest submission.

One-line pitch

Developed a full-stack Next.js wedding guestbook PWA from a supplied professional design — media upload and processing, secure access-controlled storage, and a non-technical-friendly admin dashboard giving the client couple full control, deployed as an installable PWA.