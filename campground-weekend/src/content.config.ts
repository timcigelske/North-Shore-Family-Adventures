import { defineCollection } from 'astro:content';
import {z} from 'astro/zod';
import { glob } from 'astro/loaders';
const source = z.object({url:z.url(), title:z.string(), accessed:z.string(), claims:z.array(z.string())});
const dates = {created:z.string(),published:z.string().nullable(),modified:z.string(),reviewed:z.string()};
const image=z.object({src:z.string(),file:z.url(),author:z.string(),license:z.string(),licenseUrl:z.url(),caption:z.string(),modified:z.string(),width:z.number(),height:z.number()});
const campground=defineCollection({loader:glob({pattern:'**/*.json',base:'./src/content/campgrounds'}),schema:z.object({
 name:z.string(),slug:z.string(),status:z.enum(['published','draft']),state:z.string(),country:z.string(),region:z.string(),county:z.string().nullable(),aliases:z.array(z.string()),description:z.string(),bestFor:z.string(),tradeoff:z.string(),
 types:z.object({tent:z.boolean().nullable(),rv:z.boolean().nullable(),cabin:z.boolean().nullable(),glamping:z.boolean().nullable()}),
 amenities:z.object({showers:z.boolean().nullable(),electric:z.boolean().nullable(),swimming:z.boolean().nullable(),playground:z.boolean().nullable(),pool:z.boolean().nullable(),wifi:z.boolean().nullable()}),
 petPolicy:z.string().nullable(),season:z.string(),accommodationNote:z.string(),bookingUrl:z.url(),officialUrl:z.url(),
 coordinates:z.object({lat:z.number().min(-90).max(90),lon:z.number().min(-180).max(180),basis:z.string(),source:z.url()}).nullable(),image:image.nullable(),sources:z.array(source).min(1),...dates,
 sections:z.array(z.object({heading:z.string(),text:z.string()})), nearby:z.array(z.object({name:z.string(),url:z.url(),note:z.string()})),related:z.array(z.string()),
})});
const guides=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/guides'}),schema:z.object({title:z.string(),description:z.string(),status:z.enum(['published','draft']),kind:z.enum(['guide','rv']),campgrounds:z.array(z.string()),sources:z.array(source),...dates})});
export const collections={campgrounds:campground,guides};
