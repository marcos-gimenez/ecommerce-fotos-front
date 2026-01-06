// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/events.css";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Events() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${API_URL}/events`)
//       .then((res) => res.json())
//       .then(setEvents);
//   }, []);

//   return (
//     // <div className="page">
//     <div className="container">
//       <h1 className="page-title">Eventos</h1>

//       <div className="event-grid">
//         {events.map((ev) => (
//           <Link key={ev._id} to={`/event/${ev._id}`} className="event-card">
//             <div className="event-media">
//               {/*
//               Placeholder hasta tener imagen real
//               simplemente reemplazás el placeholder por:
//               <img src={ev.coverImage} alt={ev.title} />
              
//               */}
//               {ev.coverImage ? (
//                 <img
//                   src={ev.coverImage}
//                   alt={ev.title}
//                   className="event-image-placeholder"
//                 />
//               ) : (
//                 <div className="event-image-placeholder">
//                   <span>{ev.title.charAt(0)}</span>
//                 </div>
//               )}

//               <div className="event-overlay">
//                 <div className="event-overlay-content">
//                   <div className="event-text">
//                     <h3>{ev.title}</h3>

//                     <p className="event-meta">
//                       {new Date(ev.date).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <span className="event-cta">Ver evento</span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//     // </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/events.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 📅 fechas únicas disponibles
  const availableDates = [
    ...new Set(
      events.map((e) =>
        new Date(e.date).toISOString().slice(0, 10)
      )
    ),
  ];

  // 🔍 filtros combinados
  const filteredEvents = events.filter((ev) => {
    const matchTitle = ev.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDate = selectedDate
      ? new Date(ev.date).toISOString().slice(0, 10) === selectedDate
      : true;

    return matchTitle && matchDate;
  });

  return (
    <div className="container">
      {/* =========================
          INTRO
      ========================= */}
      <div className="events-intro">
        <h1 className="page-title">Pampa · Foto</h1>
        <p className="events-phrase">
          Fotografía natural.<br />
          Capturamos momentos efímeros.
        </p>
      </div>

      {/* =========================
          FILTROS
      ========================= */}
      <div className="events-filters">
        <input
          type="text"
          placeholder="Buscar evento…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Todas las fechas</option>
          {availableDates.map((d) => (
            <option key={d} value={d}>
              {new Date(d).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* =========================
          LOADER
      ========================= */}
      {loading && (
        <div className="events-loader">
          <div className="spinner" />
          <p>Cargando eventos…</p>
        </div>
      )}

      {/* =========================
          GRID
      ========================= */}
      {!loading && filteredEvents.length === 0 && (
        <p className="events-empty">
          No se encontraron eventos.
        </p>
      )}

      <div className="event-grid">
        {filteredEvents.map((ev) => (
          <Link key={ev._id} to={`/event/${ev._id}`} className="event-card">
            <div className="event-media">
              {ev.coverImage ? (
                <img
                  src={ev.coverImage}
                  alt={ev.title}
                  className="event-image-placeholder"
                />
              ) : (
                <div className="event-image-placeholder">
                  <span>{ev.title.charAt(0)}</span>
                </div>
              )}

              <div className="event-overlay">
                <div className="event-overlay-content">
                  <div className="event-text">
                    <h3>{ev.title}</h3>
                    <p className="event-meta">
                      {new Date(ev.date).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="event-cta">Ver evento</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
