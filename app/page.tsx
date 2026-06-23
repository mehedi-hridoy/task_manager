"use client";

import { useEffect, useState, useCallback } from "react";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService";

import { Task, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | TaskStatus
  >("all");
  const [showForm, setShowForm] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleAdd(
    title: string,
    description: string,
    status: string
  ) {
    await createTask({ title, description, status });
    loadTasks();
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t._id !== id));
    await deleteTask(id);
    loadTasks();
  }

  async function handleStatusChange(id: string, status: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, status: status as TaskStatus } : t
      )
    );
    await updateTask(id, status);
    loadTasks();
  }

  const filteredTasks =
    activeFilter === "all"
      ? tasks
      : tasks.filter((t) => t.status === activeFilter);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "To Do").length,
    inProgress: tasks.filter((t) => t.status === "In Progress")
      .length,
    done: tasks.filter((t) => t.status === "Done").length,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(232, 168, 71, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Header
        taskCount={stats.total}
        onNewTask={() => setShowForm(!showForm)}
        showForm={showForm}
      />

      <main
        style={{
          maxWidth: "780px",
          width: "100%",
          margin: "0 auto",
          padding: "0 24px 80px",
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <StatsBar
          stats={stats}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {showForm && (
          <div
            style={{
              animation: "slideDown var(--duration-normal) var(--ease-out)",
              marginBottom: "32px",
            }}
          >
            <TaskForm
              onAdd={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          color: "var(--text-tertiary)",
          fontSize: "12px",
          letterSpacing: "0.04em",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        Built with intention · Taskflow
      </footer>
    </div>
  );
}