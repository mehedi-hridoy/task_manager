import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: string
  ) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onStatusChange,
}: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-center">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}