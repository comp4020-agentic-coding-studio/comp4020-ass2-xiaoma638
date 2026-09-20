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

You are outside the system. You cannot read its code, time its network, or ask
it what it meant — which is the position almost everyone is in when they judge a
waiting interface, including you, about your own past work.

## What this assesses, and what it does not

This assesses [week 1](/sessions/01-what-99-percent-promises/) and
[week 2](/sessions/02-what-counts-as-done/) only: the claim/source/verdict move
and the state model.

[Week 3](/sessions/03-where-is-the-denominator/) runs in the same week this is
due and is **not** assessed here. If your interface's denominator is interesting,
say so in a sentence and leave it; the marks for that analysis are in
[Assignment 2](/assessments/waiting-interface-prototype/).

No marks are available for proposing fixes, redesigning the interface, or
explaining user psychology. Fixes start the week after.

## What you submit

A page in your repository at `/autopsy/`, 800–1000 words plus the table.

**1 — The subject.** A named, publicly available interface, with a screen
recording of 30 seconds or less committed to the repository as evidence. Any
waiting interface qualifies: an upload, a checkout, an OS update, a boarding-pass
download. Pick one that does something odd.

**2 — The claims table.** One row per claim:

| Column | What goes in it |
| --- | --- |
| Claim | the number, phrase, motion or absence, quoted or described exactly |
| Possible source | an event the process could emit that would support it |
| Verdict | `sourced` · `unsourceable` · `not determinable from outside` |

Motion and absence are claims. A table containing only text is an incomplete
table, and that is the most common way this loses marks.

**3 — The inferred state model.** The states you can distinguish from outside,
and the ones the interface collapses into one.

**4 — One paragraph: what it would have to know.** The gap between what it says
and what a system in its position could actually observe.

**5 — A limits section.** What black-box observation could not establish here.

## How the criteria are read

**Evidence tracing (40).** Every claim visible in your recording has a row, and
each is traced to a plausible source or explicitly marked as having none. Pause
your recording at four or five points and scan the whole screen; anything that
changed between two pauses is a claim you owe a row.

**State reading (25).** Your model explains the behaviour in the recording
**and** the transitions the recording does not show — what happens on failure,
on cancel, on a second attempt. Inferring those is the skill; guessing them and
saying so is acceptable, guessing them silently is not.

**Honesty of limits (20).** You say what outside observation cannot establish,
and nothing else in the document quietly asserts past that line. The commonest
failure is a confident sentence in paragraph four that the limits section in
paragraph nine then disclaims.

**Clarity (15).** A reader who has not seen the interface can follow the
argument, and the table is readable at 390px. Check it on a phone; a five-column
table usually is not.

## A worked example

The [week 1 studio](/sessions/01-what-99-percent-promises/) opens with a worked
claims table for a 40 MB upload that sits at 99% for eleven seconds. That example
is a **teaching construction**, not a recording of a particular product, and it
is filled in as a class so that the format is not what you are struggling with
here. Yours works from a real recording.
