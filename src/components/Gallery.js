'use client';

import { useState } from 'react';
import Image from 'next/image';

const IMAGES = [
  '468A2500.00_47_20_43.Still002.jpg',
  'PXL_20260919_212102814.jpg',
  'IMG_3832.jpg',
  'PXL_20250704_215213959_exported_77369.jpg',
  'PXL_20250921_221608835.jpg',
  'FB_IMG_1759998453043.jpg',
  'IMG_3800.jpg',
  'PXL_20251023_190358677_exported_25449.jpg',
  'IMG-20250117-WA0001.jpg',
  'PXL_20250503_222939728_exported_7334.jpg',
  'Ostara_1_52_2.jpg',
  'FB_IMG_1759999768787.jpg',
  'IMG-20250212-WA0100.jpg',
  'IMG_3802.jpg',
  'IMG_3827.jpg',
  'IMG_4253.jpg',
  'PXL_20250401_195852358_exported_19241~2.jpg',
  'PXL_20251101_182158755_exported_136808.jpg',
  'swordeditinstag.00_00_26_26.Still002.jpg',
];

const INITIAL_COUNT = 10;
const SIZES = '(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const visibleImages = expanded ? IMAGES : IMAGES.slice(0, INITIAL_COUNT);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Performance Gallery</h2>
        <div className="gallery-grid">
          {visibleImages.map((name, index) => (
            <div
              key={name}
              className={
                index >= INITIAL_COUNT
                  ? 'gallery-item gallery-item-reveal'
                  : 'gallery-item'
              }
              onClick={() => setActiveImage(name)}
            >
              <Image
                src={`/gallery/${name}`}
                alt="Fire performance"
                width={0}
                height={0}
                sizes={SIZES}
              />
            </div>
          ))}
        </div>
        {IMAGES.length > INITIAL_COUNT && (
          <div className="gallery-more">
            <button
              type="button"
              className="cta-button"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>

      {activeImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close"
              onClick={() => setActiveImage(null)}
            >
              &times;
            </button>
            <Image
              src={`/gallery/${activeImage}`}
              alt="Fire performance"
              fill
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
