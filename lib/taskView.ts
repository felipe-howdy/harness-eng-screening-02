import type { Filter, Task } from "./types";

export function applyFilter(tasks: Task[], filter: Filter): Task[] {
  if (filter === "active") return tasks.filter((t) => !t.completed);
  if (filter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

// What the page renders: the filtered list, and the count of ALL active tasks.
export function taskView(tasks: Task[], filter: Filter) {
  const displayedTasks = applyFilter(tasks, filter);
  const activeCount = tasks.filter((t) => !t.completed).length;
  return { displayedTasks, activeCount };
}
