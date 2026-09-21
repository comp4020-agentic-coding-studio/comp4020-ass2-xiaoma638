---
title: No idea how long
description:
  Three honest ways to say "still going" when there is no denominator at all,
  and the rule that none of them may imply a fraction.
question: What should the interface show when there is nothing to divide?
week: 4
outcomes:
  - LO2
date: 2027-03-18
teachers:
  - marisol-quaye
spec:
  - three indeterminate treatments run against an upload of unknown size — liveness, elapsed, and named stage
  - no treatment admits a fractional reading anywhere, including the document title
  - a written rule states which treatment is permitted in which circumstance
related:
  - 03-where-is-the-denominator
  - 07-without-the-animation
  - 08-stuck-timed-out-disconnected
  - lectures/week-04
  - assessments/waiting-interface-prototype
readings:
  - title: "The <progress> element"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress"
    why: "Re-read the value attribute paragraph specifically. Omitting value is how the platform spells indeterminate, and it is deliberately not the same as value=\"0\"."
  - title: "Skeleton Screens"
    source: "Nielsen Norman Group"
    url: "https://www.nngroup.com/articles/skeleton-screens/"
    why: "A widely used indeterminate treatment, argued for on perception grounds. Read it against this week's constraint and decide whether a skeleton admits a fractional reading \u2014 the article does not ask that, which is why it is worth arguing with."
---

Last week's flag has gone false.

The simulator can now hand you a transfer where `lengthComputable` is false:
a stream of unknown length, the shape you get when a server is generating a file
as it sends it. There is no total. There will not be one. The upload might take
four seconds or four minutes, and nothing on your machine knows which.

The interface still has to show something. **The temptation is to show a bar
anyway** — a bar that creeps to 90% and waits, a spinner that speeds up near the
end. Both of those invent a denominator. This week is about the three things you
can say instead, all of which are true.

## By the end of this week

You can:

- distinguish *no denominator* from *nothing to say*, and name three things an
  interface can truthfully report when it has the first;
- implement liveness, elapsed-time and named-stage feedback against a stream of
  unknown length;
- identify a fractional reading in a display that contains no numbers;
- write a rule stating which treatment applies in which circumstance, precise
  enough for someone else to apply it.

## The idea

Tuesday's lecture, [Saying Nothing, Precisely](/lectures/week-04/), is the
teaching. The three registers, restated so you have them at the machine:

| Register | Asserts | Requires | Says nothing about |
| --- | --- | --- | --- |
| **Liveness** | something is still happening | a heartbeat event | position, duration, or whether it will succeed |
| **Elapsed** | you have been waiting this long | a clock | the process at all — it is a fact about the user |
| **Named stage** | *this* thing is happening now | the week 2 state model | how many stages remain |

Elapsed is the one people skip, and it is the strongest of the three, because it
is the only one that cannot be wrong. It is also the one that makes a stall
visible without your having to detect a stall — a counter that reaches 0:45 on a
process that usually takes 0:06 has communicated a problem with no error
handling whatsoever.

**The fractional-reading trap.** An indeterminate display must not admit a
fractional reading, and the test is *what a reader can take from it*, not what
the code intends:

- A spinner that slows down reads as "nearly there."
- A three-dot animation sitting on its third dot reads as two-thirds.
- A bar that sweeps left-to-right reads as position, even when the sweep repeats.
- A stage list showing "Step 2" with no total still reads as "2 of about 3 or 4",
  because readers estimate totals from ordinals.

If a user can form a ratio from it, you have made a determinate claim with
indeterminate data. That is the one hard constraint on today's work.

**[View this week's slides](/decks/week-04/)** — Tuesday's lecture deck. Worth a pass before the studio, and the reference while you build.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 18 March, 14:00–17:00. Tuesday's lecture is the teaching; today is the
build.

| Time | What happens |
| --- | --- |
| 14:00 | **Fraction hunt (20 min).** Six indeterminate treatments on the projector, none containing a number. Vote on which ones admit a fractional reading. The room usually disagrees, which is the lesson. |
| 14:20 | **Build.** Three treatments. |
| 16:15 | **Rule-writing (20 min).** In pairs, draft the permission rule. Swap and try to find a case your partner's rule handles wrongly. |
| 16:45 | **Read two rules aloud.** |

## What you start with

- Your prototype through week 3, with a working determinate bar.
- The simulator's **unknown-length stream**, already wired and currently
  rendering a bar stuck at zero. That behaviour is the starting point, not a bug
  to report.
- Tuesday's lecture, [Saying Nothing, Precisely](/lectures/week-04/).

## What you build

1. **Three treatments** against the unknown-length stream: liveness, elapsed,
   and named stage. Each independently selectable so they can be compared.
2. **A fraction audit** of your own three — including the document title and the
   favicon, which are where fractions survive a cleanup.
3. **A permission rule**, one paragraph, saying which treatment is allowed when.
   "Named stage when the state model can name the current stage; elapsed always;
   liveness only when neither of the others is available" is the shape. Yours
   should differ and should be defensible.

## A worked example

The same moment in the unknown-length stream, in each of the three registers:

```
liveness      ◆ ◆ ◆ ◆         "Still uploading"
elapsed       0:12            "Uploading — 12 seconds so far"
named stage   ▣ read ▣ hash ▶ transfer     "Transferring"
```

All three are true at t = 12 s, and none implies a fraction. The fourth thing
most people build — a bar creeping to 90% and waiting — implies one, and has no
event behind it.

The stream's length is withheld by the simulator; nothing is transferred.

## Done when

- Your three treatments run against a stream whose total is genuinely unknown to
  your code — not a known total you are pretending not to read.
- Nothing anywhere admits a fractional reading. Check the tab title.
- Your rule decides the awkward case: what happens when a stage becomes
  nameable partway through.

## The mistake to expect

**Reaching for `value="0"` when there is no value.**

```html
<div role="progressbar" aria-valuenow="0">              <!-- "nothing has happened" -->
<div role="progressbar" aria-valuetext="Transferring, total unknown">
```

Omitting `aria-valuenow` is how the platform spells *indeterminate*. Setting it
to zero is a different claim, and on a stream four stages in it is a false one.
This exact line is audited in [week 7](/sessions/07-without-the-animation/).

## Before next week

About two to three hours.

1. Apply your own rule to your week 3 determinate prototype. It should tell you
   which treatment appears when the denominator runs out near the end — the
   99%-forever case from week 1. Make that transition work.
2. Week 5 uses a supplied transfer trace. Pull it (`git pull` on `upload-ui`) and
   check the plotting harness runs before Thursday.


## If you are joining late

`git checkout stage-04` gives you a prototype with the state model, a
byte-counted bar, and the unknown-length stream wired into the simulator but
unhandled — it currently renders a bar stuck at zero. It is a floor, not an
answer: the three treatments and the rule are yours.

## What this week cannot tell you

Whether users prefer any of these, or understand any of them.

You have built three truthful displays. Truthful is not the same as
comprehensible, and nothing today tested comprehension. Two later weeks get at
it from different directions: [week 6](/sessions/06-motion-and-the-felt-wait/)
compares how they feel, with results weaker than you will want them to be, and
[week 11](/sessions/11-watching-someone-wait/) puts them in front of someone who
has never seen them.

There is also a real cost you cannot measure today. Elapsed time is the most
honest register and it is the one that makes a wait feel longest. That trade is
the course's subject and this week does not resolve it.
