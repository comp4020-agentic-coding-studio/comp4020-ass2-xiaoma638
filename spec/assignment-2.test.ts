// The Assignment 2 spec, as tests. Each `describe` below quotes the published
// spec line it answers. They assert the *contract* — what the built site must
// be true of — by reading the generated API and the built pages, so they
// survive a change of components, styling or page structure.
//
// The spec lines no test can hold are named in PROCESS.md, not here: whether
// the course is niche, whether the twelve weeks cohere, and whether the site
// works at both marking viewports.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string; startDate: string; endDate: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string): ApiNode[] => api.nodes.filter((node) => node.type === type);

// The three digits this repo was provisioned with. No other course in the
// cohort has them, so they are the one part of the code that is not a choice.
const ALLOCATED_DIGITS = "805";
const TEACHING_WEEKS = 12;

describe("a course under this repo's allocated SLOP code", () => {
  it("keeps the three digits the repo arrived with", () => {
    expect(api.course.code).toMatch(/^SLOP[12468]\d{3}$/);
    expect(api.course.code.slice(-3)).toBe(ALLOCATED_DIGITS);
  });
});

describe("running across twelve dated teaching weeks", () => {
  const scheduled = [...nodesOfType("sessions"), ...nodesOfType("lectures")];

  it("puts dated teaching material in each of the twelve weeks", () => {
    const weeks = new Set(
      scheduled
        .filter((node) => typeof node.meta?.date === "string")
        .map((node) => node.meta?.week),
    );
    const missing = Array.from({ length: TEACHING_WEEKS }, (_, i) => i + 1).filter(
      (week) => !weeks.has(week),
    );
    expect(missing, `no dated session or lecture in week ${missing.join(", ")}`).toEqual([]);
  });

  it("runs no further than twelve weeks", () => {
    const strays = scheduled.filter((node) => {
      const week = node.meta?.week;
      return typeof week === "number" && (week < 1 || week > TEACHING_WEEKS);
    });
    expect(strays.map((node) => node.id), "teaching week outside 1–12").toEqual([]);
  });
});

describe("at least one lecture carries a real deck, linked from its page", () => {
  const lecturesWithSlides = nodesOfType("lectures").filter(
    (node) => typeof node.meta?.slides === "string",
  );

  it("has a lecture that names a deck", () => {
    expect(lecturesWithSlides.length).toBeGreaterThan(0);
  });

  it("builds every deck it names, and links it from the lecture's own page", () => {
    for (const lecture of lecturesWithSlides) {
      const slides = String(lecture.meta?.slides);
      const deck = slides.replace(/^.*\/decks\//, "").replace(/\/$/, "");

      const built = resolve("dist/decks", deck, "index.html");
      expect(existsSync(built), `${lecture.id} names /decks/${deck}/, which didn't build`).toBe(
        true,
      );

      const slug = lecture.id.split("/").at(-1);
      const page = resolve("dist/lectures", String(slug), "index.html");
      expect(existsSync(page), `${lecture.id} has no built page`).toBe(true);
      const html = readFileSync(page, "utf8");
      expect(
        html.includes(`/decks/${deck}/`),
        `${lecture.id}'s page doesn't link its deck`,
      ).toBe(true);
    }
  });

  it("ships a deck with slides on it, not an empty shell", () => {
    const [first] = lecturesWithSlides;
    const deck = String(first?.meta?.slides).replace(/^.*\/decks\//, "").replace(/\/$/, "");
    const html = readFileSync(resolve("dist/decks", deck, "index.html"), "utf8");
    const slides = html.match(/<section/g)?.length ?? 0;
    expect(slides, `/decks/${deck}/ has ${slides} slide(s)`).toBeGreaterThanOrEqual(5);
  });
});

describe("assessment that adds up to 100%", () => {
  const assessments = nodesOfType("assessments");

  it("has assessment to weigh", () => {
    expect(assessments.length).toBeGreaterThan(0);
  });

  it("sums every assessment weight to exactly 100", () => {
    const weights = assessments.map((node) => {
      expect(typeof node.meta?.weight, `${node.id} carries no weight`).toBe("number");
      return Number(node.meta?.weight);
    });
    expect(weights.reduce((total, weight) => total + weight, 0)).toBe(100);
  });

  it("gives every assessment a due date inside the teaching period", () => {
    // data-integrity.test.ts checks this across all dated material; repeated
    // here because an assessment with no due date is a promise to a student
    // that the site fails to keep.
    for (const node of assessments) {
      const due = String(node.meta?.due).slice(0, 10);
      expect(due, `${node.id} has no due date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(due >= api.course.startDate && due <= api.course.endDate).toBe(true);
    }
  });
});
