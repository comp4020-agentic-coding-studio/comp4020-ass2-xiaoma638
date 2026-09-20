---
title: Cancel and retry
description:
  Two buttons that make promises. Write the promise down first, then find out
  whether your code keeps it.
question: When the user presses Cancel, what exactly have you promised them?
week: 9
outcomes:
  - LO2
  - LO3
date: 2027-05-06
teachers:
  - marisol-quaye
draft: true
spec:
  - cancel and retry each carry a written guarantee, stated in one sentence above the handler
  - one test per guarantee, asserting the guarantee rather than the current behaviour
  - the interface tells the user which guarantee applies before they commit to the action
related:
  - 08-stuck-timed-out-disconnected
  - 10-numbers-without-sources
  - assessments/honest-waiting-kit
---

Cancel is the only control in the interface that the user presses in order to
make something *not* happen, which makes it the only one whose correctness they
cannot observe.

## In the room

Thursday 6 May, 14:00–17:00. No lecture; the studio opens with a 25-minute
framing on guarantees — how to write one that can fail, and why a test that
asserts current behaviour protects a bug.

## What you build

Cancel and retry, each with its guarantee written as a one-line comment above
the handler before any code goes under it. "Cancel: no bytes are retained."
"Retry: resumes from the last completed stage, not from zero." Then one test per
guarantee, written to break if the guarantee stops holding.

## What this week cannot tell you

Whether the guarantee is the one the user wanted. You have made the interface
honest about what it does, not correct about what it should do.
