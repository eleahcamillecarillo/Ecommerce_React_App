import React, { useState } from 'react';

function AccountPage({ user, onLogin, onLogout }) {
  const [form, setForm] = useState({ firstName: '', email: '', address: '' });

  if (user) {
    return (
      <main className="container section-space">
        <h1>My Account</h1>
        <div className="account-card">
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container section-space">
      <h1>Sign Up / Login</h1>
      <div className="form-card">
        <input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <button className="btn btn-primary" onClick={() => onLogin(form)} disabled={!form.firstName || !form.email}>
          Continue
        </button>
      </div>
    </main>
  );
}

export default AccountPage;
