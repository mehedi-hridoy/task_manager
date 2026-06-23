"use client";

/**
 * TaskList — renders the list of task cards.
 *
 * Handles three states:
 *  1. Loading — shows shimmer skeleton cards
 *  2. Empty   — shows an illustrated empty state with a CTA
 *  3. Loaded  — shows task cards with staggered animations
 */

import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/types/task";

// --- Types ---

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

// --- Sub-components ---

/**
 * SkeletonCard — a placeholder card with a shimmer animation.
 * Mirrors the real TaskCard layout so the skeleton feels accurate.
 */
function SkeletonCard({ index }: { index: number }) {
  const shimmerStyle: React.CSSProperties = {
    background:
      "linear-gradient(90deg, var(--surface-overlay) 25%, var(--surface-elevated) 50%, var(--surface-overlay) 75%)",
    backgroundSize: "200% 100%",
    animation: `shimmer 1.8s ease-in-out infinite ${index * 200}ms`,
    borderRadius: "var(--radius-sm)",
  };

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "18px 20px",
        animation: `fadeIn var(--duration-slow) var(--ease-out) ${index * 100}ms both`,
      }}
    >
      <div style={{ width: "80px", height: "22px", marginBottom: "12px", ...shimmerStyle, borderRadius: "999px" }} />
      <div style={{ width: "60%", height: "16px", marginBottom: "8px", ...shimmerStyle }} />
      <div style={{ width: "90%", height: "12px", marginBottom: "6px", ...shimmerStyle }} />
      <div style={{ width: "40%", height: "12px", marginBottom: "14px", ...shimmerStyle }} />
      <div style={{ display: "flex", gap: "6px" }}>
        {[70, 85, 55].map((w, i) => (
          <div key={i} style={{ width: `${w}px`, height: "26px", ...shimmerStyle }} />
        ))}
      </div>
    </div>
  );
}

/**
 * EmptyState — shown when there are no tasks.
 * Features a floating illustrated icon and a text prompt.
 */
function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        animation: "fadeInUp var(--duration-slow) var(--ease-out)",
      }}
    >
      {/* Illustrated icon */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "var(--radius-xl)",
          background:
            "linear-gradient(135deg, var(--surface-overlay) 0%, var(--surface-elevated) 100%)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="5" y="7" width="22" height="18" rx="3" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <path d="M10 14h12M10 18h8" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="10" r="5" fill="var(--accent-primary)" fillOpacity="0.2" stroke="var(--accent-primary)" strokeWidth="1.2" />
          <path d="M22.5 10h3M24 8.5v3" stroke="var(--accent-primary)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <h3
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "6px",
        }}
      >
        No tasks here yet
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-tertiary)",
          textAlign: "center",
          maxWidth: "280px",
          lineHeight: 1.6,
        }}
      >
        Click <strong style={{ color: "var(--text-secondary)" }}>New Task</strong> above
        to create your first task and start organizing.
      </p>
    </div>
  );
}

// --- Main Component ---

export default function TaskList({
  tasks,
  isLoading,
  onDelete,
  onStatusChange,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {tasks.map((task, index) => (
        <TaskCard
          key={task._id}
          task={task}
          index={index}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
