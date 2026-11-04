#!/usr/bin/env python3
from pathlib import Path
import zipfile, hashlib, json
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
bp_out=DIST/f'Lucky-Chaos-Behavior-{VERSION}.mcpack'; rp_out=DIST/f'Lucky-Chaos-Resources-{VERSION}.mcpack'; addon=DIST/f'Lucky-Chaos-{VERSION}.mcaddon'
archive(bp_out,[(bp,'')]); archive(rp_out,[(rp,'')])
archive(addon,[(bp,'Lucky_Chaos_BP'),(rp,'Lucky_Chaos_RP')])
files=[bp_out,rp_out,addon]; checks=[]
for f in files:
 digest=hashlib.sha256(f.read_bytes()).hexdigest(); checks.append(f'{digest}  {f.name}')
 print(f'BUILD {f.relative_to(ROOT)} {f.stat().st_size} bytes sha256={digest}')
(DIST/'SHA256SUMS.txt').write_text('\n'.join(checks)+'\n')
# Inspect central directories, not just filenames.
with zipfile.ZipFile(addon) as z:
 names=set(z.namelist()); required={'Lucky_Chaos_BP/manifest.json','Lucky_Chaos_RP/manifest.json','Lucky_Chaos_BP/scripts/main.js','Lucky_Chaos_RP/texts/vi_VN.lang'}
 assert required<=names,required-names; assert z.testzip() is None
 report={'version':VERSION,'archives':[{'file':f.name,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()} for f in files], 'mcaddon_entries':len(names),'required_entries_present':True,'crc_check':'PASS'}
 (ROOT/'evidence/build.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'PASS mcaddon inspected: {len(names)} entries, CRC valid')
