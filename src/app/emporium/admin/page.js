import { isAdmin } from '@/lib/adminAuth';
import { getProductsWithStatus } from '@/lib/productStatus';
import AdminLogin from '@/components/emporium/admin/AdminLogin';
import AdminDashboard from '@/components/emporium/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Keeper’s Room | Emporium Alchymia',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <main className="emporium-page admin-page">
        <AdminLogin />
      </main>
    );
  }

  // No silent fallback here: if Redis is down, the admin should see an error
  // rather than edit a stale list.
  let products = null;
  let loadError = null;
  try {
    products = await getProductsWithStatus();
  } catch (err) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    console.error('Admin: could not load products', err);
    loadError = 'Couldn’t reach the product database. Refresh to try again.';
  }

  return (
    <main className="emporium-page admin-page">
      <AdminDashboard products={products || []} loadError={loadError} />
    </main>
  );
}
