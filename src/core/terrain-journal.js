import { encodeState, decodeState } from "./persistence.js";

/** Reload-safe journal for temporary block edits. Capacity is deliberately
 * bounded to fit one Bedrock dynamic-property string. */
export class TerrainJournal {
  constructor(read, write, capacity = 64) { this.read=read;this.write=write;this.capacity=capacity;this.reload(); }
  reload(){const decoded=decodeState(this.read(),{}),saved=decoded&&typeof decoded==="object"?decoded:{};this.records=Array.isArray(saved.records)?saved.records.filter(r=>r&&typeof r.id==="string"&&typeof r.eventType==="string"&&r.location&&typeof r.oldType==="string").slice(-this.capacity):[];}
  save(){this.write(encodeState({version:1,records:this.records}));}
  canFit(count){return this.records.length+count<=this.capacity;}
  add(records){if(!this.canFit(records.length))throw new Error("Temporary terrain journal is full");this.records.push(...records);this.save();}
  remove(ids){const remove=new Set(ids);this.records=this.records.filter(r=>!remove.has(r.id));this.save();}
}
