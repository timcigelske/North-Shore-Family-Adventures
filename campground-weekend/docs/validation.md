# Validation report

Build date: October 27, 2026. Tests below concern the source and local static build. Netlify deployment and provider-side receipts remain unverified unless a later deployment record explicitly updates this file.

## Completed

- Astro build: 51 static HTML pages, including 23 campground profiles and seven guide articles (six field guides and one rental guide). Editorial content is in initial HTML, with source/review information, unique metadata and one H1.
- Astro schema and type checker: zero errors and zero warnings (minor tool hints documented in raw check output).
- Unit suite: 12 tests passed. Tent, RV delivery, cabin, zero optional costs and invalid arithmetic; newsletter invalid intent/email, disabled preview/missing config, repeat active/pending/unsubscribed records, new active mapping, pending response, upstream/timeout failures, payload/origin/context limits.
- Static audit: 1,644 internal link/asset references, no broken internal targets; 23 generated profiles; all preview HTML carries noindex; sitemap empty in preview; comment-only ads.txt; built Netlify form definition present.
- Image/source ledger: 23 real licensed image records and 23 documented location records. Some images are explicitly regional landscapes, not photographs of individual campsites. Locations distinguish DNR entrance directions from approximate park centroids.
- Browser checks and accessibility: 12 representative page/viewport combinations at 390 and 1440 px passed with zero detected WCAG A/AA violations, overflow, JavaScript errors or external tracking requests. Search found four Door County records, the RV filter reduced that to two, empty/reset worked and reset restored all 23. Favorites survived reload and cleared; checklist state/custom items persisted and reset; the tent example totaled $255 per party / $63.75 per person. Map-tile failure left all 23 records available; blocked storage preserved reading; keyboard entry focused the skip link; print output hid navigation. See `browser-results.json` for raw results. The first run found a reset timing defect and a profile fine-print contrast ratio of 4.11; both were corrected before final validation.
- Manual visual inspection: homepage/mobile profile/desktop planner screenshots reviewed; final representative screenshots stored locally in `docs/screenshots/` (not committed as source assets). Print planner PDF retained there.

## External and content limits

- No deployed guide/404/function/header/sitemap/ads.txt response has been verified. Automatic approval review rejected the deployment operation; it is awaiting explicit preview-only approval. The project is unprotected, so any future preview URL would be shareable rather than private unless separately protected.
- Git-based continuous deployment also needs Netlify’s GitHub browser authentication/linking. The connected GitHub API can write the branch independently.
- No actual Beehiiv publication, custom fields or keys selected; no real subscription, active conversion or stored attribution claimed. Concurrency/idempotency and original acquisition retention need a permitted provider-record test before activation.
- No contact submission storage or owner email notification verified; detection and notifications are separate activation steps.
- No GA4 intended-property Realtime/DebugView evidence, real Search Console verification/indexation, affiliate approval or AdSense approval/serving. CMP hook is preparatory, not a verified vendor-specific certified integration.
- Current campsite rates, availability, exact site dimensions, Wi-Fi reliability, measured noise/privacy and original overnight experience are not claimed. Most late-season facilities need date-specific operator checks.
- No paid upgrades, DNS changes, domain purchases, live-system messages, production launch or recurring monitoring.

Browser navigation timings are laboratory observations on a local machine, not Core Web Vitals field data, not a Lighthouse score and not a performance guarantee. External links that block automated access should be reported as uncertain rather than automatically broken.
