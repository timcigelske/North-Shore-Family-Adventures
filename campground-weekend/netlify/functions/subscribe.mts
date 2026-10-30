import { handleSubscribe } from '../../src/lib/newsletter.ts';
declare const Netlify:{env:{get:(key:string)=>string|undefined}};
export default async function handler(request:Request,context:{deploy:{context:string}}){
 const keys=['NEWSLETTER_ENABLED','NEWSLETTER_ORIGIN','BEEHIIV_API_KEY','BEEHIIV_PUBLICATION_ID','BEEHIIV_FIELD_PAGE','BEEHIIV_FIELD_PLACEMENT','BEEHIIV_FIELD_INTERESTS','NEWSLETTER_CONFIRMATION_URL'];
 const env:Record<string,string|undefined>={};for(const key of keys)env[key]=Netlify.env.get(key);
 return handleSubscribe(request,env,context.deploy.context);
}
export const config={path:'/api/subscribe',rateLimit:{action:'rate_limit',aggregateBy:['ip','domain'],windowSize:60,windowLimit:5}};
