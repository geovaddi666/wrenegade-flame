'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const touchStart = useRef(null);
  const swiped = useRef(false);
  const count = product.images.length;

  const step = (dir) => setActiveImage((i) => (i + dir + count) % count);

  // Swipe left/right on touch screens to change photo.
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    swiped.current = false;
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current || count < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      step(dx < 0 ? 1 : -1);
    }
    touchStart.current = null;
  };
  // A swipe shouldn't also count as a tap that opens the product page.
  const onImageClick = (e) => {
    if (swiped.current) {
      e.preventDefault();
      swiped.current = false;
    }
  };

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link
          href={`/emporium/${product.id}`}
          className="product-card-image-wrap"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={onImageClick}
        >
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
          {count > 1 && (
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

        {count > 1 && (
          <>
            <button
              type="button"
              className="photo-arrow photo-arrow-prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button
              type="button"
              className="photo-arrow photo-arrow-next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
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
          Behold the Artifact
          <span className="product-card-arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
