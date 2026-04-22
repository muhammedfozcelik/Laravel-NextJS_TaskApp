"use client";

import { useCallback, useEffect, useState } from "react";
import { TaskFilters } from "@/components/task-filters";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { createTask, deleteTask, getTasks, updateTask } from "@/lib/api";
import { Task, TaskPayload, TaskPriority, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setError(null);
      const data = await getTasks({
        status: status || undefined,
        priority: priority || undefined,
      });
      setTasks(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Beklenmeyen bir hata oluştu.");
    }
  }, [priority, status]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTasks();
  }, [loadTasks]);

  async function handleCreate(payload: TaskPayload) {
    await createTask(payload);
    await loadTasks();
  }

  async function handleUpdate(payload: TaskPayload) {
    if (!editingTask) {
      return;
    }

    await updateTask(editingTask.id, payload);
    setEditingTask(null);
    await loadTasks();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
    await loadTasks();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <header className="border-b border-zinc-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Görev Yönetimi</h1>
          </div>
          <div className="text-sm text-zinc-600">
            Toplam: <span className="font-medium text-zinc-900">{tasks.length}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8">
        <TaskForm
          key={editingTask?.id ?? "new"}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          initialTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskFilters
          status={status}
          priority={priority}
          onChange={(filters) => {
            setStatus(filters.status);
            setPriority(filters.priority);
          }}
        />

        <div className="flex justify-end">
          <button
            className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setStatus("");
              setPriority("");
            }}
            disabled={!status && !priority}
          >
            Filtreleri temizle
          </button>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-700">Görevler</h2>
          </div>
          <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
