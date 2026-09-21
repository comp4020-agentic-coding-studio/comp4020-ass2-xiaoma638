---
title: What 99% Promises
description:
  The one analytic move this course runs for twelve weeks — claim, source
  event, verdict — and why a local simulator is an instrument rather than a
  convenience.
week: 1
date: 2027-02-23
teachers:
  - marisol-quaye
slides: /decks/week-01/
related:
  - sessions/01-what-99-percent-promises
  - sessions/02-what-counts-as-done
  - sessions/10-numbers-without-sources
---

[Slides](/decks/week-01/)

This course has four lectures. This is the first, and it is the only one that
introduces something you will use every single week.

## What this lecture carries

**The move.** Three terms, defined once and used for twelve weeks:

- A **claim** is anything the interface asserts. A number is a claim. So is the
  word "Finalising". So is a bar that accelerates, a spinner that never changes
  speed, and a control that greys out. So, sometimes, is an absence — a screen
  that shows nothing is claiming that nothing needs saying.
- A **source event** is something the underlying process actually emits, at a
  time you could write down. Not something the process *does* — something it
  *reports*.
- A **verdict** is what you conclude about the pair. This week you have three:
  `sourced`, `unsourceable`, and `not determinable from outside`.

**Why the simulator is not a shortcut.** Every transfer in this course is
local and fake. That is not because real networks are inconvenient; it is
because a claim about a failure you cannot reproduce is not a claim anybody can
check. The simulator is what makes the rest of the semester falsifiable.

**The course's one rule, stated in week 1 so it can be held against you later:**
nothing on your screen is allowed to assert more than your evidence supports.
This applies to your interface, and it applies to the prose you write about your
interface.

## What it sets up

| Where it lands | What it carries there |
| --- | --- |
| [Week 1 studio](/sessions/01-what-99-percent-promises/), two days later | runs the move on someone else's interface |
| [Week 2](/sessions/02-what-counts-as-done/) | "complete" is a claim; a state is a candidate source event |
| [Week 3](/sessions/03-where-is-the-denominator/) | a denominator is a source event you can count |
| [Week 10](/sessions/10-numbers-without-sources/) | the same move, turned on your own code, with one verdict taken away |

## What it assumes

Nothing. If you can write a function that takes a callback, you have the
prerequisites.

## A worked example

Take one claim from the case this lecture opens with — a bar that reaches 99%
in nine seconds — and run it through the three terms rather than the table.

The **claim** is not "99%". It is the *rate*: a bar that covers 99 points in nine
seconds tells a reader the last point takes about a tenth of a second. Nobody
wrote that sentence; the movement asserts it.

The **source event** would have to be something that reports how long the
remaining work takes. No such event exists — the process reports bytes, and the
last point is not bytes.

So the **verdict** is `unsourceable`, and notice what that does not mean. It does
not mean the designer lied. It means the screen carried a claim the system had
no way of supporting, which is a different and much more common thing.

## What this lecture cannot settle

This move tells you what a claim rests on. It does not tell you whether the
interface is any good.

An `unsourceable` claim can be the right design decision — taken knowingly, for a
reason, with a cost. Week 10 gives that case its own verdict. Until then, resist
converting an analysis into a judgement: you are building the instrument, not
using it to condemn anything.

## If you miss the hour

The [slides](/decks/week-01/) carry the argument in the order it was made, and this week's
reading is listed on the [studio page](/sessions/). The studio on Thursday
assumes the vocabulary above rather than re-teaching it, so read the deck before
you arrive rather than after.
