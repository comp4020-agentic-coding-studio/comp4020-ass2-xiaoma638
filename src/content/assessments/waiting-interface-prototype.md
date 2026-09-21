---
title: Waiting Interface Prototype
description:
  The first half of the semester, shipped — a determinate bar, an honest
  estimate, an indeterminate case with no fractions, and an accessibility audit
  that records its failures.
week: 8
outcomes:
  - LO1
  - LO2
  - LO3
due: 2027-04-27T10:00:00+10:00
weight: 30
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
tutors in the room. This falls the following Tuesday at 10:00 — five days later,
across a weekend and a public holiday.

The Waiting Interface Checklist v0 was published in
[week 2](/sessions/02-what-counts-as-done/), but **publishing a standard is not
teaching it**, and it carries no marks before now. The gap between the last
teaching and this deadline is what makes the audit criterion fair.

There is no class on the day this is due, and the
[week 8 studio](/sessions/08-stuck-timed-out-disconnected/) on the Thursday is
not shortened for it.

## What Assignment 1 gives you

This is not a second attempt at the autopsy. It is the first time the same
reasoning is applied to something you built.

- the **claims table method** becomes *Evidence discipline* — you are now the
  designer whose numbers get traced
- the **state model** you inferred from outside becomes the one you own, and
  condition (d) asks you to publish its completion criterion
- the **limits section** becomes the audit sheet, where "fail" is a scoring
  answer

## What you submit

The deployed prototype, plus an `/audit/` page in the repository.

### The prototype: four conditions from one interface

Each must be reachable by a marker from your exposed simulator controls, without
reading your code.

**(a) Known size, determinate.** A bar driven by real progress events, with
**the denominator named on screen** — "bytes sent, excluding server-side
verification", not "upload progress".

**(b) Time remaining.** A readout naming, on the page, **which estimator, what
rounding, what refresh interval**. Any of the three from
[week 5](/sessions/05-why-the-estimate-jumps/) is acceptable. Being unable to
say which one you shipped is not.

**(c) Unknown size.** No fractional reading **anywhere** — not in the bar, the
text, the document title, or the favicon. Use one or more of the three registers
from [week 4](/sessions/04-no-idea-how-long/).

**(d) Completion.** The criterion for claiming completion is stated where a user
can read it, and the interface only claims completion when that criterion is
met.

### The audit page

Checklist v0 completed, plus the week 7 audit sheet: keyboard path, progressbar
semantics, live-region behaviour, reduced-motion variant. Each line marked
**pass / fail / not applicable**, with the evidence that settled it.

## How the criteria are read

**Behaviour across the four conditions (35).** A marker reproduces all four using
your controls. A condition that works but cannot be triggered scores nothing,
because the marker cannot tell it apart from one that does not work.

**Evidence discipline (25).** Nothing on screen implies precision the state does
not support. Specifics that get checked: a percentage displayed to one decimal
place from an integer-valued source; a time estimate refreshing faster than it
can be read; a fraction surviving in the tab title during condition (c).

**Accessibility audit (25).** Honesty is the scored property. **A line recorded
as a failure scores. A line recorded as a pass that your marker can break does
not, and costs more than the failure would have.** Four passes with no notes
reads as an audit that was not run.

**Both viewports (15).** Bar, text and controls all work at 1920×1080 and
390×844. The usual failure is a control row that wraps behind the bar at 390px,
which is invisible until you look.

## Where this goes

Again, nothing is resubmitted. [Assignment 3](/assessments/honest-waiting-kit/)
marks different things about a changed artefact:

| From this assignment | Becomes, in Assignment 3 |
| --- | --- |
| the four working conditions | the **normal path** that weeks 8 and 9 interrupt. A3 marks what happens when it *stops*, which is not assessed here at all |
| the **audit sheet**, failures included | *Accessibility and both viewports*, 15 marks — the same four lines, re-run after the failure states and the cancel path have been added, because a fix in week 8 routinely breaks line 3 |
| the named **estimator, denominator and completion criterion** | three of the first rows in the week 10 claims register, now with a verdict against them |
| every line you recorded as a **fail** | the shortlist of things to fix before A3, and the reason an honest sheet is worth more than a clean one |

The criteria do not repeat: *Behaviour across the four conditions* is marked
here and never again, and *Behaviour under abnormal conditions* is marked in A3
and not here. A prototype that is unchanged between the two will score on
neither.

## What is not assessed here

Estimator **accuracy** — [week 5](/sessions/05-why-the-estimate-jumps/) is
practice, and the honest answer is often that your estimator is poor. Motion
preference from [week 6](/sessions/06-motion-and-the-felt-wait/). Failure
states, cancellation and retry: those are
[week 8](/sessions/08-stuck-timed-out-disconnected/) onward and belong to
[Assignment 3](/assessments/honest-waiting-kit/).
