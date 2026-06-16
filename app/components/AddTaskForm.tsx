"use client";

import { FormEvent, useState } from "react";

type Props = {
  onAdd: (input: { title: string; description?: string }) => Promise<void>;
};

export function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle("");
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-2 rounded border border-slate-200 bg-white p-3"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded border border-slate-300 px-2 py-1"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="rounded border border-slate-300 px-2 py-1"
      />
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="self-start rounded bg-slate-900 px-3 py-1 text-sm text-white disabled:opacity-50"
      >
        Add task
      </button>
    </form>
  );
}
