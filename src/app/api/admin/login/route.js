import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  createSessionToken,
  loginLocked,
  passwordMatches,
  recordFailedLogin,
  sameOrigin,
  sessionCookieOptions,
} from '@/lib/adminAuth';

export async function POST(req) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'No admin password is set up yet (ADMIN_PASSWORD).' },
      { status: 500 }
    );
  }
  if (await loginLocked(req)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  const { password } = await req.json().catch(() => ({}));
  if (!passwordMatches(password)) {
    await recordFailedLogin(req);
    return NextResponse.json({ error: 'That password isn’t right.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());
  return res;
}
