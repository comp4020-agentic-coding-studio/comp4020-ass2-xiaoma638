---
title: Understood without the animation
description:
  The audit workshop. Turn off the motion, put the mouse away, and find out
  whether your interface was ever carrying its information in text.
question: Does your interface still work with the motion off, the mouse gone, and the screen unseen?
week: 7
outcomes:
  - LO3
date: 2027-04-22
teachers:
  - marisol-quaye
  - idris-fenn
spec:
  - the whole upload path, from choosing a file to reading the outcome, is reachable and operable from the keyboard
  - every state change a sighted user can see has a text form a screen reader reaches, and percentage ticks are not announced individually
  - a prefers-reduced-motion variant exists and loses no information the default variant carried
  - the audit sheet records failures as failures
related:
  - 06-motion-and-the-felt-wait
  - 04-no-idea-how-long
  - 09-cancel-and-retry
  - lectures/week-07
  - assessments/waiting-interface-prototype
readings:
  - title: "ARIA: progressbar role"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role"
    why: "The required and optional attributes, and what a missing aria-valuenow means. Audit line 2."
  - title: "aria-valuetext"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext"
    why: "For when the number needs words around it \u2014 which, on a staged upload, is most of the time."
  - title: "Understanding SC 4.1.3: Status Messages"
    source: "W3C, WCAG 2.2"
    url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
    why: "The success criterion behind audit line 3. Read the Intent section; the examples are a good model for what counts as a status change worth announcing."
  - title: "prefers-reduced-motion"
    source: "MDN"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
    why: "The mechanics for audit line 4. Note that no-preference is a separate value from the query not matching."
---

Here is the test, and it takes four seconds.

Turn your animation off. Look at the interface mid-upload. Can you tell what is
happening?

For most prototypes arriving at this studio the answer is no, and the reason is
uncomfortable: the information was in the motion. The text said `Uploading…` for
ninety seconds while the bar carried everything a user actually knew — that it
was moving, roughly how fast, roughly how far. Remove the animation and the
interface stops saying anything, which means it was never saying it to anyone
who could not see it.

## By the end of this week

You can:

- operate a waiting interface end to end from the keyboard, and identify where
  focus is lost when state changes underneath you;
- choose correctly between `aria-valuenow`, `aria-valuetext` and omitting the
  value, for determinate and indeterminate cases;
- write a live region that reports state transitions without announcing every
  increment;
- use `prefers-reduced-motion` as a diagnostic — turning motion off to discover
  what information it was carrying — and repair what goes missing;
- record an audit failure as a failure, in writing, on your own work.

## The idea

Tuesday's lecture,
[Reading an Interface Without Looking at It](/lectures/week-07/), is the
teaching. Today applies it. The four audit lines, with the trap in each:

**1 — The keyboard path.** Not a tab order. A state machine: at each state, what
is reachable, and *where does focus go when the state changes underneath the
user?* The common failure is a Cancel button that disappears on completion while
focus is on it, dumping the user at the top of the document with no announcement.

**2 — Semantics.** `role="progressbar"` with `aria-valuenow`/`valuemin`/`valuemax`
where a value exists, `aria-valuetext` where the bare number is unhelpful ("3 of
7 files" beats "43"). The trap is the indeterminate case from
[week 4](/sessions/04-no-idea-how-long/): **omitting `aria-valuenow` means
progress is indeterminate; setting it to `0` means nothing has happened.** Those
are different claims and the second one is usually a lie.

**3 — Announcements.** A polite live region reports changes without interrupting.
The failure mode is not silence, it is volume: a bar wired to announce
`aria-valuenow` on every update produces a hundred announcements per upload, and
the three state transitions that mattered are now buried. **Announce
transitions, never increments.**

**4 — Reduced motion as a diagnostic.** Usually taught as a courtesy. Treat it
as a test instead. Turn the animation off and ask what information left with it.
If something did, that information was never in the interface — and this is the
week your [week 6](/sessions/06-motion-and-the-felt-wait/) treatments are
examined for whether they were carrying meaning or carrying atmosphere.

**[View this week's slides](/decks/week-07/)** — Tuesday's lecture deck. Worth a pass before the studio, and the reference while you build.
On a phone they are small — the deck is built for a projector, and this
page carries the same material as prose.

## In the room

Thursday 22 April, 14:00–17:00.

| Time | What happens |
| --- | --- |
| 14:00 | **Recap (10 min).** The four lines and what counts as evidence for each. **Nothing new is introduced today** — everything you are audited on was in Tuesday's lecture. |
| 14:10 | **Self-audit.** Work the sheet against your own prototype, one line at a time. Do not fix while auditing. |
| 15:15 | **Pair swap.** You audit a classmate's prototype; they audit yours. **You may not explain your interface while it is being audited.** |
| 16:15 | **Fixes.** Repair what the swap found, while the person who found it is still in the room. |
| 16:45 | **Two claims.** Each pair names one thing they were sure passed and did not. |

## What you start with

- Your prototype through week 6: a determinate bar, three indeterminate
  registers, three motion treatments, and no accessibility work at all.
- Tuesday's lecture, [Reading an Interface Without Looking at It](/lectures/week-07/).
- **The audit sheet**, four lines, one page — the same sheet your partner will
  fill in on your prototype.
- Checklist v0, published in [week 2](/sessions/02-what-counts-as-done/).

## What you build

1. **A completed audit sheet** for your own prototype, four lines, each marked
   pass / fail / not-applicable with the evidence that settled it.
2. **A second sheet**, the one your partner filled in on your work.
3. **The fixes** the swap produced, committed today.
4. **A reduced-motion variant** of each week 6 treatment, which loses no
   information the default carried.

## A worked example

One defect, found and closed, on the week 4 indeterminate treatment. This is
what a completed audit row looks like:

| Step | What you do | What you find |
| --- | --- | --- |
| 1 | Tab to the bar and listen | "progress bar, 0 per cent" |
| 2 | Read the DOM | `aria-valuenow="0"` on the unknown-length stream |
| 3 | Name the claim | the interface says *nothing has happened*; four stages have |
| 4 | Fix | remove `aria-valuenow`, add `aria-valuetext="Transferring, total unknown"` |
| 5 | Re-check | "progress bar, transferring, total unknown" |

```
Line 2 — semantics        FAIL   aria-valuenow="0" during indeterminate stream
                          fixed  14:52, verified by re-listening
```

Recorded as a **failure**, then a fix. That row scores. A row reading "Line 2 —
pass" would not.

## Done when

- Your partner completed an upload, hit a stall and read the outcome using only
  the keyboard, without being told anything.
- With motion disabled, your partner could say which state the interface was in
  at any moment you paused it.
- **Your sheet has failures on it.** Four passes and no notes is evidence the
  audit was not run, and it is marked that way.

## The mistake to expect

**Recording a pass you cannot demonstrate.**

A line recorded honestly as a failure scores. A line recorded as a pass that your
marker can break does not, and costs more than the failure would have.

The second is subtler: fixing line 1 in a way that breaks line 3. Moving focus
when a control disappears is correct; moving it **without announcing why**
replaces a silent failure with a confusing one. Re-run all four lines after any
fix.

## Before next week

About three hours — this is the heaviest week of homework in the course, because
[Assignment 2](/assessments/waiting-interface-prototype/) is due on Tuesday
27 April, five days from now.

1. Fix what the pair swap found and you did not finish in the room.
2. Complete the Checklist v0 lines on the same sheet. They have been published
   since [week 2](/sessions/02-what-counts-as-done/) and they are assessed for the
   first time in A2.
3. Re-run the four audit lines yourself after the fixes. A fix that breaks
   another line is the usual outcome, and finding it now is much cheaper.


## If you are joining late

`git checkout stage-07` restores a prototype carrying the week 4 and week 6
treatments with the accessibility work entirely absent. You audit that. It is a
floor, not an answer — and auditing a baseline you did not write is a slightly
harder version of today, not an easier one, because you cannot fall back on
knowing what you meant.

## What this week cannot tell you

Two people at adjacent desks are not a test of whether this interface works for
the people it excludes.

You audited against a checklist, and a checklist is a record of failures somebody
has already had. It cannot report a failure nobody has written down yet. Neither
of you uses a screen reader daily, so you have established that the announcements
exist and are sane — not that they are good.

Say exactly that on the sheet. On
[Assignment 2](/assessments/waiting-interface-prototype/) a line recorded honestly
as a failure scores; a line recorded as a pass that your marker can break does
not, and costs more than the failure would have.
