import { getCollection } from 'astro:content';
export async function campgrounds(){return (await getCollection('campgrounds')).filter(c=>c.data.status==='published').sort((a,b)=>a.data.name.localeCompare(b.data.name));}
export async function guides(){return (await getCollection('guides')).filter(c=>c.data.status==='published');}
export const fact=(v:boolean|null)=>v===true?'Verified available':v===false?'Not available':'Not verified';
