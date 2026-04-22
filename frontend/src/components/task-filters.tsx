"use client";

import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  TaskPriority,
  TaskStatus,
} from "@/types/task";

type TaskFiltersProps = {
  status: TaskStatus | "";
  priority: TaskPriority | "";
  onChange: (filters: { status: TaskStatus | ""; priority: TaskPriority | "" }) => void;
};

export function TaskFilters({ status, priority, onChange }: TaskFiltersProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-800">Filtreler</h3>
        <p className="text-xs text-zinc-500">Durum ve önceliğe göre daralt.</p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <select
        className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-zinc-300 focus:shadow"
        value={status}
        onChange={(event) => onChange({ status: event.target.value as TaskStatus | "", priority })}
      >
        <option value="">Tüm durumlar</option>
        {TASK_STATUSES.map((item) => (
          <option key={item} value={item}>
            {TASK_STATUS_LABELS[item]}
          </option>
        ))}
      </select>

      <select
        className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-zinc-300 focus:shadow"
        value={priority}
        onChange={(event) => onChange({ status, priority: event.target.value as TaskPriority | "" })}
      >
        <option value="">Tüm öncelikler</option>
        {TASK_PRIORITIES.map((item) => (
          <option key={item} value={item}>
            {TASK_PRIORITY_LABELS[item]}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}
