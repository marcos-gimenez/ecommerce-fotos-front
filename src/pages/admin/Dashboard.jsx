import AdminGuard from '../../components/AdminGuard';
import UploadMedia from './UploadMedia';
import { adminLogout } from '../../services/adminAuth';
import '../../styles/admin.css';

export default function AdminDashboard() {
  function handleLogout() {
    adminLogout();
    window.location.href = '/admin/login';
  }

  return (
    <AdminGuard>
      <div className="admin-container">
        <div className="admin-header">
          <h2 className="admin-title">Panel Admin</h2>

          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <UploadMedia />
      </div>
    </AdminGuard>
  );
}
