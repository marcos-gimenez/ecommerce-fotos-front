import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminMenu() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <aside className="admin-menu">
      <h2 className="admin-logo">PAMPA FOTO</h2>

      <nav className="admin-nav">
        <NavLink to="/admin/upload">Subir media</NavLink>
        <NavLink to="/admin/media">Gestionar media</NavLink>
        <NavLink to="/admin/sales">Ventas</NavLink>
      </nav>

      <button className="admin-logout" onClick={logout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
