"use client";

/**
 * StatsBar — a row of filter pills that doubles as a status breakdown.
 * Each pill shows the count for its status and highlights when active.
 * Clicking a pill filters the task list to that status.
 */

import { TaskStatus } from "@/types/task";

// --- Types ---

interface Stats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

interface StatsBarProps {
  stats: Stats;
  activeFilter: "all" | TaskStatus;
  onFilterChange: (filter: "all" | TaskStatus) => void;
}

// --- Constants ---

/** Filter options displayed in the bar. */
const FILTERS: { key: "all" | TaskStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "To Do", label: "To Do" },
  { key: "In Progress", label: "In Progress" },
  { key: "Done", label: "Done" },
];

// --- Helpers ---

/** Returns the task count for a given filter key. */
function getFilterCount(key: "all" | TaskStatus, stats: Stats): number {
  switch (key) {
    case "all":
      return stats.total;
    case "To Do":
      return stats.todo;
    case "In Progress":
      return stats.inProgress;
    case "Done":
      return stats.done;
  }
}

/** Returns the accent color associated with each status. */
function getFilterColor(key: "all" | TaskStatus): string {
  switch (key) {
    case "all":
      return "var(--text-primary)";
    case "To Do":
      return "var(--status-todo)";
    case "In Progress":
      return "var(--status-progress)";
    case "Done":
      return "var(--status-done)";
  }
}

/** Returns the background color for the active filter pill. */
function getActiveBg(key: "all" | TaskStatus): string {
  switch (key) {
    case "all":
      return "rgba(255, 255, 255, 0.06)";
    case "To Do":
      return "var(--status-todo-bg)";
    case "In Progress":
      return "var(--status-progress-bg)";
    case "Done":
      return "var(--status-done-bg)";
  }
}

/** Returns the border color for the active filter pill. */
function getActiveBorder(key: "all" | TaskStatus): string {
  switch (key) {
    case "all":
      return "var(--border-default)";
    case "To Do":
      return "var(--status-todo-border)";
    case "In Progress":
      return "var(--status-progress-border)";
    case "Done":
      return "var(--status-done-border)";
  }
}

// --- Component ---

export default function StatsBar({
  stats,
  activeFilter,
  onFilterChange,
}: StatsBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "32px 0 24px",
        flexWrap: "wrap",
      }}
    >
      {FILTERS.map((f) => {
        const isActive = activeFilter === f.key;
        const count = getFilterCount(f.key, stats);

        return (
          <button
            key={f.key}
            id={`filter-${f.key.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => onFilterChange(f.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              fontSize: "13px",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? getFilterColor(f.key) : "var(--text-tertiary)",
              background: isActive ? getActiveBg(f.key) : "transparent",
              border: isActive
                ? `1px solid ${getActiveBorder(f.key)}`
                : "1px solid transparent",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "all var(--duration-fast) var(--ease-out)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--text-tertiary)";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {/* Colored dot indicator for status filters */}
            {f.key !== "all" && (
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: getFilterColor(f.key),
                  opacity: isActive ? 1 : 0.5,
                  flexShrink: 0,
                }}
              />
            )}
            {f.label}
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: isActive
                  ? getFilterColor(f.key)
                  : "var(--text-tertiary)",
                opacity: isActive ? 0.8 : 0.6,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
