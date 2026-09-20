---
title: Where is the denominator?
description:
  Percent of what? Build the same upload twice — counted in bytes, counted in
  stages — and measure where the two disagree.
question: When your bar says 40%, forty per cent of what has happened?
week: 3
outcomes:
  - LO1
date: 2027-03-11
teachers:
  - idris-fenn
spec:
  - a byte-counted bar and a stage-counted bar run against the same simulated upload
  - both readings are logged on the same timeline, and the largest disagreement between them is recorded as a number
  - the page states which denominator the prototype ships with, and names what that denominator excludes
related:
  - 02-what-counts-as-done
  - 05-why-the-estimate-jumps
  - 10-numbers-without-sources
  - assessments/waiting-interface-prototype
readings:
  - title: "ProgressEvent.lengthComputable"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent/lengthComputable"
    why: "Two paragraphs holding the whole of this week's question: the platform hands you a boolean saying whether a denominator exists, and total is meaningless when it is false."
  - title: "XMLHttpRequest: progress event"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event"
    why: "What a browser actually reports during an upload, at what granularity. Note what is not in it: nothing about what the server does after receiving the bytes."
---

Take the case from week 1 again: 40 MB, 99% in nine seconds, then eleven seconds
of nothing.

Here is one ordinary explanation. The bar was counting **bytes handed to the
network stack**. All 40 MB were handed over in nine seconds, because the machine
was on a fast connection and the bytes went into a buffer. The eleven seconds
were the server hashing the file and writing it. The bar had no denominator for
*that*, so it stopped at 99% and waited — which is the interface admitting, in
the only vocabulary it had, that its denominator had run out.

The bar was not lying. It was answering a different question from the one the
user was asking.

## By the end of this week

You can:

- name the denominator behind any percentage in a waiting interface, or show
  that there isn't one;
- implement byte-counted and stage-counted progress over the same process and
  measure where they diverge;
- state what a chosen denominator excludes, in a sentence a user could read;
- choose a denominator and defend the choice against the specific way it will
  mislead.

## The idea

No lecture this week. This section and the 14:00 framing are the teaching.

A percentage is a fraction, and a fraction needs both numbers. Interfaces are
usually careful about the numerator and careless about the denominator, which is
how you get a bar that is accurate and useless at the same time.

**Byte-counted.** `loaded / total`, straight from the platform. Cheap, smooth,
updates often. It excludes everything that is not transfer — hashing,
validation, virus scanning, thumbnailing, durability. On a fast connection
uploading to a slow service, the excluded part is most of the wait.

**Stage-counted.** `stagesCompleted / stagesTotal`, from the state model you
built in [week 2](/sessions/02-what-counts-as-done/). Covers the whole process,
including the parts bytes cannot see. It moves in lurches, and it silently
assumes all stages are the same size, which they never are.

**Weighted stages** are the obvious third option, and they are honest only if
the weights come from measurement. A weight you guessed is a number with no
source event, which puts it straight into your
[week 10](/sessions/10-numbers-without-sources/) register.

The platform is unusually direct about this. A browser `progress` event carries
a `lengthComputable` flag, and when it is false, `total` is meaningless. Most
code reads `total` without checking. That flag is the platform telling you
whether you have a denominator at all, and it is the subject of
[week 4](/sessions/04-no-idea-how-long/).

## In the room

Thursday 11 March, 14:00–17:00. No lecture this week.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (25 min).** Denominators, and the exclusion each one hides. Worked on the week 1 case: which denominator makes that interface's behaviour correct, and which makes it wrong? |
| 14:25 | **Build.** Two bars, one transfer. |
| 16:00 | **Measure.** Find the moment the two readings are furthest apart. Write the number on the board. |
| 16:30 | **Compare.** The spread of numbers across the room is the point — same simulator, same transfer, different models. |

## What you build

1. **Two bars over one simulated upload**: bytes transferred over bytes total,
   and stages completed over stages known. Both visible at once, both driven by
   the same run.
2. **A log** of both readings on one timeline, at whatever interval is useful.
3. **The disagreement number**: the largest gap between the two readings during
   a run, in percentage points, and the moment it occurred.
4. **A shipping decision**: which denominator your prototype uses from now on,
   stated on screen along with what it excludes.

## Done when

- Both bars run from one press of Start, and neither is faked from a timer.
- You can state the largest disagreement as a number and say when it happened.
- Your on-screen denominator statement is specific: "bytes sent, which excludes
  server-side verification" rather than "upload progress".

## Before next week

About two hours.

1. Repeat the measurement with the simulator's slow-network preset. The
   disagreement usually shrinks, and being able to say *why* is week 5's
   groundwork.
2. Find one real interface where you can tell the denominator has run out — a
   bar that stalls near the end is the usual tell — and write two sentences on
   what you think it was counting.


## If you are joining late

`git checkout stage-03` gives you a prototype with a state enumeration and a
working simulator, and a single byte-counted bar. It is a floor, not an answer:
the stage-counted bar, the log and the decision are yours.

## What this week cannot tell you

Which denominator is *right*.

There is no measurement in this exercise that settles it, because "right"
depends on what the user is waiting to find out, and you have not asked one.
What this week gives you is sharper: the knowledge of what each denominator
omits, and a number for how much that omission is worth on your own simulated
transfer.

The first time anybody other than you reacts to the choice is
[week 11](/sessions/11-watching-someone-wait/).
