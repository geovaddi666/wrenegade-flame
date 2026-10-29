import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { parseRates, savePostageRates } from '@/lib/postage';

// Save the postage rates table.
export async function PUT(req) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  const { value, error } = parseRates(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  await savePostageRates(value);
  return NextResponse.json({ ok: true, rates: value });
}
