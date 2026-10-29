'use client';

import { useState } from 'react';
import { POSTAGE_CLASSES, REGIONS, REGION_IDS } from '@/lib/postageClasses';

const toText = (v) => (typeof v === 'number' ? String(v) : '');

// The postage prices table. A blank box means "doesn't post there".
export default function PostageRates({ rates, onSaved }) {
  const initial = () =>
    Object.fromEntries(
      POSTAGE_CLASSES.map((c) => [
        c.id,
        Object.fromEntries(REGION_IDS.map((r) => [r, toText(rates?.[c.id]?.[r])])),
      ])
    );
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const set = (cls, region, v) =>
    setValues((prev) => ({ ...prev, [cls]: { ...prev[cls], [region]: v } }));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/admin/postage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Couldn’t save the postage prices.');
      setMessage('Saved.');
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-section">
      <h2 className="admin-section-title">
        <button type="button" className="admin-collapse" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          Postage prices {open ? '▴' : '▾'}
        </button>
      </h2>
      {open && (
        <form className="admin-form" onSubmit={save}>
          <p className="admin-hint">
            Flat prices per piece. Leave a box empty if that kind of piece isn’t posted
            there — buyers will be asked to get in touch instead. Europe means the EU plus
            Norway, Switzerland and Iceland.
          </p>
          <table className="admin-rates">
            <thead>
              <tr>
                <th />
                {REGION_IDS.map((r) => <th key={r}>{REGIONS[r].label}</th>)}
              </tr>
            </thead>
            <tbody>
              {POSTAGE_CLASSES.map((c) => (
                <tr key={c.id}>
                  <th scope="row">{c.label}</th>
                  {REGION_IDS.map((r) => (
                    <td key={r}>
                      <span className="admin-price">
                        <span>£</span>
                        <input
                          className="admin-input"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                          value={values[c.id][r]}
                          onChange={(e) => set(c.id, r, e.target.value)}
                          aria-label={`${c.label}, ${REGIONS[r].label}`}
                          disabled={busy}
                        />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p className="admin-error" role="alert">{error}</p>}
          {message && <p className="admin-status">{message}</p>}
          <div className="admin-form-actions">
            <button type="submit" className="emporium-buy-button" disabled={busy}>
              {busy ? 'Saving…' : 'Save postage prices'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
