type Env=Record<string,string|undefined>;
const placements=['footer','guide-inline','profile-footer','newsletter-page','homepage'];
const interests=['wisconsin','cabins','rv'];
const respond=(status:number,body:Record<string,string>)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
const generic='Please check your inbox. If you have already subscribed, your existing preferences remain unchanged. For a previous unsubscribe, use the publication’s hosted signup to opt in again.';
function clean(v:unknown){return typeof v==='string'?v.replace(/[^a-zA-Z0-9 _./-]/g,'').slice(0,100):'';}
export async function handleSubscribe(request:Request,env:Env,context='deploy-preview',fetcher:typeof fetch=fetch){
 if(request.method!=='POST')return respond(405,{message:'Use POST.'});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return respond(415,{message:'Use JSON.'});
 if(Number(request.headers.get('content-length')||0)>4096)return respond(413,{message:'Request too large.'});
 const reader=request.body?.getReader();let size=0;const chunks:Uint8Array[]=[];
 if(!reader)return respond(400,{message:'Check the signup details.'});
 try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>4096){await reader.cancel();return respond(413,{message:'Request too large.'});}chunks.push(value);}}catch{return respond(400,{message:'Check the signup details.'});}
 let body:any;try{const all=new Uint8Array(size);let offset=0;for(const chunk of chunks){all.set(chunk,offset);offset+=chunk.length;}body=JSON.parse(new TextDecoder().decode(all));}catch{return respond(400,{message:'Check the signup details.'});}
 if(!body||typeof body.email!=='string'||body.email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)||body.intent!==true||body.website)return respond(400,{message:'Enter a valid email and confirm subscription intent.'});
 if(!placements.includes(body.placement)||typeof body.path!=='string'||!/^\/[a-z0-9/-]*$/.test(body.path)||body.path.length>200||!Array.isArray(body.interests)||body.interests.some((v:unknown)=>!interests.includes(String(v))))return respond(400,{message:'Check the signup details.'});
 if(context!=='production'||env.NEWSLETTER_ENABLED!=='true'||!env.BEEHIIV_API_KEY||!/^pub_[0-9a-f-]+$/i.test(env.BEEHIIV_PUBLICATION_ID||'')||!env.BEEHIIV_FIELD_PAGE||!env.BEEHIIV_FIELD_PLACEMENT||!env.NEWSLETTER_ORIGIN)return respond(503,{state:'disabled',message:'Newsletter signup is not open yet. No subscription was made.'});
 if(request.headers.get('origin')!==env.NEWSLETTER_ORIGIN||new URL(request.url).origin!==env.NEWSLETTER_ORIGIN)return respond(403,{message:'Please use the signup form on our website.'});
 const base='https://api.beehiiv.com/v2/publications/'+env.BEEHIIV_PUBLICATION_ID+'/subscriptions';
 const headers={Authorization:'Bearer '+env.BEEHIIV_API_KEY,'Content-Type':'application/json'};
 const signal=AbortSignal.timeout(8000);
 try{
  // Read before create: no writes for any existing state, preserving original acquisition.
  const existing=await fetcher(base+'/by_email/'+encodeURIComponent(body.email.trim().toLowerCase()),{headers,signal});
  if(existing.ok){await existing.json();return respond(200,{state:'existing',message:generic});}
  if(existing.status!==404)return respond(502,{message:'Signup is temporarily unavailable. Please try again later.'});
  const fields=[{name:env.BEEHIIV_FIELD_PAGE,value:body.path},{name:env.BEEHIIV_FIELD_PLACEMENT,value:body.placement}];
  if(env.BEEHIIV_FIELD_INTERESTS&&body.interests.length)fields.push({name:env.BEEHIIV_FIELD_INTERESTS,value:body.interests.join(',')});
  const payload:Record<string,unknown>={email:body.email.trim().toLowerCase(),reactivate_existing:false,custom_fields:fields};
  // Respect provider defaults: do not override confirmation or welcome behavior.
  for(const key of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content']){const value=clean(body.utm?.[key]);if(value)payload[key]=value;}
  if(!payload.utm_source)payload.utm_source='campground-weekend';
  if(!payload.utm_medium)payload.utm_medium='website';
  try{const u=new URL(body.referring);if(u.protocol==='https:'||u.protocol==='http:')payload.referring_site=u.origin;}catch{}
  const response=await fetcher(base,{method:'POST',headers,body:JSON.stringify(payload),signal});
  if(!response.ok)return respond(502,{message:'Signup is temporarily unavailable. Please try again later.'});
  const result=await response.json() as any,state=result?.data?.status;
  if(state==='active')return respond(200,{state:'active',message:'Your subscription is active. Welcome to the weekend list.'});
  if(state==='validating'||state==='pending')return respond(202,{state:'pending',message:'Your request was accepted and is awaiting confirmation or validation. Check your inbox for any required confirmation.'});
  return respond(200,{state:'accepted',message:generic});
 }catch{return respond(504,{message:'Signup could not be confirmed. Please check your inbox before retrying.'});}
}
