# CLAUDE.md

Guidance for working in this repository.

## What this is

A **single-file study tracker** for **CBSE Class 12** and **JEE Main 2027** prep.
The entire application — markup, styles, and logic — lives in **`index.html`**.
It is a static page deployed to **GitHub Pages**.

## Architecture

- **One file, no framework.** Everything is in `index.html`: HTML, inline CSS,
  and vanilla JavaScript. There are no dependencies, no bundler, and no
  package manager.
- **State lives entirely in the browser.** All user data (progress, checked
  items, notes, whatever the tracker records) is persisted to
  **`localStorage`** under the single key **`"prep-register-v2"`**. There is no
  backend, no database, and no network calls for data. Clearing browser
  storage resets the tracker.
- **No build step.** The file the browser loads is the file in the repo. What
  you edit is what ships.

## Making changes

1. Edit **`index.html`** directly.
2. Commit the change.
3. Push. GitHub Pages redeploys automatically from the pushed branch.

Because there is no build or compile step, verify changes by opening
`index.html` in a browser locally (just open the file, or serve the directory
with any static server) before committing.

## Working with state

- The storage key is **`"prep-register-v2"`** — the `v2` suffix implies the
  shape has been revised before. If you change the structure of the persisted
  data, be mindful that existing users already have data under this key.
  Migrate it or bump the key rather than silently breaking saved progress.
- Since state is per-browser `localStorage`, data does **not** sync across
  devices or browsers. That is by design for this project.

## Conventions

- Keep the project a single self-contained `index.html`. Do not introduce a
  build toolchain, framework, or external runtime dependencies unless
  explicitly asked.
- Prefer inlined CSS/JS over external files to preserve the single-file,
  zero-build deployment model.
