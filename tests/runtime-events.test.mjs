import test, { after } from "node:test";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import fs from "node:fs";
import { EVENTS } from "../src/events/registry.js";

class ItemStack {
  constructor(id, count=1){this.typeId=id;this.count=count;}
  getComponent(id){return id==="minecraft:enchantable"?{addEnchantment(){}}:undefined;}
}
const system={runTimeout(callback){callback();}};
const source=fs.readFileSync("src/runtime/operations.js","utf8").replace('import { ItemStack, EnchantmentType, BlockPermutation, system } from "@minecraft/server";',`const ItemStack = globalThis.__ItemStack; const EnchantmentType = class { constructor(id){this.id=id;} }; const BlockPermutation = class { static resolve(id){return {type:{id}};} }; const system = globalThis.__system;`);
globalThis.__ItemStack=ItemStack;globalThis.__system=system;
const {EventOperations}=await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

function fixture(){
 const spawned=[],given=[],effects=[],blocks=[],actions=[];
 const container={addItem(item){given.push(item);return undefined;}};
 const entity=id=>({id,nameTag:"",addEffect(){},triggerEvent(){},addItem(){},getComponent(id){return id==="minecraft:health"?{effectiveMax:500,resetToMaxValue(){},setCurrent(){}}:undefined;}});
 const dimension={
  heightRange:{min:-64,max:320},spawned,
  spawnEntity(id,location){const e=entity(id);e.typeId=id;e.location=location;spawned.push(e);return e;},
  spawnItem(){},spawnParticle(){},createExplosion(){actions.push("explosion");},getEntities(){return[{teleport(){actions.push("magnet");}}];},
  getBlock(location){const b={location,typeId:"minecraft:air",isAir:true,isLiquid:false,isValid:true,setType(id){this.typeId=id;this.isAir=id==="minecraft:air";blocks.push(id);},get permutation(){return{type:{id:this.typeId},getAllStates:()=>({})};},setPermutation(p){this.setType(p.type.id);},getComponent(id){return id==="minecraft:inventory"&&this.typeId==="minecraft:chest"?{container}:undefined;}};return b;}
 };
 const player={id:"A",location:{x:0,y:64,z:0},dimension,getComponent(id){return id==="minecraft:inventory"?{container}:undefined;},addEffect(id){effects.push(id);},playSound(){actions.push("sound");},teleport(){actions.push("teleport");}};
 const other={...player,id:"B",addEffect(){},teleport(){}};
 const world={getAllPlayers(){return[player,other];}};
 return{world,player,dimension,spawned,given,effects,blocks,actions};
}

const results={};
after(()=>{
 const sourceHash=crypto.createHash("sha256").update(fs.readFileSync("src/events/registry.js")).update(fs.readFileSync("src/runtime/operations.js")).update(fs.readFileSync("tests/runtime-events.test.mjs")).digest("hex");
 fs.mkdirSync("evidence",{recursive:true});fs.writeFileSync("evidence/event-results.json",JSON.stringify({sourceHash,results},null,2)+"\n");
});
for(const event of EVENTS){
 test(`operation smoke: ${event.id}`,()=>{try{
  const f=fixture(),bosses=new Map(),tracker={track(id,reward){bosses.set(id,reward);}},op=new EventOperations(f.world,{terrainDestruction:true,pranks:true},tracker);
  const ctx={player:f.player,dimension:f.dimension,location:f.player.location,random:()=>0.5,tier:"chaos"};
  op[event.handler](ctx,event.data);
  const consequence=f.given.length+f.effects.length+f.spawned.length+f.blocks.length+f.actions.length+bosses.size;
  assert.ok(consequence>0,`${event.id} had no observable mock consequence`);
  results[event.id]={status:"PASS"};
 }catch(error){results[event.id]={status:"FAIL",error:String(error)};throw error;}
 });
}

test("Friendship Swap never targets a distant player",()=>{
 const f=fixture(),distant={...f.player,id:"C",location:{x:1000,y:64,z:0},teleport(){throw new Error("distant teleport");}};
 f.world.getAllPlayers=()=>[f.player,distant];const op=new EventOperations(f.world,{pranks:true},{track(){}});
 op.swap({player:f.player,dimension:f.dimension,location:f.player.location},{radius:12});
 assert.equal(f.given.length,1);assert.equal(f.given[0].typeId,"minecraft:potato");
});

test("Pass the Potato ignores other dimensions and distant players",()=>{
 const f=fixture(),distant={...f.player,id:"C",location:{x:1000,y:64,z:0}};
 f.world.getAllPlayers=()=>[f.player,distant];const op=new EventOperations(f.world,{},{});
 op.partnerGift({player:f.player,dimension:f.dimension,location:f.player.location},{item:"minecraft:potato",count:1,radius:12});
 assert.equal(f.given.length,1);assert.equal(f.given[0].typeId,"minecraft:potato");
});
