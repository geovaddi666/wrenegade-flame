// Disabled: this test route let anyone mark a product as unsold.
// Safe to delete this whole folder (src/app/api/unarchive).
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
