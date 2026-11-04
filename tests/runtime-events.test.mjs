import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { EVENTS } from "../src/events/registry.js";

class ItemStack {
  constructor(id, count=1){this.typeId=id;this.count=count;}
  getComponent(id){return id==="minecraft:enchantable"?{addEnchantment(){}}:undefined;}
}
const system={runTimeout(callback){callback();}};
const source=fs.readFileSync("src/runtime/operations.js","utf8").replace('import { ItemStack, EnchantmentType, system } from "@minecraft/server";',`const ItemStack = globalThis.__ItemStack; const EnchantmentType = class { constructor(id){this.id=id;} }; const system = globalThis.__system;`);
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
  getBlock(location){const b={location,typeId:"minecraft:air",isAir:true,isLiquid:false,isValid:true,setType(id){this.typeId=id;this.isAir=id==="minecraft:air";blocks.push(id);},getComponent(id){return id==="minecraft:inventory"?{container}:undefined;}};return b;}
 };
 const player={id:"A",location:{x:0,y:64,z:0},dimension,getComponent(id){return id==="minecraft:inventory"?{container}:undefined;},addEffect(id){effects.push(id);},playSound(){actions.push("sound");},teleport(){actions.push("teleport");}};
 const other={...player,id:"B",addEffect(){},teleport(){}};
 const world={getAllPlayers(){return[player,other];}};
 return{world,player,dimension,spawned,given,effects,blocks,actions};
}

for(const event of EVENTS){
 test(`operation smoke: ${event.id}`,()=>{
  const f=fixture(),bosses=new Map(),op=new EventOperations(f.world,{terrainDestruction:true,pranks:true},bosses);
  const ctx={player:f.player,dimension:f.dimension,location:f.player.location,random:()=>0.5,tier:"chaos"};
  op[event.handler](ctx,event.data);
  const consequence=f.given.length+f.effects.length+f.spawned.length+f.blocks.length+f.actions.length+bosses.size;
  assert.ok(consequence>0,`${event.id} had no observable mock consequence`);
 });
}
