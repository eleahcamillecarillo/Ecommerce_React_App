import React, { useState } from 'react';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('Please complete all fields.');
      return;
    }
    setStatus('Message sent. Our team will reply within 24 hours.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="container section-space">
      <h1>Contact Us</h1>
      <form className="form-card" onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
        />
        <button className="btn btn-primary" type="submit">Send Message</button>
        {status && <p className="status-note">{status}</p>}
      </form>
    </main>
  );
}

export default ContactPage;
