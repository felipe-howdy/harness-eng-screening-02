# Tech stack

- Next.js 14 (App Router), React 18, TypeScript 5 (`strict`), Tailwind 3.
- Vitest 1.6, `node` environment, files in `tests/**/*.test.ts`.
- Node 20+.
- `@/` resolves to the repo root (tsconfig and vitest).

## Important folders

- `app/page.tsx`: the only page; client component that fetches `/api/tasks` and filters on the client.
- `app/components/`: presentational components, no data logic.
- `app/api/tasks/`: route handlers (`route.ts` = GET/POST, `[id]/route.ts` = PATCH/DELETE).
- `lib/taskStore.ts`: in-memory store and seed data; the only code that mutates tasks.
- `lib/taskView.ts`: pure view logic for the page (filtered list, active count); keep page logic here so it can be tested without a DOM.
- `lib/types.ts`: `Task`, `Filter`.
- `tests/`: Vitest tests.

## Commands

| Command | Purpose |
|---|---|
| `npm install` | install deps (once) |
| `npm run check` | typecheck + tests: the gate before calling work done |
| `npm test` | tests only |
| `npm run dev` | run the app at http://localhost:3000 |

## Testing notes

- Route handlers are plain async functions. Test them without a server: import `GET`/`POST`/`PATCH`/`DELETE` and call them with `new NextRequest(url, { method, body })` from `next/server`; `[id]` handlers also take `{ params: { id } }`.
- Store state is module-level and shared by all tests in a file. Create the tasks a test needs instead of relying on seed order.
- In `npm run dev`, editing `lib/` or a route re-seeds the store with new random IDs, so an ID fetched before the reload returns 404. Re-fetch IDs after edits before calling the API by hand.

## Constraints

- In-memory store only; data resets on restart. No database.
- No auth. No external services or network calls outside the app's own API.
- No new dependencies.
