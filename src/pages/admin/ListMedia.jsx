import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";
import { getMediaByEvent } from "../../api/media";
import { deleteMedia } from "../../api/media";

export default function ListMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setMessage("Error cargando eventos"));
  }, []);

  const loadMedia = async (id) => {
    setMessage("");
    setLoading(true);
    try {
      const data = await getMediaByEvent(id);
      setMedia(data);
    } catch (e) {
      setMessage("Error cargando media");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEvent = (e) => {
    const id = e.target.value;
    setEventId(id);
    if (id) loadMedia(id);
    else setMedia([]);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este archivo?")) return;

    try {
      await deleteMedia(id);
      setMedia((prev) => prev.filter((m) => m._id !== id));
    } catch (e) {
      setMessage("Error eliminando media");
    }
  };

  const setAsCover = async (imageUrl) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/cover`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coverImage: imageUrl }),
      });

      setMessage("✅ Portada actualizada");
    } catch {
      setMessage("Error asignando portada");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Media por evento</h2>

      <select value={eventId} onChange={handleChangeEvent}>
        <option value="">Seleccionar evento</option>
        {events.map((ev) => (
          <option key={ev._id} value={ev._id}>
            {ev.title}
          </option>
        ))}
      </select>

      {loading && <p>Cargando...</p>}
      {message && <p>{message}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
          marginTop: 20,
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
                style={{ width: "100%", height: 120, objectFit: "cover" }}
              />
            ) : (
              <video
                src={m.secure_url}
                controls
                style={{ width: "100%", height: 120, objectFit: "cover" }}
              />
            )}

            <button
              onClick={() => setAsCover(m.secure_url)}
              style={{
                marginTop: 6,
                background: "#2f4f4f",
                color: "#fff",
                border: "none",
                padding: "6px 8px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Usar como portada
            </button>

            <p style={{ margin: "8px 0 0" }}>💰 ${m.price}</p>
            <button
              onClick={() => handleDelete(m._id)}
              style={{
                marginTop: 8,
                background: "#c0392b",
                color: "#fff",
                border: "none",
                padding: "6px 8px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
