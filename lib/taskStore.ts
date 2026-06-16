import type { Task } from "./types";

type SeedOptions = {
  description?: string;
  completed?: boolean;
  daysAgo?: number;
  completedDaysAgo?: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function buildSeedTask(title: string, options: SeedOptions = {}): Task {
  const now = Date.now();
  const createdAt = new Date(now - (options.daysAgo ?? 0) * DAY_MS).toISOString();
  const completed = options.completed ?? false;
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    description: options.description,
    completed,
    createdAt,
  };
  if (completed) {
    task.completedAt = new Date(
      now - (options.completedDaysAgo ?? 0) * DAY_MS,
    ).toISOString();
  }
  return task;
}

const tasks: Task[] = [
  buildSeedTask("Buy groceries", {
    description: "Milk, bread, eggs",
    daysAgo: 1,
  }),
  buildSeedTask("Reply to Sam about Q3 review", { daysAgo: 2 }),
  buildSeedTask("Draft project kickoff doc", {
    description: "Outline goals, scope, timeline",
    daysAgo: 3,
  }),
  buildSeedTask("Renew gym membership"),
  buildSeedTask("Fix the leaky faucet", {
    description: "Picked up the washer kit last week",
    daysAgo: 5,
  }),
  buildSeedTask("Submit Q2 expense report", {
    completed: true,
    daysAgo: 14,
    completedDaysAgo: 10,
  }),
  buildSeedTask("Schedule dentist appointment", {
    completed: true,
    daysAgo: 7,
    completedDaysAgo: 4,
  }),
  buildSeedTask("Read the team RFC", {
    description: "Architecture proposal v2",
    completed: true,
    daysAgo: 6,
    completedDaysAgo: 5,
  }),
];

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTask(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(input: {
  title: string;
  description?: string;
}): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, patch: Partial<Task>): Task | undefined {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  tasks[idx] = { ...tasks[idx], ...patch };
  return tasks[idx];
}

export function deleteTask(id: string): boolean {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
