import { addReview } from '@/lib/productStatus';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.REVIEW_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { productId, author, text } = await req.json();

  if (!productId || !text) {
    return NextResponse.json({ error: 'productId and text are required' }, { status: 400 });
  }

  await addReview(productId, author || 'Anonymous', text);

  return NextResponse.json({ success: true });
}
