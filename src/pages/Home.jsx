// Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.background = dark ? "#0f0f16" : "#fff";
  }, [dark]);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", color: dark ? "#eee" : "#111" }}>
      {/* Hero Section (background fixed, not affected by theme) */}
      <header
        className="hero-section"
        style={{
          background: "linear-gradient(120deg,#1b1b2f,#303952)",
          color: "#fff",
          textAlign: "center",
          padding: "100px 20px",
          borderRadius: "0 0 60px 60px",
          boxShadow: "0 6px 18px rgba(2, 6, 23, 0.42)",
          position: "relative",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3rem" }}>
            Welcome to <span style={{ color: "var(--gold,#d4af37)" }}>D Perfume</span>
          </h1>
          <p style={{ fontSize: "1.15rem", marginTop: 12 }}>
            D
          </p>
          <Link
            to="/perfumes"
            className="shop-btn"
            style={{
              marginTop: 20,
              display: "inline-block",
              background: "var(--gold,#d4af37)",
              padding: "12px 28px",
              borderRadius: 30,
              color: "#000",
              fontWeight: 700,
            }}
          >
            Shop Now
          </Link>

          {/* Theme toggle button */}
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: 22,
            }}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* About Section */}
      <section
        className="about-section container"
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: dark ? "#0f0f16" : "#fff",
          color: dark ? "#eee" : "#111",
        }}
      >
        <h2>About Us</h2>
        <p style={{ maxWidth: 800, margin: "18px auto", lineHeight: 1.7 }}>
          At <strong>D Perfume</strong>, we craft fragrances that embody sophistication and passion.
          Each perfume is carefully designed to reflect timeless elegance and individuality.
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: 60,
          padding: 24,
          background: dark ? "#0f0f16" : "#fff",
          color: dark ? "#bbb" : "#666",
        }}
      >
        <small>D Perfume © {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}
