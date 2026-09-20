---
title: Progress Bar Autopsy
description:
  Take a waiting interface you did not build, list every claim it makes, and
  say what evidence each one could possibly have.
week: 3
outcomes:
  - LO1
  - LO4
due: 2027-03-12T17:00:00+11:00
weight: 20
draft: true
marking:
  mode: weighted
  criteria:
    - name: Evidence tracing
      weight: 40
    - name: State reading
      weight: 25
    - name: Honesty of limits
      weight: 20
    - name: Clarity
      weight: 15
spec:
  - every claim visible in your recording appears as a row in the table
  - each row carries a verdict, and unsourceable claims are named as such
  - the inferred state model accounts for the behaviour in the recording, including transitions it does not show
  - the limits section states what black-box observation could not establish
related:
  - sessions/01-what-99-percent-promises
  - sessions/02-what-counts-as-done
  - lectures/week-01
---

## The brief

> Find a waiting interface in the wild, and work out what it would have to know
> in order to say what it says.

This assesses [week 1](/sessions/01-what-99-percent-promises/) and
[week 2](/sessions/02-what-counts-as-done/) only. The denominator work in
[week 3](/sessions/03-where-is-the-denominator/) runs alongside it and is
assessed in [Assignment 2](/assessments/waiting-interface-prototype/) instead,
so nothing taught in the same week it is due carries marks here.

## What you submit

A page in your repo at `/autopsy/`, 800–1000 words plus the table:

1. A named interface, with a screen recording of 30 seconds or less as evidence.
2. A **claims table**: one row per claim, with the source event that could
   support it and a verdict of `sourced`, `unsourceable`, or
   `not determinable from outside`.
3. The state model you infer, and the states the interface collapses into one.
4. One paragraph: what it would have to know to say what it says.
5. A limits section: what you could not determine from outside.

## How the criteria are read

- **Evidence tracing.** Every claim in the recording is in the table, and each
  is traced or explicitly marked untraceable. Claims made by motion and by
  absence count.
- **State reading.** The model explains the behaviour on screen *and* the
  transitions the recording does not show.
- **Honesty of limits.** You say what outside observation cannot establish, and
  nothing elsewhere in the document quietly asserts past that line.
- **Clarity.** A reader who has not seen the interface can follow it, and the
  table is readable at 390px wide.

No marks are available for proposing fixes, redesigning the interface, or
explaining user psychology. Fixes begin next week.
