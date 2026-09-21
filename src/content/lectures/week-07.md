---
title: Reading an Interface Without Looking at It
description:
  Status as text and semantics rather than as picture — ARIA values when there
  is no value, live regions that do not flood, and what reduced motion reveals
  about what your animation was carrying.
week: 7
date: 2027-04-20
teachers:
  - marisol-quaye
slides: /decks/week-07/
related:
  - sessions/07-without-the-animation
  - sessions/04-no-idea-how-long
  - sessions/06-motion-and-the-felt-wait
  - assessments/waiting-interface-prototype
---

This is the lecture [Assignment 2](/assessments/waiting-interface-prototype/) is
marked against. Everything on the audit sheet appears here first.

[Slides](/decks/week-07/)

## What this lecture carries

**Semantics for a value you may not have.** `role="progressbar"` with
`aria-valuenow`, `aria-valuemin` and `aria-valuemax` when a value exists;
`aria-valuetext` when the raw number needs words around it ("3 of 7 files", not
"43"). And the case the specification handles but most implementations do not:
what to do when there is genuinely no value. Omitting `aria-valuenow` states
that progress is indeterminate. Setting it to `0` states that nothing has
happened. These are different claims, and by
[week 4](/sessions/04-no-idea-how-long/) you have three registers that each need
a different one.

**Live regions, and the announcement flood.** A polite live region reports
changes without interrupting. The failure mode is not silence, it is volume: a
bar wired to announce `aria-valuenow` on every update produces a hundred
announcements for one upload, which is worse than announcing nothing, because
the state changes that mattered are now buried in the count. The rule this
course uses: announce **state transitions**, never **increments**.

**Focus as a state machine.** A keyboard path is not a tab order. When a state
changes underneath the user — a transfer completes, a stall begins, a control
disappears — something has to happen to focus, and "nothing" is a decision with
consequences.

**Reduced motion as a diagnostic.** `prefers-reduced-motion` is usually taught
as a courtesy. Treat it instead as a test: turn the animation off and ask what
information left with it. If something did, that information was never in your
interface — it was in the animation, and an animation is not something
everybody gets. This is the week your
[week 6](/sessions/06-motion-and-the-felt-wait/) treatments are examined for
whether they were carrying meaning or carrying atmosphere.

## What it builds on

Everything visible you have made. [Week 4](/sessions/04-no-idea-how-long/)
supplied the three indeterminate registers; [week 6](/sessions/06-motion-and-the-felt-wait/)
supplied three motion treatments. Both are inputs today, and both are about to
be tested for whether they were information.

## What it sets up

| Where it lands | What it carries there |
| --- | --- |
| [Week 7 studio](/sessions/07-without-the-animation/), two days later | the audit workshop and the pair swap |
| [Assignment 2](/assessments/waiting-interface-prototype/), due the Tuesday of week 8 | 25 of its 100 marks are the audit sheet |
| [Weeks 8](/sessions/08-stuck-timed-out-disconnected/) and [9](/sessions/09-cancel-and-retry/) | failure and cancellation have to reach the same channels — a failure that is only visible is a failure that is only visible to some people |

## A worked example

The announcement flood, in numbers, because the scale is the argument.

A 40 MB upload on a slow connection emits a progress event roughly every 200 ms:
about **450 events**. Wire a live region to `aria-valuenow` and a screen-reader
user hears a number read aloud, over and over, for ninety seconds.

Wire it to state transitions instead and the same upload announces **five
things**: reading, hashing, transferring, verifying, stored.

Both interfaces are "accessible" in the sense that the information reaches the
accessibility tree. Only one of them is usable, and the difference is not a
missing attribute — it is a decision about what counts as a change worth
reporting.

## What this lecture cannot settle

Conformance is not usability, and this lecture only gets you the first.

Every criterion covered here can be satisfied by an interface that is still
unpleasant to use without sight. A checklist is a record of failures somebody has
already had and written down; it cannot report one nobody has. The audit on
Thursday will find real defects and will not tell you whether the result is
good — nobody in the room uses a screen reader daily, and saying so on the sheet
is part of the work.

## If you miss the hour

The [slides](/decks/week-07/) carry the argument in the order it was made, and this week's
reading is listed on the [studio page](/sessions/). The studio on Thursday
assumes the vocabulary above rather than re-teaching it, so read the deck before
you arrive rather than after.
