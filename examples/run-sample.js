import { readFileSync } from "node:fs";
import { cleanLeads } from "../src/lib.js";

const leads = JSON.parse(readFileSync(new URL("./sample-leads.json", import.meta.url)));
console.log(JSON.stringify(cleanLeads(leads), null, 2));
