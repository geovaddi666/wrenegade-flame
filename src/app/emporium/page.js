import EmporiumHero from '@/components/emporium/EmporiumHero';
import EmporiumParticles from '@/components/emporium/EmporiumParticles';
import ProductGrid from '@/components/emporium/ProductGrid';
import { getProductsWithStatusSafe } from '@/lib/productStatus';

export const metadata = {
  title: 'Emporium Alchymia | Objects of Transmutation',
  description:
    'Handmade fire props, leatherwork and sigil objects. Each piece made once, carrying the trace of its making.',
};

// Always read live sold status, so a piece sold through the site leaves the
// shop (and appears in the Archive) as soon as Stripe confirms the sale.
export const dynamic = 'force-dynamic';

export default async function EmporiumPage() {
  const allProducts = await getProductsWithStatusSafe();
  return (
    <main className="emporium-page">
      <EmporiumHero />
      <section className="emporium-lower">
        <EmporiumParticles className="emporium-lower-particles" />
        <ProductGrid products={allProducts.filter((p) => !p.archived)} />
      </section>
    </main>
  );
}
