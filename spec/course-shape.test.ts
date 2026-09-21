// The promises this course makes that the platform cannot check for me.
//
// `assignment-2.test.ts` holds the published spec: twelve dated weeks, a real
// deck, weights summing to 100. These are different — they are the course
// design decisions I made and then decided had to stay true. Each one exists
// because it is a way this particular site could rot while every other check
// stayed green.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  spec?: string[];
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { startDate: string; endDate: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string): ApiNode[] => api.nodes.filter((n) => n.type === type);

const OUTCOMES = ["LO1", "LO2", "LO3", "LO4"] as const;
const studios = nodesOfType("sessions");
const assessments = nodesOfType("assessments");

const outcomesOf = (node: ApiNode): string[] =>
  Array.isArray(node.meta?.outcomes) ? (node.meta.outcomes as string[]) : [];
const dateOf = (node: ApiNode): string =>
  String(node.meta?.date ?? node.meta?.due).slice(0, 10);

// ---------------------------------------------------------------------------
// Nothing is assessed before it is taught.
//
// This is the single course-design rule I most wanted to be unable to break by
// accident. Moving one assessment earlier, or one studio later, silently
// creates a task marked on material students have not met yet — and no other
// check in the roster can see it. Publishing a standard early does not count
// as teaching it, which is why this reads studio dates and not announcements.
// ---------------------------------------------------------------------------
describe("nothing is assessed before it is taught", () => {
  it("gives every assessment at least one outcome", () => {
    for (const assessment of assessments) {
      expect(outcomesOf(assessment).length, `${assessment.id} declares no outcomes`).toBeGreaterThan(0);
    }
  });

  it("teaches each outcome in a studio dated before the assessment that carries it", () => {
    const problems: string[] = [];

    for (const assessment of assessments) {
      const due = dateOf(assessment);
      for (const outcome of outcomesOf(assessment)) {
        const taughtBy = studios
          .filter((studio) => outcomesOf(studio).includes(outcome))
          .map(dateOf)
          .sort();
        const earliest = taughtBy.at(0);

        if (!earliest) {
          problems.push(`${assessment.id} assesses ${outcome}, which no studio teaches`);
        } else if (earliest >= due) {
          problems.push(
            `${assessment.id} is due ${due} and assesses ${outcome}, first taught ${earliest}`,
          );
        }
      }
    }

    expect(problems).toEqual([]);
  });
});

describe("every outcome is both taught and assessed", () => {
  it.each(OUTCOMES)("%s is taught in at least one studio", (outcome) => {
    expect(studios.filter((s) => outcomesOf(s).includes(outcome)).map((s) => s.id).length)
      .toBeGreaterThan(0);
  });

  it.each(OUTCOMES)("%s is assessed by at least one assessment", (outcome) => {
    expect(assessments.filter((a) => outcomesOf(a).includes(outcome)).map((a) => a.id).length)
      .toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Twelve weeks that repeat one another is the failure this brief names by
// name. These two are the cheapest mechanical guard against it: one studio per
// week, and no two weeks asking the same question.
// ---------------------------------------------------------------------------
describe("twelve studios that do not repeat each other", () => {
  it("runs exactly one studio in each of the twelve weeks", () => {
    const byWeek = new Map<number, string[]>();
    for (const studio of studios) {
      const week = Number(studio.meta?.week);
      byWeek.set(week, [...(byWeek.get(week) ?? []), studio.id]);
    }
    const wrong = Array.from({ length: 12 }, (_, i) => i + 1)
      .map((week) => [week, byWeek.get(week) ?? []] as const)
      .filter(([, ids]) => ids.length !== 1);
    expect(wrong.map(([week, ids]) => `week ${week}: ${ids.length} studios`)).toEqual([]);
  });

  it("numbers each studio's slug for the week it runs in", () => {
    const mismatched = studios.filter((studio) => {
      const slug = studio.id.split("/").at(-1) ?? "";
      return Number(slug.slice(0, 2)) !== Number(studio.meta?.week);
    });
    expect(mismatched.map((s) => s.id)).toEqual([]);
  });

  it("asks a different question every week", () => {
    const questions = studios.map((studio) => String(studio.meta?.question ?? "").trim());
    expect(questions.filter((q) => q === "")).toEqual([]);
    expect(new Set(questions).size, "two studios ask the same question").toBe(studios.length);
  });
});

// ---------------------------------------------------------------------------
// The course's own rule, applied to the course's own pages: assert no more
// than your evidence supports. Every studio has to say what its method cannot
// establish. This is the anti-slop lock — it is the section an agent writing
// "content-shaped chunks" will not produce unprompted, so its absence is the
// earliest signal a week has been filled rather than designed.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// The studio page shape (CLAUDE.md). These four sections are the ones that
// vanish first when a page is filled rather than written, so their presence is
// checked on the rendered page rather than trusted.
// ---------------------------------------------------------------------------
describe("every studio page carries the sections a week is made of", () => {
  const pageOf = (studio: ApiNode): string => {
    const slug = studio.id.split("/").at(-1) ?? "";
    return readFileSync(resolve("dist/sessions", slug, "index.html"), "utf8");
  };

  const sections: [string, RegExp][] = [
    ["observable outcomes", /by the end of this week/i],
    ["work between studios", /before next week|there is no next week/i],
    ["a reading list", /<h2[^>]*>\s*Reading\s*<\/h2>|No reading\./i],
  ];

  for (const [label, pattern] of sections) {
    it(`states ${label}`, () => {
      const missing = studios.filter((studio) => !pattern.test(pageOf(studio)));
      expect(missing.map((s) => s.id)).toEqual([]);
    });
  }

  it("sizes the work between studios in hours", () => {
    // "About two hours" rather than "some reading" --- a week that cannot say
    // how long its homework takes has not been planned.
    const vague = studios.filter((studio) => {
      const html = pageOf(studio);
      if (/there is no next week/i.test(html)) return false;
      return !/about (one|two|three|four|two to three|2|3) ?(to \w+)? ?hours?/i.test(html);
    });
    expect(vague.map((s) => s.id)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Content rule 4 and rule 5, on the one page that displays a live percentage.
// The simulator is the site practising what the course teaches: its 100% has a
// stated meaning, and its data says it is invented.
// ---------------------------------------------------------------------------
describe("the progress simulator holds itself to the course's rules", () => {
  const html = readFileSync(resolve("dist/simulator/index.html"), "utf8");

  it("prints the completion condition the bar's 100% corresponds to", () => {
    expect(/reaches 100% only when a <code[^>]*>committed<\/code> event/i.test(html)).toBe(true);
  });

  it("labels its data as simulated", () => {
    expect(/Everything here is simulated/i.test(html)).toBe(true);
  });

  it("names the denominator its percentage counts", () => {
    expect(/work units across four stages/i.test(html)).toBe(true);
  });
});

describe("every studio names its own limits", () => {
  it("carries a 'what this week cannot tell you' section", () => {
    // Read the rendered page rather than the source: the index API carries no
    // body, and what a reader gets is the page anyway.
    const missing = studios.filter((studio) => {
      const slug = studio.id.split("/").at(-1) ?? "";
      const html = readFileSync(resolve("dist/sessions", slug, "index.html"), "utf8");
      return !/what this week cannot tell you/i.test(html);
    });
    expect(missing.map((s) => s.id)).toEqual([]);
  });

  it("declares at least two checkable spec lines", () => {
    const thin = studios.filter(
      (studio) => !Array.isArray(studio.spec) || studio.spec.length < 2,
    );
    expect(thin.map((s) => s.id)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// A week page has to be followable on its own: a student who never attends
// still needs to know what they start with, what finished looks like, and what
// usually goes wrong. These three sections were added after a read-through
// found week pages that said "improve accessibility" without showing a defect.
// ---------------------------------------------------------------------------
describe("every studio page can be worked from without being in the room", () => {
  const pageOf = (studio: ApiNode): string => {
    const slug = studio.id.split("/").at(-1) ?? "";
    return readFileSync(resolve("dist/sessions", slug, "index.html"), "utf8");
  };

  const sections: [string, RegExp][] = [
    ["the materials you start with", /what you start with/i],
    ["a worked example", /a worked example/i],
    ["a named common error", /the mistake to expect/i],
    ["a link to this week's slides", /view this week['\u2019]s slides/i],
  ];

  for (const [label, pattern] of sections) {
    it(`names ${label}`, () => {
      expect(studios.filter((s) => !pattern.test(pageOf(s))).map((s) => s.id)).toEqual([]);
    });
  }

  it("shows the week's own deck, not another week's", () => {
    const wrong = studios.filter((studio) => {
      const week = String(studio.meta?.week).padStart(2, "0");
      return !pageOf(studio).includes(`/decks/week-${week}/`);
    });
    expect(wrong.map((s) => s.id)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// The three assessments have to read as an accumulation rather than three
// separate tasks, and A3 has to say where the marks above "it works" are.
// ---------------------------------------------------------------------------
describe("the assessments say how they build on each other", () => {
  const html = (slug: string) =>
    readFileSync(resolve("dist/assessments", slug, "index.html"), "utf8");
  const slug = (n: ApiNode) => n.id.split("/").at(-1) as string;
  const assessments = nodesOfType("assessments");

  it("says, on every brief, what it hands on or what it inherits", () => {
    const silent = assessments.filter((a) => {
      const body = html(slug(a));
      return !/Where this goes/i.test(body) && !/gives? you/i.test(body);
    });
    expect(silent.map((a) => a.id)).toEqual([]);
  });

  it("states that work is not resubmitted", () => {
    const silent = assessments.filter((a) => !/resubmi/i.test(html(slug(a))));
    expect(silent.map((a) => a.id)).toEqual([]);
  });

  it("gives the final assessment a meets-the-requirement / argues-it-well contrast", () => {
    const final = assessments.reduce((latest, a) =>
      String(a.meta?.due) > String(latest.meta?.due) ? a : latest,
    );
    const body = html(slug(final));
    expect(/Meets the requirement/i.test(body)).toBe(true);
    expect(/Argues it well/i.test(body)).toBe(true);
    // one row per marked criterion, so no criterion is left without guidance
    const criteria = (body.match(/<td[^>]*>\d{1,3}%<\/td>/g) ?? []).length;
    // The match begins inside the header row, so every <tr> it finds is a body
    // row — one per criterion.
    const contrastRows = (body.match(/Argues it well[\s\S]*?<\/table>/)?.[0].match(/<tr>/g) ?? []).length;
    expect(contrastRows, "a contrast row for every criterion").toBeGreaterThanOrEqual(criteria);
  });
});

// ---------------------------------------------------------------------------
// The lecture pages were the thinnest teaching pages on the site once the week
// pages grew. These four sections are what was added, and the boundary rule
// still holds: a lecture gains an example *of the concept* and a statement of
// what it cannot settle, never an exercise — that belongs to the studio.
// ---------------------------------------------------------------------------
describe("every lecture page carries its concept beyond a summary", () => {
  const lectures = nodesOfType("lectures");
  const pageOf = (l: ApiNode) =>
    readFileSync(resolve("dist/lectures", l.id.split("/").at(-1) ?? "", "index.html"), "utf8");

  const sections: [string, RegExp][] = [
    ["what it carries", /what this lecture carries/i],
    // Week 1 rests on the prerequisites rather than on an earlier week, and
    // says so under "What it assumes". Either answers the same question.
    ["what it rests on", /what it builds on|what it assumes/i],
    ["where it lands", /what it sets up/i],
    ["a worked example of the concept", /a worked example/i],
    ["what it cannot settle", /cannot settle/i],
    ["a way to catch up", /if you miss the hour/i],
  ];

  for (const [label, pattern] of sections) {
    it(`states ${label}`, () => {
      expect(lectures.filter((l) => !pattern.test(pageOf(l))).map((l) => l.id)).toEqual([]);
    });
  }

  it("links its own deck", () => {
    const wrong = lectures.filter((l) => {
      const week = String(l.meta?.week).padStart(2, "0");
      return !pageOf(l).includes(`/decks/week-${week}/`);
    });
    expect(wrong.map((l) => l.id)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Every brief carries the same two things every week page carries, so a reader
// does not meet two densities of material in one course.
// ---------------------------------------------------------------------------
describe("every assessment brief shows one and warns about one", () => {
  const assessments = nodesOfType("assessments");
  const pageOf = (a: ApiNode) =>
    readFileSync(resolve("dist/assessments", a.id.split("/").at(-1) ?? "", "index.html"), "utf8");

  it("carries a worked example", () => {
    expect(assessments.filter((a) => !/a worked example/i.test(pageOf(a))).map((a) => a.id)).toEqual([]);
  });

  it("names the mistake to expect", () => {
    expect(assessments.filter((a) => !/the mistake to expect/i.test(pageOf(a))).map((a) => a.id)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// The two index pages were one line of leftover scaffolding each. An index that
// only renders a grid tells a reader nothing the grid did not.
// ---------------------------------------------------------------------------
describe("index pages say something the listing does not", () => {
  const words = (route: string) =>
    readFileSync(resolve("dist", route, "index.html"), "utf8")
      .replace(/<(script|style|svg|nav|footer|header)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter((w) => /[A-Za-z0-9]/.test(w)).length;

  it.each(["assessments", "people", "lectures", "sessions", "readings", "glossary"])(
    "/%s/ carries more than a bare listing",
    (route) => {
      expect(words(route)).toBeGreaterThan(200);
    },
  );
});
