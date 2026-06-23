/**
 * All possible statuses a task can have.
 * Used for both frontend filtering and backend validation.
 */
export type TaskStatus = "To Do" | "In Progress" | "Done";

/**
 * Shape of a task document returned from the API.
 * _id is assigned by MongoDB, the rest are user-provided fields.
 */
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}