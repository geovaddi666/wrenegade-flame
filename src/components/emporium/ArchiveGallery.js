import Link from 'next/link';

export default function ArchiveGallery({ products }) {
  return (
    <div className="emporium-container">
      <div className="archive-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/emporium/archive/${product.id}`}
            className="archive-card"
          >
            <div className="archive-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[0]} alt={product.name} loading="lazy" />
              <div className="archive-card-overlay" />
            </div>
            <div className="archive-card-name">
              <span>{product.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
