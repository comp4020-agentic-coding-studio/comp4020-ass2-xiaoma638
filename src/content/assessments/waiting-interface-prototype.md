---
title: Waiting Interface Prototype
description:
  The first half of the semester, shipped — a determinate bar, an honest
  estimate, an indeterminate case with no fractions, and an accessibility audit
  that records its failures.
week: 8
due: 2027-04-27T10:00:00+10:00
weight: 30
draft: true
marking:
  mode: weighted
  criteria:
    - name: Behaviour across the four conditions
      weight: 35
    - name: Evidence discipline
      weight: 25
    - name: Accessibility audit
      weight: 25
    - name: Both viewports
      weight: 15
spec:
  - all four conditions are reproducible by a marker using the exposed simulator controls
  - the unknown-size condition shows no fractional reading anywhere, including the document title
  - the shipped estimator, its rounding rule and its refresh interval are stated on screen
  - the audit sheet is complete, and a line recorded as a pass survives a marker trying to break it
related:
  - sessions/07-without-the-animation
  - sessions/04-no-idea-how-long
  - sessions/05-why-the-estimate-jumps
  - lectures/week-07
---

## The brief

> Ship the interface you have been building since week 2, and audit it against
> the standard published in week 2.

## Why it is due on the Tuesday of week 8

The accessibility work is taught on Tuesday 20 April
([lecture](/lectures/week-07/)) and practised in the
[week 7 studio](/sessions/07-without-the-animation/) on Thursday 22 April, with
tutors in the room. The deadline is the following Tuesday at 10:00 — five days
later, across a weekend and a public holiday.

The Waiting Interface Checklist v0 was published in
[week 2](/sessions/02-what-counts-as-done/), but publishing a standard is not
teaching it, and it carries no marks before now. The gap between the last
teaching and this deadline is what makes the audit criterion fair.

There is no class on the day this is due. The
[week 8 studio](/sessions/08-stuck-timed-out-disconnected/) is on the Thursday
and is not shortened for it.

## What you submit

The deployed prototype, plus an `/audit/` page in the repo.

The prototype must handle all four of these from the same interface, each
triggerable by a marker from exposed simulator controls:

1. **Known size, determinate.** The denominator is named on screen.
2. **Time remaining.** The estimator, its rounding rule and its refresh interval
   are named on screen.
3. **Unknown size.** No fractional reading anywhere — not in the bar, the text,
   the document title or the favicon.
4. **Completion.** The criterion for claiming completion is stated.

The `/audit/` page carries Checklist v0 completed, plus the week 7 audit sheet:
keyboard path, progressbar semantics, live-region behaviour, reduced-motion
variant. Each line marked pass, fail or not-applicable, with its evidence.

## How the criteria are read

- **Behaviour.** A marker reproduces all four conditions without asking you how.
- **Evidence discipline.** Nothing on screen implies precision the state does
  not support.
- **Accessibility audit.** A failure recorded as a failure scores. A pass your
  marker can break does not, and costs more than the failure would have.
- **Both viewports.** Bar, text and controls all work at 1920×1080 and 390×844.

Estimator *accuracy* is not assessed — [week 5](/sessions/05-why-the-estimate-jumps/)
is practice. Neither are failure states or cancellation; those are
[week 8](/sessions/08-stuck-timed-out-disconnected/) onward and belong to
[Assignment 3](/assessments/honest-waiting-kit/).
