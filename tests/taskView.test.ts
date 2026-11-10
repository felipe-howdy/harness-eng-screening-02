import { describe, expect, it } from "vitest";
import { taskView } from "@/lib/taskView";
import type { Filter, Task } from "@/lib/types";

const task = (completed: boolean): Task => ({
  id: crypto.randomUUID(),
  title: "t",
  completed,
  createdAt: new Date().toISOString(),
});
const tasks = [task(false), task(false), task(true)];

describe("taskView", () => {
  it.each<Filter>(["all", "active", "completed"])(
    "header counts all active tasks whatever the filter (%s)",
    (filter) => {
      expect(taskView(tasks, filter).activeCount).toBe(2);
    },
  );

  it("filters the displayed list", () => {
    expect(taskView(tasks, "all").displayedTasks).toHaveLength(3);
    expect(taskView(tasks, "active").displayedTasks).toHaveLength(2);
    expect(taskView(tasks, "completed").displayedTasks).toHaveLength(1);
  });
});
