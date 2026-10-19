import { getProductsWithStatusSafe } from '@/lib/productStatus';
import ArchiveDetail from '@/components/emporium/ArchiveDetail';
import { notFound } from 'next/navigation';

// Always read live sold status from Redis.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const allProducts = await getProductsWithStatusSafe();
  const product = allProducts.find((p) => p.id === id && p.archived);
  if (!product) return {};
  return {
    title: `${product.name} | The Archive | Emporium Alchymia`,
  };
}

export default async function ArchiveProductPage({ params }) {
  const { id } = await params;
  const allProducts = await getProductsWithStatusSafe();
  const product = allProducts.find((p) => p.id === id && p.archived);

  if (!product) notFound();

  return <ArchiveDetail product={product} />;
}
