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
---

Tuesday's lecture gave you one move, and you will use it for twelve weeks:
take a **claim**, find the **source event** that could support it, and record a
**verdict**. Today you run it for the first time, on somebody else's work.

You are outside the system. You cannot read its code, time its network, or ask
it what it meant. That constraint is the lesson: almost every judgement anyone
makes about a waiting interface is made from exactly this position.

## In the room

Thursday 25 February, 14:00–17:00.

| Time | What happens |
| --- | --- |
| 14:00 | **Setup (20 min).** Clone `upload-ui`, install, run it, trigger one simulated upload. If this does not work, say so now rather than in week 3. |
| 14:20 | **Autopsy clinic.** In pairs, against one of six supplied screen recordings of real waiting interfaces. |
| 16:15 | **Swap.** Take a second recording that another pair has already done. Compare tables before you compare conclusions. |
| 16:45 | **One claim each.** Everybody names the claim they found least defensible. |

## What you build

A **claims table** for one recorded interface. One row per claim — and a claim
is anything the interface asserts, including the things it asserts without
words:

| Column | What goes in it |
| --- | --- |
| **Claim** | the number, phrase, motion or absence, quoted or described exactly |
| **Possible source** | an event the underlying process could plausibly emit that would support it |
| **Verdict** | `sourced` · `unsourceable` · `not determinable from outside` |

Motion counts. A bar that accelerates near the end is claiming something about
rate. A spinner that never changes speed is claiming that something is still
happening, and nothing else.

## The capability you are building today

**From the visible interface alone, form a provisional judgement.** That is all
you have this week and all you are asked for. Your verdicts are about what
*could* be true, not about what is; the third verdict exists because honest
outside observation runs out, and saying where it runs out is part of the skill.

You will do the mirror of this exercise in
[week 10](/sessions/10-numbers-without-sources/), on your own prototype — with
the source code, your own state definitions and six weeks of evidence in front
of you. The question changes when you have those, and so do the available
verdicts. Compare the two tables at the end of semester; the distance between
them is a fair measure of what the course gave you.

## What this week cannot tell you

Whether any of these interfaces is *wrong*. An unsourceable claim is not
automatically a bad one — a designer may have had an excellent reason to show a
number nobody can justify, and from out here you cannot tell a lie from a
shortcut from a constraint you cannot see. You are recording what is claimed
and what could support it. Judgement comes later, and it comes with evidence.
