---
title: Motion, and how long it felt
description:
  Three animations over identical twenty-second waits, ranked by the class, and
  a careful account of why that ranking is weak evidence.
question: Does how the bar moves change how long the wait feels, and how would you know?
week: 6
outcomes:
  - LO2
  - LO4
date: 2027-04-01
teachers:
  - marisol-quaye
  - idris-fenn
spec:
  - three motion treatments run over waits of identical duration
  - the class ranking is recorded exactly as collected, with no adjustment
  - the write-up names at least three specific reasons the ranking is weak evidence
related:
  - 04-no-idea-how-long
  - 07-without-the-animation
  - 11-watching-someone-wait
  - assessments/honest-waiting-kit
readings:
  - title: "Progress Bars (research summary)"
    source: "Chris Harrison, Carnegie Mellon"
    url: "https://www.chrisharrison.net/index.php/Research/ProgressBars"
    why: "The researchers' own summary of the perceived-duration experiments, including effect sizes. Read the numbers rather than the headline: notice how large a difference had to be before it was detectable, and compare that with what you could detect today."
  - title: "Response Times: The 3 Important Limits"
    source: "Nielsen Norman Group"
    url: "https://www.nngroup.com/articles/response-times-3-important-limits/"
    why: "Re-read in week 6. These thresholds are an order of magnitude larger than the perceived-duration effects above \u2014 a useful sense of proportion before deciding how much easing is worth."
---

There is published work claiming that the shape of a progress animation changes
how long the wait is perceived to be. Chris Harrison and colleagues at Carnegie
Mellon ran the best-known set of these experiments; their summary page is in the
reading below, and it reports that bars which accelerate toward the end were
perceived as faster than linear bars of the same duration.

You are not going to take that on trust, and you are also not going to be able
to replicate it properly in this room. **Both halves of that sentence are the
lesson**, and the second half is the one that transfers.

## By the end of this week

You can:

- build motion treatments that differ only in easing, over waits of provably
  identical duration;
- run a simple ranking with a class and record the result without cleaning it up;
- name at least three specific, concrete reasons a result like this is weak —
  not "small sample" in the abstract, but what went wrong in *this* room;
- decide what to do with a weak result, which includes doing nothing.

## The idea

No lecture this week. This section and the 14:00 framing are the teaching.

**What the published studies actually measured.** Perceived duration, usually
via forced-choice comparison between two animations of identical real duration,
with participants who did not know the durations matched. Reported effects are
in the range of a few per cent of perceived time. They are not claims about
whether users trust the bar, understand it, or would rather have a number.

**What a room of twenty classmates can and cannot reproduce.** You can reproduce
the *procedure*. You cannot reproduce the *conditions*, for reasons that are
specific and worth naming out loud today:

- **Not blind.** You built the treatments. You know which one you expect to win.
- **Order effects.** Whoever sees the pulsed bar third has been waiting a full
  minute by then, and fatigue is not easing.
- **Demand characteristics.** Your participants are classmates who know this is
  a course about progress bars in a week about animation. They will produce the
  answer the exercise appears to want.
- **No real stakes.** Nobody in the room is waiting for a file they need.
  Perceived duration under no pressure is a different measurement.
- **n ≈ 20, one room, one afternoon.** Even a genuine effect of a few per cent
  is far below what twenty rankings can detect.

Recognising all five of those on your own work, in the moment, is the skill.
[Week 11](/sessions/11-watching-someone-wait/) gives you a better-designed
observation and you will need this instinct there too.

**The measure.** Forced ranking, three treatments, "which felt longest to
shortest". Ranking rather than seconds, because asking people for a duration
estimate in seconds introduces a numeracy problem on top of everything else.

**[View this week's slides](/decks/week-06/)** — the 14:00 framing runs from these. They carry the worked example and the exercise brief.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 1 April, 14:00–17:00. No lecture this week.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (25 min).** What the published work measured, and the five weaknesses above — named *before* you run anything, so the write-up is not hindsight. |
| 14:25 | **Build (70 min).** Three treatments. Identical duration is a hard requirement; assert it in code. |
| 15:40 | **Run it.** Rotating in groups of five. Nobody is told the durations match. Rankings go on paper. |
| 16:20 | **Collate.** One table on the board, raw. No exclusions, no adjustments, no "that person wasn't paying attention". |
| 16:40 | **Write the weaknesses.** Ten minutes, individually, before anyone interprets the table. |

## What you start with

- Your prototype through week 5, with one linear animation and an **easing hook
  that is wired up and unused**.
- A 20-second simulated wait that all three treatments will run over.
- Printed ranking slips, and the Harrison summary page from the reading.

## What you build

1. **Three motion treatments** over a wait of identical duration — linear,
   decelerating, and pulsed. Same start, same end, same total, differing only in
   easing.
2. **A duration assertion** in code proving the three are equal. This is a real
   requirement: a treatment that is 400 ms longer invalidates the whole exercise
   and the difference is invisible by eye.
3. **The raw ranking table**, exactly as collected.
4. **A weaknesses paragraph** naming at least three specific reasons the result
   is weak, drawn from your own run rather than from the list above.

## A worked example

The three easings, and the assertion that makes the comparison valid:

```js
const TREATMENTS = {
  linear:     t => t,
  decelerate: t => 1 - (1 - t) ** 2,
  pulsed:     t => t + 0.02 * Math.sin(t * 18 * Math.PI),
};

// A treatment 400 ms longer than another invalidates the whole exercise,
// and the difference is invisible by eye.
for (const ease of Object.values(TREATMENTS)) {
  console.assert(Math.abs(ease(1) - 1) < 1e-9, "must finish at exactly 1");
}
```

Easing changes the shape of the journey, never its length. If `ease(1) !== 1`
you are comparing durations, not motions.

## Done when

- Your duration assertion passes, and you have run it.
- The table is raw. If you were tempted to drop a response, write down the
  temptation instead — that sentence is worth more than the cleaned table.
- Your three weaknesses are about *this* run. "Small sample size" on its own does
  not count; "n≈20 against a published effect of a few per cent" does.

## The mistake to expect

**Dropping a response.**

Someone ranks the pulsed bar fastest "because they weren't paying attention",
and excluding them is very tempting. If you are tempted, **write the temptation
down instead** — that sentence is worth more than the cleaned table.

The second: writing "small sample size" as your weakness. *"n ≈ 20 against a
published effect of a few per cent"* is a reason. The other is a phrase.

## Before next week

About two hours.

1. Decide whether you are shipping any of the three, and write one sentence
   saying what your decision rests on. "The ranking" is a weak basis and saying
   so is fine. "I prefer it" is also fine, if labelled as preference.
2. Week 7 audits the treatments you built today. Before Thursday, turn on your
   operating system's reduce-motion setting and look at all three. Bring what
   you find.


## If you are joining late

`git checkout stage-06` gives you the prototype through week 5 with a single
linear animation and an easing hook that is wired up and unused. It is a floor,
not an answer: the three treatments, the duration assertion and every decision
after the ranking are yours.

## What this week cannot tell you

Almost anything about perceived duration, and that is the intended outcome.

You ran a procedure in conditions that cannot support its conclusion. The
correct write-up says so, keeps the raw table, and does not convert twenty
rankings into a design principle. If your treatments came out in the same order
as the published work, that is not replication — with this design it is close to
a coin landing the way you expected.

What the week *does* give you is calibration. You now know from the inside what a
weak result feels like while you are collecting it, which is the only reliable
defence against over-reading the slightly better evidence you get in
[week 11](/sessions/11-watching-someone-wait/).
