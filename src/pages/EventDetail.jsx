import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/eventDetail.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const { addItem, removeItem, cart } = useCart();
  const [activeFolder, setActiveFolder] = useState("Todas");

  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.event);
        setMedia(data.media);
      });
  }, [id]);

  if (!event) return <p>Cargando evento...</p>;

  // 📁 Carpetas derivadas de la media
  const folders = [
    "Todas",
    ...new Set(media.map((m) => m.folder || "General")),
  ];

  // 🔍 Media filtrada
  const filteredMedia =
    activeFolder === "Todas"
      ? media
      : media.filter((m) => (m.folder || "General") === activeFolder);

  console.log("MEDIA:", media);

  const grouped = filteredMedia.reduce((acc, m) => {
    const folder = m.folder || "General";
    acc[folder] = acc[folder] || [];
    acc[folder].push(m);
    return acc;
  }, {});

  return (
    <div className="container">
      {/* Volver */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Volver
      </button>

      <h1 className="page-title">{event.title}</h1>
      <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>

      {/* 📁 Filtros */}
      <div className="folder-filters">
        {folders.map((folder) => (
          <button
            key={folder}
            className={`folder-btn ${activeFolder === folder ? "active" : ""}`}
            onClick={() => setActiveFolder(folder)}
          >
            {folder}
          </button>
        ))}
      </div>

      {/* 🖼️ Media */}

      {Object.entries(grouped).map(([folderName, items]) => (
        <div key={folderName}>
          <h2 className="section-title">
            {folderName}
            <span className="folder-count"> · {items.length} archivos</span>
          </h2>

          <div className="media-grid">
            {items.map((m) => {
              const inCart = cart.find((i) => i._id === m._id);

              return (
                <div
                  key={m._id}
                  className={`media-card ${inCart ? "selected" : ""}`}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {m.resource_type === "image" ? (
                    <img src={m.preview_url} draggable={false} />
                  ) : (
                    <video src={m.preview_url} />
                  )}

                  <div className="media-overlay">
                    <span className="media-price">${m.price}</span>

                    <button
                      className={`media-btn ${inCart ? "in-cart" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        inCart ? removeItem(m._id) : addItem(m);
                      }}
                    >
                      {inCart ? "✓ En carrito" : "🛒 Añadir"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
    </div>
  );
}
