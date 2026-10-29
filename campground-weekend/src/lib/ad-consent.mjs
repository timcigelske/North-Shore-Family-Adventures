// Google Privacy & Messaging. Ad requests remain separately gated by production configuration.
export function mayRequestAds(data) {
 if(!data||data.cmpStatus==='error')return false;
 if(data.gdprApplies===false)return true;
 if(data.gdprApplies!==true||!['tcloaded','useractioncomplete'].includes(data.eventStatus))return false;
 return [1,3,4].every(id=>data.purpose?.consents?.[id]===true)&&data.vendor?.consents?.[755]===true;
}
export function initializeAdConsent({window:w,document:d,production,cmpUrl,adClient}) {
 if(!production||!cmpUrl)return;
 const status=d.querySelector('[data-ad-consent-status]');
 const button=d.querySelector('[data-ad-consent-open]');
 let loaded=false,allowed=false;
 const reopening=w.sessionStorage.getItem('cw:reopen-ad-consent')==='1';
 const fc=w.googlefc=w.googlefc||{};
 fc.callbackQueue=fc.callbackQueue||[];
 const say=text=>{if(status)status.textContent=text;};
 function stop(){allowed=false;const queue=w.adsbygoogle=w.adsbygoogle||[];queue.pauseAdRequests=1;d.querySelectorAll('.adsbygoogle').forEach(el=>el.closest('.ad')?.setAttribute('hidden','')); }
 function start(){
  if(!adClient||loaded)return;
  loaded=true;const queue=w.adsbygoogle=w.adsbygoogle||[];queue.pauseAdRequests=0;
  const tag=d.createElement('script');tag.async=true;tag.crossOrigin='anonymous';
  tag.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(adClient);
  tag.onload=()=>{if(!allowed)return;d.querySelectorAll('.adsbygoogle').forEach(()=>queue.push({}));};
  d.head.append(tag);
 }
 function listen(){if(typeof w.__tcfapi!=='function'){say('Advertising consent is unavailable. Ads remain off.');return;}
  w.__tcfapi('addEventListener',2,(data,success)=>{
   if(!success){stop();return;}
   const next=(!reopening||data.eventStatus==='useractioncomplete')&&mayRequestAds(data);const revoked=allowed&&!next;allowed=next;
   if(next){say(adClient?'Advertising preferences saved.':'Advertising preferences saved. Ads are not yet enabled.');start();}
   else{stop();say('Ads remain off until advertising consent is available.');}
   // Discard previously loaded ad frames and scripts after withdrawal.
   if(revoked&&loaded)w.location.reload();
  });
 }
 fc.callbackQueue.push({CONSENT_API_READY:()=>{
  if(button)button.hidden=false;
  listen();
 }});
 button?.addEventListener('click',()=>{
  stop();
  if(loaded){w.sessionStorage.setItem('cw:reopen-ad-consent','1');w.location.reload();return;}
  fc.callbackQueue.push(()=>fc.showRevocationMessage());
 });
 fc.callbackQueue.push({CONSENT_API_READY:()=>{
  if(w.sessionStorage.getItem('cw:reopen-ad-consent')==='1'){
   w.sessionStorage.removeItem('cw:reopen-ad-consent');fc.callbackQueue.push(()=>fc.showRevocationMessage());
  }
 }});
 const script=d.createElement('script');script.async=true;script.src=cmpUrl;
 script.onerror=()=>{stop();say('Advertising privacy settings could not load. Ads remain off.');};
 d.head.append(script);
}
