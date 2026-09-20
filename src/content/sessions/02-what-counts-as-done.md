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
  - 03-where-is-the-denominator
  - 08-stuck-timed-out-disconnected
  - lectures/week-01
  - assessments/progress-bar-autopsy
readings:
  - title: "Uploading and copying objects using multipart upload"
    source: "AWS S3 documentation"
    url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html"
    why: "A real upload lifecycle written by the people who operate it: initiate, upload parts, complete, and the states in between where a part exists but the object does not. Read the Multipart upload process section."
  - title: "The <progress> element"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress"
    why: "Worth reading before you write your own. The platform already has a determinate/indeterminate distinction in one attribute, and it maps onto the state question more closely than most people expect."
---

`upload-ui` ships with two states, and one of them is a lie.

Open `src/upload.js` and you will find a single boolean, `isUploading`. It goes
true when the user picks a file and false when a promise resolves. Everything
the interface says is derived from that one bit.

Between those two moments the file is read from disk, hashed, sent in chunks,
acknowledged, and — on any service that intends to keep it — written somewhere
durable. Six or seven distinguishable things, reported as one.

Last week you asked what evidence a claim could possibly have. **"Complete" is a
claim.** This week you find out what your own interface would need to know
before it is allowed to make it.

## By the end of this week

You can:

- enumerate the states of a process from the events it emits, rather than from
  the phases of the animation you happen to be showing;
- explain why a progress bar's visual phase is not a state, using your own code
  as the example;
- write a completion criterion precise enough that someone else can tell whether
  your interface meets it;
- drive an interface into any state you have declared, using controls a stranger
  could find.

## The idea

There is no lecture in week 2. This section and the framing at 14:00 are the
teaching.

**A state is a claim about the process; a phase is a claim about the display.**
"The bar is at 60%" is a phase. "The last chunk has been acknowledged and we are
waiting on the durability confirmation" is a state. You can be in one state
across many phases, and — this is the part that bites — you can be in several
states during one phase, which is exactly how an interface ends up saying
nothing true for eleven seconds.

**Two failure shapes a two-state model cannot express.** Both are ordinary:

1. *Finished and then rejected.* All bytes arrived; the server refused the file
   (wrong type, over quota, failed a scan). A boolean has nowhere to put this,
   so interfaces show 100% and then an error, which reads as a contradiction.
2. *Still being verified.* All bytes arrived; nothing has confirmed they are
   safe yet. A boolean must choose between "uploading" (false) and "done"
   (false), so most interfaces pick "done" and are occasionally wrong.

**Where "done" stops being about bytes.** This is the week's real question.
"The last byte left this machine" is a claim about your network card. "The
service acknowledged the final chunk" is a claim about a server's memory. "The
object is durable" is a claim about storage, and it is the only one of the three
a user actually cares about, because it is the only one that survives a power
cut. They can be seconds apart, and an interface that conflates them will
sometimes tell a user their file is safe when it is not.

Pick one of those three. Write it down. That sentence is your completion
criterion, and for the rest of the semester everything on your screen has to
agree with it.

## In the room

Thursday 4 March, 14:00–17:00. No lecture in week 2.

| Time | What happens |
| --- | --- |
| 14:00 | **Framing (25 min).** The section above, at the whiteboard, with `upload-ui`'s `isUploading` on the projector as the worked example. |
| 14:25 | **Reading (15 min).** The S3 multipart lifecycle below. Read it for one thing only: which of those events a *browser client* can observe, and which it can only infer. |
| 14:40 | **Build.** The work below, both tutors circulating. |
| 16:30 | **Round the room.** Three people put a state diagram on the projector and name the state they were surprised to need. |

## What you build

1. **A state enumeration** in code, replacing `isUploading`. Name every state you
   can justify from an event the simulator actually emits. You are not marked on
   reaching a particular number — **a defensible five beats an imitated nine.**
2. **A visible debug readout** showing the current state and the event that
   caused the last transition. It stays in the interface for the rest of the
   semester; it is how you and your tutor will drive the thing in later weeks.
3. **A completion criterion**, one sentence, committed as a comment directly
   above the state that claims completion.

## Done when

- A classmate can drive your interface into **every** state you declared, using
  only the simulator controls, without asking you how.
- Your debug readout never displays a state absent from the enumeration.
- For each state you can point at the line that produces the event behind it —
  or say out loud that you cannot, which is a finding rather than a failure.

## Before next week

About two to three hours.

1. Add the two failure shapes above to your state model if they are missing, and
   check the simulator can reach both.
2. Take the three claims you wrote down last week from your own machine, and for
   each, guess which of the states in your model the software was probably in.
   One paragraph. Week 3 starts from it.


## If you are joining late

`git checkout stage-02` restores a working baseline with the simulator emitting
named events. It is a floor, not an answer: it gives you the mechanism this week
needs and leaves every judgement in it unmade. There is **no** state enumeration
in it, because that is the exercise.

## Checklist v0 is published today

The **Waiting Interface Checklist v0** goes up on the [Studios](/sessions/) index
this week: focus is never trapped, every state has a text form, and no state is
signalled by motion alone.

It is a notice, not a lesson. Nothing this week teaches you how to meet it, and
nothing this week is marked against it. The teaching is
[week 7](/sessions/07-without-the-animation/), and the first time it carries
marks is [Assignment 2](/assessments/waiting-interface-prototype/), which falls
after that teaching. It is published now so the standard is not a surprise, and
so you stop building things you would have to undo.

## What this week cannot tell you

Nothing here establishes that your states are the *right* states.

A state model is a claim about what a process does, and your only evidence for
it is a simulator somebody else wrote to behave plausibly. That is a real limit:
you are modelling a model.

You get two tests of it later. [Week 8](/sessions/08-stuck-timed-out-disconnected/)
starts failing in ways your model probably did not anticipate, and
[week 10](/sessions/10-numbers-without-sources/) checks whether the states you
declared are the ones your screen actually reports.
