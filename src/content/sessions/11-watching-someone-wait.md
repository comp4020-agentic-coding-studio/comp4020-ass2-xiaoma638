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
  - 12-the-last-percent
  - lectures/week-11
  - assessments/honest-waiting-kit
readings:
  - title: "Why You Only Need to Test with 5 Users"
    source: "Nielsen Norman Group"
    url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/"
    why: "The standard argument for small-n usability testing. Read it critically and note the scope of the claim: it is about the share of findable usability problems surfaced, not about how often anything happens in a population \u2014 exactly this week's existence-proof-versus-rate line."
  - title: "Progress Bars (research summary)"
    source: "Chris Harrison, Carnegie Mellon"
    url: "https://www.chrisharrison.net/index.php/Research/ProgressBars"
    why: "Re-read after week 6. Compare the participant numbers and controls in that work against what you ran today, and you have the size of the gap between an experiment and an afternoon."
---

Last week you audited your own claims from the inside, with the source in front
of you.

Today somebody who has never seen your interface uses it, hits a stall you did
not warn them about, and says out loud what they think is happening.

You will not learn whether your interface is good. You will learn whether the
thing you meant it to say is the thing it says — for three people, on one
afternoon, in this room.

## By the end of this week

You can:

- run a short structured observation from a supplied script, including the
  consent step, without coaching the participant;
- record behaviour and verbatim speech rather than your interpretation of them;
- state what three observations can establish and what they cannot, in terms
  specific to the session you ran;
- decide what to do about an observation, including deciding to do nothing, and
  defend the decision from the record.

## The idea

Tuesday's lecture, [Three People Is Not a Study](/lectures/week-11/), is the
teaching. The two ideas you need at the desk:

**Existence proofs and rates.**

- *"At least one person read the stall as a failure."* Established by one
  observation. Real, reportable, often enough to act on.
- *"Most people read the stall as a failure."* Not established by three
  observations, or thirty, or any number you will reach. Do not write
  proportions: "two of three" counts this room; it is not a rate.

**Records, not readings.** "The user was confused" is a conclusion with its
evidence deleted. "They moved the pointer to Cancel, stopped, and said *is it
stuck or is it me*" is a record — and only the second survives next week, when
you disagree with yourself about what it meant.

**[View this week's slides](/decks/week-11/)** — Tuesday's lecture deck. Worth a pass before the studio, and the reference while you build.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 20 May, 14:00–17:00. **The session time is the recruitment.** You do not
need to find participants outside class.

| Time | What happens |
| --- | --- |
| 14:00 | **Setup (15 min).** Collect the task script, the consent statement and the record sheet. Load the build you will test. No edits from here until 16:00. |
| 14:15 | **Rotation (90 min).** Groups of four. Three rounds of 15 minutes as observer, three as participant. You read the consent statement aloud before each round, and you stop if asked. |
| 15:45 | **Write up (15 min).** Fill your record sheets **before** discussing anything with anyone. |
| 16:00 | **Decide (40 min).** The three decisions below. |
| 16:40 | **Round the room.** Each person names one thing they saw and are **not** acting on, and why. |

## The alternative task

Taking part is not compulsory — as observer or as participant, for any reason,
**with no explanation required**. Tell a tutor before the session and you get the
**structured walkthrough** instead: the same task script, worked against your
written state list from [week 10](/sessions/10-numbers-without-sources/), with
each step's expected reading recorded *before* you look at the interface.

It is graded identically, on the same criterion, and it is not a smaller task.

What it is not is user research. A walkthrough is evidence about an interface's
internal consistency — where your own state list and your own screen disagree.
Your write-up must say so plainly. **A walkthrough written up as though somebody
had been watched is the one way to actually lose marks here.**

## What you start with

- The build you will be tested on, deployed and frozen — **no edits from 14:15
  until 16:00**.
- A **task script**, a **consent statement** to read aloud, and a **record
  sheet**, all supplied at 14:00.
- Your claims register from [week 10](/sessions/10-numbers-without-sources/),
  which tells you what is worth watching for.
- Your written prediction of what two or three people will say at the stall.

## What you build

Three **handling decisions**, each naming the observation behind it, and **at
most three** changes to the prototype.

The gap between those two numbers is deliberate. A decision is your answer to
something you saw; a change is one possible answer among several. All three of
these are legitimate:

- **Change it.** You saw the same thing more than once, you understand the cause,
  and the fix is smaller than the problem.
- **Leave it, and say why.** You saw it once, from one person, and you cannot
  separate it from their never having used the interface before.
- **Leave it, and name the test.** You think it is real, one observation cannot
  tell you, so you write down what would settle it.

**Three changes is a ceiling, not a target.** Shipping three changes on one thin
observation apiece is a worse outcome than one change and two honest deferrals,
and it is marked as one.

## A worked example

One record, and the three answers it legitimately supports.

**What was written down (P2, simulated stall at 45%):**

> pointer to Cancel at 0:38 · did not click · *"is it frozen or is it just
> slow"* · pressed Cancel at 0:52

| Decision | When it is the right one |
| --- | --- |
| **Change it** — show time-since-last-progress after 10 s | you saw it more than once, you understand the cause, the fix is smaller than the problem |
| **Leave it, say why** — one person, first use, cannot separate novelty from the interface | you saw it once |
| **Leave it, name the test** — "show 5 people a 60 s stall, count who cancels before 45 s" | you think it is real and one observation cannot settle it |

All three score. Only the unexamined change loses marks.

P2's words are an illustration written for this page, not a transcript of an
observation that took place.

## Done when

- Your record sheets contain things people said, in their words, and things they
  did. A sheet reading "the user was confused" is not a record.
- Each of your three decisions traces to a line on a sheet.
- You can state, without hedging, one thing you believe about your interface that
  this session did **not** test.
- Whatever you changed is deployed, and your [claims register](/sessions/10-numbers-without-sources/)
  still matches the screen.

## The mistake to expect

**Manufacturing a change to look responsive.**

Three changes on one thin observation apiece is a worse outcome than one change
and two honest deferrals, and it is marked as one.

The mistake belonging to the alternative task is different and more serious: a
walkthrough written up as though somebody had been watched. A walkthrough is
evidence about internal consistency, not about people.

## Before next week

About two to three hours.

1. Update the register for anything you changed. A change that makes the register
   wrong is worse than no change.
2. Write the evaluation record for
   [Assignment 3](/assessments/honest-waiting-kit/): three records, three
   decisions, the changes, and the limits statement. It is due with the kit, and
   writing it now while the session is fresh is much easier than in week 12.
3. Prepare eight minutes for the showcase. Pick the claim you will defend.


## If you are joining late

`git checkout stage-11` gives you a prototype complete through week 10 — states,
estimator, indeterminate handling, failure states, cancel and retry — all present
and unopinionated. You test that one.

It is not your design, which makes the observation easier to hear and the
decisions harder to make. Say so in your write-up: you are deciding about
somebody else's trade-offs, and you do not know what they were trading against.

## What this week cannot tell you

A great deal, and naming it precisely is half the exercise.

Three people is enough to prove something **can** happen. It is nowhere near
enough to say how **often**.

Your participants are also biased in ways you can name exactly. They are in this
course. They know a stall is coming, because stalls were
[week 8](/sessions/08-stuck-timed-out-disconnected/). They have built the same
interface. They are simultaneously the most forgiving and the most suspicious
users your prototype will ever have.

On [Assignment 3](/assessments/honest-waiting-kit/) you are marked on whether
your conclusions are **proportionate to your evidence** — not on how many people
you watched, whether you watched anybody, or how many things you changed. A
confident claim from three observations loses marks. A careful claim from one
does not.
