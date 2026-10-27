// This module is imported only by build-time Astro templates, never by client.ts.
const env = {...process.env, ...import.meta.env};
const production = env.CONTEXT === 'production' && env.PUBLIC_LAUNCH_ENABLED === 'true';
const origin = env.PUBLIC_SITE_ORIGIN || env.DEPLOY_PRIME_URL || 'http://localhost:4321';
export const site = {
 name: env.PUBLIC_SITE_NAME || 'Campground Weekend', origin,
 publisher: env.PUBLIC_PUBLISHER_NAME || 'North Shore Family Adventures', publisherUrl: env.PUBLIC_PUBLISHER_URL || 'https://www.northshorefamilyadventures.com',
 logoUrl: env.PUBLIC_LOGO_URL || '', logoMark: env.PUBLIC_LOGO_MARK || '△',
 tagline: 'An independent publication from '+(env.PUBLIC_PUBLISHER_NAME || 'North Shore Family Adventures'),
 author: 'Campground Weekend editorial desk', contact: env.PUBLIC_CONTACT_EMAIL || '',
 production, newsletter: production && env.PUBLIC_NEWSLETTER_ENABLED === 'true',
 analytics: production && env.PUBLIC_ANALYTICS_ENABLED === 'true' && /^G-[A-Z0-9]+$/.test(env.PUBLIC_GA4_MEASUREMENT_ID || ''),
 ga4: env.PUBLIC_GA4_MEASUREMENT_ID || '', ads: production && env.PUBLIC_ADS_ENABLED === 'true',
 adClient: env.PUBLIC_ADSENSE_CLIENT || '', verification: production ? env.PUBLIC_SEARCH_CONSOLE_TOKEN || '' : '',
 adVerification: production && env.PUBLIC_ADSENSE_VERIFICATION === 'true',
 cmpUrl: env.PUBLIC_CMP_SCRIPT_URL || '',
};
