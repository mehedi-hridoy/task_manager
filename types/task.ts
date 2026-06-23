export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Done";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}