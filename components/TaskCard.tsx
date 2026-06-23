import { Task } from "@/types/task";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: string
  ) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <div className="border rounded p-4 space-y-3">
      <h2 className="font-semibold text-lg">
        {task.title}
      </h2>

      <p>{task.description}</p>

      <select
        value={task.status}
        onChange={(e) =>
          onStatusChange(
            task._id,
            e.target.value
          )
        }
        className="border p-2"
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <div>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}