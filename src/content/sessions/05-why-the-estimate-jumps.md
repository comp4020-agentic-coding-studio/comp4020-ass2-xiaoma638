---
title: Why the estimate keeps jumping
description:
  Three estimators over one recorded transfer. Measure how much each one lies
  to itself, then decide what to round to.
question: You have a denominator. What can you honestly say about time?
week: 5
date: 2027-03-25
teachers:
  - idris-fenn
draft: true
spec:
  - three estimators run over the same supplied transfer trace
  - each estimator's instability is recorded as a number, by the same measure
  - the prototype names the estimator it ships, its rounding rule, and its refresh interval, on screen
related:
  - 03-where-is-the-denominator
  - 10-numbers-without-sources
  - assessments/waiting-interface-prototype
---

"About 4 minutes remaining" is a prediction, and predictions have error. This
week you measure yours.

## In the room

Thursday 25 March, 14:00–17:00. No lecture; the studio opens with a 25-minute
framing on the three estimator families and what each assumes about the future.

The transfer trace and the plotting harness are supplied. You write three
`estimate()` function bodies — naive linear, sliding-window rate, exponentially
weighted — and read the graphs.

## What you build

Three estimators, one instability figure each, and a decision: which one ships,
rounded to what, refreshed how often. A number that changes faster than a reader
can read it is not a number.

## What this week cannot tell you

Whether a jumpy-but-accurate estimate beats a smooth-but-wrong one. You will
have the data to pose that question properly and no way to settle it today.
