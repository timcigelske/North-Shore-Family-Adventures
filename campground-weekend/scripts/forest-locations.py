import urllib.request,re,json,html
from pathlib import Path
out={}
for unit in ['kms','kmn']:
 url='https://dnr.wisconsin.gov/topic/parks/'+unit+'/recreation/camping'
 try:
  data=urllib.request.urlopen(url,timeout=30).read().decode()
  links=re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>',data,re.S)
  for href,text in links:
   if 'maps.google' in href:out[re.sub('<[^>]+>','',text)]=html.unescape(href)
 except Exception as e:print(e)
Path('research/forest-directions.json').write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
