import { spawnSync } from "node:child_process";
import fs from "node:fs";
const builds=[];
for(let run=1;run<=2;run++){
 const result=spawnSync(process.execPath,["tools/build.mjs"],{cwd:process.cwd(),encoding:"utf8"});
 if(result.status!==0){process.stdout.write(result.stdout);process.stderr.write(result.stderr);process.exit(result.status??1);}
 builds.push(fs.readFileSync("dist/SHA256SUMS.txt","utf8"));
}
const report={status:builds[0]===builds[1]?"PASS":"FAIL",runs:2,sha256:builds[0].trim().split("\n"),comparison:"Two consecutive clean-input builds"};
fs.writeFileSync("evidence/reproducibility.json",JSON.stringify(report,null,2)+"\n");
console.log(`REPRODUCIBILITY ${report.status}: two builds have identical artifact hashes`);
if(report.status!=="PASS")process.exitCode=1;
