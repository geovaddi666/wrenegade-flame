import EmporiumHero from '@/components/emporium/EmporiumHero';
import EmporiumParticles from '@/components/emporium/EmporiumParticles';
import ProductGrid from '@/components/emporium/ProductGrid';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Emporium Alchymia | Objects of Transmutation',
  description:
    'Handmade fire props, leatherwork and sigil objects. Each piece made once, carrying the trace of its making.',
};

export default function EmporiumPage() {
  return (
    <main className="emporium-page">
      <EmporiumHero />
      <section className="emporium-lower">
        <EmporiumParticles className="emporium-lower-particles" />
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
