import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo-pampa-foto.png" alt="Pampa Foto" />
        </Link>

        {!isAdmin && (
          <nav className="nav">
            <Link to="/cart">Carrito</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
