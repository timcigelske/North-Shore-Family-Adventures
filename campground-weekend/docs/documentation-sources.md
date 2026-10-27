# Official implementation references

Consulted October 27, 2026. Implementation follows the pinned versions in package.json and pnpm-lock.yaml, rather than assuming older framework behavior.

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/): static validated content records and Markdown rendering.
- [Astro on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/): standard static build; no SSR adapter required for this version.
- [Netlify Functions API](https://docs.netlify.com/build/functions/api/) and [configuration](https://docs.netlify.com/build/functions/configuration/): modern Request/Response handler and platform rate limiting.
- [Netlify Forms setup](https://docs.netlify.com/manage/forms/setup/): built static form definition and explicit detection/notification verification.
- [Beehiiv create subscription](https://developers.beehiiv.com/api-reference/subscriptions/create/) and [lookup by email](https://developers.beehiiv.com/api-reference/subscriptions/get-by-email): supported fields and truthful provider states.
- [OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/): visible attribution, valid referrer, lazy map loading, no bulk prefetch/offline cache bypass.
- [GA4 web setup](https://developers.google.com/analytics/devguides/collection/ga4/web): direct tag, separate property setup and received-event verification.
- [Search Console ownership](https://support.google.com/webmasters/answer/9008080): real verification method/token required.
- [AdSense ads.txt](https://support.google.com/adsense/answer/12171612) and [certified CMP requirements](https://support.google.com/adsense/answer/13554116): supplied seller entries, separate review/serving and consent integration.

The bundled Netlify deployment and function skill guidance was also read. Tool installation and platform approval are not evidence that any integration is active.
