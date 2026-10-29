// Postage: each piece belongs to a postage class, and each class has a flat
// rate per region. The rates are edited on the admin page and kept in Redis.
// A blank rate means that class doesn't ship to that region.

import redis from './redis';
import { POSTAGE_CLASSES, REGIONS, REGION_IDS, postageClassOf } from './postageClasses';

export { POSTAGE_CLASSES, REGIONS, REGION_IDS, postageClassOf };

const RATES_KEY = 'postage:v1';
const CLASS_IDS = POSTAGE_CLASSES.map((c) => c.id);

export const DEFAULT_RATES = {
  leather: { uk: 7.99, europe: null },
  small: { uk: null, europe: null },
  medium: { uk: null, europe: null },
  large: { uk: null, europe: null },
};

export function isPostageClass(id) {
  return CLASS_IDS.includes(id);
}

function cleanRate(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Math.round(Number(value) * 100) / 100;
  return Number.isFinite(n) && n >= 0 && n <= 1000 ? n : undefined;
}

// Returns { value } or { error }.
export function parseRates(input) {
  const out = {};
  for (const id of CLASS_IDS) {
    out[id] = {};
    for (const region of REGION_IDS) {
      const rate = cleanRate(input?.[id]?.[region]);
      if (rate === undefined) return { error: 'Postage prices must be between £0 and £1000.' };
      out[id][region] = rate;
    }
  }
  return { value: out };
}

export async function getPostageRates() {
  const stored = await redis.get(RATES_KEY);
  if (!stored || typeof stored !== 'object') return DEFAULT_RATES;
  // Fill in anything missing (e.g. a class added later).
  const { value } = parseRates({ ...DEFAULT_RATES, ...stored });
  return value || DEFAULT_RATES;
}

// Never fails: if Redis is down, pages fall back to the defaults.
export async function getPostageRatesSafe() {
  try {
    return await getPostageRates();
  } catch (err) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    console.error('Postage rates unavailable, using defaults:', err);
    return DEFAULT_RATES;
  }
}

export async function savePostageRates(rates) {
  await redis.set(RATES_KEY, rates);
}

// [{ region, label, amount }] for the regions this piece can be posted to.
export function shippingOptionsFor(piece, rates) {
  const cls = postageClassOf(piece);
  if (!cls) return [];
  return REGION_IDS.filter((r) => typeof rates[cls]?.[r] === 'number').map((r) => ({
    region: r,
    label: REGIONS[r].label,
    amount: rates[cls][r],
  }));
}

export function formatPostage(amount) {
  return amount === 0 ? 'Free' : `£${amount.toFixed(2)}`;
}
