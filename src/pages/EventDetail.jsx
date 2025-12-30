import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const { addItem, cart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.event);
        setMedia(data.media);
      });
  }, [id]);

  if (!event) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Link to="/cart">🛒 Ver carrito</Link>
      </div>

      <h2>{event.title}</h2>
      <p>{new Date(event.date).toLocaleDateString()}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {media.map((m) => (          
          <div
            key={m._id}
            style={{
              border: "1px solid #ddd",
              padding: 8,
              borderRadius: 6,
            }}
          >
            {m.resource_type === "image" ? (
              <img
                src={m.secure_url}
                alt=""
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            ) : (
              <video
                src={m.secure_url}
                controls
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            )}

            <p>💰 ${m.price}</p>

            <button
              onClick={() => addItem(m)}
              disabled={cart.find((i) => i._id === m._id)}
            >
              {cart.find((i) => i._id === m._id)
                ? "Agregado"
                : "Agregar al carrito"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
