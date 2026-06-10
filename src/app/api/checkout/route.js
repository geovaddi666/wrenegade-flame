import Stripe from 'stripe';
import { products } from '@/lib/products';
import { getProductStatus } from '@/lib/productStatus';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { productId } = await req.json();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Check live status from Redis in case it's been archived since page load
  const status = await getProductStatus(productId);
  if (status.archived) {
    return NextResponse.json({ error: 'Product no longer available' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: product.stripePrice,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/emporium/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/emporium/${product.id}`,
    metadata: {
      productId: product.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
