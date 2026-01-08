// import { useState } from 'react';
// import { useCart } from '../context/CartContext';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Checkout() {
//   const { cart, total, clearCart } = useCart();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!name || !email || cart.length === 0) {
//       setError('Completá nombre, email y carrito');
//       return;
//     }

//     try {
//       setLoading(true);

//       // 1 Crear orden
//       const orderRes = await fetch(`${API_URL}/orders`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           items: cart.map((i) => i._id),
//           total,
//         }),
//       });

//       if (!orderRes.ok) throw new Error('Error creando orden');
//       const order = await orderRes.json();

//       // 2 Crear preferencia MP
//       const prefRes = await fetch(`${API_URL}/payments/preference`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderId: order._id }),
//       });

//       if (!prefRes.ok) throw new Error('Error creando pago');
//       const pref = await prefRes.json();

//       clearCart();

//       // 3 Redirigir a MP
//       window.location.href = pref.init_point;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: '40px auto' }}>
//       <h2>Checkout</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nombre</label>
//           <input value={name} onChange={(e) => setName(e.target.value)} />
//         </div>

//         <div>
//           <label>Email</label>
//           <input value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>

//         <p>Total: ${total}</p>

//         <button disabled={loading}>
//           {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
//         </button>
//       </form>

//       {error && <p>{error}</p>}
//     </div>
//   );
// }

import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/checkout.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Checkout() {
  const { cart, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // 👈 NUEVO
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ===============================
    // Validaciones
    // ===============================
    if (!name || !email || !phone) {
      setError("Completá nombre, email y WhatsApp");
      return;
    }

    if (!/^\d{10,12}$/.test(phone)) {
      setError("Ingresá un número válido (solo números)");
      return;
    }

    if (cart.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    const fullPhone = `549${phone}`; // 👈 formato final

    try {
      setLoading(true);

      // 1️⃣ Crear orden
      const orderRes = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone, // 👈 NUEVO
          items: cart.map((i) => i._id),
        }),
      });

      if (!orderRes.ok) {
        throw new Error("Error creando orden");
      }

      const order = await orderRes.json();

      // 2️⃣ Crear preferencia MP
      const prefRes = await fetch(`${API_URL}/payments/preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order._id }),
      });

      if (!prefRes.ok) {
        throw new Error("Error iniciando pago");
      }

      const pref = await prefRes.json();

      clearCart();

      // 3️⃣ Redirigir a Mercado Pago
      window.location.href = pref.init_point;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar compra</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label>WhatsApp</label>

          <div className="phone-input">
            <span className="phone-prefix">+54 9</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              placeholder="11 3456 7890"
            />
          </div>

          <small className="phone-help">
            Te enviaremos los links por email
            {/* falta agregar WhatsApp */}
          </small>
        </div>

        <div className="checkout-total">
          Total: <strong>${total}</strong>
        </div>

        <button className="checkout-submit" disabled={loading}>
          {loading ? "Redirigiendo…" : "Pagar con Mercado Pago"}
        </button>
      </form>

      {error && <p className="checkout-error">{error}</p>}
    </div>
  );
}

