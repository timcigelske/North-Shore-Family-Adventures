# October 27, 2026 launch update

The owner explicitly requested production publication after reviewing the draft. This supersedes the earlier preview-only boundary. Newsletter, analytics and advertising remain disabled independently.

## Creative

Two original banners generated using the built-in OpenAI image generation tool. These are fictional editorial scenes, labeled on the page; no claim that they depict a real Wisconsin park or campsite. WebP assets live in public/images/camp-sunset.webp, camp-sunset-900.webp and camp-morning.webp.

Prompts: cinematic 3:1 Wisconsin-inspired pine lakeshore at golden hour, ochre tent on the right, open lake left for editorial type, low rolling wooded hills, no text or brands; and a complementary misty forest-lake morning scene with ochre tent on the left, no named location, no text or brands.

## REI affiliate links

Verified in the signed-in North Shore Family Adventures Impact account, My Brands list (13 joined brands), REI program 17195. Generated with Impact's link builder on October 27, 2026:

- Tents: https://rei.pxf.io/k4EWBz → https://www.rei.com/c/tents
- Sleeping gear: https://rei.pxf.io/GbJgzV → https://www.rei.com/c/sleeping-gear
- Camp kitchen: https://rei.pxf.io/VO9NqA → https://www.rei.com/c/camp-kitchen

Retail category destinations were verified against REI's website. These are shopping starting points, not hands-on product tests. No price, stock, discount, commission rate or conversion claim is made. Disclosure precedes links on the home page and planner; rel=sponsored marks them. Ordinary campground booking links remain unchanged. No Impact pixel or script is loaded on page view. No new affiliate agreement was accepted.

## Map

Leaflet with OpenStreetMap tiles, explicit load action, keyboard-accessible markers, profile and operator links in popups. Filters update pins and fit the view to matching locations. Fit-matching-places control restores the view after panning. Empty results and blocked tiles retain the list. Approximate park coordinates are distinguished from campsite and entrance directions.

## Git continuous deployment

Existing repository timcigelske/North-Shore-Family-Adventures linked to Netlify campground-weekend. Production branch codex/campground-weekend; base campground-weekend, publish campground-weekend/dist, functions campground-weekend/netlify/functions. Deploy Previews enabled for PRs targeting production or enabled branch-deploy branches. The existing draft PR #1 targets the repository's original default branch; future preview PRs should target codex/campground-weekend. No default-branch merge or change to Squarespace. .netlify remains ignored.

## Local validation

Astro check: zero errors, warnings or hints. All 12 existing unit tests pass. Production build: 51 HTML pages, 47 indexable sitemap URLs, private planning pages excluded, 1,649 internal links/assets resolved. Desktop/mobile browser checks: 12 page/viewport combinations, zero detected WCAG A/AA violations, overflow, JavaScript errors or newsletter/analytics/ad requests. Map checks: 23 accessible pins, popup links, filter counts 4/0/23, fit control and hide/reopen pass; OpenStreetMap tiles loaded. Three approved REI links use rel=sponsored and follow the disclosure.
