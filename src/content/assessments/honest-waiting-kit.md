---
title: Honest Waiting Kit
description:
  The finished interface, plus the three documents that make it checkable — a
  state reference, an evaluation record, and a register of every claim left on
  screen.
week: 12
outcomes:
  - LO1
  - LO2
  - LO3
  - LO4
due: 2027-05-28T17:00:00+10:00
weight: 50
marking:
  mode: weighted
  criteria:
    - name: Behaviour under abnormal conditions
      weight: 30
    - name: Claims register
      weight: 25
    - name: Evaluation and revision
      weight: 20
    - name: Accessibility and both viewports
      weight: 15
    - name: Defence
      weight: 10
spec:
  - every named failure is reproducible by a marker from the exposed simulator controls
  - cancel and retry keep the guarantees written above their handlers
  - every number, string and motion on screen appears in the claims register with a verdict
  - conclusions in the evaluation record are proportionate to the evidence recorded on the sheets
  - the interface never displays progress it is not making
related:
  - sessions/10-numbers-without-sources
  - sessions/11-watching-someone-wait
  - sessions/12-the-last-percent
  - lectures/week-11
---

## The brief

> Make the upload interface tell the truth for a whole semester's worth of ways
> it could lie — including the truth that it does not know.

Everything assessed here was taught by [week 11](/sessions/11-watching-someone-wait/),
and most of it is already written. The state reference comes out of
[week 2](/sessions/02-what-counts-as-done/) and
[week 8](/sessions/08-stuck-timed-out-disconnected/); the claims register is the
[week 10](/sessions/10-numbers-without-sources/) studio deliverable; the
evaluation record is the [week 11](/sessions/11-watching-someone-wait/) studio
deliverable. Week 12 is assembly and defence, not a week of writing from zero.

## What Assignments 1 and 2 give you

Every part of this kit is a continuation, and none of it is a resubmission.

- **Assignment 1** gave you the claim → source → verdict move. Deliverable 4
  turns it on your own code, with the outside-observer verdict withdrawn and
  `kept with reason` put in its place.
- **Assignment 2** gave you a working interface and an audit sheet with failures
  on it. Those failures are the shortlist; this assignment marks whether they
  are closed, and whether the fixes for weeks 8 and 9 broke any of the lines that
  passed.
- **Assignment 2's** four conditions are the normal path. Nothing about them is
  re-marked; what is marked is what your interface does when that path stops.

If your A2 feedback said a recorded pass did not survive the marker, that line is
the obvious first row of your claims register.

## What you submit

**1 — The deployed prototype.** Success, stall, timeout, disconnection, cancel
and retry, each reproducible by a marker from exposed controls. Keyboard path
and reduced-motion variant intact.

**2 — A state and message reference**, at `/states/`. One row per state: what it
means, what the user sees, and **what is guaranteed about their file** while the
interface is in it.

**3 — An evaluation record**, at `/evaluation/`. The three observation records
or walkthrough steps, the three handling decisions, the changes actually made
(at most three), and what this evidence cannot establish.

**4 — A claims register**, at `/claims/`. Every number, string and motion
currently rendered; the event that produces it; a verdict of `holds`, `removed`
or `kept with reason`.

**5 — The showcase**, eight minutes in the
[week 12 studio](/sessions/12-the-last-percent/) on Thursday 27 May, the day
before this is due.

## A worked example

Deliverable 2, the state and message reference, is the one most people have not
written before. One row, complete:

| State | What it means | What the user sees | What is guaranteed about their file |
| --- | --- | --- | --- |
| `verifying` | every byte has arrived; the service is checking the object before accepting it | *Checking the file… 0:14 so far* | **Nothing yet.** The bytes are on the service but the object does not exist. This stage can still reject it. Cancelling now discards them. |

The fourth column is the one being marked, and it is the one interfaces normally
omit. "Checking the file" tells a user what the software is busy with. "The
object does not exist yet and this can still fail" tells them whether to close
the laptop.

Write one of those rows for every state in your enumeration, including the ones
a user never sees for more than a moment.

## The mistake to expect

**A register that stopped matching the screen.**

The claims register is written in week 10 and the interface changes in week 11.
Every year a register is submitted describing a screen that no longer exists
&mdash; a row marked `removed` for something still rendering, or a string that
was reworded after the register was written. It is marked against the deployed
site, so a drifted register loses marks on the criterion worth 25.

The fix is mechanical: after your last change, walk every state with the
simulator controls, at both viewports, with the register open beside the screen.

**The second:** a rate. "Two of three participants" is a count of who was in the
room. Three observations support *at least one person did X* and never *most
people do X*, at any n you will reach.

## How the criteria are read

**Behaviour under abnormal conditions (30).** Every failure you name is
reproducible. The interface never claims progress it is not making — a bar that
keeps animating through a stall fails this outright. Cancel and retry keep the
guarantees written above their handlers, and a marker will test that by reading
the guarantee and then trying to break it.

**Claims register (25).** Complete against the deployed screen, in every state,
at both viewports. Each verdict defensible. A `kept with reason` row needs a
reason a reader could argue with; "it looks better" is not one, and a marker
disagreeing with a well-argued reason costs you nothing.

**Evaluation and revision (20).** Each decision traces to a line on a record
sheet. Conclusions are **proportionate to the evidence** — an existence claim
from one observation is fine; a rate from three is not. Marks here do not depend
on how many people you observed, whether you observed anybody at all, or how
many changes you made. A well-argued decision to change nothing scores as
highly as a change. The structured walkthrough alternative is marked
identically, and writing a walkthrough up as though somebody had been watched is
the one way to lose this criterion outright.

**Accessibility and both viewports (15).** Keyboard path, status text,
reduced-motion variant; 1920×1080 and 390×844.

**Defence (10).** At the showcase, two challenges from the room on a claim you
kept, answered from evidence. "It felt better" scores zero on this criterion,
and everyone has been told so since week 1.

## Meeting the requirement, and arguing it well

The rubric above is the same for everyone; this is what separates a submission
that satisfies it from one that is well argued. **Nothing in the right-hand
column is an extra requirement** — it is the same work, done with a reason
attached.

| Criterion | Meets the requirement | Argues it well |
| --- | --- | --- |
| **Behaviour under abnormal conditions** | every named failure is reproducible and the bar stops claiming | you can say *why* your stall threshold is the number it is, and what a user loses at half and at double it |
| **Claims register** | every rendered thing has a row and a verdict | your `kept with reason` rows name the deception, the justification **and its cost**, in terms a reader could disagree with |
| **Evaluation and revision** | three decisions, each traced to a record | the decisions include at least one deliberate non-change, and the limits statement names *this* session's bias rather than small-sample humility |
| **Accessibility and both viewports** | the four audit lines pass on the deployed site | the sheet still shows the failures you found and closed, with what the fix cost elsewhere |
| **Defence** | both challenges answered without "it felt better" | you volunteered the row you find hardest to defend, and said what you would do with another week |

The pattern across all five: **the requirement is about the artefact, the
argument is about the decision behind it.** A register with a verdict in every
row meets the requirement. A register whose difficult rows you could lose an
argument about is the one that reads as HD.

## What is deliberately not assessed

How good your interface looks. Whether your estimator is accurate. Whether your
design matches any published guidance. The course has one standard, applied for
twelve weeks: your interface may assert what your evidence supports, and it must
admit what it does not know.
