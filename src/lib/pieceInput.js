// Shared checks for the add and edit forms' data.
import { keyFromUrl } from './imageStore';
import { isPostageClass } from './postage';

const clean = (value, max) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

// Returns { value } or { error }. `allowedImages` are photo URLs the piece
// already has (e.g. originals in /public), which may be kept when editing.
export function parsePieceInput(body, { allowedImages = [], requirePrice = true } = {}) {
  if (!body) return { error: 'Nothing was sent.' };

  const name = clean(body.name, 80);
  const subtitle = clean(body.subtitle, 120);
  const details = (Array.isArray(body.details) ? body.details : [])
    .map((d) => clean(d, 160))
    .filter(Boolean)
    .slice(0, 20);
  // Only photos uploaded through /api/admin/images, or ones it already had.
  const images = (Array.isArray(body.images) ? body.images : [])
    .filter((url) => keyFromUrl(url) || allowedImages.includes(url))
    .filter((url, i, all) => all.indexOf(url) === i)
    .slice(0, 12);

  if (!name) return { error: 'Give the piece a name.' };
  if (images.length === 0) return { error: 'Add at least one photo.' };

  const value = { name, subtitle, details, images };

  if (requirePrice || body.price !== undefined) {
    const price = Math.round(Number(body.price) * 100) / 100;
    if (!Number.isFinite(price) || price < 1 || price > 100000) {
      return { error: 'Enter a price of at least £1.' };
    }
    value.price = price;
    // Pieces for sale need a postage class (archived pieces don't).
    if (!isPostageClass(body.postage)) return { error: 'Choose how the piece is posted.' };
    value.postage = body.postage;
  }

  return { value };
}
