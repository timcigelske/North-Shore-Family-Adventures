# Launch validation update

The owner requested production release after reviewing the preview. Updated local production build, 12 unit tests, 1,649 link/asset checks, 12 desktop/mobile page checks and interactive map checks pass. The map caption contrast finding was corrected to zero detected WCAG A/AA violations. See [launch-update.md](launch-update.md), browser-results.json and map-results.json. REI links now have account approval evidence; Git CD is connected. Newsletter, analytics and ads remain off. The previous preview report below is retained as history.

# Validation report

Build date: October 27, 2026. Tests below concern the source and local static build. A real nonproduction deploy-preview has now been verified; see deployment.md, deployed-results.json and deployed-browser-results.json. Provider-side subscription/analytics/ad outcomes remain unconfigured.

## Completed

- Astro build: 51 static HTML pages, including 23 campground profiles and seven guide articles (six field guides and one rental guide). Editorial content is in initial HTML, with source/review information, unique metadata and one H1.
- Astro schema and type checker: zero errors and zero warnings (minor tool hints documented in raw check output).
- Unit suite: 12 tests passed. Tent, RV delivery, cabin, zero optional costs and invalid arithmetic; newsletter invalid intent/email, disabled preview/missing config, repeat active/pending/unsubscribed records, new active mapping, pending response, upstream/timeout failures, payload/origin/context limits.
- Static audit: 1,644 internal link/asset references, no broken internal targets; 23 generated profiles; all preview HTML carries noindex; sitemap empty in preview; comment-only ads.txt; built Netlify form definition present.
- Image/source ledger: 23 real licensed image records and 23 documented location records. Some images are explicitly regional landscapes, not photographs of individual campsites. Locations distinguish DNR entrance directions from approximate park centroids.
- Browser checks and accessibility: 12 representative page/viewport combinations at 390 and 1440 px passed with zero detected WCAG A/AA violations, overflow, JavaScript errors or external tracking requests. Search found four Door County records, the RV filter reduced that to two, empty/reset worked and reset restored all 23. Favorites survived reload and cleared; checklist state/custom items persisted and reset; the tent example totaled $255 per party / $63.75 per person. Map-tile failure left all 23 records available; blocked storage preserved reading; keyboard entry focused the skip link; print output hid navigation. See `browser-results.json` for raw results. The first run found a reset timing defect and a profile fine-print contrast ratio of 4.11; both were corrected before final validation.
- Manual visual inspection: homepage/mobile profile/desktop planner screenshots reviewed; final representative screenshots stored locally in `docs/screenshots/` (not committed as source assets). Print planner PDF retained there.

## External and content limits

- The owner explicitly approved preview-only deployment after the initial automatic rejection. The resulting deploy-preview is ready, published_at is null, and the actual responses and live browser checks passed. It is a shareable unprotected URL, not private.
- Git source and draft PR are committed and read back; automatic Netlify continuous deployment still needs GitHub browser authentication/linking. This verified preview is upload-triggered.
- No actual Beehiiv publication, custom fields or keys selected; no real subscription, active conversion or stored attribution claimed. Concurrency/idempotency and original acquisition retention need a permitted provider-record test before activation.
- Contact form registration and endpoint acceptance are verified. A synthetic submission advanced last_submission_at but accepted count stayed zero; inspect spam and verify an accepted stored record. Owner email notifications remain unconfigured.
- No GA4 intended-property Realtime/DebugView evidence, real Search Console verification/indexation, affiliate approval or AdSense approval/serving. CMP hook is preparatory, not a verified vendor-specific certified integration.
- Current campsite rates, availability, exact site dimensions, Wi-Fi reliability, measured noise/privacy and original overnight experience are not claimed. Most late-season facilities need date-specific operator checks.
- The deployed distributed rate-limit rule was verified with a 429 after the documented propagation delay; invalid request validation returned 400 before enforcement propagated.
- No paid upgrades, DNS changes, domain purchases, messages to real recipients, production launch or recurring monitoring.

Browser navigation timings are laboratory observations on a local machine, not Core Web Vitals field data, not a Lighthouse score and not a performance guarantee. External links that block automated access should be reported as uncertain rather than automatically broken.

Netlify secret scanning completed with no matches across 156 uploaded source files. The first synthetic contact request may be in spam: official troubleshooting guidance notes that fake test addresses are commonly classified there. No accepted stored record or notification delivery is claimed.
