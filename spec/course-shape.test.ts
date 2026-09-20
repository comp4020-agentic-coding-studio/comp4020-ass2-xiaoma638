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
