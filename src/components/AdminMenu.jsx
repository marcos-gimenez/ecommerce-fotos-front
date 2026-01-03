// import { NavLink, useNavigate } from 'react-router-dom';

// export default function AdminMenu() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/admin/login');
//   };

//   return (
//     <aside className="admin-menu">
//       <h2 className="admin-logo">PAMPA FOTO</h2>

//       <nav className="admin-nav">
//         <NavLink to="/admin/upload">Subir media</NavLink>
//         <NavLink to="/admin/media">Gestionar media</NavLink>
//         <NavLink to="/admin/sales">Ventas</NavLink>
//         <NavLink to="/admin/create-event">Crear evento</NavLink>
//       </nav>

//       <button className="admin-logout" onClick={logout}>
//         Cerrar sesión
//       </button>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function AdminMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="admin-menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <aside className={`admin-menu ${open ? "open" : ""}`}>
        <h2 className="admin-logo">PAMPA FOTO</h2>

        <nav className="admin-nav">
          <NavLink to="/admin/create-event" onClick={() => setOpen(false)}>
            Crear evento
          </NavLink>
          <NavLink to="/admin/upload" onClick={() => setOpen(false)}>
            Subir media
          </NavLink>
          <NavLink to="/admin/media" onClick={() => setOpen(false)}>
            Gestionar media
          </NavLink>
          <NavLink to="/admin/sales" onClick={() => setOpen(false)}>
            Ventas
          </NavLink>
        </nav>

        <button
          className="admin-logout"
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }}
        >
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}

