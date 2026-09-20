---
title: Watching someone wait
description:
  Three classmates, fifteen minutes each, one stall they were not warned about.
  Then the harder part — deciding which of what you saw is worth acting on.
question: What did watching three people tell you that you could not have worked out at your own desk?
week: 11
outcomes:
  - LO3
  - LO4
date: 2027-05-20
teachers:
  - marisol-quaye
  - idris-fenn
spec:
  - three observation records exist, holding what people did and said rather than what you concluded they meant
  - three handling decisions are proposed, each naming the observation behind it
  - at most three changes are made to the prototype, and a decision to change nothing is recorded with its reason
  - the write-up states what this observation cannot establish, in terms specific to this session
related:
  - 10-numbers-without-sources
  - 06-motion-and-the-felt-wait
  - lectures/week-11
  - assessments/honest-waiting-kit
---

Last week you audited your own claims from the inside, with the source code in
front of you. Today somebody who has never seen your interface uses it, hits a
stall you did not warn them about, and says out loud what they think is
happening.

You will not learn whether your interface is good. You will learn whether the
thing you meant it to say is the thing it says — and only for the three people
in front of you, on the day, in this room.

## In the room

Thursday 20 May, 14:00–17:00. Tuesday's lecture,
[Three People Is Not a Study](/lectures/week-11/), is the teaching: what a
handful of observations can and cannot establish, and how to record behaviour
rather than your reading of it.

The session time **is** the recruitment. You do not need to find participants
outside class.

| Time | What happens |
| --- | --- |
| 14:00 | **Setup (15 min).** Collect the task script, the consent statement and the record sheet. Load the build you will test; no edits from here until 16:00. |
| 14:15 | **Rotation.** Three rounds of 15 minutes as observer, three as participant, in groups of four. You read the consent statement aloud before each round, and you stop if asked. |
| 15:45 | **Write up.** Fill the record sheets before you discuss anything with anyone. |
| 16:00 | **Decide.** The three decisions below. |
| 16:40 | **Round the room.** Each person names one thing they saw and are **not** acting on, and why. |

## The alternative task

Observing classmates is not compulsory. If you would rather not take part — as
observer or participant, for any reason, with no explanation required — tell a
tutor before the session and you will be given the **structured walkthrough**
instead: the same task script, worked against a written set of states, with each
step's expected reading recorded before you look at the interface.

It is graded identically, on the same criterion, and it is not a smaller task.
What it is not is user research, and your write-up must say so plainly. A
walkthrough is evidence about the interface's internal consistency. It is not
evidence about people, and a walkthrough written up as though somebody had been
watched is the one way to actually lose marks here.

## What you build

Three **handling decisions**, each naming the observation behind it — and at
most three changes to the prototype.

The gap between those two numbers is deliberate. A decision is your answer to
something you saw; a change is one possible answer among several. All of these
are legitimate decisions:

- **Change it.** You saw the same thing twice, you understand the cause, and the
  fix is smaller than the problem.
- **Leave it and say why.** You saw it once, from one person, and you cannot
  separate it from the fact that they had never used the interface before.
- **Leave it and name the test.** You believe it is real but one observation
  cannot tell you, so you write down what would settle it.

Three changes is a ceiling, not a target. Shipping three changes on one thin
observation apiece is a worse outcome than shipping one change and two honest
deferrals, and it is marked as one.

## How you'll know it worked

- Your record sheets contain sentences somebody actually said, in their words,
  and things they actually did. If a sheet says "the user was confused", it is
  not a record — it is your conclusion with the evidence deleted.
- Each of your three decisions can be traced to a line on a sheet.
- You can state, without hedging, one thing you believe about your interface
  that this session did **not** test.

## If you are joining late

`git checkout stage-11` gives you a prototype complete through week 10 — states,
estimator, indeterminate handling, failure states, cancel and retry, all
present and unopinionated. You test that one. It is not your design, which
makes the observation easier to hear and the decisions harder to make; say so
in your write-up.

## What this week cannot tell you

A great deal, and naming it precisely is half the exercise.

Three people is enough to prove that something **can** happen — one person
reading a stall as a failure is a real finding, and one observation is enough to
establish it. It is nowhere near enough to say how **often** it happens. No
number of classmates will get you there, so do not reach for proportions: "two
of three" is a count of this room, not a rate.

Your participants are also biased in a way you can name exactly. They are in
this course. They know a stall is coming, because stalls are week 8. They have
built the same interface. They are the most forgiving and the most suspicious
users your prototype will ever have, simultaneously.

On [Assignment 3](/assessments/honest-waiting-kit/) you are marked on whether
your conclusions are proportionate to your evidence — not on how many people
you watched. A confident claim from three observations loses marks. A careful
claim from one does not.
