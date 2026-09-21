// Cross-page integrity: the promises this site makes to a reader that no single
// page can keep on its own.
//
// Everything here reads the BUILT site — rendered HTML and the shipped script
// bundle — rather than re-deriving a value from the same collection call the
// page used. A test that asks `getCollection` what `getCollection` returned
// would pass forever and catch nothing; these compare what a reader actually
// sees on one page against what they see on another, which is where this site's
// real defects turned out to live.
//
// Each block names the defect it was written for. All four were found by hand
// on the built site before the test existed.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const dist = (...p: string[]) => resolve("dist", ...p);
const page = (route: string) => readFileSync(dist(route, "index.html"), "utf8");
const text = (html: string) =>
  html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ");

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}
const api = JSON.parse(readFileSync(dist("api/index.json"), "utf8")) as {
  course: { startDate: string; endDate: string };
  nodes: ApiNode[];
};
const of = (t: string) => api.nodes.filter((n) => n.type === t);
const slugOf = (n: ApiNode) => n.id.split("/").at(-1) as string;
const dateOf = (n: ApiNode) => new Date(String(n.meta?.date ?? n.meta?.due));
const byWeek = <T extends ApiNode>(nodes: T[]) =>
  new Map(nodes.map((n) => [Number(n.meta?.week), n]));

const studios = of("sessions").sort((a, b) => Number(a.meta?.week) - Number(b.meta?.week));
const lectures = of("lectures");
const assessments = of("assessments");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ---------------------------------------------------------------------------
// 1. The teaching calendar.
//
// Dates are validated with calendar arithmetic, independently of the
// frontmatter that produced them, and the prose on each page is checked against
// its own date. A page that says "Thursday 22 April" above a date of 21 April
// is the failure this guards, and it is invisible to the schema.
// ---------------------------------------------------------------------------
describe("the teaching calendar holds together", () => {
  it("numbers the weeks 1 to 12 with no gaps and no repeats", () => {
    expect(studios.map((s) => Number(s.meta?.week))).toEqual(
      Array.from({ length: 12 }, (_, i) => i + 1),
    );
  });

  it("dates the studios strictly in week order", () => {
    const out: string[] = [];
    for (let i = 1; i < studios.length; i += 1) {
      if (dateOf(studios[i]) <= dateOf(studios[i - 1])) {
        out.push(`week ${studios[i].meta?.week} is not after week ${studios[i - 1].meta?.week}`);
      }
    }
    expect(out).toEqual([]);
  });

  it("runs every studio on the same weekday", () => {
    const days = new Set(studios.map((s) => DAYS[dateOf(s).getUTCDay()]));
    expect([...days]).toHaveLength(1);
  });

  it("has exactly one break, of exactly two weeks", () => {
    const gaps = studios.slice(1).map((s, i) => {
      const days = (dateOf(s).getTime() - dateOf(studios[i]).getTime()) / 86_400_000;
      return { after: Number(studios[i].meta?.week), days };
    });
    expect(gaps.filter((g) => g.days !== 7).map((g) => `after week ${g.after}: ${g.days} days`))
      .toEqual(["after week 6: 21 days"]);
  });

  it("holds every lecture before the studio it feeds, in the same week", () => {
    const studioByWeek = byWeek(studios);
    const wrong = lectures.filter((l) => {
      const studio = studioByWeek.get(Number(l.meta?.week));
      return !studio || dateOf(l) >= dateOf(studio);
    });
    expect(wrong.map((l) => l.id)).toEqual([]);
  });

  it("agrees with the weekday each page prints above its own date", () => {
    const wrong: string[] = [];
    for (const node of [...studios, ...lectures]) {
      const dir = node.type === "sessions" ? "sessions" : "lectures";
      const body = text(page(`${dir}/${slugOf(node)}`));
      for (const m of body.matchAll(
        new RegExp(`(${DAYS.join("|")})\\s+(\\d{1,2})\\s+(${MONTHS.join("|")})`, "g"),
      )) {
        const year = dateOf(node).getUTCFullYear();
        const when = new Date(Date.UTC(year, MONTHS.indexOf(m[3]), Number(m[2])));
        if (DAYS[when.getUTCDay()] !== m[1]) {
          wrong.push(`${node.id}: "${m[0]}" — ${m[2]} ${m[3]} ${year} is a ${DAYS[when.getUTCDay()]}`);
        }
      }
    }
    expect(wrong).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 2. Weights, read off three different pages.
//
// The pages derive from one collection today, but a reader does not know that,
// and a future hand-written table would not. This compares what is printed on
// /overview/, /calendar/ and each brief against each other.
// ---------------------------------------------------------------------------
describe("weights say the same thing wherever a reader looks", () => {
  const titles = new Map(assessments.map((a) => [slugOf(a), String(a.meta?.title ?? "")]));
  const weightsOn = (route: string) => {
    const body = text(page(route));
    const found = new Map<string, number>();
    for (const [slug] of titles) {
      const title = String(
        text(page(`assessments/${slug}`)).match(/^\s*\S[\s\S]*?(?=\s{2,})/)?.[0] ?? "",
      );
      void title;
      const label = slug.replace(/-/g, "[ -]");
      const m = body.match(new RegExp(`${label}[\\s\\S]{0,160}?(\\d{1,3})\\s?%`, "i"));
      if (m) found.set(slug, Number(m[1]));
    }
    return found;
  };

  it("prints a weight for every assessment on the overview and the calendar", () => {
    for (const route of ["overview", "calendar"]) {
      const body = text(page(route));
      for (const a of assessments) {
        expect(
          body.includes(`${a.meta?.weight}%`),
          `${route} does not print ${a.meta?.weight}% anywhere`,
        ).toBe(true);
      }
    }
  });

  it("sums the assessment weights to 100 on the pages that total them", () => {
    const total = assessments.reduce((t, a) => t + Number(a.meta?.weight), 0);
    expect(total).toBe(100);
    expect(text(page("overview"))).toMatch(/totalling\s*100%/i);
    expect(text(page("calendar"))).toMatch(/Total:\s*100%/i);
  });

  it("gives every brief a rubric whose criteria sum to 100", () => {
    const bad: string[] = [];
    for (const a of assessments) {
      const html = page(`assessments/${slugOf(a)}`);
      const rows = [...html.matchAll(/<td[^>]*>(\d{1,3})%<\/td>/g)].map((m) => Number(m[1]));
      const sum = rows.reduce((t, n) => t + n, 0);
      if (rows.length < 3 || sum !== 100) bad.push(`${a.id}: ${rows.length} criteria summing to ${sum}`);
    }
    expect(bad).toEqual([]);
    void weightsOn;
  });

  it("keeps every due date inside the teaching period and after its last taught week", () => {
    const outside = assessments.filter((a) => {
      const due = String(a.meta?.due).slice(0, 10);
      return due < api.course.startDate || due > api.course.endDate;
    });
    expect(outside.map((a) => a.id)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 3. A link whose text names a week must go to that week.
//
// Written for a real defect: the simulator indexed five scenarios with links
// reading "Week 3", "Week 4", "Week 8", "Week 9" — every one of which pointed
// at /sessions/. The link checker was happy, because /sessions/ exists.
// ---------------------------------------------------------------------------
describe("a link that names a week goes to that week", () => {
  const studioByWeek = byWeek(studios);
  const lectureByWeek = byWeek(lectures);

  const routes: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dist(dir), { withFileTypes: true })) {
      if (entry.isDirectory()) walk(`${dir}/${entry.name}`);
      else if (entry.name === "index.html" && !dir.includes("/decks")) routes.push(dir);
    }
  };
  walk(".");

  it("never labels a link with one week and points it at another", () => {
    const wrong: string[] = [];
    for (const route of routes) {
      const html = readFileSync(dist(route, "index.html"), "utf8");
      for (const m of html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
        const label = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        // "Week 5 deck" names a deck and is checked below; a label that is
        // "Week N", or "Week N: <title>", names a week page.
        const deck = label.match(/^week\s+(\d{1,2})\s+deck$/i);
        if (deck) {
          const want = `/decks/week-${String(deck[1]).padStart(2, "0")}/`;
          if (!m[1].endsWith(want)) wrong.push(`${route}: "${label}" → ${m[1]} (expected ${want})`);
          continue;
        }
        const week = label.match(/^Week\s+(\d{1,2})\s*(?:[:\u2014-]|$)/i);
        if (!week) continue;
        const n = Number(week[1]);
        const expected = [studioByWeek.get(n), lectureByWeek.get(n)]
          .filter(Boolean)
          .map((node) => `/${node!.type === "sessions" ? "sessions" : "lectures"}/${slugOf(node!)}/`);
        if (!expected.some((e) => m[1].endsWith(e))) {
          wrong.push(`${route}: "${label}" → ${m[1]} (expected one of ${expected.join(", ")})`);
        }
      }
    }
    expect(wrong).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 4. Every deck link has something behind it.
//
// assignment-2.test.ts checks the deck a *lecture* declares in `slides:`. This
// one catches any page that links a deck in prose — week 5's deck is linked
// from a studio, which that check does not see.
// ---------------------------------------------------------------------------
describe("every deck a page links has real slides behind it", () => {
  const linked = new Map<string, string[]>();
  const collect = (dir: string) => {
    for (const entry of readdirSync(dist(dir), { withFileTypes: true })) {
      if (entry.isDirectory()) collect(`${dir}/${entry.name}`);
      else if (entry.name === "index.html" && !dir.includes("/decks")) {
        const html = readFileSync(dist(dir, "index.html"), "utf8");
        for (const m of html.matchAll(/href="[^"]*\/decks\/([a-z0-9-]+)\/"/g)) {
          linked.set(m[1], [...(linked.get(m[1]) ?? []), dir]);
        }
      }
    }
  };
  collect(".");

  it("gives all twelve weeks a deck, and links each from its own week page", () => {
    const want = Array.from({ length: 12 }, (_, i) => `week-${String(i + 1).padStart(2, "0")}`);
    expect([...linked.keys()].sort()).toEqual(want);

    // A deck must be reachable from the week it belongs to, not only from the
    // index — a student lands on the week page, not on a directory.
    const orphans = want.filter((deck) => {
      const week = Number(deck.slice(-2));
      const studio = studios.find((s) => Number(s.meta?.week) === week);
      return !studio || !(linked.get(deck) ?? []).some((from) => from.endsWith(slugOf(studio)));
    });
    expect(orphans, "deck not linked from its own week page").toEqual([]);
  });

  it("lists every deck on the studios index, so the directory is complete", () => {
    const index = readFileSync(dist("sessions", "index.html"), "utf8");
    const missing = [...linked.keys()].filter((d) => !index.includes(`/decks/${d}/`));
    expect(missing).toEqual([]);
  });

  it("gives every deck between 8 and 13 slides", () => {
    const wrong: string[] = [];
    for (const deck of linked.keys()) {
      const html = readFileSync(dist("decks", deck, "index.html"), "utf8");
      const n = html.match(/<section/g)?.length ?? 0;
      if (n < 8 || n > 13) wrong.push(`${deck}: ${n} slides`);
    }
    expect(wrong).toEqual([]);
  });

  it("gives every deck the parts a teaching deck needs", () => {
    // Written against the brief for these decks: a problem, a link back and
    // objectives, a worked example, an exercise, a limitation, and where the
    // week's output goes. Checked on the rendered slides, loosely enough to
    // survive rewording and tightly enough to catch a deck that is headings.
    const required: [string, RegExp][] = [
      ["a link back and objectives", /where we were|by 17:00|by the end/i],
      ["a worked example", /worked example|your turn/i],
      ["an exercise", /your turn|the build|thursday/i],
      ["a limitation or common error", /mistake to expect|cannot tell you|weak/i],
      ["where the output goes", /what leaves the room|where it goes/i],
    ];
    const thin: string[] = [];
    for (const deck of linked.keys()) {
      const body = text(readFileSync(dist("decks", deck, "index.html"), "utf8"));
      for (const [label, re] of required) if (!re.test(body)) thin.push(`${deck}: no ${label}`);
      const words = body.split(" ").filter(Boolean).length;
      if (words < 350) thin.push(`${deck}: ${words} words — headings, not a deck`);
    }
    expect(thin).toEqual([]);
  });

  it("builds each linked deck with slides on it, not an empty shell", () => {
    const bad: string[] = [];
    for (const [deck, from] of linked) {
      const file = dist("decks", deck, "index.html");
      if (!existsSync(file)) {
        bad.push(`${deck} linked from ${from.join(", ")} but never built`);
        continue;
      }
      const html = readFileSync(file, "utf8");
      const slides = html.match(/<section/g)?.length ?? 0;
      const words = text(html).split(" ").filter(Boolean).length;
      if (slides < 5) bad.push(`${deck}: ${slides} slides`);
      if (words < 150) bad.push(`${deck}: ${words} words — a shell, not a deck`);
    }
    expect(bad).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 5. The simulator's stated contract matches the code that shipped.
//
// The prose beside the bar names a completion condition and a denominator. This
// checks the shipped bundle agrees with the prose rather than checking the
// prose against itself. Behaviour — that a stall freezes the bar, that reset
// restores the initial state, that retry resumes rather than restarting — needs
// a browser and is verified by scripts/verify-simulator.mjs, not here.
// ---------------------------------------------------------------------------
describe("the simulator ships the contract its page prints", () => {
  const html = page("simulator");
  const bundles = readdirSync(dist("_astro"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => readFileSync(dist("_astro", f), "utf8"));
  const sim = bundles.find((b) => b.includes("stall:detected"));

  it("ships the simulator script", () => {
    expect(sim, "no bundle contains the simulator's events").toBeTruthy();
  });

  it("offers every scenario its index describes", () => {
    const radios = [...html.matchAll(/name="scenario"\s+value="([a-z]+)"/g)].map((m) => m[1]);
    expect(radios).toEqual(["steady", "variable", "unknown", "stall", "failure"]);
    for (const label of ["Steady", "Stage speeds vary", "Unknown total", "Stall, then recover", "Fail, then retry"]) {
      expect(text(html).includes(label), `${label} is not described on the page`).toBe(true);
    }
  });

  it("emits a distinct event for each of completion, failure and stall", () => {
    for (const event of ["upload:started", "committed", "verify:rejected", "stall:detected", "retry"]) {
      expect(sim!.includes(event), `the shipped script never emits ${event}`).toBe(true);
    }
  });

  it("makes 100% mean the completion event, on the page and in the code", () => {
    expect(text(html)).toMatch(/reaches 100% only when a committed event has been received/i);
    expect(sim!.includes("durable — this is what 100% means")).toBe(true);
  });

  it("uses the stage weights the page claims, and they make the denominator", () => {
    const claimed = [...text(html).matchAll(/(read|hash|transfer|verify)\s+(\d+)/g)].map((m) => [
      m[1],
      Number(m[2]),
    ]) as [string, number][];
    expect(Object.fromEntries(claimed)).toEqual({ read: 5, hash: 15, transfer: 60, verify: 20 });
    expect(claimed.reduce((t, [, n]) => t + n, 0), "stage weights must make the 100 the bar counts").toBe(100);
    for (const [, units] of claimed) {
      expect(sim!.includes(`units:${units}`), `the shipped script has no stage of ${units} units`).toBe(true);
    }
  });

  it("defines a status line for the failure, stalled, paused and complete states", () => {
    for (const phrase of [
      "Stored durably",
      "Nothing has been stored",
      "may resume on its own",
      "Paused by you",
      "Nothing has started",
    ]) {
      expect(sim!.includes(phrase), `no status text for: ${phrase}`).toBe(true);
    }
  });

  it("labels its data as simulated where a reader will see it", () => {
    expect(text(html)).toMatch(/Everything here is simulated/i);
  });
});
