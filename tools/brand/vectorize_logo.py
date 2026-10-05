BLUR=0.9
import numpy as np, subprocess, re
from PIL import Image
from scipy import ndimage
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
SC=8
def potrace_paths(mask, name):
    h,w=mask.shape
    big=Image.fromarray((mask*255).astype('uint8'),'L').resize((w*SC,h*SC),Image.BICUBIC)
    big=big.filter(__import__('PIL.ImageFilter',fromlist=['x']).GaussianBlur(SC*0.6))
    a=np.array(big)>127
    Image.fromarray(np.where(a,0,255).astype('uint8')).convert('1').save(f'{name}.pbm')
    subprocess.run(['potrace',f'{name}.pbm','-b','svg','-o',f'{name}.svg','--turdsize','50','--alphamax','1.0','--opttolerance','0.4','-u','100','--flat'],check=True)
    s=open(f'{name}.svg').read()
    tr=re.search(r'<g transform="([^"]+)"',s).group(1)
    ds=re.findall(r'<path d="([^"]+)"',s,re.S)
    # potrace transform: translate(0,H) scale(0.01,-0.01) with -u 100 in pixel units of big image
    return tr, ' '.join(d.replace('\n',' ') for d in ds)
def circle(lab,i):
    ys,xs=np.nonzero(lab==i)
    area=len(xs); r=np.sqrt(area/np.pi)
    return xs.mean()+0.5, ys.mean()+0.5, r
def wrap_path(tr,d):
    # potrace output is in big-image px; scale by 1/SC
    return f'<path transform="scale({1/SC}) {tr}" d="{d}"/>'

# ---------- LOGOTYPE (from white negative version, highest resolution) ----------
im=np.array(Image.open('docs/brand-assets/originais/logotipo-branco.png').convert('RGBA'))
H,W=im.shape[:2]
alpha=im[:,:,3]/255.0
lab,n=ndimage.label(alpha>=0.5)
word=np.isin(lab,[1,2,3,4,5,6])  # letters (A dots 7,8 and period 9 as circles)
# use soft alpha restricted to dilated letter region for smoother trace
reg=ndimage.binary_dilation(word,iterations=3)
wsoft=np.where(reg,alpha,0)
tr,d=potrace_paths(wsoft>0.0 if False else wsoft, 'word') if False else (None,None)
# potrace needs boolean; trace using soft alpha upscale then threshold
def trace_soft(soft,name):
    h,w=soft.shape
    big=Image.fromarray((soft*255).astype('uint8'),'L').resize((w*SC,h*SC),Image.BICUBIC)
    from PIL import ImageFilter
    big=big.filter(ImageFilter.GaussianBlur(SC*BLUR))
    a=np.array(big)>127
    Image.fromarray(np.where(a,0,255).astype('uint8')).convert('1').save(f'{name}.pbm')
    subprocess.run(['potrace',f'{name}.pbm','-b','svg','-o',f'{name}.svg','--turdsize','50','--alphamax','1.0','--opttolerance','1.0','--flat'],check=True)
    s=open(f'{name}.svg').read()
    tr=re.search(r'<g transform="([^"]+)"',s).group(1)
    ds=re.findall(r'<path d="([^"]+)"',s,re.S)
    return tr,' '.join(x.replace('\n',' ') for x in ds)
tr,d=trace_soft(wsoft,'word')
dots=[circle(lab,i) for i in (7,8,9)]
# tagline: Barlow 400 outlines fitted to raster bbox of components >=10
tag=lab>=10
ys,xs=np.nonzero(tag); bx0,bx1,by0,by1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
font=TTFont('tools/brand/Barlow-400.ttf'); gs=font.getGlyphSet(); cmap=font.getBestCmap(); hm=font['hmtx']
text="Projetos Socioambientais, Educativos e Culturais"
def text_bounds_and_path(scale,tx,ty):
    pen=SVGPathPen(gs); bp=BoundsPen(gs)
    x=0
    for ch in text:
        g=cmap[ord(ch)]
        t=(scale,0,0,-scale,tx+x*scale,ty)
        gs[g].draw(TransformPen(pen,t)); gs[g].draw(TransformPen(bp,t))
        x+=hm[g][0]
    return bp.bounds, pen.getCommands()
(b0,_)=text_bounds_and_path(1,0,0)
# b0 in font units with y flipped: (xmin, ymin, xmax, ymax)
s=(bx1-bx0)/(b0[2]-b0[0])
tx=bx0-b0[0]*s
# vertical: align cap top: P top -> by0 ; compute bounds with scale
(b1,_)=text_bounds_and_path(s,tx,0)
ty=by0-b1[1]
(bb,tagd)=text_bounds_and_path(s,tx,ty)
print('tag scale px/unit',s,'font px',s*1000,'bounds',bb,'raster',(bx0,by0,bx1,by1))
def logotype_svg(word_fill,tag_fill,dot_fill,title,id_):
    c=''.join(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r:.2f}" fill="{word_fill}"/>' for (x,y,r) in dots[:2])
    px,py,pr=dots[2]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="{id_}">
<title id="{id_}">{title}</title>
<g fill="{word_fill}">{wrap_path(tr,d)}</g>{c}
<circle cx="{px:.2f}" cy="{py:.2f}" r="{pr:.2f}" fill="{dot_fill}"/>
<path fill="{tag_fill}" d="{tagd}"/>
</svg>
'''
BLUE='#0089CF'; GREEN='#39B54A'
open('quarau-logotipo.svg','w').write(logotype_svg(BLUE,BLUE,GREEN,'Quarau — Projetos Socioambientais, Educativos e Culturais','qlt'))
open('quarau-logotipo-branco.svg','w').write(logotype_svg('#FFFFFF','#FFFFFF','#FFFFFF','Quarau — Projetos Socioambientais, Educativos e Culturais','qltb'))
# ---------- SYMBOL ----------
sim=np.array(Image.open('docs/brand-assets/originais/simbolo-colorido.png').convert('RGBA')).astype(float)
SH,SW=sim.shape[:2]
a=sim[:,:,3]/255
blue=np.array([0x00,0x80,0xC8]); green=np.array([0x3A,0xAA,0x35])
db=np.linalg.norm(sim[:,:,:3]-blue,axis=2); dg=np.linalg.norm(sim[:,:,:3]-green,axis=2)
isg=(dg<db)&(a>0.5)
labg,ng=ndimage.label(isg); sizes=ndimage.sum(isg,labg,range(1,ng+1)); gi=int(np.argmax(sizes))+1
gx,gy,gr=circle(labg,gi)
gdil=ndimage.binary_dilation(labg==gi,iterations=4)
bsoft=np.where(gdil,0,a)
str_,sd=trace_soft(bsoft,'sym')
# crop viewBox to content bbox with small margin
ys,xs=np.nonzero(a>0.5); m=0
vb=f'{xs.min()-m} {ys.min()-m} {xs.max()-xs.min()+1+2*m} {ys.max()-ys.min()+1+2*m}'
def sym_svg(bf,gf,id_):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-labelledby="{id_}">
<title id="{id_}">Quarau</title>
<g fill="{bf}"><path transform="scale({1/SC}) {str_}" d="{sd}"/></g>
<circle cx="{gx:.2f}" cy="{gy:.2f}" r="{gr:.2f}" fill="{gf}"/>
</svg>
'''
open('quarau-simbolo.svg','w').write(sym_svg('#0080C8','#3AAA35','qs'))
open('quarau-simbolo-branco.svg','w').write(sym_svg('#FFFFFF','#FFFFFF','qsb'))
print('symbol vb',vb,'dot',gx,gy,gr,'dots',dots)
