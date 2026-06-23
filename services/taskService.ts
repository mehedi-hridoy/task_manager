import { Task } from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");

  return res.json();
}

export async function createTask(
  task: Omit<Task, "_id">
) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return res.json();
}

export async function updateTask(
  id: string,
  status: string
) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  return res.json();
}