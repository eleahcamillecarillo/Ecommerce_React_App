import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthPage({ onLogin }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    address: '',
    password: ''
  });

  const submit = (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return;

    const fallbackName = form.email.split('@')[0] || 'Shopper';
    onLogin({
      firstName: form.firstName || fallbackName,
      email: form.email,
      address: form.address || 'Not set'
    });
    navigate(redirect);
  };

  return (
    <main className="container section-space">
      <h1>{mode === 'login' ? 'Login' : 'Create Account'}</h1>
      <div className="auth-switch">
        <button className={`chip ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>
          Login
        </button>
        <button className={`chip ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>
          Sign Up
        </button>
      </div>

      <form className="form-card" onSubmit={submit}>
        {mode === 'signup' ? (
          <>
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </>
        ) : null}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </main>
  );
}

export default AuthPage;
