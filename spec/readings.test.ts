// Rule 6 of the course's content rules: no fabricated references. The build
// cannot help here --- the theme disables external link checking --- so the
// mechanism is a committed manifest produced by `node scripts/verify-readings.mjs`
// and this test, which fails if the site sets a reading the manifest does not
// vouch for.
//
// It deliberately does no network I/O: a suite that fails on someone else's
// rate limit teaches you to ignore it.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: { readings?: { url: string; title: string; source: string; why: string }[] };
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as {
  nodes: ApiNode[];
};
const MANIFEST = resolve("docs/verified-readings.tsv");

const onSite = api.nodes.flatMap((node) =>
  (node.meta?.readings ?? []).map((reading) => ({ ...reading, node: node.id })),
);

const verified = new Map<string, string>();
if (existsSync(MANIFEST)) {
  for (const line of readFileSync(MANIFEST, "utf8").split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const [status, , url] = line.split("\t");
    if (url) verified.set(url, status);
  }
}

describe("every reading the course sets has been checked", () => {
  it("has a manifest", () => {
    expect(existsSync(MANIFEST), `${MANIFEST} missing — run node scripts/verify-readings.mjs`).toBe(
      true,
    );
  });

  it("vouches for every URL on the site, with a 2xx", () => {
    const problems = onSite
      .filter(({ url }) => !/^2\d\d$/.test(verified.get(url) ?? ""))
      .map(({ node, url }) => `${node}: ${url} → ${verified.get(url) ?? "not in manifest"}`);
    expect([...new Set(problems)]).toEqual([]);
  });
});

describe("a reading says what it is for", () => {
  it("names a title, a source and a reason", () => {
    const thin = onSite
      .filter((r) => !r.title?.trim() || !r.source?.trim() || (r.why ?? "").trim().length < 40)
      .map((r) => `${r.node}: ${r.url}`);
    expect(thin).toEqual([]);
  });

  it("sets readings in at least ten of the twelve weeks", () => {
    const weeks = new Set(
      api.nodes
        .filter((n) => n.type === "sessions" && (n.meta?.readings ?? []).length > 0)
        .map((n) => n.id),
    );
    expect(weeks.size).toBeGreaterThanOrEqual(10);
  });
});
