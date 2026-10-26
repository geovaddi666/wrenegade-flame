import { imageStore, IMAGE_URL_PREFIX, keyFromUrl } from '@/lib/imageStore';

const TYPES = { webp: 'image/webp', jpg: 'image/jpeg', png: 'image/png' };

// Serves photos uploaded through the admin page.
export async function GET(_req, { params }) {
  const { key: rawKey } = await params;
  const key = keyFromUrl(IMAGE_URL_PREFIX + rawKey);
  if (!key) return new Response('Not found', { status: 404 });

  const data = await imageStore().get(key, { type: 'arrayBuffer' });
  if (!data) return new Response('Not found', { status: 404 });

  return new Response(data, {
    headers: {
      'Content-Type': TYPES[key.split('.').pop()],
      // Keys are random and never reused, so the photo can be cached forever.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
