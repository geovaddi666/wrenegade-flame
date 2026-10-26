import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getCatalogItem, removeCatalogItem, updateCatalogItem } from '@/lib/catalog';
import { imageStore, keyFromUrl } from '@/lib/imageStore';
import { parsePieceInput } from '@/lib/pieceInput';
import { clearProductStatus, getProductStatus } from '@/lib/productStatus';

async function isArchived(item) {
  if (item.archived) return true;
  const status = await getProductStatus(item.id);
  return Boolean(status.archived);
}

async function deletePhotos(urls) {
  const keys = urls.map(keyFromUrl).filter(Boolean);
  if (!keys.length) return;
  const store = imageStore();
  await Promise.all(keys.map((k) => store.delete(k).catch(() => {})));
}

// Edit a piece's details.
export async function PATCH(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const item = await getCatalogItem(id);
  if (!item) return NextResponse.json({ error: 'Piece not found.' }, { status: 404 });

  const archived = await isArchived(item);
  const body = await req.json().catch(() => null);
  // Archived pieces have no price to edit; anything sent is ignored.
  if (archived && body) delete body.price;

  const { value, error } = parsePieceInput(body, {
    allowedImages: item.images || [],
    requirePrice: !archived,
  });
  if (error) return NextResponse.json({ error }, { status: 400 });

  const result = await updateCatalogItem(id, value);
  if (!result) return NextResponse.json({ error: 'Piece not found.' }, { status: 404 });

  // Delete uploaded photos that were taken off the piece.
  const kept = new Set(result.after.images);
  await deletePhotos((result.before.images || []).filter((url) => !kept.has(url)));

  return NextResponse.json({ ok: true });
}

// Remove a piece from the shop entirely. Archived pieces can't be removed.
export async function DELETE(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  const item = await getCatalogItem(id);
  if (!item) return NextResponse.json({ error: 'Piece not found.' }, { status: 404 });
  if (await isArchived(item)) {
    return NextResponse.json(
      { error: 'Pieces in the archive stay there and can’t be removed.' },
      { status: 403 }
    );
  }

  const removed = await removeCatalogItem(id);
  if (!removed) return NextResponse.json({ error: 'Piece not found.' }, { status: 404 });

  await clearProductStatus(id).catch(() => {});
  // Delete its uploaded photos. Original photos in /public are left alone.
  await deletePhotos(removed.images || []);

  return NextResponse.json({ ok: true });
}
