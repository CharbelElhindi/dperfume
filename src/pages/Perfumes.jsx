// Perfumes.jsx
import React, { useEffect, useState } from "react";
import PerfumeCard from "../components/PerfumeCard";

export default function Perfumes() {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("perfumes") || "[]");
    setPerfumes(saved);
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginTop: 6 }}>Our Collection</h2>
      <p style={{ color: "var(--muted)" }}>
        Browse the curated selection. Click order to message us on WhatsApp.
      </p>
      <div className="perfume-grid">
        {perfumes.length === 0 ? (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: 40,
              background: "#fff",
              borderRadius: 12,
            }}
          >
            No perfumes available. Log in as admin to add some.
          </div>
        ) : (
          perfumes.map((p) => <PerfumeCard key={p.id || p.name} perfume={p} />)
        )}
      </div>
    </div>
  );
}
