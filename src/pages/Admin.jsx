import React, { useEffect, useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [perfumes, setPerfumes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    size: "",
  });
  const adminPassword = "";

  useEffect(() => {
    setPerfumes(JSON.parse(localStorage.getItem("perfumes") || "[]"));
  }, []);

  function login(e) {
    e.preventDefault();
    if (password === adminPassword) setAuthorized(true);
    else alert("Wrong password");
  }

  function savePerfume(e) {
    e.preventDefault();
    const obj = { ...form, id: Date.now() };
    const updated = [obj, ...perfumes];
    setPerfumes(updated);
    localStorage.setItem("perfumes", JSON.stringify(updated));
    setForm({ name: "", price: "", description: "", image: "", category: "", size: "" });
  }

  function deletePerfume(id) {
    if (!confirm("Delete this perfume?")) return;
    const updated = perfumes.filter((p) => p.id !== id);
    setPerfumes(updated);
    localStorage.setItem("perfumes", JSON.stringify(updated));
  }

  function handleImageUpload(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(f);
  }

  if (!authorized) {
    return (
      <div className="container admin-login" style={{ maxWidth: 480, margin: "auto", marginTop: 50, padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Admin Login</h2>
        <form onSubmit={login} style={{ display: "grid", gap: 12 }}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }}
          />
          <button type="submit" style={{ padding: 12, borderRadius: 8, background: "#d4af37", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>
            Login
          </button>
        </form>
        <div style={{ marginTop: 12, color: "var(--muted)", textAlign: "center", fontSize: 13 }}>
           <strong>{adminPassword}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="container admin-page" style={{ padding: "20px 40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Admin Dashboard — Manage Perfumes</h2>

      <form onSubmit={savePerfume} style={{ display: "grid", gap: 12, marginBottom: 40, padding: 20, background: "#fff", borderRadius: 12, boxShadow: "0 8px 25px rgba(0,0,0,0.05)" }}>
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }}/>
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }} />
        <input placeholder="Size (e.g. 100ml)" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }}/>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }}/>
       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  <label
    htmlFor="imageUpload"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      cursor: "pointer",
      padding: "10px 20px",
      borderRadius: 8,
      background: "#d4af37",
      color: "#fff",
      fontWeight: 600,
      transition: "background 0.2s",
      width: 200,
      textAlign: "center",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#d4af37")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#d4af37")}
  >
    Upload Image
  </label>
  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    style={{ display: "none" }}
  />
  
  {/* Image Preview */}
  {form.image && (
    <img
      src={form.image}
      alt="preview"
      style={{
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: 12,
        border: "2px solid #d4af37",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    />
  )}
</div>
<div>
          <input placeholder="Or paste image URL" value={form.image && form.image.startsWith("data:") ? "" : form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }}/>
        </div>
        <button type="submit" style={{ padding: 12, borderRadius: 8, background: "#d4af37", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>
          Add Perfume
        </button>
      </form>

      {/* Existing Perfumes */}
      <h3 style={{ marginBottom: 12 }}>Existing Perfumes</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
        {perfumes.length === 0 && <div style={{ padding: 20, background: "#fff", borderRadius: 12, textAlign: "center" }}>No perfumes yet.</div>}
        {perfumes.map((p) => (
          <div key={p.id} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", overflow: "hidden", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <img src={p.image || placeholder()} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <h4>{p.name}</h4>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{p.category} • {p.size}</div>
              <p style={{ margin: "8px 0" }}>{p.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700 }}>${p.price}</div>
                <button onClick={() => deletePerfume(p.id)} style={{ padding: "6px 12px", background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Inbox */}
      <h3 style={{ marginTop: 40, marginBottom: 12 }}>Contact Inbox (local)</h3>
      <Inbox />
    </div>
  );
}

function placeholder() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23ffffff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%23cccccc' font-family='Poppins, Arial'>No image</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function Inbox() {
  const [messages, setMessages] = useState([]);
  useEffect(() => setMessages(JSON.parse(localStorage.getItem("d_contacts") || "[]")), []);
  return (
    <div style={{ marginTop: 10, background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
      {messages.length === 0 && <div style={{ color: "var(--muted)" }}>No messages yet.</div>}
      {messages.map((m) => (
        <div key={m.id} style={{ borderTop: "1px solid #f3f3f3", paddingTop: 8, marginTop: 8 }}>
          <div style={{ fontWeight: 700 }}>{m.name} <span style={{ fontSize: 12, color: "var(--muted)" }}>• {m.email}</span></div>
          <div style={{ marginTop: 6 }}>{m.message}</div>
        </div>
      ))}
    </div>
  );
}
