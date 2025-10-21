// PerfumeCard.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa"; 

export default function PerfumeCard({ perfume }) {
  const openWhatsApp = () => {
    const ownerPhone = "71295690"; // Add owner's phone like "+9617XXXXXXXX"
    const text = `Hello, I'm interested in "${perfume.name}" priced ${perfume.price}. Is it available?`;
    const url = ownerPhone
      ? `https://wa.me/${ownerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
          text
        )}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="perfume-card"
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(8,12,30,0.06)",
        padding: 16,
        transition: "transform 0.2s",
      }}
    >
      <div
        style={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 10,
          background: "#fafafa",
        }}
      >
        <img
          src={perfume.image || placeholder()}
          alt={perfume.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
      <h3 style={{ marginTop: 12 }}>{perfume.name}</h3>
      <div style={{ color: "var(--muted)", fontSize: 13 }}>
        {perfume.category || ""} • {perfume.size || ""}
      </div>
      <p style={{ fontSize: 14, color: "#333", marginTop: 8 }}>
        {perfume.description}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div style={{ fontWeight: 700 }}>${perfume.price}</div>
        <button
          onClick={openWhatsApp}
          style={{
            backgroundColor: "#d4af37",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(247, 221, 21, 0.83)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <FaWhatsapp size={44} />
        </button>
      </div>
    </div>
  );
}

function placeholder() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23ffffff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%23cccccc' font-family='Poppins, Arial'>No image</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
