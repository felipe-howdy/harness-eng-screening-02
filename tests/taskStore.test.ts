import { describe, expect, it } from "vitest";
import { createTask, getAllTasks } from "../lib/taskStore";

describe("taskStore", () => {
  it("getAllTasks returns the seeded tasks", () => {
    const tasks = getAllTasks();
    expect(tasks.length).toBeGreaterThanOrEqual(8);
  });

  it("createTask assigns an id and appends the task", () => {
    const before = getAllTasks().length;
    const task = createTask({ title: "Write the launch email" });
    expect(typeof task.id).toBe("string");
    expect(task.id.length).toBeGreaterThan(0);
    expect(getAllTasks().length).toBe(before + 1);
  });
});
