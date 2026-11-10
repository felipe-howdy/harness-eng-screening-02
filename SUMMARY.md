# Summary

## Bugs found and fixed

| # | Bug | Root cause | Fix | Regression test |
|---|---|---|---|---|
| 1 | Header "N active tasks remaining" changed with the filter (Completed → 0) | Count computed from the filtered list in `app/page.tsx` | Filter + count moved to `lib/taskView.ts`; count uses all tasks | `tests/taskView.test.ts` |
| 2 | Unchecking a completed task kept its `completedAt` | Page computed `completedAt` and PATCHed the whole task; the store merged the patch, so the stale value survived | `updateTask` derives `completedAt` from `completed` (set on complete, removed on uncomplete, client value ignored); page sends only `{ completed }` | `tests/completedAt.test.ts` |
| 3 | `PATCH` accepted any body: could change `id`/`createdAt`, blank the title, set `completed: "no"` | Route passed raw JSON straight to the store | Route accepts only `title`/`description`/`completed`, type-checks and trims them, else 400 | `tests/api.test.ts` |
| 4 | Malformed JSON body → 500 | `req.json()` throw not handled (`POST`, `PATCH`) | Parse failure becomes 400 | `tests/api.test.ts` |

## Files changed

- Fixes: `lib/taskStore.ts`, `app/api/tasks/[id]/route.ts`, `app/api/tasks/route.ts`, `app/page.tsx`, `lib/taskView.ts` (new).
- Tests (new): `tests/taskView.test.ts`, `tests/completedAt.test.ts`, `tests/api.test.ts`.
- Harness: `AGENTS.md`, `CLAUDE.md` (imports `AGENTS.md` for Claude Code), `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`, `check` script in `package.json`.

## Verification

- `npm run check`: typecheck clean, 19/19 tests pass (2 original + 17 new).
- Every new test was run against the unfixed code first and failed (API 10/11, completedAt 2/2, taskView on the original count logic).
- Running app: with the Completed filter on, the header shows "5 active tasks remaining". Live API: `id` overwrite → 400, blank title → 400, bad JSON → 400, uncheck removes `completedAt`, recheck sets a new one.

## How the harness helped

- `specs/mission.md` fixed the invariants (`completedAt` present iff completed; server owns `id`, `createdAt`, `completedAt`) and the API trust boundary before any code changed. Bugs 2 and 3 are violations of those rules, and the tests assert the rules directly.
- The `AGENTS.md` loop (failing test → root-cause fix → `npm run check`) caught a test that passed for the wrong reason; it was rewritten to send the payload the real page sends.
- `specs/tech-stack.md` records how to call route handlers directly, so API tests need no server, and the dev hot-reload trap that produced misleading 404s.
- One gate command, `npm run check`, for "done".

## How AI was used

- Claude Code read the repo, drafted the harness, listed bug candidates, wrote each failing test, then the fix, and ran the checks plus browser and API verification.
- The candidate set scope and order (harness first, then bug 2, then the rest), asked for UI reproduction steps and for regression tests on every bug.

## With more time

- Real UI test of `app/page.tsx` (jsdom + Testing Library, or Playwright e2e); needs new dev dependencies.
- ESLint config so `npm run lint` can join `npm run check`.
- Keep the store on `globalThis` so dev hot reload doesn't re-seed it.
- `getAllTasks` returns the internal array; return a copy.
- Page ignores failed requests; show an error.
