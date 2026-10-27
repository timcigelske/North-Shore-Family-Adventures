# Integration status

October 27, 2026. Source implementation is separate from account configuration and external verification.

| Integration | Implemented | Configured | Externally verified | Remaining step |
| --- | --- | --- | --- | --- |
| Astro/static content | Yes: 23 profiles, 7 guides, 51 pages | Local source and pinned runtime | Local and deployed build/schema/link/browser checks | Production requires separate authorization |
| Owner Git repository | Isolated folder/branch and draft PR created | timcigelske NSFA repo | Source commit and all 156 isolated files read back byte-for-byte | Review PR #1; no merge or production release authorized |
| Netlify project | New project created | Owner Code Explorers team | Ready deploy-preview, published_at null; unprotected shareable access checked | Upload-triggered deploy-preview is ready; Git CD still requires browser GitHub sign-in/linking |
| Directory/map | Search/filter/reset; lazy Leaflet/OSM; list fallback | Verified park or DNR entrance coordinates | 23 location sources; deployed map/list/failure checks | Monitor tile usage; no routing or live availability |
| Saved/checklist/budget | Yes, browser persistence and print | No accounts required | Unit plus local and deployed browser checks | Complete |
| Beehiiv | Server-side adapter and form UI, safe state messages | Disabled; no publication/key/custom fields selected | Mock provider tests; live preview returns disabled, with rate-limit 429 verified | Owner selects publication, creates fields, configures scoped secrets; permitted record-level test verifies stored attribution and no overwrite |
| Contact/corrections/advertising inquiry | Static Netlify form + URL-encoded fetch + error state | Project form detection enabled; notification email missing | Form detected; synthetic POST 200 and last-submission date changed; accepted count stayed 0 | Review spam view and accepted stored record; configure/verify owner notification |
| Affiliates | Registry and reusable link component | All disabled, no tracking URLs | Program entry pages checked; no owner approval evidence | Owner-approved account, permitted domain/channel and exact tracking URLs; destination check; near-link disclosure |
| AdSense | Manual units, independent verification metadata, root ads.txt generator | No client/unit/seller IDs; requests off | Deployed 200 text/plain comment-only ads.txt; no account approval | Supply real IDs/seller lines, account review and certified CMP integration; verify actual serving without clicking |
| CMP | External script and conservative TCF-gated hook | No certified CMP selected | No vendor integration verified | Select certified CMP, implement vendor-specific ready/revocation and regional signals, test before enabling ads |
| GA4 | One direct tag; basic opt-in, changeable preference, safe params | Disabled; no measurement ID | Preview exclusion and local consent UI; no intended-property data | Owner selects dedicated property, configures dimensions, tests with permitted debug setup and Realtime/DebugView |
| Search Console | Meta token config, root verification file support, canonical/sitemap/robots | No actual property or token | Deployed canonicals/noindex/sitemap and true 404 checked | Select production domain, get real verification, DNS only with separate authorization; submit sitemap after release |
| Images | Licensed photos/accurately labeled regional images; responsive sizes | Real attribution in each record | Commons license metadata checked | Original on-site reporting/photos desirable; no firsthand visit claim |
| Production | Explicit launch gate | OFF | No domain, DNS or public production launch | Separate owner authorization and readiness checklist |

This matrix does not claim affiliate acceptance, subscriptions, ad approval, notifications, GA4 receipts, search indexation, traffic or revenue.
