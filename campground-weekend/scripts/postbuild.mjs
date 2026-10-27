import {readdir,readFile,writeFile} from 'node:fs/promises';
const production=process.env.CONTEXT==='production'&&process.env.PUBLIC_LAUNCH_ENABLED==='true';
const origin=process.env.PUBLIC_SITE_ORIGIN||process.env.DEPLOY_PRIME_URL||'http://localhost:4321';
if(production&&(!process.env.PUBLIC_SITE_ORIGIN||!origin.startsWith('https://')))throw Error('Launch requires an explicit HTTPS production origin.');
const base='dist';
async function htmls(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+e.name;if(e.isDirectory())out.push(...await htmls(path));else if(e.name.endsWith('.html'))out.push(path);}return out;}
const pages=await htmls(base),urls=[];
for(const path of pages){const html=await readFile(path,'utf8');if(!/name="robots" content="noindex/.test(html)){const route=path.slice(base.length).replace(/index\.html$/,'');const match=html.match(/Substantially modified (\d{4}-\d{2}-\d{2})/i);urls.push(`<url><loc>${new URL(route,origin).href}</loc>${match?`<lastmod>${match[1]}</lastmod>`:''}</url>`);}}
await writeFile(base+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.join('')+'</urlset>');
// Preview URLs stay crawlable so crawlers can see noindex. Do not confuse noindex with privacy.
await writeFile(base+'/robots.txt',`User-agent: *\nAllow: /\n${production?'Sitemap: '+origin+'/sitemap.xml\n':'# Preview: all HTML and response headers carry noindex.\n'}`);
await writeFile(base+'/ads.txt',production&&process.env.ADS_TXT_ENTRIES?process.env.ADS_TXT_ENTRIES.trim()+'\n':'# No authorized advertising sellers configured.\n');
await writeFile(base+'/_headers',`${!production?'/*\n  X-Robots-Tag: noindex, nofollow\n':''}/ads.txt\n  Content-Type: text/plain; charset=utf-8\n/sitemap.xml\n  Content-Type: application/xml; charset=utf-8\n/robots.txt\n  Content-Type: text/plain; charset=utf-8\n`);
console.log(`Built ${pages.length} HTML files; ${urls.length} indexable sitemap URLs; live integrations ${production?'subject to individual switches':'disabled'}.`);
