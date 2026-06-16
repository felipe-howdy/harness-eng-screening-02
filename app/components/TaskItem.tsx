"use client";

import type { Task } from "@/lib/types";

type Props = {
  task: Task;
  onToggle: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-start gap-3 rounded border border-slate-200 bg-white p-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        className="mt-1"
      />
      <div className="flex-1">
        <div
          className={
            task.completed ? "text-slate-400 line-through" : "text-slate-900"
          }
        >
          {task.title}
        </div>
        {task.description ? (
          <div className="mt-0.5 text-sm text-slate-500">{task.description}</div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </li>
  );
}
