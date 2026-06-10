import { archiveProduct } from '@/lib/productStatus';
import { NextResponse } from 'next/server';

export async function GET() {
  await archiveProduct('alchemists-key');
  return NextResponse.json({ success: true });
}
