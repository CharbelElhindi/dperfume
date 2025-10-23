import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(120deg, #1b1b2f, #303952)",
        minHeight: "100vh",
        padding: "80px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          padding: "40px 30px",
          borderRadius: 20,
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          animation: "fadeIn 1s ease-in",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#d4af37",
            fontSize: "2rem",
            marginBottom: 10,
          }}
        >
          Contact Us
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#ddd",
            marginBottom: 30,
            fontSize: "1rem",
          }}
        >
          We’d love to hear from you! Send us a message below and we’ll get back to you soon.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              outline: "none",
              fontSize: "1rem",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #d4af37")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
            }
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              outline: "none",
              fontSize: "1rem",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #d4af37")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
            }
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            style={{
              minHeight: 140,
              padding: 12,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              outline: "none",
              fontSize: "1rem",
              resize: "none",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #d4af37")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
            }
          />
          <button
            style={{
              background: "linear-gradient(90deg, #d4af37, #e8c059)",
              color: "#000",
              border: "none",
              padding: "12px 20px",
              borderRadius: 25,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 0 12px rgba(212,175,55,0.3)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 20px rgba(212,175,55,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 12px rgba(212,175,55,0.3)")
            }
          >
            Send Message
          </button>
        </form>

        {status && (
          <p
            style={{
              marginTop: 20,
              textAlign: "center",
              color: status.includes("✅") ? "#d4af37" : "#ff7777",
              fontWeight: 500,
            }}
          >
            {status}
          </p>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            div {
              padding: 60px 15px;
            }
            h2 {
              font-size: 1.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}
