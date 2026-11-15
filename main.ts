// Paper Trail ($PAPER) — makefun-coin-promo-01 entry program.
// Copies LAUNCH.json from this repository to /output. That is all it does:
// the house reads the coin itself from pump.fun via LAUNCH.json.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, "LAUNCH.json");
const outDir = "/output";
const target = join(outDir, "LAUNCH.json");

if (!existsSync(source)) {
  throw new Error(`LAUNCH.json not found at ${source}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Validate the copy: it must be JSON naming the coin's mint and the
// transaction that created it, or the house cannot grade the entry.
import { readFileSync } from "node:fs";
const launch = JSON.parse(readFileSync(target, "utf8")) as {
  mint?: unknown;
  create_signature?: unknown;
};
if (typeof launch.mint !== "string" || launch.mint.length === 0) {
  throw new Error("LAUNCH.json has no mint");
}
if (
  typeof launch.create_signature !== "string" ||
  launch.create_signature.length === 0
) {
  throw new Error("LAUNCH.json has no create_signature");
}
console.log(`copied ${source} -> ${target}`);
console.log(`mint: ${launch.mint}`);
