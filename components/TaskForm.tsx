"use client";

/**
 * TaskForm — a card-style form for creating new tasks.
 *
 * Features:
 *  - Labeled input fields with accent-colored focus rings
 *  - Inline validation errors with icons
 *  - Button-based status selector (not a dropdown)
 *  - Submit loading state
 */

import { useState } from "react";

// --- Types ---

interface TaskFormProps {
  onAdd: (title: string, description: string, status: string) => void;
  onCancel: () => void;
}

// --- Constants ---

/** Available status options with their associated colors. */
const STATUS_OPTIONS = [
  {
    value: "To Do",
    label: "To Do",
    color: "var(--status-todo)",
    bg: "var(--status-todo-bg)",
    border: "var(--status-todo-border)",
  },
  {
    value: "In Progress",
    label: "In Progress",
    color: "var(--status-progress)",
    bg: "var(--status-progress-bg)",
    border: "var(--status-progress-border)",
  },
  {
    value: "Done",
    label: "Done",
    color: "var(--status-done)",
    bg: "var(--status-done-bg)",
    border: "var(--status-done-border)",
  },
];

// --- Shared Styles ---

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "var(--text-primary)",
  background: "var(--surface-base)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-sm)",
  outline: "none",
  transition:
    "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
  letterSpacing: "-0.01em",
};

const inputErrorStyle: React.CSSProperties = {
  borderColor: "var(--danger)",
  boxShadow: "0 0 0 3px var(--danger-bg)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: "6px",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
};

// --- Helpers ---

/** Small error icon used next to validation messages. */
function ErrorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.5v3M6 8.5v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Applies focus-ring styling to an input element. */
function applyFocusRing(el: HTMLElement) {
  el.style.borderColor = "var(--accent-primary)";
  el.style.boxShadow = "0 0 0 3px var(--accent-primary-muted)";
}

/** Removes focus-ring styling from an input element. */
function removeFocusRing(el: HTMLElement) {
  el.style.borderColor = "var(--border-default)";
  el.style.boxShadow = "none";
}

// --- Component ---

export default function TaskForm({ onAdd, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Validates fields and submits if valid. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { title: "", description: "" };

    if (!title.trim()) newErrors.title = "Give your task a name";
    if (!description.trim()) newErrors.description = "Add a brief description";

    setErrors(newErrors);

    if (newErrors.title || newErrors.description) return;

    setIsSubmitting(true);
    await onAdd(title, description, status);
    setIsSubmitting(false);

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setErrors({ title: "", description: "" });
  };

  return (
    <form
      id="task-form"
      onSubmit={handleSubmit}
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Form Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "12px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Create a new task
        </h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            border: "none",
            background: "var(--surface-overlay)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-tertiary)",
            cursor: "pointer",
            transition: "all var(--duration-fast) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.background = "var(--surface-elevated)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-tertiary)";
            e.currentTarget.style.background = "var(--surface-overlay)";
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Title Field */}
      <div>
        <label htmlFor="task-title" style={labelStyle}>Title</label>
        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((p) => ({ ...p, title: "" }));
          }}
          style={{ ...inputBaseStyle, ...(errors.title ? inputErrorStyle : {}) }}
          onFocus={(e) => { if (!errors.title) applyFocusRing(e.currentTarget); }}
          onBlur={(e) => { if (!errors.title) removeFocusRing(e.currentTarget); }}
        />
        {errors.title && (
          <p style={{ fontSize: "12px", color: "var(--danger)", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
            <ErrorIcon /> {errors.title}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="task-description" style={labelStyle}>Description</label>
        <textarea
          id="task-description"
          placeholder="Describe the task briefly..."
          value={description}
          rows={3}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((p) => ({ ...p, description: "" }));
          }}
          style={{
            ...inputBaseStyle,
            resize: "vertical",
            minHeight: "80px",
            lineHeight: 1.5,
            ...(errors.description ? inputErrorStyle : {}),
          }}
          onFocus={(e) => { if (!errors.description) applyFocusRing(e.currentTarget); }}
          onBlur={(e) => { if (!errors.description) removeFocusRing(e.currentTarget); }}
        />
        {errors.description && (
          <p style={{ fontSize: "12px", color: "var(--danger)", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
            <ErrorIcon /> {errors.description}
          </p>
        )}
      </div>

      {/* Status Selector — button group instead of a dropdown */}
      <div>
        <label style={labelStyle}>Status</label>
        <div style={{ display: "flex", gap: "8px" }}>
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = status === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontWeight: isSelected ? 600 : 400,
                  fontFamily: "inherit",
                  color: isSelected ? opt.color : "var(--text-tertiary)",
                  background: isSelected ? opt.bg : "var(--surface-base)",
                  border: `1px solid ${isSelected ? opt.border : "var(--border-default)"}`,
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  transition: "all var(--duration-fast) var(--ease-out)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isSelected ? opt.color : "var(--text-tertiary)",
                    opacity: isSelected ? 1 : 0.4,
                    transition: "all var(--duration-fast) var(--ease-out)",
                  }}
                />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "9px 18px",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "inherit",
            color: "var(--text-secondary)",
            background: "transparent",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            transition: "all var(--duration-fast) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--surface-overlay)";
            e.currentTarget.style.borderColor = "var(--border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border-default)";
          }}
        >
          Cancel
        </button>
        <button
          id="submit-task"
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "9px 22px",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "inherit",
            color: "var(--text-inverse)",
            background:
              "linear-gradient(135deg, var(--accent-primary) 0%, #d4922e 100%)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: isSubmitting ? "wait" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            transition: "all var(--duration-fast) var(--ease-out)",
            boxShadow:
              "0 2px 8px rgba(232, 168, 71, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(232, 168, 71, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(232, 168, 71, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
}