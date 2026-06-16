## Candidate-facing summary

This is a 30-minute AI-assisted engineering screen. Candidates may use an AI coding agent such as Codex, Claude Code, Cursor, Copilot, ChatGPT, or a similar tool.

The goal is to improve this small task-manager app using an AI-assisted engineering workflow. The exercise evaluates both code changes and the minimal agent harness created around the repo.

## The task

This task manager app has at least two bugs. Your job is to use an AI-assisted engineering workflow to:

1. Create a minimal repo-local agent harness.
2. Find the bugs.
3. Fix the bugs.
4. Summarize what changed and how you used AI.

The harness is part of the task, not optional. It should help your AI coding agent understand the repo, follow constraints, run checks, and avoid unrelated changes.

## What to know

- The app uses an in-memory store, so data resets when the server restarts.
- The two existing tests in `tests/` all pass — they cover unrelated functionality.
- You can run the app with `npm run dev` and tests with `npm test`.

### Minimal agent harness

A minimal harness is the repo-local structure that helps an AI coding agent work correctly. For this exercise, it includes:

- Micro-Constitution: `specs/mission.md`, `specs/tech-stack.md`, and `specs/roadmap.md`
- Agent guide: `AGENTS.md`
- Mechanical feedback: regression tests and verification commands
- Review loop: final summary of bugs, fixes and AI usage

### Candidate deliverables

Candidates should create short working artifacts, not long documents:

- `specs/mission.md` — app purpose, user, core behavior, data/model invariants, API trust boundaries, and non-goals.
- `specs/tech-stack.md` — framework/language, important folders, commands, and technical constraints such as no database, no auth, and no external services.
- `specs/roadmap.md` — plan for the remaining time: inspect, reproduce/identify issues, make small fixes, add test, run checks, summarize.
- `AGENTS.md` — short guide for an AI coding agent, including repo map, pointers to the `specs/` files, working loop, mechanical checks, and constraints.

Candidates should also inspect the repo, find bugs and fix them.

At the end, candidates should be ready to explain:

- What bugs they found.
- What files they changed.
- How their harness helped the AI agent work better.
- How they used AI and what they verified themselves.
- What they would improve with more time.
