import fs from "node:fs";
import { EVENTS } from "../src/events/registry.js";
import table from "../src/config/probabilities.json" with { type: "json" };
import { createRandom, selectEvent } from "../src/core/random.js";
const samples=Number(process.argv[2]??200000);if(!Number.isInteger(samples)||samples<10000)throw new Error("Use at least 10000 samples");
const report={samplesPerTier:samples,algorithm:"Mulberry32",unit:"basis points",seedBase:26032026,tiers:{}};
const csv=["tier,event_id,weight_bp,expected_percent,observed_count,observed_percent,delta_percentage_points,z_score"];
for(const [tierIndex,[tier,weights]] of Object.entries(table.tiers).entries()){
 const random=createRandom(report.seedBase+tierIndex),counts=Object.fromEntries(EVENTS.map(e=>[e.id,0]));
 for(let i=0;i<samples;i++)counts[selectEvent(EVENTS,weights,random).id]++;
 const rows=EVENTS.filter(e=>weights[e.id]>0).map(e=>{
  const expected=weights[e.id]/100,observed=counts[e.id]*100/samples,delta=observed-expected,stderr=Math.sqrt(expected*(100-expected)/samples),z=stderr?delta/stderr:0;
  csv.push([tier,e.id,weights[e.id],expected.toFixed(5),counts[e.id],observed.toFixed(5),delta.toFixed(5),z.toFixed(3)].join(","));return{id:e.id,weight:weights[e.id],count:counts[e.id],expectedPercent:expected,observedPercent:observed,z};
 });
 const eligible=rows.length,maxAbsZ=Math.max(...rows.map(r=>Math.abs(r.z))),chiSquare=rows.reduce((s,r)=>s+(r.count-samples*r.weight/10000)**2/(samples*r.weight/10000),0);
 report.tiers[tier]={eligibleEvents:eligible,totalDraws:Object.values(counts).reduce((a,b)=>a+b,0),maxAbsoluteZ:maxAbsZ,chiSquare,degreesOfFreedom:eligible-1,status:maxAbsZ<5?"PASSED":"REVIEW",events:rows};
 console.log(`${tier}: ${samples} draws, ${eligible} eligible, max |z|=${maxAbsZ.toFixed(3)}, chi2=${chiSquare.toFixed(2)} (${report.tiers[tier].status})`);
}
fs.mkdirSync("evidence",{recursive:true});fs.writeFileSync("evidence/probability.json",JSON.stringify(report,null,2)+"\n");fs.writeFileSync("evidence/probability.csv",csv.join("\n")+"\n");
if(Object.values(report.tiers).some(tier=>tier.status!=="PASSED"))process.exitCode=1;
