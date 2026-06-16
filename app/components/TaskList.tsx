"use client";

import type { Task } from "@/lib/types";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggle: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="text-sm text-slate-500">No tasks.</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
