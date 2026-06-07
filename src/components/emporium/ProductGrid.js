import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <section className="emporium-grid-section">
      <div className="emporium-container">
        <h2 className="emporium-section-title">The Collection</h2>
        <p className="emporium-section-subtitle">
          Each creation exists once. When it finds its person, it is gone.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
