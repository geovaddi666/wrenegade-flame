import { getProductsWithStatus } from '@/lib/productStatus';
import ArchiveDetail from '@/components/emporium/ArchiveDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const allProducts = await getProductsWithStatus();
  const product = allProducts.find((p) => p.id === id && p.archived);
  if (!product) return {};
  return {
    title: `${product.name} | The Archive | Emporium Alchymia`,
  };
}

export default async function ArchiveProductPage({ params }) {
  const { id } = await params;
  const allProducts = await getProductsWithStatus();
  const product = allProducts.find((p) => p.id === id && p.archived);

  if (!product) notFound();

  return <ArchiveDetail product={product} />;
}
