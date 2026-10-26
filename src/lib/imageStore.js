// Photos uploaded through the admin page live in Netlify Blobs.
//
// On Netlify this connects automatically. For local development (npm run dev)
// set NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in .env.local, otherwise uploads
// will fail with a clear message (the rest of the site still works).

import { getStore } from '@netlify/blobs';

const STORE_NAME = 'emporium-images';
export const IMAGE_URL_PREFIX = '/api/images/';

export function imageStore() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (siteID && token) {
    // Direct API access (local development): always up to date.
    return getStore({ name: STORE_NAME, siteID, token, consistency: 'strong' });
  }
  // On Netlify: connects automatically. Every photo gets a brand-new key and
  // is never changed, so the default (edge-cached) reads are fine.
  return getStore(STORE_NAME);
}

// Turn a stored image URL back into its key, or null if it isn't one of ours
// (e.g. the original photos that live in /public/emporium).
export function keyFromUrl(url) {
  if (typeof url !== 'string' || !url.startsWith(IMAGE_URL_PREFIX)) return null;
  const key = url.slice(IMAGE_URL_PREFIX.length);
  return /^[a-z0-9-]+\.(webp|jpg|png)$/.test(key) ? key : null;
}
