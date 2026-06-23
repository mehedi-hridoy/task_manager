"use client";

import { useEffect, useState } from "react";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService";

import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAdd(
    title: string,
    description: string,
    status: string
  ) {
    await createTask({
      title,
      description,
      status,
    });

    loadTasks();
  }

  async function handleDelete(id: string) {
    await deleteTask(id);

    loadTasks();
  }

  async function handleStatusChange(
    id: string,
    status: string
  ) {
    await updateTask(id, status);

    loadTasks();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Task Manager
      </h1>

      <TaskForm onAdd={handleAdd} />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onStatusChange={
          handleStatusChange
        }
      />
    </main>
  );
}