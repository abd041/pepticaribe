import { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nextDir = path.join(root, ".next");

rmSync(nextDir, { recursive: true, force: true });
console.log("Removed .next cache");
