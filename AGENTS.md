# AGENTS.md

Guide for AI coding agents working in this repo. Read it before editing.

## Read first

- `specs/mission.md`: behavior, data invariants, API trust boundaries, non-goals.
- `specs/tech-stack.md`: stack, folders, commands, how to test route handlers.
- `specs/roadmap.md`: the plan and suspected bugs. Tick items as you finish them.

## Repo map

```
app/page.tsx                 client page: state, fetch, filter, toggle, delete
app/components/              UI only
app/api/tasks/route.ts       GET list (?filter=), POST create
app/api/tasks/[id]/route.ts  PATCH update, DELETE
lib/taskStore.ts             in-memory store + seed; the only writer of tasks
lib/taskView.ts              filter + active count the page renders (pure, tested)
lib/types.ts                 Task, Filter
tests/                       Vitest
```

## Working loop

1. Take one roadmap item.
2. Write a test in `tests/` that reproduces it. Run `npm test` and watch it fail.
3. Fix at the root cause with the smallest diff. Enforce invariants once in the store/route, not in each caller.
4. Run `npm run check` until it passes.
5. Tick the roadmap item and note the bug and fix for the final summary.

## Mechanical checks

- `npm run check` (typecheck + tests) must pass before you report done.
- Never claim a fix works without a test that failed before and passes after. Report failures as they are.

## Constraints

- Stay in scope: no refactors, renames, reformatting or style changes outside the bug being fixed.
- No new dependencies, no database, no auth, no external services.
- Do not edit `CANDIDATE_BRIEF.md` or `README.md`.
- Do not weaken, skip or delete existing tests.
- Validate all API input in the route; the server owns `id`, `createdAt` and `completedAt`.
