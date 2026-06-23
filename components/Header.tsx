"use client";

interface HeaderProps {
  taskCount: number;
  onNewTask: () => void;
  showForm: boolean;
}

export default function Header({
  taskCount,
  onNewTask,
  showForm,
}: HeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        background: "rgba(12, 13, 18, 0.8)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Logo Mark */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, #d4922e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(232, 168, 71, 0.3)",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4h12M2 8h8M2 12h10"
                stroke="#0c0d12"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <h1
              style={{
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                lineHeight: 1.2,
              }}
            >
              Taskflow
            </h1>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-tertiary)",
                letterSpacing: "0.01em",
                lineHeight: 1.3,
              }}
            >
              {taskCount === 0
                ? "No tasks yet"
                : `${taskCount} task${taskCount !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {/* New Task Button */}
        <button
          id="new-task-button"
          onClick={onNewTask}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: showForm ? "var(--text-secondary)" : "var(--text-inverse)",
            background: showForm
              ? "var(--surface-overlay)"
              : "linear-gradient(135deg, var(--accent-primary) 0%, #d4922e 100%)",
            border: showForm
              ? "1px solid var(--border-default)"
              : "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            transition: "all var(--duration-fast) var(--ease-out)",
            boxShadow: showForm
              ? "none"
              : "0 2px 8px rgba(232, 168, 71, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          }}
          onMouseEnter={(e) => {
            if (!showForm) {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(232, 168, 71, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!showForm) {
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(232, 168, 71, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          {showForm ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2v10M2 7h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              New Task
            </>
          )}
        </button>
      </div>
    </header>
  );
}
