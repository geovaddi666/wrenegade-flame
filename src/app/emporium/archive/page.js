import { getProductsWithStatus } from '@/lib/productStatus';
import ArchiveGallery from '@/components/emporium/ArchiveGallery';

export const metadata = {
  title: 'The Archive | Emporium Alchymia',
  description: 'Artefacts that have found their person. Each piece remembered.',
};

export default async function ArchivePage() {
  const allProducts = await getProductsWithStatus();
  const archived = allProducts.filter((p) => p.archived);

  return (
    <main className="emporium-page">
      <section className="archive-hero">
        <p className="emporium-eyebrow">Emporium Alchymia</p>
        <h1 className="emporium-hero-title">The Archive</h1>
        <p className="emporium-hero-subtitle">
          These artifacts have found their person.
        </p>
        <div className="emporium-hero-divider">
          <span className="emporium-divider-line" />
          <span className="emporium-divider-glyph">✦</span>
          <span className="emporium-divider-line" />
        </div>
        <p className="emporium-hero-body">
          Each piece is made once and never remade. Here they are remembered.
        </p>
      </section>

      <section className="emporium-lower">
        {archived.length === 0 ? (
          <div className="archive-empty">
            <p>The archive is empty. All artifacts are still seeking their person.</p>
          </div>
        ) : (
          <ArchiveGallery products={archived} />
        )}
      </section>
    </main>
  );
}
