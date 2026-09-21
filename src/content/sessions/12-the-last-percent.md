---
title: The last percent
description:
  Eight minutes each. Drive the interface through success, stall and failure,
  then defend one claim you knowingly kept.
question: Can you defend every number left on your screen?
week: 12
outcomes:
  - LO1
  - LO2
  - LO3
  - LO4
date: 2027-05-27
teachers:
  - marisol-quaye
  - idris-fenn
spec:
  - the demonstration drives the deployed interface through success, a stall and a failure, live
  - the presenter names one claim kept without a source event and gives the reason
  - two challenges from the room are answered from evidence, without appeal to how something feels
related:
  - 10-numbers-without-sources
  - 11-watching-someone-wait
  - 01-what-99-percent-promises
  - assessments/honest-waiting-kit
---

Twelve weeks ago you watched a bar sit at 99% for eleven seconds and then fail.
You could say something was wrong with it and not much more.

Today you show an interface that does not do that, and you take questions about
the parts of it you could not make honest.

The demonstration is part of
[Assignment 3](/assessments/honest-waiting-kit/) and carries its **Defence**
criterion. The written kit is due tomorrow, so today is a defence of finished
work, not a deadline.

## By the end of this week

You can:

- demonstrate a stateful interface through success and two failure paths, live,
  without a rehearsed happy path;
- state a design decision you made without sufficient evidence, and say what it
  cost;
- answer a challenge from evidence rather than from preference, or concede;
- recognise when you are about to defend something with "it felt better", and
  say something true instead.

## The idea

No lecture this week. The 14:00 briefing sets the rules of the room.

**Why a defence and not a presentation.** Everything else in this course is
marked on artefacts you control. A defence tests the one thing an artefact
cannot show: whether you know *why*. A well-built interface whose maker cannot
say which of its numbers are invented is a weaker outcome than a rougher one
whose maker can.

**What a good answer sounds like.** The challenge will usually be some version of
*why is that there?* Three answers score:

- *"It holds — that string comes from the acknowledgement event, here."*
- *"It doesn't hold. I kept it because of X, and it costs Y."*
- *"I don't know, and here is how I would find out."*

One answer does not score, and the room has been trained since week 1 to call
it: **"it felt better."** Not because preference is illegitimate — week 6 was an
entire studio on preference — but because *"I preferred it and I have no evidence"*
is available, true, and takes the same breath.

**The claim you choose matters.** Choose a `kept with reason` row from your
[week 10](/sessions/10-numbers-without-sources/) register that you genuinely
find uncomfortable. A safe choice produces a safe two minutes and a low
Defence mark. The room is not hostile and nobody is trying to catch you out; the
criterion rewards the difficulty of the question you volunteered for.

**[View this week's slides](/decks/week-12/)** — the 14:00 framing runs from these. They carry the worked example and the exercise brief.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 27 May, 14:00–17:00.

| Time | What happens |
| --- | --- |
| 14:00 | **Briefing (10 min).** The rules: eight minutes, live on the deployed URL, three paths, two challenges. |
| 14:10 | **Showcases.** Eight minutes each, in two blocks with a break. |
| 16:40 | **Close (20 min).** Everyone re-reads their own week 1 claims table. Nothing is submitted; it is the last ten minutes of the course and the comparison is the point. |

## What you start with

- Your deployed site, finished. Nothing is built today.
- The `kept with reason` rows from your claims register — choose one before you
  arrive.
- Your week 1 claims table, for the last ten minutes of the course.

## What you build

Nothing new. You demonstrate what exists:

1. **Three paths, live**, on your deployed URL, using the exposed simulator
   controls: a success, a stall, and one failure of your choosing.
2. **One kept claim**, named, with the reason and its cost.
3. **Two challenges**, answered.

## A worked example

What a defence that earns the marks sounds like.

**Claim kept:** the verification state is held on screen for 400 ms when it
lasts about 80 ms.

> **Challenge:** "So the interface is lying about a duration."
>
> **Answer:** "Yes, by up to 320 ms, and the register says so. I kept it because
> at 80 ms the state reads as a flicker rather than a state. The cost is that
> anyone comparing it with the elapsed counter sees them disagree. If I had
> another week I would hold it only when the stage is shorter than 200 ms,
> rather than always."

It names the deception, the reason, the cost, and the thing not done. Compare
the answer that scores nothing: *"it felt better."*

## Done when

- The three paths ran on the deployed site, not on `localhost`, and not from a
  recording.
- You named a claim from your own register rather than a general limitation of
  progress bars.
- Both challenges got an answer of one of the three shapes above. "I don't know,
  and here is how I'd find out" is a full-credit answer.

## The mistake to expect

**Rehearsing the happy path.**

A demo that only shows a success has not shown the course. Three paths are in
the spec line, and a stall you cannot trigger on demand is a stall you cannot
claim to handle.

The second: demoing from `localhost` because the deploy is slow. The deployed URL
is what the criterion names, and base-path bugs only ever appear there.

## Before next week

There is no next week. [Assignment 3](/assessments/honest-waiting-kit/) is due
**Friday 28 May at 17:00** — the day after this studio.

By design there is nothing left to write today. The state reference came out of
weeks 2 and 8, the claims register is the week 10 deliverable, and the evaluation
record is the week 11 deliverable. If you followed the weeks, tomorrow is
assembly and a final read-through.


## Reading

No reading. The last week is a defence of work that is already finished.

## Where the course's material lives

Twelve weeks of readings are collected on the [readings page](/readings/), and
the [glossary](/glossary/) has the terms this course used in a specific way —
`source event`, `denominator`, `liveness`, `kept with reason`. Both outlive the
semester; the prototype probably does not.

## If you are joining late

`git checkout stage-11` is the last checkpoint — there is no `stage-12`, because
this week builds nothing. If you are arriving now, you are demonstrating the
checkpoint prototype and defending decisions somebody else made, which is a
legitimate and quite difficult version of the exercise. Tell your tutor
beforehand so the questions are pitched at that.

## What this week cannot tell you

Whether you were right.

A defence establishes that you can say why, from evidence, and that you know
which of your decisions are unsupported. It does not establish that the
decisions were good ones. Nobody in this room has watched a stranger use your
interface under real pressure with a file they needed, and that is the test that
would settle it.

What you can take away is smaller and more portable: you can now look at any
waiting interface — including one you are about to build at work — and say what
it is claiming, what could support each claim, and which parts of it were
invented to fill a silence.
