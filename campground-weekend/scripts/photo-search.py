exec(open('scripts/research.py').read().split('result={}')[0])
for key,query in [('ottawa-lake','Ottawa Lake Wisconsin'),('pinewoods','Kettle Moraine Southern Unit'),('whitewater-lake','Whitewater Lake Wisconsin'),('govdodge','Governor Dodge State Park'),('yellowstone','Yellowstone Lake State Park')]:
 try:
  r=api('commons.wikimedia.org',generator='search',gsrsearch=query,gsrnamespace=6,gsrlimit=3,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=1200)
  Path('research/photo-candidates-'+key+'.json').write_text(json.dumps(r,indent=2))
  for p in r.get('query',{}).get('pages',{}).values():
   img=p.get('imageinfo',[{}])[0];m=img.get('extmetadata',{});print(key,p['title'],m.get('LicenseShortName',{}).get('value',''),re.sub('<[^>]+>','',m.get('ImageDescription',{}).get('value',''))[:200],flush=True)
 except Exception as e:print(key,e,flush=True)
