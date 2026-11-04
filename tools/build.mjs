import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const root = process.cwd();
const probabilityJson = fs.readFileSync(path.join(root, "src/config/probabilities.json"), "utf8");
fs.writeFileSync(path.join(root, "src/config/probabilities.js"), `// Generated from probabilities.json; edit the JSON then run npm run build.\nexport default ${probabilityJson}`);
const destination = path.join(root, "packs/behavior_pack/scripts");
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });
fs.cpSync(path.join(root, "src"), destination, { recursive: true });
function sourceFiles(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?sourceFiles(path.join(directory,entry.name)):[path.join(directory,entry.name)]);}
for(const source of sourceFiles(path.join(root,"src"))){
 const generated=path.join(destination,path.relative(path.join(root,"src"),source));
 if(!fs.existsSync(generated)||!fs.readFileSync(source).equals(fs.readFileSync(generated)))throw new Error(`Generated script parity failed: ${generated}`);
 const tracked=spawnSync("git",["ls-files","--error-unmatch",path.relative(root,generated)],{cwd:root,stdio:"ignore"});
 if(tracked.status!==0)throw new Error(`Generated script is not tracked; stage it before packaging: ${generated}`);
}
const result = spawnSync("python3", ["tools/package.py"], { cwd: root, stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);
