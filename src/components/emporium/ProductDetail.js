'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [purchasing, setPurchasing] = useState(false);

  const handleBuy = async () => {
    setPurchasing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setPurchasing(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setPurchasing(false);
    }
  };

  return (
    <div className="product-detail">
      <div className="emporium-container">
        <Link href="/emporium" className="product-back">
          ← Return to the Emporium
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
            <p className="product-detail-price">{product.priceDisplay}</p>
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
            <button
              className="emporium-buy-button"
              onClick={handleBuy}
              disabled={purchasing || !product.inStock}
            >
              {purchasing
                ? 'Opening the portal...'
                : product.inStock
                ? 'Acquire this Creation'
                : 'This Creation has found its person'}
            </button>
            <p className="product-detail-note">
              Handmade in Devon. Ships within 3–5 days. Questions?{' '}
              <a href="mailto:flame@wrenegade.co.uk">flame@wrenegade.co.uk</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
