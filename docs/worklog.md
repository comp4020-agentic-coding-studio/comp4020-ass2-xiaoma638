# Work log

A running record of what was tried, what broke, what was changed and how it was
checked. Written as a record, not as a narrative — `PROCESS.md` is the author's
own account and is not written here.

Decisions marked **[decided]** were made by the repository owner, not by the
agent, and are recorded with the reasoning that was given for them.

---

## Stage 1 — course design

**[decided]** Four lectures (weeks 1, 4, 7, 11) rather than twelve. Reason
given: twelve lecture pages beside twelve studio pages would repeat one another,
which the brief penalises by name. Condition attached: the eight lecture-free
weeks must carry their teaching somewhere explicit, and no assessment criterion
may rest on a lecture that was deleted rather than relocated.

**[decided]** One shared, deliberately broken `upload-ui` for the whole cohort,
with recoverable stage checkpoints. Reason given: comparability between students,
and the first three weeks should not be spent building scaffolding. Conditions
attached: students still diagnose and choose; checkpoints must not read as model
answers; a student who did not finish week N can still join week N+1.

**[decided]** Week 11 uses three classmates in class, not five recruited
participants, with an equivalent structured walkthrough for anyone who declines.
Marking judges whether conclusions are proportionate to the evidence, never the
number of participants. "Three changes" relaxed to *three evidence-backed
decisions, at most three changes* — keeping the current behaviour is a
legitimate decision.

**[decided]** Assignment 2 moved from week 7 to early week 8. Explicit
instruction: do not treat publishing material early as evidence that a
capability has been taught.

### Problem: the lecture came after the exercise

Observed while assigning dates. The first plan had studios on Tuesday and
lectures on Thursday, which puts weeks 4, 7 and 11's exercise *before* the
lecture that teaches it.

Options: (a) move the four lectures to the preceding Friday; (b) swap the days
so lectures run Tuesday and studios Thursday; (c) reorder the weeks.

Changed: (b). Lectures Tuesday 11:00, studios Thursday 14:00. Checked against
the 2027 teaching period — Tuesday and Thursday also avoid all three Monday
public holidays in it (Canberra Day, Easter Monday, the ANZAC Day holiday), so
no week loses a session.

### Problem: deriving the Assignment 2 deadline

Constraints: after the week 7 studio (Thu 22 Apr, the last accessibility
teaching); before the week 8 studio (Thu 29 Apr) and not shortening it; not on
the Monday, which is a public holiday.

Changed: Tuesday 27 April, 10:00 — five days after the last teaching, across a
weekend and a public holiday, on a day with no class. Recorded on the assessment
page so a reader can see the derivation rather than a bare date.

---

## Stage 2 — the harness

Six content rules written into `CLAUDE.md`, each tagged machine-checkable or
human-judged. Three were already enforced; three were not, and enforcement was
added rather than left as a claim.

### Verified that the teach-before-assess check can fail

A check that cannot fail is not a check. Assignment 1 was temporarily given
Assignment 2's accessibility outcome; the suite went red with
`progress-bar-autopsy is due 2027-03-12 and assesses LO3, first taught
2027-04-22`. Reverted; 25/25 green.

Side effect worth recording: the check forced LO4 onto week 1. Assignment 1's
*Honesty of limits* criterion is an LO4 criterion, and without week 1 teaching
part of LO4 the assessment would have been assessing untaught material. The
check found that, not a reading of the plan.

---

## Stage 3 — content

### Problem: axe rejects `| | |`

`empty-table-header`, nine pages at once, then again on one page later in the
same session after the rule was already written into `CLAUDE.md`. Markdown
tables with a blank header cell compile and render and fail the accessibility
pass.

Changed: every table given real column headers. A sweep script now checks all
content tables for a blank header cell; it reports none.

### Problem: bare `related:` slugs dangle across collections

Twenty dangling refs in one build. A bare slug resolves inside the *same*
collection, so `10-numbers-without-sources` written in a lecture's `related:`
becomes `lectures/10-numbers-without-sources`.

Changed: cross-collection refs qualified with `sessions/`. Recorded in
`CLAUDE.md`.

### Problem: readings would have existed in two places

The week pages need annotated readings; `/readings/` needs the same list.

Options: (a) write both and accept drift; (b) put bare URLs in the platform's
`links:` field and lose the annotation; (c) declare a `readings:` frontmatter
key and render both surfaces from it through one component.

Changed: (c). `src/components/ReadingList.astro` renders on the week page and on
`/readings/`. `question`, `outcomes` and `readings` were also moved from
pass-through into `content.config.ts` so a mistyped outcome is a build failure;
they still reach the API's `meta` unchanged.

### Problem: a false claim about the toolchain, in the file about not making them

`CLAUDE.md` asserted that `pnpm build` resolves every external link and records
them in `.link-checker/verified-external-links.tsv`. The file was never
produced. `astro-theme-university` passes `checkExternalLinks: false` to the
checker; the build resolves internal links only.

This is precisely the failure content rule 6 exists to prevent, made about the
mechanism enforcing rule 6.

Options: (a) correct the sentence and leave rule 6 to human judgement; (b) add a
second link-checker instance with external checking on — rejected, because
network checks inside `pnpm check` go red on rate limits and get ignored;
(c) build the mechanism the claim described.

Changed: (c), plus the correction. `scripts/verify-readings.mjs` fetches every
reading URL the built site sets and writes `docs/verified-readings.tsv`;
`spec/readings.test.ts` fails if the site sets a reading the manifest does not
vouch for with a 2xx. 21 readings, all 200. The corrected `CLAUDE.md` entry
records the mistake rather than quietly describing the new mechanism.

### Problem: multi-line MDX comments break a deck build

astromotion rejects them with an explanation (a formatter escapes the `*` and
the broken output is a fixed point). The comment in question was a note saying
the week 5 trace is recorded sample data.

Changed: made it visible text on the slide instead of a hidden comment. Content
rule 5 wants simulated data labelled for the audience, so the constraint
produced the better result.

---

## Stage 4 — artwork

### Problem: the first hero artwork did not survive the slot

Drawn for a light page: a stage chain, a gold bar stopped at 99% with the last
per cent hatched, a tick scale, on cream. In the hero slot the theme lays a dark
scrim under the white page title and crops top and bottom. The chain was cut
off, the gold read as olive, and the "99%" was illegible.

Options: (a) an image-free hero, which the starter permits; (b) lighten the
scrim, which means fighting the theme's brand tokens; (c) draw for the slot.

Changed: (c). The hero is now a full-bleed time scale on ink — ninety-six gold
ticks lengthening left to right with the last one left conspicuously short —
with no fine detail near an edge and nothing that has to survive being half
covered by text. The original drawing was kept for the social card, which is
shown flat.

Checked by screenshot at 1920×900 before and after. Both SVG sources are
committed and `scripts/art/make-art.mjs` regenerates the binaries.

---

## Verification performed

| What | How | Result |
| --- | --- | --- |
| Types, build, content graph | `pnpm check` | green |
| Accessibility | axe over every rendered page, in `pnpm build` | 34 pages, 0 violations |
| Internal links and base paths | build's link checker | 0 broken |
| Decks compile | astromotion, in `pnpm build` | 2 decks, 0 structural violations |
| Course rules | `spec/course-shape.test.ts` | 36 tests green overall |
| Readings resolve | `node scripts/verify-readings.mjs` | 21 URLs, all 200 |
| Layout overflow | CDP, real emulated viewports, `scrollWidth` vs `clientWidth` | 34 routes × 2 viewports, no overflow |
| Simulator behaviour | CDP, all five scenarios driven and probed | see below |

### Simulator, measured rather than assumed

Driven through the deployed build with the DevTools protocol:

- **steady** — 27% mid-run; reaches 100 only on the `committed` event; Start
  disabled afterwards.
- **unknown total** — `aria-valuenow` **absent** (not `0`); readout reads
  "Total unknown"; a regex for `\d+\s*%` over the whole display region finds
  nothing.
- **stall** — fill frozen at 45% while elapsed advances 6.4 s → 10.0 s; recovers
  to the verifying stage.
- **fail then retry** — rolls back to 80 units (the start of verification),
  button becomes Retry, resumes from 80 rather than 0, clock not reset
  (8.5 s → 9.6 s).
- **pause / reset** — value held at 23 across a pause; reset returns 0 units,
  0 events, Idle.

### A false alarm worth recording

Chrome's `--headless --screenshot --window-size=390,844` appeared to show the
site overflowing at phone width. An untouched starter page showed the same
clipping, so the cause was the screenshot, not the layout: the flag does not set
the layout viewport. Re-measured through `Emulation.setDeviceMetricsOverride`,
which reports no overflow anywhere. Every viewport claim above rests on the
second method.

---

## Stage 5 — acceptance pass

Requested: check the site the way a student would use it, at both marking
viewports, and check whether the course holds together. The instruction was not
to rely on the previous completion report, which turned out to matter.

### A claim in the previous report was wrong

That report said the navigation links were "visible" at 390px. They are not
reachable: the theme wraps them in a container carrying `inert`, which keeps
layout but removes them from the tab order and from pointer events. The earlier
probe had checked `display`, `visibility` and `opacity` and not `inert`. The
correct finding is that the nav sits behind the Menu button and opens from the
keyboard — verified by pressing Enter on it and tabbing to Studios.

### Three cross-page contradictions, all found by reading

None of these was visible to any check.

1. Week 7 said Assignment 2 was due "the Tuesday after next". From the week 7
   studio on Thursday 22 April that is 4 May; it is due 27 April, which is what
   the calendar, the overview, the brief and the week 7 lecture all said. The
   earlier date sweep missed it because the phrase broke across two lines and the
   pattern used a literal space.
2. Week 2's room plan said "both tutors circulating"; its frontmatter listed one.
3. The convenor's biography enumerated the four weeks she teaches; the data listed
   her on seven. Rewritten not to restate a fact the calendar owns.

### A focus indicator missing from every page

Walking the tab order found the theme's footer theme-toggle reaching focus with
no outline and no box-shadow, at both viewports. axe has no automatic rule for
this, so it had passed every build.

Two wrong turns, both measured:

- A `:where()` floor in `PageLayout.astro` had no effect on that control:
  `.at-footer-theme-toggle` is declared `all: unset`, which resets `outline`, and
  one class beats a zero-specificity list.
- Naming the control fixed it on five pages out of thirty-three. `PageLayout` is
  reached only by the MDX pages; every `.astro` page imports the theme's
  ContentLayout directly.

Resolved by moving both rules into `src/styles/focus.css` and importing it from
every page. Re-walked: no control without an indicator at either viewport.

### A link that named a week and went somewhere else

The simulator's scenario index carried five links reading "Week 3", "Week 4",
"Week 8", "Week 9" — every one pointing at `/sessions/`. The link checker was
satisfied, because `/sessions/` exists.

Changed: look the week up by number from the collection, so a renamed week cannot
leave the link pointing elsewhere. `spec/course-integrity.test.ts` now fails on a
link whose label names one week and whose href is another.

### Checks added, each falsified before being trusted

`spec/course-integrity.test.ts`. Three deliberate breakages confirmed it can
fail: altering the simulator's stage weights so they do not sum to 100 (red);
changing a prose weekday to Wednesday (red, naming the correct weekday); moving a
week's date so ordering breaks (two tests red). All reverted.

`scripts/verify-in-browser.mjs` was added for the behaviour vitest cannot reach.

---

## Stage 6 — twelve decks, and the pages that surround them

**[decided]** Weekly slides for all twelve weeks, sharing the site's existing
deck tooling and styling, with the four-lecture timetable unchanged. Also: the
home page must state the relationship between the percentage, the stages and the
completion condition; week pages must say what a student starts with and what
finished looks like; assessment pages must say how they accumulate.

Ten decks written, weeks 1 and 5 brought to the same shape. Each carries the
week's problem, what it builds on and this week's objectives, the concepts, one
worked example on the shared `upload-ui` with its simulated data labelled, the
exercise, a named common error, the evidence limits, and where the output lands.

### Problem: slides that fit are not slides that can be read

The brief was explicit that "nothing is cut off" would not count as a readability
verdict, and it was right to be.

Measured at both viewports with the DevTools protocol, reading each element's
computed font size and multiplying by Reveal's scale transform:

| Viewport | Reveal scale | Effective text |
| --- | --- | --- |
| 1920×1080 | 1.5 | 37.8–42 px |
| 390×844 | 0.305 | **7.7–8.5 px** |

Reveal lays every deck on a fixed 1280×720 canvas and scales it to fit, so a
390px screen gets 390/1280.

Three mechanisms tried, each measured, each discarded:

| Attempt | Result |
| --- | --- |
| `font-size` on `.reveal` | **worse** — 4.4 effective px. It replaces the theme's absolute base with a relative one |
| `--r-main-font-size` | no change. The theme sizes paragraphs, list items and table cells in absolute `rem`, not from that variable |
| larger rem base, 22px | 10.9 px, and **all twelve decks clipped** by 8–147px |
| larger rem base, 19px | 9.1 px, nine decks still clipped |
| larger rem base, 18px | 8.6 px, six decks still clipped |

The obvious fix is not available: canvas size, `maxScale`, and
`scrollActivationWidth: null` — which disables Reveal 5's mobile scroll view —
are all fixed in astromotion's page template, which is platform.

Reverted to the default. The finding and the three dead ends are recorded in
`src/decks/theme.css` so the next person does not repeat them, and every week
page now tells a phone reader that the page carries the same material as prose.
**This is a mitigation, not a fix, and the issue stays open.**

### Real clipping, at desktop, found by measuring

Three slides exceeded the canvas: week 7's audit table by 117px, week 9's test
by 48px, week 7's focus example by 25px. Trimmed. The +4px tolerance in the probe
was added afterwards to stop chasing sub-pixel rounding on scrollable `pre`.

### A fourth empty table header

`| | |` failed axe again, this time in two decks and later in the assessments
index. The sweep script written in stage 3 only covered `src/content`; it now
covers everything under `src/`. Recording this because the rule has been in
CLAUDE.md since stage 2 and was still broken three times after.

---

## Known open items

- **Nothing is pushed.** `origin/main` is at `b4243c9`; the local branch is nine
  commits ahead. `check:evidence` passes because it resolves SHAs against the
  local repository — every citation in `PROCESS.md` is a 404 for a reader until
  the branch is pushed.
- **The site has never been deployed.** No live URL, and CI has never run: both
  jobs are gated on the repository being public.
- **Slides on a phone render at 7.7–8.5 effective px.** The platform's fixed
  canvas makes this the best achievable without clipping; see stage 6.
- **No screen reader has been used.** Semantics and announcements were verified
  to exist and be sane, which is not the same as being good.
- **The marking environment has not been used.** Everything was verified in
  headless Chrome over the DevTools protocol against a local production preview.
- `pnpm test:template` fails four assertions because the starter images were
  replaced or deleted, which `check-evidence` explicitly permits. CI runs that
  suite only for template repositories.
- **`PROCESS.md` is the author's own text**, installed verbatim. Three
  suggestions were given about it and not acted on by the agent: it does not yet
  state what the author decided a good course looks like, it does not mention the
  agent proposals the author overrode, and seven sentences take the agent as
  their subject.
