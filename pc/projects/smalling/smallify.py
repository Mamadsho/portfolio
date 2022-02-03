import os
from PIL import Image

for path in os.listdir():
    if os.path.isfile(path):
        # try:
        img = Image.open(os.path.realpath(path))
        img = img.convert('RGB')
        img.save(path+'HR.jpg')
        # img = Image.open(os.path.realpath(path)+'\\title.png')
        img = img.convert('RGB')
        img.thumbnail((300,200))
        img.save(path+'LR.jpg')
        # except:
        #     img = Image.open(os.path.realpath(path)+'\\title.jpg')
        #     img.save(path+'\\titleHR.jpg')
        #     img = Image.open(os.path.realpath(path)+'\\title.jpg')
        #     img.thumbnail((300,200))
        #     img.save(path+'\\titleLR.jpg')
        #     print(img.format)
