import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div>
      <header className="hero-section" style={{
        background:'linear-gradient(120deg,#1b1b2f,#303952)',
        color:'#fff', textAlign:'center', padding:'100px 20px', borderRadius:'0 0 60px 60px', boxShadow:'0 6px 18px rgba(2, 6, 23, 0.42)'
      }}>
        <div className="container">
          <h1 style={{fontSize: '3rem'}}>Welcome to <span style={{color:'var(--gold)'}}>D Perfume</span></h1>
          <p style={{fontSize: '1.15rem',marginTop:12}}>Discover elegance and luxury in every scent.</p>
          <Link to="/perfumes" className="shop-btn" style={{marginTop:20,display:'inline-block',background:'var(--gold)',padding:'12px 28px',borderRadius:30,color:'#000',fontWeight:700}}>Shop Now</Link>
        </div>
      </header>

      <section className="about-section container" style={{padding:'60px 20px', textAlign:'center'}}>
        <h2>About Us</h2>
        <p style={{maxWidth:800,margin:'18px auto',lineHeight:1.7}}>
          At <strong>D Perfume</strong>, we craft fragrances that embody sophistication and passion.
          Each perfume is carefully designed to reflect timeless elegance and individuality.
        </p>
      </section>
    </div>
  );
}
