// import AdminMenu from './AdminMenu';
// import '../styles/adminLayout.css';

// export default function AdminLayout({ children }) {
//   return (
//     <div className="admin-layout">
//       <AdminMenu />
//       <main className="admin-content">
//         {children}
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import AdminMenu from "./AdminMenu";
import "../styles/adminLayout.css";

export default function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Header mobile */}
      <header className="admin-header-mobile">
        <button
          className="admin-menu-toggle"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
        <span className="admin-header-title">PAMPA FOTO</span>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="admin-menu-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <AdminMenu mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="admin-content">{children}</main>
    </div>
  );
}
