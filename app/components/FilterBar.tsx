"use client";

import type { Filter } from "@/lib/types";

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

type Props = {
  value: Filter;
  onChange: (filter: Filter) => void;
};

export function FilterBar({ value, onChange }: Props) {
  return (
    <div className="mb-4 flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded border px-3 py-1 text-sm ${
            value === opt.value
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
