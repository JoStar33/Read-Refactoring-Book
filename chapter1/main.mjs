import { statement } from "./1-1";

import invoices from "./invoices.json" assert { type: "json" };
import plays from "./plays.json" assert { type: "json" };

const result = statement(invoices[0], plays);

console.log("\n\n");
console.log(result);
