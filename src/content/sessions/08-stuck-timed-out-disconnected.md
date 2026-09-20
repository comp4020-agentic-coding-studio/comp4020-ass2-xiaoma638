---
title: Stuck, timed out, disconnected
description:
  Three ways a transfer stops without finishing, and the sentences that have to
  be true when it does.
question: Nothing has moved for thirty seconds. What do you say?
week: 8
date: 2027-04-29
teachers:
  - idris-fenn
draft: true
spec:
  - stall, timeout and disconnection are separately reproducible from the simulator controls
  - each state's message names what happened, what it means for the file, and what happens next
  - no failure state leaves a progress indicator still implying progress
related:
  - 02-what-counts-as-done
  - 09-cancel-and-retry
  - assessments/honest-waiting-kit
---

A stall is not a timeout and a timeout is not a disconnection, and a user who is
told the wrong one will do the wrong thing. This week the simulator starts
failing on purpose.

## In the room

Thursday 29 April, 14:00–17:00. No lecture; the studio opens with a 25-minute
framing on the failure taxonomy and the three-part message structure below.

[Assignment 2](/assessments/waiting-interface-prototype/) was due on Tuesday, so
this week starts clean.

## What you build

Three failure injectors, and for each one the message **written before the
handler**: what happened, what it means for your file, what happens next. Then
the handler that makes the message true.

## What this week cannot tell you

Whether the messages are understood. You wrote them; you are the worst available
judge. [Week 11](/sessions/11-watching-someone-wait/) is the first time anyone
else reads them cold.
