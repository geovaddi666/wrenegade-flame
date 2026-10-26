import { notFound, redirect } from 'next/navigation';
import ProductDetail from '@/components/emporium/ProductDetail';
import { getProductsWithStatusSafe } from '@/lib/productStatus';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const allProducts = await getProductsWithStatusSafe();
  const product = allProducts.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} | Emporium Alchymia`,
    description: product.subtitle,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const allProducts = await getProductsWithStatusSafe();
  const product = allProducts.find((p) => p.id === id);
  if (!product) notFound();

  // Sold pieces live in the Archive; old links to them land there instead.
  if (product.archived) redirect(`/emporium/archive/${id}`);

  return <ProductDetail product={product} />;
}
