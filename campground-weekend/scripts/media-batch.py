exec(open('scripts/research.py').read().split('result={}')[0])
result=json.loads(Path('research/media-ledger.json').read_text())
titles='|'.join(set(x.replace('’',"'") for x in parks.values()))
data=api('en.wikipedia.org',titles=titles,prop='pageimages|coordinates',piprop='name',colimit='max',redirects=1)
pages={p['title']:p for p in data['query']['pages'].values()}
Path('research/wiki-batch.json').write_text(json.dumps(data,indent=2))
files='|'.join('File:'+p['pageimage'] for p in pages.values() if p.get('pageimage'))
images=api('commons.wikimedia.org',titles=files,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth='1200')
Path('research/license-batch.json').write_text(json.dumps(images,indent=2))
images={p['title'].replace('_',' '):p for p in images['query']['pages'].values()}
for key,title in parks.items():
 title=title.replace('’',"'");p=pages.get(title,{})
 if not p:continue
 entry={'page':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(title.replace(' ','_')),'coordinates':p.get('coordinates',[None])[0]}
 try:
  img=images[('File:'+p['pageimage']).replace('_',' ')]['imageinfo'][0];meta=img['extmetadata'];lic=meta.get('LicenseShortName',{}).get('value','')
  if lic.startswith(('CC BY','CC0','Public domain')):
   path='images/'+key+'.jpg'
   if not Path('public/'+path).exists():Path('public/'+path).write_bytes(get(img.get('thumburl',img['url'])))
   entry['image']={'src':'/'+path,'file':img['descriptionurl'],'author':re.sub('<[^>]+>','',meta.get('Artist',{}).get('value','Unknown')),'license':lic,'licenseUrl':meta.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Licensing'),'caption':re.sub('<[^>]+>','',meta.get('ImageDescription',{}).get('value',title))[:250],'modified':'Resized by Wikimedia; displayed cropped.'}
 except Exception as e:entry['imageError']=str(e)[:100]
 result[key]=entry;print(key,bool(entry.get('image')),flush=True)
Path('research/media-ledger.json').write_text(json.dumps(result,indent=2))
