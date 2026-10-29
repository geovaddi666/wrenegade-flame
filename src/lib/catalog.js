// The Emporium catalogue: every piece's details, stored in Redis so pieces can
// be added and removed from the admin page without touching code.
//
// The first time this runs it copies the pieces from products.js into Redis.
// After that, Redis is the source of truth and products.js is only a fallback
// for when Redis can't be reached.

import redis from './redis';
import { products as seedProducts } from './products';

const CATALOG_KEY = 'catalog:v1';

export async function getCatalog() {
  const stored = await redis.get(CATALOG_KEY);
  if (Array.isArray(stored)) return stored;

  // First run: seed from products.js. `nx` means only if nothing is there yet,
  // so two requests at once can't overwrite each other.
  await redis.set(CATALOG_KEY, seedProducts, { nx: true });
  const seeded = await redis.get(CATALOG_KEY);
  return Array.isArray(seeded) ? seeded : seedProducts;
}

async function saveCatalog(catalog) {
  await redis.set(CATALOG_KEY, catalog);
}

export async function getCatalogItem(id) {
  const catalog = await getCatalog();
  return catalog.find((p) => p.id === id) || null;
}

export function formatPrice(price) {
  return Number.isInteger(price) ? `£${price}` : `£${price.toFixed(2)}`;
}

function slugify(text) {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'piece'
  );
}

// Add a new piece to the front of the shop. Returns the saved piece.
export async function addCatalogItem({ name, subtitle, price, details, images, postage }) {
  const catalog = await getCatalog();

  const base = slugify(name);
  let id = base;
  for (let n = 2; catalog.some((p) => p.id === id); n++) id = `${base}-${n}`;

  const item = {
    id,
    name,
    subtitle,
    price,
    priceDisplay: formatPrice(price),
    stripePrice: '', // empty: checkout charges `price` directly
    images,
    shortDescription: '',
    description: '',
    details,
    postage,
    category: '',
    inStock: true,
    archived: false,
    createdAt: new Date().toISOString(),
  };

  await saveCatalog([item, ...catalog]);
  return item;
}

// Change a piece's details. The id (and so its web address) never changes.
// Returns { before, after }, or null if the piece doesn't exist.
export async function updateCatalogItem(id, { name, subtitle, price, details, images, postage }) {
  const catalog = await getCatalog();
  const before = catalog.find((p) => p.id === id);
  if (!before) return null;

  const after = { ...before, name, subtitle, details, images, updatedAt: new Date().toISOString() };
  if (postage !== undefined) after.postage = postage;
  if (price !== undefined && price !== before.price) {
    after.price = price;
    after.priceDisplay = formatPrice(price);
    // Older pieces charge a price set up by hand in Stripe. Once the price is
    // edited here, charge the new price directly instead.
    after.stripePrice = '';
  }

  await saveCatalog(catalog.map((p) => (p.id === id ? after : p)));
  return { before, after };
}

// Remove a piece entirely. Returns the removed piece (or null).
export async function removeCatalogItem(id) {
  const catalog = await getCatalog();
  const item = catalog.find((p) => p.id === id) || null;
  if (!item) return null;
  await saveCatalog(catalog.filter((p) => p.id !== id));
  return item;
}

// Set the "sold" flag stored on the piece itself.
export async function setCatalogArchived(id, archived) {
  const catalog = await getCatalog();
  let found = false;
  const next = catalog.map((p) => {
    if (p.id !== id) return p;
    found = true;
    return { ...p, archived, inStock: !archived };
  });
  if (found) await saveCatalog(next);
  return found;
}
