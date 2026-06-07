import Stripe from 'stripe';
import { getProductById } from '@/lib/products';

export async function POST(request) {
  try {
    // Instantiate inside the handler so `next build` doesn't fail when the
    // key is absent at build time.
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Checkout failed' }, { status: 500 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { productId } = await request.json();
    const product = getProductById(productId);

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: product.name,
              description: product.subtitle,
              images: product.images.map(
                (img) => `${process.env.NEXT_PUBLIC_SITE_URL}${img}`
              ),
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/emporium/success?product=${productId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/emporium/${productId}`,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'NL', 'IE'],
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return Response.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
