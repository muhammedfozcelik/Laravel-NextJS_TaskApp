"use client";

import { FormEvent, useState } from "react";
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  Task,
  TaskPayload,
} from "@/types/task";

type TaskFormProps = {
  onSubmit: (payload: TaskPayload) => Promise<void>;
  initialTask?: Task | null;
  onCancelEdit?: () => void;
};

const EMPTY_FORM: TaskPayload = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
};

function mapTaskToForm(task: Task | null | undefined): TaskPayload {
  if (!task) {
    return EMPTY_FORM;
  }

  return {
    title: task.title,
    description: task.description ?? "",
    status: task.status,
    priority: task.priority,
  };
}

export function TaskForm({ onSubmit, initialTask, onCancelEdit }: TaskFormProps) {
  const [form, setForm] = useState<TaskPayload>(() => mapTaskToForm(initialTask));
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await onSubmit(form);
      if (!initialTask) {
        setForm(EMPTY_FORM);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            {initialTask ? "Görevi Düzenle" : "Yeni Görev Ekle"}
          </h2>
          <p className="mt-1 text-sm text-zinc-600">Başlık zorunlu, açıklama opsiyonel.</p>
        </div>
        {initialTask && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            Düzenleme
          </span>
        )}
      </div>

      <input
        className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:shadow"
        placeholder="Başlık"
        value={form.title}
        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        required
        maxLength={255}
      />

      <textarea
        className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:shadow"
        placeholder="Açıklama"
        value={form.description}
        onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        rows={3}
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <select
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-zinc-300 focus:shadow"
          value={form.status}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, status: event.target.value as TaskPayload["status"] }))
          }
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {TASK_STATUS_LABELS[status]}
            </option>
          ))}
        </select>

        <select
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none focus:border-zinc-300 focus:shadow"
          value={form.priority}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, priority: event.target.value as TaskPayload["priority"] }))
          }
        >
          {TASK_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {TASK_PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : initialTask ? "Güncelle" : "Ekle"}
        </button>
        {initialTask && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}
