import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/cart.css";

export default function Cart() {
  const { cart, removeItem, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Carrito</h2>
        <p className="cart-empty">No hay archivos en el carrito.</p>
        <Link to="/" className="cart-back">
          Volver a página principal
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito</h2>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <div
              className="cart-preview"
              onContextMenu={(e) => e.preventDefault()}
            >
              {item.resource_type === "image" ? (
                <img
                  src={item.preview_url}
                  alt=""
                  draggable={false}
                />
              ) : (
                <video src={item.preview_url} />
              )}
            </div>

            <div className="cart-info">
              <div className="cart-price">💰 ${item.price}</div>

              <button
                className="cart-remove"
                onClick={() => removeItem(item._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">Total: ${total}</div>

        <Link to="/checkout" className="cart-checkout-btn">
          Finalizar compra
        </Link>
      </div>
    </div>
  );
}
