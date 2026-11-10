# Mission

A single-user task manager in the browser: add, complete/uncomplete, filter and delete tasks.

## User

One person keeping a personal to-do list. No accounts, no sharing.

## Core behavior

- Add a task: required title, optional description.
- Toggle a task between active and completed.
- Filter the list: All / Active / Completed.
- Delete a task.
- The header "N active tasks remaining" counts **all** active tasks, whatever filter is selected.

## Data invariants (`Task` in `lib/types.ts`)

- `id`: server-generated UUID; never changes.
- `createdAt`: server-set ISO timestamp; never changes.
- `title`: non-empty, trimmed string.
- `description`: non-empty trimmed string, or absent.
- `completed`: boolean.
- `completedAt`: present **if and only if** `completed` is true; set by the server when a task is completed, removed when it is uncompleted.

## API trust boundaries

The client is untrusted. Routes under `app/api/tasks/` validate every request body before it reaches `lib/taskStore.ts`.

- `POST /api/tasks`: accepts only `title` and `description`.
- `PATCH /api/tasks/:id`: accepts only `title`, `description`, `completed`, each type-checked. Never `id`, `createdAt` or `completedAt`.
- The server owns `id`, `createdAt` and `completedAt`.
- Bad input or malformed JSON → 400. Unknown id → 404. Never 500 for client mistakes.

## Non-goals

Persistence, auth, multiple users, due dates, priorities, reordering, external services.
