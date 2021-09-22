import os
import json
from PIL import Image

f = open('data.json','r',encoding = 'utf8')
data = json.load(f)

icon_size = 50

for line in data:
    size = [ len(data[line])*icon_size , icon_size ]
    canvas = Image.new('RGBA',size)
    x=0
    for page in data[line]:
        icon = Image.open('.\\icons\\'+page['icon'])
        icon = icon.resize((30,30))
        canvas.paste(icon,[x+10,10])
        x+=icon_size
    directory = os.path.join(os.path.abspath(''), 'portfolio_icons')
    if not os.path.exists(directory):
        os.mkdir(directory)
    canvas.save(os.path.join(directory, line+'.png'))