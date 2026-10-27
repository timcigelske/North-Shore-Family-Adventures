exec(open('scripts/research.py').read().split('result={}')[0])
choices={'ottawa-lake':'File:Ottawa Lake Recreation Area.jpg','pinewoods':'File:Kettle Moraine Scenic Drive Turn in Southern Unit.jpg','whitewater-lake':'File:Kettle Moraine Scenic Drive Turn in Southern Unit.jpg','govdodge':'File:Deer Cove Governor Dodge State Park.jpg','yellowstone':'File:Yellowstonelakestatepark.jpg'}
for key,title in choices.items():
 candidatekey='pinewoods' if key=='whitewater-lake' else key
 pages=json.load(open('research/photo-candidates-'+candidatekey+'.json'))['query']['pages']
 page=next(p for p in pages.values() if p['title']==title);img=page['imageinfo'][0];m=img['extmetadata'];lic=m['LicenseShortName']['value']
 path='images/'+key+'.jpg';Path('public/'+path).write_bytes(get(img.get('thumburl',img['url'])))
 cap=re.sub('<[^>]+>','',m['ImageDescription']['value']);cap=re.sub(r'\s+',' ',cap)
 if key in ('pinewoods','whitewater-lake'):cap='Kettle Moraine Southern Unit regional landscape; not a photograph of this campground.'
 rec=json.load(open('src/content/campgrounds/'+key+'.json'));rec['image']={'src':'/'+path,'file':img['descriptionurl'],'author':re.sub('<[^>]+>','',m.get('Artist',{}).get('value','Unknown')),'license':lic,'licenseUrl':m.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Licensing'),'caption':cap[:250],'modified':'Resized and cropped for display.','width':1200,'height':800};Path('src/content/campgrounds/'+key+'.json').write_text(json.dumps(rec,indent=2,ensure_ascii=False)+'\n');print(key,lic,flush=True)
for key in ('mauthe-lake','long-lake'):
 rec=json.load(open('src/content/campgrounds/'+key+'.json'));m=json.load(open('research/media-ledger.json'))['kmn']['image'];m.update(width=1200,height=800);m['caption']='Kettle Moraine State Forest regional landscape; not a photograph of this campground.';rec['image']=m;Path('src/content/campgrounds/'+key+'.json').write_text(json.dumps(rec,indent=2,ensure_ascii=False)+'\n')
