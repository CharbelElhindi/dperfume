import React from "react";

export default function Footer(){
  return (
    <footer style={{background: "var(--navy)", color:"#fff", textAlign:"center", padding:"18px 0"}}>
      <div className="container">© {new Date().getFullYear()} D Perfume.</div>
    </footer>
  );
}
