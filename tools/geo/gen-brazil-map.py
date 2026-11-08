import json, math
src = json.load(open('br-uf.json', encoding='utf-8'))
UF = {12:'AC',27:'AL',16:'AP',13:'AM',29:'BA',23:'CE',53:'DF',32:'ES',52:'GO',21:'MA',51:'MT',50:'MS',31:'MG',15:'PA',25:'PB',41:'PR',26:'PE',22:'PI',33:'RJ',24:'RN',43:'RS',11:'RO',14:'RR',42:'SC',35:'SP',28:'SE',17:'TO'}
def merc(lng, lat): return (math.radians(lng), -math.log(math.tan(math.pi/4 + math.radians(lat)/2)))
pts = [merc(*c) for f in src['features'] for poly in (f['geometry']['coordinates'] if f['geometry']['type']=='MultiPolygon' else [f['geometry']['coordinates']]) for ring in poly for c in ring]
minx=min(p[0] for p in pts); maxx=max(p[0] for p in pts); miny=min(p[1] for p in pts); maxy=max(p[1] for p in pts)
W=1000; pad=10; s=(W-2*pad)/(maxx-minx); H=round((maxy-miny)*s+2*pad)
tx=pad-minx*s; ty=pad-miny*s
def P(lng,lat):
  x,y=merc(lng,lat); return (x*s+tx, y*s+ty)
out=[]
for f in src['features']:
  code=int(f['properties']['codarea']); g=f['geometry']
  polys = g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
  d=[]
  for poly in polys:
    for ring in poly:
      seq=[]; last=None
      for c in ring:
        x,y=P(*c); q=(round(x),round(y))
        if last and abs(q[0]-last[0])<2.6 and abs(q[1]-last[1])<2.6: continue
        seq.append(q); last=q
      if len(seq)<3: continue
      d.append('M'+'L'.join(f'{x:g} {y:g}' for x,y in seq)+'Z')
  out.append((UF[code],''.join(d)))
out.sort()
with open('brazil-map.ts','w',encoding='utf-8',newline='\n') as fh:
  fh.write('/**\n * Brazil by state, Mercator, generated from the IBGE boundaries API (malhas v3, qualidade mínima)\n * by tools/geo (not edited by hand). `project` places a longitude/latitude on the same canvas.\n */\n')
  fh.write(f'export const BRAZIL_VIEWBOX = {{ width: {W}, height: {H} }} as const\n\n')
  fh.write(f'const S = {s!r}\nconst TX = {tx!r}\nconst TY = {ty!r}\n\n')
  fh.write('export function project(lng: number, lat: number): { x: number; y: number } {\n  const x = (lng * Math.PI) / 180\n  const y = -Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))\n  return { x: x * S + TX, y: y * S + TY }\n}\n\n')
  fh.write('export const BRAZIL_STATES: ReadonlyArray<{ uf: string; d: string }> = [\n')
  for uf,d in out: fh.write(f"  {{ uf: '{uf}', d: '{d}' }},\n")
  fh.write(']\n')
print(H, sum(len(d) for _,d in out))
