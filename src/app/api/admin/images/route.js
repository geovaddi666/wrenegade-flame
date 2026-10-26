import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { imageStore, IMAGE_URL_PREFIX } from '@/lib/imageStore';

const EXTENSIONS = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };
const MAX_BYTES = 5 * 1024 * 1024; // photos are shrunk in the browser first

// Upload one photo (the raw image is the request body). Returns its URL.
export async function POST(req) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const type = (req.headers.get('content-type') || '').split(';')[0].trim();
  const ext = EXTENSIONS[type];
  if (!ext) {
    return NextResponse.json({ error: 'Photos must be JPG, PNG or WebP.' }, { status: 415 });
  }

  const data = await req.arrayBuffer();
  if (data.byteLength === 0 || data.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: 'That photo is too large.' }, { status: 413 });
  }

  const key = `${randomUUID()}.${ext}`;
  try {
    await imageStore().set(key, data);
  } catch (err) {
    console.error('Photo upload failed:', err);
    const local = err?.name === 'MissingBlobsEnvironmentError';
    return NextResponse.json(
      {
        error: local
          ? 'Photo storage isn’t connected here. On your computer, add NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN to .env.local (or use the live site).'
          : 'The photo couldn’t be saved. Please try again.',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: IMAGE_URL_PREFIX + key });
}
