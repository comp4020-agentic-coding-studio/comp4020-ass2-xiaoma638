---
title: Numbers without sources
description:
  Week 1 turned inward. Every number, phrase and movement on your own screen,
  traced back to the event that produced it, or deleted.
question: Which of the promises your interface makes can you actually keep?
week: 10
outcomes:
  - LO1
  - LO4
date: 2027-05-13
teachers:
  - idris-fenn
spec:
  - every number, string and motion currently rendered appears as a row in the register
  - each row names the event that produces it, or records that none does
  - each row carries a verdict of holds, removed, or kept with reason
  - a "kept with reason" row gives a reason a reader can disagree with
related:
  - 01-what-99-percent-promises
  - 05-why-the-estimate-jumps
  - 11-watching-someone-wait
  - assessments/honest-waiting-kit
readings:
  - title: "Meter pattern"
    source: "W3C ARIA Authoring Practices"
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/meter/"
    why: "Short and pointed for this week: a meter reports a measurement, a progressbar reports progress toward completion, and using one for the other misstates what the value means. Check your register for a value that is really a meter."
  - title: "Performance.now()"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Performance/now"
    why: "Read this if any of your rows traced back to a timer. It documents what a clock reading is, and why it is not evidence that work occurred."
---

In week 1 you stood outside an interface you did not build and asked what could
possibly support what it said.

Today you do it to your own. It is not the same exercise, and the difference is
the point of the week.

## What changed since week 1

In week 1 you had a recording. Today you have the source, the state enumeration
from [week 2](/sessions/02-what-counts-as-done/), the denominator decision from
[week 3](/sessions/03-where-is-the-denominator/), the estimator you chose in
[week 5](/sessions/05-why-the-estimate-jumps/) with its measured instability, and
every failure state you can reproduce on demand.

So the question sharpens. It is no longer *what could support this claim?* It is
**which of my promises actually hold?** The verdicts change with it:

| Week 1 | Week 10 |
| --- | --- |
| `sourced` — some event could support it | `holds` — **this** event produces it, and you can name the line |
| `unsourceable` — nothing could | `removed` — nothing does, so it is gone from the screen |
| `not determinable from outside` | *withdrawn — you are inside now* |

Losing the third verdict is the week working. "I cannot tell" was an honest
answer in week 1 and is an evasion today.

What replaces it is a fourth verdict week 1 had no use for: **kept with reason**.
Some claim on your screen has no source event, you know it, and you are keeping
it — a rounded figure, a minimum display duration, a reassuring phrase during
verification. That can be a good decision. It stops being one the moment it is
unexamined.

## By the end of this week

You can:

- inventory everything a stateful interface renders, across all its states and
  both viewports, before judging any of it;
- trace a displayed value to the event that produces it, and identify the ones
  with no such event;
- distinguish a defensible "kept with reason" from an excuse, and write the
  former;
- compare your own analytic position now against the one you had in week 1, and
  say what changed.

## The idea

No lecture this week. This section and the 14:00 framing are the teaching.

**Inventory before judgement.** The instinct is to go straight to the suspicious
number. Resist it: the claims you are least likely to examine are the ones you
wrote so early you no longer see them. Enumerate everything first — every string,
every number, every animation, in every state, at both viewports — and only then
start tracing. Most people find their worst row in something they added in week 2
and never looked at again.

**What counts as a source event.** Same definition as week 1: something the
process *reports*, at a moment you can point at in code. Three near-misses that
are not source events:

- A value derived from a timer rather than from progress. A bar that advances on
  `setInterval` is reporting that time passed, while appearing to report that
  work happened.
- A constant that was measured once, in week 5, on your machine. It was evidence
  then. It is a hardcoded number now, unless the code re-measures.
- A default that arrived with a library and was never chosen.

**Kept with reason, versus an excuse.** The test is whether a reader could argue
with it. Not a reason: *"it looks better"*, *"users expect it"*, *"it felt too
abrupt"*. A reason:

> The verification state completes in under 80 ms. A state that flashes for 80 ms
> is harder to read than one held for 400 ms, so this state is displayed longer
> than it exists. The cost is that a user reading the elapsed counter will see it
> disagree with the state duration by up to 320 ms.

That names the deception, the justification and the price. A marker may still
disagree, and that is fine — a reason you can lose an argument about is still a
reason.

**[View this week's slides](/decks/week-10/)** — the 14:00 framing runs from these. They carry the worked example and the exercise brief.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 13 May, 14:00–17:00. No lecture this week.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (20 min).** The inward turn: what you can establish now that you could not in week 1, the verdict you have lost, and the kept-with-reason test. |
| 14:20 | **Screen inventory (55 min).** Enumerate before you judge. Every state, both viewports. Your homework list is the starting point, not the finished one. |
| 15:15 | **Trace.** Each row to an event, or not. |
| 16:30 | **Read your week 1 table (10 min).** Beside your new one. Silently, no discussion. |
| 16:40 | **One row each.** The claim you were most surprised to find had no source. |

## What you start with

- Your complete prototype through week 9.
- **Seven planted claims with no source event**, of varying obviousness, in the
  `stage-10` checkpoint. You will not be told how many you found.
- Your week 1 claims table, which you read again at 16:30.
- An empty page at `/claims/`, which ships as part of Assignment 3.

## What you build

A **claims register** for your own prototype, as a page in your repo at
`/claims/`. Build it where it will ship — it is a deliverable of
[Assignment 3](/assessments/honest-waiting-kit/).

| Column | What goes in it |
| --- | --- |
| **What is rendered** | the string, number or motion, exactly as it appears |
| **Where** | which states it appears in |
| **Source event** | the event and the line that produces it, or `none` |
| **Verdict** | `holds` · `removed` · `kept with reason` |
| **Reason** | required for the third verdict; empty for the others |

## A worked example

One row, fully worked, in the verdict week 1 had no use for:

| Rendered | Where | Source event | Verdict |
| --- | --- | --- | --- |
| "Verifying…" held for 400 ms | verifying | `verify:start`, but the state lasts ~80 ms | **kept with reason** |

> The verification state completes in under 80 ms. A state that flashes for
> 80 ms is harder to read than one held for 400 ms, so this state is displayed
> **longer than it exists**. The cost is that a reader comparing it with the
> elapsed counter will see them disagree by up to 320 ms.

It names the deception, the justification **and the price**. A marker may still
disagree; a reason you can lose an argument about is still a reason.

Not reasons: "it looks better", "users expect it", "it felt too abrupt".

The 80 ms figure is the simulator's verify stage, not a measured service.

## Done when

- Every distinct thing your interface renders has a row. Walk every state with
  the simulator controls, at both viewports, before you call the inventory done.
- No row has an empty verdict.
- Every `kept with reason` row names the deception, the justification and the
  cost.
- Anything marked `removed` is actually gone from the interface, not just from
  the register.

## The mistake to expect

**Going straight to the suspicious number.**

The claims you are least likely to examine are the ones you wrote so early you
no longer see them. Most people's worst row is something added in week 2 and
never looked at since. Inventory everything before judging anything.

The second: marking a row `removed` in the register while it is still on the
screen. The register describes the deployed interface, not your intentions.

## Before next week

About two hours.

1. Finish the register and deploy it. Week 11 tests the interface the register
   describes, so they have to agree.
2. Choose the **one state** you want watched in week 11. The default is the
   stall, because it is where your messages are least tested. Note the two or
   three things you expect a person to say when they hit it — written down
   *before* Thursday, so you find out whether you were right.


## If you are joining late

`git checkout stage-10` gives you a complete prototype through week 9 — states,
denominator, estimator, indeterminate handling, failure states, cancel and retry
— and **seven planted claims with no source event**, of varying obviousness. It
is a floor, not an answer. You will not be told how many you found.

## What this week cannot tell you

Whether the claims that survive are *understood*.

You have established that everything on your screen has an event behind it. You
have established nothing about whether a reader takes from it what you meant. A
claim can hold perfectly and still mislead: "resumes from stage 3" is
impeccably sourced and means nothing to someone who has never seen your stage
names.

That gap is [week 11](/sessions/11-watching-someone-wait/), and it is the only
week of the course where the evidence comes from outside your own head.
