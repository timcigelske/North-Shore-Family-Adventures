from PIL import Image
from pathlib import Path
import json
for p in Path('public/images').glob('*.webp'):
 if '-600' in p.stem:continue
 im=Image.open(p).convert('RGB');im.thumbnail((1200,900));im.save(p,quality=82,optimize=True)
 small=im.copy();small.thumbnail((600,450));small.save(p.with_name(p.stem+'-600.webp'),quality=80,optimize=True)
 for r in Path('src/content/campgrounds').glob('*.json'):
  data=json.loads(r.read_text())
  if data.get('image') and data['image']['src']=='/images/'+p.name:
   data['image']['width'],data['image']['height']=im.size;r.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
