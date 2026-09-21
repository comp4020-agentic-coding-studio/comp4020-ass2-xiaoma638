---
title: Saying Nothing, Precisely
description:
  The difference between not knowing how long and having nothing to say, and
  the three honest registers available when there is no denominator.
week: 4
date: 2027-03-16
teachers:
  - marisol-quaye
slides: /decks/week-04/
related:
  - sessions/04-no-idea-how-long
  - sessions/03-where-is-the-denominator
  - sessions/08-stuck-timed-out-disconnected
---

[Slides](/decks/week-04/)

## What this lecture carries

**Three registers, and what each one asserts.** When there is no denominator,
an interface still has three honest things it can say, and they are not
interchangeable:

- **Liveness** — something is still happening. Asserts nothing about progress,
  position or duration. The weakest claim available, and often the only true one.
- **Elapsed** — you have been waiting this long. A fact about the user, not
  about the process. Always available, never a prediction.
- **Named stage** — this particular thing is happening now. Requires the state
  model from [week 2](/sessions/02-what-counts-as-done/) and says nothing about
  how many stages remain.

**The fractional-reading trap.** An indeterminate display must not admit a
fractional reading, and the test is what a reader can take from it rather than
what the code intends. A spinner that slows near the end reads as "nearly
there". A three-dot animation on its third dot reads as two-thirds. If a user
can form a ratio from it, you have made a determinate claim with indeterminate
data.

**Why this is harder than a percentage.** A bar at 40% is one decision. Liveness
plus elapsed plus stage is three decisions that have to agree with each other,
and the interface has to degrade between them as knowledge arrives and departs
mid-transfer.

## What it builds on

[Week 2](/sessions/02-what-counts-as-done/) supplied the vocabulary: a state can
be known while its duration is not. [Week 3](/sessions/03-where-is-the-denominator/)
established that a denominator is a countable source event. This lecture is the
case where no such event exists — which, on a real upload, is most of the time.

## What it sets up

| Where it lands | What it carries there |
| --- | --- |
| [Week 4 studio](/sessions/04-no-idea-how-long/), two days later | builds all three registers against an unknown-size upload |
| [Week 5](/sessions/05-why-the-estimate-jumps/) | the mirror case — a denominator exists, and the estimate derived from it is still unstable |
| [Week 7](/sessions/07-without-the-animation/) | each register needs a different `aria-valuetext`, and "no value" is not the same as "nothing to say" |
| [Week 8](/sessions/08-stuck-timed-out-disconnected/) | a stall is liveness that has stopped being true |

## A worked example

Four displays, none containing a number. Which of them make a fractional claim?

- **A spinner at constant speed.** No. It asserts liveness and nothing else.
- **A spinner that slows near the end.** Yes. "Near the end" is the reader's
  conclusion, and the animation invited it.
- **Three dots, animating in sequence.** Yes, on the third dot. Readers count.
- **"Checking your file"** with no timer. No — but it also asserts nothing about
  duration, which is why elapsed usually belongs beside it.

The test is never what the code intends. It is what a reader can construct from
what they see.

## What this lecture cannot settle

The three registers are exhaustive for *what you may truthfully say*. They are
not a ranking.

Nothing in this lecture establishes which of them a user would rather have, and
there is a real cost hiding in the answer: elapsed time is the most honest
register and the one that makes a wait feel longest. Week 6 puts that trade in
front of the class and fails to settle it, on purpose.

## If you miss the hour

The [slides](/decks/week-04/) carry the argument in the order it was made, and this week's
reading is listed on the [studio page](/sessions/). The studio on Thursday
assumes the vocabulary above rather than re-teaching it, so read the deck before
you arrive rather than after.
