import { z } from 'astro/zod';
import affiliateData from '../data/affiliates/links.json';
import sponsorData from '../data/sponsors/cards.json';
import adData from '../data/ad-units.json';
const affiliate=z.object({id:z.string(),provider:z.string(),officialUrl:z.url(),trackingUrl:z.url().nullable(),enabled:z.boolean(),suppliedAt:z.string().nullable(),verifiedAt:z.string().nullable(),placements:z.array(z.string())}).refine(v=>!v.enabled||Boolean(v.trackingUrl&&v.verifiedAt),'Enabled affiliate requires real verified tracking URL');
export const affiliates=z.array(affiliate).parse(affiliateData);
export const sponsors=z.array(z.object({id:z.string(),name:z.string(),label:z.literal('Paid sponsorship'),url:z.url(),text:z.string(),enabled:z.boolean(),starts:z.string(),ends:z.string()})).parse(sponsorData);
const adSchema=z.object({placement:z.string(),slot:z.string().regex(/^\d+$/)});
export const adUnits=z.array(adSchema).parse(adData);
