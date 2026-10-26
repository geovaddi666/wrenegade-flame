'use client';

// The form for adding a new piece, and for editing an existing one
// (pass `piece` to edit).

import { useEffect, useRef, useState } from 'react';

const MAX_EDGE = 1800; // longest side of an uploaded photo, in pixels
const MAX_PHOTOS = 12;

// Shrink a photo in the browser before uploading: phone photos are often
// 4–8MB, which is slow to send and too big for the server.
async function compressPhoto(file) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error(`Couldn’t read “${file.name}”. Try saving it as a JPG first.`);
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();

  const toBlob = (type, quality) =>
    new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  // WebP where the browser can make it (Safari can't), otherwise JPG.
  let blob = await toBlob('image/webp', 0.82);
  if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg', 0.85);
  if (!blob) throw new Error(`Couldn’t prepare “${file.name}”.`);
  return blob;
}

async function uploadPhoto(file) {
  const blob = await compressPhoto(file);
  const res = await fetch('/api/admin/images', {
    method: 'POST',
    headers: { 'Content-Type': blob.type },
    body: blob,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'A photo failed to upload.');
  return data.url;
}

export default function PieceForm({ piece, archived = false, onCancel, onSaved }) {
  const editing = Boolean(piece);
  // Each photo is either one the piece already has ({ url }) or a new file
  // waiting to upload ({ file, preview }).
  const [photos, setPhotos] = useState(() =>
    (piece?.images || []).map((url) => ({ url, preview: url }))
  );
  const [name, setName] = useState(piece?.name || '');
  const [subtitle, setSubtitle] = useState(piece?.subtitle || '');
  const [price, setPrice] = useState(piece?.price ? String(piece.price) : '');
  const [details, setDetails] = useState((piece?.details || []).join('\n'));
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const fileInput = useRef(null);

  // Free preview memory for new photos when the form closes.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(
    () => () =>
      photosRef.current.forEach((p) => p.file && URL.revokeObjectURL(p.preview)),
    []
  );

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    setPhotos((prev) =>
      [...prev, ...files.map((file) => ({ file, preview: URL.createObjectURL(file) }))].slice(0, MAX_PHOTOS)
    );
    if (fileInput.current) fileInput.current.value = '';
  };

  const move = (i, dir) =>
    setPhotos((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const removePhoto = (i) =>
    setPhotos((prev) => {
      if (prev[i].file) URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, k) => k !== i);
    });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (photos.length === 0) return setError('Add at least one photo.');
    setBusy(true);
    try {
      const newCount = photos.filter((p) => p.file).length;
      let uploaded = 0;
      const urls = [];
      for (const p of photos) {
        if (p.url) {
          urls.push(p.url);
          continue;
        }
        uploaded += 1;
        setStatus(`Uploading photo ${uploaded} of ${newCount}…`);
        urls.push(await uploadPhoto(p.file));
      }

      setStatus(editing ? 'Saving changes…' : 'Placing it in the shop…');
      const payload = { name, subtitle, details: details.split('\n'), images: urls };
      if (!archived) payload.price = price;

      const res = await fetch(editing ? `/api/admin/products/${piece.id}` : '/api/admin/products', {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'The piece couldn’t be saved.');
      onSaved();
    } catch (err) {
      setError(err.message);
      setStatus('');
      setBusy(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2 className="admin-section-title">{editing ? `Editing ${piece.name}` : 'A new piece'}</h2>

      <div className="admin-field">
        <span className="admin-label">Photos <em>— the first is the cover</em></span>
        {photos.length > 0 && (
          <ul className="admin-photos">
            {photos.map((p, i) => (
              <li key={p.preview} className={i === 0 ? 'admin-photo admin-photo-cover' : 'admin-photo'}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={`Photo ${i + 1}`} />
                <div className="admin-photo-tools">
                  <button type="button" onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label="Move earlier">←</button>
                  <button type="button" onClick={() => removePhoto(i)} disabled={busy} aria-label="Remove photo">×</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={busy || i === photos.length - 1} aria-label="Move later">→</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {photos.length < MAX_PHOTOS && (
          <label className="admin-btn admin-file">
            {photos.length ? 'Add more photos' : 'Choose photos'}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              disabled={busy}
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        )}
      </div>

      <label className="admin-field">
        <span className="admin-label">Name</span>
        <input className="admin-input" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="The Fool’s Sceptres" maxLength={80} required disabled={busy} />
      </label>

      <label className="admin-field">
        <span className="admin-label">What it is</span>
        <input className="admin-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Dual Fire Staves — 90cm" maxLength={120} disabled={busy} />
      </label>

      {!archived && (
        <label className="admin-field admin-field-price">
          <span className="admin-label">Price</span>
          <span className="admin-price">
            <span>£</span>
            <input className="admin-input" type="number" inputMode="decimal" min="1" step="0.01"
              value={price} onChange={(e) => setPrice(e.target.value)} placeholder="250" required disabled={busy} />
          </span>
        </label>
      )}

      <label className="admin-field">
        <span className="admin-label">Specs <em>— one per line, optional</em></span>
        <textarea className="admin-input admin-textarea" rows={5} value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={'Grade 6082 aluminium shafts\n100% pure kevlar wicks'} disabled={busy} />
      </label>

      {error && <p className="admin-error" role="alert">{error}</p>}
      {status && <p className="admin-status">{status}</p>}

      <div className="admin-form-actions">
        <button type="submit" className="emporium-buy-button" disabled={busy}>
          {busy ? 'Working…' : editing ? 'Save changes' : 'Add to the shop'}
        </button>
        <button type="button" className="admin-btn admin-btn-quiet" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
      </div>
    </form>
  );
}
