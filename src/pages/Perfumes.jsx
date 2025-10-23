// Perfumes.jsx
import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaHeart, FaRegHeart, FaMoon, FaSun, FaStar } from "react-icons/fa";

function Stars({ value }) {
  const rounded = Math.round(value * 2) / 2;
  const API_URL = "https://perfume-server.onrender.com";

  const arr = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {arr.map((i) => (
        <FaStar key={i} style={{ opacity: i <= rounded ? 1 : 0.25 }} />
      ))}
      <small style={{ marginLeft: 6, color: "#ccc" }}>{rounded.toFixed(1)}</small>
    </div>
  );
}

export default function Perfumes() {
  const [perfumes, setPerfumes] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ gender: "All", brand: "All", minPrice: "", maxPrice: "" });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist_v1") || "[]");
    } catch {
      return [];
    }
  });
  const [testimonials, setTestimonials] = useState([]);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    fetchAll();
    fetchTestimonials();
    document.body.style.background = dark ? "#0f0f16" : "#fff";
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist_v1", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.background = dark ? "#0f0f16" : "#fff";
  }, [dark]);

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/perfumes`);
      const data = await res.json();
      setPerfumes(data || []);
    } catch (err) {
      console.error(err);
      setPerfumes([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTestimonials() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials`);
      const data = await res.json();
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
      setTestimonials([]);
    }
  }

  function handleImgLoad(id) {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  }

  function handleImgError(e) {
    e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+image";
    const id = e.currentTarget.dataset.id;
    if (id) handleImgLoad(id);
  }

  const filtered = perfumes.filter((p) => {
    const term = query.trim().toLowerCase();
    if (term) {
      const inText =
        (p.name || "").toLowerCase().includes(term) ||
        (p.brand || "").toLowerCase().includes(term) ||
        (p.description || "").toLowerCase().includes(term);
      if (!inText) return false;
    }
    if (filter.gender !== "All" && (p.gender || "").toLowerCase() !== filter.gender.toLowerCase()) return false;
    if (filter.brand !== "All" && (p.brand || "") !== filter.brand) return false;
    if (filter.minPrice && Number(p.price) < Number(filter.minPrice)) return false;
    if (filter.maxPrice && Number(p.price) > Number(filter.maxPrice)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    if (sort === "mostViewed") return (b.views || 0) - (a.views || 0);
    return 0;
  });

  const brands = Array.from(new Set(perfumes.map((p) => p.brand).filter(Boolean))).sort();

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      return exists ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }

  async function track(id, type) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/perfumes/${id}/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
    } catch (err) {
      /* ignore */
    }
  }

  const [tsIndex, setTsIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setTsIndex((i) => (i + 1) % Math.max(1, testimonials.length));
    }, 4200);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(120deg,#0b0b12,#1b1b2f)"
          : "linear-gradient(120deg,#f7f7fb,#fff)",
        color: dark ? "#eee" : "#111",
        paddingBottom: 80,
      }}
    >
      {/* top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          maxWidth: 1300,
          margin: "0 auto",
        }}
      >
        <h1 style={{ margin: 0, color: "#d4af37" }}>D Perfume</h1>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            placeholder="Search perfumes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.1)",
              minWidth: 240,
            }}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
            <option value="newest">Newest</option>
            <option value="priceAsc">Price — Low to High</option>
            <option value="priceDesc">Price — High to Low</option>
            <option value="mostViewed">Most Viewed</option>
          </select>

          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: dark ? "#fff" : "#111",
              fontSize: 18,
            }}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 14, opacity: 0.9 }}>{wishlist.length}</div>
            <FaHeart style={{ color: "#d4af37" }} />
          </div>
        </div>
      </div>

      {/* filters */}
      <section style={{ maxWidth: 1300, margin: "18px auto", padding: "0 18px" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <select value={filter.gender} onChange={(e) => setFilter((f) => ({ ...f, gender: e.target.value }))} style={{ padding: 8, borderRadius: 8 }}>
            <option value="All">All genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>

          <select value={filter.brand} onChange={(e) => setFilter((f) => ({ ...f, brand: e.target.value }))} style={{ padding: 8, borderRadius: 8 }}>
            <option value="All">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <input
            placeholder="Min price"
            type="number"
            value={filter.minPrice}
            onChange={(e) => setFilter((f) => ({ ...f, minPrice: e.target.value }))}
            style={{ width: 110, padding: 8, borderRadius: 8 }}
          />
          <input
            placeholder="Max price"
            type="number"
            value={filter.maxPrice}
            onChange={(e) => setFilter((f) => ({ ...f, maxPrice: e.target.value }))}
            style={{ width: 110, padding: 8, borderRadius: 8 }}
          />

          <button
            onClick={() => {
              setFilter({ gender: "All", brand: "All", minPrice: "", maxPrice: "" });
              setQuery("");
              setSort("newest");
            }}
            style={{ padding: "8px 12px", borderRadius: 8, marginLeft: "auto" }}
          >
            Reset
          </button>
        </div>
      </section>

      {/* testimonials */}
      {testimonials.length > 0 && (
        <section style={{ maxWidth: 1300, margin: "6px auto", padding: "0 18px" }}>
          <div
            style={{
              background: dark ? "rgba(255,255,255,0.03)" : "#fff",
              borderRadius: 12,
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ flex: "0 0 6rem", fontSize: 20 }}>💬</div>
            <div>
              <div style={{ fontWeight: 700 }}>{testimonials[tsIndex]?.name}</div>
              <div style={{ color: dark ? "#ddd" : "#444" }}>{testimonials[tsIndex]?.text}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              <button onClick={() => setTsIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}>‹</button>
              <button onClick={() => setTsIndex((i) => (i + 1) % testimonials.length)}>›</button>
            </div>
          </div>
        </section>
      )}

      {/* products grid */}
      <section style={{ maxWidth: 1300, margin: "18px auto", padding: "0 18px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
            gap: 18,
          }}
        >
          {loading ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40 }}>
              <div
                style={{
                  width: 70,
                  height: 70,
                  border: "6px solid rgba(212,175,55,0.2)",
                  borderTop: "6px solid #d4af37",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "auto",
                }}
              />
              <p style={{ color: "#d4af37" }}>Loading perfumes...</p>
            </div>
          ) : (
            sorted.map((p) => (
              <article
                key={p._id}
                style={{
                  background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: dark ? "0 6px 20px rgba(0,0,0,0.6)" : "0 6px 16px rgba(0,0,0,0.06)",
                  transition: "transform .3s, box-shadow .3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 12px 3px #d4af37";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = dark ? "0 6px 20px rgba(0,0,0,0.6)" : "0 6px 16px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    data-id={p._id}
                    loading="lazy"
                    src={p.image || "https://via.placeholder.com/400x300?text=No+image"}
                    alt={p.name}
                    onLoad={() => handleImgLoad(p._id)}
                    onError={handleImgError}
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      display: "block",
                      transition: "opacity .5s, transform .6s",
                      opacity: imageLoaded[p._id] ? 1 : 0,
                      transform: imageLoaded[p._id] ? "scale(1)" : "scale(1.03)",
                    }}
                  />
                  <button
                    onClick={() => toggleWishlist(p._id)}
                    aria-label="Wishlist"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(0,0,0,0.35)",
                      border: "none",
                      padding: 8,
                      borderRadius: 10,
                      color: wishlist.includes(p._id) ? "#ff6b81" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {wishlist.includes(p._id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                <div style={{ padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0 }}>{p.name}</h3>
                    <div style={{ fontWeight: 700, color: "#d4af37" }}>${p.price}</div>
                  </div>

                  <p style={{ margin: "6px 0", color: dark ? "#ccc" : "#666", fontSize: 14 }}>
                    {p.brand} {p.size ? `• ${p.size}` : ""} {p.gender ? `• ${p.gender}` : ""}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div>
                      {p.reviews && p.reviews.length ? <Stars value={p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length} /> : null}
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => {
                          track(p._id, "click");
                          window.open(
                            `https://wa.me/96171295690?text=${encodeURIComponent(
                              `Hello! I'm interested in ${p.name} (${p.brand}) priced at $${p.price}. Is it available?`
                            )}`,
                            "_blank"
                          );
                        }}
                        style={{
                          background: "linear-gradient(90deg,#d4af37,#e8c059)",
                          border: "none",
                          padding: "8px 10px",
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                      >
                        <FaWhatsapp /> <span style={{ marginLeft: 6 }}>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <footer style={{ textAlign: "center", marginTop: 60, padding: 24 }}>
        <small style={{ color: dark ? "#bbb" : "#666" }}>D Perfume © {new Date().getFullYear()}</small>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
        @media (max-width: 700px) {
          img { height: 180px !important; }
        }
      `}</style>
    </div>
  );
}
