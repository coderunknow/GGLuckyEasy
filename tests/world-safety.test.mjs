import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
let scheduled;
const source=fs.readFileSync("src/runtime/operations.js","utf8").replace('import { ItemStack, EnchantmentType, BlockPermutation, system } from "@minecraft/server";',`const ItemStack=class{};const EnchantmentType=class{};const BlockPermutation=class{static resolve(id){return{type:{id}};}};const system=globalThis.__safetySystem;`);
globalThis.__safetySystem={runTimeout(callback){scheduled=callback;}};
const {EventOperations,isProtectedType,canRestoreTerrain}=await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
function block(typeId){return{location:{x:0,y:64,z:0},typeId,isAir:typeId==="minecraft:air",isValid:true,getComponent(){return typeId==="minecraft:chest"?{container:{}}:undefined;},getPermutation(){return{type:{id:this.typeId},getAllStates:()=>({})};},setType(id){this.typeId=id;this.isAir=id==="minecraft:air";},setPermutation(p){this.setType(p.type.id);}};}
function context(target){return{player:{},dimension:{id:"overworld",getBlock(){return target;}},location:{x:0,y:64,z:0},random:()=>.5};}

test("temporary terrain does not overwrite a subsequent player edit",()=>{
 const target=block("minecraft:cobweb"),op=new EventOperations({}, {terrainDestruction:true},{});
 op.terrainPatch(context(target),{block:"minecraft:cobweb",radius:0,height:0,seconds:1});
 target.setType("minecraft:stone"); scheduled();
 assert.equal(target.typeId,"minecraft:stone");
});
test("unchanged temporary terrain restores the original permutation",()=>{
 const target=block("minecraft:stone"),op=new EventOperations({}, {terrainDestruction:true},{});
 op.terrainPatch(context(target),{block:"minecraft:cobweb",radius:0,height:0,seconds:1});
 assert.equal(target.typeId,"minecraft:cobweb");scheduled();assert.equal(target.typeId,"minecraft:stone");
});
test("containers and critical blocks are protected from terrain replacement",()=>{
 const target=block("minecraft:chest"),op=new EventOperations({}, {terrainDestruction:true},{});
 op.terrainPatch(context(target),{block:"minecraft:cobweb",radius:0,height:0,seconds:1});
 assert.equal(target.typeId,"minecraft:chest");assert.ok(isProtectedType("minecraft:command_block"));assert.ok(isProtectedType("minecraft:red_shulker_box"));
});
test("restoration requires the event block to still be present",()=>{assert.equal(canRestoreTerrain("minecraft:stone","minecraft:cobweb"),false);});
