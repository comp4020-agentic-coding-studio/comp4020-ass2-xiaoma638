// Fetches every reading URL the site sets and records the result. The site's
// build does NOT check external links -- astro-theme-university passes
// `checkExternalLinks: false` to the checker -- so this is the mechanism behind
// the course's no-fabricated-references rule, and it is deliberately manual:
// a network check inside `pnpm check` would make the suite fail on a rate limit
// rather than on a mistake.
//
//   node scripts/verify-readings.mjs        # re-check and rewrite the manifest
//
// The manifest is committed. `spec/readings.test.ts` asserts that every reading
// on the built site appears in it with a 2xx, so adding a reading without
// checking it turns the suite red.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MANIFEST = "docs/verified-readings.tsv";
const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8"));

const readings = new Map();
for (const node of api.nodes) {
  for (const reading of node.meta?.readings ?? []) {
    if (!readings.has(reading.url)) readings.set(reading.url, reading.title);
  }
}

const today = new Date().toISOString().slice(0, 10);
const rows = [];
for (const [url, title] of readings) {
  let status = "ERR";
  try {
    // A HEAD is refused by enough of these hosts to be useless; a GET with a
    // normal UA is what a reader's browser does.
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (SLOP2805 reading check)" },
      signal: AbortSignal.timeout(25000),
    });
    status = String(res.status);
  } catch (error) {
    status = `ERR ${error.name}`;
  }
  console.log(`${status.padEnd(4)} ${url}`);
  rows.push([status, today, url, title].join("\t"));
}

writeFileSync(
  MANIFEST,
  ["# status\tchecked\turl\ttitle", ...rows.sort()].join("\n") + "\n",
);
console.log(`\n${rows.length} readings recorded in ${MANIFEST}`);
