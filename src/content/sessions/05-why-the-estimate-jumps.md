---
title: Why the estimate keeps jumping
description:
  Three estimators over one recorded transfer. Measure how much each one
  contradicts itself, then decide what to round to.
question: You have a denominator. What can you honestly say about time?
week: 5
outcomes:
  - LO1
  - LO2
  - LO4
date: 2027-03-25
teachers:
  - idris-fenn
spec:
  - three estimators run over the same supplied transfer trace
  - each estimator's instability is recorded as a number, by the same measure
  - the prototype names the estimator it ships, its rounding rule and its refresh interval, on screen
related:
  - 03-where-is-the-denominator
  - 04-no-idea-how-long
  - 10-numbers-without-sources
  - assessments/waiting-interface-prototype
readings:
  - title: "Exponential smoothing"
    source: "Wikipedia"
    url: "https://en.wikipedia.org/wiki/Exponential_smoothing"
    why: "Read the Basic (simple) exponential smoothing section only. The one-line recurrence is the whole of the third estimator, and the article is explicit about what the smoothing factor assumes."
  - title: "curl man page \u2014 the progress meter"
    source: "curl project"
    url: "https://curl.se/docs/manpage.html"
    why: "Search for --progress-bar. A thirty-year-old progress meter shipping on millions of machines, documented unusually bluntly about what the display can and cannot promise. Worth seeing a design that chose austerity."
---

"About 4 minutes remaining" is not a measurement. It is a **prediction**, and
predictions have error.

Here is the case. The supplied trace `trace-office-wifi.json` is a 60 MB upload
that took 94 seconds. It starts fast, drops to almost nothing for 12 seconds
around the 40-second mark, then recovers. Run a naive estimator over it and the
displayed figure goes: 38s, 41s, 39s, 2m 10s, 6m 40s, 11m, 3m 20s, 52s, 44s.

Every one of those numbers was correctly computed. The user watched the estimate
more than triple and then fall back, and concluded the software had no idea what
it was doing — which, for twelve seconds, was exactly right.

## By the end of this week

You can:

- compute a time-remaining estimate three different ways from the same data;
- measure an estimator's instability as a number, and compare estimators on it;
- explain what each estimator assumes about the future, and name the traffic
  pattern that breaks it;
- choose a rounding rule and a refresh interval, and justify both as a trade
  against the instability you measured.

## The idea

No lecture this week. The deck and the 14:00 framing are the teaching.

All three estimators answer the same equation — *remaining work ÷ rate* — and
differ only in what they think "rate" means.

**Naive linear.** Rate is total progress over total elapsed time. Assumes the
future looks like the whole past, including the part that is no longer true.
Extremely stable when conditions are steady, and grotesquely wrong for a long
time after they change, because early fast seconds keep propping the average up.

**Sliding window.** Rate is progress over the last *n* seconds. Assumes the
future looks like the recent past. Reacts to the stall quickly, which is the
point, and also reacts to every ordinary fluctuation, which is the cost. The
window length is the whole design: too short and the number is noise, too long
and you have reinvented the naive estimator.

**Exponentially weighted.** Rate is a running average where each new sample is
worth α and the accumulated history is worth 1−α. Assumes the future looks like
the recent past, *smoothly*. One parameter instead of a window, no buffer, and a
gentler response to a spike.

None of them knows about the stall. That matters: an estimator's job is to
convert a rate into a time, not to detect that the process has stopped. Stall
detection is [week 8](/sessions/08-stuck-timed-out-disconnected/), and keeping
those two jobs apart is why this week's estimators are allowed to be simple.

**Instability, as a number.** Use the same measure for all three so they can be
compared: the **mean absolute change in the displayed value between consecutive
refreshes**, in seconds. This measures what the user experiences — how much the
number jumps — not how close it got to 94.

That distinction is worth sitting with. An estimator can be more accurate and
more annoying. Deciding which you want is not a technical question, and it is
one of the few places this course asks you to make a judgement call and then
defend it.

**[View this week's slides](/decks/week-05/)** — the 14:00 framing runs from these. They carry the worked example and the exercise brief.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 25 March, 14:00–17:00. No lecture; the deck runs at 14:00.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing from the [week 5 deck](/decks/week-05/) (30 min).** The three estimators, the office-wifi trace worked through on the projector, and a counterexample where the "best" estimator is the wrong choice. |
| 14:30 | **Build.** Three `estimate()` function bodies. The trace and the plotting harness are supplied; you write only the estimators. |
| 15:45 | **Measure.** Instability for each, same measure, same trace. |
| 16:15 | **Discussion (25 min).** The prompt is on the last slide: *a smooth estimate that is wrong for twenty seconds, or a correct estimate that visibly panics — which do you ship, and who does your answer disadvantage?* |
| 16:45 | **Decide.** Estimator, rounding rule, refresh interval, written down. |

## What you start with

- Your prototype through week 4.
- **Two recorded traces**: `trace-office-wifi.json` (60 MB, 94 s, with a 12-second
  stall around t = 40 s) and `trace-steady.json` (60 MB, no stall).
- A **plotting harness** that replays a trace and graphs whatever your estimator
  returns.
- Three `estimate()` stubs in `src/estimators.js`, all returning `null`.

## What you build

1. **Three estimators** in `src/estimators.js`, each a pure function of the trace
   so far. Signatures are given; the bodies are yours.
2. **Three instability figures**, same measure, same trace, in a table.
3. **A second run** over `trace-steady.json`, which has no stall. The ranking
   usually reverses, and noticing that is part of the exercise.
4. **A shipping decision** displayed in your prototype: which estimator, rounded
   to what, refreshed how often.

## A worked example

What the naive estimator displays as the office-wifi trace crosses its stall,
refreshed every two seconds:

| t | displayed |
| --- | --- |
| 36 s | 41 s remaining |
| 40 s | 39 s remaining |
| 44 s | **2 min 10 s** |
| 48 s | **6 min 40 s** |
| 52 s | **11 min** |
| 56 s | 3 min 20 s |
| 60 s | 52 s |

Every one of those was correctly computed. Instability, by this week's measure —
mean absolute change between consecutive refreshes — is about **150 s**. The
same estimator over `trace-steady.json` scores under 2 s.

Recorded sample data, not a live measurement.

## Done when

- All three run over both traces without special-casing either.
- You have six numbers in a table, and you can say which estimator wins on which
  trace and why.
- Your on-screen statement is concrete: "sliding window, 10 s, rounded to the
  nearest 10 seconds, refreshed every 2 seconds" — not "estimated time
  remaining".
- Your rounding rule makes the displayed number change less often than the
  underlying estimate. If it does not, it is not doing anything.

## The mistake to expect

**Rounding that does not reduce anything.**

A rounding rule exists to make the *displayed* number change less often than the
underlying estimate. Rounding to the nearest second, then refreshing every
second, changes nothing — you have written a rule that does no work.

The second: treating the lowest instability figure as the winner. The calmest
estimator is not the most honest one, and this course does not treat those as
the same thing.

## Before next week

About two hours.

1. Add your estimator to the prototype behind the determinate bar from week 3,
   and check what it displays during the unknown-length stream from week 4. It
   should display nothing. If it displays "calculating…" forever, decide whether
   that is a liveness claim.
2. Bring headphones-off attention to week 6: you are a participant as well as a
   builder, and the exercise does not work if you have read ahead about it.


## If you are joining late

`git checkout stage-05` gives you the prototype with the determinate bar, the
indeterminate treatments, the two traces and a working plotting harness, plus
three `estimate()` stubs that all return `null`. It is a floor, not an answer:
every line inside the three functions, and every decision after them, is yours.

## What this week cannot tell you

Whether a jumpy-but-accurate estimate beats a smooth-but-wrong one.

You will have the data to pose that question precisely — two traces, three
estimators, six instability figures — and no way at all to settle it, because
settling it requires knowing what a waiting person does with the number, and
nobody has watched one yet.

Do not let the table decide for you. The estimator with the lowest instability
is the calmest, not the most honest, and this course does not treat those as the
same thing. Write down which one you *want* to ship and why, before
[week 11](/sessions/11-watching-someone-wait/) gives you your first and only
outside evidence.
