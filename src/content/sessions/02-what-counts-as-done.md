---
title: What counts as done?
description:
  The upload has two states and one of them is a lie. Find out how many states
  you actually have, and which of them a user is entitled to hear about.
question: What has to be true before the interface is allowed to say "complete"?
week: 2
outcomes:
  - LO1
  - LO2
date: 2027-03-04
teachers:
  - idris-fenn
spec:
  - every state your interface can be in is named in code, and reachable from the simulator controls
  - the debug readout never shows a state that is not in the enumeration
  - the completion criterion is written down in one sentence, next to the state that claims it
related:
  - 01-what-99-percent-promises
  - lectures/week-01
  - assessments/progress-bar-autopsy
---

`upload-ui` ships with two states, and one of them is a lie.

It shows a bar while a transfer is in flight, and a tick when the transfer's
promise resolves. Between those two moments the file is read, hashed, sent,
acknowledged, and — on any service that intends to keep it — written somewhere
durable. The interface collapses all of that into one word.

Last week you asked what evidence a claim could possibly have. "Complete" is a
claim. This week you find out what your own interface would need to know before
it is allowed to make it.

## In the room

Thursday 4 March, 14:00–17:00. There is no lecture in week 2; the framing below
does that work.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (25 min).** States and transitions. Why a phase of a progress bar is not a state. Two failure shapes a two-state model cannot express: a transfer that finished and was then rejected, and one that is still being verified. Where "done" stops being a claim about bytes and becomes a claim about durability. |
| 14:25 | **Reading (15 min).** A supplied, annotated excerpt of a real object-storage upload lifecycle. Read it for one thing only: which lifecycle events a browser client can actually observe, and which it only ever infers. |
| 14:40 | **Build.** The work below, with both tutors in the room. |
| 16:30 | **Round the room.** Three people put a state diagram on the projector and name the state they were surprised to need. |

## What you build

1. **A state enumeration**, in code, replacing the `isUploading` boolean. Name
   every state you can justify from an event the simulator actually emits. You
   are not being marked on arriving at a particular number — a defensible five
   beats an imitated nine.
2. **A visible debug readout** showing the current state and the event that
   caused the last transition. It stays in the interface for the rest of the
   semester; it is how you and your tutor will drive the thing in later weeks.
3. **A completion criterion**, one sentence, committed as a comment directly
   above the state that claims completion. "The server has acknowledged the
   final chunk" and "the file is durable" are different sentences, and the
   difference is the whole exercise.

## How you'll know it worked

- A classmate can drive your interface into **every** state you declared, using
  only the simulator controls, without asking you how.
- Your debug readout never displays a state absent from the enumeration.
- You can point at the line of code that produces the event behind each state,
  or you can say out loud that you cannot — which is a finding, not a failure.

## If you are joining late

`git checkout stage-02` restores a working baseline with the simulator emitting
named events. It is a floor, not an answer: it gives you the mechanism this
week needs and leaves every judgement in it unmade. There is no state
enumeration in it, because that is the exercise.

## Checklist v0 is published today

The **Waiting Interface Checklist v0** goes up on the Studios index this week:
focus is never trapped, every state has a text form, and no state is signalled
by motion alone. From today it is the standard your prototype will eventually be
held to.

It is a notice, not a lesson. Nothing this week teaches you how to meet it, and
nothing this week is marked against it. The teaching is
[week 7](/sessions/07-without-the-animation/), and the first time it carries
marks is [Assignment 2](/assessments/waiting-interface-prototype/), which is due
after that teaching has happened. It is published now so that the standard is
not a surprise, and so you can stop making work you will have to undo.

## What this week cannot tell you

Nothing here establishes that your states are the *right* states. A state model
is a claim about what the process does, and the only evidence you have for it
is a simulator someone else wrote to behave plausibly. You will get one real
test of it in [week 8](/sessions/08-stuck-timed-out-disconnected/), when the
process starts failing in ways your model did not anticipate, and a second in
[week 10](/sessions/10-numbers-without-sources/), when you check whether the
states you declared are the ones your screen actually reports.
