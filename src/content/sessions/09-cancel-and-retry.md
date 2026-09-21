---
title: Cancel and retry
description:
  Two buttons that make promises. Write the promise down first, then find out
  whether your code keeps it.
question: When the user presses Cancel, what exactly have you promised them?
week: 9
outcomes:
  - LO2
  - LO3
date: 2027-05-06
teachers:
  - marisol-quaye
spec:
  - cancel and retry each carry a written guarantee, stated in one sentence above the handler
  - one test per guarantee, asserting the guarantee rather than the current behaviour
  - the interface tells the user which guarantee applies before they commit to the action
related:
  - 08-stuck-timed-out-disconnected
  - 10-numbers-without-sources
  - 02-what-counts-as-done
  - assessments/honest-waiting-kit
readings:
  - title: "AbortController"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController"
    why: "The platform's cancellation primitive. Read what abort() guarantees and, more importantly, what it does not: it stops the client listening, which is not the server stopping work."
  - title: "Multipart upload \u2014 aborting"
    source: "AWS S3 documentation"
    url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html"
    why: "The Aborting a multipart upload part specifically. A real service documenting that parts persist and cost money until explicitly aborted \u2014 precisely the failure the Cancel guarantee is written to exclude."
---

Cancel is the only control in your interface that a user presses in order to make
something *not* happen — which makes it the only one whose correctness they can
never observe.

A user cancels an upload at 24 of 40 MB. The button greys out, the bar
disappears, the page says **Cancelled**. Everything visible is consistent with
two completely different realities: the 24 MB were discarded, or the 24 MB are
sitting in a server-side buffer that will be assembled in four hours by a
scheduled job. The user cannot tell. They will find out, if at all, from a
storage bill.

Retry has the mirror problem. **Retry** could mean "start again from zero" or
"resume from the last acknowledged chunk". Those differ by 24 MB of someone's
mobile data, and most interfaces do not say which they do.

## By the end of this week

You can:

- write a guarantee: a one-sentence, falsifiable statement of what an action
  promises about the user's data;
- implement cancel and retry such that the guarantee holds, including on the
  awkward paths;
- write a test that asserts a guarantee rather than current behaviour, and
  explain the difference;
- tell a user which guarantee applies *before* they commit to the action.

## The idea

No lecture this week. This section and the 14:00 framing are the teaching.

**A guarantee is a sentence that can fail.** "Cancel stops the upload" cannot
fail — it is true of any implementation, including one that leaks. Compare:

> **Cancel:** no bytes from this attempt are retained anywhere after the button
> returns.

> **Retry:** resumes from the last stage the server acknowledged, and re-sends
> nothing before it.

Both can be false. That is what makes them worth writing, and it is what makes a
test possible.

**Write it above the handler, before the handler.** Same move as last week's
messages, same reason: a guarantee written afterwards describes what you built,
and a guarantee written first constrains what you build.

**The awkward paths are the whole exercise.** Cancel during a stall, when no
progress event has arrived for thirty seconds. Cancel between the last chunk and
the acknowledgement, when the operation may already have succeeded. Retry after a
timeout, when the server may still be working on the first attempt — which is
[week 8](/sessions/08-stuck-timed-out-disconnected/)'s timeout row arriving with
consequences. Each of these is a place where the honest guarantee is weaker than
the one you would like to make, and weakening the sentence is the correct move.

**A test that asserts current behaviour protects a bug.** If you cancel mid-stall
and then assert that the retained-bytes counter is 24 MB because that is what it
currently is, you have written a test that will fail the day you fix it. Assert
the *guarantee*: after cancel, retained bytes are zero — from any state, reached
by any path. Where your implementation cannot meet that, weaken the guarantee in
writing rather than weakening the test.

**Say it before they commit.** A guarantee the user reads afterwards is
documentation. A guarantee they read on the button, or beside it, is part of the
decision. "Cancel (nothing is kept)" and "Retry from 24 MB" are both short enough
to fit.

**[View this week's slides](/decks/week-09/)** — the 14:00 framing runs from these. They carry the worked example and the exercise brief.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 6 May, 14:00–17:00. No lecture this week.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (25 min).** Guarantees that can fail, and the three awkward paths. Your drafted sentences from last week's homework go on the board; the room finds the ones that cannot fail. |
| 14:25 | **Build.** Guarantee comments first, then handlers, then tests. |
| 15:45 | **Adversarial pairs (45 min).** Swap prototypes. Your job is to reach a state where your partner's written guarantee is false. Most pairs succeed, usually via the stall path. |
| 16:30 | **Weaken or fix.** For each break: either the code changes or the sentence does. Both are legitimate; leaving the pair disagreeing is not. |

## What you start with

- Your prototype through week 8, with Cancel and Retry buttons **wired to empty
  handlers** — they currently lie by existing.
- A test file with two skipped tests in it.
- The two guarantee sentences you drafted for last week's homework.

## What you build

1. **Two guarantees**, one sentence each, as a comment directly above each
   handler, written before the handler.
2. **Cancel and retry** that keep them, including from a stall, from between
   final chunk and acknowledgement, and after a timeout.
3. **One test per guarantee**, asserting the guarantee from multiple entry
   states — not the behaviour you currently observe.
4. **Pre-commitment text** in the interface saying which guarantee applies,
   readable before the button is pressed.

## A worked example

A guarantee, and the test that can break it:

```js
// Guarantee: no bytes from this attempt are retained after cancel() returns.
test.each(["transferring", "stalled", "awaiting-ack"])(
  "cancel retains nothing, from %s",
  async (from) => {
    const sim = new Upload();
    await sim.driveTo(from);
    await sim.cancel();
    expect(sim.retainedBytes).toBe(0);     // the guarantee
  },
);
```

Compare the test that protects a bug:

```js
expect(sim.retainedBytes).toBe(24_000_000);   // asserts today's behaviour
```

The second passes now and fails the day you fix it. `Upload` is the simulated
client; no network is involved.

## Done when

- Your partner tried to falsify both guarantees and the result is recorded:
  either they failed, or the sentence has been weakened to something true.
- Each test reaches its assertion by at least two different paths.
- The interface states the retry semantics — from zero, or from stage *n* —
  before the user presses anything.

## The mistake to expect

**Fixing the sentence instead of the code, silently.**

When the pair swap breaks your guarantee you have two honest moves: change the
code, or weaken the sentence in writing. Both are legitimate. Leaving the pair
disagreeing is not.

Expect also to find one state in your week 2 model with **no defined cancel
behaviour**. It is usually a verifying state, and it is usually the one nobody
considered.

## Before next week

About two hours.

1. Run your cancel guarantee against the [week 2](/sessions/02-what-counts-as-done/)
   state model and check every state has defined cancel behaviour. Most models
   have one state that was never considered, usually a verifying state.
2. Week 10 inventories everything on your screen. Before Thursday, list every
   distinct string, number and animation your interface can display. Just the
   list; the tracing is the studio.


## If you are joining late

`git checkout stage-09` gives you a prototype through week 8 with Cancel and
Retry buttons wired to empty handlers, and a test file containing two skipped
tests. It is a floor, not an answer: the guarantees, the implementations and the
assertions are yours, and the buttons currently lie by existing.

## What this week cannot tell you

Whether the guarantee is the one the user wanted.

You have made the interface honest about what it does. You have not established
that what it does is right. "Retry resumes from stage 3" may be an excellent
guarantee and still be the wrong behaviour for someone on a metered connection
who would rather be asked.

There is also a limit you cannot cross from here: your guarantees are about a
simulator you control. On a real service, cancellation is a request, not an
instruction, and the honest sentence would be weaker again — something closer to
"we have asked the server to discard this and cannot confirm that it did". Worth
knowing that the truthful version of your Cancel is weaker than the one you are
about to ship.
