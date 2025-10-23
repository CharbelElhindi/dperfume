import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaSignOutAlt,
  FaEnvelope,
  FaPlusCircle,
} from "react-icons/fa";

export default function Admin() {
  const ADMIN_PASSWORD = "dperfume2025";

  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [perfumes, setPerfumes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState("perfumes"); // perfumes | messages
  const API_URL = "https://perfume-server.onrender.com";


  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    size: "",
    description: "",
    image: "",
    gender: "unisex", // ensure gender exists in the form state
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      Promise.all([fetchPerfumes(), fetchMessages()]).finally(() =>
        setLoading(false)
      );
    }
  }, [loggedIn]);

  // ✅ Fetch perfumes
  const fetchPerfumes = async () => {
    try {
      const res = await fetch('${API_URL}/api/perfumes');
      const data = await res.json();
      setPerfumes(data);
    } catch (err) {
      console.error("Failed to fetch perfumes:", err);
      setPerfumes([]);
    }
  };

  // ✅ Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await fetch('${API_URL}/api/contact');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setMessages([]);
    }
  };

  // ✅ Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setPassword("");
    } else alert("❌ Incorrect password");
  };

  const handleLogout = () => setLoggedIn(false);

  // ✅ Image upload (base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Add / Update perfume
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `h${API_URL}/api/perfumes/${editingId}`
      : '${API_URL}/api/perfumes';

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // reset form including gender
      setForm({
        name: "",
        brand: "",
        price: "",
        size: "",
        description: "",
        image: "",
        gender: "unisex",
      });
      setEditingId(null);
      await fetchPerfumes();
    } catch (err) {
      console.error("Error saving perfume:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Delete perfume
  const handleDeletePerfume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this perfume?")) return;
    try {
      await fetch(`${API_URL}/api/perfumes/${id}`, { method: "DELETE" });
      fetchPerfumes();
    } catch (err) {
      console.error("Failed to delete perfume:", err);
    }
  };

  // ✅ Edit perfume
  const handleEdit = (p) => {
    // ensure gender is present (fallback to 'unisex' if missing)
    setForm({
      name: p.name || "",
      brand: p.brand || "",
      price: p.price || "",
      size: p.size || "",
      description: p.description || "",
      image: p.image || "",
      gender: p.gender || "unisex",
    });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await fetch(`${API_URL}/api/contact/${id}`, { method: "DELETE" });
      fetchMessages();
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // ✅ Loading Spinner
  const LoadingSpinner = () => (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <div
        style={{
          border: "4px solid #eee",
          borderTop: "4px solid var(--gold)",
          borderRadius: "50%",
          width: 50,
          height: 50,
          margin: "auto",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ marginTop: 20, color: "#777" }}>Loading...</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  // ======================
  // 🔐 LOGIN SCREEN
  // ======================
  if (!loggedIn) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "120px auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          padding: 32,
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 20, color: "var(--gold)" }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 12,
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "var(--gold)",
              color: "#000",
              border: "none",
              padding: 12,
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  // ======================
  // 🧭 ADMIN DASHBOARD
  // ======================
  return (
    <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h2 style={{ color: "var(--gold)" }}>Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#222",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setTab("perfumes")}
          style={{
            background: tab === "perfumes" ? "var(--gold)" : "#eee",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Perfumes
        </button>
        <button
          onClick={() => setTab("messages")}
          style={{
            background: tab === "messages" ? "var(--gold)" : "#eee",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Messages
        </button>
      </div>

      {/* ====================== */}
      {/* PERFUMES SECTION */}
      {/* ====================== */}
      {tab === "perfumes" && (
        <>
          {/* Form */}
          <section
            style={{
              background: "#fff",
              padding: 25,
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              marginBottom: 40,
            }}
          >
            <h3 style={{ color: "#222", marginBottom: 20 }}>
              {editingId ? "Edit Perfume" : "Add New Perfume"}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
              <input
                placeholder="Perfume Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                placeholder="Brand / Category"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                placeholder="Size (e.g. 100ml)"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
              />

              {/* Gender select */}
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                style={{ padding: 10, borderRadius: 8 }}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <label
                  style={{
                    background: "var(--gold)",
                    padding: "10px 16px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </label>
                <input
                  placeholder="Or paste image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  style={{ flex: 1 }}
                />
              </div>

              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                />
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? "#bba55c" : "var(--gold)",
                  border: "none",
                  padding: 12,
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                {submitting
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                  ? "Update Perfume"
                  : "Add Perfume"}
              </button>
            </form>
          </section>

          {/* Perfume list */}
          <section>
            <h3 style={{ marginBottom: 12, color: "#222" }}>Perfume Collection</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
              }}
            >
              {perfumes.map((p) => (
                <div
                  key={p._id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <img
                    src={p.image || "https://via.placeholder.com/150"}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 10,
                      marginBottom: 8,
                    }}
                  />
                  <h4>{p.name}</h4>
                  <p style={{ color: "#777" }}>{p.brand}</p>
                  <p style={{ color: "#999" }}>Gender: {p.gender || "unisex"}</p>
                  <p style={{ fontWeight: 600, color: "var(--gold)" }}>
                    ${p.price}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    <button
                      onClick={() => handleEdit(p)}
                      style={{
                        background: "#1b1b2f",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeletePerfume(p._id)}
                      style={{
                        background: "#ff4d4f",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ====================== */}
      {/* MESSAGES SECTION */}
      {/* ====================== */}
      {tab === "messages" && (
        <section>
          <h3 style={{ color: "#222", marginBottom: 10 }}>
            Customer Messages <FaEnvelope style={{ marginLeft: 6 }} />
          </h3>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            }}
          >
            {messages.length === 0 ? (
              <p style={{ color: "#777" }}>No messages yet.</p>
            ) : (
              messages.map((m) => (
                <div
                  key={m._id}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "10px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{m.name}</strong> — <em>{m.email}</em>
                    <p style={{ marginTop: 6 }}>{m.message}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(m._id)}
                    style={{
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}
