import AdminMenu from './AdminMenu';
import '../styles/adminLayout.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminMenu />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
