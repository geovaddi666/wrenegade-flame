import { getProductsWithStatusSafe } from '@/lib/productStatus';
import ArchiveGallery from '@/components/emporium/ArchiveGallery';

// Always read live sold status from Redis.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'The Archive | Emporium Alchymia',
  description: 'Artefacts that have found their person. Each piece remembered.',
};

export default async function ArchivePage() {
  const allProducts = await getProductsWithStatusSafe();
  const archived = allProducts.filter((p) => p.archived);

  return (
    <main className="emporium-page">
      <section className="archive-hero">
        <p className="emporium-eyebrow">Emporium Alchymia</p>
        <h1 className="emporium-hero-title">The Archive</h1>
        <div className="emporium-hero-divider">
          <span className="emporium-divider-line" />
          <span className="emporium-divider-glyph">✦</span>
          <span className="emporium-divider-line" />
        </div>
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
