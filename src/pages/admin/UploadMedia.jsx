import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";
import { uploadMedia } from "../../api/media";

export default function UploadMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setMessage("Error cargando eventos"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!eventId || files.length === 0) {
      setMessage("Seleccioná evento y archivo");
      return;
    }

    const formData = new FormData();
    formData.append("event", eventId);
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("price", price || 0);

    try {
      setLoading(true);
      await uploadMedia(formData);
      setMessage("✅ ${files.length} archivos subidos correctamente");
      setFiles([]);
      setPrice("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Subir foto / video</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Evento</label>
          <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
            <option value="">Seleccionar evento</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Archivo</label>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
