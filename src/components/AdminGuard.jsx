export default function AdminGuard({ children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    window.location.href = '/admin/login';
    return null;
  }

  return children;
}
