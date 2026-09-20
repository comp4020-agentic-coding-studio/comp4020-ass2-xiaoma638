---
title: What does 99% promise?
description:
  The opening autopsy. Take a waiting interface you did not build, list every
  claim it makes, and find the ones that cannot have a source.
question: Looking only at what is on the screen, what has this interface claimed?
week: 1
outcomes:
  - LO1
  - LO4
date: 2027-02-25
teachers:
  - marisol-quaye
  - idris-fenn
spec:
  - every claim visible in the recording appears in your table
  - each claim carries a verdict, and "not determinable from outside" is used where it is true
  - the course prototype runs locally and you can trigger a simulated upload
related:
  - 10-numbers-without-sources
  - 02-what-counts-as-done
  - lectures/week-01
  - assessments/progress-bar-autopsy
readings:
  - title: "Response Times: The 3 Important Limits"
    source: "Nielsen Norman Group"
    url: "https://www.nngroup.com/articles/response-times-3-important-limits/"
    why: "Where the thresholds that force a waiting interface to exist come from \u2014 about one second before a user notices a delay, about ten before they lose the thread. This week's case sits well past both."
  - title: "Progress Indicators Make a Slow System Less Insufferable"
    source: "Nielsen Norman Group"
    url: "https://www.nngroup.com/articles/progress-indicators/"
    why: "The standard argument for progress bars. Read it as the position the rest of this course argues with: it is about how waiting feels, and says very little about whether the indicator is telling the truth."
---

Here is the case for this week, and you have almost certainly lived it.

You attach a 40 MB video to a web form. A bar fills smoothly to 99% in about
nine seconds, then stops. The percentage does not change for eleven seconds.
The bar keeps animating — a soft diagonal shimmer moves across it the whole
time. Then the page says **Upload failed. Please try again.**

Something in that sequence was untrue. This week you work out what, and more
usefully, you work out *which parts you are in a position to judge from the
outside at all*.

## By the end of this week

You can:

- list every claim a waiting interface makes, including the ones made by motion
  and by silence rather than by text;
- for each claim, name an event the underlying process could emit that would
  support it, or say that none could;
- tell the difference between a claim that is false and a claim you simply
  cannot check from outside the system, and say which one you are looking at;
- run the course prototype and trigger a simulated upload.

## The idea

Tuesday's lecture, [What 99% Promises](/lectures/week-01/), sets up three terms.
They are the whole method, so they are repeated here.

A **claim** is anything a reader can take from the interface. The obvious ones
are numbers and words. The less obvious ones matter more:

- **motion** — a bar that shimmers while nothing else changes is claiming the
  process is alive. In the case above, that claim was false for eleven seconds
  and nothing in the text said so.
- **rate** — a bar that reaches 99% in nine seconds implies the last 1% takes
  about a tenth of a second. It took eleven.
- **absence** — a screen that shows no error is claiming there is nothing to
  report.

A **source event** is something the process *reports*, at a moment you could
write down. This is the distinction people slide off. A server writing bytes to
disk is something the process *does*; `progress: 4.2 MB of 11 MB` is something
it *reports*. Only the second can support a claim on a screen. Most invented
progress lives exactly in that gap: a real activity with no corresponding
report, filled in with an animation.

A **verdict** pairs the two. You have three this week:

| Verdict | Means |
| --- | --- |
| `sourced` | an event exists that could plausibly produce this |
| `unsourceable` | nothing the process could emit would produce this |
| `not determinable from outside` | you are outside the system and cannot tell |

The third verdict is not a cop-out; it is the honest majority of a black-box
analysis, and using it correctly is a marked skill. In
[week 10](/sessions/10-numbers-without-sources/) you do this exercise again from
*inside* your own code, and that verdict is withdrawn.

## In the room

Thursday 25 February, 14:00–17:00.

| Time | What happens |
| --- | --- |
| 14:00 | **Setup (20 min).** Clone `upload-ui`, install, run it, trigger one simulated upload. Raise a problem now rather than in week 3. |
| 14:20 | **Worked example together (20 min).** The 40 MB case above, on the projector, as a claims table. We fill the first four rows as a class so the format is not the thing you are struggling with. |
| 14:40 | **In pairs.** One of six supplied screen recordings of real waiting interfaces. |
| 16:15 | **Swap.** Take a recording another pair has already done, and build your table before you read theirs. |
| 16:45 | **One claim each.** Everybody names the claim they found least defensible, and says which verdict they gave it. |

## What you build

A **claims table** for one recorded interface, one row per claim:

| Column | What goes in it |
| --- | --- |
| **Claim** | the number, phrase, motion or absence, quoted or described exactly |
| **Possible source** | an event the process could emit that would support it |
| **Verdict** | `sourced` · `unsourceable` · `not determinable from outside` |

## Done when

- Every claim visible in your recording has a row. Pause the recording and scan
  the screen; anything that changed is a claim.
- No row is blank. "I don't know" is spelled `not determinable from outside`.
- You have at least one row of each of the three verdicts, or you can say why
  the recording genuinely had none of that kind.

## Before next week

About two hours.

1. Finish the table if the room ran out of time.
2. Watch your own machine do something slow — an OS update, a large download,
   a phone backup — and write down three claims it makes. No table needed; a
   list is enough. Bring it to week 2.
3. Read the two NN/g pieces below. They are short.


## If you are joining late

Not applicable — this is week 1. But `upload-ui` has a `stage-01` tag, and every
later week has its own. A stage checkpoint is a floor, not an answer: it
restores the mechanism the next week needs and leaves every judgement in it
unmade.

## What this week cannot tell you

Whether any of these interfaces is *wrong*.

An unsourceable claim is not automatically a bad one. A designer may have had an
excellent reason to show a number nobody can justify — a legal requirement, a
platform default, a constraint you cannot see from out here. From outside the
system you cannot distinguish a lie from a shortcut from a limitation.

You are recording what is claimed and what could support it. Judgement comes
later, and it comes with evidence.
