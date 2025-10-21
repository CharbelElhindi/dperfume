import React, { useState } from "react";

export default function Contact(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');

  function submit(e){
    e.preventDefault();
    const inbox = JSON.parse(localStorage.getItem('d_contacts')||'[]');
    inbox.unshift({id:Date.now(),name,email,message});
    localStorage.setItem('d_contacts',JSON.stringify(inbox));
    alert('Message saved locally. Owner can view it from Admin inbox in the same browser.');
    setName(''); setEmail(''); setMessage('');
  }

  return (
    <div className="container" style={{maxWidth:800}}>
      <h2>Contact Us</h2>
      <p style={{color:'var(--muted)'}}>Have a question or want to order? Send a message and the owner will see it when they check the admin inbox in their browser.</p>
      <form onSubmit={submit} style={{display:'grid',gap:10,marginTop:16}}>
        <input required placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #ddd'}}/>
        <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #ddd'}}/>
        <textarea required placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #ddd',minHeight:120}}/>
        <div style={{display:'flex',justifyContent:'flex-end'}}><button type="submit">Send Message</button></div>
      </form>
      <div style={{marginTop:20}}>
        <a href="https://wa.me/96171295690" target="_blank" rel="noreferrer" style={{color:'var(--gold)',fontWeight:700}}>Order via WhatsApp</a>
      </div>
    </div>
  );
}
