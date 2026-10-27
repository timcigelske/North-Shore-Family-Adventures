# Authorized launch scope

On October 27 the owner explicitly requested “make it live.” Production is authorized on campground-weekend.netlify.app. No domain purchase or DNS changes. The owner-approved REI affiliate program is active through generated Impact links and near-link disclosure. Other monetization, analytics and newsletter integrations remain independently disabled; completing their account setup is not a prerequisite to this limited launch. Local production/browser checks pass, and Git CD is connected. See launch-update.md for current evidence and remaining operational limits.

The original checklist below is retained for later integration activation. It no longer represents a requirement to enable every optional service before publishing.

# Production release checklist

Production launch requires a separate explicit instruction.

- [ ] Confirm final brand/domain suitability and publisher/contact identity.
- [ ] Select canonical HTTPS domain, www/apex policy and authorized host redirects. Do not purchase or change DNS by default.
- [ ] Complete Git connection, deploy-preview branch workflow and owner review of the tested source.
- [ ] Verify actual preview access status. Nonindexed URLs remain shareable without access protection.
- [ ] Review 23 initial profiles, sources, licensed image captions and dates; add original reporting/photos when available.
- [ ] Confirm newsletter destination and reader expectation, supported fields, scoped credentials, opt-in behavior, attribution persistence and duplicate concurrency behavior with designated test data.
- [ ] Enable and verify contact form detection, stored submission and notifications separately; confirm privacy contact and retention procedures.
- [ ] Confirm GA4 property/web stream; dimensions, safe page/event params, consent changes and intended-property receipt.
- [ ] Verify affiliate acceptance, exact destination links, channel permissions and near-link disclosure before enabling.
- [ ] Configure real ad client/unit/seller IDs, complete account review and actual certified-CMP vendor integration. Confirm revocation/regional behavior. No duplicate Auto ads/manual system.
- [ ] Review privacy/terms against the actual integrations and audience; an analytics dialog is not an advertising CMP.
- [ ] Supply exact Search Console method/token and preserve across deploys; submit canonical sitemap only when authorized.
- [ ] On the final host: check direct URLs, initial HTML, true 404, canonical host, robots, noindex removal only where intended, sitemap, plain-text ads.txt, functions and verification.
- [ ] Repeat representative mobile/desktop, keyboard, print, accessibility and lab performance checks; label absent field data accurately.
- [ ] Explicitly authorize release and set PUBLIC_LAUNCH_ENABLED=true in the production Builds context. This does not independently turn any integration on.

No recurring monitors or paid upgrades are part of this build.
