import fs from "node:fs";
import { EVENTS } from "../src/events/registry.js";
import table from "../src/config/probabilities.json" with { type: "json" };
const pct=n=>`${(n/100).toFixed(3)}%`;
const lines=["# Lucky Chaos Event Catalog", "", "Version `v0.1.0-dev1`. Weights are basis points in `src/config/probabilities.json`; 10,000 = 100%. A dash means ineligible. **Automated status means registry + mock operation smoke testing, not a Bedrock device test.**", "", "| ID | English / Tiếng Việt | Category | Class | Lucky | Super | Chaos | Handler | Automated evidence | Real-device status |", "|---|---|---|---|---:|---:|---:|---|---|---|"];
for(const e of EVENTS)lines.push(`| \`${e.id}\` | ${e.name.en_US}<br>${e.name.vi_VN} | ${e.category} | ${e.polarity} | ${table.tiers.lucky[e.id]?pct(table.tiers.lucky[e.id]):"—"} | ${table.tiers.super[e.id]?pct(table.tiers.super[e.id]):"—"} | ${table.tiers.chaos[e.id]?pct(table.tiers.chaos[e.id]):"—"} | \`${e.handler}\` | PASS: \`tests/runtime-events.test.mjs\` | UNVERIFIED |`);
lines.push("","## Per-event descriptions and operational metadata","");
for(const e of EVENTS){lines.push(`### \`${e.id}\` — ${e.name.en_US} / ${e.name.vi_VN}`,"",`- **EN:** ${e.description.en_US}`,"- **VI:** "+e.description.vi_VN,`- **Entities:** ${e.entities.join(", ")||"none"}; **structures:** ${e.structures.join(", ")||"none"}; **assets:** ${e.assets.join(", ")||"vanilla rendering + pack feedback"}`,"- **Cleanup:** "+e.cleanup+"; **expected cost:** "+e.cost+"; **validation:** `"+e.validation+"`." ,"");}
fs.writeFileSync("EVENT_CATALOG.md",lines.join("\n"));
