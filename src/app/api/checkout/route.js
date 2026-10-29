import Stripe from 'stripe';
import { getCatalogItem } from '@/lib/catalog';
import { getProductStatus } from '@/lib/productStatus';
import { getPostageRates, REGIONS, shippingOptionsFor } from '@/lib/postage';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { productId, region } = await req.json();
  const product = await getCatalogItem(productId);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Refuse pieces already sold, or with nothing to charge
  const hasPrice = Boolean(product.stripePrice) || product.price > 0;
  if (product.archived || !hasPrice) {
    return NextResponse.json({ error: 'Product no longer available' }, { status: 400 });
  }

  // Check live status from Redis in case it's been archived since page load
  const status = await getProductStatus(productId);
  if (status.archived) {
    return NextResponse.json({ error: 'Product no longer available' }, { status: 400 });
  }

  // Postage: the buyer picks a region on the product page; Stripe then only
  // accepts addresses in that region and adds that region's postage.
  const rates = await getPostageRates();
  const option = shippingOptionsFor(product, rates).find((o) => o.region === region);
  if (!option) {
    return NextResponse.json(
      { error: 'This piece can’t be posted there. Please get in touch instead.' },
      { status: 400 }
    );
  }
  const destination = REGIONS[option.region];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Older pieces use a price made by hand in Stripe; pieces added through the
  // admin page are charged their stored price directly.
  const lineItem = product.stripePrice
    ? { price: product.stripePrice, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            ...(product.subtitle ? { description: product.subtitle } : {}),
            ...(product.images?.[0] && siteUrl
              ? { images: [new URL(product.images[0], siteUrl).toString()] }
              : {}),
          },
        },
      };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [lineItem],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: destination.countries },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: destination.deliveryName,
          fixed_amount: { amount: Math.round(option.amount * 100), currency: 'gbp' },
        },
      },
    ],
    ...(option.region === 'europe'
      ? {
          custom_text: {
            shipping_address: {
              message:
                'Sent from the UK. Your country may charge import VAT and a handling fee on delivery.',
            },
          },
        }
      : {}),
    success_url: `${siteUrl}/emporium/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/emporium/${product.id}`,
    metadata: {
      productId: product.id,
      region: option.region,
    },
  });

  return NextResponse.json({ url: session.url });
}
