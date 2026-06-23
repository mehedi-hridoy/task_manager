"use client";

import { useState } from "react";

interface Props {
  onAdd: (
    title: string,
    description: string,
    status: string
  ) => void;
}

export default function TaskForm({
  onAdd,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState("To Do");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const newErrors = {
      title: "",
      description: "",
    };

    if (!title.trim()) {
      newErrors.title =
        "Title is required";
    }

    if (!description.trim()) {
      newErrors.description =
        "Description is required";
    }

    setErrors(newErrors);

    if (
      newErrors.title ||
      newErrors.description
    ) {
      return;
    }

    onAdd(title, description, status);

    setTitle("");
    setDescription("");
    setStatus("To Do");

    setErrors({
      title: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded"
    >
      <div>
        <input
          className={`w-full border p-2 rounded ${
            errors.title
              ? "border-red-500"
              : ""
          }`}
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <textarea
          className={`w-full border p-2 rounded ${
            errors.description
              ? "border-red-500"
              : ""
          }`}
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description}
          </p>
        )}
      </div>

      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}