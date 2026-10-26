// One shared password (ADMIN_PASSWORD) unlocks the admin page.
// A successful login gets a signed cookie that lasts 30 days. Changing
// ADMIN_PASSWORD logs everyone out, because the signature depends on it.

import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import redis from './redis';

export const ADMIN_COOKIE = 'em_admin';
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const MAX_ATTEMPTS = 10; // wrong passwords allowed…
const ATTEMPT_WINDOW = 60 * 15; // …per 15 minutes, per connection

function signingKey() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash('sha256').update(`emporium-admin:${password}`).digest();
}

function sign(value) {
  const key = signingKey();
  return key ? createHmac('sha256', key).update(value).digest('hex') : null;
}

function safeEqual(a, b) {
  const x = createHash('sha256').update(String(a)).digest();
  const y = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(x, y);
}

export function passwordMatches(attempt) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || typeof attempt !== 'string') return false;
  return safeEqual(attempt, password);
}

export function createSessionToken() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${sign(expires)}`;
}

export function isValidSessionToken(token) {
  if (typeof token !== 'string') return false;
  const [expires, signature] = token.split('.');
  const expected = sign(expires || '');
  if (!expires || !signature || !expected) return false;
  if (Number(expires) < Date.now() / 1000) return false;
  return safeEqual(signature, expected);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
  };
}

// For server components (the admin page itself).
export async function isAdmin() {
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_COOKIE)?.value);
}

function clientIp(req) {
  return (
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}

// Returns true if this connection has used up its login attempts.
export async function loginLocked(req) {
  try {
    const count = Number(await redis.get(`admin:login:${clientIp(req)}`)) || 0;
    return count >= MAX_ATTEMPTS;
  } catch {
    return false;
  }
}

export async function recordFailedLogin(req) {
  try {
    const key = `admin:login:${clientIp(req)}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, ATTEMPT_WINDOW);
  } catch {
    // If Redis is down, don't block logins over it.
  }
}

// Requests that change things must come from this site (stops other sites
// from submitting forms on your behalf).
function sameOrigin(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin fetches from some browsers omit it
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

// For admin API routes: returns an error response, or null if allowed.
export function requireAdmin(req) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (!isValidSessionToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Please log in again.' }, { status: 401 });
  }
  return null;
}

export { sameOrigin };
