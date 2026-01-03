import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";
import { uploadMedia } from "../../api/media";
import "../../styles/admin.css";

export default function UploadMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  useEffect(() => {
    if (!eventId) return;

    fetch(`${API_URL}/media/folders?event=${eventId}`)
      .then((res) => res.json())
      .then(setFolders);
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!eventId || files.length === 0) {
      setMessage("Seleccioná evento y archivos");
      return;
    }

    const formData = new FormData();
    formData.append("event", eventId);
    formData.append("price", price || 0);

    const finalFolder =
      folder === "__new" ? newFolder || "General" : folder || "General";
    formData.append("folder", finalFolder);

    files.forEach((f) => formData.append("files", f));

    try {
      setLoading(true);
      await uploadMedia(formData);
      setMessage("✅ Archivos subidos correctamente");
      setFiles([]);
      setPrice("");
      setFolder("");
      setNewFolder("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Subir media</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Evento</label>
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">Seleccionar evento</option>
          {events.map((e) => (
            <option key={e._id} value={e._id}>
              {e.title}
            </option>
          ))}
        </select>

        <label>Archivos</label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles([...e.target.files])}
        />

        <label>Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Carpeta</label>
        <select value={folder} onChange={(e) => setFolder(e.target.value)}>
          <option value="">General</option>
          {folders.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
          <option value="__new">➕ Nueva carpeta</option>
        </select>

        {folder === "__new" && (
          <input
            placeholder="Nombre de la carpeta"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
        )}

        <button className="admin-submit" disabled={loading}>
          {loading ? "Subiendo..." : "Subir media"}
        </button>
      </form>

      {message && <p className="admin-success">{message}</p>}
    </div>
  );
}
