#!/usr/bin/env python3
from pathlib import Path
import zipfile, hashlib, json, io
ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'; DIST.mkdir(exist_ok=True)
VERSION='v0.1.0-dev1'
def archive(output, sources):
 with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
  for source,prefix in sources:
   for file in sorted(source.rglob('*')):
    if file.is_file():
     info=zipfile.ZipInfo(str(Path(prefix)/file.relative_to(source)),(2026,11,4,0,0,0)); info.compress_type=zipfile.ZIP_DEFLATED
     z.writestr(info,file.read_bytes())
bp=ROOT/'packs/behavior_pack'; rp=ROOT/'packs/resource_pack'
bp_out=DIST/f'GGLuckyEasy-Behavior-{VERSION}.mcpack'; rp_out=DIST/f'GGLuckyEasy-Resources-{VERSION}.mcpack'; addon=DIST/f'GGLuckyEasy-{VERSION}.mcaddon'
archive(bp_out,[(bp,'')]); archive(rp_out,[(rp,'')])
# Official .mcaddon layout: nested installable .mcpack archives.
with zipfile.ZipFile(addon,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for pack in (bp_out,rp_out):
  info=zipfile.ZipInfo(pack.name,(2026,11,4,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,pack.read_bytes())
files=[bp_out,rp_out,addon]; checks=[]
for f in files:
 digest=hashlib.sha256(f.read_bytes()).hexdigest(); checks.append(f'{digest}  {f.name}')
 print(f'BUILD {f.relative_to(ROOT)} {f.stat().st_size} bytes sha256={digest}')
(DIST/'SHA256SUMS.txt').write_text('\n'.join(checks)+'\n')
# Semantic inspection: nested packs, manifests, dependencies, scripts, assets.
with zipfile.ZipFile(addon) as z:
 names=set(z.namelist());required={bp_out.name,rp_out.name};assert required==names,(names,required);assert z.testzip() is None
 manifests=[]
 for pack in required:
  with zipfile.ZipFile(io.BytesIO(z.read(pack))) as inner:
   inner_names=set(inner.namelist());assert 'manifest.json' in inner_names;assert inner.testzip() is None
   manifests.append(json.loads(inner.read('manifest.json')))
   if pack==bp_out.name:assert 'scripts/main.js' in inner_names
   else:assert 'texts/vi_VN.lang' in inner_names and 'sounds/sound_definitions.json' in inner_names
 assert manifests[0]['dependencies'][0]['uuid']==manifests[1]['header']['uuid']
 assert manifests[1]['dependencies'][0]['uuid']==manifests[0]['header']['uuid']
 report={'version':VERSION,'archives':[{'file':f.name,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()} for f in files], 'mcaddon_entries':sorted(names),'nested_pack_manifests':True,'mutual_dependencies':True,'required_entries_present':True,'crc_check':'PASS'}
 (ROOT/'evidence/build.json').write_text(json.dumps(report,indent=2)+'\n')
print('PASS mcaddon semantic inspection: two nested packs, manifests, dependencies, scripts, localization, sounds, CRC valid')
