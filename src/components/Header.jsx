import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/header.css';

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo-pampa-foto.png" alt="Pampa Foto" />
        </Link>

        {/* {!isAdmin && (
          <nav className="nav">
            <Link to="/cart">Carrito</Link>
          </nav>
        )} */}
         {!isAdmin && (
          <Link to="/cart" className="cart-button">
            <ShoppingCart size={20} />

            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
