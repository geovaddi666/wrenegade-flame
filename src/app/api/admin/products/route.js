import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { addCatalogItem } from '@/lib/catalog';
import { parsePieceInput } from '@/lib/pieceInput';

// Add a new piece to the shop.
export async function POST(req) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  const { value, error } = parsePieceInput(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const item = await addCatalogItem(value);
  return NextResponse.json({ ok: true, id: item.id });
}
