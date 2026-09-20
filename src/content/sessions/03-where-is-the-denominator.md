---
title: Where is the denominator?
description:
  Percent of what? Build the same upload twice — counted in bytes, counted in
  stages — and find where the two disagree.
question: When your bar says 40%, forty per cent of what has happened?
week: 3
date: 2027-03-11
teachers:
  - idris-fenn
draft: true
spec:
  - both a byte-counted and a stage-counted bar run against the same simulated upload
  - the two readings are logged together, and the largest disagreement between them is recorded as a number
  - the page states which denominator the prototype ships with, and what that denominator excludes
related:
  - 02-what-counts-as-done
  - 05-why-the-estimate-jumps
  - assessments/waiting-interface-prototype
---

A percentage needs a denominator, and your interface currently does not have
one — it has bytes acknowledged by a simulator, which is not the same as work
completed. This week you build both readings side by side and watch them
disagree.

## In the room

Thursday 11 March, 14:00–17:00. No lecture this week; the studio opens with a
25-minute framing on denominators and what each one silently excludes.

## What you build

Two bars over one transfer: bytes transferred over bytes total, and stages
completed over stages known. Log both. Find the moment they are furthest apart
and write down the number.

## What this week cannot tell you

Which denominator is *right*. It tells you what each one omits, which is a
different and more useful thing.
