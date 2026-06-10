import redis from './redis';
import { products } from './products';

// Get the live status of a product from Redis
// Returns { archived: bool, review: { author, text } | null }
export async function getProductStatus(productId) {
  const data = await redis.get(`product:${productId}`);
  return data || { archived: false, review: null };
}

// Get all products with their live status merged in
export async function getProductsWithStatus() {
  const statuses = await Promise.all(
    products.map((p) => getProductStatus(p.id))
  );
  return products.map((product, i) => ({
    ...product,
    archived: statuses[i].archived || false,
    review: statuses[i].review || null,
    inStock: !statuses[i].archived,
  }));
}

// Mark a product as archived (called by webhook)
export async function archiveProduct(productId) {
  const existing = await getProductStatus(productId);
  await redis.set(`product:${productId}`, {
    ...existing,
    archived: true,
  });
}

// Add a review to an archived product
export async function addReview(productId, author, text) {
  const existing = await getProductStatus(productId);
  await redis.set(`product:${productId}`, {
    ...existing,
    review: { author, text },
  });
}
