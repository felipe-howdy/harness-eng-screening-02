"use client";

import { useEffect, useState } from "react";
import type { Filter, Task } from "@/lib/types";
import { AddTaskForm } from "./components/AddTaskForm";
import { FilterBar } from "./components/FilterBar";
import { TaskList } from "./components/TaskList";

function applyFilter(tasks: Task[], filter: Filter): Task[] {
  if (filter === "active") return tasks.filter((t) => !t.completed);
  if (filter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const res = await fetch("/api/tasks");
    const data: Task[] = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  async function handleAdd(input: { title: string; description?: string }) {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    await refresh();
  }

  async function handleToggle(task: Task) {
    const completed = !task.completed;
    const completedAt = completed
      ? new Date().toISOString()
      : task.completedAt;
    const updated: Task = { ...task, completed, completedAt };
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    await refresh();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    await refresh();
  }

  const displayedTasks = applyFilter(tasks, filter);
  const activeCount = displayedTasks.filter((t) => !t.completed).length;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
      <p className="mb-6 text-sm text-slate-600">
        {activeCount} active tasks remaining
      </p>
      <AddTaskForm onAdd={handleAdd} />
      <FilterBar value={filter} onChange={setFilter} />
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <TaskList
          tasks={displayedTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
