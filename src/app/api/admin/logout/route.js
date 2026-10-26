import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, sameOrigin } from '@/lib/adminAuth';

export async function POST(req) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
