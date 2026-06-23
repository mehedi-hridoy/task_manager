import { Task } from "@/types/task";

const API_BASE = "/api/tasks";

/**
 * Fetches all tasks from the API, sorted by newest first.
 */
export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE);
  return res.json();
}

/**
 * Creates a new task with the given title, description, and status.
 */
export async function createTask(
  task: Omit<Task, "_id">
): Promise<Task> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  return res.json();
}

/**
 * Updates a task's status by ID.
 * Only the status field is sent — the API merges it with existing data.
 */
export async function updateTask(
  id: string,
  status: string
): Promise<Task> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  return res.json();
}

/**
 * Deletes a task by ID. Returns a confirmation message.
 */
export async function deleteTask(
  id: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}