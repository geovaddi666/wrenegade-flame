import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getCatalogItem } from '@/lib/catalog';
import { archiveProduct, unarchiveProduct } from '@/lib/productStatus';

// { sold: true } moves a piece to the Archive (sold in person);
// { sold: false } puts it back in the shop.
export async function POST(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  if (!(await getCatalogItem(id))) {
    return NextResponse.json({ error: 'Piece not found.' }, { status: 404 });
  }

  const { sold } = await req.json().catch(() => ({}));
  if (typeof sold !== 'boolean') {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  if (sold) await archiveProduct(id);
  else await unarchiveProduct(id);

  return NextResponse.json({ ok: true });
}
