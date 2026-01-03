import { useEffect, useState } from "react";
import { getEvents, deleteEvent, updateEvent } from "../../api/events";
import {
  getMediaByEvent,
  deleteMedia,
  deleteFolder, // 👈 nuevo
  updateMedia,
} from "../../api/media";

import "../../styles/adminMedia.css";

export default function ListMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [media, setMedia] = useState([]);
  const [folders, setFolders] = useState([]); // 👈 nuevo
  const [activeFolder, setActiveFolder] = useState(""); // 👈 nuevo
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deletingEvent, setDeletingEvent] = useState(false);
  const currentEvent = events.find((e) => e._id === eventId);

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
            <button className="folder-delete-btn" onClick={handleDeleteFolder}>
              Eliminar carpeta
            </button>
          )}
        </div>
      )}

      {loading && <p className="admin-loading">Cargando...</p>}
      {message && <p className="admin-message">{message}</p>}

      {eventId && currentEvent && (
        <div className="event-edit">
          <input
            value={currentEvent.title}
            onChange={(e) =>
              setEvents((prev) =>
                prev.map((ev) =>
                  ev._id === eventId ? { ...ev, title: e.target.value } : ev
                )
              )
            }
          />

          <input
            type="date"
            value={currentEvent.date?.slice(0, 10)}
            onChange={(e) =>
              setEvents((prev) =>
                prev.map((ev) =>
                  ev._id === eventId ? { ...ev, date: e.target.value } : ev
                )
              )
            }
          />

          <textarea
            value={currentEvent.description || ""}
            onChange={(e) =>
              setEvents((prev) =>
                prev.map((ev) =>
                  ev._id === eventId
                    ? { ...ev, description: e.target.value }
                    : ev
                )
              )
            }
          />

          <button
            onClick={() =>
              updateEvent(eventId, {
                title: currentEvent.title,
                date: currentEvent.date,
                description: currentEvent.description,
              }).then(() => setMessage("✅ Evento actualizado"))
            }
          >
            Guardar cambios
          </button>
        </div>
      )}

      <div className="admin-media-grid">
        {visibleMedia.map((m) => (
          <div key={m._id} className="admin-media-card">
            {m.resource_type === "image" ? (
              <img src={m.secure_url} alt="" />
            ) : (
              <video src={m.secure_url} controls />
            )}

            <input
              type="number"
              value={m.price}
              onChange={(e) =>
                setMedia((prev) =>
                  prev.map((x) =>
                    x._id === m._id ? { ...x, price: e.target.value } : x
                  )
                )
              }
            />

            <input
              type="text"
              value={m.folder}
              onChange={(e) =>
                setMedia((prev) =>
                  prev.map((x) =>
                    x._id === m._id ? { ...x, folder: e.target.value } : x
                  )
                )
              }
            />

            <button
              onClick={() =>
                updateMedia(m._id, {
                  price: Number(m.price),
                  folder: m.folder,
                }).then(() => {
                  setMessage("✅ Media actualizada");
                  loadMedia(eventId);
                })
              }
            >
              Guardar
            </button>

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
