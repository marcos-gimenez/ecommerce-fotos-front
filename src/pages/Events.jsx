import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/events.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    // <div className="page">
    <div className="container">
      <h1 className="page-title">Eventos</h1>

      <div className="event-grid">
        {events.map((ev) => (
          <Link key={ev._id} to={`/event/${ev._id}`} className="event-card">
            <div className="event-media">
              {/*
              Placeholder hasta tener imagen real
              simplemente reemplazás el placeholder por:
              <img src={ev.coverImage} alt={ev.title} />
              
              */}
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
    // </div>
  );
}
