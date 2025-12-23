import { useState } from 'react';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL;

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || cart.length === 0) {
      setError('Completá nombre, email y carrito');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Crear orden
      const orderRes = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          items: cart.map((i) => i._id),
          total,
        }),
      });

      if (!orderRes.ok) throw new Error('Error creando orden');
      const order = await orderRes.json();

      // 2️⃣ Crear preferencia MP
      const prefRes = await fetch(`${API_URL}/payments/preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order._id }),
      });

      if (!prefRes.ok) throw new Error('Error creando pago');
      const pref = await prefRes.json();

      clearCart();

      // 3️⃣ Redirigir a MP
      window.location.href = pref.init_point;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <p>Total: ${total}</p>

        <button disabled={loading}>
          {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
