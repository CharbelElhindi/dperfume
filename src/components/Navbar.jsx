import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar({ isAdmin }) {
  const loc = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar">
      <div className="logo-container">
        <img src={logo} alt="D Perfume" className="logo-img" />
        <h1 className="logo-text">D Perfume</h1>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link onClick={() => setMenuOpen(false)} className={loc.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link onClick={() => setMenuOpen(false)} className={loc.pathname === "/perfumes" ? "active" : ""} to="/perfumes">Perfumes</Link>
        <Link onClick={() => setMenuOpen(false)} className={loc.pathname === "/contact" ? "active" : ""} to="/contact">Contact</Link>
        <Link onClick={() => setMenuOpen(false)} className={loc.pathname === "/admin" ? "active" : ""} to="/admin">Admin</Link>
      </nav>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </header>
  );
}
