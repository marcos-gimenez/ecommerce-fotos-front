import AdminGuard from '../../components/AdminGuard';
import UploadMedia from './UploadMedia';

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <UploadMedia />
    </AdminGuard>
  );
}
