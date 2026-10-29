'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const formatPostage = (amount) => (amount === 0 ? 'Free' : `£${amount.toFixed(2)}`);

export default function ProductDetail({ product, shipping = [] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState('');
  // Where it's being posted. With only one option, it's chosen already.
  const [region, setRegion] = useState(shipping.length === 1 ? shipping[0].region : null);

  const canPost = shipping.length > 0;
  const chosen = shipping.find((s) => s.region === region);

  const handleBuy = async () => {
    if (!chosen) return;
    setPurchasing(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, region }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setPurchasing(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
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
            {product.inStock && canPost && (
              <div className="postage-choice" role="radiogroup" aria-label="Deliver to">
                <span className="postage-choice-label">Deliver to</span>
                <div className="postage-choice-options">
                  {shipping.map((s) => (
                    <button
                      key={s.region}
                      type="button"
                      role="radio"
                      aria-checked={region === s.region}
                      className={region === s.region ? 'postage-option postage-option-active' : 'postage-option'}
                      onClick={() => setRegion(s.region)}
                      disabled={purchasing}
                    >
                      <span>{s.label}</span>
                      <span className="postage-option-price">+ {formatPostage(s.amount)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.inStock && !canPost ? (
              <a className="emporium-buy-button emporium-contact-button" href={`mailto:flame@wrenegade.co.uk?subject=${encodeURIComponent(product.name)}`}>
                Get in touch to acquire
              </a>
            ) : (
              <button
                className="emporium-buy-button"
                onClick={handleBuy}
                disabled={purchasing || !product.inStock || !chosen}
              >
                {purchasing
                  ? 'Opening the portal...'
                  : !product.inStock
                  ? 'This Artifact has found its person'
                  : chosen
                  ? 'Acquire this Artifact'
                  : 'Choose where it’s going'}
              </button>
            )}
            {error && <p className="product-detail-error" role="alert">{error}</p>}
            <p className="product-detail-subtitle">{product.subtitle}</p>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">{product.priceDisplay}</p>
            <div className="product-detail-divider" />
            <ul className="product-detail-list">
              {(product.details || []).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <p className="product-detail-note">
              Handmade in Devon. Ships within 3–5 days. Posting outside the UK and
              Europe, or questions?{' '}
              <a href="mailto:flame@wrenegade.co.uk">flame@wrenegade.co.uk</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
