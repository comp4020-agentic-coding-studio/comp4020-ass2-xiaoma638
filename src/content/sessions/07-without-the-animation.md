---
title: Understood without the animation
description:
  The audit workshop. Turn off the motion, put the mouse away, and find out
  whether your interface was ever carrying its information in text.
question: Does your interface still work with the motion off, the mouse gone, and the screen unseen?
week: 7
date: 2027-04-22
teachers:
  - marisol-quaye
  - idris-fenn
spec:
  - the whole upload path, from choosing a file to reading the outcome, is reachable and operable from the keyboard
  - every state change a sighted user can see has a text form a screen reader reaches, and percentage ticks are not announced individually
  - a prefers-reduced-motion variant exists and loses no information the default variant carried
  - the audit sheet records failures as failures
related:
  - 06-motion-and-the-felt-wait
  - 04-no-idea-how-long
  - lectures/week-07
  - assessments/waiting-interface-prototype
---

You have spent three weeks making a bar move well. Today you find out whether
any of that motion was carrying information, or whether it was carrying the
*impression* of information while the text underneath said nothing.

The test is blunt: turn the animation off. If something the user needed has gone
missing, it was never in the interface — it was in the animation, and an
animation is not something everybody gets.

## In the room

Thursday 22 April, 14:00–17:00. Tuesday's lecture,
[Reading an Interface Without Looking at It](/lectures/week-07/), is the
teaching; today is the workshop that applies it, with both tutors circulating.

| Time | What happens |
| --- | --- |
| 14:00 | **Recap (10 min).** The four audit lines and what counts as evidence for each. Nothing new is introduced today — everything you are audited on was in Tuesday's lecture. |
| 14:10 | **Self-audit.** Work the sheet against your own prototype. |
| 15:15 | **Pair swap.** You audit a classmate's prototype; they audit yours. You may not explain your interface while it is being audited. |
| 16:15 | **Fixes.** Repair what the pair swap found, while the person who found it is still in the room. |
| 16:45 | **Two claims.** Each pair names one thing they thought passed and did not. |

## What you build

The four audit lines, worked in order. Each is a separate pass — do not try to
fix and audit at the same time.

1. **The keyboard path.** From choosing a file to reading the outcome, with no
   pointer. Treat it as a state machine, not a tab order: at every state, what
   can be reached, and where does focus go when the state changes underneath
   you?
2. **Semantics.** `role="progressbar"` with `aria-valuenow` where you have a
   value, and `aria-valuetext` where the number needs words around it. For the
   indeterminate cases you built in [week 4](/sessions/04-no-idea-how-long/),
   decide what the *absence* of a value should say — omitting `aria-valuenow`
   and saying nothing are not the same thing.
3. **Announcements.** A polite live region that reports state changes and not
   percentage ticks. A bar that announces every integer from 0 to 100 has not
   been made accessible; it has been made unusable in a new way.
4. **Reduced motion.** A `prefers-reduced-motion` variant of each treatment from
   [week 6](/sessions/06-motion-and-the-felt-wait/). The question is not whether
   it still looks acceptable. The question is whether it still says the same
   things.

## How you'll know it worked

- Your partner completed an upload, hit a stall and read the outcome using only
  the keyboard, without being told anything.
- With motion disabled, your partner could still say which state the interface
  was in at any moment you paused it.
- Your sheet has failures on it. A sheet with four passes and no notes is
  evidence that the audit was not run.

## If you are joining late

`git checkout stage-07` restores a prototype carrying the week 4 and week 6
treatments with the accessibility work entirely absent. You audit that. Auditing
a baseline you did not write is a slightly harder version of today, not an
easier one.

## What this week cannot tell you

Two people at adjacent desks are not a test of whether this interface works for
the people it excludes. You audited against a checklist, and a checklist is a
record of failures somebody has already had — it cannot report a failure nobody
has written down yet. Neither of you uses a screen reader daily, so you have
established that the announcements exist and are sane, not that they are good.

Say exactly that on the sheet. On
[Assignment 2](/assessments/waiting-interface-prototype/) a line recorded
honestly as a failure scores; a line recorded as a pass that your marker can
break does not.
