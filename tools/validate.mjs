import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { EVENTS } from "../src/events/registry.js";
import table from "../src/config/probabilities.json" with { type: "json" };
import runtimeTable from "../src/config/probabilities.js";
import { validateWeights } from "../src/core/random.js";
const root=process.cwd(), errors=[], checks=[];
const pass=name=>checks.push(name);
function walk(dir){return fs.existsSync(dir)?fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]):[];}
const files=[...walk("packs"),...walk("src")];
for(const file of files.filter(f=>f.endsWith(".json"))){try{JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){errors.push(`${file}: ${e.message}`);}}
pass(`${files.filter(f=>f.endsWith(".json")).length} JSON files parsed`);
const bp=JSON.parse(fs.readFileSync("packs/behavior_pack/manifest.json","utf8")),rp=JSON.parse(fs.readFileSync("packs/resource_pack/manifest.json","utf8"));
const ids=[bp.header.uuid,rp.header.uuid,...bp.modules.map(m=>m.uuid),...rp.modules.map(m=>m.uuid)];
for(const id of ids)if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id))errors.push(`Invalid UUID ${id}`);
if(new Set(ids).size!==ids.length)errors.push("Duplicate manifest/module UUID");
if(bp.dependencies[0].uuid!==rp.header.uuid||rp.dependencies[0].uuid!==bp.header.uuid)errors.push("Mutual pack dependencies invalid");
for(const [module,version] of [["@minecraft/server","2.8.0"],["@minecraft/server-ui","2.1.0"]])if(!bp.dependencies.some(d=>d.module_name===module&&d.version===version))errors.push(`Missing ${module} ${version}`);
if(JSON.stringify(bp.header.min_engine_version)!=="[1,26,30]")errors.push("Wrong min_engine_version");
pass("Manifest UUIDs, dependencies, stable API pins, and engine version");
for(const tier of ["lucky","super","chaos"]){
 const file=`packs/behavior_pack/blocks/${tier}.json`;
 if(!fs.existsSync(file)){errors.push(`Missing required block definition ${file}`);continue;}
 const data=JSON.parse(fs.readFileSync(file,"utf8")),block=data["minecraft:block"],c=block.components;
 if(block.description?.identifier!==`luckychaos:${tier==="lucky"?"lucky":tier+"_lucky"}_block`)errors.push(`${file}: wrong required block identifier`);
 if(c["minecraft:geometry"]!=="minecraft:geometry.full_block")errors.push(`${file}: missing full-block geometry`);
}
for(const file of walk("packs/behavior_pack/blocks").filter(f=>f.endsWith(".json"))){const data=JSON.parse(fs.readFileSync(file,"utf8")),c=data["minecraft:block"].components;if(c["minecraft:geometry"]!=="minecraft:geometry.full_block")errors.push(`${file}: missing full-block geometry`);}
for(const file of walk("packs/behavior_pack/items").filter(f=>f.endsWith(".json"))){const data=JSON.parse(fs.readFileSync(file,"utf8")),name=data["minecraft:item"].components["minecraft:display_name"];if(typeof name?.value!=="string")errors.push(`${file}: invalid display_name object`);}
if(!fs.existsSync("packs/resource_pack/texts/language_names.json"))errors.push("Missing custom language names");
pass("Block geometry, item display names, and custom language registration");
try {
  if(table.total!==10000)throw new Error("Probability basis-point total must be 10000");
  if(!["lucky","super","chaos"].every(tier=>table.tiers?.[tier]&&typeof table.tiers[tier]==="object"))throw new Error("All lucky, super, and chaos tiers are required");
  validateWeights(EVENTS,table);
  if(JSON.stringify(runtimeTable)!==JSON.stringify(table))errors.push("Runtime probability table is stale; run npm run build");
  pass("90 registry IDs, runtime table parity, and 100% tier weight totals");
} catch(error) { errors.push(`Weight validation: ${error.message}`); }
const langs={};for(const lang of ["en_US","vi_VN"]){langs[lang]=new Map(fs.readFileSync(`packs/resource_pack/texts/${lang}.lang`,"utf8").split("\n").filter(Boolean).map(l=>{const i=l.indexOf("=");return[l.slice(0,i),l.slice(i+1)];}));}
for(const event of EVENTS)for(const suffix of ["name","description"])for(const lang of Object.keys(langs))if(!langs[lang].has(`${event.id}.${suffix}`))errors.push(`Missing ${lang}:${event.id}.${suffix}`);
for(const id of ["lucky","super","chaos"])for(const lang of Object.keys(langs))if(!langs[lang].has(`tile.luckychaos:${id}.name`))errors.push(`Missing block translation ${id}`);
pass("English/Vietnamese event and block localization coverage");
const terrain=JSON.parse(fs.readFileSync("packs/resource_pack/textures/terrain_texture.json","utf8")).texture_data;
for(const [id,value] of Object.entries(terrain))if(!fs.existsSync(`packs/resource_pack/${value.textures}.png`))errors.push(`Missing terrain texture ${id}`);
const items=JSON.parse(fs.readFileSync("packs/resource_pack/textures/item_texture.json","utf8")).texture_data;
for(const [id,value] of Object.entries(items))if(!fs.existsSync(`packs/resource_pack/${value.textures}.png`))errors.push(`Missing item texture ${id}`);
const sounds=JSON.parse(fs.readFileSync("packs/resource_pack/sounds/sound_definitions.json","utf8")).sound_definitions;
for(const [id,value] of Object.entries(sounds))for(const sound of value.sounds)if(!fs.existsSync(`packs/resource_pack/${sound.name}.ogg`))errors.push(`Missing sound ${id}`);
pass("Texture atlases and original sound references resolve");
const main=fs.readFileSync("src/main.js","utf8");
for(const block of ["lucky_block","super_lucky_block","chaos_lucky_block"])if(!main.includes(`luckychaos:${block}`))errors.push(`Missing activation mapping ${block}`);
if(/minecraft:[a-z_]+["']\s*,\s*\{/.test(main))errors.push("Possible vanilla override");
if(/scoreboard|leaderboard|matchTimer|countdown|startRound|endRound/.test(main))errors.push("Forbidden competition mechanic");
pass("Tier activation mapping and free-play policy scan");
const scriptFiles=walk("src").filter(f=>f.endsWith(".js"));
for(const file of scriptFiles){const text=fs.readFileSync(file,"utf8");for(const match of text.matchAll(/from\s+["'](\.[^"']+)["']/g)){const resolved=path.resolve(path.dirname(file),match[1]);if(!fs.existsSync(resolved))errors.push(`Broken import ${file}: ${match[1]}`);}}
pass("Relative module imports resolve");
const report={timestamp:new Date().toISOString(),status:errors.length?"FAILED":"PASSED",checks,errors,filesScanned:files.length,eventCount:EVENTS.length};
fs.mkdirSync("evidence",{recursive:true});fs.writeFileSync("evidence/static-validation.json",JSON.stringify(report,null,2)+"\n");
for(const c of checks)console.log(`PASS ${c}`);for(const e of errors)console.error(`FAIL ${e}`);
console.log(`${report.status}: ${files.length} files, ${EVENTS.length} events`);if(errors.length)process.exit(1);
