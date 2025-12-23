import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeItem, total } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 800, margin: "40px auto" }}>
        <h2>Carrito</h2>
        <p>No hay items en el carrito.</p>
        <Link to="/">Volver a eventos</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Carrito</h2>

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
          }}
        >
          {item.resource_type === "image" ? (
            <img
              src={item.secure_url}
              alt=""
              style={{ width: 120, height: 80, objectFit: "cover" }}
            />
          ) : (
            <video src={item.secure_url} style={{ width: 120, height: 80 }} />
          )}

          <div style={{ flex: 1 }}>
            <p>💰 ${item.price}</p>
          </div>

          <button onClick={() => removeItem(item._id)}>Eliminar</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>

      <Link to="/checkout">
        <button style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}>
          Finalizar compra
        </button>
      </Link>
    </div>
  );
}
