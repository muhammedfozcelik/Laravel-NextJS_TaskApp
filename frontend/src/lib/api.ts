import { Task, TaskPayload, TaskPriority, TaskStatus } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

type ApiListResponse<T> = {
  data: T[];
};

type ApiItemResponse<T> = {
  data: T;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API istegi basarisiz: ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export async function getTasks(filters: {
  status?: TaskStatus;
  priority?: TaskPriority;
}): Promise<Task[]> {
  const params = new URLSearchParams();

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.priority) {
    params.set("priority", filters.priority);
  }

  const query = params.toString();
  const response = await request<ApiListResponse<Task>>(`/tasks${query ? `?${query}` : ""}`);

  return response.data;
}

export async function createTask(payload: TaskPayload): Promise<Task> {
  const response = await request<ApiItemResponse<Task>>("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateTask(id: number, payload: Partial<TaskPayload>): Promise<Task> {
  const response = await request<ApiItemResponse<Task>>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await request<void>(`/tasks/${id}`, {
    method: "DELETE",
  });
}
