# CLAUDE.md

Guidance for working in this repository.

## What this is

A **single-file study tracker** for a homeschooled candidate preparing for
**CBSE Class 12 boards** and **JEE Main 2027** simultaneously. The whole
application — markup, styles, and app logic — lives in **`index.html`**. It is a
static page deployed to **GitHub Pages**.

The tracker covers the plan window Mon 27 Jul 2026 → JEE Main Session 2
(early Apr 2027): a register of every chapter across Maths, Physics, Chemistry,
English and PE (plus a Class-11 JEE-only track), the phase/milestone calendar,
a test log with charts, the diagnostic, and reference copies of the plan and
the guardian manual.

## Architecture

- **One file.** Everything ships in `index.html` (~1500 lines): inline CSS in a
  `<style>` block, then the entire app in a single
  `<script type="text/babel" data-presets="react">` block.
- **React via CDN, compiled in the browser.** The page loads React 18,
  ReactDOM, and **Babel standalone** from `unpkg.com`, and Babel transpiles the
  JSX at runtime. Google Fonts are loaded from their CDN too. So it is *not*
  dependency-free vanilla JS — but there is still **no build step**: the browser
  compiles the JSX itself. What you edit in `index.html` is what runs.
- **State lives entirely in the browser.** All user data is persisted to
  **`localStorage`** under the single key **`"prep-register-v2"`** (see
  `KEY`, `loadAll`, `saveAll` in `index.html`). The whole state tree is one
  JSON blob. There is no backend and no database. Clearing browser storage
  resets the tracker. The **Backup** tab exports/imports that JSON so state can
  be moved between browsers manually.
- **Optional Google Drive sync.** The Backup tab has a `Sync` component that can
  save/load the same JSON blob to the user's *own* Google Drive
  (`appDataFolder`) via Google Identity Services + the Drive REST API — no
  backend, no cost, public OAuth Client ID only (SPA flow, no secret). Google's
  `gsi/client` script is loaded **on demand** (only when the user clicks a sync
  button), so the page still makes no third-party data calls by default. The
  Client ID is stored in `localStorage` under `prep-gdrive-client`; the access
  token is kept in memory only. This is the one deliberate exception to "no
  network calls for data," and it is strictly user-initiated.
- **Private by default.** `robots.txt` disallows all crawlers and the page
  sends `noindex, nofollow`. Keep it that way — this is one student's personal
  register, not a public site.

## Layout

```
index.html                     the entire app (edit this)
robots.txt                     Disallow: / — keep crawlers out
papers/                        printable exam papers served by the Papers tab
  README.md                    naming convention the app HEAD-checks for
docs/                          source reference material the app content is derived from
  study-plan.md                the full 11-part integrated prep plan
  guardian-manual.md           how a non-expert guardian runs the plan
  diagnostic-test-paper.md     the Week 0 diagnostic questions
  diagnostic-marking-key.md    marking key + interpretation for the diagnostic
CLAUDE.md
```

## Tabs (each is a React component in `index.html`)

Register · **This week** · **Schedule** · **Papers** · Test log · Sunday ·
Diagnostic · The plan · Manual · Backup. A few are worth calling out because
they're data-driven and meant to grow:

- **Schedule** (`Schedule`) — the whole plan at a glance: every chapter placed
  in its week (Weeks 0–18), built directly from the `CH` array grouped by `wk`,
  so it stays in sync with the register. Read-only overview.

- **This week** (`WeekPage` + `ChapterGuide`) — pick any week (stepper /
  dropdown / "jump to now") or search a chapter, and get a per-chapter guide:
  what matters, core reading, question banks, extra materials, a live progress
  gauge wired to the register's ticks, and the tests to sit. Content comes from
  two objects: `SUBJECT_GUIDE` (per-subject defaults every chapter inherits)
  and `CH_GUIDE` (per-chapter specifics, keyed by chapter id like `"M5"`).
  **To extend the guides, edit those two objects** — a chapter with no
  `CH_GUIDE` entry still renders the subject defaults plus a "not written yet"
  note.
- **Papers** (`Papers` + `HostedLink`) — official CBSE / JEE Main / NCERT
  sources. Any PDF placed in `papers/` under the names in `papers/README.md`
  auto-appears as a Download/print button: `HostedLink` does a `HEAD` fetch on
  each expected path and only shows the button when the file returns 200.
  Everything else links out to the official portal. The `PAPERS` array is the
  data model — extend it to add more papers or point rows at local files.
  Never commit copyrighted commercial question banks here.

The `docs/*.md` files are **reference source material**, not loaded or fetched
by the app — the plan text and manual shown inside the tracker are hand-ported
into React components in `index.html`. If you change the plan in `docs/`, the
in-app copy does not update automatically, and vice versa; keep them in sync
deliberately.

## Making changes

1. Edit **`index.html`** directly. There is no build or install step.
2. Verify by opening `index.html` in a browser (a network connection is needed
   the first time so the CDN scripts load). Confirm the tabs render and that a
   change you make survives a page reload (i.e. `localStorage` still parses).
3. Commit and push. GitHub Pages redeploys automatically from the pushed branch.

## Working with state

- The storage key is **`"prep-register-v2"`** — the `v2` suffix implies the
  shape has been revised before. If you change the structure of the persisted
  state, existing users already have data under this key. Either migrate the
  old shape on load or bump the key (e.g. `-v3`) rather than silently breaking
  saved progress. `loadAll` already swallows parse errors and returns `null`,
  so a hard shape change degrades to "empty tracker," not a crash — but that
  still loses the user's data.
- Because it's a single JSON blob in `localStorage`, the Backup tab's
  export/import is the only migration path a user has. Don't break its format
  casually.

## Conventions

- Keep the project a single self-contained `index.html`. Do not introduce a
  build toolchain, framework install, or bundler unless explicitly asked —
  the whole point is a zero-build file that deploys as-is to GitHub Pages.
- Match the existing style: terse React function components, inline CSS custom
  properties (`var(--ink)`, `var(--rule)`, …), IBM Plex / Archivo fonts.
- Don't add analytics, trackers, or anything that phones home. This is private.
