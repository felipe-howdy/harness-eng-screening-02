import { describe, expect, it } from "vitest";
import { createTask, updateTask } from "@/lib/taskStore";

describe("completedAt follows completed", () => {
  it("is set by the server when a task is completed", () => {
    const task = createTask({ title: "complete me" });
    const done = updateTask(task.id, { completed: true });
    expect(done?.completedAt).toEqual(expect.any(String));
  });

  it("is removed when a completed task is unchecked, even if the client sends the old value", () => {
    const task = createTask({ title: "uncheck me" });
    // The page used to PATCH the whole task, completedAt included.
    const done = updateTask(task.id, {
      ...task,
      completed: true,
      completedAt: new Date().toISOString(),
    })!;
    const undone = updateTask(task.id, { ...done, completed: false });
    expect(undone?.completed).toBe(false);
    expect(undone).not.toHaveProperty("completedAt");
  });
});
