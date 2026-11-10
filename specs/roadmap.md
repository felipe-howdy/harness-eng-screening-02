# Roadmap (30-minute screen)

1. [x] Inspect the repo; write the harness (`specs/`, `AGENTS.md`, `npm run check`).
2. [x] Reproduce each bug with a failing test:
   - [x] Active-task count uses the filtered list (`app/page.tsx`) → `tests/taskView.test.ts`.
   - [x] Uncompleting a task keeps a stale `completedAt` (`app/page.tsx` toggle + store merge) → `tests/completedAt.test.ts`.
   - [x] `PATCH` passes the raw body to the store: can overwrite `id`/`createdAt`, blank the title, set wrong types → `tests/api.test.ts`.
   - [x] Malformed JSON body returns 500 instead of 400 (`POST`, `PATCH`) → `tests/api.test.ts`.
3. [x] Fix each at the root cause with the smallest diff (store/route, not every caller).
4. [x] `npm run check` passes (typecheck + 19 tests).
5. [x] Write the summary: `SUMMARY.md`.

## Later (out of scope now)

- UI tests for `app/page.tsx` (needs jsdom + Testing Library).
- ESLint config so `npm run lint` runs non-interactively, then add it to `check`.
- Keep the store on `globalThis` so dev hot reload doesn't re-seed it.
