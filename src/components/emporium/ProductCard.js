'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <article className="product-card">
      <Link href={`/emporium/${product.id}`} className="product-card-image-wrap">
        <div className="product-card-image">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="product-card-overlay" />
        </div>
        {product.images.length > 1 && (
          <div className="product-card-dots">
            {product.images.map((_, i) => (
              <button
                key={i}
                className={i === activeImage ? 'product-dot product-dot-active' : 'product-dot'}
                onClick={(e) => { e.preventDefault(); setActiveImage(i); }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </Link>
      <div className="product-card-body">
        <div className="product-card-header">
          <div>
            <h2 className="product-card-name">{product.name}</h2>
            <p className="product-card-subtitle">{product.subtitle}</p>
          </div>
          <p className="product-card-price">{product.priceDisplay}</p>
        </div>
        <p className="product-card-desc">{product.shortDescription}</p>
        <Link href={`/emporium/${product.id}`} className="product-card-link">
          Behold the Creation
          <span className="product-card-arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
