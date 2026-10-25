/* eslint-disable @next/next/no-img-element */
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <section className="emporium-grid-section">
      <img
        src="/emporium/sigil-rising-flame.png"
        alt=""
        aria-hidden="true"
        className="emporium-side-sigil emporium-side-sigil-left"
      />
      <img
        src="/emporium/sigil-emotional-depth.png"
        alt=""
        aria-hidden="true"
        className="emporium-side-sigil emporium-side-sigil-right"
      />
      <div className="emporium-container">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
