---
title: Stuck, timed out, disconnected
description:
  Three ways a transfer stops without finishing, and the sentences that have to
  be true when it does.
question: Nothing has moved for thirty seconds. What do you say?
week: 8
outcomes:
  - LO2
  - LO3
date: 2027-04-29
teachers:
  - idris-fenn
spec:
  - stall, timeout and disconnection are separately reproducible from the simulator controls
  - each state's message names what happened, what it means for the file, and what happens next
  - no failure state leaves a progress indicator still implying progress
  - failure states reach the live region, not only the screen
related:
  - 02-what-counts-as-done
  - 09-cancel-and-retry
  - 07-without-the-animation
  - assessments/honest-waiting-kit
readings:
  - title: "Understanding SC 2.2.1: Timing Adjustable"
    source: "W3C, WCAG 2.2"
    url: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html"
    why: "A timeout is a time limit imposed on a user, and this is the criterion that governs it. The exceptions matter as much as the rule."
  - title: "Alert pattern"
    source: "W3C ARIA Authoring Practices"
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
    why: "When a failure warrants an assertive announcement rather than week 7's polite live region. The guidance on not stealing focus is the part that applies here."
  - title: "AbortSignal.timeout()"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static"
    why: "The platform's own timeout mechanism, and useful before week 9 \u2014 it is the same object that will implement your Cancel."
---

[Assignment 2](/assessments/waiting-interface-prototype/) was due on Tuesday, so
this week starts clean — and it starts by breaking everything you just shipped.

Three things that look identical to a user and are not:

- **A stall.** The connection is up. The server is there. Nothing has arrived for
  thirty seconds. It may resume by itself.
- **A timeout.** *You* decided to stop waiting. The server may still be
  processing your file. You do not know.
- **A disconnection.** The transport is gone. Nothing more is coming without a
  new connection.

A user who is told the wrong one does the wrong thing: they wait through a
disconnection, or they retry through a stall and upload 40 MB twice.

## By the end of this week

You can:

- distinguish stall, timeout and disconnection by what the process can still be
  doing in each, and reproduce all three on demand;
- write a failure message that names the consequence for the user's file, not
  only the technical event;
- detect a stall without an estimator, and explain why those two jobs are kept
  apart;
- stop a progress indicator from implying progress after progress has stopped.

## The idea

No lecture this week. This section and the 14:00 framing are the teaching.

**The taxonomy, by what is still possible.** This is the useful axis — not what
went wrong, but what can still happen:

| Failure | Connection | Server may still be working | Resumes by itself | Safe to retry |
| --- | --- | --- | --- | --- |
| **Stall** | up | yes | possibly | not yet — you may duplicate work |
| **Timeout** | up | **yes, unknown** | no, you stopped | only if the operation is idempotent |
| **Disconnection** | gone | unknown | no | yes, from the last acknowledged stage |

The timeout row is the one that catches people. A timeout is a decision *you*
made about how long to wait. It says nothing about the server, which may be
thirty seconds into a two-minute virus scan and about to succeed. An interface
that reports a timeout as "Upload failed" has asserted something it does not
know.

**Detection is not estimation.** A stall is detected from the timestamp of the
last progress event, full stop — no rate, no estimator, no prediction. Keeping
this out of [week 5](/sessions/05-why-the-estimate-jumps/)'s estimators is why
those could stay simple. Two clean mechanisms beat one clever one.

**Write the message before the handler.** Today's method, and it is not a style
preference. Writing the handler first produces messages that describe the code
("Request aborted with status 0"). Writing the message first forces you to decide
what is true, and then the handler has to make it true. Three parts, in order:

1. **What happened**, in the user's terms.
2. **What it means for their file** — the part interfaces skip, and the only part
   the user is actually asking about.
3. **What happens next** — automatic, or theirs to choose.

Compare. *"Connection lost."* — one part out of three. *"The connection dropped
after 24 of 40 MB. Nothing has been saved yet. Retry will resume from the last
completed chunk."* — three out of three, and it tells them not to panic about
the 24 MB.

**The indicator has to stop claiming.** A bar that keeps its shimmer through a
stall is asserting liveness that is false. This is
[week 1](/sessions/01-what-99-percent-promises/)'s exact failure, now in your own
code.

**[View this week's slides](/decks/week-08/)** — the 14:00 framing runs from these. They carry the worked example and the exercise brief.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 29 April, 14:00–17:00. No lecture this week.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (25 min).** The table above, and the three-part message, worked on the week 1 case: which of the three was it, and what should it have said? |
| 14:25 | **Messages first (30 min).** Write all three messages before writing any handler. On paper. Swap with a neighbour and mark any part that describes code rather than consequence. |
| 14:55 | **Build.** Injectors, then detection, then handlers that make the messages true. |
| 16:30 | **Break each other's.** Pairs try to reach a state whose message is wrong. |

## What you start with

- Your prototype as submitted for
  [Assignment 2](/assessments/waiting-interface-prototype/) on Tuesday.
- **Three failure injectors** already present in the simulator and entirely
  unhandled — trigger one and the bar animates forever.
- The live region you built in [week 7](/sessions/07-without-the-animation/).

## What you build

1. **Three failure injectors** in the simulator: stall, timeout, disconnection,
   each triggerable independently from the exposed controls.
2. **Stall detection** from the last-progress timestamp, with the threshold
   named on screen.
3. **Three messages**, written first, each carrying all three parts.
4. **Indicator suppression**: on entering any failure state, the animation stops
   asserting and the state is announced through the live region built in
   [week 7](/sessions/07-without-the-animation/).

## A worked example

The same failure, written three ways. Only the third has all three parts:

> "Request aborted with status 0." — describes the code
>
> "Connection lost." — one part of three
>
> **"The connection dropped after 24 of 40 MB. Nothing has been saved yet. Retry
> will resume from the last completed chunk."**

| Part | The sentence answers |
| --- | --- |
| What happened | the connection dropped after 24 of 40 MB |
| What it means for the file | nothing has been saved yet |
| What happens next | retry resumes from the last completed chunk |

And the detection behind it — one timestamp, no estimator:

```js
if (now - lastProgressEvent > STALL_AFTER_MS) enter("stalled");
```

24 of 40 MB is the simulator's disconnection injector, not a real transfer.

## Done when

- A marker can trigger each of the three separately, without reading your code.
- Each message names a consequence for the file. Cover the first clause of each
  and check the rest still tells the user something.
- Nothing shimmers, sweeps or creeps during a failure state.
- All three failures are announced, not only displayed — verify with the live
  region, not by looking.

## The mistake to expect

**Leaving the shimmer on.**

A bar that keeps animating through a stall is asserting liveness that is false.
It is [week 1](/sessions/01-what-99-percent-promises/)'s exact failure, now in
your own code, and it is the one thing that fails *Behaviour under abnormal
conditions* outright in [Assignment 3](/assessments/honest-waiting-kit/).

The check on your messages: cover the first clause of each. Does the rest still
tell the user something about their file? If not, you wrote two parts.

## Before next week

About two hours.

1. Add stall recovery: the transfer resumes on its own and the interface returns
   to a normal state. The awkward part is what the elapsed counter does, and
   there is no right answer — decide and write down which you chose.
2. Draft the two guarantee sentences week 9 opens with: one for Cancel, one for
   Retry. One line each. You will test them on Thursday.


## If you are joining late

`git checkout stage-08` gives you a prototype through week 7, accessibility work
included, plus three failure injectors present in the simulator and entirely
unhandled — trigger one and the bar keeps animating forever. That behaviour is
the starting point, not a bug to report. It is a floor, not an answer: detection,
messages and suppression are yours.

## What this week cannot tell you

Whether the messages are understood.

You wrote them, which makes you the worst available judge: you know what a stall
is, you know the file is intact, and you will read your own sentence as clear
because you already hold the thing it is trying to convey.

Neighbours breaking each other's states is a test of *correctness* — does the
message match the state — not of comprehension.
[Week 11](/sessions/11-watching-someone-wait/) is the first time anyone reads
one of these cold, and stall is the state they will be shown.
