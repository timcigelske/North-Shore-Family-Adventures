// Google Privacy & Messaging. Ad requests remain separately gated by production configuration.
export function mayRequestAds(data) {
 if(!data||data.cmpStatus==='error')return false;
 if(data.gdprApplies===false)return true;
 if(data.gdprApplies!==true||!['tcloaded','useractioncomplete'].includes(data.eventStatus))return false;
 return [1,3,4].every(id=>data.purpose?.consents?.[id]===true)&&data.vendor?.consents?.[755]===true;
}
export function initializeAdConsent({window:w,document:d,production,cmpUrl,adClient}) {
 if(!production||!cmpUrl)return;
 const optedOut=()=>{try{return w.localStorage.getItem('cw:ads-opt-out')==='1';}catch{return true;}};
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
   if(button)button.hidden=false;
   const next=!optedOut()&&(!reopening||data.eventStatus==='useractioncomplete')&&mayRequestAds(data);const revoked=allowed&&!next;allowed=next;
   if(optedOut())say('Advertising is turned off for this browser.');
   if(next){say(adClient?'Advertising preferences saved.':'Advertising preferences saved. Ads are not yet enabled.');start();}
   else{stop();say('Ads remain off until advertising consent is available.');}
   // Discard previously loaded ad frames and scripts after withdrawal.
   if(revoked&&loaded)w.location.reload();
  });
 }
 w.googlefc.callbackQueue.push({CONSENT_API_READY:()=>{
  
  listen();
 }});
 const panel=d.createElement('dialog');panel.setAttribute('aria-labelledby','ad-settings-heading');
 panel.innerHTML='<h2 id="ad-settings-heading">Advertising privacy choices</h2><p>You can turn off advertising on this browser at any time. This site will stop requesting ads and remove any loaded ads. Analytics has its own separate setting.</p><button data-ad-disable>Turn off advertising</button> <button data-ad-google hidden>Manage Google consent</button> <button data-ad-close>Close</button><p data-ad-local-status role="status"></p>';
 d.body.append(panel);
 const googleButton=panel.querySelector('[data-ad-google]');
 button?.addEventListener('click',()=>{
  googleButton.hidden=typeof w.googlefc?.showRevocationMessage!=='function';
  panel.querySelector('[data-ad-local-status]').textContent=optedOut()?'Advertising is already turned off for this browser.':'';
  panel.showModal();
 });
 panel.querySelector('[data-ad-disable]').addEventListener('click',()=>{
  try{w.localStorage.setItem('cw:ads-opt-out','1');}catch{}
  stop();d.querySelectorAll('.ad').forEach(el=>el.remove());
  say('Advertising is turned off for this browser.');panel.close();
  // Remove previously executed ad runtime and any pending ad work.
  w.location.reload();
 });
 googleButton.addEventListener('click',()=>{
  panel.close();stop();
  w.googlefc.callbackQueue.push({CONSENT_API_READY:()=>{if(typeof w.googlefc.showRevocationMessage==='function')w.googlefc.showRevocationMessage();}});
 });
 panel.querySelector('[data-ad-close]').addEventListener('click',()=>panel.close());
 w.googlefc.callbackQueue.push({CONSENT_API_READY:()=>{
  if(w.sessionStorage.getItem('cw:reopen-ad-consent')==='1'){
   w.sessionStorage.removeItem('cw:reopen-ad-consent');w.googlefc.callbackQueue.push(()=>w.googlefc.showRevocationMessage());
  }
 }});
 if(button)button.hidden=false;
 const script=d.createElement('script');script.async=true;script.src=cmpUrl;
 script.onerror=()=>{stop();say('Advertising privacy settings could not load. Ads remain off.');};
 d.head.append(script);
}
