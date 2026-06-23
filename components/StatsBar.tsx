"use client";

import { TaskStatus } from "@/types/task";

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

const filters: { key: "all" | TaskStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "To Do", label: "To Do" },
  { key: "In Progress", label: "In Progress" },
  { key: "Done", label: "Done" },
];

function getFilterCount(
  key: "all" | TaskStatus,
  stats: Stats
): number {
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
      {filters.map((f) => {
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
              color: isActive
                ? getFilterColor(f.key)
                : "var(--text-tertiary)",
              background: isActive
                ? getActiveBg(f.key)
                : "transparent",
              border: isActive
                ? `1px solid ${
                    f.key === "all"
                      ? "var(--border-default)"
                      : f.key === "To Do"
                      ? "var(--status-todo-border)"
                      : f.key === "In Progress"
                      ? "var(--status-progress-border)"
                      : "var(--status-done-border)"
                  }`
                : "1px solid transparent",
              borderRadius: "999px",
              cursor: "pointer",
              transition:
                "all var(--duration-fast) var(--ease-out)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color =
                  "var(--text-secondary)";
                e.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color =
                  "var(--text-tertiary)";
                e.currentTarget.style.background =
                  "transparent";
              }
            }}
          >
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
