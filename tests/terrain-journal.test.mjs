import test from "node:test";
import assert from "node:assert/strict";
import { TerrainJournal } from "../src/core/terrain-journal.js";
const record=id=>({id,dimension:"overworld",location:{x:0,y:64,z:0},eventType:"minecraft:cobweb",oldType:"minecraft:stone",oldStates:{}});
test("temporary terrain records survive reload and are removed after restoration",()=>{
 let raw;const write=value=>{raw=value;},read=()=>raw;
 const first=new TerrainJournal(read,write);first.add([record("a")]);
 const loaded=new TerrainJournal(read,write);assert.equal(loaded.records.length,1);loaded.remove(["a"]);assert.equal(new TerrainJournal(read,write).records.length,0);
});
test("journal refuses excess work before block edits",()=>{
 const journal=new TerrainJournal(()=>undefined,()=>{},1);assert.equal(journal.canFit(2),false);assert.throws(()=>journal.add([record("a"),record("b")]),/full/);
});
test("malformed journal entries are discarded without affecting valid entries",()=>{
 const journal=new TerrainJournal(()=>JSON.stringify({records:[null,record("good"),{id:4}]}),()=>{});assert.deepEqual(journal.records.map(r=>r.id),["good"]);
});
