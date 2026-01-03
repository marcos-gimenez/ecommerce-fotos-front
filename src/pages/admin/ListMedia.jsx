import { useEffect, useState } from "react";
import {
  getEvents,
  deleteEvent,
  updateEvent,
} from "../../api/events";
import {
  getMediaByEvent,
  deleteMedia,
  deleteFolder,
  updateMedia,
} from "../../api/media";

import {
  confirmDanger,
  successAlert,
  errorAlert,
} from "../../utils/alerts";

import "../../styles/adminMedia.css";

export default function ListMedia() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [media, setMedia] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(false);

  const currentEvent = events.find((e) => e._id === eventId);

  // ===============================
  // Cargar eventos
  // ===============================
  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => errorAlert("Error cargando eventos"));
  }, []);

  // ===============================
  // Cargar media por evento
  // ===============================
  const loadMedia = async (id) => {
    setLoading(true);
    setActiveFolder("");

    try {
      const data = await getMediaByEvent(id);
      setMedia(data);

      const uniqueFolders = [
        ...new Set(data.map((m) => m.folder || "General")),
      ];
      setFolders(uniqueFolders);
    } catch {
      errorAlert("Error cargando media");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Cambio de evento
  // ===============================
  const handleChangeEvent = (e) => {
    const id = e.target.value;
    setEventId(id);

    if (!id) {
      setMedia([]);
      setFolders([]);
      setActiveFolder("");
      return;
    }

    loadMedia(id);
  };

  // ===============================
  // Eliminar media
  // ===============================
  const handleDeleteMedia = async (id) => {
    const result = await confirmDanger({
      title: "Eliminar archivo",
      text: "Este archivo se eliminará definitivamente.",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMedia(id);
      setMedia((prev) => prev.filter((m) => m._id !== id));
      successAlert("Archivo eliminado");
    } catch {
      errorAlert("Error eliminando media");
    }
  };

  // ===============================
  // Eliminar carpeta
  // ===============================
  const handleDeleteFolder = async () => {
    const result = await confirmDanger({
      title: `Eliminar carpeta "${activeFolder}"`,
      text: "Se eliminarán todos los archivos de esta carpeta.",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteFolder(eventId, activeFolder);

      setMedia((prev) => prev.filter((m) => m.folder !== activeFolder));
      setFolders((prev) => prev.filter((f) => f !== activeFolder));
      setActiveFolder("");

      successAlert("Carpeta eliminada");
    } catch (err) {
      errorAlert(err.message);
    }
  };

  // ===============================
  // Eliminar evento
  // ===============================
  const handleDeleteEvent = async () => {
    const result = await confirmDanger({
      title: "Eliminar evento",
      text: "Se eliminarán TODAS las fotos y videos del evento.",
      confirmText: "Eliminar evento",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingEvent(true);
      await deleteEvent(eventId);

      setEvents((prev) => prev.filter((e) => e._id !== eventId));
      setEventId("");
      setMedia([]);
      setFolders([]);
      setActiveFolder("");

      successAlert("Evento eliminado");
    } catch (err) {
      errorAlert(err.message);
    } finally {
      setDeletingEvent(false);
    }
  };

  // ===============================
  // Setear portada
  // ===============================
  const setAsCover = async (imageUrl) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/cover`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverImage: imageUrl }),
      });

      successAlert("Portada actualizada");
    } catch {
      errorAlert("Error asignando portada");
    }
  };

  // ===============================
  // Media visible según carpeta
  // ===============================
  const visibleMedia = activeFolder
    ? media.filter((m) => m.folder === activeFolder)
    : media;

  // ===============================
  // Render
  // ===============================
  return (
    <div className="admin-media">
      <h2>Gestionar media</h2>

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
          <button
            className={!activeFolder ? "active" : ""}
            onClick={() => setActiveFolder("")}
          >
            Todas
          </button>

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

      {eventId && currentEvent && (
        <div className="event-edit">
          <input
            value={currentEvent.title}
            onChange={(e) =>
              setEvents((prev) =>
                prev.map((ev) =>
                  ev._id === eventId
                    ? { ...ev, title: e.target.value }
                    : ev
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
                  ev._id === eventId
                    ? { ...ev, date: e.target.value }
                    : ev
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
              })
                .then(() => successAlert("Evento actualizado"))
                .catch(() => errorAlert("Error actualizando evento"))
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

            <select
              value={m.folder}
              onChange={(e) =>
                setMedia((prev) =>
                  prev.map((x) =>
                    x._id === m._id
                      ? { ...x, folder: e.target.value }
                      : x
                  )
                )
              }
            >
              {folders.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={m.price}
              onChange={(e) =>
                setMedia((prev) =>
                  prev.map((x) =>
                    x._id === m._id
                      ? { ...x, price: e.target.value }
                      : x
                  )
                )
              }
            />

            <button className="media-save-btn"
              onClick={() =>
                updateMedia(m._id, {
                  price: Number(m.price),
                  folder: m.folder,
                })
                  .then(() => {
                    successAlert("Media actualizada");
                    loadMedia(eventId);
                  })
                  .catch(() => errorAlert("Error actualizando media"))
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
