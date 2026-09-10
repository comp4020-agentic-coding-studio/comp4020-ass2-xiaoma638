# COMP4020 Assignment 2 — Slop University course site

A whole course website for a course of my own design at Slop University. The
**deployed site** is what gets marked, not this repo: live in the latest stable
Chrome at two viewports --- 1920×1080 (desktop) and 390×844 (phone) --- and both
count in full.

The
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
publishes the brief and the spec. The brief poses the problem; the spec is the
fixed contract. Read both before planning or building.

Twenty-odd pages that have to **agree with each other**. Assignment 1 was one
page with one interaction; the risk here is different, and it is coherence. An
agent will happily produce content-shaped chunks; making them one course with
one voice is my job, and it is the largest thing being marked.

## How to work in here

- Keep the dev server running (`pnpm dev`). It serves under the base path, so
  the address is `http://localhost:4321/comp4020-ass2-xiaoma638/` --- the bare
  `http://localhost:4321` Astro prints is a 404.
- Before pushing, run `pnpm check` (typecheck, then a full build, then the
  `spec/` suite). It is the same roster CI runs, in seconds, and while the repo
  is private CI runs nothing at all --- so this is the only feedback loop until
  ship day.
- To see what a page actually looks like rather than what I assume it looks
  like, open it in a browser (the `agent-browser` CLI works well for this). The
  rendered page is the truth; a mental model of it isn't.
- When a check fails, read its output before changing anything. The failure
  message is the instruction: it names the file, the ref, or the contract. A red
  check is authoritative --- the page is wrong until it's green, not until I
  decide it should be.
- Commit when the checks pass. Never commit a red state.

## The platform is fixed; the course is mine

`README.md` documents the platform in full. The parts that change how a task
should be carried out:

- **The stack is not a choice in this repo.** Astro on `astro-theme-slop`, the
  four content collections, the build pipeline in `astro.config.ts` and the
  generated API stay as they arrived. Adding is always allowed --- a collection
  of my own, a page outside the collections, a component the theme lacks ---
  but do not propose swapping the generator, and do not restyle by fighting the
  theme's brand tokens.
- **The collection key is the whole address.** `sessions/getting-started` is the
  file `src/content/sessions/getting-started.md`, the page
  `/sessions/getting-started/`, the JSON `/api/sessions/getting-started.json`,
  and the ref other pages link by. Renaming one means renaming all four.
- **`related:` refs are checked by the build.** A dangling ref fails the build,
  which is the point. Declare an edge on whichever side is convenient; it
  renders on both.
- **`src/course-config.ts` is the single source for the course record.** Home
  page, navigation and `/api/index.json` all read it, so never restate its facts
  in prose. Its schema is strict: `SLOPxxxx` with the level digit matching
  `level`, an 80--300 character description, one to three tags, `startDate` on or
  before `endDate`.
- **Keep `805`.** The last three digits of `SLOP1805` were allocated to this
  repo and no other course in the cohort has them. Only the first digit (the
  level) is mine to choose.
- **Dates are a cross-page fact.** Every session, lecture and assessment date
  must sit inside `startDate`/`endDate`. `spec/data-integrity.test.ts` is the
  only shipped check, and this is what it checks. Change the course record's
  dates and the twelve weeks of dated content together, never one alone.
- **Root-absolute links in `.astro` files skip Astro's base handling.**
  `href="/sessions/"` works on localhost and 404s on the live site. Markdown
  links and the theme's components are rewritten automatically; hand-written
  ones in `.astro` are not.
- **Decks** live in `src/decks/*.deck.mdx` and build to `/decks/<name>/`. A deck
  is not a collection entry, so it has no `related:` edges --- link it from its
  lecture page with a markdown link. Nothing checks whether a slide fits or
  stays legible; that only shows up in a browser at the two viewports.

## The link-preview card

The image a shared link shows comes from `socialImage:` in
`src/site-config.ts`, pointing at a `/src/assets/...` path, with
`socialImageAlt:` describing it. A page with artwork of its own overrides it
with a `socialImage:` frontmatter key. The picture is 1200×630, and the theme
re-encodes it to JPEG for scrapers. Both the site-wide image and its alt text
arrive as placeholders.

## The checks (my sensors)

CI runs `check` and `deploy` on every push **once the repo is public** --- while
it's private both stay skipped. Each check is a different way of finding out
something true about the site that I can't reliably see by looking at it.

- **typecheck** --- `astro check`, first in `pnpm check`, so a type error stops
  the roster before the build starts.
- **build** --- `pnpm build` is itself several sensors at once: it runs **axe**
  over every rendered page, verifies internal links respect the base path, fails
  on a dangling content ref, compiles every deck, and emits the versioned API.
  A build failure means nothing downstream matters.
- **spec** --- `pnpm test` builds and then runs `vitest run spec`, so the tests
  assert what the site *actually built*, not what the source intends. Shipped:
  `spec/data-integrity.test.ts`. Everything else in `spec/*.test.ts` is mine to
  write from the published spec.
- **evidence** --- `pnpm check:evidence` is the submission gate, and for
  Assignment 2 it is stricter than usual: `PROCESS.md` present with its template
  comment gone and every cited SHA resolving to a real commit; **every tracked
  `STARTER_CONTENT` marker removed** (13 of them at clone time, listed by the
  failure); and the four starter images replaced or deleted --- it compares
  SHA-256 against the shipped files, so an unchanged placeholder cannot pass.
  Remove a fragment's marker when I replace that fragment, not before.
- **secrets** --- `.githooks/pre-commit` (installed by `pnpm install`) blocks any
  commit containing something shaped like an API key. By the time CI sees a key
  it's already pushed, so the hook is the sensor that matters.

Nothing measures **performance**, and nothing judges whether twelve weeks of
content actually cohere. Those are mine, by hand.

## Your process is part of the mark

Process is **45%** of this assignment --- the largest criterion. The checks above
can't see any of it, so a person reads it directly.

- **Commit as you go.** The history is read as the record of how the work came
  together. A trail that grew alongside the site is the strongest evidence; a
  single dump the night before is the weakest.
- **`PROCESS.md` is the account**, 400--600 words, written by me for a reader, as
  **one narrative** rather than a run of fixes with a hash apiece. Its spine for
  this assignment: what I decided a good university course looks like, which of
  those decisions I encoded in the harness --- as a rule in this file or a check
  in `spec/` --- and which I deliberately left out. Cite commits as
  ``[`<sha>`](<commit or compare URL>)``; an uncited claim isn't evidence.
- **There is no reflection file for an assignment repo.** `reflections/` stays
  empty except its README; the week 7 retro presents the breakthrough from
  `PROCESS.md`. (`check:evidence` confirms this: *"none needed --- an
  assignment's written account is PROCESS.md"*.)
- **This file is process evidence.** The harness is read as part of how I
  worked, so it stays honest and current --- a rule nobody acts on is not a
  harness.

## This file is mine

As I learn what this site needs --- a convention to hold the agent to, a sensor
that keeps catching me out, a fact about the platform the agent keeps getting
wrong --- it gets written down here. The rules below carried across from earlier
weeks; each came from something that actually went wrong.

## Working method (carried forward from week 3)

For substantial tasks, follow this sequence:

1. **Understand** --- the relevant spec requirement, the user need, the
   relevant files, and how the result will be verified. Don't modify several
   files immediately after a broad request.
2. **Plan** --- before a multi-file change, give a concise plan: intended
   outcome, files likely to change, and how it'll be checked. Keep it
   realistic.
3. **Implement** --- one meaningful slice at a time. Prefer small,
   understandable changes over unrelated refactors.
4. **Verify** --- run the relevant checks, inspect the rendered result at both
   viewports, and correct failures before continuing.
5. **Document** --- update process evidence (`PROCESS.md`, commits) as the work
   happens, not reconstructed at the end.

## Task reports

Before a substantial task, briefly state the requirement being addressed, the
likely files involved, and how the result will be checked. After it, briefly
report what changed, why, the checks actually run, and whether both viewports
were inspected. Keep reports short for small edits, and be honest about
anything not checked.

## Commit discipline

Commit meaningful stages, not one final dump. Use specific messages describing
what changed and why (e.g. "Add hero section with race facts"), not vague ones
("update", "changes", "fix stuff"). Commit only after the relevant checks pass
--- never knowingly commit a broken state.

## Carried forward from Assignment 1

Each of these came from something that actually went wrong building the
solar-distance prototype. They're written down so the same failure costs less
the second time.

- **Propose the commit; don't wait to be asked.** The rule above already said
  "not one final dump", and Assignment 1 was still written across a week and
  committed the day before it was due --- a rule nobody acts on is not a
  harness. So: whenever `pnpm check` goes red to green, or a task finishes,
  stop and offer a commit with a specific message before starting the next
  thing.

- **Green checks are not a rendered page.** Nothing in the roster looks at
  layout. Every viewport bug this week --- the illusion's ring collapsing, the
  labels colliding near dawn --- was invisible to `pnpm check` and obvious
  within seconds at 390x844. Open both marking viewports before calling a
  visual change done.

- **Say whether a visual claim was seen or computed.** When `agent-browser`
  isn't installed, geometry can still be worked out on paper --- but a
  calculated result and an observed one are different kinds of evidence, and
  reporting the first as if it were the second is how a confident wrong fix
  ships. Name which one it is, every time.

- **A component positioned internally in px owns its own box size.** The
  Ebbinghaus figure placed every ring dot absolutely, in px, against a 146px
  cluster; a breakpoint then narrowed the cluster to 132px. The dots didn't
  move with it, so the ring collapsed onto the centre disc and the illusion
  stopped demonstrating anything --- with every check still green, because
  nothing measures whether a figure still means what it claims. If a breakpoint
  needs a component smaller, scale it rather than resize it, and when a scale
  is mirrored in a custom property other elements derive from, change both or
  neither.

- **A passing local build says nothing about the deployed site.** `public/` sat
  untracked through the whole build: `pnpm build` passed because the files were
  on disk, and the deploy would have lost every clip and the globe texture.
  After adding an asset, confirm it's tracked, and prefer formats the marking
  browser is guaranteed to accept --- the clips were `.mov`, which Pages serves
  as `video/quicktime` and Chrome is under no obligation to play. Declare the
  type explicitly rather than leaving the browser to sniff it.

- **Check an asset's real dimensions against the size it renders at.** The two
  clips were 2940px wide and displayed at about 500px: 41MB of video that could
  never reach the screen, on a page whose argument depends on the reader
  actually watching them.

- **The stated idea and the built artefact have to agree.** `PROCESS.md`
  claimed the page celebrated the children's curiosity while the page itself
  ended on Confucius's restraint. A marker reads the claim first and then looks
  for it, so read the two against each other before shipping and fix whichever
  one is wrong.

## Carried forward from Crit 4

These came from building Grid 32, the 4×8 synthesised instrument. Some are
mistakes, some are moves that worked and should be repeated on purpose.

- **The first answer is about eighty per cent, and the missing twenty is mine
  to name.** "Add visual feedback" returned circles, pulses and a glow, all
  white --- a fair answer to a loose question, which is why it took three
  rounds to get past. Naming the actual contents (triangles, five-pointed
  stars, an arc that draws itself, orbiting dots, a ring turned in 3D, a
  curated palette per scene instead of white) landed finished in one pass
  ([`b21b5c7...4a54578`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit4-xiaoma638/compare/b21b5c7...4a54578)).
  Don't re-prompt for "better". Re-prompt with the list.

- **Two instructions, each carried out correctly, can cancel each other out.**
  "Tune it to do re mi" and "make the instrument families cross over instead of
  one per row" were both done exactly as asked; together they left only two
  pitched cells on any row, so the scale was in the code and inaudible in the
  room. Nothing was red. After a change that touches the same surface as an
  earlier one, go back and re-test the earlier one's claim by hand --- and look
  for the arrangement that satisfies both rather than reverting either
  ([`21a95d8`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit4-xiaoma638/commit/21a95d8)).

- **State up front what the tests cannot judge.** The roster can prove a
  collision ends the round; it cannot hear a chord, feel a drag, or tell you
  whether a stranger knows what to do. Before building, say out loud which spec
  lines are machine-checkable and which are mine to settle by playing --- so
  the unjudgeable ones get scheduled hands-on time instead of being discovered
  at the crit.

- **Turn a platform constraint into the way in.** The AudioContext needs a user
  gesture before it will make a sound, and the page had been opening straight
  onto a playable surface that read as empty. A single Start button satisfied
  the requirement *and* became the invitation to the first move; the keyboard
  is gated on the same flag so a key press can't walk past the door
  ([`ec402f3`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit4-xiaoma638/commit/ec402f3)).
  When the platform forces a step, make it the affordance rather than
  apologising for it.

- **Stopping a node is not disconnecting it.** The oscillators stopped, but the
  gains and filters they fed stayed wired into the master bus for as long as
  the page was open. The fix was a disposable sub-graph per note, torn down by
  a silent `ConstantSourceNode` scheduled on the audio clock --- not a timer,
  which drifts out of step with the sound and piles up on the main thread
  ([`06cdc4a`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit4-xiaoma638/commit/06cdc4a)).
  Schedule teardown on the same clock as the thing being torn down.

- **Make the performance budget an input, not a postmortem.** Under a fast drag
  the page has to stay honest: a live-element pool with a ceiling and
  oldest-out-first, a `headroom` value every effect consults so a crowded page
  answers with fewer, larger gestures, and an input path that reads no layout
  at all (measure the grid once and on resize, find cells by arithmetic,
  coalesce pointer moves to one pass per frame). Decide the ceiling before
  writing the loop
  ([`4a54578`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit4-xiaoma638/commit/4a54578)).

## Carried forward from Crit 5

Building One Second Behind took three complete designs. Most of what follows is
the cost of the first two.

- **"It teaches itself" is a property of the mechanic, not of the art.** Two
  builds were thrown away after trying to make an opaque design legible with
  better shapes and clearer colour. A design whose rules need a legend cannot
  be lit into one. When a brief asks for something a stranger understands
  without words, judge the *mechanic* against that before drawing anything ---
  and if the lesson and the mechanic can be made the same event, there is
  nothing left over to explain.

- **Write a test that can falsify the design, not just protect it.** A
  playthrough test --- play a whole round frame by frame against the pure
  machine, assert the outcome --- found that the greedy line simply won, which
  meant the trade the entire game was built on did not exist. Every screenshot
  still looked correct, and no amount of playing it myself would have found it
  as fast, because I would have played it the way I intended it. A test that
  asserts a *design claim* is worth more than one that asserts current
  behaviour.

- **Measure an element from its own box, and expect that box to arrive late.**
  Sizing the world from `window` put correct coordinates in the wrong place ---
  everything shifted together with nothing in the state wrong, which is the
  hardest kind of wrong to see. Worse, the real size can arrive *after* the
  module runs, so anything placed at startup is placed from a size that was
  never true. Use `getBoundingClientRect` on the element, watch it with a
  `ResizeObserver`, and re-place startup state when the first real size lands.
  (Same shape as the Assignment 1 note about a component that sizes itself from
  something other than its own box.)

- **Sizing a canvas clears it.** A running loop hides that on the next frame; a
  paused, finished, or otherwise idle board just goes blank. Redraw at the end
  of whatever handles the resize.

- **`<use>` builds a shadow tree, and stylesheet selectors do not reach into
  it.** An entire cast rendered black because every `fill` in `defs` fell back
  to the default. Inline the shapes, or set the paint on the `<use>` itself.
  More generally: if a rule appears to have no effect, check that the selector
  can reach the node at all before changing the rule.

- **A substring replace edits every match, including the ones inside longer
  selectors.** Inserting a block before `#again {` also rewrote
  `:root[data-phase="lost"] #again {`, which turned a conditional rule into an
  unconditional one and left a restart button sitting on the board mid-round.
  Scripted edits to CSS or code should anchor on something unique, or rewrite a
  whole named section rather than splice into it.

- **A headless screenshot is a weaker witness than it looks.** The viewport it
  reports to JavaScript and the one it captures can differ, and can differ
  between runs on the same command. It is still the fastest way to catch a
  layout that is plainly wrong --- it found two real bugs this week --- but a
  disagreement between a measured value and a captured image is not proof the
  page is broken. Say which of the two a claim rests on, and settle anything
  that matters in a real browser.
