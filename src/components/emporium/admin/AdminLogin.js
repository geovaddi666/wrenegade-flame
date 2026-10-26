'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <section className="admin-login">
      <h1 className="admin-title">Keeper’s Room</h1>
      <div className="emporium-hero-divider">
        <span className="emporium-divider-line" />
        <span className="emporium-divider-glyph">✦</span>
        <span className="emporium-divider-line" />
      </div>
      <form onSubmit={submit} className="admin-login-form">
        <label className="admin-label" htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          autoFocus
          required
        />
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button type="submit" className="emporium-buy-button" disabled={busy || !password}>
          {busy ? 'Opening…' : 'Enter'}
        </button>
      </form>
    </section>
  );
}
