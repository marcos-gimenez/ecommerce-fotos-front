import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../api/events";
import {
  getMediaByEvent,
  deleteMedia,
  deleteFolder, // 👈 nuevo
} from "../../api/media";

import "../../styles/adminMedia.css";

export default function ListMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [media, setMedia] = useState([]);
  const [folders, setFolders] = useState([]);        // 👈 nuevo
  const [activeFolder, setActiveFolder] = useState(""); // 👈 nuevo
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deletingEvent, setDeletingEvent] = useState(false);

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

      // 👇 derivar carpetas desde la media
      const uniqueFolders = [
        ...new Set(data.map((m) => m.folder || "General")),
      ];
      setFolders(uniqueFolders);
    } catch {
      setMessage("Error cargando media");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEvent = (e) => {
    const id = e.target.value;
    setEventId(id);
    setActiveFolder("");
    if (id) loadMedia(id);
    else setMedia([]);
  };

  const handleDeleteMedia = async (id) => {
    if (!confirm("¿Eliminar este archivo?")) return;

    try {
      await deleteMedia(id);
      setMedia((prev) => prev.filter((m) => m._id !== id));
    } catch {
      setMessage("Error eliminando media");
    }
  };

  const handleDeleteFolder = async () => {
    if (!activeFolder) return;

    const ok = confirm(
      `⚠️ Eliminar carpeta "${activeFolder}"\n\n` +
      `Se borrarán TODOS los archivos.\n\n¿Continuar?`
    );

    if (!ok) return;

    try {
      await deleteFolder(eventId, activeFolder);

      setMedia((prev) => prev.filter((m) => m.folder !== activeFolder));
      setFolders((prev) => prev.filter((f) => f !== activeFolder));
      setActiveFolder("");
      setMessage("✅ Carpeta eliminada");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDeleteEvent = async () => {
    const eventName = events.find((e) => e._id === eventId)?.title;

    const ok = confirm(
      `⚠️ Vas a eliminar el evento "${eventName}"\n\n` +
      `Se borrarán TODAS las fotos y videos.\n\n¿Continuar?`
    );

    if (!ok) return;

    try {
      setDeletingEvent(true);
      await deleteEvent(eventId);

      setEvents((prev) => prev.filter((e) => e._id !== eventId));
      setEventId("");
      setMedia([]);
      setFolders([]);
      setMessage("✅ Evento eliminado correctamente");
    } catch (err) {
      setMessage(err.message || "Error eliminando evento");
    } finally {
      setDeletingEvent(false);
    }
  };

  const setAsCover = async (imageUrl) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/cover`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverImage: imageUrl }),
      });

      setMessage("✅ Portada actualizada");
    } catch {
      setMessage("Error asignando portada");
    }
  };

  const visibleMedia = activeFolder
    ? media.filter((m) => m.folder === activeFolder)
    : media;

  return (
    <div className="admin-media">
      <h2>Media por evento</h2>

      {eventId && (
        <button
          className="event-delete-btn"
          onClick={handleDeleteEvent}
          disabled={deletingEvent}
        >
          {deletingEvent ? "Eliminando evento..." : "Eliminar evento completo"}
        </button>
      )}

      <select value={eventId} onChange={handleChangeEvent}>
        <option value="">Seleccionar evento</option>
        {events.map((ev) => (
          <option key={ev._id} value={ev._id}>
            {ev.title}
          </option>
        ))}
      </select>

      {folders.length > 0 && (
        <div className="admin-folders">
          {folders.map((f) => (
            <button
              key={f}
              className={f === activeFolder ? "active" : ""}
              onClick={() => setActiveFolder(f)}
            >
              {f}
            </button>
          ))}

          {activeFolder && (
            <button
              className="folder-delete-btn"
              onClick={handleDeleteFolder}
            >
              Eliminar carpeta
            </button>
          )}
        </div>
      )}

      {loading && <p className="admin-loading">Cargando...</p>}
      {message && <p className="admin-message">{message}</p>}

      <div className="admin-media-grid">
        {visibleMedia.map((m) => (
          <div key={m._id} className="admin-media-card">
            {m.resource_type === "image" ? (
              <img src={m.secure_url} alt="" />
            ) : (
              <video src={m.secure_url} controls />
            )}

            <button
              className="media-cover-btn"
              onClick={() => setAsCover(m.secure_url)}
            >
              Usar como portada
            </button>

            <p className="media-price">💰 ${m.price}</p>

            <button
              className="media-delete-btn"
              onClick={() => handleDeleteMedia(m._id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
