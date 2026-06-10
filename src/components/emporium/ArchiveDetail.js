'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArchiveDetail({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="product-detail">
      <div className="emporium-container">
        <Link href="/emporium/archive" className="product-back">
          ← Return to the Archive
        </Link>
        <div className="product-detail-grid">
          <div className="product-detail-images">
            <div className="product-detail-main-image">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="product-detail-thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={i === activeImage ? 'product-thumb product-thumb-active' : 'product-thumb'}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="120px"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <p className="product-detail-subtitle">{product.subtitle}</p>
            <h1 className="product-detail-name">{product.name}</h1>

            <div className="archive-found-badge">
              <span className="archive-found-glyph">✦</span>
              <span>This artifact has found its person</span>
            </div>

            <div className="product-detail-divider" />

            <div className="product-detail-description">
              {product.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {product.callToAction && (
                <p className="product-detail-cta-line">{product.callToAction}</p>
              )}
            </div>

            <div className="product-detail-divider" />

            <ul className="product-detail-list">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            {product.review && (
              <>
                <div className="product-detail-divider" />
                <div className="archive-review">
                  <p className="archive-review-glyph">✦</p>
                  <blockquote className="archive-review-text">
                    &ldquo;{product.review.text}&rdquo;
                  </blockquote>
                  <p className="archive-review-author">— {product.review.author}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
