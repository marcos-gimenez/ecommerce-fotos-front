import { useState } from "react";
import { createEvent } from "../../api/events";
import { uploadMedia } from "../../api/media";
import AdminPage from "../../components/AdminPage";
import "../../styles/adminCreateEvent.css";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [folder, setFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !date) {
      setMessage("Completá título y fecha");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Crear evento
      const event = await createEvent({
        title,
        date,
        description,
      });

      // 2️⃣ Subir media (si hay)
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("event", event._id);
        formData.append("price", price || 0);
        formData.append("folder", folder || "General");

        files.forEach((file) => {
          formData.append("files", file);
        });

        await uploadMedia(formData);
      }

      setMessage("✅ Evento creado correctamente");
      setTitle("");
      setDate("");
      setDescription("");
      setFiles([]);
      setPrice("");
      setFolder("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPage>
      <div className="admin-create-event">
        <h2>Crear evento</h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Título del evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />

          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Carpeta (opcional)"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />

          <button disabled={loading}>
            {loading ? "Creando..." : "Crear evento"}
          </button>
        </form>

        {message && <p className="admin-message">{message}</p>}
      </div>
    </AdminPage>
  );
}
