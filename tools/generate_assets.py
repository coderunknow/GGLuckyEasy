#!/usr/bin/env python3
"""Original deterministic pixel art and synthesized chimes (Pillow + imageio-ffmpeg)."""
from pathlib import Path
from PIL import Image, ImageDraw
import math, wave, struct, subprocess
import imageio_ffmpeg
ROOT=Path(__file__).resolve().parents[1]
BLOCK=ROOT/'packs/resource_pack/textures/blocks'; ITEM=ROOT/'packs/resource_pack/textures/items'
BLOCK.mkdir(parents=True,exist_ok=True); ITEM.mkdir(parents=True,exist_ok=True)
Q=["01110","11011","00011","00110","00100","00000","00100"]
palettes={
'lucky':('#3e2a08','#8d5c0b','#eaa827','#ffe66d','#fff6bd','#fff9db'),
'super':('#082d42','#075f83','#16b8d4','#65eff4','#d9ffff','#fff2a8'),
'chaos':('#310832','#75116f','#c62ca6','#f05ac5','#ffc1ec','#8dfaff')}
def block(name,pal):
 im=Image.new('RGB',(32,32),pal[0]); d=ImageDraw.Draw(im)
 d.rectangle((2,2,29,29),fill=pal[1]); d.rectangle((4,4,27,27),fill=pal[2]); d.rectangle((6,6,25,25),fill=pal[3])
 # deliberate rivets, diagonal facets and inset border
 for x,y in [(3,3),(28,3),(3,28),(28,28)]: d.rectangle((x-1,y-1,x+1,y+1),fill=pal[4]); d.point((x,y),fill=pal[5])
 for i in range(5,26): d.line((i,5,i+3,8),fill=pal[4] if i%4==0 else pal[2]); d.line((i,26,i+3,23),fill=pal[1] if i%4==0 else pal[2])
 d.rectangle((7,7,24,24),fill=pal[1]); d.rectangle((8,8,23,23),fill=pal[0])
 for row,line in enumerate(Q):
  for col,v in enumerate(line):
   if v=='1': d.rectangle((9+col*3,4+row*3,11+col*3,6+row*3),fill=pal[5] if (row+col)%4 else pal[4])
 d.rectangle((1,1,30,30),outline=pal[0]); im.save(BLOCK/f'{name}_lucky_block.png')
for n,p in palettes.items(): block(n,p)

def icon(name,bg,fg,accent,shape):
 im=Image.new('RGBA',(16,16),(0,0,0,0)); d=ImageDraw.Draw(im)
 if shape=='compass': d.ellipse((1,1,14,14),fill=bg,outline=fg); d.polygon([(9,3),(7,8),(3,11),(8,9)],fill=accent); d.point((8,8),fill='white')
 elif shape=='shard': d.polygon([(8,0),(13,5),(10,15),(4,12),(2,5)],fill=bg,outline=fg); d.line((8,2,7,12,11,6),fill=accent,width=2)
 elif shape=='coin': d.ellipse((1,1,14,14),fill=bg,outline=fg,width=2); d.line((8,4,8,11),fill=accent,width=2); d.point((6,5),fill=accent)
 elif shape=='token': d.rectangle((1,2,14,13),fill=bg,outline=fg); d.rectangle((4,5,6,7),fill=accent); d.rectangle((10,5,12,7),fill=accent); d.line((5,11,11,11),fill=accent)
 elif shape=='star': d.polygon([(8,0),(10,5),(15,6),(11,9),(12,15),(8,12),(3,15),(5,9),(0,6),(6,5)],fill=bg,outline=fg); d.point((8,7),fill=accent)
 elif shape=='badge': d.polygon([(3,1),(13,1),(15,8),(8,15),(1,8)],fill=bg,outline=fg); d.rectangle((5,4,6,6),fill=accent); d.rectangle((10,4,11,6),fill=accent); d.line((5,10,11,10),fill=accent)
 elif shape=='crown': d.polygon([(1,3),(5,7),(8,1),(11,7),(15,3),(13,13),(3,13)],fill=bg,outline=fg); d.rectangle((4,10,12,12),fill=accent)
 im.save(ITEM/f'{name}.png')
icons=[('chaos_compass','#512b76','#f5cc45','#69efff','compass'),('chaos_shard','#bd39b6','#ffd0ff','#78f4ff','shard'),('lucky_coin','#e5a927','#fff19b','#8a4c0b','coin'),('meme_token','#49c8b0','#d9fff5','#153e45','token'),('star_fragment','#7585f2','#e0e5ff','#fff4a8','star'),('prank_badge','#ef6a75','#ffd0d5','#642240','badge'),('chaos_crown','#e6b62e','#fff0a2','#c736a9','crown')]
for args in icons: icon(*args)
# Pack icon uses the same authored block, enlarged without smoothing.
im=Image.open(BLOCK/'chaos_lucky_block.png').resize((128,128),Image.Resampling.NEAREST)
im.save(ROOT/'packs/resource_pack/pack_icon.png'); im.save(ROOT/'packs/behavior_pack/pack_icon.png')
# Original mono 44.1kHz 16-bit PCM chimes, encoded as mobile-friendly Ogg Vorbis.
snd=ROOT/'packs/resource_pack/sounds/luckychaos'; snd.mkdir(parents=True,exist_ok=True)
for tier,notes in {'lucky':[660,880], 'super':[660,880,1320], 'chaos':[440,740,370,990]}.items():
 samples=[]; rate=44100
 for n,freq in enumerate(notes):
  for i in range(int(rate*.12)):
   t=i/rate; env=(1-i/(rate*.12))**2; value=.22*env*(math.sin(2*math.pi*freq*t)+.3*math.sin(2*math.pi*freq*2*t)); samples.append(int(value*32767))
 wav=snd/f'{tier}.wav'
 with wave.open(str(wav),'wb') as w: w.setparams((1,2,rate,len(samples),'NONE','not compressed')); w.writeframes(struct.pack('<'+'h'*len(samples),*samples))
 subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-loglevel','error','-y','-i',str(wav),'-fflags','+bitexact','-flags:a','+bitexact','-serial_offset','0','-c:a','libvorbis','-q:a','4',str(snd/f'{tier}.ogg')],check=True)
 wav.unlink()
print('Generated 3 blocks, 7 item icons, 2 pack icons, and 3 original sounds.')
