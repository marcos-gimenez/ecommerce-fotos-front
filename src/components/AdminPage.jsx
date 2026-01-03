import AdminGuard from './AdminGuard';
import AdminLayout from './AdminLayout';

export default function AdminPage({ children }) {
  return (
    <AdminGuard>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AdminGuard>
  );
}
