import redis from './redis';
import { products as staticProducts } from './products';
import { getCatalog, setCatalogArchived } from './catalog';

// Get the live status of a product from Redis
// Returns { archived: bool, review: { author, text } | null }
export async function getProductStatus(productId) {
  const data = await redis.get(`product:${productId}`);
  return data || { archived: false, review: null };
}

function mergeStatus(product, status) {
  const archived = Boolean(status?.archived || product.archived);
  return {
    ...product,
    archived,
    review: status?.review || null,
    inStock: !archived,
  };
}

// Get all products (from the catalogue) with their live status merged in
export async function getProductsWithStatus() {
  const catalog = await getCatalog();
  const statuses = await Promise.all(catalog.map((p) => getProductStatus(p.id)));
  return catalog.map((product, i) => mergeStatus(product, statuses[i]));
}

// Same as getProductsWithStatus, but if Redis can't be reached the pages
// fall back to products.js instead of crashing.
export async function getProductsWithStatusSafe() {
  try {
    return await getProductsWithStatus();
  } catch (err) {
    // Let Next.js's own "render this page live" signal pass through.
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    console.error('Redis unavailable, using static product list:', err);
    return staticProducts.map((product) => mergeStatus(product, null));
  }
}

// Mark a product as archived (called by the Stripe webhook and "sold in person")
export async function archiveProduct(productId) {
  const existing = await getProductStatus(productId);
  await redis.set(`product:${productId}`, {
    ...existing,
    archived: true,
  });
}

// Put a product back in the shop (admin "return to shop")
export async function unarchiveProduct(productId) {
  const existing = await getProductStatus(productId);
  await redis.set(`product:${productId}`, {
    ...existing,
    archived: false,
  });
  // Pieces seeded from products.js may carry their own sold flag too.
  await setCatalogArchived(productId, false);
}

// Forget a product's status entirely (when it's removed)
export async function clearProductStatus(productId) {
  await redis.del(`product:${productId}`);
}

// Add a review to an archived product
export async function addReview(productId, author, text) {
  const existing = await getProductStatus(productId);
  await redis.set(`product:${productId}`, {
    ...existing,
    review: { author, text },
  });
}
