"use client";

/**
 * TaskCard — displays a single task as a card.
 *
 * Features:
 *  - Color-coded status badge with unique icon per status
 *  - Hover-reveal delete button with inline confirmation
 *  - Inline status switcher buttons (no dropdown)
 *  - Done state: strikethrough title + dimmed text
 *  - Staggered fade-in animation based on list position
 */

import { useState } from "react";
import { Task, TaskStatus } from "@/types/task";

// --- Types ---

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  /** Position in the list, used to stagger the entry animation. */
  index: number;
}

// --- Constants ---

/** The three possible task statuses. */
const STATUS_OPTIONS = ["To Do", "In Progress", "Done"] as const satisfies readonly TaskStatus[];

// --- Helpers ---

/**
 * Returns color, background, border, and icon for a given status.
 * Each status gets a unique icon:
 *  - To Do:       dashed circle
 *  - In Progress: clock
 *  - Done:        checkmark
 */
function getStatusConfig(status: TaskStatus) {
  switch (status) {
    case "To Do":
      return {
        color: "var(--status-todo)",
        bg: "var(--status-todo-bg)",
        border: "var(--status-todo-border)",
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          </svg>
        ),
      };
    case "In Progress":
      return {
        color: "var(--status-progress)",
        bg: "var(--status-progress-bg)",
        border: "var(--status-progress-border)",
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 3v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };
    case "Done":
      return {
        color: "var(--status-done)",
        bg: "var(--status-done-bg)",
        border: "var(--status-done-border)",
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 6l1.5 1.5L8 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };
    default:
      return {
        color: "var(--text-tertiary)",
        bg: "transparent",
        border: "var(--border-default)",
        icon: null,
      };
  }
}

// --- Component ---

export default function TaskCard({
  task,
  onDelete,
  onStatusChange,
  index,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const config = getStatusConfig(task.status);
  const isDone = task.status === "Done";

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task._id);
  };

  return (
    <div
      id={`task-${task._id}`}
      style={{
        background: isHovered ? "var(--surface-overlay)" : "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "18px 20px",
        transition: "all var(--duration-normal) var(--ease-out)",
        animation: `fadeInUp var(--duration-slow) var(--ease-out) ${index * 60}ms both`,
        opacity: isDeleting ? 0.4 : 1,
        transform: isDeleting ? "scale(0.98)" : "none",
        position: "relative",
        cursor: "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDeleteConfirm(false);
      }}
    >
      {/* Row 1: Status badge + action buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {/* Status Badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 10px 3px 7px",
            fontSize: "11px",
            fontWeight: 600,
            color: config.color,
            background: config.bg,
            border: `1px solid ${config.border}`,
            borderRadius: "999px",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {config.icon}
          {task.status}
        </span>

        {/* Delete button — only visible on hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(4px)",
            transition: "all var(--duration-fast) var(--ease-out)",
          }}
        >
          {showDeleteConfirm ? (
            /* Inline confirmation: "Delete? [Yes] [No]" */
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                animation: "fadeIn var(--duration-fast) var(--ease-out)",
              }}
            >
              <span style={{ fontSize: "11px", color: "var(--danger)", fontWeight: 500 }}>
                Delete?
              </span>
              <button
                onClick={handleDelete}
                style={{
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  color: "#fff",
                  background: "var(--danger)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  color: "var(--text-secondary)",
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          ) : (
            /* Trash icon button */
            <button
              onClick={() => setShowDeleteConfirm(true)}
              aria-label="Delete task"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                border: "1px solid transparent",
                background: "transparent",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-tertiary)",
                cursor: "pointer",
                transition: "all var(--duration-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--danger)";
                e.currentTarget.style.background = "var(--danger-bg)";
                e.currentTarget.style.borderColor = "var(--danger-border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-tertiary)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M6 6.5v3M8 6.5v3M4.5 4l.5 7a1 1 0 001 1h2a1 1 0 001-1l.5-7"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Title */}
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: isDone ? "var(--text-tertiary)" : "var(--text-primary)",
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
          textDecoration: isDone ? "line-through" : "none",
          marginBottom: "6px",
          transition: "color var(--duration-fast) var(--ease-out)",
        }}
      >
        {task.title}
      </h3>

      {/* Row 3: Description */}
      <p
        style={{
          fontSize: "13px",
          color: isDone ? "var(--text-tertiary)" : "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "14px",
          opacity: isDone ? 0.6 : 1,
          transition: "all var(--duration-fast) var(--ease-out)",
        }}
      >
        {task.description}
      </p>

      {/* Row 4: Status switcher buttons */}
      <div style={{ display: "flex", gap: "6px" }}>
        {STATUS_OPTIONS.map((opt) => {
          const isActive = task.status === opt;
          const optConfig = getStatusConfig(opt);

          return (
            <button
              key={opt}
              onClick={() => {
                if (!isActive) onStatusChange(task._id, opt);
              }}
              style={{
                padding: "4px 10px",
                fontSize: "11px",
                fontWeight: isActive ? 600 : 400,
                fontFamily: "inherit",
                color: isActive ? optConfig.color : "var(--text-tertiary)",
                background: isActive ? optConfig.bg : "transparent",
                border: `1px solid ${isActive ? optConfig.border : "var(--border-subtle)"}`,
                borderRadius: "var(--radius-sm)",
                cursor: isActive ? "default" : "pointer",
                transition: "all var(--duration-fast) var(--ease-out)",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-tertiary)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
