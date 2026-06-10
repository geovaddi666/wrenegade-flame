import Link from 'next/link';
import Image from 'next/image';

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
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
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
