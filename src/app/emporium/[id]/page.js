import { notFound } from 'next/navigation';
import ProductDetail from '@/components/emporium/ProductDetail';
import { products, getProductById } from '@/lib/products';

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};
  return {
    title: `${product.name} | Emporium Alchymia`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
