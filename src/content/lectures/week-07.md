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
