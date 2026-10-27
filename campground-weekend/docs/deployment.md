# Git-connected launch update

Production publication is now explicitly authorized, superseding the initial preview-only boundary below. GitHub repo timcigelske/North-Shore-Family-Adventures is connected to Netlify campground-weekend, production branch codex/campground-weekend, base campground-weekend, publish campground-weekend/dist, functions campground-weekend/netlify/functions. PUBLIC_LAUNCH_ENABLED=true and PUBLIC_SITE_ORIGIN=https://campground-weekend.netlify.app apply only in production. Deploy Previews remain nonindexed and their launch switch is false; PR #1 produced a ready automatic preview at https://deploy-preview-1--campground-weekend.netlify.app/. .netlify is ignored. Newsletter, analytics and ads remain disabled. This update is released by a Git push, not a separate manual production upload.

The first connection build correctly failed at the production guard while launch was disabled; it did not publish. The initial upload preview record below is historical. Production deployment 6ae106241b75668a3954482f was verified ready and published, with the public production URL returning the new banners, affiliate links and indexable editorial HTML. See launch-update.md and production-http-results.json.

# Verified Netlify preview

- Preview: https://6ae10182fc23c0a937750aab--campground-weekend.netlify.app
- Deployment ID: 6ae10182fc23c0a937750aab
- Build ID: 6ae10182fc23c0a937750aa9
- Owner project: campground-weekend, Code Explorers / timcigelske
- Source application commit: 23f2ec050e94a18a7df005e21e0afa9bb4edc7a0
- Source review: https://github.com/timcigelske/North-Shore-Family-Adventures/pull/1
- Actual deployment context: deploy-preview. State: ready. published_at: null.
- Access: unprotected shareable URL. No password or team-login requirement. Noindex is not privacy.

## How it was deployed

The connected Netlify helper defaults to a production publication. After the owner explicitly approved nonproduction deployment, the official builds API was used with draft=true. Current Netlify API documentation states that this uses deploy-preview context and is never published. The source ZIP was uploaded to the owner-controlled project using a temporary scoped deployment authorization; no credential is stored in this repository. Netlify reported a successful 23-second Astro build, one Node 24 subscription function, configured platform rate-limit metadata, and no secret-scan matches across 156 source files.

This is an upload-triggered draft preview, **not a Git-triggered PR Deploy Preview**. Editable Git source and the draft PR are available, but automatic continuous deployment still needs Netlify’s GitHub browser authentication and repository linking. Browser automation became unavailable during the build. The default branch and Squarespace site were not changed.

## Verified responses

Homepage, guide and profile: 200, real initial HTML, one H1, canonical on the actual preview origin and X-Robots-Tag noindex/nofollow. Unknown article and unsupplied verification file: genuine 404. ads.txt: 200 text/plain with no invented seller entries. sitemap.xml: 200 and empty because preview pages are nonindexed. robots.txt permits fetching so crawlers can see noindex. Subscription function: GET 405; valid preview POST 503 with disabled/no subscription message.

See deployed-results.json and deployed-browser-results.json. Twelve live page/viewport combinations at 390 and 1440 px passed the same accessibility/overflow/runtime/behavior checks; there were no tracking requests. These are laboratory checks, not field traffic or conversion evidence.

## Form and rate-limit limits

Netlify registered campground-inquiry with its actual fields and honeypot. One synthetic .invalid-address QA submission returned HTTP 200 and advanced last_submission_at, but accepted submission_count remained zero. It may have been classified as spam; spam-record contents were not accessible through the available connector and no stored accepted record is claimed. Owner email notifications remain unconfigured and unverified.

The first six invalid subscription requests returned 400. After Netlify’s documented propagation delay, the next request returned 429. Distributed rate-limit metadata and actual preview enforcement are verified; see rate-limit-results.json. The newsletter stays disabled until owner account configuration and a permitted real provider test verify the intended destination and attribution.
