import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoadingTasks(true);
      setError("");

      const res = await fetch(`${API_BASE}/tasks`);
      if (!res.ok) {
        throw new Error(`Failed to load tasks (status ${res.status})`);
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const res = await fetch(`${API_BASE}/create-tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to create task (status ${res.status})`);
      }

      setTitle("");
      setDescription("");
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create task");
    } finally {
      setAdding(false);
    }
  }

  async function handleCompleteTask(id) {
    try {
      setCompletingId(id);
      setError("");

      const res = await fetch(`${API_BASE}/tasks/${id}/complete`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to complete task (status ${res.status})`);
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to complete task");
    } finally {
      setCompletingId(null);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background:
          "radial-gradient(circle at top, #ffffffff 0, #ffffffff 55%, #ffffffff 100%)",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 2rem",
        boxSizing: "border-box",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px", 
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1.8rem",
          padding: "2rem",
          boxShadow:
            "0 25px 60px -18px rgba(255, 255, 255, 0.95), 0 0 0 1px rgba(190, 184, 184, 0.25)",
          border: "1px solid rgba(149, 144, 144, 0.28)",
          backdropFilter: "blur(18px)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "1.75rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.02em",
                color: "#000e25ff",
              }}
            >
              To-Do Dashboard
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: "0.35rem",
                fontSize: "0.95rem",
                color: "#000e25ff",
              }}
            >
              Showing your <strong>5 most recent</strong> incomplete tasks.
            </p>
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              padding: "0.35rem 0.8rem",
              borderRadius: "999px",
              border: "1px solid rgba(15, 105, 179, 0.5)",
              color: "#4866d0ff",
              background:
                "radial-gradient(circle at top left, rgba(34,197,94,0.15), transparent)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            <span
              style={{
                width: "0.55rem",
                height: "0.55rem",
                borderRadius: "999px",
                backgroundColor: loadingTasks ? "#eab308" : "#22c55e",
                boxShadow: `0 0 0 4px ${
                  loadingTasks
                    ? "rgba(234,179,8,0.25)"
                    : "rgba(34,197,94,0.25)"
                }`,
              }}
            />
            
          </div>
        </header>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: "1.05rem",
              padding: "0.8rem 1rem",
              borderRadius: "0.9rem",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              color: "#fecaca",
              fontSize: "0.85rem",
              border: "1px solid rgba(248, 113, 113, 0.55)",
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Main 2-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.3fr)",
            gap: "1.75rem",
          }}
        >
          {/* LEFT: Create task */}
          <section
            style={{
              padding: "1.4rem 1.3rem",
              borderRadius: "1.4rem",
              background:
                "linear-gradient(145deg,  rgba(15,23,42,0.98), rgba(15,23,42,0.98))",
              border: "1px solid rgba(59,130,246,0.6)",
              boxShadow:
                "0 24px 45px -20px rgba(255, 255, 255, 0.98)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "0.65rem",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Add a new task
            </h2>
            <p
              style={{
                margin: 0,
                marginBottom: "1rem",
                fontSize: "0.86rem",
                color: "#cbd5f5",
              }}
            >
              Fill in the details and click <strong>Add Task</strong> to save it
              to the Task List.
            </p>

            <form
              onSubmit={handleAddTask}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.86rem", color: "#ffffffff" }}><b>
                  Title
                </b></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Finish backend APIs"
                  style={{
                    padding: "0.55rem 0.7rem",
                    borderRadius: "0.7rem",
                    border: "1px solid rgba(191, 219, 254, 0.7)",
                    backgroundColor: "rgba(224, 223, 223, 0.97)",
                    color: "#000000ff",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.86rem", color: "#ffffffff" }}><b>
                  Description
                </b></label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of what needs to be done…"
                  rows={4}
                  style={{
                    padding: "0.6rem 0.7rem",
                    borderRadius: "0.7rem",
                    border: "1px solid rgba(191, 219, 254, 0.7)",
                    backgroundColor: "rgba(224, 223, 223, 0.97)",
                    color: "#000000ff",
                    fontSize: "0.9rem",
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={adding}
                style={{
                  marginTop: "0.3rem",
                  padding: "0.7rem 0.9rem",
                  borderRadius: "999px",
                  border: "none",
                  cursor: adding ? "wait" : "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#ffffffff",
                  background:
                    "linear-gradient(135deg,  #227ec5ff,  #227ec5ff)",
                  boxShadow:
                    "0 16px 35px -16px rgba(15,23,42,0.98)",
                  opacity: adding ? 0.75 : 1,
                  transition:
                    "transform 120ms ease, box-shadow 120ms ease, opacity 80ms ease",
                }}
              >
                {adding ? "Adding…" : "Add Task"}
              </button>
            </form>
          </section>

          {/* RIGHT: Task list */}
          <section
            style={{
              padding: "1.4rem 1.3rem",
              borderRadius: "1.4rem",
              backgroundColor: "rgba(15,23,42,0.98)",
              border: "1px solid rgba(148,163,184,0.5)",
              display: "flex",
              flexDirection: "column",
              minHeight: "260px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.9rem",
                gap: "0.5rem",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Recent tasks
              </h2>
              <button
                onClick={fetchTasks}
                disabled={loadingTasks}
                style={{
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.7)",
                  backgroundColor: "transparent",
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  padding: "0.25rem 0.7rem",
                  cursor: loadingTasks ? "wait" : "pointer",
                }}
              >
                {loadingTasks ? "Refreshing…" : "Refresh"}
              </button>
            </div>

            {loadingTasks && tasks.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                }}
              >
                Loading tasks…
              </div>
            ) : tasks.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                  textAlign: "center",
                  padding: "0.9rem",
                }}
              >
                No incomplete tasks yet. Add one on the left to get started.
              </div>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    style={{
                      padding: "0.7rem 0.85rem",
                      borderRadius: "0.9rem",
                      border: "1px solid rgba(191, 219, 254, 0.7)",
                      backgroundColor: "rgba(224, 223, 223, 0.97)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.96rem",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                          wordBreak: "break-word",
                          color: "#000000ff",
                        }}
                      >
                        {task.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.86rem",
                          color: "#212121ff",
                          wordBreak: "break-word",
                        }}
                      >
                        {task.description}
                      </div>
                      {task.created_at && (
                        <div
                          style={{
                            marginTop: "0.3rem",
                            fontSize: "0.72rem",
                            color: "#6b7280",
                          }}
                        >
                          Created:{" "}
                          {new Date(task.created_at).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={completingId === task.id}
                      style={{
                        borderRadius: "999px",
                        border: "none",
                        padding: "0.45rem 0.8rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor:
                          completingId === task.id ? "wait" : "pointer",
                        background:
                          "linear-gradient(135deg, #227ec5ff, #227ec5ff)",
                        color: "#ffffffff",
                        whiteSpace: "nowrap",
                        opacity: completingId === task.id ? 0.7 : 1,
                      }}
                    >
                      {completingId === task.id ? "Completing…" : "Done"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
