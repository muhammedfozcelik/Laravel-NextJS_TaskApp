"use client";

import { Task, TASK_PRIORITY_LABELS, TASK_STATUS_LABELS } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => Promise<void>;
};

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
          <span className="text-lg">✓</span>
        </div>
        <p className="mt-3 text-sm font-medium text-zinc-800">Kriterlere uygun görev bulunamadı.</p>
        <p className="mt-1 text-sm text-zinc-500">Filtreleri temizleyip tekrar deneyebilirsin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold leading-6 tracking-tight">{task.title}</h3>
              <p className="mt-1 line-clamp-3 text-sm leading-6 text-zinc-600">
                {task.description || "Açıklama yok."}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
              >
                Düzenle
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-50"
              >
                Sil
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
              Durum: {TASK_STATUS_LABELS[task.status]}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
              Öncelik: {TASK_PRIORITY_LABELS[task.priority]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
