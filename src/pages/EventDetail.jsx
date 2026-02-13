import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/eventDetail.css";
import "../styles/mediaModal.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const { addItem, removeItem, cart } = useCart();

  const [activeFolder, setActiveFolder] = useState("Todas");
  const [selectedMedia, setSelectedMedia] = useState(null);

  // ===============================
  // Fetch evento + media
  // ===============================
  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.event);
        setMedia(data.media);
      });
  }, [id]);

  // ===============================
  // Teclado (modal)
  // ===============================
  useEffect(() => {
    if (!selectedMedia) return;

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
      if (e.key === "PrintScreen") e.preventDefault();

      const index = filteredMedia.findIndex((m) => m._id === selectedMedia._id);

      if (e.key === "ArrowRight" && index < filteredMedia.length - 1) {
        setSelectedMedia(filteredMedia[index + 1]);
      }

      if (e.key === "ArrowLeft" && index > 0) {
        setSelectedMedia(filteredMedia[index - 1]);
      }

      if (e.key === "Escape") {
        setSelectedMedia(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, media]);

  if (!event) return <p>Cargando evento...</p>;

  // ===============================
  // Carpetas
  // ===============================
  const folders = [
    "Todas",
    ...new Set(media.map((m) => m.folder || "General")),
  ];

  // ===============================
  // Media filtrada
  // ===============================
  const filteredMedia =
    activeFolder === "Todas"
      ? media
      : media.filter((m) => (m.folder || "General") === activeFolder);

  // ===============================
  // Agrupar por carpeta
  // ===============================
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
      {event.description && (
        <p className="event-description">{event.description}</p>
      )}

      {/* Filtros */}
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

      {/* Media */}
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
                  onClick={() => setSelectedMedia(m)}
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

      {/* ===============================
          MODAL
      =============================== */}
      {selectedMedia && (
        <div
          className="media-modal-overlay"
          onClick={() => setSelectedMedia(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className="media-modal"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              className="media-modal-close"
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>

            {/* Flechas */}
            <button
              className="media-nav prev"
              onClick={() => {
                const i = filteredMedia.findIndex(
                  (m) => m._id === selectedMedia._id
                );
                if (i > 0) setSelectedMedia(filteredMedia[i - 1]);
              }}
            >
              ←
            </button>

            <button
              className="media-nav next"
              onClick={() => {
                const i = filteredMedia.findIndex(
                  (m) => m._id === selectedMedia._id
                );
                if (i < filteredMedia.length - 1)
                  setSelectedMedia(filteredMedia[i + 1]);
              }}
            >
              →
            </button>

            {/* Preview */}
            {/* <div className="media-modal-preview"> */}
            <div
              className={`media-modal-preview ${
                selectedMedia.width > selectedMedia.height
                  ? "horizontal"
                  : "vertical"
              }`}
            >
              <span className="media-protected">Preview protegida</span>

              {selectedMedia.resource_type === "image" ? (
                <img src={selectedMedia.preview_url} draggable={false} alt="" />
              ) : (
                <video src={selectedMedia.preview_url} controls />
              )}
            </div>

            {/* Info */}
            <div className="media-modal-info">
              <div className="media-modal-price">${selectedMedia.price}</div>

              <div className="media-modal-meta">
                {selectedMedia.width && selectedMedia.height && (
                  <>
                    Resolución: {selectedMedia.width}px × {selectedMedia.height}
                    px
                    <br />
                    Orientación:{" "}
                    {selectedMedia.width > selectedMedia.height
                      ? "Horizontal"
                      : selectedMedia.height > selectedMedia.width
                      ? "Vertical"
                      : "Cuadrada"}
                    <br />
                  </>
                )}
                Formato: {selectedMedia.format?.toUpperCase()}
              </div>

              <p className="media-modal-note">
                Archivo a descargar sin marca de agua y en alta resolución.
              </p>

              <div className="media-modal-actions">
                <button
                  className={`media-btn ${
                    cart.find((i) => i._id === selectedMedia._id)
                      ? "in-cart"
                      : ""
                  }`}
                  onClick={() => {
                    const inCart = cart.find(
                      (i) => i._id === selectedMedia._id
                    );
                    inCart
                      ? removeItem(selectedMedia._id)
                      : addItem(selectedMedia);
                  }}
                >
                  {cart.find((i) => i._id === selectedMedia._id)
                    ? "✓ En carrito"
                    : "🛒 Añadir"}
                </button>

                <button
                  className="media-btn secondary"
                  onClick={() => setSelectedMedia(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
