# Collection expansion

The current publication has 50 researched campgrounds (42 public, 8 private), with 48 sourced approximate map locations. See [expanded collection notes](docs/expanded-collection.md). The earlier launch records below describe prior versions.

# Photography update

The live banners now use real Unsplash camping photographs with photographer credits. See [photo update](docs/unsplash-photo-update.md).

# Current release

Production launch authorized October 27, 2026. See [launch-update.md](docs/launch-update.md) for REI affiliate links, original banners, interactive Leaflet maps and connected Git deployment settings. The earlier preview-only notes below document the initial build. Newsletter, analytics and ads remain disabled.

# Campground Weekend

An independent campground publication from North Shore Family Adventures. Wisconsin is the editorial starting point; the content model supports additional states and countries. Working brand only; no trademark clearance or domain purchase is implied.

## Current delivery

Verified nonproduction preview: [Campground Weekend](https://6ae10182fc23c0a937750aab--campground-weekend.netlify.app). Shareable and nonindexed, without password protection. [Draft source PR](https://github.com/timcigelske/North-Shore-Family-Adventures/pull/1). See `docs/deployment.md` for actual deployment and remaining Git-link status.

23 researched Wisconsin profiles, six planning/comparison guides and one researched Wisconsin RV-rental guide; static Astro article HTML; directory/search/filters, lazy map, browser favorites, editable packing list, party/person cost estimator, print stylesheet, seven policy/about/advertising pages plus contact, author and image credits. All changing facts are attributed to official sources; no personal stay, gear testing, live availability or affiliate approval is claimed. See `docs/integration-status.md` for external boundaries and `docs/validation.md` for checks actually run.

The source belongs in `campground-weekend/` on the separate `codex/campground-weekend` branch of the owner's existing `timcigelske/North-Shore-Family-Adventures` repository. Existing repository files and the live Squarespace site are preserved. The current default branch is `claude/analyze-food-group-questions-PN9X0`; do not rename it as part of this build.

## Local editing

Node **24.19.0**, pnpm **11.25.0**. Astro 7.4.2 uses `astro/zod`; its checker currently requires TypeScript 6.0.3. The lockfile pins dependencies.

```sh
cd campground-weekend
corepack enable
pnpm install --frozen-lockfile
ASTRO_TELEMETRY_DISABLED=1 pnpm dev
pnpm check
pnpm test
pnpm build
node scripts/audit.mjs
node scripts/review-due.mjs
```

`pnpm build` generates `dist/` plus robots.txt, sitemap.xml, headers and ads.txt. The standard Astro static build does not need the Netlify SSR adapter. Netlify Functions source remains outside `dist/`. A local Astro server does not emulate Netlify Forms or Functions; use the unit-test adapter or a permitted Netlify integration test.

### Add a campground

1. Copy a JSON record under `src/content/campgrounds/` to a new durable slug. Keep status `draft` while evidence is insufficient. Drafts never enter public routes, lists or sitemap.
2. Fill the source ledger, review date, accommodation notes, real tradeoffs and unique editorial interpretation. Use null for unknown amenities, not false. Verify coordinates; distinguish an approximate park location from an entrance. Use one canonical profile per place.
3. Supply a real licensed photograph and attribution, or label a regional landscape accurately. Never reuse another campground's image as if it were the site. Set width/height to the real dimensions; prepare the matching `-600.webp` responsive version.
4. Run the schema/type/build checks and inspect the preview. Existing templates automatically supply the profile, directory, map and save control; no duplicate application logic is needed.

### Publish a guide

Add Markdown in `src/content/guides/`, with the validated frontmatter used by existing guides. Set kind `guide` or `rv`, add real sources and related campground IDs. Verify search intent before adding a specialist page. Set published only when the content is sufficient. No unresearched gear, city inventory or nationwide directory shells are generated.

### Correct a fact or replace an image

Edit the record and source evidence together. Update `reviewed` only after actually rechecking facts, `modified` for substantive editorial changes and `published` only for first publication. A deploy is not an editorial review. Image records include creator, license URL, original file page, caption and transformation note; the public credit page is generated from those records. Preserve all license obligations when changing files.

### Change a paid link or sponsor

Use `src/data/affiliates/links.json`, `src/data/sponsors/cards.json` and `src/data/ad-units.json`. They are empty initially. Supply only account-approved exact URLs/IDs, enable the appropriate placement, record dates and disclose the relationship near the first recommendation. `PartnerLink.astro` retains the official URL when a partner is disabled. `Sponsor.astro` labels paid sponsorship and observes start/end dates. No redirect/cloaking layer is present.

## Netlify workflow

Owner team: **Code Explorers**, slug `timcigelske`. New preview project: **campground-weekend**, site ID `a63d90a2-50fa-43a9-9471-15c66bc0bab2`. `.netlify/` and `.env*` are ignored; do not commit state.json or credentials.

The owner approved nonproduction deployment and the tested source was uploaded using the official draft=true build API. Connect the existing NSFA repository for automatic Git-triggered previews. Use base/package directory `campground-weekend`, command `pnpm build`, publish `campground-weekend/dist` relative to repository root (or `dist` relative to the base), Functions `campground-weekend/netlify/functions` (or `netlify/functions` relative to base). The inner `netlify.toml` records the actual relative paths.

Production branch should remain the existing repository default branch until the owner explicitly chooses a release policy. The campground folder is absent from that branch before merge, so a production build cannot succeed from it. Do not merge or choose the feature branch as a production branch to get a preview. Enable PR Deploy Previews for the feature branch's draft PR. Verify the actual resulting context and response headers.

Keep `PUBLIC_LAUNCH_ENABLED=false` and all integration switches off for previews. Netlify deploy context alone never constitutes production-release authorization. A manual draft deploy is a useful temporary review URL but is not Git-based continuous deployment; report those separately. No `--prod` deployment is authorized in this handoff.

The new project currently has no password or team-login protection. A preview URL would be shareable, not private. `noindex` does not restrict access. Do not change security settings without a specific reason or silently treat a preview as confidential.

Failures: correct or revert source and redeploy. A failed build leaves the prior published deployment in place. Never disable secret scanning to pass a leaked credential.

## Activation and release

See `.env.example`, `docs/integrations.md` and `docs/production-readiness.md`. Build-scoped public IDs differ from Functions-scoped credentials. Account approval, installed code, accepted requests and externally verified outcomes are separate states. No purchases, DNS changes, paid upgrades, account creation, social posting or production launch have been performed.

Usage: static hosting/builds, Functions calls and form submissions consume the owner's Netlify allowance. Exact limits and overage depend on the existing plan; monitor usage before enabling services. OpenStreetMap tiles are best-effort, not a purchased capacity guarantee. No background jobs or recurring monitors are installed.
