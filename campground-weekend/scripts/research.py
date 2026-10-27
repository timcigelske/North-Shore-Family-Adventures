import json,urllib.request,urllib.parse,re,time
from pathlib import Path
parks={'peninsula':'Peninsula State Park','newport':'Newport State Park','potawatomi':'Potawatomi State Park','rockisland':'Rock Island State Park (Wisconsin)','harringtonbeach':'Harrington Beach State Park','kohlerandrae':'Kohler-Andrae State Park','devilslake':"Devil’s Lake State Park (Wisconsin)",'mirrorlake':'Mirror Lake State Park','rockyarbor':'Rocky Arbor State Park','kms':'Kettle Moraine State Forest','kmn':'Kettle Moraine State Forest','bigfoot':'Big Foot Beach State Park','pointbeach':'Point Beach State Forest','highcliff':'High Cliff State Park','govdodge':'Governor Dodge State Park','bluemound':'Blue Mound State Park','lakekegonsa':'Lake Kegonsa State Park','hartmancreek':'Hartman Creek State Park','buckhorn':'Buckhorn State Park','yellowstone':'Yellowstone Lake State Park'}
def get(url):
 req=urllib.request.Request(url,headers={'User-Agent':'CampgroundWeekendEditorialResearch/0.1 (source and license verification)'})
 with urllib.request.urlopen(req,timeout=25) as r:return r.read()
def api(host,**params):return json.loads(get('https://'+host+'/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',**params))))
result={}
for key,title in parks.items():
 try:
  title=title.replace('’',"'")
  data=api('en.wikipedia.org',titles=title,prop='pageimages|coordinates',piprop='name',colimit='1')
  page=next(iter(data['query']['pages'].values())); entry={'page':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(title.replace(' ','_')),'coordinates':page.get('coordinates',[None])[0]}
  if page.get('pageimage'):
   file='File:'+page['pageimage']; img=next(iter(api('commons.wikimedia.org',titles=file,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth='1200')['query']['pages'].values()))['imageinfo'][0]
   meta=img['extmetadata']; license=meta.get('LicenseShortName',{}).get('value','')
   if license.startswith(('CC BY','CC0','Public domain')):
    imagepath='images/'+key+'.jpg'; Path('public/'+imagepath).write_bytes(get(img.get('thumburl',img['url'])))
    entry['image']={'src':'/'+imagepath,'file':img['descriptionurl'],'author':re.sub('<[^>]+>','',meta.get('Artist',{}).get('value','Unknown')),'license':license,'licenseUrl':meta.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Licensing'),'caption':re.sub('<[^>]+>','',meta.get('ImageDescription',{}).get('value',title))[:250],'modified':'Resized by Wikimedia; displayed cropped.'}
  result[key]=entry
  print(key, bool(entry.get('image')),entry['coordinates'],flush=True)
 except Exception as e: print(key,type(e).__name__,str(e)[:120],flush=True);result[key]={'error':str(e)[:120]}
 Path('research/media-ledger.json').write_text(json.dumps(result,indent=2))
