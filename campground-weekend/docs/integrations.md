# Activation guide

## Beehiiv

Confirm the intended owner-controlled publication; never infer an existing NSFA list. Account creation and unsolicited subscriptions are outside scope. Create supported custom fields for canonical signup page, placement and optional interests, then set their actual **names** in the Functions environment. Page/placement fields are required for activation. This adapter uses submission-time context, not persistent first-touch marketing storage.

Set Functions-scoped `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`, `BEEHIIV_FIELD_PAGE`, `BEEHIIV_FIELD_PLACEMENT`, optional `BEEHIIV_FIELD_INTERESTS`, `NEWSLETTER_ORIGIN` and `NEWSLETTER_ENABLED`. Set build-scoped `PUBLIC_NEWSLETTER_ENABLED` only after the source and real destination agree. Production credentials must be limited to the production context. Both server and client remain disabled on previews regardless of a public flag.

Current documented endpoints:
- POST https://api.beehiiv.com/v2/publications/:publicationId/subscriptions
- GET https://api.beehiiv.com/v2/publications/:publicationId/subscriptions/by_email/:email

The adapter checks for an existing subscription before creating one; existing active/pending/unsubscribed records receive no write. It never sets reactivate_existing true. The generic repeat-response message does not expose subscriber status. For prior unsubscribes use the publication's official hosted opt-in workflow; `NEWSLETTER_CONFIRMATION_URL` is reserved for an owner-selected hosted route and is not currently shown or used by the adapter.

Creation maps supported UTM fields and origin-only referring_site. Bounded path and placement are mapped to real custom fields; optional content ID is not sent as an invented top-level field. Campaign UTM values are preserved where present. No query string, full referrer, subscriber ID or email enters analytics. No email is stored in Netlify Forms.

Requests have strict email/intent/context validation, 4 KB actual streamed-body limit, honeypot, same-origin check, 8-second upstream timeout and **platform-distributed** Netlify per-IP/domain rateLimit of five requests per minute. Do not replace this with an in-memory serverless map. Verify actual rate limiting on the deployed project and plan; it is not proven by unit mocks. An edge 429 may be non-JSON; the form displays a safe failure.

`active` is shown only when the provider returns active; validating/pending is awaiting confirmation or validation. Unknown accepted states get a neutral check-inbox response, not an active conversion. Welcome and confirmation options are left to the provider defaults. Sequential retries look up first; concurrent create requests still require provider-level behavior verification before activation. If the provider can rewrite original custom-field acquisition during concurrent creates, add a durable idempotency mechanism before enabling. Never assert original acquisition is protected until a real record test proves it.

With owner-designated test data, verify invalid/timeout/error paths, repeat and previously unsubscribed cases, pending/active states, actual page and placement stored on the intended record and unchanged original acquisition. Do not casually test on the live list from a Deploy Preview. An official hosted/embed fallback may be configured after selection; attribution and confirmation capabilities must be reported accurately.

References checked October 27, 2026: [create](https://developers.beehiiv.com/api-reference/subscriptions/create/), [lookup](https://developers.beehiiv.com/api-reference/subscriptions/get-by-email).

## Contact and corrections

Enable Netlify form detection on the new project, then deploy the built static form. Definition name is `campground-inquiry`; fields are `form-name`, `bot-field`, `kind`, `name`, `email`, `campground`, `message`. `email` is a real email input; bot-field is the honeypot. There are no file uploads. The frontend POSTs URL-encoded data to `/`, checks response.ok and displays an honest status; Netlify handles the no-JavaScript route to `/thanks/`. The standalone thanks page does not prove a record exists.

Check the registered form and store a permitted synthetic submission, then read it back in Netlify (including the spam view if absent). Configure notifications to an actual supplied owner address and verify receipt separately. Proposed owner workflow: review inquiries weekly, export only as needed and delete resolved entries after 90 days unless a documented reason requires retention. This retention policy needs owner confirmation; no scheduled deletion exists. Record/export/delete contact data only with appropriate authorization.

## Affiliates and sponsors

Candidate entry pages checked: [RVshare](https://rvshare.com/affiliates), [Outdoorsy](https://www.outdoorsy.com/affiliate). Campspot/Awin and REI remain candidate programs awaiting owner-account and current terms verification; not integrated or approved. No program rate is used as a forecast. Before activation check program availability, application path, domain/channel permissions, link rules, disclosure and redirects. Exact approved links go in `src/data/affiliates/links.json`; preserve official booking links. Insert a visible disclosure before the first real paid recommendation. Existing ordinary links stay ordinary until tracking is actually configured.

## GA4

Choose a dedicated owner-controlled property/web stream; do not borrow NSFA’s ID. Put the real public ID in the Builds scope and enable only after production release authorization. One direct tag is installed; do not add GTM alongside it. Disable enhanced auto-events that could duplicate explicit events or send uncontrolled URL context. Basic consent keeps the tag unloaded until opt-in; rejection/change sets the disable flag, denies storage and clears matching local GA cookies where permitted. Browser restrictions and parent-domain cookies require testing on the final host.

Events: page_view (canonical origin/path, no query/referrer), affiliate_click (provider, content_id, placement, destination_id), newsletter_active, newsletter_pending. Emitted events are proposals, not evidence received by Google. Register event-scoped dimensions for the four context fields; only a meaningful new active subscription should be considered a key event. Existing repeats, clicks and pending states are separate. Verify no duplicate page views, no personal data, consent preference changes, preview exclusion, browser requests and then intended-property Realtime/DebugView.

## Ads and CMP

Manual units only, no Auto ads. Put real placement and slot IDs in `src/data/ad-units.json`. `PUBLIC_ADSENSE_CLIENT` and optional `PUBLIC_ADSENSE_VERIFICATION` support account review independently of `PUBLIC_ADS_ENABLED`. `ADS_TXT_ENTRIES` must contain exact owner-authorized seller lines; blank generates a comment-only plain-text root file. A 200 plain-text response is a technical check, not seller approval.

Ads are off on localhost/previews. The generic CMP script hook can load before ads, but this is not a completed vendor-specific consent integration. Its conservative TCF hook only starts ads after an affirmative completed EEA/UK/Swiss TCF signal including Google vendor and relevant purposes; it does not yet enable non-TCF regional serving. The selected certified vendor must be integrated for async readiness, revocation and applicable regional rules before activation. Our optional analytics dialog is **not** an advertising CMP. Do not present it as certified or legally sufficient. Check [Google requirements](https://support.google.com/adsense/answer/13554116) again before launch. No live ad clicks for testing.

## Search Console and canonical production

Use the exact owner-selected production origin; decide www/apex and aliases only after domain selection. Get real DNS verification for an owned Domain property, or meta/file verification for an appropriate URL-prefix property. `PUBLIC_SEARCH_CONSOLE_TOKEN` emits the exact supplied token; a supplied HTML verification file may be added unchanged to public/. Never invent one. Inspect a guide, profile, missing route, function, robots, sitemap, ads.txt and verification file after deployment. Submit/inspect only after release authorization; verification, sitemap submission, discovery, indexation and impressions are distinct.
