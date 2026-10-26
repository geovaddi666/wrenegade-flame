'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PieceForm from './AddPieceForm';

async function call(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

function PieceRow({ piece, onDone }) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');

  // "Remove" needs a second press within a few seconds.
  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 4000);
    return () => clearTimeout(t);
  }, [confirming]);

  const run = async (fn) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      onDone();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const setSold = (sold) =>
    run(() =>
      call(`/api/admin/products/${piece.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sold }),
      })
    );

  const remove = () => {
    if (!confirming) return setConfirming(true);
    run(() => call(`/api/admin/products/${piece.id}`, { method: 'DELETE' }));
  };

  if (editing) {
    return (
      <li className="admin-row-editing">
        <PieceForm
          piece={piece}
          archived={piece.archived}
          onCancel={() => setEditing(false)}
          onSaved={() => {
            setEditing(false);
            onDone();
          }}
        />
      </li>
    );
  }

  return (
    <li className="admin-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="admin-thumb" src={piece.images?.[0]} alt="" loading="lazy" />
      <div className="admin-row-text">
        <p className="admin-row-name">{piece.name}</p>
        <p className="admin-row-sub">
          {/* Archived pieces don't show a price. */}
          {[piece.subtitle, piece.archived ? null : piece.priceDisplay].filter(Boolean).join(' · ')}
        </p>
        {error && <p className="admin-error">{error}</p>}
      </div>
      <div className="admin-row-actions">
        <button className="admin-btn" disabled={busy} onClick={() => setEditing(true)}>
          Edit
        </button>
        {piece.archived ? (
          <button className="admin-btn" disabled={busy} onClick={() => setSold(false)}>
            Return to shop
          </button>
        ) : (
          <button className="admin-btn" disabled={busy} onClick={() => setSold(true)}>
            Sold in person
          </button>
        )}
        {/* Once a piece is in the archive, it stays there: no Remove. */}
        {!piece.archived && (
          <button
            className={confirming ? 'admin-btn admin-btn-danger' : 'admin-btn admin-btn-quiet'}
            disabled={busy}
            onClick={remove}
          >
            {confirming ? 'Press again to remove' : 'Remove'}
          </button>
        )}
      </div>
    </li>
  );
}

export default function AdminDashboard({ products, loadError }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const refresh = () => router.refresh();

  const inShop = products.filter((p) => !p.archived);
  const archived = products.filter((p) => p.archived);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    router.refresh();
  };

  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <h1 className="admin-title">Keeper’s Room</h1>
        <button className="admin-btn admin-btn-quiet" onClick={logout}>Log out</button>
      </header>

      {loadError && <p className="admin-error admin-banner">{loadError}</p>}

      {adding ? (
        <PieceForm
          onCancel={() => setAdding(false)}
          onSaved={() => {
            setAdding(false);
            refresh();
          }}
        />
      ) : (
        <button className="emporium-buy-button admin-add-button" onClick={() => setAdding(true)}>
          Add a piece
        </button>
      )}

      <section className="admin-section">
        <h2 className="admin-section-title">In the shop <span>{inShop.length}</span></h2>
        {inShop.length === 0 ? (
          <p className="admin-empty">Nothing in the shop right now.</p>
        ) : (
          <ul className="admin-list">
            {inShop.map((p) => <PieceRow key={p.id} piece={p} onDone={refresh} />)}
          </ul>
        )}
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">In the archive <span>{archived.length}</span></h2>
        {archived.length === 0 ? (
          <p className="admin-empty">The archive is empty.</p>
        ) : (
          <ul className="admin-list">
            {archived.map((p) => <PieceRow key={p.id} piece={p} onDone={refresh} />)}
          </ul>
        )}
      </section>
    </div>
  );
}
